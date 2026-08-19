-- Supabase Migration: 005_add_sub_category.sql
-- Menambahkan kolom sub_category ke tabel umkm

ALTER TABLE umkm 
ADD COLUMN IF NOT EXISTS sub_category text;
