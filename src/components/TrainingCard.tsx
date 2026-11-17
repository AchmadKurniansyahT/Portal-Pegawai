import { Check, Plus, Info } from 'lucide-react';
import type { Pelatihan } from '../types/kompetensi';

interface TrainingCardProps {
  pelatihan: Pelatihan;
  isInIdp: boolean;
  onToggleIdp: (id: string) => void;
  onSelectDetail: (pelatihan: Pelatihan) => void;
  showPriorityKicker?: boolean;
  reasonText?: string;
}

export function TrainingCard({
  pelatihan,
  isInIdp,
  onToggleIdp,
  onSelectDetail,
  showPriorityKicker = false,
  reasonText,
}: TrainingCardProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-colors hover:border-slate-300">
      <div>
        {/* Clean unboxed metadata kicker: Kode · Jenis · Kompetensi */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
          <span className="tabular-nums font-semibold text-[#0A244D]">{pelatihan.kode}</span>
          <span aria-hidden="true">·</span>
          <span>{pelatihan.jenis}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#004B93] font-semibold">{pelatihan.kompetensi}</span>
          {showPriorityKicker && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#0A244D] font-semibold">{pelatihan.prioritas}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-base font-semibold text-[#0A244D] leading-snug">
          {pelatihan.judul}
        </h3>

        {/* Recommendation Reason (when shown on Rekomendasi) */}
        {reasonText && (
          <p className="mt-2.5 text-xs font-medium text-[#004B93] bg-[#F4F7FB] rounded-lg px-3 py-2 leading-relaxed">
            {reasonText}
          </p>
        )}

        {/* Mode, Durasi & Jabatan Sasaran metadata */}
        <dl className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div>
            <dt className="text-slate-400 font-medium">Mode Pembelajaran</dt>
            <dd className="mt-0.5 font-medium text-slate-800">{pelatihan.mode}</dd>
          </div>
          <div>
            <dt className="text-slate-400 font-medium">Durasi</dt>
            <dd className="mt-0.5 font-semibold text-[#0A244D] tabular-nums">
              {pelatihan.durasi}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-slate-400 font-medium">Jabatan Sasaran</dt>
            <dd className="mt-0.5 font-medium text-slate-700">
              {pelatihan.jabatanSasaran.join(', ')}
            </dd>
          </div>
        </dl>
      </div>

      {/* Action Buttons (>= 44px touch target) */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onToggleIdp(pelatihan.id)}
          aria-pressed={isInIdp}
          className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007CC3] ${
            isInIdp
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-700/30 hover:bg-emerald-100/80'
              : 'bg-[#0A244D] text-white hover:bg-[#004B93]'
          }`}
        >
          {isInIdp ? (
            <>
              <Check className="w-4 h-4 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>Tersimpan di IDP</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Tambah ke IDP</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onSelectDetail(pelatihan)}
          className="min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium text-[#0A244D] bg-white border border-slate-300 hover:bg-slate-50 inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007CC3]"
        >
          <Info className="w-4 h-4 shrink-0 text-slate-500" aria-hidden="true" />
          <span>Detail</span>
        </button>
      </div>
    </article>
  );
}
