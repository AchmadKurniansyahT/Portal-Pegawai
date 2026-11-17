import { ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { KategoriKompetensi, Pelatihan } from '../types/kompetensi';
import { TrainingCard } from './TrainingCard';

interface KatalogScreenProps {
  allTrainings: Pelatihan[];
  idpIds: string[];
  initialCategory?: KategoriKompetensi | 'Semua';
  onToggleIdp: (id: string) => void;
  onSelectDetail: (pelatihan: Pelatihan) => void;
}

const ITEMS_PER_PAGE = 10;

const JABATAN_OPTIONS = [
  'Semua Jabatan',
  'Pranata Komputer',
  'Analis SDM Aparatur',
  'Analis Kebijakan',
  'Pengendali Frekuensi Radio',
] as const;

export function KatalogScreen({
  allTrainings,
  idpIds,
  initialCategory = 'Semua',
  onToggleIdp,
  onSelectDetail,
}: KatalogScreenProps) {
  const kompetensiOptions = useMemo(() => {
    const uniqueKompetensi = Array.from(new Set(allTrainings.map((item) => item.kompetensi)));
    return ['Semua Kompetensi', ...uniqueKompetensi];
  }, [allTrainings]);

  const initialKompetensi = useMemo(() => {
    if (initialCategory !== 'Semua' && kompetensiOptions.includes(initialCategory)) {
      return initialCategory;
    }
    return 'Semua Kompetensi';
  }, [initialCategory, kompetensiOptions]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJabatan, setSelectedJabatan] = useState<string>('Semua Jabatan');
  const [selectedKompetensi, setSelectedKompetensi] = useState<string>(initialKompetensi);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrainings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allTrainings.filter((item) => {
      // Pelatihan "Semua Jabatan" selalu ikut tampil apa pun jabatan yang dipilih
      const matchJabatan =
        selectedJabatan === 'Semua Jabatan' ||
        item.jabatanSasaran.includes('Semua Jabatan') ||
        item.jabatanSasaran.includes(selectedJabatan);

      const matchKompetensi =
        selectedKompetensi === 'Semua Kompetensi' || item.kompetensi === selectedKompetensi;

      const matchSearch =
        q === '' ||
        item.judul.toLowerCase().includes(q) ||
        item.kode.toLowerCase().includes(q) ||
        item.kompetensi.toLowerCase().includes(q) ||
        item.jabatanSasaran.some((jab) => jab.toLowerCase().includes(q)) ||
        item.mode.toLowerCase().includes(q);

      return matchJabatan && matchKompetensi && matchSearch;
    });
  }, [allTrainings, searchQuery, selectedJabatan, selectedKompetensi]);

  const totalPages = Math.max(1, Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTrainings = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredTrainings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTrainings, safePage]);

  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    selectedJabatan !== 'Semua Jabatan' ||
    selectedKompetensi !== 'Semua Kompetensi';

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleJabatanChange = (value: string) => {
    setSelectedJabatan(value);
    setCurrentPage(1);
  };

  const handleKompetensiChange = (value: string) => {
    setSelectedKompetensi(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedJabatan('Semua Jabatan');
    setSelectedKompetensi('Semua Kompetensi');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Screen Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold text-[#004B93]">
          Direktori Pembelajaran Komdigi
        </p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#0A244D] tracking-tight [text-wrap:balance]">
          Katalog Pelatihan
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Telusuri pelatihan berdasarkan jabatan sasaran, rumpun kompetensi, atau kata kunci. Pelatihan dengan sasaran Semua Jabatan tetap tampil pada setiap pilihan jabatan.
        </p>

        {/* Search & Filter Controls */}
        <div className="mt-6 space-y-4 pt-5 border-t border-slate-200">
          {/* Search Input + Reset Filter Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="katalog-search" className="sr-only">
                Cari pelatihan
              </label>
              <Search
                className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="katalog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari kode, judul pelatihan, kompetensi, atau jabatan..."
                className="w-full min-h-[46px] pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0A244D] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-[#004B93] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  aria-label="Hapus kata kunci pencarian"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg text-slate-400 hover:text-[#0A244D] hover:bg-slate-200/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              disabled={!hasActiveFilter}
              className={`min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                hasActiveFilter
                  ? 'bg-slate-100 text-[#0A244D] hover:bg-slate-200 border border-slate-300'
                  : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Reset Filter</span>
            </button>
          </div>

          {/* Filter Jabatan & Filter Kompetensi (Inward dropdown arrow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="filter-jabatan"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Filter Jabatan
              </label>
              <div className="relative">
                <select
                  id="filter-jabatan"
                  value={selectedJabatan}
                  onChange={(e) => handleJabatanChange(e.target.value)}
                  className="w-full min-h-[44px] appearance-none pl-4 pr-12 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-[#0A244D] font-medium focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-[#004B93] cursor-pointer"
                >
                  {JABATAN_OPTIONS.map((jab) => (
                    <option key={jab} value={jab}>
                      {jab}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-500 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="filter-kompetensi"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Filter Kompetensi
              </label>
              <div className="relative">
                <select
                  id="filter-kompetensi"
                  value={selectedKompetensi}
                  onChange={(e) => handleKompetensiChange(e.target.value)}
                  className="w-full min-h-[44px] appearance-none pl-4 pr-12 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-[#0A244D] font-medium focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-[#004B93] cursor-pointer"
                >
                  {kompetensiOptions.map((komp) => (
                    <option key={komp} value={komp}>
                      {komp}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-slate-500 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Result Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-xs sm:text-sm text-slate-600 tabular-nums">
          Menampilkan <span className="font-semibold text-[#0A244D]">{filteredTrainings.length}</span>{' '}
          dari <span className="font-semibold text-[#0A244D]">{allTrainings.length}</span> pelatihan
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {selectedJabatan !== 'Semua Jabatan' && (
            <span>
              Menyertakan pelatihan <span className="font-medium text-slate-700">Semua Jabatan</span>
            </span>
          )}
          {totalPages > 1 && (
            <span className="tabular-nums font-medium text-slate-700">
              Halaman {safePage} dari {totalPages}
            </span>
          )}
        </div>
      </div>

      {/* Catalog Grid or Empty State */}
      {filteredTrainings.length === 0 ? (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <h2 className="text-base sm:text-lg font-semibold text-[#0A244D]">
            Belum ada pelatihan yang sesuai filter.
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Ubah kata kunci pencarian atau atur ulang pilihan jabatan dan kompetensi untuk menampilkan daftar pelatihan.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#0A244D] hover:bg-[#004B93] inline-flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Filter</span>
          </button>
        </section>
      ) : (
        <>
          <section
            aria-label="Daftar katalog pelatihan"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {paginatedTrainings.map((pelatihan) => (
              <TrainingCard
                key={pelatihan.id}
                pelatihan={pelatihan}
                isInIdp={idpIds.includes(pelatihan.id)}
                onToggleIdp={onToggleIdp}
                onSelectDetail={onSelectDetail}
              />
            ))}
          </section>

          {/* Pagination Controls (Max 10 pelatihan per halaman) */}
          {totalPages > 1 && (
            <nav
              aria-label="Navigasi halaman katalog"
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <p className="text-xs text-slate-500 tabular-nums">
                Menampilkan {(safePage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(safePage * ITEMS_PER_PAGE, filteredTrainings.length)} dari{' '}
                {filteredTrainings.length} hasil
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Halaman sebelumnya"
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-1 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                    safePage === 1
                      ? 'text-slate-400 bg-slate-50 border border-slate-200 cursor-not-allowed'
                      : 'text-[#0A244D] bg-white border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                    const isActive = page === safePage;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        aria-current={isActive ? 'page' : undefined}
                        aria-label={`Halaman ${page}`}
                        className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                          isActive
                            ? 'bg-[#0A244D] text-white'
                            : 'bg-white text-[#0A244D] border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Halaman berikutnya"
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-1 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3] ${
                    safePage === totalPages
                      ? 'text-slate-400 bg-slate-50 border border-slate-200 cursor-not-allowed'
                      : 'text-[#0A244D] bg-white border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
