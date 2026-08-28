import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadjiba Rahal / AI & Software Builder",
  description: "Intelligent digital projects built with AI, software, data and automation.",
  icons: {
    icon: [{ url: "/nadjiba-logo.png", type: "image/png" }],
    apple: [{ url: "/nadjiba-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Suspense est obligatoire pour gérer les paramètres d'URL sans erreur */}
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#D4AF37] text-2xl font-bold">Chargement...</div>}>
          {children}
          <a
            className="whatsapp-planet"
            href="https://wa.me/213540276848"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Nadjiba on WhatsApp"
          >
            <span className="planet-ring" aria-hidden="true" />
            <span className="planet-core" aria-hidden="true"><MessageCircle size={23} strokeWidth={1.8} /></span>
            <span className="planet-label">WhatsApp</span>
          </a>
        </Suspense>
      </body>
    </html>
  );
}