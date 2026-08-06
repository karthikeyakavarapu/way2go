import React from 'react';
import { X, Printer, ShieldAlert } from 'lucide-react';
import type { RouteGuide } from '../../types';

interface PrintableRouteModalProps {
  route: RouteGuide;
  onClose: () => void;
}

export const PrintableRouteModal: React.FC<PrintableRouteModalProps> = ({ route, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-2xl w-full border border-sky-500/40 bg-slate-950 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-slate-800 pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl text-slate-100">{route.title}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              VERIFIED {route.confidence_score}%
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Offline Printable Route Guide • {route.total_distance_km} km • {route.total_duration_minutes} mins • ₹{route.total_cost_inr} Total Fare
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {route.segments.map(seg => (
            <div key={seg.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span className="flex items-center gap-2 text-sky-400">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center text-[10px]">
                    {seg.step_number}
                  </span>
                  Step {seg.step_number}: {seg.title}
                </span>
                <span className="text-emerald-400 font-mono">₹{seg.estimated_cost_inr} • {seg.estimated_minutes}m</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {seg.instruction_full}
              </p>
              {seg.stops && seg.stops.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-amber-300 font-mono">
                  {seg.stops.map(s => (
                    <span key={s.id} className="bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                      🚌 Bus {s.route_numbers?.join(', ')} @ {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/30 flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="font-bold">Emergency Hotlines:</span>
          </div>
          <span>National Helpline: 112 • Women Helpline: 1091</span>
        </div>

        <div className="flex items-center gap-3 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
