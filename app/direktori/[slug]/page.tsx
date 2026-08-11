import { notFound } from "next/navigation";
import { createClient } from '@/lib/supabase/server'
import { umkmList as mockUmkmList } from "@/data/umkm";
import DetailUmkmClient from "./DetailUmkmClient";

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DetailUmkmPage({ params }: Props) {
  const { slug } = await params;
  
  const supabase = await createClient();
  const { data: dbUmkm } = await supabase.from('umkm').select('*').eq('slug', slug).single();

  const umkm = dbUmkm || mockUmkmList.find((item) => item.slug === slug);

  if (!umkm) {
    notFound();
  }

  return <DetailUmkmClient umkm={umkm} />;
}
