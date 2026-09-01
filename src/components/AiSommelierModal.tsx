import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  User, 
  Wine, 
  Check, 
  HelpCircle,
  Copy,
  BookOpen,
  GraduationCap,
  FlaskConical
} from 'lucide-react';

interface AiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const SUGGESTED_PROMPTS = [
  '¿Por qué el vodka de centeno se siente más especiado que el de trigo?',
  'Explícame la diferencia entre un alambique pot still y una columna de rectificación',
  '¿Por qué el Moscow Mule se sirve en jarra de cobre?',
  'Dame 3 preguntas clave para hacerle a mis compañeros en la exposición de clase',
  '¿Qué mito existe sobre Dmitri Mendeléyev y el 40% de alcohol?'
];

// Offline knowledge base for academic presentation and tasting
function generateSommelierResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('centeno') || q.includes('trigo') || q.includes('materia') || q.includes('grano') || q.includes('patata') || q.includes('papa') || q.includes('uva')) {
    return `🌾 **Análisis de Materias Primas en el Vodka:**

1. **Trigo de Invierno (Ej: Absolut, Grey Goose):**
   - *Perfil organoléptico:* Extremadamente suave, redondo y con sutiles notas a masa de pan horneado y toques cítricos.
   - *Textura:* Sedosa y ligera en paladar.

2. **Centeno Dorado (Ej: Belvedere, Wyborowa, Sobieski):**
   - *Perfil organoléptico:* Robusto, estructurado y notablemente especiado (pimienta negra, vainilla y nuez moscada).
   - *Textura:* Gran cuerpo y retrogusto persistente.

3. **Patata / Tubérculo (Ej: Chopin Potato, Luksusowa):**
   - *Perfil organoléptico:* Notas terrosas, minerales y ligeramente dulces.
   - *Textura:* La más cremosa, densa y untuosa de todas las categorías.

4. **Uva / Frutas (Ej: Cîroc):**
   - *Perfil organoléptico:* Cítrico brillante, frescura floral y acidez viva.`;
  }

  if (q.includes('alambique') || q.includes('columna') || q.includes('rectificaci') || q.includes('destila') || q.includes('quimic') || q.includes('proceso')) {
    return `⚗️ **Termodinámica y Ciencia de la Destilación:**

- **Columnas de Rectificación Continua (Multi-columnas):**
  - Operan con platos de fraccionamiento donde los vapores de etanol (punto de ebullición: 78.37°C) ascienden y el agua y congéneres pesados descienden.
  - Permiten alcanzar el **96.0% - 96.5% ABV (Alcohol por Volumen)**, eliminando casi la totalidad de metanol (cabezas) y alcoholes superiores/aceites de fusel (colas).

- **Alambique Tradicional de Cobre (Pot Still):**
  - Se destila por lotes (*batch*). Retiene una mayor concentración de congéneres y aceites esenciales de la materia prima, aportando más carácter y textura artesanal.

- **Filtración Clave:**
  - El destilado se filtra a través de carbón activo de abedul o arena de cuarzo para adsorber impurezas residuales antes de ser diluido con agua pura desmineralizada al 40% ABV.`;
  }

  if (q.includes('mendeleev') || q.includes('mendeleyev') || q.includes('historia') || q.includes('origen') || q.includes('rusia') || q.includes('polonia') || q.includes('40%') || q.includes('40 %')) {
    return `📜 **Historia y Desmitificación del 40% ABV:**

- **El Mito de Mendeléyev:**
  - Se suele afirmar erróneamente que Dmitri Mendeléyev inventó la fórmula del vodka al 40% ABV en su tesis de 1865. En realidad, investigó la contracción volumétrica de soluciones agua-etanol. El estándar del 40% fue fijado por el gobierno imperial ruso en 1843 por razones puramente fiscales y de recaudación tributaria.

- **El Origen: Polonia vs Rusia:**
  - El primer registro escrito de la palabra *"wodka"* data de **1405 en documentos judiciales de Sandomierz (Polonia)**, donde se usaba originalmente como medicina y antiséptico.
  - En Rusia, el monopolio estatal fue instaurado por Iván el Terrible en el siglo XVI con las tabernas reales (*kabaks*).`;
  }

  if (q.includes('moscow mule') || q.includes('coctel') || q.includes('martini') || q.includes('vesper') || q.includes('cobre') || q.includes('bloody mary')) {
    return `🍸 **Química de la Coctelería Clásica:**

1. **Moscow Mule & La Jarra de Cobre:**
   - *Conductividad térmica:* El cobre transmite el frío del hielo instantáneamente, manteniendo la carbonatación del *ginger beer* y la frescura del zumo de lima.
   - *Sensación táctil:* El borde helado del metal amplifica la sensación refrescante en labios.

2. **Vodka Martini Clásico:**
   - Proporción clásica 5:1 (Vodka + Vermut seco). Al no tener congéneres pesados, el vodka permite que los botánicos del vermut y los aceites esenciales de la piel de limón (*twist*) brillen con total nitidez.

3. **Vesper Martini (James Bond - Casino Royale):**
   - 3 partes de Gin, 1 parte de Vodka de grano y 0.5 partes de Lillet Blanc/Kina Lillet, agitado con abundante hielo.`;
  }

  if (q.includes('pregunta') || q.includes('companero') || q.includes('compañero') || q.includes('clase') || q.includes('exposicion') || q.includes('debate')) {
    return `🎯 **3 Preguntas Estratégicas para tu Exposición de Clase:**

1. **¿Por qué el agua representa el 60% del éxito en la calidad de un vodka premium?**
   *(Respuesta clave: Al diluir de 96% a 40% ABV, el agua glaciar o de manantial determina el pH, la mineralidad y la sensación táctil en boca).*

2. **¿Cuál es la diferencia entre un vodka de rectificación neutra y un vodka artesanal con cata expresiva?**
   *(Respuesta clave: La retención selectiva de micro-congéneres según el cereal y el tipo de filtración empleado).*

3. **¿Es cierto que todos los vodkas son idénticos porque no tienen añejamiento en madera?**
   *(Respuesta clave: Falso. En cata a ciegas a 8°C, la viscosidad, la grasa en lengua y las notas de pimienta o masa madre delatan la materia prima original).*`;
  }

  // Generic expert response
  return `✨ **Guía del Master Sommelier de Destilados:**

Respecto a tu consulta sobre **"${query}"**:
El vodka es un destilado fascinante donde la excelencia radica en la precisión:
- **Rectificación a 96% ABV:** Garantiza la máxima pureza química.
- **Dilución y Agua de Manantial (60% del volumen):** Es el componente más abundante y aporta el equilibrio mineral.
- **Fase de Cata Sensorial:** Evalúa siempre la **Limpidez** (brillo cristalino), la **Fase Táctil** (densidad de las lágrimas en copa) y el **Retrogusto** (calidez limpia sin ardor áspero).

*Consejo para tu presentación:* Destaca la comparativa entre materias primas (trigo vs centeno vs patata) para que el público aprecie que el vodka tiene matices y personalidad propia.`;
}

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: '¡Hola! Soy tu **Guía Sommelier y Asesor Pedagógico de Destilados**. Estoy aquí para ayudarte a preparar tu presentación sobre el vodka, resolver dudas sobre procesos de destilación, historia, química de materias primas o técnicas de cata sensorial. ¿En qué tema deseas profundizar?'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const reply = generateSommelierResponse(text);
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif-title font-bold text-stone-100 flex items-center gap-2">
                <span>Guía Sommelier & Maestro de Destilación</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Académico
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Consultor didáctico para exposiciones de clase, química y catas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="close-sommelier-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Wine className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium shadow-md'
                    : 'bg-stone-950 border border-stone-800/80 text-stone-200 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.content}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-stone-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-stone-950 px-4 py-2.5 rounded-2xl border border-stone-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Consultando compendio de cata y destilación...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-stone-950/40 border-t border-stone-800/60 overflow-x-auto scrollbar-none flex gap-2">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 hover:text-amber-300 transition-all shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="p-4 border-t border-stone-800 bg-stone-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="sommelier-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregunta sobre materias primas, columnas, cata o cócteles..."
              className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              id="send-sommelier-btn"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Consultar</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
