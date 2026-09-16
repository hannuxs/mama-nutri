# Teman ASI

Teman ASI adalah aplikasi pendamping ibu menyusui berbasis React, TypeScript, dan Capacitor. Aplikasi menyediakan materi edukasi, histori bacaan, pencatatan sesi menyusui, profil dan perkembangan anak, kalkulator IMT, serta panduan bantuan offline.

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

## Android

Persyaratan: Android Studio, Android SDK, dan JDK 17 atau lebih baru.

Sinkronkan hasil build web ke proyek Android:

```bash
npm run android:sync
```

Bangun APK debug dari folder `android`:

```powershell
.\gradlew.bat assembleDebug
```

APK tersedia di `android/app/build/outputs/apk/debug/app-debug.apk`.

## Catatan

- Seluruh CSS, gambar, dan materi dibundel di dalam aplikasi tanpa dependensi runtime ke internet.
- Data aplikasi disimpan melalui penyimpanan native perangkat dan tidak dikirim ke server.
- Backup cloud Android dinonaktifkan dan aplikasi tidak meminta izin internet.
- Materi bersifat edukasi dan bukan pengganti pemeriksaan tenaga kesehatan.
