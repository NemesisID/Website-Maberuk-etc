import { createClient } from '@/lib/supabase/server'
import DirektoriClient from './DirektoriClient'

export default async function DirektoriPage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true);
  const { data: categories } = await supabase.from('categories').select('name').order('id', { ascending: true });
  
  const initialUmkmList = dbUmkmList || [];
  const categoryList = categories?.map(c => c.name) || [];

  return <DirektoriClient initialUmkmList={initialUmkmList} categories={categoryList} />
}
