import type {
  AboutData,
  ChartData,
  HomeData,
  HomepageStore,
  PromptItem,
  RecommendationItem,
  SuperView,
  Transaction,
  UmkmAccount,
  UmkmView,
  UserItem,
} from "@/types";

export const umkmNavItems: Array<{ id: UmkmView; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "DB" },
  { id: "bookkeeping", label: "Pembukuan", icon: "BK" },
  { id: "reports", label: "Laporan", icon: "LP" },
  { id: "profile", label: "Profil", icon: "PR" },
];

export const superNavItems: Array<{ id: SuperView; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "DB" },
  { id: "umkm", label: "Kelola UMKM", icon: "UM" },
  { id: "users", label: "Kelola Pengguna", icon: "US" },
  { id: "website", label: "Kelola Website", icon: "WB" },
];

export const transactions: Transaction[] = [
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

export const monthlyIncome: ChartData[] = [
  { month: "Jul", value: 72 },
  { month: "Agt", value: 78 },
  { month: "Sep", value: 94 },
  { month: "Okt", value: 75 },
  { month: "Nov", value: 98 },
  { month: "Des", value: 112 },
];

export const monthlyExpense: ChartData[] = [
  { month: "Jul", value: 42 },
  { month: "Agt", value: 49 },
  { month: "Sep", value: 45 },
  { month: "Okt", value: 56 },
  { month: "Nov", value: 48 },
  { month: "Des", value: 64 },
];

export const superMonthlyUmkm: ChartData[] = [
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

export const summaryRows: string[][] = [
  ["Juli 2025", "Rp 8.000.000", "Rp 3.000.000", "Rp 5.000.000"],
  ["Agustus 2025", "Rp 8.500.000", "Rp 3.100.000", "Rp 5.400.000"],
  ["September 2025", "Rp 9.000.000", "Rp 2.900.000", "Rp 6.100.000"],
  ["Oktober 2025", "Rp 8.200.000", "Rp 3.500.000", "Rp 4.700.000"],
  ["November 2025", "Rp 9.500.000", "Rp 3.200.000", "Rp 6.300.000"],
  ["Desember 2025", "Rp 10.500.000", "Rp 3.800.000", "Rp 6.700.000"],
];

export const umkmAccounts: UmkmAccount[] = [
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

export const initialRecommendationsData: RecommendationItem[] = [
  {
    id: 1,
    name: "Toko Sari Rasa",
    category: "Makanan & Minuman",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80",
    owner: "Supriatna",
    rating: "4.9 ★",
    status: "Aktif • Rekomendasi Utama",
  },
  {
    id: 2,
    name: "Batik Sekar Arum",
    category: "Fashion & Pakaian",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80",
    owner: "Siti Rahma",
    rating: "4.8 ★",
    status: "Aktif • Rekomendasi Utama",
  },
  {
    id: 3,
    name: "Hiasan Jati Geometris",
    category: "Kerajinan Tangan",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80",
    owner: "Budi Santoso",
    rating: "4.7 ★",
    status: "Aktif • Rekomendasi Unggulan",
  },
  {
    id: 4,
    name: "Sambal Korek Bu Tedjo",
    category: "Makanan & Minuman",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=300&q=80",
    owner: "Bu Tedjo",
    rating: "4.9 ★",
    status: "Aktif • Rekomendasi Unggulan",
  },
];

export const defaultHomeData: HomeData = {
  heroTitle: "Platform Digital untuk",
  heroTitleHighlight: "UMKM Babatan",
  heroSubtitle:
    "Dukung dan temukan produk lokal dengan teknologi modern. Bantu usaha warga sekitar berkembang lewat direktori digital yang terstruktur dan sistem pembukuan terpadu.",
  heroImage: "https://images.unsplash.com/photo-1556742049-0a67daf64f42?auto=format&fit=crop&w=800&q=80",
  feature1Title: "Gratis & Mudah Digunakan",
  feature1Desc: "Tidak ada biaya tersembunyi. Buat profil tokomu dalam 5 menit langsung dari HP-mu.",
  feature2Title: "Pembukuan Digital",
  feature2Desc: "Catat Pemasukan dan Pengeluaran harian UMKM-mu tanpa rumit serta pantau keuangan secara otomatis.",
  feature3Title: "Jangkauan Lebih Luas",
  feature3Desc: "Produk tokomu dapat diakses oleh ribuan calon pelanggan lokal di area Babatan dan sekitarnya.",
};

export const homepageStoreList: HomepageStore[] = [
  { id: 1, name: "Toko Sari Rasa", category: "KULINER", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Kerajinan Kayu Babatan", category: "KERAJINAN", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Batik Sekar Arum", category: "BATIK & TENUN", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Minuman Segar Babatan", category: "MINUMAN LOKAL", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Warung Sembako Bu Tedjo", category: "WARUNG DAN SEMBAKO", image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Tas Kerajinan Arum", category: "TAS KERAJINAN", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Jajanan Pasar Traditional", category: "JAJANAN PASAR", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Salon & Rias Babatan", category: "SALON & RIAS", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80" },
  { id: 9, name: "Produk Pertanian Organik", category: "PRODUK PERTANIAN", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80" },
  { id: 10, name: "Servis Elektronik Babatan", category: "SERVIS ELEKTRONIK", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80" },
  { id: 11, name: "Tanaman Hias Asri", category: "TANAMAN HIAS", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80" },
  { id: 12, name: "Katering Ramadhan", category: "KATERING RAMADHAN", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80" },
];

export const sampleUsers: UserItem[] = [
  {
    id: 1,
    name: "Herman Adi",
    email: "herman.adi@gmail.com",
    role: "UMKM Owner",
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
    role: "UMKM Owner",
    status: "Aktif",
    registered: "20 Des 2025",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "Doni Prasetya",
    email: "doni.pras@gmail.com",
    role: "UMKM Owner",
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
    role: "UMKM Owner",
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

export const initialAboutData: AboutData = {
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
  ctaDescription:
    "Daftarkan usaha Anda ke Maberuk dan dapatkan akses pendampingan, pelatihan, serta jaringan pelaku UMK Babatan.",
  whatsapp: "0812-3456-7890",
};

export const defaultPromptsData: PromptItem[] = [
  {
    id: 1,
    category: "FOTO PRODUK",
    title: "Foto Produk Studio Minimalis",
    prompt:
      "Foto produk [nama produk] dengan latar belakang polos warna krem, pencahayaan lembut, sudut pandang eye-level, gaya fotografi komersial, resolusi tinggi, fokus tajam pada detail produk.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "KONTEN SOSIAL MEDIA",
    title: "Caption Promosi Produk UMKM",
    prompt:
      "Buatkan caption Instagram untuk promosi [nama produk] dari UMKM lokal Babatan, gunakan gaya bahasa santai dan ramah, sertakan call-to-action untuk pemesanan via WhatsApp.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "DESAIN LOGO",
    title: "Konsep Logo Usaha Kuliner",
    prompt:
      "Desain logo minimalis untuk usaha kuliner [makanan / minuman], kombinasi ikon sederhana yang merepresentasikan makanan lokal, warna hangat hijau & oranye, gaya modern.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: "POSTER PROMOSI",
    title: "Poster Bazar UMKM",
    prompt:
      "Buat desain poster promosi acara Bazar UMKM Babatan, tampilkan judul acara besar di bagian atas, ilustrasi produk-produk lokal seperti makanan dan kerajinan, warna cerah dan menarik.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: "FOTO PRODUK",
    title: "Foto Produk Flat Lay",
    prompt:
      "Foto flat lay (tampak atas) dari produk [nama produk] diatur rapi bersama bahan-bahan utama, aksesoris kayu, dan daun mint segar. Pencahayaan alami dari jendela.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: "DESAIN PRODUK",
    title: "Deskripsi Produk Marketplace",
    prompt:
      "Tuliskan deskripsi produk untuk [nama produk] yang akan diunggah ke marketplace, jelaskan bahan, ukuran, keunggulan, dan cara penyimpanan secara terstruktur agar mudah dibaca.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
];
