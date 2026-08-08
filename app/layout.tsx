import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UMKM Babatan - Platform Digital untuk UMKM Babatan",
  description:
    "Gabungkan kearifan lokal dengan teknologi modern. Bantu usaha warga sekitar bertumbuh secara digital melalui etalase mandiri dan sistem pembukuan terpadu.",
};

type LayoutProps<_ = string> = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
