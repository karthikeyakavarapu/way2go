import React from 'react';
import { ShieldAlert, Users, Compass, CheckCircle2, Radio, AlertTriangle, TrendingUp } from 'lucide-react';
import { getLocalAnalytics } from '../../lib/supabase';
import { ModerationQueue } from './ModerationQueue';

export const AdminDashboard: React.FC = () => {
  const analytics = getLocalAnalytics();

  return (
    <div className="space-y-6">
      
      {/* Admin Panel Header */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-xl text-slate-100">PLATFORM MODERATION & ANALYTICS</h2>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold">
                Admin Role Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Realtime Supabase database counters, route verification queue, and platform audit logs.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
        
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <Users className="w-4 h-4 text-sky-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Users</span>
          <span className="text-xl font-extrabold text-slate-100 font-mono">{analytics.total_users}</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <Compass className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Routes</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">{analytics.total_routes}</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-sky-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Verified</span>
          <span className="text-xl font-extrabold text-sky-400 font-mono">{analytics.verified_routes_count}</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <Radio className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Safe</span>
          <span className="text-xl font-extrabold text-indigo-400 font-mono">{analytics.active_journeys_count}</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <TrendingUp className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Reliability</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono">{analytics.route_reliability_percent}%</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
          <AlertTriangle className="w-4 h-4 text-rose-400 mx-auto mb-1" />
          <span className="text-[10px] text-rose-300 uppercase font-semibold block">Reports Queue</span>
          <span className="text-xl font-extrabold text-rose-400 font-mono">{analytics.total_reports_pending}</span>
        </div>

      </div>

      {/* Moderation Queue */}
      <ModerationQueue />
    </div>
  );
};
