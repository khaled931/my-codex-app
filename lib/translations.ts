import { Language } from '@/types';

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Common
    'site.name': 'Syrian Renewables',
    'site.tagline': 'خبراء الطاقة المتجددة والاستدامة في سوريا',
    'language': 'English',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.submit': 'إرسال طلب',
    
    // Home Page
    'home.hero.title': 'خبراء الطاقة المتجددة والاستدامة',
    'home.hero.subtitle': 'نقدم استشارات متخصصة في الطاقة المتجددة والاستدامة للأفراد والشركات في سوريا',
    'home.hero.cta': 'إرسال طلب استشارة',
    
    // Services Section
    'home.services.title': 'خدماتنا',
    'home.services.solar': 'الطاقة الشمسية الكهروضوئية',
    'home.services.solar.desc': 'تصميم وتقييم أنظمة الطاقة الشمسية',
    'home.services.wind': 'طاقة الرياح',
    'home.services.wind.desc': 'دراسات جدوى مشاريع طاقة الرياح',
    'home.services.storage': 'أنظمة التخزين',
    'home.services.storage.desc': 'حلول تخزين الطاقة والبطاريات',
    'home.services.efficiency': 'كفاءة الطاقة',
    'home.services.efficiency.desc': 'تحسين استهلاك الطاقة وخفض التكاليف',
    'home.services.sustainability': 'الاستدامة وESG',
    'home.services.sustainability.desc': 'استراتيجيات الاستدامة البيئية والحوكمة',
    'home.services.diligence': 'العناية الواجبة للمشاريع',
    'home.services.diligence.desc': 'تقييم فني ومالي للمشاريع',
    'home.services.policy': 'السياسات والأسواق',
    'home.services.policy.desc': 'تحليل السياسات وفرص السوق',
    
    // How It Works
    'home.how.title': 'كيف نعمل',
    'home.how.step1': 'أرسل طلبك',
    'home.how.step1.desc': 'املأ النموذج بسؤالك أو مشكلتك',
    'home.how.step2': 'نراجع طلبك',
    'home.how.step2.desc': 'فريقنا يدرس احتياجاتك بعناية',
    'home.how.step3': 'نرد عليك',
    'home.how.step3.desc': 'نقدم استشارة متخصصة ومفصلة',
    
    // Trust Section
    'home.trust.title': 'لماذا تثق بنا',
    'home.trust.expertise': 'خبرة قائمة على البيانات',
    'home.trust.expertise.desc': 'تحليلات علمية دقيقة لكل مشروع',
    'home.trust.local': 'معرفة محلية عميقة',
    'home.trust.local.desc': 'فهم شامل للسياق السوري',
    'home.trust.professional': 'احترافية في التنفيذ',
    'home.trust.professional.desc': 'جودة عالية في الاستشارات والتقارير',
    
    // Submit Page
    'submit.title': 'إرسال طلب استشارة',
    'submit.subtitle': 'املأ النموذج أدناه وسنرد عليك في أقرب وقت',
    'submit.name': 'الاسم الكامل (اختياري)',
    'submit.phone': 'رقم الهاتف (اختياري)',
    'submit.email': 'البريد الإلكتروني (اختياري)',
    'submit.city': 'المدينة (اختياري)',
    'submit.city.select': 'اختر المدينة',
    'submit.image': 'إرفاق صورة (اختياري)',
    'submit.image.help': 'JPG, PNG, WEBP - حتى 10 ميغابايت',
    'submit.message': 'رسالتك أو استفسارك (مطلوب)',
    'submit.message.placeholder': 'اكتب سؤالك أو وصف مشكلتك بالتفصيل...',
    'submit.privacy': 'نستخدم معلوماتك فقط للرد على طلبك. لن نشارك بياناتك مع أطراف ثالثة.',
    'submit.button': 'إرسال الطلب',
    'submit.sending': 'جاري الإرسال...',
    'submit.success.title': 'تم إرسال طلبك بنجاح!',
    'submit.success.reference': 'رقم المرجع',
    'submit.success.message': 'سنراجع طلبك ونرد عليك في أقرب وقت ممكن.',
    'submit.success.new': 'إرسال طلب جديد',
    'submit.error': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    
    // Services Page
    'services.title': 'خدماتنا الاستشارية',
    'services.intro': 'نقدم مجموعة شاملة من الخدمات الاستشارية في مجال الطاقة المتجددة والاستدامة',
    'services.cta': 'احصل على استشارة',
    
    // About Page
    'about.title': 'من نحن',
    'about.intro': 'Syrian Renewables هي شركة استشارية متخصصة في مجال الطاقة المتجددة والاستدامة',
    'about.mission': 'نساعد الأفراد والشركات في سوريا على الاستفادة من حلول الطاقة النظيفة وتحقيق أهداف الاستدامة',
    'about.cta': 'تواصل معنا',
    
    // Admin
    'admin.title': 'لوحة التحكم',
    'admin.requests': 'طلبات الاستشارة',
    'admin.status.new': 'جديد',
    'admin.status.in_review': 'قيد المراجعة',
    'admin.status.replied': 'تم الرد',
    'admin.status.closed': 'مغلق',
    'admin.date': 'التاريخ',
    'admin.name': 'الاسم',
    'admin.contact': 'الاتصال',
    'admin.city': 'المدينة',
    'admin.message': 'الرسالة',
    'admin.attachment': 'مرفق',
    'admin.notes': 'ملاحظات',
    'admin.notes.placeholder': 'ملاحظات داخلية...',
    'admin.save': 'حفظ',
    'admin.view': 'عرض',
    'admin.download': 'تحميل',
    
    // Footer
    'footer.contact': 'للتواصل',
    'footer.email': 'info@syrianrenewables.com',
    'footer.rights': 'جميع الحقوق محفوظة',
  },
  en: {
    // Common
    'site.name': 'Syrian Renewables',
    'site.tagline': 'Energy & Sustainability Experts in Syria',
    'language': 'العربية',
    
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.submit': 'Submit Request',
    
    // Home Page
    'home.hero.title': 'Renewable Energy & Sustainability Experts',
    'home.hero.subtitle': 'We provide specialized consulting in renewable energy and sustainability for individuals and businesses in Syria',
    'home.hero.cta': 'Submit Consultation Request',
    
    // Services Section
    'home.services.title': 'Our Services',
    'home.services.solar': 'Solar PV',
    'home.services.solar.desc': 'Solar system design and evaluation',
    'home.services.wind': 'Wind Energy',
    'home.services.wind.desc': 'Wind project feasibility studies',
    'home.services.storage': 'Energy Storage',
    'home.services.storage.desc': 'Battery and storage solutions',
    'home.services.efficiency': 'Energy Efficiency',
    'home.services.efficiency.desc': 'Optimize consumption and reduce costs',
    'home.services.sustainability': 'Sustainability & ESG',
    'home.services.sustainability.desc': 'Environmental and governance strategies',
    'home.services.diligence': 'Project Due Diligence',
    'home.services.diligence.desc': 'Technical and financial assessment',
    'home.services.policy': 'Policy & Market',
    'home.services.policy.desc': 'Policy analysis and market opportunities',
    
    // How It Works
    'home.how.title': 'How It Works',
    'home.how.step1': 'Submit Your Request',
    'home.how.step1.desc': 'Fill the form with your question or problem',
    'home.how.step2': 'We Review',
    'home.how.step2.desc': 'Our team carefully studies your needs',
    'home.how.step3': 'We Respond',
    'home.how.step3.desc': 'Detailed professional consultation provided',
    
    // Trust Section
    'home.trust.title': 'Why Trust Us',
    'home.trust.expertise': 'Data-Driven Expertise',
    'home.trust.expertise.desc': 'Scientific analysis for every project',
    'home.trust.local': 'Deep Local Knowledge',
    'home.trust.local.desc': 'Comprehensive understanding of Syrian context',
    'home.trust.professional': 'Professional Delivery',
    'home.trust.professional.desc': 'High quality consultations and reports',
    
    // Submit Page
    'submit.title': 'Submit Consultation Request',
    'submit.subtitle': 'Fill the form below and we\'ll get back to you soon',
    'submit.name': 'Full Name (optional)',
    'submit.phone': 'Phone Number (optional)',
    'submit.email': 'Email Address (optional)',
    'submit.city': 'City (optional)',
    'submit.city.select': 'Select City',
    'submit.image': 'Attach Image (optional)',
    'submit.image.help': 'JPG, PNG, WEBP - up to 10MB',
    'submit.message': 'Your Message or Inquiry (required)',
    'submit.message.placeholder': 'Describe your question or problem in detail...',
    'submit.privacy': 'We use your information only to respond to your request. We will not share your data with third parties.',
    'submit.button': 'Submit Request',
    'submit.sending': 'Sending...',
    'submit.success.title': 'Request Submitted Successfully!',
    'submit.success.reference': 'Reference Number',
    'submit.success.message': 'We will review your request and respond as soon as possible.',
    'submit.success.new': 'Submit New Request',
    'submit.error': 'An error occurred. Please try again.',
    
    // Services Page
    'services.title': 'Our Consulting Services',
    'services.intro': 'We offer a comprehensive range of consulting services in renewable energy and sustainability',
    'services.cta': 'Get Consultation',
    
    // About Page
    'about.title': 'About Us',
    'about.intro': 'Syrian Renewables is a consulting firm specialized in renewable energy and sustainability',
    'about.mission': 'We help individuals and businesses in Syria benefit from clean energy solutions and achieve sustainability goals',
    'about.cta': 'Contact Us',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.requests': 'Consultation Requests',
    'admin.status.new': 'New',
    'admin.status.in_review': 'In Review',
    'admin.status.replied': 'Replied',
    'admin.status.closed': 'Closed',
    'admin.date': 'Date',
    'admin.name': 'Name',
    'admin.contact': 'Contact',
    'admin.city': 'City',
    'admin.message': 'Message',
    'admin.attachment': 'Attachment',
    'admin.notes': 'Notes',
    'admin.notes.placeholder': 'Internal notes...',
    'admin.save': 'Save',
    'admin.view': 'View',
    'admin.download': 'Download',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.email': 'info@syrianrenewables.com',
    'footer.rights': 'All Rights Reserved',
  },
};

export function translate(lang: Language, key: string): string {
  return translations[lang][key] || key;
}
