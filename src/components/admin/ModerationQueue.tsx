import React, { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import type { RouteReport } from '../../types';

const INITIAL_REPORTS: RouteReport[] = [
  {
    id: 'rep-01',
    route_id: 'route-srm-marina-01',
    route_title: 'SRM Ramapuram → Marina Beach',
    reported_by: 'User @chennai_commuter',
    reason: 'Bus 88K fare updated from ₹15 to ₹18 due to new express service tier.',
    status: 'pending',
    created_at: '1 hour ago'
  },
  {
    id: 'rep-02',
    route_id: 'route-iit-besant-02',
    route_title: 'IIT Madras Gate → Besant Nagar Beach',
    reported_by: 'User @besant_runner',
    reason: 'Road repair work near 6th Avenue entrance. Temporary 100m walk detour.',
    status: 'pending',
    created_at: '3 hours ago'
  }
];

export const ModerationQueue: React.FC = () => {
  const [reports, setReports] = useState<RouteReport[]>(INITIAL_REPORTS);

  const handleAction = (id: string, newStatus: 'resolved' | 'rejected') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>CONTENT MODERATION QUEUE ({pendingReports.length})</span>
        </h3>
        <span className="text-xs text-slate-400 font-mono">Row-Level-Security Audit Active</span>
      </div>

      <div className="space-y-3">
        {pendingReports.map(rep => (
          <div key={rep.id} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400">{rep.route_title}</span>
              <span className="text-[10px] text-slate-500 font-mono">{rep.created_at}</span>
            </div>

            <p className="text-slate-300">
              <span className="font-semibold text-slate-400">{rep.reported_by}:</span> "{rep.reason}"
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleAction(rep.id, 'resolved')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve Update</span>
              </button>

              <button
                onClick={() => handleAction(rep.id, 'rejected')}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-[11px] flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Dismiss Report</span>
              </button>
            </div>
          </div>
        ))}

        {pendingReports.length === 0 && (
          <div className="p-6 text-center text-slate-400 text-xs font-semibold bg-slate-950/60 rounded-xl border border-slate-800">
            ✓ All reported items have been moderated! Queue is empty.
          </div>
        )}
      </div>
    </div>
  );
};
