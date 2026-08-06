import React from 'react';
import { Compass, Radio, ArrowRight, Sparkles } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import { MapView } from '../components/map/MapView';
import { RouteSearch } from '../components/discovery/RouteSearch';
import { RouteCard } from '../components/discovery/RouteCard';
import { AITravelAssistant } from '../components/discovery/AITravelAssistant';
import { RouteWizardBanner } from '../components/recorder/RouteWizardBanner';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { routes, selectedRoute, setSelectedRoute } = useJourney();
  const { user } = useAuth();

  const handleSearch = (_from: string, _to: string) => {
    setActiveTab('explore');
  };

  const demoRoute = routes[0];

  return (
    <div className="space-y-8 py-4">
      
      {/* Reconstructed Hero Unit */}
      <section className="relative glass-panel p-6 sm:p-10 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 space-y-6 overflow-hidden shadow-2xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Realtime Traveller Intelligence Engine</span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl text-slate-100 tracking-tight leading-tight">
            You know where you want to go.{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent block mt-1">
              We'll show you how to actually get there.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover real traveller-recorded journeys containing exact exit gates, bus numbers, stop landmarks, photo/video guides, verified fares, and live safety mode.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                setSelectedRoute(demoRoute);
                setActiveTab('explore');
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE VERIFIED ROUTES</span>
            </button>

            <button
              onClick={() => setActiveTab('record')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-extrabold text-xs flex items-center gap-2 transition-all"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>RECORD NEW ROUTE</span>
            </button>
          </div>
        </div>

        {/* 1. Prominent From/To Search Bar */}
        <RouteSearch onSearch={handleSearch} />
      </section>

      {/* 2. AI Travel Assistant & Recommendations */}
      <section>
        <AITravelAssistant onSelectRoute={() => setActiveTab('explore')} />
      </section>

      {/* 3. Location & GPS-Based Experienced Traveller Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-xl sm:text-2xl text-slate-100">
                EXPERIENCED TRAVELLER SUGGESTIONS
              </h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                Near {user?.registered_city || 'Chennai'} - {user?.registered_area || 'Ramapuram'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified routes created by experienced travellers in your area
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 shrink-0"
          >
            <span>View All ({routes.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Traveller Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.slice(0, 3).map((route) => (
            <div
              key={route.id}
              onClick={() => {
                setSelectedRoute(route);
                setActiveTab('explore');
              }}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-sky-500/50 cursor-pointer transition-all space-y-3 bg-slate-900/60 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={route.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={route.author_name}
                    className="w-7 h-7 rounded-full border border-sky-400/40 object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block leading-none">@{route.author_name}</span>
                    <span className="text-[9px] text-slate-400 font-mono">Experienced Traveller</span>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {route.confidence_score}% Verified
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-100 group-hover:text-sky-300 transition-colors">
                  {route.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {route.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                <span className="text-slate-300 font-bold">₹{route.total_cost_inr} • {route.total_duration_minutes} mins</span>
                <span className="text-sky-400 font-semibold group-hover:underline flex items-center gap-1">
                  <span>Follow Route</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3-Step Contributor Wizard Guide */}
      <RouteWizardBanner onStartClick={() => setActiveTab('record')} />

      {/* 5. Featured Map Visual Showcase */}
      <section className="space-y-4">
        <h2 className="font-extrabold text-xl text-slate-100">
          LIVE ROUTE GEOMETRY MAP
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <RouteCard
              route={demoRoute}
              isSelected={selectedRoute?.id === demoRoute.id}
              onSelect={(r) => {
                setSelectedRoute(r);
                setActiveTab('explore');
              }}
            />
          </div>

          <div className="lg:col-span-2">
            <MapView route={demoRoute} heightClass="h-[360px] lg:h-[420px]" />
          </div>
        </div>
      </section>

    </div>
  );
};
