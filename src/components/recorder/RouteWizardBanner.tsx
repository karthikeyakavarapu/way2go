import React from 'react';
import { Play, Navigation } from 'lucide-react';

interface RouteWizardBannerProps {
  onStartClick?: () => void;
}

export const RouteWizardBanner: React.FC<RouteWizardBannerProps> = ({ onStartClick }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900 to-slate-900 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
              HOW TO SHARE A ROUTE IN 3 EASY STEPS
            </h3>
            <p className="text-xs text-slate-400">First-time contributor simple step-by-step guide</p>
          </div>
        </div>

        {onStartClick && (
          <button
            onClick={onStartClick}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>START RECORDING NOW</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-400 font-extrabold text-xs">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xs">1</span>
            <span>STEP 1: RECORD TRACE</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            Press <strong>Start Recording</strong> when exiting your college gate, home, or station. Your phone tracks GPS path automatically.
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs">2</span>
            <span>STEP 2: ADD LANDMARK PHOTOS</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            Tap <strong>Capture Photo</strong> at exit gates, bus stop shelters, and drop-off points so first-time travellers know where to look.
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs">3</span>
            <span>STEP 3: SUBMIT FOR APPROVAL</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            Click <strong>Finish & Submit</strong>. Lead Developer Karthik reviews the trace and approves it to go live for everyone!
          </p>
        </div>
      </div>
    </div>
  );
};
