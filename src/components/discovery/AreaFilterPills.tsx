import React from 'react';
import { MapPin } from 'lucide-react';

interface AreaFilterPillsProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export const AREA_OPTIONS = [
  'All Areas',
  'Chennai - Ramapuram',
  'Chennai - Guindy',
  'Chennai - Besant Nagar',
  'Chennai - Central',
  'Bangalore - Indiranagar',
  'Hyderabad - Gachibowli',
  'Madurai'
];

export const AreaFilterPills: React.FC<AreaFilterPillsProps> = ({
  selectedArea,
  onSelectArea
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold px-2 shrink-0">
        <MapPin className="w-3.5 h-3.5" />
        <span>Registered Area:</span>
      </div>

      {AREA_OPTIONS.map((areaOption) => {
        const isSelected = selectedArea === areaOption;
        return (
          <button
            key={areaOption}
            onClick={() => onSelectArea(areaOption)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              isSelected
                ? 'bg-sky-500 text-white font-bold shadow shadow-sky-500/30 ring-2 ring-sky-400'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {areaOption}
          </button>
        );
      })}
    </div>
  );
};
