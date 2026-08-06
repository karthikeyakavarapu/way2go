import type { RouteGuide, TransportMode } from '../types';

export interface AIDirectionalRouteResult {
  origin: string;
  destination: string;
  totalDistanceKm: number;
  totalDurationMinutes: number;
  totalCostINR: number;
  explanation: string;
  matchedRoute?: RouteGuide;
  directionalSteps: {
    stepNumber: number;
    mode: TransportMode;
    title: string;
    instruction: string;
    distanceMeters: number;
    durationMins: number;
    costINR: number;
    sourceLabel: string;
    busNumbers?: string[];
  }[];
  whatToDoSuggestions: string[];
}

export class AIService {
  /**
   * System Prompt Guard:
   * "You are a route explanation assistant. You may only describe facts provided in the structured route payload.
   * Never invent transport numbers, fares, stops, distances, durations, landmarks, or safety conditions.
   * If information is missing, explicitly state that it is unavailable. Never change origin or destination."
   */

  public static async generateDirectionalRoute(
    query: string,
    availableRoutes: RouteGuide[]
  ): Promise<AIDirectionalRouteResult> {
    const qLower = query.toLowerCase();

    // Match structured route from database
    const matched = availableRoutes.find(r => 
      qLower.includes(r.destination_name.toLowerCase()) || 
      r.destination_name.toLowerCase().includes(qLower) ||
      r.title.toLowerCase().includes(qLower)
    ) || availableRoutes[0];

    const steps = matched.segments.map(s => ({
      stepNumber: s.step_number,
      mode: s.transport_mode,
      title: s.title,
      instruction: s.instruction_full,
      distanceMeters: s.distance_meters,
      durationMins: s.estimated_minutes,
      costINR: s.estimated_cost_inr,
      sourceLabel: s.source_label || 'SOURCE: Community Verified Route',
      busNumbers: s.stops?.flatMap(st => st.route_numbers || [])
    }));

    const whatToDo = [
      `📍 Explore local verified landmarks near ${matched.destination_name}`,
      '📸 Capture photo verifications for WAY2GO contribution points',
      '⭐ Confirm route info after arrival to help fellow travellers'
    ];

    const explanation = `AI parsed structured route guide: ${matched.title} (${matched.total_duration_minutes} min • ₹${matched.total_cost_inr} • ${matched.confidence_score}% Verified).`;

    return {
      origin: matched.origin_name,
      destination: matched.destination_name,
      totalDistanceKm: matched.total_distance_km,
      totalDurationMinutes: matched.total_duration_minutes,
      totalCostINR: matched.total_cost_inr,
      explanation,
      matchedRoute: matched,
      directionalSteps: steps,
      whatToDoSuggestions: whatToDo
    };
  }

  public static async parseNaturalLanguageQuery(
    query: string,
    availableRoutes: RouteGuide[]
  ) {
    const dirResult = await this.generateDirectionalRoute(query, availableRoutes);
    return {
      parsedOrigin: dirResult.origin,
      parsedDestination: dirResult.destination,
      maxBudgetINR: dirResult.totalCostINR,
      explanation: dirResult.explanation,
      matchedRouteIds: dirResult.matchedRoute ? [dirResult.matchedRoute.id] : []
    };
  }

  public static generateTripStory(
    origin: string,
    destination: string,
    durationMins: number,
    costINR: number,
    modesUsed: string[]
  ): string {
    return `An incredible journey from ${origin} to ${destination}! Covered in ${durationMins} minutes using ${modesUsed.join(' & ')} for a total of ₹${costINR}. Verified and recorded live on WAY2GO.`;
  }
}
