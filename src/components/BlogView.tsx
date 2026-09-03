import React, { useState } from 'react';
import { ARTICLES, HISTORY_MILESTONES, RAW_MATERIALS } from '../data/vodkaData';
import { Article, RawMaterialProfile, HistoryMilestone } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  GraduationCap,
  History,
  Layers,
  Search,
  FlaskConical,
  Wine,
  GlassWater,
  FileText
} from 'lucide-react';

interface BlogViewProps {}

export const BlogView: React.FC<BlogViewProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTabSub, setActiveTabSub] = useState<'articles' | 'history' | 'materials'>('articles');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  const categories = ['Todos', 'Historia', 'Fabricación', 'Cata', 'Mixología'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Historia': return <History className="w-6 h-6 text-amber-400" />;
      case 'Fabricación': return <FlaskConical className="w-6 h-6 text-cyan-400" />;
      case 'Cata': return <Wine className="w-6 h-6 text-emerald-400" />;
      case 'Mixología': return <GlassWater className="w-6 h-6 text-purple-400" />;
      default: return <BookOpen className="w-6 h-6 text-amber-400" />;
    }
  };

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'Todos' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedArticles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // If an article is open in detailed reading mode
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        {/* Top bar controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <button
            id="back-to-articles-btn"
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a las entradas del Blog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id={`bookmark-article-${selectedArticle.id}`}
              onClick={(e) => toggleBookmark(selectedArticle.id, e)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                bookmarkedArticles.includes(selectedArticle.id)
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{bookmarkedArticles.includes(selectedArticle.id) ? 'Guardado' : 'Guardar'}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-stone-100 leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-lg text-stone-300 leading-relaxed font-light">
            {selectedArticle.subtitle}
          </p>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/80">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-stone-300 font-medium">
                <User className="w-3.5 h-3.5 text-amber-400" />
                {selectedArticle.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-500" />
              {selectedArticle.tags.map(t => (
                <span key={t} className="text-stone-400 bg-stone-900 px-2 py-0.5 rounded text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Hero Banner for Article */}
        <div className="relative rounded-2xl overflow-hidden p-8 sm:p-10 border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 shadow-2xl flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                {getCategoryIcon(selectedArticle.category)}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900 border border-amber-500/30 text-amber-300">
                  {selectedArticle.category}
                </span>
                <span className="ml-2 text-xs text-stone-400 font-mono-code">
                  {selectedArticle.readTime}
                </span>
              </div>
            </div>
            <span className="text-xs text-stone-500 font-mono-code">
              Documento Académico
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
            <p className="text-stone-300 text-sm max-w-2xl leading-relaxed italic">
              "{selectedArticle.subtitle}"
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-stone-900/90 px-3 py-1.5 rounded-xl border border-stone-800 font-medium">
              <FileText className="w-3.5 h-3.5" />
              <span>Texto Completo con Citas</span>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box (Academic format) */}
        <div className="p-6 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Puntos Clave para la Exposición en Clase</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-200 text-sm">
            {selectedArticle.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Article Content HTML */}
        <div 
          className="prose prose-invert prose-stone max-w-none text-stone-200 leading-relaxed space-y-6 text-base sm:text-lg
            [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-serif-title [&>h2]:font-bold [&>h2]:text-amber-200 [&>h2]:pt-6 [&>h2]:border-b [&>h2]:border-stone-800 [&>h2]:pb-2
            [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-stone-100 [&>h3]:pt-4
            [&>p]:text-stone-300 [&>p]:leading-relaxed
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:text-stone-300
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:text-stone-300
            [&>strong]:text-amber-300 [&>strong]:font-semibold
          "
          dangerouslySetInnerHTML={{ __html: selectedArticle.contentHtml }}
        />

        {/* Academic Notes Box */}
        {selectedArticle.academicNotes && (
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-stone-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Notas y Preguntas Académicas para la Clase</span>
            </div>
            {selectedArticle.academicNotes.map((note, i) => (
              <p key={i} className="text-xs sm:text-sm text-stone-300 italic pl-2 border-l-2 border-amber-500/40">
                {note}
              </p>
            ))}
          </div>
        )}

        {/* Bottom actions */}
        <div className="pt-8 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-sm font-medium border border-stone-800 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la lista de artículos</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Sub tabs: Articles, History Timeline, Raw Materials */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
          <button
            id="tab-sub-articles"
            onClick={() => setActiveTabSub('articles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTabSub === 'articles'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Artículos del Blog ({ARTICLES.length})</span>
          </button>

          <button
            id="tab-sub-history"
            onClick={() => setActiveTabSub('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTabSub === 'history'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Línea de Tiempo Histórica</span>
          </button>

          <button
            id="tab-sub-materials"
            onClick={() => setActiveTabSub('materials')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTabSub === 'materials'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Materias Primas & Terroir</span>
          </button>
        </div>

        {/* Search Input for articles */}
        {activeTabSub === 'articles' && (
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-articles-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema, cereal, cata..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
        )}
      </div>

      {/* VIEW 1: ARTICLES LIST */}
      {activeTabSub === 'articles' && (
        <div className="space-y-8">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-md shadow-amber-950/40'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => {
              const isFirst = index === 0 && selectedCategory === 'Todos' && !searchQuery;
              return (
                <div
                  key={article.id}
                  id={`article-card-${article.id}`}
                  onClick={() => setSelectedArticle(article)}
                  className={`group relative rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900/90 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col shadow-lg ${
                    isFirst ? 'md:col-span-2 md:flex-row' : ''
                  }`}
                >
                  {/* Card Visual Header Banner */}
                  <div className={`relative overflow-hidden p-6 bg-gradient-to-br from-stone-900 to-stone-950 border-b border-stone-800/80 flex items-center justify-between ${isFirst ? 'md:w-5/12 md:border-b-0 md:border-r' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getCategoryIcon(article.category)}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-stone-950 text-amber-300 border border-amber-500/30">
                          {article.category}
                        </span>
                        <div className="text-[11px] text-stone-500 mt-1 font-mono-code">
                          {article.readTime}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`p-2 rounded-xl border transition-all ${
                        bookmarkedArticles.includes(article.id)
                          ? 'bg-amber-500 border-amber-400 text-stone-950'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className={`p-6 flex flex-col justify-between ${isFirst ? 'md:w-1/2' : 'flex-1'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span className="flex items-center gap-1 font-medium text-stone-300">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          {article.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                        {article.title}
                      </h2>

                      <p className="text-sm text-stone-400 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Key takeaway preview badge */}
                      <div className="bg-stone-950/50 p-2.5 rounded-xl border border-stone-800/80 text-xs text-stone-300 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{article.keyTakeaways[0]}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {article.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                        Leer Entrada <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-base font-medium">No se encontraron artículos con ese criterio.</p>
              <button
                onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                className="mt-3 text-xs text-amber-400 underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: HISTORY TIMELINE */}
      {activeTabSub === 'history' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100">
              Línea de Tiempo: 600 Años del Vodka
            </h2>
            <p className="text-sm text-stone-400">
              Desde las recetas medicinales de los monjes polacos en 1405 y las tabernas zaristas hasta la era de la coctelería moderna.
            </p>
          </div>

          <div className="relative border-l-2 border-amber-500/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
            {HISTORY_MILESTONES.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node icon bullet */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
                  <span className="text-[10px] md:text-xs font-bold">{idx + 1}</span>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all space-y-3 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {item.era} • {item.year}
                    </span>
                    <span className="text-xs font-medium text-stone-400">
                      📍 {item.region}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif-title font-bold text-stone-100">
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-300">
                      <strong className="text-amber-400 block mb-1">📜 Hecho Histórico Documentado:</strong>
                      {item.historicalFact}
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-300">
                      <strong className="text-blue-400 block mb-1">🌍 Impacto Cultural:</strong>
                      {item.culturalImpact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: RAW MATERIALS & TERROIR */}
      {activeTabSub === 'materials' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100">
              Guía de Materias Primas: La Huella Dactilar
            </h2>
            <p className="text-sm text-stone-400">
              Cada materia prima aporta una densidad, una viscosidad en boca y una familia de ésteres aromáticos única.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RAW_MATERIALS.map((mat) => (
              <div 
                key={mat.id}
                id={`material-card-${mat.id}`}
                className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-900/90 transition-all flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono-code font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {mat.originRegion}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      Cuerpo: <span className="text-amber-300">{mat.bodyWeight}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif-title font-bold text-stone-100">
                      {mat.nameEs}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono-code">{mat.name}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-300">
                    <p><strong className="text-stone-400">Sensación en Boca:</strong> {mat.texture}</p>
                    <p><strong className="text-stone-400">Perfil de Sabor:</strong> {mat.flavorProfile}</p>
                  </div>

                  {/* Aroma Tags */}
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-1.5">Notas Aromáticas Clave:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.aromaNotes.map(a => (
                        <span key={a} className="px-2 py-0.5 rounded-full text-[11px] bg-stone-950 border border-stone-800 text-stone-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sweetness meter */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Dulzor Natural</span>
                      <span className="text-amber-400 font-semibold">{mat.sweetnessLevel} / 5</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" 
                        style={{ width: `${(mat.sweetnessLevel / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 text-xs space-y-2">
                  <div>
                    <span className="text-[11px] text-stone-500 block">Marcas Icónicas de Referencia:</span>
                    <p className="text-stone-200 font-medium">{mat.keyBrands.join(', ')}</p>
                  </div>
                  <p className="text-[11px] text-stone-400 bg-stone-950/60 p-2 rounded-lg border border-stone-800/60 italic">
                    💡 {mat.chemistryNotes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
