import React, { useState } from 'react';
import { Navigation, UserCheck, LogOut, Plus, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import { LoginPage } from '../auth/LoginPage';
import { QuickRoutePostModal } from '../recorder/QuickRoutePostModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthModalOpen, openAuthModal, closeAuthModal, signOutUser } = useAuth();
  const { activeRecording, pendingDeveloperRoutes } = useJourney();
  const [showQuickPost, setShowQuickPost] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-3 sm:px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Navigation className="w-4.5 h-4.5 text-sky-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                WAY2GO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Community Travel Route Intelligence
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'home' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'explore' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('record')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'record' 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {activeRecording && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            Record
          </button>
          <button
            onClick={() => setActiveTab('safe')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'safe' 
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe
          </button>
          <button
            onClick={() => setActiveTab('stays')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'stays' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Stays
          </button>
          <button
            onClick={() => setActiveTab('gov-portal')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'gov-portal' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Gov Hub
          </button>
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'passport' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Passport
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all relative flex items-center gap-1 ${
              activeTab === 'admin' 
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' 
                : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <span>Review</span>
            {pendingDeveloperRoutes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {pendingDeveloperRoutes.length}
              </span>
            )}
          </button>
        </nav>

        {/* Action Buttons: Quick Post & User Profile */}
        <div className="flex items-center gap-2">
          
          {/* Prominent Quick Post Button */}
          <button
            onClick={() => setShowQuickPost(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md flex items-center gap-1 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Share Route (30s)</span>
            <span className="sm:hidden">Post</span>
          </button>

          {user ? (
            <button
              onClick={signOutUser}
              className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-extrabold text-xs flex items-center gap-1 transition-all shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-2.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-extrabold text-xs flex items-center gap-1 transition-all shrink-0"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Sign In</span>
            </button>
          )}

          <div 
            onClick={() => setActiveTab('passport')}
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
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
