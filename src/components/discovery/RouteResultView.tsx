import React, { useState } from 'react';
import { ArrowLeft, Navigation } from 'lucide-react';
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
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>Back to Search</span>
        </button>

        <span className="text-xs font-extrabold text-slate-100 font-mono">
          {route.origin_name.split(' ')[0]} ➔ {route.destination_name}
        </span>
      </div>

      {/* Map Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
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
            <p className="text-xs text-slate-400 font-mono">Est: {route.total_duration_minutes} mins • ₹{route.total_cost_inr}</p>
          </div>

          <button
            onClick={() => onStartJourney(route)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-white transform -rotate-45" />
            <span>TAKE ME THERE</span>
          </button>
        </div>

        {/* Traveller Experience Card vs Honest Empty State */}
        {isNoData ? (
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-dashed border-slate-700 text-center space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 uppercase">
              ⚪ NO TRAVELLER DATA
            </span>
            <h4 className="font-extrabold text-sm text-slate-200">No traveller experience found for this route yet.</h4>
            <p className="text-xs text-slate-400">Be the pioneer traveller: Record your journey to help future commuters!</p>

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
                🟢 VERIFIED TRAVELLER ROUTE
              </span>
              <span className="text-[11px] font-mono text-slate-400">{comparison.travellerCount} travellers used this</span>
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
                key={seg.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-sky-500/20 border-sky-400 text-slate-100 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 uppercase">
                      STEP {idx + 1}: {seg.transport_mode}
                    </span>
                    <span className="font-bold">{seg.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{seg.instruction_full || seg.instruction_simplified || seg.title}</p>
                </div>

                <span className="text-[11px] font-mono text-slate-400 shrink-0 font-bold">
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
