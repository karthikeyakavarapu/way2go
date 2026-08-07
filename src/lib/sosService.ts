import type { SOSHelpRequest, LatLng } from '../types';

const STORAGE_KEY = 'way2go_sos_requests_db';

const SEED_SOS: SOSHelpRequest[] = [
  {
    id: 'sos-1',
    user_id: 'u-commuter-1',
    user_name: 'Ananya R.',
    user_phone: '+91 98401 00000',
    location_name: 'Near Guindy Railway Station Exit Gate 3',
    location_coords: { lat: 13.0067, lng: 80.2021 },
    message: 'Bus stop shelter light is dim. Looking for someone walking towards Guindy bus stand.',
    status: 'active',
    created_at: new Date(Date.now() - 300000).toISOString() // 5 mins ago
  }
];

export class SOSService {
  /**
   * Broadcast nearby quick-help ping to opted-in users within 3 km
   */
  public static dispatchSOS(
    userId: string,
    userName: string,
    userPhone: string,
    locationName: string,
    coords: LatLng,
    message: string
  ): SOSHelpRequest {
    const list = this.getSOSRequests();
    const newReq: SOSHelpRequest = {
      id: `sos-${Date.now()}`,
      user_id: userId,
      user_name: userName,
      user_phone: userPhone,
      location_name: locationName,
      location_coords: coords,
      message,
      status: 'active',
      created_at: new Date().toISOString()
    };

    list.unshift(newReq);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    // Simulated Realtime Broadcast Notification
    console.log(`[REALTIME SOS BROADCAST] Pinged users within 3km of ${locationName}`);
    return newReq;
  }

  public static getSOSRequests(): SOSHelpRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : SEED_SOS;
    } catch (err) {
      return SEED_SOS;
    }
  }

  public static resolveSOS(id: string): void {
    const list = this.getSOSRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) {
      list[idx].status = 'resolved';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  }
}
