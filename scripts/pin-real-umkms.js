const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ ERROR: Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const REAL_SLUGS = [
  "es-cooter-mojito",
  "buketku-by-auya",
  "auya-hijab-store",
  "njajan-rek",
  "pinky-cooking",
  "rasaruma",
  "poenya-mami",
  "dapur-bu-moel",
  "cerita-rasa",
  "ide-que"
];

async function pinRealUmkms() {
  console.log("==========================================");
  console.log("  Memposisikan 10 UMKM Real di Depan");
  console.log("==========================================");

  // 1. Fetch all UMKMs
  const { data: allUmkms, error } = await supabase.from('umkm').select('*');
  if (error) {
    console.error("❌ Error fetching umkm:", error.message);
    return;
  }

  const realUmkms = [];
  const now = new Date();

  // 2. Update created_at timestamp for real UMKMs so they have recent timestamps
  for (let i = 0; i < REAL_SLUGS.length; i++) {
    const slug = REAL_SLUGS[i];
    const found = allUmkms.find(u => u.slug === slug);
    if (found) {
      realUmkms.push(found);
      // Touch timestamp with 1 minute offset so order is preserved
      const newTimestamp = new Date(now.getTime() - (REAL_SLUGS.length - i) * 60000).toISOString();
      await supabase.from('umkm').update({ created_at: newTimestamp }).eq('id', found.id);
      console.log(`✅ [${i + 1}/10] ${found.name} diposisikan di depan.`);
    }
  }

  // 3. Update site_content home_recommendations to contain the 10 real UMKMs
  const recValues = realUmkms.map(u => ({
    id: u.id,
    name: u.name,
    category: u.category,
    image: u.hero_image || u.logo_url || "/logo-maberuk.webp",
    owner: u.owner,
    rating: "5.0",
    status: "Buka"
  }));

  const { error: contentErr } = await supabase.from('site_content').upsert({
    key: 'home_recommendations',
    value: recValues
  });

  if (contentErr) {
    console.error("❌ Error updating home_recommendations:", contentErr.message);
  } else {
    console.log("\n✅ Rekomendasi Landing Page (Toko Unggulan) berhasil diperbarui untuk menampilkan 10 UMKM Real!");
  }

  console.log("\nSelesai!");
}

pinRealUmkms();
