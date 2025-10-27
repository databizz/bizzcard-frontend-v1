'use client';

import { SignatureData, TemplateType } from '@/types/signature';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface CardFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function CardForm({ data, onChange }: CardFormProps) {
  const { limits, subscription } = useSubscription();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const templates: { value: TemplateType; label: string; description: string }[] = [
    { value: 'modern', label: t('modern'), description: t('modernDesc') },
    { value: 'classic', label: t('classic'), description: t('classicDesc') },
    { value: 'minimal', label: t('minimal'), description: t('minimalDesc') },
    { value: 'corporate', label: t('corporate'), description: t('corporateDesc') },
    { value: 'creative', label: t('creative'), description: t('creativeDesc') },
    { value: 'elegant', label: t('elegant'), description: t('elegantDesc') },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 font-rubik">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t('customize')}</h3>
      </div>

      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            {t('chooseTemplate')}
            {isClient && subscription.plan === 'free' && (
              <span className="ml-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {t('freeMinimalOnly')}
              </span>
            )}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => {
              const isAvailable = isClient ? limits.availableTemplates.includes(template.value) : true;
              const isLocked = !isAvailable;

              return (
                <button
                  key={template.value}
                  onClick={() => isAvailable && handleChange('template', template.value)}
                  disabled={isLocked}
                  className={`p-4 border-2 rounded-xl text-left transition-all relative font-rubik ${
                    data.template === template.value
                      ? 'border-primary-purple bg-primary-purple/5'
                      : isLocked
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-primary-yellow'
                  }`}
                >
                  {isClient && isLocked && (
                    <div className="absolute top-2 right-2 text-lg">🔒</div>
                  )}
                  <div className="font-semibold text-sm">{template.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                  {isClient && isLocked && (
                    <div className="text-xs text-primary-purple mt-1 font-medium">Upgrade PRO</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">{t('personalInfo')}</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')} *
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('position')} *
              </label>
              <input
                type="text"
                value={data.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourPosition')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('company')}
              </label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourCompany')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')} *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourEmail')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourPhone')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('whatsapp')}
              </label>
              <input
                type="tel"
                value={data.whatsapp || ''}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourWhatsapp')}
              />
              <p className="text-xs text-gray-500 mt-1">{t('whatsappTipText')}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('websiteUrl')}
              </label>
              <input
                type="url"
                value={data.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('yourWebsite')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')}
              </label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                placeholder={t('cityState')}
              />
            </div>

            {/* Logo URL */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('logoUrl')}
                {isClient && !limits.canUploadLogo && (
                  <span className="ml-2 text-xs text-primary-purple bg-purple-50 px-2 py-1 rounded">
                    🔒 PRO
                  </span>
                )}
              </label>
              <input
                type="url"
                value={data.logo || ''}
                onChange={(e) => handleChange('logo', e.target.value)}
                disabled={isClient && !limits.canUploadLogo}
                className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent ${
                  isClient && !limits.canUploadLogo ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
                }`}
                placeholder={isClient && !limits.canUploadLogo ? t('availableProOnly') : t('logoExample')}
              />
              <p className="text-xs text-gray-500 mt-1">
                {isClient && !limits.canUploadLogo
                  ? t('upgradeForLogo')
                  : t('logoTip')
                }
              </p>
            </div>
          </div>
        </div>

        {/* Social Networks Section */}
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-bold text-gray-900 mb-4">
            {t('socialNetworks')}
          </label>
          <div className="space-y-3">
            <input
              type="url"
              value={data.socialMedia?.instagram || ''}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder={t('instagramUrl')}
            />
            <input
              type="url"
              value={data.socialMedia?.linkedin || ''}
              onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder={t('linkedinUrl')}
            />
            <input
              type="url"
              value={data.socialMedia?.facebook || ''}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="Facebook URL"
            />
            <input
              type="url"
              value={data.socialMedia?.twitter || ''}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
              placeholder="Twitter/X URL"
            />
          </div>
        </div>

        {/* Card Design Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">{t('cardDesign')}</h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('primaryColor')}
                {isClient && !limits.canCustomizeColors && (
                  <span className="ml-2 text-xs text-primary-purple bg-purple-50 px-2 py-1 rounded">
                    🔒 PRO
                  </span>
                )}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  disabled={isClient && !limits.canCustomizeColors}
                  className={`h-10 w-20 border border-gray-300 rounded-lg ${
                    !isClient || limits.canCustomizeColors ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                />
                <input
                  type="text"
                  value={data.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  disabled={isClient && !limits.canCustomizeColors}
                  className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent ${
                    isClient && !limits.canCustomizeColors ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
                  }`}
                  placeholder="#FFC400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('secondaryColor')}
                {isClient && !limits.canCustomizeColors && (
                  <span className="ml-2 text-xs text-primary-purple bg-purple-50 px-2 py-1 rounded">
                    🔒 PRO
                  </span>
                )}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  disabled={isClient && !limits.canCustomizeColors}
                  className={`h-10 w-20 border border-gray-300 rounded-lg ${
                    !isClient || limits.canCustomizeColors ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                />
                <input
                  type="text"
                  value={data.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  disabled={isClient && !limits.canCustomizeColors}
                  className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent ${
                    isClient && !limits.canCustomizeColors ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
                  }`}
                  placeholder="#84087E"
                />
              </div>
            </div>
          </div>

          {isClient && !limits.canCustomizeColors && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-primary-purple">
                {t('upgradeForColors')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
