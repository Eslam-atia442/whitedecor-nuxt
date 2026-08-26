<template>
  <div class="space-y-8 pb-20 lg:pb-8">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Page Header & Action Bar -->
    <div class="flex items-center justify-between border-b border-mist pb-4">
      <div class="flex items-center gap-3">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
          <span class="material-symbols-rounded text-2xl">shopping_bag</span>
        </div>
        <div class="space-y-1">
          <h1 class="text-2xl sm:text-3xl font-black text-ink">{{ $t('cart_title') }}</h1>
          <p v-if="!store.isEmpty" class="text-xs sm:text-sm text-ink-secondary">
            {{ $t('items_count', { count: store.itemCount }) }}
          </p>
        </div>
      </div>

      <UiButton
        v-if="!store.isEmpty && !store.isLoading"
        variant="outline"
        size="sm"
        class="text-error hover:bg-error/10 border-error/30"
        @click="promptClearCart"
      >
        <span class="material-symbols-rounded text-base">delete_sweep</span>
        <span>{{ $t('clear_cart') }}</span>
      </UiButton>
    </div>

    <!-- Active Orders Banner -->
    <CartPendingOrdersBanner />

    <!-- Loading Skeleton during initial fetch or language switch -->
    <div v-if="store.isLoading" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-4">
      <div class="lg:col-span-8 space-y-4">
        <div v-for="i in 3" :key="i" class="h-28 rounded-2xl bg-mist/40 animate-pulse" />
      </div>
      <div class="lg:col-span-4 h-64 rounded-3xl bg-mist/40 animate-pulse" />
    </div>

    <!-- Empty State -->
    <CartEmptyState v-else-if="store.isEmpty" />

    <!-- Active Cart 12-col Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Cart Items (8 cols) -->
      <div class="lg:col-span-8 space-y-6">
        <CartItemList />

        <div class="flex items-center justify-between pt-4">
          <NuxtLink :to="localePath('/products')" class="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-gold transition-colors">
            <span class="material-symbols-rounded text-lg">arrow_back</span>
            <span>{{ $t('continue_shopping') }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Column: Sticky Summary (4 cols) -->
      <aside class="lg:col-span-4 sticky top-24">
        <CartSummaryCard />
      </aside>
    </div>

    <!-- Mobile Sticky Checkout Bar -->
    <CartStickyBottomBar v-if="!store.isEmpty && !store.isLoading" />

    <!-- Clear Cart Confirmation Modal -->
    <CartClearModal :is-open="isClearModalOpen" @close="isClearModalOpen = false" @confirm="confirmClearCart" />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useCartActions } from '~/composables/useCartActions';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const store = useCartStore();
const { isClearModalOpen, promptClearCart, confirmClearCart } = useCartActions();

useSeo({ title: t('cart_title'), description: t('cart_empty_subtitle'), noIndex: true });
useSchemaOrg([{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t('home'), item: '/' }, { '@type': 'ListItem', position: 2, name: t('cart_title'), item: '/cart' }] }]);

const breadcrumbs = computed(() => [{ label: t('home'), to: localePath('/') }, { label: t('cart_title'), to: localePath('/cart'), isCurrent: true }]);

onMounted(() => { store.fetchCart(); });
watch(locale, () => { store.fetchCart(); });
</script>
