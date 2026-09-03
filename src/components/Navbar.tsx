import React from 'react';
import { TabType } from '../types';
import { 
  BookOpen, 
  FlaskConical, 
  Presentation, 
  Factory, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'blog', label: 'Blog & Artículos', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'process', label: 'Proceso de Destilación', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'presentation', label: 'Modo Presentación', icon: <Presentation className="w-4 h-4" />, badge: 'Clase' },
    { id: 'equipment', label: 'Equipos Industriales', icon: <Factory className="w-4 h-4" />, badge: 'Planta' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            id="brand-logo-btn"
            onClick={() => setActiveTab('blog')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-stone-900 p-0.5 shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-stone-100 flex items-center gap-1.5">
                VODKA <span className="text-amber-400 font-serif-title italic font-normal">Presentación</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-mono-code -mt-0.5">
                Proyecto Académico
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-amber-300 bg-amber-950/40 border border-amber-500/30 shadow-inner' 
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Horizontal Scroll */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none border-t border-stone-800/40">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'text-amber-300 bg-amber-950/60 border border-amber-500/30' 
                    : 'text-stone-400 hover:text-stone-200 bg-stone-900/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
