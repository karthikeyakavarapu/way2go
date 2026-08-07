import { createClient } from '@supabase/supabase-js';
import type { RouteGuide, BudgetStay, SystemAnalytics, TravelPassport, GovInfraReport, TransitPlanningGap } from '../types';
import { INITIAL_ROUTES, INITIAL_BUDGET_STAYS, INITIAL_PASSPORT, INITIAL_SYSTEM_ANALYTICS, INITIAL_GOV_REPORTS, INITIAL_TRANSIT_GAPS } from '../data/seedData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://apbtqrrphvccfjlstaeo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_41irtM62wTh38KWDVYF-ew_q3aeRqr7';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CACHE_VERSION_KEY = 'way2go_cache_version';
const CURRENT_CACHE_VERSION = 'v2026_08_07_v3';

const STORAGE_KEYS = {
  ROUTES: 'way2go_routes_db',
  STAYS: 'way2go_stays_db',
  PASSPORT: 'way2go_passport_db',
  CONFIRMATIONS: 'way2go_confirmations_db',
  ANALYTICS: 'way2go_analytics_db',
  SAFE_SESSIONS: 'way2go_safe_sessions_db',
  OFFLINE_QUEUE: 'way2go_offline_queue_db',
  GOV_REPORTS: 'way2go_gov_reports_db',
  TRANSIT_GAPS: 'way2go_transit_gaps_db',
};

/**
 * Cache Busting Storage Initialization:
 * Clears old stale localStorage caches if cache version changes.
 */
export const initializeLocalStorage = () => {
  const version = localStorage.getItem(CACHE_VERSION_KEY);
  if (version !== CURRENT_CACHE_VERSION) {
    // Clear stale old storage keys
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.setItem(CACHE_VERSION_KEY, CURRENT_CACHE_VERSION);
  }

  if (!localStorage.getItem(STORAGE_KEYS.ROUTES)) {
    localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(INITIAL_ROUTES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STAYS)) {
    localStorage.setItem(STORAGE_KEYS.STAYS, JSON.stringify(INITIAL_BUDGET_STAYS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PASSPORT)) {
    localStorage.setItem(STORAGE_KEYS.PASSPORT, JSON.stringify(INITIAL_PASSPORT));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANALYTICS)) {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(INITIAL_SYSTEM_ANALYTICS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONFIRMATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CONFIRMATIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SAFE_SESSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SAFE_SESSIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE)) {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOV_REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.GOV_REPORTS, JSON.stringify(INITIAL_GOV_REPORTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRANSIT_GAPS)) {
    localStorage.setItem(STORAGE_KEYS.TRANSIT_GAPS, JSON.stringify(INITIAL_TRANSIT_GAPS));
  }
};

initializeLocalStorage();

export const getLocalRoutes = (): RouteGuide[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTES);
    return raw ? JSON.parse(raw) : INITIAL_ROUTES;
  } catch (err) {
    return INITIAL_ROUTES;
  }
};

export const saveLocalRoute = (newRoute: RouteGuide): RouteGuide => {
  const routes = getLocalRoutes();
  const existingIdx = routes.findIndex(r => r.id === newRoute.id);
  if (existingIdx >= 0) {
    routes[existingIdx] = newRoute;
  } else {
    routes.unshift(newRoute);
  }
  localStorage.setItem(STORAGE_KEYS.ROUTES, JSON.stringify(routes));
  return newRoute;
};

export const getLocalGovReports = (): GovInfraReport[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GOV_REPORTS);
    return raw ? JSON.parse(raw) : INITIAL_GOV_REPORTS;
  } catch (err) {
    return INITIAL_GOV_REPORTS;
  }
};

export const saveLocalGovReports = (reports: GovInfraReport[]) => {
  localStorage.setItem(STORAGE_KEYS.GOV_REPORTS, JSON.stringify(reports));
};

export const getLocalStays = (): BudgetStay[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STAYS);
    return raw ? JSON.parse(raw) : INITIAL_BUDGET_STAYS;
  } catch (err) {
    return INITIAL_BUDGET_STAYS;
  }
};

export const getLocalPassport = (): TravelPassport => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSPORT);
    return raw ? JSON.parse(raw) : INITIAL_PASSPORT;
  } catch (err) {
    return INITIAL_PASSPORT;
  }
};

export const getLocalAnalytics = (): SystemAnalytics => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return raw ? JSON.parse(raw) : INITIAL_SYSTEM_ANALYTICS;
  } catch (err) {
    return INITIAL_SYSTEM_ANALYTICS;
  }
};

export const getLocalTransitGaps = (): TransitPlanningGap[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSIT_GAPS);
    return raw ? JSON.parse(raw) : INITIAL_TRANSIT_GAPS;
  } catch (err) {
    return INITIAL_TRANSIT_GAPS;
  }
};
