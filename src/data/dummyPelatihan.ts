import type { KategoriKompetensi, MetodePelatihan, Pelatihan, ProfilPegawai, TingkatPrioritas } from '../types/kompetensi';

export const PROFIL_PEGAWAI: ProfilPegawai = {
  nama: 'Achmad K',
  jabatan: 'Pranata Komputer Ahli Madya',
  jenjang: 'Ahli Madya',
  unitKerja: 'Ditjen Teknologi Pemerintah Digital',
  kementerian: 'Kementerian Komunikasi dan Digital',
  targetJpTahunan: 20,
  rumpunKompetensi: [
    'Arsitektur Layanan Pemerintah Digital',
    'Keamanan Informasi & Ketahanan Siber',
    'Tata Kelola Data Sektor Publik',
    'Kepemimpinan Transformasi Digital',
  ],
  kompetensiDimiliki: ['Pengembangan Aplikasi', 'Infrastruktur TI'],
  kompetensiDikembangkan: ['Keamanan Informasi', 'Manajemen Data'],
};

interface RawPelatihanRow {
  kode: string;
  judul: string;
  jenis: string;
  kompetensi: string;
  jabatanSasaran: string[];
  mode: MetodePelatihan;
  durasiJp: number;
  level: 'Dasar' | 'Menengah' | 'Lanjut';
}

const RAW_PELATIHAN: RawPelatihanRow[] = [
  {
    kode: 'PL-01',
    judul: 'Dasar Keamanan Informasi Untuk ASN',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 8,
    level: 'Dasar',
  },
  {
    kode: 'PL-02',
    judul: 'Penanganan Insiden Siber',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-03',
    judul: 'Tata Kelola Dan Kualitas Data',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Dasar',
  },
  {
    kode: 'PL-04',
    judul: 'Analisis Data Dengan Spreadsheet',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Analis SDM Aparatur', 'Analis Kebijakan'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Dasar',
  },
  {
    kode: 'PL-05',
    judul: 'Pengembangan Aplikasi Web Dengan Low-Code',
    jenis: 'Pelatihan',
    kompetensi: 'Pengembangan Aplikasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-06',
    judul: 'Administrasi Server Dan Jaringan',
    jenis: 'Pelatihan',
    kompetensi: 'Infrastruktur TI',
    jabatanSasaran: ['Pranata Komputer', 'Pengendali Frekuensi Radio'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-07',
    judul: 'Manajemen Talenta ASN',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen SDM',
    jabatanSasaran: ['Analis SDM Aparatur'],
    mode: 'Daring',
    durasiJp: 16,
    level: 'Menengah',
  },
  {
    kode: 'PL-08',
    judul: 'Penyusunan Policy Brief',
    jenis: 'Pelatihan',
    kompetensi: 'Analisis Kebijakan',
    jabatanSasaran: ['Analis Kebijakan'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Menengah',
  },
  {
    kode: 'PL-09',
    judul: 'Monitoring Spektrum Frekuensi Radio',
    jenis: 'Pelatihan',
    kompetensi: 'Pengelolaan Spektrum Frekuensi',
    jabatanSasaran: ['Pengendali Frekuensi Radio'],
    mode: 'Luring',
    durasiJp: 32,
    level: 'Lanjut',
  },
  {
    kode: 'PL-10',
    judul: 'Manajemen Proyek TI Pemerintah',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Proyek',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 16,
    level: 'Menengah',
  },
  {
    kode: 'PL-11',
    judul: 'Keamanan Aplikasi Web Berbasis OWASP',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-12',
    judul: 'Manajemen Risiko Keamanan Informasi Berbasis ISO/IEC 27001',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer', 'Penata Kelola Informatika SPBE'],
    mode: 'Daring',
    durasiJp: 16,
    level: 'Menengah',
  },
  {
    kode: 'PL-13',
    judul: 'Pengujian Penetrasi Sistem Pemerintah',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 40,
    level: 'Lanjut',
  },
  {
    kode: 'PL-14',
    judul: 'Forensik Digital Dasar',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-15',
    judul: 'Operasional Security Operations Center (SOC)',
    jenis: 'Pelatihan',
    kompetensi: 'Keamanan Informasi',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 32,
    level: 'Lanjut',
  },
  {
    kode: 'PL-16',
    judul: 'Pelindungan Data Pribadi Untuk ASN',
    jenis: 'Pelatihan',
    kompetensi: 'Pelindungan Data Pribadi',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 8,
    level: 'Dasar',
  },
  {
    kode: 'PL-17',
    judul: 'Penyusunan Penilaian Dampak Pelindungan Data Pribadi (DPIA)',
    jenis: 'Pelatihan',
    kompetensi: 'Pelindungan Data Pribadi',
    jabatanSasaran: ['Pranata Komputer', 'Analis Kebijakan'],
    mode: 'Daring',
    durasiJp: 16,
    level: 'Menengah',
  },
  {
    kode: 'PL-18',
    judul: 'Peran Dan Tugas Pejabat Pelindungan Data Pribadi',
    jenis: 'Pelatihan',
    kompetensi: 'Pelindungan Data Pribadi',
    jabatanSasaran: ['Penata Kelola Informatika SPBE', 'Analis Kebijakan'],
    mode: 'Luring',
    durasiJp: 24,
    level: 'Lanjut',
  },
  {
    kode: 'PL-19',
    judul: 'Visualisasi Data Dan Dashboard Kinerja',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Dasar',
  },
  {
    kode: 'PL-20',
    judul: 'SQL Untuk Analisis Data Pemerintah',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Pranata Komputer', 'Analis Kebijakan'],
    mode: 'Daring',
    durasiJp: 16,
    level: 'Menengah',
  },
  {
    kode: 'PL-21',
    judul: 'Analisis Data Dengan Python',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Daring',
    durasiJp: 24,
    level: 'Menengah',
  },
  {
    kode: 'PL-22',
    judul: 'Implementasi Satu Data Indonesia',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Pranata Komputer', 'Penata Kelola Informatika SPBE'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Menengah',
  },
  {
    kode: 'PL-23',
    judul: 'Rekayasa Data Dan Pipeline ETL',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 32,
    level: 'Lanjut',
  },
  {
    kode: 'PL-24',
    judul: 'Storytelling Dengan Data',
    jenis: 'Pelatihan',
    kompetensi: 'Manajemen Data',
    jabatanSasaran: ['Pranata Humas', 'Analis Kebijakan'],
    mode: 'Daring',
    durasiJp: 8,
    level: 'Dasar',
  },
  {
    kode: 'PL-25',
    judul: 'Pengenalan Kecerdasan Artifisial Untuk ASN',
    jenis: 'Pelatihan',
    kompetensi: 'Kecerdasan Artifisial',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 8,
    level: 'Dasar',
  },
  {
    kode: 'PL-26',
    judul: 'Pemanfaatan Generative AI Untuk Produktivitas Kerja',
    jenis: 'Pelatihan',
    kompetensi: 'Kecerdasan Artifisial',
    jabatanSasaran: ['Semua Jabatan'],
    mode: 'Daring',
    durasiJp: 8,
    level: 'Dasar',
  },
  {
    kode: 'PL-27',
    judul: 'Machine Learning Untuk Layanan Publik',
    jenis: 'Pelatihan',
    kompetensi: 'Kecerdasan Artifisial',
    jabatanSasaran: ['Pranata Komputer'],
    mode: 'Luring',
    durasiJp: 32,
    level: 'Lanjut',
  },
  {
    kode: 'PL-28',
    judul: 'Etika Dan Tata Kelola Kecerdasan Artifisial',
    jenis: 'Pelatihan',
    kompetensi: 'Kecerdasan Artifisial',
    jabatanSasaran: ['Analis Kebijakan', 'Penata Kelola Informatika SPBE'],
    mode: 'Daring',
    durasiJp: 12,
    level: 'Menengah',
  },
];

function mapKategori(kompetensi: string): KategoriKompetensi {
  if (kompetensi === 'Manajemen SDM' || kompetensi === 'Manajemen Proyek') {
    return 'Kompetensi Manajerial';
  }
  if (kompetensi === 'Analisis Kebijakan') {
    return 'Kompetensi Sosial Kultural';
  }
  return 'Kompetensi Teknis';
}

const PRIORITAS_UTAMA_KODE = new Set(['PL-02', 'PL-11', 'PL-12', 'PL-20']);
const DIREKOMENDASIKAN_KODE = new Set(['PL-02', 'PL-11', 'PL-12', 'PL-20', 'PL-21', 'PL-22']);

export const PELATIHAN_DUMMY: Pelatihan[] = RAW_PELATIHAN.map((row) => {
  const isRecommended = DIREKOMENDASIKAN_KODE.has(row.kode);
  const prioritas: TingkatPrioritas = PRIORITAS_UTAMA_KODE.has(row.kode)
    ? 'Prioritas Utama'
    : isRecommended
      ? 'Direkomendasikan'
      : 'Pengembangan Lanjutan';

  return {
    id: row.kode,
    kode: row.kode,
    judul: row.judul,
    jenis: row.jenis,
    kompetensi: row.kompetensi,
    jabatanSasaran: row.jabatanSasaran,
    mode: row.mode,
    durasi: `${row.durasiJp} JP`,
    level: row.level,
    kategori: mapKategori(row.kompetensi),
    metode: row.mode,
    durasiJp: row.durasiJp,
    jadwal: `Level ${row.level} · ${row.durasiJp} JP`,
    penyelenggara: 'Pusat Pengembangan Kompetensi Komdigi',
    sasaranJenjang: row.jabatanSasaran.join(', '),
    direkomendasikan: isRecommended,
    prioritas,
    ringkasan: `${row.jenis} ${row.kompetensi.toLowerCase()} tingkat ${row.level.toLowerCase()} untuk mendukung penguatan kapasitas jabatan ${row.jabatanSasaran.join(', ')}.`,
    tujuanPembelajaran: `Meningkatkan pemahaman dan keterampilan praktis pada kompetensi ${row.kompetensi} sesuai standar pembelajaran aparatur tingkat ${row.level}.`,
    materiPokok: [
      `Konsep Dasar dan Kebijakan ${row.kompetensi}`,
      `Penerapan Teknis ${row.judul}`,
      'Studi Kasus Layanan Pemerintah Digital',
      'Evaluasi Pemahaman dan Rencana Tindak Lanjut',
    ],
  };
});
