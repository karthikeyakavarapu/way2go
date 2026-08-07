import React, { useState } from 'react';
import { Search, MapPin, Navigation, Compass, Utensils, Building, Video, Users, ArrowRight, Play, Footprints, Heart, CheckCircle2, Bus } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import { RouteComparisonService } from '../lib/routeComparison';
import { AIService } from '../lib/ai';
import { RouteResultView } from '../components/discovery/RouteResultView';
import { SimpleRouteBuilder } from '../components/route/SimpleRouteBuilder';
import { TravelReelsService } from '../lib/reels';
import type { RouteGuide, RouteComparisonResult, TravelReel } from '../types';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onStartRoute: (route: RouteGuide) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onStartRoute }) => {
  const { routes, setSelectedRoute } = useJourney();
  const { user } = useAuth();

  const [originText, setOriginText] = useState('SRM Ramapuram Campus');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeComparison, setActiveComparison] = useState<RouteComparisonResult | null>(null);
  const [showSimpleRouteBuilder, setShowSimpleRouteBuilder] = useState(false);

  const nearbyReels: TravelReel[] = TravelReelsService.getReels('Chennai');

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
      // Generate distance-aware, multimodal transit plan powered by Gemini AI
      const aiResult = await AIService.generateDirectionalRoute(destinationQuery, routes);
      const mapRouteBaseline = aiResult.matchedRoute!;

      // Find exact or partial matching route in existing database for traveller experience
      const matchedTravellerRoute = routes.find(r => 
        r.destination_name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
        destinationQuery.toLowerCase().includes(r.destination_name.toLowerCase())
      );

      // Calculate Deterministic Route Comparison (Will return NO_TRAVELLER_DATA if no crowdsourced route exists)
      const comp = RouteComparisonService.compareRoutes(mapRouteBaseline, matchedTravellerRoute ? [matchedTravellerRoute] : []);
      setActiveComparison(comp);
      setSelectedRoute(mapRouteBaseline);
    } catch (err) {
      console.warn('Route search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // If user searched, show post-search Route Result View
  if (activeComparison) {
    return (
      <RouteResultView
        comparison={activeComparison}
        onBack={() => setActiveComparison(null)}
        onStartJourney={onStartRoute}
        onRecordRoute={() => {
          setActiveComparison(null);
          setShowSimpleRouteBuilder(true);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 py-4 max-w-xl mx-auto">
      
      {/* 1. Personal Greeting Header & + ADD ROUTE CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-100 tracking-tight">
            {getGreeting()} 👋
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {user?.full_name ? `Welcome, ${user.full_name.split(' ')[0]}` : 'Ready to travel today?'}
          </p>
        </div>

        <button
          onClick={() => setShowSimpleRouteBuilder(true)}
          className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>+ ADD ROUTE</span>
        </button>
      </div>

      {/* 2. Primary Mobile Hero Card: WHERE DO YOU WANT TO GO? */}
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
            <span>{isSearching ? 'FINDING THE REAL WAY...' : 'FIND MY WAY'}</span>
          </button>
        </form>
      </div>

      {/* 3. Secondary Options Bar: Explore Nearby (5 Icons) */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">
          EXPLORE NEARBY
        </h3>

        <div className="grid grid-cols-5 gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('explore')}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 font-bold text-slate-300 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span className="text-[10px]">Nearby</span>
          </button>

          <button
            onClick={() => setActiveTab('eat-stay')}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 font-bold text-slate-300 cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span className="text-[10px]">Eat</span>
          </button>

          <button
            onClick={() => setActiveTab('eat-stay')}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 font-bold text-slate-300 cursor-pointer"
          >
            <Building className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px]">Stay</span>
          </button>

          <button
            onClick={() => setActiveTab('eat-stay')}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 font-bold text-slate-300 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px]">Visit</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 font-bold text-purple-400 cursor-pointer"
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span className="text-[10px]">Reels</span>
          </button>
        </div>
      </div>

      {/* 4. Compact Nearby Area Reels & Followed Routes Horizontal Carousel */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <Video className="w-4 h-4 text-purple-400" />
            <span>NEARBY AREA REELS & FOLLOWED ROUTES</span>
          </h3>

          <button
            onClick={() => setActiveTab('reels')}
            className="text-[11px] font-extrabold text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            SEE ALL REELS ➔
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {nearbyReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveTab('reels')}
              className="w-40 sm:w-44 h-56 rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-950 shrink-0 cursor-pointer group shadow-xl"
            >
              <img
                src={reel.thumbnail_url}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded border border-purple-400/40">
                    {reel.category}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-extrabold text-white leading-tight line-clamp-2">
                    {reel.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                    <span>📍 {reel.location_name.split(',')[0]}</span>
                    <span className="flex items-center gap-0.5">
                      <Heart className="w-3 h-3 text-rose-500 fill-current" />
                      {reel.likes_count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Previously Travelled Routes & Real Experiences */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PREVIOUSLY TRAVELLED ROUTES & EXPERIENCES</span>
          </h3>

          <button
            onClick={() => setActiveTab('trips')}
            className="text-[11px] font-extrabold text-sky-400 hover:text-sky-300 cursor-pointer"
          >
            VIEW ALL ➔
          </button>
        </div>

        <div className="space-y-3">
          {routes.slice(0, 3).map((r) => (
            <div
              key={r.id}
              onClick={() => onStartRoute(r)}
              className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-950/90 space-y-2 cursor-pointer hover:border-sky-500/50 transition-all shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  🟢 VERIFIED ({r.successful_completions_count || 3} TRAVELLERS USED)
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {r.total_duration_minutes}m • ₹{r.total_cost_inr}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
                  {r.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1">{r.tagline}</p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-900">
                <span className="flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-sky-400" />
                  Exit Gate & Walking landmarks included
                </span>
                <span className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5 text-amber-400" />
                  Direct Bus/Metro Legs
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Group Travel Option Card */}
      <div 
        onClick={() => setActiveTab('gov-hub')}
        className="glass-panel p-4 rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 flex items-center justify-between gap-3 shadow-xl cursor-pointer hover:border-indigo-400 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase block">
              GOVT & GROUP BUS BOOKING
            </span>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-100">
              Travelling with a group?
            </h4>
            <p className="text-[11px] text-slate-400">
              Contact Trip Head (+91 98401 00000) or book 20-35 seat buses.
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-indigo-500 text-white font-extrabold text-xs shadow-md shrink-0 flex items-center gap-1">
          <span>GOVT HUB</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 7. Simple Route Builder Modal */}
      {showSimpleRouteBuilder && (
        <SimpleRouteBuilder
          onClose={() => setShowSimpleRouteBuilder(false)}
          onSuccess={() => {
            setShowSimpleRouteBuilder(false);
            setActiveTab('explore');
          }}
        />
      )}

    </div>
  );
};
