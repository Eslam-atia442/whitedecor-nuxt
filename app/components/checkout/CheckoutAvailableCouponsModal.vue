<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('available_coupons')"
    @close="$emit('close')"
  >
    <div v-if="isLoading" class="space-y-3 py-4">
      <div v-for="i in 3" :key="i" class="h-20 rounded-2xl bg-mist/40 animate-pulse" />
    </div>

    <div v-else-if="coupons.length === 0" class="py-8 text-center space-y-3">
      <div class="mx-auto flex size-14 items-center justify-center rounded-full bg-mist/40 text-ink-secondary">
        <span class="material-symbols-rounded text-2xl">confirmation_number</span>
      </div>
      <p class="text-sm font-bold text-ink">{{ $t('no_coupons_available') }}</p>
      <p class="text-xs text-ink-secondary">{{ $t('no_coupons_desc') }}</p>
    </div>

    <div v-else class="space-y-3 py-2">
      <div
        v-for="coupon in coupons"
        :key="coupon.id"
        class="flex items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-card p-3.5 shadow-subtle hover:border-gold"
      >
        <div class="flex items-center gap-3">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <span class="material-symbols-rounded text-xl">local_offer</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-ink">{{ formatDiscount(coupon) }}</span>
              <span class="rounded bg-surface px-1.5 py-0.5 text-xs font-mono font-bold text-gold uppercase border border-mist">
                {{ coupon.coupon_num }}
              </span>
            </div>
            <p v-if="coupon.max_discount" class="text-[11px] text-ink-secondary mt-0.5">
              {{ $t('max_discount') }}: {{ coupon.max_discount }} {{ $t('egp') }}
            </p>
            <p v-if="coupon.expire_date" class="text-[10px] text-ink-secondary/70">
              {{ $t('expires_on') }}: {{ coupon.expire_date.split(' ')[0] }}
            </p>
          </div>
        </div>
        <UiButton variant="primary" size="sm" class="shrink-0" @click="handleSelect(coupon.coupon_num)">
          {{ $t('apply') }}
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { CouponDto } from '~/types/coupon';
import { unwrapList } from '~/utils/unwrap_list';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  select: [code: string];
}>();

const api = useApi();
const coupons = ref<CouponDto[]>([]);
const isLoading = ref(false);

const formatDiscount = (coupon: CouponDto) => {
  if (coupon.type === 'ratio' || !coupon.type) {
    return `${coupon.discount}%`;
  }
  return `${coupon.discount} EGP`;
};

const fetchCoupons = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/api/v1/coupons');
    coupons.value = unwrapList<CouponDto>(res);
  } catch {
    coupons.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.isOpen, (open) => {
  if (open) fetchCoupons();
});

const handleSelect = (code: string) => {
  emit('select', code);
  emit('close');
};
</script>

