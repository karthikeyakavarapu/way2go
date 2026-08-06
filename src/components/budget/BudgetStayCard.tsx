import React from 'react';
import { Star, ShieldCheck, MapPin, Phone } from 'lucide-react';
import type { BudgetStay } from '../../types';

interface BudgetStayCardProps {
  stay: BudgetStay;
}

export const BudgetStayCard: React.FC<BudgetStayCardProps> = ({ stay }) => {
  return (
    <div className="glass-panel-interactive p-4 rounded-2xl border border-slate-800 space-y-3">
      <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <img
          src={stay.photos[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600'}
          alt={stay.name}
          className="w-full h-full object-cover"
        />
        
        {stay.verified_badge && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED STAY</span>
          </div>
        )}

        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
          ₹{stay.price_per_night_inr} <span className="text-[10px] text-slate-300 font-normal">/ night</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-slate-100 text-sm">{stay.name}</h3>
          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{stay.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-sky-400" />
          <span>{stay.address}</span>
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
          {stay.type}
        </span>
        {stay.solo_friendly && (
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
            Solo Friendly
          </span>
        )}
        {stay.family_friendly && (
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
            Family Friendly
          </span>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[180px]">Near: {stay.nearest_transport_access}</span>
        <a
          href={`tel:${stay.contact_phone}`}
          className="text-sky-400 font-bold hover:underline flex items-center gap-1"
        >
          <Phone className="w-3 h-3" />
          <span>Call Host</span>
        </a>
      </div>
    </div>
  );
};
