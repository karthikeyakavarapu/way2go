import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JourneyProvider } from './context/JourneyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { RecordPage } from './pages/RecordPage';
import { SafeJourneyPage } from './pages/SafeJourneyPage';
import { StaysPage } from './pages/StaysPage';
import { AdminPage } from './pages/AdminPage';
import { GovPortal } from './pages/GovPortal';
import { TravelPassportView } from './components/passport/TravelPassportView';
import { OfflineSyncBanner } from './components/recorder/OfflineSyncBanner';
import { LandingGate } from './components/auth/LandingGate';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [hasUnlockedGate, setHasUnlockedGate] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  // If user has not unlocked gate and is not logged in, show LandingGate first
  if (!user && !hasUnlockedGate) {
    return <LandingGate onUnlock={() => setHasUnlockedGate(true)} />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'explore':
        return <Discover />;
      case 'record':
        return <RecordPage />;
      case 'safe':
        return <SafeJourneyPage />;
      case 'stays':
        return <StaysPage />;
      case 'passport':
        return <TravelPassportView />;
      case 'admin':
        return <AdminPage />;
      case 'gov-portal':
        return <GovPortal />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between font-sans selection:bg-sky-500 selection:text-white">
      <div>
        <OfflineSyncBanner />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6">
          {renderActivePage()}
        </main>
      </div>

      <Footer />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
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
