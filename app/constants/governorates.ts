// constants/governorates.ts
// [FLUTTER CONCEPT]: Ported directly from white_decor/lib/features/checkout/data/models/egypt_governorates.dart

export interface GovernorateDto {
  id: string;
  nameAr: string;
  nameEn: string;
  shippingFee: number;
}

export const EGYPT_GOVERNORATES: GovernorateDto[] = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', shippingFee: 50 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', shippingFee: 50 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', shippingFee: 60 },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', shippingFee: 60 },
  { id: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', shippingFee: 65 },
  { id: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', shippingFee: 65 },
  { id: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', shippingFee: 65 },
  { id: 'monufia', nameAr: 'المنوفية', nameEn: 'Monufia', shippingFee: 65 },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', shippingFee: 65 },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', shippingFee: 65 },
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', shippingFee: 65 },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', shippingFee: 65 },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', shippingFee: 65 },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', shippingFee: 65 },
  { id: 'faiyum', nameAr: 'الفيوم', nameEn: 'Faiyum', shippingFee: 75 },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', shippingFee: 75 },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', shippingFee: 80 },
  { id: 'asyut', nameAr: 'أسيوط', nameEn: 'Asyut', shippingFee: 80 },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', shippingFee: 85 },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', shippingFee: 85 },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', shippingFee: 90 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', shippingFee: 90 },
  { id: 'red_sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', shippingFee: 100 },
  { id: 'new_valley', nameAr: 'الوادي الجديد', nameEn: 'New Valley', shippingFee: 100 },
  { id: 'matrouh', nameAr: 'مطروح', nameEn: 'Matrouh', shippingFee: 100 },
  { id: 'north_sinai', nameAr: 'شمال سيناء', nameEn: 'North Sinai', shippingFee: 100 },
  { id: 'south_sinai', nameAr: 'جنوب سيناء', nameEn: 'South Sinai', shippingFee: 100 },
];

export const findGovernorate = (idOrName?: string | null): GovernorateDto | undefined => {
  if (!idOrName) return undefined;
  const q = idOrName.trim().toLowerCase();
  return EGYPT_GOVERNORATES.find(
    (g) => g.id === q || g.nameAr === idOrName.trim() || g.nameEn.toLowerCase() === q,
  );
};

export const getGovernorateShippingFee = (idOrName?: string | null): number => {
  const gov = findGovernorate(idOrName);
  return gov ? gov.shippingFee : 50; // Default fallback to 50 EGP
};

