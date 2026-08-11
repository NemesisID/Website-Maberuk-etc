"use client";

import { useMemo, useState } from "react";
const monthlyExpense: any[] = [];
const monthlyIncome: any[] = [];
const summaryRows: any[] = [];
const transactions: any[] = [];
import { umkmNavItems } from "@/data/mock-data";
import {
  EditIcon,
  LogoMark,
  LogoutIcon,
  TrashIcon,
  UmkmNavIcon,
} from "@/components/icons/Icons";
import type { UmkmView } from "@/types";

export function UmkmAdminApp({ user, umkmData }: { user: any; umkmData: any }) {
  const shopName: string = umkmData?.name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Toko Anda";
  const [activeView, setActiveView] = useState<UmkmView>("dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
  const [shopLogo, setShopLogo] = useState<string | null>(umkmData?.logo_url || "/images/logo-maberuk.jpg");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLabel = useMemo(
    () => umkmNavItems.find((item) => item.id === activeView)?.label ?? "Dashboard",
    [activeView],
  );

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-950">
      {/* Desktop Sidebar (Left) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[210px] border-r border-slate-200/80 bg-white md:flex md:flex-col">
        <BrandBlock shopLogo={shopLogo} />
        <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
          {umkmNavItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeView === item.id ? "nav-button-active" : ""}`}
              onClick={() => setActiveView(item.id)}
              type="button"
            >
              <UmkmNavIcon id={item.id} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 pb-6">
          <form action="/api/auth/logout" method="POST">
            <button
              className="logout-button"
              type="submit"
            >
              <LogoutIcon />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header (Sticky Top-0) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          aria-label="Buka Menu Navigasi"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* Mobile Hamburger Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Hamburger Drawer Menu */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <LogoMark src={shopLogo} />
            <div>
              <p className="text-xs font-extrabold text-slate-900 tracking-wider">MABERUK</p>
              <p className="text-[10px] font-medium text-slate-400">UMKM Console</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Tutup Menu Navigasi"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-5">
          {umkmNavItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <UmkmNavIcon id={item.id} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4">
          <hr className="border-slate-100" />
        </div>

        <div className="space-y-1.5 p-4">
          <button
            type="button"
            onClick={() => {
              setActiveView("profile");
              setIsMobileMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <svg className="h-[15px] w-[15px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l.546.947a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-.546.948a1.125 1.125 0 01-1.37.491l-1.216-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-1.094c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-.546-.947a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l.546-.948a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Pengaturan</span>
          </button>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogoutIcon />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Container */}
      <div className="md:pl-[210px]">
        {/* Page Header (Desktop & Title View) */}
        <header className="sticky top-0 z-10 hidden border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:block md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div key={activeView} className="view-transition">
              <h1 className="text-2xl font-bold text-slate-950">
                {activeView === "bookkeeping"
                  ? "Pembukuan Toko"
                  : activeView === "reports"
                    ? "Laporan Keuangan"
                    : activeView === "profile"
                      ? "Profil Usaha"
                      : "Dashboard"}
              </h1>
              <p className="text-sm text-slate-500">
                {activeView === "dashboard"
                  ? `Selamat datang kembali, ${shopName}.`
                  : activeView === "bookkeeping"
                    ? "Catat dan pantau arus kas masuk dan keluar operasional UMKM Anda."
                    : activeView === "reports"
                      ? "Analisis performa bisnis UMKM Anda dengan visualisasi grafik laba rugi."
                      : "Kelola identitas publik toko Anda yang akan dilihat langsung oleh calon pembeli."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeView === "bookkeeping" && (
                <button
                  className="primary-button"
                  onClick={() => setModalOpen(true)}
                  type="button"
                >
                  + Tambah Transaksi
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Page Title Banner */}
        <div className="border-b border-slate-200 bg-white px-4 py-3.5 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-950">
                {activeView === "bookkeeping"
                  ? "Pembukuan Toko"
                  : activeView === "reports"
                    ? "Laporan Keuangan"
                    : activeView === "profile"
                      ? "Profil Usaha"
                      : "Dashboard"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeView === "dashboard"
                  ? `Selamat datang kembali, ${shopName}.`
                  : activeView === "bookkeeping"
                    ? "Catat & pantau arus kas toko."
                    : activeView === "reports"
                      ? "Analisis performa & grafik bisnis."
                      : "Kelola identitas publik toko Anda."}
              </p>
            </div>
            {activeView === "bookkeeping" && (
              <button
                className="primary-button text-xs py-2 px-3"
                onClick={() => setModalOpen(true)}
                type="button"
              >
                + Tambah
              </button>
            )}
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8 overflow-x-hidden">
          <div key={activeView} className="view-transition">
            {activeView === "dashboard" && (
              <DashboardView setActiveView={setActiveView} setModalOpen={setModalOpen} />
            )}
            {activeView === "bookkeeping" && <BookkeepingView />}
            {activeView === "reports" && <ReportsView />}
            {activeView === "profile" && (
              <ProfileView shopLogo={shopLogo} setShopLogo={setShopLogo} />
            )}
          </div>
        </main>
      </div>

      {isModalOpen && <TransactionModal onClose={() => setModalOpen(false)} />}
      <span className="sr-only">Halaman aktif: {activeLabel}</span>
    </div>
  );
}

function BrandBlock({ shopLogo }: { shopLogo?: string | null }) {
  return (
    <div className="brand-block" title="UMKM Console">
      <LogoMark src={shopLogo} />
      <div>
        <p className="text-left text-xs font-bold leading-tight text-slate-900 tracking-wide">MABERUK</p>
        <p className="text-left text-[10px] font-medium leading-tight text-slate-400 mt-0.5">UMKM Console</p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  trend,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  tone: "green" | "red" | "blue";
}) {
  const toneClass = {
    green: "text-emerald-600",
    red: "text-red-500",
    blue: "text-blue-600",
  }[tone];
  const markClass = {
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
    blue: "bg-blue-50 text-blue-600",
  }[tone];

  return (
    <section className="metric-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
        <span className={`metric-mark ${markClass}`}>
          {tone === "red" ? "OUT" : tone === "blue" ? "US" : "IN"}
        </span>
      </div>
      <p className={`mt-5 text-2xl font-extrabold ${toneClass}`}>{value}</p>
      <p className={`mt-2 text-xs font-semibold ${toneClass}`}>{trend}</p>
    </section>
  );
}

function DashboardView({
  setActiveView,
  setModalOpen,
}: {
  setActiveView: (view: UmkmView) => void;
  setModalOpen: (open: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Pemasukan" value="Rp 0" trend="Belum ada transaksi" tone="green" />
        <MetricCard label="Pengeluaran" value="Rp 0" trend="Belum ada transaksi" tone="red" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <button className="quick-action" onClick={() => setModalOpen(true)} type="button">
          <span className="action-icon">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <span>
            <strong>Catat Transaksi</strong>
            <small>Kas masuk atau pengeluaran toko</small>
          </span>
        </button>
        <button className="quick-action" onClick={() => setActiveView("reports")} type="button">
          <span className="action-icon">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          <span>
            <strong>Lihat Laporan</strong>
            <small>Analisis laba rugi dan statistik toko</small>
          </span>
        </button>
        <button className="quick-action" onClick={() => setActiveView("profile")} type="button">
          <span className="action-icon">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span>
            <strong>Lengkapi Profil</strong>
            <small>Perbarui informasi publik usaha</small>
          </span>
        </button>
      </div>

      <section className="panel">
        <div className="section-title">
          <h2>Grafik Penjualan Bulanan</h2>
          <span className="legend-dot">Omset (Juta Rp)</span>
        </div>
        <BarChart data={monthlyIncome.slice(0, 6)} tone="green" />
      </section>

      <section className="panel overflow-hidden">
        <div className="section-title px-5 pt-5">
          <h2>Transaksi Terakhir</h2>
        </div>
        <TransactionList compact />
      </section>
    </div>
  );
}

function BookkeepingView() {
  const [typeFilter, setTypeFilter] = useState<"Semua" | "Pemasukan" | "Pengeluaran">("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (typeFilter === "Semua" || transaction.type === typeFilter) &&
      (categoryFilter === "Semua" || transaction.category === categoryFilter),
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Pemasukan" value="Rp 8.750.000" trend="+8.1% bulan ini" tone="green" />
        <MetricCard label="Pengeluaran" value="Rp 3.200.000" trend="-5.1% bulan ini" tone="red" />
      </div>
      <section className="panel p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
          <div className="segmented">
            {(["Semua", "Pemasukan", "Pengeluaran"] as const).map((filter) => (
              <button
                className={typeFilter === filter ? "is-selected" : ""}
                key={filter}
                onClick={() => setTypeFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <select
            className="field lg:w-64"
            onChange={(event) => setCategoryFilter(event.target.value)}
            value={categoryFilter}
          >
            <option>Semua</option>
            <option>Penjualan</option>
            <option>Operasional</option>
            <option>Bahan Baku</option>
          </select>
        </div>
      </section>
      <section className="panel overflow-hidden">
        <TransactionTable filteredTransactions={filteredTransactions} />
      </section>
    </div>
  );
}

function ReportsView() {
  const [reportPeriod, setReportPeriod] = useState("6 Bulan");
  const reportPeriods = ["7 Hari", "30 Hari", "6 Bulan", "1 Tahun"];

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <div className="segmented">
          {reportPeriods.map((period) => (
            <button
              className={reportPeriod === period ? "is-selected" : ""}
              key={period}
              onClick={() => setReportPeriod(period)}
              type="button"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="panel">
          <div className="section-title">
            <h2>Total Pemasukan Bulanan</h2>
            <span className="legend-dot">Omset (Juta Rp)</span>
          </div>
          <BarChart data={monthlyIncome} tone="green" />
        </section>
        <section className="panel">
          <div className="section-title">
            <h2>Total Pengeluaran Bulanan</h2>
            <span className="legend-dot red">Biaya (Juta Rp)</span>
          </div>
          <BarChart data={monthlyExpense} tone="red" />
        </section>
      </div>
      <section className="panel overflow-hidden">
        <div className="section-title px-5 pt-5">
          <h2>Ikhtisar Pembukuan {reportPeriod} Terakhir</h2>
          <div className="flex gap-2">
            <button className="secondary-button" type="button">Unduh PDF</button>
            <button className="secondary-button" type="button">Unduh Excel</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bulan</th>
              <th>Total Pemasukan</th>
              <th>Total Pengeluaran</th>
              <th>Keuntungan Bersih</th>
            </tr>
          </thead>
          <tbody>
            {summaryRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  <td key={cell} className={index === 3 ? "text-emerald-600 font-bold" : ""}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-emerald-50 font-extrabold">
              <td>Total Keseluruhan</td>
              <td className="text-emerald-600">Rp 53.700.000</td>
              <td>Rp 19.500.000</td>
              <td className="text-emerald-600">Rp 34.200.000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

function parseMapInput(query: string, fallbackAddress: string): {
  embedUrl: string;
  externalUrl: string;
  type: "embed" | "place_url" | "coords" | "short_url" | "text" | "empty";
  placeName?: string;
} {
  const trimmed = query.trim();
  const fallback = fallbackAddress.trim();

  if (!trimmed && !fallback) {
    return {
      embedUrl: "",
      externalUrl: "https://www.google.com/maps",
      type: "empty",
    };
  }

  const activeInput = trimmed || fallback;

  // 1. Full <iframe> code snippet pasted
  if (activeInput.includes("<iframe") && activeInput.includes("src=")) {
    const match = activeInput.match(/src=["']([^"']+)["']/);
    if (match?.[1]) {
      return { embedUrl: match[1], externalUrl: match[1], type: "embed" };
    }
  }

  // 2. Direct embed link pasted (e.g. https://www.google.com/maps/embed?pb=...)
  if (activeInput.includes("google.com/maps/embed")) {
    return { embedUrl: activeInput, externalUrl: activeInput, type: "embed" };
  }

  // 3. Full Google Maps Web URL pasted
  if (activeInput.includes("google.com/maps/place/") || activeInput.includes("google.co.id/maps/place/")) {
    const placeMatch = activeInput.match(/\/maps\/place\/([^/@?]+)/);
    const coordMatch = activeInput.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    let queryText = "";
    if (placeMatch?.[1]) {
      queryText = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    } else if (coordMatch) {
      queryText = `${coordMatch[1]}, ${coordMatch[2]}`;
    }

    if (queryText) {
      return {
        embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(queryText)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
        externalUrl: activeInput,
        type: "place_url",
        placeName: queryText,
      };
    }
  }

  // 4. URL containing coordinates @lat,lng
  if (activeInput.includes("@") && /-?\d+\.\d+,-?\d+\.\d+/.test(activeInput)) {
    const coordMatch = activeInput.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const coords = `${coordMatch[1]}, ${coordMatch[2]}`;
      return {
        embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(coords)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
        externalUrl: activeInput,
        type: "coords",
        placeName: coords,
      };
    }
  }

  // 5. Short URLs (maps.app.goo.gl, share.google, goo.gl/maps)
  if (/^https?:\/\//i.test(activeInput)) {
    if (!fallback) {
      return {
        embedUrl: "",
        externalUrl: activeInput,
        type: "short_url",
      };
    }
    return {
      embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(fallback)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
      externalUrl: activeInput,
      type: "short_url",
    };
  }

  // 6. Plain text address or place name
  return {
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(activeInput)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeInput)}`,
    type: "text",
    placeName: activeInput,
  };
}

function ProfileView({
  shopLogo,
  setShopLogo,
}: {
  shopLogo: string | null;
  setShopLogo: (logo: string | null) => void;
}) {
  const [waNumber, setWaNumber] = useState("081234567890");
  const [igAccount, setIgAccount] = useState("@sarirasa_babatan");
  const [fbPage, setFbPage] = useState("Toko Sari Rasa Babatan");
  const [tiktokAccount, setTiktokAccount] = useState("@sarirasa.kitchen");
  const [shopAddress, setShopAddress] = useState("");
  const [mapQuery, setMapQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<string | null>(null);

  const mapResult = parseMapInput(mapQuery, shopAddress);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setShopLogo(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleShareLocation() {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const coordsStr = `${lat}, ${lng}`;
          setGpsCoords(coordsStr);
          setMapQuery(coordsStr);
          setIsLocating(false);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      setIsLocating(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <label className="relative group grid h-20 w-20 shrink-0 place-items-center rounded-full bg-slate-100 border-2 border-dashed border-slate-300 hover:border-emerald-500 shadow-inner cursor-pointer overflow-hidden transition-all">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            {shopLogo ? (
              <>
                <img src={shopLogo} alt="Logo Toko" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold text-center p-1">
                  Ganti Logo
                </div>
              </>
            ) : (
              <>
                <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-200/70 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 011.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-white border-2 border-white shadow-sm">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </>
            )}
          </label>
          <div>
            <h2 className="text-base font-bold text-slate-900">Logo Utama Toko</h2>
            <p className="mt-1 text-sm text-slate-500 font-normal">
              Klik gambar logo di sebelah kiri untuk mengunggah atau mengganti logo toko.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="mb-5 text-base font-bold text-slate-900">Identitas Utama Usaha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Toko / Usaha
                </label>
                <input className="field font-normal text-slate-800" defaultValue="Toko Sari Rasa Babatan" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Pemilik
                </label>
                <input className="field font-normal text-slate-800" defaultValue="Ibu Endang Sri Lestari" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nomor WhatsApp (Untuk Pemesanan)
                </label>
                <div className="relative">
                  {!waNumber && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  )}
                  <input
                    className="field font-normal text-slate-800"
                    style={{ paddingLeft: !waNumber ? "2.25rem" : "0.8rem" }}
                    placeholder="081234567890"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400 font-normal italic">
                  Nomor ini digunakan pembeli untuk memesan produk via direct WhatsApp
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tentang Toko / Deskripsi Singkat
                </label>
                <textarea
                  className="field min-h-24 py-2.5 resize-y"
                  defaultValue="Menyediakan aneka jajanan pasar tradisional, katering nasi kotak harian, dan aneka sambal botolan legendaris dengan resep turun-temurun asli Babatan."
                />
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Alamat & Peta Lokasi Toko</h2>
                <p className="text-xs text-slate-500 font-normal">Ketik nama tempat/alamat atau tempel link Google Maps untuk menampilkan peta lokasi fisik toko.</p>
              </div>
              <button
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all border border-emerald-200/80 cursor-pointer shadow-xs active:scale-95 shrink-0"
                onClick={handleShareLocation}
                disabled={isLocating}
                type="button"
              >
                {isLocating ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mendeteksi GPS...
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Share Lokasi Sekarang
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Lengkap Toko *
                </label>
                <textarea
                  className="field min-h-20 py-2.5 resize-y font-normal text-slate-800"
                  value={shopAddress}
                  onChange={(e) => {
                    setShopAddress(e.target.value);
                    setMapQuery(e.target.value);
                  }}
                  placeholder="Ketik alamat lengkap toko..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Input Nama Tempat / Alamat / Link Google Maps
                </label>
                <input
                  className="field font-normal text-slate-800"
                  placeholder="Ketik nama tempat (contoh: Gardu Perbatasan Surabaya - Gresik)..."
                  value={mapQuery}
                  onChange={(e) => setMapQuery(e.target.value)}
                />
                <p className="mt-1 text-[11px] text-slate-400 font-normal">
                  Tips: Anda bisa mengetik nama tempat (contoh: <strong>Gardu Perbatasan Surabaya - Gresik</strong>) atau menempelkan alamat/kode Sematkan Peta.
                </p>
              </div>

              {mapResult.type === "short_url" && !mapResult.embedUrl && (
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <svg className="h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    Terdeteksi Link Pendek (maps.app.goo.gl)
                  </div>
                  <p>
                    Link pendek tidak bisa diputar langsung di dalam iframe preview. Silakan ketik nama tempatnya (contoh: <strong>Gardu Perbatasan Surabaya - Gresik</strong>) pada kolom di atas.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-14.258l-6-2.25a2.25 2.25 0 00-1.506 0l-6 2.25A2.25 2.25 0 003 6.75v10.5a2.25 2.25 0 001.247 2.016l6 2.25a2.25 2.25 0 001.506 0l6-2.25A2.25 2.25 0 0021 17.25V6.75a2.25 2.25 0 00-1.247-2.016z" />
                    </svg>
                    Preview Peta Lokasi Toko
                  </div>
                  {mapResult.externalUrl && (
                    <a
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                      href={mapResult.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buka Google Maps ↗
                    </a>
                  )}
                </div>

                {mapResult.embedUrl ? (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-200 shadow-inner">
                    <iframe
                      key={mapResult.embedUrl}
                      title="Preview Peta Lokasi Toko"
                      width="100%"
                      height="100%"
                      className="w-full h-full border-0"
                      loading="lazy"
                      src={mapResult.embedUrl}
                    />
                  </div>
                ) : (
                  <div className="relative h-48 w-full rounded-xl border border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center p-4 text-center">
                    <svg className="h-8 w-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-xs font-bold text-slate-500">Belum Ada Lokasi Toko</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Ketik nama tempat/alamat pada kolom di atas atau klik &quot;Share Lokasi Sekarang&quot;</p>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 font-normal italic">
                  Peta ini akan otomatis ditampilkan pada profil usaha Anda untuk mempermudah calon pembeli menemukan lokasi fisik toko.
                </p>
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">Foto Produk & Hasil Jualan Usaha</h2>
              <p className="text-xs text-slate-400 font-normal mt-1">
                Unggah foto produk jualan UMKM Anda dengan rasio 1:1 agar konsisten dan terlihat rapi di katalog.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src="/images/product-jajanan.png"
                  alt="Jajanan Pasar"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-950/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm truncate text-center">
                  Jajanan Pasar
                </span>
                <button
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus foto"
                  type="button"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src="/images/product-nasikotak.png"
                  alt="Nasi Kotak"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-950/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm truncate text-center">
                  Nasi Kotak
                </span>
                <button
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus foto"
                  type="button"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  src="/images/product-sambal.png"
                  alt="Sambal Botol"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-950/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm truncate text-center">
                  Sambal Botol
                </span>
                <button
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus foto"
                  type="button"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <button
                className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer text-slate-400 hover:text-emerald-600 group"
                type="button"
              >
                <div className="h-8 w-8 rounded-full bg-slate-200/70 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4 text-slate-500 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-emerald-600">Tambah Foto</span>
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="mb-5 text-base font-bold text-slate-900">Jam Operasional Toko</h2>
            <div className="space-y-4">
              <TimeRow label="Senin - Jumat" start="08:00" end="21:00" />
              <TimeRow label="Sabtu - Minggu" start="09:00" end="22:00" />
            </div>
          </section>

          <section className="panel p-6">
            <h2 className="mb-5 text-base font-bold text-slate-900">Sosial Media & Kontak</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Instagram
                </label>
                <div className="relative">
                  {!igAccount && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                  )}
                  <input
                    className="field"
                    style={{ paddingLeft: !igAccount ? "2.25rem" : "0.8rem" }}
                    placeholder="@sarirasa_babatan"
                    value={igAccount}
                    onChange={(e) => setIgAccount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Facebook Page
                </label>
                <div className="relative">
                  {!fbPage && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </div>
                  )}
                  <input
                    className="field"
                    style={{ paddingLeft: !fbPage ? "2.25rem" : "0.8rem" }}
                    placeholder="Toko Sari Rasa Babatan"
                    value={fbPage}
                    onChange={(e) => setFbPage(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  TikTok
                </label>
                <div className="relative">
                  {!tiktokAccount && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33 6.33 6.33 0 0 0 6.33-6.33V9.05a8.21 8.21 0 0 0 5-1.74v-3.72a4.81 4.81 0 0 1-1.08 3.1z" />
                      </svg>
                    </div>
                  )}
                  <input
                    className="field"
                    style={{ paddingLeft: !tiktokAccount ? "2.25rem" : "0.8rem" }}
                    placeholder="@sarirasa.kitchen"
                    value={tiktokAccount}
                    onChange={(e) => setTiktokAccount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-5 border-t border-slate-200/80">
        <p className="text-xs text-slate-400 font-medium">
          Pastikan data yang Anda isi sudah benar untuk menjaga kredibilitas UMKM
        </p>
        <button className="primary-button shrink-0 px-6 bg-[#10b981] hover:bg-[#059669]" type="button">
          Simpan Perubahan Profil
        </button>
      </div>
    </div>
  );
}

function TimeRow({ label, start, end }: { label: string; start: string; end: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-semibold text-slate-700 text-xs sm:text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <input className="field w-20 text-center text-xs py-1.5 px-2 font-medium" defaultValue={start} />
        <span className="text-xs text-slate-400 font-medium">s/d</span>
        <input className="field w-20 text-center text-xs py-1.5 px-2 font-medium" defaultValue={end} />
      </div>
    </div>
  );
}

function BarChart({ data, tone }: { data: Array<{ month: string; value: number }>; tone: "green" | "red" }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="chart" aria-label="Grafik batang">
      {data.map((item) => (
        <div className="chart-item" key={item.month}>
          <div className="chart-track">
            <div
              className={`chart-bar ${tone === "green" ? "bg-emerald-600" : "bg-red-500"}`}
              style={{ height: `${Math.max(24, (item.value / max) * 112)}px` }}
            />
          </div>
          <span>{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function TransactionList({ compact = false }: { compact?: boolean }) {
  return (
    <div className="divide-y divide-slate-100">
      {transactions.slice(0, compact ? 5 : transactions.length).map((transaction) => (
        <div className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[110px_90px_1fr_120px]" key={`${transaction.date}-${transaction.note}`}>
          <span className="text-slate-500">{transaction.date}</span>
          <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
            {transaction.type === "Pemasukan" ? "Masuk" : "Keluar"}
          </span>
          <span className="truncate font-semibold text-slate-700">{transaction.note}</span>
          <span className={`text-right font-extrabold ${transaction.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>
            {transaction.amount}
          </span>
        </div>
      ))}
    </div>
  );
}

function TransactionTable({ filteredTransactions }: { filteredTransactions: typeof transactions }) {
  return (
    <div>
      {/* Mobile Card List View (< md) */}
      <div className="divide-y divide-slate-100 md:hidden">
        {filteredTransactions.map((transaction) => (
          <div className="p-4 space-y-2.5" key={`${transaction.date}-${transaction.note}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{transaction.date}</span>
              <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
                {transaction.type}
              </span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-800 leading-snug">{transaction.note}</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {transaction.category}
                </span>
              </div>
              <p className={`text-base font-extrabold shrink-0 ${transaction.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>
                {transaction.amount}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className={`pill ${transaction.status === "Selesai" ? "pill-green" : "pill-yellow"}`}>
                {transaction.status}
              </span>
              <div className="flex gap-2">
                <button className="icon-button" title="Edit transaksi" type="button">
                  <EditIcon />
                </button>
                <button className="icon-button danger" title="Hapus transaksi" type="button">
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="data-table min-w-[850px]">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={`${transaction.date}-${transaction.note}`}>
                <td>{transaction.date}</td>
                <td>
                  <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.category}</td>
                <td className="font-semibold text-slate-700">{transaction.note}</td>
                <td className={transaction.type === "Pemasukan" ? "font-bold text-emerald-600" : "font-bold text-red-500"}>
                  {transaction.amount}
                </td>
                <td>
                  <span className={`pill ${transaction.status === "Selesai" ? "pill-green" : "pill-yellow"}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-button" title="Edit transaksi" type="button">
                      <EditIcon />
                    </button>
                    <button className="icon-button danger" title="Hapus transaksi" type="button">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && <EmptyState text="Transaksi tidak ditemukan." />}
      <div className="flex flex-col gap-3 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
        <span>
          Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
        </span>
        <div className="flex gap-2">
          <button className="page-button" type="button">Sebelumnya</button>
          <button className="page-button active" type="button">1</button>
          <button className="page-button" type="button">2</button>
          <button className="page-button" type="button">3</button>
          <button className="page-button" type="button">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
}

function TransactionModal({ onClose }: { onClose: () => void }) {
  const [transactionType, setTransactionType] = useState<"Pemasukan" | "Pengeluaran">("Pemasukan");
  const [category, setCategory] = useState("Makanan");
  const isExpense = transactionType === "Pengeluaran";
  const categories = isExpense ? ["Bahan Baku", "Operasional", "Kemasan"] : ["Makanan", "Katering", "Penjualan"];

  function handleTransactionTypeChange(nextType: "Pemasukan" | "Pengeluaran") {
    setTransactionType(nextType);
    setCategory(nextType === "Pengeluaran" ? "Bahan Baku" : "Makanan");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Tambah Transaksi Baru</h2>
          <button className="icon-button" onClick={onClose} title="Tutup modal" type="button">
            X
          </button>
        </div>
        <div className="form-grid">
          <label className="text-xs font-semibold text-slate-700">
            Tipe Transaksi
            <div className="segmented grid grid-cols-2 mt-1">
              <button
                className={transactionType === "Pemasukan" ? "is-selected font-bold" : "font-semibold"}
                onClick={() => handleTransactionTypeChange("Pemasukan")}
                type="button"
              >
                Pemasukan
              </button>
              <button
                className={isExpense ? "is-selected font-bold" : "font-semibold"}
                onClick={() => handleTransactionTypeChange("Pengeluaran")}
                type="button"
              >
                Pengeluaran
              </button>
            </div>
          </label>
          <label className="text-xs font-semibold text-slate-700">
            Tanggal Transaksi
            <input className="field font-normal text-slate-800" defaultValue="2026-01-20" type="date" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-700">
              Kategori
              <select className="field font-normal text-slate-800" onChange={(event) => setCategory(event.target.value)} value={category}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Jumlah (Rp)
              <input className="field font-normal text-slate-800" defaultValue={isExpense ? "Rp 150.000" : "Rp 300.000"} key={transactionType} />
            </label>
          </div>
          <label className="text-xs font-semibold text-slate-700">
            Keterangan
            <textarea
              className="field min-h-24 font-normal text-slate-800"
              defaultValue={isExpense ? "Beli minyak goreng kemasan dan bumbu dapur" : "Penjualan Kripik Tempe Mang Oyo 20 pcs"}
              key={`${transactionType}-note`}
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button className="secondary-button" onClick={onClose} type="button">Batal</button>
          <button className="primary-button bg-[#10b981] hover:bg-[#059669]" onClick={onClose} type="button">Simpan Transaksi</button>
        </div>
      </section>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="p-5 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}
