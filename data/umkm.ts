export type Umkm = {
  slug: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  phoneDigits: string;
  address: string;
  product: string;
  qris: boolean;
  heroImage: string;
  gallery: { src: string; caption: string }[];
  social: { whatsapp: string; instagram: string; tiktok: string };
};

// Data disusun mengikuti storeList di halaman Direktori (24 toko).
// Foto pakai Loremflickr dengan keyword + lock yang sama persis dengan
// yang dipakai di halaman Direktori, supaya foto card & foto detail konsisten.

type StoreSeed = { slug: string; title: string; category: string; keyword: string; phoneDigits: string };

const seeds: StoreSeed[] = [
  { slug: "kue-tradisional-bu-sri", title: "Kue Tradisional Bu Sri", category: "Kuliner", keyword: "cake", phoneDigits: "6281200000001" },
  { slug: "kerajinan-kayu-pak-darto", title: "Kerajinan Kayu Pak Darto", category: "Kerajinan", keyword: "woodworking", phoneDigits: "6281200000002" },
  { slug: "batik-tenun-nusantara", title: "Batik & Tenun Nusantara", category: "Fashion", keyword: "textile", phoneDigits: "6281200000003" },
  { slug: "es-kelapa-segar", title: "Es Kelapa Segar", category: "Minuman", keyword: "coconut", phoneDigits: "6281200000004" },
  { slug: "warung-sembako-barokah", title: "Warung Sembako Barokah", category: "Sembako", keyword: "grocery", phoneDigits: "6281200000005" },
  { slug: "tas-anyaman-rotan", title: "Tas Anyaman Rotan", category: "Kerajinan", keyword: "basket", phoneDigits: "6281200000006" },
  { slug: "jajanan-pasar-legendaris", title: "Jajanan Pasar Legendaris", category: "Kuliner", keyword: "streetfood", phoneDigits: "6281200000007" },
  { slug: "salon-rias-cantika", title: "Salon & Rias Cantika", category: "Jasa", keyword: "salon", phoneDigits: "6281200000008" },
  { slug: "sayur-organik-segar", title: "Sayur Organik Segar", category: "Pertanian", keyword: "vegetables", phoneDigits: "6281200000009" },
  { slug: "servis-elektronik-jaya", title: "Servis Elektronik Jaya", category: "Jasa", keyword: "electronics", phoneDigits: "6281200000010" },
  { slug: "tanaman-hias-asri", title: "Tanaman Hias Asri", category: "Tanaman", keyword: "houseplant", phoneDigits: "6281200000011" },
  { slug: "katering-rumahan-ibu-nia", title: "Katering Rumahan Ibu Nia", category: "Kuliner", keyword: "catering", phoneDigits: "6281200000012" },
  { slug: "sate-ayam-pak-bowo", title: "Sate Ayam Pak Bowo", category: "Kuliner", keyword: "satay", phoneDigits: "6281200000013" },
  { slug: "ukiran-kayu-jati", title: "Ukiran Kayu Jati", category: "Kerajinan", keyword: "woodcarving", phoneDigits: "6281200000014" },
  { slug: "konveksi-pakaian-muslim", title: "Konveksi Pakaian Muslim", category: "Fashion", keyword: "tailor", phoneDigits: "6281200000015" },
  { slug: "jamu-tradisional-herbal", title: "Jamu Tradisional Herbal", category: "Minuman", keyword: "herbal", phoneDigits: "6281200000016" },
  { slug: "toko-kelontong-24-jam", title: "Toko Kelontong 24 Jam", category: "Sembako", keyword: "minimart", phoneDigits: "6281200000017" },
  { slug: "anyaman-bambu-kreatif", title: "Anyaman Bambu Kreatif", category: "Kerajinan", keyword: "bamboo", phoneDigits: "6281200000018" },
  { slug: "nasi-kucing-angkringan", title: "Nasi Kucing Angkringan", category: "Kuliner", keyword: "streetfood", phoneDigits: "6281200000019" },
  { slug: "laundry-kiloan-bersih", title: "Laundry Kiloan Bersih", category: "Jasa", keyword: "laundry", phoneDigits: "6281200000020" },
  { slug: "bibit-tanaman-buah", title: "Bibit Tanaman Buah", category: "Tanaman", keyword: "seedling", phoneDigits: "6281200000021" },
  { slug: "cuci-motor-mobil", title: "Cuci Motor & Mobil", category: "Jasa", keyword: "carwash", phoneDigits: "6281200000022" },
  { slug: "kopi-rakyat-babatan", title: "Kopi Rakyat Babatan", category: "Minuman", keyword: "coffee", phoneDigits: "6281200000023" },
  { slug: "kerupuk-rambak-renyah", title: "Kerupuk Rambak Renyah", category: "Kuliner", keyword: "cracker", phoneDigits: "6281200000024" },
];

export const umkmList: Umkm[] = seeds.map((s, i) => {
  const lock = i + 1;
  return {
    slug: s.slug,
    name: s.title,
    category: s.category,
    description: `UMKM ${s.title} adalah usaha warga Babatan di bidang ${s.category.toLowerCase()}, dikenal dengan kualitas dan pelayanan yang konsisten kepada pelanggan setianya.`,
    phone: `+62 812-${s.phoneDigits.slice(5, 9)}-${s.phoneDigits.slice(9)}`,
    phoneDigits: s.phoneDigits,
    address: "Babatan, Kec. Wiyung, Surabaya",
    product: s.category,
    qris: false,
    heroImage: `https://loremflickr.com/900/700/${s.keyword}?lock=${lock}`,
    gallery: [
      { src: `https://loremflickr.com/700/560/${s.keyword}?lock=${lock}1`, caption: `Produk unggulan ${s.title}` },
      { src: `https://loremflickr.com/700/560/${s.keyword}?lock=${lock}2`, caption: "Dibuat dengan bahan pilihan" },
      { src: `https://loremflickr.com/700/560/${s.keyword}?lock=${lock}3`, caption: "Favorit warga Babatan" },
    ],
    social: { whatsapp: `https://wa.me/${s.phoneDigits}`, instagram: "#", tiktok: "#" },
  };
});