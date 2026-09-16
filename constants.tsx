import React from 'react';
import {
  Activity,
  AlertCircle,
  BookOpen,
  Clock,
  Droplets,
  Heart,
  HelpCircle,
  ShieldCheck,
  Utensils,
} from 'lucide-react';

export interface ContentTable {
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface ContentImage {
  src: string;
  alt: string;
  caption?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  fit?: 'contain' | 'cover';
  fullWidth?: boolean;
  objectPosition?: string;
  composition?: {
    width: number;
    height: number;
    columns?: number;
    panels: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation?: 0 | 90 | 180 | 270;
    }[];
  };
}

export interface ContentSection {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  table?: ContentTable;
  images?: ContentImage[];
}

export interface ArticleCallout {
  title: string;
  text: string;
  tone: 'info' | 'warning';
}

export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  sections: ContentSection[];
  callout?: ArticleCallout;
}

export interface EducationCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
  subTopics: SubTopic[];
}

export const EDUCATION_DATA: EducationCategory[] = [
  {
    id: 'pengetahuan-dasar',
    title: 'Pengetahuan Dasar Menyusui',
    description: 'Kenali ASI, manfaatnya, dan awal perjalanan menyusui.',
    icon: 'BookOpen',
    image: '/images/education/pengetahuan-dasar.webp',
    imageAlt: 'Ibu menggendong bayi dengan hangat sebagai simbol perlindungan ASI',
    subTopics: [
      {
        id: 'dasar-menyusui',
        title: 'Mengenal Menyusui',
        summary: 'Pengertian menyusui serta perbedaan ASI eksklusif, predominan, dan campuran.',
        sections: [
          {
            paragraphs: [
              'Menyusui adalah proses alami saat ibu memberikan Air Susu Ibu (ASI) langsung kepada bayi. ASI merupakan makanan utama yang dirancang sesuai kebutuhan bayi pada awal kehidupannya.',
            ],
          },
          {
            title: 'ASI eksklusif',
            paragraphs: [
              'ASI eksklusif berarti bayi hanya mendapat ASI sejak lahir sampai usia 6 bulan, tanpa makanan atau minuman lain termasuk air putih. Obat, vitamin, mineral, atau oralit dapat diberikan bila dianjurkan tenaga kesehatan.',
            ],
            bullets: [
              'Memenuhi kebutuhan gizi dan cairan bayi selama 6 bulan pertama.',
              'Membantu melindungi bayi dari berbagai penyakit.',
              'Mendukung pertumbuhan dan perkembangan secara optimal.',
            ],
          },
          {
            title: 'ASI predominan',
            paragraphs: [
              'Pada ASI predominan, ASI tetap menjadi makanan utama tetapi bayi juga diberi cairan lain seperti air putih, air gula, atau teh. Pola ini tidak termasuk ASI eksklusif.',
            ],
          },
          {
            title: 'ASI campuran',
            paragraphs: [
              'ASI campuran adalah pemberian ASI bersama susu formula, makanan, atau minuman lain sebelum bayi berusia 6 bulan. Hal ini dapat terjadi karena kekhawatiran ASI tidak cukup, kondisi kesehatan tertentu, atau pengaruh lingkungan.',
              'Pemberian makanan atau minuman selain ASI sebelum usia 6 bulan sebaiknya dilakukan hanya berdasarkan kebutuhan medis dan arahan tenaga kesehatan.',
            ],
          },
        ],
      },
      {
        id: 'keberhasilan-asi-eksklusif',
        title: 'Keberhasilan ASI Eksklusif',
        summary: 'Faktor fisik, emosional, pengetahuan, keluarga, dan lingkungan.',
        sections: [
          {
            paragraphs: [
              'Keberhasilan menyusui tidak hanya dipengaruhi kondisi fisik. Pengetahuan, rasa percaya diri, dukungan keluarga, dan lingkungan yang mendukung ikut menentukan keberlanjutan ASI eksklusif.',
            ],
          },
          {
            title: 'Faktor yang mendukung',
            bullets: [
              'Makan cukup, beragam, dan bergizi seimbang serta minum sesuai rasa haus.',
              'Memahami manfaat ASI dan cara menyusui yang benar.',
              'Dukungan pasangan dan keluarga, termasuk bantuan pekerjaan rumah dan kesempatan beristirahat.',
              'Menjaga kesehatan fisik dan mental selama masa menyusui.',
              'Akses terhadap konselor laktasi atau tenaga kesehatan ketika muncul kesulitan.',
              'Tempat kerja yang menyediakan waktu dan ruang untuk memerah ASI.',
            ],
          },
          {
            title: 'Hambatan yang sering ditemui',
            bullets: [
              'Nyeri, puting luka, payudara bengkak, atau kelelahan.',
              'Stres, cemas, dan rasa kurang percaya diri.',
              'Informasi keliru serta kebiasaan memberi madu, air, atau cairan lain sebelum usia 6 bulan.',
              'Cuti terbatas, tidak tersedia ruang laktasi, dan promosi susu formula.',
            ],
          },
        ],
      },
      {
        id: 'tahapan-asi',
        title: 'Tahapan ASI',
        summary: 'Perubahan ASI dari kolostrum hingga ASI matur.',
        sections: [
          {
            paragraphs: [
              'ASI berubah secara alami mengikuti waktu setelah persalinan dan kebutuhan bayi. Perubahan ini merupakan proses normal.',
            ],
            images: [
              {
                src: '/images/material/tahapan-asi.webp',
                alt: 'Ilustrasi kolostrum, ASI transisi, dan ASI matur',
                caption: 'Perubahan ASI dari kolostrum hingga ASI matur',
                orientation: 'landscape',
              },
            ],
          },
          {
            title: 'Kolostrum',
            paragraphs: [
              'Kolostrum adalah ASI pertama yang keluar setelah bayi lahir. Warnanya biasanya kekuningan dan teksturnya lebih kental. Kolostrum kaya faktor pelindung, mendukung sistem kekebalan tubuh, dan sesuai untuk pencernaan bayi baru lahir.',
            ],
          },
          {
            title: 'ASI transisi',
            paragraphs: [
              'ASI transisi muncul setelah kolostrum, umumnya pada minggu pertama hingga sekitar dua minggu setelah melahirkan. Volume ASI bertambah dan komposisinya berubah untuk menyediakan lebih banyak energi.',
            ],
          },
          {
            title: 'ASI matur',
            paragraphs: [
              'ASI matur mulai terbentuk setelah masa transisi. Komposisi lemak dan cairannya berubah secara bertahap selama satu sesi menyusui. Biarkan bayi menyusu sampai puas pada satu sisi sebelum menawarkan sisi lainnya.',
            ],
            bullets: [
              'ASI awal (Foremilk) adalah ASI yang keluar pada awal sesi menyusui. Tampilannya dapat lebih encer karena kadar lemaknya relatif lebih rendah. ASI ini tetap mengandung zat gizi dan membantu memenuhi kebutuhan cairan bayi.',
              'ASI akhir (Hindmilk) adalah sebutan untuk ASI yang keluar lebih lanjut dalam sesi menyusui. Kadar lemaknya cenderung lebih tinggi sehingga menyediakan lebih banyak energi dan membantu bayi merasa kenyang.',
              'Foremilk dan Hindmilk bukan dua jenis ASI yang terpisah. Kadar lemak meningkat secara bertahap, bukan berubah mendadak pada menit tertentu. Keduanya penting, dan warna atau kekentalan saja tidak menentukan kualitas ASI.',
              'Tidak perlu membuang ASI awal atau membatasi waktu menyusu untuk mendapatkan ASI akhir. Ikuti tanda lapar dan kenyang bayi, lalu tawarkan payudara lainnya setelah bayi selesai pada sisi pertama.',
            ],
            images: [
              {
                src: '/images/material/foremilk-hindmilk-1.webp',
                alt: 'Perbandingan tampilan ASI pada awal dan akhir sesi menyusui',
                caption: 'ASI dapat berubah tampilan selama satu sesi menyusui',
                orientation: 'landscape',
              },
            ],
          },
        ],
        callout: {
          title: 'Tidak perlu membandingkan warna ASI',
          text: 'Warna dan kekentalan ASI dapat berbeda antaribu dan berubah dari waktu ke waktu. Perubahan tersebut umumnya normal.',
          tone: 'info',
        },
      },
      {
        id: 'kandungan-asi',
        title: 'Kandungan ASI',
        summary: 'Zat gizi, antibodi, enzim, hormon, dan cairan yang dibutuhkan bayi.',
        sections: [
          {
            paragraphs: [
              'ASI mengandung zat gizi dan komponen biologis yang bekerja bersama untuk mendukung tumbuh kembang bayi.',
            ],
            bullets: [
              'Karbohidrat sebagai sumber energi.',
              'Protein untuk pertumbuhan dan perkembangan jaringan tubuh.',
              'Lemak sebagai sumber energi dan pendukung perkembangan otak.',
              'Vitamin dan mineral untuk berbagai fungsi tubuh.',
              'Antibodi dan komponen kekebalan untuk membantu melindungi bayi.',
              'Enzim dan hormon yang mendukung pencernaan dan perkembangan.',
              'Asam lemak seperti DHA dan ARA untuk perkembangan otak dan penglihatan.',
              'Air untuk memenuhi kebutuhan cairan bayi.',
            ],
          },
        ],
      },
      {
        id: 'manfaat-menyusui',
        title: 'Manfaat Menyusui',
        summary: 'Manfaat menyusui bagi bayi, ibu, keluarga, dan lingkungan.',
        sections: [
          {
            title: 'Bagi bayi',
            bullets: [
              'Memenuhi kebutuhan nutrisi dan lebih mudah dicerna.',
              'Membantu daya tahan tubuh dan perlindungan dari infeksi.',
              'Mendukung perkembangan otak, fisik, dan pertumbuhan.',
              'Memberikan rasa nyaman dan kedekatan dengan ibu.',
            ],
          },
          {
            title: 'Bagi ibu',
            bullets: [
              'Membantu kontraksi rahim dan pemulihan setelah melahirkan.',
              'Membantu mengurangi risiko perdarahan pascapersalinan.',
              'Berkaitan dengan penurunan risiko kanker payudara dan ovarium.',
              'Mendukung ikatan emosional antara ibu dan bayi.',
            ],
          },
          {
            title: 'Bagi keluarga dan lingkungan',
            bullets: [
              'Praktis dan tidak membutuhkan biaya pembelian susu.',
              'Mengurangi kebutuhan kemasan, energi produksi, dan limbah.',
              'Dukungan keluarga selama menyusui mempererat kerja sama dalam merawat bayi.',
            ],
          },
        ],
        callout: {
          title: 'Tentang KB alami',
          text: 'Menyusui hanya dapat menjadi metode amenore laktasi bila bayi berusia kurang dari 6 bulan, ibu belum kembali menstruasi, dan bayi menyusu eksklusif atau hampir eksklusif. Konsultasikan pilihan kontrasepsi dengan tenaga kesehatan.',
          tone: 'warning',
        },
      },
      {
        id: 'inisiasi-menyusu-dini',
        title: 'Inisiasi Menyusu Dini',
        summary: 'Kontak kulit dan proses mulai menyusu pada satu jam pertama.',
        sections: [
          {
            paragraphs: [
              'Inisiasi Menyusu Dini (IMD) adalah proses menempatkan bayi di dada ibu dengan kontak kulit ke kulit dan mendukung bayi mulai menyusu sesegera mungkin, idealnya dalam satu jam pertama setelah lahir bila kondisi ibu dan bayi memungkinkan.',
            ],
          },
          {
            title: 'Manfaat bagi bayi',
            bullets: [
              'Membantu menjaga suhu tubuh dan kestabilan kondisi bayi.',
              'Membuat bayi lebih tenang dan mendukung ikatan dengan ibu.',
              'Memberi kesempatan memperoleh kolostrum lebih awal.',
              'Mendukung keberhasilan dan durasi menyusui.',
            ],
          },
          {
            title: 'Tahapan alami bayi',
            steps: [
              'Bayi diletakkan tengkurap di dada ibu untuk kontak kulit ke kulit.',
              'Bayi beristirahat dan menyesuaikan diri setelah lahir.',
              'Bayi mulai membuka mata, menggerakkan kepala, atau menjilat.',
              'Refleks mencari puting muncul saat bayi menggerakkan kepala dan membuka mulut.',
              'Bayi bergerak perlahan menuju payudara.',
              'Bayi melekat dan mulai menyusu.',
            ],
            images: [
              {
                src: '/images/material/tahapan-imd-1.webp',
                alt: 'Bayi melakukan kontak kulit dengan ibu pada awal IMD',
                caption: '1. Kontak kulit',
                orientation: 'landscape',
              },
              {
                src: '/images/material/tahapan-imd-2.webp',
                alt: 'Bayi beristirahat di dada ibu',
                caption: '2. Beristirahat',
                orientation: 'landscape',
              },
              {
                src: '/images/material/tahapan-imd-3.webp',
                alt: 'Bayi mulai aktif di dada ibu',
                caption: '3. Mulai aktif',
                orientation: 'landscape',
              },
              {
                src: '/images/material/tahapan-imd-4.webp',
                alt: 'Bayi menunjukkan refleks mencari saat IMD',
                caption: '4. Refleks mencari',
                orientation: 'landscape',
              },
              {
                src: '/images/material/tahapan-imd-5.webp',
                alt: 'Bayi bergerak menuju payudara saat IMD',
                caption: '5. Bergerak menuju payudara',
                orientation: 'landscape',
              },
              {
                src: '/images/material/tahapan-imd-6.webp',
                alt: 'Bayi melekat dan mulai menyusu saat IMD',
                caption: '6. Melekat dan menyusu',
                orientation: 'landscape',
              },
            ],
          },
          {
            title: 'Faktor pelaksanaan',
            bullets: [
              'Jenis persalinan dan kondisi pemulihan ibu.',
              'Kondisi bayi setelah lahir.',
              'Pengetahuan serta kesiapan ibu.',
              'Dukungan tenaga kesehatan dan kebijakan tempat bersalin.',
            ],
            images: [
              {
                src: '/images/material/jenis-persalinan.webp',
                alt: 'Ilustrasi persalinan sesar dan persalinan pervaginam',
                caption: 'Jenis persalinan dapat memengaruhi pelaksanaan awal IMD',
                orientation: 'landscape',
              },
            ],
          },
        ],
        callout: {
          title: 'Keselamatan tetap utama',
          text: 'Bila ibu atau bayi membutuhkan penanganan segera, tenaga kesehatan akan menyesuaikan waktu dan cara kontak kulit serta menyusui.',
          tone: 'info',
        },
      },
    ],
  },
  {
    id: 'persiapan-dasar',
    title: 'Persiapan dan Dasar Menyusui',
    description: 'Produksi ASI, gizi, posisi, perlekatan, dan tanda kecukupan.',
    icon: 'Droplets',
    image: '/images/education/dasar-menyusui.webp',
    imageAlt: 'Ibu belajar posisi menyusui bersama konselor laktasi',
    subTopics: [
      {
        id: 'prinsip-produksi-asi',
        title: 'Prinsip Produksi ASI',
        summary: 'Cara kerja prolaktin, oksitosin, dan prinsip sesuai kebutuhan bayi.',
        sections: [
          {
            paragraphs: [
              'Produksi ASI menyesuaikan frekuensi ASI dikeluarkan melalui hisapan bayi atau pemerahan. Semakin efektif dan teratur ASI dikeluarkan, tubuh menerima sinyal untuk mempertahankan produksi.',
            ],
          },
          {
            title: 'Dua hormon utama',
            bullets: [
              'Prolaktin membantu tubuh memproduksi ASI.',
              'Oksitosin membantu refleks pengeluaran ASI dari payudara.',
            ],
          },
          {
            title: 'Membantu kelancaran ASI',
            bullets: [
              'Susui bayi secara responsif sesuai tanda lapar.',
              'Pastikan perlekatan bayi efektif.',
              'Keluarkan ASI secara teratur sesuai kebutuhan, tanpa memaksa payudara selalu kosong.',
              'Cukupi istirahat dan mintalah bantuan keluarga.',
              'Ciptakan suasana tenang dan nyaman.',
            ],
          },
        ],
      },
      {
        id: 'gizi-ibu-menyusui',
        title: 'Gizi Ibu Menyusui',
        summary: 'Makan beragam, cukup cairan, dan menjaga kondisi tubuh.',
        sections: [
          {
            paragraphs: [
              'Selama menyusui, ibu membutuhkan asupan yang cukup untuk menjaga kesehatan dan mendukung produksi ASI. Tidak ada satu makanan khusus yang wajib dikonsumsi agar ASI keluar.',
            ],
          },
          {
            title: 'Pilihan makanan',
            bullets: [
              'Protein: telur, ikan, ayam, daging, tahu, tempe, dan kacang-kacangan.',
              'Lemak sehat: ikan, alpukat, biji-bijian, dan kacang-kacangan.',
              'Vitamin dan mineral: sayur serta buah yang beragam.',
              'Kalsium: susu, yoghurt, tahu, tempe, dan sumber lain yang sesuai.',
              'Zat besi: daging, hati dalam jumlah wajar, sayuran hijau, dan kacang-kacangan.',
            ],
          },
          {
            title: 'Yang perlu diperhatikan',
            bullets: [
              'Makan cukup dan beragam sesuai kebutuhan tubuh.',
              'Minum saat haus dan perhatikan tanda kekurangan cairan.',
              'Tidak perlu memaksakan makanan yang tidak disukai.',
              'Konsultasikan suplemen dengan tenaga kesehatan.',
            ],
          },
        ],
      },
      {
        id: 'posisi-menyusui',
        title: 'Posisi Menyusui',
        summary: 'Empat posisi umum yang dapat dipilih sesuai kenyamanan ibu dan bayi.',
        sections: [
          {
            paragraphs: [
              'Ibu dapat menyusui sambil duduk atau berbaring. Tidak ada satu posisi yang paling benar untuk semua orang. Yang utama adalah tubuh ibu nyaman, tubuh bayi tersangga, dan bayi dapat melekat dengan baik.',
            ],
          },
          {
            title: 'Cradle hold',
            paragraphs: [
              'Bayi berada di lekukan lengan ibu dengan seluruh tubuh menghadap tubuh ibu. Kepala dan leher bayi tersangga tanpa didorong dari belakang kepala.',
            ],
            images: [
              {
                src: '/images/material/posisi-cradle.webp',
                alt: 'Ibu menyusui bayi dengan posisi cradle hold',
                caption: 'Posisi cradle hold',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Football hold',
            paragraphs: [
              'Bayi berada di sisi tubuh ibu seperti memegang bola. Posisi ini dapat nyaman bagi ibu setelah operasi sesar atau saat menyusui bayi kembar.',
            ],
            images: [
              {
                src: '/images/material/posisi-football.webp',
                alt: 'Ibu menyusui bayi dengan posisi football hold',
                caption: 'Posisi football hold',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Cross-cradle hold',
            paragraphs: [
              'Bayi ditopang dengan lengan yang berlawanan dari payudara yang digunakan. Posisi ini membantu ibu mengontrol bahu dan leher bayi ketika belajar melekat.',
            ],
            images: [
              {
                src: '/images/material/posisi-cross-cradle.webp',
                alt: 'Ibu menyusui bayi dengan posisi cross-cradle hold',
                caption: 'Posisi cross-cradle hold',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Side-lying',
            paragraphs: [
              'Ibu dan bayi berbaring miring saling berhadapan. Pastikan area tidur aman, bayi tidak terhalang bantal atau selimut, dan pindahkan bayi ke tempat tidur aman setelah selesai menyusu bila ibu akan tidur.',
            ],
            images: [
              {
                src: '/images/material/posisi-side-lying.webp',
                alt: 'Ibu menyusui bayi sambil berbaring miring',
                caption: 'Posisi side-lying',
                orientation: 'portrait',
              },
            ],
          },
        ],
      },
      {
        id: 'perlekatan-benar',
        title: 'Perlekatan yang Benar',
        summary: 'Tanda perlekatan efektif agar bayi mendapat ASI dan ibu tetap nyaman.',
        sections: [
          {
            paragraphs: [
              'Perlekatan yang baik membantu bayi mengeluarkan ASI secara efektif dan mengurangi nyeri. Arahkan tubuh bayi menghadap ibu, dekatkan bayi ke payudara, dan tunggu mulut terbuka lebar sebelum melekatkan.',
            ],
            images: [
              {
                src: '/images/material/perlekatan-benar.webp',
                alt: 'Perbandingan ilustrasi perlekatan menyusui yang benar dan kurang tepat',
                caption: 'Perbandingan perlekatan yang benar dan kurang tepat',
                orientation: 'landscape',
                fit: 'cover',
                objectPosition: 'center 28%',
              },
            ],
          },
          {
            title: 'Tanda perlekatan baik',
            bullets: [
              'Dagu bayi menyentuh atau sangat dekat dengan payudara.',
              'Mulut bayi terbuka lebar dan bibir bawah terlipat keluar.',
              'Sebagian besar areola masuk ke mulut, terutama bagian bawah.',
              'Pipi bayi tampak berisi dan tidak tertarik ke dalam.',
              'Terlihat atau terdengar pola menelan tanpa bunyi decak berulang.',
              'Ibu tidak merasakan nyeri tajam atau nyeri yang menetap.',
              'Bayi tampak tenang dan nyaman.',
            ],
          },
        ],
        callout: {
          title: 'Jika terasa sakit',
          text: 'Masukkan jari bersih perlahan ke sudut mulut bayi untuk melepas isapan, lalu coba perlekatan kembali. Cari bantuan bila nyeri menetap atau puting terluka.',
          tone: 'warning',
        },
      },
      {
        id: 'tanda-kecukupan-asi',
        title: 'Tanda Bayi Cukup ASI',
        summary: 'Pantau pertumbuhan, buang air kecil, dan kondisi bayi.',
        sections: [
          {
            title: 'Tanda yang meyakinkan',
            bullets: [
              'Berat badan bertambah mengikuti kurva pertumbuhan.',
              'Setelah hari-hari awal, bayi umumnya buang air kecil setidaknya 6 kali per hari.',
              'Bayi tampak puas dan tenang setelah sebagian besar sesi menyusu.',
              'Bayi tampak aktif saat bangun, kulit lembap, dan mata cerah.',
              'Pada minggu awal, pola buang air besar berubah sesuai usia dan asupan.',
            ],
          },
          {
            title: 'Perlu diperiksa',
            bullets: [
              'Buang air kecil lebih sedikit dari yang diharapkan.',
              'Berat badan tidak bertambah atau terus menurun.',
              'Bayi sangat mengantuk, lemas, sulit dibangunkan, atau terus rewel setelah menyusu.',
              'Mulut kering atau tanda kekurangan cairan lainnya.',
            ],
          },
        ],
        callout: {
          title: 'Hubungi tenaga kesehatan',
          text: 'Segera cari bantuan bila bayi tampak lemas, sulit menyusu, jarang buang air kecil, demam, atau terdapat kekhawatiran tentang pertumbuhannya.',
          tone: 'warning',
        },
      },
    ],
  },
  {
    id: 'kembali-beraktivitas',
    title: 'Persiapan Kembali Beraktivitas',
    description: 'Tetap menyusui saat mulai aktif, bekerja, dan menggunakan ASI perah.',
    icon: 'Activity',
    image: '/images/education/kembali-beraktivitas.webp',
    imageAlt: 'Ibu menyiapkan ASI perah dan cooler bag dengan rapi',
    subTopics: [
      {
        id: 'aktivitas-setelah-melahirkan',
        title: 'Kembali Beraktivitas',
        summary: 'Mulai perlahan dengan memperhatikan pemulihan fisik dan emosional.',
        sections: [
          {
            paragraphs: [
              'Setelah melahirkan, ibu dapat kembali menjalani aktivitas secara bertahap sesuai kondisi tubuh, jenis persalinan, dan arahan tenaga kesehatan.',
            ],
          },
          {
            title: 'Aktivitas fisik',
            bullets: [
              'Mulai dari berjalan kaki atau peregangan ringan.',
              'Tingkatkan durasi dan intensitas secara bertahap sesuai kemampuan.',
              'Berhenti dan beristirahat bila terasa nyeri, pusing, perdarahan bertambah, atau sangat lelah.',
            ],
          },
          {
            title: 'Istirahat dan rutinitas',
            bullets: [
              'Manfaatkan waktu tidur bayi untuk beristirahat bila memungkinkan.',
              'Prioritaskan kegiatan penting dan jangan memaksakan semua pekerjaan selesai sekaligus.',
              'Terima bantuan keluarga untuk merawat bayi dan pekerjaan rumah.',
              'Perhatikan kesehatan emosional dan cari bantuan bila sedih atau cemas terasa berat dan menetap.',
            ],
          },
        ],
      },
      {
        id: 'persiapan-ibu-bekerja',
        title: 'Persiapan Ibu Bekerja',
        summary: 'Atur jadwal, latihan memerah, perlengkapan, dan dukungan tempat kerja.',
        sections: [
          {
            paragraphs: [
              'Kembali bekerja tidak berarti harus berhenti menyusui. Dengan latihan, penyimpanan yang aman, dan dukungan lingkungan kerja, bayi tetap dapat menerima ASI.',
            ],
          },
          {
            title: 'Sebelum mulai bekerja',
            bullets: [
              'Mulai berlatih memerah sekitar 2-4 minggu sebelum kembali bekerja.',
              'Kenalkan cara pemberian ASI perah secara bertahap oleh pengasuh.',
              'Siapkan wadah bersih, label, cooler bag, dan ice pack.',
              'Bicarakan kebutuhan waktu serta ruang memerah dengan atasan atau bagian kepegawaian.',
            ],
            images: [
              {
                src: '/images/material/pompa-manual.webp',
                alt: 'Contoh pompa ASI manual',
                caption: 'Pompa manual',
                orientation: 'landscape',
                fit: 'contain',
                fullWidth: true,
              },
              {
                src: '/images/material/pompa-elektrik.webp',
                alt: 'Contoh pompa ASI elektrik',
                caption: 'Pompa elektrik',
                orientation: 'portrait',
              },
              {
                src: '/images/material/botol-penyimpan-asi.webp',
                alt: 'Contoh wadah penyimpanan ASI perah',
                caption: 'Wadah ASI perah',
                orientation: 'portrait',
              },
              {
                src: '/images/material/cooler-bag.webp',
                alt: 'Contoh cooler bag untuk membawa ASI perah',
                caption: 'Cooler bag',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Menjaga ritme menyusui',
            bullets: [
              'Susui bayi langsung sebelum berangkat dan setelah kembali ke rumah.',
              'Saat bekerja, usahakan memerah mengikuti pola minum bayi, umumnya setiap 3-4 jam.',
              'Tidak perlu menunggu payudara terasa penuh atau nyeri.',
            ],
          },
        ],
      },
      {
        id: 'memerah-dengan-tangan',
        title: 'Memerah ASI dengan Tangan',
        summary: 'Teknik sederhana tanpa alat tambahan.',
        sections: [
          {
            paragraphs: [
              'Memerah dengan tangan dapat digunakan sejak masa kolostrum maupun ketika pompa tidak tersedia. Teknik yang lembut tidak seharusnya menimbulkan nyeri.',
            ],
          },
          {
            title: 'Langkah memerah',
            steps: [
              'Cuci tangan dengan sabun dan siapkan wadah bersih yang dapat ditutup.',
              'Cari tempat nyaman. Tarik napas perlahan dan rilekskan bahu.',
              'Bila nyaman, kompres hangat singkat atau usap payudara dengan lembut.',
              'Letakkan ibu jari dan telunjuk membentuk huruf C beberapa sentimeter di belakang puting.',
              'Tekan jari perlahan ke arah dinding dada, lalu rapatkan dan lepaskan secara berirama.',
              'Pindahkan posisi jari mengelilingi areola saat aliran berkurang. Hindari menarik atau menjepit puting.',
              'Beralih ke payudara lain dan ulangi sesuai kebutuhan.',
              'Tutup wadah dan beri label tanggal serta jam pemerahan.',
            ],
            images: [
              {
                src: '/images/material/posisi-jari-memerah.webp',
                alt: 'Ilustrasi posisi jari saat memerah ASI dengan tangan',
                caption: 'Posisi jari membentuk huruf C saat memerah ASI',
                orientation: 'landscape',
                fit: 'contain',
              },
            ],
          },
        ],
      },
      {
        id: 'memerah-dengan-pompa',
        title: 'Memerah ASI dengan Pompa',
        summary: 'Gunakan pompa secara nyaman, bersih, dan sesuai kebutuhan.',
        sections: [
          {
            paragraphs: [
              'Pompa manual maupun elektrik dapat membantu pemerahan, tetapi bukan keharusan. Pilih ukuran corong yang nyaman dan gunakan tingkat isapan terendah yang efektif.',
            ],
            images: [
              {
                src: '/images/material/pompa-manual.webp',
                alt: 'Contoh pompa ASI manual',
                caption: 'Pompa manual',
                orientation: 'landscape',
                fit: 'contain',
                fullWidth: true,
              },
              {
                src: '/images/material/pompa-elektrik.webp',
                alt: 'Contoh pompa ASI elektrik',
                caption: 'Pompa elektrik',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Langkah memompa',
            steps: [
              'Cuci tangan dan siapkan pompa serta wadah bersih.',
              'Rakit pompa sesuai petunjuk alat.',
              'Tempatkan puting di tengah corong tanpa terjepit.',
              'Mulai dengan isapan rendah, lalu naikkan hanya sampai tingkat yang tetap nyaman.',
              'Lanjutkan sampai aliran melambat atau payudara terasa lebih nyaman.',
              'Pindahkan ASI ke wadah tertutup dan beri label tanggal serta jam.',
              'Bersihkan bagian pompa yang bersentuhan dengan ASI sesuai petunjuk penggunaan.',
            ],
          },
        ],
        callout: {
          title: 'Memompa tidak boleh menyakitkan',
          text: 'Nyeri dapat menandakan posisi atau ukuran corong kurang sesuai, tingkat isapan terlalu tinggi, atau ada masalah pada payudara.',
          tone: 'warning',
        },
      },
      {
        id: 'menyimpan-asi-perah',
        title: 'Menyimpan ASI Perah',
        summary: 'Wadah, pelabelan, suhu, dan lama penyimpanan yang aman.',
        sections: [
          {
            paragraphs: [
              'Gunakan botol atau kantong khusus ASI yang bersih, aman untuk pangan, dan dapat ditutup rapat. Simpan dalam porsi sesuai kebutuhan bayi dan beri label tanggal serta jam pemerahan.',
            ],
            images: [
              {
                src: '/images/material/botol-penyimpan-asi.webp',
                alt: 'Contoh wadah penyimpanan ASI perah',
                caption: 'Wadah penyimpanan ASI perah',
                orientation: 'portrait',
              },
              {
                src: '/images/material/cooler-bag.webp',
                alt: 'Contoh cooler bag untuk membawa ASI perah',
                caption: 'Cooler bag untuk perjalanan',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Panduan penyimpanan untuk bayi sehat cukup bulan',
            table: {
              headers: ['Kondisi ASI', 'Suhu ruang ≤25°C', 'Kulkas ±4°C', 'Freezer ≤-18°C'],
              rows: [
                [
                  'Baru diperah',
                  'Hingga 4 jam',
                  'Hingga 4 hari',
                  'Terbaik ≤6 bulan; dapat hingga 12 bulan',
                ],
                ['Sudah dicairkan', '1-2 jam', 'Hingga 24 jam', 'Jangan dibekukan kembali'],
                ['Sisa minum bayi', 'Gunakan dalam 2 jam', '-', '-'],
              ],
              note: 'Kebutuhan bayi prematur atau sedang sakit dapat berbeda. Ikuti arahan fasilitas kesehatan.',
            },
          },
          {
            title: 'Tips penyimpanan',
            bullets: [
              'Gunakan ASI yang tanggal pemerahan paling lama terlebih dahulu.',
              'Simpan di bagian dalam kulkas atau freezer, bukan di pintu.',
              'Sisakan ruang pada wadah karena ASI mengembang saat membeku.',
              'Dinginkan ASI yang baru diperah sebelum menggabungkannya dengan ASI yang sudah dingin.',
              'ASI dapat berada dalam cooler bag berisi ice pack hingga sekitar 24 jam.',
            ],
          },
        ],
      },
      {
        id: 'mencairkan-menyajikan-asi',
        title: 'Mencairkan dan Menyajikan ASI',
        summary: 'Cara mencairkan, menghangatkan, dan memberikan ASI perah.',
        sections: [
          {
            title: 'Mencairkan ASI',
            bullets: [
              'Pindahkan ASI beku ke kulkas semalaman.',
              'Atau aliri wadah dengan air suam-suam kuku atau rendam dalam wadah air hangat.',
              'Jangan menggunakan microwave atau memanaskan langsung di atas kompor.',
              'Jangan membekukan kembali ASI yang telah mencair sepenuhnya.',
            ],
          },
          {
            title: 'Menyajikan ASI',
            bullets: [
              'ASI dapat diberikan dingin, pada suhu ruang, atau hangat sesuai penerimaan bayi.',
              'Putar wadah perlahan untuk mencampurkan kembali lapisan lemak. Tidak perlu mengocok keras.',
              'Periksa suhu sebelum diberikan kepada bayi.',
              'Berikan perlahan menggunakan alat minum yang sesuai dan bersih.',
              'Buang sisa ASI yang tidak habis dalam 2 jam setelah bayi selesai minum.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tantangan-menyusui',
    title: 'Tantangan Menyusui',
    description: 'Kenali keluhan umum, langkah aman, dan waktu mencari bantuan.',
    icon: 'AlertCircle',
    image: '/images/education/tantangan-menyusui.webp',
    imageAlt: 'Ibu mendapat dukungan hangat saat menghadapi tantangan menyusui',
    subTopics: [
      {
        id: 'puting-lecet-dan-nyeri',
        title: 'Puting Lecet dan Nyeri',
        summary: 'Kenali tanda, perbaiki perlekatan, dan lindungi jaringan puting.',
        sections: [
          {
            paragraphs: [
              'Nyeri dan puting lecet sering muncul pada awal menyusui, tetapi nyeri yang berat atau menetap bukan sesuatu yang harus ditahan. Penyebab yang sering adalah posisi dan perlekatan yang belum efektif.',
            ],
            images: [
              {
                src: '/images/material/puting-lecet.webp',
                alt: 'Ilustrasi tingkat luka pada puting',
                caption: 'Gambaran puting lecet dari ringan hingga lebih berat',
                orientation: 'landscape',
                fit: 'contain',
                composition: {
                  width: 1400,
                  height: 1120,
                  panels: [{ x: 0, y: 195, width: 1400, height: 729, rotation: 180 }],
                },
              },
            ],
          },
          {
            title: 'Tanda yang dapat muncul',
            bullets: [
              'Rasa perih, panas, atau tertusuk saat maupun setelah menyusui.',
              'Puting tampak merah, retak, luka, atau sedikit berdarah.',
              'Puting tampak pipih atau berubah bentuk setelah bayi melepas payudara.',
            ],
          },
          {
            title: 'Yang dapat dilakukan',
            bullets: [
              'Periksa dan perbaiki posisi serta perlekatan bayi.',
              'Lepaskan isapan dengan jari bersih bila perlekatan terasa sakit, lalu coba kembali.',
              'Jaga puting tetap bersih dan kering; hindari sabun keras atau menggosok luka.',
              'Tetap menyusui atau memerah dengan nyaman bila memungkinkan.',
            ],
          },
        ],
        callout: {
          title: 'Perlu diperiksa',
          text: 'Cari bantuan bila luka memburuk, terdapat nanah, demam, nyeri tajam menetap, atau bayi sulit melekat.',
          tone: 'warning',
        },
      },
      {
        id: 'puting-datar',
        title: 'Puting Datar atau Terbenam',
        summary: 'Bayi melekat pada payudara, bukan hanya pada puting.',
        sections: [
          {
            paragraphs: [
              'Bentuk puting berbeda pada setiap ibu. Puting datar atau terbenam dapat membuat proses awal lebih menantang, tetapi banyak ibu tetap dapat menyusui karena bayi melekat pada jaringan payudara, bukan hanya puting.',
            ],
            images: [
              {
                src: '/images/material/puting-datar.webp',
                alt: 'Ilustrasi puting datar dari sisi samping dan depan',
                caption: 'Gambaran puting datar',
                orientation: 'landscape',
                fit: 'cover',
                objectPosition: 'center 43%',
              },
            ],
          },
          {
            title: 'Yang dapat membantu',
            bullets: [
              'Lakukan kontak kulit ke kulit dan tawarkan payudara saat bayi tenang.',
              'Bentuk payudara dengan tangan agar bayi lebih mudah memasukkan jaringan ke mulut.',
              'Perah sedikit ASI bila areola terlalu penuh dan keras.',
              'Minta konselor laktasi mengamati langsung posisi dan perlekatan.',
              'Gunakan alat bantu hanya setelah dinilai dan diarahkan tenaga terlatih.',
            ],
          },
        ],
      },
      {
        id: 'milk-blister',
        title: 'Milk Blister',
        summary: 'Bintik putih atau kekuningan pada puting yang dapat terasa nyeri.',
        sections: [
          {
            paragraphs: [
              'Milk blister atau nipple bleb tampak sebagai bintik kecil putih atau kekuningan pada permukaan puting. Kondisi ini berkaitan dengan peradangan pada saluran di dekat permukaan puting dan dapat terasa nyeri.',
            ],
            images: [
              {
                src: '/images/material/milk-blister.webp',
                alt: 'Ilustrasi bintik putih kecil pada puting',
                caption: 'Gambaran milk blister',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Yang dapat dilakukan',
            bullets: [
              'Tetap menyusui secara normal sesuai kebutuhan bayi bila nyaman.',
              'Gunakan kompres dingin setelah menyusui untuk membantu rasa nyeri dan bengkak.',
              'Hindari memencet, menusuk, atau mengelupas bintik sendiri.',
              'Hindari pijatan kuat dan pemerahan berlebihan.',
              'Periksakan bila nyeri berat, berulang, atau tidak membaik.',
            ],
          },
        ],
      },
      {
        id: 'nyeri-terbakar-pada-puting',
        title: 'Nyeri Terbakar pada Puting',
        summary: 'Gejala yang sering dianggap infeksi jamur perlu dinilai dengan tepat.',
        sections: [
          {
            paragraphs: [
              'Puting yang kemerahan, mengilap, bersisik, atau terasa terbakar dapat mempunyai banyak penyebab, antara lain iritasi, dermatitis, trauma perlekatan, vasospasme, atau infeksi tertentu. Gejala saja tidak cukup untuk memastikan infeksi jamur.',
            ],
            images: [
              {
                src: '/images/material/keluhan-puting-terbakar.webp',
                alt: 'Contoh perubahan pada puting yang perlu diperiksa tenaga kesehatan',
                caption: 'Keluhan pada puting dapat memiliki beberapa penyebab',
                orientation: 'landscape',
                fit: 'cover',
                objectPosition: 'center 66%',
              },
            ],
          },
          {
            title: 'Langkah aman',
            bullets: [
              'Jaga tangan dan perlengkapan menyusui tetap bersih.',
              'Ganti breast pad yang lembap dan hindari produk yang mengiritasi kulit.',
              'Periksa kembali posisi serta perlekatan bayi.',
              'Jangan menggunakan obat antijamur atau krim lain tanpa penilaian tenaga kesehatan.',
            ],
          },
        ],
        callout: {
          title: 'Diagnosis perlu pemeriksaan',
          text: 'Karena penyebab nyeri puting dapat mirip satu sama lain, konsultasikan keluhan yang menetap agar terapi sesuai penyebabnya.',
          tone: 'warning',
        },
      },
      {
        id: 'mastitis',
        title: 'Mastitis',
        summary: 'Peradangan payudara yang dapat disertai nyeri dan gejala seperti flu.',
        sections: [
          {
            paragraphs: [
              'Mastitis adalah bagian dari spektrum peradangan payudara. Payudara dapat terasa nyeri, bengkak, hangat, dan kemerahan. Sebagian ibu mengalami demam, menggigil, atau badan terasa lemas.',
            ],
            images: [
              {
                src: '/images/material/mastitis.webp',
                alt: 'Ilustrasi area payudara yang mengalami peradangan mastitis',
                caption: 'Gambaran area peradangan pada mastitis',
                orientation: 'portrait',
              },
            ],
          },
          {
            title: 'Perawatan awal',
            bullets: [
              'Lanjutkan menyusui sesuai kebutuhan bayi bila nyaman; ASI tetap aman bagi bayi.',
              'Hindari memompa berlebihan dengan tujuan mengosongkan payudara.',
              'Gunakan kompres dingin singkat untuk membantu bengkak dan nyeri.',
              'Istirahat, makan, dan minum secukupnya.',
              'Hindari pijatan dalam atau keras pada area yang meradang.',
            ],
          },
        ],
        callout: {
          title: 'Segera cari bantuan',
          text: 'Hubungi tenaga kesehatan bila demam atau gejala sistemik menetap lebih dari 24 jam, kondisi cepat memburuk, terdapat benjolan lunak, keluar nanah, atau ibu merasa sangat tidak sehat.',
          tone: 'warning',
        },
      },
      {
        id: 'bayi-menolak-menyusu',
        title: 'Bayi Menolak Menyusu',
        summary: 'Penolakan menyusu sering sementara dan dapat dicari penyebabnya.',
        sections: [
          {
            paragraphs: [
              'Bayi dapat menolak kedua payudara secara tiba-tiba meskipun sebelumnya menyusu dengan baik. Kondisi ini sering bersifat sementara.',
            ],
          },
          {
            title: 'Kemungkinan penyebab',
            bullets: [
              'Bayi tidak nyaman karena tumbuh gigi, sariawan, telinga sakit, atau hidung tersumbat.',
              'Lingkungan terlalu ramai, bising, atau membuat bayi kewalahan.',
              'Bayi terkejut atau pernah mengalami pengalaman tidak nyaman saat menyusu.',
              'Perubahan aroma ibu dari sabun, parfum, atau produk baru.',
              'Perubahan rasa ASI pada kondisi tertentu.',
              'Ibu sangat lelah, stres, atau sedang kesakitan.',
            ],
          },
          {
            title: 'Yang dapat dicoba',
            bullets: [
              'Menyusui di tempat yang tenang dan redup.',
              'Lakukan kontak kulit ke kulit.',
              'Tawarkan payudara saat tanda lapar awal muncul atau ketika bayi mengantuk.',
              'Tenangkan bayi dan jangan memaksanya menyusu.',
              'Perah ASI untuk menjaga kenyamanan serta asupan bayi bila penolakan berlanjut.',
            ],
          },
        ],
        callout: {
          title: 'Pantau asupan bayi',
          text: 'Segera cari bantuan jika bayi terus menolak minum, buang air kecil berkurang, tampak lemas, atau menunjukkan tanda sakit.',
          tone: 'warning',
        },
      },
      {
        id: 'menolak-satu-payudara',
        title: 'Menolak Satu Payudara',
        summary: 'Perbedaan aliran, bentuk puting, atau kenyamanan posisi dapat berpengaruh.',
        sections: [
          {
            paragraphs: [
              'Sebagian bayi lebih menyukai satu sisi. Hal ini dapat berkaitan dengan aliran ASI, bentuk puting, payudara yang bengkak atau nyeri, maupun rasa tidak nyaman pada leher bayi.',
            ],
          },
          {
            title: 'Yang dapat dicoba',
            bullets: [
              'Gunakan posisi berbeda sambil mempertahankan arah tubuh bayi yang disukai.',
              'Tawarkan sisi yang kurang disukai saat bayi tenang dan masih lapar.',
              'Mulai dari sisi favorit, kemudian berpindah setelah refleks pengeluaran ASI terjadi.',
              'Perah sedikit ASI bila payudara terlalu penuh atau aliran awal terlalu deras.',
              'Jangan memaksa; tetap tawarkan secara perlahan dan konsisten.',
            ],
          },
        ],
        callout: {
          title: 'Periksa bila menetap',
          text: 'Penolakan satu sisi yang mendadak atau menetap perlu dinilai, terutama bila bayi tampak kesakitan saat menoleh atau payudara ibu memiliki benjolan dan nyeri.',
          tone: 'warning',
        },
      },
      {
        id: 'relaktasi',
        title: 'Relaktasi',
        summary: 'Membangun kembali produksi ASI setelah sempat berkurang atau berhenti.',
        sections: [
          {
            paragraphs: [
              'Relaktasi adalah proses memulai kembali menyusui setelah sempat berhenti atau produksi ASI menurun. Proses ini dapat memerlukan beberapa hari hingga beberapa minggu dan hasilnya berbeda pada setiap ibu.',
            ],
          },
          {
            title: 'Faktor yang memengaruhi',
            bullets: [
              'Frekuensi bayi menyusu atau ASI diperah.',
              'Usia bayi dan lamanya jeda berhenti menyusui.',
              'Kenyamanan, motivasi, dan kondisi kesehatan ibu.',
              'Kemampuan bayi melekat dan mengisap efektif.',
              'Dukungan keluarga serta tenaga kesehatan.',
            ],
          },
          {
            title: 'Langkah yang dapat membantu',
            bullets: [
              'Lakukan kontak kulit ke kulit sesering mungkin.',
              'Tawarkan payudara saat bayi tenang, tanpa memaksa.',
              'Berikan stimulasi payudara secara teratur melalui menyusui atau pemerahan.',
              'Pastikan kebutuhan nutrisi bayi tetap terpenuhi selama proses berlangsung.',
              'Gunakan alat bantu hanya dengan arahan tenaga kesehatan bila diperlukan.',
            ],
          },
        ],
        callout: {
          title: 'Proses bertahap',
          text: 'Keberhasilan relaktasi tidak selalu berarti kembali ke ASI penuh. Setiap peningkatan produksi tetap bermakna, dan kebutuhan bayi harus selalu menjadi prioritas.',
          tone: 'info',
        },
      },
    ],
  },
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'BookOpen':
      return <BookOpen className="w-6 h-6" />;
    case 'Droplets':
      return <Droplets className="w-6 h-6" />;
    case 'Utensils':
      return <Utensils className="w-6 h-6" />;
    case 'AlertCircle':
      return <AlertCircle className="w-6 h-6" />;
    case 'Heart':
      return <Heart className="w-6 h-6" />;
    case 'Activity':
      return <Activity className="w-6 h-6" />;
    case 'Clock':
      return <Clock className="w-6 h-6" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-6 h-6" />;
    case 'HelpCircle':
      return <HelpCircle className="w-6 h-6" />;
    default:
      return <BookOpen className="w-6 h-6" />;
  }
};
