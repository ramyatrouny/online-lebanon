"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ClockIcon,
  CreditCardIcon,
  GlobeAltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAppStore, useLanguageToggle } from "@/lib/store";
import { mockServices, mockMinistries } from "@/data/mockData";
import { getLocalizedText, getStatusColor, getStatusText } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguageToggle();
  const { isAuthenticated, setServices, setMinistries } = useAppStore();

  useEffect(() => {
    // Initialize data
    setServices(mockServices);
    setMinistries(mockMinistries);
  }, [setServices, setMinistries]);

  const features = [
    {
      icon: ClockIcon,
      title: "Round-the-Clock Availability",
      titleArabic: "خدمة على مدار الساعة",
      description:
        "Access government services 24 hours a day, 7 days a week through our secure digital platform",
      descriptionArabic:
        "الوصول إلى الخدمات الحكومية على مدار الساعة طوال أيام الأسبوع عبر منصتنا الرقمية الآمنة",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Verified Systems",
      titleArabic: "أنظمة آمنة ومتحقق منها",
      description:
        "Your personal information is protected with bank-grade security protocols and encrypted data transmission",
      descriptionArabic:
        "معلوماتك الشخصية محمية ببروتوكولات أمنية بمستوى مصرفي ونقل بيانات مشفر",
    },
    {
      icon: CreditCardIcon,
      title: "Integrated Payment Gateway",
      titleArabic: "بوابة دفع متكاملة",
      description:
        "Complete official transactions securely online with multiple certified payment methods",
      descriptionArabic:
        "أكمل المعاملات الرسمية بأمان عبر الإنترنت مع طرق دفع معتمدة متعددة",
    },
    {
      icon: GlobeAltIcon,
      title: "Bilingual Government Interface",
      titleArabic: "واجهة حكومية ثنائية اللغة",
      description:
        "Official government services available in Arabic and English with certified translations",
      descriptionArabic:
        "الخدمات الحكومية الرسمية متاحة بالعربية والإنجليزية مع ترجمات معتمدة",
    },
  ];

  const quickStats = [
    {
      value: "15+",
      label: "Official Government Services",
      labelArabic: "خدمة حكومية رسمية",
    },
    {
      value: "8",
      label: "Connected Government Ministries",
      labelArabic: "وزارة حكومية متصلة",
    },
    {
      value: "100%",
      label: "Paperless Digital Processes",
      labelArabic: "عمليات رقمية بلا أوراق",
    },
    {
      value: "24/7",
      label: "Technical Support Services",
      labelArabic: "خدمات الدعم التقني",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Official Navigation Header */}
      <nav className="bg-white shadow-sm border-b-4 border-lebanon-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 lebanon-gradient rounded-lg"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {language.code === "ar"
                    ? "الجمهورية اللبنانية - البوابة الرقمية"
                    : "Lebanese Republic - Digital Gateway"}
                </h1>
                <p className="text-xs text-gray-600">
                  {language.code === "ar"
                    ? "وزارة الدولة لشؤون التنمية الإدارية"
                    : "Ministry of State for Administrative Development"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300"
              >
                {language.code === "ar" ? "English" : "العربية"}
              </button>

              {isAuthenticated ? (
                <Link href="/dashboard" className="btn-primary">
                  {language.code === "ar" ? "الحساب الشخصي" : "Citizen Portal"}
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {language.code === "ar" ? "دخول المواطن" : "Citizen Login"}
                  </Link>
                  <Link href="/auth/register" className="btn-primary">
                    {language.code === "ar"
                      ? "التسجيل الرسمي"
                      : "Official Registration"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Official Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 lebanon-gradient rounded-full mx-auto mb-6 shadow-2xl"></div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              {language.code === "ar" ? (
                <>
                  البوابة الحكومية الرقمية
                  <br />
                  <span className="text-3xl lg:text-4xl font-medium text-blue-100">
                    للجمهورية اللبنانية
                  </span>
                </>
              ) : (
                <>
                  Official Digital Government Portal
                  <br />
                  <span className="text-3xl lg:text-4xl font-medium text-blue-100">
                    Lebanese Republic
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {language.code === "ar"
                ? "منصة رسمية موحدة لجميع الخدمات الحكومية - تبسيط الإجراءات وتحديث الخدمات العامة للمواطنين اللبنانيين"
                : "Official unified platform for all government services - Streamlining procedures and modernizing public services for Lebanese citizens"}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                href="/auth/register"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                {language.code === "ar"
                  ? "بدء التسجيل الرسمي"
                  : "Begin Official Registration"}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors"
              >
                {language.code === "ar"
                  ? "استكشاف الخدمات الحكومية"
                  : "Explore Government Services"}
              </Link>
            </div>

            {/* Official Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {getLocalizedText(stat.label, stat.labelArabic, language)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Official Government Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language.code === "ar"
                ? "مزايا الحكومة الرقمية"
                : "Digital Government Advantages"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language.code === "ar"
                ? "تحويل الخدمات الحكومية التقليدية إلى تجربة رقمية حديثة وفعالة تخدم جميع المواطنين"
                : "Transforming traditional government services into a modern, efficient digital experience serving all citizens"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow border-l-4 border-primary-600"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {getLocalizedText(
                    feature.title,
                    feature.titleArabic,
                    language
                  )}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedText(
                    feature.description,
                    feature.descriptionArabic,
                    language
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Government Services Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language.code === "ar"
                ? "أهم الخدمات الحكومية"
                : "Essential Government Services"}
            </h2>
            <p className="text-xl text-gray-600">
              {language.code === "ar"
                ? "الخدمات الأكثر طلباً من قبل المواطنين اللبنانيين"
                : "Most requested services by Lebanese citizens"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl p-3 bg-gray-50 rounded-lg">
                    {service.icon}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {getStatusText(service.status, language)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {getLocalizedText(service.name, service.nameArabic, language)}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {getLocalizedText(
                    service.description,
                    service.descriptionArabic,
                    language
                  )}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      {language.code === "ar"
                        ? "مدة المعالجة:"
                        : "Processing Time:"}
                    </span>
                    <span className="text-gray-900">
                      {service.estimatedTime}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      {language.code === "ar"
                        ? "الرسوم الرسمية:"
                        : "Official Fees:"}
                    </span>
                    <span className="text-primary-600 font-semibold">
                      ${service.fees} USD
                    </span>
                  </div>
                </div>

                <Link
                  href={`/services/${service.id}`}
                  className="w-full btn-primary text-center block"
                >
                  {language.code === "ar" ? "الوصول للخدمة" : "Access Service"}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              {language.code === "ar"
                ? "عرض جميع الخدمات الحكومية"
                : "View All Government Services"}
            </Link>
          </div>
        </div>
      </section>

      {/* Official Government Ministries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {language.code === "ar"
                ? "الوزارات والمؤسسات الرسمية"
                : "Official Ministries and Institutions"}
            </h2>
            <p className="text-xl text-gray-600">
              {language.code === "ar"
                ? "جميع الوزارات والمؤسسات الحكومية اللبنانية متاحة عبر منصة واحدة"
                : "All Lebanese government ministries and institutions available through one platform"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMinistries.map((ministry) => (
              <div
                key={ministry.id}
                className="bg-gray-50 rounded-xl p-8 border-l-4"
                style={{ borderColor: ministry.color }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl mr-4"
                    style={{ backgroundColor: ministry.color }}
                  >
                    {ministry.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getLocalizedText(
                        ministry.name,
                        ministry.nameArabic,
                        language
                      )}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        ministry.status
                      )}`}
                    >
                      {getStatusText(ministry.status, language)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {getLocalizedText(
                    ministry.description,
                    ministry.descriptionArabic,
                    language
                  )}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {ministry.services.length}{" "}
                    {language.code === "ar"
                      ? "خدمة متاحة"
                      : "services available"}
                  </span>
                  <Link
                    href={`/ministries/${ministry.id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    {language.code === "ar" ? "عرض التفاصيل" : "View Details"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language.code === "ar"
              ? "انضم إلى الحكومة الرقمية اليوم"
              : "Join the Digital Government Today"}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language.code === "ar"
              ? "كن جزءاً من التحول الرقمي في لبنان وتمتع بخدمات حكومية سريعة وفعالة"
              : "Be part of Lebanon's digital transformation and enjoy fast, efficient government services"}
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-10 py-4 bg-white text-primary-700 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {language.code === "ar"
              ? "إنشاء حساب مواطن رسمي"
              : "Create Official Citizen Account"}
          </Link>
        </div>
      </section>

      {/* Official Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 lebanon-gradient rounded-lg"></div>
                <div>
                  <h3 className="text-xl font-bold">
                    {language.code === "ar"
                      ? "الجمهورية اللبنانية"
                      : "Lebanese Republic"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language.code === "ar"
                      ? "البوابة الرقمية الرسمية"
                      : "Official Digital Gateway"}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {language.code === "ar"
                  ? "منصة رسمية للحكومة اللبنانية تهدف إلى تحسين الخدمات العامة وتبسيط الإجراءات الإدارية"
                  : "Official platform of the Lebanese government aimed at improving public services and simplifying administrative procedures"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">
                {language.code === "ar"
                  ? "الخدمات الحكومية"
                  : "Government Services"}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/services/civil-registry"
                    className="hover:text-white"
                  >
                    {language.code === "ar" ? "دائرة النفوس" : "Civil Registry"}
                  </Link>
                </li>
                <li>
                  <Link href="/services/taxation" className="hover:text-white">
                    {language.code === "ar" ? "الضرائب" : "Taxation"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/transportation"
                    className="hover:text-white"
                  >
                    {language.code === "ar" ? "النقل" : "Transportation"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/social-security"
                    className="hover:text-white"
                  >
                    {language.code === "ar"
                      ? "الضمان الاجتماعي"
                      : "Social Security"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">
                {language.code === "ar" ? "الدعم والمساعدة" : "Support & Help"}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    {language.code === "ar" ? "مركز المساعدة" : "Help Center"}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    {language.code === "ar" ? "اتصل بنا" : "Contact Us"}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    {language.code === "ar"
                      ? "سياسة الخصوصية"
                      : "Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    {language.code === "ar"
                      ? "الشروط والأحكام"
                      : "Terms of Service"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024{" "}
                {language.code === "ar"
                  ? "الجمهورية اللبنانية. جميع الحقوق محفوظة."
                  : "Lebanese Republic. All rights reserved."}
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">
                  {language.code === "ar"
                    ? "تطوير وزارة الدولة لشؤون التنمية الإدارية"
                    : "Developed by Ministry of Administrative Development"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
