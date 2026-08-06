import React from 'react';
import { ShieldCheck, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface BadgeCelebrationProps {
  pointsEarned: number;
  badgeTitle: string;
  onClose: () => void;
}

export const BadgeCelebration: React.FC<BadgeCelebrationProps> = ({
  pointsEarned,
  badgeTitle,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-3xl max-w-md w-full border border-emerald-500/50 bg-slate-950 text-center space-y-6 shadow-2xl relative overflow-hidden animate-bounce-short">
        
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-400 p-1 mx-auto shadow-xl shadow-emerald-500/30">
          <div className="w-full h-full bg-[#030712] rounded-[22px] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REWARD UNLOCKED</span>
          </div>

          <h2 className="font-extrabold text-2xl text-slate-100">
            CONGRATULATIONS!
          </h2>

          <p className="text-xs text-slate-300">
            Your route has been posted and submitted to <strong>Lead Developer Karthik</strong> for verification!
          </p>
        </div>

        {/* Points & Badge Box */}
        <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">REPUTATION POINTS</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">+{pointsEarned} PTS</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">BADGE UNLOCKED</span>
            <span className="text-xs font-extrabold text-sky-400 block mt-1">{badgeTitle}</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Status: Pending Developer Review before public search launch</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <span>CONTINUE TO WORKSPACE</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
