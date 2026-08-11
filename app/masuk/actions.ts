'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const supabase = await createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  let targetUrl = '/umkm';
  if (authData.user) {
    const { data: dbUser } = await supabase.from('users').select('role').eq('id', authData.user.id).single();
    const isSuperAdmin = dbUser?.role === 'superadmin' || dbUser?.role === 'admin' || authData.user.email === 'super@admin.com';
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
