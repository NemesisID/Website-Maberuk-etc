import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import DirektoriClient from './DirektoriClient';

type Props = {
  searchParams: Promise<{ q?: string; kategori?: string; sort?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q;
  const kategori = params.kategori;

  let title = 'Direktori UMKM RW 05 Kelurahan Babatan Surabaya';
  let description = 'Jelajahi dan temukan aneka produk lokal, kuliner, kerajinan, dan jasa UMKM terbaik di RW 05 Babatan Surabaya.';

  if (q && kategori) {
    title = `Cari "${q}" dalam ${kategori} - Direktori UMKM Babatan`;
  } else if (q) {
    title = `Hasil Pencarian "${q}" - Direktori UMKM Babatan`;
  } else if (kategori) {
    title = `UMKM Kategori ${kategori} - Direktori Babatan`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function DirektoriPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialSearch = params.q || '';
  const initialCategory = params.kategori || 'Semua Kategori';
  const initialSort = params.sort || 'Default';

  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true).order('created_at', { ascending: false });
  const { data: categories } = await supabase.from('categories').select('name').order('id', { ascending: true });
  
  let initialUmkmList = dbUmkmList || [];

  // Prioritize real UMKMs before template UMKMs (Toko UMKM 1-25)
  const isTemplate = (u: any) => /^toko umkm \d+$/i.test(u.name?.trim() || '');
  initialUmkmList = [...initialUmkmList].sort((a, b) => {
    const aTemp = isTemplate(a);
    const bTemp = isTemplate(b);
    if (aTemp && !bTemp) return 1;
    if (!aTemp && bTemp) return -1;
    return 0;
  });

  const categoryList = categories?.map(c => c.name) || [];

  return (
    <DirektoriClient 
      initialUmkmList={initialUmkmList} 
      categories={categoryList}
      initialSearch={initialSearch}
      initialCategory={initialCategory}
      initialSort={initialSort}
    />
  );
}
