<template>
  <UiNetworkImage v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </UiNetworkImage>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

