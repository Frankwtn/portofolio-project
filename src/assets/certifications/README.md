## Lokasi File

Logo disimpan di **`public/certifications/logos/`** — bukan `src/assets/` — agar bisa diakses via path absolut di Vite.

Foto sertifikat (untuk modal preview) disimpan di folder ini (`src/assets/certifications/`) dan diisi ke field `imageUrl`.

## Format Logo yang Disarankan

- Format: **JPG**, **PNG**, atau **SVG**
- Ukuran: **128×128px** atau lebih (akan di-render 28×28px, jadi tidak perlu besar)

## Cara Menggunakan Logo

1. Simpan logo ke `public/certifications/logos/<nama>.jpg`
2. Isi field `logoUrl` di `src/data/certifications.js`:

```js
logoUrl: '/certifications/logos/logo-hacktiv8.jpg',
```

Jika tidak ada logo, hapus field `logoUrl` atau set `null` → fallback ke huruf inisial.
