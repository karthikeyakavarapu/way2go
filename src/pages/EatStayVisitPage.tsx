import React, { useState } from 'react';
import { Utensils, Users, Star, MapPin } from 'lucide-react';
import { EatStayVisitService } from '../lib/eatStayVisit';

export const EatStayVisitPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');
  const [activeCategory, setActiveCategory] = useState<'all' | 'eat' | 'stay' | 'visit'>('all');
  const [showRoomSharingModal, setShowRoomSharingModal] = useState(false);

  // Form state for room sharing opt-in
  const [name, setName] = useState('');
  const [dates, setDates] = useState('Aug 15 - Aug 17');
  const [budget, setBudget] = useState(500);
  const [phone, setPhone] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const items = EatStayVisitService.getRecommendations(selectedCity, activeCategory === 'all' ? undefined : activeCategory);
  const roomSharingMatches = EatStayVisitService.getRoomSharingMatches(selectedCity);

  const handlePostRoomShare = (e: React.FormEvent) => {
    e.preventDefault();
    EatStayVisitService.postRoomSharingRequest({
      user_id: `user-${Date.now()}`,
      user_name: name || 'Travelling Commuter',
      destination_city: selectedCity,
      travel_dates: dates,
      budget_per_night_inr: budget,
      contact_phone: phone || '+91 98401 00000'
    });

    setNotice(`Room-sharing listing posted! Nearby travellers going to ${selectedCity} can now match with you.`);
    setShowRoomSharingModal(false);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      
      {/* Header & City Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="font-extrabold text-xl text-slate-100 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-400" />
            <span>EAT, STAY & VISIT RECOMMENDATIONS</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Curated budget food spots, verified stays & room-sharing matcher
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['Chennai', 'Puducherry', 'Hyderabad', 'Bengaluru'].map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold shrink-0 cursor-pointer ${
                selectedCity === city
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs font-bold text-center animate-pulse">
          {notice}
        </div>
      )}

      {/* Category Pills & Room Sharing Trigger */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-3">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
              activeCategory === 'all' ? 'bg-slate-800 text-slate-100 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('eat')}
            className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
              activeCategory === 'eat' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🍴 Eat
          </button>
          <button
            onClick={() => setActiveCategory('stay')}
            className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
              activeCategory === 'stay' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏨 Stay
          </button>
          <button
            onClick={() => setActiveCategory('visit')}
            className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
              activeCategory === 'visit' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏛️ Visit
          </button>
        </div>

        <button
          onClick={() => setShowRoomSharingModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Users className="w-3.5 h-3.5" />
          <span>ROOM SHARING MATCHER</span>
        </button>
      </div>

      {/* Room Sharing Active Matches Banner */}
      {roomSharingMatches.length > 0 && (
        <div className="glass-panel p-4 rounded-3xl border border-purple-500/40 bg-slate-950/90 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>ROOM-SHARING MATCHES FOR {selectedCity.toUpperCase()} ({roomSharingMatches.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
              SPLIT LODGING COSTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {roomSharingMatches.map(m => (
              <div key={m.id} className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-200">{m.user_name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Dates: {m.travel_dates}</p>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">Budget: ₹{m.budget_per_night_inr}/night</span>
                </div>
                <button
                  onClick={() => alert(`Connect with ${m.user_name} at ${m.contact_phone} for room sharing!`)}
                  className="px-3 py-1 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-[11px] shrink-0 cursor-pointer"
                >
                  CONNECT
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="glass-panel p-4 rounded-3xl border border-slate-800 bg-slate-950 space-y-3 shadow-xl">
            <div className="relative h-40 rounded-2xl overflow-hidden">
              <img src={item.photo_url} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-slate-200 font-mono font-bold text-[10px] border border-slate-700 uppercase">
                {item.type}
              </span>
              <span className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-emerald-400 font-mono font-bold text-[11px] border border-emerald-500/30">
                {item.price_tag}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-100">{item.title}</h3>
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {item.rating}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{item.description}</p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
              <span className="text-[11px] text-sky-400 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location_name}</span>
              </span>

              {item.room_sharing_available && (
                <span className="text-[10px] text-purple-300 font-mono font-bold bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                  Room Sharing Opt-In
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Room Sharing Modal */}
      {showRoomSharingModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-purple-500/40 bg-slate-950 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-lg text-slate-100">POST ROOM-SHARING REQUEST</h3>
            <p className="text-xs text-slate-400">Find compatible travellers going to {selectedCity} to split hotel/hostel costs.</p>

            <form onSubmit={handlePostRoomShare} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karthik"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Travel Dates</label>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="e.g. Aug 15 - Aug 17"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Budget / Night (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value) || 500)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRoomSharingModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold"
                >
                  POST LISTING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
