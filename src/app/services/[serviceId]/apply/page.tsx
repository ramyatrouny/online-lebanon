"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  DocumentPlusIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle, useAppStore } from "@/lib/store";
import { mockServices } from "@/data/mockData";
import { getLocalizedText, formatCurrency, generateId } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import type { Application, ApplicationStatus, Service } from "@/types";

interface FormData {
  personalInfo: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    address: string;
  };
  documents: File[];
  additionalInfo: string;
  paymentMethod: "credit-card" | "bank-transfer" | "cash";
}

const steps = [
  { id: 1, name: "Personal Information", nameArabic: "المعلومات الشخصية" },
  { id: 2, name: "Required Documents", nameArabic: "المستندات المطلوبة" },
  { id: 3, name: "Payment", nameArabic: "الدفع" },
  { id: 4, name: "Review & Submit", nameArabic: "المراجعة والإرسال" },
];

export default function ServiceApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguageToggle();
  const { user, isAuthenticated, addApplication, addNotification } =
    useAppStore();

  const [service, setService] = useState<Service | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      nationalId: user?.nationalId || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address ? `${user.address.street}, ${user.address.city}` : "",
    },
    documents: [],
    additionalInfo: "",
    paymentMethod: "credit-card",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    const foundService = mockServices.find((s) => s.id === params.serviceId);
    if (!foundService) {
      router.push("/services");
      return;
    }

    if (
      foundService.status === "offline" ||
      foundService.status === "maintenance"
    ) {
      toast.error(
        language.code === "ar"
          ? "هذه الخدمة غير متاحة حالياً"
          : "This service is currently unavailable"
      );
      router.push("/services");
      return;
    }

    setService(foundService);
  }, [params.serviceId, isAuthenticated, router, language.code]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!service) return;
    
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const trackingNumber = `LB-${service.ministry
        .replace(/\s+/g, "")
        .toUpperCase()}-${Date.now().toString().slice(-6)}`;

      const newApplication: Application = {
        id: generateId(),
        serviceId: service.id,
        userId: user!.id,
        trackingNumber,
        status: "submitted" as ApplicationStatus,
        submissionDate: new Date().toISOString(),
        estimatedCompletionDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        fees: service.fees,
        isPaid: false,
        currentStep: 1,
        totalSteps: 3,
        documents: formData.documents.map((file) => ({
          id: generateId(),
          name: file.name,
          nameArabic: file.name,
          type: "other" as const,
          size: file.size,
          uploadDate: new Date().toISOString(),
          isRequired: true,
          isVerified: false,
        })),
      };

      addApplication(newApplication);

      // Add notification
      addNotification({
        id: generateId(),
        userId: user!.id,
        title:
          language.code === "ar"
            ? "تم تقديم الطلب بنجاح"
            : "Application Submitted Successfully",
        titleArabic: "تم تقديم الطلب بنجاح",
        message:
          language.code === "ar"
            ? `رقم التتبع: ${trackingNumber}`
            : `Tracking number: ${trackingNumber}`,
        messageArabic: `رقم التتبع: ${trackingNumber}`,
        type: "success",
        createdAt: new Date().toISOString(),
        isRead: false,
        actionUrl: `/dashboard/applications`,
      });

      toast.success(
        language.code === "ar"
          ? "تم تقديم الطلب بنجاح!"
          : "Application submitted successfully!"
      );

      router.push(`/dashboard/applications`);
    } catch (error) {
      toast.error(
        language.code === "ar"
          ? "حدث خطأ أثناء تقديم الطلب"
          : "An error occurred while submitting the application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link
                href="/services"
                className="mr-4 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </Link>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {getLocalizedText(service.name, service.nameArabic, language)}
                </h1>
                <p className="mt-1 text-gray-600">
                  {language.code === "ar"
                    ? "تقديم طلب جديد"
                    : "New Application"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {language.code === "ar" ? "الرسوم" : "Fee"}
                  </p>
                  <p className="font-semibold text-lg text-primary-600">
                    {formatCurrency(service.fees, "USD", language.code)}
                  </p>
                </div>
                <StatusBadge status={service.status} language={language} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-primary-600 border-primary-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id
                        ? "text-primary-600"
                        : "text-gray-500"
                    }`}
                  >
                    {getLocalizedText(step.name, step.nameArabic, language)}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-px bg-gray-300 ml-4" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Application Form */}
        <div className="bg-white shadow rounded-lg">
          {currentStep === 1 && (
            <PersonalInfoStep
              formData={formData}
              setFormData={setFormData}
              language={language}
            />
          )}
          {currentStep === 2 && (
            <DocumentsStep
              formData={formData}
              setFormData={setFormData}
              service={service}
              language={language}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              formData={formData}
              setFormData={setFormData}
              service={service}
              language={language}
            />
          )}
          {currentStep === 4 && (
            <ReviewStep
              formData={formData}
              service={service}
              language={language}
            />
          )}

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language.code === "ar" ? "السابق" : "Previous"}
            </button>

            {currentStep < steps.length ? (
              <button onClick={handleNext} className="btn-primary">
                {language.code === "ar" ? "التالي" : "Next"}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : language.code === "ar" ? (
                  "تقديم الطلب"
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalInfoStep({ formData, setFormData, language }: { 
  formData: FormData; 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; 
  language: any; 
}) {
  const updatePersonalInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {language.code === "ar" ? "المعلومات الشخصية" : "Personal Information"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language.code === "ar" ? "الاسم الكامل" : "Full Name"}
          </label>
          <input
            type="text"
            value={formData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language.code === "ar" ? "الرقم الوطني" : "National ID"}
          </label>
          <input
            type="text"
            value={formData.personalInfo.nationalId}
            onChange={(e) => updatePersonalInfo("nationalId", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language.code === "ar" ? "رقم الهاتف" : "Phone Number"}
          </label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language.code === "ar" ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language.code === "ar" ? "العنوان" : "Address"}
          </label>
          <textarea
            value={formData.personalInfo.address}
            onChange={(e) => updatePersonalInfo("address", e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}

function DocumentsStep({ formData, setFormData, service, language }: { 
  formData: FormData; 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; 
  service: Service; 
  language: any; 
}) {
  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...newFiles],
    }));
  };

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {language.code === "ar" ? "المستندات المطلوبة" : "Required Documents"}
      </h2>

      {/* Required Documents List */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          {language.code === "ar"
            ? "المستندات المطلوبة:"
            : "Required Documents:"}
        </h3>
        <ul className="space-y-2">
          {service.requiredDocuments.map((doc, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
              {doc}
            </li>
          ))}
        </ul>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language.code === "ar" ? "رفع المستندات" : "Upload Documents"}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {language.code === "ar"
                  ? "اسحب الملفات هنا أو اضغط للاختيار"
                  : "Drag files here or click to select"}
              </span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  e.target.files && handleFileUpload(e.target.files)
                }
                className="sr-only"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">
              {language.code === "ar"
                ? "PDF, JPG, PNG حتى 10MB"
                : "PDF, JPG, PNG up to 10MB"}
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {formData.documents.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">
            {language.code === "ar" ? "الملفات المرفوعة:" : "Uploaded Files:"}
          </h3>
          <div className="space-y-2">
            {formData.documents.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <DocumentPlusIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {language.code === "ar" ? "حذف" : "Remove"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentStep({ formData, setFormData, service, language }: { 
  formData: FormData; 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; 
  service: Service; 
  language: any; 
}) {
  const paymentMethods = [
    {
      id: "credit-card",
      name: language.code === "ar" ? "بطاقة ائتمان" : "Credit Card",
      icon: <CreditCardIcon className="w-6 h-6" />,
      description:
        language.code === "ar" ? "دفع فوري وآمن" : "Instant and secure payment",
    },
    {
      id: "bank-transfer",
      name: language.code === "ar" ? "تحويل بنكي" : "Bank Transfer",
      icon: <CreditCardIcon className="w-6 h-6" />,
      description:
        language.code === "ar"
          ? "تحويل مباشر من البنك"
          : "Direct bank transfer",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {language.code === "ar" ? "طريقة الدفع" : "Payment Method"}
      </h2>

      {/* Fee Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            {getLocalizedText(service.name, service.nameArabic, language)}
          </span>
          <span className="font-semibold text-primary-600">
            {formatCurrency(service.fees, "USD", language.code)}
          </span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.paymentMethod === method.id
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={formData.paymentMethod === method.id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value as "credit-card" | "bank-transfer" | "cash",
                }))
              }
              className="sr-only"
            />
            <div className="flex items-center">
              <div className="text-gray-400 mr-3">{method.icon}</div>
              <div>
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-6 flex items-start p-4 bg-blue-50 rounded-lg">
        <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
        <div className="text-sm text-blue-700">
          {language.code === "ar"
            ? "جميع المعاملات محمية بتشفير SSL وتتم معالجتها بشكل آمن."
            : "All transactions are SSL encrypted and processed securely."}
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ formData, service, language }: { 
  formData: FormData; 
  service: Service; 
  language: any; 
}) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {language.code === "ar" ? "مراجعة الطلب" : "Review Application"}
      </h2>

      {/* Service Summary */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">
          {language.code === "ar" ? "الخدمة المطلوبة" : "Requested Service"}
        </h3>
        <p className="text-gray-700">
          {getLocalizedText(service.name, service.nameArabic, language)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {language.code === "ar" ? "الرسوم: " : "Fee: "}
          {formatCurrency(service.fees, "USD", language.code)}
        </p>
      </div>

      {/* Personal Information */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">
          {language.code === "ar"
            ? "المعلومات الشخصية"
            : "Personal Information"}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">
              {language.code === "ar" ? "الاسم:" : "Name:"}
            </span>
            <span className="ml-2 text-gray-900">
              {formData.personalInfo.fullName}
            </span>
          </div>
          <div>
            <span className="text-gray-500">
              {language.code === "ar" ? "الرقم الوطني:" : "National ID:"}
            </span>
            <span className="ml-2 text-gray-900">
              {formData.personalInfo.nationalId}
            </span>
          </div>
          <div>
            <span className="text-gray-500">
              {language.code === "ar" ? "الهاتف:" : "Phone:"}
            </span>
            <span className="ml-2 text-gray-900">
              {formData.personalInfo.phone}
            </span>
          </div>
          <div>
            <span className="text-gray-500">
              {language.code === "ar" ? "البريد الإلكتروني:" : "Email:"}
            </span>
            <span className="ml-2 text-gray-900">
              {formData.personalInfo.email}
            </span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">
          {language.code === "ar" ? "المستندات المرفقة" : "Attached Documents"}
        </h3>
        {formData.documents.length > 0 ? (
          <ul className="space-y-1">
            {formData.documents.map((file, index) => (
              <li key={index} className="text-sm text-gray-700">
                • {file.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            {language.code === "ar"
              ? "لا توجد مستندات مرفقة"
              : "No documents attached"}
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start">
          <input type="checkbox" id="terms" className="mt-1 mr-2" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
            {language.code === "ar"
              ? "أوافق على الشروط والأحكام وسياسة الخصوصية"
              : "I agree to the terms and conditions and privacy policy"}
          </label>
        </div>
      </div>
    </div>
  );
}
