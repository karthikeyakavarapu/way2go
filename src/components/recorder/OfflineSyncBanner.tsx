import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const OfflineSyncBanner: React.FC = () => {
  const { isOnline, offlineSyncCount, flushOfflineQueue } = useJourney();

  if (isOnline && offlineSyncCount === 0) return null;

  return (
    <div className="bg-amber-500/20 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between gap-3 text-amber-200 text-xs">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          {!isOnline
            ? `Offline Mode: ${offlineSyncCount} GPS events stored locally.`
            : `Network Restored: ${offlineSyncCount} events ready to sync.`}
        </span>
      </div>

      {isOnline && offlineSyncCount > 0 && (
        <button
          onClick={flushOfflineQueue}
          className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Sync Now</span>
        </button>
      )}
    </div>
  );
};
