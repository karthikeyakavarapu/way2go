import React, { useState, useEffect } from 'react';
import { Bell, MapPin, ShieldCheck, X, Sparkles } from 'lucide-react';

interface PermissionPromptModalProps {
  onLocationGranted?: (coords: { lat: number; lng: number }) => void;
}

export const PermissionPromptModal: React.FC<PermissionPromptModalProps> = ({ onLocationGranted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const hasPrompted = localStorage.getItem('way2go_permission_prompted');
    
    // Show prompt if not previously answered or if permissions are default
    if (!hasPrompted && (Notification.permission === 'default' || locationStatus === 'prompt')) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRequestAll = async () => {
    setIsProcessing(true);

    // 1. Request Browser Notifications
    if (typeof Notification !== 'undefined') {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          new Notification('WAY2GO Live Safety Radar Active', {
            body: 'You will receive instant early warning alerts for accidents, broken roads, and scams on your route.',
            icon: '/vite.svg'
          });
        }
      } catch (err) {
        console.warn('Notification permission error:', err);
      }
    }

    // 2. Request Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationStatus('granted');
          onLocationGranted?.({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          localStorage.setItem('way2go_permission_prompted', 'true');
          setIsProcessing(false);
          setIsOpen(false);
        },
        (err) => {
          console.warn('Geolocation error:', err);
          setLocationStatus('denied');
          localStorage.setItem('way2go_permission_prompted', 'true');
          setIsProcessing(false);
          setIsOpen(false);
        },
        { timeout: 8000 }
      );
    } else {
      localStorage.setItem('way2go_permission_prompted', 'true');
      setIsProcessing(false);
      setIsOpen(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('way2go_permission_prompted', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 rounded-3xl border border-sky-500/40 bg-slate-950 max-w-md w-full space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-900 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/30 shrink-0">
            <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 uppercase">
              AI SAFETY & ROUTE PERMISSIONS
            </span>
            <h3 className="font-extrabold text-lg text-slate-100 mt-0.5">
              Enable AI Travel Intelligence
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          WAY2GO uses realtime AI and Google Maps intelligence to protect commuters from accidents, traffic chokepoints, road scams, and broken roads.
        </p>

        {/* Permission Benefits Grid */}
        <div className="space-y-2.5 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-start gap-3">
            <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-slate-200">Accident & Scam Early Warnings</h4>
              <p className="text-[11px] text-slate-400">Receive instant notifications if an accident, pothole hazard, or auto scam occurs ahead.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-slate-200">Live GPS Location & Nearby Reels</h4>
              <p className="text-[11px] text-slate-400">Auto-detect your nearest bus stop, exit gate, and verified video reels.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleRequestAll}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isProcessing ? 'REQUESTING PERMISSIONS...' : 'ALLOW LOCATION & SAFETY NOTIFICATIONS'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Maybe Later
          </button>
        </div>

      </div>
    </div>
  );
};
