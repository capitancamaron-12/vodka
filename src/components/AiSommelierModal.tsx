import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Brain, 
  RotateCcw, 
  User, 
  Wine, 
  Check, 
  HelpCircle,
  Copy
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
  'Explícame la diferencia química entre un alambique pot still y una columna de rectificación',
  '¿Por qué el Moscow Mule se sirve obligatoriamente en jarra de cobre?',
  'Dame 3 preguntas desafiantes para hacerle a mis compañeros en la exposición de clase'
];

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: '¡Hola! Soy tu **Profesor y Master Sommelier de Destilados**. Estoy aquí para ayudarte a preparar tu presentación sobre el vodka, resolver dudas sobre procesos de destilación, historia, termodinámica o técnicas de cata sensorial. ¿En qué tema deseas profundizar?'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deepThinking, setDeepThinking] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4),
          mode: deepThinking ? 'deep' : 'fast'
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'No se pudo obtener respuesta del Sommelier.';
      setMessages(prev => [...prev, { role: 'model', content: replyText }]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'El vodka se define por su pureza de rectificación (96% ABV) y el carácter de su agua de dilución (60% del volumen final). Recuerda siempre evaluar la fase táctil (viscosidad y sedosidad en lengua) en tu presentación.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif-title font-bold text-stone-100 flex items-center gap-2">
                <span>Sommelier IA & Master Distiller</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Gemini 3 Pro
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Asistente académico para presentaciones de clase y catas de vodka
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDeepThinking(!deepThinking)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono-code font-medium border transition-all ${
                deepThinking 
                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' 
                  : 'bg-stone-950 text-stone-400 border-stone-800'
              }`}
              title="Activar razonamiento químico profundo"
            >
              <Brain className="w-3 h-3" />
              <span>Thinking: {deepThinking ? 'HIGH' : 'LOW'}</span>
            </button>

            <button
              id="close-sommelier-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all"
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
                  <Bot className="w-4 h-4" />
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
                <span>Analizando parámetros organolépticos y destilación...</span>
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
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 hover:text-amber-300 transition-all shrink-0"
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
              placeholder="Pregunta sobre historia, química, cata o cócteles..."
              className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              id="send-sommelier-btn"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Preguntar</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
