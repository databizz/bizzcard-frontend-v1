"use client";

import { SignatureData, TemplateType } from "@/types/signature";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";

interface CardFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function CardForm({ data, onChange }: CardFormProps) {
  const { t } = useLanguage();
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(200);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const fontListRef = useRef<HTMLDivElement>(null);
  const fontButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (field: keyof SignatureData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
        setIsFontDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate dropdown position and scroll selected font into view
  useEffect(() => {
    if (isFontDropdownOpen && fontButtonRef.current) {
      const buttonRect = fontButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom - 20; // 20px padding from bottom
      const spaceAbove = buttonRect.top - 20; // 20px padding from top

      const minDropdownHeight = 150; // Minimum height to show at least 3 items
      const maxDropdownHeight = 350; // Maximum height to show about 7-8 items

      // Calculate ideal height based on number of items (15 fonts * ~40px per item)
      const idealHeight = fonts.length * 40;

      // Calculate what height we could use in each direction
      const heightIfOpenDown = Math.min(spaceBelow, maxDropdownHeight, idealHeight);
      const heightIfOpenUp = Math.min(spaceAbove, maxDropdownHeight, idealHeight);

      // Prioritize the direction that gives MORE space (less scroll needed)
      // Only open down if there's significantly more space down or they're similar
      if (heightIfOpenDown >= idealHeight) {
        // If we can fit everything opening down, prefer down (default behavior)
        setDropdownPosition('bottom');
        setDropdownMaxHeight(heightIfOpenDown);
      } else if (heightIfOpenUp >= idealHeight) {
        // If we can fit everything opening up, use up
        setDropdownPosition('top');
        setDropdownMaxHeight(heightIfOpenUp);
      } else if (heightIfOpenUp > heightIfOpenDown + 50) {
        // If opening up gives significantly more space (50px+), open up
        setDropdownPosition('top');
        setDropdownMaxHeight(Math.max(heightIfOpenUp, minDropdownHeight));
      } else {
        // Otherwise, use default behavior (open down)
        setDropdownPosition('bottom');
        setDropdownMaxHeight(Math.max(heightIfOpenDown, minDropdownHeight));
      }

      // Scroll selected font into view
      setTimeout(() => {
        if (fontListRef.current) {
          const selectedButton = fontListRef.current.querySelector('[class*="bg-primary-purple/5"]') as HTMLElement;
          if (selectedButton) {
            selectedButton.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      }, 0);
    }
  }, [isFontDropdownOpen]);

  const fonts = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "'Book Antiqua', serif", label: "Book Antiqua" },
    { value: "Calibri, sans-serif", label: "Calibri" },
    { value: "'Comic Sans MS', cursive", label: "Comic Sans MS" },
    { value: "'Courier New', Courier, monospace", label: "Courier New" },
    { value: "Garamond, serif", label: "Garamond" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "'Helvetica Neue', Helvetica, sans-serif", label: "Helvetica" },
    { value: "Impact, sans-serif", label: "Impact" },
    { value: "'Lucida Sans', sans-serif", label: "Lucida Sans" },
    { value: "'Palatino Linotype', Palatino, serif", label: "Palatino" },
    { value: "Tahoma, sans-serif", label: "Tahoma" },
    { value: "'Times New Roman', Times, serif", label: "Times New Roman" },
    { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
    { value: "Verdana, sans-serif", label: "Verdana" },
  ];

  const currentFont = fonts.find(f => f.value === data.fontFamily) || fonts[0];

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

          <div className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("textColor")}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.textColor || '#000000'}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.textColor || '#000000'}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="#000000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{t("textColorTip")}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("headerTextColor")}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.headerTextColor || '#FFFFFF'}
                  onChange={(e) => handleChange("headerTextColor", e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={data.headerTextColor || '#FFFFFF'}
                  onChange={(e) => handleChange("headerTextColor", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="#FFFFFF"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{t("headerTextColorTip")}</p>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fontFamily")}
              </label>
              <div className="relative" ref={fontDropdownRef}>
                {/* Custom Dropdown Button */}
                <button
                  ref={fontButtonRef}
                  type="button"
                  onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all bg-white text-left"
                  style={{ fontFamily: data.fontFamily || 'Arial, sans-serif', fontSize: '15px' }}
                >
                  {currentFont.label}
                </button>

                {/* Custom arrow icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className={`w-5 h-5 text-gray-700 transition-transform ${isFontDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Custom Dropdown Menu */}
                {isFontDropdownOpen && (
                  <div
                    ref={fontListRef}
                    className="absolute z-50 bg-white border-2 border-gray-300 rounded-lg shadow-xl"
                    style={{
                      left: 0,
                      right: 0,
                      maxHeight: `${dropdownMaxHeight}px`,
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      width: '100%',
                      ...(dropdownPosition === 'top'
                        ? { bottom: '100%', marginBottom: '4px' }
                        : { top: '100%', marginTop: '4px' })
                    }}
                  >
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        type="button"
                        onClick={() => {
                          handleChange("fontFamily", font.value);
                          setIsFontDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-primary-purple/10 transition-colors flex items-center ${
                          data.fontFamily === font.value ? 'bg-primary-purple/5' : ''
                        }`}
                        style={{
                          fontFamily: font.value,
                          fontSize: '15px'
                        }}
                      >
                        <span className="flex-1 truncate mr-2">
                          {font.label}
                        </span>
                        {data.fontFamily === font.value && (
                          <span className="text-primary-purple font-bold flex-shrink-0" style={{ width: '20px', textAlign: 'center' }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{t("fontFamilyTip")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
