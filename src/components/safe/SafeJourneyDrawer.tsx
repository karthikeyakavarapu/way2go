import React, { useState } from 'react';
import { ShieldCheck, Battery, ShieldAlert } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { DeviationAlert } from './DeviationAlert';
import { SOSModal } from './SOSModal';

export const SafeJourneyDrawer: React.FC = () => {
  const { safeJourney, startSafeJourney, triggerSOS, endSafeJourney } = useJourney();

  const [originInput, setOriginInput] = useState('SRM Ramapuram');
  const [destInput, setDestInput] = useState('Marina Beach');
  const [contactName, setContactName] = useState('Parent / Emergency Contact');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [showSosModal, setShowSosModal] = useState(false);
  const [showDeviationPrompt, setShowDeviationPrompt] = useState(false);

  const handleStartSafe = (e: React.FormEvent) => {
    e.preventDefault();
    startSafeJourney(originInput, destInput, contactName, contactPhone);
  };

  return (
    <div className="space-y-6">
      {!safeJourney ? (
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl text-slate-100">
                START SAFE JOURNEY MODE
              </h2>
              <p className="text-xs text-slate-400">
                Share private live route progress with your selected trusted contacts. Includes arrival reminders, route deviation prompts, and zero-public location exposure.
              </p>
            </div>
          </div>

          <form onSubmit={handleStartSafe} className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Origin</label>
                <input
                  type="text"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Destination</label>
                <input
                  type="text"
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Trusted Contact Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Trusted Phone / Email</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>START SAFE JOURNEY SESSION</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/50 bg-slate-900/90 space-y-6 shadow-2xl">
          
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse" />
              <span className="font-extrabold text-sm text-indigo-300 uppercase tracking-wider">
                SAFE JOURNEY ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-500/30">
              <Battery className="w-3.5 h-3.5" />
              <span>{safeJourney.battery_percentage}%</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Route:</span>
              <span className="text-slate-200 font-bold">{safeJourney.origin} → {safeJourney.destination}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">ETA:</span>
              <span className="text-sky-400 font-bold">{safeJourney.expected_arrival_time}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Sharing With:</span>
              <span className="text-emerald-400 font-bold">{safeJourney.trusted_contacts[0]?.name} ({safeJourney.trusted_contacts[0]?.phone_or_email})</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
            <span className="text-slate-400 font-semibold block">Demo Simulation Controls:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeviationPrompt(true)}
                className="px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold hover:bg-amber-500/30 transition-colors"
              >
                Simulate Route Deviation
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                triggerSOS();
                setShowSosModal(true);
              }}
              className="flex-1 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>EMERGENCY SOS</span>
            </button>

            <button
              onClick={endSafeJourney}
              className="flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
            >
              ARRIVED / END JOURNEY
            </button>
          </div>

        </div>
      )}

      {showDeviationPrompt && (
        <DeviationAlert onClose={() => setShowDeviationPrompt(false)} />
      )}

      {showSosModal && (
        <SOSModal onClose={() => setShowSosModal(false)} />
      )}
    </div>
  );
};
