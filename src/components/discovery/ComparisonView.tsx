import React, { useState } from 'react';
import { DollarSign, Zap, Shield, Filter } from 'lucide-react';
import type { RouteGuide } from '../../types';
import { RouteCard } from './RouteCard';

interface ComparisonViewProps {
  routes: RouteGuide[];
  selectedRoute: RouteGuide | null;
  onSelectRoute: (route: RouteGuide) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  routes,
  selectedRoute,
  onSelectRoute
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cheapest' | 'Fastest' | 'Beginner Friendly'>('All');

  const filteredRoutes = routes.filter(r => {
    if (activeCategory === 'All') return true;
    return r.category === activeCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeCategory === 'All'
              ? 'bg-slate-100 text-slate-900 font-bold shadow'
              : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>All Routes ({routes.length})</span>
        </button>

        <button
          onClick={() => setActiveCategory('Cheapest')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeCategory === 'Cheapest'
              ? 'bg-emerald-500 text-white font-bold shadow shadow-emerald-500/30'
              : 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Cheapest Fares</span>
        </button>

        <button
          onClick={() => setActiveCategory('Fastest')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeCategory === 'Fastest'
              ? 'bg-sky-500 text-white font-bold shadow shadow-sky-500/30'
              : 'bg-sky-950/30 text-sky-300 border border-sky-500/30 hover:bg-sky-900/40'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Fastest Journey</span>
        </button>

        <button
          onClick={() => setActiveCategory('Beginner Friendly')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
            activeCategory === 'Beginner Friendly'
              ? 'bg-indigo-500 text-white font-bold shadow shadow-indigo-500/30'
              : 'bg-indigo-950/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/40'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Beginner Friendly</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutes.map(route => (
          <RouteCard
            key={route.id}
            route={route}
            isSelected={selectedRoute?.id === route.id}
            onSelect={onSelectRoute}
          />
        ))}

        {filteredRoutes.length === 0 && (
          <div className="col-span-2 glass-panel p-8 text-center rounded-2xl border border-slate-800 space-y-2">
            <p className="text-sm font-semibold text-slate-300">No routes match this filter yet.</p>
            <p className="text-xs text-slate-500">Record your own journey to contribute the first route!</p>
          </div>
        )}
      </div>
    </div>
  );
};
