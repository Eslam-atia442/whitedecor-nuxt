<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    <div
      v-for="n in 8"
      :key="n"
      class="overflow-hidden rounded-2xl border border-mist bg-card shadow-subtle animate-pulse"
    >
      <div class="aspect-square w-full bg-mist/60" />
      <div class="p-4 space-y-3">
        <div class="h-3 w-1/3 bg-mist/40 rounded" />
        <div class="h-4 w-3/4 bg-mist rounded" />
        <div class="pt-3 border-t border-mist/40 flex items-center justify-between">
          <div class="h-4 w-20 bg-mist rounded" />
          <div class="size-8 rounded-xl bg-mist/60" />
        </div>
      </div>
    </div>
  </div>
</template>
