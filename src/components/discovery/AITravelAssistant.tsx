import React, { useState } from 'react';
import { Sparkles, Bot, Compass, Send, CheckCircle2, ArrowRight, Lightbulb, Footprints, Bus, Navigation, MapPin } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { AIService, type AIDirectionalRouteResult } from '../../lib/ai';

interface AITravelAssistantProps {
  onSelectRoute?: (routeId: string) => void;
}

export const AITravelAssistant: React.FC<AITravelAssistantProps> = ({ onSelectRoute }) => {
  const { routes, setSelectedRoute } = useJourney();
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [directionalResult, setDirectionalResult] = useState<AIDirectionalRouteResult | null>(null);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsThinking(true);
    setDirectionalResult(null);

    setTimeout(async () => {
      const res = await AIService.generateDirectionalRoute(query, routes);
      setDirectionalResult(res);
      setIsThinking(false);
    }, 600);
  };

  const handleSampleClick = (sampleText: string) => {
    setQuery(sampleText);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-sky-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/30 space-y-5 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-lg text-slate-100">AI DIRECTIONAL ROUTE ENGINE</h3>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
                Turn-by-Turn AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Type any origin & destination to get turn-by-turn walking, bus, and metro directions!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] text-slate-400 font-semibold block">Try asking AI:</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleSampleClick('How do I go from SRM Ramapuram to Marina Beach?')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 text-xs font-semibold transition-all text-left"
          >
            🏖️ Directions: SRM ➔ Marina Beach
          </button>
          <button
            type="button"
            onClick={() => handleSampleClick('Best route from Guindy station to Phoenix Mall')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 text-xs font-semibold transition-all text-left"
          >
            🛍️ Directions: Guindy ➔ Phoenix Mall
          </button>
        </div>
      </div>

      {/* AI Search Form */}
      <form onSubmit={handleAISearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. How to go from SRM Ramapuram to Marina Beach?"
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
          required
        />
        <button
          type="submit"
          disabled={isThinking}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white transition-all shadow-md"
        >
          {isThinking ? (
            <Sparkles className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* AI Directional Route Output Card */}
      {directionalResult && (
        <div className="bg-slate-950/90 p-5 rounded-2xl border border-sky-500/40 space-y-5 animate-bounce-short">
          
          {/* Result Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>{directionalResult.explanation}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Origin: <strong className="text-slate-200">{directionalResult.origin}</strong> ➔ Destination: <strong className="text-emerald-400">{directionalResult.destination}</strong>
              </p>
            </div>

            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
              ₹{directionalResult.totalCostINR} • {directionalResult.totalDurationMinutes} min • {directionalResult.totalDistanceKm} km
            </span>
          </div>

          {/* Turn-by-Turn Directional Steps */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>TURN-BY-TURN DIRECTIONAL STEPS ({directionalResult.directionalSteps.length} STEPS):</span>
            </h4>

            <div className="space-y-2">
              {directionalResult.directionalSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        {step.mode === 'walk' ? (
                          <Footprints className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Bus className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          Step {step.stepNumber} • {step.mode}
                        </span>
                        <h5 className="font-extrabold text-slate-100 text-xs">
                          {step.title}
                        </h5>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {step.durationMins} min • ₹{step.costINR}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                    {step.instruction}
                  </p>

                  {step.busNumbers && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-300">
                      <Bus className="w-3 h-3 text-amber-400" />
                      <span>Bus Numbers: <strong>{step.busNumbers.join(', ')}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What to Do Suggestions */}
          <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-850">
            <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              WHAT YOU CAN DO AT YOUR DESTINATION:
            </span>
            <div className="space-y-1">
              {directionalResult.whatToDoSuggestions.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 p-2 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button: Follow Route on Map */}
          {directionalResult.matchedRoute && (
            <div className="pt-2 border-t border-slate-850 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedRoute(directionalResult.matchedRoute!);
                  if (onSelectRoute) onSelectRoute(directionalResult.matchedRoute!.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>FOLLOW THIS AI DIRECTIONAL ROUTE ON MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
