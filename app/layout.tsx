import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maberuk",
  description: "Dashboard administrasi UMKM Maberuk",
  icons: {
    icon: "/images/logo-maberuk.jpg",
    shortcut: "/images/logo-maberuk.jpg",
    apple: "/images/logo-maberuk.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="icon" href="/images/logo-maberuk.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/logo-maberuk.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
