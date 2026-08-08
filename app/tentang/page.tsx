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
                  link.label === "Tentang"
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
              className={link.label === "Tentang" ? "text-sm font-semibold text-green-600" : "text-sm font-medium text-gray-600"}
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-green-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center gap-6">
          {/* Logo besar */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/logo-maberuk.webp"
                alt="Logo MABERUK UMKM Babatan"
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black">✓</span>
          </div>

          {/* Judul */}
          <div>
            <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-2">Tentang Kami</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-1">
              MABERUK
            </h1>
            <p className="text-lg text-green-600 font-semibold">
              Maju Bersama UMK Kelurahan Babatan
            </p>
          </div>
        </div>
      </section>

      {/* ── DESKRIPSI ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Teks utama */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-2">Siapa Kami</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Maberuk</h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 leading-loose text-[15px] space-y-4">
                <p>
                  <span className="font-semibold text-gray-900">Maberuk (Maju Bersama UMK Kelurahan Babatan)</span> merupakan sebuah paguyuban yang dibentuk oleh Kelurahan Babatan, Kecamatan Wiyung, sebagai upaya untuk memperkuat kolaborasi dan kemitraan antar pelaku Usaha Mikro Kecil (UMK) di wilayah tersebut.
                </p>
                <p>
                  Paguyuban ini menjadi wadah koordinasi dan pendampingan, terutama bagi pelaku UMK pemula, mulai dari proses pendataan, pengurusan legalitas usaha seperti <span className="font-semibold text-gray-900">NIB (Nomor Induk Berusaha)</span>, hingga fasilitasi pelatihan dan kegiatan promosi seperti bazar UMK.
                </p>
                <p>
                  Melalui Maberuk, pelaku UMK mendapatkan akses untuk meningkatkan kapasitas usaha, memperluas jaringan, dan memperkuat posisi usaha mereka di tengah persaingan pasar.
                </p>
                <p>
                  Keberadaan Maberuk menunjukkan <span className="font-semibold text-gray-900">sinergi yang baik antara pemerintah kelurahan dan pelaku usaha lokal</span> dalam mewujudkan kemandirian ekonomi masyarakat Babatan.
                </p>
              </div>
            </div>

            {/* Card logo + kepanjangan */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center gap-5 shadow-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/logo-maberuk.webp"
                    alt="Logo MABERUK"
                    width={128}
                    height={128}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-xl mb-1">MABERUK</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    <span className="font-bold text-green-600">MA</span>ju{" "}
                    <span className="font-bold text-green-600">BER</span>sama{" "}
                    <span className="font-bold text-green-600">U</span>saha Mikro{" "}
                    <span className="font-bold text-green-600">K</span>ecil<br />
                    Kelurahan Babatan
                  </p>
                </div>
                <div className="w-full border-t border-gray-200 pt-4 flex flex-col gap-2 text-left">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Status</span>
                    <span className="font-semibold text-green-600">Paguyuban Aktif</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Kecamatan</span>
                    <span className="font-semibold text-gray-700">Wiyung</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Kota</span>
                    <span className="font-semibold text-gray-700">Surabaya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Bergabung Bersama Kami</h2>
          <p className="text-sm text-gray-500 mb-7 max-w-md mx-auto leading-relaxed">
            Daftarkan usaha Anda ke Maberuk dan dapatkan akses pendampingan, pelatihan, serta jaringan pelaku UMK Babatan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/direktori"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              Lihat Direktori UMKM
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 text-sm font-semibold rounded-xl transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}