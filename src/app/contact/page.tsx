"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useLanguageToggle } from "@/lib/store";
import { getLocalizedText } from "@/lib/utils";

export default function ContactPage() {
  const { language, toggleLanguage } = useLanguageToggle();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language.code === "ar" ? "تواصل معنا" : "Contact Us"}
                </h1>
                <p className="mt-2 text-gray-600">
                  {language.code === "ar"
                    ? "نحن هنا لمساعدتك مع خدماتنا الرقمية"
                    : "We're here to help you with our digital services"}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language.code === "ar"
                ? "معلومات التواصل"
                : "Contact Information"}
            </h2>

            <div className="space-y-6">
              <div className="flex items-center">
                <PhoneIcon className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">+961 1 123 456</p>
                  <p className="text-gray-600">
                    {language.code === "ar"
                      ? "خط المساعدة على مدار الساعة"
                      : "24/7 Support Hotline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">
                    support@digital.gov.lb
                  </p>
                  <p className="text-gray-600">
                    {language.code === "ar"
                      ? "الرد خلال 24 ساعة"
                      : "Response within 24 hours"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">
                    {language.code === "ar"
                      ? "السراي الحكومي، وسط بيروت"
                      : "Government Palace, Downtown Beirut"}
                  </p>
                  <p className="text-gray-600">
                    {language.code === "ar" ? "لبنان" : "Lebanon"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language.code === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
            </h2>

            <div className="text-center py-12">
              <p className="text-gray-600">
                {language.code === "ar"
                  ? "نموذج التواصل سيكون متاحاً قريباً"
                  : "Contact form will be available soon"}
              </p>
              <Link href="/help" className="btn-primary mt-4 inline-block">
                {language.code === "ar" ? "مركز المساعدة" : "Help Center"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
