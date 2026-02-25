
import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { FlashcardDeck, Flashcard } from '../types';

interface Props {
  deck: FlashcardDeck;
  onClose: () => void;
  onComplete: (deckId: string, updatedCards: Flashcard[]) => void;
}

const FlashcardReview: React.FC<Props> = ({ deck, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [sessionResults, setSessionResults] = useState<Flashcard[]>(deck.cards);

  const currentCard = sessionResults[currentIndex];

  const handleFlip = () => setShowBack(!showBack);

  const handleNext = () => {
    if (currentIndex < sessionResults.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    } else {
      onComplete(deck.id, sessionResults);
    }
  };

  const handleDifficulty = (level: number) => {
    const updatedCards = [...sessionResults];
    updatedCards[currentIndex] = {
      ...updatedCards[currentIndex],
      level: level,
      last_reviewed: new Date().toISOString()
    };
    setSessionResults(updatedCards);
    handleNext();
  };

  const progress = ((currentIndex + 1) / sessionResults.length) * 100;

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">{deck.content}</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{deck.subject}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div 
            onClick={handleFlip}
            className={`relative h-64 cursor-pointer perspective-1000 transition-all duration-500 preserve-3d ${showBack ? 'rotate-y-180' : ''}`}
          >
            {/* Front */}
            <div className="absolute inset-0 bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center backface-hidden">
              <HelpCircle className="w-8 h-8 text-indigo-200 mb-4" />
              <p className="text-xl font-bold text-slate-700">{currentCard.front}</p>
              <p className="absolute bottom-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Clique para ver a resposta</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-indigo-600 border-2 border-indigo-500 rounded-[32px] p-8 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
              <CheckCircle2 className="w-8 h-8 text-indigo-300 mb-4" />
              <p className="text-xl font-bold text-white">{currentCard.back}</p>
              <p className="absolute bottom-6 text-[10px] font-black text-indigo-300 uppercase tracking-widest">Resposta</p>
            </div>
          </div>

          {showBack ? (
            <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4">
              <button 
                onClick={() => handleDifficulty(1)}
                className="bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all"
              >
                Difícil
              </button>
              <button 
                onClick={() => handleDifficulty(3)}
                className="bg-orange-50 text-orange-600 py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 hover:text-white transition-all"
              >
                Médio
              </button>
              <button 
                onClick={() => handleDifficulty(5)}
                className="bg-green-50 text-green-600 py-4 rounded-2xl font-bold text-sm hover:bg-green-600 hover:text-white transition-all"
              >
                Fácil
              </button>
            </div>
          ) : (
            <button 
              onClick={handleFlip}
              className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
            >
              Ver Resposta
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Card {currentIndex + 1} de {deck.cards.length}
        </div>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardReview;
