import React, { useState } from 'react';
import { INDUSTRIAL_EQUIPMENT_LIST, EQUIPMENT_CATEGORIES } from '../data/equipmentData';
import { IndustrialEquipmentItem } from '../types';
import { 
  Factory, 
  Layers, 
  Flame, 
  Droplets, 
  Box, 
  Sliders, 
  ShieldCheck, 
  Search, 
  Info, 
  CheckCircle2, 
  Wrench, 
  Thermometer, 
  Gauge, 
  Sparkles,
  Filter,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Cpu,
  RefreshCw,
  Activity,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ImageIcon
} from 'lucide-react';

export const IndustrialEquipment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedEquipmentId, setExpandedEquipmentId] = useState<string | null>(INDUSTRIAL_EQUIPMENT_LIST[0].id);
  const [activeViewMode, setActiveViewMode] = useState<'cards' | 'gallery' | 'flow' | 'specs-table'>('cards');
  const [lightboxEquipment, setLightboxEquipment] = useState<IndustrialEquipmentItem | null>(null);

  const filteredEquipment = INDUSTRIAL_EQUIPMENT_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.functionDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workingPrinciple.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Preparación y Molienda':
        return 'bg-amber-950/60 border-amber-500/40 text-amber-300';
      case 'Maceración y Fermentación':
        return 'bg-orange-950/60 border-orange-500/40 text-orange-300';
      case 'Destilación y Rectificación':
        return 'bg-yellow-950/60 border-yellow-500/40 text-yellow-300';
      case 'Filtración y Purificación':
        return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
      case 'Mezcla y Envasado':
        return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';
      default:
        return 'bg-stone-900 border-stone-700 text-stone-300';
    }
  };

  const handleNextLightbox = () => {
    if (!lightboxEquipment) return;
    const currentIndex = INDUSTRIAL_EQUIPMENT_LIST.findIndex(e => e.id === lightboxEquipment.id);
    const nextIndex = (currentIndex + 1) % INDUSTRIAL_EQUIPMENT_LIST.length;
    setLightboxEquipment(INDUSTRIAL_EQUIPMENT_LIST[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxEquipment) return;
    const currentIndex = INDUSTRIAL_EQUIPMENT_LIST.findIndex(e => e.id === lightboxEquipment.id);
    const prevIndex = (currentIndex - 1 + INDUSTRIAL_EQUIPMENT_LIST.length) % INDUSTRIAL_EQUIPMENT_LIST.length;
    setLightboxEquipment(INDUSTRIAL_EQUIPMENT_LIST[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Factory className="w-3.5 h-3.5" />
          <span>Ingeniería Química & Planta de Destilación Continua</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-100 tracking-tight">
          Equipos Industriales para la Elaboración del Vodka
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Catálogo técnico de maquinaria industrial, columnas de rectificación continua, unidades de filtración molecular con carbón de abedul y líneas asépticas de embotellado con fotos e ilustraciones de alta resolución.
        </p>
      </div>

      {/* Industrial Key Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Etapas de Planta</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-title text-stone-100">
            5 Fases Clave
          </div>
          <p className="text-[11px] text-stone-500">11 Equipos especializados</p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Pureza Máxima</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-title text-amber-300">
            96.5% ABV
          </div>
          <p className="text-[11px] text-stone-500">Límite azeotrópico fraccionado</p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Material Constructivo</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-title text-stone-100">
            AISI 316L / Cu
          </div>
          <p className="text-[11px] text-stone-500">Acero quirúrgico y Cobre Cu-DHP</p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Sanitización CIP</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-title text-emerald-400">
            100% Aséptica
          </div>
          <p className="text-[11px] text-stone-500">Sistemas Clean-in-Place automatizados</p>
        </div>
      </div>

      {/* Control Bar: View Switcher & Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              id="equipment-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar equipo, material (AISI 316L), principio..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 w-full md:w-auto justify-center overflow-x-auto">
            <button
              id="view-mode-cards-btn"
              onClick={() => setActiveViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'cards'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>Fichas Técnicas</span>
            </button>

            <button
              id="view-mode-gallery-btn"
              onClick={() => setActiveViewMode('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'gallery'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Galería Visual</span>
            </button>

            <button
              id="view-mode-flow-btn"
              onClick={() => setActiveViewMode('flow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'flow'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Diagrama de Flujo</span>
            </button>

            <button
              id="view-mode-table-btn"
              onClick={() => setActiveViewMode('specs-table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'specs-table'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Tabla Comparativa</span>
            </button>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>Fase:</span>
          </span>
          {EQUIPMENT_CATEGORIES.map(category => (
            <button
              key={category}
              id={`filter-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-900 hover:text-stone-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

      </div>

      {/* VIEW MODE 1: DETAILED TECHNICAL CARDS WITH PHOTO / ILLUSTRATION HEADER */}
      {activeViewMode === 'cards' && (
        <div className="space-y-6">
          {filteredEquipment.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
              <Search className="w-10 h-10 text-stone-600 mx-auto" />
              <h3 className="text-lg font-serif-title text-stone-200">No se encontraron equipos industriales</h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                No hay resultados para el término de búsqueda actual. Intenta seleccionando "Todos" o buscando por otro material o parámetro.
              </p>
              <button
                onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            filteredEquipment.map((equipment) => {
              const isExpanded = expandedEquipmentId === equipment.id;
              return (
                <div
                  key={equipment.id}
                  id={`equipment-card-${equipment.id}`}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'bg-stone-900/95 border-amber-500/50 shadow-2xl shadow-amber-950/20' 
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  
                  {/* Card Header (Clickable to toggle accordion) */}
                  <div 
                    onClick={() => setExpandedEquipmentId(isExpanded ? null : equipment.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-stone-800/30 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      
                      {/* Thumbnail Preview */}
                      {equipment.imageUrl ? (
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-stone-700/80 shrink-0 shadow-md group/thumb">
                          <img 
                            src={equipment.imageUrl} 
                            alt={equipment.imageAlt || equipment.name}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-stone-950/30 flex items-center justify-center">
                            <span className="text-[10px] font-bold font-mono-code text-amber-300 bg-stone-950/80 px-1.5 py-0.5 rounded">
                              #{equipment.phaseNumber}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center text-center shrink-0 shadow-inner">
                          <span className="text-[10px] font-mono-code uppercase text-stone-500">Paso</span>
                          <span className="text-base font-bold font-serif-title text-amber-400 leading-none">
                            {String(equipment.phaseNumber).padStart(2, '0')}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryBadgeClass(equipment.category)}`}>
                            {equipment.category}
                          </span>
                          <span className="text-xs text-stone-400 font-mono-code">
                            • {equipment.stageName}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-serif-title font-bold text-stone-100 hover:text-amber-200 transition-colors">
                          {equipment.name}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center w-full sm:w-auto">
                      <span className="text-xs text-amber-300/80 font-mono-code bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800/80">
                        {equipment.capacityRange}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-100 transition-all">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body Content */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-800/80 space-y-6 animate-fadeIn">
                      
                      {/* Machinery High-Resolution Photo / Illustration Banner */}
                      {equipment.imageUrl && (
                        <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950 group">
                          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
                            <img 
                              src={equipment.imageUrl} 
                              alt={equipment.imageAlt || equipment.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                          </div>

                          {/* Image Overlay Bar */}
                          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono-code font-bold uppercase">
                                  Ilustración Técnica • {equipment.stageName}
                                </span>
                                <span className="text-[11px] text-stone-400">
                                  {equipment.material.split(' ')[0]} {equipment.material.split(' ')[1]}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-stone-200 font-medium">
                                {equipment.imageAlt || equipment.name}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxEquipment(equipment);
                              }}
                              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 border border-stone-700 text-stone-200 text-xs font-semibold transition-all cursor-pointer shadow-md"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Ver en Pantalla Completa</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Summary Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Function & Role */}
                        <div className="md:col-span-2 p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-2">
                          <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" />
                            <span>Función en la Destilería Industrial</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                            {equipment.functionDescription}
                          </p>
                        </div>

                        {/* Materials & Resistance */}
                        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-2">
                          <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Wrench className="w-3.5 h-3.5 text-amber-400" />
                            <span>Materiales de Construcción</span>
                          </h4>
                          <p className="text-xs text-stone-300 font-mono-code leading-relaxed">
                            {equipment.material}
                          </p>
                        </div>

                      </div>

                      {/* Operating Parameters Matrix */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-amber-500/20 space-y-3">
                        <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-amber-400" />
                          <span>Parámetros Operativos y Termodinámicos</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
                            <div className="text-stone-400 flex items-center gap-1.5">
                              <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                              <span>Temperatura Operativa:</span>
                            </div>
                            <div className="font-mono-code font-bold text-stone-100">
                              {equipment.operatingParameters.temperature}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
                            <div className="text-stone-400 flex items-center gap-1.5">
                              <Gauge className="w-3.5 h-3.5 text-blue-400" />
                              <span>Presión de Trabajo:</span>
                            </div>
                            <div className="font-mono-code font-bold text-stone-100">
                              {equipment.operatingParameters.pressure}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
                            <div className="text-stone-400 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>Rendimiento / ABV Salida:</span>
                            </div>
                            <div className="font-mono-code font-bold text-amber-300">
                              {equipment.operatingParameters.targetAbv || equipment.operatingParameters.throughputOrYield || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Working Principle & Physical Reaction */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                        <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-amber-400" />
                          <span>Principio Químico / Físico de Operación</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                          {equipment.workingPrinciple}
                        </p>
                      </div>

                      {/* Two Column Section: Key Components & Diagram Stages */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Components */}
                        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                          <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-amber-400" />
                            <span>Componentes Críticos e Instrumentación</span>
                          </h4>
                          <ul className="space-y-2">
                            {equipment.keyComponents.map((comp, idx) => (
                              <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{comp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Flow Stages */}
                        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                          <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Etapas del Proceso en este Equipo</span>
                          </h4>
                          <ul className="space-y-2">
                            {equipment.industrialDiagramDetails.map((stage, idx) => (
                              <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-mono-code text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span>{stage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Maintenance, CIP & Academic Importance */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        
                        <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                          <span className="text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Wrench className="w-3 h-3 text-amber-400" />
                            <span>Mantenimiento y Sanitización (CIP):</span>
                          </span>
                          <p className="text-stone-300 leading-relaxed">
                            {equipment.maintenanceAndSanitization}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                          <span className="text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Relevancia Académica para Exposición:</span>
                          </span>
                          <p className="text-amber-100/90 leading-relaxed">
                            {equipment.academicImportance}
                          </p>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW MODE 2: VISUAL GALLERY WITH HIGH-RES INDUSTRIAL PHOTOS & BLUEPRINTS */}
      {activeViewMode === 'gallery' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif-title font-bold text-stone-100">
                Galería Visual de Equipos & Maquinaria de Planta
              </h3>
              <p className="text-xs text-stone-400">
                Explora las ilustraciones y fotografías de la infraestructura de molienda, cocción, destilación continua, filtración de carbón y envasado aséptico.
              </p>
            </div>
            <span className="text-xs text-amber-300 font-mono-code bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800">
              {filteredEquipment.length} Equipos en Catálogo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((equipment) => (
              <div 
                key={equipment.id}
                onClick={() => setLightboxEquipment(equipment)}
                className="group rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/60 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  {equipment.imageUrl ? (
                    <img 
                      src={equipment.imageUrl} 
                      alt={equipment.imageAlt || equipment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-950 text-stone-600">
                      <Factory className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Category & Step Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-lg bg-stone-950/90 border border-stone-700 text-amber-300 font-mono-code font-bold text-xs flex items-center justify-center shadow">
                      #{equipment.phaseNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-sm ${getCategoryBadgeClass(equipment.category)}`}>
                      {equipment.category}
                    </span>
                  </div>

                  {/* Zoom Action Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-stone-950/80 border border-stone-700 text-stone-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-amber-300" />
                  </div>

                  {/* Temperature / Pressure Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-code text-stone-300">
                    <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 text-amber-300">
                      {equipment.operatingParameters.temperature}
                    </span>
                    <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 text-cyan-300">
                      {equipment.operatingParameters.pressure}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono-code text-stone-500 uppercase">
                      {equipment.stageName}
                    </div>
                    <h4 className="text-base font-serif-title font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {equipment.name}
                    </h4>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {equipment.functionDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono-code text-[11px]">
                      {equipment.capacityRange}
                    </span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      <span>Ver Detalles</span>
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: INTERACTIVE PROCESS FLOW DIAGRAM */}
      {activeViewMode === 'flow' && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl font-serif-title font-bold text-stone-100">
              Diagrama de Flujo Continuo de la Planta de Vodka
            </h3>
            <p className="text-xs text-stone-400">
              Secuencia industrial automatizada desde el grano crudo hasta la botella final con gas inerte.
            </p>
          </div>

          <div className="relative border-l-2 border-amber-500/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {INDUSTRIAL_EQUIPMENT_LIST.map((item) => (
              <div 
                key={item.id}
                className="relative group p-5 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/50 transition-all shadow-lg flex flex-col md:flex-row gap-5 items-start"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-6 w-6 h-6 rounded-full bg-stone-900 border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-300 shadow-md">
                  {item.phaseNumber}
                </div>

                {/* Optional Miniature Image */}
                {item.imageUrl && (
                  <div 
                    onClick={() => setLightboxEquipment(item)}
                    className="w-full md:w-36 h-24 rounded-xl overflow-hidden border border-stone-800 shrink-0 cursor-pointer relative group/img shadow"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>
                )}

                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-amber-300 font-mono-code">
                      {item.operatingParameters.targetAbv || item.operatingParameters.temperature}
                    </span>
                  </div>

                  <h4 className="text-base font-serif-title font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.functionDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-stone-400 border-t border-stone-900">
                    <div><strong>Material:</strong> {item.material.split(' ')[0]} {item.material.split(' ')[1]}</div>
                    <div><strong>Capacidad:</strong> {item.capacityRange}</div>
                    <div><strong>Presión:</strong> {item.operatingParameters.pressure}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW MODE 4: FULL TECHNICAL COMPARISON TABLE */}
      {activeViewMode === 'specs-table' && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-serif-title font-bold text-stone-100">
                Matriz Comparativa de Maquinaria Industrial
              </h3>
              <p className="text-xs text-stone-400">
                Resumen de aleaciones, temperaturas, presiones y rendimientos por etapa.
              </p>
            </div>
            <span className="text-xs text-stone-400 font-mono-code bg-stone-950 px-3 py-1 rounded-lg border border-stone-800">
              11 Equipos Registrados
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-800 scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-950 text-stone-300 font-semibold border-b border-stone-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Vista</th>
                  <th className="p-3.5">Equipo Industrial</th>
                  <th className="p-3.5">Categoría / Fase</th>
                  <th className="p-3.5">Material de Contacto</th>
                  <th className="p-3.5">Temp. Trabajo</th>
                  <th className="p-3.5">Presión</th>
                  <th className="p-3.5">Capacidad / Rendimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 bg-stone-900/40 text-stone-300">
                {INDUSTRIAL_EQUIPMENT_LIST.map((eq) => (
                  <tr key={eq.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="p-3.5 font-mono-code font-bold text-amber-400">{eq.phaseNumber}</td>
                    <td className="p-2">
                      {eq.imageUrl ? (
                        <button
                          onClick={() => setLightboxEquipment(eq)}
                          className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 cursor-pointer block hover:scale-105 transition-transform"
                          title="Ampliar ilustración"
                        >
                          <img 
                            src={eq.imageUrl} 
                            alt={eq.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-600">
                          <Factory className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 font-medium text-stone-100 max-w-[200px]">
                      <div>{eq.name}</div>
                      <div className="text-[10px] text-stone-500">{eq.stageName}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${getCategoryBadgeClass(eq.category)}`}>
                        {eq.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono-code text-stone-400 text-[11px] max-w-[160px]">
                      {eq.material}
                    </td>
                    <td className="p-3.5 font-mono-code text-stone-200 whitespace-nowrap">
                      {eq.operatingParameters.temperature}
                    </td>
                    <td className="p-3.5 font-mono-code text-stone-300 whitespace-nowrap">
                      {eq.operatingParameters.pressure}
                    </td>
                    <td className="p-3.5 font-mono-code text-amber-300">
                      {eq.capacityRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* FULLSCREEN LIGHTBOX / TECHNICAL SPEC SHEET MODAL */}
      {lightboxEquipment && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setLightboxEquipment(null)}
        >
          <div 
            className="relative w-full max-w-5xl rounded-3xl bg-stone-900 border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Lightbox Navigation & Close Header */}
            <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono-code font-bold flex items-center justify-center text-xs">
                  #{lightboxEquipment.phaseNumber}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-serif-title font-bold text-stone-100">
                    {lightboxEquipment.name}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {lightboxEquipment.category} • {lightboxEquipment.stageName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-700 flex items-center justify-center cursor-pointer transition-colors"
                  title="Anterior equipo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-700 flex items-center justify-center cursor-pointer transition-colors"
                  title="Siguiente equipo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxEquipment(null)}
                  className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: High Res Image + Fast Specs Overview */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Main Photo / Illustration View */}
              {lightboxEquipment.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 relative">
                  <div className="aspect-[16/9] w-full">
                    <img 
                      src={lightboxEquipment.imageUrl} 
                      alt={lightboxEquipment.imageAlt || lightboxEquipment.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 bg-stone-950/90 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
                    <span className="font-medium text-amber-300">
                      {lightboxEquipment.imageAlt || lightboxEquipment.name}
                    </span>
                    <span className="font-mono-code text-[11px] text-stone-400">
                      Capacidad: {lightboxEquipment.capacityRange}
                    </span>
                  </div>
                </div>
              )}

              {/* Fast Technical Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Función Industrial & Destilería</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {lightboxEquipment.functionDescription}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    <span>Principio Físico / Químico</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {lightboxEquipment.workingPrinciple}
                  </p>
                </div>

              </div>

              {/* Operating Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                  <div className="text-stone-400 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                    <span>Temperatura:</span>
                  </div>
                  <div className="font-mono-code font-bold text-stone-100">
                    {lightboxEquipment.operatingParameters.temperature}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                  <div className="text-stone-400 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Presión:</span>
                  </div>
                  <div className="font-mono-code font-bold text-stone-100">
                    {lightboxEquipment.operatingParameters.pressure}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                  <div className="text-stone-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Salida / Pureza:</span>
                  </div>
                  <div className="font-mono-code font-bold text-amber-300">
                    {lightboxEquipment.operatingParameters.targetAbv || lightboxEquipment.operatingParameters.throughputOrYield || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Components */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Componentes Clave e Instrumentación</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lightboxEquipment.keyComponents.map((comp, idx) => (
                    <div key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono-code">
                Material: {lightboxEquipment.material}
              </span>
              <button
                type="button"
                onClick={() => setLightboxEquipment(null)}
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Cerrar Visor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
