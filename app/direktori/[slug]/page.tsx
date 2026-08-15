import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from '@/lib/supabase/server';
import DetailUmkmClient from "./DetailUmkmClient";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: umkm } = await supabase.from('umkm').select('*').eq('slug', slug).single();

  if (!umkm) {
    return {
      title: 'UMKM Tidak Ditemukan - Maberuk Babatan',
    };
  }

  const title = `${umkm.name} - UMKM ${umkm.category} Babatan`;
  const description = umkm.description || `Kunjungi profil ${umkm.name} di Direktori UMKM RW 05 Kelurahan Babatan Surabaya.`;
  const imageUrl = umkm.hero_image || (Array.isArray(umkm.gallery) && umkm.gallery[0]?.src) || '/globe.svg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DetailUmkmPage({ params }: Props) {
  const { slug } = await params;
  
  const supabase = await createClient();
  const { data: dbUmkm } = await supabase.from('umkm').select('*').eq('slug', slug).single();

  const umkm = dbUmkm;

  if (!umkm) {
    notFound();
  }

  return <DetailUmkmClient umkm={umkm} />;
}