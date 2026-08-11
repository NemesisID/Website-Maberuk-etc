"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { login } from "./actions";

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

function MailIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m3 6.5 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="4" y="10.5" width="16" height="10" rx="2.2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M2 12s3.75-7 10-7 10 7 10 7-3.75 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.25 0 10 7 10 7a15.6 15.6 0 0 1-4.15 4.65M6.2 6.2C3.6 7.9 2 12 2 12s3.75 7 10 7c1.4 0 2.66-.35 3.77-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────

export default function MasukPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await login(formData);
    
    if (res?.error) {
      setErrorMsg(res.error);
      setSubmitting(false);
    } else if (res?.success) {
      if (email === "super@admin.com") {
        router.push("/admin");
      } else {
        router.push("/umkm");
      }
      router.refresh(); // Ensure layout checks new session
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white text-gray-900" style={{ fontFamily: "'Inter', Arial, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo – kiri, lebar tetap */}
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

            {/* Desktop Nav – tengah */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Beranda</Link>
              <Link href="/tentang" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Tentang</Link>
              <Link href="/direktori" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori UMKM</Link>
              <Link href="/direktori-prompt" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Direktori Prompt</Link>
            </div>

            {/* Kanan – lebar tetap, rata kanan */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 shadow-lg">
            <Link href="/" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Beranda</Link>
            <Link href="/tentang" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Tentang</Link>
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

      {/* ── KONTEN LOGIN ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Panel kiri — brand, premium */}
        <div className="relative hidden lg:flex lg:w-[45%] flex-col justify-between bg-gradient-to-br from-green-700 via-green-600 to-emerald-900 text-white p-10 xl:p-14 overflow-hidden">

          {/* Main Copy */}
          <div className="relative z-10 mt-12">
            
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-6">
              Kelola usaha Anda <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-green-100">lebih cerdas.</span>
            </h1>
            
            <p className="text-sm xl:text-base text-green-50/80 leading-relaxed max-w-sm mb-10">
              Masuk ke dasbor untuk memperbarui profil etalase toko, mencatat pembukuan, hingga memanfaatkan prompt AI.
            </p>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3.5 group">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <span className="text-sm font-medium text-emerald-50">Manajemen Katalog Etalase</span>
               </div>
               <div className="flex items-center gap-3.5 group">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <span className="text-sm font-medium text-emerald-50">Pencatatan Pembukuan Digital</span>
               </div>
               <div className="flex items-center gap-3.5 group">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                    <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <span className="text-sm font-medium text-emerald-50">Akses Kumpulan Prompt AI</span>
               </div>
            </div>
          </div>

          {/* Footer Area */}
          <div className="relative z-10 flex items-center justify-between mt-16 pt-6 border-t border-white/10">
             <p className="text-xs font-medium text-green-100/60">
               © 2026 MABERUK
             </p>
             <div className="flex gap-4 text-xs font-medium text-green-100/60">
                <a href="#" className="hover:text-white transition-colors">Bantuan</a>
             </div>
          </div>
        </div>

        {/* Panel kanan — form */}
        <div className="relative flex-1 flex items-center justify-center px-6 bg-green-50/50 overflow-hidden">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-green-200/30 blur-3xl lg:hidden" />

          <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 p-8 sm:p-9">

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">Selamat datang kembali</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                  {errorMsg}
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <MailIcon />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Kata sandi
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 text-sm rounded-xl border border-gray-200 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 select-none cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Ingat saya di perangkat ini</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-70 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                {submitting ? "Memproses..." : "Masuk"}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}