import React, { useState } from 'react';
import { Play, Pause, Square, Camera, Bus, Footprints, Train, Radio, Battery, Wifi, CheckCircle, ShieldCheck } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { RouteWizardBanner } from './RouteWizardBanner';
import { PhotoUploader } from './PhotoUploader';

export const LiveRecorderWidget: React.FC = () => {
  const {
    activeRecording,
    startRecording,
    pauseRecording,
    resumeRecording,
    addRecordingMedia,
    setRecordingTransportMode,
    finishRecordingAndPublish,
    isOnline,
    offlineSyncCount
  } = useJourney();

  const [noteInput, setNoteInput] = useState('');
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [routeTitleInput, setRouteTitleInput] = useState('Recorded Journey from SRM');
  const [originInput, setOriginInput] = useState('SRM Ramapuram');
  const [destInput, setDestInput] = useState('Marina Beach');

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (!noteInput.trim() || !activeRecording) return;
    addRecordingMedia({
      id: `note-${Date.now()}`,
      type: 'note',
      note_text: noteInput,
      location: activeRecording.gps_points[activeRecording.gps_points.length - 1] || { lat: 13.0336, lng: 80.1802 },
      timestamp: Date.now()
    });
    setNoteInput('');
  };

  const handlePhotoAttached = (photoUrl: string, caption: string) => {
    if (!activeRecording) return;
    addRecordingMedia({
      id: `photo-${Date.now()}`,
      type: 'photo',
      url: photoUrl,
      note_text: caption,
      location: activeRecording.gps_points[activeRecording.gps_points.length - 1] || { lat: 13.0336, lng: 80.1802 },
      timestamp: Date.now()
    });
    setShowPhotoModal(false);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    finishRecordingAndPublish(routeTitleInput, originInput, destInput);
    setShowFinishModal(false);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 5000);
  };

  return (
    <div className="space-y-4">
      {/* 3-Step Contributor Wizard Banner */}
      <RouteWizardBanner
        onStartClick={!activeRecording ? () => startRecording('SRM Ramapuram → Marina Beach Live Test') : undefined}
      />

      {submittedNotice && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-emerald-300 text-xs font-bold space-y-1 shadow-lg animate-bounce-short">
          <div className="flex items-center gap-1.5 text-sm font-extrabold">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>SUBMITTED FOR DEVELOPER VERIFICATION!</span>
          </div>
          <p className="text-[11px] font-normal text-emerald-200/90">
            Your recorded route has been submitted to Lead Developer Karthik for pre-publish review. It will go live for all travellers as soon as it is approved.
          </p>
        </div>
      )}

      {!activeRecording ? (
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-extrabold text-2xl text-slate-100">
              REAL JOURNEY RECORDING
            </h2>
            <p className="text-xs text-slate-400">
              Record your real journey step-by-step. WAY2GO captures GPS coordinates, transit modes, landmark photos, and notes to generate a reusable route guide for future travellers.
            </p>
          </div>

          <button
            onClick={() => startRecording('SRM Ramapuram → Marina Beach Live Test')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START RECORDING JOURNEY</span>
          </button>
        </div>
      ) : (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-slate-900/90 space-y-6 shadow-2xl">
          
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider">
                {activeRecording.is_paused ? 'RECORDING PAUSED' : 'LIVE TRACKING ACTIVE'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                {isOnline ? 'Online' : `Offline (${offlineSyncCount})`}
              </span>
              <span className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-sky-400" />
                95%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Elapsed Time</span>
              <span className="text-3xl font-extrabold text-slate-100 font-mono">
                {formatSeconds(activeRecording.elapsed_seconds)}
              </span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Distance</span>
              <span className="text-3xl font-extrabold text-sky-400 font-mono">
                {(activeRecording.distance_meters / 1000).toFixed(2)} km
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">Current Segment Mode:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setRecordingTransportMode('walk')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeRecording.current_transport_mode === 'walk'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Footprints className="w-4 h-4" />
                <span>Walking</span>
              </button>

              <button
                onClick={() => setRecordingTransportMode('bus')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeRecording.current_transport_mode === 'bus'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-2 ring-sky-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>Bus</span>
              </button>

              <button
                onClick={() => setRecordingTransportMode('metro')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeRecording.current_transport_mode === 'metro'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 ring-2 ring-purple-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Train className="w-4 h-4" />
                <span>Metro</span>
              </button>
            </div>
          </div>

          {/* Photo Attachment Drawer */}
          {showPhotoModal ? (
            <PhotoUploader onPhotoSelected={handlePhotoAttached} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowPhotoModal(true)}
                className="py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>ATTACH LANDMARK PHOTO</span>
              </button>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add stop note..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {activeRecording.recorded_media.length > 0 && (
            <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              Captured {activeRecording.recorded_media.length} media item(s) on this route trace.
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            {activeRecording.is_paused ? (
              <button
                onClick={resumeRecording}
                className="flex-1 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>RESUME</span>
              </button>
            ) : (
              <button
                onClick={pauseRecording}
                className="flex-1 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <Pause className="w-4 h-4" />
                <span>PAUSE</span>
              </button>
            )}

            <button
              onClick={() => setShowFinishModal(true)}
              className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>FINISH & SUBMIT</span>
            </button>
          </div>

        </div>
      )}

      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handlePublishSubmit} className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-700 space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Submit for Developer Verification</span>
            </h3>
            <p className="text-xs text-slate-400">
              Recorded routes are verified by Lead Developer Karthik before being published live to the public community.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Route Title</label>
                <input
                  type="text"
                  value={routeTitleInput}
                  onChange={(e) => setRouteTitleInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Origin Landmark</label>
                <input
                  type="text"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Destination Landmark</label>
                <input
                  type="text"
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                SUBMIT TO DEVELOPER
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
