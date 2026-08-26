<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card">
    <div class="mb-6 flex items-center justify-between border-b border-mist pb-4">
      <div>
        <h2 class="text-fluid-h3 font-bold text-ink">{{ $t('saved_addresses') }}</h2>
        <p class="text-xs text-ink-secondary">{{ $t('tab_addresses') }}</p>
      </div>
      <UiButton variant="outline" size="sm" @click="$emit('add-address')">
        <span class="material-symbols-rounded text-base">add_location_alt</span>
        <span>{{ $t('add_new_address') }}</span>
      </UiButton>
    </div>

    <div v-if="addressStore.addresses.length === 0" class="py-8 text-center">
      <div class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
        <span class="material-symbols-rounded text-2xl">location_off</span>
      </div>
      <p class="mt-3 text-sm font-bold text-ink">{{ $t('no_addresses_yet') }}</p>
      <p class="mt-1 text-xs text-ink-secondary">{{ $t('no_addresses_desc') }}</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div
        v-for="addr in addressStore.addresses"
        :key="addr.id"
        class="relative flex flex-col justify-between rounded-2xl border p-4 transition-all"
        :class="[
          addr.is_default
            ? 'border-gold/60 bg-gold/5 shadow-subtle'
            : 'border-mist bg-surface/40 hover:border-mist-dark',
        ]"
      >
        <div>
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-bold text-ink">{{ addr.title }}</span>
            <span
              v-if="addr.is_default"
              class="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold"
            >
              {{ $t('default_address_badge') }}
            </span>
          </div>

          <p class="mt-2 text-xs font-semibold text-ink">{{ addr.name }}</p>
          <p class="text-xs text-ink-secondary" dir="ltr">{{ addr.phone }}</p>
          <p class="mt-1 text-xs text-ink-muted">{{ addr.city }} — {{ addr.address }}</p>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-mist/50 pt-3">
          <button
            v-if="!addr.is_default"
            type="button"
            class="text-[11px] font-bold text-gold hover:underline"
            @click="addressStore.setDefaultAddress(addr.id)"
          >
            {{ $t('set_as_default_address') }}
          </button>
          <div v-else />

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="flex size-7 items-center justify-center rounded-lg text-ink-secondary hover:bg-surface hover:text-ink"
              :title="$t('edit_address')"
              @click="$emit('edit-address', addr)"
            >
              <span class="material-symbols-rounded text-sm">edit</span>
            </button>
            <button
              type="button"
              class="flex size-7 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10"
              :title="$t('delete')"
              @click="addressStore.deleteAddress(addr.id)"
            >
              <span class="material-symbols-rounded text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddressDto } from '~/types/profile';

defineEmits<{
  'add-address': [];
  'edit-address': [address: AddressDto];
}>();

const addressStore = useAddressStore();
</script>
