"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const DEFAULT_STORE_IMAGE = "/logo-maberuk.webp";

function getValidStoreImage(store: any): string {
  if (!store) return DEFAULT_STORE_IMAGE;
  const candidates = [store.hero_image, store.heroImage, store.logo_url, store.logoUrl];
  for (const src of candidates) {
    if (src && typeof src === 'string' && src.trim() !== '') {
      return src.trim();
    }
  }
  return DEFAULT_STORE_IMAGE;
}

// ─── ICONS ───────────────────────────────────────────────────────────────

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

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M20 12.5 12.5 20a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1 0-2.8L10.5 3H18a2 2 0 0 1 2 2v7.5z" />
      <circle cx="14.5" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.9.53 3.68 1.451 5.2L2 22l4.945-1.421A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.13a8.09 8.09 0 0 1-4.354-1.27l-.312-.196-3.156.907.916-3.152-.204-.323A8.09 8.09 0 1 1 20.09 12a8.098 8.098 0 0 1-8.089 8.13z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 2h-3.2v13.6a2.9 2.9 0 1 1-2.05-2.77V9.6a6.1 6.1 0 1 0 5.25 6.04V8.9a7.3 7.3 0 0 0 4.3 1.38V7.05A4.3 4.3 0 0 1 16.5 2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
    </svg>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────

export default function DetailUmkmClient({ umkm }: { umkm: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null || !umkm) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % umkm!.gallery.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + umkm!.gallery.length) % umkm!.gallery.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, umkm]);

  function handleCopyPhone() {
    navigator.clipboard.writeText(umkm!.phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 min-w-0">
  <Link href="/" className="hover:text-green-600 transition-colors shrink-0 whitespace-nowrap">Beranda</Link>
  <ChevronRightIcon className="w-3.5 h-3.5 shrink-0" />
  <Link href="/direktori" className="hover:text-green-600 transition-colors shrink-0 whitespace-nowrap">Direktori UMKM</Link>
  <ChevronRightIcon className="w-3.5 h-3.5 shrink-0" />
  <span className="text-gray-800 font-medium truncate min-w-0 flex-1">{umkm.name}</span>
</nav>
      </div>

      {/* ── HERO DETAIL ── */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">

          {/* Foto utama */}
          <button
            onClick={() => setLightboxIndex(-1)}
            className="group relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            aria-label="Perbesar foto utama"
          >
            <Image
              src={getValidStoreImage(umkm)}
              alt={umkm.name || 'Foto UMKM'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
              priority
            />
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="bg-white/95 backdrop-blur text-xs font-bold text-green-700 px-3 py-1 rounded-full shadow-sm">
                {umkm.category}
              </span>
              {umkm.sub_category && (
                <span className="bg-slate-900/80 backdrop-blur text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm">
                  {umkm.sub_category}
                </span>
              )}
            </div>
          </button>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{umkm.name}</h1>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{umkm.description}</p>

            {/* Info list */}
            <div className="flex flex-col gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-700 min-w-0">
                  <span className="text-green-600"><PhoneIcon /></span>
                  <span className="truncate">{umkm.phone || "-"}</span>
                </div>
                {umkm.phone && (
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors shrink-0"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                )}
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5"><PinIcon /></span>
                <span>{umkm.address}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              {umkm.phone ? (
                <a
                  href={`https://wa.me/${umkm.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-sm"
                >
                  <WhatsAppIcon />
                  Hubungi via WhatsApp
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-500 text-sm font-semibold py-3 rounded-xl shadow-sm cursor-not-allowed">
                  <WhatsAppIcon />
                  WhatsApp Tidak Tersedia
                </div>
              )}
              {umkm.social?.instagram && (
                <a
                  href={umkm.social.instagram.startsWith('http') ? umkm.social.instagram : `https://instagram.com/${umkm.social.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-300 transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {umkm.social?.facebook && (
                <a
                  href={umkm.social.facebook.startsWith('http') ? umkm.social.facebook : `https://facebook.com/${umkm.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-300 transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {umkm.social?.tiktok && (
                <a
                  href={umkm.social.tiktok.startsWith('http') ? umkm.social.tiktok : `https://tiktok.com/@${umkm.social.tiktok.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-300 transition-colors"
                >
                  <TiktokIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERI PRODUK ── */}
      {umkm.gallery.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Produk dari {umkm.name}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {umkm.gallery.map((item: any, idx: number) => (
                <button
                  key={item.caption || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative h-56 sm:h-64 bg-transparent rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <Image
                    src={item.src || DEFAULT_STORE_IMAGE}
                    alt={item.caption || 'Foto Galeri UMKM'}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LOKASI ── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-1">Lokasi</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Detail Lokasi {umkm.name}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Kunjungi langsung lapak {umkm.name} di Babatan, atau hubungi lewat WhatsApp untuk memesan tanpa perlu datang.
              </p>
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
                <span className="text-green-600 mt-0.5"><PinIcon /></span>
                <span className="text-sm text-gray-700">{umkm.address}</span>
              </div>
            </div>

            <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                title={`Peta lokasi ${umkm.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(umkm.address)}&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK LINK ── */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14">
        <Link
          href="/direktori"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeftIcon />
          Kembali ke Direktori UMKM
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo-maberuk.png"
                  alt="Logo MABERUK UMKM Babatan"
                  width={56}
                  height={56}
                  className="rounded-full object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-base">MABERUK</span>
                  <span className="text-xs text-gray-400 font-medium">UMKM Babatan</span>
                </div>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Memberdayakan pelaku usaha mikro, kecil, dan menengah di wilayah Babatan melalui digitalisasi toko dan penyederhanaan pembukuan.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navigasi</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="/" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Beranda</Link></li>
                <li><Link href="/direktori" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Direktori UMKM</Link></li>
                <li><Link href="/direktori-prompt" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Direktori Prompt</Link></li>
                <li><Link href="/tentang" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Tentang Kami</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Kontak &amp; Support</h4>
              <ul className="flex flex-col gap-2.5">
                <li className="text-sm text-gray-400">Email: info@umkmbabatan.id</li>
                <li className="text-sm text-gray-400">WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ikuti Kami</h4>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <WhatsAppIcon />
                </a>
                <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <TiktokIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">© 2026 Kelompok 26 KKN UPN "Veteran" Jawa Timur. Semua Hak Dilindungi Undang-Undang.</p>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Tutup"
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <CloseIcon />
          </button>

          {lightboxIndex >= 0 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i - 1 + umkm.gallery.length) % umkm.gallery.length));
                }}
                aria-label="Sebelumnya"
                className="absolute left-3 sm:left-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i + 1) % umkm.gallery.length));
                }}
                aria-label="Berikutnya"
                className="absolute right-3 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-2xl h-[70vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxIndex === -1 ? (umkm.hero_image || umkm.heroImage) : umkm.gallery[lightboxIndex].src}
              alt={lightboxIndex === -1 ? umkm.name : umkm.gallery[lightboxIndex].caption}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}