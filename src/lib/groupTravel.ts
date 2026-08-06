import type { GroupRequest, OperatorOffer } from '../types';

const STORAGE_KEYS = {
  GROUP_REQUESTS: 'way2go_group_requests_db',
  OPERATOR_OFFERS: 'way2go_operator_offers_db',
  OPERATOR_PROFILES: 'way2go_operator_profiles_db',
  COMMISSION_RULES: 'way2go_commission_rules_db'
};

const DEFAULT_COMMISSION_PERCENT = 8; // 8% default platform fee

export class GroupTravelService {
  /**
   * Get all active group travel requests
   */
  public static getGroupRequests(): GroupRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.GROUP_REQUESTS);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to parse group requests', err);
    }
    // Seed initial demo group request
    return [
      {
        id: 'group-req-1',
        user_id: 'user-sih-2026',
        user_name: 'Karthikey Akavarapu',
        user_email: 'karthikeyakavarapu@gmail.com',
        origin: 'SRM Ramapuram Campus',
        destination: 'Puducherry Bus Stand',
        travel_date: '2026-08-15',
        passenger_count: 25,
        max_budget_per_person_inr: 1000,
        status: 'OFFERS_RECEIVED',
        created_at: new Date().toISOString(),
        offers_count: 2
      }
    ];
  }

  /**
   * Create a new Group Travel Request
   */
  public static createGroupRequest(data: Omit<GroupRequest, 'id' | 'status' | 'created_at' | 'offers_count'>): GroupRequest {
    const requests = this.getGroupRequests();
    const newReq: GroupRequest = {
      ...data,
      id: `group-req-${Date.now()}`,
      status: 'OPEN',
      created_at: new Date().toISOString(),
      offers_count: 0
    };
    requests.unshift(newReq);
    localStorage.setItem(STORAGE_KEYS.GROUP_REQUESTS, JSON.stringify(requests));
    return newReq;
  }

  /**
   * Get Operator Offers for a Group Request
   */
  public static getOperatorOffers(groupRequestId?: string): OperatorOffer[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OPERATOR_OFFERS);
      const all: OperatorOffer[] = raw ? JSON.parse(raw) : [
        {
          id: 'offer-1',
          group_request_id: 'group-req-1',
          operator_id: 'op-101',
          operator_name: 'Chennai Royal Express Travels',
          operator_phone: '+91 98401 23456',
          vehicle_type: '30-Seat AC Luxury Coach Bus',
          capacity: 30,
          departure_time: '07:00 AM',
          price_total_inr: 25000,
          price_per_person_inr: 1000,
          platform_commission_percent: 8,
          platform_commission_inr: 2000,
          operator_net_amount_inr: 23000,
          status: 'ADMIN_APPROVED',
          admin_approved: true,
          rating: 4.8,
          cancellation_policy: 'Full refund up to 24h prior',
          created_at: new Date().toISOString()
        },
        {
          id: 'offer-2',
          group_request_id: 'group-req-1',
          operator_id: 'op-102',
          operator_name: 'Southern Coast Tourist Vans',
          operator_phone: '+91 98402 34567',
          vehicle_type: '26-Seat Non-AC Bus',
          capacity: 26,
          departure_time: '06:30 AM',
          price_total_inr: 21250,
          price_per_person_inr: 850,
          platform_commission_percent: 8,
          platform_commission_inr: 1700,
          operator_net_amount_inr: 19550,
          status: 'ADMIN_APPROVED',
          admin_approved: true,
          rating: 4.6,
          cancellation_policy: '50% refund up to 12h prior',
          created_at: new Date().toISOString()
        }
      ];

      if (groupRequestId) {
        return all.filter(o => o.group_request_id === groupRequestId);
      }
      return all;
    } catch (err) {
      return [];
    }
  }

  /**
   * Calculate Transparent Financial Commission Breakdown
   */
  public static calculateCommission(priceTotalINR: number, customPercent?: number) {
    const percent = customPercent || DEFAULT_COMMISSION_PERCENT;
    const commissionINR = Math.round((priceTotalINR * percent) / 100);
    const netOperatorINR = priceTotalINR - commissionINR;
    return {
      percent,
      commissionINR,
      netOperatorINR
    };
  }

  /**
   * Operator submits an offer for a Group Request
   */
  public static submitOperatorOffer(
    groupRequestId: string,
    operatorProfile: { id: string; name: string; phone: string },
    vehicleType: string,
    capacity: number,
    totalPriceINR: number,
    departureTime: string
  ): OperatorOffer {
    const offers = this.getOperatorOffers();
    const comm = this.calculateCommission(totalPriceINR);
    const pricePerPerson = Math.round(totalPriceINR / Math.max(1, capacity));

    const newOffer: OperatorOffer = {
      id: `offer-${Date.now()}`,
      group_request_id: groupRequestId,
      operator_id: operatorProfile.id,
      operator_name: operatorProfile.name,
      operator_phone: operatorProfile.phone,
      vehicle_type: vehicleType,
      capacity,
      departure_time: departureTime,
      price_total_inr: totalPriceINR,
      price_per_person_inr: pricePerPerson,
      platform_commission_percent: comm.percent,
      platform_commission_inr: comm.commissionINR,
      operator_net_amount_inr: comm.netOperatorINR,
      status: 'SUBMITTED',
      admin_approved: false,
      rating: 4.7,
      cancellation_policy: 'Full refund up to 24h prior',
      created_at: new Date().toISOString()
    };

    offers.unshift(newOffer);
    localStorage.setItem(STORAGE_KEYS.OPERATOR_OFFERS, JSON.stringify(offers));
    return newOffer;
  }

  /**
   * Admin approves an Operator Offer
   */
  public static adminApproveOffer(offerId: string): OperatorOffer {
    const offers = this.getOperatorOffers();
    const idx = offers.findIndex(o => o.id === offerId);
    if (idx >= 0) {
      offers[idx].admin_approved = true;
      offers[idx].status = 'ADMIN_APPROVED';
      localStorage.setItem(STORAGE_KEYS.OPERATOR_OFFERS, JSON.stringify(offers));
      return offers[idx];
    }
    throw new Error('Offer not found');
  }
}
