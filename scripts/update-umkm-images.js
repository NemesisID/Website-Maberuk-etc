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

const REAL_UMKM_IMAGES = [
  { slug: "es-cooter-mojito", image: "/images/cooter.jpg" },
  { slug: "buketku-by-auya", image: "/images/buketku.jpg" },
  { slug: "auya-hijab-store", image: "/images/auya hijab.jpg" },
  { slug: "njajan-rek", image: "/images/njajan rek.jpg" },
  { slug: "pinky-cooking", image: "/images/pink cooking.jpg" },
  { slug: "rasaruma", image: "/images/rasaruma.jpg" },
  { slug: "poenya-mami", image: "/images/poenya mami.png" },
  { slug: "dapur-bu-moel", image: "/images/dapur bu moel.jpg" },
  { slug: "cerita-rasa", image: "/images/cerita rasa.jpg" },
  { slug: "ide-que", image: "/images/Sari kedelai.png" }
];

async function updateUmkmImages() {
  console.log("==========================================");
  console.log("  Menghubungkan Gambar ke 10 UMKM Real ");
  console.log("==========================================");

  const updatedRecs = [];

  for (let i = 0; i < REAL_UMKM_IMAGES.length; i++) {
    const { slug, image } = REAL_UMKM_IMAGES[i];

    // Fetch UMKM record by slug
    const { data: umkm, error: fetchErr } = await supabase.from('umkm').select('*').eq('slug', slug).single();

    if (fetchErr || !umkm) {
      console.error(`❌ Gagal menemukan UMKM dengan slug: ${slug}`, fetchErr?.message);
      continue;
    }

    // 1. Update umkm table (hero_image, logo_url) and users table (avatar)
    const { error: updateErr } = await supabase.from('umkm').update({
      hero_image: image,
      logo_url: image
    }).eq('id', umkm.id);

    if (updateErr) {
      console.error(`❌ Gagal update gambar untuk ${umkm.name}:`, updateErr.message);
    } else {
      console.log(`✅ [${i + 1}/10] ${umkm.name}: gambar set ke ${image}`);
    }

    // Also update users avatar
    await supabase.from('users').update({ avatar: image }).eq('id', umkm.id);

    // 2. Insert into umkm_images for gallery view if not already existing
    const { data: existingImg } = await supabase.from('umkm_images').select('id').eq('umkm_id', umkm.id).eq('url', image);
    if (!existingImg || existingImg.length === 0) {
      await supabase.from('umkm_images').insert({
        umkm_id: umkm.id,
        type: 'hero',
        url: image,
        caption: `Foto Utama ${umkm.name}`
      });
    }

    updatedRecs.push({
      id: umkm.id,
      name: umkm.name,
      category: umkm.category,
      image: image,
      owner: umkm.owner,
      rating: "5.0",
      status: "Buka"
    });
  }

  // 3. Update home_recommendations in site_content
  const { error: recErr } = await supabase.from('site_content').upsert({
    key: 'home_recommendations',
    value: updatedRecs
  });

  if (recErr) {
    console.error("❌ Gagal update site_content home_recommendations:", recErr.message);
  } else {
    console.log("\n✅ Landing Page (Toko Unggulan) berhasil di-update dengan foto-foto UMKM terbaru!");
  }

  console.log("\nSelesai!");
}

updateUmkmImages();
