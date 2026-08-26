export interface UserDto {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  gender?: 'male' | 'female' | string | null;
  dob?: string | null;
  country_id?: string | number | null;
  device_type?: string | null;
  device_id?: string | null;
  access_token?: string | null;
  created_at?: string;
  updated_at?: string;
  is_active?: string | boolean | null;
  is_biometric?: boolean;
  avatar?: string | null;
  register_by_social?: boolean;
  social_type_provider?: 'google' | 'apple' | string | null;
  phone_verified_at?: string | null;
}

export interface ValidationErrorsDto {
  [field: string]: string[];
}

export interface AuthResponseDto {
  status: boolean | number;
  message?: string;
  data: {
    user?: UserDto;
    access_token?: string;
    token?: string;
  } | UserDto;
  errors?: ValidationErrorsDto;
}

export interface LoginRequestDto {
  phone: string;
  password: string;
  country_id: string | number;
  device_type?: string;
  device_id?: string;
  email?: string;
}

export interface RegisterRequestDto {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  country_id: string | number;
  email?: string;
  gender?: string;
  dob?: string;
  device_type?: string;
  device_id?: string;
}

export interface ForgotPasswordRequestDto {
  phone: string;
  country_id: string | number;
}

export interface ResetPasswordRequestDto {
  phone: string;
  country_id: string | number;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyOtpRequestDto {
  phone: string;
  country_id: string | number;
  code: string;
}

export interface ResendCodeRequestDto {
  phone: string;
  country_id: string | number;
}

export interface SocialLoginRequestDto {
  social_type: 'google' | 'apple';
  social_token: string;
  email: string;
}

export interface SocialRegisterRequestDto {
  social_type: 'google' | 'apple';
  social_token: string;
  email: string;
  name: string;
  country_id?: string | number | null;
  gender?: string;
  dob?: string;
}

export interface CountryCodeDto {
  id: string | number;
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}
