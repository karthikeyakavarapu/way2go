import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import type { LatLng } from '../../types';

interface MapPinPickerProps {
  location: LatLng;
  onAddStop: (name: string, location: LatLng) => void;
  onAddLandmark: (name: string, location: LatLng) => void;
  onClose: () => void;
}

export const MapPinPicker: React.FC<MapPinPickerProps> = ({
  location,
  onAddStop,
  onAddLandmark,
  onClose
}) => {
  const [pointName, setPointName] = useState('');
  const [pointType, setPointType] = useState<'stop' | 'landmark'>('stop');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = pointName.trim() || (pointType === 'stop' ? 'Bus Stop' : 'Visual Landmark');
    if (pointType === 'stop') {
      onAddStop(name, location);
    } else {
      onAddLandmark(name, location);
    }
    onClose();
  };

  return (
    <div className="p-2 space-y-3 max-w-[240px] text-xs font-sans">
      <div className="flex items-center gap-1.5 font-extrabold text-sky-400 border-b border-slate-700/60 pb-1.5">
        <MapPin className="w-4 h-4 text-emerald-400" />
        <span>MAP CLICKED PIN</span>
      </div>

      <p className="text-[10px] text-slate-300 font-mono">
        Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="text-[10px] text-slate-400 font-semibold block mb-1">Point Name</label>
          <input
            type="text"
            value={pointName}
            onChange={(e) => setPointName(e.target.value)}
            placeholder="e.g. SRM Gate 2 / Bus Stop"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-semibold block mb-1">Point Category</label>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setPointType('stop')}
              className={`py-1 px-2 rounded text-[10px] font-bold border transition-all ${
                pointType === 'stop' ? 'bg-sky-500/30 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Bus Stop
            </button>
            <button
              type="button"
              onClick={() => setPointType('landmark')}
              className={`py-1 px-2 rounded text-[10px] font-bold border transition-all ${
                pointType === 'landmark' ? 'bg-amber-500/30 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Landmark
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD POINT TO ROUTE</span>
        </button>
      </form>
    </div>
  );
};
