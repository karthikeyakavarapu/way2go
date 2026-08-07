import type { ResolvedPlace } from '../types';

/**
 * Comprehensive Pre-Resolved Canonical Landmark & City Dictionary across India
 */
const KNOWN_PLACES: Record<string, ResolvedPlace> = {
  // Local Chennai Landmarks
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
  'guindy': {
    placeId: 'place-guindy-station',
    name: 'Guindy Junction Railway & Bus Bay',
    formattedAddress: 'Guindy, Chennai, Tamil Nadu 600032',
    location: { lat: 13.0067, lng: 80.2021 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'chennai central': {
    placeId: 'place-central-station',
    name: 'Chennai Central Railway Station (MAS)',
    formattedAddress: 'Kannappar Thidal, Periyamet, Chennai, Tamil Nadu 600003',
    location: { lat: 13.0827, lng: 80.2707 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'iit': {
    placeId: 'place-iit-madras',
    name: 'IIT Madras In-Gate',
    formattedAddress: 'Sardar Patel Rd, Adyar, Chennai 600036',
    location: { lat: 13.0062, lng: 80.2372 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'phoenix': {
    placeId: 'place-phoenix-mall',
    name: 'Phoenix Marketcity Velachery',
    formattedAddress: 'Velachery Rd, Chennai 600042',
    location: { lat: 12.9915, lng: 80.2170 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },
  'besant nagar': {
    placeId: 'place-besant-nagar',
    name: 'Elliot’s Beach Promenade, Besant Nagar',
    formattedAddress: 'Besant Nagar, Chennai 600090',
    location: { lat: 12.9992, lng: 80.2721 },
    city: 'Chennai',
    state: 'Tamil Nadu'
  },

  // Famous Hill Stations & Tourist Destinations
  'munnar': {
    placeId: 'place-munnar-kerala',
    name: 'Munnar Hill Station & Tea Gardens',
    formattedAddress: 'Munnar, Idukki District, Kerala 685612',
    location: { lat: 10.0889, lng: 77.0595 },
    city: 'Munnar',
    state: 'Kerala'
  },
  'munnaar': {
    placeId: 'place-munnar-kerala',
    name: 'Munnar Hill Station & Tea Gardens',
    formattedAddress: 'Munnar, Idukki District, Kerala 685612',
    location: { lat: 10.0889, lng: 77.0595 },
    city: 'Munnar',
    state: 'Kerala'
  },
  'ooty': {
    placeId: 'place-ooty-nilgiris',
    name: 'Ooty (Udhagamandalam) Nilgiris',
    formattedAddress: 'Ooty, Nilgiris District, Tamil Nadu 643001',
    location: { lat: 11.4102, lng: 76.6950 },
    city: 'Ooty',
    state: 'Tamil Nadu'
  },
  'kodaikanal': {
    placeId: 'place-kodaikanal',
    name: 'Kodaikanal Lake & Princess of Hill Stations',
    formattedAddress: 'Kodaikanal, Dindigul, Tamil Nadu 624101',
    location: { lat: 10.2381, lng: 77.4892 },
    city: 'Kodaikanal',
    state: 'Tamil Nadu'
  },
  'kashmir': {
    placeId: 'place-kashmir-srinagar',
    name: 'Srinagar / Kashmir Valley',
    formattedAddress: 'Srinagar, Jammu and Kashmir 190001',
    location: { lat: 34.0837, lng: 74.7973 },
    city: 'Srinagar',
    state: 'Jammu & Kashmir'
  },
  'kashmeer': {
    placeId: 'place-kashmir-srinagar',
    name: 'Srinagar / Kashmir Valley',
    formattedAddress: 'Srinagar, Jammu and Kashmir 190001',
    location: { lat: 34.0837, lng: 74.7973 },
    city: 'Srinagar',
    state: 'Jammu & Kashmir'
  },
  'ladakh': {
    placeId: 'place-ladakh-leh',
    name: 'Leh Ladakh Main Market',
    formattedAddress: 'Leh, Ladakh 194101',
    location: { lat: 34.1526, lng: 77.5771 },
    city: 'Leh',
    state: 'Ladakh'
  },
  'manali': {
    placeId: 'place-manali-himachal',
    name: 'Manali Mall Road & Solang Valley',
    formattedAddress: 'Manali, Himachal Pradesh 175131',
    location: { lat: 32.2432, lng: 77.1892 },
    city: 'Manali',
    state: 'Himachal Pradesh'
  },
  'goa': {
    placeId: 'place-goa-panaji',
    name: 'Goa Coastal Promenade & Panaji',
    formattedAddress: 'Panaji, Goa 403001',
    location: { lat: 15.4909, lng: 73.8278 },
    city: 'Panaji',
    state: 'Goa'
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

  // Major Indian Metros
  'bengaluru': {
    placeId: 'place-bengaluru-majestic',
    name: 'Bengaluru Majestic Bus Stand / KSR Railway',
    formattedAddress: 'Kempegowda, Bengaluru, Karnataka 560009',
    location: { lat: 12.9767, lng: 77.5713 },
    city: 'Bengaluru',
    state: 'Karnataka'
  },
  'bangalore': {
    placeId: 'place-bengaluru-majestic',
    name: 'Bengaluru Majestic Bus Stand / KSR Railway',
    formattedAddress: 'Kempegowda, Bengaluru, Karnataka 560009',
    location: { lat: 12.9767, lng: 77.5713 },
    city: 'Bengaluru',
    state: 'Karnataka'
  },
  'hyderabad': {
    placeId: 'place-hyderabad-secunderabad',
    name: 'Hyderabad Secunderabad Junction & Charminar',
    formattedAddress: 'Hyderabad, Telangana 500003',
    location: { lat: 17.3850, lng: 78.4867 },
    city: 'Hyderabad',
    state: 'Telangana'
  },
  'delhi': {
    placeId: 'place-delhi-connaught',
    name: 'New Delhi Railway Station & Connaught Place',
    formattedAddress: 'New Delhi, Delhi 110001',
    location: { lat: 28.6139, lng: 77.2090 },
    city: 'Delhi',
    state: 'Delhi'
  },
  'mumbai': {
    placeId: 'place-mumbai-cst',
    name: 'Mumbai Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    formattedAddress: 'Fort, Mumbai, Maharashtra 400001',
    location: { lat: 18.9400, lng: 72.8353 },
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  'kolkata': {
    placeId: 'place-kolkata-howrah',
    name: 'Kolkata Howrah Junction',
    formattedAddress: 'Howrah, West Bengal 711101',
    location: { lat: 22.5850, lng: 88.3426 },
    city: 'Kolkata',
    state: 'West Bengal'
  },
  'kochi': {
    placeId: 'place-kochi-ernakulam',
    name: 'Kochi (Ernakulam) Marine Drive',
    formattedAddress: 'Ernakulam, Kochi, Kerala 682011',
    location: { lat: 9.9816, lng: 76.2799 },
    city: 'Kochi',
    state: 'Kerala'
  },
  'coimbatore': {
    placeId: 'place-coimbatore-junction',
    name: 'Coimbatore Junction Gandhipuram',
    formattedAddress: 'Coimbatore, Tamil Nadu 641018',
    location: { lat: 11.0168, lng: 76.9558 },
    city: 'Coimbatore',
    state: 'Tamil Nadu'
  },
  'madurai': {
    placeId: 'place-madurai-meenakshi',
    name: 'Madurai Meenakshi Amman Temple & Junction',
    formattedAddress: 'Madurai, Tamil Nadu 625001',
    location: { lat: 9.9252, lng: 78.1198 },
    city: 'Madurai',
    state: 'Tamil Nadu'
  },
  'tirupati': {
    placeId: 'place-tirupati-balaji',
    name: 'Tirupati Central Bus Stand & Temple Foothills',
    formattedAddress: 'Tirupati, Andhra Pradesh 517501',
    location: { lat: 13.6288, lng: 79.4192 },
    city: 'Tirupati',
    state: 'Andhra Pradesh'
  },
  'vellore': {
    placeId: 'place-vellore-fort',
    name: 'Vellore Fort & New Bus Stand',
    formattedAddress: 'Vellore, Tamil Nadu 632004',
    location: { lat: 12.9165, lng: 79.1325 },
    city: 'Vellore',
    state: 'Tamil Nadu'
  }
};

export class PlaceResolutionService {
  /**
   * Resolve raw text query into a canonical ResolvedPlace object
   */
  public static async resolvePlace(query: string): Promise<ResolvedPlace> {
    let cleanQuery = query.trim().toLowerCase();

    // 1. Strip leading origin prefixes like "srm to ...", "from srm ramapuram to ..."
    const prefixes = [
      'srm ramapuram campus to ',
      'srm ramapuram to ',
      'rm ramapuram to ',
      'from srm to ',
      'srm to ',
      'to '
    ];

    for (const p of prefixes) {
      if (cleanQuery.startsWith(p)) {
        cleanQuery = cleanQuery.substring(p.length).trim();
        break;
      }
    }

    // 2. Check exact known dictionary match
    if (KNOWN_PLACES[cleanQuery]) {
      return KNOWN_PLACES[cleanQuery];
    }

    // 3. Check fuzzy keyword in known dictionary
    for (const key of Object.keys(KNOWN_PLACES)) {
      if (cleanQuery.includes(key) || key.includes(cleanQuery)) {
        return KNOWN_PLACES[key];
      }
    }

    // 4. Try Nominatim OpenStreetMap Geocoding
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=1`;
      const res = await fetch(url, { headers: { 'User-Agent': 'WAY2GO-SIH25082-App' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const item = data[0];
          return {
            placeId: `osm-${item.place_id}`,
            name: item.display_name.split(',')[0] || cleanQuery,
            formattedAddress: item.display_name,
            location: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon)
            },
            city: item.address?.city || item.address?.town || item.display_name.split(',')[0]
          };
        }
      }
    } catch (err) {
      console.warn('Nominatim geocoding fallback warning:', err);
    }

    // Default fallback
    return {
      placeId: `custom-${Date.now()}`,
      name: cleanQuery.toUpperCase(),
      formattedAddress: `${cleanQuery}, India`,
      location: { lat: 10.0889, lng: 77.0595 } // Fallback to scenic Western Ghats
    };
  }
}
