import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  const email = 'super@admin.com';
  const password = 'superadmin';

  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers();
  
  if (listErr) {
    console.error("Error list users:", listErr);
    return;
  }

  const existing = users.find(u => u.email === email);

  if (existing) {
    console.log(`User ${email} ditemukan. Mengupdate password...`);
    const { error: updateErr } = await supabase.auth.admin.updateUserById(existing.id, {
      password: password,
      email_confirm: true
    });
    if (updateErr) console.error("Error update password:", updateErr);
    else console.log(`✅ Password untuk ${email} berhasil direset menjadi: ${password}`);

    // Sync to public.users table if it exists
    await supabase.from('users').upsert({
      id: existing.id,
      email: email,
      name: 'Super Admin',
      role: 'admin',
      status: 'Aktif',
      password: password
    });
  } else {
    console.log(`User ${email} tidak ditemukan. Membuat baru...`);
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (createErr) console.error("Error create user:", createErr);
    else {
      console.log(`✅ User ${email} berhasil dibuat dengan password: ${password}`);
      if (newUser?.user) {
        await supabase.from('users').upsert({
          id: newUser.user.id,
          email: email,
          name: 'Super Admin',
          role: 'admin',
          status: 'Aktif',
          password: password
        });
      }
    }
  }
}

main();
