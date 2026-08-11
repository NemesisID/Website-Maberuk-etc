import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true).limit(12);
  
  const initialUmkmList = dbUmkmList || [];

  return <HomeClient initialUmkmList={initialUmkmList} />
}
