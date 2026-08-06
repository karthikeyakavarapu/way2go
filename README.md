# WAY2GO — Community-Powered Travel Route Intelligence Platform
> **Smart India Hackathon 2026 Problem SIH25082**  
> *"Don't just find the destination. Learn how to actually get there."*

---

## 🌟 Overview & Product Vision

**WAY2GO** is a real, production-quality, realtime community-powered web/mobile-first platform designed to solve real-world travel navigation challenges for first-time travellers and students.

Unlike traditional point-A to point-B mapping tools, WAY2GO answers:  
**"How did a real person actually get there?"**

---

## ✨ Core Features & Key Differentiators

1. **SRM Ramapuram → Marina Beach Demo Scenario**: Pre-configured hackathon demo path featuring exact exit gates, bus numbers (88K & 21G), stop shelters, landmark photos, fares (₹35 total), and 48-minute timeline.
2. **Human-Friendly Route Guide**: Step-by-step visual steps with walking, transit transfer stops, and contributor media verification.
3. **First-Time Traveller Mode**: Toggle that converts technical transport directions into plain-English simplified step cards.
4. **Real Journey Recorder & Segment Detection**: HTML5 Geolocation tracking with movement velocity detection (walk vs vehicle), photo/note capture, pause/resume, and an **Offline-First Queue Engine** that syncs when network returns.
5. **Deterministic Route Confidence Scoring**: Formula-based score calculation combining completions, recent confirmations, GPS trace similarity, and report deductions.
6. **Realtime Safe Journey Mode**: Live private session sharing with trusted contacts, battery monitor, gentle route deviation prompt (*"Your journey differs from planned route. Are you okay?"*), and one-touch **Emergency SOS**.
7. **Budget Routing & Verified Stays**: Max pocket fare filter (slider ₹10–₹300) and verified student hostels/homestays near transport hubs.
8. **Travel Passport & Travel DNA**: Dynamic user stats (Km covered, Carbon offset, Badges earned, Travel DNA radar profile, personal semantic search, and shareable **Trip Story** visual card with confetti celebration).
9. **Admin Moderation & Analytics Dashboard**: Live metrics for Total Users, Published Routes, Verifications, Active Safe Journeys, and Content Moderation Queue.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism aesthetic + Lucide Icons + Framer Motion
- **Interactive Maps**: Leaflet + OpenStreetMap + OSRM directions engine
- **Backend & Database**: Supabase (PostgreSQL with RLS policies, PostGIS spatial queries, Supabase Auth & Realtime channels, plus local storage fallback engine)
- **AI Intelligence**: Provider-agnostic AI layer (Google Gemini / OpenAI compatible with rule-engine fallback) for natural language search & story generation

---

## ⚡ Quick Start & Development Setup

### 1. Installation
```bash
cd way2go
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```

### 3. Build for Production & Type Check
```bash
npm run build
```

---

## 🗄️ Supabase Migration Setup

To deploy the schema to your live Supabase project:

1. Copy SQL from `supabase/schema.sql` into the Supabase SQL Editor.
2. Copy SQL from `supabase/seed.sql` to populate initial demo data.
3. Set environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 👨‍💻 Architect & Developer Contact Credit

- **Lead Software Architect & Developer**: Karthik Akavarapu
- **Contact Email**: `karthikakavarapuu@gmail.com`
- **Hackathon ID**: SIH25082 — Smart India Hackathon 2026
