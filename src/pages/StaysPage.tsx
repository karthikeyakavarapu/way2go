import React from 'react';
import { getLocalStays } from '../lib/supabase';
import { BudgetStayCard } from '../components/budget/BudgetStayCard';
import { FareCalculator } from '../components/budget/FareCalculator';
import { Hotel } from 'lucide-react';

export const StaysPage: React.FC = () => {
  const stays = getLocalStays();

  return (
    <div className="space-y-6 py-4">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Hotel className="w-6 h-6 text-sky-400" />
          <h2 className="font-extrabold text-2xl text-slate-100">
            VERIFIED BUDGET STAYS & FARES
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          Discover student-friendly hostels, verified homestays, and budget lodges near your destination transport hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Fare Calculator (4 cols) */}
        <div className="lg:col-span-4">
          <FareCalculator />
        </div>

        {/* Right: Stay Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-extrabold text-base text-slate-200">
            Verified Accommodation Listings ({stays.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stays.map(stay => (
              <BudgetStayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
