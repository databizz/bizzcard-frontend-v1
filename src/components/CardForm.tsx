"use client";

import { SignatureData, TemplateType } from "@/types/signature";
import { useLanguage } from "@/contexts/LanguageContext";

interface CardFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function CardForm({ data, onChange }: CardFormProps) {
  const { t } = useLanguage();

  const handleChange = (field: keyof SignatureData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    onChange({
      ...data,
      socialMedia: {
        ...data.socialMedia,
        [platform]: value,
      },
    });
  };

  const templates: {
    value: TemplateType;
    label: string;
    description: string;
  }[] = [
    { value: "minimal", label: t("minimal"), description: t("minimalDesc") },
    { value: "modern", label: t("modern"), description: t("modernDesc") },
    {
      value: "corporate",
      label: t("corporate"),
      description: t("corporateDesc"),
    },
    { value: "classic", label: t("classic"), description: t("classicDesc") },
    { value: "creative", label: t("creative"), description: t("creativeDesc") },
    { value: "elegant", label: t("elegant"), description: t("elegantDesc") },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 font-rubik">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t("customize")}</h3>
      </div>

      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            {t("chooseTemplate")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.value}
                onClick={() => handleChange("template", template.value)}
                className={`p-4 border-2 rounded-xl text-left transition-all font-rubik ${
                  data.template === template.value
                    ? "border-primary-purple bg-primary-purple/5"
                    : "border-gray-200 hover:border-primary-yellow"
                }`}
              >
                <div className="font-semibold text-sm">{template.label}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">
            {t("personalInfo")}
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fullName")} *
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourName")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("position")} *
              </label>
              <input
                type="text"
                value={data.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourPosition")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("company")}
              </label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourCompany")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("email")} *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourEmail")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("phone")}
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourPhone")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("whatsapp")}
              </label>
              <input
                type="tel"
                value={data.whatsapp || ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourWhatsapp")}
              />
              <p className="text-xs text-gray-500 mt-1">
                {t("whatsappTipText")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("websiteUrl")}
              </label>
              <input
                type="url"
                value={data.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("yourWebsite")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("address")}
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("cityState")}
              />
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("logoUrl")}
              </label>
              <input
                type="url"
                value={data.logo || ""}
                onChange={(e) => handleChange("logo", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t("logoExample")}
              />
              <p className="text-xs text-gray-500 mt-1">{t("logoTip")}</p>
            </div>
          </div>
        </div>

        {/* Social Networks Section */}
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-bold text-gray-900 mb-4">
            {t("socialNetworks")}
          </label>
          <div className="space-y-3">
            <input
              type="url"
              value={data.socialMedia?.instagram || ""}
              onChange={(e) =>
                handleSocialMediaChange("instagram", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder={t("instagramUrl")}
            />
            <input
              type="url"
              value={data.socialMedia?.linkedin || ""}
              onChange={(e) =>
                handleSocialMediaChange("linkedin", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder={t("linkedinUrl")}
            />
            <input
              type="url"
              value={data.socialMedia?.facebook || ""}
              onChange={(e) =>
                handleSocialMediaChange("facebook", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="Facebook URL"
            />
            <input
              type="url"
              value={data.socialMedia?.twitter || ""}
              onChange={(e) =>
                handleSocialMediaChange("twitter", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="Twitter/X URL"
            />
            <input
              type="url"
              value={data.socialMedia?.youtube || ""}
              onChange={(e) =>
                handleSocialMediaChange("youtube", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="YouTube URL"
            />
            <input
              type="url"
              value={data.socialMedia?.tiktok || ""}
              onChange={(e) =>
                handleSocialMediaChange("tiktok", e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="TikTok URL"
            />
          </div>
        </div>

        {/* Card Design Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">
            {t("cardDesign")}
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("primaryColor")}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="#FFC400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("secondaryColor")}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.secondaryColor}
                  onChange={(e) =>
                    handleChange("secondaryColor", e.target.value)
                  }
                  className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.secondaryColor}
                  onChange={(e) =>
                    handleChange("secondaryColor", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="#84087E"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
