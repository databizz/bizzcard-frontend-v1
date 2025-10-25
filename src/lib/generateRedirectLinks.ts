/**
 * Gera links de redirecionamento que passam pelo servidor
 * para validação de assinatura antes de redirecionar para o destino final
 */

export interface RedirectLinks {
  website: string;
  phone: string;
  instagram: string | null;
  linkedin: string | null;
  email: string;
}

export function generateRedirectLinks(
  userId: string,
  data: {
    website: string;
    phone: string;
    instagram?: string;
    linkedin?: string;
    email: string;
  }
): RedirectLinks {
  // URL base do seu servidor de redirecionamento
  // Em produção, seria: https://api.seuservico.com/r
  // Em desenvolvimento local: http://localhost:3001/api/redirect
  const BASE_URL = typeof window !== 'undefined'
    ? `${window.location.origin}/api/redirect`
    : 'http://localhost:3001/api/redirect';

  // Função helper para criar link de redirecionamento
  const createRedirectLink = (type: string, destination: string): string => {
    if (!destination) return '';

    // Encode do destino para passar como parâmetro
    const encodedDest = encodeURIComponent(destination);

    return `${BASE_URL}/${userId}/${type}?dest=${encodedDest}`;
  };

  // Criar link do WhatsApp
  const phoneNumber = data.phone.replace(/\D/g, ''); // Remove tudo que não é número
  const whatsappLink = phoneNumber ? `https://wa.me/${phoneNumber}` : '';

  return {
    website: createRedirectLink('website', data.website),
    phone: createRedirectLink('phone', whatsappLink),
    email: `mailto:${data.email}`, // Email direto (sem redirecionamento)
    instagram: data.instagram ? createRedirectLink('instagram', data.instagram) : null,
    linkedin: data.linkedin ? createRedirectLink('linkedin', data.linkedin) : null,
  };
}

/**
 * Extrai informações do link de redirecionamento
 */
export function parseRedirectUrl(pathname: string): {
  userId: string;
  linkType: string;
} | null {
  // Formato esperado: /api/redirect/USER123/website
  const match = pathname.match(/\/api\/redirect\/([^/]+)\/([^/]+)/);

  if (!match) return null;

  return {
    userId: match[1],
    linkType: match[2],
  };
}
