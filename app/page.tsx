import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const supabase = await createClient();
  const { data: dbUmkmList } = await supabase.from('umkm').select('*').eq('active', true);
  const { data: homeRecData } = await supabase.from('site_content').select('value').eq('key', 'home_recommendations').single();
  
  let initialUmkmList = dbUmkmList || [];

  if (homeRecData?.value && Array.isArray(homeRecData.value) && homeRecData.value.length > 0) {
    const orderedIds = homeRecData.value.map((item: any) => item.id);
    const orderedList = [];
    for (const id of orderedIds) {
      const found = initialUmkmList.find(u => u.id === id);
      if (found) orderedList.push(found);
    }
    for (const u of initialUmkmList) {
      if (!orderedIds.includes(u.id)) orderedList.push(u);
    }
    initialUmkmList = orderedList;
  }

  return <HomeClient initialUmkmList={initialUmkmList} />
}
