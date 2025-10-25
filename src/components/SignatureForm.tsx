'use client';

import { SignatureData, TemplateType } from '@/types/signature';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useEffect, useState } from 'react';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function SignatureForm({ data, onChange }: SignatureFormProps) {
  const { limits, subscription } = useSubscription();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const placeholders = {
    name: 'Seu Nome',
    role: 'Seu Cargo',
    company: 'Sua Empresa',
    phone: '+55 (00) 00000-0000',
    email: 'seu.email@empresa.com.br',
    website: 'https://www.suaempresa.com.br',
    address: 'Cidade | Estado',
  };

  const handleChange = (field: keyof SignatureData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, field: keyof typeof placeholders) => {
    // Clear if it's a placeholder value
    if (data[field] === placeholders[field]) {
      handleChange(field, '');
    }
    // Select all text
    e.target.select();
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
    { value: 'modern', label: 'Moderno', description: 'Design clean com borda colorida' },
    { value: 'classic', label: 'Clássico', description: 'Estilo tradicional e elegante' },
    { value: 'minimal', label: 'Minimalista', description: 'Simples e direto' },
    { value: 'corporate', label: 'Corporativo', description: 'Profissional com destaque' },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Personalize sua Assinatura</h3>

      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Escolha o Template
            {isClient && subscription.plan === 'free' && (
              <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                FREE: apenas Minimalista
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
                  className={`p-4 border-2 rounded-lg text-left transition-all relative ${
                    data.template === template.value
                      ? 'border-blue-600 bg-blue-50'
                      : isLocked
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {isClient && isLocked && (
                    <div className="absolute top-2 right-2 text-lg">🔒</div>
                  )}
                  <div className="font-semibold text-sm">{template.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                  {isClient && isLocked && (
                    <div className="text-xs text-purple-600 mt-1 font-medium">Upgrade PRO</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onFocus={(e) => handleFocus(e, 'name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Seu Nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo *
          </label>
          <input
            type="text"
            value={data.role}
            onChange={(e) => handleChange('role', e.target.value)}
            onFocus={(e) => handleFocus(e, 'role')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Seu Cargo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
          </label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => handleChange('company', e.target.value)}
            onFocus={(e) => handleFocus(e, 'company')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Sua Empresa"
          />
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onFocus={(e) => handleFocus(e, 'phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+55 (00) 00000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onFocus={(e) => handleFocus(e, 'email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="seu.email@empresa.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            onFocus={(e) => handleFocus(e, 'website')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="https://www.suaempresa.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onFocus={(e) => handleFocus(e, 'address')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Cidade | Estado"
          />
        </div>

        {/* Logo URL */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL do Logo
            {isClient && !limits.canUploadLogo && (
              <span className="ml-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded font-medium">
                🔒 PRO
              </span>
            )}
          </label>
          <input
            type="url"
            value={data.logo || ''}
            onChange={(e) => handleChange('logo', e.target.value)}
            disabled={isClient && !limits.canUploadLogo}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isClient && !limits.canUploadLogo ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
            }`}
            placeholder={isClient && !limits.canUploadLogo ? 'Disponível apenas no plano PRO' : 'https://exemplo.com/logo.png'}
          />
          <p className="text-xs text-gray-500 mt-1">
            {isClient && !limits.canUploadLogo
              ? 'Upgrade para PRO para adicionar seu logo personalizado'
              : 'Use um link público da sua logo (ex: Imgur, Dropbox, seu site)'
            }
          </p>
        </div>

        {/* Social Media */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Redes Sociais
            {isClient && limits.maxSocialNetworks === 1 && (
              <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                FREE: apenas 1 rede social
              </span>
            )}
          </label>
          <div className="space-y-3">
            <input
              type="url"
              value={data.socialMedia?.instagram || ''}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Instagram URL"
            />
            <div className="relative">
              <input
                type="url"
                value={data.socialMedia?.linkedin || ''}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                disabled={isClient && limits.maxSocialNetworks === 1 && !!data.socialMedia?.instagram}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isClient && limits.maxSocialNetworks === 1 && !!data.socialMedia?.instagram
                    ? 'bg-gray-50 cursor-not-allowed opacity-60'
                    : ''
                }`}
                placeholder={
                  isClient && limits.maxSocialNetworks === 1 && !!data.socialMedia?.instagram
                    ? '🔒 Limpe o Instagram ou faça upgrade para PRO'
                    : 'LinkedIn URL'
                }
              />
              {isClient && limits.maxSocialNetworks === 1 && !!data.socialMedia?.instagram && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-600 font-medium">
                  PRO
                </div>
              )}
            </div>
          </div>
          {isClient && !limits.canUseMultipleSocials && (
            <p className="text-xs text-gray-500 mt-2">
              💡 Upgrade para PRO e adicione múltiplas redes sociais
            </p>
          )}
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cor Primária
              {isClient && !limits.canCustomizeColors && (
                <span className="ml-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded font-medium">
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
                className={`h-10 w-20 border border-gray-300 rounded ${
                  !isClient || limits.canCustomizeColors ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              />
              <input
                type="text"
                value={data.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                disabled={isClient && !limits.canCustomizeColors}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isClient && !limits.canCustomizeColors ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
                }`}
                placeholder="#3B82F6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cor Secundária
              {isClient && !limits.canCustomizeColors && (
                <span className="ml-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded font-medium">
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
                className={`h-10 w-20 border border-gray-300 rounded ${
                  !isClient || limits.canCustomizeColors ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              />
              <input
                type="text"
                value={data.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                disabled={isClient && !limits.canCustomizeColors}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isClient && !limits.canCustomizeColors ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''
                }`}
                placeholder="#1E40AF"
              />
            </div>
          </div>
        </div>
        {isClient && !limits.canCustomizeColors && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-700">
              💡 Upgrade para PRO e personalize as cores da sua assinatura para combinar com sua marca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
