<template>
  <UiResponsiveSelect
    :model-value="selectedId"
    :options="countryOptions"
    :placeholder="$t('settings.select_country')"
    @update:model-value="onChange"
  >
    <template #trigger="{ handleToggle, isOpen, selectedOption }">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl border border-mist bg-card px-4 py-3 text-start transition hover:border-gold/40"
        :class="isOpen ? 'border-gold ring-1 ring-gold/30' : ''"
        @click="handleToggle"
      >
        <UiNetworkImage
          :src="selectedOption?.image"
          fallback-icon="flag"
          rounded="rounded-full"
          class="size-6 shrink-0 rounded-full"
        />
        <span class="flex-1 text-sm text-ink">{{ selectedOption?.label || $t('settings.select_country') }}</span>
        <span class="text-sm font-semibold text-gold" dir="ltr">{{ selectedCode }}</span>
        <span class="material-symbols-rounded text-ink-secondary transition-transform" :class="{ 'rotate-180': isOpen }">expand_more</span>
      </button>
    </template>
    <template #option="{ option }">
      <UiNetworkImage
        :src="option.image"
        fallback-icon="flag"
        rounded="rounded-full"
        class="size-8 shrink-0 rounded-full border border-mist"
      />
      <span class="flex-1 truncate">{{ option.label }}</span>
      <span class="text-sm font-medium text-gold" dir="ltr">{{ option.meta }}</span>
    </template>
  </UiResponsiveSelect>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();

const selectedId = computed(() => settingsStore.selectedCountry?.id || '');
const selectedCode = computed(() => settingsStore.selectedCountry?.countryCode || '+20');

const countryOptions = computed(() =>
  settingsStore.countries.map((c) => ({
    label: c.name,
    value: c.id,
    image: c.flag,
    meta: c.countryCode,
  })),
);

const onChange = (val: string | number | '') => {
  const country = settingsStore.countries.find((c) => String(c.id) === String(val));
  if (country) settingsStore.selectCountry(country);
};
</script>
