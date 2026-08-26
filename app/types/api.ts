export interface ApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  data: T;
  code?: number;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  firstError?: string;
  statusCode?: number;
}

export interface SettingsRawItem {
  key: string;
  value: string | null;
}
