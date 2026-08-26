<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to WdStatusBadge widget with solid luxury colors -->
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide shadow-xs transition-all duration-200 select-none',
      badgeStyles.bg,
      badgeStyles.text,
      badgeStyles.border,
    ]"
  >
    <span :class="['size-2 rounded-full shrink-0', badgeStyles.dot]" />
    <span>{{ displayLabel }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status?: string | null;
  label?: string | null;
}>();

const { t } = useI18n();

const displayLabel = computed(() => {
  if (props.label) return props.label;
  const s = (props.status || 'pending').trim().toLowerCase();
  if (s === 'delivered') return t('status_delivered');
  if (s === 'shipping') return t('status_shipping');
  if (s === 'processing') return t('status_processing');
  if (s === 'cancelled') return t('status_cancelled');
  return t('status_pending');
});

const badgeStyles = computed(() => {
  const s = (props.status || 'pending').trim().toLowerCase();
  switch (s) {
    case 'delivered':
      return {
        bg: 'bg-[#059669]',
        text: 'text-white',
        border: 'border border-[#047857]',
        dot: 'bg-white',
      };
    case 'shipping':
      return {
        bg: 'bg-[#0284C7]',
        text: 'text-white',
        border: 'border border-[#0369A1]',
        dot: 'bg-white animate-ping',
      };
    case 'processing':
      return {
        bg: 'bg-[#0A0E29]',
        text: 'text-[#D4AF37]',
        border: 'border border-[#D4AF37]/50',
        dot: 'bg-[#D4AF37] animate-pulse',
      };
    case 'cancelled':
      return {
        bg: 'bg-[#E11D48]',
        text: 'text-white',
        border: 'border border-[#BE123C]',
        dot: 'bg-white',
      };
    default: // pending
      return {
        bg: 'bg-[#D4AF37]',
        text: 'text-[#0A0E29]',
        border: 'border border-[#B38F24]',
        dot: 'bg-[#0A0E29] animate-pulse',
      };
  }
});
</script>
