import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EduWeb Governance",
    template: "%s · EduWeb Governance",
  },
  description:
    "Plateforme de gouvernance administrative, de reporting institutionnel et de conformité réglementaire avec le référentiel international EduLex.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={nunito.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
