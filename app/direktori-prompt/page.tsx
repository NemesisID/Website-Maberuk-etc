"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────

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
function CopyIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/direktori", label: "Direktori UMKM" },
  { href: "/direktori-prompt", label: "Direktori Prompt" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Logo – kiri */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo-maberuk.webp" alt="Logo MABERUK" width={44} height={44} className="rounded-full object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-gray-900 text-base">MABERUK</span>
              <span className="text-xs text-gray-500 font-medium">UMKM Babatan</span>
            </div>
          </Link>

          {/* Links – tengah */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.label === "Direktori Prompt"
                    ? "text-sm font-semibold text-green-600 border-b-2 border-green-600 pb-0.5"
                    : "text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Kanan */}
          <div className="flex items-center gap-2">
            <Link
              href="/masuk"
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.label === "Direktori Prompt" ? "text-sm font-semibold text-green-600" : "text-sm font-medium text-gray-600"}
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo-maberuk.webp" alt="Logo MABERUK" width={56} height={56} className="rounded-full object-contain" />
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
              <li><Link href="/tentang" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Tentang</Link></li>
              <li><Link href="/direktori" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Direktori UMKM</Link></li>
              <li><Link href="/direktori-prompt" className="text-sm text-gray-400 hover:text-green-400 transition-colors">Direktori Prompt</Link></li>
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
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"><TwitterIcon /></a>
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

// ─── DATA PROMPT ──────────────────────────────────────────────────────────────
// 12 prompt (grid 3 kolom x 4 baris di layar desktop)

const prompts = [
  {
    id: 1,
    category: "Foto Produk",
    title: "Foto Produk Studio Minimalis",
    prompt:
      "Foto produk [nama produk] di atas meja marmer putih dengan pencahayaan studio lembut, latar belakang polos warna krem, bayangan halus, sudut pandang eye-level, gaya fotografi komersial, resolusi tinggi, fokus tajam pada detail produk.",
  },
  {
    id: 2,
    category: "Konten Sosial Media",
    title: "Caption Promosi Produk UMKM",
    prompt:
      "Buatkan caption Instagram untuk promosi [nama produk] dari UMKM lokal Babatan, gunakan gaya bahasa santai dan ramah, sertakan call-to-action untuk pemesanan via WhatsApp, tambahkan 5 hashtag relevan tentang UMKM Surabaya.",
  },
  {
    id: 3,
    category: "Desain Logo",
    title: "Konsep Logo Usaha Kuliner",
    prompt:
      "Desain logo minimalis untuk usaha kuliner bernama [nama usaha], kombinasi ikon sederhana yang merepresentasikan makanan khas, warna hangat seperti oranye dan cokelat, gaya flat modern, cocok untuk kemasan dan banner.",
  },
  {
    id: 4,
    category: "Poster Promosi",
    title: "Poster Bazar UMKM",
    prompt:
      "Buat desain poster promosi acara Bazar UMKM Babatan, tampilkan judul acara besar di bagian atas, ilustrasi produk-produk lokal seperti makanan dan kerajinan, warna hijau dan putih sesuai identitas Maberuk, sertakan tanggal dan lokasi acara.",
  },
  {
    id: 5,
    category: "Foto Produk",
    title: "Foto Produk Flat Lay",
    prompt:
      "Foto flat lay [nama produk] dari atas dengan properti pendukung seperti kain linen, bunga kering, dan alat tulis, pencahayaan alami dari jendela, komposisi rapi dan estetik, cocok untuk konten Instagram feed.",
  },
  {
    id: 6,
    category: "Deskripsi Produk",
    title: "Deskripsi Produk Marketplace",
    prompt:
      "Tuliskan deskripsi produk untuk [nama produk] yang akan diunggah ke marketplace, jelaskan bahan, ukuran, keunggulan, dan cara penggunaan, gunakan poin-poin agar mudah dibaca, tambahkan kalimat penutup yang meyakinkan calon pembeli.",
  },
  {
    id: 7,
    category: "Konten Sosial Media",
    title: "Ide Konten Video Pendek",
    prompt:
      "Berikan 5 ide konten video pendek untuk promosi usaha [jenis usaha] di TikTok dan Instagram Reels, sertakan konsep visual singkat, durasi ideal, dan hook di 3 detik pertama agar menarik perhatian penonton.",
  },
  {
    id: 8,
    category: "Desain Kemasan",
    title: "Desain Label Kemasan Produk",
    prompt:
      "Desain label kemasan untuk produk [nama produk], sertakan nama usaha, logo, komposisi singkat, dan kontak, gaya desain bersih dan modern, warna disesuaikan dengan identitas brand, ukuran label untuk kemasan botol atau stand pouch.",
  },
  {
    id: 9,
    category: "Poster Promosi",
    title: "Banner Diskon Toko",
    prompt:
      "Buat desain banner promosi diskon untuk toko [nama toko], tampilkan persentase diskon besar di tengah, produk unggulan sebagai visual pendukung, warna mencolok namun tetap profesional, format landscape untuk media sosial.",
  },
  {
    id: 10,
    category: "Rencana Usaha",
    title: "Ringkasan Rencana Bisnis",
    prompt:
      "Buatkan ringkasan rencana bisnis sederhana untuk usaha [jenis usaha] skala UMK, mencakup target pasar, keunggulan produk, strategi pemasaran dasar, dan estimasi modal awal, tulis dalam format poin yang mudah dipahami pelaku usaha pemula.",
  },
  {
    id: 11,
    category: "Konten Sosial Media",
    title: "Balasan Chat Pelanggan",
    prompt:
      "Buatkan template balasan WhatsApp untuk pertanyaan pelanggan seputar [nama produk], mencakup salam pembuka yang ramah, informasi harga dan stok, cara pemesanan, serta penutup yang sopan dan mengundang pembelian ulang.",
  },
  {
    id: 12,
    category: "Foto Produk",
    title: "Foto Produk dengan Model",
    prompt:
      "Foto produk [nama produk] yang dikenakan atau digunakan oleh model dengan latar suasana alami, pencahayaan natural, ekspresi model santai dan ramah, gaya foto lifestyle, cocok untuk katalog dan konten promosi.",
  },
  {
    id: 13,
    category: "Konten Sosial Media",
    title: "Ide Konten Edukasi Produk",
    prompt:
      "Buatkan ide konten edukatif seputar manfaat dan cara penggunaan [nama produk] untuk diunggah di Instagram, gunakan format carousel dengan 5 slide, setiap slide berisi satu poin singkat yang mudah dipahami pembeli.",
  },
  {
    id: 14,
    category: "Desain Logo",
    title: "Konsep Logo Usaha Kerajinan",
    prompt:
      "Desain logo untuk usaha kerajinan tangan bernama [nama usaha], gunakan elemen ikon yang merepresentasikan proses handmade, warna earth tone seperti cokelat dan krem, gaya vintage minimalis, cocok untuk stempel dan kemasan.",
  },
  {
    id: 15,
    category: "Poster Promosi",
    title: "Poster Grand Opening Toko",
    prompt:
      "Buat desain poster grand opening untuk toko [nama toko], tampilkan judul acara mencolok, promo pembukaan seperti diskon khusus, ilustrasi suasana toko yang ramai dan meriah, warna cerah dan energik.",
  },
  {
    id: 16,
    category: "Foto Produk",
    title: "Foto Produk Close-Up Detail",
    prompt:
      "Foto close-up detail tekstur dan bahan [nama produk], pencahayaan terarah untuk menonjolkan tekstur, latar belakang blur lembut, sudut makro, cocok untuk menunjukkan kualitas dan keunggulan bahan produk.",
  },
  {
    id: 17,
    category: "Deskripsi Produk",
    title: "Deskripsi Produk Singkat untuk WhatsApp",
    prompt:
      "Tuliskan deskripsi singkat dan menarik untuk [nama produk] yang akan dikirim ke pelanggan via WhatsApp, maksimal 4 kalimat, sertakan harga, keunggulan utama, dan ajakan untuk segera memesan sebelum stok habis.",
  },
  {
    id: 18,
    category: "Konten Sosial Media",
    title: "Naskah Video Testimoni Pelanggan",
    prompt:
      "Buatkan naskah singkat untuk video testimoni pelanggan tentang pengalaman menggunakan [nama produk], mencakup pembuka yang ramah, cerita pengalaman positif, dan penutup yang merekomendasikan produk kepada orang lain.",
  },
  {
    id: 19,
    category: "Desain Kemasan",
    title: "Desain Kemasan Hampers",
    prompt:
      "Desain kemasan hampers untuk kumpulan produk [nama usaha], gunakan kotak dengan pita dan kartu ucapan, warna elegan sesuai tema hari besar, tata letak produk yang rapi dan menarik saat dibuka.",
  },
  {
    id: 20,
    category: "Poster Promosi",
    title: "Flyer Promo Bundling Produk",
    prompt:
      "Buat desain flyer promo paket bundling untuk [nama produk], tampilkan beberapa produk dalam satu paket dengan harga hemat, highlight kata 'Hemat' atau 'Paket Spesial', warna kontras dan mudah dibaca dari jarak jauh.",
  },
  {
    id: 21,
    category: "Rencana Usaha",
    title: "Strategi Pemasaran Sederhana",
    prompt:
      "Buatkan strategi pemasaran sederhana untuk usaha [jenis usaha] dengan modal terbatas, mencakup pemanfaatan media sosial gratis, kerja sama dengan komunitas lokal, dan program referral pelanggan, tulis dalam format langkah demi langkah.",
  },
  {
    id: 22,
    category: "Konten Sosial Media",
    title: "Balasan Review Negatif Pelanggan",
    prompt:
      "Buatkan template balasan yang sopan dan profesional untuk review negatif dari pelanggan tentang [nama produk], sampaikan permintaan maaf yang tulus, tawarkan solusi konkret, dan ajak pelanggan menghubungi via WhatsApp untuk penyelesaian lebih lanjut.",
  },
  {
    id: 23,
    category: "Foto Produk",
    title: "Foto Produk untuk Cover Marketplace",
    prompt:
      "Foto produk [nama produk] dengan komposisi persegi untuk foto cover marketplace, produk berada di tengah frame, latar belakang bersih dan kontras, pencahayaan merata tanpa bayangan tajam, siap pakai untuk thumbnail toko online.",
  },
  {
    id: 24,
    category: "Deskripsi Produk",
    title: "Deskripsi Produk untuk Katalog Cetak",
    prompt:
      "Tuliskan deskripsi produk untuk katalog cetak [nama usaha], gunakan gaya bahasa formal dan ringkas, sertakan spesifikasi produk seperti ukuran dan bahan, serta informasi harga yang jelas untuk memudahkan pembaca katalog.",
  },
];

// ─── PROMPT CARD ──────────────────────────────────────────────────────────────

function PromptCard({ item }: { item: (typeof prompts)[number] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // no-op jika clipboard tidak tersedia
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <style jsx>{`
        .prompt-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .prompt-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .prompt-scroll::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 9999px;
        }
        .prompt-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
      {/* Gambar */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/prompt-${item.id}/600/450`}
          alt={item.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold text-green-600 uppercase tracking-wide shadow-sm">
          {item.category}
        </span>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col gap-3 flex-1 min-h-0">
        <h3 className="text-sm font-bold text-gray-900 leading-snug">{item.title}</h3>
        <div className="relative">
          <div
            className="prompt-scroll text-xs text-gray-500 leading-relaxed pr-2"
            style={{
              height: "4.5rem",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            {item.prompt}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent" />
        </div>
        <button
          onClick={handleCopy}
          className={`mt-1 inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${copied
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Tersalin!" : "Salin Prompt"}
        </button>
      </div>
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 12; // 3 kolom x 4 baris

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${p === page
              ? "bg-green-600 text-white shadow-sm"
              : "text-gray-500 hover:bg-green-50 hover:text-green-600 border border-gray-200"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DirektoriPromptPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(prompts.length / ITEMS_PER_PAGE);
  const paginatedPrompts = prompts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (typeof window !== "undefined") {
      const section = document.getElementById("grid-prompt");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-green-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col items-center text-center gap-4">
          <p className="text-xs font-bold tracking-widest text-green-600 uppercase">Direktori Prompt</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Kumpulan Prompt untuk Pelaku UMKM
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
            Kumpulan prompt siap pakai untuk membantu pelaku UMKM Babatan membuat foto produk, caption, desain, hingga konten promosi menggunakan AI.
          </p>
        </div>
      </section>

      {/* ── GRID PROMPT (3 kolom x 4 baris) ── */}
      <section id="grid-prompt" className="py-14 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPrompts.map((item) => (
              <PromptCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mt-10">
            <p className="text-xs text-gray-400 order-2 sm:order-1">
              Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, prompts.length)} dari {prompts.length} prompt
            </p>
            <div className="order-1 sm:order-2">
              <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}