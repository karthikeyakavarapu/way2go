import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { MapView } from '../components/map/MapView';
import { ComparisonView } from '../components/discovery/ComparisonView';
import { RouteGuideSteps } from '../components/guide/RouteGuideSteps';
import { MediaModal } from '../components/guide/MediaModal';
import { RouteSearch } from '../components/discovery/RouteSearch';
import { AreaFilterPills } from '../components/discovery/AreaFilterPills';
import { TransportModeFilter } from '../components/discovery/TransportModeFilter';
import { LocalHelpModal } from '../components/help/LocalHelpModal';
import type { LatLng } from '../types';

export const Discover: React.FC = () => {
  const { publicRoutes, selectedRoute, setSelectedRoute, selectedAreaFilter, setSelectedAreaFilter } = useJourney();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [mediaModal, setMediaModal] = useState<{ url: string; caption: string } | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string>('all');
  const [showHelpModal, setShowHelpModal] = useState(false);

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
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <RouteSearch onSearch={() => {}} />

        <button
          onClick={() => setShowHelpModal(true)}
          className="px-4 py-3 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>NEED LOCAL HELP?</span>
        </button>
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
              onSelectStepIndex={(idx) => setActiveStepIndex(idx)}
              onOpenMediaModal={(url, caption) => setMediaModal({ url, caption })}
            />
          )}
        </div>
      </div>

      {mediaModal && (
        <MediaModal
          mediaUrl={mediaModal.url}
          caption={mediaModal.caption}
          onClose={() => setMediaModal(null)}
        />
      )}

      {showHelpModal && (
        <LocalHelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
};
