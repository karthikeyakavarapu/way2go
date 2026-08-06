import React, { useState } from 'react';
import { X, Send, Bus, Sparkles, MapPin, DollarSign, Clock, Zap } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import { POPULAR_ROUTE_TEMPLATES, BUS_CHIP_PRESETS, type RouteTemplate } from '../../data/busTemplates';
import { PhotoUploader } from './PhotoUploader';
import { BadgeCelebration } from '../passport/BadgeCelebration';
import { MapView } from '../map/MapView';
import type { RouteGuide } from '../../types';

interface QuickRoutePostModalProps {
  onClose: () => void;
}

export const QuickRoutePostModal: React.FC<QuickRoutePostModalProps> = ({ onClose }) => {
  const { finishRecordingAndPublish, startRecording } = useJourney();
  const { updateUserReputation } = useAuth();

  const [title, setTitle] = useState(POPULAR_ROUTE_TEMPLATES[0].title);
  const [origin, setOrigin] = useState(POPULAR_ROUTE_TEMPLATES[0].origin);
  const [destination, setDestination] = useState(POPULAR_ROUTE_TEMPLATES[0].destination);
  const [busDetails, setBusDetails] = useState(POPULAR_ROUTE_TEMPLATES[0].instruction);
  const [fare, setFare] = useState(POPULAR_ROUTE_TEMPLATES[0].fare);
  const [duration, setDuration] = useState(POPULAR_ROUTE_TEMPLATES[0].duration);
  
  const [originCoords, setOriginCoords] = useState(POPULAR_ROUTE_TEMPLATES[0].originCoords);
  const [destCoords, setDestCoords] = useState(POPULAR_ROUTE_TEMPLATES[0].destinationCoords);

  const [showCelebration, setShowCelebration] = useState(false);

  const handleApplyTemplate = (tmpl: RouteTemplate) => {
    setTitle(tmpl.title);
    setOrigin(tmpl.origin);
    setDestination(tmpl.destination);
    setBusDetails(tmpl.instruction);
    setFare(tmpl.fare);
    setDuration(tmpl.duration);
    setOriginCoords(tmpl.originCoords);
    setDestCoords(tmpl.destinationCoords);
  };

  const handleAppendBusChip = (busNum: string) => {
    if (!busDetails.includes(busNum)) {
      setBusDetails(prev => `${prev} (Includes ${busNum})`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    startRecording(title);
    setTimeout(() => {
      finishRecordingAndPublish(title, origin, destination);
      updateUserReputation(50);
      setShowCelebration(true);
    }, 150);
  };

  // Preview Route Guide Object for Miniature Embedded Map
  const previewRouteObj: RouteGuide = {
    id: 'preview-route',
    title,
    tagline: busDetails,
    origin_name: origin,
    origin_coords: originCoords,
    destination_name: destination,
    destination_coords: destCoords,
    total_distance_km: 14.5,
    total_duration_minutes: parseInt(duration) || 30,
    total_cost_inr: parseInt(fare) || 20,
    confidence_score: 95,
    last_verified_at: 'Just now',
    successful_completions_count: 1,
    recent_confirmations_count: 1,
    difficulty_level: 'Beginner',
    category: 'Community Route',
    tags: ['Quick Post'],
    author_id: 'user-preview',
    author_name: 'You',
    publishing_status: 'pending_developer_approval',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_published: false,
    is_featured: false,
    primary_source_label: 'SOURCE: Community Verified',
    segments: [
      {
        id: 'p-seg-1',
        step_number: 1,
        transport_mode: 'bus',
        title: busDetails,
        instruction_full: busDetails,
        instruction_simplified: busDetails,
        start_location: originCoords,
        end_location: destCoords,
        distance_meters: 14500,
        estimated_minutes: parseInt(duration) || 30,
        estimated_cost_inr: parseInt(fare) || 20,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified',
        polyline_coords: [originCoords, destCoords]
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      
      {showCelebration ? (
        <BadgeCelebration
          pointsEarned={50}
          badgeTitle="Pioneer Route Creator"
          onClose={() => {
            setShowCelebration(false);
            onClose();
          }}
        />
      ) : (
        <div className="glass-panel p-6 rounded-3xl max-w-2xl w-full border border-sky-500/40 bg-slate-950 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-white mx-auto flex items-center justify-center mb-2 shadow-lg shadow-sky-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-extrabold text-2xl text-slate-100">
              1-TAP ROUTE CREATOR STUDIO
            </h2>
            <p className="text-xs text-slate-400">
              Tap a template or type route details below. Includes live map preview and reward points!
            </p>
          </div>

          {/* 1-Tap Popular Templates Section */}
          <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-sky-400">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>1-TAP POPULAR STUDENT TEMPLATES (CLICK TO PRE-FILL):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POPULAR_ROUTE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-left text-xs transition-all space-y-0.5 group"
                >
                  <span className="font-bold text-slate-200 group-hover:text-sky-300 block truncate">
                    {tmpl.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ₹{tmpl.fare} • {tmpl.duration} min • {tmpl.busNumbers.join(', ')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Route Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SRM Ramapuram → Marina Beach"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500 font-bold"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Origin Landmark</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. SRM Gate 2"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Marina Beach"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bus Number Pill Selectors */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 block">Tap Bus Numbers to Append:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {BUS_CHIP_PRESETS.map((busNum) => (
                  <button
                    key={busNum}
                    type="button"
                    onClick={() => handleAppendBusChip(busNum)}
                    className="px-2.5 py-1 rounded-lg bg-sky-950/40 text-sky-300 border border-sky-500/30 text-[11px] font-mono font-bold hover:bg-sky-500/20 shrink-0"
                  >
                    +{busNum}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Bus Numbers & Step Instructions</label>
              <div className="relative">
                <Bus className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                <textarea
                  value={busDetails}
                  onChange={(e) => setBusDetails(e.target.value)}
                  rows={3}
                  placeholder="e.g. Board Bus 88K from Ramapuram stop to Guindy. Cross subway and board Bus 21G direct to Light House."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Total Fare (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  <input
                    type="number"
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
                    placeholder="35"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Travel Time (Mins)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="45"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Live Embedded Map Preview */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-300 block">Live Embedded Map Preview:</span>
              <MapView route={previewRouteObj} heightClass="h-[180px]" />
            </div>

            <PhotoUploader onPhotoSelected={() => {}} />

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <Send className="w-4 h-4" />
              <span>POST ROUTE & CLAIM +50 REPUTATION POINTS</span>
            </button>

          </form>
        </div>
      )}

    </div>
  );
};
