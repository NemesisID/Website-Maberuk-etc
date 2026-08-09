import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maberuk - Platform Digital UMKM Babatan",
  description: "Gabungkan kearifan lokal dengan teknologi modern. Bantu usaha warga sekitar bertumbuh secara digital melalui etalase mandiri dan sistem pembukuan terpadu.",
  icons: {
    icon: "/images/logo-maberuk.jpg",
    shortcut: "/images/logo-maberuk.jpg",
    apple: "/images/logo-maberuk.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/logo-maberuk.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/logo-maberuk.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
