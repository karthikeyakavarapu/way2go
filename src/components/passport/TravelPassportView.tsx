import React from 'react';
import { Award, LogOut } from 'lucide-react';
import { getLocalPassport } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { TripStoryGenerator } from './TripStoryGenerator';
import { PersonalSearch } from './PersonalSearch';

export const TravelPassportView: React.FC = () => {
  const passport = getLocalPassport();
  const { user, signOutUser } = useAuth();

  const demoBadgeDetails = [
    { title: 'Chennai Pioneer', desc: 'Verified 5+ Chennai student routes', icon: '🏆' },
    { title: 'Verified Guide', desc: 'Passed Lead Developer Karthik Quality Check', icon: '⭐' },
    { title: 'Budget Master', desc: 'Saved 500+ INR using public transit', icon: '💰' },
    { title: 'Eco Commuter', desc: 'Saved 28kg carbon using bus/train', icon: '🌱' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Main Passport Card */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 space-y-6 shadow-2xl">
        
        {/* User Identity Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt={user?.full_name || 'User'}
              className="w-14 h-14 rounded-2xl border-2 border-sky-400 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl text-slate-100">{user?.full_name || 'Traveller'}</h2>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {user?.badge_title || 'Explorer'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {user?.email || 'karthikeyakavarapu@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Reputation</span>
              <span className="text-xl font-extrabold text-sky-400 font-mono">{user?.reputation_score || 98}%</span>
            </div>

            <button
              onClick={signOutUser}
              className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Sign Out of Account"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>SIGN OUT</span>
            </button>
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
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Earned Badges</span>
            <span className="text-lg font-extrabold text-amber-400 font-mono">{passport.badges.length || 4}</span>
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-3 pt-2">
          <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>UNLOCKED TRAVELLER BADGES</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {demoBadgeDetails.map((b, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="text-2xl p-2 bg-slate-950 rounded-lg border border-slate-800">{b.icon}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-100">{b.title}</h4>
                  <p className="text-[11px] text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PersonalSearch />
      <TripStoryGenerator />

    </div>
  );
};
