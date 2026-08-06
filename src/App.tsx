import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { TripsPage } from './pages/TripsPage';
import { AdminPage } from './pages/AdminPage';
import { DeveloperConsole } from './pages/DeveloperConsole';
import { TravelPassportView } from './components/passport/TravelPassportView';
import { LiveJourneyView } from './components/journey/LiveJourneyView';
import { OfflineSyncBanner } from './components/recorder/OfflineSyncBanner';
import { LandingGate } from './components/auth/LandingGate';
import { AdminRoute, DeveloperRoute, ProtectedRoute } from './components/auth/ProtectedRoutes';
import type { RouteGuide } from './types';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { selectedRoute, setSelectedRoute, routes } = useJourney();
  const [hasUnlockedGate, setHasUnlockedGate] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  const currentRoute = selectedRoute || routes[0];

  // If user has not unlocked gate and is not logged in, show LandingGate first
  if (!user && !hasUnlockedGate) {
    return <LandingGate onUnlock={() => setHasUnlockedGate(true)} />;
  }

  const handleStartRoute = (route: RouteGuide) => {
    setSelectedRoute(route);
    setActiveTab('journey-active');
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            setActiveTab={setActiveTab} 
            onStartRoute={handleStartRoute} 
          />
        );

      case 'explore':
        return <Discover />;

      case 'trips':
        return (
          <TripsPage 
            onStartRoute={handleStartRoute} 
            setActiveTab={setActiveTab} 
          />
        );

      case 'profile':
        return (
          <ProtectedRoute onRedirect={setActiveTab}>
            <TravelPassportView />
          </ProtectedRoute>
        );

      case 'journey-active':
        return (
          <LiveJourneyView 
            route={currentRoute} 
            onEndJourney={() => setActiveTab('home')} 
          />
        );

      case 'admin':
        return (
          <AdminRoute onRedirect={setActiveTab}>
            <AdminPage />
          </AdminRoute>
        );

      case 'developer':
        return (
          <DeveloperRoute onRedirect={setActiveTab}>
            <DeveloperConsole />
          </DeveloperRoute>
        );

      default:
        return (
          <Home 
            setActiveTab={setActiveTab} 
            onStartRoute={handleStartRoute} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between font-sans selection:bg-sky-500 selection:text-white">
      <div>
        <OfflineSyncBanner />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-3 sm:px-6 pb-24 md:pb-8">
          {renderActivePage()}
        </main>
      </div>

      <Footer />
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onStartJourneyClick={() => handleStartRoute(currentRoute)}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <AppContent />
      </JourneyProvider>
    </AuthProvider>
  );
}

export default App;
