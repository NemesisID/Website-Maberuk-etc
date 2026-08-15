'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const usernameInput = (formData.get('username') || formData.get('email') || '') as string
  const password = formData.get('password') as string
  const cleanUsername = usernameInput.trim().toLowerCase()
  
  if (!cleanUsername || !password) {
    return { error: 'Username dan kata sandi wajib diisi' }
  }

  const supabase = await createClient()

  let authEmail = cleanUsername;

  // If user inputs a plain username (no '@'), resolve their registered email
  if (!cleanUsername.includes('@')) {
    try {
      const adminSupabase = createSupabaseAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Search matching username in users table
      const { data: matchedUser } = await adminSupabase
        .from('users')
        .select('id, username')
        .ilike('username', cleanUsername)
        .limit(1)
        .maybeSingle();

      if (matchedUser?.id) {
        const { data: authUserData } = await adminSupabase.auth.admin.getUserById(matchedUser.id);
        if (authUserData?.user?.email) {
          authEmail = authUserData.user.email;
        } else {
          authEmail = `${cleanUsername}@maberuk.com`;
        }
      } else {
        // Fallback default domain if not in users table yet
        authEmail = `${cleanUsername}@maberuk.com`;
      }
    } catch {
      authEmail = `${cleanUsername}@maberuk.com`;
    }
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password,
  })

  if (error) {
    return { error: 'Username atau kata sandi salah' }
  }

  let targetUrl = '/umkm';
  if (authData.user) {
    const { data: dbUser } = await supabase.from('users').select('role').eq('id', authData.user.id).single();
    const isSuperAdmin = dbUser?.role === 'superadmin' || dbUser?.role === 'admin';
    if (isSuperAdmin) {
      targetUrl = '/admin';
    }
  }

  return { success: true, targetUrl }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  redirect('/masuk')
}
