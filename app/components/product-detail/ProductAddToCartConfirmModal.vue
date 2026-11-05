<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('add_to_cart_confirm_title')"
    @close="$emit('cancel')"
  >
    <div class="space-y-6 pt-2">
      <!-- Product Details with Image -->
      <div class="flex items-center gap-4 p-3 rounded-2xl border border-mist bg-surface">
        <div class="relative size-16 shrink-0 overflow-hidden rounded-xl bg-card border border-mist">
          <UiNetworkImage
            :src="productImage"
            :alt="productName"
            fallback-icon="chair"
            class="size-full"
          />
        </div>

        <div class="space-y-1 min-w-0 flex-1">
          <h3 class="font-bold text-sm text-ink truncate">{{ productName }}</h3>
          <p class="text-xs text-ink-secondary leading-relaxed">
            {{ $t('add_to_cart_confirm_msg') }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-mist">
        <UiButton variant="outline" size="sm" @click="$emit('cancel')">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton variant="primary" size="sm" :loading="loading" @click="$emit('confirm')">
          <span class="material-symbols-rounded text-base">add_shopping_cart</span>
          <span>{{ $t('confirm') }}</span>
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  productName: string;
  productImage?: string | null;
  loading?: boolean;
}>();

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>
