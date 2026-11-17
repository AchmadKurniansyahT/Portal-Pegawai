import { ArrowRight, CheckCircle2, Target, User } from 'lucide-react';
import type { ProfilPegawai, ScreenId } from '../types/kompetensi';

interface ProfilSayaScreenProps {
  profil: ProfilPegawai;
  onNavigate: (screen: ScreenId) => void;
}

export function ProfilSayaScreen({ profil, onNavigate }: ProfilSayaScreenProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0A244D] text-white flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <User className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#004B93]">
              Profil Kompetensi Pegawai
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#0A244D] tracking-tight">
              {profil.nama}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              {profil.jabatan} · {profil.unitKerja}
            </p>
          </div>
        </div>

        {/* Identity Summary Table (No NIP, No NIK) */}
        <dl className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-slate-500">Nama Pegawai</dt>
            <dd className="mt-1 font-semibold text-[#0A244D]">{profil.nama}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Jabatan Fungsional</dt>
            <dd className="mt-1 font-semibold text-[#0A244D]">{profil.jabatan}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Unit Kerja</dt>
            <dd className="mt-1 font-medium text-slate-800">{profil.unitKerja}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Instansi</dt>
            <dd className="mt-1 font-medium text-slate-800">{profil.kementerian}</dd>
          </div>
        </dl>
      </section>

      {/* Competency Mapping: Dimiliki vs Perlu Dikembangkan */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Kompetensi yang Dimiliki */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-800">Kualifikasi Terpenuhi</p>
                <h2 className="mt-1 text-lg sm:text-xl font-semibold text-[#0A244D]">
                  Kompetensi yang Dimiliki
                </h2>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
            </div>

            <ul className="mt-4 divide-y divide-slate-100">
              {profil.kompetensiDimiliki.map((kompetensi, index) => (
                <li key={kompetensi} className="py-4 first:pt-2 last:pb-0 flex items-start gap-3">
                  <span className="tabular-nums text-xs font-semibold text-emerald-800 mt-1 shrink-0">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-[#0A244D]">
                      {kompetensi}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Status: Terverifikasi sesuai portofolio jabatan fungsional
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
            Kompetensi yang dimiliki menjadi dasar pemetaan peran teknis pada unit kerja.
          </p>
        </div>

        {/* Kompetensi yang Perlu Dikembangkan */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#004B93]">Prioritas Penguatan</p>
                <h2 className="mt-1 text-lg sm:text-xl font-semibold text-[#0A244D]">
                  Perlu Dikembangkan
                </h2>
              </div>
              <Target className="w-5 h-5 text-[#004B93] shrink-0" aria-hidden="true" />
            </div>

            <ul className="mt-4 divide-y divide-slate-100">
              {profil.kompetensiDikembangkan.map((kompetensi, index) => (
                <li key={kompetensi} className="py-4 first:pt-2 last:pb-0 flex items-start gap-3">
                  <span className="tabular-nums text-xs font-semibold text-[#004B93] mt-1 shrink-0">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-[#0A244D]">
                      {kompetensi}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Status: Direkomendasikan masuk dalam rencana pelatihan tahunan (IDP)
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('rekomendasi')}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#0A244D] hover:bg-[#004B93] inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>Lihat Pelatihan Rekomendasi</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
