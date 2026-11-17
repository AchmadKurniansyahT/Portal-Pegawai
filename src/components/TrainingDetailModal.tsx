import { Check, Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Pelatihan } from '../types/kompetensi';

interface TrainingDetailModalProps {
  pelatihan: Pelatihan | null;
  isInIdp: boolean;
  onClose: () => void;
  onToggleIdp: (id: string) => void;
}

export function TrainingDetailModal({
  pelatihan,
  isInIdp,
  onClose,
  onToggleIdp,
}: TrainingDetailModalProps) {
  useEffect(() => {
    if (!pelatihan) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pelatihan, onClose]);

  if (!pelatihan) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/50 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-training-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl border border-slate-200 max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="tabular-nums font-semibold text-[#004B93]">{pelatihan.kode}</span>
              <span aria-hidden="true">·</span>
              <span>{pelatihan.kategori}</span>
              <span aria-hidden="true">·</span>
              <span>{pelatihan.metode}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{pelatihan.durasiJp} JP</span>
            </div>
            <h2
              id="modal-training-title"
              className="mt-1.5 text-lg sm:text-xl font-semibold text-[#0A244D] leading-snug"
            >
              {pelatihan.judul}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail pelatihan"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-[#0A244D] hover:bg-slate-100 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007CC3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 sm:px-6 py-5 overflow-y-auto space-y-5 text-sm">
          <div>
            <h3 className="text-xs font-semibold text-slate-500">Ringkasan Pelatihan</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed">{pelatihan.ringkasan}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500">Tujuan Pembelajaran</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed">{pelatihan.tujuanPembelajaran}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500">Materi Pokok</h3>
            <ol className="mt-2 space-y-2 border-t border-slate-100 pt-3">
              {pelatihan.materiPokok.map((materi, index) => (
                <li key={materi} className="flex items-start gap-3 text-slate-700">
                  <span className="tabular-nums text-xs font-semibold text-[#004B93] mt-0.5 shrink-0">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-relaxed">{materi}</span>
                </li>
              ))}
            </ol>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div>
              <dt className="text-slate-500 font-medium">Penyelenggara</dt>
              <dd className="mt-1 text-sm font-medium text-[#0A244D]">{pelatihan.penyelenggara}</dd>
            </div>
            <div>
              <dt className="text-slate-500 font-medium">Jadwal & Durasi</dt>
              <dd className="mt-1 text-sm font-medium text-[#0A244D] tabular-nums">
                {pelatihan.jadwal} ({pelatihan.durasiJp} JP)
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 font-medium">Sasaran Jenjang</dt>
              <dd className="mt-1 text-sm font-medium text-[#0A244D]">{pelatihan.sasaranJenjang}</dd>
            </div>
            <div>
              <dt className="text-slate-500 font-medium">Status Rekomendasi</dt>
              <dd className="mt-1 text-sm font-medium text-[#0A244D]">{pelatihan.prioritas}</dd>
            </div>
          </dl>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => onToggleIdp(pelatihan.id)}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
              isInIdp
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-700/30 hover:bg-emerald-100'
                : 'bg-[#0A244D] text-white hover:bg-[#004B93]'
            }`}
          >
            {isInIdp ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Hapus dari IDP</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Tambah ke IDP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
