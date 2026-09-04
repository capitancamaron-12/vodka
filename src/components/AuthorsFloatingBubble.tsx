import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  X, 
  ChevronUp, 
  Sparkles, 
  UserCheck, 
  BookOpen,
  Award,
  Layers
} from 'lucide-react';

interface Author {
  name: string;
  role: string;
  initials: string;
  color: string;
}

const AUTHORS: Author[] = [
  {
    name: 'David Taylor',
    role: 'Expositor & Proyecto Académico',
    initials: 'DT',
    color: 'from-amber-400 to-amber-600'
  },
  {
    name: 'Elvin Martínez',
    role: 'Expositor & Proyecto Académico',
    initials: 'EM',
    color: 'from-amber-500 to-amber-700'
  },
  {
    name: 'Sahiry Villareal',
    role: 'Expositora & Proyecto Académico',
    initials: 'SV',
    color: 'from-amber-300 to-amber-500'
  }
];

export const AuthorsFloatingBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside 
      id="floating-authors-widget"
      aria-label="Información de integrantes del proyecto"
      className="fixed bottom-5 right-5 z-50 font-sans select-none"
    >
      {/* Expanded Modal / Card */}
      {isOpen ? (
        <div 
          id="authors-expanded-card"
          className="w-80 sm:w-96 rounded-2xl bg-stone-900/95 border border-amber-500/40 p-5 shadow-2xl shadow-black/80 backdrop-blur-xl animate-fadeIn transition-all duration-300"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
                  Integrantes del Equipo
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h2>
                <p className="text-[11px] text-stone-400">
                  Proyecto &amp; Presentación Académica
                </p>
              </div>
            </div>

            <button
              id="close-authors-bubble-btn"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center transition-colors cursor-pointer"
              title="Minimizar burbuja"
              aria-label="Cerrar panel de integrantes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Authors List */}
          <div className="py-3.5 space-y-2.5">
            {AUTHORS.map((author, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/30 transition-all"
              >
                {/* Avatar Initials Pill */}
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${author.color} flex items-center justify-center text-stone-950 font-bold text-xs shadow-md shadow-amber-950/30 shrink-0`}>
                  {author.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-stone-100 truncate flex items-center gap-1.5">
                    {author.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 truncate flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-amber-400/80" />
                    <span>{author.role}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Card Footer / Subject Context */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Destilación &amp; Enología</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono-code text-[10px] border border-amber-500/20">
              Año 2026
            </span>
          </div>
        </div>
      ) : (
        /* Minimized Floating Bubble Pill */
        <button
          id="open-authors-bubble-btn"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-900 border border-amber-500/40 hover:border-amber-400 text-stone-100 shadow-xl shadow-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer ring-2 ring-amber-500/10 hover:ring-amber-500/30"
          title="Ver integrantes del equipo académico"
          aria-label="Abrir panel de integrantes del proyecto"
        >
          {/* Avatar Cluster */}
          <div className="flex -space-x-2 overflow-hidden items-center">
            {AUTHORS.map((author, idx) => (
              <div 
                key={idx}
                className={`inline-block w-6 h-6 rounded-full ring-2 ring-stone-900 bg-gradient-to-br ${author.color} flex items-center justify-center text-[10px] font-bold text-stone-950`}
              >
                {author.initials}
              </div>
            ))}
          </div>

          {/* Text Label */}
          <div className="text-left pr-1 hidden sm:block">
            <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 transition-colors flex items-center gap-1">
              David • Elvin • Sahiry
            </span>
          </div>

          <span className="sm:hidden text-xs font-semibold text-amber-300">
            Integrantes
          </span>

          <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
            <ChevronUp className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </aside>
  );
};
