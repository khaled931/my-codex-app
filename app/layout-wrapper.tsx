'use client';

import { useLanguage } from '@/lib/language-context';
import { useEffect } from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { dir } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  }, [dir]);

  return <>{children}</>;
}
