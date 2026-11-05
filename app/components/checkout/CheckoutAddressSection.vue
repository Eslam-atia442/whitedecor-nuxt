<template>
  <div class="space-y-6">
    <!-- Saved Addresses Selector -->
    <div v-if="addressStore.addresses.length > 0" class="space-y-3">
      <label class="block text-xs font-bold uppercase tracking-wider text-ink-secondary">
        {{ $t('saved_addresses') }}
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="addr in addressStore.addresses"
          :key="addr.id"
          class="cursor-pointer rounded-2xl border p-3.5 transition-all text-xs space-y-1.5"
          :class="store.selectedAddressId === addr.id ? 'border-gold bg-gold/10 shadow-subtle ring-1 ring-gold' : 'border-mist bg-surface hover:border-gold/30'"
          @click="store.selectSavedAddress(addr)"
        >
          <div class="flex items-center justify-between font-bold text-ink">
            <span>{{ addr.title || addr.name }}</span>
            <span v-if="addr.is_default" class="text-[10px] text-gold uppercase bg-gold/15 px-1.5 py-0.5 rounded font-bold">افتراضي</span>
          </div>
          <p class="text-ink-secondary truncate">{{ addr.address }}</p>
          <p class="text-ink-secondary font-mono">{{ addr.phone }}</p>
        </div>
      </div>
    </div>

    <!-- Main Address Form Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UiInput
        v-model="store.form.name"
        :label="$t('full_name')"
        :placeholder="$t('full_name_placeholder')"
        :error="store.fieldErrors.name?.[0]"
        required
        @input="store.clearFieldError('name')"
      />

      <UiPhoneInput
        v-model="store.form.phone"
        :label="$t('phone_number')"
        :placeholder="$t('phone_placeholder')"
        :error-message="store.fieldErrors.phone?.[0]"
        :has-error="Boolean(store.fieldErrors.phone?.[0])"
        required
        @update:model-value="store.clearFieldError('phone')"
      />
    </div>

    <!-- Governorate & City -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label class="block text-xs font-bold uppercase tracking-wider text-ink-secondary">
          {{ $t('governorate') }} <span class="text-error">*</span>
        </label>
        <select
          v-model="store.form.governorate"
          class="w-full rounded-2xl border border-mist bg-card px-4 py-3 text-sm font-semibold text-ink transition focus:border-gold focus:outline-none"
        >
          <option v-for="gov in EGYPT_GOVERNORATES" :key="gov.id" :value="gov.id">
            {{ isAr ? gov.nameAr : gov.nameEn }} ({{ $t('shipping_cost') }}: {{ gov.shippingFee }} {{ $t('egp') }})
          </option>
        </select>
      </div>

      <UiInput
        v-model="store.form.city"
        :label="$t('city')"
        :placeholder="$t('cairo')"
        :error="store.fieldErrors.city?.[0]"
        @input="store.clearFieldError('city')"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UiInput
        v-model="store.form.building"
        :label="$t('building_no')"
        placeholder="12"
      />

      <UiInput
        v-model="store.form.apartment"
        :label="$t('apartment_no')"
        placeholder="4B"
      />
    </div>

    <UiInput
      v-model="store.form.address"
      :label="$t('street_address')"
      :placeholder="$t('street_placeholder')"
      :error="store.fieldErrors.address?.[0]"
      required
      @input="store.clearFieldError('address')"
    />
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout';
import { useAddressStore } from '~/stores/address';
import { EGYPT_GOVERNORATES } from '~/constants/governorates';

const store = useCheckoutStore();
const addressStore = useAddressStore();
const { locale } = useI18n();
const isAr = computed(() => locale.value === 'ar');
</script>
