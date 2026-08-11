import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'
import { umkmList as mockUmkmList } from '@/data/umkm'

export default async function HomePage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true).limit(12);
  
  // Use DB data if available, fallback to mock data
  const initialUmkmList = (dbUmkmList && dbUmkmList.length > 0) ? dbUmkmList : mockUmkmList;

  return <HomeClient initialUmkmList={initialUmkmList} />
}
