import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import type { ServiceStatus, ApplicationStatus, Language } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: string | Date, locale: string = "en"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (locale === "ar") {
    return new Intl.DateTimeFormat("ar-LB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }

  return format(dateObj, "MMM dd, yyyy");
}

export function formatDateTime(
  date: string | Date,
  locale: string = "en"
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (locale === "ar") {
    return new Intl.DateTimeFormat("ar-LB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  }

  return format(dateObj, "MMM dd, yyyy HH:mm");
}

// Currency formatting
export function formatCurrency(
  amount: number,
  currency: "USD" | "LBP" = "USD",
  locale: string = "en"
): string {
  if (locale === "ar") {
    return new Intl.NumberFormat("ar-LB", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "LBP" ? 0 : 2,
    }).format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "LBP" ? 0 : 2,
  }).format(amount);
}

// Status utilities
export function getStatusColor(
  status: ServiceStatus | ApplicationStatus
): string {
  switch (status) {
    case "online":
    case "completed":
    case "approved":
      return "text-success-600 bg-success-50";
    case "offline":
    case "rejected":
    case "expired":
      return "text-error-600 bg-error-50";
    case "maintenance":
    case "under-review":
    case "additional-documents-required":
      return "text-warning-600 bg-warning-50";
    case "limited":
    case "submitted":
    case "draft":
      return "text-primary-600 bg-primary-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

export function getStatusText(
  status: ServiceStatus | ApplicationStatus,
  language: Language
): string {
  const statusTexts = {
    en: {
      online: "Online",
      offline: "Offline",
      maintenance: "Maintenance",
      limited: "Limited",
      draft: "Draft",
      submitted: "Submitted",
      "under-review": "Under Review",
      "additional-documents-required": "Documents Required",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      expired: "Expired",
    },
    ar: {
      online: "متاح",
      offline: "غير متاح",
      maintenance: "صيانة",
      limited: "محدود",
      draft: "مسودة",
      submitted: "مقدم",
      "under-review": "قيد المراجعة",
      "additional-documents-required": "مطلوب مستندات",
      approved: "موافق عليه",
      rejected: "مرفوض",
      completed: "مكتمل",
      expired: "منتهي الصلاحية",
    },
  };

  return statusTexts[language.code][status] || status;
}

// Validation utilities
export function validateNationalId(id: string): boolean {
  // Lebanese national ID validation (simplified)
  const cleanId = id.replace(/\s/g, "");
  return /^\d{11}$/.test(cleanId);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  // Lebanese phone number validation
  const cleanPhone = phone.replace(/[\s-()]/g, "");
  return /^(\+961|961|0)?[0-9]{8}$/.test(cleanPhone);
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateTrackingNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `LB${year}${random}`;
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Translation helper
export function getLocalizedText(
  textEn: string,
  textAr: string,
  language: Language
): string {
  return language.code === "ar" ? textAr : textEn;
}

// Progress calculation
export function calculateProgress(
  currentStep: number,
  totalSteps: number
): number {
  return Math.round((currentStep / totalSteps) * 100);
}

// Sorting utilities
export function sortByDate(
  items: any[],
  dateField: string,
  order: "asc" | "desc" = "desc"
): any[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]).getTime();
    const dateB = new Date(b[dateField]).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

// Search utilities
export function searchItems<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm) return items;

  const lowercaseSearch = searchTerm.toLowerCase();

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowercaseSearch);
      }
      return false;
    })
  );
}

// Local storage utilities
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Handle storage errors silently
  }
}

// Delay utility for simulating API calls
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
