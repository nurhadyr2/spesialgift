# Untuk Risqina Azhary — Website Ulang Tahun

Website interaktif 7 layer, dibangun dengan React + Vite, Framer Motion, dan Lenis (smooth scroll).

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Cara mengganti isi konten

**Hampir semua yang perlu kamu edit ada di satu file:**
`src/data/content.js`

Di situ ada:
- `HER_NAME` — nama
- `BIRTHDAY_DATE` — tanggal ulang tahun (dipakai countdown di Layer 1)
- `PROLOGUE_LINES` — baris narasi di Layer 2
- `GALLERY` — daftar foto + caption (Layer 3)
- `TIMELINE` — momen-momen penting (Layer 4)
- `REASONS` — alasan kenapa dia spesial (Layer 5)
- `VAULT_MESSAGE` — pesan rahasia yang muncul saat vault dibuka (Layer 6)
- `CLOSING_MESSAGE`, `CLOSING_SIGNATURE`, `CLOSING_CTA` — penutup (Layer 7)

## Cara menambah foto

1. Taruh file foto di folder `public/photos/`
2. Update path di `GALLERY` dalam `src/data/content.js`, contoh:
   ```js
   { src: "/photos/nama-file-kamu.jpg", caption: "captionnya" }
   ```

Kamu bisa menambah atau mengurangi jumlah foto di array `GALLERY` — layout otomatis menyesuaikan.

## Struktur 7 layer

| # | File | Isi |
|---|------|-----|
| 1 | `Layer1Opening.jsx` | Curtain reveal + nama + countdown |
| 2 | `Layer2Prologue.jsx` | Narasi pembuka |
| 3 | `Layer3Gallery.jsx` | Galeri foto alternating parallax |
| 4 | `Layer4Timeline.jsx` | Timeline momen |
| 5 | `Layer5Reasons.jsx` | List alasan, reveal staggered |
| 6 | `Layer6Vault.jsx` | Interactive vault (tekan & tahan) |
| 7 | `Layer7Closing.jsx` | Pesan penutup + CTA opsional |

## Deploy

Paling gampang pakai Vercel atau Netlify:

```bash
npm run build
```

Lalu upload folder `dist/` ke Netlify (drag & drop di app.netlify.com), atau hubungkan repo GitHub ke Vercel.

## Catatan teknis

- Cursor custom (spotlight) otomatis nonaktif di layar kecil/mobile agar tetap nyaman disentuh.
- Animasi otomatis dikurangi jika user mengaktifkan "reduce motion" di sistem operasinya.
- Warna & font diatur lewat CSS variable di `src/index.css` — bagian `:root` — kalau mau ganti palet, cukup ubah di situ.
