'use client';

import { Card } from '@/types/signature';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailSignaturePreviewProps {
  card: Card;
}

export default function EmailSignaturePreview({ card }: EmailSignaturePreviewProps) {
  const { language } = useLanguage();

  const cardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/card/${card.id}`
    : '';

  const getSvgIcon = (type: string, color: string): string => {
    const icons: Record<string, string> = {
      email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
      phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
      whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
      website: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
      location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
      linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
      facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
      twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`
    };
    return icons[type] || '';
  };

  const generateSignatureHTML = (): string => {
    // Generate different signature styles based on template
    switch (card.template) {
      case 'minimal':
        return generateMinimalSignature();
      case 'modern':
        return generateModernSignature();
      case 'corporate':
        return generateCorporateSignature();
      case 'classic':
        return generateClassicSignature();
      case 'creative':
        return generateCreativeSignature();
      case 'elegant':
        return generateElegantSignature();
      default:
        return generateModernSignature();
    }
  };

  // Minimal signature - clean and simple
  const generateMinimalSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333333; max-width: 700px;">
  <tr>
    <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align: top;">
            <div style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 2px;">
              ${card.name}
            </div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 10px;">
              ${card.role}${card.company ? ` • ${card.company}` : ''}
            </div>
            <div style="font-size: 12px; color: #4b5563; line-height: 1.6;">
              ${card.email ? `<div style="margin-bottom: 2px;">${getSvgIcon('email', '#6b7280')} <a href="mailto:${card.email}" style="color: #4b5563; text-decoration: none;">${card.email}</a></div>` : ''}
              ${card.phone ? `<div style="margin-bottom: 2px;">${getSvgIcon('phone', '#6b7280')} <a href="tel:${card.phone}" style="color: #4b5563; text-decoration: none;">${card.phone}</a></div>` : ''}
              ${card.website ? `<div>${getSvgIcon('website', '#6b7280')} <a href="${card.website}" style="color: #4b5563; text-decoration: none;">${card.website}</a></div>` : ''}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px;">
      <div style="font-size: 10px; color: #9ca3af; text-align: left;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  // Modern signature - bold colors and geometric design
  const generateModernSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333333; max-width: 700px;">
  <tr>
    <td style="padding: 20px 0; border-bottom: 3px solid ${card.primaryColor};">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 20px; vertical-align: top;">
            <img src="${card.logo}" alt="${card.company}" width="80" height="80" style="display: block; border-radius: 8px;" />
          </td>
          ` : ''}
          <td style="vertical-align: top;">
            <div style="font-size: 18px; font-weight: bold; color: ${card.primaryColor}; margin-bottom: 4px;">
              ${card.name}
            </div>
            <div style="font-size: 14px; color: ${card.secondaryColor}; font-weight: 600; margin-bottom: 2px;">
              ${card.role}
            </div>
            ${card.company ? `<div style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">${card.company}</div>` : ''}
            <div style="font-size: 13px; color: #4b5563; line-height: 1.8;">
              ${card.email ? `<div style="margin-bottom: 4px;">${getSvgIcon('email', card.secondaryColor)} <a href="mailto:${card.email}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.email}</a></div>` : ''}
              ${card.phone ? `<div style="margin-bottom: 4px;">${getSvgIcon('phone', card.secondaryColor)} <a href="tel:${card.phone}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.phone}</a></div>` : ''}
              ${card.whatsapp ? `<div style="margin-bottom: 4px;">${getSvgIcon('whatsapp', card.secondaryColor)} <a href="https://wa.me/${card.whatsapp.replace(/\D/g, '')}" style="color: ${card.secondaryColor}; text-decoration: none;">WhatsApp</a></div>` : ''}
              ${card.website ? `<div>${getSvgIcon('website', card.secondaryColor)} <a href="${card.website}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.website}</a></div>` : ''}
            </div>
            ${(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) ? `
            <div style="margin-top: 12px; display: flex; align-items: center;">
              ${card.socialMedia.instagram ? `<a href="${card.socialMedia.instagram}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('instagram', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.linkedin ? `<a href="${card.socialMedia.linkedin}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('linkedin', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.facebook ? `<a href="${card.socialMedia.facebook}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('facebook', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.twitter ? `<a href="${card.socialMedia.twitter}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('twitter', card.secondaryColor)}</a>` : ''}
            </div>
            ` : ''}
          </td>
          <td style="padding-left: 20px; vertical-align: middle; text-align: center;">
            <div style="margin-bottom: 8px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="110" height="110" style="display: block;" />
            </div>
            <div style="font-size: 9px; color: #9ca3af;">
              ${language === 'pt-BR' ? 'Escanear' : 'Scan'}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 12px;">
      <div style="font-size: 11px; color: #9ca3af; text-align: center;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  // Corporate signature - professional with structured layout
  const generateCorporateSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, 'Times New Roman', serif; font-size: 14px; line-height: 1.5; color: #1f2937; max-width: 700px;">
  <tr>
    <td style="padding: 20px; background-color: #f9fafb; border-left: 4px solid ${card.primaryColor};">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 24px; vertical-align: top;">
            <img src="${card.logo}" alt="${card.company}" width="90" height="90" style="display: block; border-radius: 4px;" />
          </td>
          ` : ''}
          <td style="vertical-align: top;">
            <div style="font-size: 19px; font-weight: bold; color: ${card.primaryColor}; margin-bottom: 6px;">
              ${card.name}
            </div>
            <div style="font-size: 14px; color: #374151; font-weight: 600; margin-bottom: 4px;">
              ${card.role}
            </div>
            ${card.company ? `<div style="font-size: 13px; color: #6b7280; margin-bottom: 14px; font-style: italic;">${card.company}</div>` : ''}
            <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #4b5563;">
              ${card.email ? `<tr><td style="padding-bottom: 6px; vertical-align: top;">${getSvgIcon('email', card.primaryColor)}</td><td style="padding-bottom: 6px; padding-left: 4px;"><a href="mailto:${card.email}" style="color: #4b5563; text-decoration: none;">${card.email}</a></td></tr>` : ''}
              ${card.phone ? `<tr><td style="padding-bottom: 6px; vertical-align: top;">${getSvgIcon('phone', card.primaryColor)}</td><td style="padding-bottom: 6px; padding-left: 4px;"><a href="tel:${card.phone}" style="color: #4b5563; text-decoration: none;">${card.phone}</a></td></tr>` : ''}
              ${card.website ? `<tr><td style="padding-bottom: 6px; vertical-align: top;">${getSvgIcon('website', card.primaryColor)}</td><td style="padding-bottom: 6px; padding-left: 4px;"><a href="${card.website}" style="color: #4b5563; text-decoration: none;">${card.website}</a></td></tr>` : ''}
              ${card.address ? `<tr><td style="vertical-align: top;">${getSvgIcon('location', card.primaryColor)}</td><td style="padding-left: 4px;">${card.address}</td></tr>` : ''}
            </table>
          </td>
          <td style="padding-left: 20px; vertical-align: top; text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="100" height="100" style="display: block;" />
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px; padding-left: 4px;">
      <div style="font-size: 10px; color: #9ca3af; text-align: left;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  // Classic signature - traditional and timeless
  const generateClassicSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Times New Roman', Times, serif; font-size: 14px; line-height: 1.5; color: #1f2937; max-width: 700px;">
  <tr>
    <td style="padding: 18px 0; border-top: 2px solid #1f2937; border-bottom: 2px solid #1f2937;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 22px; vertical-align: middle;">
            <img src="${card.logo}" alt="${card.company}" width="75" height="75" style="display: block; border-radius: 50%; border: 2px solid ${card.primaryColor};" />
          </td>
          ` : ''}
          <td style="vertical-align: middle;">
            <div style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 4px; letter-spacing: 0.5px;">
              ${card.name}
            </div>
            <div style="font-size: 13px; color: ${card.primaryColor}; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
              ${card.role}
            </div>
            ${card.company ? `<div style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">${card.company}</div>` : ''}
            <div style="font-size: 12px; color: #4b5563; line-height: 1.7;">
              ${card.email ? `<div style="margin-bottom: 3px;">${getSvgIcon('email', '#1f2937')} <a href="mailto:${card.email}" style="color: #1f2937; text-decoration: none;">${card.email}</a></div>` : ''}
              ${card.phone ? `<div style="margin-bottom: 3px;">${getSvgIcon('phone', '#1f2937')} <a href="tel:${card.phone}" style="color: #1f2937; text-decoration: none;">${card.phone}</a></div>` : ''}
              ${card.website ? `<div>${getSvgIcon('website', '#1f2937')} <a href="${card.website}" style="color: #1f2937; text-decoration: none;">${card.website}</a></div>` : ''}
            </div>
          </td>
          <td style="padding-left: 24px; vertical-align: middle; text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="95" height="95" style="display: block; border: 1px solid #e5e7eb;" />
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px;">
      <div style="font-size: 10px; color: #9ca3af; text-align: center;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  // Creative signature - playful and colorful
  const generateCreativeSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive; font-size: 14px; line-height: 1.5; color: #1f2937; max-width: 700px;">
  <tr>
    <td style="padding: 22px; background: linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.secondaryColor}15 100%); border-radius: 12px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 20px; vertical-align: middle;">
            <img src="${card.logo}" alt="${card.company}" width="85" height="85" style="display: block; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
          </td>
          ` : ''}
          <td style="vertical-align: middle;">
            <div style="font-size: 20px; font-weight: bold; color: ${card.primaryColor}; margin-bottom: 4px;">
              ${card.name}
            </div>
            <div style="font-size: 15px; color: ${card.secondaryColor}; font-weight: 600; margin-bottom: 10px;">
              ${card.role}
            </div>
            ${card.company ? `<div style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">${card.company}</div>` : ''}
            <div style="font-size: 13px; color: #4b5563; line-height: 1.7;">
              ${card.email ? `<div style="margin-bottom: 5px;">${getSvgIcon('email', card.secondaryColor)} <a href="mailto:${card.email}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.email}</a></div>` : ''}
              ${card.phone ? `<div style="margin-bottom: 5px;">${getSvgIcon('phone', card.secondaryColor)} <a href="tel:${card.phone}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.phone}</a></div>` : ''}
              ${card.whatsapp ? `<div style="margin-bottom: 5px;">${getSvgIcon('whatsapp', card.secondaryColor)} <a href="https://wa.me/${card.whatsapp.replace(/\D/g, '')}" style="color: ${card.secondaryColor}; text-decoration: none;">WhatsApp</a></div>` : ''}
              ${card.website ? `<div>${getSvgIcon('website', card.secondaryColor)} <a href="${card.website}" style="color: ${card.secondaryColor}; text-decoration: none;">${card.website}</a></div>` : ''}
            </div>
            ${(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) ? `
            <div style="margin-top: 10px; display: flex; align-items: center;">
              ${card.socialMedia.instagram ? `<a href="${card.socialMedia.instagram}" style="color: ${card.primaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('instagram', card.primaryColor)}</a>` : ''}
              ${card.socialMedia.linkedin ? `<a href="${card.socialMedia.linkedin}" style="color: ${card.primaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('linkedin', card.primaryColor)}</a>` : ''}
              ${card.socialMedia.facebook ? `<a href="${card.socialMedia.facebook}" style="color: ${card.primaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('facebook', card.primaryColor)}</a>` : ''}
              ${card.socialMedia.twitter ? `<a href="${card.socialMedia.twitter}" style="color: ${card.primaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('twitter', card.primaryColor)}</a>` : ''}
            </div>
            ` : ''}
          </td>
          <td style="padding-left: 20px; vertical-align: middle; text-align: center;">
            <div style="background-color: white; padding: 8px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=105x105&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="105" height="105" style="display: block;" />
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px;">
      <div style="font-size: 11px; color: #9ca3af; text-align: center;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  // Elegant signature - sophisticated and refined
  const generateElegantSignature = (): string => {
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; line-height: 1.5; color: #1f2937; max-width: 700px;">
  <tr>
    <td style="padding: 24px 0; border-top: 1px solid ${card.primaryColor}; border-bottom: 1px solid ${card.primaryColor};">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${card.logo ? `
          <td style="padding-right: 24px; vertical-align: middle;">
            <img src="${card.logo}" alt="${card.company}" width="80" height="80" style="display: block; border-radius: 8px; border: 1px solid #e5e7eb;" />
          </td>
          ` : ''}
          <td style="vertical-align: middle;">
            <div style="font-size: 22px; font-weight: 600; color: ${card.primaryColor}; margin-bottom: 6px; font-style: italic;">
              ${card.name}
            </div>
            <div style="font-size: 14px; color: ${card.secondaryColor}; margin-bottom: 4px; letter-spacing: 1px;">
              ${card.role}
            </div>
            ${card.company ? `<div style="font-size: 12px; color: #9ca3af; margin-bottom: 14px;">${card.company}</div>` : ''}
            <div style="font-size: 12px; color: #6b7280; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
              ${card.email ? `<div style="margin-bottom: 4px;">${getSvgIcon('email', card.primaryColor)} <a href="mailto:${card.email}" style="color: ${card.primaryColor}; text-decoration: none;">${card.email}</a></div>` : ''}
              ${card.phone ? `<div style="margin-bottom: 4px;">${getSvgIcon('phone', card.primaryColor)} <a href="tel:${card.phone}" style="color: ${card.primaryColor}; text-decoration: none;">${card.phone}</a></div>` : ''}
              ${card.website ? `<div>${getSvgIcon('website', card.primaryColor)} <a href="${card.website}" style="color: ${card.primaryColor}; text-decoration: none;">${card.website}</a></div>` : ''}
            </div>
            ${(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) ? `
            <div style="margin-top: 12px; display: flex; align-items: center; gap: 4px;">
              ${card.socialMedia.instagram ? `<a href="${card.socialMedia.instagram}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('instagram', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.linkedin ? `<a href="${card.socialMedia.linkedin}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('linkedin', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.facebook ? `<a href="${card.socialMedia.facebook}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('facebook', card.secondaryColor)}</a>` : ''}
              ${card.socialMedia.twitter ? `<a href="${card.socialMedia.twitter}" style="color: ${card.secondaryColor}; text-decoration: none; display: inline-flex;">${getSvgIcon('twitter', card.secondaryColor)}</a>` : ''}
            </div>
            ` : ''}
          </td>
          <td style="padding-left: 28px; vertical-align: middle; text-align: center;">
            <div style="border: 2px solid ${card.primaryColor}; padding: 6px; border-radius: 8px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(cardUrl)}" alt="QR Code" width="100" height="100" style="display: block;" />
            </div>
            <div style="font-size: 9px; color: #9ca3af; margin-top: 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
              ${language === 'pt-BR' ? 'Escaneie' : 'Scan'}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 12px;">
      <div style="font-size: 11px; color: #9ca3af; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        © <a href="https://databizz.com.br/" target="_blank" rel="noopener noreferrer" style="color: #9ca3af; text-decoration: none;">Databizz</a>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  return (
    <div className="w-full">
      <div
        className="bg-white border border-gray-200 rounded-lg p-6 overflow-auto"
        style={{ maxHeight: '500px' }}
        dangerouslySetInnerHTML={{ __html: generateSignatureHTML() }}
      />
    </div>
  );
}
