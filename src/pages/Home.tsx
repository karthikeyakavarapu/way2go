import React, { useState } from 'react';
import { Compass, Radio, ArrowRight, Bot, MapPin, Bus, ShieldCheck, Building2 } from 'lucide-react';
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

  const currentRoute = selectedRoute || routes[0];

  return (
    <div className="space-y-5 py-3 max-w-5xl mx-auto">
      
      {/* 1. Chalo-Style Hero Header Card */}
      <section className="glass-panel p-4 sm:p-6 rounded-3xl border border-sky-500/30 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-xl text-slate-100">
                WHERE TO?
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Real-time bus numbers, metro lines & exit gates in {user?.registered_city || 'Chennai'}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveView('search')}
              className={`px-3 py-1 rounded-lg font-extrabold transition-all ${
                activeView === 'search' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Route Search
            </button>
            <button
              onClick={() => setActiveView('ai')}
              className={`px-3 py-1 rounded-lg font-extrabold transition-all flex items-center gap-1 ${
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

      {/* 2. Quick Action Grid (4 Clean 1-Tap Tiles) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveTab('explore')}
          className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-200">Find Routes</h3>
            <p className="text-[10px] text-slate-400">Step-by-step</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('record')}
          className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-200">Record Trip</h3>
            <p className="text-[10px] text-slate-400">Share your path</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('safe')}
          className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-200">Safe Mode</h3>
            <p className="text-[10px] text-slate-400">Live contact SOS</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('stays')}
          className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-200">Budget Stays</h3>
            <p className="text-[10px] text-slate-400">Student hostels</p>
          </div>
        </button>
      </section>

      {/* 3. Verified Transit Routes Showcase (Horizontal Swipe Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-100">
              POPULAR TRANSIT ROUTES
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              VERIFIED
            </span>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Swipe Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {routes.map((route) => {
            const isSelected = currentRoute.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`snap-start shrink-0 w-72 p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected 
                    ? 'glass-panel border-sky-500 bg-slate-900/90 shadow-xl ring-1 ring-sky-500/30' 
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    {route.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ₹{route.total_cost_inr} • {route.total_duration_minutes} mins
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-100 truncate">
                  {route.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-1">
                  {route.tagline}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">{route.successful_completions_count} travellers followed</span>
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

      {/* 4. Live Map Polyline Card */}
      <section className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-200 flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">{currentRoute.title}</span>
          </span>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shrink-0 cursor-pointer"
          >
            Start Route Guide
          </button>
        </div>
        <MapView route={currentRoute} heightClass="h-[260px] sm:h-[320px]" />
      </section>

    </div>
  );
};
