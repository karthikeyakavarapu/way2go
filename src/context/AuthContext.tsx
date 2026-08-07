import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRoleState] = useState<UserRole>('user');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userEmail = session.user.email || 'user@way2go.in';

          const authUser: UserProfile = {
            id: session.user.id,
            email: userEmail,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Authenticated Traveller',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
            role: (session.user.user_metadata?.role as UserRole) || 'user',
            reputation_score: 98,
            badge_title: 'Verified Traveller',
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

          const authUser: UserProfile = {
            id: session.user.id,
            email: userEmail,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Authenticated Traveller',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
            role: (session.user.user_metadata?.role as UserRole) || 'user',
            reputation_score: 98,
            badge_title: 'Verified Traveller',
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

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: userEmail,
      full_name: data.full_name || 'New Traveller',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      role: data.role || 'user',
      reputation_score: 98,
      badge_title: 'Verified Traveller',
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
    const googleProfile: UserProfile = {
      id: `google-${Date.now()}`,
      email: googleData.email,
      full_name: googleData.full_name,
      avatar_url: googleData.avatar_url,
      role: 'user',
      reputation_score: 98,
      badge_title: 'Google Verified Traveller',
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
    registerUser({ email: email || 'user@way2go.in', full_name: email ? email.split('@')[0] : 'Registered Traveller' });
  };

  const signOutUser = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setUser(null);
    setRoleState('user');
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
