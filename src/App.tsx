import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { TripsPage } from './pages/TripsPage';
import { GroupTravelPage } from './pages/GroupTravelPage';
import { OperatorPortal } from './pages/OperatorPortal';
import { AdminPage } from './pages/AdminPage';
import { DeveloperConsole } from './pages/DeveloperConsole';
import { EatStayVisitPage } from './pages/EatStayVisitPage';
import { SafetySOSPage } from './pages/SafetySOSPage';
import { GovPortal } from './pages/GovPortal';
import { TravelVehiclesPage } from './pages/TravelVehiclesPage';
import { TravelPassportView } from './components/passport/TravelPassportView';
import { LiveJourneyView } from './components/journey/LiveJourneyView';
import { OfflineSyncBanner } from './components/recorder/OfflineSyncBanner';
import { RapidoCompanion } from './components/companion/RapidoCompanion';
import { AITravelAssistant } from './components/ai/AITravelAssistant';
import { PermissionPromptModal } from './components/common/PermissionPromptModal';
import { AdminRoute, DeveloperRoute, ProtectedRoute } from './components/auth/ProtectedRoutes';
import type { RouteGuide } from './types';

const AppContent: React.FC = () => {
  const { selectedRoute, setSelectedRoute, routes } = useJourney();
  const [activeTab, setActiveTab] = useState<string>('home');

  const currentRoute = selectedRoute || routes[0];

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
      case 'reels':
        return <Discover />;

      case 'vehicles':
        return <TravelVehiclesPage />;

      case 'companion':
        return (
          <RapidoCompanion 
            route={currentRoute} 
            onClose={() => setActiveTab('home')} 
          />
        );

      case 'gov-hub':
        return <GovPortal />;

      case 'trips':
        return (
          <TripsPage 
            onStartRoute={handleStartRoute} 
            setActiveTab={setActiveTab} 
          />
        );

      case 'eat-stay':
        return <EatStayVisitPage />;

      case 'safety-sos':
        return <SafetySOSPage />;

      case 'groups':
        return <GroupTravelPage />;

      case 'operator':
        return <OperatorPortal />;

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
        <PermissionPromptModal />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-3 sm:px-6 pb-24 md:pb-8">
          {renderActivePage()}
        </main>
      </div>

      <AITravelAssistant />

      <div>
        <Footer />
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onStartJourneyClick={() => setActiveTab('explore')}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <AppContent />
      </JourneyProvider>
    </AuthProvider>
  );
}
