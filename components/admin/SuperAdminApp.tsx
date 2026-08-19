"use client";

import { type DragEvent, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  defaultHomeData,
  defaultPromptsData,
  initialAboutData,
  initialRecommendationsData,
  sampleUsers,
  superMonthlyUmkm,
  superNavItems,
  umkmAccounts,
} from "@/data/mock-data";
import {
  EditIcon,
  LogoMark,
  LogoutIcon,
  SuperNavIcon,
  TrashIcon,
} from "@/components/icons/Icons";
import type { PromptItem, SuperView, UmkmAccount, UserItem } from "@/types";
import { saveSiteContent, upsertPrompt, deletePrompt, upsertUser, deleteUser as deleteUserAction, upsertCategory, deleteCategory, createNewOwner, resetUserPassword, deleteUmkmStore, toggleUmkmStatus } from "@/app/admin/actions";
import { uploadImageFile } from "@/lib/upload";

export function SuperAdminApp({ 
  user, 
  initialUmkmList, 
  initialPromptsList, 
  initialContentList,
  initialUsersList,
  initialCategoriesList
}: { 
  user: any;
  initialUmkmList: any[];
  initialPromptsList: any[];
  initialContentList: any[];
  initialUsersList: any[];
  initialCategoriesList: any[];
}) {
  const [activeView, setActiveView] = useState<SuperView>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const normalizedUmkmList = useMemo(() => {
    return (initialUmkmList || []).map((item) => ({
      ...item,
      owner: item.owner || item.name || 'Owner',
      phone: item.phone || '—',
      status: item.status || (item.active === false ? "Nonaktif" : "Aktif"),
      joined: item.joined || (item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'),
    }));
  }, [initialUmkmList]);

  const [sharedUmkmList, setSharedUmkmList] = useState<any[]>(normalizedUmkmList);

  const activeLabel = useMemo(
    () => superNavItems.find((item) => item.id === activeView)?.label ?? "Dashboard",
    [activeView],
  );

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
      {/* Desktop Sidebar (Left) */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[180px] bg-[#1f2a3a] text-slate-300 md:flex md:flex-col">
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
        <div className="px-6 pb-5 pt-4 border-t border-white/10">
          <form action="/api/auth/logout" method="POST">
            <button
              className="super-logout-button"
              type="submit"
            >
              <LogoutIcon />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden shadow-sm">
        <div className="flex items-center gap-2">
          <LogoMark />
          <h1 className="text-base font-bold text-slate-900 tracking-wide">MABERUK ADMIN</h1>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 transition-colors border border-rose-200 shrink-0"
            type="submit"
            title="Keluar dari Akun Admin"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </form>
      </header>

      {/* Main Container */}
      <div className="md:pl-[180px] pb-32 md:pb-10">
        {/* Desktop Page Header */}
        <header className="sticky top-0 z-10 hidden border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:block md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div key={activeView} className="view-transition">
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
        </header>

        {/* Mobile Page Title Banner */}
        <div className="border-b border-slate-200 bg-white px-4 py-3.5 md:hidden">
          <h1 className="text-lg font-bold text-slate-950">
            {activeView === "dashboard"
              ? "Dashboard Admin"
              : activeView === "umkm"
                ? "Kelola UMKM"
                : activeView === "website"
                  ? "Kelola Website"
                  : "Kelola Pengguna"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {activeView === "dashboard"
              ? "Pantau pertumbuhan UMKM & pengguna."
              : activeView === "umkm"
                ? "Verifikasi & lihat status operasional UMKM."
                : activeView === "website"
                  ? "Kelola konten website & rekomendasi."
                  : "Atur akun admin, pemilik toko & pelanggan."}
          </p>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8 overflow-x-hidden">
          <div key={activeView} className="view-transition">
            {activeView === "dashboard" && <SuperDashboardView umkmList={sharedUmkmList} usersList={initialUsersList} />}
            {activeView === "umkm" && (
              <ManageUmkmView
                accountsList={sharedUmkmList}
                setAccountsList={setSharedUmkmList}
              />
            )}
            {activeView === "website" && <ManageWebsiteView initialPromptsList={initialPromptsList} initialContentList={initialContentList} initialCategoriesList={initialCategoriesList} initialUmkmList={sharedUmkmList} />}
            {activeView === "users" && (
              <ManageUsersView
                initialUsersList={initialUsersList}
                onAddUmkm={(u) => setSharedUmkmList((prev) => [u, ...prev])}
                onToggleUserStatus={(userId, newStatus) => {
                  setSharedUmkmList((prev) =>
                    prev.map((item) =>
                      item.id === userId || item.owner === userId
                        ? { ...item, status: newStatus, active: newStatus === "Aktif" }
                        : item
                    )
                  );
                }}
              />
            )}
          </div>

          {/* Admin Dashboard Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200/80 text-center text-xs font-semibold text-slate-400">
            <p>© 2026 MABERUK — Platform Digital UMKM Babatan. All rights reserved.</p>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around bg-white border-t border-slate-200 pb-safe pt-2 shadow-lg md:hidden">
        {superNavItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`}
            >
              <SuperNavIcon id={item.id} />
              <span className={`text-[12px] font-bold mt-1.5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
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

function SuperDashboardView({ umkmList, usersList = [] }: { umkmList: any[], usersList?: any[] }) {
  const displayUmkmCount = umkmList.length;
  const displayUsersCount = usersList.length;

  // Compute category distribution
  const categoryCounts: Record<string, number> = {};
  umkmList.forEach(u => {
    const cat = u.category || 'Lainnya';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const tones: Array<"green" | "blue" | "yellow" | "purple"> = ["green", "blue", "yellow", "purple"];
  const totalUmkmForCat = umkmList.length || 1; 

  // Compute monthly UMKM growth (last 6 months)
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const monthlyCounts = new Map<string, number>();
  let totalWithDate = 0;
  umkmList.forEach(u => {
    if (u.created_at) {
      const d = new Date(u.created_at);
      if (!isNaN(d.getTime())) {
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        monthlyCounts.set(key, (monthlyCounts.get(key) || 0) + 1);
        totalWithDate++;
      }
    }
  });

  const dynamicMonthlyUmkm = [];
  const currentDate = new Date();
  const totalCount = displayUmkmCount || umkmList.length || 24;

  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    let val = monthlyCounts.get(key) || 0;
    
    // If no created_at dates exist in database records, provide a natural growth curve up to total count
    if (totalWithDate === 0) {
      const baseline = Math.max(1, Math.floor(totalCount * 0.45));
      const step = Math.floor(((totalCount - baseline) / 5) * (5 - i));
      val = Math.min(totalCount, baseline + step);
    }

    dynamicMonthlyUmkm.push({
      month: months[d.getMonth()],
      value: val
    });
  }

  // Calculate trends for UMKM
  const thisMonthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${lastMonthDate.getMonth()}`;
  
  const newUmkmThisMonth = monthlyCounts.get(thisMonthKey) || 0;
  const newUmkmLastMonth = monthlyCounts.get(lastMonthKey) || 0;
  let umkmTrend = "0% bulan ini";
  if (newUmkmLastMonth > 0) {
    const pct = Math.round(((newUmkmThisMonth - newUmkmLastMonth) / newUmkmLastMonth) * 100);
    umkmTrend = `${pct > 0 ? '+' : ''}${pct}% bulan ini`;
  } else if (newUmkmThisMonth > 0) {
    umkmTrend = `+100% bulan ini`;
  }

  // Calculate trends for Users
  const userMonthlyCounts = new Map<string, number>();
  usersList.forEach(u => {
    if (u.created_at) {
      const d = new Date(u.created_at);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      userMonthlyCounts.set(key, (userMonthlyCounts.get(key) || 0) + 1);
    }
  });
  const newUserThisMonth = userMonthlyCounts.get(thisMonthKey) || 0;
  const newUserLastMonth = userMonthlyCounts.get(lastMonthKey) || 0;
  let userTrend = "0% bulan ini";
  if (newUserLastMonth > 0) {
    const pct = Math.round(((newUserThisMonth - newUserLastMonth) / newUserLastMonth) * 100);
    userTrend = `${pct > 0 ? '+' : ''}${pct}% bulan ini`;
  } else if (newUserThisMonth > 0) {
    userTrend = `+100% bulan ini`;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Total UMKM Terdaftar" value={`${displayUmkmCount} Usaha`} trend={umkmTrend} tone="green" />
        <MetricCard label="Total Pengguna Aktif" value={`${displayUsersCount} User`} trend={userTrend} tone="blue" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="panel">
          <div className="section-title">
            <h2>Pertumbuhan UMKM</h2>
            <div className="flex gap-4">
              <span className="legend-dot">Periode 6 Bulan</span>
            </div>
          </div>
          <BarChart data={dynamicMonthlyUmkm} tone="green" />
        </section>

        <section className="panel p-5">
          <div className="section-title px-0 pt-0">
            <h2>Distribusi Kategori</h2>
          </div>
          <div className="p-5 flex flex-col gap-2">
            {sortedCategories.length > 0 ? (
              sortedCategories.map((cat, idx) => (
                <DistributionRow 
                  key={cat[0]}
                  label={cat[0]} 
                  value={`${Math.round((cat[1] / totalUmkmForCat) * 100)}% (${cat[1]})`} 
                  width={`${Math.round((cat[1] / totalUmkmForCat) * 100)}%`} 
                  tone={tones[idx % tones.length]} 
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">Belum ada data kategori.</p>
            )}
          </div>
        </section>
      </div>
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

function BarChart({
  data,
  tone = "green",
}: {
  data: Array<{ month: string; value: number }>;
  tone?: "green" | "red";
}) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const colorClass = tone === "red" ? "bg-red-500 hover:bg-red-600" : "bg-[#10b981] hover:bg-[#059669]";

  return (
    <div className="mt-4 flex h-52 items-end gap-2.5 pt-4 px-2">
      {data.map((item) => {
        const heightPercent = Math.max(Math.round((item.value / maxValue) * 100), item.value > 0 ? 10 : 4);
        return (
          <div key={item.month} className="flex flex-1 h-full flex-col items-center justify-end gap-2">
            <span className="text-xs font-bold text-slate-500">{item.value}</span>
            <div className="w-full max-w-[42px] h-36 rounded-t-lg bg-slate-100/90 flex items-end overflow-hidden shadow-inner">
              <div
                className={`w-full rounded-t-lg ${colorClass} transition-all duration-500 shadow-xs`}
                style={{ height: `${heightPercent}%` }}
                title={`${item.month}: ${item.value}`}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function ManageUmkmView({
  accountsList,
  setAccountsList,
}: {
  accountsList: UmkmAccount[];
  setAccountsList: React.Dispatch<React.SetStateAction<UmkmAccount[]>>;
}) {
  const [selected, setSelected] = useState(accountsList[0]);
  const [statusFilter, setStatusFilter] = useState<"Aktif" | "Nonaktif">("Aktif");
  const [search, setSearch] = useState("");

  const getItemStatus = (item: any) => item.status || (item.active === false ? "Nonaktif" : "Aktif");
  const activeCount = accountsList.filter((item) => getItemStatus(item) === "Aktif").length;
  const inactiveCount = accountsList.length - activeCount;
  const filteredAccounts = accountsList.filter(
    (account) =>
      getItemStatus(account) === statusFilter &&
      `${account.name || ''} ${account.owner || ''} ${account.phone || ''}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE));
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const startIndex = filteredAccounts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredAccounts.length);

  const visibleSelected =
    filteredAccounts.find((account) => account.name === selected?.name) ?? paginatedAccounts[0] ?? filteredAccounts[0] ?? selected;

  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);

  function handleDeleteUmkm(targetName: string) {
    setDeleteTargetName(targetName);
  }

  async function confirmDeleteUmkm() {
    if (!deleteTargetName) return;
    const targetName = deleteTargetName;
    setDeleteTargetName(null);
    const targetAcc = accountsList.find(a => a.name === targetName);
    if (targetAcc && (targetAcc as any).id) {
      await deleteUmkmStore((targetAcc as any).id);
    }
    const updated = accountsList.filter((acc) => acc.name !== targetName);
    setAccountsList(updated);
    if (selected?.name === targetName) {
      setSelected(updated[0] ?? accountsList[0]);
    }
  }

  async function handleToggleUmkmStatus(acc: any) {
    const currentStatus = getItemStatus(acc);
    const newStatus: "Aktif" | "Nonaktif" = currentStatus === "Aktif" ? "Nonaktif" : "Aktif";
    const newActive = newStatus === "Aktif";

    const updated: UmkmAccount[] = accountsList.map((item) => {
      if (item.name === acc.name || (item as any).id === acc.id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setAccountsList(updated);
    if (selected?.name === acc.name) {
      setSelected({ ...selected, status: newStatus });
    }

    if (acc.id) {
      await toggleUmkmStatus(acc.id, newActive);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
      <section className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200 shrink-0">
              <button
                className={`px-3.5 py-1.5 rounded-md text-sm font-bold transition-all ${
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
                className={`px-3.5 py-1.5 rounded-md text-sm font-bold transition-all ${
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
            <p className="text-sm text-slate-400 font-medium italic">
              Profil UMKM dibuat otomatis saat Owner didaftarkan.
            </p>
          </div>
          <input
            className="field lg:w-64"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama usaha..."
            value={search}
          />
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {paginatedAccounts.map((account) => (
            <button
              className={`mobile-data-card ${visibleSelected.name === account.name ? "mobile-data-card-active" : ""}`}
              key={account.name}
              onClick={() => setSelected(account)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">
                    {account.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">{account.name}</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">{account.owner}</p>
                  </div>
                </div>
                <span className={`pill ${getItemStatus(account) === "Aktif" ? "pill-green" : "pill-red"}`}>
                  {getItemStatus(account)}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm">
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
              {paginatedAccounts.map((account) => (
                <tr
                  className={`clickable-row ${visibleSelected.name === account.name ? "row-selected" : ""}`}
                  key={account.name}
                  onClick={() => setSelected(account)}
                >
                  <td>
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">
                      {account.name.slice(0, 2).toUpperCase()}
                    </div>
                  </td>
                  <td className="font-bold text-slate-800">{account.name}</td>
                  <td>{account.owner}</td>
                  <td>{account.phone}</td>
                  <td>
                    <span className={`pill ${getItemStatus(account) === "Aktif" ? "pill-green" : "pill-red"}`}>
                      {getItemStatus(account)}
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

        {/* Pagination Controls */}
        {filteredAccounts.length > 0 && (
          <div className="flex flex-col gap-3 px-4 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 bg-slate-50/50">
            <span className="font-medium text-slate-600">
              Menampilkan <span className="font-bold text-slate-900">{startIndex}-{endIndex}</span> dari <span className="font-bold text-slate-900">{filteredAccounts.length}</span> UMKM
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
              >
                Sebelumnya
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pg
                        ? "bg-[#10b981] text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </section>

      {visibleSelected && (
        <section className="panel p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-emerald-600">Detail UMKM</p>
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
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <button
              className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition-colors ${
                getItemStatus(visibleSelected) === "Aktif"
                  ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
              onClick={() => handleToggleUmkmStatus(visibleSelected)}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              {getItemStatus(visibleSelected) === "Aktif" ? "Nonaktifkan Toko" : "Aktifkan Toko"}
            </button>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors"
              onClick={() => handleDeleteUmkm(visibleSelected.name)}
              type="button"
            >
              <TrashIcon />
              Hapus UMKM
            </button>
          </div>
        </section>
      )}

      <ConfirmModal
        isOpen={!!deleteTargetName}
        title="Hapus Toko UMKM"
        message={`Apakah Anda yakin ingin menghapus toko UMKM "${deleteTargetName || ''}"?`}
        onConfirm={confirmDeleteUmkm}
        onCancel={() => setDeleteTargetName(null)}
      />
    </div>
  );
}

function formatIndonesianDate(dateStr: string) {
  if (!dateStr) return "Hari ini";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}



function ManageUsersView({ 
  initialUsersList, 
  onAddUmkm,
  onToggleUserStatus
}: { 
  initialUsersList: any[]; 
  onAddUmkm: (umkm: any) => void;
  onToggleUserStatus?: (userId: string, newStatus: string) => void;
}) {
  const [usersList, setUsersList] = useState<any[]>(initialUsersList);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<any | null>(null);
  const [showPasswordId, setShowPasswordId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filteredUsers = usersList.filter((u) =>
    `${u.name} ${u.username || u.email || ''}`.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const startIndex = filteredUsers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length);

  async function toggleStatus(id: string) {
    const userToUpdate = usersList.find((u) => u.id === id);
    if (!userToUpdate) return;
    const newStatus = userToUpdate.status === "Aktif" ? "Nonaktif" : "Aktif";
    const updatedUser = { ...userToUpdate, status: newStatus };
    
    setUsersList(usersList.map((u) => u.id === id ? updatedUser : u));
    onToggleUserStatus?.(id, newStatus);
    await upsertUser(updatedUser);
  }

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  function handleDeleteUser(id: string) {
    setDeleteUserId(id);
  }

  async function confirmDeleteUser() {
    if (!deleteUserId) return;
    const id = deleteUserId;
    setDeleteUserId(null);
    setUsersList(usersList.filter((u) => u.id !== id));
    await deleteUserAction(id);
  }

  async function handleAddUser(newUser: any, autoUmkm: UmkmAccount) {
    setUsersList([newUser, ...usersList]);
    onAddUmkm(autoUmkm);
  }

  return (
    <div className="space-y-5">
      <section className="panel p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              className="field sm:w-64 font-normal text-slate-800"
              style={{ paddingLeft: "2.25rem" }}
              placeholder="Cari nama atau username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="primary-button flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-[#10b981] hover:bg-[#059669] shrink-0"
            onClick={() => setIsAddModalOpen(true)}
            type="button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Owner UMKM Baru
          </button>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="data-table w-full min-w-[950px] hidden md:table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nama Lengkap</th>
                <th>Username</th>
                <th>Kata Sandi / Password</th>
                <th>Peran (Role)</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                      <img src={user.avatar || "/logo-maberuk.webp"} alt={user.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="font-bold text-slate-900 text-base">{user.name}</td>
                  <td className="text-slate-600 font-normal text-sm">{user.username || user.email || '—'}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded border border-slate-200">
                        {showPasswordId === user.id ? (user.password || 'password123') : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPasswordId(showPasswordId === user.id ? null : user.id)}
                        className="text-slate-500 hover:text-emerald-600 text-sm font-bold transition-colors"
                        title="Lihat / Sembunyikan Kata Sandi"
                      >
                        {showPasswordId === user.id ? "Sembunyi" : "Lihat"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
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
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        user.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-colors"
                        onClick={() => setResetPasswordUser(user)}
                        title="Reset Kata Sandi"
                        type="button"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                      </button>
                      <button
                        className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors border border-transparent ${
                          user.status === "Aktif"
                            ? "text-rose-500 hover:bg-rose-50 hover:border-rose-200"
                            : "text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                        onClick={() => toggleStatus(user.id)}
                        title={user.status === "Aktif" ? "Nonaktifkan Pengguna" : "Aktifkan Pengguna"}
                        type="button"
                      >
                        {user.status === "Aktif" ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                      <button
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                        onClick={() => handleDeleteUser(user.id)}
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
          
          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <img src={user.avatar || "/logo-maberuk.webp"} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{user.name}</h3>
                    <p className="text-slate-500 text-sm">{user.username || user.email || '—'}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : user.role === "UMKM Owner" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                    {user.role}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${user.status === "Aktif" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {user.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-slate-700 bg-slate-100 px-3 py-2 rounded border border-slate-200 flex-1">
                    {showPasswordId === user.id ? (user.password || 'password123') : '••••••••'}
                  </span>
                  <button type="button" onClick={() => setShowPasswordId(showPasswordId === user.id ? null : user.id)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold border border-slate-200 min-h-[44px]">
                    {showPasswordId === user.id ? "Sembunyi" : "Lihat"}
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2 pt-4 border-t border-slate-100">
                  <button onClick={() => setResetPasswordUser(user)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-bold" type="button">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
                    Reset
                  </button>
                  <button onClick={() => toggleStatus(user.id)} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border rounded-lg text-sm font-bold ${user.status === "Aktif" ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`} type="button">
                    {user.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="w-12 flex items-center justify-center bg-rose-50 text-rose-600 border border-rose-200 rounded-lg" type="button">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {filteredUsers.length === 0 && <EmptyState text="Pengguna tidak ditemukan." />}
        
        {/* Dynamic Pagination Controls */}
        {filteredUsers.length > 0 && (
          <div className="flex flex-col gap-3 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 bg-slate-50/50">
            <span className="text-sm text-slate-600 font-medium">
              Menampilkan <span className="font-bold text-slate-900">{startIndex}-{endIndex}</span> dari <span className="font-bold text-slate-900">{filteredUsers.length}</span> total pengguna
            </span>
            <div className="flex items-center gap-1.5">
              <button
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Sebelumnya
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pg
                        ? "bg-[#10b981] text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                  >
                    {pg}
                  </button>
                ))}
              </div>
              <button
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </section>

      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}

      {resetPasswordUser && (
        <ResetPasswordModal
          user={resetPasswordUser}
          onClose={() => setResetPasswordUser(null)}
          onSuccess={(userId, newPass) => {
            setUsersList(prev => prev.map(u => u.id === userId ? { ...u, password: newPass } : u));
          }}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteUserId}
        title="Hapus Pengguna"
        message="Apakah Anda yakin ingin menghapus pengguna ini secara permanen?"
        onConfirm={confirmDeleteUser}
        onCancel={() => setDeleteUserId(null)}
      />
    </div>
  );
}

function ResetPasswordModal({
  user,
  onClose,
  onSuccess,
}: {
  user: any;
  onClose: () => void;
  onSuccess: (userId: string, newPass: string) => void;
}) {
  const [newPassword, setNewPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await resetUserPassword(user.id, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      onSuccess(user.id, res.newPassword || newPassword);
      onClose();
    } else {
      setErrorMsg(res.error || "Gagal me-reset kata sandi");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <form onSubmit={handleSubmit} className="relative flex w-full max-w-md flex-col rounded-xl bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900">Reset Kata Sandi</h2>
            <p className="text-sm text-slate-500 font-normal mt-0.5">{user.name} (@{user.username || user.name})</p>
          </div>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">X</button>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm font-bold text-rose-600">
            {errorMsg}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi Baru *</label>
            <input
              className="field font-mono text-slate-800"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ketik kata sandi baru..."
              required
            />
            <p className="mt-1 text-sm text-slate-400">Kata sandi baru akan langsung berlaku untuk login pengguna ini.</p>
          </div>
        </div>
        <div className="mt-4 flex shrink-0 justify-end gap-2 pt-4 border-t border-slate-100">
          <button className="secondary-button" onClick={onClose} type="button">Batal</button>
          <button className="primary-button bg-[#10b981] hover:bg-[#059669]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

function AddUserModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newUser: UserItem, autoUmkm: UmkmAccount) => void;
}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("password123");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Aktif");
  const [registeredDate, setRegisteredDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !username) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const joinedStr = formatIndonesianDate(registeredDate);
    const umkmName = storeName.trim() || `Toko ${name.split(" ")[0]}`;

    const res = await createNewOwner({
      name,
      username,
      password,
      phone,
      status,
      storeName
    });

    setIsSubmitting(false);

    if (!res || res.error) {
      setErrorMsg(res?.error || "Gagal membuat akun owner baru");
      return;
    }

    const newUserId = res?.userId || crypto.randomUUID();

    const autoUmkm: UmkmAccount = {
      name: umkmName,
      owner: name,
      phone: phone || "—",
      status: status as "Aktif" | "Nonaktif",
      joined: joinedStr,
      category: "Lainnya",
      address: "Babatan, Surabaya",
      products: 0,
      revenue: "Rp 0",
    };

    onAdd(
      {
        id: newUserId,
        name,
        email: username,
        password: res.password || password,
        role: "umkm",
        status,
        registered: joinedStr,
        avatar: "/logo-maberuk.webp",
      },
      autoUmkm,
    );
    onClose();
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <form onSubmit={handleSubmit} className="relative flex w-full max-w-lg flex-col rounded-xl bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <h2 className="text-base font-bold text-slate-900">Tambah Owner UMKM Baru</h2>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">
            ✕
          </button>
        </div>
        <div className="mb-4 shrink-0 rounded-lg bg-emerald-50 border border-emerald-100 px-3.5 py-3">
          <p className="text-sm font-bold text-emerald-700">✦ Auto-generate Profil UMKM</p>
          <p className="text-sm text-emerald-600 font-normal mt-0.5">
            Profil UMKM default akan dibuat otomatis dan muncul di Kelola UMKM. Owner bisa mengeditnya sendiri setelah login.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 shrink-0 rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm font-bold text-rose-600">
            {errorMsg}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  className="field font-normal text-slate-800"
                  placeholder="Contoh: Supriyadi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Username *</label>
                <input
                  className="field font-normal text-slate-800"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi (Password) *</label>
                <input
                  className="field font-mono text-slate-800"
                  placeholder="password123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">No. Telepon / WhatsApp</label>
                <input
                  className="field font-normal text-slate-800"
                  placeholder="0812-3456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Toko / Usaha *</label>
                <input
                  className="field font-normal text-slate-800"
                  placeholder="Contoh: Kedai Kopi Babatan"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status Akun</label>
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
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Terdaftar *</label>
              <input
                type="date"
                className="field font-normal text-slate-800"
                value={registeredDate}
                onChange={(e) => setRegisteredDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex shrink-0 justify-end gap-3 pt-4 border-t border-slate-100">
            <button className="secondary-button" onClick={onClose} type="button">Batal</button>
            <button className="primary-button bg-[#10b981] hover:bg-[#059669] flex items-center justify-center gap-2" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? "Membuat Akun & UMKM..." : "Buat Akun & Profil UMKM"}
            </button>
          </div>
      </form>
    </div>,
    document.body
  );
}

function ManageWebsiteView({ 
  initialPromptsList, 
  initialContentList,
  initialCategoriesList,
  initialUmkmList
}: { 
  initialPromptsList: any[]; 
  initialContentList: any[]; 
  initialCategoriesList: any[];
  initialUmkmList: any[];
}) {
  const [activeTab, setActiveTab] = useState<"beranda" | "tentang" | "prompt" | "kategori">("beranda");
  const [items, setItems] = useState<any[]>(() => {
    const dbHome = initialContentList.find(c => c.key === 'home_recommendations');
    const realUmkms = initialUmkmList || [];
    
    if (dbHome?.value && Array.isArray(dbHome.value) && dbHome.value.length > 0) {
      const orderedIds = dbHome.value.map((item: any) => item.id);
      const orderedList = [];
      for (const id of orderedIds) {
        const found = realUmkms.find((u: any) => u.id === id);
        if (found) orderedList.push(found);
      }
      for (const u of realUmkms) {
        if (!orderedIds.includes(u.id)) orderedList.push(u);
      }
      return orderedList;
    }
    return realUmkms.slice(0, 12);
  });
  const [berandaPage, setBerandaPage] = useState(1);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptItem | null>(null);

  const [aboutForm, setAboutForm] = useState<any>(() => {
    const dbAbout = initialContentList.find(c => c.key === 'about_page');
    return dbAbout ? dbAbout.value : { title: "", subtitle: "", sectionTitle: "", p1: "", p2: "", p3: "", p4: "", kecamatan: "", kota: "", ctaTitle: "", ctaDescription: "", whatsapp: "" };
  });

  const [promptsList, setPromptsList] = useState<any[]>(() => {
    return (initialPromptsList && initialPromptsList.length > 0) ? initialPromptsList : [];
  });
  
  const [categoriesList, setCategoriesList] = useState<any[]>(initialCategoriesList || []);
  const [newCategoryName, setNewCategoryName] = useState("");

  function triggerToast(text: string) {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }

  async function handleSaveAbout(e: React.FormEvent) {
    e.preventDefault();
    await saveSiteContent('about_page', aboutForm);
    triggerToast("✓ Perubahan Halaman Tentang Kami berhasil disimpan ke landing page (/tentang)!");
  }

  async function handleAddPrompt(newPrompt: PromptItem) {
    const res = await upsertPrompt(newPrompt);
    if (res.success && res.data) {
      const updated = [res.data, ...promptsList];
      setPromptsList(updated);
      triggerToast("✓ Prompt AI baru berhasil ditambahkan ke direktori prompt (/direktori-prompt)!");
    } else {
      triggerToast("✗ Gagal menambahkan prompt!");
    }
  }

  async function handleDeletePrompt(id: number) {
    const updated = promptsList.filter((p) => p.id !== id);
    setPromptsList(updated);
    await deletePrompt(id);
    triggerToast("✓ Prompt berhasil dihapus!");
  }

  async function handleEditPrompt(updated: PromptItem) {
    const next = promptsList.map((p) => (p.id === updated.id ? updated : p));
    setPromptsList(next);
    await upsertPrompt(updated);
    setEditingPrompt(null);
    triggerToast("✓ Prompt berhasil diperbarui!");
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCategory = { name: newCategoryName };
    const { success } = await upsertCategory(newCategory);
    if (success) {
      setCategoriesList([...categoriesList, newCategory]);
      setNewCategoryName("");
      triggerToast("✓ Kategori berhasil ditambahkan!");
    }
  }

  async function handleDeleteCategory(id: number) {
    await deleteCategory(id);
    setCategoriesList(categoriesList.filter(c => c.id !== id));
    triggerToast("✓ Kategori berhasil dihapus!");
  }

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

  function moveItem(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= items.length) return;
    const nextItems = [...items];
    const [moved] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, moved);
    setItems(nextItems);
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Mobile Selector Dropdown */}
      <div className="block md:hidden">
        <label htmlFor="mobile-website-tab-select" className="sr-only">Pilih Halaman Website</label>
        <div className="relative">
          <select
            id="mobile-website-tab-select"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as "beranda" | "tentang" | "prompt")}
            className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-10 text-sm font-extrabold text-slate-900 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="beranda">Halaman: Beranda</option>
            <option value="tentang">Halaman: Tentang Kami</option>
            <option value="prompt">Halaman: Direktori Prompt (AI)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-3 panel p-4">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "beranda"
                ? "bg-[#10b981] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => setActiveTab("beranda")}
            type="button"
          >
            Halaman Beranda
          </button>
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "tentang"
                ? "bg-[#10b981] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => setActiveTab("tentang")}
            type="button"
          >
            Halaman Tentang Kami
          </button>
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "prompt"
                ? "bg-[#10b981] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => setActiveTab("prompt")}
            type="button"
          >
            Direktori Prompt (AI)
          </button>
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              activeTab === "kategori"
                ? "bg-[#10b981] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => setActiveTab("kategori")}
            type="button"
          >
            Kategori UMKM
          </button>
        </div>
      </div>

      {showToast && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500 text-white text-sm font-bold flex items-center justify-between shadow-lg transition-all">
          <span>{toastText}</span>
          <button onClick={() => setShowToast(false)} className="text-white hover:text-emerald-100 pl-2" type="button">✕</button>
        </div>
      )}

      {activeTab === "beranda" ? (
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Urutkan Rekomendasi UMKM</h2>
                <p className="mt-0.5 text-sm text-slate-500 font-normal">
                  Geser item atau gunakan tombol panah untuk menentukan posisi rekomendasi pada beranda.
                </p>
              </div>
              <button
                className="primary-button bg-[#10b981] hover:bg-[#059669] text-sm font-bold py-2 px-3.5 shrink-0 rounded-lg transition-transform active:scale-95 shadow-xs"
                type="button"
                onClick={async () => {
                  await saveSiteContent('home_recommendations', items);
                  triggerToast("✓ Urutan rekomendasi UMKM berhasil disimpan!");
                }}
              >
                Simpan Urutan
              </button>
            </div>

            <div className="space-y-3">
              {(() => {
                const BERANDA_PAGE_SIZE = 6;
                const totalBerandaPages = Math.max(1, Math.ceil(items.length / BERANDA_PAGE_SIZE));
                const currentBerandaPage = Math.min(berandaPage, totalBerandaPages);
                const startIndex = (currentBerandaPage - 1) * BERANDA_PAGE_SIZE;
                const endIndex = Math.min(currentBerandaPage * BERANDA_PAGE_SIZE, items.length);
                const paginatedItems = items.slice(startIndex, endIndex);

                return (
                  <>
                    {paginatedItems.map((item, localIndex) => {
                      const globalIndex = startIndex + localIndex;
                      return (
                        <div
                          key={item.id || globalIndex}
                          draggable
                          onDragOver={(event) => event.preventDefault()}
                          onDragStart={() => setDraggedIndex(globalIndex)}
                          onDrop={(event) => handleDrop(event, globalIndex)}
                          className={`group relative rounded-xl border bg-white transition-all duration-200 ${
                            draggedIndex === globalIndex
                              ? "opacity-50 scale-[0.98] border-emerald-500 ring-2 ring-emerald-500/30 shadow-md"
                              : "border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs"
                          }`}
                        >
                          {/* MOBILE LAYOUT (md:hidden) */}
                          <div className="flex flex-col gap-2.5 p-3 md:hidden">
                            {/* Top Row: Reorder Arrow Buttons & Rank Badge */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={globalIndex === 0}
                                  onClick={() => moveItem(globalIndex, globalIndex - 1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                                  title="Pindah ke Atas"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  disabled={globalIndex === items.length - 1}
                                  onClick={() => moveItem(globalIndex, globalIndex + 1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                                  title="Pindah ke Bawah"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                  </svg>
                                </button>
                              </div>

                              <div className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-emerald-50 font-extrabold text-sm text-emerald-700 border border-emerald-200/60 shadow-2xs">
                                #{globalIndex + 1}
                              </div>
                            </div>

                            {/* Content Row: Image & Info */}
                            <div className="flex items-start gap-3">
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-2xs">
                                <img src={item.hero_image || item.logo_url || "/logo-maberuk.webp"} alt={item.name} className="h-full w-full object-cover" />
                              </div>

                              <div className="flex-1 min-w-0 space-y-1">
                                <h4 className="text-sm font-extrabold text-slate-900 truncate leading-snug">{item.name}</h4>
                                <p className="text-sm text-slate-500 font-medium truncate">
                                  Pemilik: <span className="font-semibold text-slate-800">{item.owner}</span>
                                </p>
                              </div>
                            </div>

                            {/* Bottom Row: Category Badge & Status */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase border border-emerald-200/40 max-w-full truncate">
                                {item.category}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {item.status}
                              </span>
                            </div>
                          </div>

                          {/* DESKTOP LAYOUT (hidden md:flex) */}
                          <div className="hidden md:flex items-center gap-3.5 p-3.5">
                            <div className="flex h-8 w-6 shrink-0 items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors cursor-grab active:cursor-grabbing">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                              </svg>
                            </div>

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 font-extrabold text-sm text-emerald-700 border border-emerald-100/80">
                              #{globalIndex + 1}
                            </div>

                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200/60 bg-slate-100">
                              <img src={item.hero_image || item.logo_url || "/logo-maberuk.webp"} alt={item.name} className="h-full w-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                                <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase border border-emerald-200/40">
                                  {item.category}
                                </span>
                              </div>
                              <p className="mt-0.5 text-sm text-slate-500 font-normal">
                                Pemilik: <span className="font-semibold text-slate-700">{item.owner}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={globalIndex === 0}
                                onClick={() => moveItem(globalIndex, globalIndex - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                                title="Pindah ke Atas"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                disabled={globalIndex === items.length - 1}
                                onClick={() => moveItem(globalIndex, globalIndex + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                                title="Pindah ke Bawah"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-sm font-semibold text-slate-600">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              {item.status}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Pagination Controls for Beranda Recommendations */}
                    {items.length > 0 && (
                      <div className="flex flex-col gap-3 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
                        <span className="font-medium text-slate-600">
                          Menampilkan <span className="font-bold text-slate-900">{startIndex + 1}-{endIndex}</span> dari <span className="font-bold text-slate-900">{items.length}</span> rekomendasi UMKM
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={currentBerandaPage <= 1}
                            onClick={() => setBerandaPage((p) => Math.max(1, p - 1))}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
                          >
                            Sebelumnya
                          </button>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: totalBerandaPages }, (_, i) => i + 1).map((pg) => (
                              <button
                                key={pg}
                                type="button"
                                onClick={() => setBerandaPage(pg)}
                                className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                                  currentBerandaPage === pg
                                    ? "bg-[#10b981] text-white shadow-xs"
                                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {pg}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            disabled={currentBerandaPage >= totalBerandaPages}
                            onClick={() => setBerandaPage((p) => Math.min(totalBerandaPages, p + 1))}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs"
                          >
                            Berikutnya
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </section>
        </div>
      ) : activeTab === "tentang" ? (
        <form onSubmit={handleSaveAbout} className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Edit Konten Halaman Tentang Kami</h2>
              <p className="text-sm text-slate-500 font-normal">Kelola judul, deskripsi paguyuban Maberuk, status, dan kontak WhatsApp pada landing page.</p>
            </div>
            <button className="primary-button bg-[#10b981] hover:bg-[#059669] text-sm font-bold py-2.5 px-4 shrink-0 w-full sm:w-auto" type="submit">
              Simpan Perubahan
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Judul Utama Landing Page</label>
              <input
                className="field font-normal text-slate-800"
                value={aboutForm.title}
                onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Sub-Judul / Tagline</label>
              <input
                className="field font-normal text-slate-800"
                value={aboutForm.subtitle}
                onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Deskripsi Utama Paguyuban (Siapa Kami)</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Judul Seksi</label>
              <input
                className="field font-normal text-slate-800"
                value={aboutForm.sectionTitle}
                onChange={(e) => setAboutForm({ ...aboutForm, sectionTitle: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Paragraf 1 (Pengenalan Paguyuban)</label>
              <textarea
                className="field min-h-20 py-2 font-normal text-slate-800"
                value={aboutForm.p1}
                onChange={(e) => setAboutForm({ ...aboutForm, p1: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Paragraf 2 (Wadah Koordinasi & Legalitas NIB)</label>
              <textarea
                className="field min-h-20 py-2 font-normal text-slate-800"
                value={aboutForm.p2}
                onChange={(e) => setAboutForm({ ...aboutForm, p2: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Paragraf 3 (Manfaat & Kapasitas Usaha)</label>
              <textarea
                className="field min-h-20 py-2 font-normal text-slate-800"
                value={aboutForm.p3}
                onChange={(e) => setAboutForm({ ...aboutForm, p3: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Paragraf 4 (Sinergi Kelurahan & Warga)</label>
              <textarea
                className="field min-h-20 py-2 font-normal text-slate-800"
                value={aboutForm.p4}
                onChange={(e) => setAboutForm({ ...aboutForm, p4: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button className="primary-button bg-[#10b981] hover:bg-[#059669] text-sm font-bold py-2.5 px-4 w-full sm:w-auto" type="submit">
              Simpan Perubahan Tentang Kami
            </button>
          </div>
        </form>
      ) : activeTab === "prompt" ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Kelola Direktori Prompt AI</h2>
              <p className="text-sm text-slate-500 font-normal">Tambah, edit, dan hapus kumpulan prompt siap pakai untuk pelaku UMKM Babatan.</p>
            </div>
            <button
              className="primary-button flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-bold bg-[#10b981] hover:bg-[#059669] shrink-0 w-full sm:w-auto"
              onClick={() => setIsAddPromptOpen(true)}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Prompt Baru
            </button>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {promptsList.map((item) => (
              <div key={item.id} className="rounded-xl p-3.5 flex flex-col justify-between border border-slate-200 bg-white shadow-2xs">
                <div>
                  <div className="relative h-36 w-full overflow-hidden rounded-lg bg-slate-100 mb-3">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 rounded-md bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 shadow-xs uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-3 font-normal">{item.prompt}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    className="h-7 px-2.5 rounded-md text-sm font-bold text-slate-600 hover:bg-slate-100 bg-slate-50 transition-colors flex items-center gap-1 border border-slate-200"
                    onClick={() => setEditingPrompt(item)}
                    type="button"
                  >
                    <EditIcon />
                    Edit
                  </button>
                  <button
                    className="h-7 px-2.5 rounded-md text-sm font-bold text-red-600 hover:bg-red-50 bg-red-50/50 transition-colors flex items-center gap-1"
                    onClick={() => handleDeletePrompt(item.id)}
                    type="button"
                  >
                    <TrashIcon />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAddPromptOpen && (
            <AddPromptModal
              onClose={() => setIsAddPromptOpen(false)}
              onAdd={handleAddPrompt}
            />
          )}

          {editingPrompt && (
            <EditPromptModal
              prompt={editingPrompt}
              onClose={() => setEditingPrompt(null)}
              onSave={handleEditPrompt}
            />
          )}
        </section>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Kategori UMKM</h2>
                <p className="mt-0.5 text-sm text-slate-500 font-normal">Tambah atau hapus kategori untuk UMKM.</p>
              </div>
            </div>
            
            <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
              <input 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                placeholder="Nama Kategori Baru" 
                className="field flex-1" 
                required 
              />
              <button type="submit" className="primary-button bg-[#10b981] hover:bg-[#059669] px-4 rounded-lg font-bold text-sm">Tambah</button>
            </form>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {categoriesList.map((cat, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50">
                  <span className="text-sm font-semibold text-slate-800">{cat.name}</span>
                  {cat.id && (
                    <button type="button" onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-md transition-colors">
                      <TrashIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function AddPromptModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newPrompt: PromptItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("FOTO PRODUK");
  const [promptText, setPromptText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'prompts');

        const res = await uploadImageFile(formData);
        if (res.success && res.publicUrl) {
          setImage(res.publicUrl);
        } else {
          console.error("Gagal mengupload gambar ke R2:", res.error);
          alert("Gagal mengupload gambar: " + res.error);
        }
      } catch (err) {
        console.error("Kesalahan upload gambar:", err);
      } finally {
        setIsUploading(false);
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !promptText) return;

    onAdd({
      id: Date.now(),
      title,
      category,
      prompt: promptText,
      image: image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    });
    onClose();
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <form onSubmit={handleSubmit} className="relative flex w-full max-w-lg flex-col rounded-xl bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <h2 className="text-base font-bold text-slate-900">Tambah Prompt AI Baru</h2>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Judul Prompt *</label>
            <input
              className="field font-normal text-slate-800"
              placeholder="Contoh: Foto Produk Studio Minimalis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kategori (Badge)</label>
            <select
              className="field font-normal text-slate-800"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="FOTO PRODUK">FOTO PRODUK</option>
              <option value="KONTEN SOSIAL MEDIA">KONTEN SOSIAL MEDIA</option>
              <option value="DESAIN LOGO">DESAIN LOGO</option>
              <option value="POSTER PROMOSI">POSTER PROMOSI</option>
              <option value="DESAIN PRODUK">DESAIN PRODUK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Gambar Banner *</label>
            {image ? (
              <div className="relative h-36 w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
                <img src={image} alt="Preview Banner" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-900/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-xs"
                >
                  Hapus Gambar
                </button>
              </div>
            ) : (
              <label className="relative rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 p-4 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageFileChange} className="sr-only" />
                <div className="flex flex-col items-center gap-1 py-2">
                  <div className="h-9 w-9 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {isUploading ? "Mengunggah Gambar..." : "Klik untuk Mengunggah / Pilih Gambar"}
                  </p>
                  <p className="text-sm text-slate-400">PNG, JPG, atau WEBP</p>
                </div>
              </label>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Isi Prompt AI *</label>
            <textarea
              className="field min-h-24 py-2 font-normal text-slate-800"
              placeholder="Tuliskan prompt AI lengkap di sini..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex shrink-0 justify-end gap-3 pt-4 border-t border-slate-100">
          <button className="secondary-button" onClick={onClose} type="button">Batal</button>
          <button className="primary-button bg-[#10b981] hover:bg-[#059669]" type="submit">Tambah Prompt</button>
        </div>
      </form>
    </div>,
    document.body
  );
}

function EditPromptModal({
  prompt,
  onClose,
  onSave,
}: {
  prompt: PromptItem;
  onClose: () => void;
  onSave: (updated: PromptItem) => void;
}) {
  const [title, setTitle] = useState(prompt.title);
  const [category, setCategory] = useState(prompt.category);
  const [promptText, setPromptText] = useState(prompt.prompt);
  const [image, setImage] = useState<string | null>(prompt.image || null);
  const [isUploading, setIsUploading] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'prompts');

        const res = await uploadImageFile(formData);
        if (res.success && res.publicUrl) {
          setImage(res.publicUrl);
        } else {
          console.error("Gagal mengupload gambar ke R2:", res.error);
          alert("Gagal mengupload gambar: " + res.error);
        }
      } catch (err) {
        console.error("Kesalahan upload gambar:", err);
      } finally {
        setIsUploading(false);
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !promptText) return;
    onSave({ ...prompt, title, category, prompt: promptText, image: image || "" });
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <form onSubmit={handleSubmit} className="relative flex w-full max-w-lg flex-col rounded-xl bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900">Edit Prompt AI</h2>
            <p className="text-sm text-slate-400 font-normal mt-0.5 truncate max-w-[280px]">{prompt.title}</p>
          </div>
          <button className="icon-button" onClick={onClose} title="Tutup" type="button">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Judul Prompt *</label>
            <input
              className="field font-normal text-slate-800"
              placeholder="Contoh: Foto Produk Studio Minimalis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kategori (Badge)</label>
            <select
              className="field font-normal text-slate-800"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="FOTO PRODUK">FOTO PRODUK</option>
              <option value="KONTEN SOSIAL MEDIA">KONTEN SOSIAL MEDIA</option>
              <option value="DESAIN LOGO">DESAIN LOGO</option>
              <option value="POSTER PROMOSI">POSTER PROMOSI</option>
              <option value="DESAIN PRODUK">DESAIN PRODUK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Gambar Banner</label>
            <div className="relative h-36 w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-slate-50 mb-2">
              <img src={image || ""} alt="Preview Banner" className="h-full w-full object-cover" />
              <label className={`absolute inset-0 flex items-center justify-center bg-slate-900/40 transition-opacity ${isUploading ? 'opacity-100 cursor-wait' : 'opacity-0 hover:opacity-100 cursor-pointer'}`}>
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageFileChange} className="sr-only" disabled={isUploading} />
                <span className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-800 shadow">
                  {isUploading ? "Mengunggah..." : "Ganti Gambar"}
                </span>
              </label>
            </div>
            <p className="text-sm text-slate-400">Hover gambar lalu klik untuk mengganti. PNG, JPG, atau WEBP.</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Isi Prompt AI *</label>
            <textarea
              className="field min-h-24 py-2 font-normal text-slate-800"
              placeholder="Tuliskan prompt AI lengkap di sini..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex shrink-0 justify-end gap-3 pt-4 border-t border-slate-100">
          <button className="secondary-button" onClick={onClose} type="button">Batal</button>
          <button className="primary-button bg-[#10b981] hover:bg-[#059669]" type="submit">Simpan Perubahan</button>
        </div>
      </form>
    </div>,
    document.body
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 py-3">
      <p className="text-sm font-bold uppercase text-slate-400">{label}</p>
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
