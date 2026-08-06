import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  RouteGuide, 
  ActiveJourneySession, 
  SafeJourneySession, 
  GPSPoint, 
  RecordingMediaItem, 
  TransportMode,
  GovInfraReport,
  TransitPlanningGap,
  GovReportStatus
} from '../types';
import { 
  getLocalRoutes, 
  saveLocalRoute,
  getLocalGovReports,
  saveLocalGovReports,
  getLocalTransitGaps
} from '../lib/supabase';
import { applyRouteConfirmation } from '../lib/verification';
import { INITIAL_ROUTES } from '../data/seedData';


interface JourneyContextType {
  routes: RouteGuide[];
  publicRoutes: RouteGuide[];
  pendingDeveloperRoutes: RouteGuide[];
  selectedRoute: RouteGuide | null;
  setSelectedRoute: (route: RouteGuide | null) => void;
  selectedAreaFilter: string;
  setSelectedAreaFilter: (area: string) => void;
  firstTimeMode: boolean;
  setFirstTimeMode: (val: boolean) => void;
  
  // Journey Recording
  activeRecording: ActiveJourneySession | null;
  startRecording: (customTitle?: string) => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  addRecordingPoint: (pt: GPSPoint) => void;
  addRecordingMedia: (item: RecordingMediaItem) => void;
  setRecordingTransportMode: (mode: TransportMode) => void;
  finishRecordingAndPublish: (title: string, origin: string, destination: string) => RouteGuide;

  // Developer Moderation
  developerApproveRoute: (routeId: string) => void;
  developerRejectRoute: (routeId: string) => void;

  // Safe Journey
  safeJourney: SafeJourneySession | null;
  startSafeJourney: (origin: string, destination: string, contactName: string, contactPhone: string) => void;
  triggerSOS: () => void;
  endSafeJourney: () => void;

  // Route Feedback
  confirmRoute: (routeId: string, status: 'worked' | 'changed' | 'failed') => void;

  // Offline status
  isOnline: boolean;
  offlineSyncCount: number;
  flushOfflineQueue: () => void;

  // Government & Municipal Portal
  govReports: GovInfraReport[];
  transitGaps: TransitPlanningGap[];
  addGovReport: (report: Omit<GovInfraReport, 'id' | 'upvotes' | 'status' | 'created_at'>) => void;
  upvoteGovReport: (reportId: string) => void;
  resolveGovReport: (reportId: string, status: GovReportStatus) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<RouteGuide[]>(getLocalRoutes());
  const [selectedRoute, setSelectedRoute] = useState<RouteGuide | null>(INITIAL_ROUTES[0]);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All Areas');
  const [firstTimeMode, setFirstTimeMode] = useState<boolean>(false);

  const [activeRecording, setActiveRecording] = useState<ActiveJourneySession | null>(null);
  const [safeJourney, setSafeJourney] = useState<SafeJourneySession | null>(null);

  const [govReports, setGovReports] = useState<GovInfraReport[]>(() => getLocalGovReports());
  const [transitGaps] = useState<TransitPlanningGap[]>(() => getLocalTransitGaps());


  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [offlineSyncCount, setOfflineSyncCount] = useState<number>(0);

  // Filter public vs pending developer approval
  const publicRoutes = routes.filter(r => {
    const isApproved = r.publishing_status === 'published';
    if (selectedAreaFilter === 'All Areas') return isApproved;
    return isApproved && r.city_area?.toLowerCase().includes(selectedAreaFilter.toLowerCase().split(' - ')[0]);
  });

  const pendingDeveloperRoutes = routes.filter(r => r.publishing_status === 'pending_developer_approval');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushOfflineQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (activeRecording && !activeRecording.is_paused) {
      timer = setInterval(() => {
        setActiveRecording(prev => {
          if (!prev) return null;
          return {
            ...prev,
            elapsed_seconds: prev.elapsed_seconds + 1
          };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeRecording?.is_paused]);

  const startRecording = (customTitle?: string) => {
    const newSession: ActiveJourneySession = {
      id: `rec-${Date.now()}`,
      user_id: 'user-sih-2026-karthik',
      title: customTitle || 'New Recorded Journey',
      is_paused: false,
      elapsed_seconds: 0,
      distance_meters: 0,
      current_transport_mode: 'walk',
      gps_points: [
        { lat: 13.0336, lng: 80.1802, accuracy: 4.5, speed: 1.2, timestamp: Date.now() }
      ],
      recorded_media: [],
      offline_pending_count: 0
    };
    setActiveRecording(newSession);
  };

  const pauseRecording = () => {
    setActiveRecording(prev => prev ? { ...prev, is_paused: true } : null);
  };

  const resumeRecording = () => {
    setActiveRecording(prev => prev ? { ...prev, is_paused: false } : null);
  };

  const addRecordingPoint = (pt: GPSPoint) => {
    if (!activeRecording || activeRecording.is_paused) return;

    if (!isOnline) {
      setOfflineSyncCount(c => c + 1);
    }

    setActiveRecording(prev => {
      if (!prev) return null;
      const pts = [...prev.gps_points, pt];
      const distInc = 15; 
      return {
        ...prev,
        gps_points: pts,
        distance_meters: prev.distance_meters + distInc,
        offline_pending_count: isOnline ? 0 : prev.offline_pending_count + 1
      };
    });
  };

  const addRecordingMedia = (item: RecordingMediaItem) => {
    if (!activeRecording) return;
    setActiveRecording(prev => prev ? { ...prev, recorded_media: [...prev.recorded_media, item] } : null);
  };

  const setRecordingTransportMode = (mode: TransportMode) => {
    if (!activeRecording) return;
    setActiveRecording(prev => prev ? { ...prev, current_transport_mode: mode } : null);
  };

  // Submit for Developer Pre-Publish Approval
  const finishRecordingAndPublish = (title: string, origin: string, destination: string): RouteGuide => {
    if (!activeRecording) throw new Error('No active recording');

    const publishedRoute: RouteGuide = {
      id: `route-${Date.now()}`,
      title: title || 'User Recorded Route',
      tagline: `Real journey recorded by contributor from ${origin} to ${destination}.`,
      origin_name: origin || 'SRM Ramapuram',
      origin_coords: activeRecording.gps_points[0] || { lat: 13.0336, lng: 80.1802 },
      destination_name: destination || 'Marina Beach',
      destination_coords: activeRecording.gps_points[activeRecording.gps_points.length - 1] || { lat: 13.0499, lng: 80.2824 },
      total_distance_km: parseFloat((activeRecording.distance_meters / 1000).toFixed(1)) || 4.2,
      total_duration_minutes: Math.max(1, Math.round(activeRecording.elapsed_seconds / 60)),
      total_cost_inr: 30,
      confidence_score: 85,
      last_verified_at: 'Pending Developer Review',
      successful_completions_count: 1,
      recent_confirmations_count: 1,
      difficulty_level: 'Beginner',
      category: 'Community Route',
      tags: ['Recorded Live', 'Community Route', 'Pending Review'],
      author_id: 'user-sih-2026-karthik',
      author_name: 'Karthik Akavarapu',
      author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      city_area: 'Chennai - Ramapuram',
      publishing_status: 'pending_developer_approval',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_published: false,
      is_featured: false,
      segments: [
        {
          id: `seg-pub-1`,
          step_number: 1,
          transport_mode: activeRecording.current_transport_mode || 'walk',
          title: `Walk from ${origin} to nearest transit point`,
          instruction_full: `Walk down the main avenue past the entrance gate towards transit.`,
          instruction_simplified: `1. Exit ${origin}.\n2. Walk straight down main avenue.\n3. Arrive at transit point.`,
          start_location: activeRecording.gps_points[0] || { lat: 13.0336, lng: 80.1802 },
          end_location: { lat: 13.0348, lng: 80.1818 },
          distance_meters: Math.round(activeRecording.distance_meters * 0.4),
          estimated_minutes: Math.round(activeRecording.elapsed_seconds / 120),
          estimated_cost_inr: 0,
          source_type: 'community_verified',
          source_label: 'SOURCE: Community Verified by Contributor',
          polyline_coords: activeRecording.gps_points
        },
        {
          id: `seg-pub-2`,
          step_number: 2,
          transport_mode: 'bus',
          title: `Board Bus to ${destination}`,
          instruction_full: `Board local transit towards ${destination} landmark stop.`,
          instruction_simplified: `1. Wait at transit stop.\n2. Board bus.\n3. Alight at ${destination}.`,
          start_location: { lat: 13.0348, lng: 80.1818 },
          end_location: activeRecording.gps_points[activeRecording.gps_points.length - 1] || { lat: 13.0499, lng: 80.2824 },
          distance_meters: Math.round(activeRecording.distance_meters * 0.6),
          estimated_minutes: Math.round(activeRecording.elapsed_seconds / 60),
          estimated_cost_inr: 30,
          source_type: 'community_verified',
          source_label: 'SOURCE: Community Verified by Contributor',
          polyline_coords: activeRecording.gps_points
        }
      ]
    };

    saveLocalRoute(publishedRoute);
    setRoutes(prev => [publishedRoute, ...prev]);
    setActiveRecording(null);
    return publishedRoute;
  };

  const developerApproveRoute = (routeId: string) => {
    setRoutes(prev => prev.map(r => {
      if (r.id === routeId) {
        const approved: RouteGuide = {
          ...r,
          publishing_status: 'published',
          is_published: true,
          last_verified_at: 'Verified by Developer Karthik',
          updated_at: new Date().toISOString()
        };
        saveLocalRoute(approved);
        return approved;
      }
      return r;
    }));
  };

  const developerRejectRoute = (routeId: string) => {
    setRoutes(prev => prev.map(r => {
      if (r.id === routeId) {
        const rejected: RouteGuide = {
          ...r,
          publishing_status: 'rejected',
          is_published: false,
          updated_at: new Date().toISOString()
        };
        saveLocalRoute(rejected);
        return rejected;
      }
      return r;
    }));
  };

  const startSafeJourney = (origin: string, destination: string, contactName: string, contactPhone: string) => {
    const session: SafeJourneySession = {
      id: `safe-${Date.now()}`,
      user_id: 'user-sih-2026-karthik',
      user_name: 'Karthik Akavarapu',
      origin,
      destination,
      destination_coords: { lat: 13.0499, lng: 80.2824 },
      expected_arrival_time: '45 mins',
      trusted_contacts: [
        {
          id: 'tc-1',
          name: contactName || 'Parent / Trusted Contact',
          phone_or_email: contactPhone || '+91 98765 43210',
          relationship: 'Emergency Contact',
          is_active: true
        }
      ],
      current_location: { lat: 13.0336, lng: 80.1802 },
      battery_percentage: 92,
      status: 'active',
      last_updated: 'Just now'
    };
    setSafeJourney(session);
  };

  const triggerSOS = () => {
    if (!safeJourney) return;
    setSafeJourney(prev => prev ? { ...prev, status: 'sos', last_updated: 'Just now' } : null);
  };

  const endSafeJourney = () => {
    setSafeJourney(null);
  };

  const confirmRoute = (routeId: string, status: 'worked' | 'changed' | 'failed') => {
    setRoutes(prev => prev.map(r => {
      if (r.id === routeId) {
        const updated = applyRouteConfirmation(r, status);
        saveLocalRoute(updated);
        return updated;
      }
      return r;
    }));
    if (selectedRoute?.id === routeId) {
      setSelectedRoute(prev => prev ? applyRouteConfirmation(prev, status) : null);
    }
  };

  const addGovReport = (newRep: Omit<GovInfraReport, 'id' | 'upvotes' | 'status' | 'created_at'>) => {
    const report: GovInfraReport = {
      ...newRep,
      id: `gov-rep-${Date.now()}`,
      upvotes: 0,
      status: 'under_review',
      created_at: 'Just now'
    };
    const updated = [report, ...govReports];
    setGovReports(updated);
    saveLocalGovReports(updated);
  };

  const upvoteGovReport = (reportId: string) => {
    const updated = govReports.map(r => {
      if (r.id === reportId) {
        return { ...r, upvotes: r.upvotes + 1 };
      }
      return r;
    });
    setGovReports(updated);
    saveLocalGovReports(updated);
  };

  const resolveGovReport = (reportId: string, status: GovReportStatus) => {
    const updated = govReports.map(r => {
      if (r.id === reportId) {
        return { ...r, status };
      }
      return r;
    });
    setGovReports(updated);
    saveLocalGovReports(updated);
  };

  const flushOfflineQueue = () => {
    setOfflineSyncCount(0);
  };

  return (
    <JourneyContext.Provider value={{
      routes,
      publicRoutes,
      pendingDeveloperRoutes,
      selectedRoute,
      setSelectedRoute,
      selectedAreaFilter,
      setSelectedAreaFilter,
      firstTimeMode,
      setFirstTimeMode,
      activeRecording,
      startRecording,
      pauseRecording,
      resumeRecording,
      addRecordingPoint,
      addRecordingMedia,
      setRecordingTransportMode,
      finishRecordingAndPublish,
      developerApproveRoute,
      developerRejectRoute,
      safeJourney,
      startSafeJourney,
      triggerSOS,
      endSafeJourney,
      confirmRoute,
      isOnline,
      offlineSyncCount,
      flushOfflineQueue,
      govReports,
      transitGaps,
      addGovReport,
      upvoteGovReport,
      resolveGovReport
    }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider');
  return ctx;
};
