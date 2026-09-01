import React, { useState } from 'react';
import { ARTICLES, BLOGGER_TEMPLATE_SAMPLE } from '../data/vodkaData';
import { Article } from '../types';
import { 
  Share2, 
  Copy, 
  Check, 
  Code, 
  Eye, 
  Sparkles, 
  FileText, 
  BookOpen
} from 'lucide-react';

interface BloggerExporterProps {
  initialArticle?: Article | null;
}

export const BloggerExporter: React.FC<BloggerExporterProps> = ({ initialArticle }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(initialArticle?.id || 'all-summary');
  const [activeView, setActiveView] = useState<'preview' | 'html' | 'markdown'>('html');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate code based on selection
  let currentHtml = '';
  let currentMarkdown = '';
  let currentTitle = '';

  if (selectedArticleId === 'all-summary') {
    currentTitle = 'El Arte del Vodka: Guía Completa de Historia, Destilación y Catas';
    currentHtml = BLOGGER_TEMPLATE_SAMPLE;
    currentMarkdown = `# El Arte del Vodka: Guía Completa de Historia, Destilación y Catas\n\n## 1. Historia Milenaria\nDel eslavo "voda" (agua). Primer registro en 1405 (Polonia).\n\n## 2. Proceso de Fabricación\nRectificación continua hasta 96.4% ABV y filtración con carbón de abedul siberiano.\n\n## 3. Guía de Catas\nEvaluación de textura (mouthfeel) a 6°C - 8°C en copa tulipa.`;
  } else {
    const art = ARTICLES.find(a => a.id === selectedArticleId) || ARTICLES[0];
    currentTitle = art.title;
    currentHtml = `<!-- ENTRADA DE BLOGGER: ${art.title.toUpperCase()} -->
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #2d3748; max-width: 800px; margin: 0 auto; padding: 20px;">
  
  <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
    <span style="background: #edf2f7; color: #4a5568; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
      ${art.category} • ${art.readTime}
    </span>
    <h1 style="color: #1a202c; font-size: 30px; font-weight: 800; margin: 16px 0 8px 0; line-height: 1.3;">
      ${art.title}
    </h1>
    <p style="color: #718096; font-size: 16px; margin: 0;">
      ${art.subtitle}
    </p>
    <div style="font-size: 13px; color: #a0aec0; margin-top: 12px;">
      Por <strong>${art.author}</strong> | Fecha: ${art.date}
    </div>
  </header>

  <!-- Imagen Principal -->
  <div style="margin-bottom: 24px; text-align: center;">
    <img src="${art.coverImage}" alt="${art.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;" />
  </div>

  <!-- Puntos Clave -->
  <div style="background: #f7fafc; border-left: 4px solid #d69e2e; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
    <h3 style="margin-top: 0; color: #b7791f; font-size: 17px;">📌 Puntos Clave para la Exposición</h3>
    <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px;">
      ${art.keyTakeaways.map(k => `<li style="margin-bottom: 6px;">${k}</li>`).join('')}
    </ul>
  </div>

  <!-- Contenido -->
  <div style="font-size: 16px; color: #2d3748;">
    ${art.contentHtml}
  </div>

  <footer style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #718096; text-align: center;">
    Publicación creada con <strong>Vodka Mastery Academic Blog</strong> para exposición académica.
  </footer>
</div>`;

    currentMarkdown = `# ${art.title}\n\n*${art.subtitle}*\n\n**Autor:** ${art.author} | **Categoría:** ${art.category}\n\n---\n\n### Puntos Clave:\n${art.keyTakeaways.map(k => `- ${k}`).join('\n')}\n\n---\n\n${art.excerpt}`;
  }

  const handleCopyCode = () => {
    const textToCopy = activeView === 'markdown' ? currentMarkdown : currentHtml;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Share2 className="w-3.5 h-3.5" />
          <span>Exportador Universal para Blogger, WordPress & Markdown</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-100">
          Entrada Lista para Google Blogger y Gestores Web
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Aquí puedes obtener directamente el código HTML con estilos inline embebidos listo para pegar en el editor de Google Blogger, WordPress o Notion para tu entrega académica.
        </p>
      </div>

      {/* Quick instructions banner for Google Blogger */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs sm:text-sm text-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-amber-300 font-medium">
          <BookOpen className="w-4 h-4 shrink-0" />
          <span><strong>¿Cómo publicar en Blogger?</strong> Abre Blogger.com &rarr; Nueva Entrada &rarr; Cambia a modo <strong>"Vista HTML (&lt;&gt;)"</strong> &rarr; Pega el código &rarr; ¡Publicar!</span>
        </div>
      </div>

      {/* Selectors & Mode Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Article Selector */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Article List Picker */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h2 className="text-sm font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Seleccionar Entrada a Exportar:</span>
            </h2>

            <div className="space-y-2">
              <button
                id="select-post-all-summary"
                onClick={() => setSelectedArticleId('all-summary')}
                className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                  selectedArticleId === 'all-summary'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <span>⭐ Resumen Maestro de Clase (Completo)</span>
              </button>

              {ARTICLES.map(art => (
                <button
                  key={art.id}
                  id={`select-post-${art.id}`}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                    selectedArticleId === art.id
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:text-stone-100 hover:bg-stone-900'
                  }`}
                >
                  <span className="line-clamp-1">{art.title}</span>
                  <span className={`text-[10px] block mt-0.5 ${selectedArticleId === art.id ? 'text-stone-900' : 'text-stone-500'}`}>
                    {art.category} • {art.readTime}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Code Viewer and Live Preview */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 shadow-2xl">
          
          {/* Top Bar: View toggles and Copy Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                id="blogger-view-html"
                onClick={() => setActiveView('html')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeView === 'html'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Código HTML (Blogger)</span>
              </button>

              <button
                id="blogger-view-preview"
                onClick={() => setActiveView('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeView === 'preview'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Previa Visual</span>
              </button>

              <button
                id="blogger-view-markdown"
                onClick={() => setActiveView('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeView === 'markdown'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Markdown</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              id="copy-blogger-code-btn"
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-950" />
                  <span>Copiar Entrada para Blogger</span>
                </>
              )}
            </button>

          </div>

          {/* Viewer Area */}
          {activeView === 'html' && (
            <div className="relative">
              <pre className="w-full max-h-[520px] overflow-auto p-4 rounded-2xl bg-stone-950 font-mono-code text-xs text-amber-200/90 border border-stone-800 leading-relaxed scrollbar-thin select-all">
                {currentHtml}
              </pre>
            </div>
          )}

          {activeView === 'markdown' && (
            <div className="relative">
              <pre className="w-full max-h-[520px] overflow-auto p-4 rounded-2xl bg-stone-950 font-mono-code text-xs text-stone-200 border border-stone-800 leading-relaxed scrollbar-thin select-all">
                {currentMarkdown}
              </pre>
            </div>
          )}

          {activeView === 'preview' && (
            <div className="w-full max-h-[520px] overflow-auto p-6 rounded-2xl bg-white text-stone-900 border border-stone-300 shadow-inner">
              <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
