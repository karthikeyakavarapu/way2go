import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  AlertTriangle, 
  ThumbsUp, 
  CheckCircle2, 
  PlusCircle, 
  Clock, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  HelpCircle,
  FileSpreadsheet,
  Check,
  X,
  Eye
} from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useAuth } from '../context/AuthContext';
import type { GovInfraReport, GovReportCategory, GovReportStatus } from '../types';

export const GovPortal: React.FC = () => {
  const { govReports, transitGaps, addGovReport, upvoteGovReport, resolveGovReport } = useJourney();
  const { role, user } = useAuth();

  // Navigation / Filter states
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  
  // Form states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('SRM Ramapuram Campus Entrance');
  const [formCategory, setFormCategory] = useState<GovReportCategory>('road_damage');
  const [formDescription, setFormDescription] = useState('');
  const [formUrgency, setFormUrgency] = useState<'high' | 'medium' | 'low'>('medium');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    addGovReport({
      title: formTitle,
      location: formLocation,
      category: formCategory,
      description: formDescription,
      urgency: formUrgency,
      reported_by: user?.full_name ? `@${user.full_name.toLowerCase().replace(/\s/g, '_')}` : '@commuter_citizen'
    });

    setFormTitle('');
    setFormDescription('');
    setShowSubmitModal(false);
    
    setToastMessage('INFRASTRUCTURE REPORT SUBMITTED SUCCESSFULLY!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Compute local metrics
  const totalReportsCount = govReports.length;
  const resolvedCount = govReports.filter(r => r.status === 'resolved').length;
  const acknowledgedCount = govReports.filter(r => r.status === 'acknowledged').length;
  const scheduledCount = govReports.filter(r => r.status === 'scheduled').length;
  const pendingCount = govReports.filter(r => r.status === 'under_review').length;
  
  const resolutionPercentage = totalReportsCount > 0 
    ? Math.round((resolvedCount / totalReportsCount) * 100) 
    : 0;

  // Filtered reports
  const filteredReports = govReports.filter(r => {
    const categoryMatch = activeCategoryFilter === 'all' || r.category === activeCategoryFilter;
    const statusMatch = activeStatusFilter === 'all' || r.status === activeStatusFilter;
    return categoryMatch && statusMatch;
  });

  const getCategoryLabel = (cat: GovReportCategory) => {
    switch (cat) {
      case 'road_damage': return 'Road / Path Damage';
      case 'transit_delay': return 'Service Transit Delay';
      case 'missing_signage': return 'Transit Signs Missing';
      case 'safety_concern': return 'Safe Zone Hazard';
      case 'feeder_demand': return 'Metro Feeder Demand';
      default: return 'General Issue';
    }
  };

  const getCategoryColor = (cat: GovReportCategory) => {
    switch (cat) {
      case 'road_damage': return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
      case 'transit_delay': return 'text-sky-400 bg-sky-400/10 border-sky-500/20';
      case 'missing_signage': return 'text-indigo-400 bg-indigo-400/10 border-indigo-500/20';
      case 'safety_concern': return 'text-rose-400 bg-rose-400/10 border-rose-500/20';
      case 'feeder_demand': return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
    }
  };

  const getStatusBadge = (status: GovReportStatus) => {
    switch (status) {
      case 'under_review':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-bold font-mono">
            <Clock className="w-3 h-3 text-slate-400" />
            UNDER MUNICIPAL REVIEW
          </span>
        );
      case 'acknowledged':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-bold font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            MUNICIPALITY ACKNOWLEDGED
          </span>
        );
      case 'scheduled':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2 py-0.5 rounded font-bold font-mono">
            <TrendingUp className="w-3 h-3 text-sky-400" />
            SCHEDULED FOR PATCHING
          </span>
        );
      case 'resolved':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-bold font-mono animate-pulse">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            FIX RESOLVED & VERIFIED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#030712] border-2 border-emerald-500 p-4 rounded-xl text-emerald-300 text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce-short">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div>{toastMessage}</div>
            <span className="text-[10px] text-slate-400 font-normal">Syncing citizen logs to smart-governance ledger.</span>
          </div>
        </div>
      )}

      {/* Main Gov Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/20 via-slate-900 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-2xl text-slate-100 tracking-tight">
                GOVERNMENT & MUNICIPAL DATA HUB
              </h2>
              <p className="text-[10px] font-mono text-sky-300">
                Transparent Citizen-Planners Link — Smart City Chennai Portal
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            This collaborative platform provides the Chennai Municipal Corporation and Metropolitan Transport Authority with direct commuter safety markers, environmental offsets, transit bottleneck heatmaps, and local infrastructure repair logs.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 shrink-0 self-start md:self-center transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>FILE INFRASTRUCTURE ISSUE</span>
        </button>
      </div>

      {/* Government Bus Booking & Direct Trip Head Contact Section */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/40 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 uppercase">
              GOVT & GROUP BUS BOOKING
            </span>
            <h3 className="font-extrabold text-lg text-slate-100 mt-1">
              Government / Authorized Group Bus Trips & Head Contacts
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Direct connection for commuters, travellers, and municipal authorities to contact the Trip Head.
            </p>
          </div>

          <a
            href="tel:+919840100000"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center"
          >
            <span>📞 CALL TRIP HEAD (+91 98401 00000)</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-200">Trip Head / Leader: Karthik Akavarapu</span>
              <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                ACTIVE TRIP HEAD
              </span>
            </div>
            <p className="text-slate-400 leading-snug">
              Route: SRM Ramapuram ➔ Puducherry Govt Bus Bay (35 Passengers, Aug 15)
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">Contact: +91 98401 00000</span>
              <button
                onClick={() => alert('Contacting Trip Head Karthik Akavarapu at +91 98401 00000 to join trip!')}
                className="px-3 py-1 rounded-xl bg-sky-500 text-white font-bold cursor-pointer"
              >
                JOIN TRIP
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-200">Trip Head / Leader: Priya Commuter</span>
              <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                GOVT RECOGNIZED
              </span>
            </div>
            <p className="text-slate-400 leading-snug">
              Route: Guindy Metro ➔ Marina Beach Special Bus (25 Passengers, Aug 18)
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">Contact: +91 98402 88888</span>
              <button
                onClick={() => alert('Contacting Trip Head Priya Commuter at +91 98402 88888 to join trip!')}
                className="px-3 py-1 rounded-xl bg-sky-500 text-white font-bold cursor-pointer"
              >
                JOIN TRIP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Carbon Offset Visual Progress */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-start text-xs">
            <span className="text-slate-400 font-semibold uppercase">MUNICIPAL CO2 SAVED</span>
            <span className="text-emerald-400 font-mono font-bold">Chennai Smart Target</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-extrabold text-slate-100 font-mono">
              34,250 kg
            </span>
            <p className="text-[10px] text-slate-400">Derived from 14,820 citizen public-transit logs vs car miles.</p>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '68%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>68% OF MONTHLY GOAL</span>
            <span>50,000 kg Target</span>
          </div>
        </div>

        {/* Resolution Rate Dial */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2.5">
          <span className="text-slate-400 font-semibold uppercase text-xs block">MUNICIPAL RESOLUTION RATE</span>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full border-4 border-slate-850 flex items-center justify-center text-center shrink-0">
              <span className="text-sm font-extrabold text-sky-400 font-mono">{resolutionPercentage}%</span>
              <div 
                className="absolute inset-0 rounded-full border-4 border-sky-400 border-t-transparent border-r-transparent pointer-events-none transform -rotate-45"
                style={{ transform: `rotate(${resolutionPercentage * 3.6 - 45}deg)` }}
              />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-100 font-mono">{resolvedCount} Fixed</span>
              <p className="text-[10px] text-slate-400">{totalReportsCount} total citizen filings in queue.</p>
            </div>
          </div>
        </div>

        {/* High Urgency Pending count */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-2">
          <span className="text-rose-400 font-semibold uppercase text-xs block">CRITICAL INFRA ALERTS</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 font-mono bg-rose-950/40 border border-rose-500/30 px-3 py-0.5 rounded-xl">
              {govReports.filter(r => r.urgency === 'high' && r.status !== 'resolved').length}
            </span>
            <span className="text-xs text-slate-300 font-semibold">Active bottlenecks</span>
          </div>
          <p className="text-[10px] text-slate-400">Require immediate municipal allocation / safety detour marking.</p>
        </div>

        {/* Active Planners feedback rating */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-400 font-semibold uppercase text-xs block">COMMUTER TRUST INDEX</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-100 font-mono">94.8%</span>
            <span className="text-emerald-400 text-xs font-bold font-mono">↑ 1.2%</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">Citizens feel safer commuting by referring routes with live updates.</p>
        </div>

      </div>

      {/* Main Section: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Live Citizen Reports Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="font-extrabold text-base text-slate-200 uppercase tracking-tight">
                Citizen Infrastructure Logs ({filteredReports.length})
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                {pendingCount} review | {acknowledgedCount} acknowledged | {scheduledCount} scheduled | {resolvedCount} resolved
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Category:</span>
                <select
                  value={activeCategoryFilter}
                  onChange={(e) => setActiveCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-lg p-1 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50"
                >
                  <option value="all">All Categories</option>
                  <option value="road_damage">Road Damage</option>
                  <option value="transit_delay">Transit Delay</option>
                  <option value="missing_signage">Missing Signage</option>
                  <option value="safety_concern">Safe Haz Warnings</option>
                  <option value="feeder_demand">Feeder Demands</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Status:</span>
                <select
                  value={activeStatusFilter}
                  onChange={(e) => setActiveStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-lg p-1 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50"
                >
                  <option value="all">All Statuses</option>
                  <option value="under_review">Under Review</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="scheduled">Scheduled Fix</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report: GovInfraReport) => (
              <div 
                key={report.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 bg-slate-900/50"
              >
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-extrabold font-mono border px-2 py-0.5 rounded uppercase ${getCategoryColor(report.category)}`}>
                        {getCategoryLabel(report.category)}
                      </span>
                      {report.urgency === 'high' && (
                        <span className="text-[9px] font-extrabold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 dropdown-animate animate-pulse">
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                          HIGH URGENCY
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        {report.location}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base text-slate-200 mt-2 leading-tight">
                      {report.title}
                    </h4>
                  </div>
                  <div className="shrink-0 self-start sm:self-auto">
                    {getStatusBadge(report.status)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                  {report.description}
                </p>

                {/* Footer buttons & Upvoting */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 font-mono text-[11px]">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>Filed by <span className="text-slate-300 font-bold">{report.reported_by}</span></span>
                    <span>•</span>
                    <span>{report.created_at}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => upvoteGovReport(report.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                      <span>Upvote Citizen Log ({report.upvotes})</span>
                    </button>
                  </div>
                </div>

                {/* Admin/Developer role control panel */}
                {role === 'admin' && (
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                      <span>MUNICIPAL OFFICER ACTION PORTAL:</span>
                      <span className="bg-amber-400/20 border border-amber-500/30 text-[9px] px-1.5 rounded">Admin Mode</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => resolveGovReport(report.id, 'acknowledged')}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
                          report.status === 'acknowledged'
                            ? 'bg-amber-500 text-slate-900 border-amber-500'
                            : 'bg-slate-950 text-amber-300 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Acknowledge Report</span>
                      </button>

                      <button
                        onClick={() => resolveGovReport(report.id, 'scheduled')}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
                          report.status === 'scheduled'
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'bg-slate-950 text-sky-300 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Schedule Refurbish</span>
                      </button>

                      <button
                        onClick={() => resolveGovReport(report.id, 'resolved')}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
                          report.status === 'resolved'
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-slate-950 text-emerald-300 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Fixed & Patched</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="p-8 text-center text-slate-500 font-semibold bg-slate-950/60 rounded-xl border border-slate-800">
                No active infrastructure issues reported matching filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Smart City Recommendations & Gaps (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-tight flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-400" />
              MUNICIPAL ROUTING GAPS ENGINE
            </h3>
            <p className="text-[11px] text-slate-400">
              Aggregated from real commuter OSRM GPS paths representing walk-segments indicating high demand transit gaps.
            </p>

            <div className="space-y-3.5">
              {transitGaps.map((gap) => (
                <div 
                  key={gap.id}
                  className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 text-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <span className="font-bold text-slate-200">Gap ID: {gap.id}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      {gap.commuters_count} Commutes/day
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-400">
                      <span>Gaps Path:</span>
                      <span className="font-semibold text-slate-200">{gap.origin} ➔ {gap.destination}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Walking Detour:</span>
                      <span className="font-mono text-amber-400">{gap.avg_walk_meters} meters Avg</span>
                    </div>
                  </div>

                  <div className="bg-sky-500/5 border border-sky-500/10 p-2.5 rounded-lg text-sky-300 text-[10px] leading-relaxed">
                    <strong className="block text-sky-200">Recommended Action:</strong>
                    {gap.suggested_action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase flex items-center gap-1 text-[11px]">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              How is this used?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              When citizens follow routes and submit feedback, local planning engines index these entries. 
              Municipal and metropolitan transit officers log in as <strong>Admins</strong> to parse these logs, allocate public funding, inspect safety lighting concerns, and approve feeder vehicles.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-850 text-slate-300 text-[10px] leading-relaxed flex items-start gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Planners can download CSV / GTFS transport verification feeds for direct municipal database uploads.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Form Submission modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form 
            onSubmit={handleFormSubmit}
            className="glass-panel p-6 rounded-3xl max-w-md w-full border border-slate-700 space-y-4 shadow-2xl bg-slate-950"
          >
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-sky-400" />
                <span>File Infrastructure Issue</span>
              </h3>
              <button 
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Provide exact details of infrastructure issues, unsafe route walks, or public transport delays. Planners rely on high details to patch problems.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Issue Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as GovReportCategory)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                >
                  <option value="road_damage">Road Damage / Potholes</option>
                  <option value="transit_delay">Public Bus / Metro Delay</option>
                  <option value="missing_signage">Missing Signage / Directions</option>
                  <option value="safety_concern">Low Lighting / Unsafe Corridor</option>
                  <option value="feeder_demand">Feeder Transit Request</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Issue Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Broken tile pedestrian walking pavement"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Exact Location Landmark</label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Mount Poonamallee Rd, SRM Entrance Gate 2"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Urgency Priority</label>
                  <select
                    value={formUrgency}
                    onChange={(e) => setFormUrgency(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Live Coordinates</label>
                  <input
                    type="text"
                    value="13.0336° N, 80.1802° E"
                    disabled
                    className="w-full bg-slate-900/50 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Describe Situation</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe details e.g., walkway pavement tiles are completely dislodged, causing seniors to stumble towards the bus stop."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-105 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-350 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#00A86B] hover:bg-[#00c27b] text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all font-sans"
              >
                Submit Citizen Report
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
