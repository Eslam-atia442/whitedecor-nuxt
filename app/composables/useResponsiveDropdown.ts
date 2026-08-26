import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export function useResponsiveDropdown(containerRef: Ref<HTMLElement | null>, mobileBreakpoint = 640) {
  const isOpen = ref(false);
  const isMobile = ref(false);
  const dropdownStyle = ref<Record<string, string>>({});

  const checkMobile = () => {
    if (import.meta.client) {
      isMobile.value = window.innerWidth < mobileBreakpoint;
    }
  };

  const updateDropdownPosition = () => {
    if (!containerRef.value || isMobile.value) {
      dropdownStyle.value = {};
      return;
    }
    dropdownStyle.value = {
      top: '100%',
      left: '0',
      right: '0',
      marginTop: '8px',
    };
  };

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      checkMobile();
      updateDropdownPosition();
    }
  };

  const closeDropdown = () => {
    isOpen.value = false;
  };

  onClickOutside(containerRef, () => {
    if (isOpen.value && !isMobile.value) closeDropdown();
  });

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) closeDropdown();
  };

  onMounted(() => {
    checkMobile();
    if (import.meta.client) {
      window.addEventListener('resize', checkMobile);
      window.addEventListener('keydown', handleEscape);
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleEscape);
    }
  });

  return { isOpen, isMobile, dropdownStyle, toggleDropdown, closeDropdown };
}
