<template>
  <form
    v-if="route.path !== localePath('/search')"
    class="hidden min-w-0 max-w-xs flex-1 lg:block"
    @submit.prevent="goSearch"
  >
    <UiInput
      id="header-search"
      v-model="term"
      type="search"
      :placeholder="$t('search_hint')"
      autocomplete="off"
    >
      <template #leading>
        <span class="material-symbols-rounded text-lg text-gold">search</span>
      </template>
    </UiInput>
  </form>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const term = ref('');

const goSearch = () => {
  const search = term.value.trim();
  router.push({
    path: localePath('/search'),
    query: search ? { search } : {},
  });
  term.value = '';
};
</script>
