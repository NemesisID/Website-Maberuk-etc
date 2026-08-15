require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching umkms...");
  const { data: umkms, error } = await supabase.from('umkm').select('*');
  if (error) {
    console.error(error);
    process.exit(1);
  }
  
  console.log(`Found ${umkms.length} UMKMs.`);
  let count = 0;
  for (const umkm of umkms) {
    if (!umkm.email) {
      // Get user from auth
      const { data, error: authErr } = await supabase.auth.admin.getUserById(umkm.id);
      if (data && data.user && data.user.email) {
        await supabase.from('umkm').update({ email: data.user.email }).eq('id', umkm.id);
        console.log(`Updated umkm ${umkm.id} with email ${data.user.email}`);
        count++;
      } else if (umkm.username) {
        const fallbackEmail = umkm.username.includes('@') ? umkm.username : `${umkm.username}@maberuk.com`;
        await supabase.from('umkm').update({ email: fallbackEmail }).eq('id', umkm.id);
        console.log(`Updated umkm ${umkm.id} with fallback email ${fallbackEmail}`);
        count++;
      }
    }
  }
  
  console.log(`Finished fixing. Updated ${count} records.`);
  process.exit(0);
}
run();
