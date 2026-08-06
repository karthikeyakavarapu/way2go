import React from 'react';
import { Award, Compass, Sparkles } from 'lucide-react';
import { getLocalPassport } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { TripStoryGenerator } from './TripStoryGenerator';
import { PersonalSearch } from './PersonalSearch';

export const TravelPassportView: React.FC = () => {
  const passport = getLocalPassport();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Main Passport Card */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 space-y-6 shadow-2xl">
        
        {/* User Identity Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt={user?.full_name}
              className="w-14 h-14 rounded-2xl border-2 border-sky-400 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl text-slate-100">{user?.full_name}</h2>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {user?.badge_title}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Passport ID: WAY2GO-PASSPORT-2026-IND
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Reputation</span>
            <span className="text-xl font-extrabold text-sky-400 font-mono">{user?.reputation_score}%</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Travel</span>
            <span className="text-lg font-extrabold text-sky-400 font-mono">{passport.total_km_travelled} km</span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Routes Done</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">{passport.routes_completed_count}</span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cities Visited</span>
            <span className="text-lg font-extrabold text-indigo-400 font-mono">{passport.cities_visited.length}</span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Carbon Saved</span>
            <span className="text-lg font-extrabold text-emerald-300 font-mono">{passport.carbon_saved_kg} kg</span>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Verified Contribution Badges:
          </span>
          <div className="flex flex-wrap gap-2">
            {passport.badges.map((b, idx) => (
              <div key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Travel DNA Breakdown */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h4 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-400" />
            PERSONAL TRAVEL DNA PROFILE
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Nature & Coastal</span>
                <span className="font-mono text-sky-400">{passport.travel_dna.nature}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${passport.travel_dna.nature}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Budget Optimization</span>
                <span className="font-mono text-emerald-400">{passport.travel_dna.budget}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${passport.travel_dna.budget}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Food & Local Culinary</span>
                <span className="font-mono text-amber-400">{passport.travel_dna.food}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${passport.travel_dna.food}%` }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Personal Travel History Search Engine */}
      <PersonalSearch />

      {/* Shareable Trip Story & Travel Wrapped Card */}
      <TripStoryGenerator />
    </div>
  );
};
