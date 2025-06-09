"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DocumentTextIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useApplications } from "@/lib/store";
import { mockServices } from "@/data/mockData";
import {
  getLocalizedText,
  formatDate,
  getStatusColor,
  getStatusText,
} from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import type { ApplicationStatus } from "@/types";

export default function ApplicationsPage() {
  const { language } = useLanguageToggle();
  const applications = useApplications();
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all"
  );

  const filteredApplications = applications.filter(
    (app) => statusFilter === "all" || app.status === statusFilter
  );

  const statusOptions = [
    {
      value: "all" as const,
      label: "All Applications",
      labelArabic: "جميع الطلبات",
    },
    { value: "draft" as const, label: "Draft", labelArabic: "مسودة" },
    { value: "submitted" as const, label: "Submitted", labelArabic: "مقدم" },
    {
      value: "under-review" as const,
      label: "Under Review",
      labelArabic: "قيد المراجعة",
    },
    {
      value: "approved" as const,
      label: "Approved",
      labelArabic: "موافق عليه",
    },
    { value: "completed" as const, label: "Completed", labelArabic: "مكتمل" },
  ];

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
                    ? "إدارة الطلبات الرسمية"
                    : "Official Applications Management"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "تتبع ومراجعة جميع طلباتك المقدمة للخدمات الحكومية"
                    : "Track and manage all your submitted government service applications"}
                </p>
              </div>

              <Link href="/services" className="btn-primary">
                {language.code === "ar"
                  ? "طلب خدمة جديدة"
                  : "New Service Request"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar"
                    ? "إجمالي الطلبات"
                    : "Total Applications"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "قيد المراجعة" : "Under Review"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    applications.filter((app) => app.status === "under-review")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "مكتملة" : "Completed"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    applications.filter((app) => app.status === "completed")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "تحتاج متابعة" : "Needs Attention"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    applications.filter(
                      (app) => app.status === "additional-documents-required"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as ApplicationStatus | "all")
                }
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {getLocalizedText(
                      option.label,
                      option.labelArabic,
                      language
                    )}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-sm text-gray-500">
              {language.code === "ar"
                ? `${filteredApplications.length} طلب`
                : `${filteredApplications.length} applications`}
            </span>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {language.code === "ar"
                  ? "لا توجد طلبات"
                  : "No Applications Found"}
              </h3>
              <p className="mt-1 text-gray-500">
                {language.code === "ar"
                  ? "لم تقدم أي طلبات حتى الآن"
                  : "You haven't submitted any applications yet"}
              </p>
              <Link href="/services" className="mt-4 btn-primary inline-flex">
                {language.code === "ar"
                  ? "تقديم طلب جديد"
                  : "Submit New Application"}
              </Link>
            </div>
          ) : (
            filteredApplications.map((application) => {
              const service = mockServices.find(
                (s) => s.id === application.serviceId
              );

              return (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-2xl">
                            {service?.icon || "📄"}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {service
                                ? getLocalizedText(
                                    service.name,
                                    service.nameArabic,
                                    language
                                  )
                                : "Unknown Service"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {language.code === "ar"
                                ? "رقم الطلب:"
                                : "Application ID:"}{" "}
                              {application.trackingNumber}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {language.code === "ar"
                                ? "تاريخ التقديم"
                                : "Submission Date"}
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(
                                application.submissionDate,
                                language.code
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {language.code === "ar"
                                ? "التاريخ المتوقع للإنجاز"
                                : "Expected Completion"}
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(
                                application.estimatedCompletionDate,
                                language.code
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {language.code === "ar"
                                ? "الرسوم المدفوعة"
                                : "Fees Paid"}
                            </p>
                            <p className="text-sm text-gray-900">
                              ${application.fees} USD{" "}
                              {application.isPaid ? "✓" : "⏳"}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <ProgressBar
                            currentStep={application.currentStep}
                            totalSteps={application.totalSteps}
                            color={
                              application.status === "completed"
                                ? "success"
                                : "primary"
                            }
                          />
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col items-end space-y-3">
                        <StatusBadge
                          status={application.status}
                          language={language}
                        />

                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          {language.code === "ar"
                            ? "عرض التفاصيل"
                            : "View Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
