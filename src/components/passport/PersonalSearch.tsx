import React, { useState } from 'react';
import { History } from 'lucide-react';

export const PersonalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handlePersonalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const qLower = query.toLowerCase();
    const matches: string[] = [];

    if (qLower.includes('eat') || qLower.includes('food') || qLower.includes('restaurant')) {
      matches.push('Murugan Sundal Stall at Marina Beach Entrance (Spent ₹30, 28 July)');
      matches.push('Ramapuram Gate Tea Stall (Spent ₹12, 02 Aug)');
    } else if (qLower.includes('bus') || qLower.includes('mtc')) {
      matches.push('MTC Bus 88K: Ramapuram → Guindy (₹15 fare, 48 mins)');
      matches.push('MTC Bus 21G: Guindy → Light House (₹20 fare, 22 mins)');
    } else {
      matches.push('SRM Ramapuram → Marina Beach Route (Completed 2 hours ago)');
      matches.push('IIT Madras → Besant Nagar Beach Route (Completed 3 days ago)');
    }

    setResults(matches);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-sky-400" />
        <h3 className="font-extrabold text-sm text-slate-100">
          PERSONAL TRAVEL KNOWLEDGE BASE
        </h3>
      </div>

      <form onSubmit={handlePersonalSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Ask your history e.g. "Which bus routes did I complete?"'
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold shrink-0"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 block">Personal Memory Matches:</span>
          <div className="space-y-1.5">
            {results.map((res, idx) => (
              <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
