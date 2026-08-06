import React from 'react';
import { X } from 'lucide-react';

interface MediaModalProps {
  mediaUrl: string | null;
  caption: string;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ mediaUrl, caption, onClose }) => {
  if (!mediaUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative glass-panel p-3 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl space-y-3">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-slate-700 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="rounded-xl overflow-hidden bg-black max-h-[70vh] flex items-center justify-center">
          <img src={mediaUrl} alt={caption} className="w-full h-full object-contain max-h-[70vh]" />
        </div>

        {caption && (
          <p className="text-xs text-slate-300 font-medium px-2 py-1 text-center">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};
