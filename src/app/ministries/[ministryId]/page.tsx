"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle } from "@/lib/store";
import { mockMinistries, mockServices } from "@/data/mockData";
import { getLocalizedText, formatCurrency } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MinistryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language, toggleLanguage } = useLanguageToggle();

  const [ministry, setMinistry] = useState(null);
  const [ministryServices, setMinistryServices] = useState([]);

  useEffect(() => {
    const foundMinistry = mockMinistries.find(
      (m) => m.id === params.ministryId
    );
    if (!foundMinistry) {
      router.push("/");
      return;
    }

    const services = mockServices.filter(
      (s) => s.ministry === foundMinistry.name
    );

    setMinistry(foundMinistry);
    setMinistryServices(services);
  }, [params.ministryId, router]);

  if (!ministry) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link href="/" className="mr-4 text-gray-400 hover:text-gray-600">
                <ArrowLeftIcon className="w-6 h-6" />
              </Link>
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-3xl"
                    style={{ backgroundColor: ministry.color }}
                  >
                    {ministry.logo}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {getLocalizedText(
                        ministry.name,
                        ministry.nameArabic,
                        language
                      )}
                    </h1>
                    <p className="mt-1 text-gray-600">
                      {language.code === "ar"
                        ? "الجمهورية اللبنانية"
                        : "Lebanese Republic"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={toggleLanguage} className="btn-secondary">
                  {language.code === "ar" ? "English" : "العربية"}
                </button>
                <StatusBadge status={ministry.status} language={language} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ministry Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language.code === "ar" ? "نظرة عامة" : "Overview"}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {getLocalizedText(
                  ministry.description,
                  ministry.descriptionArabic,
                  language
                )}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language.code === "ar"
                      ? "الخدمات المتاحة"
                      : "Available Services"}
                  </h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {ministryServices.length}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language.code === "ar" ? "حالة الخدمات" : "Service Status"}
                  </h3>
                  <StatusBadge status={ministry.status} language={language} />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language.code === "ar"
                  ? "الخدمات المتاحة"
                  : "Available Services"}
              </h2>

              {ministryServices.length === 0 ? (
                <div className="text-center py-12">
                  <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {language.code === "ar"
                      ? "لا توجد خدمات متاحة"
                      : "No services available"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {language.code === "ar"
                      ? "ستكون الخدمات متاحة قريباً"
                      : "Services will be available soon"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {ministryServices.map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="text-3xl">{service.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {getLocalizedText(
                                service.name,
                                service.nameArabic,
                                language
                              )}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {getLocalizedText(
                                service.description,
                                service.descriptionArabic,
                                language
                              )}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span>
                                {language.code === "ar"
                                  ? "المدة: "
                                  : "Duration: "}
                                {service.estimatedTime}
                              </span>
                              <span>
                                {language.code === "ar" ? "الرسوم: " : "Fee: "}
                                {formatCurrency(
                                  service.fees,
                                  "USD",
                                  language.code
                                )}
                              </span>
                              <span>
                                {language.code === "ar"
                                  ? "المستندات: "
                                  : "Documents: "}
                                {service.requiredDocuments.length}{" "}
                                {language.code === "ar" ? "مطلوب" : "required"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-3">
                          <StatusBadge
                            status={service.status}
                            language={language}
                            size="sm"
                          />
                          <div className="flex space-x-2">
                            <Link
                              href={`/services/${service.id}`}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              {language.code === "ar" ? "التفاصيل" : "Details"}
                            </Link>
                            {(service.status === "online" ||
                              service.status === "limited") && (
                              <Link
                                href={`/services/${service.id}/apply`}
                                className="btn-primary text-sm px-4 py-2"
                              >
                                {language.code === "ar" ? "تقديم طلب" : "Apply"}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar"
                  ? "معلومات التواصل"
                  : "Contact Information"}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar" ? "الهاتف" : "Phone"}
                    </p>
                    <p className="font-medium text-gray-900">+961 1 123 456</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar" ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <p className="font-medium text-gray-900">
                      {ministry.id}@gov.lb
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {language.code === "ar" ? "العنوان" : "Address"}
                    </p>
                    <p className="font-medium text-gray-900">
                      {language.code === "ar"
                        ? "بيروت، لبنان"
                        : "Beirut, Lebanon"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar" ? "إجراءات سريعة" : "Quick Actions"}
              </h3>

              <div className="space-y-3">
                <Link
                  href="/services"
                  className="block w-full btn-primary text-center"
                >
                  {language.code === "ar"
                    ? "تصفح جميع الخدمات"
                    : "Browse All Services"}
                </Link>

                <Link
                  href="/contact"
                  className="block w-full btn-secondary text-center"
                >
                  {language.code === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>

                <Link
                  href="/help"
                  className="block w-full text-primary-600 hover:text-primary-700 text-center text-sm"
                >
                  {language.code === "ar" ? "مركز المساعدة" : "Help Center"}
                </Link>
              </div>
            </div>

            {/* Ministry Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language.code === "ar"
                  ? "إحصائيات الوزارة"
                  : "Ministry Statistics"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language.code === "ar"
                      ? "إجمالي الخدمات:"
                      : "Total Services:"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {ministryServices.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language.code === "ar" ? "الخدمات المتاحة:" : "Available:"}
                  </span>
                  <span className="font-semibold text-green-600">
                    {
                      ministryServices.filter((s) => s.status === "online")
                        .length
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language.code === "ar" ? "تحت الصيانة:" : "Maintenance:"}
                  </span>
                  <span className="font-semibold text-yellow-600">
                    {
                      ministryServices.filter((s) => s.status === "maintenance")
                        .length
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language.code === "ar" ? "غير متاحة:" : "Offline:"}
                  </span>
                  <span className="font-semibold text-red-600">
                    {
                      ministryServices.filter((s) => s.status === "offline")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
