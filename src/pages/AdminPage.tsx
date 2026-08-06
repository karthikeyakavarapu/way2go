import React, { useState } from 'react';
import { DeveloperVerificationPortal } from '../components/admin/DeveloperVerificationPortal';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { GroupTravelService } from '../lib/groupTravel';
import { TravelReelsService } from '../lib/reels';
import { CheckCircle2, DollarSign, Bus, Video, Trash2 } from 'lucide-react';
import type { OperatorOffer, TravelReel } from '../types';

export const AdminPage: React.FC = () => {
  const [offers, setOffers] = useState<OperatorOffer[]>(() => GroupTravelService.getOperatorOffers());
  const [reels, setReels] = useState<TravelReel[]>(() => TravelReelsService.getReels(undefined, true));
  const [commissionRate, setCommissionRate] = useState(8);
  const [notice, setNotice] = useState<string | null>(null);

  const handleApproveOffer = (offerId: string) => {
    GroupTravelService.adminApproveOffer(offerId);
    setOffers(GroupTravelService.getOperatorOffers());
    setNotice(`Operator offer approved and published to user marketplace!`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleRemoveReel = (reelId: string) => {
    TravelReelsService.setReelModeration(reelId, 'REJECTED');
    setReels(TravelReelsService.getReels(undefined, true));
    setNotice(`Travel Reel removed by Admin.`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto">
      
      {/* Platform Financial Commission Configuration */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-amber-500/40 bg-slate-950 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
          <div>
            <h2 className="font-extrabold text-lg text-amber-300 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>WAY2GO PLATFORM COMMISSION CONFIGURATION</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Set default platform fee percentage deducted from operator group travel bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseInt(e.target.value) || 0)}
              className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-mono font-extrabold text-center"
            />
            <span className="text-xs font-mono font-bold text-slate-200">% PLATFORM FEE</span>
          </div>
        </div>
      </div>

      {notice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs font-bold text-center animate-pulse">
          {notice}
        </div>
      )}

      {/* Travel Reels Moderation Queue */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-purple-500/40 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <h2 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <span>TRAVEL REELS MODERATION QUEUE ({reels.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reels.map((reel) => (
            <div key={reel.id} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                  📍 {reel.city} • {reel.category}
                </span>
                <h4 className="font-extrabold text-slate-100 line-clamp-1">{reel.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono">By {reel.creator_name}</p>
              </div>

              <button
                onClick={() => handleRemoveReel(reel.id)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Group Travel Offers Review Queue */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/40 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <h2 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
            <Bus className="w-5 h-5 text-sky-400" />
            <span>OPERATOR GROUP OFFER APPROVAL QUEUE ({offers.length})</span>
          </h2>
        </div>

        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-950 pb-2">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-100">{offer.operator_name}</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Vehicle: {offer.vehicle_type} ({offer.capacity} seats) • Phone: {offer.operator_phone}
                  </p>
                </div>

                <div className="text-right font-mono">
                  <span className="text-sm font-extrabold text-emerald-400 block">₹{offer.price_total_inr.toLocaleString()}</span>
                  <span className="text-[10px] text-amber-400 block">
                    WAY2GO Fee ({offer.platform_commission_percent}%): ₹{offer.platform_commission_inr.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Operator Payout: ₹{offer.operator_net_amount_inr.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-mono text-slate-400">
                  Status: {offer.admin_approved ? '🟢 APPROVED' : '🟡 PENDING APPROVAL'}
                </span>

                {!offer.admin_approved && (
                  <button
                    onClick={() => handleApproveOffer(offer.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-md flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>APPROVE OFFER</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Pre-Publish Verification Portal */}
      <DeveloperVerificationPortal />

      {/* General System Metrics & Moderation Queue */}
      <AdminDashboard />
    </div>
  );
};
