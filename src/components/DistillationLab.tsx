import React, { useState } from 'react';
import { DISTILLATION_STEPS, RAW_MATERIALS } from '../data/vodkaData';
import { DistillationStep } from '../types';
import { 
  FlaskConical, 
  Flame, 
  Filter, 
  Droplets, 
  Layers, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Sliders,
  RefreshCw
} from 'lucide-react';

export const DistillationLab: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(2); // Default to Multi-Column Rectification
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('wheat');
  const [columnPlates, setColumnPlates] = useState<number>(50); // 30 to 80 plates
  const [filterType, setFilterType] = useState<'charcoal' | 'silver' | 'quartz' | 'diamond'>('charcoal');
  const [waterSource, setWaterSource] = useState<'glacier' | 'spring' | 'ro'>('glacier');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const selectedMaterial = RAW_MATERIALS.find(m => m.id === selectedMaterialId) || RAW_MATERIALS[0];
  const activeStep: DistillationStep = DISTILLATION_STEPS[selectedStepIndex];

  // Calculated simulation metrics
  const calculatedAbv = Math.min(96.5, 90.0 + (columnPlates / 80) * 6.5).toFixed(1);
  const congenerRemoval = Math.min(99.9, 97.0 + (columnPlates / 80) * 2.9).toFixed(2);
  
  const filterMultipliers = {
    charcoal: { name: 'Carbón Activo de Abedul Siberiano', smoothness: 'Extra Sedoso', icon: '🌲', poreSize: '0.5 nm' },
    silver: { name: 'Filtro de Iones de Plata Coloidal', smoothness: 'Crisp y Brillante', icon: '✨', poreSize: '0.2 nm' },
    quartz: { name: 'Arena de Cuarzo de Cristal de Roca', smoothness: 'Mineral Neutro', icon: '💎', poreSize: '1.0 nm' },
    diamond: { name: 'Micro-polvo de Diamante Precioso', smoothness: 'Ultra-Lujoso y Pulido', icon: '👑', poreSize: '0.1 nm' },
  };

  const waterDetails = {
    glacier: { name: 'Agua de Deshielo Glaciar (Baja Mineralización)', mouthfeel: 'Fresco, ágil y cristalino', ppm: '12 ppm' },
    spring: { name: 'Agua de Manantial Artesiano Profundo', mouthfeel: 'Redondo, estructurado y suave', ppm: '45 ppm' },
    ro: { name: 'Agua Desmineralizada por Ósmosis Inversa', mouthfeel: 'Completamente neutro y puro', ppm: '2 ppm' },
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Laboratorio Químico e Infografía Interactiva</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-100">
          El Proceso de Destilación y Rectificación Molecular
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Explora paso a paso las 6 etapas industriales para crear vodka de alta gama. Ajusta los parámetros en el simulador para observar cómo influyen los platos de destilación, el tipo de carbón y el agua.
        </p>
      </div>

      {/* 6 Step Progress Pipeline Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {DISTILLATION_STEPS.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={step.step}
              id={`step-pipeline-btn-${step.step}`}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected 
                  ? 'bg-amber-500/15 border-amber-400 text-stone-100 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50' 
                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'
                }`}>
                  {step.step}
                </span>
                <span className="text-[10px] font-mono-code text-amber-400/90 font-medium">
                  {step.abvOutput.split(' ')[0]}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight line-clamp-2">
                  {step.title}
                </p>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  ⏱ {step.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Step Infographic & Chemistry */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-900/70 border border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <FlaskConical className="w-64 h-64 text-amber-300" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono-code text-amber-400 uppercase tracking-wider font-semibold">
                Fase {activeStep.step} de 6
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100 mt-1">
                {activeStep.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono-code text-stone-300">
                🌡 {activeStep.temp}
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code text-amber-300 font-bold">
                {activeStep.abvOutput}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {activeStep.description}
          </p>

          {/* Chemical Reaction Highlight */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/20 space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider font-mono-code text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Reacción & Termodinámica
            </span>
            <p className="text-xs sm:text-sm font-mono-code text-stone-200">
              {activeStep.chemicalReaction}
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Puntos Críticos de Control de Calidad:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              {activeStep.details.map((det, i) => (
                <li key={i} className="flex items-start gap-2 bg-stone-950/40 p-2.5 rounded-xl border border-stone-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{det}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              onClick={() => setSelectedStepIndex(prev => Math.max(0, prev - 1))}
              disabled={selectedStepIndex === 0}
              className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium text-stone-300 border border-stone-800 transition-all"
            >
              ← Etapa Anterior
            </button>
            <span className="text-xs text-stone-500 font-mono-code">
              Paso {activeStep.step} / 6
            </span>
            <button
              onClick={() => setSelectedStepIndex(prev => Math.min(DISTILLATION_STEPS.length - 1, prev + 1))}
              disabled={selectedStepIndex === DISTILLATION_STEPS.length - 1}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-stone-950 shadow-md transition-all"
            >
              Siguiente Etapa →
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Distillation Simulator */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2 text-stone-100 font-semibold text-sm">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Simulador de Lote Maestro (Master Batch)</span>
            </div>
            <button
              onClick={handleRunSimulation}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin text-amber-400' : ''}`} />
              <span>Recalcular</span>
            </button>
          </div>

          {/* Selector 1: Materia Prima */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 flex justify-between">
              <span>1. Materia Prima Base:</span>
              <span className="text-amber-400">{selectedMaterial.nameEs}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {RAW_MATERIALS.map(m => (
                <button
                  key={m.id}
                  id={`sim-mat-${m.id}`}
                  onClick={() => setSelectedMaterialId(m.id)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedMaterialId === m.id
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {m.nameEs.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Selector 2: Platos de Columna */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-stone-300">
              <span>2. Altura de Columna (Platos de Rectificación):</span>
              <span className="text-amber-400 font-mono-code">{columnPlates} platos</span>
            </div>
            <input 
              type="range"
              min="30"
              max="80"
              step="5"
              value={columnPlates}
              onChange={(e) => setColumnPlates(Number(e.target.value))}
              className="w-full accent-amber-400 bg-stone-950 cursor-pointer h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono-code">
              <span>30 (Estilo Rústico 92%)</span>
              <span>55 (Estándar Premium 96%)</span>
              <span>80 (Ultra Pureza 96.5%)</span>
            </div>
          </div>

          {/* Selector 3: Medio de Filtración */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300">
              3. Sistema de Filtración Molecular:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(filterMultipliers) as (keyof typeof filterMultipliers)[]).map(key => {
                const f = filterMultipliers[key];
                return (
                  <button
                    key={key}
                    id={`sim-filter-${key}`}
                    onClick={() => setFilterType(key)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center gap-2 transition-all ${
                      filterType === key
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-base">{f.icon}</span>
                    <span className="leading-tight">{key === 'charcoal' ? 'Carbón Abedul' : key === 'silver' ? 'Plata Coloidal' : key === 'quartz' ? 'Cuarzo' : 'Diamante'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector 4: Fuente de Agua */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300">
              4. Agua para Dilución (60% del producto final):
            </label>
            <div className="space-y-1.5">
              {(Object.keys(waterDetails) as (keyof typeof waterDetails)[]).map(wKey => {
                const w = waterDetails[wKey];
                return (
                  <button
                    key={wKey}
                    id={`sim-water-${wKey}`}
                    onClick={() => setWaterSource(wKey)}
                    className={`w-full p-2 rounded-xl text-xs font-medium border text-left flex justify-between items-center transition-all ${
                      waterSource === wKey
                        ? 'bg-blue-500/15 border-blue-400 text-blue-300 font-semibold'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <span>{w.name}</span>
                    <span className="text-[10px] font-mono-code bg-stone-900 px-1.5 py-0.5 rounded">{w.ppm}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Batch Chemistry Result Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-950 to-stone-900 border border-amber-500/30 space-y-3">
            <span className="text-[11px] uppercase tracking-wider font-mono-code text-amber-400 font-bold block">
              📊 Perfil Organoléptico Resultante:
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-stone-400 block text-[10px]">Pureza de Rectificación:</span>
                <span className="text-stone-100 font-bold font-mono-code text-sm text-emerald-400">{calculatedAbv}% ABV</span>
              </div>
              <div className="bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                <span className="text-stone-400 block text-[10px]">Purga de Congéneres:</span>
                <span className="text-stone-100 font-bold font-mono-code text-sm text-amber-400">{congenerRemoval}%</span>
              </div>
            </div>

            <div className="text-xs text-stone-300 space-y-1 pt-1 border-t border-stone-800/60">
              <p><strong className="text-amber-300">Textura esperada:</strong> {selectedMaterial.texture} con acabado {filterMultipliers[filterType].smoothness}.</p>
              <p><strong className="text-blue-300">Sensación de hidratación:</strong> {waterDetails[waterSource].mouthfeel}.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
