"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#fafcfb] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-white shadow-xs">
              <img src="/images/logo-maberuk.jpg" alt="Maberuk" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold leading-none tracking-wide text-slate-900">MABERUK</p>
              <p className="text-[9px] font-medium leading-tight text-slate-400 mt-0.5">UMKM Babatan</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Beranda</Link>
            <span className="text-emerald-600 font-bold border-b-2 border-emerald-600 pb-0.5">Tentang</span>
            <Link href="/admin" className="hover:text-emerald-600 transition-colors">Direktori UMKM</Link>
          </nav>

          <Link
            href="/admin"
            className="rounded-lg bg-[#10b981] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#059669]"
          >
            Masuk Admin
          </Link>
        </div>
      </header>

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
      <footer className="border-t border-slate-200 bg-[#0f172a] text-slate-400 py-10 px-6 text-xs">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 overflow-hidden rounded-full border border-slate-700 bg-white">
              <img src="/images/logo-maberuk.jpg" alt="Maberuk" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white tracking-wide">MABERUK</p>
              <p className="text-[10px] text-slate-500">Paguyuban UMK Kelurahan Babatan</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">© 2026 Maberuk Babatan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
