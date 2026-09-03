import React, { useState, useEffect, useCallback } from 'react';
import { PRESENTATION_SLIDES } from '../data/vodkaData';
import { PresentationSlide } from '../types';
import { GoogleSlidesManager } from './GoogleSlidesManager';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  Volume2,
  FolderSync,
  GraduationCap,
  Scroll,
  Wheat,
  Flame,
  Droplets,
  Wine,
  GlassWater,
  Award
} from 'lucide-react';

export const PresentationMode: React.FC = () => {
  const [subTab, setSubTab] = useState<'viewer' | 'slides-integration'>('viewer');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const slides = PRESENTATION_SLIDES;
  const currentSlide: PresentationSlide = slides[currentSlideIndex];

  const getSlideIcon = (name?: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-12 h-12 text-amber-400" />;
      case 'Scroll': return <Scroll className="w-12 h-12 text-amber-400" />;
      case 'Wheat': return <Wheat className="w-12 h-12 text-amber-400" />;
      case 'Flame': return <Flame className="w-12 h-12 text-amber-400" />;
      case 'Droplets': return <Droplets className="w-12 h-12 text-blue-400" />;
      case 'Wine': return <Wine className="w-12 h-12 text-emerald-400" />;
      case 'GlassWater': return <GlassWater className="w-12 h-12 text-purple-400" />;
      default: return <Sparkles className="w-12 h-12 text-amber-400" />;
    }
  };

  const handleNext = useCallback(() => {
    setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation support (ArrowRight, ArrowLeft, Space)
  useEffect(() => {
    if (subTab !== 'viewer') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, subTab]);

  const toggleFullscreen = () => {
    if (!document.documentElement) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-900/80 p-3 sm:p-4 rounded-2xl border border-stone-800 backdrop-blur-md">
        
        {/* Left Sub-Tab switch */}
        <div className="flex items-center gap-2">
          <button
            id="subtab-viewer-btn"
            onClick={() => setSubTab('viewer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              subTab === 'viewer'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Presentador en Vivo (Clase)</span>
          </button>

          <button
            id="subtab-google-slides-btn"
            onClick={() => setSubTab('slides-integration')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              subTab === 'slides-integration'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <FolderSync className="w-4 h-4" />
            <span>Google Slides & Drive</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-400/30 text-amber-200">
              Nuevo
            </span>
          </button>
        </div>

        {/* Right Tools (Only in Viewer mode) */}
        {subTab === 'viewer' ? (
          <div className="flex items-center gap-2">
            <button
              id="toggle-speaker-notes-btn"
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                showSpeakerNotes
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              {showSpeakerNotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Notas del Orador</span>
            </button>

            <button
              id="toggle-fullscreen-btn"
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-medium transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Pantalla Completa'}</span>
            </button>

            <button
              id="quick-export-to-google-slides-btn"
              onClick={() => setSubTab('slides-integration')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exportar a Google Slides</span>
            </button>
          </div>
        ) : (
          <button
            id="back-to-viewer-btn"
            onClick={() => setSubTab('viewer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-medium border border-stone-800 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Volver al Presentador</span>
          </button>
        )}

      </div>

      {/* SubTab Content */}
      {subTab === 'slides-integration' ? (
        <GoogleSlidesManager />
      ) : (
        <div className="space-y-6">
          {/* Main Presentation Slide Viewport */}
          <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-950 border border-amber-500/30 overflow-hidden shadow-2xl p-6 sm:p-10 min-h-[500px] flex flex-col justify-between">
            
            {/* Ambient Top Glow */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Slide Top Metadata */}
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {currentSlide.section}
                </span>
                <div className="flex items-center gap-2">
                  {currentSlide.badgeText && (
                    <span className="text-xs font-semibold text-stone-400 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                      {currentSlide.badgeText}
                    </span>
                  )}
                  <span className="text-xs font-mono-code text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded-full border border-stone-800">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-50 leading-tight">
                {currentSlide.title}
              </h2>
            </div>

            {/* Slide Body: Bullets and Visual Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center relative z-10">
              
              {/* Bullet Points */}
              <div className="lg:col-span-7 space-y-4">
                <ul className="space-y-3.5">
                  {currentSlide.bullets.map((bullet, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800/80 text-stone-200 text-sm sm:text-base leading-relaxed hover:border-amber-500/30 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Quote if present */}
                {currentSlide.quote && (
                  <div className="p-4 rounded-2xl bg-stone-950/80 border-l-4 border-amber-400 text-stone-300 italic text-sm flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{currentSlide.quote}</span>
                  </div>
                )}
              </div>

              {/* Right Visual Graphical / Metric Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 shadow-xl flex flex-col justify-between min-h-[260px] group">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                      {getSlideIcon(currentSlide.iconName)}
                    </div>
                    <span className="text-[11px] font-mono-code text-amber-300 bg-stone-950/90 px-3 py-1 rounded-lg border border-amber-500/30">
                      Diapositiva #{currentSlide.id}
                    </span>
                  </div>

                  <div className="space-y-3 mt-4">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      {currentSlide.section}
                    </span>
                    <h4 className="text-lg font-bold text-stone-100 leading-snug">
                      {currentSlide.title}
                    </h4>
                  </div>

                  {currentSlide.stat && (
                    <div className="mt-4 p-4 rounded-xl bg-stone-950/90 border border-amber-500/30 flex items-center justify-between">
                      <span className="text-xs text-stone-300">{currentSlide.stat.label}</span>
                      <span className="text-xl font-bold font-mono-code text-amber-400">{currentSlide.stat.value}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Slide Bottom Controls & Progress */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-4 relative z-10">
              
              {/* Prev button */}
              <button
                id="slide-prev-btn"
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs sm:text-sm font-semibold border border-stone-700/60 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {/* Slide Dots / Indicator */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    id={`jump-slide-${i}`}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlideIndex === i 
                        ? 'w-8 bg-amber-400' 
                        : 'w-2.5 bg-stone-800 hover:bg-stone-600'
                    }`}
                    title={`Ir a diapositiva ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                id="slide-next-btn"
                onClick={handleNext}
                disabled={currentSlideIndex === slides.length - 1}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-stone-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-950/50 transition-all cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Speaker Notes Box for the Student */}
          {showSpeakerNotes && (
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-stone-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>Guía de Exposición & Consejos para el Orador en Clase:</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-2 border-l-2 border-amber-500">
                {currentSlide.speakerNotes}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
