import React, { useState } from 'react';
import { Search, MapPin, Navigation, ArrowRight, Sparkles } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { PlaceResolutionService } from '../../lib/placeResolution';
import { OSRMProvider } from '../../lib/routingEngine';

interface RouteSearchProps {
  onSearch: (from: string, to: string) => void;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({ onSearch }) => {
  const { routes, setSelectedRoute } = useJourney();
  const [fromLocation, setFromLocation] = useState('SRM Ramapuram');
  const [toLocation, setToLocation] = useState('Marina Beach');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedStatus, setResolvedStatus] = useState<string | null>(null);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResolving(true);
    setResolvedStatus('Resolving origin & destination coordinates...');

    try {
      const originPlace = await PlaceResolutionService.resolvePlace(fromLocation);
      const destPlace = await PlaceResolutionService.resolvePlace(toLocation);

      setResolvedStatus(`Resolved: ${originPlace.name} ➔ ${destPlace.name}`);

      // Try matching community route first
      const matched = routes.find(r => 
        r.destination_name.toLowerCase().includes(destPlace.name.toLowerCase()) ||
        destPlace.name.toLowerCase().includes(r.destination_name.toLowerCase())
      );

      if (matched) {
        setSelectedRoute(matched);
      } else {
        // Calculate OSRM route for resolved coordinates
        const provider = new OSRMProvider();
        const calculated = await provider.calculateRoute({
          originPlace,
          destinationPlace: destPlace,
          firstTimeTraveller: false
        });
        setSelectedRoute(calculated);
      }

      onSearch(originPlace.name, destPlace.name);
    } catch (err) {
      onSearch(fromLocation, toLocation);
    } finally {
      setIsResolving(false);
      setTimeout(() => setResolvedStatus(null), 3000);
    }
  };

  const handleQuickSelect = async (from: string, to: string) => {
    setFromLocation(from);
    setToLocation(to);
    setIsResolving(true);

    const originPlace = await PlaceResolutionService.resolvePlace(from);
    const destPlace = await PlaceResolutionService.resolvePlace(to);

    const matched = routes.find(r => 
      r.destination_name.toLowerCase().includes(destPlace.name.toLowerCase()) ||
      destPlace.name.toLowerCase().includes(r.destination_name.toLowerCase())
    );

    if (matched) {
      setSelectedRoute(matched);
    } else {
      const provider = new OSRMProvider();
      const calculated = await provider.calculateRoute({
        originPlace,
        destinationPlace: destPlace,
        firstTimeTraveller: false
      });
      setSelectedRoute(calculated);
    }

    onSearch(from, to);
    setIsResolving(false);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
          <h2 className="font-extrabold text-lg text-slate-100 uppercase tracking-tight">
            WHERE DO YOU WANT TO GO?
          </h2>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
          Zero-Hallucination Routing Engine
        </span>
      </div>

      {resolvedStatus && (
        <div className="bg-sky-500/10 border border-sky-500/30 p-2.5 rounded-xl text-sky-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>{resolvedStatus}</span>
        </div>
      )}

      <form onSubmit={handleSearchSubmit} className="glass-panel p-4 rounded-2xl border border-sky-500/40 bg-slate-950 space-y-3 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">From Where? (Origin)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="e.g. SRM Ramapuram Gate 2"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 font-semibold"
                required
              />
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 justify-center items-center pt-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="md:col-span-4 relative">
            <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">To Where? (Destination)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="e.g. Pondicherry / Marina Beach"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-semibold"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={isResolving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-1.5 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>{isResolving ? 'RESOLVING...' : 'SEARCH'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900 text-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Popular Resolved Searches:</span>
          <button
            type="button"
            onClick={() => handleQuickSelect('SRM Ramapuram', 'Marina Beach')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-semibold transition-all"
          >
            SRM ➔ Marina Beach
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('SRM Ramapuram', 'Pondicherry')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-semibold transition-all"
          >
            SRM ➔ Pondicherry
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect('IIT Madras', 'Besant Nagar')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-semibold transition-all"
          >
            IIT Madras ➔ Besant Nagar
          </button>
        </div>
      </form>
    </div>
  );
};
