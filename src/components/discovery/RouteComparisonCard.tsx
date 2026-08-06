import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Radio } from 'lucide-react';
import type { RouteComparisonResult } from '../../types';

interface RouteComparisonCardProps {
  comparison: RouteComparisonResult;
  onStartRoute: () => void;
  onRecordRoute: () => void;
}

export const RouteComparisonCard: React.FC<RouteComparisonCardProps> = ({
  comparison,
  onStartRoute,
  onRecordRoute
}) => {
  const { matchStatus, matchPercentage, mapRoute, travellerRoute, differencesDescription, isNoTravellerData } = comparison;

  const renderStatusBadge = () => {
    switch (matchStatus) {
      case 'EXACT_MATCH':
        return (
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>🟢 MATCHES YOUR ROUTE ({matchPercentage}%)</span>
          </div>
        );
      case 'PARTIAL_MATCH':
        return (
          <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>🟡 PARTLY MATCHES ({matchPercentage}%)</span>
          </div>
        );
      case 'NO_TRAVELLER_DATA':
      default:
        return (
          <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-extrabold flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>⚪ NO TRAVELLER EXPERIENCE FOUND YET</span>
          </div>
        );
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/40 bg-slate-950/95 space-y-4 shadow-2xl">
      
      {/* Top Match Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-lg sm:text-xl text-slate-100">
              {mapRoute.origin_name} ➔ {mapRoute.destination_name}
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Comparing Real Map Geometry against Community Verified Records
          </p>
        </div>

        {renderStatusBadge()}
      </div>

      {/* Side by Side Route Comparison Grid */}
      {!isNoTravellerData && travellerRoute ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Real Map Route (OSRM) */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
              <span>🗺️ REAL MAP ROUTE</span>
              <span>{mapRoute.total_duration_minutes} mins</span>
            </div>
            <p className="text-xs text-slate-300 font-bold">
              {mapRoute.segments.map(s => s.transport_mode.toUpperCase()).join(' ➔ ')}
            </p>
            <span className="text-[11px] text-slate-400 font-mono block">
              Calculated via OSRM OpenStreetMap Road Engine
            </span>
          </div>

          {/* Real Traveller Experience */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
              <span>👥 TRAVELLER RECORDED</span>
              <span>{travellerRoute.total_duration_minutes} mins</span>
            </div>
            <p className="text-xs text-slate-300 font-bold">
              {travellerRoute.segments.map(s => s.transport_mode.toUpperCase()).join(' ➔ ')}
            </p>
            <span className="text-[11px] text-slate-400 font-mono block">
              {comparison.travellerCount} travellers recorded • Last verified {comparison.lastVerifiedLabel}
            </span>
          </div>
        </div>
      ) : (
        /* Growth Loop Trigger for No Traveller Data */
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-sky-400 mx-auto" />
          <h3 className="font-extrabold text-base text-slate-100">
            No traveller experience found for this route yet.
          </h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            We couldn't find a WAY2GO traveller who has recorded this route yet. You can still follow the Real Map Route or be the pioneer to record it!
          </p>
          <div className="flex justify-center gap-2 pt-1">
            <button
              onClick={onRecordRoute}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              <span>RECORD THIS ROUTE</span>
            </button>
          </div>
        </div>
      )}

      {/* Difference Cards */}
      {differencesDescription.length > 0 && !isNoTravellerData && (
        <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
          <span className="font-extrabold text-amber-400 block uppercase tracking-wide">
            🔎 What is different between Map & Traveller path:
          </span>
          {differencesDescription.map((diff, i) => (
            <p key={i} className="text-slate-300 leading-relaxed font-mono">
              • {diff}
            </p>
          ))}
        </div>
      )}

      {/* Primary Action Button */}
      <button
        onClick={onStartRoute}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>START JOURNEY WITH THIS ROUTE</span>
        <ArrowRight className="w-5 h-5" />
      </button>

    </div>
  );
};
