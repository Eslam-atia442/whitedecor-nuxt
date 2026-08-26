<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" @click="closePicker" />
      <div class="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card p-6 shadow-hover">
        <div class="mx-auto mb-4 h-1 w-12 rounded-pill bg-mist" />
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-ink">{{ $t('settings.select_country') }}</h2>
          <button type="button" class="text-ink-secondary" @click="closePicker">✕</button>
        </div>
        <CountrySearchInput v-model="searchQuery" class="mb-4" />
        <div class="max-h-64 space-y-1 overflow-y-auto">
          <CountryListItem
            v-for="country in filteredCountries"
            :key="country.id"
            :country="country"
            :selected="selectedCountry?.id === country.id"
            @select="chooseCountry(country)"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen, searchQuery, filteredCountries, selectedCountry, closePicker, chooseCountry } = useCountryPicker();
</script>
