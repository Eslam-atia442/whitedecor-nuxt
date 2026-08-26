<template>
  <div class="space-y-10 animate-pulse">
    <!-- Breadcrumbs skeleton -->
    <div class="flex items-center gap-2">
      <div class="h-4 w-16 rounded bg-mist/60" />
      <div class="h-4 w-4 rounded bg-mist/40" />
      <div class="h-4 w-24 rounded bg-mist/60" />
      <div class="h-4 w-4 rounded bg-mist/40" />
      <div class="h-4 w-32 rounded bg-mist/60" />
    </div>

    <!-- Two-Column Product Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Media Gallery Skeleton -->
      <div class="space-y-4">
        <div class="aspect-square w-full rounded-3xl bg-mist/60" />
        <div class="flex gap-3">
          <div v-for="i in 4" :key="i" class="size-18 rounded-2xl bg-mist/50" />
        </div>
      </div>

      <!-- Details Column Skeleton -->
      <div class="space-y-6">
        <!-- Deal Banner Skeleton -->
        <div class="h-20 w-full rounded-2xl bg-mist/60" />

        <!-- Header Card Skeleton -->
        <div class="rounded-3xl border border-mist bg-card p-6 space-y-4">
          <div class="flex items-center gap-2">
            <div class="h-6 w-24 rounded-xl bg-mist/60" />
            <div class="h-6 w-20 rounded-xl bg-mist/50" />
          </div>
          <div class="h-8 w-3/4 rounded-xl bg-mist/70" />
          <div class="flex items-center gap-4 pt-2 border-t border-mist/40">
            <div class="h-4 w-28 rounded bg-mist/50" />
            <div class="h-4 w-24 rounded bg-mist/50" />
          </div>
        </div>

        <!-- Price Section Skeleton -->
        <div class="rounded-3xl border border-mist bg-card p-6 space-y-3">
          <div class="flex justify-between items-center">
            <div class="h-10 w-44 rounded-xl bg-mist/70" />
            <div class="h-8 w-16 rounded-pill bg-mist/60" />
          </div>
          <div class="h-4 w-32 rounded bg-mist/50" />
        </div>

        <!-- Perks Bar Skeleton -->
        <div class="grid grid-cols-2 gap-3">
          <div v-for="i in 4" :key="i" class="h-16 rounded-2xl bg-mist/40" />
        </div>

        <!-- Action Button Skeleton -->
        <div class="h-14 w-full rounded-2xl bg-mist/70" />
      </div>
    </div>
  </div>
</template>
