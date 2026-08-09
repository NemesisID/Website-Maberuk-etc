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

const defaultAboutData = {
  title: "MABERUK",
  subtitle: "Maju Bersama UMK Kelurahan Babatan",
  sectionTitle: "Tentang Maberuk",
  p1: "Maberuk (Maju Bersama UMK Kelurahan Babatan) merupakan sebuah paguyuban yang dibentuk oleh Kelurahan Babatan, Kecamatan Wiyung, sebagai upaya untuk memperkuat kolaborasi dan kemitraan antar pelaku Usaha Mikro Kecil (UMK) di wilayah tersebut.",
  p2: "Paguyuban ini menjadi wadah koordinasi dan pendampingan, terutama bagi pelaku UMK pemula, mulai dari proses pendataan, pengurusan legalitas usaha seperti NIB (Nomor Induk Berusaha), hingga fasilitasi pelatihan dan kegiatan promosi seperti bazar UMK.",
  p3: "Melalui Maberuk, pelaku UMK mendapatkan akses untuk meningkatkan kapasitas usaha, memperluas jaringan, dan memperkuat posisi usaha mereka di tengah persaingan pasar.",
  p4: "Keberadaan Maberuk menunjukkan sinergi yang baik antara pemerintah kelurahan dan pelaku usaha lokal dalam mewujudkan kemandirian ekonomi masyarakat Babatan.",
  status: "Paguyuban Aktif",
  kecamatan: "Wiyung",
  kota: "Surabaya",
  ctaTitle: "Bergabung Bersama Kami",
  ctaDescription: "Daftarkan usaha Anda ke Maberuk dan dapatkan akses pendampingan, pelatihan, serta jaringan pelaku UMK Babatan.",
  whatsapp: "081234567890",
};

export default function AboutPage() {
  const [data, setData] = useState(defaultAboutData);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("maberuk_about_content");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse about content", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafcfb] text-slate-900 font-sans selection:bg-green-500 selection:text-white">
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
              <span className="text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5">Tentang</span>
              <Link href="/direktori" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori UMKM</Link>
              <Link href="/direktori-prompt" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori Prompt</Link>
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
            <span className="text-sm font-semibold text-green-600">Tentang</span>
            <Link href="/direktori" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Direktori UMKM</Link>
            <Link href="/direktori-prompt" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Direktori Prompt</Link>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-3.5 py-1 shadow-xs">
            <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">TENTANG KAMI</span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-2 text-base font-semibold text-emerald-600 sm:text-lg">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-10 md:grid-cols-[1fr_320px] items-start">
          {/* Left Column: Story & Paragraphs */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">SIAPA KAMI</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{data.sectionTitle}</h2>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600 font-normal">
              <p>{data.p1}</p>
              <p>{data.p2}</p>
              <p>{data.p3}</p>
              <p>{data.p4}</p>
            </div>
          </div>

          {/* Right Column: Info Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 text-center">
            <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-500 bg-slate-50 p-1 shadow-md">
              <img src="/images/logo-maberuk.jpg" alt="Logo Maberuk" className="h-full w-full rounded-full object-cover" />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">{data.title}</h3>
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">
              MAJU BERSAMA Usaha Mikro Kecil
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Kelurahan Babatan</p>

            <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Status</span>
                <span className="font-bold text-emerald-600">{data.status}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Kecamatan</span>
                <span className="font-semibold text-slate-800">{data.kecamatan}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Kota</span>
                <span className="font-semibold text-slate-800">{data.kota}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-slate-50 to-emerald-50/30 p-8 border border-emerald-100 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {data.ctaDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl bg-[#10b981] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-[#059669]"
            >
              Lihat Direktori UMKM
            </Link>
            <a
              href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50"
            >
              Hubungi via WhatsApp
            </a>
          </div>
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
