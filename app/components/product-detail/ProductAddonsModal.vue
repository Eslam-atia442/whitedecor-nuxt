<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('addons')"
    @close="$emit('close')"
  >
    <div class="space-y-6 max-h-[70vh] overflow-y-auto p-1">
      <!-- Quantity Counter -->
      <div class="flex items-center justify-between rounded-xl border border-mist bg-surface p-3.5">
        <div>
          <h4 class="text-sm font-bold text-ink">{{ $t('quantity') }}</h4>
          <span class="text-xs text-ink-secondary">{{ $t('quantity') }}</span>
        </div>
        <UiQuantityStepper
          :model-value="quantity"
          :min="1"
          :max="99"
          @update:model-value="$emit('update:quantity', $event)"
        />
      </div>

      <!-- Add-ons Selection List -->
      <div v-if="addons.length > 0" class="space-y-3">
        <label class="text-xs font-bold text-ink-secondary uppercase tracking-wider">
          {{ $t('select_addons') }}
        </label>
        <div class="space-y-2">
          <div
            v-for="addon in sortedAddons"
            :key="addon.id"
            class="flex items-center justify-between rounded-xl border p-3.5 transition-colors cursor-pointer"
            :class="selectedIds.includes(addon.id) ? 'border-gold bg-gold/5' : 'border-mist bg-card hover:bg-surface'"
            @click="$emit('toggle-addon', addon.id)"
          >
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-rounded text-xl"
                :class="selectedIds.includes(addon.id) ? 'text-gold' : 'text-mist'"
              >
                {{ selectedIds.includes(addon.id) ? 'check_box' : 'check_box_outline_blank' }}
              </span>
              <span class="text-sm font-semibold text-ink">{{ addon.name }}</span>
            </div>
            <span class="text-xs font-bold text-gold">
              {{ addon.is_free ? $t('free') : `+${formatPrice(addon.price)}` }}
            </span>
          </div>
        </div>
      </div>

      <!-- Summary & Add-to-Cart Action -->
      <div class="space-y-4 border-t border-mist pt-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-ink-secondary">{{ $t('total_with_addons') }}</span>
          <span class="text-xl font-extrabold text-ink">{{ formatPrice(grandTotal) }}</span>
        </div>

        <UiButton variant="primary" size="lg" class="w-full" @click="$emit('confirm')">
          <span class="material-symbols-rounded text-xl">shopping_cart</span>
          <span>{{ $t('confirm_add_to_cart') }}</span>
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { AddonDto } from '~/types/addon';

const props = defineProps<{
  isOpen: boolean;
  addons: AddonDto[];
  selectedIds: number[];
  quantity: number;
  grandTotal: number;
}>();

defineEmits<{
  close: [];
  'toggle-addon': [id: number];
  'update:quantity': [val: number];
  confirm: [];
}>();

const { formatPrice } = usePriceFormatter();

const sortedAddons = computed(() => {
  return [...props.addons].sort((a, b) => {
    if (a.is_free && !b.is_free) return -1;
    if (!a.is_free && b.is_free) return 1;
    return (Number(a.price) || 0) - (Number(b.price) || 0);
  });
});
</script>
