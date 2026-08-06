import React, { useState } from 'react';
import { Sparkles, Radio, Zap } from 'lucide-react';
import { LiveRecorderWidget } from '../components/recorder/LiveRecorderWidget';
import { QuickRoutePostModal } from '../components/recorder/QuickRoutePostModal';

export const RecordPage: React.FC = () => {
  const [showQuickModal, setShowQuickModal] = useState(false);

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ROUTE CREATOR STUDIO</span>
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-slate-100">
          HOW WOULD YOU LIKE TO SHARE YOUR ROUTE?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Choose the 30-second easy form if you already know the route, or use Live GPS Tracking while travelling!
        </p>
      </div>

      {/* Choice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Card 1: 30-Sec Fast Form */}
        <div 
          onClick={() => setShowQuickModal(true)}
          className="glass-panel p-8 rounded-3xl border border-sky-500/40 bg-gradient-to-br from-slate-900 to-sky-950/30 space-y-4 shadow-2xl cursor-pointer hover:border-sky-400 group transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
              RECOMMENDED FOR BEGINNERS
            </span>
            <h3 className="font-extrabold text-xl text-slate-100 mt-2">
              ⚡ 30-SECOND FAST ROUTE FORM
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              No live GPS needed! Just type your start point, destination, bus numbers, and fare. Fast, easy, and effortless.
            </p>
          </div>

          <button className="w-full py-3 rounded-xl bg-sky-500 group-hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20">
            OPEN FAST ROUTE FORM
          </button>
        </div>

        {/* Card 2: Live GPS Tracker */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 to-emerald-950/30 space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Radio className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              FOR LIVE TRAVELLERS
            </span>
            <h3 className="font-extrabold text-xl text-slate-100 mt-2">
              🔴 LIVE GPS ROUTE TRACKER
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Track your journey in real-time using phone GPS while walking or taking transit. Capture photos at bus stops on the go.
            </p>
          </div>

          <LiveRecorderWidget />
        </div>

      </div>

      {showQuickModal && (
        <QuickRoutePostModal onClose={() => setShowQuickModal(false)} />
      )}
    </div>
  );
};
