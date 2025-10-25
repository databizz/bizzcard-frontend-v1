import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerador de Assinaturas de Email | Crie Assinaturas Profissionais",
  description: "Crie assinaturas de email personalizadas e profissionais em minutos. Templates modernos, clássicos e corporativos prontos para usar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
