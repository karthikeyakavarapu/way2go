import React, { useState, useEffect } from 'react';
import { ArrowLeft, Navigation, Pause, Play, Plus, CheckCircle2, AlertTriangle, X, Camera, Video, FileText, MapPin, Volume2, VolumeX, Eye } from 'lucide-react';
import type { RouteGuide } from '../../types';
import { MapView } from '../map/MapView';

interface LiveJourneyViewProps {
  route: RouteGuide;
  onEndJourney: () => void;
}

export const LiveJourneyView: React.FC<LiveJourneyViewProps> = ({ route, onEndJourney }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showArrivalSurvey, setShowArrivalSurvey] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New Navigation Add-Ons: Simple Mode & Voice TTS
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const currentSegment = route.segments[currentStepIndex] || route.segments[0];
  const nextSegment = route.segments[currentStepIndex + 1];

  // Speech Synthesis TTS Voice Guidance
  const speakInstruction = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (currentSegment) {
      speakInstruction(`${currentSegment.transport_mode.toUpperCase()}: ${currentSegment.title}. ${currentSegment.instruction_simplified || currentSegment.instruction_full}`);
    }
  }, [currentStepIndex, isVoiceEnabled]);

  const handleNextStep = () => {
    if (currentStepIndex < route.segments.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setShowArrivalSurvey(true);
    }
  };

  const handleTriggerAction = (label: string) => {
    setShowActionSheet(false);
    setActionNotice(`Logged signal: ${label}`);
    setTimeout(() => setActionNotice(null), 2500);
  };

  return (
    <div className="space-y-4 py-3 max-w-xl mx-auto">
      
      {/* 1. Top Bar Navigation & Mode Controls */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={onEndJourney}
          className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Navigation</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Simple Mode Toggle */}
          <button
            onClick={() => setIsSimpleMode(!isSimpleMode)}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer ${
              isSimpleMode ? 'bg-amber-500 text-white border-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Eye className="w-3 h-3 inline mr-1" />
            <span>SIMPLE MODE</span>
          </button>

          {/* Voice Guidance Toggle */}
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
              isVoiceEnabled ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle Voice Directions"
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 text-xs font-bold text-center animate-pulse">
          {actionNotice}
        </div>
      )}

      {/* 2. Satellite & Map View */}
      <div className="glass-panel p-2 rounded-3xl border border-sky-500/30">
        <MapView route={route} activeStepIndex={currentStepIndex} heightClass="h-[220px] sm:h-[280px]" />
      </div>

      {/* 3. Driver-Friendly Simple Mode vs Standard Live Guidance */}
      {!showArrivalSurvey ? (
        isSimpleMode ? (
          /* SIMPLE MODE FOR BUS DRIVERS / FIRST TIME TRAVELLERS */
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/50 bg-slate-950 text-center space-y-4 shadow-2xl">
            <span className="text-xs font-extrabold uppercase font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
              STEP {currentStepIndex + 1}: {currentSegment.transport_mode.toUpperCase()}
            </span>

            <h1 className="font-black text-3xl text-slate-100 uppercase tracking-tight">
              {currentSegment.title}
            </h1>

            <p className="font-extrabold text-base text-sky-300 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              {currentSegment.instruction_simplified || currentSegment.instruction_full}
            </p>

            <button
              onClick={handleNextStep}
              className="w-full py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg shadow-xl cursor-pointer"
            >
              NEXT STEP ➔
            </button>
          </div>
        ) : (
          /* STANDARD LIVE NAVIGATION CARD */
          <div className="glass-panel p-5 rounded-3xl border border-sky-500/40 bg-slate-950/95 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                STEP {currentStepIndex + 1} OF {route.segments.length}
              </span>
              <span className="font-mono text-slate-400">
                GPS Accuracy: 4m
              </span>
            </div>

            {/* Current Step Instruction */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
                {currentSegment.transport_mode.toUpperCase()}
              </span>
              <h2 className="font-extrabold text-xl sm:text-2xl text-slate-100 leading-tight">
                {currentSegment.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSegment.instruction_simplified || currentSegment.instruction_full}
              </p>
            </div>

            {/* Next Step Preview */}
            {nextSegment && (
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Next:</span>
                <span className="font-bold text-slate-200 truncate max-w-[240px]">
                  {nextSegment.title}
                </span>
              </div>
            )}

            {/* Primary Controls */}
            <div className="grid grid-cols-12 gap-2 pt-2">
              <button
                onClick={handleNextStep}
                className="col-span-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{currentStepIndex === route.segments.length - 1 ? 'COMPLETE JOURNEY' : 'NEXT STEP'}</span>
                <Navigation className="w-4 h-4 text-white transform -rotate-45" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="col-span-2 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs flex items-center justify-center cursor-pointer"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={() => setShowActionSheet(true)}
                className="col-span-2 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 font-extrabold text-xs flex items-center justify-center cursor-pointer"
                title="Add Note/Photo"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

          </div>
        )
      ) : (
        /* Post-Arrival Verification Survey */
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-slate-950 space-y-4 text-center shadow-2xl">
          {!surveyCompleted ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="font-extrabold text-xl text-slate-100">
                Did this route work for you?
              </h2>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSurveyCompleted(true)}
                  className="py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>YES, PERFECT</span>
                </button>

                <button
                  onClick={() => setSurveyCompleted(true)}
                  className="py-3 px-4 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>CHANGED / ISSUES</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-4">
              <h2 className="font-extrabold text-2xl text-emerald-400">
                Thank you! 🎉
              </h2>
              <p className="text-xs text-slate-300">
                Your confirmation has been saved and your travel passport points updated!
              </p>
              <button
                onClick={onEndJourney}
                className="py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-xl cursor-pointer"
              >
                RETURN TO HOME
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Sheet Modal */}
      {showActionSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="glass-panel p-5 rounded-3xl w-full max-w-sm border border-sky-500/40 bg-slate-950 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <h3 className="font-extrabold text-sm text-slate-100">Add Route Signal</h3>
              <button onClick={() => setShowActionSheet(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleTriggerAction('Photo Landmark')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left font-bold text-slate-200 flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-sky-400" />
                <span>📷 Photo</span>
              </button>

              <button
                onClick={() => handleTriggerAction('Video Snippet')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left font-bold text-slate-200 flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-purple-400" />
                <span>🎥 Video</span>
              </button>

              <button
                onClick={() => handleTriggerAction('Note Tip')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left font-bold text-slate-200 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>📝 Note</span>
              </button>

              <button
                onClick={() => handleTriggerAction('Mark Stop')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left font-bold text-slate-200 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>📍 Mark Stop</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
