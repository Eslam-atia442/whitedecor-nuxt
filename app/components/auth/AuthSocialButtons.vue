<template>
  <div class="space-y-4">
    <!-- Divider -->
    <div class="relative flex items-center justify-center">
      <div class="w-full border-t border-mist" />
      <span class="absolute bg-card px-3 text-xs font-semibold uppercase text-ink-secondary">
        {{ $t('or') }}
      </span>
    </div>

    <!-- Social Action Buttons -->
    <div class="grid grid-cols-2 gap-3">
      <!-- Google Sign In -->
      <button
        type="button"
        :disabled="isLoading"
        class="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-mist bg-card px-4 text-xs font-bold text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/5 active:scale-[0.98] disabled:opacity-50"
        @click="onGoogleSignIn"
      >
        <svg class="size-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
          <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z" />
          <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z" />
        </svg>
        <span>{{ $t('google') }}</span>
      </button>

      <!-- Apple Sign In -->
      <button
        type="button"
        :disabled="isLoading"
        class="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-mist bg-card px-4 text-xs font-bold text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/5 active:scale-[0.98] disabled:opacity-50"
        @click="onAppleSignIn"
      >
        <svg class="size-4 shrink-0 fill-current" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.72-13.98-5.77-8.8-10.39-18.73-13.86-29.77-3.48-11.05-5.22-21.78-5.22-32.22 0-14.12 3.59-25.75 10.76-34.89 7.18-9.14 16.2-13.78 27.06-13.93 4.8 0 10.12 1.25 15.98 3.75 5.86 2.5 9.79 3.79 11.8 3.87 1.63 0 5.66-1.33 12.09-3.99 6.42-2.67 11.84-3.88 16.27-3.63 12.08.64 21.6 4.96 28.56 12.97-10.76 6.53-16.03 15.54-15.82 27.04.22 9.04 3.65 16.71 10.3 23.02 6.64 6.31 14.61 9.95 23.9 10.92-2.29 6.86-4.8 13.3-7.53 19.33zm-38.16-105.7c0-6.19 2.3-12.08 6.9-17.67 4.6-5.59 10.4-9.36 17.41-11.31.21 1.74.32 3.26.32 4.56 0 6.08-2.4 12.08-7.2 18-4.8 5.92-10.74 9.61-17.43 11.08z" />
        </svg>
        <span>{{ $t('apple') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const { isLoading } = useAuthFlow();
const { t } = useI18n();

const onGoogleSignIn = () => {
  toast.info(t('feature_not_available'));
};

const onAppleSignIn = () => {
  toast.info(t('feature_not_available'));
};
</script>
