import React from 'react';
import { Home, Compass, Briefcase, User, Navigation } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartJourneyClick?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, onStartJourneyClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800/90 px-3 py-2 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-md mx-auto flex items-center justify-between relative">
        
        {/* 1. HOME */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* 2. EXPLORE */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'explore' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        {/* Central Floating "GO / START JOURNEY" Action Button */}
        <div className="relative -top-5 shrink-0">
          <button
            onClick={() => {
              if (onStartJourneyClick) {
                onStartJourneyClick();
              } else {
                setActiveTab('explore');
              }
            }}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-0.5 shadow-xl shadow-sky-500/40 flex items-center justify-center transform active:scale-95 transition-transform cursor-pointer group"
            title="Start Journey"
          >
            <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <Navigation className="w-6 h-6 text-sky-400 transform -rotate-45" />
            </div>
          </button>
        </div>

        {/* 3. TRIPS */}
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'trips' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px]">Trips</span>
        </button>

        {/* 4. PROFILE */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </div>
  );
};
