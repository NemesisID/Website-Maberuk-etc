const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultPromptsData = [
  { category: "FOTO PRODUK", title: "Foto Produk Studio Minimalis", prompt: "Foto produk [nama produk] dengan latar belakang polos warna krem...", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80", sort_order: 1 },
  { category: "KONTEN SOSIAL MEDIA", title: "Caption Promosi Produk UMKM", prompt: "Buatkan caption Instagram untuk promosi [nama produk] dari UMKM lokal Babatan...", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", sort_order: 2 },
  { category: "DESAIN LOGO", title: "Konsep Logo Usaha Kuliner", prompt: "Desain logo minimalis untuk usaha kuliner [makanan / minuman]...", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", sort_order: 3 },
  { category: "POSTER PROMOSI", title: "Poster Bazar UMKM", prompt: "Buat desain poster promosi acara Bazar UMKM Babatan...", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80", sort_order: 4 },
  { category: "FOTO PRODUK", title: "Foto Produk Flat Lay", prompt: "Foto flat lay (tampak atas) dari produk [nama produk]...", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", sort_order: 5 },
  { category: "DESAIN PRODUK", title: "Deskripsi Produk Marketplace", prompt: "Tuliskan deskripsi produk untuk [nama produk] yang akan diunggah ke marketplace...", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", sort_order: 6 },
];

const initialAboutData = {
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

const initialRecommendationsData = [
  { id: 1, name: "Kripik Tempe Mang Oyo", category: "MAKANAN & MINUMAN", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=500&q=80", owner: "Bpk. Oyo", rating: "4.9", status: "Aktif" },
  { id: 2, name: "Batik Tulis Babatan", category: "FASHION & PAKAIAN", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=500&q=80", owner: "Ibu Rahmawati", rating: "4.8", status: "Aktif" },
  { id: 3, name: "Kerajinan Anyaman Bambu", category: "KERAJINAN TANGAN", image: "https://images.unsplash.com/photo-1516942978393-27157bc1e5f8?auto=format&fit=crop&w=500&q=80", owner: "Bpk. Slamet", rating: "4.7", status: "Aktif" },
  { id: 4, name: "Kopi Susu Aren Gula Merah", category: "MAKANAN & MINUMAN", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80", owner: "Mas Budi", rating: "4.9", status: "Aktif" },
  { id: 5, name: "Konveksi Kaos Polos", category: "FASHION & PAKAIAN", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80", owner: "Ibu Siti", rating: "4.6", status: "Aktif" },
  { id: 6, name: "Jasa Servis Elektronik", category: "JASA & LAINNYA", image: "https://images.unsplash.com/photo-1581092921461-7d312003c27e?auto=format&fit=crop&w=500&q=80", owner: "Bpk. Joko", rating: "4.8", status: "Aktif" },
];

async function run() {
  console.log("Memulai injeksi data CMS (prompts, about, home) ke Supabase...");

  // Injeksi Prompts
  const { error: promptsErr } = await supabase.from('prompts').upsert(
    defaultPromptsData.map(p => ({ ...p, id: p.sort_order })) // use sort_order as ID for simplicity
  );
  if (promptsErr) {
    console.error("Gagal insert prompts:", promptsErr);
  } else {
    console.log("✅ Prompts diinjeksikan.");
  }

  // Injeksi Site Content
  const { error: aboutErr } = await supabase.from('site_content').upsert({
    key: 'about_page',
    value: initialAboutData
  });
  if (aboutErr) {
    console.error("Gagal insert about_page:", aboutErr);
  } else {
    console.log("✅ about_page diinjeksikan.");
  }

  const { error: homeErr } = await supabase.from('site_content').upsert({
    key: 'home_recommendations',
    value: initialRecommendationsData
  });
  if (homeErr) {
    console.error("Gagal insert home_recommendations:", homeErr);
  } else {
    console.log("✅ home_recommendations diinjeksikan.");
  }

  console.log("Selesai!");
}

run();
