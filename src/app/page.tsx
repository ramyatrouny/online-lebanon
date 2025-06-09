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
      title: "24/7 Availability",
      titleArabic: "متاح ٢٤/٧",
      description: "Access government services anytime, anywhere",
      descriptionArabic: "الوصول إلى الخدمات الحكومية في أي وقت وأي مكان",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Verified",
      titleArabic: "آمن ومتحقق",
      description: "Your data is protected with bank-level security",
      descriptionArabic: "بياناتك محمية بأمان مصرفي",
    },
    {
      icon: CreditCardIcon,
      title: "Digital Payments",
      titleArabic: "مدفوعات رقمية",
      description: "Pay fees securely online with multiple payment options",
      descriptionArabic: "ادفع الرسوم بأمان عبر الإنترنت مع خيارات دفع متعددة",
    },
    {
      icon: GlobeAltIcon,
      title: "Multilingual",
      titleArabic: "متعدد اللغات",
      description: "Available in English and Arabic",
      descriptionArabic: "متاح باللغتين الإنجليزية والعربية",
    },
  ];

  const quickStats = [
    {
      value: "10+",
      label: "Government Services",
      labelArabic: "خدمة حكومية",
    },
    {
      value: "5",
      label: "Ministries Connected",
      labelArabic: "وزارة متصلة",
    },
    {
      value: "100%",
      label: "Digital Experience",
      labelArabic: "تجربة رقمية",
    },
    {
      value: "24/7",
      label: "Support Available",
      labelArabic: "دعم متاح",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 lebanon-gradient rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900">
                {language.code === "ar" ? "لبنان الرقمي" : "Digital Lebanon"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {language.code === "ar" ? "English" : "العربية"}
              </button>

              {isAuthenticated ? (
                <Link href="/dashboard" className="btn-primary">
                  {language.code === "ar" ? "لوحة التحكم" : "Dashboard"}
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {language.code === "ar" ? "تسجيل الدخول" : "Sign In"}
                  </Link>
                  <Link href="/auth/register" className="btn-primary">
                    {language.code === "ar" ? "إنشاء حساب" : "Register"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {language.code === "ar" ? (
                <>
                  مرحباً بكم في
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lebanon-red via-lebanon-cedar to-lebanon-green">
                    {" "}
                    لبنان الرقمي
                  </span>
                </>
              ) : (
                <>
                  Welcome to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lebanon-red via-lebanon-cedar to-lebanon-green">
                    {" "}
                    Digital Lebanon
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {language.code === "ar"
                ? "مستقبل الخدمات الحكومية اللبنانية - جميع خدماتك الحكومية في مكان واحد، آمن وسهل الوصول"
                : "The future of Lebanese government services - all your government needs in one secure, accessible portal"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/auth/register"
                className="btn-primary text-lg px-8 py-4"
              >
                {language.code === "ar" ? "ابدأ الآن" : "Get Started"}
              </Link>
              <Link
                href="/services"
                className="btn-secondary text-lg px-8 py-4"
              >
                {language.code === "ar" ? "استكشف الخدمات" : "Explore Services"}
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {getLocalizedText(stat.label, stat.labelArabic, language)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language.code === "ar"
                ? "لماذا لبنان الرقمي؟"
                : "Why Digital Lebanon?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language.code === "ar"
                ? "نحن نعيد تصور الخدمات الحكومية لجعلها أكثر كفاءة وسهولة للمواطنين"
                : "We're reimagining government services to be more efficient and accessible for citizens"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(
                    feature.title,
                    feature.titleArabic,
                    language
                  )}
                </h3>
                <p className="text-gray-600">
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

      {/* Popular Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language.code === "ar"
                ? "الخدمات الأكثر استخداماً"
                : "Most Popular Services"}
            </h2>
            <p className="text-xl text-gray-600">
              {language.code === "ar"
                ? "الخدمات التي يستخدمها المواطنون أكثر"
                : "Services that citizens use most frequently"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{service.icon}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {getStatusText(service.status, language)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(service.name, service.nameArabic, language)}
                </h3>

                <p className="text-gray-600 mb-4">
                  {getLocalizedText(
                    service.description,
                    service.descriptionArabic,
                    language
                  )}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {service.estimatedTime}
                  </span>
                  <span className="text-lg font-semibold text-primary-600">
                    ${service.fees}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              {language.code === "ar"
                ? "عرض جميع الخدمات"
                : "View All Services"}
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language.code === "ar"
                ? "الوزارات المتصلة"
                : "Connected Ministries"}
            </h2>
            <p className="text-xl text-gray-600">
              {language.code === "ar"
                ? "جميع الوزارات والمؤسسات الحكومية في مكان واحد"
                : "All government ministries and institutions in one place"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMinistries.map((ministry) => (
              <div key={ministry.id} className="card">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4"
                    style={{ backgroundColor: ministry.color }}
                  >
                    {ministry.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {getLocalizedText(
                        ministry.name,
                        ministry.nameArabic,
                        language
                      )}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        ministry.status
                      )}`}
                    >
                      {getStatusText(ministry.status, language)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {getLocalizedText(
                    ministry.description,
                    ministry.descriptionArabic,
                    language
                  )}
                </p>

                <div className="text-sm text-gray-500">
                  {ministry.services.length}{" "}
                  {language.code === "ar" ? "خدمة متاحة" : "services available"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language.code === "ar"
              ? "مستعد لتجربة الحكومة الرقمية؟"
              : "Ready to Experience Digital Government?"}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {language.code === "ar"
              ? "انضم إلى آلاف المواطنين الذين يستخدمون لبنان الرقمي يومياً"
              : "Join thousands of citizens who use Digital Lebanon daily"}
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 transition-colors"
          >
            {language.code === "ar"
              ? "إنشاء حسابك المجاني"
              : "Create Your Free Account"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 lebanon-gradient rounded-lg"></div>
                <h3 className="text-xl font-bold">
                  {language.code === "ar" ? "لبنان الرقمي" : "Digital Lebanon"}
                </h3>
              </div>
              <p className="text-gray-400 max-w-md">
                {language.code === "ar"
                  ? "نحو مستقبل رقمي أفضل للخدمات الحكومية في لبنان"
                  : "Towards a better digital future for government services in Lebanon"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                {language.code === "ar" ? "خدمات" : "Services"}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>{language.code === "ar" ? "النفوس" : "Civil Registry"}</li>
                <li>{language.code === "ar" ? "الضرائب" : "Taxation"}</li>
                <li>{language.code === "ar" ? "النقل" : "Transportation"}</li>
                <li>{language.code === "ar" ? "الضمان" : "Social Security"}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                {language.code === "ar" ? "دعم" : "Support"}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>{language.code === "ar" ? "مساعدة" : "Help Center"}</li>
                <li>{language.code === "ar" ? "اتصل بنا" : "Contact Us"}</li>
                <li>
                  {language.code === "ar" ? "الخصوصية" : "Privacy Policy"}
                </li>
                <li>
                  {language.code === "ar" ? "الشروط" : "Terms of Service"}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2024 Digital Lebanon.{" "}
              {language.code === "ar"
                ? "جميع الحقوق محفوظة."
                : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
