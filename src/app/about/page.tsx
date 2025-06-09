"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle } from "@/lib/store";
import { getLocalizedText } from "@/lib/utils";

export default function AboutPage() {
  const { language, toggleLanguage } = useLanguageToggle();

  const features = [
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "24/7 Availability",
      titleArabic: "متاح 24/7",
      description:
        "Access government services anytime, anywhere, without visiting physical offices.",
      descriptionArabic:
        "الوصول إلى الخدمات الحكومية في أي وقت ومن أي مكان دون زيارة المكاتب.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Secure & Reliable",
      titleArabic: "آمن وموثوق",
      description:
        "Bank-grade security with SSL encryption and secure data handling.",
      descriptionArabic:
        "أمان على مستوى البنوك مع تشفير SSL والتعامل الآمن مع البيانات.",
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "Bilingual Support",
      titleArabic: "دعم ثنائي اللغة",
      description:
        "Full support for Arabic and English languages with proper RTL layout.",
      descriptionArabic:
        "دعم كامل للغتين العربية والإنجليزية مع تخطيط مناسب للعربية.",
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Citizen-Centric Design",
      titleArabic: "تصميم يركز على المواطن",
      description:
        "Intuitive interface designed with Lebanese citizens' needs in mind.",
      descriptionArabic:
        "واجهة سهلة الاستخدام مصممة مع مراعاة احتياجات المواطنين اللبنانيين.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Digital Portal Launch",
      titleArabic: "إطلاق البوابة الرقمية",
      description:
        "Launch of the unified digital government portal for Lebanon.",
      descriptionArabic: "إطلاق البوابة الحكومية الرقمية الموحدة للبنان.",
    },
    {
      year: "2023",
      title: "Digital Transformation Initiative",
      titleArabic: "مبادرة التحول الرقمي",
      description:
        "Government approval for comprehensive digital transformation.",
      descriptionArabic: "موافقة الحكومة على التحول الرقمي الشامل.",
    },
    {
      year: "2022",
      title: "Strategic Planning",
      titleArabic: "التخطيط الاستراتيجي",
      description: "Development of digital government strategy and roadmap.",
      descriptionArabic: "تطوير استراتيجية الحكومة الرقمية وخريطة الطريق.",
    },
  ];

  const statistics = [
    {
      number: "15+",
      label: "Government Services",
      labelArabic: "خدمة حكومية",
    },
    {
      number: "5",
      label: "Ministries Connected",
      labelArabic: "وزارة متصلة",
    },
    {
      number: "24/7",
      label: "Service Availability",
      labelArabic: "توفر الخدمة",
    },
    {
      number: "100%",
      label: "Digital Transformation",
      labelArabic: "التحول الرقمي",
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
                    ? "حول البوابة الرقمية"
                    : "About Digital Lebanon"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "تحويل الخدمات الحكومية لتجربة رقمية متقدمة"
                    : "Transforming government services for a digital future"}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-24 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language.code === "ar"
                ? "الجمهورية اللبنانية"
                : "Lebanese Republic"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language.code === "ar"
                ? "نحن نبني مستقبل رقمي للبنان من خلال توفير خدمات حكومية حديثة وسهلة الوصول لجميع المواطنين واللبنانيين في الخارج."
                : "We are building a digital future for Lebanon by providing modern, accessible government services for all citizens and Lebanese abroad."}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {getLocalizedText(stat.label, stat.labelArabic, language)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language.code === "ar" ? "رؤيتنا" : "Our Vision"}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language.code === "ar"
                ? "أن نكون البوابة الرقمية الرائدة في المنطقة التي تربط المواطنين اللبنانيين بحكومتهم بطريقة سهلة وشفافة وفعالة، مما يساهم في بناء دولة عصرية ومتقدمة تكنولوجياً."
                : "To be the leading digital gateway in the region that connects Lebanese citizens with their government in an easy, transparent, and efficient manner, contributing to building a modern and technologically advanced state."}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language.code === "ar" ? "مهمتنا" : "Our Mission"}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language.code === "ar"
                ? "تبسيط وتسريع الخدمات الحكومية من خلال التكنولوجيا المتطورة، وضمان وصول عادل وآمن لجميع المواطنين، مع الحفاظ على أعلى معايير الخصوصية والأمان."
                : "To simplify and accelerate government services through advanced technology, ensuring fair and secure access for all citizens, while maintaining the highest standards of privacy and security."}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language.code === "ar" ? "الميزات الرئيسية" : "Key Features"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {getLocalizedText(
                    feature.title,
                    feature.titleArabic,
                    language
                  )}
                </h4>
                <p className="text-gray-600 text-sm">
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

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language.code === "ar" ? "مراحل التطوير" : "Development Timeline"}
          </h3>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start bg-white rounded-lg shadow p-6"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-6">
                  <span className="text-primary-600 font-bold">
                    {milestone.year}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {getLocalizedText(
                      milestone.title,
                      milestone.titleArabic,
                      language
                    )}
                  </h4>
                  <p className="text-gray-600">
                    {getLocalizedText(
                      milestone.description,
                      milestone.descriptionArabic,
                      language
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Government Commitment */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language.code === "ar"
              ? "التزام الحكومة"
              : "Government Commitment"}
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            {language.code === "ar"
              ? "تلتزم الحكومة اللبنانية بتوفير خدمات رقمية عالية الجودة، وضمان الشفافية والمساءلة، والعمل المستمر على تحسين تجربة المواطنين مع الخدمات الحكومية."
              : "The Lebanese Government is committed to providing high-quality digital services, ensuring transparency and accountability, and continuously working to improve citizens' experience with government services."}
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/services" className="btn-primary">
              {language.code === "ar" ? "استكشف الخدمات" : "Explore Services"}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {language.code === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
