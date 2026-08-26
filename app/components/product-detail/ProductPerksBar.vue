<template>
  <div class="product-perks-section rounded-3xl border border-mist bg-card p-4 sm:p-5 shadow-card space-y-3">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
      <!-- Perk 1: Fast Delivery -->
      <div
        class="group relative flex items-start gap-3.5 rounded-2xl border border-mist/70 bg-surface/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-card hover:shadow-subtle"
      >
        <div
          class="flex size-10.5 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 text-gold border border-gold/30 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
        >
          <span class="material-symbols-rounded text-xl">local_shipping</span>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-ink transition-colors group-hover:text-gold">
            {{ $t('fast_delivery', 'توصيل سريع') }}
          </h4>
          <p class="text-[11px] text-ink-secondary leading-snug">
            {{ $t('fast_delivery_desc', 'شحن سريع خلال ٢-٤ أيام عمل') }}
          </p>
        </div>
      </div>

      <!-- Perk 2: Guaranteed Quality -->
      <div
        class="group relative flex items-start gap-3.5 rounded-2xl border border-mist/70 bg-surface/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-card hover:shadow-subtle"
      >
        <div
          class="flex size-10.5 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 text-gold border border-gold/30 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
        >
          <span class="material-symbols-rounded text-xl">verified_user</span>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-ink transition-colors group-hover:text-gold">
            {{ $t('guaranteed_quality', 'جودة مضمونة') }}
          </h4>
          <p class="text-[11px] text-ink-secondary leading-snug">
            {{ $t('guaranteed_quality_desc', 'خامات ممتازة وتشطيب عالي الجودة') }}
          </p>
        </div>
      </div>

      <!-- Perk 3: Easy Returns -->
      <div
        class="group relative flex items-start gap-3.5 rounded-2xl border border-mist/70 bg-surface/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-card hover:shadow-subtle"
      >
        <div
          class="flex size-10.5 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 text-gold border border-gold/30 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
        >
          <span class="material-symbols-rounded text-xl">published_with_changes</span>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-ink transition-colors group-hover:text-gold">
            {{ $t('easy_returns', 'استرجاع سهل') }}
          </h4>
          <p class="text-[11px] text-ink-secondary leading-snug">
            {{ $t('easy_returns_desc', 'إمكانية الاستبدال والاسترجاع خلال ١٤ يوماً') }}
          </p>
        </div>
      </div>

      <!-- Perk 4: Secure Payment -->
      <div
        class="group relative flex items-start gap-3.5 rounded-2xl border border-mist/70 bg-surface/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-card hover:shadow-subtle"
      >
        <div
          class="flex size-10.5 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 text-gold border border-gold/30 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
        >
          <span class="material-symbols-rounded text-xl">lock</span>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-ink transition-colors group-hover:text-gold">
            {{ $t('secure_payment', 'دفع آمن') }}
          </h4>
          <p class="text-[11px] text-ink-secondary leading-snug">
            {{ $t('secure_payment_desc', 'بوابات دفع مشفرة وموثوقة') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
