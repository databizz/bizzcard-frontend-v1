"use client";

import { SignatureData } from "@/types/signature";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { generateUserId } from "@/lib/generateUserId";
import { generateRedirectLinks } from "@/lib/generateRedirectLinks";
import { useEffect, useState } from "react";

interface SignaturePreviewProps {
  data: SignatureData;
}

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const { limits } = useSubscription();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gerar ID único do usuário e links de redirecionamento
  const userId = generateUserId(data.email);
  const redirectLinks = generateRedirectLinks(userId, {
    website: data.website,
    phone: data.phone,
    instagram: data.socialMedia?.instagram || "",
    linkedin: data.socialMedia?.linkedin || "",
    email: data.email,
  });

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
      default:
        return getModernTemplate();
    }
  };

  const getModernTemplate = (): string => {
    const watermark =
      isClient && limits.hasWatermark
        ? `
      <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #eee; text-align: center;">
        <div style="font-size: 11px; color: #999; margin-bottom: 4px;">
          ⚡ Assinatura criada com <a href="#" style="color: #6366f1; text-decoration: none; font-weight: bold;">GenSign</a>
        </div>
        <div style="font-size: 10px; color: #aaa;">
          Crie a sua gratuitamente • <a href="#" style="color: #6366f1; text-decoration: none;">Faça upgrade para PRO</a> e remova esta marca
        </div>
      </div>
    `
        : "";

    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
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
                    ${redirectLinks.phone ? `<div style="margin-bottom: 4px;">📱 <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
                    ${data.email ? `<div style="margin-bottom: 4px;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
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
                  data.logo
                    ? `
                  <td style="padding-left: 20px; vertical-align: top;">
                    <img src="${data.logo}" alt="Logo" style="max-width: 120px; height: auto;" />
                  </td>
                `
                    : ""
                }
              </tr>
            </table>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; font-size: 11px; color: #999;">
              Esta mensagem e seus anexos contêm informações confidenciais e protegidas pelo privilégio legal de comunicação entre advogado e cliente.
            </div>
            ${watermark}
          </td>
        </tr>
      </table>
    `;
  };

  const getClassicTemplate = (): string => {
    const watermark =
      isClient && limits.hasWatermark
        ? `
      <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #eee; text-align: center;">
        <div style="font-size: 11px; color: #999; margin-bottom: 4px;">
          ⚡ Assinatura criada com <a href="#" style="color: #6366f1; text-decoration: none; font-weight: bold;">GenSign</a>
        </div>
        <div style="font-size: 10px; color: #aaa;">
          Crie a sua gratuitamente • <a href="#" style="color: #6366f1; text-decoration: none;">Faça upgrade para PRO</a> e remova esta marca
        </div>
      </div>
    `
        : "";

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
              ${redirectLinks.phone ? `<div style="margin-bottom: 6px;"><strong>Tel:</strong> <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
              ${data.email ? `<div style="margin-bottom: 6px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
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
            ${watermark}
          </td>
        </tr>
      </table>
    `;
  };

  const getMinimalTemplate = (): string => {
    const watermark =
      isClient && limits.hasWatermark
        ? `
      <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #eee; text-align: center;">
        <div style="font-size: 11px; color: #999; margin-bottom: 4px;">
          ⚡ Assinatura criada com <a href="#" style="color: #6366f1; text-decoration: none; font-weight: bold;">GenSign</a>
        </div>
        <div style="font-size: 10px; color: #aaa;">
          Crie a sua gratuitamente • <a href="#" style="color: #6366f1; text-decoration: none;">Faça upgrade para PRO</a> e remova esta marca
        </div>
      </div>
    `
        : "";

    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #000;">
        <tr>
          <td style="padding: 15px 0;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 2px;">
              ${data.name}
            </div>
            <div style="font-size: 13px; color: #666; margin-bottom: 10px;">
              ${data.role}${data.company ? ` • ${data.company}` : ""}
            </div>
            <div style="font-size: 13px;">
              ${redirectLinks.phone ? `<a href="${redirectLinks.phone}" style="color: #000; text-decoration: none;">${data.phone}</a> • ` : ""}
              ${data.email ? `<a href="mailto:${data.email}" style="color: #000; text-decoration: none;">${data.email}</a>` : ""}
            </div>
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
            ${watermark}
          </td>
        </tr>
      </table>
    `;
  };

  const getCorporateTemplate = (): string => {
    const watermark =
      isClient && limits.hasWatermark
        ? `
      <div style="margin-top: 16px; padding-top: 12px; border-top: 2px solid #eee; text-align: center;">
        <div style="font-size: 11px; color: #999; margin-bottom: 4px;">
          ⚡ Assinatura criada com <a href="#" style="color: #6366f1; text-decoration: none; font-weight: bold;">GenSign</a>
        </div>
        <div style="font-size: 10px; color: #aaa;">
          Crie a sua gratuitamente • <a href="#" style="color: #6366f1; text-decoration: none;">Faça upgrade para PRO</a> e remova esta marca
        </div>
      </div>
    `
        : "";

    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
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
              ${redirectLinks.phone ? `<div style="margin-bottom: 6px; color: #333;">📱 <a href="${redirectLinks.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></div>` : ""}
              ${data.email ? `<div style="margin-bottom: 6px; color: #333;">✉️ <a href="mailto:${data.email}" style="color: ${data.primaryColor}; text-decoration: none;">${data.email}</a></div>` : ""}
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
            ${watermark}
          </td>
        </tr>
      </table>
    `;
  };

  const copySignature = async () => {
    // Verificar se pode copiar
    if (!limits.canCopySignature) {
      alert(
        '⚠️ Assinatura Necessária\n\nVocê precisa de uma assinatura ativa para copiar assinaturas.\n\nClique em "Iniciar Teste Grátis" ou "Assinar Plano Anual" acima.'
      );
      return;
    }

    const previewElement = document.getElementById("signature-preview");
    if (!previewElement) return;

    try {
      const html = getSignatureHTML();

      // Try modern Clipboard API first (works better with Gmail)
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

        alert(
          '✅ Assinatura copiada!\n\nAgora cole no Gmail:\nConfigurações → Ver todas as configurações → Assinatura → Ctrl+V\n\nNão esqueça de configurar os "Padrões de Assinatura" e salvar!'
        );
        return;
      }

      // Fallback to execCommand
      const range = document.createRange();
      range.selectNodeContents(previewElement);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();

        alert(
          "✅ Assinatura copiada!\n\nCole no Gmail: Configurações → Assinatura → Ctrl+V"
        );
      }
    } catch (error) {
      alert(
        "Erro ao copiar. Tente selecionar a assinatura manualmente e copiar com Ctrl+C"
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Preview</h3>
          </div>
          <button
            onClick={copySignature}
            disabled={isClient && !limits.canCopySignature}
            className={`group px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg flex items-center gap-2 ${
              !isClient || limits.canCopySignature
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {!isClient || limits.canCopySignature ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Signature
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                Locked
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
        <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm text-red-800 font-semibold">
              Subscription required to generate and copy email signatures
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
