import type { ResolvedPlace } from '../types';

/**
 * Pre-resolved landmark dictionary for instant high-speed lookup
 */
const KNOWN_PLACES: Record<string, ResolvedPlace> = {
  'srm': {
    placeId: 'place-srm-ramapuram',
    name: 'SRM Institute of Science & Technology, Ramapuram',
    formattedAddress: 'Bharathi Salai, Ramapuram, Chennai, Tamil Nadu 600089',
    location: { lat: 13.0336, lng: 80.1802 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'srm ramapuram': {
    placeId: 'place-srm-ramapuram',
    name: 'SRM Institute of Science & Technology, Ramapuram',
    formattedAddress: 'Bharathi Salai, Ramapuram, Chennai, Tamil Nadu 600089',
    location: { lat: 13.0336, lng: 80.1802 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'marina': {
    placeId: 'place-marina-beach',
    name: 'Marina Beach Promenade',
    formattedAddress: 'Kamarajar Salai, Triplicane, Chennai, Tamil Nadu 600005',
    location: { lat: 13.0499, lng: 80.2824 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'marina beach': {
    placeId: 'place-marina-beach',
    name: 'Marina Beach Promenade',
    formattedAddress: 'Kamarajar Salai, Triplicane, Chennai, Tamil Nadu 600005',
    location: { lat: 13.0499, lng: 80.2824 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'pondicherry': {
    placeId: 'place-pondicherry-center',
    name: 'Puducherry Bus Stand / French Quarter',
    formattedAddress: 'Puducherry, Puducherry 605001, India',
    location: { lat: 11.9416, lng: 79.8083 },
    city: 'Puducherry',
    state: 'Puducherry'
  },
  'puducherry': {
    placeId: 'place-pondicherry-center',
    name: 'Puducherry Bus Stand / French Quarter',
    formattedAddress: 'Puducherry, Puducherry 605001, India',
    location: { lat: 11.9416, lng: 79.8083 },
    city: 'Puducherry',
    state: 'Puducherry'
  },
  'iit': {
    placeId: 'place-iit-madras',
    name: 'IIT Madras In-Gate',
    formattedAddress: 'Sardar Patel Rd, Opposite Central Leather Research Institute, Adyar, Chennai 600036',
    location: { lat: 13.0062, lng: 80.2372 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'iit madras': {
    placeId: 'place-iit-madras',
    name: 'IIT Madras In-Gate',
    formattedAddress: 'Sardar Patel Rd, Opposite Central Leather Research Institute, Adyar, Chennai 600036',
    location: { lat: 13.0062, lng: 80.2372 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'phoenix': {
    placeId: 'place-phoenix-mall',
    name: 'Phoenix Marketcity Velachery',
    formattedAddress: 'Velachery Rd, Indira Gandhi Nagar, Velachery, Chennai, Tamil Nadu 600042',
    location: { lat: 12.9915, lng: 80.2170 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'phoenix mall': {
    placeId: 'place-phoenix-mall',
    name: 'Phoenix Marketcity Velachery',
    formattedAddress: 'Velachery Rd, Indira Gandhi Nagar, Velachery, Chennai, Tamil Nadu 600042',
    location: { lat: 12.9915, lng: 80.2170 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'guindy': {
    placeId: 'place-guindy-station',
    name: 'Guindy Junction Railway & Bus Bay',
    formattedAddress: 'Guindy, Chennai, Tamil Nadu 600032',
    location: { lat: 13.0067, lng: 80.2021 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'guindy station': {
    placeId: 'place-guindy-station',
    name: 'Guindy Junction Railway & Bus Bay',
    formattedAddress: 'Guindy, Chennai, Tamil Nadu 600032',
    location: { lat: 13.0067, lng: 80.2021 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'central': {
    placeId: 'place-central-station',
    name: 'Chennai Central Railway Station',
    formattedAddress: 'Kannappar Thidal, Periyamet, Chennai, Tamil Nadu 600003',
    location: { lat: 13.0827, lng: 80.2707 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'chennai central': {
    placeId: 'place-central-station',
    name: 'Chennai Central Railway Station',
    formattedAddress: 'Kannappar Thidal, Periyamet, Chennai, Tamil Nadu 600003',
    location: { lat: 13.0827, lng: 80.2707 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'besant nagar': {
    placeId: 'place-besant-nagar-beach',
    name: 'Elliot’s Beach Promenade, Besant Nagar',
    formattedAddress: 'Besant Nagar, Chennai, Tamil Nadu 600090',
    location: { lat: 12.9992, lng: 80.2721 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  }
};

export class PlaceResolutionService {
  /**
   * Resolve raw text query into a canonical ResolvedPlace object
   * Uses known place database + Nominatim API fallback
   */
  public static async resolvePlace(query: string): Promise<ResolvedPlace> {
    const qTrim = query.trim().toLowerCase();

    // Check high-speed known dictionary
    if (KNOWN_PLACES[qTrim]) {
      return KNOWN_PLACES[qTrim];
    }

    for (const key of Object.keys(KNOWN_PLACES)) {
      if (qTrim.includes(key) || key.includes(qTrim)) {
        return KNOWN_PLACES[key];
      }
    }

    // Try Nominatim OpenStreetMap Geocoding
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
      const res = await fetch(url, { headers: { 'User-Agent': 'WAY2GO-SIH25082-App' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const item = data[0];
          return {
            placeId: `osm-${item.place_id}`,
            name: item.display_name.split(',')[0] || query,
            formattedAddress: item.display_name,
            location: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon)
            },
            city: item.address?.city || item.address?.town || 'Resolved Location'
          };
        }
      }
    } catch (err) {
      console.warn('Nominatim geocoding fallback failed:', err);
    }

    // Default fallback preserving exact requested title
    return {
      placeId: `custom-${Date.now()}`,
      name: query,
      formattedAddress: `${query}, India`,
      location: { lat: 13.0827, lng: 80.2707 }
    };
  }
}
