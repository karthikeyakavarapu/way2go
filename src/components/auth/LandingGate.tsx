import React, { useState } from 'react';
import { Navigation, Sparkles, User, Mail, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleAuthButton } from './GoogleAuthButton';
import type { UserRole } from '../../types';

interface LandingGateProps {
  onUnlock: () => void;
}

export const LandingGate: React.FC<LandingGateProps> = ({ onUnlock }) => {
  const { registerUser, loginUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState<UserRole>('traveller');
  const [city, setCity] = useState('Chennai');
  const [area, setArea] = useState('Ramapuram');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGuestExplore = () => {
    registerUser({ full_name: 'Traveller', email: 'guest@way2go.in', registered_city: 'Chennai', registered_area: 'Ramapuram' });
    onUnlock();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('Unlocking your workspace...');

    try {
      if (isSignUp) {
        registerUser({
          full_name: fullName || 'Traveller',
          email: email || 'user@way2go.in',
          role,
          registered_city: city,
          registered_area: area
        });
      } else {
        loginUser(email || 'karthikeyakavarapu@gmail.com');
      }
      setTimeout(() => {
        onUnlock();
      }, 400);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-sky-500 selection:text-white px-3 sm:px-6">
      
      {/* Background Ambient Mesh */}
      <div className="absolute top-0 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full py-4 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20 shrink-0">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Navigation className="w-4.5 h-4.5 text-sky-400 transform -rotate-45" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            WAY2GO
          </span>
        </div>

        <button
          onClick={handleGuestExplore}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <span>Skip & Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </header>

      {/* Main Content & Auth Card */}
      <main className="relative z-10 max-w-md mx-auto w-full py-6 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Real-time Transit Intelligence</span>
          </div>

          <h1 className="font-extrabold text-2xl sm:text-4xl text-slate-100 tracking-tight leading-tight">
            Know how to get there.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Verified step-by-step bus numbers, metro lines, exit gates & fares.
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/30 bg-slate-950/90 space-y-4 shadow-2xl">
          
          {successMessage && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1-Click Google Identity Auth */}
          <GoogleAuthButton onSuccess={onUnlock} />

          {/* 1-Tap Guest Access */}
          <button
            type="button"
            onClick={handleGuestExplore}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>EXPLORE APP NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative flex items-center justify-center pt-1">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-950 px-3 text-[10px] text-slate-500 font-semibold uppercase shrink-0">
              or sign in with email
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] text-slate-400 font-semibold block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold block mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-semibold block mb-1">Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Ramapuram"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{isLoading ? 'SIGNING IN...' : isSignUp ? 'CREATE ACCOUNT' : 'CONTINUE WITH EMAIL'}</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sky-400 font-semibold hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
          </div>
        </div>

      </main>

      <footer className="relative z-10 max-w-md mx-auto w-full py-4 text-center text-[11px] text-slate-500 border-t border-slate-900">
        <p>© 2026 WAY2GO Real-time Travel Intelligence</p>
      </footer>
    </div>
  );
};
