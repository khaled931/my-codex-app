'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              {t('about.intro')}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t('about.mission')}
            </p>

            {language === 'ar' ? (
              <>
                <p className="text-gray-700 leading-relaxed mb-6">
                  نحن فريق من المهندسين والمستشارين المتخصصين في مجال الطاقة المتجددة والاستدامة،
                  مع خبرة عميقة في السوق السوري والمنطقة. نقدم استشارات مهنية قائمة على البيانات
                  والتحليل العلمي الدقيق.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  رؤيتنا هي المساهمة في تحول الطاقة في سوريا من خلال تمكين الأفراد والشركات
                  من اتخاذ قرارات مستنيرة حول الطاقة المتجددة والاستدامة.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We are a team of engineers and consultants specialized in renewable energy and sustainability,
                  with deep expertise in the Syrian market and region. We provide professional consulting based
                  on data and precise scientific analysis.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Our vision is to contribute to Syria&apos;s energy transition by empowering individuals and
                  businesses to make informed decisions about renewable energy and sustainability.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <FiTarget className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'رؤية واضحة' : 'Clear Vision'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar'
                  ? 'نهدف لتحقيق مستقبل طاقة مستدامة في سوريا'
                  : 'Aiming for a sustainable energy future in Syria'}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <FiUsers className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'فريق متخصص' : 'Expert Team'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar'
                  ? 'مهندسون ومستشارون ذوو خبرة عالية'
                  : 'Highly experienced engineers and consultants'}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <FiAward className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'جودة عالية' : 'High Quality'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar'
                  ? 'استشارات احترافية قائمة على البيانات'
                  : 'Professional data-driven consulting'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'ابدأ مشروعك معنا' : 'Start Your Project With Us'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {language === 'ar'
                ? 'نحن جاهزون لمساعدتك في تحقيق أهدافك في الطاقة المتجددة والاستدامة'
                : 'We&apos;re ready to help you achieve your renewable energy and sustainability goals'}
            </p>
            <Link
              href="/submit"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('about.cta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
