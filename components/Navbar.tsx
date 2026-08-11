"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/direktori", label: "Direktori UMKM" },
  { href: "/direktori-prompt", label: "Direktori Prompt" },
];

function MenuIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="w-[160px] flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo-maberuk.webp"
                alt="Logo MABERUK UMKM Babatan"
                width={44}
                height={44}
                className="rounded-full object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-gray-900 text-base">MABERUK</span>
                <span className="text-xs text-gray-500 font-medium">UMKM Babatan</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5"
                    : "text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="w-[160px] flex items-center justify-end gap-2">
            <Link
              href="/masuk"
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              Masuk
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-sm font-semibold text-green-600"
                  : "text-sm font-medium text-gray-600"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/masuk"
            className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-center"
            onClick={() => setMenuOpen(false)}
          >
            Masuk
          </Link>
        </div>
      )}
    </nav>
  );
}
