import React, { useState } from 'react';
import { Search, MapPin, Navigation, Radio, Compass, Bookmark, ShieldCheck, ArrowRight, Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import { PlaceResolutionService } from '../lib/placeResolution';
import type { RouteGuide } from '../types';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onStartRoute: (route: RouteGuide) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onStartRoute }) => {
  const { routes, setSelectedRoute, activeRecording, safeJourney } = useJourney();
  const { user } = useAuth();

  const [originText, setOriginText] = useState('📍 Current location');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleFindMyWay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationQuery.trim()) return;

    setIsSearching(true);
    try {
      const resolved = await PlaceResolutionService.resolvePlace(destinationQuery);
      const matched = routes.find(r => 
        r.destination_name.toLowerCase().includes(resolved.name.toLowerCase()) ||
        r.title.toLowerCase().includes(resolved.name.toLowerCase())
      ) || routes[0];

      setSelectedRoute(matched);
      onStartRoute(matched);
    } finally {
      setIsSearching(false);
    }
  };

  const getRouteHealthBadge = (score: number): { label: string; bg: string; text: string; border: string; icon: React.ReactNode } => {
    if (score >= 85) {
      return {
        label: 'WORKING WELL',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      };
    }
    if (score >= 65) {
      return {
        label: 'MAY HAVE CHANGES',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
      };
    }
    return {
      label: 'REPORTED PROBLEM',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />
    };
  };

  return (
    <div className="space-y-6 py-4 max-w-xl mx-auto">
      
      {/* 1. Personal Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-100 tracking-tight">
            {getGreeting()} 👋
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {user?.full_name ? `Welcome back, ${user.full_name.split(' ')[0]}` : 'Ready to travel today?'}
          </p>
        </div>

        {safeJourney && (
          <div className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Safe Journey Active</span>
          </div>
        )}
      </div>

      {/* 2. Hero Search Card: WHERE DO YOU WANT TO GO? */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/40 bg-slate-950/95 space-y-4 shadow-2xl">
        <h2 className="font-extrabold text-lg sm:text-xl text-slate-100 tracking-tight">
          Where do you want to go?
        </h2>

        <form onSubmit={handleFindMyWay} className="space-y-3">
          {/* FROM */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
              FROM
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
              <input
                type="text"
                value={originText}
                onChange={(e) => setOriginText(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-3 py-3 text-xs text-slate-200 font-semibold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* TO */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
              TO
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Search destination (e.g. Pondicherry, Marina Beach)..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-3 py-3 text-xs text-slate-100 font-semibold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* FIND MY WAY CTA */}
          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <Navigation className="w-5 h-5 text-white transform -rotate-45" />
            <span>{isSearching ? 'FINDING THE BEST WAY...' : 'FIND MY WAY'}</span>
          </button>
        </form>
      </div>

      {/* 3. Maximum 4 Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('explore')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300">Nearby</span>
        </button>

        <button
          onClick={() => setActiveTab('trips')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Activity className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300">My Trips</span>
        </button>

        <button
          onClick={() => setActiveTab('trips')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Bookmark className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300">Saved</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Radio className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300">Record</span>
        </button>
      </div>

      {/* 4. Active Journey Banner (Only if active) */}
      {activeRecording && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-300 block">
                JOURNEY IN PROGRESS
              </span>
              <h4 className="font-extrabold text-xs text-slate-100">
                Recording path ({Math.round(activeRecording.distance_meters / 1000 * 10) / 10} km)
              </h4>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md shrink-0 cursor-pointer"
          >
            Open Live Map
          </button>
        </div>
      )}

      {/* 5. Routes Travellers Recommend (With Route Health Badges) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-200">
            Routes travellers recommend
          </h3>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {routes.slice(0, 3).map((route) => {
            const health = getRouteHealthBadge(route.confidence_score);

            return (
              <div
                key={route.id}
                onClick={() => {
                  setSelectedRoute(route);
                  onStartRoute(route);
                }}
                className="bg-slate-950/90 hover:bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 p-4 rounded-2xl space-y-2.5 transition-all cursor-pointer shadow-lg group"
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Route Health Badge */}
                  <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold flex items-center gap-1 ${health.bg} ${health.text} ${health.border}`}>
                    {health.icon}
                    <span>{health.label}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ₹{route.total_cost_inr} • {route.total_duration_minutes}m
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
                    {route.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {route.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-slate-400 border-t border-slate-900">
                  <span className="text-[11px] font-mono">{route.successful_completions_count} travellers used this</span>
                  <span className="font-bold text-sky-400 flex items-center gap-1">
                    <span>View route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
