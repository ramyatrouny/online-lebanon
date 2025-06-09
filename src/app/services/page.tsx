"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useServices } from "@/lib/store";
import { mockServices, mockMinistries } from "@/data/mockData";
import { getLocalizedText, searchItems, formatCurrency } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import type { ServiceCategory, ServiceStatus } from "@/types";

export default function ServicesPage() {
  const { language, toggleLanguage } = useLanguageToggle();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ServiceCategory | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<ServiceStatus | "all">(
    "all"
  );

  const categories = [
    {
      value: "all" as const,
      label: "All Services",
      labelArabic: "جميع الخدمات",
    },
    {
      value: "civil-registry" as const,
      label: "Civil Registry",
      labelArabic: "النفوس",
    },
    { value: "taxation" as const, label: "Taxation", labelArabic: "الضرائب" },
    { value: "utilities" as const, label: "Utilities", labelArabic: "المرافق" },
    {
      value: "social-security" as const,
      label: "Social Security",
      labelArabic: "الضمان الاجتماعي",
    },
    {
      value: "vehicle-registration" as const,
      label: "Transportation",
      labelArabic: "النقل",
    },
  ];

  const statusFilters = [
    { value: "all" as const, label: "All Status", labelArabic: "جميع الحالات" },
    { value: "online" as const, label: "Online", labelArabic: "متاح" },
    { value: "offline" as const, label: "Offline", labelArabic: "غير متاح" },
    {
      value: "maintenance" as const,
      label: "Maintenance",
      labelArabic: "صيانة",
    },
    { value: "limited" as const, label: "Limited", labelArabic: "محدود" },
  ];

  const filteredServices = useMemo(() => {
    let services = mockServices;

    // Filter by search term
    if (searchTerm) {
      services = searchItems(services, searchTerm, [
        "name",
        "nameArabic",
        "description",
        "descriptionArabic",
      ]);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      services = services.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      services = services.filter(
        (service) => service.status === selectedStatus
      );
    }

    return services;
  }, [searchTerm, selectedCategory, selectedStatus]);

  const servicesByMinistry = useMemo(() => {
    const grouped = filteredServices.reduce((acc, service) => {
      const ministry = mockMinistries.find((m) => m.name === service.ministry);
      if (ministry) {
        if (!acc[ministry.id]) {
          acc[ministry.id] = {
            ministry,
            services: [],
          };
        }
        acc[ministry.id].services.push(service);
      }
      return acc;
    }, {} as Record<string, { ministry: any; services: any[] }>);

    return Object.values(grouped);
  }, [filteredServices]);

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
                    ? "الخدمات الحكومية"
                    : "Government Services"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "جميع الخدمات الحكومية المتاحة رقمياً"
                    : "All government services available digitally"}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language.code === "ar" ? "البحث" : "Search"}
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    language.code === "ar"
                      ? "ابحث عن خدمة..."
                      : "Search for a service..."
                  }
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language.code === "ar" ? "الفئة" : "Category"}
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as ServiceCategory | "all")
                }
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {getLocalizedText(
                      category.label,
                      category.labelArabic,
                      language
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language.code === "ar" ? "الحالة" : "Status"}
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as ServiceStatus | "all")
                }
              >
                {statusFilters.map((status) => (
                  <option key={status.value} value={status.value}>
                    {getLocalizedText(
                      status.label,
                      status.labelArabic,
                      language
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {language.code === "ar"
                ? `تم العثور على ${filteredServices.length} خدمة`
                : `Found ${filteredServices.length} services`}
            </p>
          </div>
        </div>

        {/* Services by Ministry */}
        {servicesByMinistry.length === 0 ? (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language.code === "ar" ? "لا توجد خدمات" : "No services found"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language.code === "ar"
                ? "جرب تغيير معايير البحث"
                : "Try adjusting your search criteria"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {servicesByMinistry.map(({ ministry, services }) => (
              <div
                key={ministry.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                {/* Ministry Header */}
                <div
                  className="px-6 py-4 border-b border-gray-200"
                  style={{ backgroundColor: `${ministry.color}10` }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4"
                      style={{ backgroundColor: ministry.color }}
                    >
                      {ministry.logo}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {getLocalizedText(
                          ministry.name,
                          ministry.nameArabic,
                          language
                        )}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {services.length}{" "}
                        {language.code === "ar"
                          ? "خدمة متاحة"
                          : "services available"}
                      </p>
                    </div>
                    <StatusBadge status={ministry.status} language={language} />
                  </div>
                </div>

                {/* Services Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ service, language }: { service: any; language: any }) {
  const isDisabled =
    service.status === "offline" || service.status === "maintenance";

  return (
    <div
      className={`bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow ${
        isDisabled ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{service.icon}</div>
        <StatusBadge status={service.status} language={language} size="sm" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {getLocalizedText(service.name, service.nameArabic, language)}
      </h3>

      <p className="text-gray-600 mb-4 text-sm">
        {getLocalizedText(
          service.description,
          service.descriptionArabic,
          language
        )}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {language.code === "ar" ? "المدة المتوقعة:" : "Estimated time:"}
          </span>
          <span className="text-gray-900">{service.estimatedTime}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {language.code === "ar" ? "الرسوم:" : "Fee:"}
          </span>
          <span className="font-semibold text-primary-600">
            {formatCurrency(service.fees, "USD", language.code)}
          </span>
        </div>
      </div>

      {service.requiredDocuments && service.requiredDocuments.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">
            {language.code === "ar"
              ? "المستندات المطلوبة:"
              : "Required documents:"}
          </p>
          <div className="flex flex-wrap gap-1">
            {service.requiredDocuments
              .slice(0, 2)
              .map((doc: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded"
                >
                  {doc}
                </span>
              ))}
            {service.requiredDocuments.length > 2 && (
              <span className="inline-block px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">
                +{service.requiredDocuments.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        {isDisabled ? (
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            {language.code === "ar" ? "غير متاح" : "Unavailable"}
          </button>
        ) : (
          <>
            <Link
              href={`/services/${service.id}/apply`}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors text-center inline-block"
            >
              {language.code === "ar" ? "ابدأ الطلب" : "Start Application"}
            </Link>
            <Link
              href={`/services/${service.id}/apply`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </>
        )}
      </div>

      {isDisabled && (
        <div className="mt-3 flex items-center text-xs text-amber-600">
          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
          {service.status === "maintenance"
            ? language.code === "ar"
              ? "تحت الصيانة"
              : "Under maintenance"
            : language.code === "ar"
            ? "الخدمة معطلة مؤقتاً"
            : "Service temporarily unavailable"}
        </div>
      )}
    </div>
  );
}
