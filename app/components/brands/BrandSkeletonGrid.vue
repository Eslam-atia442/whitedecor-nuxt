<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div
      v-for="n in 12"
      :key="n"
      class="flex flex-col items-center justify-center rounded-2xl border border-mist bg-card p-6 shadow-subtle animate-pulse space-y-3"
    >
      <div class="size-16 rounded-2xl bg-mist/60" />
      <div class="h-3 w-16 bg-mist rounded-md" />
      <div class="h-2 w-10 bg-mist/40 rounded-md" />
    </div>
  </div>
</template>
