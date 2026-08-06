import React from 'react';
import { ShieldCheck, Check, X, UserCheck } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import type { RouteGuide } from '../../types';

export const DeveloperVerificationPortal: React.FC = () => {
  const { pendingDeveloperRoutes, developerApproveRoute, developerRejectRoute } = useJourney();

  return (
    <div className="glass-panel p-6 rounded-2xl border border-sky-500/40 bg-slate-900/90 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-slate-100">
                DEVELOPER PRE-PUBLISH VERIFICATION PORTAL
              </h3>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded font-mono font-bold">
                Karthik Verification Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Review contributor-recorded routes before approving them to go live in public community search.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-sky-300">
          Pending Verification: <span className="font-bold text-emerald-400">{pendingDeveloperRoutes.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {pendingDeveloperRoutes.map((route: RouteGuide) => (
          <div
            key={route.id}
            className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    STATUS: PENDING DEVELOPER APPROVAL
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {route.city_area || 'Chennai - Ramapuram'}
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-slate-100 mt-1">
                  {route.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  ₹{route.total_cost_inr} • {route.total_duration_minutes} min • {route.total_distance_km} km
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span className="font-bold">Contributor:</span>
              <span>{route.author_name} ({route.author_id})</span>
            </div>

            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-300 block text-xs">
                Recorded Steps Trace ({route.segments.length}):
              </span>
              <div className="space-y-1.5">
                {route.segments.map(seg => (
                  <div key={seg.id} className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[300px]">
                      Step {seg.step_number}: <span className="capitalize font-bold text-sky-400">{seg.transport_mode}</span> — {seg.title}
                    </span>
                    <span className="font-mono text-slate-400">{seg.distance_meters}m</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => developerApproveRoute(route.id)}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>APPROVE & PUBLISH TO PUBLIC</span>
              </button>

              <button
                onClick={() => developerRejectRoute(route.id)}
                className="flex-1 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <X className="w-4 h-4" />
                <span>REJECT SUBMISSION</span>
              </button>
            </div>
          </div>
        ))}

        {pendingDeveloperRoutes.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs font-semibold bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
            <Check className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
            <p className="text-slate-200 font-bold">No routes pending developer approval.</p>
            <p className="text-slate-500">All submitted community routes have been verified!</p>
          </div>
        )}
      </div>
    </div>
  );
};
