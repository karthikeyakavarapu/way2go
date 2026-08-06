import React, { useState } from 'react';
import { Video, X, Upload } from 'lucide-react';
import { TravelReelsService } from '../../lib/reels';
import { useAuth } from '../../context/AuthContext';

interface ReelUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ReelUploadModal: React.FC<ReelUploadModalProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('Sunset at Marina Beach Promenade 🌅');
  const [city, setCity] = useState('Chennai');
  const [locationName, setLocationName] = useState('Marina Beach');
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4');
  const [category, setCategory] = useState<'Place' | 'Route' | 'Food' | 'Beach' | 'Stay' | 'Transit'>('Beach');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    TravelReelsService.uploadReel({
      title,
      video_url: videoUrl,
      city,
      location_name: locationName,
      creator_id: user?.id || 'creator-user',
      creator_name: user?.full_name || 'Travel Creator',
      creator_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      category
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-sky-500/40 bg-slate-950 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-sky-400" />
            <h2 className="font-extrabold text-lg text-slate-100">+ CREATE TRAVEL REEL</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Reel Title / Caption</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Location Landmark</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Video Stream URL / File</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono text-[11px]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
            >
              <option value="Beach">🏖️ Beach</option>
              <option value="Place">🏛️ Place</option>
              <option value="Route">🚌 Route</option>
              <option value="Transit">🚆 Transit</option>
              <option value="Food">🍴 Food</option>
              <option value="Stay">🏨 Stay</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>POST TRAVEL REEL</span>
          </button>
        </form>
      </div>
    </div>
  );
};
