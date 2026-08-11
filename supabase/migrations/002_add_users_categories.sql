-- Supabase Migration: 002_add_users_categories.sql

create table users (
  id uuid references auth.users not null primary key,
  email text not null,
  name text not null,
  role text default 'umkm',
  status text default 'Aktif',
  password text,
  avatar text,
  created_at timestamptz default now()
);

create table categories (
  id serial primary key,
  name text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table users enable row level security;
alter table categories enable row level security;

-- Policies for public reading (or restricted if needed)
create policy "Users can read own data" on users for select using (auth.uid() = id);
create policy "Public can read categories" on categories for select using (true);

-- Admin policies (assuming role checks will be done in application layer or via RLS)
create policy "Authenticated users can fully manage users" on users for all using (auth.role() = 'authenticated');
create policy "Authenticated users can fully manage categories" on categories for all using (auth.role() = 'authenticated');
