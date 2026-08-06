import React, { useState, useEffect } from 'react';
import { Volume2, Pause } from 'lucide-react';

interface AudioVoicePlayerProps {
  textToSpeak: string;
}

export const AudioVoicePlayer: React.FC<AudioVoicePlayerProps> = ({ textToSpeak }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
        isPlaying
          ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30 animate-pulse'
          : 'bg-slate-900/80 text-sky-300 border-sky-500/30 hover:bg-sky-500/20'
      }`}
    >
      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>{isPlaying ? 'Speaking...' : 'Listen Voice Step'}</span>
    </button>
  );
};
