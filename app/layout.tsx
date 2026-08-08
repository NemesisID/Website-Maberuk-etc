import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maberuk UMKM Admin",
  description: "Dashboard administrasi UMKM Maberuk",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
