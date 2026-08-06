import React from 'react';
import { AlertTriangle, ShieldCheck, RefreshCw, ShieldAlert } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

interface DeviationAlertProps {
  onClose: () => void;
}

export const DeviationAlert: React.FC<DeviationAlertProps> = ({ onClose }) => {
  const { triggerSOS } = useJourney();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-amber-500/40 bg-slate-900/95 space-y-4 shadow-2xl animate-bounce-short">
        
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="font-extrabold text-lg text-slate-100">
            Route Deviation Detected
          </h3>
          <p className="text-xs text-slate-300">
            Your current location differs from the planned community route path. Are you okay?
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>I'M SAFE (TAKING DETOUR)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>UPDATE ROUTE TO NEW DESTINATION</span>
          </button>

          <button
            onClick={() => {
              triggerSOS();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>NEED LOCAL HELP / TRIGGER SOS</span>
          </button>
        </div>

      </div>
    </div>
  );
};
