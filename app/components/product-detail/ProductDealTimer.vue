<template>
  <div class="flex items-center gap-1.5 sm:gap-2">
    <!-- Hours -->
    <div class="timer-block">
      <div class="timer-digit-pair">
        <span class="timer-cell" :key="'h0-' + formattedHours[0]">{{ formattedHours[0] }}</span>
        <span class="timer-cell" :key="'h1-' + formattedHours[1]">{{ formattedHours[1] }}</span>
      </div>
      <span class="timer-label">{{ $t('hours_short') }}</span>
    </div>

    <!-- Separator -->
    <div class="timer-separator">
      <span class="timer-dot" />
      <span class="timer-dot" />
    </div>

    <!-- Minutes -->
    <div class="timer-block">
      <div class="timer-digit-pair">
        <span class="timer-cell" :key="'m0-' + formattedMinutes[0]">{{ formattedMinutes[0] }}</span>
        <span class="timer-cell" :key="'m1-' + formattedMinutes[1]">{{ formattedMinutes[1] }}</span>
      </div>
      <span class="timer-label">{{ $t('mins_short') }}</span>
    </div>

    <!-- Separator -->
    <div class="timer-separator">
      <span class="timer-dot" />
      <span class="timer-dot" />
    </div>

    <!-- Seconds -->
    <div class="timer-block">
      <div class="timer-digit-pair">
        <span class="timer-cell timer-cell--active" :key="'s0-' + formattedSeconds[0]">{{ formattedSeconds[0] }}</span>
        <span class="timer-cell timer-cell--active" :key="'s1-' + formattedSeconds[1]">{{ formattedSeconds[1] }}</span>
      </div>
      <span class="timer-label">{{ $t('secs_short') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    seconds: number;
  }>(),
  {
    seconds: 0,
  }
);

const hours = computed(() => Math.floor(props.seconds / 3600));
const minutes = computed(() => Math.floor((props.seconds % 3600) / 60));
const secs = computed(() => props.seconds % 60);

const formattedHours = computed(() => String(hours.value).padStart(2, '0'));
const formattedMinutes = computed(() => String(minutes.value).padStart(2, '0'));
const formattedSeconds = computed(() => String(secs.value).padStart(2, '0'));
</script>

<style scoped>
.timer-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.timer-digit-pair {
  display: flex;
  gap: 3px;
}

.timer-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 36px;
  border-radius: 10px;
  background: rgba(var(--color-card-rgb), 1);
  border: 1px solid rgba(var(--color-mist-rgb), 1);
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace;
  font-size: 16px;
  font-weight: 800;
  color: rgb(var(--color-gold-rgb));
  line-height: 1;
  font-variant-numeric: tabular-nums;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  animation: cellAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Active seconds cells get a subtle glow */
.timer-cell--active {
  border-color: rgba(var(--color-gold-rgb), 0.3);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 12px rgba(var(--color-gold-rgb), 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: cellTick 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Mid-line divider for flip effect */
.timer-cell::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(var(--color-mist-rgb), 0.5);
  pointer-events: none;
}

.timer-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding-bottom: 16px;
}

.timer-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgb(var(--color-gold-rgb));
  opacity: 0.7;
  animation: dotPulse 1s ease-in-out infinite;
}

.timer-dot:last-child {
  animation-delay: 0.5s;
}

.timer-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--color-text-secondary-rgb), 0.7);
}

@keyframes cellTick {
  0% {
    transform: scaleY(0.85);
    opacity: 0.6;
  }
  50% {
    transform: scaleY(1.02);
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes cellAppear {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* Dark mode adjustments */
:root.dark .timer-cell,
.dark .timer-cell {
  background: rgba(var(--color-card-rgb), 0.8);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

:root.dark .timer-cell::after,
.dark .timer-cell::after {
  background: rgba(var(--color-mist-rgb), 0.3);
}

/* Responsive sizing */
@media (min-width: 640px) {
  .timer-cell {
    width: 34px;
    height: 42px;
    font-size: 18px;
    border-radius: 12px;
  }

  .timer-label {
    font-size: 10px;
  }

  .timer-separator {
    gap: 8px;
    padding-bottom: 20px;
  }

  .timer-dot {
    width: 5px;
    height: 5px;
  }
}
</style>
