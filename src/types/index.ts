export type UserRole = 'user' | 'contributor' | 'operator' | 'admin' | 'developer' | 'traveller' | 'helper';

export type RouteHealth = 'working_well' | 'may_have_changes' | 'recently_reported_problem' | 'no_traveller_data';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  reputation_score: number;
  badge_title: string;
  is_verified_guide: boolean;
  is_opted_in_helper: boolean;
  registered_city?: string;
  registered_area?: string;
  created_at: string;
  contact_email?: string;
}

export type TransportMode = 'walk' | 'bus' | 'train' | 'metro' | 'auto' | 'taxi' | 'bicycle';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ResolvedPlace {
  placeId: string;
  name: string;
  formattedAddress: string;
  location: LatLng;
  city?: string;
  state?: string;
}

export interface RouteRequest {
  originPlace: ResolvedPlace;
  destinationPlace: ResolvedPlace;
  travelMode?: TransportMode;
  budgetINR?: number;
  firstTimeTraveller?: boolean;
  departureTime?: string;
}

export type RouteSourceType = 
  | 'osrm_provider' 
  | 'google_routes' 
  | 'community_verified' 
  | 'community_estimate' 
  | 'official_transit';

export interface RouteLandmark {
  id: string;
  name: string;
  description: string;
  location: LatLng;
  photo_url?: string;
  is_exit_entry_point?: boolean;
}

export interface RouteStop {
  id: string;
  name: string;
  stop_code?: string;
  location: LatLng;
  transport_mode: TransportMode;
  route_numbers?: string[];
  photo_url?: string;
  tips?: string;
}

export interface RouteMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  caption: string;
  step_index: number;
  uploaded_by: string;
  created_at: string;
}

export interface RouteSegment {
  id: string;
  step_number: number;
  transport_mode: TransportMode;
  title: string;
  instruction_full: string;
  instruction_simplified: string; // First-time traveller mode
  start_location: LatLng;
  end_location: LatLng;
  distance_meters: number;
  estimated_minutes: number;
  estimated_cost_inr: number;
  polyline_coords: LatLng[];
  source_type: RouteSourceType;
  source_label: string;
  is_fare_available?: boolean;
  is_transit_schedule_available?: boolean;
  stops?: RouteStop[];
  landmarks?: RouteLandmark[];
  media?: RouteMedia[];
  tips?: string[];
}

export type RoutePublishingStatus = 'published' | 'pending_developer_approval' | 'rejected';

export interface RouteGuide {
  id: string;
  title: string;
  tagline: string;
  origin_name: string;
  origin_coords: LatLng;
  destination_name: string;
  destination_coords: LatLng;
  total_distance_km: number;
  total_duration_minutes: number;
  total_cost_inr: number;
  confidence_score: number; // 0 - 100 formula derived
  last_verified_at: string;
  successful_completions_count: number;
  recent_confirmations_count: number;
  difficulty_level: 'Beginner' | 'Moderate' | 'Experienced';
  category: 'Cheapest' | 'Fastest' | 'Beginner Friendly' | 'Community Route';
  tags: string[];
  author_id: string;
  author_name: string;
  author_avatar?: string;
  city_area?: string;
  publishing_status: RoutePublishingStatus;
  created_at: string;
  updated_at: string;
  segments: RouteSegment[];
  is_published: boolean;
  is_featured: boolean;
  primary_source_label?: string;
}

export type RouteMatchStatus = 
  | 'EXACT_MATCH' 
  | 'PARTIAL_MATCH' 
  | 'ALTERNATIVE_ROUTE' 
  | 'NO_MATCH' 
  | 'NO_TRAVELLER_DATA';

export interface RouteComparisonResult {
  matchStatus: RouteMatchStatus;
  matchPercentage: number;
  mapRoute: RouteGuide;
  travellerRoute?: RouteGuide;
  matchingSegmentsCount: number;
  totalSegmentsCount: number;
  differencesDescription: string[];
  travellerCount: number;
  lastVerifiedLabel: string;
  routeHealth: RouteHealth;
  isNoTravellerData: boolean;
}

export type GroupRequestStatus = 
  | 'OPEN' 
  | 'OFFERS_RECEIVED' 
  | 'ADMIN_REVIEW' 
  | 'APPROVED' 
  | 'BOOKED' 
  | 'CANCELLED' 
  | 'COMPLETED';

export interface GroupRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  origin: string;
  destination: string;
  travel_date: string; // ISO date e.g. 2026-08-15
  passenger_count: number;
  max_budget_per_person_inr?: number;
  status: GroupRequestStatus;
  created_at: string;
  offers_count: number;
}

export type OperatorOfferStatus = 
  | 'SUBMITTED' 
  | 'ADMIN_APPROVED' 
  | 'REJECTED' 
  | 'ACCEPTED_BY_USER';

export interface OperatorOffer {
  id: string;
  group_request_id: string;
  operator_id: string;
  operator_name: string;
  operator_phone: string;
  vehicle_type: string; // e.g. '30-Seat AC Bus', '12-Seat Traveller Van'
  capacity: number;
  departure_time: string;
  price_total_inr: number;
  price_per_person_inr: number;
  platform_commission_percent: number; // e.g. 8%
  platform_commission_inr: number;
  operator_net_amount_inr: number;
  status: OperatorOfferStatus;
  admin_approved: boolean;
  rating: number;
  cancellation_policy: string;
  created_at: string;
}

export interface OperatorProfile {
  id: string;
  user_id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  city: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
  rating: number;
  completed_trips: number;
  response_speed: string; // e.g. '🟢 Responds in 10 mins'
  fleet_description: string;
  created_at: string;
}

export interface CommissionTransaction {
  id: string;
  booking_id: string;
  operator_id: string;
  total_amount_inr: number;
  commission_percent: number;
  commission_amount_inr: number;
  operator_amount_inr: number;
  created_at: string;
}

export interface RouteConfirmation {
  id: string;
  route_id: string;
  user_id: string;
  user_name: string;
  status: 'worked' | 'changed' | 'failed';
  feedback_type?: 'changed_bus' | 'changed_stop' | 'price_changed' | 'unsafe_condition' | 'destination_closed' | 'other';
  notes?: string;
  created_at: string;
}

export interface RouteReport {
  id: string;
  route_id: string;
  route_title: string;
  reported_by: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  created_at: string;
}

export interface GPSPoint {
  lat: number;
  lng: number;
  altitude?: number | null;
  accuracy: number;
  speed?: number | null;
  timestamp: number;
}

export interface RecordingMediaItem {
  id: string;
  type: 'photo' | 'video' | 'note';
  url?: string;
  note_text?: string;
  location: LatLng;
  timestamp: number;
}

export interface ActiveJourneySession {
  id: string;
  user_id: string;
  route_id?: string;
  title: string;
  gps_points: GPSPoint[];
  recorded_media: RecordingMediaItem[];
  current_transport_mode: TransportMode;
  distance_meters: number;
  elapsed_seconds: number;
  is_paused: boolean;
  offline_pending_count: number;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone_or_email: string;
  relationship: string;
  is_active: boolean;
}

export interface SafeJourneySession {
  id: string;
  user_id: string;
  user_name: string;
  origin: string;
  destination: string;
  destination_coords: LatLng;
  expected_arrival_time: string;
  trusted_contacts: TrustedContact[];
  current_location: LatLng;
  battery_percentage: number;
  status: 'active' | 'arrived' | 'deviated' | 'sos';
  last_updated: string;
  deviation_reason?: string;
}

export interface BudgetStay {
  id: string;
  name: string;
  type: 'Hostel' | 'Homestay' | 'Student Lodge' | 'Budget Hotel';
  city: string;
  address: string;
  location: LatLng;
  price_per_night_inr: number;
  rating: number;
  verified_badge: boolean;
  solo_friendly: boolean;
  family_friendly: boolean;
  distance_from_hub_km: number;
  nearest_transport_access: string;
  photos: string[];
  contact_phone: string;
}

export interface TravelPassport {
  user_id: string;
  total_km_travelled: number;
  routes_completed_count: number;
  cities_visited: string[];
  carbon_saved_kg: number;
  contribution_points: number;
  badges: string[];
  travel_dna: {
    nature: number;
    culture: number;
    budget: number;
    food: number;
    adventure: number;
  };
  saved_routes: string[];
}

export interface SystemAnalytics {
  total_users: number;
  total_routes: number;
  verified_routes_count: number;
  active_journeys_count: number;
  total_confirmations: number;
  total_reports_pending: number;
  route_reliability_percent: number;
  pending_developer_verification_count: number;
}

export type GovReportCategory = 'road_damage' | 'transit_delay' | 'missing_signage' | 'safety_concern' | 'feeder_demand';
export type GovReportStatus = 'under_review' | 'acknowledged' | 'scheduled' | 'resolved';

export interface GovInfraReport {
  id: string;
  title: string;
  location: string;
  category: GovReportCategory;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  upvotes: number;
  status: GovReportStatus;
  reported_by: string;
  created_at: string;
}

export interface TransitPlanningGap {
  id: string;
  origin: string;
  destination: string;
  commuters_count: number;
  avg_walk_meters: number;
  suggested_action: string;
}
