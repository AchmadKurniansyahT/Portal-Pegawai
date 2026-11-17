import { ArrowRight, BookOpen, CheckCircle2, Compass, Trash2 } from 'lucide-react';
import type { Pelatihan, ScreenId } from '../types/kompetensi';

interface DrafIdpScreenProps {
  selectedTrainings: Pelatihan[];
  targetJp: number;
  onRemoveIdp: (id: string) => void;
  onSelectDetail: (pelatihan: Pelatihan) => void;
  onNavigate: (screen: ScreenId) => void;
}

export function DrafIdpScreen({
  selectedTrainings,
  targetJp,
  onRemoveIdp,
  onSelectDetail,
  onNavigate,
}: DrafIdpScreenProps) {
  const totalJp = selectedTrainings.reduce((sum, item) => sum + item.durasiJp, 0);
  const progressPercent = Math.min(100, Math.round((totalJp / targetJp) * 100));

  return (
    <div className="space-y-6">
      {/* Header & Summary Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-[#004B93]">
              Individual Development Plan (IDP)
            </p>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0A244D] tracking-tight">
              Draf IDP Pegawai
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Daftar pelatihan pilihan Anda yang tersimpan otomatis pada peramban ini. Kelola pelatihan untuk memenuhi target minimal tahunan.
            </p>
          </div>

          {/* Total JP Summary Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 min-w-[240px] shrink-0">
            <p className="text-xs font-medium text-slate-500">Total Jam Pelajaran (JP)</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#0A244D] tabular-nums">
                {totalJp} JP
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                / target {targetJp} JP
              </span>
            </div>
            <div
              className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres target JP pada Draf IDP"
            >
              <div
                className="h-full bg-[#004B93] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-600 tabular-nums">
              {totalJp >= targetJp ? (
                <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Target {targetJp} JP terpenuhi</span>
                </span>
              ) : (
                `${selectedTrainings.length} pelatihan terpilih · Kurang ${targetJp - totalJp} JP`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Selected Trainings Table or Empty State */}
      {selectedTrainings.length === 0 ? (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-lg font-semibold text-[#0A244D]">
            Draf IDP Masih Kosong
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Belum ada pelatihan yang ditambahkan. Telusuri pelatihan rekomendasi atau katalog untuk menyusun draf IDP Anda.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('rekomendasi')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#0A244D] hover:bg-[#004B93] inline-flex items-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Lihat Rekomendasi</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('katalog')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-[#0A244D] bg-white border border-slate-300 hover:bg-slate-50 inline-flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Katalog Pelatihan</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-[#0A244D]">
              Tabel Pelatihan Pilihan
            </h2>
            <span className="text-xs sm:text-sm font-medium text-slate-500 tabular-nums">
              {selectedTrainings.length} Pelatihan
            </span>
          </div>

          {/* Desktop & Tablet Formal Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th scope="col" className="py-3.5 px-6 whitespace-nowrap">
                    Kode
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Judul Pelatihan
                  </th>
                  <th scope="col" className="py-3.5 px-4 whitespace-nowrap">
                    Kategori
                  </th>
                  <th scope="col" className="py-3.5 px-4 whitespace-nowrap">
                    Metode
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right whitespace-nowrap">
                    Durasi
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right whitespace-nowrap">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {selectedTrainings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-xs font-semibold text-[#004B93] tabular-nums whitespace-nowrap align-top">
                      {item.kode}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <button
                        type="button"
                        onClick={() => onSelectDetail(item)}
                        className="text-left font-semibold text-[#0A244D] hover:text-[#004B93] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] rounded"
                      >
                        {item.judul}
                      </button>
                      <p className="mt-0.5 text-xs text-slate-500">{item.penyelenggara}</p>
                    </td>
                    <td className="py-4 px-4 text-slate-700 whitespace-nowrap align-top">
                      {item.kategori}
                    </td>
                    <td className="py-4 px-4 text-slate-700 whitespace-nowrap align-top">
                      {item.metode}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-[#0A244D] tabular-nums whitespace-nowrap align-top">
                      {item.durasiJp} JP
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap align-top">
                      <button
                        type="button"
                        onClick={() => onRemoveIdp(item.id)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50 text-sm font-semibold text-[#0A244D]">
                  <td colSpan={4} className="py-4 px-6 text-right">
                    Total Jam Pelajaran (JP)
                  </td>
                  <td className="py-4 px-4 text-right tabular-nums whitespace-nowrap">
                    {totalJp} JP
                  </td>
                  <td className="py-4 px-6" />
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Responsive Table Rows (Comfortable on HP) */}
          <div className="md:hidden divide-y divide-slate-200">
            {selectedTrainings.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 tabular-nums">
                      <span className="font-semibold text-[#004B93]">{item.kode}</span> ·{' '}
                      {item.kategori} · {item.metode}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectDetail(item)}
                      className="mt-1 text-left text-sm font-semibold text-[#0A244D] hover:text-[#004B93] leading-snug"
                    >
                      {item.judul}
                    </button>
                  </div>
                  <span className="text-sm font-bold text-[#0A244D] tabular-nums shrink-0">
                    {item.durasiJp} JP
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-slate-500 truncate">{item.penyelenggara}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveIdp(item.id)}
                    className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 inline-flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 bg-slate-50 flex items-center justify-between text-sm font-semibold text-[#0A244D]">
              <span>Total Jam Pelajaran (JP)</span>
              <span className="tabular-nums">{totalJp} JP</span>
            </div>
          </div>
        </section>
      )}

      {/* Action Footer to Add More */}
      {selectedTrainings.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Ingin menambah pelatihan lain ke dalam Draf IDP Anda?
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('rekomendasi')}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-[#0A244D] bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>Rekomendasi</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('katalog')}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#0A244D] hover:bg-[#004B93] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>Katalog Pelatihan</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
