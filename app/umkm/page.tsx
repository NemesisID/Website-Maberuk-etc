import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UmkmAdminApp } from "@/components/umkm/UmkmAdminApp";

export default async function UmkmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/masuk");
  }

  const { data: dbUser } = await supabase.from('users').select('role').eq('id', user.id).single();

  if (dbUser?.role === 'superadmin') {
    redirect("/admin");
  }

  // Ambil data umkm milik user yang login berdasarkan email
  const { data: umkmData } = await supabase
    .from("umkm")
    .select("*")
    .eq("email", user.email)
    .single();

  return <UmkmAdminApp user={user} umkmData={umkmData} />;
}
