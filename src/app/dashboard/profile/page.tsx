"use client";

import { useState } from "react";
import {
  UserCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useUser, useAppStore } from "@/lib/store";
import {
  getLocalizedText,
  validateEmail,
  validatePhoneNumber,
} from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { language } = useLanguageToggle();
  const user = useUser();
  const { setUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user || !editedUser) {
    return <div>Loading...</div>;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedUser.firstName) {
      newErrors.firstName =
        language.code === "ar" ? "الاسم الأول مطلوب" : "First name is required";
    }

    if (!editedUser.lastName) {
      newErrors.lastName =
        language.code === "ar" ? "اسم العائلة مطلوب" : "Last name is required";
    }

    if (!editedUser.email) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني مطلوب"
          : "Email is required";
    } else if (!validateEmail(editedUser.email)) {
      newErrors.email =
        language.code === "ar"
          ? "البريد الإلكتروني غير صحيح"
          : "Invalid email address";
    }

    if (!editedUser.phone) {
      newErrors.phone =
        language.code === "ar"
          ? "رقم الهاتف مطلوب"
          : "Phone number is required";
    } else if (!validatePhoneNumber(editedUser.phone)) {
      newErrors.phone =
        language.code === "ar" ? "رقم الهاتف غير صحيح" : "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setUser(editedUser);
    setIsEditing(false);
    toast.success(
      language.code === "ar"
        ? "تم حفظ التغييرات بنجاح"
        : "Profile updated successfully"
    );
  };

  const handleCancel = () => {
    setEditedUser(user);
    setErrors({});
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: "Personal Information",
      titleArabic: "المعلومات الشخصية",
      fields: [
        { key: "firstName", label: "First Name", labelArabic: "الاسم الأول" },
        { key: "lastName", label: "Last Name", labelArabic: "اسم العائلة" },
        {
          key: "firstNameArabic",
          label: "First Name (Arabic)",
          labelArabic: "الاسم الأول (بالعربية)",
        },
        {
          key: "lastNameArabic",
          label: "Last Name (Arabic)",
          labelArabic: "اسم العائلة (بالعربية)",
        },
        {
          key: "dateOfBirth",
          label: "Date of Birth",
          labelArabic: "تاريخ الولادة",
          type: "date",
        },
        {
          key: "gender",
          label: "Gender",
          labelArabic: "الجنس",
          type: "select",
          options: [
            { value: "male", label: "Male", labelArabic: "ذكر" },
            { value: "female", label: "Female", labelArabic: "أنثى" },
          ],
        },
      ],
    },
    {
      title: "Contact Information",
      titleArabic: "معلومات الاتصال",
      fields: [
        {
          key: "email",
          label: "Email Address",
          labelArabic: "البريد الإلكتروني",
          type: "email",
        },
        {
          key: "phone",
          label: "Phone Number",
          labelArabic: "رقم الهاتف",
          type: "tel",
        },
      ],
    },
    {
      title: "Address Information",
      titleArabic: "معلومات العنوان",
      fields: [
        {
          key: "address.street",
          label: "Street Address",
          labelArabic: "عنوان الشارع",
        },
        {
          key: "address.building",
          label: "Building Number",
          labelArabic: "رقم البناء",
        },
        { key: "address.city", label: "City", labelArabic: "المدينة" },
        { key: "address.district", label: "District", labelArabic: "المنطقة" },
        {
          key: "address.postalCode",
          label: "Postal Code",
          labelArabic: "الرمز البريدي",
        },
      ],
    },
  ];

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;
    const target = keys.reduce((o, k) => o[k], obj);
    target[lastKey] = value;
    return { ...obj };
  };

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
                    ? "الملف الشخصي الرسمي"
                    : "Official Citizen Profile"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "إدارة وتحديث معلوماتك الشخصية المسجلة لدى الحكومة"
                    : "Manage and update your personal information registered with the government"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      {language.code === "ar" ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center"
                    >
                      <CheckIcon className="h-4 w-4 mr-2" />
                      {language.code === "ar"
                        ? "حفظ التغييرات"
                        : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    {language.code === "ar" ? "تعديل الملف" : "Edit Profile"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700">
                      <CameraIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {language.code === "ar"
                    ? `${user.firstNameArabic} ${user.lastNameArabic}`
                    : `${user.firstName} ${user.lastName}`}
                </h2>

                <p className="text-gray-600">{user.email}</p>

                <div className="mt-4 flex items-center justify-center">
                  {user.isVerified ? (
                    <div className="flex items-center text-green-600">
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">
                        {language.code === "ar"
                          ? "حساب متحقق"
                          : "Verified Account"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600">
                      <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">
                        {language.code === "ar"
                          ? "في انتظار التحقق"
                          : "Pending Verification"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {language.code === "ar"
                        ? "رقم الهوية الوطنية"
                        : "National ID"}
                    </span>
                    <span className="font-medium">{user.nationalId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {language.code === "ar" ? "الجنسية" : "Nationality"}
                    </span>
                    <span className="font-medium">{user.nationality}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {language.code === "ar"
                        ? "تاريخ التسجيل"
                        : "Member Since"}
                    </span>
                    <span className="font-medium">
                      {new Date(user.registrationDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {profileSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getLocalizedText(
                      section.title,
                      section.titleArabic,
                      language
                    )}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => {
                      const value = getNestedValue(
                        isEditing ? editedUser : user,
                        field.key
                      );
                      const error = errors[field.key];

                      return (
                        <div
                          key={fieldIndex}
                          className={
                            field.key.includes("Arabic") ? "md:col-span-1" : ""
                          }
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {getLocalizedText(
                              field.label,
                              field.labelArabic,
                              language
                            )}
                          </label>

                          {isEditing ? (
                            <>
                              {field.type === "select" ? (
                                <select
                                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                                    error ? "border-red-300" : "border-gray-300"
                                  }`}
                                  value={value}
                                  onChange={(e) => {
                                    const updated = setNestedValue(
                                      editedUser,
                                      field.key,
                                      e.target.value
                                    );
                                    setEditedUser(updated);
                                  }}
                                >
                                  {field.options?.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {getLocalizedText(
                                        option.label,
                                        option.labelArabic,
                                        language
                                      )}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type || "text"}
                                  className={`w-full px-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                                    error ? "border-red-300" : "border-gray-300"
                                  }`}
                                  value={value || ""}
                                  onChange={(e) => {
                                    const updated = setNestedValue(
                                      editedUser,
                                      field.key,
                                      e.target.value
                                    );
                                    setEditedUser(updated);
                                  }}
                                  dir={
                                    field.key.includes("Arabic") ? "rtl" : "ltr"
                                  }
                                />
                              )}
                              {error && (
                                <p className="mt-1 text-sm text-red-600">
                                  {error}
                                </p>
                              )}
                            </>
                          ) : (
                            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                              {field.type === "select" && field.options
                                ? field.options.find(
                                    (opt) => opt.value === value
                                  )?.[
                                    language.code === "ar"
                                      ? "labelArabic"
                                      : "label"
                                  ] || value
                                : value ||
                                  (language.code === "ar"
                                    ? "غير محدد"
                                    : "Not specified")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
