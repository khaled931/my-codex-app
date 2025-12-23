'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { 
  FiSun, FiWind, FiBatteryCharging, FiZap, 
  FiTrendingUp, FiCheckCircle, FiFileText 
} from 'react-icons/fi';

export default function Home() {
  const { t } = useLanguage();

  const services = [
    { icon: FiSun, title: t('home.services.solar'), desc: t('home.services.solar.desc') },
    { icon: FiWind, title: t('home.services.wind'), desc: t('home.services.wind.desc') },
    { icon: FiBatteryCharging, title: t('home.services.storage'), desc: t('home.services.storage.desc') },
    { icon: FiZap, title: t('home.services.efficiency'), desc: t('home.services.efficiency.desc') },
    { icon: FiTrendingUp, title: t('home.services.sustainability'), desc: t('home.services.sustainability.desc') },
    { icon: FiCheckCircle, title: t('home.services.diligence'), desc: t('home.services.diligence.desc') },
    { icon: FiFileText, title: t('home.services.policy'), desc: t('home.services.policy.desc') },
  ];

  const howItWorks = [
    { step: '1', title: t('home.how.step1'), desc: t('home.how.step1.desc') },
    { step: '2', title: t('home.how.step2'), desc: t('home.how.step2.desc') },
    { step: '3', title: t('home.how.step3'), desc: t('home.how.step3.desc') },
  ];

  const trustPoints = [
    { title: t('home.trust.expertise'), desc: t('home.trust.expertise.desc') },
    { title: t('home.trust.local'), desc: t('home.trust.local.desc') },
    { title: t('home.trust.professional'), desc: t('home.trust.professional.desc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {t('home.hero.subtitle')}
            </p>
            <Link
              href="/submit"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('home.hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <service.icon className="text-4xl text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.how.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.trust.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

