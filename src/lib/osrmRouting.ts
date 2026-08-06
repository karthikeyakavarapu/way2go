import type { LatLng, TransportMode } from '../types';

/**
 * Fetch actual road-snapped geometry from Open Source Routing Machine (OSRM)
 */
export async function fetchOSRMRouteGeometry(
  points: LatLng[],
  mode: TransportMode = 'bus'
): Promise<LatLng[]> {
  if (!points || points.length < 2) return points;

  try {
    const profile = mode === 'walk' ? 'foot' : 'driving';
    const coordsString = points.map(p => `${p.lng},${p.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/${profile}/${coordsString}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('OSRM API call failed');

    const data = await response.json();
    if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
      const coordinates = data.routes[0].geometry.coordinates; // [lng, lat]
      return coordinates.map((c: [number, number]) => ({
        lat: c[1],
        lng: c[0]
      }));
    }
  } catch (err) {
    console.warn('OSRM routing fallback to linear points:', err);
  }

  return points;
}
