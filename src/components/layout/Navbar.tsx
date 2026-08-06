import React from 'react';
import { Navigation, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import { LoginPage } from '../auth/LoginPage';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthModalOpen, openAuthModal, closeAuthModal, signOutUser } = useAuth();
  const { pendingDeveloperRoutes } = useJourney();

  const isAdmin = user?.role === 'admin' || user?.email === 'karthikeyakavarapu@gmail.com' || user?.email === 'karthikakavarapuu@gmail.com';
  const isDeveloper = user?.role === 'developer';

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-3 sm:px-6 py-2.5 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
              <Navigation className="w-4.5 h-4.5 text-sky-400 transform -rotate-45" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              WAY2GO
            </span>
          </div>
        </div>

        {/* Desktop Primary Nav (HIDDEN ON MOBILE - BottomNav handles mobile) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'explore' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'trips' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Trips
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Profile
          </button>

          {/* ADMIN LINK: Shown ONLY to authorized admins */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin' 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'text-amber-400 hover:bg-slate-800/50'
              }`}
            >
              <span>Admin Queue</span>
              {pendingDeveloperRoutes.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingDeveloperRoutes.length}
                </span>
              )}
            </button>
          )}

          {/* DEVELOPER LINK: Shown ONLY if user.role === 'developer' */}
          {isDeveloper && (
            <button
              onClick={() => setActiveTab('developer')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'developer' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-purple-400 hover:bg-slate-800/50'
              }`}
            >
              Dev Console
            </button>
          )}
        </nav>

        {/* User Identity & Auth Control */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={signOutUser}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>

              <div 
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
              >
                <img 
                  src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                  alt={user.full_name}
                  className="w-8 h-8 rounded-full border border-sky-400/40 object-cover"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>

      {isAuthModalOpen && (
        <LoginPage onClose={closeAuthModal} />
      )}
    </header>
  );
};
