import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching existing UMKM...");
  const { data: umkms, error } = await supabase.from('umkm').select('id, name');
  if (error) {
    console.error("Error fetching umkm:", error);
    process.exit(1);
  }

  console.log(`Found ${umkms.length} UMKM entries. Updating slugs...`);
  
  for (const store of umkms) {
    if (!store.name) continue;
    
    // Generate new slug
    const newSlug = store.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Update db
    const { error: updateError } = await supabase.from('umkm').update({ slug: newSlug }).eq('id', store.id);
    if (updateError) {
      console.error(`Error updating slug for ${store.name}:`, updateError.message);
    } else {
      console.log(`Updated "${store.name}" -> slug: "${newSlug}"`);
    }
  }
  
  console.log("Done updating slugs!");
}

run();
