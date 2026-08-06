import React from 'react';
import { ShieldAlert, PhoneCall, X, MapPin } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

interface SOSModalProps {
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ onClose }) => {
  const { safeJourney } = useJourney();

  return (
    <div className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-rose-500/60 bg-slate-950 space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-rose-600/30 border border-rose-500 text-rose-500 mx-auto flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-extrabold text-2xl text-rose-400 tracking-tight">
            EMERGENCY SOS ACTIVE
          </h2>
          <p className="text-xs text-slate-300">
            Emergency alert broadcast to your trusted contact ({safeJourney?.trusted_contacts[0]?.name || 'Emergency Contact'}) with your live GPS location.
          </p>
        </div>

        {/* Live Location Coordinates Share */}
        <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-500/30 text-xs text-center space-y-1">
          <span className="text-slate-400 font-semibold flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Live Coordinates Transmitted:
          </span>
          <span className="font-mono text-white font-bold block">
            13.0336° N, 80.1802° E (Near SRM Ramapuram Gate 2)
          </span>
        </div>

        {/* Quick Emergency Hotlines */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 block">Quick Emergency Hotline Dialers:</span>
          
          <a
            href="tel:112"
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>DIAL 112 NATIONAL EMERGENCY RESPONSE</span>
          </a>

          <a
            href="tel:1091"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>DIAL 1091 WOMEN HELPLINE</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 text-center block"
        >
          I am safe now / Cancel SOS
        </button>

      </div>
    </div>
  );
};
