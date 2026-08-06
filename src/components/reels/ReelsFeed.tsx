import React, { useState } from 'react';
import { Heart, MapPin, Compass, Plus, MessageCircle } from 'lucide-react';
import { TravelReelsService } from '../../lib/reels';
import type { TravelReel } from '../../types';

interface ReelsFeedProps {
  onStartRouteWithReel?: (routeId: string) => void;
  onOpenUploadModal: () => void;
}

export const ReelsFeed: React.FC<ReelsFeedProps> = ({ onStartRouteWithReel, onOpenUploadModal }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [reels, setReels] = useState<TravelReel[]>(() => TravelReelsService.getReels(selectedCity));
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setReels(TravelReelsService.getReels(city));
    setActiveReelIndex(0);
  };

  const handleLikeReel = (reelId: string) => {
    setReels(prev => prev.map(r => r.id === reelId ? { ...r, likes_count: r.likes_count + 1 } : r));
  };

  const currentReel = reels[activeReelIndex] || reels[0];

  return (
    <div className="space-y-4 py-2 max-w-md mx-auto">
      
      {/* City Location Switcher Header */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Chennai', 'Puducherry', 'Hyderabad', 'Bengaluru'].map(city => (
          <button
            key={city}
            onClick={() => handleCityChange(city)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
              selectedCity === city
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            📍 {city}
          </button>
        ))}

        <button
          onClick={onOpenUploadModal}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-md shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ CREATE REEL</span>
        </button>
      </div>

      {/* Reel Vertical Player Container */}
      {currentReel ? (
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl h-[520px] sm:h-[580px] flex flex-col justify-between p-4">
          
          {/* Background Video Stream */}
          <video
            src={currentReel.video_url}
            poster={currentReel.thumbnail_url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-85"
          />

          {/* Top Gradient Overlay: Category & Creator */}
          <div className="relative z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <img
                src={currentReel.creator_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                alt={currentReel.creator_name}
                className="w-8 h-8 rounded-full border border-sky-400 object-cover"
              />
              <div>
                <h4 className="font-extrabold text-xs text-white leading-none">{currentReel.creator_name}</h4>
                <span className="text-[10px] text-sky-300 font-mono">📍 {currentReel.location_name}</span>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded border border-sky-400/40">
              {currentReel.category}
            </span>
          </div>

          {/* Bottom Gradient Overlay: Caption, Map & Route Action Buttons */}
          <div className="relative z-10 space-y-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 rounded-2xl">
            <p className="text-xs font-bold text-slate-100 leading-snug">
              {currentReel.title}
            </p>

            {/* Travel Action Buttons: VIEW ON MAP & VIEW ROUTE */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onStartRouteWithReel?.(currentReel.attached_route_id || 'route-srm-marina')}
                className="py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>🧭 VIEW ROUTE</span>
              </button>

              <button
                onClick={() => alert(`Showing ${currentReel.location_name} on Leaflet Map!`)}
                className="py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>📍 VIEW ON MAP</span>
              </button>
            </div>

            {/* Like & Switch Controls */}
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeReel(currentReel.id)}
                  className="flex items-center gap-1 font-mono hover:text-rose-400 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-current" />
                  <span>{currentReel.likes_count}</span>
                </button>

                <div className="flex items-center gap-1 font-mono">
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                  <span>{currentReel.comments_count}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={activeReelIndex === 0}
                  onClick={() => setActiveReelIndex(prev => Math.max(0, prev - 1))}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700 text-[10px] font-bold disabled:opacity-40 cursor-pointer"
                >
                  PREV
                </button>
                <button
                  disabled={activeReelIndex === reels.length - 1}
                  onClick={() => setActiveReelIndex(prev => Math.min(reels.length - 1, prev + 1))}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700 text-[10px] font-bold disabled:opacity-40 cursor-pointer"
                >
                  NEXT ➔
                </button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800 text-xs text-slate-400">
          No travel reels found for {selectedCity}. Tap + CREATE REEL to upload the first travel reel!
        </div>
      )}

    </div>
  );
};
