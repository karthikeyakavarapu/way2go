import React, { useState } from 'react';
import { ShieldAlert, Plus, MapPin, Clock, ThumbsUp } from 'lucide-react';

export interface RoadIncident {
  id: string;
  type: 'accident' | 'broken_road' | 'scam' | 'traffic_jam' | 'waterlogging';
  title: string;
  location: string;
  description: string;
  detour_advice: string;
  reported_at: string;
  severity: 'high' | 'medium' | 'low';
  confirmations_count: number;
}

const INITIAL_INCIDENTS: RoadIncident[] = [
  {
    id: 'inc-1',
    type: 'accident',
    title: 'Multi-Vehicle Collision on GST Road Flyover',
    location: 'Near Guindy Kathipara Junction, Chennai',
    description: 'Heavy traffic blockage on northbound lane due to a truck-cab accident. Emergency services on scene.',
    detour_advice: 'Take Mount-Poonamallee Road or switch to Chennai Metro (Guindy ➔ Airport) to bypass 45 min delay.',
    reported_at: '12 mins ago',
    severity: 'high',
    confirmations_count: 34
  },
  {
    id: 'inc-2',
    type: 'broken_road',
    title: 'Deep Unpaved Trenches & Open Potholes on Service Lane',
    location: 'SRM Ramapuram Main Road Exit Gate 2',
    description: 'Underground cable work has left dangerous gravel and 6-inch deep pits, hazardous for two-wheelers at night.',
    detour_advice: 'Walk along the paved footpath near the tea stall or use Gate 1 entrance.',
    reported_at: '45 mins ago',
    severity: 'medium',
    confirmations_count: 18
  },
  {
    id: 'inc-3',
    type: 'scam',
    title: 'Auto Driver Overcharging & Fake Meter Scam Hotspot',
    location: 'Chennai Central Railway Station Gate 3 & Koyambedu CMBT',
    description: 'Unauthorized touts demanding ₹350 - ₹500 for a ₹90 ride to T. Nagar, claiming buses are not running.',
    detour_advice: 'Walk directly to the Official Prepaid Auto Booth inside the station or board MTC Bus 29C for ₹15.',
    reported_at: '1 hour ago',
    severity: 'medium',
    confirmations_count: 27
  }
];

export const RoadIncidentAlerts: React.FC = () => {
  const [incidents, setIncidents] = useState<RoadIncident[]>(INITIAL_INCIDENTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'accident' | 'broken_road' | 'scam'>('all');
  const [showReportModal, setShowReportModal] = useState(false);

  // Form states
  const [newType, setNewType] = useState<'accident' | 'broken_road' | 'scam' | 'traffic_jam' | 'waterlogging'>('accident');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDetour, setNewDetour] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newInc: RoadIncident = {
      id: `inc-${Date.now()}`,
      type: newType,
      title: newTitle,
      location: newLocation,
      description: newDescription || 'Reported by commuter via WAY2GO Early Warning Radar.',
      detour_advice: newDetour || 'Use alternative transit route or metro corridor.',
      reported_at: 'Just now',
      severity: newType === 'accident' ? 'high' : 'medium',
      confirmations_count: 1
    };

    setIncidents([newInc, ...incidents]);
    setShowReportModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
    setNewDetour('');

    // Trigger browser notification if granted
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(`🚨 Road Alert: ${newInc.title}`, {
        body: `${newInc.location} — ${newInc.detour_advice}`,
        icon: '/vite.svg'
      });
    }

    setToastMessage('INCIDENT BROADCASTED TO NEARBY COMMUTERS!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirm = (id: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, confirmations_count: inc.confirmations_count + 1 } : inc));
  };

  const filtered = incidents.filter(inc => {
    if (activeFilter === 'all') return true;
    return inc.type === activeFilter;
  });

  const getTypeBadge = (type: RoadIncident['type']) => {
    switch (type) {
      case 'accident':
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono">🚨 ACCIDENT / CRASH</span>;
      case 'broken_road':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono">🚧 BROKEN ROAD / HAZARD</span>;
      case 'scam':
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono">⚠️ SCAM / OVERCHARGE</span>;
      case 'traffic_jam':
        return <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono">🛑 TRAFFIC CHOKEPOINT</span>;
      case 'waterlogging':
        return <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono">🌧️ FLOOD / WATERLOGGED</span>;
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-500 text-white p-3 rounded-2xl text-xs font-extrabold text-center shadow-2xl animate-bounce-short">
          {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-rose-500/40 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-100">
              ROAD SAFETY & DANGER RADAR
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Accidents, broken roads & scam prevention alerts
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>REPORT DANGER IN 5s</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            activeFilter === 'all' ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          All Warnings ({incidents.length})
        </button>

        <button
          onClick={() => setActiveFilter('accident')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            activeFilter === 'accident' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-900 text-rose-400 border border-slate-800'
          }`}
        >
          🚨 Accidents
        </button>

        <button
          onClick={() => setActiveFilter('broken_road')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            activeFilter === 'broken_road' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-900 text-amber-400 border border-slate-800'
          }`}
        >
          🚧 Broken Roads
        </button>

        <button
          onClick={() => setActiveFilter('scam')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            activeFilter === 'scam' ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-900 text-purple-400 border border-slate-800'
          }`}
        >
          ⚠️ Auto Scams
        </button>
      </div>

      {/* Live Warning Cards Stream */}
      <div className="space-y-3">
        {filtered.map(inc => (
          <div
            key={inc.id}
            className={`glass-panel p-4 sm:p-5 rounded-3xl border space-y-3 shadow-xl ${
              inc.severity === 'high' ? 'border-rose-500/40 bg-slate-950/95' : 'border-slate-800 bg-slate-950/90'
            }`}
          >
            <div className="flex items-center justify-between">
              {getTypeBadge(inc.type)}
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {inc.reported_at}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-100">{inc.title}</h3>
              <p className="text-xs text-sky-400 font-mono flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{inc.location}</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
              {inc.description}
            </p>

            {/* Detour / Prevention Advice */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-xs space-y-1">
              <span className="font-extrabold text-emerald-400 block uppercase font-mono text-[10px]">
                🛡️ AI Detour & Safety Advice:
              </span>
              <p className="text-slate-200 leading-snug">{inc.detour_advice}</p>
            </div>

            {/* Bottom Confirmations */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
              <span className="text-[11px] font-mono text-slate-400">
                {inc.confirmations_count} commuters confirmed
              </span>

              <button
                onClick={() => handleConfirm(inc.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONFIRM HAZARD</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Danger Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/40 bg-slate-950 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-lg text-slate-100">
              Report Road Danger / Scam (5s Quick Post)
            </h3>

            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Incident Type</label>
                <select
                  value={newType}
                  onChange={(e: any) => setNewType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-semibold"
                >
                  <option value="accident">🚨 Accident / Collision</option>
                  <option value="broken_road">🚧 Broken Road / Deep Pothole</option>
                  <option value="scam">⚠️ Fake Meter / Auto Scam</option>
                  <option value="traffic_jam">🛑 Severe Traffic Chokepoint</option>
                  <option value="waterlogging">🌧️ Waterlogging / Flood</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Headline / What Happened?</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Bus breakdown causing 1km queue"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Exact Location / Landmark</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Porur Toll Gate, Chennai"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Detour Suggestion (Optional)</label>
                <input
                  type="text"
                  value={newDetour}
                  onChange={(e) => setNewDetour(e.target.value)}
                  placeholder="e.g. Take interior bypass road via Arcot Road"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-semibold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs shadow-lg cursor-pointer"
                >
                  BROADCAST ALERT NOW
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-3 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
