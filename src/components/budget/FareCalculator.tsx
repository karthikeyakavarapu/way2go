import React, { useState } from 'react';

export const FareCalculator: React.FC = () => {
  const [userBudget, setUserBudget] = useState(100);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100">BUDGET ROUTING ENGINE</h3>
            <p className="text-xs text-slate-400">Filter journeys by maximum pocket budget</p>
          </div>
        </div>

        <span className="text-lg font-extrabold text-emerald-400 font-mono">
          Max ₹{userBudget}
        </span>
      </div>

      <div className="space-y-1">
        <input
          type="range"
          min="10"
          max="300"
          step="10"
          value={userBudget}
          onChange={(e) => setUserBudget(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>₹10 (Walk/Bus)</span>
          <span>₹100 (Student Avg)</span>
          <span>₹300 (Metro/Cab)</span>
        </div>
      </div>

      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
        <span className="font-bold text-slate-200 block text-xs">
          Sample SRM → Marina Fare Breakdown:
        </span>
        <div className="space-y-1.5 text-slate-300">
          <div className="flex justify-between">
            <span>Walk Gate 2 to Ramapuram Stand</span>
            <span className="font-mono text-emerald-400 font-bold">₹0</span>
          </div>
          <div className="flex justify-between">
            <span>MTC Bus 88K to Guindy</span>
            <span className="font-mono text-emerald-400 font-bold">₹15</span>
          </div>
          <div className="flex justify-between">
            <span>MTC Bus 21G to Light House</span>
            <span className="font-mono text-emerald-400 font-bold">₹20</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold">
            <span className="text-slate-100">Total Route Fare</span>
            <span className="font-mono text-emerald-400 text-sm">₹35</span>
          </div>
        </div>
      </div>
    </div>
  );
};
