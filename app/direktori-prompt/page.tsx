"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const defaultPrompts = [
  {
    id: 1,
    category: "FOTO PRODUK",
    title: "Foto Produk Studio Minimalis",
    prompt: "Foto produk [nama produk] dengan latar belakang polos warna krem, pencahayaan lembut, sudut pandang eye-level, gaya fotografi komersial, resolusi tinggi, fokus tajam pada detail produk.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "KONTEN SOSIAL MEDIA",
    title: "Caption Promosi Produk UMKM",
    prompt: "Buatkan caption Instagram untuk promosi [nama produk] dari UMKM lokal Babatan, gunakan gaya bahasa santai dan ramah, sertakan call-to-action untuk pemesanan via WhatsApp.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "DESAIN LOGO",
    title: "Konsep Logo Usaha Kuliner",
    prompt: "Desain logo minimalis untuk usaha kuliner [makanan / minuman], kombinasi ikon sederhana yang merepresentasikan makanan lokal, warna hangat hijau & oranye, gaya modern.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: "POSTER PROMOSI",
    title: "Poster Bazar UMKM",
    prompt: "Buat desain poster promosi acara Bazar UMKM Babatan, tampilkan judul acara besar di bagian atas, ilustrasi produk-produk lokal seperti makanan dan kerajinan, warna cerah dan menarik.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: "FOTO PRODUK",
    title: "Foto Produk Flat Lay",
    prompt: "Foto flat lay (tampak atas) dari produk [nama produk] diatur rapi bersama bahan-bahan utama, aksesoris kayu, dan daun mint segar. Pencahayaan alami dari jendela.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: "DESAIN PRODUK",
    title: "Deskripsi Produk Marketplace",
    prompt: "Tuliskan deskripsi produk untuk [nama produk] yang akan diunggah ke marketplace, jelaskan bahan, ukuran, keunggulan, dan cara penyimpanan secara terstruktur agar mudah dibaca.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
];

export default function PromptDirectoryPage() {
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("maberuk_prompts_content");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPrompts(parsed);
        }
      } catch (e) {
        console.error("Failed to parse prompt directory data", e);
      }
    }
  }, []);

  function handleCopy(id: number, text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToastMessage("Prompt berhasil disalin ke clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafcfb] text-slate-900 font-sans">
      {/* Navbar */}
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
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Beranda</Link>
              <Link href="/tentang" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Tentang</Link>
              <Link href="/direktori" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori UMKM</Link>
              <span className="text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5">Direktori Prompt</span>
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
            <Link href="/" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Beranda</Link>
            <Link href="/tentang" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Tentang</Link>
            <Link href="/direktori" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Direktori UMKM</Link>
            <span className="text-sm font-semibold text-green-600">Direktori Prompt</span>
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

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-transparent py-14 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">DIREKTORI PROMPT</span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Kumpulan Prompt untuk Pelaku UMKM
          </h1>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal max-w-2xl mx-auto">
            Kumpulan prompt siap pakai untuk membantu pelaku UMKM Babatan membuat foto produk, caption, desain, hingga konten promosi menggunakan AI.
          </p>
        </div>
      </section>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs font-bold shadow-2xl flex items-center gap-2">
          <span className="text-emerald-400 text-base">✓</span>
          {toastMessage}
        </div>
      )}

      {/* Cards Grid Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-extrabold text-emerald-700 shadow-sm uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 font-normal line-clamp-3">
                    {item.prompt}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-5 pb-5 pt-1">
                <button
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-xs ${
                    copiedId === item.id
                      ? "bg-emerald-700 text-white"
                      : "bg-[#10b981] hover:bg-[#059669] text-white"
                  }`}
                  onClick={() => handleCopy(item.id, item.prompt)}
                  type="button"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {copiedId === item.id ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                  {copiedId === item.id ? "Tersalin!" : "Salin Prompt"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-900 text-gray-400 py-10 px-6 text-xs">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-maberuk.webp"
              alt="Logo MABERUK"
              width={28}
              height={28}
              className="rounded-full object-contain"
            />
            <div>
              <p className="font-bold text-white tracking-wide">MABERUK</p>
              <p className="text-[10px] text-gray-500">Paguyuban UMK Kelurahan Babatan</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">© 2026 Maberuk Babatan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
