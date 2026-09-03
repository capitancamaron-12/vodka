import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BlogView } from './components/BlogView';
import { DistillationLab } from './components/DistillationLab';
import { PresentationMode } from './components/PresentationMode';
import { IndustrialEquipment } from './components/IndustrialEquipment';
import { 
  GraduationCap,
  Layers
} from 'lucide-react';

const VALID_TABS: TabType[] = ['blog', 'process', 'presentation', 'equipment'];

function getInitialTab(): TabType {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (VALID_TABS.includes(hash as TabType)) {
      return hash as TabType;
    }
    const path = window.location.pathname.toLowerCase();
    for (const tab of VALID_TABS) {
      if (path.endsWith(`/${tab}`) || path.endsWith(`/${tab}/`)) {
        return tab;
      }
    }
  }
  return 'blog';
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<TabType>(getInitialTab);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_TABS.includes(hash as TabType)) {
        setActiveTabState(hash as TabType);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Hero Header Banner (Visible in Blog View for welcoming context) */}
      {activeTab === 'blog' && (
        <HeroSection onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      )}

      {/* Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'process' && (
          <DistillationLab />
        )}

        {activeTab === 'presentation' && (
          <PresentationMode />
        )}

        {activeTab === 'equipment' && (
          <IndustrialEquipment />
        )}
      </main>

      {/* Academic Classroom Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-10 mt-16 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-wider text-stone-200">
                  DAVID TAYLOR • EDWIN MARTÍNEZ • SERVILLANO REAL
                </span>
                <p className="text-[11px] text-stone-500">
                  Presentación de Clase &amp; Proyecto Académico sobre el Vodka
                </p>
              </div>
            </div>

            {/* Quick footer shortcuts */}
            <div className="flex flex-wrap items-center gap-4 text-stone-400">
              <button 
                onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Artículos
              </button>
              <button 
                onClick={() => { setActiveTab('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Destilación
              </button>
              <button 
                onClick={() => { setActiveTab('presentation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Diapositivas
              </button>
              <button 
                onClick={() => { setActiveTab('equipment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Equipos Industriales
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <p>
              Presentación elaborada por <strong className="text-stone-300">David Taylor</strong>, <strong className="text-stone-300">Edwin Martínez</strong> y <strong className="text-stone-300">Servillano Real</strong>.
            </p>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Proyecto Académico de Destilados (2026)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
