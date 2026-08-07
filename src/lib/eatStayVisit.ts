import type { EatStayVisit, RoomSharingMatch } from '../types';

const STORAGE_KEYS = {
  EAT_STAY_VISIT: 'way2go_eat_stay_visit_db',
  ROOM_SHARING: 'way2go_room_sharing_db'
};

const SEED_EAT_STAY_VISIT: EatStayVisit[] = [
  // CHENNAI
  {
    id: 'esv-1',
    destination_city: 'Chennai',
    type: 'eat',
    title: 'Ratna Cafe (Triplicane Sambar)',
    description: 'Famous historic South Indian breakfast & unlimited sambar idli.',
    price_tag: '₹120 for two',
    rating: 4.8,
    location_name: 'Triplicane, Chennai',
    location_coords: { lat: 13.0587, lng: 80.2757 },
    photo_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'esv-2',
    destination_city: 'Chennai',
    type: 'stay',
    title: 'Zostel Chennai Backpackers Hostel',
    description: 'Popular student & solo traveller lodge with AC dorms and high-speed Wi-Fi.',
    price_tag: '₹699/night',
    rating: 4.7,
    location_name: 'Triplicane High Rd, Chennai',
    location_coords: { lat: 13.0550, lng: 80.2700 },
    photo_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400',
    room_sharing_available: true
  },
  {
    id: 'esv-3',
    destination_city: 'Chennai',
    type: 'visit',
    title: 'Marina Beach Sunset Promenade',
    description: 'World’s 2nd longest natural urban beach. Great street food & lighthouse view.',
    price_tag: 'Free Entry',
    rating: 4.9,
    location_name: 'Kamarajar Salai, Chennai',
    location_coords: { lat: 13.0499, lng: 80.2824 },
    photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400'
  },
  // PUDUCHERRY
  {
    id: 'esv-4',
    destination_city: 'Puducherry',
    type: 'eat',
    title: 'Baker Street French Bakery',
    description: 'Authentic French croissants, quiches, and artisan coffees in White Town.',
    price_tag: '₹250 for two',
    rating: 4.9,
    location_name: 'Bussy Street, White Town',
    location_coords: { lat: 11.9350, lng: 79.8300 },
    photo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'esv-5',
    destination_city: 'Puducherry',
    type: 'stay',
    title: 'French Heritage Villa Homestay',
    description: 'Charming French colonial homestay 200m from Promenade beach.',
    price_tag: '₹950/night',
    rating: 4.8,
    location_name: 'Romain Rolland St, Puducherry',
    location_coords: { lat: 11.9320, lng: 79.8340 },
    photo_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
    room_sharing_available: true
  }
];

const SEED_ROOM_SHARING: RoomSharingMatch[] = [
  {
    id: 'rs-1',
    user_id: 'u-101',
    user_name: 'Priya Sharma',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    destination_city: 'Puducherry',
    travel_dates: 'Aug 15 - Aug 17',
    budget_per_night_inr: 500,
    gender_preference: 'Female Only',
    contact_phone: '+91 98401 11223',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: 'rs-2',
    user_id: 'u-102',
    user_name: 'Rahul Verma',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    destination_city: 'Chennai',
    travel_dates: 'Aug 20 - Aug 22',
    budget_per_night_inr: 450,
    gender_preference: 'Any',
    contact_phone: '+91 98402 33445',
    status: 'active',
    created_at: new Date().toISOString()
  }
];

export class EatStayVisitService {
  public static getRecommendations(city: string, typeFilter?: 'eat' | 'stay' | 'visit'): EatStayVisit[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.EAT_STAY_VISIT);
      const all: EatStayVisit[] = raw ? JSON.parse(raw) : SEED_EAT_STAY_VISIT;
      return all.filter(item => {
        const cityMatch = item.destination_city.toLowerCase().includes(city.toLowerCase()) || city === 'All';
        const typeMatch = !typeFilter || item.type === typeFilter;
        return cityMatch && typeMatch;
      });
    } catch (err) {
      return SEED_EAT_STAY_VISIT;
    }
  }

  public static getRoomSharingMatches(city: string): RoomSharingMatch[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ROOM_SHARING);
      const all: RoomSharingMatch[] = raw ? JSON.parse(raw) : SEED_ROOM_SHARING;
      return all.filter(r => r.destination_city.toLowerCase().includes(city.toLowerCase()) || city === 'All');
    } catch (err) {
      return SEED_ROOM_SHARING;
    }
  }

  public static postRoomSharingRequest(data: Omit<RoomSharingMatch, 'id' | 'status' | 'created_at'>): RoomSharingMatch {
    const list = this.getRoomSharingMatches('All');
    const newRecord: RoomSharingMatch = {
      ...data,
      id: `rs-${Date.now()}`,
      status: 'active',
      created_at: new Date().toISOString()
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.ROOM_SHARING, JSON.stringify(list));
    return newRecord;
  }
}
