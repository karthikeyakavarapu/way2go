import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';
import { CURRENT_DEMO_USER } from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  updateUserReputation: (points: number) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  registerUser: (data: Partial<UserProfile>) => void;
  loginUser: (email: string) => void;
  loginUserWithGoogle: (googleData: { full_name: string; email: string; avatar_url: string }) => void;
  signOutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['karthikakavarapuu@gmail.com', 'karthikeyakavarapu@gmail.com'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRoleState] = useState<UserRole>('traveller');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userEmail = session.user.email || 'user@way2go.in';
          const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

          const authUser: UserProfile = {
            id: session.user.id,
            email: userEmail,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Authenticated Traveller',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
            role: isAdmin ? 'admin' : (session.user.user_metadata?.role || 'contributor'),
            reputation_score: 98,
            badge_title: isAdmin ? 'Lead Architect & Developer' : 'Verified Traveller',
            is_verified_guide: true,
            is_opted_in_helper: true,
            registered_city: session.user.user_metadata?.city || 'Chennai',
            registered_area: session.user.user_metadata?.area || 'Ramapuram',
            created_at: new Date().toISOString()
          };
          setUser(authUser);
          setRoleState(authUser.role);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const userEmail = session.user.email || 'user@way2go.in';
          const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

          const authUser: UserProfile = {
            id: session.user.id,
            email: userEmail,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Authenticated Traveller',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
            role: isAdmin ? 'admin' : (session.user.user_metadata?.role || 'contributor'),
            reputation_score: 98,
            badge_title: isAdmin ? 'Lead Architect & Developer' : 'Verified Traveller',
            is_verified_guide: true,
            is_opted_in_helper: true,
            registered_city: session.user.user_metadata?.city || 'Chennai',
            registered_area: session.user.user_metadata?.area || 'Ramapuram',
            created_at: new Date().toISOString()
          };
          setUser(authUser);
          setRoleState(authUser.role);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser(prev => prev ? ({ ...prev, role: newRole }) : null);
    }
  };

  const updateUserReputation = (points: number) => {
    if (user) {
      setUser(prev => prev ? ({
        ...prev,
        reputation_score: prev.reputation_score + points
      }) : null);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const registerUser = (data: Partial<UserProfile>) => {
    const userEmail = data.email || 'user@way2go.in';
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: userEmail,
      full_name: data.full_name || 'New Traveller',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      role: isAdmin ? 'admin' : (data.role || 'contributor'),
      reputation_score: 98,
      badge_title: isAdmin ? 'Lead Architect & Developer' : 'Registered Contributor',
      is_verified_guide: true,
      is_opted_in_helper: true,
      registered_city: data.registered_city || 'Chennai',
      registered_area: data.registered_area || 'Ramapuram',
      created_at: new Date().toISOString()
    };
    setUser(newUser);
    setRoleState(newUser.role);
  };

  const loginUserWithGoogle = (googleData: { full_name: string; email: string; avatar_url: string }) => {
    const isAdmin = ADMIN_EMAILS.includes(googleData.email.toLowerCase());

    const googleProfile: UserProfile = {
      id: `google-${Date.now()}`,
      email: googleData.email,
      full_name: googleData.full_name,
      avatar_url: googleData.avatar_url,
      role: isAdmin ? 'admin' : 'contributor',
      reputation_score: 98,
      badge_title: isAdmin ? 'Lead Architect & Developer' : 'Google Verified Traveller',
      is_verified_guide: true,
      is_opted_in_helper: true,
      registered_city: 'Chennai',
      registered_area: 'Ramapuram',
      created_at: new Date().toISOString()
    };
    setUser(googleProfile);
    setRoleState(googleProfile.role);
  };

  const loginUser = (email: string) => {
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    if (isAdmin || !email) {
      setUser({
        ...CURRENT_DEMO_USER,
        email: email || CURRENT_DEMO_USER.email
      });
      setRoleState('admin');
    } else {
      registerUser({ email, full_name: email.split('@')[0] || 'Registered Traveller' });
    }
  };

  const signOutUser = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      setRole,
      updateUserReputation,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      registerUser,
      loginUser,
      loginUserWithGoogle,
      signOutUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
