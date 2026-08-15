"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client } from '@/lib/r2';

function getAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function getUploadUrl(filename: string, contentType: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized' };
  }

  const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  const fileKey = `uploads/${uniqueFilename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

  return { success: true, signedUrl, publicUrl, fileKey };
}

export async function uploadFileToR2(formData: FormData) {
  const supabase = await createClient();
  
  let user: any = null;
  try {
    const { data: userData } = await supabase.auth.getUser();
    user = userData?.user;
  } catch (e) {
    console.warn("getUser network check failed, falling back to session cookie:", e);
  }

  if (!user) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      user = sessionData?.session?.user || null;
    } catch (e) {
      console.warn("getSession fallback failed:", e);
    }
  }

  if (!user) {
    return { 
      success: false, 
      error: `Sesi login Supabase expired. Silakan logout lalu login kembali.` 
    };
  }

  const file = formData.get('file') as File;
  const folder = (formData.get('folder') as string) || 'uploads';
  const umkmId = formData.get('umkmId') as string;

  if (!file) {
    return { success: false, error: 'File tidak ditemukan' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const uniqueFilename = `${Date.now()}-${cleanName}`;
    const fileKey = `${folder}/${uniqueFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type || 'image/png',
    });

    await r2Client.send(command);

    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${fileKey}`
      : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${fileKey}`;

    // Auto Insert row into Supabase umkm_images table using Service Role Admin Client
    const adminSupabase = getAdminClient();
    
    let targetUmkmId = umkmId;
    if (!targetUmkmId && user?.id) {
      targetUmkmId = user.id;
    }

    if (folder !== 'prompts' && targetUmkmId) {
      const { data: existingStore } = await adminSupabase.from('umkm').select('id').eq('id', targetUmkmId).maybeSingle();
      
      if (!existingStore && user?.id) {
        const umkmName = `Toko ${user.user_metadata?.name || 'UMKM'}`;
        const baseSlug = umkmName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const slug = `${baseSlug || 'toko'}-${crypto.randomUUID().split('-')[0]}`;
        await adminSupabase.from('umkm').insert({
          id: targetUmkmId,
          slug: slug,
          name: umkmName,
          owner: user.user_metadata?.name || 'Owner',
          category: 'Lainnya',
          address: 'Babatan, Surabaya',
          active: true
        });
      }

      const imgType = folder.includes('logo') ? 'logo' : 'gallery';
      const caption = file.name.split('.')[0] || 'Foto UMKM';
      const { data: insertedData, error: dbErr } = await adminSupabase.from('umkm_images').insert({
        umkm_id: targetUmkmId,
        type: imgType,
        url: publicUrl,
        caption: caption,
        size_bytes: file.size
      }).select();

      if (dbErr) {
        console.error("Error saving record to umkm_images table in Supabase:", dbErr);
      } else {
        console.log("Successfully inserted image record to Supabase umkm_images:", insertedData);
      }
    }

    return { success: true, publicUrl, fileKey };
  } catch (error: any) {
    console.error("Error uploading to R2 via server action:", error);
    return { 
      success: false, 
      error: `Error Cloudflare R2 API: ${error.message || 'Cek R2_ACCESS_KEY_ID & R2_SECRET_ACCESS_KEY di .env.local'}` 
    };
  }
}

export async function saveSiteContent(key: string, value: any) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('site_content').upsert({ key, value });
  if (error) {
    console.error("Error saving site content:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertPrompt(prompt: any) {
  const adminSupabase = getAdminClient();
  const payload: any = {
    category: prompt.category,
    title: prompt.title,
    prompt: prompt.prompt,
    image: prompt.image,
    sort_order: prompt.sort_order || 0
  };

  // Ensure we don't pass Date.now() timestamp as a smallint/integer ID
  if (prompt.id && prompt.id < 1000000000) {
    payload.id = prompt.id;
  }

  const { data, error } = await adminSupabase.from('prompts').upsert(payload).select().single();
  if (error) {
    console.error("Error saving prompt:", error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function deletePrompt(id: number) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('prompts').delete().eq('id', id);
  if (error) {
    console.error("Error deleting prompt:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertUser(user: any) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('users').upsert(user);
  if (error) {
    console.error("Error saving user:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteUser(id: string) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('users').delete().eq('id', id);
  if (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertCategory(category: any) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('categories').upsert(category);
  if (error) {
    console.error("Error saving category:", error);
    return { success: false, error: error.message };
  }
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function deleteCategory(id: number) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('categories').delete().eq('id', id);
  if (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function createNewOwner(data: { name: string; username?: string; email?: string; password?: string; phone?: string; status?: string; storeName?: string }) {
  const adminSupabase = getAdminClient();

  let userId = crypto.randomUUID();
  const password = data.password && data.password.trim() ? data.password.trim() : 'password123';
  const usernameVal = (data.username || data.email || data.name).trim().toLowerCase().replace(/\s+/g, '');
  const authEmail = usernameVal.includes('@') ? usernameVal : `${usernameVal}@maberuk.com`;

  const { data: authUser, error: authError } = await adminSupabase.auth.admin.createUser({
    email: authEmail,
    password: password,
    email_confirm: true
  });

  if (!authError && authUser?.user) {
    userId = authUser.user.id;
  } else if (authError) {
    console.warn("Auth user creation info:", authError.message);
  }

  const { error: userError } = await adminSupabase.from('users').upsert({
    id: userId,
    username: usernameVal,
    name: data.name,
    role: 'umkm',
    status: data.status || 'Aktif',
    password: password
  });

  if (userError) {
    console.error("Error creating user record:", userError);
    return { success: false, error: userError.message };
  }

  const umkmName = data.storeName?.trim() || `Toko ${data.name.split(" ")[0]}`;
  const baseSlug = umkmName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = `${baseSlug || 'toko'}-${crypto.randomUUID().split('-')[0]}`;

  const { error: umkmError } = await adminSupabase.from('umkm').upsert({
    id: userId,
    slug: slug,
    name: umkmName,
    owner: data.name,
    phone: data.phone || '—',
    phone_digits: data.phone?.replace(/\D/g, '') || '',
    category: 'Lainnya',
    address: 'Babatan, Surabaya',
    active: data.status === 'Aktif',
    email: authEmail
  });

  if (umkmError) {
    console.error("Error creating umkm record:", umkmError);
  }

  return { success: true, userId, password };
}

export async function resetUserPassword(userId: string, newPassword?: string) {
  const adminSupabase = getAdminClient();
  const password = newPassword && newPassword.trim() ? newPassword.trim() : 'password123';

  try {
    await adminSupabase.auth.admin.updateUserById(userId, { password });
  } catch (e) {
    console.warn("Error updating user password in Supabase Auth:", e);
  }

  const { error } = await adminSupabase.from('users').update({ password }).eq('id', userId);
  if (error) {
    console.error("Error updating user password in DB:", error);
    return { success: false, error: error.message };
  }

  return { success: true, newPassword: password };
}

export async function deleteUmkmStore(id: string) {
  const adminSupabase = getAdminClient();
  const { error } = await adminSupabase.from('umkm').delete().eq('id', id);
  if (error) {
    console.error("Error deleting umkm store:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteFileFromR2(fileUrlOrKey: string) {
  if (!fileUrlOrKey) return { success: false, error: 'URL/Key tidak valid' };

  try {
    let fileKey = fileUrlOrKey;
    if (fileUrlOrKey.startsWith('http://') || fileUrlOrKey.startsWith('https://')) {
      try {
        const urlObj = new URL(fileUrlOrKey);
        fileKey = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
      } catch {
        fileKey = fileUrlOrKey;
      }
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    await r2Client.send(command);

    // Also delete record in Supabase umkm_images table
    const adminSupabase = getAdminClient();
    await adminSupabase.from('umkm_images').delete().eq('url', fileUrlOrKey);

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting file from R2:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUmkmProfile(umkmId: string, data: any) {
  const adminSupabase = getAdminClient();
  if (data.name) {
    data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  
  const heroImage = data.hero_image !== undefined ? data.hero_image : undefined;
  delete data.logo_url;

  const { error } = await adminSupabase.from('umkm').upsert({ id: umkmId, ...data });
  if (error) {
    console.error("Error updating UMKM profile:", error);
    return { success: false, error: error.message };
  }

  if (heroImage !== undefined) {
    await adminSupabase.from('users').update({ avatar: heroImage }).eq('id', umkmId);
  }

  return { success: true };
}

export async function getTransactions(umkmId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('umkm_id', umkmId)
    .order('date', { ascending: false });
  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
  return data;
}

export async function upsertTransaction(transaction: any) {
  const supabase = await createClient();
  let { error } = await supabase.from('transactions').upsert(transaction);
  
  if (error && (error.message?.includes('fetch failed') || error.message?.includes('ECONNRESET'))) {
    console.warn("Socket reset (ECONNRESET) detected, retrying upsertTransaction with Admin client...");
    await new Promise(r => setTimeout(r, 200));
    const adminSupabase = getAdminClient();
    const retryRes = await adminSupabase.from('transactions').upsert(transaction);
    error = retryRes.error;
  }

  if (error) {
    console.error("Error upserting transaction:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  let { error } = await supabase.from('transactions').delete().eq('id', id);
  
  if (error && (error.message?.includes('fetch failed') || error.message?.includes('ECONNRESET'))) {
    console.warn("Socket reset (ECONNRESET) detected, retrying deleteTransaction with Admin client...");
    await new Promise(r => setTimeout(r, 200));
    const adminSupabase = getAdminClient();
    const retryRes = await adminSupabase.from('transactions').delete().eq('id', id);
    error = retryRes.error;
  }

  if (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function addUmkmImage(umkmId: string, type: string, url: string, caption?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('umkm_images').insert({
    umkm_id: umkmId,
    type,
    url,
    caption: caption || 'Foto UMKM'
  }).select().single();

  if (error) {
    console.error("Error saving image to supabase:", error);
    return { success: false, error: error.message };
  }
  return { success: true, image: data };
}

export async function deleteUmkmImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('umkm_images').delete().eq('id', id);
  if (error) {
    console.error("Error deleting image from supabase:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function getUmkmImages(umkmId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('umkm_images')
    .select('*')
    .eq('umkm_id', umkmId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching umkm images:", error);
    return [];
  }
  return data;
}
