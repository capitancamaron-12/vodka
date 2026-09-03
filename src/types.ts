export type TabType = 
  | 'blog' 
  | 'process' 
  | 'presentation' 
  | 'equipment';

export interface IndustrialEquipmentItem {
  id: string;
  name: string;
  category: 'Preparación y Molienda' | 'Maceración y Fermentación' | 'Destilación y Rectificación' | 'Filtración y Purificación' | 'Mezcla y Envasado';
  phaseNumber: number;
  stageName: string;
  material: string;
  capacityRange: string;
  operatingParameters: {
    temperature: string;
    pressure: string;
    throughputOrYield?: string;
    targetAbv?: string;
  };
  functionDescription: string;
  workingPrinciple: string;
  keyComponents: string[];
  maintenanceAndSanitization: string;
  industrialDiagramDetails: string[];
  imagePlaceholderIcon: string;
  imageUrl?: string;
  imageAlt?: string;
  academicImportance: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: 'Historia' | 'Fabricación' | 'Cata' | 'Mixología' | 'Materias Primas';
  readTime: string;
  author: string;
  date: string;
  coverImage?: string;
  tags: string[];
  excerpt: string;
  contentHtml: string;
  keyTakeaways: string[];
  academicNotes?: string[];
}

export interface RawMaterialProfile {
  id: string;
  name: string;
  nameEs: string;
  iconName: string;
  texture: string;
  flavorProfile: string;
  sweetnessLevel: number; // 1-5
  bodyWeight: 'Ligero' | 'Medio' | 'Pleno y Sedoso' | 'Cremoso / Untuoso';
  aromaNotes: string[];
  keyBrands: string[];
  originRegion: string;
  chemistryNotes: string;
}

export interface DistillationStep {
  step: number;
  title: string;
  duration: string;
  temp: string;
  abvOutput: string;
  description: string;
  chemicalReaction: string;
  icon: string;
  details: string[];
  filtrationNotes?: string;
}

export interface HistoryMilestone {
  era: string;
  year: string;
  region: string;
  title: string;
  description: string;
  historicalFact: string;
  culturalImpact: string;
  icon: string;
}

export interface TastingEvaluation {
  vodkaName: string;
  rawMaterial: string;
  abv: number;
  servingTemp: string;
  glassware: string;
  // Visual
  clarity: number; // 1-100
  viscosity: 'Baja / Ágil' | 'Media / Lágrima fina' | 'Alta / Lágrima densa y lenta';
  brightness: string;
  // Aroma
  aromaIntensity: number; // 1-10
  selectedAromas: string[];
  // Palate
  mouthfeel: 'Sedoso' | 'Cremoso' | 'Crisp / Cortante' | 'Oleoso' | 'Pungente';
  sweetness: number; // 1-5
  burnLevel: number; // 1-5 (Alcohol warmth)
  complexity: number; // 1-10
  // Finish
  finishDuration: 'Corto (< 5s)' | 'Medio (5-15s)' | 'Largo y Persistente (> 15s)';
  finishNotes: string[];
  overallRating: number; // 1-100
  notes: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  section: string;
  bullets: string[];
  speakerNotes: string;
  visualHighlight?: string;
  iconName?: string;
  quote?: string;
  stat?: { value: string; label: string };
  badgeText?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Historia' | 'Química' | 'Cata' | 'Coctelería';
}
