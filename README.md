# Hadona Website — English

Static site, 10 halaman. Tanpa build step, tanpa dependency. Buka `index.html` atau jalankan Live Server.

---

## Urutan halaman

Buka sesuai urutan ini kalau ingin membaca alurnya dari atas ke bawah.

| # | File | Halaman | Isi |
|---|---|---|---|
| 01 | `index.html` | Home | Hero, rail 3 studi kasus, logo wall 24 klien, layanan, method, form |
| 02 | `work.html` | Work index | 3 kasus unggulan + tabel 6 hasil lain |
| 03 | `work/aum-apparel.html` | Case study | AUM Apparel — 3.92x ROAS |
| 04 | `work/chau-chocolate.html` | Case study | Cau Chocolates — 1.45x ROAS |
| 05 | `work/lyth.html` | Case study | LYTH Outdoor — +65% conversion |
| 06 | `engagement.html` | Engagement | Model kerja, minimum spend, onboarding, FAQ |
| 07 | `capabilities.html` | Capabilities | Empat disiplin + reporting SLA |
| 08 | `studio.html` | Studio | Tim, cara kerja, klien |
| 09 | `contact.html` | Contact | Form audit + info kontak |
| 10 | `terms.html` · `privacy.html` · `404.html` | Legal & error | Template, perlu review lawyer |

Setiap file punya komentar `PAGE 0x/10` di baris kedua, jadi saat file dibuka di VS Code langsung terlihat posisinya.

---

## Buka di VS Code

1. **File → Open Folder** → pilih folder `hadona-website`.
2. Buka `index.html`, klik kanan → **Open with Live Server** (extension *Live Server* oleh Ritwick Dey).
   Membuka lewat `file://` juga bisa, tapi font dan beberapa perilaku form lebih akurat lewat server lokal.
3. Untuk melihat versi gelap: klik ikon bulan di kanan atas, atau tambahkan `?theme=dark` di URL.
4. Versi Indonesia: klik tombol `ID` di kanan atas (menerjemahkan antarmuka, isi studi kasus tetap Inggris).

---

## Struktur folder

```
hadona-website/
├── index.html
├── work.html
├── engagement.html
├── capabilities.html
├── studio.html
├── contact.html
├── terms.html
├── privacy.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
├── work/
│   ├── aum-apparel.html
│   ├── chau-chocolate.html
│   └── lyth.html
├── assets/
│   ├── site.css          semua styling, termasuk tema gelap
│   ├── site.js           toggle tema, toggle bahasa, validasi form
│   ├── brand/            logo, favicon, manifest, og-image
│   ├── clients-db/       24 logo klien (sudah dinormalkan)
│   ├── case-*.jpg        cover studi kasus
│   └── *.jpg             foto pendukung
├── content/              data hasil sinkronisasi Supabase (opsional)
└── scripts/
    ├── sync-content.mjs  tarik data published dari Supabase
    └── normalize-logos.py  rapikan logo klien
```

---

## Yang perlu diganti sebelum publikasi

| Lokasi | Sekarang | Ganti jadi |
|---|---|---|
| `canonical`, `og:url`, `sitemap.xml`, `robots.txt` | selesai — `hadona.id` | — |
| `contact.html` | `hello@hadona.id` | email final (kalau berbeda) |
| Form kontak | selesai — `POST /api/contact` via Resend | set env `RESEND_API_KEY` di Vercel (opsional: `NOTIFY_EMAIL`, `CONTACT_FROM`) |
| `terms.html`, `privacy.html` | template | hasil review lawyer |
| Foto pendukung | 4 foto stok | foto klien atau shoot sendiri |

Domain final `hadona.id` sudah dipakai konsisten di semua file (canonical, og:url, og:image, sitemap, robots, JSON-LD).

---

## Edit yang sering dilakukan

**Ganti teks** — semua isi ada di dalam `<main>`. Navigasi dan footer diulang di setiap file, jadi perubahan menu harus dilakukan di 10 file (atau pakai Find & Replace seluruh folder). Setelah mengubah nav/footer, jalankan `python3 scripts/check_chrome.py` untuk memastikan tidak ada halaman yang tertinggal.

**Ganti warna** — buka `assets/site.css`, blok `:root` di baris paling atas. Tema gelap ada di `[data-theme="dark"]`.

**Tambah studi kasus** — duplikat salah satu file di `work/`, ganti isi `<main>`, lalu tambahkan kartunya di `work.html` dan `index.html`.

**Ganti logo klien** — taruh file baru di `assets/clients-db/`, lalu ubah `src` di `index.html`. Ukuran ideal: PNG transparan, sisi terpanjang 800px.

---

## Deploy ke Vercel

1. Push folder ini ke repository GitHub.
2. Vercel → **Add New Project** → import repo.
3. Framework preset: **Other**. Build command: kosong. Output directory: `.` (root).
4. Setelah domain aktif, submit `sitemap.xml` di Google Search Console.
5. Vercel → Settings → Environment Variables → tambahkan `RESEND_API_KEY` (opsional: `NOTIFY_EMAIL`, `CONTACT_FROM`) agar form kontak terkirim.

---

## Catatan

- Angka di studi kasus berasal dari dashboard klien. Konfirmasi tertulis sebelum publikasi.
- Minimum spend, termin, dan onboarding di `engagement.html` adalah default yang wajar — sesuaikan dengan kebijakan Anda.
- Tombol bahasa memakai kamus teks di `assets/site.js`. Untuk SEO dua bahasa yang benar, perlu rute `/id` terpisah.
