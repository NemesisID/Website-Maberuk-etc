export type AppMode = "super" | "umkm";
export type UmkmView = "dashboard" | "bookkeeping" | "reports" | "profile";
export type SuperView = "dashboard" | "umkm" | "website" | "users";

export interface Transaction {
  date: string;
  type: string;
  category: string;
  note: string;
  amount: string;
  status: string;
}

export interface ChartData {
  month: string;
  value: number;
}

export interface UmkmAccount {
  name: string;
  owner: string;
  phone: string;
  status: "Aktif" | "Nonaktif";
  joined: string;
  category: string;
  address: string;
  products: number;
  revenue: string;
}

export interface RecommendationItem {
  id: number;
  name: string;
  category: string;
  image: string;
  owner: string;
  rating: string;
  status: string;
}

export interface HomeData {
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroImage: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
}

export interface HomepageStore {
  id: number;
  name: string;
  category: string;
  image: string;
}

export interface UserItem {
  id: number | string;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  registered: string;
  avatar: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  sectionTitle: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  kecamatan: string;
  kota: string;
  ctaTitle: string;
  ctaDescription: string;
  whatsapp: string;
}

export interface PromptItem {
  id: number;
  category: string;
  title: string;
  prompt: string;
  image: string;
}
