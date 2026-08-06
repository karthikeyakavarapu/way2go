import React from 'react';
import { SafeJourneyDrawer } from '../components/safe/SafeJourneyDrawer';
import { MapView } from '../components/map/MapView';
import { useJourney } from '../context/JourneyContext';

export const SafeJourneyPage: React.FC = () => {
  const { selectedRoute, safeJourney } = useJourney();

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Safe Journey Controls (6 cols) */}
        <div className="lg:col-span-6">
          <SafeJourneyDrawer />
        </div>

        {/* Right: Live Map Tracker (6 cols) */}
        <div className="lg:col-span-6">
          <MapView
            route={selectedRoute}
            liveLocation={safeJourney ? safeJourney.current_location : null}
            heightClass="h-[420px] lg:h-[540px]"
          />
        </div>

      </div>
    </div>
  );
};
