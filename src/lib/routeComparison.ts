import type { RouteGuide, RouteComparisonResult, RouteMatchStatus, RouteHealth } from '../types';

export class RouteComparisonService {
  /**
   * Deterministically compare OSRM Map Route against Community Traveller Routes
   * Returns a complete comparison object with exact match percentage & difference cards.
   */
  public static compareRoutes(
    mapRoute: RouteGuide,
    availableTravellerRoutes: RouteGuide[]
  ): RouteComparisonResult {
    const targetDest = mapRoute.destination_name.toLowerCase().trim();
    const targetOrig = mapRoute.origin_name.toLowerCase().trim();

    // Find best matching traveller route in database
    const matchingTravellerRoute = availableTravellerRoutes.find(tr => {
      if (!tr.is_published && tr.publishing_status !== 'published') return false;
      const tDest = tr.destination_name.toLowerCase().trim();
      const tOrig = tr.origin_name.toLowerCase().trim();
      return (tDest.includes(targetDest) || targetDest.includes(tDest)) &&
             (tOrig.includes(targetOrig) || targetOrig.includes(tOrig));
    });

    // 1. NO TRAVELLER DATA STATE (Growth Loop Trigger)
    if (!matchingTravellerRoute) {
      return {
        matchStatus: 'NO_TRAVELLER_DATA',
        matchPercentage: 0,
        mapRoute,
        travellerRoute: undefined,
        matchingSegmentsCount: 0,
        totalSegmentsCount: mapRoute.segments.length,
        differencesDescription: [
          'No WAY2GO traveller experience recorded for this exact route yet.',
          'Be the pioneer traveller: Record your journey to help future commuters!'
        ],
        travellerCount: 0,
        lastVerifiedLabel: 'No community records',
        routeHealth: 'no_traveller_data',
        isNoTravellerData: true
      };
    }

    // 2. Deterministic Segment Overlap Calculation
    const mapSegs = mapRoute.segments;
    const travSegs = matchingTravellerRoute.segments;

    let matchingCount = 0;
    const differences: string[] = [];

    mapSegs.forEach((mSeg, i) => {
      const tSeg = travSegs[i];
      if (tSeg && mSeg.transport_mode === tSeg.transport_mode) {
        matchingCount++;
      } else if (tSeg) {
        differences.push(
          `Step ${i + 1}: Map suggests ${mSeg.transport_mode.toUpperCase()} (${mSeg.title}), but travellers recorded ${tSeg.transport_mode.toUpperCase()} (${tSeg.title}).`
        );
      }
    });

    const maxSegs = Math.max(mapSegs.length, travSegs.length);
    const matchPercentage = Math.round((matchingCount / maxSegs) * 100);

    let matchStatus: RouteMatchStatus = 'PARTIAL_MATCH';
    if (matchPercentage >= 90) {
      matchStatus = 'EXACT_MATCH';
      differences.push('Traveller route matches map recommendations on all primary transit steps.');
    } else if (matchPercentage >= 50) {
      matchStatus = 'PARTIAL_MATCH';
    } else if (matchPercentage >= 20) {
      matchStatus = 'ALTERNATIVE_ROUTE';
      differences.push('Travellers commonly use a different transit combination for this corridor.');
    } else {
      matchStatus = 'NO_MATCH';
      differences.push('Traveller route uses an entirely different physical path.');
    }

    // Calculate Route Health Status from actual confidence score & completions
    let routeHealth: RouteHealth = 'working_well';
    if (matchingTravellerRoute.confidence_score >= 85) {
      routeHealth = 'working_well';
    } else if (matchingTravellerRoute.confidence_score >= 65) {
      routeHealth = 'may_have_changes';
    } else {
      routeHealth = 'recently_reported_problem';
    }

    return {
      matchStatus,
      matchPercentage,
      mapRoute,
      travellerRoute: matchingTravellerRoute,
      matchingSegmentsCount: matchingCount,
      totalSegmentsCount: maxSegs,
      differencesDescription: differences,
      travellerCount: matchingTravellerRoute.successful_completions_count || 1,
      lastVerifiedLabel: matchingTravellerRoute.last_verified_at || 'Recently',
      routeHealth,
      isNoTravellerData: false
    };
  }
}
