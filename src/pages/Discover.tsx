import React, { useState } from 'react';
import { HelpCircle, Video, Compass, Building, Star } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { MapView } from '../components/map/MapView';
import { ComparisonView } from '../components/discovery/ComparisonView';
import { RouteGuideSteps } from '../components/guide/RouteGuideSteps';
import { MediaModal } from '../components/guide/MediaModal';
import { RouteSearch } from '../components/discovery/RouteSearch';
import { AreaFilterPills } from '../components/discovery/AreaFilterPills';
import { TransportModeFilter } from '../components/discovery/TransportModeFilter';
import { LocalHelpModal } from '../components/help/LocalHelpModal';
import { ReelsFeed } from '../components/reels/ReelsFeed';
import { ReelUploadModal } from '../components/reels/ReelUploadModal';
import type { LatLng } from '../types';

const BUDGET_STAYS = [
  {
    id: 'stay-1',
    name: 'Zostel Chennai (Near Central)',
    address: 'Triplicane High Rd, Chennai',
    price_per_night_inr: 799,
    rating: 4.8,
    nearest_transport_access: '🚶 400m from Central Metro',
    contact_phone: '+91 98401 99999',
    photos: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400']
  },
  {
    id: 'stay-2',
    name: 'French Quarter Heritage Homestay',
    address: 'White Town, Puducherry',
    price_per_night_inr: 1200,
    rating: 4.9,
    nearest_transport_access: '🚌 200m from Promenade Bus Stop',
    contact_phone: '+91 98402 88888',
    photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400']
  }
];

export const Discover: React.FC = () => {
  const { publicRoutes, selectedRoute, setSelectedRoute, selectedAreaFilter, setSelectedAreaFilter } = useJourney();
  const [activeTab, setActiveTab] = useState<'routes' | 'reels' | 'stays'>('routes');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [mediaModal, setMediaModal] = useState<{ url: string; caption: string } | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string>('all');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUploadReelModal, setShowUploadReelModal] = useState(false);

  const handleSelectRoute = (r: any) => {
    setSelectedRoute(r);
    setActiveStepIndex(0);
  };

  const handleAddPointFromMap = (name: string, location: LatLng, type: 'stop' | 'landmark') => {
    if (!currentRoute) return;

    const newLandmark = {
      id: `map-pin-${Date.now()}`,
      name,
      description: `Map-pinned ${type === 'stop' ? 'bus stop' : 'landmark'} added by community.`,
      location
    };

    const updatedRoute = {
      ...currentRoute,
      segments: currentRoute.segments.map((seg, i) => {
        if (i === activeStepIndex) {
          return {
            ...seg,
            landmarks: [...(seg.landmarks || []), newLandmark]
          };
        }
        return seg;
      })
    };

    setSelectedRoute(updatedRoute);
  };

  const filteredRoutes = publicRoutes.filter(r => {
    if (selectedTransportMode === 'all') return true;
    return r.segments.some(s => s.transport_mode === selectedTransportMode || (selectedTransportMode === 'walk_bus' && (s.transport_mode === 'bus' || s.transport_mode === 'walk')));
  });

  const currentRoute = selectedRoute || filteredRoutes[0] || publicRoutes[0];

  return (
    <div className="space-y-6 py-4 max-w-7xl mx-auto">
      
      {/* Primary Unified Filter Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'routes' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>🗺️ Map Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'reels' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>🎬 Travel Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('stays')}
            className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeTab === 'stays' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>🏨 Budget Stays</span>
          </button>
        </div>

        <button
          onClick={() => setShowHelpModal(true)}
          className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs flex items-center gap-1 transition-all shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">LOCAL HELP</span>
        </button>
      </div>

      {activeTab === 'reels' ? (
        /* TRAVEL REELS DISCOVERY FEED */
        <ReelsFeed
          onStartRouteWithReel={(rId) => {
            const found = publicRoutes.find(r => r.id === rId) || publicRoutes[0];
            setSelectedRoute(found);
            setActiveTab('routes');
          }}
          onOpenUploadModal={() => setShowUploadReelModal(true)}
        />
      ) : activeTab === 'stays' ? (
        /* BUDGET STAYS DISCOVERY */
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div>
              <h2 className="font-extrabold text-xl text-slate-100">Verified Budget Stays & Student Hostels</h2>
              <p className="text-xs text-slate-400 font-mono">Solo & family friendly lodging near major transit hubs</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30">
              VERIFIED BADGE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUDGET_STAYS.map((stay) => (
              <div key={stay.id} className="glass-panel p-4 rounded-3xl border border-slate-800 bg-slate-950 space-y-3 shadow-xl">
                <div className="relative h-36 rounded-2xl overflow-hidden">
                  <img src={stay.photos[0]} alt={stay.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-emerald-400 font-mono font-bold text-[11px] border border-emerald-500/30">
                    ₹{stay.price_per_night_inr}/night
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-100">{stay.name}</h3>
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      {stay.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{stay.address}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                  <span className="text-[11px] text-sky-400 font-mono">{stay.nearest_transport_access}</span>
                  <button
                    onClick={() => alert(`Contacting ${stay.name}: ${stay.contact_phone}`)}
                    className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
                  >
                    BOOK STAY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* MAP ROUTES & NEARBY DISCOVERY */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <RouteSearch onSearch={() => {}} />
          </div>

          <div className="space-y-3">
            <AreaFilterPills
              selectedArea={selectedAreaFilter}
              onSelectArea={(area) => setSelectedAreaFilter(area)}
            />
            <TransportModeFilter
              selectedMode={selectedTransportMode}
              onSelectMode={(mode) => setSelectedTransportMode(mode)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-6">
              <MapView
                route={currentRoute}
                activeStepIndex={activeStepIndex}
                heightClass="h-[400px] lg:h-[500px]"
                onAddPointFromMap={handleAddPointFromMap}
              />

              <ComparisonView
                routes={filteredRoutes}
                selectedRoute={currentRoute}
                onSelectRoute={handleSelectRoute}
              />
            </div>

            <div className="lg:col-span-5">
              {currentRoute && (
                <RouteGuideSteps
                  route={currentRoute}
                  activeStepIndex={activeStepIndex}
                  onSelectStepIndex={(idx: number) => setActiveStepIndex(idx)}
                  onOpenMediaModal={(url, caption) => setMediaModal({ url, caption })}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showHelpModal && (
        <LocalHelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {showUploadReelModal && (
        <ReelUploadModal
          onClose={() => setShowUploadReelModal(false)}
          onSuccess={() => setActiveTab('reels')}
        />
      )}

      {mediaModal && (
        <MediaModal
          mediaUrl={mediaModal.url}
          caption={mediaModal.caption}
          onClose={() => setMediaModal(null)}
        />
      )}

    </div>
  );
};
