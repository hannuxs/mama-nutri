import React from 'react';
import {
  BookOpen,
  Droplets,
  Utensils,
  AlertCircle,
  Heart,
  Activity,
  Clock,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export interface SubTopic {
  id: string;
  title: string;
  content: string;
}

export interface EducationCategory {
  id: string;
  title: string;
  icon: string;
  subTopics: SubTopic[];
}

export const EDUCATION_DATA: EducationCategory[] = [
  {
    id: 'menyusui-1',
    title: 'Menyusui 1 - Pengetahuan Dasar',
    icon: 'BookOpen',
    subTopics: [
      {
        id: '1-1',
        title: 'Manfaat Menyusui',
        content: `ASI merupakan makanan terbaik bagi bayi karena mengandung zat gizi lengkap seperti protein, lemak, karbohidrat, vitamin, mineral, serta antibodi. Kandungan asam lemak esensial seperti DHA dan AA berkontribusi terhadap perkembangan otak. Bagi ibu, menyusui merangsang hormon oksitosin untuk kontraksi uterus, mempercepat pemulihan pascapersalinan, serta menurunkan risiko kanker payudara dan osteoporosis.`,
      },
      {
        id: '1-2',
        title: 'Puting Lecet',
        content: `Puting susu lecet sering terjadi akibat trauma mekanis atau perlekatan yang tidak tepat. Penanganan melibatkan intervensi topikal seperti ASI, peppermint, olive oil, atau lanolin. Kompres hangat dan penggunaan hydrogel juga dapat membantu penyembuhan dalam waktu 7-14 hari.`,
      },
      {
        id: '1-3',
        title: 'Nyeri Saat Menyusui',
        content: `Nyeri dapat menimbulkan ketakutan dan stres pada ibu. Penyebab paling umum adalah teknik perlekatan yang tidak tepat yang menyebabkan peregangan kulit puting dan areola tidak merata.`,
      },
      {
        id: '1-4',
        title: 'Puting Rata',
        content: `Penanganan puting datar atau terbenam dapat dilakukan melalui edukasi kesehatan dan intervensi noninvasif. Teknik manual seperti penekanan pada kedua sisi puting hingga menonjol dapat dilakukan secara rutin.`,
      },
      {
        id: '1-5',
        title: 'Milk Blister',
        content: `Milk blister atau "jerawat pada puting" adalah sumbatan pada saluran ASI yang ditandai dengan peradangan dan lesi lepuhan putih. Faktor pemicunya antara lain hiperlaktasi atau kandungan lemak ASI yang tinggi.`,
      },
      {
        id: '1-6',
        title: 'Infeksi Jamur',
        content: `Infeksi jamur (Candida spp.) menyebabkan nyeri seperti sensasi terbakar yang dapat menyebar ke payudara. Tanda klinis meliputi puting kemerahan/mengkilap dan muncul kerak.`,
      },
      {
        id: '1-7',
        title: 'Mastitis',
        content: `Mastitis adalah peradangan jaringan payudara yang ditandai dengan nyeri, kemerahan, pembengkakan, dan rasa panas, terkadang disertai demam. Faktor risikonya meliputi kelelahan, stres, dan teknik menyusui yang tidak tepat.`,
      },
    ],
  },
  {
    id: 'menyusui-2',
    title: 'Menyusui 2 - Hari Pertama',
    icon: 'Droplets',
    subTopics: [
      {
        id: '2-1',
        title: 'Prinsip Produksi ASI',
        content: `Proses laktogenesis melibatkan hormon prolaktin (merangsang produksi) dan oksitosin (mendorong ASI keluar). Produksi ASI mengikuti prinsip "supply by demand": semakin sering bayi mengisap, semakin banyak ASI yang diproduksi.`,
      },
      {
        id: '2-2',
        title: 'Gizi Ibu Menyusui',
        content: `Ibu menyusui memerlukan tambahan energi, protein (20g/hari di 6 bulan pertama), lemak, serta vitamin dan mineral (Kalsium, Iodium, Seng). Konsumsi vitamin prenatal dan tablet tambah darah sangat dianjurkan.`,
      },
      {
        id: '2-3',
        title: 'Posisi Menyusui',
        content: `Beberapa posisi nyaman: 1. Cradle Hold (menopang bayi di lekukan lengan), 2. Football Hold (bayi di samping tubuh seperti memegang bola), 3. Cross-Cradle Hold (kontrol kepala lebih baik), 4. Side-Lying (berbaring miring, cocok untuk malam hari atau pasca sesar).`,
      },
      {
        id: '2-4',
        title: 'Tanda Perlekatan Baik',
        content: `Tanda perlekatan yang baik: 1. Dagu menempel payudara, 2. Mulut terbuka lebar, 3. Bibir bawah terlipat ke luar, 4. Sebagian besar areola masuk ke mulut, 5. Pipi tampak berisi, 6. Terdengar bunyi menelan (bukan decak), 7. Ibu tidak nyeri.`,
      },
      {
        id: '2-5',
        title: 'Tanda Kecukupan ASI',
        content: `Indikator bayi cukup ASI: Berat badan meningkat sesuai kurva, buang air kecil minimal 6 kali per hari, bayi tampak puas dan tenang setelah menyusu, serta kulit lembab dan mata cerah.`,
      },
    ],
  },
  {
    id: 'menyusui-3',
    title: 'Menyusui 3 - Beraktivitas',
    icon: 'Activity',
    subTopics: [
      {
        id: '3-1',
        title: 'Persiapan Kembali Bekerja',
        content: `Melibatkan aspek fisik dan psikososial. Olahraga ringan seperti jalan kaki (60 menit/minggu) dapat meningkatkan kebugaran. Dukungan pasangan dan keluarga sangat penting untuk keberlanjutan menyusui saat ibu kembali bekerja.`,
      },
      {
        id: '3-2',
        title: 'Teknik Memerah ASI',
        content: `Memerah dengan tangan sangat dianjurkan di hari-hari pertama (kolostrum). Langkah: Cuci tangan, kompres hangat, raba area penuh, posisikan jari membentuk "C", tekan lembut ke arah dada lalu lepaskan berirama. Memerah dengan pompa juga bisa dilakukan dengan memperhatikan kebersihan alat.`,
      },
      {
        id: '3-3',
        title: 'Menyimpan ASI Perah',
        content: `Simpan dalam botol kaca/plastik bebas BPA. Daya tahan: Suhu ruangan (≤25°C) 6-8 jam, Cooler bag dengan ice pack 24 jam, Lemari es (4°C) beberapa hari, Freezer (-15°C) hingga 2 minggu, Deep freezer (-20°C) 6-12 bulan.`,
      },
      {
        id: '3-4',
        title: 'Menyajikan ASI Perah',
        content: `Gunakan cup feeder, sendok, atau pipet (hindari dot). Cairkan ASI beku di lemari es semalam sebelumnya. Hangatkan dengan air mengalir atau wadah air hangat. Jangan gunakan microwave atau kompor karena merusak antibodi.`,
      },
    ],
  },
  {
    id: 'menyusui-4',
    title: 'Menyusui 4 - Tantangan',
    icon: 'AlertCircle',
    subTopics: [
      {
        id: '4-1',
        title: 'Bayi Menolak Menyusu',
        content: `Breast refusal dipengaruhi faktor ibu (kepercayaan diri rendah, stres), bayi (teknik kurang tepat), atau lingkungan. Pendekatan yang responsif dan menciptakan pengalaman menyusui yang nyaman dapat membantu bayi kembali menerima ASI.`,
      },
      {
        id: '4-2',
        title: 'Relaktasi',
        content: `Relaktasi adalah proses pemulihan produksi ASI setelah sempat terhenti. Dilakukan melalui stimulasi payudara rutin (meningkatkan prolaktin & oksitosin), menyusui langsung, teknik suplementasi, dan pijat oksitosin dengan pendampingan intensif.`,
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
