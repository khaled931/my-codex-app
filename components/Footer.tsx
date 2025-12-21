'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">
              {t('site.name')}
            </h3>
            <p className="text-gray-400">
              {t('site.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav.home')}</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                {t('nav.services')}
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/submit" className="text-gray-400 hover:text-white transition-colors">
                {t('nav.submit')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <p className="text-gray-400">
              {t('footer.email')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} {t('site.name')}. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
