"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  useAppStore,
  useLanguageToggle,
  useUser,
  useApplications,
  useNotifications,
} from "@/lib/store";
import {
  mockApplications,
  mockNotifications,
  mockDashboardStats,
  mockServices,
} from "@/data/mockData";
import {
  getLocalizedText,
  formatDate,
  formatCurrency,
  getStatusColor,
  getStatusText,
} from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import LoadingSpinner, { PageLoader } from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguageToggle();
  const {
    isAuthenticated,
    logout,
    setApplications,
    setServices,
    addNotification,
  } = useAppStore();

  const user = useUser();
  const applications = useApplications();
  const notifications = useNotifications();

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(mockDashboardStats);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/auth/login");
      return;
    }

    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setApplications(mockApplications);
      setServices(mockServices);

      // Add mock notifications
      mockNotifications.forEach((notification) => {
        addNotification(notification);
      });

      setIsLoading(false);
    };

    loadData();
  }, [
    isAuthenticated,
    user,
    router,
    setApplications,
    setServices,
    addNotification,
  ]);

  const handleLogout = () => {
    logout();
    toast.success(
      language.code === "ar"
        ? "تم تسجيل الخروج بنجاح"
        : "Logged out successfully"
    );
    router.push("/");
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      nameArabic: "لوحة التحكم",
      icon: HomeIcon,
      href: "/dashboard",
      current: true,
    },
    {
      name: "My Applications",
      nameArabic: "طلباتي",
      icon: DocumentTextIcon,
      href: "/dashboard/applications",
      current: false,
    },
    {
      name: "Services",
      nameArabic: "الخدمات",
      icon: CreditCardIcon,
      href: "/services",
      current: false,
    },
    {
      name: "Notifications",
      nameArabic: "الإشعارات",
      icon: BellIcon,
      href: "/dashboard/notifications",
      current: false,
      badge: notifications.filter((n) => !n.isRead).length,
    },
    {
      name: "Profile",
      nameArabic: "الملف الشخصي",
      icon: UserCircleIcon,
      href: "/dashboard/profile",
      current: false,
    },
    {
      name: "Settings",
      nameArabic: "الإعدادات",
      icon: Cog6ToothIcon,
      href: "/dashboard/settings",
      current: false,
    },
  ];

  const quickActions = [
    {
      name: "Renew ID Card",
      nameArabic: "تجديد بطاقة الهوية",
      icon: "🆔",
      href: "/services/national-id-renewal",
      color: "bg-blue-500",
    },
    {
      name: "Pay Taxes",
      nameArabic: "دفع الضرائب",
      icon: "📊",
      href: "/services/tax-return",
      color: "bg-green-500",
    },
    {
      name: "Vehicle Registration",
      nameArabic: "تسجيل مركبة",
      icon: "🚗",
      href: "/services/vehicle-registration",
      color: "bg-orange-500",
    },
    {
      name: "NSSF Services",
      nameArabic: "خدمات الضمان",
      icon: "🏥",
      href: "/services/nssf-registration",
      color: "bg-purple-500",
    },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Mobile sidebar content */}
            <SidebarContent
              sidebarItems={sidebarItems}
              language={language}
              user={user}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent
          sidebarItems={sidebarItems}
          language={language}
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <main className="flex-1">
          {/* Header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {language.code === "ar"
                      ? `مرحباً، ${user.firstNameArabic} ${user.lastNameArabic}`
                      : `Welcome, ${user.firstName} ${user.lastName}`}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    {language.code === "ar"
                      ? "مرحباً بك في بوابة لبنان الرقمي"
                      : "Welcome to your Digital Lebanon portal"}
                  </p>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <button
                    onClick={toggleLanguage}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {language.code === "ar" ? "English" : "العربية"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard
                  title={
                    language.code === "ar"
                      ? "إجمالي الطلبات"
                      : "Total Applications"
                  }
                  value={stats.totalApplications}
                  icon={DocumentTextIcon}
                  color="blue"
                />
                <StatCard
                  title={
                    language.code === "ar"
                      ? "الطلبات المعلقة"
                      : "Pending Applications"
                  }
                  value={stats.pendingApplications}
                  icon={ClockIcon}
                  color="yellow"
                />
                <StatCard
                  title={
                    language.code === "ar"
                      ? "الطلبات المكتملة"
                      : "Completed Applications"
                  }
                  value={stats.completedApplications}
                  icon={CheckCircleIcon}
                  color="green"
                />
                <StatCard
                  title={
                    language.code === "ar"
                      ? "إشعارات جديدة"
                      : "New Notifications"
                  }
                  value={stats.unreadNotifications}
                  icon={BellIcon}
                  color="red"
                />
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-lg font-medium text-gray-900">
                      {language.code === "ar"
                        ? "إجراءات سريعة"
                        : "Quick Actions"}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {language.code === "ar"
                        ? "الخدمات الأكثر استخداماً"
                        : "Most commonly used services"}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      {language.code === "ar" ? "جميع الخدمات" : "All Services"}
                    </Link>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div>
                        <span
                          className={`${action.color} rounded-lg inline-flex p-3 text-white ring-4 ring-white`}
                        >
                          <span className="text-2xl">{action.icon}</span>
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {getLocalizedText(
                            action.name,
                            action.nameArabic,
                            language
                          )}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {language.code === "ar" ? "ابدأ الآن" : "Get started"}
                        </p>
                      </div>
                      <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Applications & Notifications */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Applications */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      {language.code === "ar"
                        ? "الطلبات الأخيرة"
                        : "Recent Applications"}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {applications.slice(0, 3).map((application) => {
                      const service = mockServices.find(
                        (s) => s.id === application.serviceId
                      );
                      return (
                        <div key={application.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {service
                                  ? getLocalizedText(
                                      service.name,
                                      service.nameArabic,
                                      language
                                    )
                                  : "Unknown Service"}
                              </p>
                              <div className="mt-1 flex items-center space-x-2">
                                <StatusBadge
                                  status={application.status}
                                  language={language}
                                  size="sm"
                                />
                                <span className="text-xs text-gray-500">
                                  {formatDate(
                                    application.submissionDate,
                                    language.code
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <ProgressBar
                                currentStep={application.currentStep}
                                totalSteps={application.totalSteps}
                                showSteps={false}
                                size="sm"
                                className="w-20"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-6 py-3 bg-gray-50 text-right">
                    <Link
                      href="/dashboard/applications"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      {language.code === "ar" ? "عرض الكل" : "View all"} →
                    </Link>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      {language.code === "ar"
                        ? "الإشعارات الأخيرة"
                        : "Recent Notifications"}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-6 py-4 ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {notification.type === "success" && (
                              <CheckCircleIcon className="h-5 w-5 text-green-400" />
                            )}
                            {notification.type === "warning" && (
                              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                            )}
                            {notification.type === "error" && (
                              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                            )}
                            {notification.type === "info" && (
                              <BellIcon className="h-5 w-5 text-blue-400" />
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {getLocalizedText(
                                notification.title,
                                notification.titleArabic,
                                language
                              )}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {getLocalizedText(
                                notification.message,
                                notification.messageArabic,
                                language
                              )}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {formatDate(
                                notification.createdAt,
                                language.code
                              )}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-3 bg-gray-50 text-right">
                    <Link
                      href="/dashboard/notifications"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      {language.code === "ar" ? "عرض الكل" : "View all"} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  sidebarItems,
  language,
  user,
  onLogout,
}: {
  sidebarItems: any[];
  language: any;
  user: any;
  onLogout: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="w-8 h-8 lebanon-gradient rounded-lg mr-3"></div>
          <h1 className="text-xl font-bold text-gray-900">
            {language.code === "ar" ? "لبنان الرقمي" : "Digital Lebanon"}
          </h1>
        </div>

        {/* User Info */}
        <div className="mt-6 px-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=3b82f6&color=fff`
                }
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {language.code === "ar"
                  ? `${user.firstNameArabic} ${user.lastNameArabic}`
                  : `${user.firstName} ${user.lastName}`}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex-1 px-2 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                item.current
                  ? "bg-primary-50 border-primary-500 text-primary-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } group flex items-center pl-3 pr-4 py-2 border-l-4 text-sm font-medium transition-colors`}
            >
              <item.icon
                className={`${
                  item.current
                    ? "text-primary-500"
                    : "text-gray-400 group-hover:text-gray-500"
                } mr-3 h-5 w-5`}
                aria-hidden="true"
              />
              <span className="flex-1">
                {getLocalizedText(item.name, item.nameArabic, language)}
              </span>
              {item.badge && item.badge > 0 && (
                <span className="ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-primary-100 text-primary-600">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <button
          onClick={onLogout}
          className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
        >
          <ArrowRightOnRectangleIcon
            className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5"
            aria-hidden="true"
          />
          {language.code === "ar" ? "تسجيل الخروج" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon
              className={`h-6 w-6 text-white p-1 rounded ${
                colorClasses[color as keyof typeof colorClasses]
              }`}
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
