import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jegonflable Aube — Location de jeux gonflables à Troyes",
    template: "%s | Jegonflable Aube",
  },
  description:
    "Location de châteaux gonflables, structures et jeux pour anniversaires et événements dans l'Aube. Livraison à Troyes et alentours.",
  keywords: [
    "jeux gonflables",
    "château gonflable",
    "location",
    "Troyes",
    "Aube",
    "anniversaire",
    "événement",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
