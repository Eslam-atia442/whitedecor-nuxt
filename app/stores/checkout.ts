// stores/checkout.ts
import { defineStore } from 'pinia';
import { getGovernorateShippingFee } from '~/constants/governorates';
import type {
  CheckoutFormState,
  CheckoutFieldErrors,
  OrderDto,
} from '~/types/checkout';
import type { AddressDto } from '~/types/profile';

export const useCheckoutStore = defineStore('checkout', () => {
  const form = reactive<CheckoutFormState>({
    name: '',
    phone: '',
    countryId: '66',
    governorate: 'cairo',
    city: 'القاهرة',
    address: '',
    building: '',
    apartment: '',
    notes: '',
    couponNum: '',
    deliveryMethod: 'white_glove',
    paymentMethod: 'cod',
  });

  const activeStep = ref(1);
  const selectedAddressId = ref<string | null>(null);
  const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const fieldErrors = ref<CheckoutFieldErrors>({});
  const generalError = ref<string | null>(null);
  const placedOrder = ref<OrderDto | null>(null);
  const isConfirmModalOpen = ref(false);
  const isSuccessModalOpen = ref(false);

  const shippingFee = computed(() => getGovernorateShippingFee(form.governorate));

  const setStep = (step: number) => {
    activeStep.value = Math.max(1, Math.min(4, step));
  };

  const selectSavedAddress = (addr: AddressDto) => {
    selectedAddressId.value = addr.id;
    form.name = addr.name || form.name;
    form.phone = addr.phone || form.phone;
    form.city = addr.city || form.city;
    form.address = addr.address || form.address;
    if (addr.country_id) form.countryId = String(addr.country_id);
  };

  const clearFieldError = (field: keyof CheckoutFormState) => {
    if (fieldErrors.value[field]) delete fieldErrors.value[field];
  };

  const setFieldErrors = (errors?: CheckoutFieldErrors) => {
    fieldErrors.value = errors || {};
  };

  const resetForm = () => {
    form.name = '';
    form.phone = '';
    form.governorate = 'cairo';
    form.city = 'القاهرة';
    form.address = '';
    form.building = '';
    form.apartment = '';
    form.notes = '';
    form.couponNum = '';
    form.deliveryMethod = 'white_glove';
    form.paymentMethod = 'cod';
    selectedAddressId.value = null;
    fieldErrors.value = {};
    generalError.value = null;
    status.value = 'idle';
    activeStep.value = 1;
  };

  return {
    form,
    activeStep,
    selectedAddressId,
    shippingFee,
    status,
    fieldErrors,
    generalError,
    placedOrder,
    isConfirmModalOpen,
    isSuccessModalOpen,
    setStep,
    selectSavedAddress,
    clearFieldError,
    setFieldErrors,
    resetForm,
  };
});
