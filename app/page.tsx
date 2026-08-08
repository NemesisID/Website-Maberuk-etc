"use client";

import { type DragEvent, useMemo, useState, useSyncExternalStore } from "react";

type AppMode = "super" | "umkm";
type UmkmView = "dashboard" | "bookkeeping" | "reports" | "profile";
type SuperView = "dashboard" | "umkm" | "website" | "users";

const umkmNavItems: Array<{ id: UmkmView; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "DB" },
  { id: "bookkeeping", label: "Pembukuan", icon: "BK" },
  { id: "reports", label: "Laporan", icon: "LP" },
  { id: "profile", label: "Profil", icon: "PR" },
];

const superNavItems: Array<{ id: SuperView; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "DB" },
  { id: "umkm", label: "Kelola UMKM", icon: "UM" },
  { id: "website", label: "Kelola Website", icon: "WB" },
  { id: "users", label: "Kelola Pengguna", icon: "US" },
];

const transactions = [
  {
    date: "20 Jan 2026",
    type: "Pemasukan",
    category: "Penjualan",
    note: "Penjualan Kripik Tempe Mang Oyo 20 pcs",
    amount: "+Rp 300.000",
    status: "Selesai",
  },
  {
    date: "19 Jan 2026",
    type: "Pengeluaran",
    category: "Bahan Baku",
    note: "Beli minyak goreng kemasan dan bumbu dapur",
    amount: "-Rp 150.000",
    status: "Selesai",
  },
  {
    date: "18 Jan 2026",
    type: "Pemasukan",
    category: "Penjualan",
    note: "Pesanan Kopi Susu Aren Gula Merah via GoFood",
    amount: "+Rp 180.000",
    status: "Selesai",
  },
  {
    date: "18 Jan 2026",
    type: "Pengeluaran",
    category: "Operasional",
    note: "Bayar token listrik toko bulanan",
    amount: "-Rp 200.000",
    status: "Selesai",
  },
  {
    date: "17 Jan 2026",
    type: "Pemasukan",
    category: "Katering",
    note: "Uang muka hiasan dinding Jati Geometris",
    amount: "+Rp 450.000",
    status: "Selesai",
  },
  {
    date: "16 Jan 2026",
    type: "Pemasukan",
    category: "Katering",
    note: "Pesanan nasi kotak acara syukuran kantor lurah",
    amount: "+Rp 1.500.000",
    status: "Pending",
  },
  {
    date: "15 Jan 2026",
    type: "Pengeluaran",
    category: "Kemasan",
    note: "Cetak stiker logo dan paper bag ramah lingkungan",
    amount: "-Rp 120.000",
    status: "Selesai",
  },
  {
    date: "14 Jan 2026",
    type: "Pemasukan",
    category: "Penjualan",
    note: "Pembelian Sambal Korek Bu Tedjo via WA",
    amount: "+Rp 110.000",
    status: "Selesai",
  },
];

const monthlyIncome = [
  { month: "Jul", value: 72 },
  { month: "Agt", value: 78 },
  { month: "Sep", value: 94 },
  { month: "Okt", value: 75 },
  { month: "Nov", value: 98 },
  { month: "Des", value: 112 },
];

const monthlyExpense = [
  { month: "Jul", value: 42 },
  { month: "Agt", value: 49 },
  { month: "Sep", value: 45 },
  { month: "Okt", value: 56 },
  { month: "Nov", value: 48 },
  { month: "Des", value: 64 },
];

const superMonthlyUmkm = [
  { month: "Jan", value: 24 },
  { month: "Feb", value: 32 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 42 },
  { month: "Mei", value: 61 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 78 },
  { month: "Agt", value: 92 },
  { month: "Sep", value: 70 },
  { month: "Okt", value: 82 },
  { month: "Nov", value: 101 },
  { month: "Des", value: 113 },
];

const summaryRows = [
  ["Juli 2025", "Rp 8.000.000", "Rp 3.000.000", "Rp 5.000.000"],
  ["Agustus 2025", "Rp 8.500.000", "Rp 3.100.000", "Rp 5.400.000"],
  ["September 2025", "Rp 9.000.000", "Rp 2.900.000", "Rp 6.100.000"],
  ["Oktober 2025", "Rp 8.200.000", "Rp 3.500.000", "Rp 4.700.000"],
  ["November 2025", "Rp 9.500.000", "Rp 3.200.000", "Rp 6.300.000"],
  ["Desember 2025", "Rp 10.500.000", "Rp 3.800.000", "Rp 6.700.000"],
];

const umkmAccounts = [
  {
    name: "Toko Sari Rasa",
    owner: "Hartono",
    phone: "0812-4567-7890",
    status: "Aktif",
    joined: "12 Des 2025",
    category: "Makanan & Minuman",
    address: "Jl. Babatan Indah No. 42, Surabaya",
    products: 24,
    revenue: "Rp 8.750.000",
  },
  {
    name: "Batik Sekar Arum",
    owner: "Arumi",
    phone: "0813-0987-5432",
    status: "Aktif",
    joined: "15 Des 2025",
    category: "Fashion & Pakaian",
    address: "Jl. Raya Menganti No. 18, Surabaya",
    products: 38,
    revenue: "Rp 6.420.000",
  },
  {
    name: "Kripik Tempe Mang Oyo",
    owner: "Haryono",
    phone: "0819-1233-4455",
    status: "Nonaktif",
    joined: "03 Jan 2026",
    category: "Makanan & Minuman",
    address: "Jl. Wiyung Barat No. 7, Surabaya",
    products: 12,
    revenue: "Rp 2.100.000",
  },
  {
    name: "Hiasan Jati Geometris",
    owner: "Bambang",
    phone: "0821-4455-6677",
    status: "Aktif",
    joined: "10 Jan 2026",
    category: "Kerajinan Tangan",
    address: "Jl. Lidah Kulon No. 29, Surabaya",
    products: 26,
    revenue: "Rp 4.980.000",
  },
  {
    name: "Sambal Korek Bu Tedjo",
    owner: "Bu Tedjo",
    phone: "0856-8777-8899",
    status: "Nonaktif",
    joined: "11 Jan 2026",
    category: "Makanan & Minuman",
    address: "Jl. Babatan Pantai No. 5, Surabaya",
    products: 9,
    revenue: "Rp 1.740.000",
  },
];

const initialRecommendations = [
  "Toko Sari Rasa",
  "Batik Sekar Arum",
  "Hiasan Jati Geometris",
  "Sambal Korek Bu Tedjo",
];

export default function Home() {
  const urlMode = useSyncExternalStore(
    () => () => undefined,
    getModeFromLocation,
    () => null,
  );
  const [selectedMode, setSelectedMode] = useState<AppMode | null>(null);
  const mode = selectedMode ?? urlMode;

  if (mode === null) {
    return <div className="min-h-screen bg-[#f6f7f8]" />;
  }

  if (mode === "super") {
    return <SuperAdminApp setMode={setSelectedMode} />;
  }

  return <UmkmAdminApp setMode={setSelectedMode} />;
}

function getModeFromLocation() {
    const params = new URLSearchParams(window.location.search);
    return params.get("mode") === "umkm" ? "umkm" : "super";
}

/* Mode switch removed — UI now uses sidebar logout and consistent branding */

function SuperAdminApp({ setMode }: { setMode: (mode: AppMode) => void }) {
  const [activeView, setActiveView] = useState<SuperView>("dashboard");
  const activeLabel = useMemo(
    () => superNavItems.find((item) => item.id === activeView)?.label ?? "Dashboard",
    [activeView],
  );

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[180px] bg-[#1f2a3a] text-slate-300 md:flex md:flex-col">
        <SuperBrandBlock />
        <nav className="flex flex-1 flex-col gap-3 px-6 py-5">
          {superNavItems.map((item) => (
            <button
              key={item.id}
              className={`super-nav-button ${activeView === item.id ? "super-nav-active" : ""}`}
              onClick={() => setActiveView(item.id)}
              type="button"
            >
              <SuperNavIcon id={item.id} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mx-6 border-t border-white/10 py-4">
          <button
            className="super-user-card"
            onClick={() => setMode("umkm")}
            title="Lihat Admin UMKM"
            type="button"
          >
            <div className="super-avatar">
              <span>BS</span>
            </div>
            <div>
              <p className="text-left text-xs font-bold leading-tight text-white">Budi Santoso</p>
              <p className="mt-0.5 text-left text-[10px] leading-tight text-slate-400">budi.admin@babatan.id</p>
            </div>
          </button>
        </div>
      </aside>

      <div className="md:pl-[180px]">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div key={activeView} className="view-transition">
              <p className="text-xs font-semibold uppercase text-emerald-600 md:hidden">
                Super Admin
              </p>
              <h1 className="text-2xl font-bold text-slate-950">
                {activeView === "dashboard"
                  ? "Dashboard Admin"
                  : activeView === "umkm"
                    ? "Kelola UMKM"
                    : activeView === "website"
                      ? "Kelola Website"
                      : "Kelola Pengguna"}
              </h1>
              <p className="mt-1 text-sm text-slate-500 font-normal">
                {activeView === "dashboard"
                  ? "Pantau pertumbuhan UMKM dan pengguna Babatan."
                  : activeView === "umkm"
                    ? "Verifikasi, pantau, dan lihat status operasional usaha yang terdaftar."
                    : activeView === "website"
                      ? "Kelola konten utama website dan urutan rekomendasi UMKM."
                      : "Atur otoritas akun admin, pemilik toko UMKM, serta pelanggan direktori Babatan."}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 md:hidden">
            {superNavItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-tab ${activeView === item.id ? "mobile-tab-active" : ""}`}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div key={activeView} className="view-transition">
            {activeView === "dashboard" && <SuperDashboardView />}
            {activeView === "umkm" && <ManageUmkmView />}
            {activeView === "website" && <ManageWebsiteView />}
            {activeView === "users" && <ManageUsersView />}
          </div>
        </main>
      </div>
      <span className="sr-only">Halaman aktif: {activeLabel}</span>
    </div>
  );
}

function UmkmAdminApp({ setMode }: { setMode: (mode: AppMode) => void }) {
  const [activeView, setActiveView] = useState<UmkmView>("dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
  const activeLabel = useMemo(
    () => umkmNavItems.find((item) => item.id === activeView)?.label ?? "Dashboard",
    [activeView],
  );

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[210px] border-r border-slate-200/80 bg-white md:flex md:flex-col">
        <BrandBlock onSwitchMode={() => setMode("super")} />
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
          <button className="logout-button" type="button">
            <LogoutIcon />
            Keluar
          </button>
        </div>
      </aside>

      <div className="md:pl-[210px]">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div key={activeView} className="view-transition">
              <p className="text-xs font-semibold uppercase text-emerald-600 md:hidden">
                UMKM Babatan
              </p>
              <h1 className="text-2xl font-bold text-slate-950">
                {activeView === "bookkeeping"
                  ? "Pembukuan Toko"
                  : activeView === "reports"
                    ? "Laporan Keuangan"
                    : activeView === "profile"
                      ? "Profil Usaha"
                      : "Dashboard"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {activeView === "dashboard"
                  ? "Selamat datang kembali, Toko Sari Rasa."
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
          <div className="mt-4 grid grid-cols-4 gap-2 md:hidden">
            {umkmNavItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-tab ${activeView === item.id ? "mobile-tab-active" : ""}`}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div key={activeView} className="view-transition">
            {activeView === "dashboard" && (
              <DashboardView setActiveView={setActiveView} setModalOpen={setModalOpen} />
            )}
            {activeView === "bookkeeping" && <BookkeepingView />}
            {activeView === "reports" && <ReportsView />}
            {activeView === "profile" && <ProfileView />}
          </div>
        </main>
      </div>

      {isModalOpen && <TransactionModal onClose={() => setModalOpen(false)} />}
      <span className="sr-only">Halaman aktif: {activeLabel}</span>
    </div>
  );
}

function SuperBrandBlock() {
  return (
    <div className="flex h-[70px] items-center gap-3 px-6">
      <LogoMark />
      <div>
        <p className="text-[13px] font-extrabold leading-tight text-white tracking-wide">MABERUK</p>
        <p className="text-[9px] font-bold uppercase leading-tight text-slate-300">SUPER ADMIN</p>
      </div>
    </div>
  );
}

function SuperNavIcon({ id }: { id: SuperView }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-[15px] w-[15px]",
    fill: "none",
    viewBox: "0 0 24 24",
  };

  if (id === "dashboard") {
    return (
      <svg {...commonProps}>
        <path d="M5 5h5v5H5V5ZM14 5h5v5h-5V5ZM5 14h5v5H5v-5ZM14 14h5v5h-5v-5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (id === "umkm") {
    return (
      <svg {...commonProps}>
        <path d="M4 10.5 12 5l8 5.5M6.5 10v8h11v-8M9 18v-4h6v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (id === "website") {
    return (
      <svg {...commonProps}>
        <path d="M4.5 6.5h15v11h-15v-11ZM4.5 10h15M8 14h3M13 14h3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" />
    </svg>
  );
}

function BrandBlock({ onSwitchMode }: { onSwitchMode: () => void }) {
  return (
    <button
      className="brand-block"
      onClick={onSwitchMode}
      title="Lihat Super Admin"
      type="button"
    >
      <LogoMark />
      <div>
        <p className="text-left text-xs font-bold leading-tight text-slate-900 tracking-wide">MABERUK</p>
        <p className="text-left text-[10px] font-medium leading-tight text-slate-400 mt-0.5">UMKM Console</p>
      </div>
    </button>
  );
}

function LogoMark() {
  return (
    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-xs">
      <img src="/images/logo-maberuk.jpg" alt="Logo Maberuk" className="h-full w-full object-cover" />
    </div>
  );
}

function UmkmNavIcon({ id }: { id: UmkmView }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-4 w-4 shrink-0",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2",
  };

  if (id === "dashboard") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }

  if (id === "bookkeeping") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }

  if (id === "reports") {
    return (
      <svg {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function UserBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-xs font-bold leading-tight text-slate-900">Sari Rasa Admin</p>
        <p className="mt-0.5 text-[11px] font-medium leading-tight text-slate-400">Merchant #0314</p>
      </div>
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
          alt="Sari Rasa Admin"
          className="h-full w-full object-cover"
        />
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

function SuperDashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Total UMKM" value="156 Usaha" trend="+12 baru bulan ini" tone="green" />
        <MetricCard label="Total Pengguna" value="2.891 User" trend="+14.2% bulan ini" tone="blue" />
      </div>

      <section className="panel">
        <div className="section-title">
          <div>
            <h2>Pertumbuhan Bulanan UMKM Baru</h2>
            <p className="mt-1 text-sm text-slate-500">
              Statistik pendaftaran UMKM selama 12 bulan terakhir.
            </p>
          </div>
          <span className="legend-dot">UMKM Terdaftar</span>
        </div>
        <BarChart data={superMonthlyUmkm} tone="green" />
      </section>

      <section className="panel p-5">
        <h2 className="mb-4 text-base font-extrabold">Distribusi UMKM Berdasarkan Kategori</h2>
        <DistributionRow label="Makanan & Minuman" value="72 Usaha (46%)" width="78%" tone="green" />
        <DistributionRow label="Fashion & Pakaian" value="38 Usaha (24%)" width="46%" tone="blue" />
        <DistributionRow label="Kerajinan Tangan" value="26 Usaha (17%)" width="33%" tone="purple" />
        <DistributionRow label="Jasa & Lainnya" value="20 Usaha (13%)" width="25%" tone="yellow" />
      </section>
    </div>
  );
}

function DistributionRow({
  label,
  value,
  width,
  tone,
}: {
  label: string;
  value: string;
  width: string;
  tone: "green" | "blue" | "purple" | "yellow";
}) {
  const color = {
    green: "bg-emerald-600",
    blue: "bg-blue-500",
    purple: "bg-violet-500",
    yellow: "bg-amber-500",
  }[tone];

  return (
    <div className="py-2">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-extrabold text-slate-700">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}

function ManageUmkmView() {
  const [accountsList, setAccountsList] = useState(umkmAccounts);
  const [selected, setSelected] = useState(accountsList[0]);
  const [statusFilter, setStatusFilter] = useState<"Aktif" | "Nonaktif">("Aktif");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const activeCount = accountsList.filter((item) => item.status === "Aktif").length;
  const inactiveCount = accountsList.length - activeCount;
  const filteredAccounts = accountsList.filter(
    (account) =>
      account.status === statusFilter &&
      `${account.name} ${account.owner} ${account.phone}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const visibleSelected =
    filteredAccounts.find((account) => account.name === selected.name) ?? filteredAccounts[0] ?? selected;

  function handleAddUmkm(newUmkm: typeof umkmAccounts[0]) {
    setAccountsList([newUmkm, ...accountsList]);
    setSelected(newUmkm);
    setStatusFilter(newUmkm.status === "Nonaktif" ? "Nonaktif" : "Aktif");
  }

  function handleDeleteUmkm(targetName: string) {
    const updated = accountsList.filter((acc) => acc.name !== targetName);
    setAccountsList(updated);
    if (selected.name === targetName) {
      setSelected(updated[0] ?? umkmAccounts[0]);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
      <section className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200 shrink-0">
              <button
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                  statusFilter === "Aktif"
                    ? "bg-[#10b981] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
                onClick={() => setStatusFilter("Aktif")}
                type="button"
              >
                Aktif ({activeCount})
              </button>
              <button
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                  statusFilter === "Nonaktif"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
                onClick={() => setStatusFilter("Nonaktif")}
                type="button"
              >
                Nonaktif ({inactiveCount})
              </button>
            </div>
            <button
              className="primary-button flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#10b981] hover:bg-[#059669] shrink-0"
              onClick={() => setIsAddModalOpen(true)}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Tambah UMKM
            </button>
          </div>
          <input
            className="field lg:w-64"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama usaha..."
            value={search}
          />
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {filteredAccounts.map((account) => (
            <button
              className={`mobile-data-card ${visibleSelected.name === account.name ? "mobile-data-card-active" : ""}`}
              key={account.name}
              onClick={() => setSelected(account)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
                    {account.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">{account.name}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{account.owner}</p>
                  </div>
                </div>
                <span className={`pill ${account.status === "Aktif" ? "pill-green" : "pill-red"}`}>
                  {account.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-left text-xs">
                <span className="text-slate-500">Telepon</span>
                <span className="font-bold text-slate-700">{account.phone}</span>
                <span className="text-slate-500">Daftar</span>
                <span className="font-bold text-slate-700">{account.joined}</span>
              </div>
            </button>
          ))}
          {filteredAccounts.length === 0 && <EmptyState text="UMKM tidak ditemukan." />}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="data-table w-full min-w-0">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nama Usaha</th>
                <th>Pemilik</th>
                <th>No. Telepon</th>
                <th>Status</th>
                <th>Tanggal Daftar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr
                  className={`clickable-row ${visibleSelected.name === account.name ? "row-selected" : ""}`}
                  key={account.name}
                  onClick={() => setSelected(account)}
                >
                  <td>
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
                      {account.name.slice(0, 2).toUpperCase()}
                    </div>
                  </td>
                  <td className="font-bold text-slate-800">{account.name}</td>
                  <td>{account.owner}</td>
                  <td>{account.phone}</td>
                  <td>
                    <span className={`pill ${account.status === "Aktif" ? "pill-green" : "pill-red"}`}>
                      {account.status}
                    </span>
                  </td>
                  <td>{account.joined}</td>
                  <td>
                    <button
                      className="icon-button danger"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteUmkm(account.name);
                      }}
                      title="Hapus UMKM"
                      type="button"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAccounts.length === 0 && <EmptyState text="UMKM tidak ditemukan." />}
        </div>
      </section>

      {visibleSelected && (
        <section className="panel p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-600">Detail UMKM</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{visibleSelected.name}</h2>
            </div>
            <span className={`pill ${visibleSelected.status === "Aktif" ? "pill-green" : "pill-red"}`}>
              {visibleSelected.status}
            </span>
          </div>
          <div className="detail-list">
            <DetailRow label="Pemilik" value={visibleSelected.owner} />
            <DetailRow label="Kategori" value={visibleSelected.category} />
            <DetailRow label="Nomor Telepon" value={visibleSelected.phone} />
            <DetailRow label="Alamat" value={visibleSelected.address} />
            <DetailRow label="Produk Terdaftar" value={`${visibleSelected.products} produk`} />
            <DetailRow label="Pemasukan Bulan Ini" value={visibleSelected.revenue} />
            <DetailRow label="Tanggal Daftar" value={visibleSelected.joined} />
          </div>
          <button
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
            onClick={() => handleDeleteUmkm(visibleSelected.name)}
            type="button"
          >
            <TrashIcon />
            Hapus UMKM
          </button>
        </section>
      )}

      {isAddModalOpen && (
        <AddUmkmModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUmkm}
        />
      )}
    </div>
  );
}

function AddUmkmModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newUmkm: typeof umkmAccounts[0]) => void;
}) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Makanan & Minuman");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Nonaktif">("Aktif");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !owner) return;

    onAdd({
      name,
      owner,
      phone: phone || "0812-0000-0000",
      status,
      joined: "Hari ini",
      category,
      address: address || "Surabaya",
      products: 0,
      revenue: "Rp 0",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Tambah UMKM Terdaftar Baru</h2>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Toko / Usaha *
            </label>
            <input
              className="field font-normal text-slate-800"
              placeholder="Contoh: Kedai Kopi Babatan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Pemilik *
            </label>
            <input
              className="field font-normal text-slate-800"
              placeholder="Contoh: Supriatna"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Telepon / WhatsApp
              </label>
              <input
                className="field font-normal text-slate-800"
                placeholder="0812-3456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori
              </label>
              <select
                className="field font-normal text-slate-800"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Makanan & Minuman</option>
                <option>Fashion & Pakaian</option>
                <option>Kerajinan Tangan</option>
                <option>Jasa & Lainnya</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Alamat Usaha
            </label>
            <textarea
              className="field min-h-20 py-2 font-normal text-slate-800"
              placeholder="Jl. Babatan Indah No..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Status Usaha
            </label>
            <div className="flex gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "Aktif"}
                  onChange={() => setStatus("Aktif")}
                  className="accent-emerald-600"
                />
                Aktif
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "Nonaktif"}
                  onChange={() => setStatus("Nonaktif")}
                  className="accent-slate-600"
                />
                Nonaktif
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button className="secondary-button" onClick={onClose} type="button">
              Batal
            </button>
            <button className="primary-button bg-[#10b981] hover:bg-[#059669]" type="submit">
              Simpan UMKM Baru
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const sampleUsers = [
  {
    id: 1,
    name: "Herman Adi",
    email: "herman.adi@gmail.com",
    role: "Admin",
    status: "Aktif",
    registered: "01 Nov 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Hartono",
    email: "hartono.sari@gmail.com",
    role: "UMKM Owner",
    status: "Aktif",
    registered: "12 Des 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Arumi",
    email: "arumi.sekar@yahoo.com",
    role: "UMKM Owner",
    status: "Aktif",
    registered: "15 Des 2025",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "Lina Marlina",
    email: "linamar@outlook.com",
    role: "Customer",
    status: "Aktif",
    registered: "20 Des 2025",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "Doni Prasetya",
    email: "doni.pras@gmail.com",
    role: "Customer",
    status: "Nonaktif",
    registered: "25 Des 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 6,
    name: "Bambang",
    email: "bambang.geometris@gmail.com",
    role: "UMKM Owner",
    status: "Aktif",
    registered: "10 Jan 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 7,
    name: "Dewi Lestari",
    email: "dewi.les@gmail.com",
    role: "Customer",
    status: "Aktif",
    registered: "12 Jan 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 8,
    name: "Subagio",
    email: "subagio.warkop@gmail.com",
    role: "UMKM Owner",
    status: "Aktif",
    registered: "14 Jan 2026",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
  },
];

function ManageUsersView() {
  const [usersList, setUsersList] = useState(sampleUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "Semua" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  function toggleStatus(id: number) {
    setUsersList(
      usersList.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Aktif" ? "Nonaktif" : "Aktif" }
          : user,
      ),
    );
  }

  function deleteUser(id: number) {
    setUsersList(usersList.filter((user) => user.id !== id));
  }

  function handleAddUser(newUser: (typeof sampleUsers)[0]) {
    setUsersList([newUser, ...usersList]);
  }

  return (
    <div className="space-y-5">
      <section className="panel p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                className="field pl-9 sm:w-64 font-normal text-slate-800"
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="field w-40 font-normal text-slate-800"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="Semua">Role: Semua</option>
              <option value="Admin">Admin</option>
              <option value="UMKM Owner">UMKM Owner</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          <button
            className="primary-button flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#10b981] hover:bg-[#059669] shrink-0"
            onClick={() => setIsAddModalOpen(true)}
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Admin Baru
          </button>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full min-w-[850px]">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Peran (Role)</th>
                <th>Status</th>
                <th>Terdaftar</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="font-bold text-slate-900">{user.name}</td>
                  <td className="text-slate-600 font-normal">{user.email}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "UMKM Owner"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="text-slate-600 font-normal">{user.registered}</td>
                  <td>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="h-7 w-7 rounded-md grid place-items-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="Reset Kata Sandi"
                        type="button"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                      </button>
                      <button
                        className={`h-7 w-7 rounded-md grid place-items-center transition-colors ${
                          user.status === "Aktif"
                            ? "text-amber-600 hover:bg-amber-100 bg-amber-50"
                            : "text-emerald-600 hover:bg-emerald-100 bg-emerald-50"
                        }`}
                        onClick={() => toggleStatus(user.id)}
                        title={user.status === "Aktif" ? "Nonaktifkan akun" : "Aktifkan akun"}
                        type="button"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </button>
                      <button
                        className="h-7 w-7 rounded-md grid place-items-center text-red-500 hover:bg-red-100 bg-red-50 transition-colors"
                        onClick={() => deleteUser(user.id)}
                        title="Hapus Pengguna"
                        type="button"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <EmptyState text="Pengguna tidak ditemukan." />}
        </div>
        <div className="flex flex-col gap-3 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500 font-normal">
            Menampilkan 1-{filteredUsers.length} dari 2.891 total pengguna
          </span>
          <div className="flex gap-1.5">
            <button className="page-button" type="button">Sebelumnya</button>
            <button className="page-button active" type="button">1</button>
            <button className="page-button" type="button">2</button>
            <button className="page-button" type="button">3</button>
            <button className="page-button" type="button">Berikutnya</button>
          </div>
        </div>
      </section>

      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
}

function AddUserModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newUser: (typeof sampleUsers)[0]) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Aktif");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;

    onAdd({
      id: Date.now(),
      name,
      email,
      role,
      status,
      registered: "Hari ini",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Tambah Admin / Pengguna Baru</h2>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap *
            </label>
            <input
              className="field font-normal text-slate-800"
              placeholder="Contoh: Supriyadi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email *
            </label>
            <input
              className="field font-normal text-slate-800"
              type="email"
              placeholder="contoh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Peran (Role)
              </label>
              <select
                className="field font-normal text-slate-800"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="UMKM Owner">UMKM Owner</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                className="field font-normal text-slate-800"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button className="secondary-button" onClick={onClose} type="button">
              Batal
            </button>
            <button className="primary-button bg-[#10b981] hover:bg-[#059669]" type="submit">
              Simpan Pengguna
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 py-3">
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
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

function TrashIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M9 4.75h6M5.75 7.25h12.5M9.25 7.25v10.5M14.75 7.25v10.5M7.75 7.25l.65 12h7.2l.65-12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function ManageWebsiteView() {
  const [items, setItems] = useState(initialRecommendations);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>("/images/product-jajanan.png");

  function handleDrop(event: DragEvent<HTMLDivElement>, targetIndex: number) {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const nextItems = [...items];
    const [moved] = nextItems.splice(draggedIndex, 1);
    nextItems.splice(targetIndex, 0, moved);
    setItems(nextItems);
    setDraggedIndex(null);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
      <section className="panel p-5">
        <h2 className="text-base font-bold text-slate-900">Edit Hero Section</h2>
        <div className="mt-5 grid gap-4">
          <label className="cms-label text-slate-700 font-medium">
            Judul Utama
            <input className="field font-normal text-slate-800" defaultValue="Temukan Produk UMKM Babatan" />
          </label>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Gambar Hero Website
            </label>
            <div className="relative rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 p-5 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
              {heroImage ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <div className="relative h-44 w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <img src={heroImage} alt="Hero Preview" className="h-full w-full object-cover" />
                    <button
                      className="absolute top-2.5 right-2.5 px-3 py-1 rounded-md bg-slate-900/80 hover:bg-red-600 text-white text-xs font-semibold backdrop-blur-sm transition-colors shadow-sm"
                      onClick={() => setHeroImage(null)}
                      type="button"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 font-normal">Klik untuk mengganti atau unggah gambar hero baru</p>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-1">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-slate-700">Klik atau geser gambar ke sini untuk mengunggah</p>
                  <p className="text-[11px] text-slate-400">Format PNG, JPG, atau WEBP (Maksimal 5MB)</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="primary-button mt-5" type="button">Simpan Hero Section</button>
      </section>

      <section className="panel p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Urutkan Rekomendasi UMKM</h2>
            <p className="mt-1 text-sm text-slate-500 font-normal">Geser item untuk menentukan urutan tampil di website.</p>
          </div>
          <button className="secondary-button" type="button">Simpan Urutan</button>
        </div>
        <div className="grid gap-3">
          {items.map((item, index) => (
            <div
              className={`drag-card ${draggedIndex === index ? "drag-card-active" : ""}`}
              draggable
              key={item}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={() => setDraggedIndex(index)}
              onDrop={(event) => handleDrop(event, index)}
            >
              <span className="drag-handle">::</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-600">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item}</p>
                <p className="text-xs text-slate-500 font-normal">Rekomendasi direktori halaman depan</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
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
        <MetricCard label="Pemasukan" value="Rp 8.750.000" trend="+8.1% bulan ini" tone="green" />
        <MetricCard label="Pengeluaran" value="Rp 3.200.000" trend="-2.4% hemat biaya" tone="red" />
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

function ProfileView() {
  const [waNumber, setWaNumber] = useState("081234567890");
  const [igAccount, setIgAccount] = useState("@sarirasa_babatan");
  const [fbPage, setFbPage] = useState("Toko Sari Rasa Babatan");
  const [tiktokAccount, setTiktokAccount] = useState("@sarirasa.kitchen");
  const [shopAddress, setShopAddress] = useState(
    "Jl. Babatan Indah No. 42, RT 03/RW 05, Kecamatan Wiyung, Surabaya",
  );
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<string | null>(null);

  function handleShareLocation() {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setGpsCoords(`${lat}, ${lng}`);
          setShopAddress(
            `Jl. Babatan Indah No. 42, RT 03/RW 05, Babatan, Kecamatan Wiyung, Surabaya (GPS: ${lat}, ${lng})`,
          );
          setIsLocating(false);
        },
        () => {
          // Fallback location for Babatan, Wiyung
          const lat = "-7.311245";
          const lng = "112.685412";
          setGpsCoords(`${lat}, ${lng}`);
          setShopAddress(
            `Jl. Babatan Indah No. 42, RT 03/RW 05, Babatan, Kecamatan Wiyung, Surabaya (GPS: ${lat}, ${lng})`,
          );
          setIsLocating(false);
        },
        { timeout: 4000 },
      );
    } else {
      const lat = "-7.311245";
      const lng = "112.685412";
      setGpsCoords(`${lat}, ${lng}`);
      setShopAddress(
        `Jl. Babatan Indah No. 42, RT 03/RW 05, Babatan, Kecamatan Wiyung, Surabaya (GPS: ${lat}, ${lng})`,
      );
      setIsLocating(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-slate-100 border border-slate-200 shadow-inner">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-200/70 text-slate-500">
            <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-white border-2 border-white shadow-sm">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Logo Utama Toko</h2>
          <p className="mt-1 text-sm text-slate-500 font-normal">
            Unggah logo berkualitas tinggi untuk mempermudah branding usaha Anda
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Alamat Toko
                </label>
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-all border border-emerald-200/80 cursor-pointer shadow-xs active:scale-95"
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
              <textarea
                className="field min-h-24 py-2.5 resize-y font-normal text-slate-800"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
              {gpsCoords && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Lokasi GPS terdeteksi presisi ({gpsCoords}). Siap tampil di peta direktori!</span>
                </div>
              )}

              {shopAddress.trim() && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-14.258l-6-2.25a2.25 2.25 0 00-1.506 0l-6 2.25A2.25 2.25 0 003 6.75v10.5a2.25 2.25 0 001.247 2.016l6 2.25a2.25 2.25 0 001.506 0l6-2.25A2.25 2.25 0 0021 17.25V6.75a2.25 2.25 0 00-1.247-2.016z" />
                      </svg>
                      Preview Peta Lokasi Toko
                    </div>
                    <a
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buka Google Maps ↗
                    </a>
                  </div>

                  <div className="relative h-44 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-200 shadow-inner">
                    <iframe
                      title="Preview Peta Lokasi Toko"
                      width="100%"
                      height="100%"
                      className="w-full h-full border-0"
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(shopAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-normal italic">
                    Peta ini akan otomatis ditampilkan pada profil usaha Anda untuk mempermudah calon pembeli menemukan lokasi fisik toko.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tentang Toko / Deskripsi Singkat
              </label>
              <textarea
                className="field min-h-32 py-2.5 resize-y"
                defaultValue="Menyediakan aneka jajanan pasar tradisional, katering nasi kotak harian, dan aneka sambal botolan legendaris dengan resep turun-temurun asli Babatan."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Foto Produk & Hasil Jualan Usaha
              </label>
              <p className="text-xs text-slate-400 font-normal mb-3">
                Unggah foto produk jualan UMKM Anda dengan rasio 1:1 agar konsisten dan terlihat rapi di katalog.
              </p>
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
            </div>
          </div>
        </section>

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
    <div className="overflow-x-auto">
      <table className="data-table min-w-[900px]">
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
      {filteredTransactions.length === 0 && <EmptyState text="Transaksi tidak ditemukan." />}
      <div className="flex flex-col gap-3 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
