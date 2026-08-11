"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




export default function PromptClient({ initialPrompts }: { initialPrompts: any[] }) {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Removed localStorage sync

  function handleCopy(id: number, text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToastMessage("Prompt berhasil disalin ke clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafcfb] text-slate-900 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-transparent py-14 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Kumpulan Prompt untuk Pelaku UMKM
          </h1>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal max-w-2xl mx-auto">
            Kumpulan prompt siap pakai untuk membantu pelaku UMKM Babatan membuat foto produk, caption, desain, hingga konten promosi menggunakan AI.
          </p>
        </div>
      </section>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs font-bold shadow-2xl flex items-center gap-2">
          <span className="text-emerald-400 text-base">✓</span>
          {toastMessage}
        </div>
      )}

      {/* Cards Grid Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-extrabold text-emerald-700 shadow-sm uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 font-normal line-clamp-3">
                    {item.prompt}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-5 pb-5 pt-1">
                <button
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-xs ${
                    copiedId === item.id
                      ? "bg-emerald-700 text-white"
                      : "bg-[#10b981] hover:bg-[#059669] text-white"
                  }`}
                  onClick={() => handleCopy(item.id, item.prompt)}
                  type="button"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {copiedId === item.id ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                  {copiedId === item.id ? "Tersalin!" : "Salin Prompt"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
