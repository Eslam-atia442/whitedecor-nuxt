<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="n in 8"
      :key="n"
      class="overflow-hidden rounded-2xl border border-mist bg-card shadow-subtle animate-pulse"
    >
      <div class="aspect-4/3 w-full bg-mist/60" />
      <div class="p-4 space-y-3">
        <div class="h-4 w-3/4 bg-mist rounded-md" />
        <div class="h-3 w-1/2 bg-mist/60 rounded-md" />
        <div class="pt-2 flex justify-between">
          <div class="h-3 w-20 bg-mist/40 rounded-md" />
          <div class="h-3 w-4 bg-mist/40 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
