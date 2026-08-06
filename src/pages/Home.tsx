import React, { useState } from 'react';
import { ArrowRight, Sparkles, Bot, MapPin } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import { MapView } from '../components/map/MapView';
import { RouteSearch } from '../components/discovery/RouteSearch';
import { AITravelAssistant } from '../components/discovery/AITravelAssistant';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { routes, selectedRoute, setSelectedRoute } = useJourney();
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'search' | 'ai'>('search');

  const handleSearch = (_from: string, _to: string) => {
    setActiveTab('explore');
  };

  const demoRoute = selectedRoute || routes[0];

  return (
    <div className="space-y-6 py-3 max-w-7xl mx-auto">
      
      {/* 1. Ultra-Compact Top Navigation Bar */}
      <section className="glass-panel p-4 sm:p-6 rounded-3xl border border-sky-500/30 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h1 className="font-extrabold text-lg sm:text-2xl text-slate-100">
              WHERE ARE YOU GOING TODAY?
            </h1>
          </div>

          {/* Toggle between Search & AI Assistant */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveView('search')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all ${
                activeView === 'search' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setActiveView('ai')}
              className={`px-3 py-1.5 rounded-lg font-extrabold transition-all flex items-center gap-1 ${
                activeView === 'ai' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Guide</span>
            </button>
          </div>
        </div>

        {activeView === 'search' ? (
          <RouteSearch onSearch={handleSearch} />
        ) : (
          <AITravelAssistant onSelectRoute={() => setActiveTab('explore')} />
        )}
      </section>

      {/* 2. Compact Horizontal Route Showcase (Zero Vertical Bloat) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-base text-slate-100">
              VERIFIED TRAVELLER ROUTES
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              {user?.registered_city || 'Chennai'}
            </span>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Snap Scroll Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {routes.map((route) => {
            const isSelected = demoRoute.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`snap-start shrink-0 w-72 sm:w-80 p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected 
                    ? 'glass-panel border-sky-500 bg-slate-900/90 shadow-xl ring-1 ring-sky-500/30' 
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    {route.confidence_score}% Verified
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ₹{route.total_cost_inr} • {route.total_duration_minutes}m
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-100 truncate">
                  {route.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {route.tagline}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">by @{route.author_name}</span>
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-0.5">
                    <span>Select Map</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Compact Map Preview Container */}
      <section className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" />
            Selected Route Polyline: <strong className="text-sky-300">{demoRoute.title}</strong>
          </span>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-extrabold text-xs shadow-md"
          >
            Open Step Guide
          </button>
        </div>
        <MapView route={demoRoute} heightClass="h-[280px] sm:h-[340px]" />
      </section>

    </div>
  );
};
