'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { 
  FiSun, FiWind, FiBatteryCharging, FiZap, 
  FiTrendingUp, FiCheckCircle, FiFileText 
} from 'react-icons/fi';

export default function ServicesPage() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: FiSun,
      title: t('home.services.solar'),
      desc: t('home.services.solar.desc'),
      details: language === 'ar'
        ? 'نقدم خدمات تصميم وتقييم أنظمة الطاقة الشمسية الكهروضوئية للمنازل والمنشآت التجارية والصناعية. نساعدك في اختيار الأنظمة المناسبة وتقدير التكاليف والعائد على الاستثمار.'
        : 'We provide solar PV system design and evaluation services for residential, commercial, and industrial facilities. We help you choose the right systems and estimate costs and return on investment.'
    },
    {
      icon: FiWind,
      title: t('home.services.wind'),
      desc: t('home.services.wind.desc'),
      details: language === 'ar'
        ? 'دراسات جدوى تفصيلية لمشاريع طاقة الرياح، تشمل تقييم موارد الرياح والتحليل الفني والمالي.'
        : 'Detailed feasibility studies for wind energy projects, including wind resource assessment and technical-financial analysis.'
    },
    {
      icon: FiBatteryCharging,
      title: t('home.services.storage'),
      desc: t('home.services.storage.desc'),
      details: language === 'ar'
        ? 'استشارات في أنظمة تخزين الطاقة والبطاريات لتحسين استخدام الطاقة المتجددة وتوفير الطاقة الاحتياطية.'
        : 'Consulting on energy storage systems and batteries to optimize renewable energy use and provide backup power.'
    },
    {
      icon: FiZap,
      title: t('home.services.efficiency'),
      desc: t('home.services.efficiency.desc'),
      details: language === 'ar'
        ? 'تدقيق الطاقة وتحديد فرص تحسين الكفاءة وخفض تكاليف الطاقة في المباني والمنشآت.'
        : 'Energy audits and identification of efficiency improvement opportunities to reduce energy costs in buildings and facilities.'
    },
    {
      icon: FiTrendingUp,
      title: t('home.services.sustainability'),
      desc: t('home.services.sustainability.desc'),
      details: language === 'ar'
        ? 'تطوير استراتيجيات الاستدامة البيئية والاجتماعية والحوكمة (ESG) للشركات والمؤسسات.'
        : 'Development of environmental, social, and governance (ESG) sustainability strategies for companies and organizations.'
    },
    {
      icon: FiCheckCircle,
      title: t('home.services.diligence'),
      desc: t('home.services.diligence.desc'),
      details: language === 'ar'
        ? 'تقييم فني ومالي شامل لمشاريع الطاقة المتجددة قبل الاستثمار أو الشراء.'
        : 'Comprehensive technical and financial evaluation of renewable energy projects before investment or purchase.'
    },
    {
      icon: FiFileText,
      title: t('home.services.policy'),
      desc: t('home.services.policy.desc'),
      details: language === 'ar'
        ? 'تحليل السياسات الحكومية وفرص السوق في قطاع الطاقة المتجددة والاستدامة.'
        : 'Analysis of government policies and market opportunities in the renewable energy and sustainability sector.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.intro')}
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <service.icon className="text-3xl text-green-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {service.desc}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {service.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل لديك مشروع أو استفسار؟' : 'Have a project or question?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar'
              ? 'نحن هنا لمساعدتك. أرسل لنا طلبك وسنرد عليك في أقرب وقت.'
              : 'We\'re here to help. Send us your request and we\'ll respond soon.'}
          </p>
          <Link
            href="/submit"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('services.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
