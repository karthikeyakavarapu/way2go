import type { TravelReel } from '../types';

const STORAGE_KEY = 'way2go_travel_reels_db';

const SEED_REELS: TravelReel[] = [
  {
    id: 'reel-1',
    title: 'Sunset Walk at Marina Beach Promenade 🌅',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    city: 'Chennai',
    location_name: 'Marina Beach Promenade',
    location_coords: { lat: 13.0499, lng: 80.2824 },
    attached_route_id: 'route-srm-marina',
    attached_place_name: 'Marina Beach',
    creator_id: 'c-101',
    creator_name: 'Priya Commuter',
    creator_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    likes_count: 1420,
    comments_count: 84,
    category: 'Beach',
    moderation_status: 'APPROVED',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'reel-2',
    title: 'French Quarter Cycling in Pondicherry 🇫🇷🚲',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41135-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1589705900889-7e5342d0777c?auto=format&fit=crop&q=80&w=400',
    city: 'Puducherry',
    location_name: 'White Town French Quarter',
    location_coords: { lat: 11.9416, lng: 79.8083 },
    attached_route_id: 'route-srm-pondicherry',
    attached_place_name: 'Pondicherry French Quarter',
    creator_id: 'c-102',
    creator_name: 'Arun Traveler',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    likes_count: 980,
    comments_count: 52,
    category: 'Place',
    moderation_status: 'APPROVED',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'reel-3',
    title: 'Quick Metro Boarding Guide at Guindy Station 🚆',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-subway-train-arriving-at-the-station-41139-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=400',
    city: 'Chennai',
    location_name: 'Guindy Metro Interchange',
    location_coords: { lat: 13.0067, lng: 80.2021 },
    attached_route_id: 'route-srm-marina',
    attached_place_name: 'Guindy Metro',
    creator_id: 'c-103',
    creator_name: 'Karthik Lead',
    creator_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    likes_count: 2150,
    comments_count: 110,
    category: 'Transit',
    moderation_status: 'APPROVED',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export class TravelReelsService {
  /**
   * Get all travel reels (optionally filtered by city or moderation state)
   */
  public static getReels(cityFilter?: string, includePending = false): TravelReel[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: TravelReel[] = raw ? JSON.parse(raw) : SEED_REELS;

      return all.filter(r => {
        if (!includePending && r.moderation_status !== 'APPROVED') return false;
        if (cityFilter && cityFilter !== 'All') {
          return r.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
                 r.location_name.toLowerCase().includes(cityFilter.toLowerCase());
        }
        return true;
      });
    } catch (err) {
      return SEED_REELS;
    }
  }

  /**
   * Create & Upload a new Travel Reel
   */
  public static uploadReel(
    data: Omit<TravelReel, 'id' | 'likes_count' | 'comments_count' | 'moderation_status' | 'created_at'>
  ): TravelReel {
    const reels = this.getReels(undefined, true);
    const newReel: TravelReel = {
      ...data,
      id: `reel-${Date.now()}`,
      likes_count: 0,
      comments_count: 0,
      moderation_status: 'APPROVED', // Default approved for MVP
      created_at: new Date().toISOString()
    };

    reels.unshift(newReel);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reels));
    return newReel;
  }

  /**
   * Admin Moderate Reel
   */
  public static setReelModeration(reelId: string, status: 'APPROVED' | 'REJECTED'): void {
    const reels = this.getReels(undefined, true);
    const idx = reels.findIndex(r => r.id === reelId);
    if (idx >= 0) {
      reels[idx].moderation_status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reels));
    }
  }
}
