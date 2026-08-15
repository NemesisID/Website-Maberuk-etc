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

const REAL_UMKMS = [
  {
    name: "Es Cooter Mojito",
    slug: "es-cooter-mojito",
    email: "escootermojito@gmail.com",
    phone: "+62 8123-5475-434",
    address: "Jl. Babatan 1D/1 RT.06, RW.02, Babatan, Kec. Wiyung, Surabaya",
    category: "Makanan & Minuman",
    products: "Minuman Sirup",
    description: "UMKM Es Cooter Mojito adalah usaha mikro yang bergerak di bidang minuman segar, khususnya es sirup dengan berbagai varian rasa. Berlokasi di daerah Babatan, usaha ini dikenal dengan cita rasa unik dan tampilan menarik yang cocok dinikmati di cuaca panas. Es Cooter Mojito menjadi pilihan favorit warga sekitar, terutama karena harganya yang terjangkau dan pelayanan ramah dari penjualnya."
  },
  {
    name: "Buketku by Auya",
    slug: "buketku-by-auya",
    email: "buketkuauya@gmail.com",
    phone: "+62 856-0611-2895",
    address: "Jl. Babatan 1D/1 RT.06, RW.02, Babatan, Kec. Wiyung, Surabaya",
    category: "Kerajinan Tangan",
    products: "Bucket Balon, Bucket Uang, Bucket Snack, Bucket Bunga, Snack Tower, Snack Box, Surprise Box dll",
    description: "UMKM Buketku by Auya merupakan usaha kreatif yang bergerak di bidang pembuatan dan penjualan buket bunga cantik untuk berbagai keperluan, seperti hadiah ulang tahun, wisuda, dan momen spesial lainnya. Berlokasi di Babatan, usaha ini dikenal dengan desain buket yang estetik, harga bersahabat, serta pelayanan custom sesuai permintaan pelanggan. Buketku by Auya menjadi pilihan andalan masyarakat Babatan dalam mengekspresikan kasih sayang melalui rangkaian bunga."
  },
  {
    name: "Auya Hijab Store",
    slug: "auya-hijab-store",
    email: "auyahijab@gmail.com",
    phone: "+62 856-0611-2895",
    address: "Jl. Babatan 1D/1 RT.06, RW.02, Babatan, Kec. Wiyung, Surabaya",
    category: "Fashion & Pakaian",
    products: "Hijab, Gamis Grosir & Eceran",
    description: "Tampil syar’i dan stylish dengan koleksi hijab dan gamis dari Auya Hijab Store. Menyediakan berbagai model terkini untuk grosir dan eceran, cocok untuk kebutuhan harian maupun usaha reseller Anda."
  },
  {
    name: "Njajan Rek",
    slug: "njajan-rek",
    email: "njajanrek@gmail.com",
    phone: "+62 822-0825-2828",
    address: "Dukuh Karangan IV/4, Babatan, Kec. Wiyung, Surabaya",
    category: "Makanan & Minuman",
    products: "Pentol kriwil, tahu bakso topping, batagor, wonton chili, bakso bakar mentai, kebab jumbo, hingga jasuke",
    description: "UMKM Njajan Rek adalah usaha kreatif yang menyajikan beragam jajanan kekinian dengan cita rasa khas yang menggugah selera. Mulai dari pentol kriwil, tahu bakso topping, batagor, wonton chili, bakso bakar mentai, kebab jumbo, hingga jasuke, semua diolah dengan bahan berkualitas dan racikan bumbu spesial yang pas di lidah. Setiap menu dirancang untuk menjadi teman camilan yang nikmat di segala suasana—baik saat bersantai, berkumpul, maupun menemani waktu istirahat. Dengan rasa yang autentik, porsi memuaskan, serta harga yang ramah di kantong, Njajan Rek menjadi favorit masyarakat yang ingin menikmati jajanan lezat, praktis, dan kekinian dalam setiap gigitan."
  },
  {
    name: "Pinky Cooking",
    slug: "pinky-cooking",
    email: "pinkycooking@gmail.com",
    phone: "+62 8121-7795-855",
    address: "Jl. Raya Menganti Babatan Gg. I No.58, Kec. Wiyung, Surabaya",
    category: "Makanan & Minuman",
    products: "Makanan ringan dan kue",
    description: "Pinky Cooking menyediakan aneka kue dan camilan rumahan yang lezat, higienis, dan terjangkau! Kami menyediakan berbagai pilihan bolen pisang, donat, risol, hingga bubur tradisional dengan rasa istimewa dan tampilan menggoda. Semua produk 100% home made, cocok untuk santapan harian, hantaran, hingga acara spesial."
  },
  {
    name: "Rasaruma",
    slug: "rasaruma",
    email: "rasaruma@gmail.com",
    phone: "+62 852-1805-0211",
    address: "Babatan Indah B3/3, Surabaya",
    category: "Makanan & Minuman",
    products: "Catering",
    description: "UMKM Rasaruma merupakan usaha kuliner rumahan yang bergerak di bidang jasa Catering, melayani aneka masakan rumahan hingga menu prasmanan untuk berbagai acara. Berlokasi di Babatan Indah B3/3 Surabaya, Rasaruma dikenal dengan cita rasa masakan yang lezat, porsi yang mengenyangkan, serta harga yang terjangkau. Dengan bahan-bahan segar dan olahan yang higienis, Rasaruma siap memenuhi kebutuhan konsumsi harian maupun pesanan untuk acara seperti arisan, ulang tahun, pengajian, hingga catering mingguan. Pelayanan yang ramah dan fleksibel dalam pemesanan menjadikan Rasaruma pilihan andalan warga sekitar untuk solusi makanan praktis dan nikmat."
  },
  {
    name: "Poenya Mami",
    slug: "poenya-mami",
    email: "poenyamami@gmail.com",
    phone: "0858-5222-1190",
    address: "Babatan Indah VII Blok A9 No. 14, Babatan, Wiyung",
    category: "Makanan & Minuman",
    products: "Lauk Kering",
    description: "UMKM Poenya Mami merupakan usaha mikro yang bergerak di bidang kuliner tradisional, berlokasi di Babatan Indah A9/14. UMKM ini menghadirkan berbagai produk olahan makanan khas Indonesia seperti abon, bumbu pecel, dan srundeng yang dibuat secara rumahan dengan menjaga kualitas rasa dan bahan. Setiap produk diolah dengan resep turun-temurun yang kaya rempah, memberikan cita rasa autentik yang cocok sebagai pelengkap lauk atau stok makanan siap saji di rumah. Dengan kemasan yang praktis dan higienis, produk dari Poenya Mami tak hanya cocok untuk konsumsi pribadi tetapi juga bisa menjadi oleh-oleh khas yang menggugah selera."
  },
  {
    name: "Dapur Bu Moel",
    slug: "dapur-bu-moel",
    email: "dapurbumoel@gmail.com",
    phone: "+62 856-4813-3600",
    address: "Jl. Babatan Tengah Gg. III No.18",
    category: "Makanan & Minuman",
    products: "Roti & Kue",
    description: "UMKM Dapur Bu Moel merupakan usaha rumahan yang bergerak di bidang kuliner, khususnya dalam pembuatan dan penjualan kue kering, roti, serta aneka kue tradisional dan kekinian. Berlokasi di Jl. Babatan Tengah Gg. III No.18 Surabaya, Dapur Bu Moel dikenal dengan cita rasa autentik, tampilan kue yang menarik, serta harga yang ramah di kantong. Dengan bahan-bahan pilihan dan tanpa pengawet, setiap produk dibuat secara fresh dan higienis."
  },
  {
    name: "CeRita Rasa",
    slug: "cerita-rasa",
    email: "ceritarasa@gmail.com",
    phone: "+62 812-3590-9767",
    address: "Babatan Indah B8/8, Babatan, Kec. Wiyung, Surabaya",
    category: "Makanan & Minuman",
    products: "Makanan",
    description: "UMKM CeRita Rasa adalah usaha kreatif yang menghadirkan aneka kue basah manis dan asin dengan sentuhan rasa khas rumahan yang menggugah selera. Berbasis di Babatan, usaha ini tumbuh sebagai sahabat setia dalam menyempurnakan berbagai momen dari sekadar camilan santai hingga suguhan di acara penting. Dikenal karena rasa yang autentik, tampilan menarik, dan pelayanan yang fleksibel sesuai kebutuhan pelanggan, CeRita Rasa menjadi pilihan utama warga Babatan yang mencari paduan cita rasa dan kehangatan dalam setiap gigitan."
  },
  {
    name: "Ide Que",
    slug: "ide-que",
    email: "ideque@gmail.com",
    phone: "+62 838-3146-0059",
    address: "Jl. Babatan Indah VI Blok A11 No.8, Kec. Wiyung, Surabaya",
    category: "Makanan & Minuman",
    products: "Sinom, Saridele",
    description: "UMKM Ide Que merupakan pelaku usaha minuman tradisional yang berlokasi di Babatan Indah A11/8 dan mengangkat potensi bahan alami Indonesia sebagai produk unggulan. Fokus utamanya adalah memproduksi sinom dan saridele rasa jahe, dua jenis minuman sehat yang menggabungkan khasiat herbal dengan rasa yang nikmat. Sinom, dengan rasa segarnya yang khas, cocok diminum saat cuaca panas atau sebagai penambah stamina, sedangkan saridele jahe menawarkan kombinasi susu kedelai dan rempah jahe yang hangat, cocok untuk menjaga kesehatan tubuh."
  }
];

async function injectRealUmkm(item, index, total) {
  const password = "password123";
  console.log(`\n[${index + 1}/${total}] Memproses UMKM: ${item.name} (${item.email})...`);

  // 1. Create or fetch Auth user
  let userId;
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: item.email,
    password: password,
    email_confirm: true,
  });

  if (authError) {
    if (authError.message.includes('already registered') || authError.status === 422 || authError.code === 'email_exists') {
      console.log(`ℹ️ Auth user ${item.email} sudah terdaftar. Mengambil user ID...`);
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      if (!listError && usersData?.users) {
        const existing = usersData.users.find(u => u.email === item.email);
        if (existing) {
          userId = existing.id;
          await supabase.auth.admin.updateUserById(userId, { password });
        }
      }
    } else {
      console.error(`❌ Gagal membuat auth user ${item.email}:`, authError.message);
    }
  } else if (authData?.user) {
    userId = authData.user.id;
    console.log(`✅ Auth user berhasil dibuat (ID: ${userId})`);
  }

  if (!userId) {
    console.error(`⚠️ Lewati pembuatan database row untuk ${item.name} karena User ID tidak ditemukan.`);
    return;
  }

  // 2. Insert/Upsert into 'users' table
  const { error: userError } = await supabase.from('users').upsert({
    id: userId,
    username: item.email,
    name: item.name,
    role: 'umkm',
    status: 'Aktif',
    password: password
  });

  if (userError) {
    console.error(`❌ Gagal upsert tabel users untuk ${item.name}:`, userError.message);
  } else {
    console.log(`  └─ Tabel 'users' ter-update`);
  }

  // 3. Insert/Upsert into 'umkm' table
  const { error: umkmError } = await supabase.from('umkm').upsert({
    id: userId,
    slug: item.slug,
    name: item.name,
    owner: item.name,
    phone: item.phone,
    phone_digits: item.phone.replace(/\D/g, ''),
    category: item.category,
    address: item.address,
    description: item.description,
    active: true
  });

  if (umkmError) {
    console.error(`❌ Gagal upsert tabel umkm untuk ${item.name}:`, umkmError.message);
  } else {
    console.log(`  └─ Tabel 'umkm' (${item.name}) ter-update`);
  }
}

async function run() {
  console.log("==========================================");
  console.log("  Injeksi 10 UMKM Real Babatan ke Supabase");
  console.log("==========================================");

  for (let i = 0; i < REAL_UMKMS.length; i++) {
    await injectRealUmkm(REAL_UMKMS[i], i, REAL_UMKMS.length);
  }

  console.log("\n==========================================");
  console.log("🎉 Injeksi 10 UMKM Real Selesai!");
  console.log("==========================================");
}

run();
