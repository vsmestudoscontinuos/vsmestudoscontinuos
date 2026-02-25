
import React from 'react';
import { Clock, BookOpen, FileText, Scale, Brain, Coffee, Flame } from 'lucide-react';
import { StudyEntry } from '../types';

interface Props {
  entries: StudyEntry[];
  selectedDate: string;
  onDelete: (id: string) => void;
}

const StudyEntryList: React.FC<Props> = ({ entries, selectedDate, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
        <div className="bg-slate-50 p-4 rounded-full">
          <Coffee className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-400">Nenhum estudo hoje</h3>
          <p className="text-sm text-slate-400 font-medium">Clique em "Novo Registro" para começar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div 
          key={entry.id} 
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-start gap-4 group hover:border-blue-200 transition-all relative"
        >
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-lg leading-tight">{entry.subject}</h4>
            </div>
            
            <p className="text-sm text-slate-500 line-clamp-2">{entry.content}</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500">
                <Clock className="w-3 h-3" />
                <span>
                  {entry.study_hours > 0 && `${entry.study_hours}h `}
                  {entry.study_minutes}m
                  {entry.study_seconds !== undefined && entry.study_seconds > 0 && ` ${entry.study_seconds}s`}
                </span>
              </div>

              {entry.pomodoro_count > 0 && (
                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-600 border border-orange-100">
                  <Flame className="w-3 h-3 fill-orange-600" />
                  {entry.pomodoro_count} Pomodoros
                </div>
              )}
              
              {entry.theory_done && (
                <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  Teoria
                </div>
              )}
              {entry.questions_done && (
                <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  {entry.questions_count} Questões
                </div>
              )}
              {entry.law_doctrine_done && (
                <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  Lei/Doutrina
                </div>
              )}
              {entry.active_review_done && (
                <div className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  Revisão Ativa
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyEntryList;
