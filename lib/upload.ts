import { uploadFileToR2 } from '@/app/admin/actions';

export async function uploadImageFile(formData: FormData): Promise<{ success: boolean; publicUrl?: string; fileKey?: string; error?: string }> {
  // 1. Try direct API Route first (no Server Action serialization overhead, handles large files reliably)
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data;
      }
      if (data.error) {
        console.warn('/api/upload returned error, trying server action fallback:', data.error);
      }
    }
  } catch (apiErr) {
    console.warn('/api/upload fetch error, trying server action fallback:', apiErr);
  }

  // 2. Fallback to Server Action
  try {
    const res = await uploadFileToR2(formData);
    return res;
  } catch (actionErr: any) {
    console.error('Server action upload failed:', actionErr);
    return { success: false, error: actionErr?.message || 'Gagal mengupload gambar ke server' };
  }
}
