
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Target, Flame, Clock, Calendar } from 'lucide-react';
import { StudyEntry } from '../types';

interface Props {
  entries: StudyEntry[];
}

const COLORS = ['#00ADEF', '#3F92E1', '#FBA100', '#86BC00', '#6D7278', '#1E3A8A', '#94A3B8'];

const MonthlyProgressChart: React.FC<Props> = ({ entries }) => {
  // Processamento de dados para o Gráfico de Pizza (Por Matéria)
  const { chartData, totalHours, totalQuestions, currentStreak, dailyAverage } = useMemo(() => {
    const today = new Date();
    
    // Agrupar horas por matéria
    const subjectMap: Record<string, number> = {};
    let totalH = 0;
    let totalQ = 0;
    const activeDaysSet = new Set<string>();

    entries.forEach(e => {
      const entryDate = new Date(e.date + 'T00:00:00');
      // Apenas registros do mês atual
      if (entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        const h = e.study_hours + (e.study_minutes / 60) + ((e.study_seconds || 0) / 3600);
        subjectMap[e.subject] = (subjectMap[e.subject] || 0) + h;
        totalH += h;
        totalQ += e.questions_count;
        activeDaysSet.add(e.date);
      }
    });

    // Formatar para o Recharts
    const data = Object.entries(subjectMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Cálculo de Streak
    let streak = 0;
    const sortedDates = entries
      .map(e => e.date)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (sortedDates.length > 0) {
      const lastStudy = new Date(sortedDates[0] + 'T00:00:00');
      const diff = (today.getTime() - lastStudy.getTime()) / (1000 * 3600 * 24);
      
      if (diff <= 1) {
        streak = 1;
        for (let i = 0; i < sortedDates.length - 1; i++) {
          const d1 = new Date(sortedDates[i] + 'T00:00:00');
          const d2 = new Date(sortedDates[i+1] + 'T00:00:00');
          if ((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24) <= 1.1) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    const avg = activeDaysSet.size > 0 ? totalH / activeDaysSet.size : 0;

    return {
      chartData: data,
      totalHours: totalH.toFixed(1),
      totalQuestions: totalQ,
      currentStreak: streak,
      dailyAverage: avg.toFixed(1)
    };
  }, [entries]);

  // Função para renderizar as porcentagens dentro das fatias (estilo imagem)
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    if (percent < 0.05) return null; // Não mostra se for muito pequeno

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central" 
        className="font-black text-[12px]"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Performance
          </h3>
          <p className="text-slate-400 text-xs font-medium mt-1">Distribuição de carga horária</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
          <span className="text-blue-700 font-black text-lg">{totalHours}h</span>
          <span className="text-blue-400 text-[10px] font-bold uppercase ml-1">Totais</span>
        </div>
      </div>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-1">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Média/Dia</span>
          <div className="text-2xl font-black text-slate-700 flex items-baseline gap-1">
            {dailyAverage}<span className="text-sm text-slate-400 font-bold">h</span>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center space-y-1">
          <span className="text-emerald-600/60 text-[10px] font-black uppercase tracking-wider">Questões</span>
          <div className="text-2xl font-black text-emerald-600">{totalQuestions}</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col items-center justify-center text-center space-y-1">
          <span className="text-orange-500/60 text-[10px] font-black uppercase tracking-wider">Sequência</span>
          <div className="text-2xl font-black text-orange-500 flex items-baseline gap-1">
            {currentStreak}<span className="text-sm font-bold opacity-60">dias</span>
          </div>
        </div>
      </div>

      {/* Gráfico de Pizza Estilizado */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pl-2">
          <TrendingUp className="w-3 h-3" />
          Foco por Matéria
        </div>
        
        <div style={{ width: '100%', height: 300, minWidth: 0 }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                  formatter={(value: number) => [`${value.toFixed(1)} horas`, 'Tempo']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-50 rounded-3xl">
              <Clock className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm font-bold">Sem dados no mês atual</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyProgressChart;
