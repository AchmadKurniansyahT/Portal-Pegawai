export type ScreenId = 'beranda' | 'profil' | 'katalog' | 'rekomendasi' | 'idp';

export type KategoriKompetensi =
  | 'Kompetensi Teknis'
  | 'Kompetensi Manajerial'
  | 'Kompetensi Sosial Kultural';

export type MetodePelatihan = 'Daring' | 'Hibrida' | 'Luring';

export type TingkatPrioritas = 'Prioritas Utama' | 'Direkomendasikan' | 'Pengembangan Lanjutan';

export interface ProfilPegawai {
  nama: string;
  jabatan: string;
  jenjang: string;
  unitKerja: string;
  kementerian: string;
  targetJpTahunan: number;
  rumpunKompetensi: string[];
  kompetensiDimiliki: string[];
  kompetensiDikembangkan: string[];
}

export interface Pelatihan {
  id: string;
  kode: string;
  judul: string;
  jenis: string;
  kompetensi: string;
  jabatanSasaran: string[];
  mode: MetodePelatihan;
  durasi: string;
  level: 'Dasar' | 'Menengah' | 'Lanjut';
  kategori: KategoriKompetensi;
  metode: MetodePelatihan;
  durasiJp: number;
  jadwal: string;
  penyelenggara: string;
  sasaranJenjang: string;
  direkomendasikan: boolean;
  prioritas: TingkatPrioritas;
  ringkasan: string;
  tujuanPembelajaran: string;
  materiPokok: string[];
}
