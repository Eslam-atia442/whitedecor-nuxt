export interface NotificationDto {
  id: string;
  title: string;
  body: string;
  model_type?: string | null;
  model_id?: string | number | null;
  event?: string | null;
  status?: string | null;
  order_num?: string | null;
  slug?: string | null;
  extra?: Record<string, unknown>;
  is_read: boolean;
  created_at?: string | null;
  created_at_human?: string | null;
}

export interface NotificationPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface NotificationsListData {
  notifications?: NotificationDto[] | { data?: NotificationDto[] };
  unread_count?: number;
  pagination?: NotificationPagination;
}

export interface NotificationPathInput {
  model_type?: string | null;
  model_id?: string | number | null;
  order_num?: string | null;
  slug?: string | null;
  id?: string | null;
  notification_id?: string | null;
}

export type NotificationsStatus = 'idle' | 'loading' | 'success' | 'error';
