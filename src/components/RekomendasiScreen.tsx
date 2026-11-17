import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Pelatihan, ProfilPegawai, ScreenId } from '../types/kompetensi';
import { TrainingCard } from './TrainingCard';

interface RekomendasiScreenProps {
  profil: ProfilPegawai;
  allTrainings: Pelatihan[];
  idpIds: string[];
  onToggleIdp: (id: string) => void;
  onSelectDetail: (pelatihan: Pelatihan) => void;
  onNavigate: (screen: ScreenId) => void;
}

type RekomendasiFilter = 'semua' | 'belum-idp';

function ekstrakJabatanDasar(jabatanLengkap: string): string {
  return jabatanLengkap
    .replace(/\s+Ahli\s+(Pertama|Muda|Madya|Utama)$/i, '')
    .trim();
}

export function RekomendasiScreen({
  profil,
  allTrainings,
  idpIds,
  onToggleIdp,
  onSelectDetail,
  onNavigate,
}: RekomendasiScreenProps) {
  const [filter, setFilter] = useState<RekomendasiFilter>('semua');

  const jabatanDasar = useMemo(
    () => ekstrakJabatanDasar(profil.jabatan),
    [profil.jabatan]
  );

  // Syarat 1: Kompetensinya ada di "Perlu dikembangkan"
  // Syarat 2: Jabatan sasaran cocok dengan jabatan profil (abaikan Ahli Muda/Madya) atau "Semua Jabatan"
  const recommendedTrainings = useMemo(() => {
    const targetKompetensi = new Set(
      profil.kompetensiDikembangkan.map((k) => k.toLowerCase())
    );
    const jabatanLower = jabatanDasar.toLowerCase();

    return allTrainings.filter((item) => {
      const matchKompetensi = targetKompetensi.has(item.kompetensi.toLowerCase());
      const matchJabatan = item.jabatanSasaran.some(
        (sasaran) =>
          sasaran.toLowerCase() === 'semua jabatan' ||
          sasaran.toLowerCase() === jabatanLower
      );
      return matchKompetensi && matchJabatan;
    });
  }, [allTrainings, profil.kompetensiDikembangkan, jabatanDasar]);

  const notInIdpTrainings = useMemo(
    () => recommendedTrainings.filter((item) => !idpIds.includes(item.id)),
    [recommendedTrainings, idpIds]
  );

  const visibleTrainings =
    filter === 'belum-idp' ? notInIdpTrainings : recommendedTrainings;

  // Kelompokkan per kompetensi sesuai urutan pada "Perlu dikembangkan"
  const groupedSections = useMemo(() => {
    return profil.kompetensiDikembangkan
      .map((kompetensi) => ({
        kompetensi,
        items: visibleTrainings.filter(
          (item) => item.kompetensi.toLowerCase() === kompetensi.toLowerCase()
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [profil.kompetensiDikembangkan, visibleTrainings]);

  const filterTabs: { id: RekomendasiFilter; label: string; count: number }[] = [
    { id: 'semua', label: 'Semua Rekomendasi', count: recommendedTrainings.length },
    { id: 'belum-idp', label: 'Belum Masuk IDP', count: notInIdpTrainings.length },
  ];

  return (
    <div className="space-y-6">
      {/* Screen Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#004B93]">
          Pemetaan Kebutuhan Kompetensi
        </p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0A244D] tracking-tight [text-wrap:balance]">
          Rekomendasi Pelatihan
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Menampilkan pelatihan dari katalog untuk jabatan{' '}
          <span className="font-semibold text-[#0A244D]">{jabatanDasar}</span> (termasuk{' '}
          <span className="font-medium text-slate-800">Semua Jabatan</span>) yang sesuai dengan daftar kompetensi perlu dikembangkan:{' '}
          <span className="font-semibold text-[#0A244D]">
            {profil.kompetensiDikembangkan.join(', ')}
          </span>
          .
        </p>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter daftar rekomendasi"
          className="mt-6 flex items-center gap-2 overflow-x-auto pb-1"
        >
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.id)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                  isActive
                    ? 'bg-[#0A244D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 tabular-nums opacity-80">({tab.count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grouped Sections per Competency or Empty/Completion State */}
      {groupedSections.length === 0 ? (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-[#0A244D]">
            Seluruh Rekomendasi Sudah Tersimpan di IDP
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Semua pelatihan yang direkomendasikan telah ditambahkan ke Draf IDP Anda. Anda dapat menelusuri pelatihan lain pada Katalog Pelatihan.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setFilter('semua')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-[#0A244D] border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Tampilkan Semua Rekomendasi
            </button>
            <button
              type="button"
              onClick={() => onNavigate('katalog')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#0A244D] hover:bg-[#004B93] inline-flex items-center gap-2 transition-colors"
            >
              <span>Jelajahi Katalog</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : (
        <div className="space-y-8">
          {groupedSections.map((group) => (
            <section
              key={group.kompetensi}
              aria-labelledby={`grup-${group.kompetensi}`}
              className="space-y-4"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
                <div>
                  <p className="text-xs font-semibold text-[#004B93]">
                    Kompetensi Perlu Dikembangkan
                  </p>
                  <h2
                    id={`grup-${group.kompetensi}`}
                    className="mt-0.5 text-lg sm:text-xl font-bold text-[#0A244D]"
                  >
                    {group.kompetensi}
                  </h2>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 tabular-nums shrink-0">
                  {group.items.length} Pelatihan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((pelatihan) => (
                  <TrainingCard
                    key={pelatihan.id}
                    pelatihan={pelatihan}
                    isInIdp={idpIds.includes(pelatihan.id)}
                    onToggleIdp={onToggleIdp}
                    onSelectDetail={onSelectDetail}
                    reasonText={`Sesuai kebutuhan: ${pelatihan.kompetensi}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer Bridge to Catalog */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#0A244D]">
            Butuh Referensi Pelatihan Lainnya?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jelajahi seluruh <span className="tabular-nums font-medium">{allTrainings.length} pelatihan</span> lintas jabatan dan rumpun kompetensi di katalog.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('katalog')}
          className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-[#0A244D] bg-slate-100 hover:bg-slate-200 inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Buka Katalog Pelatihan</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
