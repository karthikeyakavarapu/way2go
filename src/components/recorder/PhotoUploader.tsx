import React, { useState } from 'react';
import { Camera, Upload, Check, X } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoSelected: (photoUrl: string, caption: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotoSelected }) => {
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePresetSelect = (url: string, presetName: string) => {
    setPreviewUrl(url);
    setCaption(presetName);
  };

  const handleUploadSubmit = () => {
    if (!previewUrl) return;
    onPhotoSelected(previewUrl, caption || 'Landmark Verification Photo');
    setPreviewUrl(null);
    setCaption('');
  };

  return (
    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-sky-400" />
          <span className="font-extrabold text-slate-100">ATTACH LANDMARK / EXIT GATE PHOTO</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Camera / Storage</span>
      </div>

      <div className="relative border-2 border-dashed border-slate-800 hover:border-sky-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        
        {previewUrl ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-700">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewUrl(null);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-1.5 py-2">
            <Upload className="w-6 h-6 text-sky-400 mx-auto" />
            <p className="font-bold text-slate-200 text-xs">Click or drag photo to upload</p>
            <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP from phone camera</p>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-slate-400 block">Quick Demo Photo Presets:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handlePresetSelect('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600', 'SRM Campus Gate 2 Exit')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium shrink-0 hover:border-sky-500"
          >
            Gate 2 Exit
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600', 'Ramapuram Bus Shelter')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium shrink-0 hover:border-sky-500"
          >
            Bus Stop Shelter
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600', 'Light House Bus Dropoff')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium shrink-0 hover:border-sky-500"
          >
            Light House Stop
          </button>
        </div>
      </div>

      {previewUrl && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add landmark description (e.g. SRM Gate 2 exit pathway)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />

          <button
            type="button"
            onClick={handleUploadSubmit}
            className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>ATTACH PHOTO TO ROUTE STEP</span>
          </button>
        </div>
      )}
    </div>
  );
};
