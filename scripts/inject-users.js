const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ ERROR: NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const CATEGORIES = ["Makanan & Minuman", "Fashion & Pakaian", "Kerajinan Tangan", "Jasa & Servis", "Lainnya"];

async function createOwnerWithUmkm(i) {
  const email = `umkm${i}@gmail.com`;
  const password = "password123";
  const name = `Owner UMKM ${i}`;
  const storeName = `Toko UMKM ${i}`;
  const username = email;
  const slug = `toko-umkm-${i}`;
  const phone = `081234567${String(i).padStart(3, '0')}`;
  const category = CATEGORIES[(i - 1) % CATEGORIES.length];

  console.log(`\n[${i}/25] Memproses ${email}...`);

  // 1. Create or get Supabase Auth User
  let userId;
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (authError) {
    if (authError.message.includes('already registered') || authError.status === 422 || authError.code === 'email_exists') {
      console.log(`ℹ️ Auth user ${email} sudah terdaftar. Mengambil data user ID...`);
      // Fetch user list to get existing user ID
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      if (!listError && usersData?.users) {
        const existing = usersData.users.find(u => u.email === email);
        if (existing) {
          userId = existing.id;
          // Update password to ensure it's password123
          await supabase.auth.admin.updateUserById(userId, { password });
        }
      }
    } else {
      console.error(`❌ Gagal membuat auth user ${email}:`, authError.message);
    }
  } else if (authData?.user) {
    userId = authData.user.id;
    console.log(`✅ Auth user berhasil dibuat (ID: ${userId})`);
  }

  if (!userId) {
    console.error(`⚠️ Lewati pembuatan database row untuk ${email} karena User ID tidak ditemukan.`);
    return;
  }

  // 2. Insert/Upsert into table 'users'
  const { error: userError } = await supabase.from('users').upsert({
    id: userId,
    username: username,
    name: name,
    role: 'umkm',
    status: 'Aktif',
    password: password
  });

  if (userError) {
    console.error(`❌ Gagal upsert tabel users untuk ${email}:`, userError.message);
  } else {
    console.log(`  └─ Tabel 'users' ter-update`);
  }

  // 3. Insert/Upsert into table 'umkm'
  const { error: umkmError } = await supabase.from('umkm').upsert({
    id: userId,
    slug: slug,
    name: storeName,
    owner: name,
    phone: phone,
    phone_digits: phone.replace(/\D/g, ''),
    category: category,
    address: 'Babatan, Surabaya',
    active: true
  });

  if (umkmError) {
    console.error(`❌ Gagal upsert tabel umkm untuk ${email}:`, umkmError.message);
  } else {
    console.log(`  └─ Tabel 'umkm' (${storeName}) ter-update`);
  }
}

async function run() {
  console.log("==========================================");
  console.log("  Injeksi 25 User UMKM ke Supabase ");
  console.log("==========================================");
  console.log("Format Email : umkm1@gmail.com - umkm25@gmail.com");
  console.log("Password     : password123");

  for (let i = 1; i <= 25; i++) {
    await createOwnerWithUmkm(i);
  }

  console.log("\n==========================================");
  console.log("🎉 Injeksi 25 User UMKM Selesai!");
  console.log("==========================================");
}

run();
