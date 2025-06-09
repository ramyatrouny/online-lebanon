"use client";

import { useState } from "react";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useNotifications, useAppStore } from "@/lib/store";
import { getLocalizedText, formatDateTime } from "@/lib/utils";
import type { NotificationType } from "@/types";

export default function NotificationsPage() {
  const { language } = useLanguageToggle();
  const notifications = useNotifications();
  const { markNotificationAsRead } = useAppStore();
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">(
    "all"
  );

  const filteredNotifications = notifications.filter((notification) => {
    const typeMatch = typeFilter === "all" || notification.type === typeFilter;
    const readMatch =
      readFilter === "all" ||
      (readFilter === "read" && notification.isRead) ||
      (readFilter === "unread" && !notification.isRead);
    return typeMatch && readMatch;
  });

  const typeOptions = [
    { value: "all" as const, label: "All Types", labelArabic: "جميع الأنواع" },
    { value: "info" as const, label: "Information", labelArabic: "معلومات" },
    { value: "success" as const, label: "Success", labelArabic: "نجح" },
    { value: "warning" as const, label: "Warning", labelArabic: "تحذير" },
    { value: "error" as const, label: "Error", labelArabic: "خطأ" },
    { value: "reminder" as const, label: "Reminder", labelArabic: "تذكير" },
  ];

  const readOptions = [
    {
      value: "all" as const,
      label: "All Notifications",
      labelArabic: "جميع الإشعارات",
    },
    {
      value: "unread" as const,
      label: "Unread Only",
      labelArabic: "غير المقروءة فقط",
    },
    { value: "read" as const, label: "Read Only", labelArabic: "المقروءة فقط" },
  ];

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case "error":
        return <XMarkIcon className="h-6 w-6 text-red-500" />;
      case "info":
      case "reminder":
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: NotificationType, isRead: boolean) => {
    if (isRead) return "bg-white";

    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-50";
      case "error":
        return "bg-red-50";
      case "info":
      case "reminder":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const markAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
                    ? "مركز الإشعارات الرسمية"
                    : "Official Notifications Center"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "جميع الإشعارات والتحديثات المتعلقة بطلباتك الحكومية"
                    : "All notifications and updates related to your government applications"}
                </p>
              </div>

              {unreadCount > 0 && (
                <div className="bg-red-100 border border-red-200 rounded-lg px-4 py-2">
                  <span className="text-red-800 font-medium">
                    {unreadCount}{" "}
                    {language.code === "ar"
                      ? "إشعار غير مقروء"
                      : "unread notifications"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar"
                    ? "إجمالي الإشعارات"
                    : "Total Notifications"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {unreadCount}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "غير مقروءة" : "Unread"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {unreadCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "إشعارات نجح" : "Success Alerts"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {notifications.filter((n) => n.type === "success").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {language.code === "ar" ? "تحتاج إجراء" : "Action Required"}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    notifications.filter(
                      (n) => n.type === "warning" || n.type === "error"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />

              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as NotificationType | "all")
                }
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {getLocalizedText(
                      option.label,
                      option.labelArabic,
                      language
                    )}
                  </option>
                ))}
              </select>

              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                value={readFilter}
                onChange={(e) =>
                  setReadFilter(e.target.value as "all" | "read" | "unread")
                }
              >
                {readOptions.map((option) => (
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
                ? `${filteredNotifications.length} إشعار`
                : `${filteredNotifications.length} notifications`}
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {language.code === "ar"
                  ? "لا توجد إشعارات"
                  : "No Notifications Found"}
              </h3>
              <p className="mt-1 text-gray-500">
                {language.code === "ar"
                  ? "لا توجد إشعارات تطابق المعايير المحددة"
                  : "No notifications match the selected criteria"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow ${getNotificationBgColor(
                  notification.type,
                  notification.isRead
                )}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getLocalizedText(
                              notification.title,
                              notification.titleArabic,
                              language
                            )}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {getLocalizedText(
                            notification.message,
                            notification.messageArabic,
                            language
                          )}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {formatDateTime(
                              notification.createdAt,
                              language.code
                            )}
                          </span>

                          <div className="flex items-center space-x-2">
                            {notification.applicationId && (
                              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                {language.code === "ar"
                                  ? "عرض الطلب"
                                  : "View Application"}
                              </button>
                            )}

                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm font-medium text-gray-600 hover:text-gray-800"
                              >
                                {language.code === "ar"
                                  ? "تعليم كمقروء"
                                  : "Mark as Read"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
