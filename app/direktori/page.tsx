import { createClient } from '@/lib/supabase/server'
import DirektoriClient from './DirektoriClient'
import { umkmList as mockUmkmList } from '@/data/umkm'

export default async function DirektoriPage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true);
  
  // Use DB data if available, fallback to mock data
  const initialUmkmList = (dbUmkmList && dbUmkmList.length > 0) ? dbUmkmList : mockUmkmList;

  return <DirektoriClient initialUmkmList={initialUmkmList} />
}
