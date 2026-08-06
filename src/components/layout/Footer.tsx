import React from 'react';
import { Navigation, Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-slate-800/80 mt-16 py-10 px-4 text-slate-400 text-xs mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-sky-400" />
            </div>
            <span className="font-extrabold text-lg text-slate-100 tracking-tight">WAY2GO</span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono font-bold">PROD v2.0</span>
          </div>
          <p className="text-slate-300 font-medium text-sm">
            "Maps tell you where. Travellers show you how."
          </p>
          <p className="text-slate-400 leading-relaxed text-xs max-w-lg">
            A community-powered travel intelligence platform capturing real traveller journeys, GPS traces, visual landmarks, fares, and safety signals for first-time travellers.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 text-sm">Platform Loop</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>1. DISCOVER real routes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>2. FOLLOW step-by-step guides</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>3. RECORD your journey live</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>4. VERIFY community accuracy</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-sky-400" />
            Lead Architect & Developer
          </h4>
          <p className="text-slate-300 font-semibold text-xs">
            Karthik Akavarapu
          </p>
          <div className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer">
            <Mail className="w-3.5 h-3.5" />
            <a href="mailto:karthikakavarapuu@gmail.com" className="underline font-mono text-[11px]">
              karthikakavarapuu@gmail.com
            </a>
          </div>
          <p className="text-[10px] text-slate-500">
            Engineered for high-scale real-world traveller navigation.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <p>© 2026 WAY2GO Route Intelligence Platform. All real-world journey data community-verified.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy First</span>
          <span className="hover:text-slate-400 cursor-pointer">OSRM Routing</span>
          <span className="hover:text-slate-400 cursor-pointer">OpenStreetMap</span>
        </div>
      </div>
    </footer>
  );
};
