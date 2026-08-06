import React, { useState } from 'react';
import { Sparkles, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useJourney } from '../../context/JourneyContext';
import { AIService } from '../../lib/ai';

export const TripStoryGenerator: React.FC = () => {
  const { selectedRoute } = useJourney();
  const [copied, setCopied] = useState(false);

  const routeTitle = selectedRoute?.title || 'SRM Ramapuram → Marina Beach';
  const duration = selectedRoute?.total_duration_minutes || 48;
  const cost = selectedRoute?.total_cost_inr || 35;

  const storyText = AIService.generateTripStory(
    selectedRoute?.origin_name || 'SRM Ramapuram',
    selectedRoute?.destination_name || 'Marina Beach',
    duration,
    cost,
    ['Walk', 'MTC Bus 88K']
  );

  const handleShare = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    navigator.clipboard.writeText(`🚀 Check out my travel story on WAY2GO!\n\n"${storyText}"\n\nDownload WAY2GO App.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-900 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="font-extrabold text-base text-slate-100">
            TRAVEL WRAPPED & TRIP STORY
          </h3>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded font-mono font-bold">
          Viral Social Card
        </span>
      </div>

      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 p-6 rounded-2xl text-white space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-extrabold text-6xl tracking-tighter">
          WAY2GO
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-sky-200">WAY2GO TRAVEL RECAP</span>
          <h4 className="font-extrabold text-xl">{routeTitle}</h4>
        </div>

        <p className="text-xs text-slate-100 leading-relaxed font-medium bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
          "{storyText}"
        </p>

        <div className="flex items-center justify-between border-t border-white/20 pt-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-200 block">Total Spend</span>
            <span className="font-extrabold text-lg font-mono">₹{cost}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-200 block">Duration</span>
            <span className="font-extrabold text-lg font-mono">{duration} min</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-200 block">Verified By</span>
            <span className="font-extrabold text-xs">Karthik A.</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
      >
        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        <span>{copied ? 'COPIED TO CLIPBOARD!' : 'SHARE TRIP STORY CARD'}</span>
      </button>
    </div>
  );
};
