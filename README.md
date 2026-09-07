# Teman ASI

Teman ASI adalah aplikasi pendamping ibu menyusui berbasis React dan TypeScript. Aplikasi ini menyediakan materi edukasi, histori bacaan, pencatatan sesi menyusui, profil dan perkembangan anak, kalkulator IMT, serta akses konsultasi.

## Menjalankan aplikasi

Persyaratan: Node.js versi LTS dan npm.

```bash
npm install
npm run dev
```

Aplikasi development berjalan di `http://localhost:3000`.

## Pemeriksaan kualitas

```bash
npm run check
npm run build
```

## Catatan

- Data aplikasi disimpan secara lokal pada browser.
- Materi bersifat edukasi dan bukan pengganti pemeriksaan tenaga kesehatan.
- Nilai layanan eksternal dan mode debug dapat diatur melalui `config.ts`.
