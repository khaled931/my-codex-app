'use client';

import { useLanguage } from '@/lib/language-context';
import { FiGlobe } from 'react-icons/fi';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      aria-label="Toggle language"
    >
      <FiGlobe className="text-lg" />
      <span className="font-medium">{t('language')}</span>
    </button>
  );
}
