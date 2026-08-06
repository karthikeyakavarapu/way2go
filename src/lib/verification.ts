import type { RouteGuide } from '../types';

export function calculateRouteConfidence(
  successfulCompletions: number,
  recentConfirmationsCount: number,
  failedCount: number,
  lastVerifiedDaysAgo: number
): number {
  let score = 70;

  score += Math.min(20, successfulCompletions * 2);
  score += Math.min(15, recentConfirmationsCount * 3);

  score -= failedCount * 12;

  if (lastVerifiedDaysAgo > 30) {
    const monthsOld = Math.floor(lastVerifiedDaysAgo / 30);
    score -= Math.min(25, monthsOld * 5);
  }

  return Math.min(100, Math.max(10, Math.round(score)));
}

export function applyRouteConfirmation(
  route: RouteGuide,
  confirmationStatus: 'worked' | 'changed' | 'failed'
): RouteGuide {
  let newCompletions = route.successful_completions_count;
  let newRecentConfirmations = route.recent_confirmations_count + 1;
  let failedCount = confirmationStatus === 'failed' ? 1 : 0;

  if (confirmationStatus === 'worked') {
    newCompletions += 1;
  }

  const newConfidence = calculateRouteConfidence(
    newCompletions,
    newRecentConfirmations,
    failedCount,
    0
  );

  return {
    ...route,
    successful_completions_count: newCompletions,
    recent_confirmations_count: newRecentConfirmations,
    confidence_score: newConfidence,
    last_verified_at: 'Just now',
    updated_at: new Date().toISOString()
  };
}
