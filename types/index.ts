export type Language = 'ar' | 'en';

export type ConsultationStatus = 'new' | 'in_review' | 'replied' | 'closed';

export interface ConsultationRequest {
  id: string;
  created_at: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  message: string;
  image_url: string | null;
  status: ConsultationStatus;
  admin_notes: string | null;
}

export interface City {
  value: string;
  label_ar: string;
  label_en: string;
}

export const SYRIAN_CITIES: City[] = [
  { value: 'damascus', label_ar: 'دمشق', label_en: 'Damascus' },
  { value: 'aleppo', label_ar: 'حلب', label_en: 'Aleppo' },
  { value: 'homs', label_ar: 'حمص', label_en: 'Homs' },
  { value: 'hama', label_ar: 'حماة', label_en: 'Hama' },
  { value: 'latakia', label_ar: 'اللاذقية', label_en: 'Latakia' },
  { value: 'tartus', label_ar: 'طرطوس', label_en: 'Tartus' },
  { value: 'idlib', label_ar: 'إدلب', label_en: 'Idlib' },
  { value: 'deir_ez_zor', label_ar: 'دير الزور', label_en: 'Deir ez-Zor' },
  { value: 'raqqa', label_ar: 'الرقة', label_en: 'Raqqa' },
  { value: 'hasakah', label_ar: 'الحسكة', label_en: 'Hasakah' },
  { value: 'daraa', label_ar: 'درعا', label_en: 'Daraa' },
  { value: 'suwayda', label_ar: 'السويداء', label_en: 'Suwayda' },
  { value: 'quneitra', label_ar: 'القنيطرة', label_en: 'Quneitra' },
  { value: 'rif_dimashq', label_ar: 'ريف دمشق', label_en: 'Rif Dimashq' },
];
