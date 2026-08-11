import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from '@/lib/supabase/server';const defaultAboutData = {
  title: "MABERUK",
  subtitle: "Maju Bersama UMK Kelurahan Babatan",
  sectionTitle: "Tentang Maberuk",
  p1: "Maberuk (Maju Bersama UMK Kelurahan Babatan) merupakan sebuah paguyuban yang dibentuk oleh Kelurahan Babatan, Kecamatan Wiyung, sebagai upaya untuk memperkuat kolaborasi dan kemitraan antar pelaku Usaha Mikro Kecil (UMK) di wilayah tersebut.",
  p2: "Paguyuban ini menjadi wadah koordinasi dan pendampingan, terutama bagi pelaku UMK pemula, mulai dari proses pendataan, pengurusan legalitas usaha seperti NIB (Nomor Induk Berusaha), hingga fasilitasi pelatihan dan kegiatan promosi seperti bazar UMK.",
  p3: "Melalui Maberuk, pelaku UMK mendapatkan akses untuk meningkatkan kapasitas usaha, memperluas jaringan, dan memperkuat posisi usaha mereka di tengah persaingan pasar.",
  p4: "Keberadaan Maberuk menunjukkan sinergi yang baik antara pemerintah kelurahan dan pelaku usaha lokal dalam mewujudkan kemandirian ekonomi masyarakat Babatan.",
  kecamatan: "Wiyung",
  kota: "Surabaya",
  ctaTitle: "Bergabung Bersama Kami",
  ctaDescription: "Daftarkan usaha Anda ke Maberuk dan dapatkan akses pendampingan, pelatihan, serta jaringan pelaku UMK Babatan.",
  whatsapp: "081234567890",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: dbAbout } = await supabase.from('site_content').select('value').eq('key', 'about_page').single();
  const data = dbAbout?.value || defaultAboutData;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafcfb] text-slate-900 font-sans selection:bg-green-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-transparent py-14 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-2 text-base font-semibold text-emerald-600 sm:text-lg">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-10 md:grid-cols-[1fr_320px] items-start">
          {/* Left Column: Story & Paragraphs */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">SIAPA KAMI</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{data.sectionTitle}</h2>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600 font-normal">
              <p>{data.p1}</p>
              <p>{data.p2}</p>
              <p>{data.p3}</p>
              <p>{data.p4}</p>
            </div>
          </div>

          {/* Right Column: Info Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 text-center">
            <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-500 bg-slate-50 p-1 shadow-md">
              <img src="/images/logo-maberuk.jpg" alt="Logo Maberuk" className="h-full w-full rounded-full object-cover" />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">{data.title}</h3>
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">
              MAJU BERSAMA Usaha Mikro Kecil
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Kelurahan Babatan</p>

            <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Kecamatan</span>
                <span className="font-semibold text-slate-800">{data.kecamatan}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Kota</span>
                <span className="font-semibold text-slate-800">{data.kota}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-slate-50 to-emerald-50/30 p-8 border border-emerald-100 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {data.ctaDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl bg-[#10b981] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-[#059669]"
            >
              Lihat Direktori UMKM
            </Link>
            <a
              href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50"
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
