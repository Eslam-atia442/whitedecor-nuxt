<template>
  <UiResponsiveSelect
    v-model="selectedCountryId"
    :options="countryOptions"
    :placeholder="$t('select_country')"
    :full-width="false"
    class="shrink-0"
  >
    <template #trigger="{ handleToggle, isOpen }">
      <button
        type="button"
        class="flex h-12 w-auto shrink-0 items-center justify-center gap-1.5 px-3 text-ink transition hover:bg-mist/30 focus:outline-none"
        @click="handleToggle"
      >
        <UiNetworkImage
          :src="selectedCountry?.flag"
          :alt="selectedCountry?.name"
          fallback-icon="flag"
          rounded="rounded-full"
          class="size-5 shrink-0 rounded-full border border-mist/80"
        />
        <span class="text-xs font-bold text-ink" dir="ltr">
          {{ selectedCountry?.countryCode || '+20' }}
        </span>
        <span
          class="material-symbols-rounded text-base text-ink-secondary transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        >
          expand_more
        </span>
      </button>
    </template>
    <template #option="{ option }">
      <UiNetworkImage
        :src="option.image"
        fallback-icon="flag"
        rounded="rounded-full"
        class="size-6 shrink-0 rounded-full border border-mist"
      />
      <span class="flex-1 truncate text-sm font-medium text-ink">{{ option.label }}</span>
      <span class="text-xs font-bold text-gold" dir="ltr">{{ option.meta }}</span>
    </template>
  </UiResponsiveSelect>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();

const selectedCountryId = computed({
  get: () => settingsStore.selectedCountry?.id || '',
  set: (val: string | number | '') => {
    const country = settingsStore.countries.find((c) => String(c.id) === String(val));
    if (country) settingsStore.selectCountry(country);
  },
});

const selectedCountry = computed(() => settingsStore.selectedCountry);

const countryOptions = computed(() =>
  settingsStore.countries.map((c) => ({
    label: c.name,
    value: c.id,
    image: c.flag,
    meta: c.countryCode,
  })),
);
</script>