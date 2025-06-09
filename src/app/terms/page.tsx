"use client";

import Link from "next/link";
import { useLanguageToggle } from "@/lib/store";
import { getLocalizedText } from "@/lib/utils";

export default function TermsPage() {
  const { language, toggleLanguage } = useLanguageToggle();

  const sections = [
    {
      title: "Acceptance of Terms",
      titleArabic: "قبول الشروط",
      content:
        "By accessing and using the Lebanese Republic Digital Government Portal, you accept and agree to be bound by the terms and provision of this agreement.",
      contentArabic:
        "بالوصول إلى واستخدام البوابة الرقمية للجمهورية اللبنانية، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.",
    },
    {
      title: "Use License",
      titleArabic: "ترخيص الاستخدام",
      content:
        "Permission is granted to temporarily download one copy of the materials on the Lebanese Government Digital Portal for personal, non-commercial transitory viewing only.",
      contentArabic:
        "يُمنح الإذن بتنزيل نسخة واحدة مؤقتة من المواد الموجودة على البوابة الرقمية للحكومة اللبنانية للعرض الشخصي وغير التجاري المؤقت فقط.",
    },
    {
      title: "Disclaimer",
      titleArabic: "إخلاء المسؤولية",
      content:
        "The materials on the Lebanese Government Digital Portal are provided on an 'as is' basis. The Lebanese Government makes no warranties, expressed or implied.",
      contentArabic:
        "يتم توفير المواد الموجودة على البوابة الرقمية للحكومة اللبنانية على أساس 'كما هي'. لا تقدم الحكومة اللبنانية أي ضمانات، صريحة أو ضمنية.",
    },
    {
      title: "Privacy Policy",
      titleArabic: "سياسة الخصوصية",
      content:
        "Your privacy is important to us. We collect and use your personal information in accordance with Lebanese data protection laws and international best practices.",
      contentArabic:
        "خصوصيتك مهمة بالنسبة لنا. نحن نجمع ونستخدم معلوماتك الشخصية وفقاً لقوانين حماية البيانات اللبنانية وأفضل الممارسات الدولية.",
    },
    {
      title: "User Responsibilities",
      titleArabic: "مسؤوليات المستخدم",
      content:
        "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.",
      contentArabic:
        "المستخدمون مسؤولون عن الحفاظ على سرية معلومات حساباتهم وعن جميع الأنشطة التي تحدث تحت حساباتهم.",
    },
    {
      title: "Service Availability",
      titleArabic: "توفر الخدمة",
      content:
        "While we strive to provide continuous service, the Lebanese Government does not guarantee uninterrupted access to the digital portal.",
      contentArabic:
        "بينما نسعى لتوفير خدمة مستمرة، لا تضمن الحكومة اللبنانية الوصول المستمر إلى البوابة الرقمية دون انقطاع.",
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
                  {language.code === "ar"
                    ? "الشروط والأحكام"
                    : "Terms of Service"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "شروط استخدام البوابة الرقمية للجمهورية اللبنانية"
                    : "Terms and conditions for using the Lebanese Republic Digital Portal"}
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
            {language.code === "ar" ? "مقدمة" : "Introduction"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {language.code === "ar"
              ? "مرحباً بكم في البوابة الرقمية للجمهورية اللبنانية. هذه الشروط والأحكام تحكم استخدامكم لموقعنا الإلكتروني وخدماتنا الرقمية. باستخدام البوابة، فإنكم توافقون على هذه الشروط."
              : "Welcome to the Lebanese Republic Digital Portal. These Terms and Conditions govern your use of our website and digital services. By using the portal, you agree to these terms."}
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

        {/* Terms Sections */}
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

        {/* Data Protection Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            {language.code === "ar" ? "حماية البيانات" : "Data Protection"}
          </h3>
          <div className="text-blue-800 space-y-4">
            <p>
              {language.code === "ar"
                ? "نحن نلتزم بحماية بياناتكم الشخصية وفقاً للمعايير الدولية:"
                : "We are committed to protecting your personal data in accordance with international standards:"}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {language.code === "ar"
                  ? "تشفير جميع البيانات المنقولة والمخزنة"
                  : "Encryption of all transmitted and stored data"}
              </li>
              <li>
                {language.code === "ar"
                  ? "الوصول المحدود للبيانات الشخصية"
                  : "Limited access to personal information"}
              </li>
              <li>
                {language.code === "ar"
                  ? "عدم مشاركة البيانات مع جهات خارجية دون موافقة"
                  : "No sharing of data with third parties without consent"}
              </li>
              <li>
                {language.code === "ar"
                  ? "حق المستخدمين في الوصول إلى بياناتهم وتصحيحها"
                  : "User rights to access and correct their data"}
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {language.code === "ar" ? "معلومات التواصل" : "Contact Information"}
          </h3>
          <p className="text-gray-700 mb-4">
            {language.code === "ar"
              ? "إذا كان لديكم أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:"
              : "If you have any questions about these Terms and Conditions, please contact us:"}
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>
                {language.code === "ar" ? "البريد الإلكتروني: " : "Email: "}
              </strong>
              legal@digital.gov.lb
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

        {/* Navigation Links */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="btn-secondary">
              {language.code === "ar" ? "حول البوابة" : "About Portal"}
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
