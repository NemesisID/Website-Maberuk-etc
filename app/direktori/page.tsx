import { createClient } from '@/lib/supabase/server'
import DirektoriClient from './DirektoriClient'

export default async function DirektoriPage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true);
  
  const initialUmkmList = dbUmkmList || [];

  return <DirektoriClient initialUmkmList={initialUmkmList} />
}
