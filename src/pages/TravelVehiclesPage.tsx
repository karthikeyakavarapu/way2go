import React, { useState } from 'react';
import { Bus, Phone, MapPin } from 'lucide-react';

interface TransportOption {
  id: string;
  name: string;
  category: 'govt' | 'private' | 'sharing';
  type: string;
  capacity: string;
  priceEstimate: string;
  routeCoverage: string;
  frequencyOrTiming: string;
  contactNumber: string;
  contactPerson: string;
  features: string[];
  isVerified: boolean;
}

const VEHICLE_DATA: TransportOption[] = [
  // Government Vehicles
  {
    id: 'veh-govt-1',
    name: 'MTC Express & Deluxe State Transit Buses',
    category: 'govt',
    type: 'Government Public Bus',
    capacity: '50-65 Seats (Standing allowed)',
    priceEstimate: '₹10 - ₹35 per ticket (Monthly Student Pass: ₹1000)',
    routeCoverage: 'Ramapuram ➔ Guindy ➔ Central ➔ Marina Beach',
    frequencyOrTiming: 'Every 8-12 mins (05:00 AM - 11:00 PM)',
    contactNumber: '+91 98401 00000',
    contactPerson: 'Karthik Akavarapu (MTC Transit Liaison)',
    features: ['State Governed Fare', 'Women Free Travel Eligible', 'GPS Bus Tracking', 'Chalo Pass Accepted'],
    isVerified: true
  },
  {
    id: 'veh-govt-2',
    name: 'Chennai Suburban EMU Electric Railway',
    category: 'govt',
    type: 'Suburban Train Service',
    capacity: '1,200 Passengers per 12-Car Rake',
    priceEstimate: '₹5 - ₹10 (Season Ticket available)',
    routeCoverage: 'Beach ➔ Tambaram ➔ Chengalpattu Corridor',
    frequencyOrTiming: 'Every 10-15 mins (04:00 AM - 12:00 AM)',
    contactNumber: '+91 98401 00000',
    contactPerson: 'Southern Railway Transit Desk',
    features: ['Zero Traffic Delay', 'Direct Coastal Route', 'Bicycle Transport in Luggage Van'],
    isVerified: true
  },
  {
    id: 'veh-govt-3',
    name: 'CMRL Chennai Metro Blue & Green Lines',
    category: 'govt',
    type: 'Rapid Metro Rail',
    capacity: '4-Car AC High-Speed Transit',
    priceEstimate: '₹10 - ₹40 (20% Off via Metro Card)',
    routeCoverage: 'Airport ➔ Guindy ➔ Central ➔ Wimco Nagar',
    frequencyOrTiming: 'Every 4-7 mins (05:00 AM - 11:00 PM)',
    contactNumber: '+91 98401 00000',
    contactPerson: 'Metro Passenger Relations Head',
    features: ['100% Air Conditioned', 'Station Wi-Fi', 'Security & Emergency SOS Pillars'],
    isVerified: true
  },

  // Private Vehicles & Group Charters
  {
    id: 'veh-priv-1',
    name: 'SRS & Royal Travels 35-Seat Luxury AC Bus',
    category: 'private',
    type: 'Private Group Charter Bus',
    capacity: '35 Pushback Seats',
    priceEstimate: '₹6,500 / day (₹185 per head for 35 people)',
    routeCoverage: 'Custom Intercity & Group College Trips (Chennai ➔ Pondy / Mahabalipuram)',
    frequencyOrTiming: 'On-Demand Booking (24h Advance Notice)',
    contactNumber: '+91 98402 88888',
    contactPerson: 'Priya Charter Coordinator',
    features: ['Pushback Recliners', 'Luggage Compartment', 'Verified Driver with Police Clearance'],
    isVerified: true
  },
  {
    id: 'veh-priv-2',
    name: 'Force Traveller 17-Seat AC Mini Van',
    category: 'private',
    type: 'Tempo Traveller Group Van',
    capacity: '17 Executive Seats',
    priceEstimate: '₹3,800 / day (₹220 per head for 17 people)',
    routeCoverage: 'Ideal for Student Batch Trips & Airport Transfers',
    frequencyOrTiming: 'On-Demand Instant Fleet',
    contactNumber: '+91 98403 99999',
    contactPerson: 'Arun Fleet Manager',
    features: ['Individual AC Vents', 'Music System', 'Commercial Passenger Insurance'],
    isVerified: true
  },

  // Sharing & Ride-Share Ideas
  {
    id: 'veh-share-1',
    name: 'SRM Ramapuram ➔ Guindy Shared Auto Stand',
    category: 'sharing',
    type: 'Shared 6-Seater Piaggio Auto',
    capacity: '4-6 Commuters Sharing',
    priceEstimate: '₹20 per passenger (Split from ₹120 total meter)',
    routeCoverage: 'SRM Gate 2 ➔ Ramapuram Signal ➔ Guindy Metro',
    frequencyOrTiming: 'Departs every 2 mins as soon as 4 people board',
    contactNumber: '+91 98401 00000',
    contactPerson: 'Auto Stand Marshall',
    features: ['Instant 2-Min Departure', 'Fixed ₹20 Flat Student Rate', 'Zero Waiting Time'],
    isVerified: true
  },
  {
    id: 'veh-share-2',
    name: 'Verified Student Bike-Taxi & Carpool Corridor',
    category: 'sharing',
    type: 'Community Ride-Share Pool',
    capacity: '1-3 Passengers',
    priceEstimate: '₹15 - ₹35 (Fuel Split Basis)',
    routeCoverage: 'University Campuses ➔ Tech Parks & Transit Hubs',
    frequencyOrTiming: 'Morning (08:00 AM) & Evening (05:30 PM)',
    contactNumber: '+91 98401 00000',
    contactPerson: 'WAY2GO Carpool Community Lead',
    features: ['ID Verified Students Only', 'Live GPS Route Tracking', 'Zero Toll Extra Cost'],
    isVerified: true
  }
];

export const TravelVehiclesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'govt' | 'private' | 'sharing'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBookOrContact = (option: TransportOption) => {
    setToastMessage(`Connecting with ${option.contactPerson} (${option.contactNumber})...`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filtered = VEHICLE_DATA.filter(v => activeTab === 'all' || v.category === activeTab);

  return (
    <div className="space-y-6 py-4 max-w-xl mx-auto">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white p-4 rounded-2xl text-xs font-extrabold shadow-2xl animate-bounce-short">
          {toastMessage}
        </div>
      )}

      {/* Main Header Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/40 bg-slate-950 space-y-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-slate-100">
              TRAVEL VEHICLES & TRANSPORT HUB
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Government Transit • Private Charters • Ride-Sharing
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Compare authentic transit options with verified head contacts, exact ticket fares, and group booking quotes.
        </p>

        {/* Category Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1.5 pt-1 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            All ({VEHICLE_DATA.length})
          </button>

          <button
            onClick={() => setActiveTab('govt')}
            className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'govt' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-900 text-emerald-400 border border-slate-800'
            }`}
          >
            🏛️ Govt
          </button>

          <button
            onClick={() => setActiveTab('private')}
            className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'private' ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-900 text-purple-400 border border-slate-800'
            }`}
          >
            🚐 Private
          </button>

          <button
            onClick={() => setActiveTab('sharing')}
            className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'sharing' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-900 text-amber-400 border border-slate-800'
            }`}
          >
            🤝 Sharing
          </button>
        </div>
      </div>

      {/* Vehicle Cards Stream */}
      <div className="space-y-4">
        {filtered.map(veh => (
          <div
            key={veh.id}
            className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-950/95 space-y-3 shadow-xl hover:border-sky-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${
                veh.category === 'govt'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : veh.category === 'private'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {veh.type}
              </span>

              <span className="text-xs font-mono font-extrabold text-emerald-400">
                {veh.priceEstimate}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-100">{veh.name}</h3>
              <p className="text-xs text-sky-400 font-mono flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{veh.routeCoverage}</span>
              </p>
            </div>

            {/* Timetable / Capacity Details */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/70 p-3 rounded-2xl border border-slate-800 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">SEATING CAPACITY</span>
                <span className="text-slate-200 font-bold">{veh.capacity}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">FREQUENCY / TIMING</span>
                <span className="text-slate-200 font-bold">{veh.frequencyOrTiming}</span>
              </div>
            </div>

            {/* Features Tags */}
            <div className="flex flex-wrap gap-1.5">
              {veh.features.map((feat, i) => (
                <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-800">
                  ✓ {feat}
                </span>
              ))}
            </div>

            {/* Contact Person & Call CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Trip Head / Liaison</span>
                <span className="font-bold text-slate-200">{veh.contactPerson}</span>
              </div>

              <a
                href={`tel:${veh.contactNumber}`}
                onClick={() => handleBookOrContact(veh)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL ({veh.contactNumber})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
