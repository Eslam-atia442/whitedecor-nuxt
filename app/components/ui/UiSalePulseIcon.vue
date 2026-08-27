<template>
  <span
    class="sale-heartbeat sale-icon-coral inline-flex shrink-0 items-center justify-center"
    :class="size === 'xs' ? 'size-5 rounded-md' : size === 'sm' ? 'size-7 rounded-xl' : 'size-10 rounded-xl'"
    aria-hidden="true"
  >
    <span
      class="material-symbols-rounded font-fill"
      :class="size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-base' : 'text-xl'"
    >sell</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: 'xs' | 'sm' | 'md' }>(), { size: 'md' });
</script>
