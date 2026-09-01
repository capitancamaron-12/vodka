import React, { useState } from 'react';
import { TabType, Article } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BlogView } from './components/BlogView';
import { DistillationLab } from './components/DistillationLab';
import { TastingStudio } from './components/TastingStudio';
import { PresentationMode } from './components/PresentationMode';
import { BloggerExporter } from './components/BloggerExporter';
import { QuizClassroom } from './components/QuizClassroom';
import { AiSommelierModal } from './components/AiSommelierModal';
import { 
  Wine, 
  BookOpen, 
  FlaskConical, 
  Presentation, 
  Share2, 
  HelpCircle,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('blog');
  const [selectedArticleForBlogger, setSelectedArticleForBlogger] = useState<Article | null>(null);
  const [isSommelierOpen, setIsSommelierOpen] = useState<boolean>(false);

  const handleExportArticle = (article: Article) => {
    setSelectedArticleForBlogger(article);
    setActiveTab('blogger-export');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSommelier={() => setIsSommelierOpen(true)}
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
          <BlogView onExportArticleToBlogger={handleExportArticle} />
        )}

        {activeTab === 'process' && (
          <DistillationLab />
        )}

        {activeTab === 'tasting' && (
          <TastingStudio />
        )}

        {activeTab === 'presentation' && (
          <PresentationMode />
        )}

        {activeTab === 'blogger-export' && (
          <BloggerExporter initialArticle={selectedArticleForBlogger} />
        )}

        {activeTab === 'quiz' && (
          <QuizClassroom />
        )}
      </main>

      {/* AI Sommelier Floating Modal */}
      <AiSommelierModal 
        isOpen={isSommelierOpen} 
        onClose={() => setIsSommelierOpen(false)} 
      />

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
                  VODKA MASTERY
                </span>
                <p className="text-[11px] text-stone-500">
                  Recurso Pedagógico para Presentaciones de Clase y Catas de Destilados
                </p>
              </div>
            </div>

            {/* Quick footer shortcuts */}
            <div className="flex flex-wrap items-center gap-4 text-stone-400">
              <button 
                onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Artículos
              </button>
              <button 
                onClick={() => { setActiveTab('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Destilación
              </button>
              <button 
                onClick={() => { setActiveTab('tasting'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Cata
              </button>
              <button 
                onClick={() => { setActiveTab('presentation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Diapositivas
              </button>
              <button 
                onClick={() => { setActiveTab('blogger-export'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Exportar Blogger
              </button>
              <button 
                onClick={() => { setActiveTab('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 transition-colors"
              >
                Quiz
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <p>
              Diseñado para exposiciones académicas sobre química de destilados, gastronomía y enología.
            </p>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Cita recomendada: Vodka Mastery Class Project (2026)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
