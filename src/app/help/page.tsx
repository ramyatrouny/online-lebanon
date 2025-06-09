"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle } from "@/lib/store";
import { getLocalizedText } from "@/lib/utils";

export default function HelpPage() {
  const { language, toggleLanguage } = useLanguageToggle();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I register for government services?",
      questionArabic: "كيف يمكنني التسجيل للحصول على الخدمات الحكومية؟",
      answer:
        'To register for government services, click on "Official Registration" on the homepage, fill out the required information including your National ID, personal details, and address. You will need to verify your email and phone number.',
      answerArabic:
        'للتسجيل في الخدمات الحكومية، انقر على "التسجيل الرسمي" في الصفحة الرئيسية، املأ المعلومات المطلوبة بما في ذلك رقم الهوية الوطنية والتفاصيل الشخصية والعنوان. ستحتاج إلى التحقق من بريدك الإلكتروني ورقم هاتفك.',
      category: "Account",
    },
    {
      question: "What documents do I need for ID card renewal?",
      questionArabic: "ما هي المستندات المطلوبة لتجديد بطاقة الهوية؟",
      answer:
        "For ID card renewal, you need: Current ID card, recent passport-sized photo, proof of residence, and payment of the official fee ($25 USD). The process takes 5-7 business days.",
      answerArabic:
        "لتجديد بطاقة الهوية، تحتاج: بطاقة الهوية الحالية، صورة حديثة بحجم جواز السفر، إثبات الإقامة، ودفع الرسم الرسمي (25 دولار أمريكي). تستغرق العملية 5-7 أيام عمل.",
      category: "Documents",
    },
    {
      question: "How can I track my application status?",
      questionArabic: "كيف يمكنني تتبع حالة طلبي؟",
      answer:
        'You can track your application status by logging into your citizen portal and visiting the "Applications Management" section. Each application has a unique tracking number and progress indicator.',
      answerArabic:
        'يمكنك تتبع حالة طلبك عن طريق تسجيل الدخول إلى بوابة المواطن وزيارة قسم "إدارة الطلبات". كل طلب له رقم تتبع فريد ومؤشر تقدم.',
      category: "Applications",
    },
    {
      question: "What payment methods are accepted?",
      questionArabic: "ما هي طرق الدفع المقبولة؟",
      answer:
        "We accept credit cards, debit cards, bank transfers, and digital wallets. All payments are processed securely through our certified payment gateway.",
      answerArabic:
        "نقبل بطاقات الائتمان وبطاقات الخصم والتحويلات المصرفية والمحافظ الرقمية. جميع المدفوعات تتم معالجتها بأمان من خلال بوابة الدفع المعتمدة.",
      category: "Payments",
    },
    {
      question: "How do I reset my password?",
      questionArabic: "كيف يمكنني إعادة تعيين كلمة المرور؟",
      answer:
        'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.',
      answerArabic:
        'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، أدخل عنوان بريدك الإلكتروني، واتبع التعليمات المرسلة إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور.',
      category: "Account",
    },
    {
      question: "What should I do if a service is under maintenance?",
      questionArabic: "ماذا أفعل إذا كانت الخدمة تحت الصيانة؟",
      answer:
        "If a service is under maintenance, you will see a notification. Please check back later or contact our support team for updates on when the service will be available.",
      answerArabic:
        "إذا كانت الخدمة تحت الصيانة، سترى إشعارًا. يرجى المراجعة لاحقًا أو الاتصال بفريق الدعم للحصول على تحديثات حول متى ستكون الخدمة متاحة.",
      category: "Technical",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", labelArabic: "جميع الفئات" },
    {
      value: "Account",
      label: "Account Management",
      labelArabic: "إدارة الحساب",
    },
    {
      value: "Documents",
      label: "Documents & Certificates",
      labelArabic: "الوثائق والشهادات",
    },
    {
      value: "Applications",
      label: "Application Tracking",
      labelArabic: "تتبع الطلبات",
    },
    {
      value: "Payments",
      label: "Payments & Fees",
      labelArabic: "المدفوعات والرسوم",
    },
    {
      value: "Technical",
      label: "Technical Support",
      labelArabic: "الدعم التقني",
    },
  ];

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Phone Support",
      titleArabic: "الدعم الهاتفي",
      details: "+961 1 000 000",
      detailsArabic: "+961 1 000 000",
      hours: "Mon-Fri 8:00 AM - 6:00 PM",
      hoursArabic: "الاثنين-الجمعة 8:00 ص - 6:00 م",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      titleArabic: "الدعم عبر البريد الإلكتروني",
      details: "support@digitalgov.lb",
      detailsArabic: "support@digitalgov.lb",
      hours: "Response within 24 hours",
      hoursArabic: "رد خلال 24 ساعة",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      titleArabic: "الدردشة المباشرة",
      details: "Available on website",
      detailsArabic: "متاح على الموقع",
      hours: "Mon-Fri 9:00 AM - 5:00 PM",
      hoursArabic: "الاثنين-الجمعة 9:00 ص - 5:00 م",
    },
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const searchMatch =
      !searchTerm ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.questionArabic.includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answerArabic.includes(searchTerm);
    return searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow border-b-4 border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language.code === "ar"
                    ? "مركز المساعدة والدعم"
                    : "Help & Support Center"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "احصل على المساعدة والدعم لاستخدام الخدمات الحكومية الرقمية"
                    : "Get help and support for using digital government services"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button onClick={toggleLanguage} className="btn-secondary">
                  {language.code === "ar" ? "English" : "العربية"}
                </button>

                <Link href="/dashboard" className="btn-primary">
                  {language.code === "ar"
                    ? "العودة للوحة التحكم"
                    : "Back to Dashboard"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                language.code === "ar"
                  ? "ابحث في الأسئلة الشائعة..."
                  : "Search frequently asked questions..."
              }
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language.code === "ar"
                    ? "الأسئلة الشائعة"
                    : "Frequently Asked Questions"}
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg"
                    >
                      <button
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                      >
                        <span className="font-medium text-gray-900">
                          {getLocalizedText(
                            faq.question,
                            faq.questionArabic,
                            language
                          )}
                        </span>
                        {expandedFaq === index ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>

                      {expandedFaq === index && (
                        <div className="px-4 pb-4">
                          <div className="text-gray-700 leading-relaxed">
                            {getLocalizedText(
                              faq.answer,
                              faq.answerArabic,
                              language
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {language.code === "ar"
                        ? "لا توجد نتائج"
                        : "No Results Found"}
                    </h3>
                    <p className="mt-1 text-gray-500">
                      {language.code === "ar"
                        ? "جرب البحث بكلمات مختلفة أو تواصل معنا"
                        : "Try searching with different terms or contact us"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language.code === "ar" ? "تواصل معنا" : "Contact Support"}
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <method.icon className="h-6 w-6 text-primary-600 mt-1" />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">
                          {getLocalizedText(
                            method.title,
                            method.titleArabic,
                            language
                          )}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {getLocalizedText(
                            method.details,
                            method.detailsArabic,
                            language
                          )}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {getLocalizedText(
                            method.hours,
                            method.hoursArabic,
                            language
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="w-full btn-primary text-center block"
                >
                  {language.code === "ar"
                    ? "صفحة الاتصال الكاملة"
                    : "Full Contact Page"}
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language.code === "ar" ? "روابط سريعة" : "Quick Links"}
              </h3>

              <div className="space-y-2">
                <Link
                  href="/services"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar"
                    ? "تصفح الخدمات الحكومية"
                    : "Browse Government Services"}
                </Link>
                <Link
                  href="/dashboard/applications"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar"
                    ? "تتبع طلباتي"
                    : "Track My Applications"}
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar"
                    ? "تحديث الملف الشخصي"
                    : "Update Profile"}
                </Link>
                <Link
                  href="/terms"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar"
                    ? "الشروط والأحكام"
                    : "Terms & Conditions"}
                </Link>
                <Link
                  href="/privacy"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
