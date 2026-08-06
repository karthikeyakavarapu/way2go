import React, { useState } from 'react';
import { Users, CheckCircle2, ShieldCheck, Clock, ArrowRight, Plus } from 'lucide-react';
import { GroupTravelService } from '../lib/groupTravel';
import { useAuth } from '../context/AuthContext';
import type { GroupRequest, OperatorOffer } from '../types';

export const GroupTravelPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<GroupRequest[]>(() => GroupTravelService.getGroupRequests());
  const [selectedRequest, setSelectedRequest] = useState<GroupRequest | null>(requests[0] || null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [origin, setOrigin] = useState('SRM Ramapuram Campus');
  const [destination, setDestination] = useState('Puducherry Bus Stand');
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [passengerCount, setPassengerCount] = useState(25);
  const [budgetPerPerson, setBudgetPerPerson] = useState(1000);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const offers: OperatorOffer[] = selectedRequest 
    ? GroupTravelService.getOperatorOffers(selectedRequest.id)
    : [];

  const handleCreateGroupRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = GroupTravelService.createGroupRequest({
      user_id: user?.id || 'user-anon',
      user_name: user?.full_name || 'Traveller',
      user_email: user?.email || 'karthikeyakavarapu@gmail.com',
      origin,
      destination,
      travel_date: travelDate,
      passenger_count: passengerCount,
      max_budget_per_person_inr: budgetPerPerson
    });

    setRequests(GroupTravelService.getGroupRequests());
    setSelectedRequest(newReq);
    setShowCreateModal(false);
    setSuccessNotice(`Group travel request created for ${passengerCount} passengers! Operators will submit quotes shortly.`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  return (
    <div className="space-y-6 py-4 max-w-2xl mx-auto">
      
      {/* 1. Header & Group CTA */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/40 bg-slate-950 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-100">
                Travelling with a Group?
              </h1>
              <p className="text-xs text-slate-400">
                Book 20-35 seat buses & tourist vans with verified operator quotes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Request Group Quote</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* 2. Active Group Requests Tabs */}
      <div className="space-y-3">
        <h2 className="font-extrabold text-sm text-slate-200">
          YOUR GROUP TRAVEL REQUESTS
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {requests.map((req) => (
            <button
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className={`p-3 rounded-2xl border text-left text-xs shrink-0 transition-all cursor-pointer ${
                selectedRequest?.id === req.id
                  ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500/30'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-extrabold text-slate-100 truncate max-w-[200px]">
                {req.origin} ➔ {req.destination}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                👥 {req.passenger_count} people • 📅 {req.travel_date}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Operator Offers Marketplace for Selected Request */}
      {selectedRequest && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h3 className="font-extrabold text-sm text-slate-200">
              VERIFIED OPERATOR OFFERS ({offers.length})
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              ADMIN APPROVED OFFERS ONLY
            </span>
          </div>

          {offers.length === 0 ? (
            <div className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
              <Clock className="w-7 h-7 text-slate-500 mx-auto" />
              <h4 className="font-extrabold text-sm text-slate-200">Waiting for Verified Operators</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Verified travel partners are reviewing your request. Quotes will appear here once approved by Admin.
              </p>
            </div>
          ) : (
            offers.map((offer) => (
              <div
                key={offer.id}
                className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-slate-950 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-slate-100">{offer.operator_name}</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified Operator
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      ⭐ {offer.rating} Rating • Departs at {offer.departure_time}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono block">
                      ₹{offer.price_per_person_inr}/person
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Total: ₹{offer.price_total_inr.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-2xl border border-slate-800 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Vehicle Type</span>
                    <span className="font-bold text-slate-200">{offer.vehicle_type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Cancellation Policy</span>
                    <span className="font-bold text-slate-200">{offer.cancellation_policy}</span>
                  </div>
                </div>

                {/* Booking CTA */}
                <button
                  onClick={() => alert(`Booking request for ${offer.operator_name} submitted! Operator contact: ${offer.operator_phone}`)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>REQUEST BOOKING (₹{offer.price_per_person_inr}/person)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal: Create Group Request */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-sky-500/40 bg-slate-950 space-y-4 shadow-2xl">
            <h2 className="font-extrabold text-xl text-slate-100">
              Request Group Travel Quote
            </h2>

            <form onSubmit={handleCreateGroupRequest} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Origin</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">No. of Passengers</label>
                  <input
                    type="number"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Max Budget per Person (₹)</label>
                <input
                  type="number"
                  value={budgetPerPerson}
                  onChange={(e) => setBudgetPerPerson(parseInt(e.target.value) || 500)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-extrabold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold cursor-pointer shadow-lg shadow-sky-500/25"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
