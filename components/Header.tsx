'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import LanguageToggle from './LanguageToggle';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-green-600">
              {t('site.name')}
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/services"
              className={`font-medium transition-colors ${
                isActive('/services') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {t('nav.submit')}
            </Link>
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
          <Link
            href="/"
            className={`font-medium px-3 py-2 rounded ${
              isActive('/') ? 'bg-green-50 text-green-600' : 'text-gray-700'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/services"
            className={`font-medium px-3 py-2 rounded ${
              isActive('/services') ? 'bg-green-50 text-green-600' : 'text-gray-700'
            }`}
          >
            {t('nav.services')}
          </Link>
          <Link
            href="/about"
            className={`font-medium px-3 py-2 rounded ${
              isActive('/about') ? 'bg-green-50 text-green-600' : 'text-gray-700'
            }`}
          >
            {t('nav.about')}
          </Link>
          <Link
            href="/submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
          >
            {t('nav.submit')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
