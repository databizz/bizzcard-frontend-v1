"use client";

import { SignatureData } from "@/types/signature";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateUserId } from "@/lib/generateUserId";
import { generateRedirectLinks } from "@/lib/generateRedirectLinks";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Toast from "./Toast";

interface SignaturePreviewProps {
  data: SignatureData;
}

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const { limits } = useSubscription();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userId = generateUserId(data.email);
  const redirectLinks = generateRedirectLinks(userId, {
    website: data.website,
    phone: data.phone,
    instagram: data.socialMedia?.instagram || "",
    linkedin: data.socialMedia?.linkedin || "",
    email: data.email,
  });

  const getQRCodeSize = () => {
    switch (data.qrCode?.size) {
      case 'small': return 60;
      case 'large': return 100;
      default: return 80;
    }
  };

  const getSignatureHTML = (): string => {
    switch (data.template) {
      case "modern":
        return getModernTemplate();
      case "classic":
        return getClassicTemplate();
      case "minimal":
        return getMinimalTemplate();
      case "corporate":
        return getCorporateTemplate();
      case "creative":
        return getCreativeTemplate();
      case "elegant":
        return getElegantTemplate();
      default:
        return getMinimalTemplate();
    }
  };

  const getWatermark = () => {
    return isClient && limits.hasWatermark
      ? `
      <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #eee; text-align: center;">
        <div style="font-size: 10px; color: #999;">
          ${t('copyrightFree')}
        </div>
      </div>
    `
      : "";
  };

  const getQRCodeHTML = () => {
    if (!data.qrCode?.enabled || !data.qrCode?.url) return "";

    const qrCodeElement = document.getElementById('qr-code-temp');
    if (!qrCodeElement) return "";

    const svg = qrCodeElement.innerHTML;

    return `
      <div style="text-align: center; margin-top: 12px;">
        ${svg}
      </div>
    `;
  };

  const getModernTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Rubik', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
        <tr>
          <td style="padding: 20px; border-left: 4px solid ${data.primaryColor};">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="font-size: 18px; font-weight: bold; color: ${data.primaryColor}; margin-bottom: 4px;">
                    ${data.name}
                  </div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 12px;">
                    ${data.role}
                  </div>
                  ${data.company ? `<div style="font-size: 14px; font-weight: bold; color: #333; margin-bottom: 12px;">${data.company}</div>` : ""}
                  <div style="margin-top: 12px;">
                    ${data.email ? `<div style="margin-bottom: 4px;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
                    ${redirectLinks.phone ? `<div style="margin-bottom: 4px;">📱 <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
                    ${data.whatsapp ? `<div style="margin-bottom: 4px;">💬 <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a></div>` : ""}
                    ${redirectLinks.website ? `<div style="margin-bottom: 4px;">🌐 <a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
                    ${data.address ? `<div style="margin-bottom: 4px;">📍 ${data.address}</div>` : ""}
                  </div>
                  ${
                    redirectLinks.instagram || redirectLinks.linkedin
                      ? `
                    <div style="margin-top: 12px;">
                      ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="display: inline-block; margin-right: 8px; color: ${data.primaryColor}; text-decoration: none;">Instagram</a>` : ""}
                      ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="display: inline-block; margin-right: 8px; color: ${data.primaryColor}; text-decoration: none;">LinkedIn</a>` : ""}
                    </div>
                  `
                      : ""
                  }
                </td>
                ${
                  data.logo || data.qrCode?.enabled
                    ? `
                  <td style="padding-left: 20px; vertical-align: top; text-align: center;">
                    ${data.logo ? `<img src="${data.logo}" alt="Logo" style="max-width: 120px; height: auto; margin-bottom: 10px;" />` : ""}
                    ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
                  </td>
                `
                    : ""
                }
              </tr>
            </table>
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const getMinimalTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Rubik', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #000;">
        <tr>
          <td style="padding: 15px 0;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 2px;">
              ${data.name}
            </div>
            <div style="font-size: 13px; color: #666; margin-bottom: 10px;">
              ${data.role}${data.company ? ` • ${data.company}` : ""}
            </div>
            <div style="font-size: 13px;">
              ${data.email ? `<a href="mailto:${data.email}" style="color: #000; text-decoration: none;">${data.email}</a>` : ""}
              ${redirectLinks.phone ? ` • <a href="${redirectLinks.phone}" style="color: #000; text-decoration: none;">${data.phone}</a>` : ""}
            </div>
            ${data.whatsapp ? `<div style="font-size: 13px; margin-top: 4px;"><a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">💬 WhatsApp</a></div>` : ""}
            ${redirectLinks.website ? `<div style="font-size: 13px; margin-top: 4px;"><a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
            ${
              redirectLinks.instagram || redirectLinks.linkedin
                ? `
              <div style="font-size: 13px; margin-top: 4px;">
                ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="color: ${data.primaryColor}; text-decoration: none; margin-right: 8px;">Instagram</a>` : ""}
                ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="color: ${data.primaryColor}; text-decoration: none;">LinkedIn</a>` : ""}
              </div>
            `
                : ""
            }
            ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const getClassicTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, serif; font-size: 14px; line-height: 1.6; color: #333;">
        <tr>
          <td style="padding: 20px; background: #f9f9f9; border: 1px solid #e0e0e0;">
            ${
              data.logo
                ? `
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="${data.logo}" alt="Logo" style="max-width: 150px; height: auto;" />
              </div>
            `
                : ""
            }
            <div style="text-align: center; border-bottom: 2px solid ${data.primaryColor}; padding-bottom: 15px; margin-bottom: 15px;">
              <div style="font-size: 20px; font-weight: bold; color: ${data.primaryColor}; margin-bottom: 5px;">
                ${data.name}
              </div>
              <div style="font-size: 14px; font-style: italic; color: #666;">
                ${data.role}
              </div>
              ${data.company ? `<div style="font-size: 15px; font-weight: bold; color: #333; margin-top: 8px;">${data.company}</div>` : ""}
            </div>
            <div style="text-align: center;">
              ${data.email ? `<div style="margin-bottom: 6px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
              ${redirectLinks.phone ? `<div style="margin-bottom: 6px;"><strong>Tel:</strong> <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
              ${data.whatsapp ? `<div style="margin-bottom: 6px;"><strong>WhatsApp:</strong> <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${data.whatsapp}</a></div>` : ""}
              ${redirectLinks.website ? `<div style="margin-bottom: 6px;"><strong>Web:</strong> <a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
              ${data.address ? `<div style="margin-top: 10px; font-size: 12px; color: #666;">${data.address}</div>` : ""}
            </div>
            ${
              redirectLinks.instagram || redirectLinks.linkedin
                ? `
              <div style="margin-top: 12px; text-align: center;">
                ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="display: inline-block; margin-right: 8px; color: ${data.primaryColor}; text-decoration: none;">Instagram</a>` : ""}
                ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="display: inline-block; margin-right: 8px; color: ${data.primaryColor}; text-decoration: none;">LinkedIn</a>` : ""}
              </div>
            `
                : ""
            }
            ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const getCorporateTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Rubik', Arial, sans-serif; font-size: 14px; line-height: 1.6;">
        <tr>
          <td style="padding: 20px; background: linear-gradient(135deg, ${data.primaryColor} 0%, ${data.secondaryColor} 100%); color: white;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                ${
                  data.logo
                    ? `
                  <td style="width: 100px; vertical-align: middle;">
                    <img src="${data.logo}" alt="Logo" style="max-width: 90px; height: auto;" />
                  </td>
                `
                    : ""
                }
                <td style="vertical-align: middle; ${data.logo ? "padding-left: 20px;" : ""}">
                  <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">
                    ${data.name}
                  </div>
                  <div style="font-size: 14px; opacity: 0.9; margin-bottom: 3px;">
                    ${data.role}
                  </div>
                  ${data.company ? `<div style="font-size: 15px; font-weight: bold; opacity: 0.95;">${data.company}</div>` : ""}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; background: #ffffff; border: 1px solid #e0e0e0; border-top: none;">
            <div>
              ${data.email ? `<div style="margin-bottom: 6px; color: #333;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
              ${redirectLinks.phone ? `<div style="margin-bottom: 6px; color: #333;">📱 <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
              ${data.whatsapp ? `<div style="margin-bottom: 6px; color: #333;">💬 <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a></div>` : ""}
              ${redirectLinks.website ? `<div style="margin-bottom: 6px; color: #333;">🌐 <a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
              ${data.address ? `<div style="margin-bottom: 6px; color: #666;">📍 ${data.address}</div>` : ""}
            </div>
            ${
              redirectLinks.instagram || redirectLinks.linkedin
                ? `
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="display: inline-block; margin-right: 10px; padding: 5px 10px; background: ${data.primaryColor}; color: white; text-decoration: none; border-radius: 3px; font-size: 12px;">Instagram</a>` : ""}
                ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="display: inline-block; padding: 5px 10px; background: ${data.primaryColor}; color: white; text-decoration: none; border-radius: 3px; font-size: 12px;">LinkedIn</a>` : ""}
              </div>
            `
                : ""
            }
            ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const getCreativeTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Rubik', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; max-width: 500px;">
        <tr>
          <td style="padding: 25px; background: linear-gradient(135deg, ${data.primaryColor}15 0%, ${data.secondaryColor}15 100%); border-radius: 15px; border: 2px solid ${data.primaryColor};">
            <div style="background: white; padding: 20px; border-radius: 10px;">
              <div style="font-size: 22px; font-weight: bold; color: ${data.primaryColor}; margin-bottom: 5px;">
                ${data.name}
              </div>
              <div style="font-size: 15px; color: ${data.secondaryColor}; font-weight: 600; margin-bottom: 15px;">
                ${data.role}
              </div>
              ${data.company ? `<div style="font-size: 14px; color: #666; margin-bottom: 15px;">📍 ${data.company}</div>` : ""}

              <div style="background: ${data.primaryColor}10; padding: 12px; border-radius: 8px; margin-top: 12px;">
                ${data.email ? `<div style="margin-bottom: 6px;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 500;">${data.email}</a></div>` : ""}
                ${redirectLinks.phone ? `<div style="margin-bottom: 6px;">📱 <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
                ${data.whatsapp ? `<div style="margin-bottom: 6px;">💬 <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a></div>` : ""}
                ${redirectLinks.website ? `<div>🌐 <a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
              </div>

              ${
                redirectLinks.instagram || redirectLinks.linkedin
                  ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid ${data.primaryColor}20;">
                  ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="display: inline-block; margin-right: 8px; padding: 6px 12px; background: ${data.primaryColor}; color: white; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: 600;">Instagram</a>` : ""}
                  ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="display: inline-block; padding: 6px 12px; background: ${data.secondaryColor}; color: white; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: 600;">LinkedIn</a>` : ""}
                </div>
              `
                  : ""
              }
              ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
            </div>
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const getElegantTemplate = (): string => {
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Rubik', Georgia, serif; font-size: 14px; line-height: 1.8; color: #2c2c2c;">
        <tr>
          <td style="padding: 30px; border: 1px solid #e0e0e0; background: linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%);">
            ${
              data.logo
                ? `
              <div style="margin-bottom: 20px;">
                <img src="${data.logo}" alt="Logo" style="max-width: 140px; height: auto;" />
              </div>
            `
                : ""
            }
            <div style="border-left: 3px solid ${data.primaryColor}; padding-left: 15px; margin-bottom: 20px;">
              <div style="font-size: 22px; font-weight: 600; color: ${data.secondaryColor}; margin-bottom: 5px; letter-spacing: 0.5px;">
                ${data.name}
              </div>
              <div style="font-size: 14px; color: #666; font-style: italic;">
                ${data.role}
              </div>
              ${data.company ? `<div style="font-size: 15px; color: #333; margin-top: 8px; font-weight: 500;">${data.company}</div>` : ""}
            </div>

            <div style="font-size: 13px; line-height: 1.8;">
              ${data.email ? `<div style="margin-bottom: 5px;"><span style="color: #999;">✉</span> <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
              ${redirectLinks.phone ? `<div style="margin-bottom: 5px;"><span style="color: #999;">☎</span> <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
              ${data.whatsapp ? `<div style="margin-bottom: 5px;"><span style="color: #999;">💬</span> <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a></div>` : ""}
              ${redirectLinks.website ? `<div style="margin-bottom: 5px;"><span style="color: #999;">🌐</span> <a href="${redirectLinks.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a></div>` : ""}
              ${data.address ? `<div style="margin-top: 10px; color: #666; font-size: 12px;">${data.address}</div>` : ""}
            </div>

            ${
              redirectLinks.instagram || redirectLinks.linkedin
                ? `
              <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                ${redirectLinks.instagram ? `<a href="${redirectLinks.instagram}" style="display: inline-block; margin-right: 12px; color: ${data.primaryColor}; text-decoration: none; font-size: 13px;">Instagram →</a>` : ""}
                ${redirectLinks.linkedin ? `<a href="${redirectLinks.linkedin}" style="display: inline-block; color: ${data.secondaryColor}; text-decoration: none; font-size: 13px;">LinkedIn →</a>` : ""}
              </div>
            `
                : ""
            }
            ${data.qrCode?.enabled && data.qrCode?.url ? getQRCodeHTML() : ""}
            ${getWatermark()}
          </td>
        </tr>
      </table>
    `;
  };

  const copySignature = async () => {
    if (!limits.canCopySignature) {
      setToast({
        message: t('subscriptionNeeded'),
        type: 'error'
      });
      return;
    }

    const previewElement = document.getElementById("signature-preview");
    if (!previewElement) return;

    try {
      const html = getSignatureHTML();

      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob([previewElement.innerText], {
          type: "text/plain",
        });

        const clipboardItem = new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        });

        await navigator.clipboard.write([clipboardItem]);
        setToast({
          message: t('cardCopied'),
          type: 'success'
        });
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(previewElement);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        setToast({
          message: t('cardCopied'),
          type: 'success'
        });
      }
    } catch (error) {
      setToast({
        message: t('copyError'),
        type: 'error'
      });
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 font-rubik">
        {/* Hidden QR Code for copying */}
        {data.qrCode?.enabled && data.qrCode?.url && (
          <div id="qr-code-temp" style={{ display: 'none' }}>
            <QRCodeSVG
              value={data.qrCode.url}
              size={getQRCodeSize()}
              level="H"
            />
          </div>
        )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('preview')}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {data.platform === 'email' && t('platformEmail')}
                {data.platform === 'instagram' && t('platformInstagram')}
                {data.platform === 'linkedin' && t('platformLinkedin')}
                {data.platform === 'whatsapp' && t('platformWhatsapp')}
                {data.platform === 'embed' && t('platformEmbed')}
                {data.platform === 'vcard' && t('platformVcard')}
              </p>
            </div>
          </div>
          <button
            onClick={copySignature}
            disabled={isClient && !limits.canCopySignature}
            className={`group px-6 py-3 rounded-lg transition-all font-semibold flex items-center gap-2 ${
              !isClient || limits.canCopySignature
                ? "bg-primary-purple hover:bg-primary-purple/90 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {!isClient || limits.canCopySignature ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t('copyCard')}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                {t('locked')}
              </>
            )}
          </button>
        </div>
      </div>
      <div
        id="signature-preview"
        className={`border-2 border-dashed rounded-2xl p-6 transition-all ${
          !isClient || limits.canGenerateSignature
            ? "border-gray-200 bg-gradient-to-br from-gray-50 to-white"
            : "border-red-200 bg-red-50 opacity-60"
        }`}
        dangerouslySetInnerHTML={{ __html: getSignatureHTML() }}
      />
      {isClient && !limits.canGenerateSignature && (
        <div className="mt-4 bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-primary-purple" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm text-primary-purple font-semibold">
              {t('subscriptionRequired')}
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
