import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, PhoneCall, Radio, Users, CheckCircle2, HeartHandshake } from 'lucide-react';
import { SOSService } from '../lib/sosService';
import { useAuth } from '../context/AuthContext';
import type { SOSHelpRequest } from '../types';

export const SafetySOSPage: React.FC = () => {
  const { user } = useAuth();
  const [isLiveSharingActive, setIsLiveSharingActive] = useState(false);
  const [sosRequests, setSosRequests] = useState<SOSHelpRequest[]>(() => SOSService.getSOSRequests());
  const [helpMessage, setHelpMessage] = useState('Dim street light. Looking for walking companion to Guindy bus shelter.');
  const [notice, setNotice] = useState<string | null>(null);

  const handlePingNearbyUsers = (e: React.FormEvent) => {
    e.preventDefault();
    SOSService.dispatchSOS(
      user?.id || 'u-commuter',
      user?.full_name || 'Travelling Commuter',
      '+91 98401 00000',
      'Near Guindy Bus Shelter',
      { lat: 13.0067, lng: 80.2021 },
      helpMessage
    );

    setSosRequests(SOSService.getSOSRequests());
    setNotice(`🆘 REALTIME SOS PING SENT! Nearby opted-in app users within 3.0 km have been notified.`);
    setTimeout(() => setNotice(null), 5000);
  };

  const handleResolveSOS = (id: string) => {
    SOSService.resolveSOS(id);
    setSosRequests(SOSService.getSOSRequests());
  };

  return (
    <div className="space-y-6 py-4 max-w-xl mx-auto">
      
      {/* Header & Live Location Sharing Toggle Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-rose-500/40 bg-slate-950 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-100">SAFETY & EMERGENCY HUB</h1>
              <p className="text-xs text-slate-400 font-mono">Live location sharing & 3 km nearby user help</p>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={() => setIsLiveSharingActive(!isLiveSharingActive)}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                isLiveSharingActive
                  ? 'bg-rose-500 text-white shadow-lg animate-pulse'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {isLiveSharingActive ? '🟢 SHARING LIVE' : '⚪ START SHARING'}
            </button>
          </div>
        </div>

        {isLiveSharingActive && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-2xl text-xs space-y-1 text-rose-300">
            <p className="font-bold flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-rose-400 animate-spin" />
              <span>Live GPS location is currently shared with trusted emergency contacts.</span>
            </p>
            <p className="text-[11px] text-slate-400 font-mono">Expected destination arrival ping active.</p>
          </div>
        )}
      </div>

      {notice && (
        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-2xl text-rose-300 text-xs font-bold text-center animate-pulse shadow-lg">
          {notice}
        </div>
      )}

      {/* Ping Nearby App Users for Quick-Help Card */}
      <div className="glass-panel p-5 rounded-3xl border border-sky-500/40 bg-slate-950/95 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <h2 className="font-extrabold text-sm text-sky-400 uppercase tracking-wide flex items-center gap-2">
            <HeartHandshake className="w-4.5 h-4.5 text-sky-400" />
            <span>PING NEARBY APP USERS (3.0 KM RADIUS)</span>
          </h2>
          <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/30">
            COMMUNITY HELP
          </span>
        </div>

        <form onSubmit={handlePingNearbyUsers} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">What kind of assistance do you need?</label>
            <input
              type="text"
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-slate-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 hover:from-rose-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-xl shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertTriangle className="w-4.5 h-4.5 text-white" />
            <span>BROADCAST 3 KM NEARBY HELP PING</span>
          </button>
        </form>
      </div>

      {/* Active Nearby Requests Stream */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-xs text-slate-300 uppercase tracking-wide">
          ACTIVE NEARBY HELP REQUESTS ({sosRequests.filter(r => r.status === 'active').length})
        </h3>

        <div className="space-y-2.5">
          {sosRequests.map(req => (
            <div
              key={req.id}
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                req.status === 'active'
                  ? 'bg-rose-950/40 border-rose-500/40 text-slate-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-100 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>{req.user_name}</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-400">
                  {req.status === 'active' ? '🔴 ACTIVE PING' : '🟢 RESOLVED'}
                </span>
              </div>

              <p className="text-slate-300 leading-snug">{req.message}</p>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-mono">
                <span className="text-slate-400">📍 {req.location_name}</span>
                {req.status === 'active' && (
                  <button
                    onClick={() => handleResolveSOS(req.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>MARK SAFE</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-Dial Official Emergency Helpline Numbers */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-950 space-y-3">
        <h3 className="font-extrabold text-xs text-slate-300 uppercase tracking-wide">
          OFFICIAL EMERGENCY HELPLINE NUMBERS
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 text-slate-200 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span className="font-extrabold">112</span>
            <span className="text-[9px] text-slate-400">National Emergency</span>
          </a>

          <a
            href="tel:108"
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 text-slate-200 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span className="font-extrabold">108</span>
            <span className="text-[9px] text-slate-400">Ambulance</span>
          </a>

          <a
            href="tel:1091"
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center gap-1 text-slate-200 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-purple-400" />
            <span className="font-extrabold">1091</span>
            <span className="text-[9px] text-slate-400">Women Helpline</span>
          </a>
        </div>
      </div>

    </div>
  );
};
