"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

// ─── ICONS ─────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
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

// ─── MAIN PAGE ─────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

export default function DirektoriClient({ 
  initialUmkmList, 
  categories = [],
  initialSearch = "",
  initialCategory = "Semua Kategori",
  initialSort = "Default"
}: { 
  initialUmkmList: any[]; 
  categories?: string[];
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
}) {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStores = useMemo(() => {
    let result = [...initialUmkmList];

    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      result = result.filter((s) => 
        s.name?.toLowerCase().includes(q) ||
        s.sub_category?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "Semua Kategori") {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (sortBy === "A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Z-A") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchValue, selectedCategory, sortBy, initialUmkmList]);

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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
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
                placeholder="Cari nama toko, subkategori, atau deskripsi..."
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
                <option>Default</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown />
              </span>
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
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {paginatedStores.map((store) => (
                <Link
                  key={store.slug}
                  href={`/direktori/${store.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-40">
                    <Image src={getValidStoreImage(store)} alt={store.name || 'UMKM'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  </div>
                  <div className="px-3 py-2.5 bg-white">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wide">{store.category}</span>
                      {store.sub_category && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full truncate max-w-[120px]">{store.sub_category}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors mt-0.5">{store.name}</p>
                  </div>
                </Link>
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
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${p === safePage ? "bg-green-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
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