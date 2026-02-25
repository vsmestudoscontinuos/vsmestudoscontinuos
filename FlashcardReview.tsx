
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StudyEntry } from '../types';

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  entries: StudyEntry[];
}

const CalendarGrid: React.FC<Props> = ({ selectedDate, onSelectDate, entries }) => {
  // Inicializa visualizando o mês da data selecionada
  const [viewDate, setViewDate] = React.useState(() => {
    const d = new Date(selectedDate);
    // Corrige fuso horário básico adicionando horas para evitar voltar um dia
    return new Date(d.getFullYear(), d.getMonth(), 1); 
  });
  
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isSelected = (day: number) => {
    // Cria data localmente para comparação correta
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const compareDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return compareDate === selectedDate;
  };

  const hasEntry = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dStr = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    return entries.some(e => e.date === dStr);
  };

  // Formata Mês e Ano (ex: Janeiro 2024)
  const monthLabel = viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      {/* Header com Navegação */}
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-lg font-bold text-slate-800 capitalize pl-2">{monthLabel}</h3>
         <div className="flex gap-1">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Cabeçalho dias da semana alinhado ao Grid */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
          <span key={d} className="text-[10px] font-black text-slate-300 uppercase tracking-wider py-2">
            {d}
          </span>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center h-10 w-full">
            {day && (
              <button
                onClick={() => {
                  const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                  // Ajuste de fuso horário simples para salvar a string correta
                  const dateStr = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                  onSelectDate(dateStr);
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all relative ${
                  isSelected(day) 
                    ? 'bg-[#1E293B] text-white shadow-lg shadow-slate-200 scale-105 z-10' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {day}
                {hasEntry(day) && !isSelected(day) && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-500" />
                )}
                {hasEntry(day) && isSelected(day) && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-300" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
