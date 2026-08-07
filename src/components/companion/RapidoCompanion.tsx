import React, { useState } from 'react';
import { Clock, Users, ShieldCheck, DollarSign } from 'lucide-react';
import type { RouteGuide } from '../../types';

interface RapidoCompanionProps {
  route?: RouteGuide | null;
  onClose?: () => void;
}

export const RapidoCompanion: React.FC<RapidoCompanionProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [passengersCount, setPassengersCount] = useState(2);
  const [showCompanionToast, setShowCompanionToast] = useState(false);

  const estimatedAutoFare = 160;
  const splitPerPerson = Math.round(estimatedAutoFare / passengersCount);

  return (
    <div className="space-y-4 max-w-xl mx-auto py-2">
      
      {/* Top HUD Card */}
      <div className="glass-panel p-5 rounded-3xl border border-sky-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/80 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-extrabold text-sm text-slate-100 uppercase font-mono tracking-wide">
              RAPIDO & CHALO COMPANION HUD
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded">
            LIVE TRANSIT MODE
          </span>
        </div>

        {/* Current Active Leg Focus */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-sky-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-sky-400 font-bold uppercase">CURRENT LEG: STEP {activeStep + 1}</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              Departs in 4 mins
            </span>
          </div>

          <h3 className="font-extrabold text-base text-slate-100">
            {activeStep === 0 ? '🚶 Walk to SRM Gate 2 Bus Shelter' : activeStep === 1 ? '🚌 Board Express Bus 88A / 54F' : '🚇 Guindy Metro Blue Line'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {activeStep === 0
              ? 'Exit campus through Gate 2 past the tea stall. Shared auto stand is directly on your left.'
              : activeStep === 1
              ? 'Direct bus bound for Guindy / Marina Promenade. Ticket ₹15 (keep exact change or use Chalo pass).'
              : 'Switch to Metro Line 1 toward High Court / Beach Promenade for zero-traffic transit.'}
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              PREV LEG
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(2, prev + 1))}
              disabled={activeStep === 2}
              className="flex-1 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-extrabold shadow-md cursor-pointer"
            >
              NEXT LEG ➔
            </button>
          </div>
        </div>

        {/* Live Auto Fare Split Calculator */}
        <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Shared Auto & Cab Split Calculator</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">₹{splitPerPerson} / commuter</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Travelling with {passengersCount} people:</span>
            <div className="flex gap-1.5">
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setPassengersCount(n)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer ${
                    passengersCount === n ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {n} Commuters
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Find Walking / Transit Companion Card */}
        <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-500/30 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-indigo-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>3 Verified Students Heading to Marina Beach</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <p className="text-slate-300">
            Karthik & 2 students are at SRM Gate 2 waiting for Bus 88A. Walk together for safety!
          </p>

          <button
            onClick={() => {
              setShowCompanionToast(true);
              setTimeout(() => setShowCompanionToast(false), 4000);
            }}
            className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>CONNECT & WALK TOGETHER</span>
          </button>
        </div>

      </div>

      {showCompanionToast && (
        <div className="bg-emerald-500 text-white p-3 rounded-2xl text-xs font-extrabold text-center shadow-2xl animate-bounce-short">
          🤝 COMPANION MATCHED! Contact details shared securely.
        </div>
      )}

    </div>
  );
};
