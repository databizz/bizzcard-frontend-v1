/**
 * Gera um ID único para o usuário baseado no email
 * Em produção, isso viria do banco de dados
 */
export function generateUserId(email: string): string {
  // Mock: usa hash simples do email
  // Em produção: seria o ID real do usuário no banco
  const hash = email
    .toLowerCase()
    .split('')
    .reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

  return `USR${hash.toString(16).toUpperCase().padStart(6, '0')}`;
}

/**
 * Gera um token de assinatura
 * Em produção: seria um JWT ou token criptografado
 */
export function generateSignatureToken(userId: string, email: string): string {
  // Mock: combina userId + parte do email
  const emailPart = email.split('@')[0].slice(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${userId}-${emailPart}-${timestamp}`;
}
