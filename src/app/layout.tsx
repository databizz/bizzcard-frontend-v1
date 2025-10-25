import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
