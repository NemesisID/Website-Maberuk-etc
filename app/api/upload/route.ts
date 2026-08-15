import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    let user: any = null;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      user = data?.user;
    } catch (e) {
      console.warn("Auth check in upload route fallback:", e);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';
    const umkmId = (formData.get('umkmId') as string) || user?.id;

    if (!file) {
      return NextResponse.json({ success: false, error: 'File tidak ditemukan' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const uniqueFilename = `${Date.now()}-${cleanName}`;
    const fileKey = `${folder}/${uniqueFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type || 'image/jpeg',
    });

    await r2Client.send(command);

    const publicUrl = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${fileKey}`
      : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${fileKey}`;

    // Auto Insert row into Supabase umkm_images table
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && umkmId) {
      try {
        const adminSupabase = createSupabaseAdmin(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const imgType = folder.includes('logo') ? 'logo' : 'gallery';
        const caption = file.name.split('.')[0] || 'Foto UMKM';
        await adminSupabase.from('umkm_images').insert({
          umkm_id: umkmId,
          type: imgType,
          url: publicUrl,
          caption: caption,
          size_bytes: file.size
        });
      } catch (err) {
        console.warn('umkm_images log failed:', err);
      }
    }

    return NextResponse.json({ success: true, publicUrl, fileKey });
  } catch (error: any) {
    console.error('Error uploading to R2 via /api/upload:', error);
    return NextResponse.json({ 
      success: false, 
      error: `Error Cloudflare R2: ${error?.message || 'Gagal mengupload file'}` 
    }, { status: 500 });
  }
}
