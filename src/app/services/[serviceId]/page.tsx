"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useIsAuthenticated } from "@/lib/store";
import { mockServices, mockMinistries } from "@/data/mockData";
import { getLocalizedText, formatCurrency } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language, toggleLanguage } = useLanguageToggle();
  const isAuthenticated = useIsAuthenticated();

  const [service, setService] = useState(null);
  const [ministry, setMinistry] = useState(null);

  useEffect(() => {
    const foundService = mockServices.find((s) => s.id === params.serviceId);
    if (!foundService) {
      router.push("/services");
      return;
    }

    const foundMinistry = mockMinistries.find(
      (m) => m.name === foundService.ministry
    );

    setService(foundService);
    setMinistry(foundMinistry);
  }, [params.serviceId, router]);

  if (!service || !ministry) {
    return <LoadingSpinner />;
  }

  const isServiceAvailable =
    service.status === "online" || service.status === "limited";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link
                href="/services"
                className="mr-4 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </Link>
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {getLocalizedText(
                        service.name,
                        service.nameArabic,
                        language
                      )}
                    </h1>
                    <p className="mt-1 text-gray-600">
                      {getLocalizedText(
                        ministry.name,
                        ministry.nameArabic,
                        language
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={toggleLanguage} className="btn-secondary">
                  {language.code === "ar" ? "English" : "العربية"}
                </button>
                <StatusBadge status={service.status} language={language} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language.code === "ar" ? "وصف الخدمة" : "Service Description"}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {getLocalizedText(
                  service.description,
                  service.descriptionArabic,
                  language
                )}
              </p>

              {/* Key Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <ClockIcon className="w-8 h-8 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar"
                        ? "مدة المعالجة"
                        : "Processing Time"}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {service.estimatedTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <CurrencyDollarIcon className="w-8 h-8 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar" ? "الرسوم" : "Fees"}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(service.fees, "USD", language.code)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <DocumentTextIcon className="w-8 h-8 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar" ? "المستندات" : "Documents"}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {service.requiredDocuments.length}{" "}
                      {language.code === "ar" ? "مطلوب" : "required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language.code === "ar"
                  ? "المستندات المطلوبة"
                  : "Required Documents"}
              </h3>
              <ul className="space-y-3">
                {service.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language.code === "ar"
                  ? "خطوات التقديم"
                  : "Application Process"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language.code === "ar"
                        ? "تحضير المستندات"
                        : "Prepare Documents"}
                    </h4>
                    <p className="text-gray-600">
                      {language.code === "ar"
                        ? "اجمع جميع المستندات المطلوبة واحرص على أن تكون صالحة"
                        : "Gather all required documents and ensure they are valid"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language.code === "ar"
                        ? "تقديم الطلب"
                        : "Submit Application"}
                    </h4>
                    <p className="text-gray-600">
                      {language.code === "ar"
                        ? "املأ النموذج الإلكتروني وارفق المستندات المطلوبة"
                        : "Fill out the online form and attach required documents"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language.code === "ar"
                        ? "المراجعة والمعالجة"
                        : "Review & Processing"}
                    </h4>
                    <p className="text-gray-600">
                      {language.code === "ar"
                        ? "سيتم مراجعة طلبك من قبل المختصين"
                        : "Your application will be reviewed by specialists"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language.code === "ar"
                        ? "استلام النتيجة"
                        : "Receive Results"}
                    </h4>
                    <p className="text-gray-600">
                      {language.code === "ar"
                        ? "ستحصل على النتيجة عبر البوابة الإلكترونية"
                        : "You'll receive the results through the digital portal"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ministry Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar"
                  ? "الجهة المسؤولة"
                  : "Responsible Authority"}
              </h3>
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-3"
                  style={{ backgroundColor: ministry.color }}
                >
                  {ministry.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {getLocalizedText(
                      ministry.name,
                      ministry.nameArabic,
                      language
                    )}
                  </h4>
                  <StatusBadge
                    status={ministry.status}
                    language={language}
                    size="sm"
                  />
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {getLocalizedText(
                  ministry.description,
                  ministry.descriptionArabic,
                  language
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar" ? "ابدأ الطلب" : "Start Application"}
              </h3>

              {!isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <InformationCircleIcon className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                    <p className="text-amber-800 text-sm">
                      {language.code === "ar"
                        ? "يجب تسجيل الدخول أولاً للتقدم بطلب"
                        : "You must be logged in to apply for this service"}
                    </p>
                  </div>
                  <Link
                    href="/auth/login"
                    className="w-full btn-primary text-center block"
                  >
                    {language.code === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                </div>
              ) : !isServiceAvailable ? (
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <p className="text-red-800 text-sm">
                      {service.status === "maintenance"
                        ? language.code === "ar"
                          ? "الخدمة تحت الصيانة حالياً"
                          : "Service is currently under maintenance"
                        : language.code === "ar"
                        ? "الخدمة غير متاحة حالياً"
                        : "Service is currently unavailable"}
                    </p>
                  </div>
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 px-4 py-3 rounded-lg text-center cursor-not-allowed"
                  >
                    {language.code === "ar" ? "غير متاح" : "Unavailable"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    href={`/services/${service.id}/apply`}
                    className="w-full btn-primary text-center block"
                  >
                    {language.code === "ar"
                      ? "تقديم طلب جديد"
                      : "Submit New Application"}
                  </Link>

                  {service.status === "limited" && (
                    <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                      <p className="text-yellow-800 text-sm">
                        {language.code === "ar"
                          ? "الخدمة متاحة بشكل محدود - قد تستغرق وقتاً أطول"
                          : "Service has limited availability - may take longer to process"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar" ? "تحتاج مساعدة؟" : "Need Help?"}
              </h3>
              <div className="space-y-3">
                <Link
                  href="/help"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar" ? "مركز المساعدة" : "Help Center"}
                </Link>
                <Link
                  href="/contact"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  {language.code === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>
                <p className="text-gray-600 text-sm">
                  {language.code === "ar" ? "الهاتف: " : "Phone: "}
                  +961 1 123 456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
