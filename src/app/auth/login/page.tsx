"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAppStore, useLanguageToggle } from "@/lib/store";
import { mockUser } from "@/data/mockData";
import { validateEmail } from "@/lib/utils";
import { delay } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguageToggle();
  const { login } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني مطلوب"
          : "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password =
        language.code === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        language.code === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await delay(1500);

      // For demo purposes, accept any valid email/password combination
      if (formData.email && formData.password.length >= 6) {
        login(mockUser);

        toast.success(
          language.code === "ar"
            ? "تم تسجيل الدخول بنجاح"
            : "Login successful!",
          {
            duration: 3000,
          }
        );

        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error(
        language.code === "ar"
          ? "بيانات الدخول غير صحيحة"
          : "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: "ahmad.khalil@example.com",
      password: "demo123",
    });
    setErrors({});

    // Auto-submit after setting demo data
    setTimeout(() => {
      setIsLoading(true);
      delay(1000).then(() => {
        login(mockUser);
        toast.success(
          language.code === "ar"
            ? "تم تسجيل الدخول بنجاح (نسخة تجريبية)"
            : "Demo login successful!"
        );
        router.push("/dashboard");
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lebanon-gradient rounded-xl"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language.code === "ar" ? "تسجيل الدخول" : "Sign In"}
          </h2>
          <p className="mt-2 text-gray-600">
            {language.code === "ar"
              ? "ادخل إلى حسابك في لبنان الرقمي"
              : "Access your Digital Lebanon account"}
          </p>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="mt-4 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            {language.code === "ar"
              ? "Switch to English"
              : "التبديل إلى العربية"}
          </button>
        </div>

        {/* Demo Login Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {language.code === "ar" ? "نسخة تجريبية" : "Demo Version"}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {language.code === "ar"
                    ? 'يمكنك استخدام أي بريد إلكتروني صحيح وكلمة مرور (6 أحرف على الأقل) أو النقر على "دخول تجريبي" أدناه.'
                    : 'You can use any valid email and password (6+ characters) or click "Demo Login" below.'}
                </p>
              </div>
              <button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="mt-2 text-sm font-medium text-blue-800 hover:text-blue-900 underline disabled:opacity-50"
              >
                {language.code === "ar"
                  ? "دخول تجريبي سريع"
                  : "Quick Demo Login"}
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language.code === "ar" ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder={
                  language.code === "ar"
                    ? "أدخل بريدك الإلكتروني"
                    : "Enter your email"
                }
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                dir="ltr"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language.code === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`appearance-none relative block w-full px-3 py-2 pr-10 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={
                    language.code === "ar"
                      ? "أدخل كلمة المرور"
                      : "Enter your password"
                  }
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                {language.code === "ar" ? "تذكرني" : "Remember me"}
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {language.code === "ar"
                  ? "نسيت كلمة المرور؟"
                  : "Forgot your password?"}
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : language.code === "ar" ? (
                "تسجيل الدخول"
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language.code === "ar"
                ? "ليس لديك حساب؟"
                : "Don't have an account?"}{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {language.code === "ar" ? "إنشاء حساب" : "Register here"}
              </Link>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
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
