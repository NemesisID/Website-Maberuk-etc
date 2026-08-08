"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

// ─── ICONS ─────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
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
function GridIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
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

// ─── DUMMY DATA ────────────────────────────────────────
// Gambar pakai Picsum (seed-based, dijamin selalu tampil, tidak akan broken)

const categories = ["Kuliner", "Kerajinan", "Fashion", "Minuman", "Sembako", "Jasa", "Pertanian", "Tanaman"];

// Setiap toko punya nama + kata kunci foto (bahasa Inggris) yang spesifik
// sesuai produk/jasa yang dijual. Pakai SATU tag umum yang pasti banyak
// tersedia di Flickr — tag gabungan/berbahasa Indonesia sering tidak
// ketemu sehingga jatuh ke gambar default (itu sebabnya banyak yang sama).
const storeList: { title: string; category: string; keyword: string }[] = [
  { title: "Kue Tradisional Bu Sri", category: "Kuliner", keyword: "cake" },
  { title: "Kerajinan Kayu Pak Darto", category: "Kerajinan", keyword: "woodworking" },
  { title: "Batik & Tenun Nusantara", category: "Fashion", keyword: "textile" },
  { title: "Es Kelapa Segar", category: "Minuman", keyword: "coconut" },
  { title: "Warung Sembako Barokah", category: "Sembako", keyword: "grocery" },
  { title: "Tas Anyaman Rotan", category: "Kerajinan", keyword: "basket" },
  { title: "Jajanan Pasar Legendaris", category: "Kuliner", keyword: "streetfood" },
  { title: "Salon & Rias Cantika", category: "Jasa", keyword: "salon" },
  { title: "Sayur Organik Segar", category: "Pertanian", keyword: "vegetables" },
  { title: "Servis Elektronik Jaya", category: "Jasa", keyword: "electronics" },
  { title: "Tanaman Hias Asri", category: "Tanaman", keyword: "houseplant" },
  { title: "Katering Rumahan Ibu Nia", category: "Kuliner", keyword: "catering" },
  { title: "Sate Ayam Pak Bowo", category: "Kuliner", keyword: "satay" },
  { title: "Ukiran Kayu Jati", category: "Kerajinan", keyword: "woodcarving" },
  { title: "Konveksi Pakaian Muslim", category: "Fashion", keyword: "tailor" },
  { title: "Jamu Tradisional Herbal", category: "Minuman", keyword: "herbal" },
  { title: "Toko Kelontong 24 Jam", category: "Sembako", keyword: "minimart" },
  { title: "Anyaman Bambu Kreatif", category: "Kerajinan", keyword: "bamboo" },
  { title: "Nasi Kucing Angkringan", category: "Kuliner", keyword: "streetfood" },
  { title: "Laundry Kiloan Bersih", category: "Jasa", keyword: "laundry" },
  { title: "Bibit Tanaman Buah", category: "Tanaman", keyword: "seedling" },
  { title: "Cuci Motor & Mobil", category: "Jasa", keyword: "carwash" },
  { title: "Kopi Rakyat Babatan", category: "Minuman", keyword: "coffee" },
  { title: "Kerupuk Rambak Renyah", category: "Kuliner", keyword: "cracker" },
];

const storesData = storeList.map((store, i) => ({
  id: i + 1,
  title: store.title,
  category: store.category,
  // lock={id} membuat gambar tetap konsisten di setiap reload, dan keyword-nya
  // dibuat spesifik sesuai nama produk/jasa tiap toko.
  img: `https://loremflickr.com/400/280/${store.keyword}?lock=${i + 1}`,
  alt: store.title,
}));

// ─── NAVBAR ────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#tentang", label: "Tentang" },
    { href: "/direktori", label: "Direktori UMKM" },
    { href: "/direktori-prompt", label: "Direktori Prompt" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo-maberuk.webp" alt="Logo MABERUK UMKM Babatan" width={44} height={44} className="rounded-full object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-gray-900 text-base">MABERUK</span>
              <span className="text-xs text-gray-500 font-medium">UMKM Babatan</span>
            </div>
          </Link>

          {/* Links – di tengah */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.label === "Direktori UMKM"
                    ? "text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5"
                    : "text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Kanan: Masuk + Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/masuk"
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition-colors shadow-sm"
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
              key={link.label}
              href={link.href}
              className={link.label === "Direktori UMKM" ? "text-sm font-semibold text-green-600" : "text-sm font-medium text-gray-600"}
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

// ─── FOOTER ────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo-maberuk.webp" alt="Logo MABERUK UMKM Babatan" width={56} height={56} className="rounded-full object-contain" />
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
              <li><Link href="/#kategori" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Kategori</Link></li>
              <li><Link href="/#tentang" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Kontak &amp; Support</h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-sm text-gray-400">Email: info@umkmbabatan.id</li>
              <li className="text-sm text-gray-400">WhatsApp: +62 812-3456-7890</li>
              <li className="text-sm text-gray-400">Kantor Kelurahan Babatan, Lantai 2</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ikuti Kami</h4>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter / X" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"><TwitterIcon /></a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"><YoutubeIcon /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 UMKM Babatan. Semua Hak Dilindungi Undang-Undang.</p>
          <p className="text-xs text-gray-500">Dibuat dengan <span className="text-red-400">♥</span> untuk Babatan Hebat</p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────

const ITEMS_PER_PAGE = 12; // 4 kolom x 3 baris

export default function DirektoriPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortBy, setSortBy] = useState("Terpopuler");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStores = useMemo(() => {
    let result = [...storesData];

    if (searchValue.trim()) {
      result = result.filter((s) => s.title.toLowerCase().includes(searchValue.toLowerCase()));
    }
    if (selectedCategory !== "Semua Kategori") {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    // "Terpopuler" pakai urutan default

    return result;
  }, [searchValue, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredStores.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedStores = filteredStores.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const startIndex = filteredStores.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(safePage * ITEMS_PER_PAGE, filteredStores.length);

  function handleFilterChange(fn: () => void) {
    fn();
    setCurrentPage(1);
  }

  function getPageNumbers() {
    const pages: number[] = [];
    const start = Math.max(1, safePage - 1);
    const end = Math.min(totalPages, start + 2);
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>
      <Navbar />

      {/* HEADER */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Direktori UMKM</h1>
          <p className="text-sm text-gray-600">Temukan dan dukung pelaku usaha lokal di kelurahan Babatan.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">

            {/* Search */}
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleFilterChange(() => setSearchValue(e.target.value))}
                placeholder="Cari nama toko UMKM..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>

            {/* Kategori */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange(() => setSelectedCategory(e.target.value))}
                className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-green-500 cursor-pointer"
              >
                <option>Semua Kategori</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown />
              </span>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-green-500 cursor-pointer"
              >
                <option>Terpopuler</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown />
              </span>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 w-fit">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                aria-label="Grid view"
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                aria-label="List view"
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GRID / LIST TOKO */}
      <section className="flex-1 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {filteredStores.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-gray-500">Tidak ada toko yang cocok dengan pencarian kamu.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paginatedStores.map((card) => (
                <a
                  key={card.id}
                  href="#"
                  className="group block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-40">
                    <Image src={card.img} alt={card.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="px-3 py-2.5 bg-white">
                    <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">{card.category}</span>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors mt-0.5">{card.title}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedStores.map((card) => (
                <a
                  key={card.id}
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-2"
                >
                  <div className="relative w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image src={card.img} alt={card.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wide">{card.category}</span>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors mt-0.5 truncate">{card.title}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {filteredStores.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
              <p className="text-xs text-gray-500">
                Menampilkan {startIndex}-{endIndex} dari {filteredStores.length} Toko UMKM
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft />
                  </button>

                  {getPageNumbers()[0] > 1 && (
                    <>
                      <button onClick={() => setCurrentPage(1)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">1</button>
                      {getPageNumbers()[0] > 2 && <span className="text-gray-400 text-sm px-1">...</span>}
                    </>
                  )}

                  {getPageNumbers().map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${p === safePage ? "bg-green-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                  {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                      {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="text-gray-400 text-sm px-1">...</span>}
                      <button onClick={() => setCurrentPage(totalPages)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">{totalPages}</button>
                    </>
                  )}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}