-- DEMO DATA SEED SCRIPT FOR WAY2GO (SIH25082)

-- Insert Demo Profile
INSERT INTO public.profiles (id, email, full_name, role, reputation_score, badge_title, is_verified_guide)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'karthikakavarapuu@gmail.com',
  'Karthik Akavarapu',
  'contributor',
  96,
  'Verified Master Guide',
  true
) ON CONFLICT (id) DO NOTHING;

-- Insert SRM Ramapuram -> Marina Beach Demo Route
INSERT INTO public.route_guides (
  id, title, tagline, origin_name, origin_lat, origin_lng,
  destination_name, destination_lat, destination_lng,
  total_distance_km, total_duration_minutes, total_cost_inr,
  confidence_score, successful_completions_count, recent_confirmations_count,
  difficulty_level, category, tags, author_id, is_published, is_featured
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'SRM Ramapuram → Marina Beach',
  'The ultimate student budget guide to Chennai coastline with exact bus stops & exit gates.',
  'SRM Ramapuram Campus', 13.0336, 80.1802,
  'Marina Beach Promenade', 13.0499, 80.2824,
  18.2, 48, 35.00,
  94, 126, 8,
  'Beginner', 'Beginner Friendly', ARRAY['Student Budget', 'Beach', 'Bus + Walk'],
  '00000000-0000-0000-0000-000000000001', true, true
) ON CONFLICT (id) DO NOTHING;
