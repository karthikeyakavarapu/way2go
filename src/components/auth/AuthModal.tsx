import React, { useState } from 'react';
import { X, UserCheck, Sparkles, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { registerUser, loginUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('contributor');
  const [city, setCity] = useState('Chennai');
  const [area, setArea] = useState('Ramapuram');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      registerUser({
        full_name: fullName || 'New Traveller',
        email: email || 'user@way2go.in',
        role,
        registered_city: city,
        registered_area: area
      });
    } else {
      loginUser(email || 'karthikakavarapuu@gmail.com');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-sky-500/30 bg-slate-950 space-y-5 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center mb-2">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="font-extrabold text-xl text-slate-100">
            {isSignUp ? 'REGISTER FOR WAY2GO' : 'SIGN IN TO YOUR ACCOUNT'}
          </h2>
          <p className="text-xs text-slate-400">
            Join the community of verified travellers, contributors & local guides.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Karthik Akavarapu"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:border-sky-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. karthikakavarapuu@gmail.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:border-sky-500"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-sky-500"
                >
                  <option value="traveller">Traveller (Discover & Follow Routes)</option>
                  <option value="contributor">Route Contributor (Record & Submit for Developer Verification)</option>
                  <option value="helper">Trusted Local Helper (Opt-in Assistance)</option>
                  <option value="admin">Lead Developer / Admin (Karthik Pre-Publish Review)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Area Bounding</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Ramapuram / Guindy"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSignUp ? 'COMPLETE REGISTRATION' : 'SIGN IN'}</span>
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
  );
};
