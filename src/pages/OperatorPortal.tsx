import React, { useState } from 'react';
import { Bus, Send, CheckCircle2 } from 'lucide-react';
import { GroupTravelService } from '../lib/groupTravel';
import { useAuth } from '../context/AuthContext';
import type { GroupRequest } from '../types';

export const OperatorPortal: React.FC = () => {
  const { user } = useAuth();
  const [requests] = useState<GroupRequest[]>(() => GroupTravelService.getGroupRequests());
  const [selectedRequest, setSelectedRequest] = useState<GroupRequest | null>(requests[0] || null);

  const [vehicleType, setVehicleType] = useState('30-Seat AC Luxury Coach Bus');
  const [capacity, setCapacity] = useState(30);
  const [totalPrice, setTotalPrice] = useState(25000);
  const [departureTime, setDepartureTime] = useState('07:00 AM');
  const [notice, setNotice] = useState<string | null>(null);

  const commission = GroupTravelService.calculateCommission(totalPrice);

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    GroupTravelService.submitOperatorOffer(
      selectedRequest.id,
      {
        id: 'op-logged-in',
        name: user?.full_name || 'Verified Bus Travels Partner',
        phone: '+91 98401 23456'
      },
      vehicleType,
      capacity,
      totalPrice,
      departureTime
    );

    setNotice(`Offer of ₹${totalPrice.toLocaleString()} submitted to Admin for verification! Net payout: ₹${commission.netOperatorINR.toLocaleString()}`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6 py-4 max-w-3xl mx-auto">
      
      {/* 1. Operator Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-indigo-500/40 bg-slate-950 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold shadow-lg">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-100">
                TRAVEL PARTNER OPERATOR PORTAL
              </h1>
              <p className="text-xs text-slate-400">
                Submit quotes for group travel requests & track platform earnings.
              </p>
            </div>
          </div>

          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold">
            VERIFIED OPERATOR
          </span>
        </div>
      </div>

      {notice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* 2. Open Group Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Open Requests */}
        <div className="md:col-span-5 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-200">
            OPEN GROUP REQUESTS ({requests.length})
          </h2>

          <div className="space-y-2">
            {requests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  selectedRequest?.id === req.id
                    ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500/30 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-extrabold text-slate-100">
                  <span>{req.origin} ➔ {req.destination}</span>
                  <span className="text-[10px] font-mono text-emerald-400">👥 {req.passenger_count}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Travel Date: {req.travel_date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Submit Offer Form with Transparent Commission */}
        <div className="md:col-span-7">
          {selectedRequest ? (
            <div className="glass-panel p-5 rounded-3xl border border-sky-500/40 bg-slate-950 space-y-4 shadow-xl">
              <h3 className="font-extrabold text-base text-slate-100 border-b border-slate-900 pb-3">
                SUBMIT QUOTE FOR: {selectedRequest.origin} ➔ {selectedRequest.destination}
              </h3>

              <form onSubmit={handleSubmitOffer} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Vehicle Type & Description</label>
                  <input
                    type="text"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    placeholder="e.g. 30-Seat AC Bus"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Seating Capacity</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Departure Time</label>
                    <input
                      type="text"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      placeholder="07:00 AM"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Total Quote Price (₹)</label>
                  <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono font-bold"
                    required
                  />
                </div>

                {/* Transparent Financial Commission Breakdown */}
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>Total Customer Quote:</span>
                    <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>Platform Fee ({commission.percent}%):</span>
                    <span className="font-bold">- ₹{commission.commissionINR.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 pt-1 border-t border-slate-800 font-extrabold text-xs">
                    <span>Net Operator Payout:</span>
                    <span>₹{commission.netOperatorINR.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT OFFER FOR ADMIN APPROVAL</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl text-center text-slate-400 text-xs">
              Select a group request from the left list to submit an offer.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
