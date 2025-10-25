import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GenSign - Gerador de Assinaturas de Email Profissionais",
  description:
    "Crie assinaturas de email profissionais e personalizadas em minutos. Gratuito para sempre com templates, cores customizadas e links sociais.",
  keywords: "assinatura de email, email signature, gerador de assinatura, signature generator, assinatura profissional, email corporativo",
  authors: [{ name: "GenSign" }],
  openGraph: {
    title: "GenSign - Gerador de Assinaturas de Email Profissionais",
    description: "Crie assinaturas de email profissionais em minutos. Gratuito para sempre.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
