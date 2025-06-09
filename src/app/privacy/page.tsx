"use client";

import Link from "next/link";
import { useLanguageToggle } from "@/lib/store";
import { getLocalizedText } from "@/lib/utils";

export default function PrivacyPage() {
  const { language, toggleLanguage } = useLanguageToggle();

  const sections = [
    {
      title: "Information We Collect",
      titleArabic: "المعلومات التي نجمعها",
      content:
        "We collect information you provide directly to us, such as when you create an account, apply for services, or contact us for support. This includes personal identification information, contact details, and service-related documentation.",
      contentArabic:
        "نحن نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب أو التقدم للخدمات أو الاتصال بنا للحصول على الدعم. يشمل ذلك معلومات التعريف الشخصية وتفاصيل الاتصال والوثائق المتعلقة بالخدمة.",
    },
    {
      title: "How We Use Your Information",
      titleArabic: "كيف نستخدم معلوماتك",
      content:
        "We use the information we collect to provide, maintain, and improve our services, process applications, verify identities, communicate with you, and comply with legal obligations as required by Lebanese law.",
      contentArabic:
        "نحن نستخدم المعلومات التي نجمعها لتوفير وصيانة وتحسين خدماتنا، ومعالجة الطلبات، والتحقق من الهويات، والتواصل معك، والامتثال للالتزامات القانونية كما يتطلبه القانون اللبناني.",
    },
    {
      title: "Information Sharing and Disclosure",
      titleArabic: "مشاركة المعلومات والكشف عنها",
      content:
        "We do not sell, trade, or rent your personal information to third parties. We may share information only as required by Lebanese law, for legitimate government purposes, or with your explicit consent.",
      contentArabic:
        "نحن لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك المعلومات فقط كما يتطلبه القانون اللبناني، أو لأغراض حكومية مشروعة، أو بموافقتك الصريحة.",
    },
    {
      title: "Data Security",
      titleArabic: "أمان البيانات",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest using industry-standard protocols.",
      contentArabic:
        "نحن ننفذ التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. جميع البيانات مشفرة أثناء النقل والتخزين باستخدام بروتوكولات متوافقة مع معايير الصناعة.",
    },
    {
      title: "Your Rights",
      titleArabic: "حقوقك",
      content:
        "You have the right to access, update, correct, or delete your personal information. You may also request a copy of your data or ask us to restrict processing in certain circumstances, subject to Lebanese data protection regulations.",
      contentArabic:
        "لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها وتصحيحها أو حذفها. يمكنك أيضاً طلب نسخة من بياناتك أو مطالبتنا بتقييد المعالجة في ظروف معينة، وفقاً للوائح حماية البيانات اللبنانية.",
    },
    {
      title: "Cookies and Tracking",
      titleArabic: "ملفات تعريف الارتباط والتتبع",
      content:
        "We use cookies and similar technologies to enhance your experience, maintain your session, and analyze usage patterns. You can control cookie settings through your browser preferences.",
      contentArabic:
        "نحن نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك، والحفاظ على جلستك، وتحليل أنماط الاستخدام. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح الخاص بك.",
    },
  ];

  const dataTypes = [
    {
      category: "Personal Information",
      categoryArabic: "المعلومات الشخصية",
      items: ["Full name", "National ID number", "Date of birth", "Address"],
      itemsArabic: [
        "الاسم الكامل",
        "رقم الهوية الوطنية",
        "تاريخ الميلاد",
        "العنوان",
      ],
    },
    {
      category: "Contact Information",
      categoryArabic: "معلومات الاتصال",
      items: ["Phone number", "Email address", "Mailing address"],
      itemsArabic: ["رقم الهاتف", "عنوان البريد الإلكتروني", "عنوان البريد"],
    },
    {
      category: "Service Data",
      categoryArabic: "بيانات الخدمة",
      items: [
        "Application forms",
        "Supporting documents",
        "Payment information",
      ],
      itemsArabic: ["نماذج الطلبات", "الوثائق الداعمة", "معلومات الدفع"],
    },
    {
      category: "Technical Data",
      categoryArabic: "البيانات التقنية",
      items: ["IP address", "Browser type", "Device information", "Usage logs"],
      itemsArabic: [
        "عنوان IP",
        "نوع المتصفح",
        "معلومات الجهاز",
        "سجلات الاستخدام",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language.code === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "كيف نحمي ونستخدم معلوماتك الشخصية"
                    : "How we protect and use your personal information"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button onClick={toggleLanguage} className="btn-secondary">
                  {language.code === "ar" ? "English" : "العربية"}
                </button>

                <Link href="/dashboard" className="btn-primary">
                  {language.code === "ar" ? "لوحة التحكم" : "Dashboard"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language.code === "ar"
              ? "التزامنا بالخصوصية"
              : "Our Commitment to Privacy"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {language.code === "ar"
              ? "تلتزم الحكومة اللبنانية بحماية خصوصية مواطنيها وبياناتهم الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتكم الشخصية عند استخدام البوابة الرقمية الحكومية."
              : "The Lebanese Government is committed to protecting the privacy and personal data of its citizens. This policy explains how we collect, use, and protect your personal information when using the government digital portal."}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              {language.code === "ar" ? "آخر تحديث: " : "Last updated: "}
              {new Date().toLocaleDateString(
                language.code === "ar" ? "ar-LB" : "en-US"
              )}
            </p>
          </div>
        </div>

        {/* Data Collection Overview */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {language.code === "ar"
              ? "أنواع البيانات المجمعة"
              : "Types of Data Collected"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((category, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  {getLocalizedText(
                    category.category,
                    category.categoryArabic,
                    language
                  )}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      {language.code === "ar"
                        ? category.itemsArabic[itemIndex]
                        : item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {getLocalizedText(section.title, section.titleArabic, language)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedText(
                  section.content,
                  section.contentArabic,
                  language
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Security Measures */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-green-900 mb-4">
            {language.code === "ar" ? "التدابير الأمنية" : "Security Measures"}
          </h3>
          <div className="text-green-800 space-y-4">
            <p>
              {language.code === "ar"
                ? "نحن نستخدم أحدث التقنيات الأمنية لحماية بياناتكم:"
                : "We use the latest security technologies to protect your data:"}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {language.code === "ar"
                  ? "تشفير SSL/TLS لجميع عمليات نقل البيانات"
                  : "SSL/TLS encryption for all data transmissions"}
              </li>
              <li>
                {language.code === "ar"
                  ? "مراقبة أمنية على مدار الساعة"
                  : "24/7 security monitoring"}
              </li>
              <li>
                {language.code === "ar"
                  ? "تدقيق منتظم للأنظمة الأمنية"
                  : "Regular security audits"}
              </li>
              <li>
                {language.code === "ar"
                  ? "الوصول المحدود للبيانات حسب الحاجة"
                  : "Limited data access on a need-to-know basis"}
              </li>
              <li>
                {language.code === "ar"
                  ? "النسخ الاحتياطي المنتظم للبيانات"
                  : "Regular data backups"}
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {language.code === "ar"
              ? "تواصل معنا حول الخصوصية"
              : "Contact Us About Privacy"}
          </h3>
          <p className="text-gray-700 mb-4">
            {language.code === "ar"
              ? "إذا كان لديكم أي أسئلة حول سياسة الخصوصية أو تريدون ممارسة حقوقكم في البيانات:"
              : "If you have any questions about this Privacy Policy or want to exercise your data rights:"}
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>
                {language.code === "ar"
                  ? "مسؤول حماية البيانات: "
                  : "Data Protection Officer: "}
              </strong>
              privacy@digital.gov.lb
            </p>
            <p>
              <strong>{language.code === "ar" ? "الهاتف: " : "Phone: "}</strong>
              +961 1 123 456
            </p>
            <p>
              <strong>
                {language.code === "ar" ? "العنوان: " : "Address: "}
              </strong>
              {language.code === "ar"
                ? "السراي الحكومي، وسط بيروت، لبنان"
                : "Government Palace, Downtown Beirut, Lebanon"}
            </p>
          </div>
        </div>

        {/* Data Rights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            {language.code === "ar" ? "حقوقكم في البيانات" : "Your Data Rights"}
          </h3>
          <div className="text-blue-800 space-y-3">
            <p className="font-semibold">
              {language.code === "ar"
                ? "لديكم الحق في:"
                : "You have the right to:"}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {language.code === "ar"
                  ? "الوصول إلى بياناتكم الشخصية"
                  : "Access your personal data"}
              </li>
              <li>
                {language.code === "ar"
                  ? "تصحيح البيانات غير الدقيقة"
                  : "Correct inaccurate data"}
              </li>
              <li>
                {language.code === "ar"
                  ? "حذف بياناتكم في ظروف معينة"
                  : "Delete your data under certain circumstances"}
              </li>
              <li>
                {language.code === "ar"
                  ? "تقييد معالجة بياناتكم"
                  : "Restrict processing of your data"}
              </li>
              <li>
                {language.code === "ar"
                  ? "الحصول على نسخة من بياناتكم"
                  : "Obtain a copy of your data"}
              </li>
              <li>
                {language.code === "ar"
                  ? "تقديم شكوى لدى سلطة حماية البيانات"
                  : "Lodge a complaint with the data protection authority"}
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-6">
            <Link href="/terms" className="btn-secondary">
              {language.code === "ar" ? "الشروط والأحكام" : "Terms of Service"}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {language.code === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
            <Link href="/services" className="btn-primary">
              {language.code === "ar" ? "تصفح الخدمات" : "Browse Services"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
