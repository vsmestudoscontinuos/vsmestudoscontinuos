
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Settings2, Flame, Coffee, Brain, Timer } from 'lucide-react';

interface Props {
  onTimeUpdate: (hours: number, minutes: number, seconds: number, pomodoros: number) => void;
  initialPomodoros?: number;
}

const START_SOUND = 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg';

const PomodoroTimer: React.FC<Props> = ({ onTimeUpdate, initialPomodoros = 0 }) => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(initialPomodoros);
  const [showSettings, setShowSettings] = useState(false);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  
  const startAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startAudio = new Audio(START_SOUND);
    startAudio.crossOrigin = "anonymous";
    startAudioRef.current = startAudio;

    return () => {
      startAudioRef.current?.pause();
    };
  }, []);

  const playStartSound = () => {
    if (startAudioRef.current) {
      startAudioRef.current.currentTime = 0;
      startAudioRef.current.play().catch(() => {});
    }
  };

  // Lógica do Cronômetro
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (mode === 'work') setTotalSecondsElapsed(s => s + 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const hrs = Math.floor(totalSecondsElapsed / 3600);
    const mins = Math.floor((totalSecondsElapsed % 3600) / 60);
    const secs = totalSecondsElapsed % 60;
    onTimeUpdate(hrs, mins, secs, pomodorosCompleted);
  }, [totalSecondsElapsed, pomodorosCompleted]);

  const handleTimerEnd = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      setPomodorosCompleted(p => p + 1);
      setMode('break');
      setTimeLeft(breakTime * 60);
    } else {
      setMode('work');
      setTimeLeft(workTime * 60);
    }
  };

  const handleStartToggle = () => {
    if (!isActive) {
      playStartSound();
    }
    setIsActive(!isActive);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#EBF5FF] rounded-3xl p-6 border border-blue-100 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-[#1E3A8A]">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="font-bold text-lg">Timer de Foco</span>
        </div>
        <div className="bg-white/50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="text-sm font-black text-slate-700">{pomodorosCompleted} Concluídos</span>
        </div>
      </div>

      {/* Modos */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-white/40 rounded-2xl border border-blue-50">
        <button 
          onClick={() => { setIsActive(false); setMode('work'); setTimeLeft(workTime * 60); }}
          className={`flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'work' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
        >
          <Brain className="w-4 h-4" /> Foco
        </button>
        <button 
          onClick={() => { setIsActive(false); setMode('break'); setTimeLeft(breakTime * 60); }}
          className={`flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'break' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
        >
          <Coffee className="w-4 h-4" /> Pausa
        </button>
      </div>

      {/* Display do Timer */}
      <div className="bg-white rounded-3xl py-10 flex flex-col items-center justify-center shadow-sm border border-blue-50 relative overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 w-full bg-blue-50/50 transition-all duration-1000" 
          style={{ height: `${(1 - timeLeft / (mode === 'work' ? workTime * 60 : breakTime * 60)) * 100}%` }}
        />
        <div className="relative z-10 text-7xl font-black text-slate-800 font-mono tracking-tighter">
          {formatTime(timeLeft)}
        </div>
        <div className="relative z-10 mt-2 bg-blue-100/50 px-3 py-1 rounded-lg flex items-center gap-2 text-blue-700">
          <Timer className="w-3 h-3" />
          <span className="text-xs font-bold">
            Total: {Math.floor(totalSecondsElapsed / 60)}m {totalSecondsElapsed % 60}s
          </span>
        </div>
      </div>

      {/* Controles Principais */}
      <div className="flex gap-2">
        <button 
          onClick={handleStartToggle}
          className={`flex-[3] py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg text-white ${
            isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isActive ? 'Pausar' : 'Iniciar Foco'}
        </button>
        
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`flex-1 p-4 rounded-2xl border font-bold transition-all ${showSettings ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-200 text-slate-400'}`}
        >
          <Settings2 className="w-6 h-6 mx-auto" />
        </button>

        <button 
          onClick={() => { setIsActive(false); setTimeLeft(mode === 'work' ? workTime * 60 : breakTime * 60); }}
          className="flex-1 p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all"
        >
          <RotateCcw className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Configurações Rápidas */}
      {showSettings && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Foco (min)</label>
            <input 
              type="number" value={workTime} 
              onChange={(e) => setWorkTime(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold outline-none" 
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Pausa (min)</label>
            <input 
              type="number" value={breakTime} 
              onChange={(e) => setBreakTime(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold outline-none" 
            />
          </div>
          <button 
            onClick={() => { setTimeLeft((mode === 'work' ? workTime : breakTime) * 60); setShowSettings(false); }}
            className="col-span-2 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold"
          >
            Aplicar Novos Tempos
          </button>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
