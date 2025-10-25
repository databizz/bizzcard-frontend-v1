import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route de Redirecionamento com Validação de Assinatura
 *
 * URL: /api/redirect/:userId/:linkType?dest=URL_DESTINO
 *
 * Fluxo:
 * 1. Recebe clique no link da assinatura de email
 * 2. Extrai userId e tipo de link
 * 3. Verifica se assinatura está ativa (mock: lê do localStorage via cookie)
 * 4. Se ativa: redireciona para destino
 * 5. Se expirada: redireciona para página de renovação
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; linkType: string } }
) {
  const { userId, linkType } = params;
  const searchParams = request.nextUrl.searchParams;
  const destination = searchParams.get('dest');

  // Log para debug (remover em produção)
  console.log('🔗 Redirecionamento solicitado:', {
    userId,
    linkType,
    destination,
  });

  // Validar parâmetros
  if (!destination) {
    return NextResponse.json(
      { error: 'Destino não especificado' },
      { status: 400 }
    );
  }

  // ===== MOCK: Verificar assinatura =====
  // Em produção, você faria:
  // const user = await db.users.findById(userId);
  // const isActive = user.subscription.status === 'active' || user.subscription.status === 'trial';

  // Por enquanto, vamos simular que a assinatura está sempre ativa
  // para testar o fluxo. Depois você conecta com o banco de dados real.
  const isSubscriptionActive = await checkSubscriptionStatus(userId);

  // ===== Registrar Analytics (opcional) =====
  // Em produção, salvar no banco:
  // await analytics.trackLinkClick(userId, linkType, destination);
  console.log('📊 Analytics:', { userId, linkType, timestamp: new Date().toISOString() });

  // ===== Decisão de Redirecionamento =====
  if (isSubscriptionActive) {
    // ✅ Assinatura ativa: redireciona para o destino real
    console.log('✅ Assinatura ativa - redirecionando para:', destination);
    return NextResponse.redirect(destination);
  } else {
    // ❌ Assinatura expirada: redireciona para página de renovação
    console.log('❌ Assinatura expirada - redirecionando para renovação');

    const renewalUrl = new URL('/renovar', request.url);
    renewalUrl.searchParams.set('user', userId);
    renewalUrl.searchParams.set('reason', 'expired');
    renewalUrl.searchParams.set('attempted', linkType);

    return NextResponse.redirect(renewalUrl);
  }
}

/**
 * Verifica status da assinatura
 *
 * MOCK - Em produção, substituir por consulta ao banco de dados:
 *
 * async function checkSubscriptionStatus(userId: string): Promise<boolean> {
 *   const user = await prisma.user.findUnique({
 *     where: { id: userId },
 *     include: { subscription: true }
 *   });
 *
 *   if (!user || !user.subscription) return false;
 *
 *   const now = new Date();
 *   const expiryDate = new Date(user.subscription.expiryDate);
 *
 *   return (
 *     (user.subscription.status === 'active' || user.subscription.status === 'trial') &&
 *     expiryDate > now
 *   );
 * }
 */
async function checkSubscriptionStatus(userId: string): Promise<boolean> {
  // MOCK: Simula consulta ao banco
  // Por padrão, retorna true para testar o fluxo
  // Em produção, consultar banco de dados real

  // Você pode testar o bloqueio mudando para false:
  // return false;

  // Simula delay de rede (opcional)
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock: Sempre ativo por enquanto
  // TODO: Conectar com banco de dados real
  return true;

  // Em produção, seria algo como:
  /*
  try {
    const response = await fetch(`${process.env.DATABASE_URL}/users/${userId}/subscription`);
    const data = await response.json();

    const now = new Date();
    const expiryDate = new Date(data.expiryDate);

    return (
      (data.status === 'active' || data.status === 'trial') &&
      expiryDate > now
    );
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return false; // Em caso de erro, bloquear por segurança
  }
  */
}
