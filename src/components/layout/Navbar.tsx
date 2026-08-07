import React from 'react';
import { Navigation, LogOut, UserCheck, Utensils, ShieldCheck, Briefcase, Compass, Home, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthModalOpen, openAuthModal, closeAuthModal, signOutUser } = useAuth();

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

        {/* Desktop Primary Nav — 100% Locked & Identical Across Desktop & Mobile */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explore' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'trips' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trips</span>
          </button>

          <button
            onClick={() => setActiveTab('eat-stay')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'eat-stay' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Eat & Stay</span>
          </button>

          <button
            onClick={() => setActiveTab('safety-sos')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'safety-sos' 
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' 
                : 'text-rose-400 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Help/SOS</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* User Identity & Auth Control */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"}
                alt={user.full_name || 'User'}
                className="w-8 h-8 rounded-full border border-sky-400 object-cover"
              />
              <span className="hidden sm:inline font-bold text-xs text-slate-200">
                {user.full_name?.split(' ')[0]}
              </span>
              <button
                onClick={signOutUser}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <LoginPage onClose={closeAuthModal} />
      )}
    </header>
  );
};
