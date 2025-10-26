import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "BizzCard - Cartão Comercial Digital Profissional",
  description:
    "Crie seu cartão comercial digital para Instagram, LinkedIn, Email, WhatsApp e muito mais. Personalize com QR Code e compartilhe em qualquer plataforma.",
  keywords:
    "cartão digital, business card, cartão comercial, digital business card, QR code, cartão de visita digital, vcard, networking digital",
  authors: [{ name: "BizzCard" }],
  openGraph: {
    title: "BizzCard - Cartão Comercial Digital Profissional",
    description:
      "Crie seu cartão comercial digital em minutos. Use em qualquer plataforma.",
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
      <body className={`${rubik.variable} font-rubik`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
