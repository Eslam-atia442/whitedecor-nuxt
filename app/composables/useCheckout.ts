// composables/useCheckout.ts
import { toast } from 'vue-sonner';
import { useCheckoutStore } from '~/stores/checkout';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useAddressStore } from '~/stores/address';
import { useSettingsStore } from '~/stores/settings';
import type { CheckoutApiResponse, OrderDto } from '~/types/checkout';

export const useCheckout = () => {
  const store = useCheckoutStore();
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const addressStore = useAddressStore();
  const settingsStore = useSettingsStore();
  const api = useApi();
  const { push, localize } = useLocalizedPath();

  const getT = (key: string, fallback = ''): string => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const t = (nuxtApp?.$i18n as { t?: (k: string) => string })?.t;
      if (t) return t(key);
    } catch {
      // fallback
    }
    return fallback || key;
  };

  const getValidCountryId = (): string => {
    const fromSettings = settingsStore.selectedCountry?.id;
    const fromList = settingsStore.countries[0]?.id;
    const fromUser = authStore.user?.country_id;
    const fromForm = store.form.countryId;
    if (fromForm && fromForm !== '1' && fromForm !== '65') return String(fromForm);
    if (fromSettings && String(fromSettings) !== '1' && String(fromSettings) !== '65') return String(fromSettings);
    if (fromList && String(fromList) !== '1' && String(fromList) !== '65') return String(fromList);
    if (fromUser && String(fromUser) !== '1' && String(fromUser) !== '65') return String(fromUser);
    return '66'; // White Decor Egypt country ID from /api/v1/countries
  };

  const initCheckout = () => {
    if (!authStore.isAuthenticated) {
      toast.info(getT('auth_required_checkout', 'يرجى تسجيل الدخول أو إنشاء حساب لإتمام الطلب بسهولة'));
      return navigateTo(localize('/register?redirect=/checkout'), { replace: true });
    }

    if (cartStore.isEmpty && !cartStore.isLoading) {
      push('/cart');
      return;
    }

    // Always reset to Step 1 on checkout page entry
    store.setStep(1);
    store.form.countryId = getValidCountryId();

    if (authStore.user) {
      if (!store.form.name && authStore.user.name) store.form.name = authStore.user.name;
      if (!store.form.phone && authStore.user.phone) store.form.phone = authStore.user.phone;
    }

    if (addressStore.defaultAddress && !store.form.address) {
      store.selectSavedAddress(addressStore.defaultAddress);
    }

    if (cartStore.appliedCoupon) {
      store.form.couponNum = cartStore.appliedCoupon.coupon_num;
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string[]> = {};
    if (!store.form.name.trim()) {
      errors.name = [getT('required_field', 'هذا الحقل مطلوب')];
      toast.error(getT('required_field_name', 'يرجى إدخال الاسم بالكامل'));
    }
    if (!store.form.phone.trim()) {
      errors.phone = [getT('required_field', 'هذا الحقل مطلوب')];
      toast.error(getT('required_field_phone', 'يرجى إدخال رقم الهاتف'));
    } else if (store.form.phone.trim().length < 8) {
      errors.phone = [getT('invalid_phone', 'يرجى إدخال رقم هاتف صحيح')];
      toast.error(getT('invalid_phone', 'يرجى إدخال رقم هاتف صحيح'));
    }
    if (!store.form.address.trim()) {
      errors.address = [getT('required_field', 'هذا الحقل مطلوب')];
      toast.error(getT('required_field_address', 'يرجى إدخال عنوان التوصيل'));
    }

    store.setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (store.activeStep === 1 && !validateStep1()) return;
    store.setStep(store.activeStep + 1);
  };

  const prevStep = () => {
    store.setStep(store.activeStep - 1);
  };

  const validateForm = (): boolean => {
    if (!validateStep1()) {
      store.setStep(1);
      return false;
    }
    return true;
  };

  const promptConfirmation = () => {
    if (validateForm()) {
      store.isConfirmModalOpen = true;
    }
  };

  const executeOrder = async () => {
    store.isConfirmModalOpen = false;
    store.status = 'submitting';
    store.generalError = null;

    try {
      let fullAddress = store.form.address.trim();
      if (store.form.city) fullAddress = `${store.form.city} - ${fullAddress}`;
      if (store.form.building) fullAddress += `، عمارة ${store.form.building}`;
      if (store.form.apartment) fullAddress += `، شقة ${store.form.apartment}`;

      const countryId = getValidCountryId();
      const formData = new FormData();
      formData.append('name', store.form.name.trim());
      formData.append('phone', store.form.phone.trim());
      formData.append('address', fullAddress);
      formData.append('country_id', countryId);
      if (store.form.notes?.trim()) formData.append('notes', store.form.notes.trim());

      const activeCoupon = cartStore.appliedCoupon?.coupon_num || store.form.couponNum?.trim();
      if (activeCoupon) {
        formData.append('coupon_num', activeCoupon);
        formData.append('coupon', activeCoupon);
      }

      const snapOrigSubtotal = cartStore.originalSubtotal;
      const snapOfferSavings = cartStore.offerSavings;
      const snapSubtotal = cartStore.subtotal;
      const snapDiscount = cartStore.discount;
      const snapTotal = cartStore.total;
      const snapCoupon = cartStore.appliedCoupon;
      const snapItems = [...cartStore.items];

      const res = await api.post<CheckoutApiResponse>('/api/v1/checkout', formData);

      const backendOrder = (res?.data as any)?.order || res?.data || {};

      const order: OrderDto = {
        id: backendOrder.id || Date.now(),
        order_num: backendOrder.order_num || `WD-${Date.now().toString().slice(-6)}`,
        name: backendOrder.name || store.form.name,
        phone: backendOrder.phone || store.form.phone,
        address: backendOrder.address || fullAddress,
        total: String(backendOrder.total || snapTotal),
        subtotal: String(backendOrder.subtotal || snapSubtotal),
        original_subtotal: String(snapOrigSubtotal),
        offer_savings: String(snapOfferSavings),
        discount_amount: String(backendOrder.discount_amount || snapDiscount),
        coupon_num: backendOrder.coupon_num || store.form.couponNum,
        coupon: backendOrder.coupon || snapCoupon,
        items: backendOrder.items && backendOrder.items.length ? backendOrder.items : snapItems,
      };

      store.placedOrder = order;
      store.status = 'success';
      store.isSuccessModalOpen = true;
      store.setStep(1);

      // Clear cart
      cartStore.cartToken = null;
      await cartStore.fetchCart();
      toast.success(getT('order_success_title', 'تم تأكيد طلبك بنجاح!'));
    } catch (err: any) {
      store.status = 'error';
      if (err?.errors && typeof err.errors === 'object') {
        store.setFieldErrors(err.errors);
        
        // Smart step routing based on which field failed
        const errFields = Object.keys(err.errors);
        if (errFields.some(f => ['name', 'phone', 'address', 'country_id', 'city', 'building', 'apartment'].includes(f))) {
          store.setStep(1);
        } else if (errFields.some(f => ['delivery_method', 'shipping_method'].includes(f))) {
          store.setStep(2);
        } else if (errFields.some(f => ['payment_method'].includes(f))) {
          store.setStep(3);
        } else {
          store.setStep(4);
        }

        const firstErr = Object.values(err.errors).flat()[0] as string;
        if (firstErr) toast.error(firstErr);
      } else {
        const msg = err?.firstError || err?.message || getT('checkout_error', 'حدث خطأ أثناء إتمام الطلب');
        store.generalError = msg;
        toast.error(msg);
      }
    }
  };

  return {
    store,
    cartStore,
    initCheckout,
    validateStep1,
    nextStep,
    prevStep,
    validateForm,
    promptConfirmation,
    executeOrder,
  };
};
