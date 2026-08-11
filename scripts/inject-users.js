import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ ERROR: NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env.local");
  console.error("Dapatkan SUPABASE_SERVICE_ROLE_KEY di menu Supabase: Project Settings -> API -> service_role (secret)");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser(email, password) {
  console.log(`Menginjeksi user ${email}...`);
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes('already registered')) {
      console.log(`✅ User ${email} sudah ada di database.`);
    } else {
      console.error(`❌ Gagal membuat user ${email}:`, error.message);
    }
  } else {
    console.log(`✅ Berhasil membuat user: ${email}`);
  }
}

async function run() {
  console.log("Memulai injeksi pengguna ke Supabase Auth...\n");

  await createAdminUser('super@admin.com', 'superadmin');
  await createAdminUser('umkm@admin.com', 'adminumkm');

  console.log("\nSelesai! Silakan login di http://localhost:3000/masuk");
}

run();
