# Dokumentasi Proyek Maberuk

## Ringkasan Proyek
Proyek ini adalah aplikasi web dashboard administrasi untuk platform UMKM yang ditujukan untuk dua peran pengguna:

- Super Admin: mengelola data UMKM, produk, konten website, dan pengaturan panel.
- Admin UMKM: melihat dashboard, mencatat transaksi, melihat laporan, dan mengelola profil usaha.

Aplikasi ini dibangun dengan Next.js, React, TypeScript, dan Tailwind CSS.

## Fitur Utama
- Dashboard interaktif untuk melihat ringkasan performa usaha
- Mode Super Admin dan UMKM Admin
- Halaman pembukuan dengan daftar transaksi
- Halaman laporan keuangan dan ringkasan bulanan
- Halaman profil usaha
- Pengelolaan data UMKM dan produk
- UI responsif untuk desktop dan mobile

## Teknologi yang Digunakan
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Struktur Folder
```text
app/
  globals.css      # styling global dan komponen UI tambahan
  layout.tsx       # layout utama aplikasi
  page.tsx         # seluruh antarmuka dashboard dan logika tampilan
public/            # aset publik (jika diperlukan)
```

## Cara Menjalankan Project
Pastikan Node.js dan npm sudah terpasang.

1. Install dependency:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser ke:
```text
http://localhost:3000
```

## Perintah yang Tersedia
```bash
npm run dev      # menjalankan aplikasi dalam mode development
npm run build    # membangun aplikasi untuk produksi
npm run start    # menjalankan build produksi
npm run lint     # menjalankan pemeriksaan ESLint
```

## Catatan Arsitektur
- Aplikasi saat ini masih bersifat front-end UI/dashboard dengan data contoh yang disimpan langsung di file halaman utama.
- Semua tampilan utama berada di [app/page.tsx](app/page.tsx).
- Metadata aplikasi dan layout global berada di [app/layout.tsx](app/layout.tsx).

## Tujuan Pengembangan
Project ini bertujuan untuk memberikan tampilan administrasi yang menyerupai panel kontrol UMKM modern, sehingga memudahkan pemilik usaha dan admin melihat performa bisnis secara ringkas.
