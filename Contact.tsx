
import React, { useState } from 'react';
import { X, BookOpen, FileText, Scale, Brain, Hash, Save } from 'lucide-react';
import PomodoroTimer from './PomodoroTimer';

interface Props {
  onSave: (entry: any) => void;
  onCancel: () => void;
  initialDate: string;
}

const StudyEntryForm: React.FC<Props> = ({ onSave, onCancel, initialDate }) => {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    theory_done: false,
    questions_done: false,
    law_doctrine_done: false,
    active_review_done: false,
    questions_count: 0,
    pomodoro_count: 0,
    study_hours: 0,
    study_minutes: 0,
    study_seconds: 0,
    date: initialDate
  });

  const handleTimeUpdate = (h: number, m: number, s: number, p: number) => {
    setFormData(prev => ({ 
      ...prev, 
      study_hours: h, 
      study_minutes: m,
      study_seconds: s,
      pomodoro_count: p 
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-300 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Novo Registro</h3>
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Matéria</label>
          <input 
            type="text" 
            placeholder="Ex: Direito Constitucional"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Conteúdo</label>
          <textarea 
            placeholder="Descreva o conteúdo estudado..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all min-h-[100px]"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Status</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'theory_done', label: 'Teoria', icon: BookOpen },
              { id: 'questions_done', label: 'Questões', icon: FileText },
              { id: 'law_doctrine_done', label: 'Lei/Doutrina', icon: Scale },
              { id: 'active_review_done', label: 'Revisão Ativa', icon: Brain },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setFormData({...formData, [item.id]: !formData[item.id as keyof typeof formData]})}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  formData[item.id as keyof typeof formData] 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                   formData[item.id as keyof typeof formData] ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                }`}>
                   {formData[item.id as keyof typeof formData] && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
              <Hash className="w-4 h-4" /> Questões
            </label>
            <input 
              type="number" 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 outline-none"
              value={formData.questions_count}
              onChange={e => setFormData({...formData, questions_count: parseInt(e.target.value) || 0})}
            />
          </div>
          <div className="opacity-50 pointer-events-none">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
              🔥 Pomodoros
            </label>
            <input 
              type="number" 
              readOnly
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 outline-none"
              value={formData.pomodoro_count}
            />
          </div>
        </div>

        <PomodoroTimer onTimeUpdate={handleTimeUpdate} initialPomodoros={formData.pomodoro_count} />

        <button 
          onClick={() => onSave(formData)}
          className="w-full bg-[#1E293B] text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl mt-4"
        >
          <Save className="w-6 h-6" />
          Salvar Registro
        </button>
      </div>
    </div>
  );
};

export default StudyEntryForm;
