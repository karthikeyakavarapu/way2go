import React from 'react';
import { ShieldCheck, Footprints, Bus, Train, CheckCircle, ArrowRight } from 'lucide-react';
import type { RouteGuide, TransportMode } from '../../types';

interface RouteCardProps {
  route: RouteGuide;
  isSelected?: boolean;
  onSelect: (route: RouteGuide) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected, onSelect }) => {
  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'walk': return <Footprints className="w-3.5 h-3.5 text-emerald-400" />;
      case 'bus': return <Bus className="w-3.5 h-3.5 text-sky-400" />;
      case 'metro': case 'train': return <Train className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Bus className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Cheapest': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Fastest': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'Beginner Friendly': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div 
      onClick={() => onSelect(route)}
      className={`glass-panel-interactive p-5 rounded-2xl cursor-pointer space-y-4 border transition-all ${
        isSelected 
          ? 'border-sky-500 ring-2 ring-sky-500/20 bg-slate-900/90 shadow-xl shadow-sky-500/10' 
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(route.category)}`}>
          {route.category}
        </span>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{route.confidence_score}% Verified</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-extrabold text-base text-slate-100 group-hover:text-sky-400 transition-colors flex items-center justify-between">
          <span>{route.title}</span>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2">
          {route.tagline}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 text-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cost</span>
          <span className="text-sm font-extrabold text-emerald-400">₹{route.total_cost_inr}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
          <span className="text-sm font-extrabold text-sky-400">{route.total_duration_minutes} min</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Distance</span>
          <span className="text-sm font-extrabold text-slate-200">{route.total_distance_km} km</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
        <span className="text-[10px] text-slate-400 shrink-0">Chain:</span>
        {route.segments.map((seg, idx) => (
          <React.Fragment key={seg.id || idx}>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300 shrink-0">
              {getTransportIcon(seg.transport_mode)}
              <span className="capitalize">{seg.transport_mode}</span>
            </div>
            {idx < route.segments.length - 1 && (
              <span className="text-slate-600 text-xs">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <img 
            src={route.author_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
            alt={route.author_name}
            className="w-5 h-5 rounded-full border border-sky-500/30 object-cover"
          />
          <span className="truncate max-w-[120px] text-slate-300 font-medium">{route.author_name}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
          <span>{route.successful_completions_count} completed</span>
        </div>
      </div>
    </div>
  );
};
