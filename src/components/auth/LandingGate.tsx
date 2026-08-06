import React, { useState } from 'react';
import { Navigation, Sparkles, User, Mail, ShieldCheck, CheckCircle2, Check, ArrowRight } from 'lucide-react';
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
  const [role, setRole] = useState<UserRole>('contributor');
  const [city, setCity] = useState('Chennai');
  const [area, setArea] = useState('Ramapuram');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeveloperQuickLogin = () => {
    setIsLoading(true);
    setSuccessMessage('Authenticating as Lead Developer Karthik...');
    loginUser('karthikeyakavarapu@gmail.com');
    setTimeout(() => {
      onUnlock();
    }, 500);
  };

  const handleGuestExplore = () => {
    registerUser({ full_name: 'Guest Traveller', email: 'guest@way2go.in', registered_city: 'Chennai', registered_area: 'Ramapuram' });
    onUnlock();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('Authenticating workspace...');

    try {
      if (isSignUp) {
        registerUser({
          full_name: fullName || 'New Traveller',
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
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-sky-500 selection:text-white px-3 sm:px-6">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Mobile-First Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full py-4 flex items-center justify-between gap-2 border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/30 shrink-0">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Navigation className="w-4 h-4 text-sky-400 transform -rotate-45" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            WAY2GO
          </span>
        </div>

        <button
          onClick={handleGuestExplore}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1 transition-all shrink-0"
        >
          <span>Explore App</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </header>

      {/* Main Grid: Responsive Split */}
      <main className="relative z-10 max-w-7xl mx-auto w-full py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Pitch & Headline Column */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Community Travel Intelligence Engine</span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-100">
            Don't just find the destination.{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent block mt-1">
              Learn how to actually get there.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Discover real traveller-recorded journeys containing exact exit gates, bus numbers, stop landmarks, photo guides, verified fares, and live safety mode.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xl sm:text-3xl font-extrabold text-sky-400 font-mono block">14,820+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Travellers</span>
            </div>
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xl sm:text-3xl font-extrabold text-emerald-400 font-mono block">1,240+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Routes</span>
            </div>
            <div className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xl sm:text-3xl font-extrabold text-purple-400 font-mono block">94.8%</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Accuracy</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-step bus numbers & exit gates</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Lead Developer Karthik Pre-Publish Review</span>
            </span>
          </div>

        </div>

        {/* Right Mobile-First Auth Card Column */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-sky-500/40 bg-slate-950/90 space-y-5 shadow-2xl relative overflow-hidden">
            
            <div className="text-center space-y-1">
              <h2 className="font-extrabold text-xl sm:text-2xl text-slate-100 tracking-tight">
                {isSignUp ? 'SIGN UP / REGISTER' : 'WELCOME TO WAY2GO'}
              </h2>
              <p className="text-xs text-slate-400">
                {isSignUp ? 'Create an account to submit routes and earn badges.' : 'Sign in with Google to access your travel passport.'}
              </p>
            </div>

            {successMessage && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Official 1-Click Google OAuth Button */}
            <GoogleAuthButton onSuccess={onUnlock} />

            {/* Quick 1-Tap Entry Buttons */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <button
                type="button"
                onClick={handleGuestExplore}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-1 transition-all"
              >
                <span>EXPLORE APP AS GUEST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDeveloperQuickLogin}
                className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-300 text-xs font-extrabold flex items-center justify-center gap-1 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>SIGN IN (KARTHIK)</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-950 px-3 text-[10px] text-slate-500 font-semibold uppercase shrink-0">
                or sign in with email
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Karthik Akavarapu"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. karthikeyakavarapu@gmail.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Primary Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100"
                    >
                      <option value="traveller">Traveller (Discover & Follow Routes)</option>
                      <option value="contributor">Route Contributor (Record & Submit)</option>
                      <option value="admin">Lead Developer / Admin (Karthik Review)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Madurai">Madurai</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">Area</label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Ramapuram"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'UNLOCKING WORKSPACE...' : isSignUp ? 'CREATE ACCOUNT & UNLOCK' : 'SIGN IN WITH EMAIL'}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sky-400 font-semibold hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto w-full py-4 text-center text-[11px] text-slate-500 border-t border-slate-900">
        <p>© 2026 WAY2GO Community Travel Intelligence • Engineered by Lead Architect Karthik Akavarapu</p>
      </footer>
    </div>
  );
};
