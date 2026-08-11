import { createClient } from '@/lib/supabase/server';
import PromptClient from './PromptClient';

export default async function PromptDirectoryPage() {
  const supabase = await createClient();
  const { data: dbPrompts } = await supabase.from('prompts').select('*').order('sort_order', { ascending: true });
  
  return <PromptClient initialPrompts={dbPrompts || []} />
}
