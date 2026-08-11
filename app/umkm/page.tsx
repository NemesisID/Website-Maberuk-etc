import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UmkmAdminApp } from "@/components/umkm/UmkmAdminApp";

export default async function UmkmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/masuk");
  }

  const { data: dbUser } = await supabase.from('users').select('role, username, name').eq('id', user.id).single();
  const isSuperAdmin = dbUser?.role === 'superadmin' || dbUser?.role === 'admin';

  if (isSuperAdmin) {
    redirect("/admin");
  }

  // Ambil data umkm milik user yang login berdasarkan id
  let { data: umkmData } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!umkmData && dbUser?.username) {
    let { data: byUsername } = await supabase
      .from("umkm")
      .select("*")
      .eq("username", dbUser.username)
      .single();
    if (byUsername) umkmData = byUsername;
  }

  if (!umkmData) {
    const defaultUsername = dbUser?.username || user.email?.split('@')[0] || 'user';
    const umkmName = `Toko ${dbUser?.name || defaultUsername}`;
    const baseSlug = umkmName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = baseSlug || `toko-${user.id.substring(0, 6)}`;
    const { data: newUmkm, error: createErr } = await supabase
      .from("umkm")
      .insert({
        id: user.id,
        slug: slug,
        name: umkmName,
        owner: dbUser?.name || defaultUsername,
        username: defaultUsername,
        category: 'Lainnya',
        address: 'Babatan, Surabaya',
        active: true
      })
      .select()
      .single();
    
    if (newUmkm) {
      umkmData = newUmkm;
    } else {
      console.warn("Auto-create UMKM note:", createErr?.message);
      umkmData = {
        id: user.id,
        slug: slug,
        name: umkmName,
        owner: dbUser?.name || defaultUsername,
        username: defaultUsername,
        category: 'Lainnya',
        address: 'Babatan, Surabaya',
        active: true
      };
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

  const { data: categories } = await supabase.from('categories').select('name').order('id', { ascending: true });
  const categoryList = categories?.map(c => c.name) || [];

  return <UmkmAdminApp user={user} umkmData={umkmData} initialTransactions={transactionsList} categories={categoryList} />;
}
