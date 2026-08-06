-- Enable PostGIS extension for geographic spatial queries if supported
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'traveller' CHECK (role IN ('traveller', 'contributor', 'helper', 'admin')),
  reputation_score INT NOT NULL DEFAULT 50,
  badge_title TEXT DEFAULT 'Explorer',
  is_verified_guide BOOLEAN DEFAULT FALSE,
  is_opted_in_helper BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Route Guides Table
CREATE TABLE IF NOT EXISTS public.route_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tagline TEXT,
  origin_name TEXT NOT NULL,
  origin_lat DOUBLE PRECISION NOT NULL,
  origin_lng DOUBLE PRECISION NOT NULL,
  destination_name TEXT NOT NULL,
  destination_lat DOUBLE PRECISION NOT NULL,
  destination_lng DOUBLE PRECISION NOT NULL,
  total_distance_km NUMERIC(6, 2) NOT NULL,
  total_duration_minutes INT NOT NULL,
  total_cost_inr NUMERIC(8, 2) NOT NULL DEFAULT 0,
  confidence_score INT NOT NULL DEFAULT 70 CHECK (confidence_score BETWEEN 0 AND 100),
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  successful_completions_count INT DEFAULT 1,
  recent_confirmations_count INT DEFAULT 1,
  difficulty_level TEXT DEFAULT 'Beginner',
  category TEXT DEFAULT 'Community Route',
  tags TEXT[] DEFAULT ARRAY['Community Route'],
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Route Guides
ALTER TABLE public.route_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published routes are readable by all" 
  ON public.route_guides FOR SELECT USING (is_published = true);

CREATE POLICY "Contributors can insert their own route guides" 
  ON public.route_guides FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors or Admins can update route guides" 
  ON public.route_guides FOR UPDATE USING (
    auth.uid() = author_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Indexes for fast spatial and text search
CREATE INDEX IF NOT EXISTS idx_routes_confidence ON public.route_guides(confidence_score DESC);
CREATE INDEX IF NOT EXISTS idx_routes_category ON public.route_guides(category);
CREATE INDEX IF NOT EXISTS idx_routes_published ON public.route_guides(is_published);

-- 3. Route Segments Table
CREATE TABLE IF NOT EXISTS public.route_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES public.route_guides(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  transport_mode TEXT NOT NULL CHECK (transport_mode IN ('walk', 'bus', 'train', 'metro', 'auto', 'taxi', 'bicycle')),
  title TEXT NOT NULL,
  instruction_full TEXT NOT NULL,
  instruction_simplified TEXT NOT NULL,
  start_lat DOUBLE PRECISION NOT NULL,
  start_lng DOUBLE PRECISION NOT NULL,
  end_lat DOUBLE PRECISION NOT NULL,
  end_lng DOUBLE PRECISION NOT NULL,
  distance_meters INT NOT NULL,
  estimated_minutes INT NOT NULL,
  estimated_cost_inr NUMERIC(8, 2) DEFAULT 0,
  polyline_json JSONB NOT NULL,
  tips TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Route Segments
ALTER TABLE public.route_segments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Segments are readable by all" 
  ON public.route_segments FOR SELECT USING (true);

-- 4. Route Confirmations Table
CREATE TABLE IF NOT EXISTS public.route_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES public.route_guides(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('worked', 'changed', 'failed')),
  feedback_type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.route_confirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Confirmations readable by all" 
  ON public.route_confirmations FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit confirmations" 
  ON public.route_confirmations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Safe Journey Sessions Table
CREATE TABLE IF NOT EXISTS public.safe_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  expected_arrival_time TEXT NOT NULL,
  trusted_contact_name TEXT NOT NULL,
  trusted_contact_phone TEXT NOT NULL,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  battery_percentage INT DEFAULT 100,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'arrived', 'deviated', 'sos')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.safe_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users or Trusted Contacts can view safe sessions" 
  ON public.safe_journeys FOR SELECT USING (auth.uid() = user_id);

-- 6. Budget Stays Table
CREATE TABLE IF NOT EXISTS public.budget_stays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Hostel', 'Homestay', 'Student Lodge', 'Budget Hotel')),
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  price_per_night_inr NUMERIC(8, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.5,
  verified_badge BOOLEAN DEFAULT TRUE,
  solo_friendly BOOLEAN DEFAULT TRUE,
  family_friendly BOOLEAN DEFAULT FALSE,
  nearest_transport_access TEXT,
  contact_phone TEXT,
  photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.budget_stays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Budget stays readable by everyone" 
  ON public.budget_stays FOR SELECT USING (true);
