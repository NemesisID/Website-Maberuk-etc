-- Supabase Migration: 003_update_umkm_and_transactions.sql

-- 1. Alter umkm table to add new columns if they do not exist
alter table umkm add column if not exists owner text;
alter table umkm add column if not exists email text;
alter table umkm add column if not exists logo_url text;
alter table umkm add column if not exists gps_coords text;
alter table umkm add column if not exists operational_hours jsonb default '{}';

-- 2. Create transactions table
create table if not exists transactions (
  id          uuid default gen_random_uuid() primary key,
  umkm_id     uuid references umkm(id) on delete cascade not null,
  type        text not null, -- 'Pemasukan' or 'Pengeluaran'
  date        date not null,
  category    text not null,
  amount      numeric not null,
  note        text,
  status      text default 'Selesai',
  created_at  timestamptz default now()
);

-- 3. Enable Row Level Security (RLS) on transactions
alter table transactions enable row level security;

-- 4. Create Policies for transactions
-- Owner can manage their own transactions
create policy "Users can manage own transactions" on transactions
  for all using (
    exists (
      select 1 from umkm
      where umkm.id = transactions.umkm_id
      and umkm.email = auth.jwt()->>'email'
    )
  );

-- Admin can manage all transactions
create policy "Admins can manage all transactions" on transactions
  for all using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'superadmin'
    )
  );
