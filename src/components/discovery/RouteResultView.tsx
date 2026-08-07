import React, { useState } from 'react';
import { ArrowLeft, Navigation, Sparkles } from 'lucide-react';
import { MapView } from '../map/MapView';
import type { RouteGuide, RouteComparisonResult } from '../../types';

interface RouteResultViewProps {
  comparison: RouteComparisonResult;
  onBack: () => void;
  onStartJourney: (route: RouteGuide) => void;
  onRecordRoute: () => void;
}

export const RouteResultView: React.FC<RouteResultViewProps> = ({
  comparison,
  onBack,
  onStartJourney,
  onRecordRoute
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const route = comparison.mapRoute;
  const isNoData = comparison.isNoTravellerData;

  return (
    <div className="space-y-4 py-2 max-w-xl mx-auto">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>Back to Search</span>
        </button>

        <span className="text-xs font-extrabold text-slate-100 font-mono">
          {route.origin_name.split(' ')[0]} ➔ {route.destination_name}
        </span>
      </div>

      {/* Map Header with Satellite switcher */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <MapView
          route={route}
          activeStepIndex={activeStepIndex}
          heightClass="h-[320px] sm:h-[380px]"
        />
      </div>

      {/* Draggable/Expandable Bottom Sheet */}
      <div className="glass-panel p-5 rounded-3xl border border-sky-500/40 bg-slate-950/95 space-y-4 shadow-2xl">
        
        {/* Route Summary Header */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div>
            <h2 className="font-extrabold text-base text-slate-100">{route.title}</h2>
            <p className="text-xs text-sky-400 font-mono font-bold mt-0.5">
              Verified Fare: ₹{route.total_cost_inr} • Est: {route.total_duration_minutes} mins • {route.total_distance_km} km
            </p>
          </div>

          <button
            onClick={() => onStartJourney(route)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-white transform -rotate-45" />
            <span>TAKE ME THERE</span>
          </button>
        </div>

        {/* 🤖 Authentic AI & Google Maps Transit Guide Answer Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 p-4 rounded-2xl border border-sky-500/40 space-y-2.5 text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>AI TRANSIT GUIDE & DIRECT DIRECTIONS</span>
            </span>
            <span className="text-[10px] font-mono text-sky-300 font-bold bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/30">
              REAL MAP DATA
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed font-sans">
            Follow this optimal multimodal path from <strong className="text-white">{route.origin_name}</strong> to <strong className="text-white">{route.destination_name}</strong>. Combines pedestrian exit gate navigation, direct city buses, and metro lines to bypass road congestion for ₹{route.total_cost_inr}.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono font-bold pt-1">
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TOTAL COST</span>
              <span className="text-emerald-400 text-xs">₹{route.total_cost_inr}</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TRANSIT TIME</span>
              <span className="text-sky-400 text-xs">{route.total_duration_minutes} mins</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">DISTANCE</span>
              <span className="text-indigo-400 text-xs">{route.total_distance_km} km</span>
            </div>
          </div>
        </div>

        {/* Traveller Experience Card vs Honest Empty State */}
        {isNoData ? (
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-dashed border-slate-700 text-center space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase">
              ⚪ NO TRAVELLER EXPERIENCE RECORDED YET
            </span>
            <h4 className="font-extrabold text-sm text-slate-200">No commuter experience found for this route yet.</h4>
            <p className="text-xs text-slate-400">Be the pioneer: Record your journey to help future commuters!</p>

            <button
              onClick={onRecordRoute}
              className="mt-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md cursor-pointer"
            >
              + BE THE FIRST TO RECORD IT
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                🟢 VERIFIED TRAVELLER RECORD
              </span>
              <span className="text-[11px] font-mono text-slate-400">{comparison.travellerCount} commuters used this</span>
            </div>
            <p className="text-slate-300 font-bold leading-snug">{comparison.travellerRoute?.tagline}</p>
          </div>
        )}

        {/* Step-by-Step Transit Legs */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wide">
            STEP-BY-STEP TRANSIT STEPS
          </h3>

          <div className="space-y-2">
            {route.segments.map((seg, idx) => (
              <div
                key={seg.id || idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-sky-500/20 border-sky-400 text-slate-100 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 uppercase">
                      STEP {idx + 1}: {seg.transport_mode}
                    </span>
                    <span className="font-bold text-slate-100">{seg.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {seg.instruction_full || seg.instruction_simplified || seg.title}
                  </p>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 shrink-0 font-bold">
                  {seg.estimated_minutes || 5}m
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
