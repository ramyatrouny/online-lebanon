"use client";

import Link from "next/link";
import { useLanguageToggle } from "@/lib/store";

export default function RegisterPage() {
  const { language, toggleLanguage } = useLanguageToggle();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lebanon-gradient rounded-xl"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language.code === "ar" ? "إنشاء حساب جديد" : "Create New Account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {language.code === "ar"
              ? "انضم إلى لبنان الرقمي"
              : "Join Digital Lebanon"}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">
            {language.code === "ar"
              ? "صفحة التسجيل قيد التطوير. يمكنك استخدام صفحة تسجيل الدخول للوصول إلى النسخة التجريبية."
              : "Registration page is under development. You can use the login page to access the demo."}
          </p>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/auth/login"
            className="w-full btn-primary block text-center"
          >
            {language.code === "ar" ? "تسجيل الدخول" : "Sign In"}
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ←{" "}
            {language.code === "ar"
              ? "العودة إلى الصفحة الرئيسية"
              : "Back to home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
