import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadjiba Rahal / AI & Software Builder",
  description: "Intelligent digital products built with AI, software, data and automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Suspense est obligatoire pour gérer les paramètres d'URL sans erreur */}
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#D4AF37] text-2xl font-bold">Chargement...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}