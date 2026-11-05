import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { AUTH_COOKIE_OPTIONS } from '~/constants/auth_cookie';
import type { AddressDto } from '~/types/profile';

const isMock = (a: AddressDto) =>
  a.id === 'addr_default' || a.address?.includes('كمبوند النخيل') || a.phone === '+201000933972';

export const useAddressStore = defineStore('address', () => {
  const getT = (key: string, fallback = '') => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const t = (nuxtApp?.$i18n as { t?: (k: string) => string })?.t;
      if (t) return t(key);
    } catch { /* fallback */ }
    return fallback || key;
  };

  const savedCookie = useCookie<AddressDto[]>('wd_saved_addresses', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 365,
    default: () => [],
  });

  if (Array.isArray(savedCookie.value) && savedCookie.value.some(isMock)) {
    savedCookie.value = savedCookie.value.filter((a) => !isMock(a));
  }

  const addresses = computed(() => (savedCookie.value || []).filter((a) => !isMock(a)));
  const defaultAddress = computed(() => addresses.value.find((a) => a.is_default) || addresses.value[0]);

  const addAddress = (newAddr: Omit<AddressDto, 'id'>, notify = true) => {
    const id = `addr_${Date.now()}`;
    const cleanList = addresses.value;
    const shouldBeDefault = newAddr.is_default || cleanList.length === 0;

    let updated = cleanList.map((a) => ({
      ...a,
      is_default: shouldBeDefault ? false : a.is_default,
    }));

    const created: AddressDto = { ...newAddr, id, is_default: shouldBeDefault };
    updated = [created, ...updated];
    savedCookie.value = updated;
    if (notify) toast.success(getT('save_changes', 'تم الحفظ'));
    return created;
  };

  const saveFromCheckout = (info: {
    name: string; phone: string; address: string; city?: string; governorate?: string; countryId?: string;
  }) => {
    if (!info.name || !info.phone || !info.address) return;
    const cleanList = addresses.value;
    const exists = cleanList.find((a) => a.address.trim() === info.address.trim() && a.phone.trim() === info.phone.trim());
    if (exists) return;

    addAddress({
      title: getT('home_address', 'عنوان التوصيل'),
      name: info.name.trim(),
      phone: info.phone.trim(),
      city: info.city?.trim() || info.governorate || '',
      address: info.address.trim(),
      country_id: info.countryId || '66',
      is_default: cleanList.length === 0,
    }, false);
  };

  const updateAddress = (id: string, updatedFields: Partial<AddressDto>) => {
    if (!savedCookie.value) return;
    const updated = addresses.value.map((a) => {
      if (a.id === id) return { ...a, ...updatedFields };
      if (updatedFields.is_default) return { ...a, is_default: false };
      return a;
    });
    savedCookie.value = updated;
    toast.success(getT('save_changes', 'تم الحفظ'));
  };

  const deleteAddress = (id: string) => {
    if (!savedCookie.value) return;
    const filtered = addresses.value.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.is_default)) {
      const first = filtered[0];
      if (first) first.is_default = true;
    }
    savedCookie.value = filtered;
    toast.success(getT('delete', 'تم الحذف'));
  };

  const setDefaultAddress = (id: string) => {
    if (!savedCookie.value) return;
    savedCookie.value = addresses.value.map((a) => ({ ...a, is_default: a.id === id }));
  };

  return {
    addresses,
    defaultAddress,
    addAddress,
    saveFromCheckout,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
});
