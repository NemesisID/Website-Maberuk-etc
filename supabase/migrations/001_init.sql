-- Supabase Migration: 001_init.sql

create table umkm (
  id          uuid default gen_random_uuid() primary key,
  slug        text unique not null,
  name        text not null,
  category    text not null,
  description text,
  phone       text,
  phone_digits text,
  address     text,
  product     text,
  qris        boolean default false,
  hero_image  text,
  gallery     jsonb default '[]',
  social      jsonb default '{}',
  active      boolean default true,
  created_at  timestamptz default now()
);

create table prompts (
  id         serial primary key,
  category   text,
  title      text,
  prompt     text,
  image      text,
  sort_order int default 0
);

create table site_content (
  key    text primary key,
  value  jsonb not null
);

-- Enable RLS
alter table umkm enable row level security;
alter table prompts enable row level security;
alter table site_content enable row level security;

-- Policies for public reading
create policy "Public can read active umkm" on umkm for select using (active = true);
create policy "Public can read prompts" on prompts for select using (true);
create policy "Public can read site content" on site_content for select using (true);

-- Admin policies (requires authenticated user)
create policy "Authenticated users can fully manage umkm" on umkm for all using (auth.role() = 'authenticated');
create policy "Authenticated users can fully manage prompts" on prompts for all using (auth.role() = 'authenticated');
create policy "Authenticated users can fully manage site_content" on site_content for all using (auth.role() = 'authenticated');
