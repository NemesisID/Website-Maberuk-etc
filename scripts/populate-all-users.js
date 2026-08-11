import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function populate() {
  console.log("Mengambil semua user dari Auth...");
  const { data: { users } } = await supabase.auth.admin.listUsers();

  for (const user of users) {
    let role = 'umkm';
    let name = user.email.split('@')[0];
    let pwd = 'password123';

    if (user.email === 'super@admin.com' || user.email.includes('admin')) {
      role = 'superadmin';
      name = 'Super Admin';
      pwd = 'superadmin';
    }

    console.log(`Menginjeksi ke public.users: ${user.email} (Role: ${role})...`);
    
    // First try with password field
    let { error } = await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      name: name,
      role: role,
      status: 'Aktif',
      password: pwd
    });

    if (error && error.message.includes('password')) {
      console.log("Column password belum ada di tabel, mencoba tanpa column password...");
      const res = await supabase.from('users').upsert({
        id: user.id,
        email: user.email,
        name: name,
        role: role,
        status: 'Aktif'
      });
      error = res.error;
    }

    if (error) {
      console.error(`❌ Gagal insert ${user.email}:`, error.message);
    } else {
      console.log(`✅ Berhasil sync ${user.email} ke public.users!`);
    }
  }

  console.log("\nCek isi public.users sekarang:");
  const { data: result } = await supabase.from('users').select('*');
  console.log(result);
}

populate();
