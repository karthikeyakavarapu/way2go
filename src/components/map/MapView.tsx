import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { LatLng, RouteGuide, TransportMode } from '../../types';
import { MapPinPicker } from './MapPinPicker';

const createCustomIcon = (color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <path fill="${color}" stroke="#0b0f19" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="3" fill="#ffffff"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const originIcon = createCustomIcon('#38bdf8');
const destIcon = createCustomIcon('#10b981');
const stopIcon = createCustomIcon('#f59e0b');
const clickedIcon = createCustomIcon('#ef4444');

const liveUserIcon = L.divIcon({
  html: `<div class="custom-pulse-marker"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const MapEventsHandler: React.FC<{ onMapClick: (location: LatLng) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });
  return null;
};

const MapRecenter: React.FC<{ coords: LatLng[]; activeStepCoord?: LatLng }> = ({ coords, activeStepCoord }) => {
  const map = useMap();

  useEffect(() => {
    if (activeStepCoord) {
      map.flyTo([activeStepCoord.lat, activeStepCoord.lng], 16, { duration: 1.2 });
    } else if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords.map(c => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [coords, activeStepCoord, map]);

  return null;
};

interface MapViewProps {
  route: RouteGuide | null;
  activeStepIndex?: number;
  liveLocation?: LatLng | null;
  heightClass?: string;
  onAddPointFromMap?: (name: string, location: LatLng, type: 'stop' | 'landmark') => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  route, 
  activeStepIndex, 
  liveLocation,
  heightClass = 'h-[380px] md:h-[480px]',
  onAddPointFromMap
}) => {
  const [clickedLocation, setClickedLocation] = useState<LatLng | null>(null);

  const defaultCenter: LatLng = route?.origin_coords || { lat: 13.0336, lng: 80.1802 };

  const allCoords: LatLng[] = route
    ? route.segments.flatMap(s => s.polyline_coords)
    : [defaultCenter];

  const activeSegment = (route && activeStepIndex !== undefined && route.segments[activeStepIndex]) 
    ? route.segments[activeStepIndex] 
    : null;

  const activeStepCoord = activeSegment?.start_location;

  const getTransportColor = (mode: TransportMode) => {
    switch (mode) {
      case 'walk': return '#34d399';
      case 'bus': return '#38bdf8';
      case 'metro': return '#a855f7';
      case 'auto': return '#fbbf24';
      default: return '#38bdf8';
    }
  };

  const handleMapClick = (loc: LatLng) => {
    setClickedLocation(loc);
  };

  const handleAddStop = (name: string, loc: LatLng) => {
    if (onAddPointFromMap) onAddPointFromMap(name, loc, 'stop');
    setClickedLocation(null);
  };

  const handleAddLandmark = (name: string, loc: LatLng) => {
    if (onAddPointFromMap) onAddPointFromMap(name, loc, 'landmark');
    setClickedLocation(null);
  };

  return (
    <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-slate-800">
      
      {/* Top Banner Notice for Interactive Pinning */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 border-b border-slate-800 text-[11px] text-sky-300 font-bold flex items-center justify-between z-20 relative">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>INTERACTIVE MAP: Click anywhere on the map to add custom stops or exit landmarks!</span>
        </span>
        <span className="text-slate-400 font-mono text-[10px]">Leaflet + OSRM</span>
      </div>

      <div className={`relative w-full ${heightClass}`}>
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEventsHandler onMapClick={handleMapClick} />
          <MapRecenter coords={allCoords} activeStepCoord={activeStepCoord} />

          {/* Interactive Clicked Pin Marker */}
          {clickedLocation && (
            <Marker position={[clickedLocation.lat, clickedLocation.lng]} icon={clickedIcon}>
              <Popup eventHandlers={{ remove: () => setClickedLocation(null) }}>
                <MapPinPicker
                  location={clickedLocation}
                  onAddStop={handleAddStop}
                  onAddLandmark={handleAddLandmark}
                  onClose={() => setClickedLocation(null)}
                />
              </Popup>
            </Marker>
          )}

          {/* High Precision Live GPS Circle */}
          {liveLocation && (
            <>
              <Circle
                center={[liveLocation.lat, liveLocation.lng]}
                radius={25}
                pathOptions={{
                  color: '#38bdf8',
                  fillColor: '#38bdf8',
                  fillOpacity: 0.15,
                  weight: 1.5
                }}
              />
              <Marker position={[liveLocation.lat, liveLocation.lng]} icon={liveUserIcon}>
                <Popup>
                  <div className="text-xs p-1">
                    <p className="font-bold text-sky-400">High-Precision Live GPS</p>
                    <p className="text-slate-300">Lat: {liveLocation.lat.toFixed(4)}, Lng: {liveLocation.lng.toFixed(4)}</p>
                    <p className="text-emerald-400 text-[10px]">Realtime Tracking Active</p>
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {route && (
            <Marker position={[route.origin_coords.lat, route.origin_coords.lng]} icon={originIcon} draggable={true}>
              <Popup>
                <div className="text-xs p-1">
                  <span className="font-bold text-sky-400">START: </span>
                  <span className="text-slate-200">{route.origin_name}</span>
                </div>
              </Popup>
            </Marker>
          )}

          {route && (
            <Marker position={[route.destination_coords.lat, route.destination_coords.lng]} icon={destIcon} draggable={true}>
              <Popup>
                <div className="text-xs p-1">
                  <span className="font-bold text-emerald-400">DESTINATION: </span>
                  <span className="text-slate-200">{route.destination_name}</span>
                </div>
              </Popup>
            </Marker>
          )}

          {route && route.segments.map((seg, idx) => {
            const positions = seg.polyline_coords.map(c => [c.lat, c.lng] as [number, number]);
            const color = getTransportColor(seg.transport_mode);
            const isSelected = activeStepIndex === idx;

            return (
              <React.Fragment key={seg.id || idx}>
                <Polyline
                  positions={positions}
                  pathOptions={{
                    color,
                    weight: isSelected ? 7 : 4,
                    opacity: isSelected ? 1 : 0.7,
                    dashArray: seg.transport_mode === 'walk' ? '6, 8' : undefined
                  }}
                />

                {seg.landmarks?.map(lm => (
                  <Marker key={lm.id} position={[lm.location.lat, lm.location.lng]} icon={stopIcon}>
                    <Popup>
                      <div className="text-xs p-1 max-w-[200px]">
                        <p className="font-bold text-amber-400">{lm.name}</p>
                        <p className="text-slate-300 text-[11px]">{lm.description}</p>
                        {lm.photo_url && (
                          <img src={lm.photo_url} alt={lm.name} className="w-full h-20 object-cover rounded mt-1.5" />
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </React.Fragment>
            );
          })}
        </MapContainer>

        <div className="absolute bottom-3 left-3 z-[400] glass-panel px-3 py-2 rounded-xl text-[11px] flex items-center gap-3 border border-slate-800 shadow-lg">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Walk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-300">Bus</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">Metro</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
};
