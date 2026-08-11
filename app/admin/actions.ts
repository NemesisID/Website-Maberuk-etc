"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveSiteContent(key: string, value: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('site_content').upsert({ key, value });
  if (error) {
    console.error("Error saving site content:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertPrompt(prompt: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('prompts').upsert({
    id: prompt.id,
    category: prompt.category,
    title: prompt.title,
    prompt: prompt.prompt,
    image: prompt.image,
    sort_order: prompt.sort_order || prompt.id
  });
  if (error) {
    console.error("Error saving prompt:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deletePrompt(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from('prompts').delete().eq('id', id);
  if (error) {
    console.error("Error deleting prompt:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertUser(user: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('users').upsert(user);
  if (error) {
    console.error("Error saving user:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteUser(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function upsertCategory(category: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').upsert(category);
  if (error) {
    console.error("Error saving category:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteCategory(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
