import type { UserDto } from './auth';

export type ProfileTabId = 'personal' | 'security' | 'addresses' | 'preferences';

export interface UpdateProfilePayload {
  name: string;
  email?: string | null;
  phone?: string;
  gender?: string | null;
  dob?: string | null;
  country_id?: string | number | null;
  avatar?: File | null;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface AddressDto {
  id: string;
  title: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  is_default: boolean;
  country_id?: string | number;
}

export interface ProfileValidationErrors {
  name?: string[];
  email?: string[];
  phone?: string[];
  avatar?: string[];
  old_password?: string[];
  new_password?: string[];
  new_password_confirmation?: string[];
  [field: string]: string[] | undefined;
}

export interface ProfileStatItem {
  id: 'cart' | 'orders' | 'favorites';
  labelKey: string;
  count: number;
  route: string;
  icon: string;
}

export interface ProfileTabItem {
  id: ProfileTabId;
  labelKey: string;
  icon: string;
}

export type { UserDto };
