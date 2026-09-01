import React, { useState } from 'react';
import { TastingEvaluation } from '../types';
import { RAW_MATERIALS } from '../data/vodkaData';
import { 
  Wine, 
  Sparkles, 
  Sliders, 
  Download, 
  Check, 
  RotateCcw, 
  Award, 
  Info,
  Thermometer,
  Layers,
  FileText
} from 'lucide-react';

const AROMA_CATEGORIES = [
  {
    name: 'Cereal y Panadería',
    color: 'border-amber-500/40 text-amber-300 bg-amber-950/30',
    items: ['Pan brioche', 'Masa fermentada', 'Centeno tostado', 'Cereal dulce', 'Salvado de trigo', 'Galleta']
  },
  {
    name: 'Especiados y Pimientas',
    color: 'border-rose-500/40 text-rose-300 bg-rose-950/30',
    items: ['Pimienta blanca', 'Pimienta negra', 'Anís estrellado', 'Nuez moscada', 'Jengibre sutil', 'Cardamomo']
  },
  {
    name: 'Cítricos y Frutales',
    color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30',
    items: ['Piel de limón', 'Cáscara de lima', 'Manzana verde', 'Pera blanca', 'Flor de saúco', 'Uva blanca']
  },
  {
    name: 'Terrosos y Lácticos',
    color: 'border-blue-500/40 text-blue-300 bg-blue-950/30',
    items: ['Mantequilla fresca', 'Vainilla suave', 'Tierra húmeda', 'Nata montada', 'Piedra mineral', 'Agua de glaciar']
  }
];

const PRESET_VODKAS = [
  {
    name: 'Cata Ejemplo: Trigo de Invierno (Estilo Francés)',
    material: 'Trigo de Invierno',
    viscosity: 'Media / Lágrima fina' as const,
    mouthfeel: 'Sedoso' as const,
    sweetness: 3,
    burnLevel: 2,
    aromas: ['Pan brioche', 'Piel de limón', 'Anís estrellado'],
    finish: 'Medio (5-15s)' as const,
    rating: 94,
    notes: 'Ataque extraordinariamente sedoso. Notas florales y de corteza de pan con un final cítrico limpio.'
  },
  {
    name: 'Cata Ejemplo: Centeno Puro (Estilo Polaco)',
    material: 'Centeno',
    viscosity: 'Media / Lágrima fina' as const,
    mouthfeel: 'Crisp / Cortante' as const,
    sweetness: 2,
    burnLevel: 3,
    aromas: ['Pimienta blanca', 'Centeno tostado', 'Nuez moscada'],
    finish: 'Largo y Persistente (> 15s)' as const,
    rating: 96,
    notes: 'Gran carácter y estructura. Notas de pan pumpernickel y una calidez de pimienta blanca sumamente elegante.'
  },
  {
    name: 'Cata Ejemplo: Patata de Granja (Estilo Untuoso)',
    material: 'Patata / Papa',
    viscosity: 'Alta / Lágrima densa y lenta' as const,
    mouthfeel: 'Cremoso' as const,
    sweetness: 4,
    burnLevel: 1,
    aromas: ['Mantequilla fresca', 'Vainilla suave', 'Tierra húmeda'],
    finish: 'Largo y Persistente (> 15s)' as const,
    rating: 95,
    notes: 'Textura en boca incomparable. Densidad mantecosa y ausencia total de ardor alcohólico en garganta.'
  }
];

export const TastingStudio: React.FC = () => {
  const [evaluation, setEvaluation] = useState<TastingEvaluation>({
    vodkaName: 'Vodka Artesanal de Clase',
    rawMaterial: 'Trigo de Invierno',
    abv: 40,
    servingTemp: '6°C - 8°C (Copa Tulipa)',
    glassware: 'Copa Tulipa de Degustación ISO',
    clarity: 98,
    viscosity: 'Media / Lágrima fina',
    brightness: 'Brillo diamantino con refracción cristalina',
    aromaIntensity: 7,
    selectedAromas: ['Pan brioche', 'Piel de limón', 'Anís estrellado'],
    mouthfeel: 'Sedoso',
    sweetness: 3,
    burnLevel: 2,
    complexity: 8,
    finishDuration: 'Medio (5-15s)',
    finishNotes: ['Cítrico limpio', 'Pimienta suave', 'Pan horneado'],
    overallRating: 92,
    notes: 'Vodka de excelente factura técnica. Destaca por su equilibrio entre la neutralidad alcohólica y los toques de cereal dulce en retrogusto.'
  });

  const [copiedSheet, setCopiedSheet] = useState<boolean>(false);

  const toggleAroma = (aroma: string) => {
    setEvaluation(prev => {
      const exists = prev.selectedAromas.includes(aroma);
      return {
        ...prev,
        selectedAromas: exists 
          ? prev.selectedAromas.filter(a => a !== aroma)
          : [...prev.selectedAromas, aroma]
      };
    });
  };

  const applyPreset = (preset: typeof PRESET_VODKAS[0]) => {
    setEvaluation(prev => ({
      ...prev,
      vodkaName: preset.name,
      rawMaterial: preset.material,
      viscosity: preset.viscosity,
      mouthfeel: preset.mouthfeel,
      sweetness: preset.sweetness,
      burnLevel: preset.burnLevel,
      selectedAromas: preset.aromas,
      finishDuration: preset.finish,
      overallRating: preset.rating,
      notes: preset.notes
    }));
  };

  const handleCopyTastingSheet = () => {
    const text = `=== FICHA DE CATA OFICIAL DE VODKA ===
Muestra / Marca: ${evaluation.vodkaName}
Materia Prima: ${evaluation.rawMaterial} (${evaluation.abv}% ABV)
Temperatura de Servicio: ${evaluation.servingTemp}
Cristalería: ${evaluation.glassware}

1. FASE VISUAL:
- Limpidez: ${evaluation.clarity}% (Cristalina)
- Viscosidad / Lágrimas: ${evaluation.viscosity}
- Brillo: ${evaluation.brightness}

2. FASE OLFATIVA:
- Intensidad aromática: ${evaluation.aromaIntensity} / 10
- Descriptores aromáticos: ${evaluation.selectedAromas.join(', ')}

3. FASE GUSTATIVA Y TÁCTIL (MOUTHFEEL):
- Sensación en boca: ${evaluation.mouthfeel}
- Dulzor natural percibido: ${evaluation.sweetness} / 5
- Calidez / Ardor alcohólico: ${evaluation.burnLevel} / 5 (Nivel de suavidad)
- Complejidad estructural: ${evaluation.complexity} / 10

4. FINAL Y RETROGUSTO:
- Duración del final: ${evaluation.finishDuration}
- Notas de retrogusto: ${evaluation.finishNotes.join(', ')}
- Calificación Global: ${evaluation.overallRating} / 100 Puntos

Notas del Sommelier / Evaluador:
${evaluation.notes}
=======================================`;

    navigator.clipboard.writeText(text);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <Wine className="w-3.5 h-3.5" />
          <span>Laboratorio Sensorial & Ficha de Degustación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-100">
          Guía y Evaluador de Catas Profesionales
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          En el vodka, la cata no busca madera ni azúcar añadido, sino la <strong>pureza, textura (mouthfeel) y la sutileza aromática del grano</strong>. Rellena la ficha interactiva para tu presentación o clase práctica.
        </p>
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
        <span className="text-xs text-stone-400 font-medium mr-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Cargar Ejemplos de Cata:
        </span>
        {PRESET_VODKAS.map((preset, i) => (
          <button
            key={i}
            id={`preset-tasting-btn-${i}`}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700/60 text-xs font-medium text-stone-200 transition-all hover:border-amber-500/40"
          >
            {preset.material}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Controls / Right Official Sheet Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasting Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: General Info */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
            <h2 className="text-lg font-serif-title font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>1. Datos de la Muestra</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Nombre del Vodka / Muestra:</label>
                <input 
                  type="text"
                  value={evaluation.vodkaName}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, vodkaName: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Materia Prima Base:</label>
                <select
                  value={evaluation.rawMaterial}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, rawMaterial: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  {RAW_MATERIALS.map(m => (
                    <option key={m.id} value={m.nameEs}>{m.nameEs} ({m.bodyWeight})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Temperatura de Servicio:</label>
                <select
                  value={evaluation.servingTemp}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, servingTemp: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                >
                  <option value="6°C - 8°C (Copa Tulipa - Óptima Sommelier)">6°C - 8°C (Copa Tulipa - Óptima Sommelier)</option>
                  <option value="0°C - 4°C (Frío Ligero)">0°C - 4°C (Frío Ligero)</option>
                  <option value="-18°C (Congelador Clásico)">-18°C (Congelador Clásico)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Viscosidad & Lágrimas:</label>
                <select
                  value={evaluation.viscosity}
                  onChange={(e: any) => setEvaluation(prev => ({ ...prev, viscosity: e.target.value }))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none"
                >
                  <option value="Baja / Ágil">Baja / Ágil (Ligero)</option>
                  <option value="Media / Lágrima fina">Media / Lágrima fina (Trigo/Centeno)</option>
                  <option value="Alta / Lágrima densa y lenta">Alta / Lágrima densa y lenta (Patata/Maíz)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Aroma Wheel Selector */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h2 className="text-lg font-serif-title font-bold text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>2. Rueda de Descriptores Aromáticos</span>
              </h2>
              <span className="text-xs text-stone-400 font-mono-code">
                {evaluation.selectedAromas.length} seleccionados
              </span>
            </div>

            <div className="space-y-4">
              {AROMA_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-xs font-semibold text-stone-400 block">
                    {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(item => {
                      const isSelected = evaluation.selectedAromas.includes(item);
                      return (
                        <button
                          key={item}
                          id={`aroma-tag-${item.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => toggleAroma(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            isSelected
                              ? `${cat.color} font-bold shadow-sm scale-105`
                              : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Palate & Mouthfeel Sliders */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-5">
            <h2 className="text-lg font-serif-title font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>3. Evaluación Táctil y Sensorial en Boca (Mouthfeel)</span>
            </h2>

            {/* Mouthfeel style */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300">Textura Principal en Lengua:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Sedoso', 'Cremoso', 'Crisp / Cortante', 'Oleoso'] as const).map(mf => (
                  <button
                    key={mf}
                    onClick={() => setEvaluation(prev => ({ ...prev, mouthfeel: mf }))}
                    className={`p-2 rounded-xl text-xs font-medium border transition-all ${
                      evaluation.mouthfeel === mf
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {mf}
                  </button>
                ))}
              </div>
            </div>

            {/* Alcohol burn warmth slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-stone-300">
                <span>Calor / Ardor Alcohólico en Garganta:</span>
                <span className="text-amber-400 font-mono-code">
                  {evaluation.burnLevel === 1 ? '1 - Extremadamente suave y dócil' : evaluation.burnLevel === 2 ? '2 - Calidez sedosa ligera' : evaluation.burnLevel === 3 ? '3 - Calidez media agradable' : evaluation.burnLevel === 4 ? '4 - Pungente y vigoroso' : '5 - Quemazón intensa'}
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="5"
                value={evaluation.burnLevel}
                onChange={(e) => setEvaluation(prev => ({ ...prev, burnLevel: Number(e.target.value) }))}
                className="w-full accent-amber-400 bg-stone-950 cursor-pointer h-2 rounded-lg"
              />
            </div>

            {/* Sweetness Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-stone-300">
                <span>Dulzor Natural Percibido:</span>
                <span className="text-amber-400 font-mono-code">{evaluation.sweetness} / 5</span>
              </div>
              <input 
                type="range"
                min="1"
                max="5"
                value={evaluation.sweetness}
                onChange={(e) => setEvaluation(prev => ({ ...prev, sweetness: Number(e.target.value) }))}
                className="w-full accent-amber-400 bg-stone-950 cursor-pointer h-2 rounded-lg"
              />
            </div>

            {/* Overall Rating Slider */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <div className="flex justify-between text-xs font-bold text-stone-200">
                <span>Puntuación Global de Cata:</span>
                <span className="text-amber-400 font-mono-code text-sm">{evaluation.overallRating} / 100 Puntos</span>
              </div>
              <input 
                type="range"
                min="70"
                max="100"
                value={evaluation.overallRating}
                onChange={(e) => setEvaluation(prev => ({ ...prev, overallRating: Number(e.target.value) }))}
                className="w-full accent-amber-400 bg-stone-950 cursor-pointer h-2.5 rounded-lg"
              />
            </div>

            {/* Tasting notes text area */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Notas de Conclusión y Maridaje:</label>
              <textarea 
                rows={3}
                value={evaluation.notes}
                onChange={(e) => setEvaluation(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Escribe tus conclusiones para la clase..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Live Printable/Copyable Tasting Sheet Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 p-6 rounded-3xl bg-stone-900/90 border border-amber-500/30 space-y-6 shadow-2xl">
            
            {/* Sheet Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif-title font-bold text-stone-100">
                    Ficha Oficial de Cata
                  </h3>
                  <span className="text-[11px] font-mono-code text-stone-400">
                    Formato Académico de Evaluación
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-bold font-mono-code text-amber-400">
                  {evaluation.overallRating}
                </span>
                <span className="text-[10px] text-stone-500 block">/ 100 PTS</span>
              </div>
            </div>

            {/* Sheet content summary */}
            <div className="space-y-4 text-xs text-stone-300">
              
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800/80 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Muestra:</span>
                  <span className="font-bold text-stone-100">{evaluation.vodkaName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Materia Prima:</span>
                  <span className="text-amber-300 font-semibold">{evaluation.rawMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Servicio:</span>
                  <span className="text-stone-300">{evaluation.servingTemp}</span>
                </div>
              </div>

              {/* Visual & Nose */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Viscosidad:</span>
                  <span className="font-semibold text-stone-200">{evaluation.viscosity.split(' ')[0]}</span>
                </div>
                <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Mouthfeel:</span>
                  <span className="font-semibold text-amber-300">{evaluation.mouthfeel}</span>
                </div>
              </div>

              {/* Aromas pill list */}
              <div className="space-y-1.5">
                <span className="text-stone-400 text-[11px] block">Descriptores Aromáticos:</span>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.selectedAromas.length > 0 ? (
                    evaluation.selectedAromas.map(a => (
                      <span key={a} className="px-2 py-0.5 rounded-md bg-stone-950 border border-amber-500/30 text-amber-300 text-[11px]">
                        {a}
                      </span>
                    ))
                  ) : (
                    <span className="text-stone-500 italic">Ningún aroma seleccionado</span>
                  )}
                </div>
              </div>

              {/* Sommelier conclusion */}
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800/80 space-y-1">
                <span className="text-stone-400 text-[10px] uppercase tracking-wider block font-bold">
                  Dictamen del Evaluador:
                </span>
                <p className="text-stone-300 italic text-[11px] leading-relaxed">
                  "{evaluation.notes}"
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <button
                id="copy-tasting-sheet-btn"
                onClick={handleCopyTastingSheet}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 transition-all active:scale-98"
              >
                {copiedSheet ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Ficha Copiada al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Copiar Ficha de Cata (Texto / Imprimir)</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
