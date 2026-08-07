import React, { useState } from 'react';
import { X, Mail, User, LogIn, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleAuthButton } from './GoogleAuthButton';

interface LoginPageProps {
  onClose: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
  const { registerUser, loginUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Chennai');
  const [area, setArea] = useState('Ramapuram');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        registerUser({
          full_name: fullName.trim() || 'Verified Traveller',
          email: email.trim() || 'traveller@way2go.in',
          role: 'user',
          registered_city: city,
          registered_area: area
        });
        setSuccessMessage('Account created successfully! Welcome to WAY2GO.');
      } else {
        loginUser(email.trim() || 'user@way2go.in');
        setSuccessMessage('Signed in successfully!');
      }

      setTimeout(() => {
        onClose();
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-7 rounded-3xl max-w-md w-full border border-sky-500/40 bg-slate-950 space-y-5 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 text-white mx-auto flex items-center justify-center shadow-xl shadow-sky-500/30">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="font-extrabold text-xl text-slate-100 tracking-tight">
            {isSignUp ? 'CREATE YOUR WAY2GO ACCOUNT' : 'WELCOME TO WAY2GO'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp 
              ? 'Join to record routes, request group travel, and earn travel passport badges.' 
              : 'Sign in to access your saved trips, travel passport, and community routes.'}
          </p>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Official Google Login Button */}
        <GoogleAuthButton onSuccess={onClose} />

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-950 px-3 text-[10px] text-slate-500 font-bold uppercase shrink-0 font-mono">
            or continue with email
          </span>
          <div className="border-t border-slate-800 w-full" />
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isSignUp && (
            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Karthik Akavarapu"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-3.5 py-3 text-slate-100 font-medium focus:outline-none focus:border-sky-500 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-3.5 py-3 text-slate-100 font-medium focus:outline-none focus:border-sky-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-3.5 py-3 text-slate-100 font-medium focus:outline-none focus:border-sky-500 transition-colors"
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Registered City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-3 text-slate-200 font-medium focus:outline-none focus:border-sky-500"
                >
                  <option value="Chennai">Chennai</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">Local Area</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Ramapuram"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-3 text-slate-100 font-medium focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>
              {isLoading 
                ? 'Processing...' 
                : isSignUp 
                ? 'CREATE TRAVELLER ACCOUNT' 
                : 'SIGN IN TO WAY2GO'}
            </span>
          </button>
        </form>

        {/* Toggle Switcher */}
        <div className="text-center pt-2 border-t border-slate-900">
          <p className="text-xs text-slate-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sky-400 font-bold hover:underline cursor-pointer ml-1"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
