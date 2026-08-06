import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackTab?: string;
  onRedirect?: (tab: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirect }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="font-extrabold text-xl text-slate-100">Sign In Required</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Please sign in to access your saved trips, travel passport, and community features.
        </p>
        <button
          onClick={() => onRedirect?.('home')}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirect }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.email === 'karthikeyakavarapu@gmail.com' || user?.email === 'karthikakavarapuu@gmail.com';

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
            403 FORBIDDEN
          </span>
          <h2 className="font-extrabold text-xl text-slate-100">Admin Authorization Required</h2>
        </div>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
          The Admin Verification Portal is restricted to authorized platform administrators only.
        </p>
        <button
          onClick={() => onRedirect?.('home')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Travel Home</span>
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export const DeveloperRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirect }) => {
  const { user } = useAuth();
  const isDeveloper = user?.role === 'developer' || user?.role === 'admin' || user?.email === 'karthikeyakavarapu@gmail.com' || user?.email === 'karthikakavarapuu@gmail.com';

  if (!isDeveloper) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
            403 RESTRICTED
          </span>
          <h2 className="font-extrabold text-xl text-slate-100">Developer Diagnostics Restricted</h2>
        </div>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
          Developer console tools are available only to authorized system engineers.
        </p>
        <button
          onClick={() => onRedirect?.('home')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Travel Home</span>
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
