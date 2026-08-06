import React, { useState } from 'react';
import { Footprints, Bus, Train, CheckCircle2, AlertTriangle, Image as ImageIcon, Sparkles, MapPin, Printer } from 'lucide-react';
import type { RouteGuide, TransportMode } from '../../types';
import { useJourney } from '../../context/JourneyContext';
import { AudioVoicePlayer } from './AudioVoicePlayer';
import { PrintableRouteModal } from './PrintableRouteModal';

interface RouteGuideStepsProps {
  route: RouteGuide;
  activeStepIndex: number;
  onSelectStepIndex: (idx: number) => void;
  onOpenMediaModal?: (url: string, caption: string) => void;
}

export const RouteGuideSteps: React.FC<RouteGuideStepsProps> = ({
  route,
  activeStepIndex,
  onSelectStepIndex,
  onOpenMediaModal
}) => {
  const { firstTimeMode, setFirstTimeMode, confirmRoute } = useJourney();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<'worked' | 'changed' | 'failed'>('worked');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-400" />;
      case 'bus': return <Bus className="w-4 h-4 text-sky-400" />;
      case 'metro': return <Train className="w-4 h-4 text-purple-400" />;
      default: return <Bus className="w-4 h-4 text-sky-400" />;
    }
  };

  const handleConfirmSubmit = () => {
    confirmRoute(route.id, confirmStatus);
    setShowConfirmModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                {route.confidence_score}% VERIFIED CONFIDENCE
              </span>
              <span className="text-[10px] text-sky-300 bg-sky-950/40 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold">
                {route.primary_source_label || 'SOURCE: Community Verified'}
              </span>
            </div>
            <h2 className="font-extrabold text-xl text-slate-100 mt-1">
              {route.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrintModal(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              title="Printable Route Guide"
            >
              <Printer className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              ₹{route.total_cost_inr} • {route.total_duration_minutes} min • {route.total_distance_km} km
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {route.tagline}
        </p>

        <div className="flex items-center justify-between bg-sky-950/30 border border-sky-500/30 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <div>
              <span className="font-extrabold text-xs text-sky-200">NEW TO THIS ROUTE?</span>
              <p className="text-[10px] text-slate-400">Simplified beginner steps in plain English</p>
            </div>
          </div>
          <button
            onClick={() => setFirstTimeMode(!firstTimeMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              firstTimeMode 
                ? 'bg-sky-500 text-white shadow shadow-sky-500/30' 
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {firstTimeMode ? 'ON (Beginner)' : 'OFF (Full)'}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400">Travelled this route recently?</span>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm Route Info</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider px-1">
          STEP-BY-STEP TRANSIT GUIDE ({route.segments.length} STEPS)
        </h3>

        {route.segments.map((seg, idx) => {
          const isSelected = activeStepIndex === idx;

          return (
            <div
              key={seg.id || idx}
              onClick={() => onSelectStepIndex(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'glass-panel border-sky-500/60 bg-slate-900/90 shadow-xl ring-1 ring-sky-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {getTransportIcon(seg.transport_mode)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Step {seg.step_number} • {seg.transport_mode}
                      </span>
                      <span className="text-[9px] text-sky-400 bg-sky-950/50 px-1.5 py-0.5 rounded font-mono">
                        {seg.source_label || 'SOURCE: Community Verified'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-100 mt-0.5">
                      {seg.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AudioVoicePlayer textToSpeak={seg.instruction_full} />
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {seg.estimated_minutes} min • {seg.is_fare_available === false ? 'Fare N/A' : `₹${seg.estimated_cost_inr}`}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono">
                {firstTimeMode ? (
                  <div className="whitespace-pre-line text-sky-300 font-sans">
                    {seg.instruction_simplified}
                  </div>
                ) : (
                  <div>{seg.instruction_full}</div>
                )}
              </div>

              {seg.stops && seg.stops.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">Boarding & Stop Details:</span>
                  <div className="flex flex-wrap gap-2">
                    {seg.stops.map(stop => (
                      <div key={stop.id} className="bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-xs flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        <span className="font-bold text-slate-200">{stop.name}</span>
                        {stop.route_numbers && (
                          <span className="bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                            Bus {stop.route_numbers.join(', ')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {seg.media && seg.media.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">Photo Verification:</span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {seg.media.map(item => (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenMediaModal) onOpenMediaModal(item.url, item.caption);
                        }}
                        className="relative group shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-slate-800 cursor-pointer"
                      >
                        <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {seg.tips && seg.tips.length > 0 && (
                <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20 space-y-1">
                  {seg.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-slate-700 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-base text-slate-100">Confirm Route Reliability</h3>
            <p className="text-xs text-slate-400">Did this route information work accurately for your journey?</p>

            <div className="space-y-2">
              <button
                onClick={() => setConfirmStatus('worked')}
                className={`w-full p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between ${
                  confirmStatus === 'worked' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <span>Worked perfectly!</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => setConfirmStatus('changed')}
                className={`w-full p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between ${
                  confirmStatus === 'changed' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <span>Bus number or stop changed</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Submit Confirmation
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrintModal && (
        <PrintableRouteModal
          route={route}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
