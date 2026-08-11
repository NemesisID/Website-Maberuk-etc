import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UmkmAdminApp } from "@/components/umkm/UmkmAdminApp";

export default async function UmkmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/masuk");
  }

  const { data: dbUser } = await supabase.from('users').select('role').eq('id', user.id).single();
  const isSuperAdmin = dbUser?.role === 'superadmin' || dbUser?.role === 'admin' || user.email === 'super@admin.com';

  if (isSuperAdmin) {
    redirect("/admin");
  }

  // Ambil data umkm milik user yang login berdasarkan email
  let { data: umkmData } = await supabase
    .from("umkm")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!umkmData) {
    const slug = `toko-${user.email.split('@')[0]}-${Math.random().toString(36).substring(2, 6)}`;
    const { data: newUmkm } = await supabase
      .from("umkm")
      .insert({
        id: user.id,
        slug: slug,
        name: `Toko ${user.email.split('@')[0]}`,
        owner: user.user_metadata?.name || user.email.split('@')[0],
        email: user.email,
        category: 'Lainnya',
        address: 'Babatan, Surabaya',
        active: true
      })
      .select()
      .single();
    
    if (newUmkm) {
      umkmData = newUmkm;
    }
  }

  let transactionsList = [];
  if (umkmData?.id) {
    const { getTransactions, getUmkmImages } = await import("@/app/admin/actions");
    transactionsList = await getTransactions(umkmData.id);
    
    const dbImages = await getUmkmImages(umkmData.id);
    if (dbImages && dbImages.length > 0) {
      const galleryImgs = dbImages.filter((img: any) => img.type === 'gallery').map((img: any) => ({
        src: img.url,
        caption: img.caption || 'Foto UMKM'
      }));
      if (galleryImgs.length > 0) {
        umkmData.gallery = galleryImgs;
      }
      const logoImg = dbImages.find((img: any) => img.type === 'logo');
      if (logoImg) {
        umkmData.logo_url = logoImg.url;
      }
    }
  }

  return <UmkmAdminApp user={user} umkmData={umkmData} initialTransactions={transactionsList} />;
}
