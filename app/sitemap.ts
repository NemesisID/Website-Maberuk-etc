import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maberuk.vercel.app';

  const supabase = await createClient();
  const { data: umkmList } = await supabase.from('umkm').select('slug, updated_at, created_at').eq('active', true);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/direktori`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/masuk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const umkmRoutes: MetadataRoute.Sitemap = (umkmList || []).map((store) => ({
    url: `${baseUrl}/direktori/${store.slug}`,
    lastModified: store.updated_at ? new Date(store.updated_at) : (store.created_at ? new Date(store.created_at) : new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...umkmRoutes];
}
