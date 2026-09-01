import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/vodkaData';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const QuizClassroom: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: index }));

    if (index === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= 7) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti unsupported
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setUserAnswers({});
  };

  if (isFinished) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
        <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-500/40 text-center space-y-6 shadow-2xl">
          
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono-code text-amber-400 font-bold uppercase tracking-wider">
              Evaluación Finalizada
            </span>
            <h1 className="text-3xl font-serif-title font-bold text-stone-100">
              {percentage >= 80 ? '¡Excelente! Nivel Master Distiller' : percentage >= 60 ? '¡Buen trabajo! Nivel Sommelier Jr.' : '¡Buen intento! Repasa las lecturas del blog'}
            </h1>
            <p className="text-stone-300 text-sm">
              Has acertado <strong className="text-amber-400">{score}</strong> de <strong className="text-stone-100">{QUIZ_QUESTIONS.length}</strong> preguntas ({percentage}% de precisión).
            </p>
          </div>

          {/* Results breakdown list */}
          <div className="space-y-3 text-left max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isCorrect = userAnswers[q.id] === q.correctIndex;
              return (
                <div key={q.id} className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-stone-200">
                      {idx + 1}. {q.question}
                    </span>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correcto
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-bold shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrecto
                      </span>
                    )}
                  </div>
                  <p className="text-stone-400 italic">
                    💡 {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Restart button */}
          <div className="pt-4 border-t border-stone-800">
            <button
              id="restart-quiz-btn"
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/50 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Cuestionario de Clase</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Quiz Interactivo de Repaso Académico</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-100">
          Comprueba tus Conocimientos sobre el Vodka
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Preguntas sobre mitos históricos, proceso de rectificación continua, materias primas y cata sensorial.
        </p>
      </div>

      {/* Quiz Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 shadow-2xl">
        
        {/* Progress header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <span className="text-xs font-mono-code text-amber-400 font-bold">
            Pregunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-950 border border-stone-800 text-stone-300">
            {currentQ.category}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-serif-title font-bold text-stone-100 leading-snug">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, i) => {
            let optionStyle = 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-600 hover:bg-stone-900';

            if (isAnswered) {
              if (i === currentQ.correctIndex) {
                optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-400/50';
              } else if (selectedOption === i) {
                optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
              } else {
                optionStyle = 'bg-stone-950/30 border-stone-800/40 text-stone-600';
              }
            }

            return (
              <button
                key={i}
                id={`quiz-option-${i}`}
                onClick={() => handleSelectOption(i)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && i === currentQ.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && selectedOption === i && i !== currentQ.correctIndex && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanation after answer */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-stone-300 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              💡 Explicación Académica:
            </span>
            <p className="leading-relaxed text-stone-200">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question Button */}
        {isAnswered && (
          <div className="pt-3 border-t border-stone-800 flex justify-end">
            <button
              id="quiz-next-btn"
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Ver Calificación Final' : 'Siguiente Pregunta'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
