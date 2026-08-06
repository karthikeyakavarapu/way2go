import React, { useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import type { RouteGuide } from '../types';

interface TripsPageProps {
  onStartRoute: (route: RouteGuide) => void;
  setActiveTab: (tab: string) => void;
}

export const TripsPage: React.FC<TripsPageProps> = ({ onStartRoute, setActiveTab }) => {
  const { routes, activeRecording } = useJourney();
  const [activeSubTab, setActiveSubTab] = useState<'recent' | 'saved'>('recent');

  return (
    <div className="space-y-5 py-4 max-w-xl mx-auto">
      
      {/* 1. Header */}
      <div>
        <h1 className="font-extrabold text-2xl text-slate-100 tracking-tight">
          My Trips & Saved Routes
        </h1>
        <p className="text-xs text-slate-400">
          Access past journeys, recorded paths, and saved transit guides.
        </p>
      </div>

      {/* 2. Active Recording Banner (If active) */}
      {activeRecording && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase block">
                CURRENT ACTIVE JOURNEY
              </span>
              <h4 className="font-extrabold text-xs text-slate-100">
                Recorded {Math.round(activeRecording.distance_meters / 1000 * 10) / 10} km
              </h4>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs shadow-md shrink-0 cursor-pointer"
          >
            Open Live Map
          </button>
        </div>
      )}

      {/* 3. Sub Tabs */}
      <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveSubTab('recent')}
          className={`flex-1 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
            activeSubTab === 'recent' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Recent Journeys
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex-1 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
            activeSubTab === 'saved' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Saved Routes
        </button>
      </div>

      {/* 4. Trips Cards List */}
      <div className="space-y-3">
        {routes.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-center space-y-3 border border-slate-800">
            <Clock className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-extrabold text-sm text-slate-200">No saved trips yet</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Your completed and saved routes will appear here for 1-tap navigation restart.
            </p>
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2 rounded-xl bg-sky-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
            >
              Find a Route Now
            </button>
          </div>
        ) : (
          routes.map((route) => (
            <div
              key={route.id}
              className="bg-slate-950/90 hover:bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 font-bold">
                  {route.origin_name} ➔ {route.destination_name}
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  ₹{route.total_cost_inr} • {route.total_duration_minutes}m
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-100">
                {route.title}
              </h3>

              <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  {route.segments.length} steps • {route.total_distance_km} km
                </span>

                <button
                  onClick={() => onStartRoute(route)}
                  className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Start Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
