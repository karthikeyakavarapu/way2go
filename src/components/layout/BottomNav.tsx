import React from 'react';
import { Home, Compass, Radio, ShieldCheck, User, Building2 } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { activeRecording, safeJourney } = useJourney();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800/80 px-2 py-2">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            activeTab === 'home' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            activeTab === 'explore' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Discover</span>
        </button>

        <button
          onClick={() => setActiveTab('record')}
          className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'record' 
              ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30' 
              : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          {activeRecording && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          )}
          <Radio className={`w-5 h-5 ${activeRecording ? 'text-emerald-400 animate-pulse' : ''}`} />
          <span className="text-[10px] font-semibold">Record</span>
        </button>

        <button
          onClick={() => setActiveTab('safe')}
          className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            activeTab === 'safe' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'
          }`}
        >
          {safeJourney && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
          )}
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-medium">Safe</span>
        </button>

        <button
          onClick={() => setActiveTab('gov-portal')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            activeTab === 'gov-portal' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px] font-medium">Gov</span>
        </button>

        <button
          onClick={() => setActiveTab('passport')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            activeTab === 'passport' ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Passport</span>
        </button>
      </div>
    </div>
  );
};
