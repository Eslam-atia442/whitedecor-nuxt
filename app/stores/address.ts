import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import type { AddressDto } from '~/types/profile';

export const useAddressStore = defineStore('address', () => {
  const getT = (key: string, fallback = '') => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const t = (nuxtApp?.$i18n as { t?: (k: string) => string })?.t;
      if (t) return t(key);
    } catch {
      // fallback
    }
    return fallback || key;
  };

  const savedAddressesCookie = useCookie<AddressDto[]>('wd_saved_addresses', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    default: () => [
      {
        id: 'addr_default',
        title: 'المنزل / الرئيسية',
        name: 'سارة أحمد',
        phone: '+201000933972',
        city: 'القاهرة - التجمع الخامس',
        address: 'شارع التسعين الشمالي، كمبوند النخيل، فيلا 12',
        is_default: true,
        country_id: '1',
      },
    ],
  });

  const addresses = computed(() => savedAddressesCookie.value || []);
  const defaultAddress = computed(() => addresses.value.find((a) => a.is_default) || addresses.value[0]);

  const addAddress = (newAddr: Omit<AddressDto, 'id'>) => {
    const id = `addr_${Date.now()}`;
    const isFirst = !savedAddressesCookie.value || savedAddressesCookie.value.length === 0;
    const shouldBeDefault = newAddr.is_default || isFirst;

    let updated = (savedAddressesCookie.value || []).map((addr) => ({
      ...addr,
      is_default: shouldBeDefault ? false : addr.is_default,
    }));

    const created: AddressDto = {
      ...newAddr,
      id,
      is_default: shouldBeDefault,
    };

    updated = [created, ...updated];
    savedAddressesCookie.value = updated;
    toast.success(getT('save_changes', 'تم الحفظ'));
    return created;
  };

  const updateAddress = (id: string, updatedFields: Partial<AddressDto>) => {
    if (!savedAddressesCookie.value) return;

    let updated = savedAddressesCookie.value.map((addr) => {
      if (addr.id === id) {
        return { ...addr, ...updatedFields };
      }
      if (updatedFields.is_default) {
        return { ...addr, is_default: false };
      }
      return addr;
    });

    savedAddressesCookie.value = updated;
    toast.success(getT('save_changes', 'تم الحفظ'));
  };

  const deleteAddress = (id: string) => {
    if (!savedAddressesCookie.value) return;
    const filtered = savedAddressesCookie.value.filter((addr) => addr.id !== id);

    if (filtered.length > 0 && !filtered.some((a) => a.is_default)) {
      const first = filtered[0];
      if (first) first.is_default = true;
    }

    savedAddressesCookie.value = filtered;
    toast.success(getT('delete', 'تم الحذف'));
  };

  const setDefaultAddress = (id: string) => {
    if (!savedAddressesCookie.value) return;
    savedAddressesCookie.value = savedAddressesCookie.value.map((addr) => ({
      ...addr,
      is_default: addr.id === id,
    }));
  };

  return {
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
});
