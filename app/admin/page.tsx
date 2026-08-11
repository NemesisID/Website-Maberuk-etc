import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SuperAdminApp } from "@/components/admin/SuperAdminApp";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/masuk");
  }

  const { data: dbUser } = await supabase.from('users').select('role').eq('id', user.id).single();
  const isSuperAdmin = dbUser?.role === 'superadmin' || dbUser?.role === 'admin';

  if (!isSuperAdmin) {
    redirect("/umkm");
  }

  const { data: umkmList } = await supabase.from('umkm').select('*').order('created_at', { ascending: false });
  const { data: promptsList } = await supabase.from('prompts').select('*').order('sort_order', { ascending: true });
  const { data: contentList } = await supabase.from('site_content').select('*');
  const { data: usersList } = await supabase.from('users').select('*').order('created_at', { ascending: false });
  const { data: categoriesList } = await supabase.from('categories').select('*').order('id', { ascending: true });

  return (
    <SuperAdminApp 
      user={user}
      initialUmkmList={umkmList || []}
      initialPromptsList={promptsList || []}
      initialContentList={contentList || []}
      initialUsersList={usersList || []}
      initialCategoriesList={categoriesList || []}
    />
  );
}
