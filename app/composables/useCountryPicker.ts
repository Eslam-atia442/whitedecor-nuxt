import type { CountryDto } from '~/types/settings';

export const useCountryPicker = () => {
  const settingsStore = useSettingsStore();
  const isOpen = ref(false);
  const searchQuery = ref('');

  const filteredCountries = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return settingsStore.countries;
    return settingsStore.countries.filter(
      (c) => c.name.toLowerCase().includes(query) || c.countryCode.includes(query),
    );
  });

  const openPicker = () => {
    searchQuery.value = '';
    isOpen.value = true;
  };

  const closePicker = () => {
    isOpen.value = false;
  };

  const chooseCountry = (country: CountryDto) => {
    settingsStore.selectCountry(country);
    closePicker();
  };

  return {
    isOpen,
    searchQuery,
    filteredCountries,
    selectedCountry: computed(() => settingsStore.selectedCountry),
    openPicker,
    closePicker,
    chooseCountry,
  };
};
