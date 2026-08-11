import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function check() {
  console.log("Mengecek user di auth.users...");
  const { data: { users }, error: authErr } = await supabase.auth.admin.listUsers();
  if (authErr) console.error("Auth error:", authErr);
  else console.log("User Auth:", users.map(u => ({ id: u.id, email: u.email })));

  console.log("\nMengecek tabel public.users...");
  const { data: publicUsers, error: tableErr } = await supabase.from('users').select('*');
  if (tableErr) {
    console.error("❌ Error membaca tabel public.users:", tableErr.message);
  } else {
    console.log("✅ Data public.users saat ini:", publicUsers);
  }
}

check();
