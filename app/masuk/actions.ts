'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const usernameInput = (formData.get('username') || formData.get('email') || '') as string
  const password = formData.get('password') as string
  const cleanUsername = usernameInput.trim().toLowerCase()
  
  const supabase = await createClient()

  const authEmail = cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@maberuk.com`

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password,
  })

  if (error) {
    return { error: 'Username atau password salah' }
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
