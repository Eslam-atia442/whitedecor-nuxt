<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 hidden items-center justify-center bg-navy/60 p-4 backdrop-blur-md lg:flex">
      <div class="w-full max-w-md rounded-xl bg-card p-6 shadow-card">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-ink">{{ $t('settings.select_country') }}</h2>
          <button type="button" class="text-ink-secondary hover:text-ink" @click="closePicker">✕</button>
        </div>
        <CountrySearchInput v-model="searchQuery" class="mb-4" />
        <div class="max-h-72 space-y-1 overflow-y-auto">
          <CountryListItem
            v-for="country in filteredCountries"
            :key="country.id"
            :country="country"
            :selected="selectedCountry?.id === country.id"
            @select="chooseCountry(country)"
          />
          <p v-if="!filteredCountries.length" class="py-6 text-center text-sm text-ink-secondary">
            {{ $t('settings.no_countries_found') }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen, searchQuery, filteredCountries, selectedCountry, closePicker, chooseCountry } = useCountryPicker();
</script>
