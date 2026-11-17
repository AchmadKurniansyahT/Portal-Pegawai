import { CheckCircle2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BerandaScreen } from './components/BerandaScreen';
import { DrafIdpScreen } from './components/DrafIdpScreen';
import { HeaderNav } from './components/HeaderNav';
import { KatalogScreen } from './components/KatalogScreen';
import { ProfilSayaScreen } from './components/ProfilSayaScreen';
import { RekomendasiScreen } from './components/RekomendasiScreen';
import { TrainingDetailModal } from './components/TrainingDetailModal';
import { PELATIHAN_DUMMY, PROFIL_PEGAWAI } from './data/dummyPelatihan';
import type { KategoriKompetensi, Pelatihan, ScreenId } from './types/kompetensi';

const STORAGE_KEY_IDP = 'komdigi_portal_idp_ids_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('beranda');
  const [catalogCategory, setCatalogCategory] = useState<KategoriKompetensi | 'Semua'>('Semua');
  const [idpIds, setIdpIds] = useState<string[]>(() => {
    const validIds = new Set(PELATIHAN_DUMMY.map((item) => item.id));
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_IDP);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return Array.from(
            new Set(
              parsed.filter(
                (id): id is string => typeof id === 'string' && validIds.has(id)
              )
            )
          );
        }
      }
    } catch {
      // Abaikan jika penyimpanan lokal tidak tersedia
    }
    return [];
  });

  const [detailTraining, setDetailTraining] = useState<Pelatihan | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_IDP, JSON.stringify(idpIds));
    } catch {
      // Abaikan jika penyimpanan lokal tidak tersedia
    }
  }, [idpIds]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const selectedTrainings = useMemo(
    () => PELATIHAN_DUMMY.filter((item) => idpIds.includes(item.id)),
    [idpIds]
  );

  const handleNavigate = (screen: ScreenId) => {
    if (screen === 'katalog') {
      setCatalogCategory('Semua');
    }
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCatalogCategory = (category: KategoriKompetensi) => {
    setCatalogCategory(category);
    setActiveScreen('katalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleIdp = (id: string) => {
    const training = PELATIHAN_DUMMY.find((item) => item.id === id);
    setIdpIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        setToastMessage(
          training ? `"${training.judul}" dihapus dari Draf IDP.` : 'Pelatihan dihapus dari Draf IDP.'
        );
        return prev.filter((item) => item !== id);
      } else {
        setToastMessage(
          training ? `"${training.judul}" ditambahkan ke Draf IDP.` : 'Pelatihan ditambahkan ke Draf IDP.'
        );
        return [...prev, id];
      }
    });
  };

  const handleRemoveIdp = (id: string) => {
    const training = PELATIHAN_DUMMY.find((item) => item.id === id);
    setIdpIds((prev) => prev.filter((item) => item !== id));
    if (training) {
      setToastMessage(`"${training.judul}" dihapus dari Draf IDP.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#0F172A]">
      <HeaderNav
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        idpCount={selectedTrainings.length}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-12">
        {activeScreen === 'beranda' && (
          <BerandaScreen
            profil={PROFIL_PEGAWAI}
            allTrainings={PELATIHAN_DUMMY}
            selectedTrainings={selectedTrainings}
            onNavigate={handleNavigate}
            onNavigateCatalogCategory={handleNavigateCatalogCategory}
            onRemoveIdp={handleRemoveIdp}
            onSelectDetail={setDetailTraining}
          />
        )}

        {activeScreen === 'profil' && (
          <ProfilSayaScreen
            profil={PROFIL_PEGAWAI}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'katalog' && (
          <KatalogScreen
            key={catalogCategory}
            allTrainings={PELATIHAN_DUMMY}
            idpIds={idpIds}
            initialCategory={catalogCategory}
            onToggleIdp={handleToggleIdp}
            onSelectDetail={setDetailTraining}
          />
        )}

        {activeScreen === 'rekomendasi' && (
          <RekomendasiScreen
            profil={PROFIL_PEGAWAI}
            allTrainings={PELATIHAN_DUMMY}
            idpIds={idpIds}
            onToggleIdp={handleToggleIdp}
            onSelectDetail={setDetailTraining}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'idp' && (
          <DrafIdpScreen
            selectedTrainings={selectedTrainings}
            targetJp={PROFIL_PEGAWAI.targetJpTahunan}
            onRemoveIdp={handleRemoveIdp}
            onSelectDetail={setDetailTraining}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Portal Kompetensi Pegawai · Kementerian Komunikasi dan Digital
          </span>
          <span>
            Ditjen Teknologi Pemerintah Digital · Data Simulasi Pelatihan
          </span>
        </div>
      </footer>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#0A244D] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs sm:text-sm"
        >
          <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" aria-hidden="true" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Training Detail Modal */}
      <TrainingDetailModal
        pelatihan={detailTraining}
        isInIdp={detailTraining ? idpIds.includes(detailTraining.id) : false}
        onClose={() => setDetailTraining(null)}
        onToggleIdp={handleToggleIdp}
      />
    </div>
  );
}
