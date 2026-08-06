import React, { useState } from 'react';
import { HelpCircle, X, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

interface LocalHelpModalProps {
  onClose: () => void;
}

export const LocalHelpModal: React.FC<LocalHelpModalProps> = ({ onClose }) => {
  const [category, setCategory] = useState<'lost' | 'transit' | 'accessibility' | 'general'>('lost');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-sky-500/40 bg-slate-950 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center mb-2">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="font-extrabold text-xl text-slate-100">
            NEED LOCAL COMMUNITY HELP?
          </h2>
          <p className="text-xs text-slate-400">
            Request guidance from opt-in verified local helpers near your route. Privacy is strictly protected.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-2 text-emerald-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-base">HELP REQUEST BROADCASTED!</h3>
            <p className="text-xs text-emerald-200/90">
              Verified local helpers in your area have been notified. A helper will respond shortly via masked chat.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Help Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100"
              >
                <option value="lost">Lost / Route Confusion</option>
                <option value="transit">Bus Stop or Bus Number Query</option>
                <option value="accessibility">Accessibility Assistance</option>
                <option value="general">General Local Guidance</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Describe what you need help with</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="e.g. Can someone tell me which side of Guindy subway to walk for Bus 88K?"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Exact live location is masked for privacy. Only general area is shared.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>BROADCAST HELP REQUEST</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
