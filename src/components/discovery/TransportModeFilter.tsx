import React from 'react';
import { Bus, Train, Footprints, Car, Layers } from 'lucide-react';

interface TransportModeFilterProps {
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

export const TransportModeFilter: React.FC<TransportModeFilterProps> = ({ selectedMode, onSelectMode }) => {
  const modes = [
    { id: 'all', label: 'All Modes', icon: Layers },
    { id: 'bus', label: 'MTC Bus Only', icon: Bus },
    { id: 'metro', label: 'Metro', icon: Train },
    { id: 'walk_bus', label: 'Walk + Bus', icon: Footprints },
    { id: 'auto', label: 'Share Auto', icon: Car },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {modes.map((m) => {
        const Icon = m.icon;
        const isSelected = selectedMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelectMode(m.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              isSelected
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
};
