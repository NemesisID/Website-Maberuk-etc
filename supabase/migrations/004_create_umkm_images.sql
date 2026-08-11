-- Supabase Migration: 004_create_umkm_images.sql

-- 1. Create umkm_images table to store image URLs & metadata directly in Supabase
create table if not exists umkm_images (
  id          uuid default gen_random_uuid() primary key,
  umkm_id     uuid references umkm(id) on delete cascade not null,
  type        text not null default 'gallery', -- 'logo', 'gallery', 'qris', 'hero'
  url         text not null,
  caption     text,
  size_bytes  bigint,
  created_at  timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table umkm_images enable row level security;

-- 3. Drop existing policies if any to avoid duplication
drop policy if exists "Public can view umkm images" on umkm_images;
drop policy if exists "Users can manage own umkm images" on umkm_images;
drop policy if exists "Admins can manage all umkm images" on umkm_images;
drop policy if exists "Users can insert own umkm images" on umkm_images;
drop policy if exists "Users can modify own umkm images" on umkm_images;
drop policy if exists "Users can delete own umkm images" on umkm_images;

-- 4. Create explicit RLS Policies with WITH CHECK clause for INSERT
create policy "Public can view umkm images" on umkm_images
  for select using (true);

create policy "Users can insert own umkm images" on umkm_images
  for insert with check (
    exists (
      select 1 from umkm
      where umkm.id = umkm_images.umkm_id
      and (
        umkm.email = auth.jwt()->>'email' 
        or umkm.id = auth.uid()
      )
    )
    or exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role in ('admin', 'superadmin')
    )
  );

create policy "Users can modify own umkm images" on umkm_images
  for update using (
    exists (
      select 1 from umkm
      where umkm.id = umkm_images.umkm_id
      and (
        umkm.email = auth.jwt()->>'email' 
        or umkm.id = auth.uid()
      )
    )
  );

create policy "Users can delete own umkm images" on umkm_images
  for delete using (
    exists (
      select 1 from umkm
      where umkm.id = umkm_images.umkm_id
      and (
        umkm.email = auth.jwt()->>'email' 
        or umkm.id = auth.uid()
      )
    )
  );
