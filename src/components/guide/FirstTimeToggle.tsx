import React from 'react';
import { HelpCircle, Check } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const FirstTimeToggle: React.FC = () => {
  const { firstTimeMode, setFirstTimeMode } = useJourney();

  return (
    <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 via-slate-900 to-slate-900 flex items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
          <HelpCircle className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
            NEW TO THIS ROUTE?
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
              Beginner Mode
            </span>
          </h4>
          <p className="text-xs text-slate-400">
            Converts technical directions into plain-English visual step-by-step instructions.
          </p>
        </div>
      </div>

      <button
        onClick={() => setFirstTimeMode(!firstTimeMode)}
        className={`relative px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
          firstTimeMode
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
        }`}
      >
        {firstTimeMode && <Check className="w-4 h-4" />}
        <span>{firstTimeMode ? 'ON' : 'OFF'}</span>
      </button>
    </div>
  );
};
