import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Navigation, UserCheck, MapPin, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import { LoginPage } from '../auth/LoginPage';
import { QuickRoutePostModal } from '../recorder/QuickRoutePostModal';
import type { UserRole } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, role, setRole, isAuthModalOpen, openAuthModal, closeAuthModal, signOutUser } = useAuth();
  const { safeJourney, activeRecording, isOnline, offlineSyncCount, pendingDeveloperRoutes } = useJourney();
  const [showQuickPost, setShowQuickPost] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Navigation className="w-5 h-5 text-sky-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                WAY2GO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Community Travel Route Intelligence
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'home' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'explore' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Discover Routes
          </button>
          <button
            onClick={() => setActiveTab('record')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'record' 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {activeRecording && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            Record Route
          </button>
          <button
            onClick={() => setActiveTab('safe')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'safe' 
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe Journey
          </button>
          <button
            onClick={() => setActiveTab('stays')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'stays' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Budget Stays
          </button>
          <button
            onClick={() => setActiveTab('gov-portal')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'gov-portal' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Gov Hub
          </button>
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'passport' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Travel Passport
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'admin' 
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' 
                : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <span>Developer Review</span>
            {pendingDeveloperRoutes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {pendingDeveloperRoutes.length}
              </span>
            )}
          </button>
        </nav>

        {/* Action Buttons: Quick Post & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Prominent Quick Post Button */}
          <button
            onClick={() => setShowQuickPost(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Share Route (30s)</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-sky-950/40 text-sky-300 border border-sky-500/30">
            <MapPin className="w-3 h-3 text-sky-400" />
            <span>{user?.registered_city || 'Chennai'} - {user?.registered_area || 'Ramapuram'}</span>
          </div>

          {!isOnline && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Offline ({offlineSyncCount} pending)
            </span>
          )}

          {safeJourney && (
            <button
              onClick={() => setActiveTab('safe')}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 animate-pulse"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span>Safe Mode Active</span>
            </button>
          )}

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-[10px] text-slate-400 px-2 font-medium hidden xl:inline">Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="traveller" className="bg-slate-900 text-slate-200">Traveller</option>
              <option value="contributor" className="bg-slate-900 text-slate-200">Contributor</option>
              <option value="helper" className="bg-slate-900 text-slate-200">Trusted Helper</option>
              <option value="admin" className="bg-slate-900 text-amber-400">Developer Karthik</option>
            </select>
          </div>

          {user ? (
            <button
              onClick={signOutUser}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign In / Google</span>
            </button>
          )}

          <div 
            onClick={() => setActiveTab('passport')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-sky-400/40 object-cover"
            />
          </div>

        </div>

      </div>

      {isAuthModalOpen && (
        <LoginPage onClose={closeAuthModal} />
      )}

      {showQuickPost && (
        <QuickRoutePostModal onClose={() => setShowQuickPost(false)} />
      )}
    </header>
  );
};
