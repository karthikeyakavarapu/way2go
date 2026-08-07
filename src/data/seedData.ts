import type { RouteGuide, BudgetStay, SystemAnalytics, TravelPassport, UserProfile, GovInfraReport, TransitPlanningGap } from '../types';

export const CURRENT_DEMO_USER: UserProfile = {
  id: 'user-karthik-lead',
  email: 'karthikakavarapuu@gmail.com',
  full_name: 'Karthik Akavarapu',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'admin',
  reputation_score: 98,
  badge_title: 'Lead Architect & Developer',
  is_verified_guide: true,
  is_opted_in_helper: true,
  registered_city: 'Chennai',
  registered_area: 'Ramapuram',
  created_at: '2026-01-15T10:00:00Z',
  contact_email: 'karthikakavarapuu@gmail.com'
};

export const INITIAL_ROUTES: RouteGuide[] = [
  {
    id: 'route-srm-marina-01',
    title: 'SRM Ramapuram → Marina Beach',
    tagline: 'The ultimate student budget guide to Chennai coastline with exact bus stops & exit gates.',
    origin_name: 'SRM Ramapuram Campus',
    origin_coords: { lat: 13.0336, lng: 80.1802 },
    destination_name: 'Marina Beach Promenade',
    destination_coords: { lat: 13.0499, lng: 80.2824 },
    total_distance_km: 18.2,
    total_duration_minutes: 48,
    total_cost_inr: 35,
    confidence_score: 94,
    last_verified_at: 'Recently verified',
    successful_completions_count: 3,
    recent_confirmations_count: 3,
    difficulty_level: 'Beginner',
    category: 'Beginner Friendly',
    tags: ['Student Budget', 'Beach', 'Bus + Walk', 'Verified Steps'],
    author_id: CURRENT_DEMO_USER.id,
    author_name: CURRENT_DEMO_USER.full_name,
    author_avatar: CURRENT_DEMO_USER.avatar_url,
    city_area: 'Chennai - Ramapuram',
    publishing_status: 'published',
    created_at: '2026-02-01T12:00:00Z',
    updated_at: '2026-08-04T10:30:00Z',
    is_published: true,
    is_featured: true,
    primary_source_label: 'SOURCE: Community Verified by 3 Travellers',
    segments: [
      {
        id: 'seg-1',
        step_number: 1,
        transport_mode: 'walk',
        title: 'Exit SRM Gate 2 & walk to Ramapuram Main Road',
        instruction_full: 'Exit SRM Ramapuram through Gate 2 near the Mechanical Block. Walk 200m down the main avenue past the tea stall toward the Ramapuram Bus Stand.',
        instruction_simplified: '1. Walk out of Gate 2.\n2. Go straight past the tea stall.\n3. Stop at the main road bus shelter on your left.',
        start_location: { lat: 13.0336, lng: 80.1802 },
        end_location: { lat: 13.0348, lng: 80.1818 },
        distance_meters: 220,
        estimated_minutes: 3,
        estimated_cost_inr: 0,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 3 Travellers',
        polyline_coords: [
          { lat: 13.0336, lng: 80.1802 },
          { lat: 13.0342, lng: 80.1810 },
          { lat: 13.0348, lng: 80.1818 }
        ],
        landmarks: [
          {
            id: 'lm-1',
            name: 'SRM Gate 2 Security Post',
            description: 'Main campus exit gate for pedestrian students',
            location: { lat: 13.0336, lng: 80.1802 },
            photo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
            is_exit_entry_point: true
          }
        ],
        media: [
          {
            id: 'med-1',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=800',
            caption: 'Walk down this pathway from Gate 2 toward the bus stop shelter',
            step_index: 1,
            uploaded_by: CURRENT_DEMO_USER.full_name,
            created_at: '2026-07-28T14:00:00Z'
          }
        ],
        tips: ['Watch out for autorickshaws near the gate', 'Keep exact ₹15 change for the bus ticket']
      },
      {
        id: 'seg-2',
        step_number: 2,
        transport_mode: 'bus',
        title: 'Board Bus 88K / 88K ET to Guindy Station',
        instruction_full: 'Board MTC Bus 88K or 88K ET from Ramapuram Stop. Buy a ₹15 ticket to Guindy Railway Station / Metro.',
        instruction_simplified: '1. Wait at the Ramapuram Stop shelter.\n2. Look for Bus number 88K.\n3. Pay conductor ₹15 for Guindy Station.',
        start_location: { lat: 13.0348, lng: 80.1818 },
        end_location: { lat: 13.0067, lng: 80.2021 },
        distance_meters: 6500,
        estimated_minutes: 20,
        estimated_cost_inr: 15,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 126 Travellers',
        polyline_coords: [
          { lat: 13.0348, lng: 80.1818 },
          { lat: 13.0250, lng: 80.1890 },
          { lat: 13.0150, lng: 80.1970 },
          { lat: 13.0067, lng: 80.2021 }
        ],
        stops: [
          {
            id: 'stop-1',
            name: 'Ramapuram Bus Stand',
            location: { lat: 13.0348, lng: 80.1818 },
            transport_mode: 'bus',
            route_numbers: ['88K', '88K ET', '17M'],
            photo_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600',
            tips: 'Buses run every 10-12 minutes during peak hours'
          },
          {
            id: 'stop-2',
            name: 'Guindy Railway Station / Metro Stop',
            location: { lat: 13.0067, lng: 80.2021 },
            transport_mode: 'bus',
            route_numbers: ['88K', '21G', '102'],
            photo_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600'
          }
        ],
        media: [
          {
            id: 'med-2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
            caption: 'Ramapuram bus stop shelter with 88K queue line',
            step_index: 2,
            uploaded_by: CURRENT_DEMO_USER.full_name,
            created_at: '2026-07-28T14:15:00Z'
          }
        ],
        tips: ['Seats are usually available near the rear door', 'Avoid rush hours between 8:30 AM - 9:30 AM']
      },
      {
        id: 'seg-3',
        step_number: 3,
        transport_mode: 'bus',
        title: 'Transfer to Bus 21G / 102 toward Light House',
        instruction_full: 'At Guindy bus junction, cross over to the Beach-bound side and board Bus 21G or 102 direct to Light House / Marina Beach.',
        instruction_simplified: '1. Get off at Guindy stop.\n2. Cross over using the pedestrian subway.\n3. Board Bus 21G direct to Light House.',
        start_location: { lat: 13.0067, lng: 80.2021 },
        end_location: { lat: 13.0482, lng: 80.2801 },
        distance_meters: 11200,
        estimated_minutes: 22,
        estimated_cost_inr: 20,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 126 Travellers',
        polyline_coords: [
          { lat: 13.0067, lng: 80.2021 },
          { lat: 13.0200, lng: 80.2300 },
          { lat: 13.0380, lng: 80.2650 },
          { lat: 13.0482, lng: 80.2801 }
        ],
        landmarks: [
          {
            id: 'lm-2',
            name: 'Chennai Light House Landmark',
            description: 'Red & white circular lighthouse landmark facing Marina Beach',
            location: { lat: 13.0482, lng: 80.2801 },
            photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600'
          }
        ],
        media: [
          {
            id: 'med-3',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            caption: 'Light House bus stop where you get down right across Marina promenade',
            step_index: 3,
            uploaded_by: CURRENT_DEMO_USER.full_name,
            created_at: '2026-07-28T14:40:00Z'
          }
        ],
        tips: ['Sit on the right side of the bus for scenic views of Santhome Basilica along Kamarajar Salai']
      },
      {
        id: 'seg-4',
        step_number: 4,
        transport_mode: 'walk',
        title: 'Cross Kamarajar Salai to Marina Promenade',
        instruction_full: 'Use the signal crosswalk outside the Light House to safely cross Kamarajar Salai. Walk 150m across the paved plaza directly to the sand line.',
        instruction_simplified: '1. Wait for traffic signal green man.\n2. Cross Kamarajar Salai street.\n3. Walk past the food stalls to reach the sand!',
        start_location: { lat: 13.0482, lng: 80.2801 },
        end_location: { lat: 13.0499, lng: 80.2824 },
        distance_meters: 280,
        estimated_minutes: 3,
        estimated_cost_inr: 0,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 126 Travellers',
        polyline_coords: [
          { lat: 13.0482, lng: 80.2801 },
          { lat: 13.0490, lng: 80.2812 },
          { lat: 13.0499, lng: 80.2824 }
        ],
        landmarks: [
          {
            id: 'lm-3',
            name: 'Marina Beach Sundial Plaza',
            description: 'Iconic beachfront gathering point with snack stalls',
            location: { lat: 13.0499, lng: 80.2824 },
            photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600'
          }
        ],
        media: [
          {
            id: 'med-4',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            caption: 'Destination arrived! Enjoy the sea breeze.',
            step_index: 4,
            uploaded_by: CURRENT_DEMO_USER.full_name,
            created_at: '2026-07-28T14:45:00Z'
          }
        ],
        tips: ['Famous Murugan Sundal stalls are located right near the entrance', 'Police assistance booth available at crosswalk']
      }
    ]
  },
  {
    id: 'route-iit-besant-02',
    title: 'IIT Madras Gate → Besant Nagar Beach',
    tagline: 'Scenic shady green route from IIT Main Gate to Elliot’s Beach & Murugan Idli Shop.',
    origin_name: 'IIT Madras In-Gate',
    origin_coords: { lat: 13.0062, lng: 80.2372 },
    destination_name: 'Elliot’s Beach Promenade',
    destination_coords: { lat: 12.9992, lng: 80.2721 },
    total_distance_km: 4.5,
    total_duration_minutes: 25,
    total_cost_inr: 25,
    confidence_score: 98,
    last_verified_at: '1 day ago',
    successful_completions_count: 310,
    recent_confirmations_count: 14,
    difficulty_level: 'Beginner',
    category: 'Cheapest',
    tags: ['Student Favorite', 'Auto/Share', 'Beach', 'Scenic'],
    author_id: 'user-02',
    author_name: 'Ananya S.',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    city_area: 'Chennai - Besant Nagar',
    publishing_status: 'published',
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-08-03T16:00:00Z',
    is_published: true,
    is_featured: true,
    primary_source_label: 'SOURCE: Community Verified by 310 Travellers',
    segments: [
      {
        id: 'iit-seg-1',
        step_number: 1,
        transport_mode: 'auto',
        title: 'Share Auto from IIT Gate to Besant Nagar Bus Stand',
        instruction_full: 'Take a ₹20 shared auto right outside IIT Madras main gate heading toward Besant Nagar.',
        instruction_simplified: '1. Step outside main gate.\n2. Look for yellow shared auto.\n3. Ask for Besant Nagar Stand (₹20).',
        start_location: { lat: 13.0062, lng: 80.2372 },
        end_location: { lat: 12.9998, lng: 80.2690 },
        distance_meters: 4100,
        estimated_minutes: 18,
        estimated_cost_inr: 20,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 310 Travellers',
        polyline_coords: [
          { lat: 13.0062, lng: 80.2372 },
          { lat: 13.0020, lng: 80.2520 },
          { lat: 12.9998, lng: 80.2690 }
        ]
      },
      {
        id: 'iit-seg-2',
        step_number: 2,
        transport_mode: 'walk',
        title: 'Walk through 6th Avenue to Elliot’s Beach',
        instruction_full: 'Walk 400m along the tree-lined 6th Avenue past Coonoor Tea house straight onto the beach avenue.',
        instruction_simplified: '1. Walk down the paved avenue.\n2. Pass the cafes.\n3. Beach is straight ahead.',
        start_location: { lat: 12.9998, lng: 80.2690 },
        end_location: { lat: 12.9992, lng: 80.2721 },
        distance_meters: 400,
        estimated_minutes: 7,
        estimated_cost_inr: 0,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 310 Travellers',
        polyline_coords: [
          { lat: 12.9998, lng: 80.2690 },
          { lat: 12.9992, lng: 80.2721 }
        ]
      }
    ]
  },
  {
    id: 'route-guindy-phoenix-03',
    title: 'Guindy Junction → Phoenix Marketcity Velachery',
    tagline: 'Direct bus route 570 / 570X connecting Guindy Metro to Phoenix Mall.',
    origin_name: 'Guindy Bus Bay',
    origin_coords: { lat: 13.0067, lng: 80.2021 },
    destination_name: 'Phoenix Marketcity Entrance',
    destination_coords: { lat: 12.9915, lng: 80.2170 },
    total_distance_km: 3.8,
    total_duration_minutes: 15,
    total_cost_inr: 15,
    confidence_score: 95,
    last_verified_at: '3 hours ago',
    successful_completions_count: 88,
    recent_confirmations_count: 6,
    difficulty_level: 'Beginner',
    category: 'Fastest',
    tags: ['MTC Bus 570', 'Mall Access', 'Velachery Route'],
    author_id: CURRENT_DEMO_USER.id,
    author_name: CURRENT_DEMO_USER.full_name,
    author_avatar: CURRENT_DEMO_USER.avatar_url,
    city_area: 'Chennai - Guindy',
    publishing_status: 'published',
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-08-04T12:00:00Z',
    is_published: true,
    is_featured: false,
    primary_source_label: 'SOURCE: Community Verified by 88 Travellers',
    segments: [
      {
        id: 'g-seg-1',
        step_number: 1,
        transport_mode: 'bus',
        title: 'Board Bus 570 / 570X from Guindy Outer Bus Bay',
        instruction_full: 'Wait at the Guindy outer bus shelter and board MTC Bus 570 or 570X heading toward Velachery.',
        instruction_simplified: '1. Wait at Guindy outer bus shelter.\n2. Board Bus 570.\n3. Alight at Phoenix Mall stop.',
        start_location: { lat: 13.0067, lng: 80.2021 },
        end_location: { lat: 12.9915, lng: 80.2170 },
        distance_meters: 3800,
        estimated_minutes: 15,
        estimated_cost_inr: 15,
        source_type: 'community_verified',
        source_label: 'SOURCE: Community Verified by 88 Travellers',
        polyline_coords: [
          { lat: 13.0067, lng: 80.2021 },
          { lat: 12.9990, lng: 80.2100 },
          { lat: 12.9915, lng: 80.2170 }
        ],
        stops: [
          {
            id: 'g-stop-1',
            name: 'Guindy Bus Bay',
            location: { lat: 13.0067, lng: 80.2021 },
            transport_mode: 'bus',
            route_numbers: ['570', '570X', 'D70']
          }
        ]
      }
    ]
  }
];

export const INITIAL_BUDGET_STAYS: BudgetStay[] = [
  {
    id: 'stay-01',
    name: 'Zostel Chennai Beachside',
    type: 'Hostel',
    city: 'Chennai',
    address: 'No 42, Santhome High Road, Mylapore',
    location: { lat: 13.0380, lng: 80.2770 },
    price_per_night_inr: 599,
    rating: 4.8,
    verified_badge: true,
    solo_friendly: true,
    family_friendly: false,
    distance_from_hub_km: 1.2,
    nearest_transport_access: 'Light House Bus Stop & Metro Feeder',
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600'
    ],
    contact_phone: '+91 98765 43210'
  },
  {
    id: 'stay-02',
    name: 'Ramapuram Student Hive Homestay',
    type: 'Homestay',
    city: 'Chennai',
    address: 'Plot 15, Near SRM Gate 1, Ramapuram',
    location: { lat: 13.0340, lng: 80.1810 },
    price_per_night_inr: 450,
    rating: 4.6,
    verified_badge: true,
    solo_friendly: true,
    family_friendly: true,
    distance_from_hub_km: 0.3,
    nearest_transport_access: 'Ramapuram MTC Bus Stand',
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600'
    ],
    contact_phone: '+91 91234 56789'
  }
];

export const INITIAL_PASSPORT: TravelPassport = {
  user_id: CURRENT_DEMO_USER.id,
  total_km_travelled: 142.8,
  routes_completed_count: 14,
  cities_visited: ['Chennai', 'Kanchipuram', 'Madurai', 'Pondicherry'],
  carbon_saved_kg: 38.5,
  contribution_points: 480,
  badges: ['Route Pioneer', 'Verified Master Guide', 'Local Explorer', 'Eco Commuter'],
  travel_dna: {
    nature: 85,
    culture: 78,
    budget: 92,
    food: 88,
    adventure: 70
  },
  saved_routes: ['route-srm-marina-01', 'route-iit-besant-02']
};

export const INITIAL_SYSTEM_ANALYTICS: SystemAnalytics = {
  total_users: 14820,
  total_routes: 1240,
  verified_routes_count: 986,
  active_journeys_count: 42,
  total_confirmations: 8940,
  total_reports_pending: 3,
  route_reliability_percent: 94.8,
  pending_developer_verification_count: 0
};

export const INITIAL_GOV_REPORTS: GovInfraReport[] = [
  {
    id: 'gov-rep-01',
    title: 'Severe road damage and flooding at SRM Gate 2 entrance road',
    location: 'SRM Ramapuram Gate 2, Ramapuram Main Road',
    category: 'road_damage',
    description: 'Pothole damage causing heavy water stagnation. Highly unsafe for pedestrians walking to the bus stop during rain.',
    urgency: 'high',
    upvotes: 42,
    status: 'acknowledged',
    reported_by: '@serm_commuter',
    created_at: '2 days ago'
  },
  {
    id: 'gov-rep-02',
    title: 'MTC Bus Route 88K scheduling delay & lack of bus shelter seating',
    location: 'Ramapuram Bus Stop, Mount-Poonamallee High Road',
    category: 'transit_delay',
    description: 'Bus 88K frequently departs 15 mins late in evenings. Also, the shelter has no benches and lighting is missing at night.',
    urgency: 'medium',
    upvotes: 27,
    status: 'under_review',
    reported_by: '@transit_lover',
    created_at: '1 day ago'
  },
  {
    id: 'gov-rep-03',
    title: 'Unsafe path and low lighting under Guindy Metro Walkway subway',
    location: 'Guindy Metro Subway Exit Area',
    category: 'safety_concern',
    description: 'Walkway under subway is completely dark after 8 PM. Suggest installing LED solar lamps.',
    urgency: 'high',
    upvotes: 84,
    status: 'scheduled',
    reported_by: '@chennai_girl_safety',
    created_at: '4 days ago'
  },
  {
    id: 'gov-rep-04',
    title: 'Request for Metro Feeder Mini-Bus from SRM Campus to Guindy Metro',
    location: 'SRM Ramapuram Campus area to Guindy metro corridor',
    category: 'feeder_demand',
    description: 'Over 200 students walk/take autos daily. A direct feeder bus every 30 mins would reduce travel congestion drastically.',
    urgency: 'high',
    upvotes: 112,
    status: 'under_review',
    reported_by: '@srm_association',
    created_at: '12 hours ago'
  },
  {
    id: 'gov-rep-05',
    title: 'Repaired pedestrian footpath tiles opposite Light House railway station',
    location: 'Marina Beach Road walkway, opposite Light House Station',
    category: 'road_damage',
    description: 'Tiles were broken making it inaccessible for wheelchair users. Thank you for patching this!',
    urgency: 'low',
    upvotes: 19,
    status: 'resolved',
    reported_by: '@eco_pedestrian',
    created_at: '1 week ago'
  }
];

export const INITIAL_TRANSIT_GAPS: TransitPlanningGap[] = [
  {
    id: 'gap-01',
    origin: 'SRM Gate 2',
    destination: 'Ramapuram Main Road Stand',
    commuters_count: 850,
    avg_walk_meters: 220,
    suggested_action: 'Establish E-Rickshaw/Feeder stand to bridge high pedestrian walking load.'
  },
  {
    id: 'gap-02',
    origin: 'Guindy Metro Exit',
    destination: 'Guindy Suburban Railway Counter',
    commuters_count: 4200,
    avg_walk_meters: 140,
    suggested_action: 'Construct unified skywalk extension to bypass signalized intersection congestion.'
  },
  {
    id: 'gap-03',
    origin: 'Light House railway station',
    destination: 'Marina Beach Road Food Stalls',
    commuters_count: 1200,
    avg_walk_meters: 350,
    suggested_action: 'Introduce automated public bicycle-sharing dock with dedicated green lane markers.'
  }
];
