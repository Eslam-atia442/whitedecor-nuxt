export interface AppSettingsDto {
  appNameAr: string;
  appNameEn: string;
  appLogoAr: string;
  appLogoEn: string;
  email: string;
  whatsapp: string;
  phone: string;
  favIcon: string;
  loginBackground: string;
  noDataIcon: string;
  defaultUser: string;
  firebaseKey?: string;
  firebaseSenderId?: string;
  googlePlaces?: string;
  isKilledScreen: '0' | '1' | string;
  termsConditionsEn: string;
  termsConditionsAr: string;
  aboutUsEn: string;
  aboutUsAr: string;
  killScreenTextEn: string;
  killScreenTextAr: string;
  privacyPolicyEn: string;
  privacyPolicyAr: string;
  seoMetaTitleAr: string;
  seoMetaTitleEn: string;
  seoMetaDescriptionAr: string;
  seoMetaDescriptionEn: string;
  seoMetaKeywordsAr: string;
  seoMetaKeywordsEn: string;
}

export interface CountryDto {
  id: string;
  name: string;
  countryCode: string;
  flag: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  whatsappCleanNumber: string;
  email: string;
  googlePlaces?: string;
  formattedDisplayPhone: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type SupportedLocale = 'ar' | 'en';
