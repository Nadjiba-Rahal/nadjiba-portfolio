import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadjiba Rahal — AI & Software Builder",
  description: "Intelligent digital products built with AI, software, data and automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Suspense est obligatoire pour gérer les paramètres d'URL sans erreur */}
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#D4AF37] text-2xl font-bold">Chargement...</div>}>
          <div className={playfair.className}>{children}</div>
        </Suspense>
      </body>
    </html>
  );
}