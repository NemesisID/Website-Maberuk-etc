"use client";

import { useMemo, useState } from "react";
import { umkmNavItems } from "@/data/mock-data";
import {
  EditIcon,
  LogoMark,
  LogoutIcon,
  TrashIcon,
  UmkmNavIcon,
} from "@/components/icons/Icons";
import type { UmkmView } from "@/types";
import { updateUmkmProfile, upsertTransaction, deleteTransaction, getUploadUrl, uploadFileToR2, deleteFileFromR2 } from "@/app/admin/actions";

export function UmkmAdminApp({ 
  user, 
  umkmData,
  initialTransactions,
  categories = []
}: { 
  user: any; 
  umkmData: any;
  initialTransactions: any[];
  categories?: string[];
}) {
  const shopName: string = umkmData?.name || user?.user_metadata?.name || "Toko Anda";
  const ownerName: string = umkmData?.owner || user?.user_metadata?.name || "Pemilik Toko";
  const [activeView, setActiveView] = useState<UmkmView>("dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
  const [shopLogo, setShopLogo] = useState<string | null>(umkmData?.logo_url || "/images/logo-maberuk.jpg");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactionsList, setTransactionsList] = useState<any[]>(initialTransactions || []);
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);

  const activeLabel = useMemo(
    () => umkmNavItems.find((item) => item.id === activeView)?.label ?? "Dashboard",
    [activeView],
  );

  const buildMonthlyData = (type: 'Pemasukan' | 'Pengeluaran') => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const validTx = transactionsList.filter(t => t.date && !isNaN(new Date(t.date).getTime()));
    
    if (validTx.length === 0) {
      const curMonth = monthNames[new Date().getMonth()];
      return [{ month: curMonth, value: 0 }];
    }

    const dates = validTx.map(t => new Date(t.date).getTime()).sort((a, b) => a - b);
    const startDate = new Date(dates[0]);
    const now = new Date();

    let curr = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthKeys: { key: string; label: string }[] = [];
    const map: Record<string, number> = {};
    const isMultiYear = startDate.getFullYear() !== now.getFullYear();

    while (curr <= end) {
      const y = curr.getFullYear();
      const m = curr.getMonth();
      const key = `${y}-${m}`;
      const label = isMultiYear ? `${monthNames[m]} '${String(y).slice(2)}` : monthNames[m];
      monthKeys.push({ key, label });
      map[key] = 0;
      curr.setMonth(curr.getMonth() + 1);
    }

    transactionsList.forEach(t => {
      if (t.type === type && t.date) {
        const d = new Date(t.date);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          if (map[key] !== undefined) {
            map[key] += Number(t.amount) || 0;
          }
        }
      }
    });

    return monthKeys.map(item => ({
      month: item.label,
      value: map[item.key]
    }));
  };

  const monthlyIncome = useMemo(() => buildMonthlyData('Pemasukan'), [transactionsList]);
  const monthlyExpense = useMemo(() => buildMonthlyData('Pengeluaran'), [transactionsList]);

  const summaryRows = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const rows: any[] = [];
    for (let i = 0; i < 12; i++) {
      const income = transactionsList
        .filter(t => t.type === 'Pemasukan' && new Date(t.date).getMonth() === i)
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const expense = transactionsList
        .filter(t => t.type === 'Pengeluaran' && new Date(t.date).getMonth() === i)
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      if (income > 0 || expense > 0) {
        rows.push([
          months[i],
          `Rp ${income.toLocaleString('id-ID')}`,
          `Rp ${expense.toLocaleString('id-ID')}`,
          `Rp ${(income - expense).toLocaleString('id-ID')}`
        ]);
      }
    }
    return rows;
  }, [transactionsList]);

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-950">
      {/* Desktop Sidebar (Left) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[210px] border-r border-slate-200/80 bg-white md:flex md:flex-col">
        <BrandBlock shopLogo={shopLogo} shopName={ownerName} />
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
        <div className="px-4 pb-6 mt-auto">
          <form action="/api/auth/logout" method="POST">
            <button
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100"
              type="submit"
            >
              <LogoutIcon />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <LogoMark src={shopLogo} />
          <h1 className="text-base font-bold text-slate-900 tracking-wide truncate max-w-[180px] sm:max-w-none">{ownerName}</h1>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 transition-colors border border-rose-200 shrink-0"
            type="submit"
            title="Keluar dari Akun"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </form>
      </header>

      {/* Main Container */}
      <div className="md:pl-[210px] pb-32 md:pb-10">
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
                  ? `Selamat datang kembali, ${ownerName}.`
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
              <p className="text-sm text-slate-500 mt-0.5">
                {activeView === "dashboard"
                  ? `Selamat datang kembali, ${ownerName}.`
                  : activeView === "bookkeeping"
                    ? "Catat & pantau arus kas toko."
                    : activeView === "reports"
                      ? "Analisis performa & grafik bisnis."
                      : "Kelola identitas publik toko Anda."}
              </p>
            </div>
            {activeView === "bookkeeping" && (
              <button
                className="primary-button text-sm py-2 px-3"
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
              <DashboardView 
                setActiveView={setActiveView} 
                setModalOpen={setModalOpen} 
                transactionsList={transactionsList}
                monthlyIncome={monthlyIncome}
              />
            )}
            {activeView === "bookkeeping" && (
              <BookkeepingView 
                transactionsList={transactionsList} 
                setTransactionsList={setTransactionsList}
                setEditingTransaction={setEditingTransaction}
                setModalOpen={setModalOpen}
              />
            )}
            {activeView === "reports" && (
              <ReportsView 
                transactionsList={transactionsList}
                monthlyIncome={monthlyIncome}
                monthlyExpense={monthlyExpense}
                summaryRows={summaryRows}
              />
            )}
            {activeView === "profile" && <ProfileView user={user} umkmData={umkmData} shopLogo={shopLogo} setShopLogo={setShopLogo} categories={categories} />}
          </div>

          {/* UMKM Dashboard Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200/80 text-center text-xs font-semibold text-slate-400">
            <p>© 2026 MABERUK — Platform Digital UMKM Babatan. All rights reserved.</p>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around bg-white border-t border-slate-200 pb-safe pt-2 shadow-lg md:hidden">
        {umkmNavItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`}
            >
              <UmkmNavIcon id={item.id} />
              <span className={`text-[12px] font-bold mt-1.5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <span className="sr-only">Halaman aktif: {activeView}</span>

      {isModalOpen && (
        <TransactionModal 
          umkmData={umkmData}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
          transactionsList={transactionsList}
          setTransactionsList={setTransactionsList}
          onClose={() => {
            setModalOpen(false);
            setEditingTransaction(null);
          }} 
        />
      )}
      <span className="sr-only">Halaman aktif: {activeLabel}</span>
    </div>
  );
}

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Hapus",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  isDanger = true
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-xs flex items-center justify-center min-h-full">
      <div className="relative my-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl space-y-4 text-center">
        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${isDanger ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {isDanger ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{message}</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            className="secondary-button flex-1"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-colors shadow-sm ${isDanger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function BrandBlock({ shopLogo, shopName }: { shopLogo?: string | null, shopName?: string }) {
  return (
    <div className="brand-block" title="Dashboard UMKM">
      <LogoMark src={shopLogo} />
      <div>
        <p className="text-left text-sm font-bold leading-tight text-slate-900 tracking-wide">{shopName}</p>
        <p className="text-left text-sm font-medium leading-tight text-slate-400 mt-0.5">Dashboard UMKM</p>
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
        <p className="text-sm font-bold uppercase text-slate-500">{label}</p>
      </div>
      <p className={`mt-5 text-2xl font-extrabold ${toneClass}`}>{value}</p>
      <p className={`mt-2 text-sm font-semibold ${toneClass}`}>{trend}</p>
    </section>
  );
}

function DashboardView({
  setActiveView,
  setModalOpen,
  transactionsList,
  monthlyIncome,
}: {
  setActiveView: (view: UmkmView) => void;
  setModalOpen: (open: boolean) => void;
  transactionsList: any[];
  monthlyIncome: any[];
}) {
  const totalIncome = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pemasukan')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  const totalExpense = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pengeluaran')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard 
          label="Pemasukan" 
          value={`Rp ${totalIncome.toLocaleString('id-ID')}`} 
          trend={transactionsList.length > 0 ? "Total pemasukan riil" : "Belum ada transaksi"} 
          tone="green" 
        />
        <MetricCard 
          label="Pengeluaran" 
          value={`Rp ${totalExpense.toLocaleString('id-ID')}`} 
          trend={transactionsList.length > 0 ? "Total pengeluaran riil" : "Belum ada transaksi"} 
          tone="red" 
        />
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
          <span className="legend-dot">Omset (Rp)</span>
        </div>
        <BarChart data={monthlyIncome.slice(0, 6)} tone="green" />
      </section>

      <section className="panel overflow-hidden">
        <div className="section-title px-5 pt-5">
          <h2>Transaksi Terakhir</h2>
        </div>
        <TransactionList compact transactionsList={transactionsList} />
      </section>
    </div>
  );
}

function BookkeepingView({
  transactionsList,
  setTransactionsList,
  setEditingTransaction,
  setModalOpen,
}: {
  transactionsList: any[];
  setTransactionsList: React.Dispatch<React.SetStateAction<any[]>>;
  setEditingTransaction: React.Dispatch<React.SetStateAction<any | null>>;
  setModalOpen: (open: boolean) => void;
}) {
  const [typeFilter, setTypeFilter] = useState<"Semua" | "Pemasukan" | "Pengeluaran">("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  const filteredTransactions = useMemo(() => {
    return transactionsList.filter(
      (transaction) =>
        (typeFilter === "Semua" || transaction.type === typeFilter) &&
        (categoryFilter === "Semua" || transaction.category === categoryFilter),
    );
  }, [transactionsList, typeFilter, categoryFilter]);

  const totalIncome = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pemasukan')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  const totalExpense = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pengeluaran')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  const [deleteTransId, setDeleteTransId] = useState<string | null>(null);

  function handleDeleteTransaction(id: string) {
    setDeleteTransId(id);
  }

  async function confirmDeleteTransaction() {
    if (!deleteTransId) return;
    const id = deleteTransId;
    setDeleteTransId(null);
    const res = await deleteTransaction(id);
    if (res.success) {
      setTransactionsList(prev => prev.filter(t => t.id !== id));
    } else {
      console.error("Gagal menghapus transaksi: " + res.error);
    }
  }

  function handleEditTransaction(transaction: any) {
    setEditingTransaction(transaction);
    setModalOpen(true);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Pemasukan" value={`Rp ${totalIncome.toLocaleString('id-ID')}`} trend="Total kas masuk" tone="green" />
        <MetricCard label="Pengeluaran" value={`Rp ${totalExpense.toLocaleString('id-ID')}`} trend="Total kas keluar" tone="red" />
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
            <option>Makanan</option>
            <option>Katering</option>
            <option>Penjualan</option>
            <option>Bahan Baku</option>
            <option>Operasional</option>
            <option>Kemasan</option>
          </select>
        </div>
      </section>
      <section className="panel overflow-hidden">
        <TransactionTable 
          filteredTransactions={filteredTransactions} 
          totalTransactions={transactionsList.length}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />
      </section>

      <ConfirmModal
        isOpen={!!deleteTransId}
        title="Hapus Transaksi"
        message="Apakah Anda yakin ingin menghapus catatan transaksi ini?"
        onConfirm={confirmDeleteTransaction}
        onCancel={() => setDeleteTransId(null)}
      />
    </div>
  );
}

function ReportsView({
  transactionsList,
  monthlyIncome,
  monthlyExpense,
  summaryRows,
}: {
  transactionsList: any[];
  monthlyIncome: any[];
  monthlyExpense: any[];
  summaryRows: any[][];
}) {
  const [reportPeriod, setReportPeriod] = useState("6 Bulan");
  const reportPeriods = ["7 Hari", "30 Hari", "6 Bulan", "1 Tahun"];

  const overallIncome = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pemasukan')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  const overallExpense = useMemo(() => {
    return transactionsList
      .filter(t => t.type === 'Pengeluaran')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactionsList]);

  const handleDownloadExcel = () => {
    const headers = ["Bulan", "Total Pemasukan", "Total Pengeluaran", "Keuntungan Bersih"];
    const rows = summaryRows.map(row => row.map(cell => `"${cell}"`).join(";"));
    const totalRow = [
      "Total Keseluruhan",
      `"Rp ${overallIncome.toLocaleString('id-ID')}"`,
      `"Rp ${overallExpense.toLocaleString('id-ID')}"`,
      `"Rp ${(overallIncome - overallExpense).toLocaleString('id-ID')}"`
    ].join(";");
    
    const csvContent = [headers.join(";"), ...rows, totalRow].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Laporan_Keuangan_${reportPeriod.replace(' ', '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
            <span className="legend-dot">Omset (Rp)</span>
          </div>
          <BarChart data={monthlyIncome} tone="green" />
        </section>
        <section className="panel">
          <div className="section-title">
            <h2>Total Pengeluaran Bulanan</h2>
            <span className="legend-dot red">Biaya (Rp)</span>
          </div>
          <BarChart data={monthlyExpense} tone="red" />
        </section>
      </div>
      <section className="panel overflow-hidden">
        <div className="section-title px-5 pt-5">
          <h2>Ikhtisar Pembukuan {reportPeriod} Terakhir</h2>
          <div className="flex gap-2">
            <button className="secondary-button" type="button" onClick={handleDownloadExcel}>Unduh Excel</button>
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
            {summaryRows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, index) => (
                  <td key={`${index}-${cell}`} className={index === 3 ? "text-emerald-600 font-bold" : ""}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-emerald-50 font-extrabold">
              <td>Total Keseluruhan</td>
              <td className="text-emerald-600">Rp {overallIncome.toLocaleString('id-ID')}</td>
              <td>Rp {overallExpense.toLocaleString('id-ID')}</td>
              <td className="text-emerald-600">Rp {(overallIncome - overallExpense).toLocaleString('id-ID')}</td>
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
  user,
  umkmData,
  shopLogo,
  setShopLogo,
  categories = []
}: {
  user: any;
  umkmData: any;
  shopLogo: string | null;
  setShopLogo: (logo: string | null) => void;
  categories?: string[];
}) {
  const [name, setName] = useState(umkmData?.name || "");
  const [owner, setOwner] = useState(umkmData?.owner || "");
  const [waNumber, setWaNumber] = useState(umkmData?.phone || "");
  const [description, setDescription] = useState(umkmData?.description || "");
  const [category, setCategory] = useState(umkmData?.category || "Lainnya");
  const [subCategory, setSubCategory] = useState(umkmData?.sub_category || "");
  const [shopAddress, setShopAddress] = useState(umkmData?.address || "");
  const [mapQuery, setMapQuery] = useState(umkmData?.gps_coords || umkmData?.address || "");
  
  const [igAccount, setIgAccount] = useState(umkmData?.social?.instagram || "");
  const [fbPage, setFbPage] = useState(umkmData?.social?.facebook || "");
  const [tiktokAccount, setTiktokAccount] = useState(umkmData?.social?.tiktok || "");

  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<string | null>(umkmData?.gps_coords || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const [galleryList, setGalleryList] = useState<any[]>(
    Array.isArray(umkmData?.gallery) ? umkmData.gallery : []
  );

  const mapResult = parseMapInput(mapQuery, shopAddress);

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && (umkmData?.id || user?.id)) {
      const targetId = umkmData?.id || user?.id;
      setIsUploading(true);
      
      try {
        const oldLogo = shopLogo;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', `logos/${targetId}`);
        formData.append('umkmId', targetId);

        const res = await uploadFileToR2(formData);
        
        if (res.success && res.publicUrl) {
          setShopLogo(res.publicUrl);
          await updateUmkmProfile(targetId, { logo_url: res.publicUrl, hero_image: res.publicUrl });
          if (oldLogo && oldLogo !== res.publicUrl) {
            deleteFileFromR2(oldLogo).catch(console.error);
          }
        } else if (res.error) {
          console.error("Gagal mengupload logo ke R2: " + res.error);
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat mengupload logo:", err);
      } finally {
        setIsUploading(false);
      }
    }
  }

  async function handleRemoveLogo() {
    if (!shopLogo) return;
    const oldLogo = shopLogo;
    setShopLogo(null);
    const targetId = umkmData?.id || user?.id;
    if (targetId) {
      await updateUmkmProfile(targetId, { logo_url: null, hero_image: null });
      await deleteFileFromR2(oldLogo).catch(console.error);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && (umkmData?.id || user?.id)) {
      const targetId = umkmData?.id || user?.id;
      setIsUploadingGallery(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', `gallery/${targetId}`);
        formData.append('umkmId', targetId);

        const res = await uploadFileToR2(formData);
        
        if (res.success && res.publicUrl) {
          const newPhoto = { src: res.publicUrl, caption: file.name.split('.')[0] || 'Foto Produk' };
          const updated = [...galleryList, newPhoto];
          setGalleryList(updated);
          await updateUmkmProfile(targetId, { gallery: updated });
        } else if (res.error) {
          console.error("Gagal mengupload foto ke R2: " + res.error);
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat mengupload foto:", err);
      } finally {
        setIsUploadingGallery(false);
      }
    }
  }

  async function handleRemovePhoto(index: number) {
    const photo = galleryList[index];
    const updated = galleryList.filter((_, i) => i !== index);
    setGalleryList(updated);
    const targetId = umkmData?.id || user?.id;
    if (targetId) {
      await updateUmkmProfile(targetId, { gallery: updated });
    }
    if (photo?.src) {
      deleteFileFromR2(photo.src).catch(console.error);
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

  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSave() {
    setSaveStatus(null);
    if (!name.trim()) {
      setSaveStatus({ type: 'error', text: "Nama toko wajib diisi!" });
      return;
    }
    const targetId = umkmData?.id || user?.id;
    if (!targetId) {
      setSaveStatus({ type: 'error', text: "Gagal menyimpan: ID akun tidak terdeteksi!" });
      return;
    }
    setIsSaving(true);
    const res = await updateUmkmProfile(targetId, {
      name,
      owner,
      category,
      sub_category: subCategory,
      phone: waNumber,
      phone_digits: waNumber.replace(/\D/g, ''),
      description,
      address: shopAddress,
      social: {
        instagram: igAccount,
        facebook: fbPage,
        tiktok: tiktokAccount
      },
      gps_coords: gpsCoords || mapQuery,
      gallery: galleryList,
      hero_image: shopLogo
    });
    setIsSaving(false);
    if (res.success) {
      setSaveStatus({ type: 'success', text: "Profil berhasil disimpan!" });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: 'error', text: "Gagal menyimpan profil: " + (res.error || "") });
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <label className="relative group grid h-20 w-20 shrink-0 place-items-center rounded-full bg-slate-100 border-2 border-dashed border-slate-300 hover:border-emerald-500 shadow-inner cursor-pointer overflow-hidden transition-all">
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={handleLogoChange}
              disabled={isUploading}
            />
            {shopLogo ? (
              <>
                <img src={shopLogo} alt="Logo Toko" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-sm font-bold text-center p-1">
                  {isUploading ? "Mengunggah..." : "Ganti Logo"}
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
              {isUploading ? "Sedang mengunggah logo..." : "Klik gambar logo di sebelah kiri untuk mengunggah atau mengganti logo toko."}
            </p>
            {shopLogo && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                disabled={isUploading}
                className="mt-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Logo
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="mb-5 text-base font-bold text-slate-900">Identitas Utama Usaha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Nama Toko / Usaha
                </label>
                <input 
                  className="field font-normal text-slate-800" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Nama Pemilik
                </label>
                <input 
                  className="field font-normal text-slate-800" 
                  value={owner} 
                  onChange={(e) => setOwner(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Kategori Usaha
                </label>
                <select 
                  className="field font-normal text-slate-800" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Detail Kategori / Sub-kategori <span className="text-slate-400 font-normal">(Contoh: Craft, Souvenir, Kue Basah)</span>
                </label>
                <input 
                  className="field font-normal text-slate-800" 
                  placeholder="Contoh: Craft Kayu, Sablon Kaos, Aksesoris"
                  value={subCategory} 
                  onChange={(e) => setSubCategory(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                <p className="mt-1.5 text-sm text-slate-400 font-normal italic">
                  Nomor ini digunakan pembeli untuk memesan produk via direct WhatsApp
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Tentang Toko / Deskripsi Singkat
                </label>
                <textarea
                  className="field min-h-24 py-2.5 resize-y text-slate-800 font-normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Alamat & Peta Lokasi Toko</h2>
                <p className="text-sm text-slate-500 font-normal">Ketik nama tempat/alamat untuk menampilkan peta lokasi fisik toko.</p>
              </div>
              <button
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all border border-emerald-200/80 cursor-pointer shadow-xs active:scale-95 shrink-0"
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
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Input Nama Tempat / Alamat
                </label>
                <input
                  className="field font-normal text-slate-800"
                  placeholder="Ketik nama tempat (contoh: Gardu Perbatasan Surabaya - Gresik)..."
                  value={mapQuery}
                  onChange={(e) => setMapQuery(e.target.value)}
                />
                <p className="mt-1 text-sm text-slate-400 font-normal">
                  Tips: Anda bisa mengetik nama tempat (contoh: <strong>Gardu Perbatasan Surabaya - Gresik</strong>) atau menempelkan alamat/kode Sematkan Peta.
                </p>
              </div>

              {mapResult.type === "short_url" && !mapResult.embedUrl && (
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800 font-medium">
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
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 640 640" 
                      className="h-4 w-4 text-emerald-600" 
                      fill="currentColor"
                    >
                      <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
                    </svg>
                    Peta Lokasi Toko
                  </div>
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
                    <p className="text-sm font-bold text-slate-500">Belum Ada Lokasi Toko</p>
                    <p className="text-sm text-slate-400 mt-0.5">Ketik nama tempat/alamat pada kolom di atas atau klik &quot;Share Lokasi Sekarang&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">Foto Produk & Hasil Jualan Usaha</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryList.map((photo, index) => (
                <div className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm" key={index}>
                  <img
                    src={photo.src || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"}
                    alt={photo.caption || "Foto Produk"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Hapus foto"
                    onClick={() => handleRemovePhoto(index)}
                    type="button"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <label
                className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer text-slate-400 hover:text-emerald-600 group"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleGalleryUpload}
                  disabled={isUploadingGallery}
                />
                <div className="h-8 w-8 rounded-full bg-slate-200/70 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4 text-slate-500 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-600">
                  {isUploadingGallery ? "Mengunggah..." : "Tambah Foto"}
                </span>
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="mb-5 text-base font-bold text-slate-900">Sosial Media & Kontak</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
        <div>
          <p className="text-sm text-slate-400 font-medium">
            Pastikan data yang Anda isi sudah benar untuk menjaga kredibilitas UMKM
          </p>
          {saveStatus && (
            <p className={`mt-1.5 text-sm font-bold ${saveStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {saveStatus.text}
            </p>
          )}
        </div>
        <button 
          className="primary-button shrink-0 px-6 bg-[#10b981] hover:bg-[#059669] disabled:opacity-50" 
          type="button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Menyimpan..." : "Simpan Perubahan Profil"}
        </button>
      </div>
    </div>
  );
}

function BarChart({ data, tone }: { data: Array<{ month: string; value: number }>; tone: "green" | "red" }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="overflow-x-auto pb-1">
      <div className="chart" style={{ minWidth: `${Math.max(data.length * 54, 280)}px` }} aria-label="Grafik batang">
        {data.map((item, idx) => (
          <div className="chart-item" key={`${item.month}-${idx}`}>
            <div className="chart-track">
              <div
                className={`chart-bar ${tone === "green" ? "bg-emerald-600" : "bg-red-500"}`}
                style={{ height: item.value > 0 ? `${Math.max(6, (item.value / max) * 112)}px` : "0px" }}
              />
            </div>
            <span>{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionList({ 
  compact = false,
  transactionsList 
}: { 
  compact?: boolean;
  transactionsList: any[];
}) {
  return (
    <div className="divide-y divide-slate-100">
      {transactionsList.slice(0, compact ? 5 : transactionsList.length).map((transaction) => (
        <div className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[110px_90px_1fr_120px]" key={transaction.id}>
          <span className="text-slate-500">{transaction.date}</span>
          <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
            {transaction.type === "Pemasukan" ? "Masuk" : "Keluar"}
          </span>
          <span className="truncate font-semibold text-slate-700">{transaction.note}</span>
          <span className={`text-right font-extrabold ${transaction.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>
            Rp {Number(transaction.amount).toLocaleString('id-ID')}
          </span>
        </div>
      ))}
      {transactionsList.length === 0 && <EmptyState text="Belum ada transaksi pencatatan kas." />}
    </div>
  );
}

function TransactionTable({ 
  filteredTransactions,
  totalTransactions,
  onDelete,
  onEdit
}: { 
  filteredTransactions: any[];
  totalTransactions: number;
  onDelete: (id: string) => void;
  onEdit: (transaction: any) => void;
}) {
  return (
    <div>
      {/* Mobile Card List View (< md) */}
      <div className="divide-y divide-slate-100 md:hidden">
        {filteredTransactions.map((transaction) => (
          <div className="p-4 space-y-2.5" key={transaction.id}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">{transaction.date}</span>
              <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
                {transaction.type}
              </span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-800 leading-snug">{transaction.note}</p>
                <span className="inline-block mt-1 text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {transaction.category}
                </span>
              </div>
              <p className={`text-base font-extrabold shrink-0 ${transaction.type === "Pemasukan" ? "text-emerald-600" : "text-red-500"}`}>
                Rp {Number(transaction.amount).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-sm">
              <span className={`pill ${transaction.status === "Selesai" ? "pill-green" : "pill-yellow"}`}>
                {transaction.status}
              </span>
              <div className="flex gap-2">
                <button className="icon-button" title="Edit transaksi" onClick={() => onEdit(transaction)} type="button">
                  <EditIcon />
                </button>
                <button className="icon-button danger" title="Hapus transaksi" onClick={() => onDelete(transaction.id)} type="button">
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
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span className={`pill ${transaction.type === "Pemasukan" ? "pill-green" : "pill-red"}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.category}</td>
                <td className="font-semibold text-slate-700">{transaction.note}</td>
                <td className={transaction.type === "Pemasukan" ? "font-bold text-emerald-600" : "font-bold text-red-500"}>
                  Rp {Number(transaction.amount).toLocaleString('id-ID')}
                </td>
                <td>
                  <span className={`pill ${transaction.status === "Selesai" ? "pill-green" : "pill-yellow"}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-button" title="Edit transaksi" onClick={() => onEdit(transaction)} type="button">
                      <EditIcon />
                    </button>
                    <button className="icon-button danger" title="Hapus transaksi" onClick={() => onDelete(transaction.id)} type="button">
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
          Menampilkan {filteredTransactions.length} dari {totalTransactions} transaksi
        </span>
        <div className="flex gap-2">
          <button className="page-button" type="button">Sebelumnya</button>
          <button className="page-button active" type="button">1</button>
          <button className="page-button animate-pulse" type="button">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
}

function TransactionModal({ 
  onClose,
  umkmData,
  editingTransaction,
  setEditingTransaction,
  transactionsList,
  setTransactionsList
}: { 
  onClose: () => void;
  umkmData: any;
  editingTransaction: any | null;
  setEditingTransaction: React.Dispatch<React.SetStateAction<any | null>>;
  transactionsList: any[];
  setTransactionsList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [transactionType, setTransactionType] = useState<"Pemasukan" | "Pengeluaran">(
    editingTransaction?.type || "Pemasukan"
  );
  const [transactionDate, setTransactionDate] = useState(
    editingTransaction?.date || new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState(
    editingTransaction?.category || (editingTransaction?.type === "Pengeluaran" ? "Bahan Baku" : "Makanan")
  );
  const [amount, setAmount] = useState(
    editingTransaction?.amount ? String(editingTransaction.amount) : ""
  );
  const [note, setNote] = useState(
    editingTransaction?.note || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const isExpense = transactionType === "Pengeluaran";
  const categories = isExpense 
    ? ["Bahan Baku", "Operasional", "Kemasan"] 
    : ["Makanan", "Katering", "Penjualan"];

  function handleTransactionTypeChange(nextType: "Pemasukan" | "Pengeluaran") {
    setTransactionType(nextType);
    setCategory(nextType === "Pengeluaran" ? "Bahan Baku" : "Makanan");
  }

  const [formError, setFormError] = useState<string | null>(null);

  async function handleSave() {
    setFormError(null);
    if (!amount || Number(amount.replace(/\D/g, '')) <= 0) {
      setFormError("Jumlah transaksi wajib diisi dan harus lebih besar dari 0!");
      return;
    }
    if (!note.trim()) {
      setFormError("Keterangan transaksi wajib diisi!");
      return;
    }

    setIsSaving(true);

    const numericAmount = Number(amount.replace(/\D/g, ''));
    const transactionObj = {
      id: editingTransaction?.id || undefined, // Let Supabase auto-generate if new
      umkm_id: umkmData.id,
      type: transactionType,
      date: transactionDate,
      category: category,
      amount: numericAmount,
      note: note,
      status: 'Selesai'
    };

    const res = await upsertTransaction(transactionObj);
    setIsSaving(false);

    if (res.success) {
      if (editingTransaction?.id) {
        setTransactionsList(prev => prev.map(t => t.id === editingTransaction.id ? { ...t, ...transactionObj } : t));
      } else {
        setTransactionsList(prev => [{ ...transactionObj, id: crypto.randomUUID() }, ...prev]);
      }
      onClose();
    } else {
      setFormError("Gagal menyimpan transaksi: " + (res.error || ""));
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-xs flex items-center justify-center min-h-full">
      <section className="relative my-auto flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white p-5 sm:p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <h2 className="text-base font-bold text-slate-900">
            {editingTransaction?.id ? "Edit Detail Transaksi" : "Tambah Transaksi Baru"}
          </h2>
          <button className="icon-button" onClick={onClose} title="Tutup modal" type="button">
            ✕
          </button>
        </div>

        {formError && (
          <div className="mb-4 shrink-0 rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm font-bold text-rose-600">
            {formError}
          </div>
        )}
        <div className="form-grid flex-1 overflow-y-auto space-y-4 pr-1">
          <label className="block text-sm font-semibold text-slate-700">
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
          <label className="block text-sm font-semibold text-slate-700">
            Tanggal Transaksi
            <input 
              className="field font-normal text-slate-800" 
              value={transactionDate} 
              onChange={(e) => setTransactionDate(e.target.value)}
              type="date" 
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Kategori
              <select className="field font-normal text-slate-800" onChange={(event) => setCategory(event.target.value)} value={category}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Jumlah (Rp)
              <input 
                className="field font-normal text-slate-800" 
                type="text"
                inputMode="numeric"
                placeholder={isExpense ? "150000" : "300000"} 
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              />
            </label>
          </div>
          <label className="block text-sm font-semibold text-slate-700">
            Keterangan
            <textarea
              className="field min-h-24 font-normal text-slate-800 resize-y"
              placeholder={isExpense ? "Beli minyak goreng kemasan dan bumbu dapur" : "Penjualan Kripik Tempe Mang Oyo 20 pcs"}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-4 flex justify-end gap-3 border-t border-slate-100 pt-4 shrink-0">
          <button className="secondary-button" onClick={onClose} type="button">Batal</button>
          <button 
            className="primary-button bg-[#10b981] hover:bg-[#059669] disabled:opacity-50" 
            onClick={handleSave} 
            disabled={isSaving}
            type="button"
          >
            {isSaving ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
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
