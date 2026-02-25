
import React, { useState } from 'react';
import { Plus, Trash2, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { FlashcardDeck, Flashcard } from '../types';

interface Props {
  decks: FlashcardDeck[];
  onSaveDeck: (deck: FlashcardDeck) => void;
  onDeleteDeck: (id: string) => void;
  onReviewDeck: (deck: FlashcardDeck) => void;
}

const FlashcardManager: React.FC<Props> = ({ decks, onSaveDeck, onDeleteDeck, onReviewDeck }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newDeck, setNewDeck] = useState({ subject: '', content: '' });
  const [tempCards, setTempCards] = useState<{ front: string; back: string }[]>([]);

  const handleAddCard = () => {
    setTempCards([...tempCards, { front: '', back: '' }]);
  };

  const handleSave = () => {
    if (!newDeck.subject || !newDeck.content || tempCards.length === 0) {
      alert("Preencha todos os campos e adicione pelo menos um card.");
      return;
    }

    const deck: FlashcardDeck = {
      id: Math.random().toString(36).substr(2, 9),
      subject: newDeck.subject,
      content: newDeck.content,
      created_at: new Date().toISOString(),
      cards: tempCards.map(c => ({
        id: Math.random().toString(36).substr(2, 9),
        front: c.front,
        back: c.back,
        level: 0
      }))
    };

    onSaveDeck(deck);
    setIsAdding(false);
    setNewDeck({ subject: '', content: '' });
    setTempCards([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1E3A8A] flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Meus Flashcards
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-200"
        >
          <Plus className="w-4 h-4" />
          Novo Deck
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-indigo-100 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Matéria (ex: Direito)"
              className="bg-slate-50 border-0 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100"
              value={newDeck.subject}
              onChange={e => setNewDeck({ ...newDeck, subject: e.target.value })}
            />
            <input
              type="text"
              placeholder="Conteúdo (ex: Artigo 5º)"
              className="bg-slate-50 border-0 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100"
              value={newDeck.content}
              onChange={e => setNewDeck({ ...newDeck, content: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Cards</h4>
            {tempCards.map((card, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <textarea
                  placeholder="Frente (Pergunta)"
                  className="bg-transparent border-0 outline-none text-sm resize-none"
                  value={card.front}
                  onChange={e => {
                    const newCards = [...tempCards];
                    newCards[idx].front = e.target.value;
                    setTempCards(newCards);
                  }}
                />
                <textarea
                  placeholder="Verso (Resposta)"
                  className="bg-transparent border-0 outline-none text-sm resize-none"
                  value={card.back}
                  onChange={e => {
                    const newCards = [...tempCards];
                    newCards[idx].back = e.target.value;
                    setTempCards(newCards);
                  }}
                />
              </div>
            ))}
            <button
              onClick={handleAddCard}
              className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all"
            >
              + Adicionar Card
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Salvar Deck
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {decks.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <Layers className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">Você ainda não tem decks de flashcards.</p>
          </div>
        )}
        {decks.map(deck => (
          <div key={deck.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{deck.content}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{deck.subject} • {deck.cards.length} cards</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onReviewDeck(deck)}
                className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
              >
                Estudar
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteDeck(deck.id)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardManager;
