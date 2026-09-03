import React from 'react';
import { TabType } from '../types';
import { 
  Sparkles, 
  Presentation, 
  FlaskConical, 
  Factory,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden border-b border-stone-800/60 bg-gradient-to-b from-stone-900/80 via-stone-950 to-stone-950 py-12 lg:py-16">
      {/* Subtle background glow effect */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Headline & Pitch */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Proyecto &amp; Presentación Académica</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-50 leading-[1.18] tracking-tight">
              Presentación: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 italic">
                Historia, Ciencia y Destilación
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Proyecto presentación académica sobre la elaboración química casera de vodka. <strong className="text-amber-300">David Taylor</strong>, <strong className="text-amber-300">Elvin Martínez</strong>, <strong className="text-amber-300">Sahiry Villareal</strong>.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-go-presentation-btn"
                onClick={() => onNavigate('presentation')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm shadow-lg shadow-amber-950/50 hover:shadow-amber-900/60 transition-all duration-200 cursor-pointer"
              >
                <Presentation className="w-4 h-4 text-stone-950" />
                <span>Iniciar Diapositivas de Clase</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="hero-go-process-btn"
                onClick={() => onNavigate('process')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/60 font-medium text-sm transition-all cursor-pointer"
              >
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>Simulador de Destilación</span>
              </button>

              <button
                id="hero-go-equipment-btn"
                onClick={() => onNavigate('equipment')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/60 font-medium text-sm transition-all cursor-pointer"
              >
                <Factory className="w-4 h-4 text-amber-400" />
                <span>Equipos Industriales</span>
              </button>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-xl border-t border-stone-800/80">
              <div className="flex items-center gap-2 text-stone-300">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium">96.4% ABV Límite Azeotrópico</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium">Carbón de Abedul & Plata</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Award className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-medium">600+ Años de Tradición</span>
              </div>
            </div>
          </div>

          {/* Quick Academic Cards Showcase */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            
            {/* Card 1: Slide Preview */}
            <div 
              onClick={() => onNavigate('presentation')}
              className="group p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                      Modo Diapositivas para Clase
                    </h3>
                    <p className="text-xs text-stone-400">
                      7 diapositivas completas con notas para el orador y datos clave.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            {/* Card 2: Process Simulator */}
            <div 
              onClick={() => onNavigate('process')}
              className="group p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                      Simulador de Destilación
                    </h3>
                    <p className="text-xs text-stone-400">
                      Control termodinámico interactivo del proceso paso a paso.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            {/* Card 3: Industrial Equipment Catalog */}
            <div 
              onClick={() => onNavigate('equipment')}
              className="group p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
                      Equipos Industriales
                    </h3>
                    <p className="text-xs text-stone-400">
                      Catálogo técnico de maquinaria de planta, columnas y envasado.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
