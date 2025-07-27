import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibratto",
  description: "Plataforma para músicos y eventos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${mono.variable}`}
      suppressHydrationWarning // ✅ Esto evita el warning de mismatch
    >
      <body className="antialiased bg-[#0f0f1a] text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
