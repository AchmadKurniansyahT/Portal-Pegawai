import { ArrowRight, BookOpen, CheckCircle2, ClipboardList, Compass, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { KategoriKompetensi, Pelatihan, ProfilPegawai, ScreenId } from '../types/kompetensi';

interface BerandaScreenProps {
  profil: ProfilPegawai;
  allTrainings: Pelatihan[];
  selectedTrainings: Pelatihan[];
  onNavigate: (screen: ScreenId) => void;
  onNavigateCatalogCategory: (category: KategoriKompetensi) => void;
  onRemoveIdp: (id: string) => void;
  onSelectDetail: (pelatihan: Pelatihan) => void;
}

export function BerandaScreen({
  profil,
  allTrainings,
  selectedTrainings,
  onNavigate,
  onNavigateCatalogCategory,
  onRemoveIdp,
  onSelectDetail,
}: BerandaScreenProps) {
  const [bannerError, setBannerError] = useState(false);

  const recommendedCount = allTrainings.filter((t) => t.direkomendasikan).length;
  const totalJp = selectedTrainings.reduce((acc, item) => acc + item.durasiJp, 0);
  const progressPercent = Math.min(100, Math.round((totalJp / profil.targetJpTahunan) * 100));

  const kategoriSummary: { kategori: KategoriKompetensi; ringkasan: string; count: number }[] = [
    {
      kategori: 'Kompetensi Teknis',
      ringkasan: 'Arsitektur sistem, keamanan siber, tata kelola data, dan infrastruktur awan.',
      count: allTrainings.filter((t) => t.kategori === 'Kompetensi Teknis').length,
    },
    {
      kategori: 'Kompetensi Manajerial',
      ringkasan: 'Kepemimpinan transformasi digital, manajemen perubahan, dan koordinasi tim.',
      count: allTrainings.filter((t) => t.kategori === 'Kompetensi Manajerial').length,
    },
    {
      kategori: 'Kompetensi Sosial Kultural',
      ringkasan: 'Komunikasi publik inklusif, aksesibilitas, dan etika pelayanan digital.',
      count: allTrainings.filter((t) => t.kategori === 'Kompetensi Sosial Kultural').length,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner: Formal Komdigi Navy Surface */}
      <section
        aria-labelledby="beranda-sapaan"
        className="relative overflow-hidden rounded-2xl bg-[#0A244D] text-white border border-[#061733]"
      >
        {!bannerError && (
          <img
            src="/src/assets/images/komdigi_portal_banner_1794886222022.jpg"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBannerError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#061733]/95 via-[#0A244D]/88 to-[#004B93]/70"
        />

        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-11 max-w-3xl">
          <p className="text-xs sm:text-sm font-medium text-sky-200 tracking-wide">
            {profil.kementerian}
          </p>

          <h1
            id="beranda-sapaan"
            className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]"
          >
            Selamat Datang, {profil.nama}
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-sky-100">
            {profil.jabatan} · {profil.unitKerja}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            Kelola rencana pengembangan kompetensi tahunan Anda secara terstruktur. Tersedia{' '}
            <span className="font-semibold text-white tabular-nums">{recommendedCount} pelatihan rekomendasi</span>{' '}
            yang disesuaikan dengan kebutuhan jabatan fungsional Anda.
          </p>

          {/* Shortcut Buttons to Rekomendasi, Katalog, and Draf IDP */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('rekomendasi')}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-white text-[#0A244D] hover:bg-sky-50 font-semibold text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A244D] focus-visible:ring-white"
            >
              <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Lihat Rekomendasi</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('katalog')}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-white/12 text-white border border-white/25 hover:bg-white/20 font-medium text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A244D] focus-visible:ring-white"
            >
              <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Katalog Pelatihan</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('idp')}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-white/12 text-white border border-white/25 hover:bg-white/20 font-medium text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A244D] focus-visible:ring-white"
            >
              <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">Draf IDP ({selectedTrainings.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main 2-Column Overview: Position Summary & IDP Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Ringkasan Jabatan */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#004B93]">Informasi Pegawai</p>
                <h2 className="mt-1 text-lg sm:text-xl font-semibold text-[#0A244D]">
                  Ringkasan Jabatan
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('profil')}
                className="min-h-[40px] text-xs font-medium text-[#004B93] hover:text-[#0A244D] inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Profil Saya</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <dl className="mt-4 divide-y divide-slate-100 text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-slate-500 font-medium">Nama Pengguna</dt>
                <dd className="font-semibold text-[#0A244D] sm:text-right">{profil.nama}</dd>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-slate-500 font-medium">Jabatan Fungsional</dt>
                <dd className="font-semibold text-[#0A244D] sm:text-right">{profil.jabatan}</dd>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-slate-500 font-medium">Unit Kerja</dt>
                <dd className="font-medium text-slate-800 sm:text-right">{profil.unitKerja}</dd>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-slate-500 font-medium">Target Pengembangan Tahunan</dt>
                <dd className="font-semibold text-[#004B93] tabular-nums sm:text-right">
                  {profil.targetJpTahunan} JP / Tahun
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500">
              Fokus Kompetensi Jabatan Fungsional
            </h3>
            <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-700">
              {profil.rumpunKompetensi.map((rumpun, index) => (
                <li key={rumpun} className="flex items-start gap-2.5">
                  <span className="tabular-nums text-xs font-semibold text-[#004B93] mt-0.5 shrink-0">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-snug">{rumpun}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Ringkasan Draf IDP */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#004B93]">Status Tahunan</p>
                <h2 className="mt-1 text-lg sm:text-xl font-semibold text-[#0A244D]">
                  Draf IDP Anda
                </h2>
              </div>
              <span className="text-sm font-semibold text-[#0A244D] tabular-nums shrink-0">
                {selectedTrainings.length} Pelatihan
              </span>
            </div>

            {/* JP Progress */}
            <div className="mt-5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-slate-600 font-medium">Akumulasi Jam Pelajaran</span>
                <span className="font-semibold text-[#0A244D] tabular-nums">
                  {totalJp} / {profil.targetJpTahunan} JP ({progressPercent}%)
                </span>
              </div>
              <div
                className="mt-2.5 h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Persentase pemenuhan target JP tahunan"
              >
                <div
                  className="h-full bg-[#004B93] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {totalJp >= profil.targetJpTahunan ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Target minimal 20 JP tahunan telah terpenuhi.</span>
                  </span>
                ) : (
                  `Tambahkan pelatihan untuk memenuhi kebutuhan ${profil.targetJpTahunan - totalJp} JP tersisa.`
                )}
              </p>
            </div>

            {/* Selected Trainings List or Empty State */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              {selectedTrainings.length === 0 ? (
                <div className="py-4">
                  <p className="text-sm font-medium text-[#0A244D]">
                    Belum ada pelatihan yang dipilih
                  </p>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Mulai susun rencana pengembangan Anda melalui daftar rekomendasi prioritas atau katalog pelatihan.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {selectedTrainings.map((item) => (
                    <li
                      key={item.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectDetail(item)}
                        className="text-left min-w-0 flex-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] rounded"
                      >
                        <p className="text-xs text-slate-500 tabular-nums">
                          {item.durasiJp} JP · {item.metode}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-[#0A244D] group-hover:text-[#004B93] line-clamp-2 transition-colors">
                          {item.judul}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveIdp(item.id)}
                        aria-label={`Hapus ${item.judul} dari IDP`}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('idp')}
              className="min-h-[44px] text-sm font-medium text-[#004B93] hover:text-[#0A244D] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Kelola Draf IDP</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Competency Pillars Quick Access */}
      <section aria-labelledby="pilar-kompetensi-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-[#004B93]">Struktur Pengembangan</p>
            <h2
              id="pilar-kompetensi-heading"
              className="mt-0.5 text-lg sm:text-xl font-semibold text-[#0A244D]"
            >
              Pilar Kompetensi Aparatur
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Pilih kategori untuk menelusuri katalog pelatihan terkait
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kategoriSummary.map((item) => (
            <button
              key={item.kategori}
              type="button"
              onClick={() => onNavigateCatalogCategory(item.kategori)}
              className="text-left bg-white border border-slate-200 hover:border-[#004B93] rounded-2xl p-5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3]"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                <span className="tabular-nums text-[#004B93] font-semibold">
                  {item.count} Pelatihan
                </span>
                <ArrowRight
                  className="w-4 h-4 text-slate-400 group-hover:text-[#004B93] transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-2 text-base font-semibold text-[#0A244D]">
                {item.kategori}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.ringkasan}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
