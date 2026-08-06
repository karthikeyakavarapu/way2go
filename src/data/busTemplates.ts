export interface RouteTemplate {
  id: string;
  title: string;
  origin: string;
  destination: string;
  busNumbers: string[];
  instruction: string;
  fare: string;
  duration: string;
  originCoords: { lat: number; lng: number };
  destinationCoords: { lat: number; lng: number };
}

export const POPULAR_ROUTE_TEMPLATES: RouteTemplate[] = [
  {
    id: 'tmpl-srm-marina',
    title: 'SRM Ramapuram → Marina Beach',
    origin: 'SRM Ramapuram Gate 2',
    destination: 'Marina Beach Promenade',
    busNumbers: ['88K', '21G', '102'],
    instruction: 'Board Bus 88K from Ramapuram stop to Guindy. Transfer to Bus 21G direct to Light House / Marina Beach.',
    fare: '35',
    duration: '45',
    originCoords: { lat: 13.0336, lng: 80.1802 },
    destinationCoords: { lat: 13.0499, lng: 80.2824 }
  },
  {
    id: 'tmpl-iit-besant',
    title: 'IIT Madras Gate → Besant Nagar Beach',
    origin: 'IIT Madras In-Gate',
    destination: 'Elliot’s Beach Promenade',
    busNumbers: ['Share Auto', '29C'],
    instruction: 'Take ₹20 shared auto outside IIT Main Gate to Besant Nagar Stand, then walk 5 mins down 6th Avenue.',
    fare: '20',
    duration: '20',
    originCoords: { lat: 13.0062, lng: 80.2372 },
    destinationCoords: { lat: 12.9992, lng: 80.2721 }
  },
  {
    id: 'tmpl-guindy-phoenix',
    title: 'Guindy Junction → Phoenix Marketcity Velachery',
    origin: 'Guindy Bus Bay',
    destination: 'Phoenix Mall Entrance',
    busNumbers: ['570', '570X', 'D70'],
    instruction: 'Board Bus 570 from Guindy outer bus bay heading towards Velachery. Alight directly outside Phoenix Mall.',
    fare: '15',
    duration: '15',
    originCoords: { lat: 13.0067, lng: 80.2021 },
    destinationCoords: { lat: 12.9915, lng: 80.2170 }
  },
  {
    id: 'tmpl-central-tnagar',
    title: 'Chennai Central → T. Nagar Bus Terminus',
    origin: 'Central Railway Station Exit',
    destination: 'T. Nagar Bus Stand',
    busNumbers: ['17M', '17D', 'Metro'],
    instruction: 'Board Bus 17M from Central Station bay or take Blue Line Metro to AG-DMS / T. Nagar.',
    fare: '20',
    duration: '25',
    originCoords: { lat: 13.0827, lng: 80.2707 },
    destinationCoords: { lat: 13.0418, lng: 80.2341 }
  }
];

export const BUS_CHIP_PRESETS = ['88K', '88K ET', '21G', '102', '570', '570X', '17M', '23C', '29C', 'D70', 'Share Auto', 'Metro'];
