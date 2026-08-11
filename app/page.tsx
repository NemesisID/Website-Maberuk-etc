"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { umkmList } from "@/data/umkm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


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

// ——— STORE CARDS DATA ———————————————————————————————————————————————————————————————————————————————————————————————————————————————

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

// ——— MAIN PAGE —————————————————————————————————————————————————————

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section id="beranda" className="bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <div className="flex flex-col gap-5">
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                Platform Digital untuk{" "}
                <span className="text-green-600">UMKM Babatan</span>
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                Gabungkan kearifan lokal dengan teknologi modern. Bantu usaha warga sekitar
                bertumbuh secara digital melalui etalase mandiri, dukungan prompt AI, dan sistem pembukuan terpadu.
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
                    placeholder="Cari Nama UMKM unggulan..."
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

      {/* ── TOKO UNGGULAN ── */}
      <section id="direktori" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-1">Rekomendasi</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kunjungi Toko Unggulan Warga</h2>
            </div>
            <a
              href="/direktori"
              className="hidden sm:flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors gap-1 whitespace-nowrap"
            >
              Lihat Semua Direktori <ArrowRightIcon />
            </a>
          </div>

          {/* Cards – 3 kolom × 4 baris */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {umkmList.slice(0, 12).map((item) => (
  <Link
    key={item.slug}
    href={`/direktori/${item.slug}`}
    className="group block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
  >
    <div className="relative h-40">
      <Image src={item.heroImage} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
    </div>
    <div className="px-3 py-2.5 bg-white">
      <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">{item.category}</span>
      <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors mt-0.5">{item.name}</p>
    </div>
  </Link>
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

      {/* ── FITUR UTAMA ── */}
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
                <GlobeIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Etalase & Direktori Digital</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Promosikan produk dan usaha Anda secara gratis melalui katalog resmi kelurahan yang mudah diakses masyarakat luas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5 text-blue-600">
                <BookIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Pembukuan Digital</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Catat pemasukan dan pengeluaran harian UMKM-mu secara sistematis tanpa perlu pusing menggunakan buku manual atau excel.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5 text-orange-500">
                <MedalIcon />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Direktori Prompt AI</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tingkatkan kualitas promosi dengan bantuan prompt cerdas siap pakai untuk caption medsos, foto produk, dan desain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
