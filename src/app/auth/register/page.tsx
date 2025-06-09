"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useAppStore } from "@/lib/store";

interface FormData {
  firstName: string;
  lastName: string;
  firstNameArabic: string;
  lastNameArabic: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  gender: "male" | "female";
  nationality: string;
  motherName: string;
  birthPlace: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  occupation: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  firstNameArabic?: string;
  lastNameArabic?: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  motherName?: string;
  birthPlace?: string;
  maritalStatus?: string;
  occupation?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  agreeToPrivacy?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguageToggle();
  const { setUser, setAuthenticated } = useAppStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    firstNameArabic: "",
    lastNameArabic: "",
    email: "",
    phone: "",
    nationalId: "",
    dateOfBirth: "",
    gender: "male",
    nationality: "Lebanese",
    motherName: "",
    birthPlace: "",
    maritalStatus: "single",
    occupation: "",
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName =
        language.code === "ar" ? "الاسم الأول مطلوب" : "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        language.code === "ar" ? "اسم العائلة مطلوب" : "Last name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني مطلوب"
          : "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email format";
    }

    // Phone validation (Lebanese format)
    const phoneRegex = /^(\+961|961|0)?[3-9]\d{7}$/;
    if (!formData.phone) {
      newErrors.phone =
        language.code === "ar"
          ? "رقم الهاتف مطلوب"
          : "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone =
        language.code === "ar"
          ? "رقم هاتف لبناني صحيح مطلوب"
          : "Valid Lebanese phone number required";
    }

    // National ID validation
    if (!formData.nationalId) {
      newErrors.nationalId =
        language.code === "ar" ? "رقم الهوية مطلوب" : "National ID is required";
    } else if (formData.nationalId.length < 8) {
      newErrors.nationalId =
        language.code === "ar"
          ? "رقم الهوية يجب أن يكون 8 أرقام على الأقل"
          : "National ID must be at least 8 digits";
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth =
        language.code === "ar"
          ? "تاريخ الميلاد مطلوب"
          : "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth =
          language.code === "ar"
            ? "يجب أن تكون 18 سنة أو أكثر"
            : "Must be 18 years or older";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password =
        language.code === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        language.code === "ar"
          ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
          : "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        language.code === "ar"
          ? "كلمتا المرور غير متطابقتان"
          : "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        language.code === "ar"
          ? "يجب الموافقة على الشروط والأحكام"
          : "Must agree to terms and conditions";
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy =
        language.code === "ar"
          ? "يجب الموافقة على سياسة الخصوصية"
          : "Must agree to privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create user account
      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        firstNameArabic: formData.firstNameArabic,
        lastNameArabic: formData.lastNameArabic,
        email: formData.email,
        phone: formData.phone,
        nationalId: formData.nationalId,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: "Lebanese",
        address: {
          street: formData.address.street,
          streetArabic: formData.address.street, // For now, same as English
          building: "",
          city: formData.address.city,
          cityArabic: formData.address.city, // For now, same as English
          district: "",
          districtArabic: "",
          region: formData.address.region,
          postalCode: formData.address.postalCode,
          country: "Lebanon",
        },
        registrationDate: new Date().toISOString(),
        isVerified: false, // In real app, would need email verification
      };

      // Set user as authenticated
      setUser(newUser);
      setAuthenticated(true);

      // Show success message and redirect to dashboard
      alert(
        language.code === "ar"
          ? "تم إنشاء الحساب بنجاح! مرحباً بك في البوابة الرقمية للحكومة اللبنانية."
          : "Account created successfully! Welcome to the Lebanese Digital Government Portal."
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        language.code === "ar"
          ? "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى."
          : "An error occurred while creating your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleNestedInputChange = (
    section: "address" | "emergencyContact",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lebanon-gradient rounded-xl"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language.code === "ar"
              ? "تسجيل مواطن لبناني"
              : "Lebanese Citizen Registration"}
          </h2>
          <p className="mt-2 text-gray-600">
            {language.code === "ar"
              ? "إنشاء حساب رسمي في البوابة الرقمية للحكومة اللبنانية"
              : "Create an official account in the Lebanese Government Digital Portal"}
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

        {/* Information Alert */}
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
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {language.code === "ar"
                  ? "معلومات مهمة"
                  : "Important Information"}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {language.code === "ar"
                    ? "يرجى ملء جميع المعلومات المطلوبة بدقة. ستُستخدم هذه المعلومات للتحقق من هويتك وتقديم الخدمات الحكومية."
                    : "Please fill out all required information accurately. This information will be used to verify your identity and provide government services."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
          onSubmit={handleSubmit}
        >
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar"
                ? "المعلومات الشخصية"
                : "Personal Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "الاسم الأول (إنجليزي)"
                    : "First Name (English)"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "Ahmad" : "Ahmad"}
                  dir="ltr"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "اسم العائلة (إنجليزي)"
                    : "Last Name (English)"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "Khalil" : "Khalil"}
                  dir="ltr"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              {/* First Name Arabic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "الاسم الأول (عربي)"
                    : "First Name (Arabic)"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.firstNameArabic}
                  onChange={(e) =>
                    handleInputChange("firstNameArabic", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.firstNameArabic
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "أحمد" : "أحمد"}
                  dir="rtl"
                />
                {errors.firstNameArabic && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstNameArabic}
                  </p>
                )}
              </div>

              {/* Last Name Arabic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "اسم العائلة (عربي)"
                    : "Last Name (Arabic)"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.lastNameArabic}
                  onChange={(e) =>
                    handleInputChange("lastNameArabic", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.lastNameArabic ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "خليل" : "خليل"}
                  dir="rtl"
                />
                {errors.lastNameArabic && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastNameArabic}
                  </p>
                )}
              </div>

              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "اسم الأم" : "Mother's Name"} *
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) =>
                    handleInputChange("motherName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.motherName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={
                    language.code === "ar" ? "فاطمة علي" : "Fatima Ali"
                  }
                />
                {errors.motherName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.motherName}
                  </p>
                )}
              </div>

              {/* Birth Place */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "مكان الولادة" : "Place of Birth"} *
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) =>
                    handleInputChange("birthPlace", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.birthPlace ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "بيروت" : "Beirut"}
                />
                {errors.birthPlace && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birthPlace}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Official Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar"
                ? "المعلومات الرسمية"
                : "Official Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* National ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "رقم الهوية الوطنية"
                    : "National ID Number"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) =>
                    handleInputChange("nationalId", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.nationalId ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="12345678"
                  dir="ltr"
                />
                {errors.nationalId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nationalId}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "تاريخ الميلاد" : "Date of Birth"} *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.dateOfBirth ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "الجنس" : "Gender"} *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="male">
                    {language.code === "ar" ? "ذكر" : "Male"}
                  </option>
                  <option value="female">
                    {language.code === "ar" ? "أنثى" : "Female"}
                  </option>
                </select>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "الحالة الاجتماعية"
                    : "Marital Status"}{" "}
                  *
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    handleInputChange("maritalStatus", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="single">
                    {language.code === "ar" ? "أعزب/عزباء" : "Single"}
                  </option>
                  <option value="married">
                    {language.code === "ar" ? "متزوج/متزوجة" : "Married"}
                  </option>
                  <option value="divorced">
                    {language.code === "ar" ? "مطلق/مطلقة" : "Divorced"}
                  </option>
                  <option value="widowed">
                    {language.code === "ar" ? "أرمل/أرملة" : "Widowed"}
                  </option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "الجنسية" : "Nationality"} *
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange("nationality", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder={language.code === "ar" ? "لبنانية" : "Lebanese"}
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "المهنة" : "Occupation"} *
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) =>
                    handleInputChange("occupation", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.occupation ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder={language.code === "ar" ? "مهندس" : "Engineer"}
                />
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar"
                ? "معلومات التواصل"
                : "Contact Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "البريد الإلكتروني"
                    : "Email Address"}{" "}
                  *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="ahmad.khalil@example.com"
                  dir="ltr"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "رقم الهاتف المحمول"
                    : "Mobile Phone"}{" "}
                  *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="+961 3 123 456"
                  dir="ltr"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar"
                ? "معلومات العنوان"
                : "Address Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Street */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "الشارع والرقم"
                    : "Street and Number"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) =>
                    handleNestedInputChange("address", "street", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder={
                    language.code === "ar"
                      ? "شارع الحمرا، مبنى 123"
                      : "Hamra Street, Building 123"
                  }
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "المدينة/البلدة" : "City/Town"} *
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    handleNestedInputChange("address", "city", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder={language.code === "ar" ? "بيروت" : "Beirut"}
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "المحافظة" : "Governorate"} *
                </label>
                <select
                  value={formData.address.region}
                  onChange={(e) =>
                    handleNestedInputChange("address", "region", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">
                    {language.code === "ar"
                      ? "اختر المحافظة"
                      : "Select Governorate"}
                  </option>
                  <option value="beirut">
                    {language.code === "ar" ? "بيروت" : "Beirut"}
                  </option>
                  <option value="mount-lebanon">
                    {language.code === "ar" ? "جبل لبنان" : "Mount Lebanon"}
                  </option>
                  <option value="north-lebanon">
                    {language.code === "ar" ? "الشمال" : "North Lebanon"}
                  </option>
                  <option value="south-lebanon">
                    {language.code === "ar" ? "الجنوب" : "South Lebanon"}
                  </option>
                  <option value="bekaa">
                    {language.code === "ar" ? "البقاع" : "Bekaa"}
                  </option>
                  <option value="nabatieh">
                    {language.code === "ar" ? "النبطية" : "Nabatieh"}
                  </option>
                  <option value="akkar">
                    {language.code === "ar" ? "عكار" : "Akkar"}
                  </option>
                  <option value="baalbek-hermel">
                    {language.code === "ar" ? "بعلبك الهرمل" : "Baalbek-Hermel"}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar" ? "جهة اتصال طوارئ" : "Emergency Contact"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Emergency Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "الاسم الكامل" : "Full Name"} *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "emergencyContact",
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder={
                    language.code === "ar" ? "سارة خليل" : "Sarah Khalil"
                  }
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "صلة القرابة" : "Relationship"} *
                </label>
                <select
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "emergencyContact",
                      "relationship",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">
                    {language.code === "ar"
                      ? "اختر صلة القرابة"
                      : "Select Relationship"}
                  </option>
                  <option value="spouse">
                    {language.code === "ar" ? "زوج/زوجة" : "Spouse"}
                  </option>
                  <option value="parent">
                    {language.code === "ar" ? "والد/والدة" : "Parent"}
                  </option>
                  <option value="sibling">
                    {language.code === "ar" ? "أخ/أخت" : "Sibling"}
                  </option>
                  <option value="child">
                    {language.code === "ar" ? "ابن/ابنة" : "Child"}
                  </option>
                  <option value="friend">
                    {language.code === "ar" ? "صديق/صديقة" : "Friend"}
                  </option>
                  <option value="other">
                    {language.code === "ar" ? "أخرى" : "Other"}
                  </option>
                </select>
              </div>

              {/* Emergency Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "رقم الهاتف" : "Phone Number"} *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "emergencyContact",
                      "phone",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+961 3 987 654"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {language.code === "ar" ? "كلمة المرور" : "Password Setup"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar" ? "كلمة المرور" : "Password"} *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder={
                      language.code === "ar"
                        ? "كلمة مرور قوية"
                        : "Strong password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.code === "ar"
                    ? "تأكيد كلمة المرور"
                    : "Confirm Password"}{" "}
                  *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      language.code === "ar"
                        ? "كرر كلمة المرور"
                        : "Repeat password"
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Legal Agreements */}
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-3 text-sm text-gray-700"
              >
                {language.code === "ar" ? "أوافق على " : "I agree to the "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {language.code === "ar"
                    ? "الشروط والأحكام"
                    : "Terms and Conditions"}
                </Link>
                {language.code === "ar"
                  ? " للحكومة اللبنانية"
                  : " of the Lebanese Government"}
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
            )}

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onChange={(e) =>
                  handleInputChange("agreeToPrivacy", e.target.checked)
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor="agreeToPrivacy"
                className="ml-3 text-sm text-gray-700"
              >
                {language.code === "ar" ? "أوافق على " : "I agree to the "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {language.code === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                {language.code === "ar"
                  ? " وحماية البيانات"
                  : " and Data Protection"}
              </label>
            </div>
            {errors.agreeToPrivacy && (
              <p className="text-red-500 text-sm">{errors.agreeToPrivacy}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading
              ? language.code === "ar"
                ? "جاري إنشاء الحساب..."
                : "Creating Account..."
              : language.code === "ar"
              ? "تسجيل مواطن لبناني"
              : "Register Lebanese Citizen"}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {language.code === "ar"
                ? "لديك حساب بالفعل؟ "
                : "Already have an account? "}
              <Link
                href="/auth/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {language.code === "ar" ? "تسجيل الدخول" : "Sign In"}
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
