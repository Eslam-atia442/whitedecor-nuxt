export interface NavItemConfig {
  key: string;
  labelKey: string;
  route: string;
  icon: string;
  activeIcon: string;
  badgeKey?: 'cart' | 'orders';
  requiresAuth?: boolean;
  authFallbackRoute?: string;
}
