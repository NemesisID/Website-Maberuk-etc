"use client";

import Image from "next/image";
import { useState } from "react";

// â”€â”€â”€ ICONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 5.5-8 5.5C15 6 17 4 17 4a8 8 0 0 0-6.35 7.35c-.06.44-.1.88-.1 1.32C10.55 16 9 19 7 22h2l2-3.5c.33.12.69.2 1.07.25C16.21 19.17 19 16.5 17 8z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 inline-block ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

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

function MedalIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.56 13.89L7 22l5-3 5 3-1.56-8.11" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

// â”€â”€â”€ STORE CARDS DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const storeCards = [
  { id: 1, title: "Kue Tradisional", category: "Kuliner", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=280&fit=crop", alt: "Kue tradisional" },
  { id: 2, title: "Kerajinan Kayu", category: "Kerajinan", img: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=400&h=280&fit=crop", alt: "Kerajinan kayu" },
  { id: 3, title: "Batik & Tenun", category: "Fashion", img: "https://images.unsplash.com/photo-1762111067847-4d5bb602354e?w=400&h=280&fit=crop", alt: "Batik dan tenun" },
  { id: 4, title: "Minuman Lokal", category: "Minuman", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=280&fit=crop", alt: "Minuman lokal" },
  { id: 5, title: "Warung Sembako", category: "Sembako", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=280&fit=crop", alt: "Warung sembako" },
  { id: 6, title: "Tas Anyaman", category: "Kerajinan", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=280&fit=crop", alt: "Tas anyaman" },
  { id: 7, title: "Jajanan Pasar", category: "Kuliner", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=280&fit=crop", alt: "Jajanan pasar" },
  { id: 8, title: "Salon & Rias", category: "Jasa", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=280&fit=crop", alt: "Salon dan rias" },
  { id: 9, title: "Produk Pertanian", category: "Pertanian", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=280&fit=crop", alt: "Produk pertanian" },
  { id: 10, title: "Servis Elektronik", category: "Jasa", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=280&fit=crop", alt: "Servis elektronik" },
  { id: 11, title: "Tanaman Hias", category: "Tanaman", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=280&fit=crop", alt: "Tanaman hias" },
  { id: 12, title: "Katering Rumahan", category: "Kuliner", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=280&fit=crop", alt: "Katering rumahan" },
];

// â”€â”€â”€ MAIN PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo – kiri, lebar tetap */}
            <div className="w-[160px] flex items-center">
              <a href="#" className="flex items-center gap-2 group">
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
              </a>
            </div>

            {/* Desktop Nav – tengah */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#beranda" className="text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5">Beranda</a>
              <a href="/tentang" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Tentang</a>
              <a href="/direktori" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori UMKM</a>
              <a href="/direktori-prompt" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori Prompt</a>
            </div>

            {/* Kanan – lebar tetap, rata kanan */}
            <div className="w-[160px] flex items-center justify-end gap-2">
              <a
                href="/masuk"
                className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition-colors shadow-sm whitespace-nowrap"
              >
                Masuk
              </a>
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 shadow-lg">
            <a href="#beranda" className="text-sm font-semibold text-green-600" onClick={() => setMenuOpen(false)}>Beranda</a>
            <a href="#tentang" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Tentang</a>
            <a href="/direktori" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Direktori UMKM</a>
            <a href="/direktori-prompt" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Direktori Prompt</a>
            <a
              href="/masuk"
              className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-center"
              onClick={() => setMenuOpen(false)}
            >
              Masuk
            </a>
          </div>
        )}
      </nav>

      {/* â”€â”€ HERO â”€â”€ */}
      <section id="beranda" className="bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <div className="flex flex-col gap-5">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-medium text-green-700 tracking-wide">Platform Resmi Warga Kelurahan Babatan</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                Platform Digital untuk{" "}
                <span className="text-green-600">UMKM Babatan</span>
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                Gabungkan kearifan lokal dengan teknologi modern. Bantu usaha warga sekitar
                bertumbuh secara digital melalui etalase mandiri dan sistem pembukuan terpadu.
              </p>

              {/* Search */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Cari produk atau UMKM unggulan..."
                    className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm"
                  />
                </div>
                <button className="flex-shrink-0 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shadow-sm whitespace-nowrap">
                  Jelajahi UMKM
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Pelaku UMKM Babatan â€“ wirausaha lokal berdaya"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ TOKO UNGGULAN â”€â”€ */}
      <section id="direktori" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-1">Rekomendasi</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kunjungi Toko Unggulan Warga</h2>
            </div>
            <a
              href="#direktori"
              className="hidden sm:flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors gap-1 whitespace-nowrap"
            >
              Lihat Semua Direktori <ArrowRightIcon />
            </a>
          </div>

          {/* Cards â€“ 4 kolom Ã— 3 baris */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {storeCards.map((card) => (
              <a
                key={card.id}
                href="#direktori"
                className="group block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-40">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="px-3 py-2.5 bg-white">
                  <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">{card.category}</span>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors mt-0.5">{card.title}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile "Lihat Semua" */}
          <div className="flex sm:hidden justify-center mt-6">
            <a href="#direktori" className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1">
              Lihat Semua Direktori <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€ FITUR UTAMA â”€â”€ */}
      <section id="kategori" className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-2">Fitur Utama</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Mengapa Memilih UMKM Babatan?</h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5 text-green-600">
                <MedalIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Gratis &amp; Mudah Digunakan</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tidak ada biaya tersembunyi. Buat profil tokomu dalam 5 menit langsung dari HP-mu.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5 text-blue-600">
                <BookIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Pembukuan Digital</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Catat pemasukan dan pengeluaran harian UMKM-mu tanpa perlu pusing menggunakan excel/kertas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5 text-orange-500">
                <GlobeIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Jangkauan Lebih Luas</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Produk tokomu dapat diakses oleh ribuan calon pelanggan lokal di area Babatan dan sekitarnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <footer id="tentang" className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-3 mb-4">
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
              </a>
              <p className="text-sm text-gray-400 leading-relaxed">
                Memberdayakan pelaku usaha mikro, kecil, dan menengah di wilayah Babatan melalui digitalisasi toko dan penyederhanaan pembukuan.
              </p>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Navigasi</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#beranda" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Beranda</a></li>
                <li><a href="#direktori" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Direktori UMKM</a></li>
                <li><a href="#kategori" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Kategori</a></li>
                <li><a href="#tentang" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Kontak &amp; Support</h4>
              <ul className="flex flex-col gap-2.5">
                <li className="text-sm text-gray-400">Email: info@umkmbabatan.id</li>
                <li className="text-sm text-gray-400">WhatsApp: +62 812-3456-7890</li>
                <li className="text-sm text-gray-400">Kantor Kelurahan Babatan, Lantai 2</li>
              </ul>
            </div>

            {/* Sosial */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ikuti Kami</h4>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="Twitter / X" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <TwitterIcon />
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">Â© 2026 UMKM Babatan. Semua Hak Dilindungi Undang-Undang.</p>
            <p className="text-xs text-gray-500">
              Dibuat dengan{" "}
              <span className="text-red-400">â™¥</span>{" "}
              untuk Babatan Hebat
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
