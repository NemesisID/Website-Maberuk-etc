import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SuperAdminApp } from "@/components/admin/SuperAdminApp";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/masuk");
  }

  // Fetch real data
  const { data: umkmList } = await supabase.from('umkm').select('*').order('created_at', { ascending: false });
  const { data: promptsList } = await supabase.from('prompts').select('*').order('sort_order', { ascending: true });
  const { data: contentList } = await supabase.from('site_content').select('*');

  return (
    <SuperAdminApp 
      user={user}
      initialUmkmList={umkmList || []}
      initialPromptsList={promptsList || []}
      initialContentList={contentList || []}
    />
  );
}
