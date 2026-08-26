import type { NavItemConfig } from '~/types/navigation';

export const useShellNavigation = () => {
  const authStore = useAuthStore();
  const { push } = useLocalizedPath();
  const { t } = useI18n();
  const toast = useToaster();

  const handleNavClick = (item: NavItemConfig) => {
    if (item.requiresAuth && !authStore.isAuthenticated) {
      if (item.key === 'orders') {
        toast.info(t('orders_auth_required_toast'));
        push('/register?redirect=/orders');
        return;
      }
      push(item.authFallbackRoute || '/login');
      return;
    }
    push(item.route);
  };

  return { handleNavClick };
};
