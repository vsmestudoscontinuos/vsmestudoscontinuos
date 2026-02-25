
import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus, Trash2, BrainCircuit, Info, Lightbulb, HelpCircle } from 'lucide-react';
import { ActiveStudy } from '../types';

interface Props {
  studies: ActiveStudy[];
  onAddStudy: (study: ActiveStudy) => void;
  onToggleStudy: (id: string) => void;
  onDeleteStudy: (id: string) => void;
  selectedDate: string;
}

const ActiveStudyTracker: React.FC<Props> = ({ studies, onAddStudy, onToggleStudy, onDeleteStudy, selectedDate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [newStudy, setNewStudy] = useState({
    subject: '',
    topic: '',
    method: 'recall' as ActiveStudy['method'],
    notes: ''
  });

  const filteredStudies = studies.filter(s => s.date === selectedDate);
  const completedCount = filteredStudies.filter(s => s.completed).length;
  const totalCount = filteredStudies.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAdd = () => {
    if (!newStudy.subject || !newStudy.topic) {
      alert("Preencha a matéria e o tópico.");
      return;
    }

    const study: ActiveStudy = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      subject: newStudy.subject,
      topic: newStudy.topic,
      method: newStudy.method,
      notes: newStudy.notes,
      completed: false
    };

    onAddStudy(study);
    setIsAdding(false);
    setNewStudy({ subject: '', topic: '', method: 'recall', notes: '' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Progress */}
      <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Estudo Ativo</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{formatDate(selectedDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className={`p-2 rounded-xl transition-all ${showGuide ? 'bg-amber-50 text-amber-600' : 'text-slate-300 hover:bg-slate-50'}`}
              title="Guia de Métodos"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-100"
            >
              <Plus className="w-4 h-4" />
              Planejar
            </button>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Progresso do Dia</span>
              <span className="text-emerald-600">{completedCount} / {totalCount} concluídos</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Guide */}
      {showGuide && (
        <div className="bg-amber-50 border border-amber-100 rounded-[32px] p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 text-amber-800 font-bold">
            <Info className="w-5 h-5" />
            <h3>Guia de Métodos Ativos</h3>
          </div>
          <div className="grid gap-3">
            <div className="bg-white/50 p-3 rounded-2xl">
              <p className="text-xs font-bold text-amber-900 mb-1">Recuperação Ativa (Recall)</p>
              <p className="text-[11px] text-amber-800 leading-relaxed">Feche o livro e tente escrever ou falar tudo o que lembra sobre o tópico sem consultar nada.</p>
            </div>
            <div className="bg-white/50 p-3 rounded-2xl">
              <p className="text-xs font-bold text-amber-900 mb-1">Técnica de Feynman (Explicação)</p>
              <p className="text-[11px] text-amber-800 leading-relaxed">Explique o conteúdo como se estivesse ensinando para uma criança. Se travar, volte e estude essa parte.</p>
            </div>
            <div className="bg-white/50 p-3 rounded-2xl">
              <p className="text-xs font-bold text-amber-900 mb-1">Mapa Mental</p>
              <p className="text-[11px] text-amber-800 leading-relaxed">Crie conexões visuais entre os conceitos principais. Ótimo para visão sistêmica e revisão rápida.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white border border-emerald-100 rounded-[32px] p-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Matéria</label>
              <input
                type="text"
                placeholder="Ex: Direito Civil"
                className="w-full bg-slate-50 border-0 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emerald-100 font-medium"
                value={newStudy.subject}
                onChange={e => setNewStudy({ ...newStudy, subject: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tópico</label>
              <input
                type="text"
                placeholder="Ex: Artigo 5º da CF"
                className="w-full bg-slate-50 border-0 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emerald-100 font-medium"
                value={newStudy.topic}
                onChange={e => setNewStudy({ ...newStudy, topic: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Método</label>
              <select
                className="w-full bg-slate-50 border-0 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emerald-100 text-slate-600 font-medium"
                value={newStudy.method}
                onChange={e => setNewStudy({ ...newStudy, method: e.target.value as any })}
              >
                <option value="recall">Recuperação Ativa (Recall)</option>
                <option value="explanation">Explicação (Feynman)</option>
                <option value="mindmap">Mapa Mental</option>
                <option value="other">Outro Método</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações</label>
              <input
                type="text"
                placeholder="Ex: Focar em prazos"
                className="w-full bg-slate-50 border-0 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emerald-100 font-medium"
                value={newStudy.notes}
                onChange={e => setNewStudy({ ...newStudy, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAdd}
              className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-50"
            >
              Adicionar Objetivo
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-4 text-slate-400 font-bold hover:text-slate-600 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {filteredStudies.length === 0 && !isAdding && (
          <div className="text-center py-16 bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Nenhum estudo ativo planejado</p>
            <p className="text-slate-300 text-sm mt-1">Planeje seus objetivos para {formatDate(selectedDate)}</p>
          </div>
        )}
        {filteredStudies.map(study => (
          <div 
            key={study.id} 
            className={`bg-white border ${study.completed ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100'} rounded-[32px] p-5 shadow-sm transition-all flex items-center justify-between group hover:shadow-md`}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onToggleStudy(study.id)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${study.completed ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 border border-slate-100 text-slate-300 hover:border-emerald-500 hover:text-emerald-500'}`}
              >
                {study.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
              <div>
                <h3 className={`font-bold transition-all ${study.completed ? 'text-emerald-900/50 line-through' : 'text-slate-800'}`}>
                  {study.topic}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{study.subject}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${study.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {study.method === 'recall' ? 'Recall' : study.method === 'explanation' ? 'Feynman' : study.method === 'mindmap' ? 'Mapa Mental' : 'Outro'}
                  </span>
                  {study.notes && (
                    <>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-[10px] text-slate-400 italic">{study.notes}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteStudy(study.id)}
              className="p-2 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveStudyTracker;
