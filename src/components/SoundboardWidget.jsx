import React, { useState } from 'react';
import { Music, Volume2, Sparkles, X, VolumeX, Disc, Radio } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SoundboardWidget({ onOpenSoundscapeMixer = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);

  const sounds = [
    { label: 'Rocket Whoosh', icon: '🚀', action: () => soundFX.playRocketWhoosh(), bg: 'hover:bg-rose-100 text-rose-900 border-rose-200' },
    { label: 'Star Sparkle', icon: '✨', action: () => soundFX.playSparkle(), bg: 'hover:bg-amber-100 text-amber-900 border-amber-200' },
    { label: 'School Bell', icon: '🔔', action: () => soundFX.playSchoolBell(), bg: 'hover:bg-yellow-100 text-yellow-900 border-yellow-200' },
    { label: 'Page Flip', icon: '📖', action: () => soundFX.playPageFlip(), bg: 'hover:bg-sky-100 text-sky-900 border-sky-200' },
    { label: 'Cartoon Boing', icon: '🎪', action: () => soundFX.playBoing(), bg: 'hover:bg-purple-100 text-purple-900 border-purple-200' },
    { label: 'Water Glug', icon: '💧', action: () => soundFX.playWaterGlug(), bg: 'hover:bg-blue-100 text-blue-900 border-blue-200' },
    { label: 'Bubble Pop', icon: '🎈', action: () => soundFX.playPop(), bg: 'hover:bg-emerald-100 text-emerald-900 border-emerald-200' },
    { label: 'Magic Chime', icon: '🌟', action: () => soundFX.playMagicChime(), bg: 'hover:bg-indigo-100 text-indigo-900 border-indigo-200' },
    { label: 'Footsteps', icon: '🐾', action: () => soundFX.playFootsteps(), bg: 'hover:bg-orange-100 text-orange-900 border-orange-200' },
    { label: 'Victory Trumpet', icon: '🎺', action: () => soundFX.playSuccessFanfare(), bg: 'hover:bg-pink-100 text-pink-900 border-pink-200' }
  ];

  const toggleRain = () => {
    soundFX.playPop();
    if (isRainActive) {
      soundFX.stopAmbientRain();
      setIsRainActive(false);
    } else {
      soundFX.startAmbientRain();
      setIsRainActive(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-5 z-40 font-['Fredoka',sans-serif] select-none">
      {!isOpen ? (
        <button
          onClick={() => {
            soundFX.playPop();
            setIsOpen(true);
          }}
          className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 hover:scale-105 active:scale-95 text-white px-4 py-2.5 rounded-full text-xs font-black flex items-center gap-2 shadow-xl border-2 border-white transition-all cursor-pointer animate-gentle-bounce"
          title="Open Sound FX & Foley Studio"
        >
          <Music className="w-4 h-4 text-white" />
          <span>Sound Lab 🎶</span>
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-md border-4 border-amber-300 p-4 rounded-3xl shadow-2xl w-80 max-w-[90vw] animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎶</span>
              <div>
                <h4 className="text-sm font-black text-slate-800 leading-tight">Story Sound Lab</h4>
                <p className="text-[10px] text-slate-500 font-semibold">Web Audio Synthesizer</p>
              </div>
            </div>
            <button
              onClick={() => {
                soundFX.playPop();
                setIsOpen(false);
              }}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ambient Rain Atmosphere Toggle */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-2.5 mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌧️</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-sky-950 leading-tight">Cozy Rain Ambience</span>
                <span className="text-[9px] font-semibold text-sky-600">Soft white-noise reader sound</span>
              </div>
            </div>
            <button
              onClick={toggleRain}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold cursor-pointer transition-all active:scale-95 shadow-xs ${
                isRainActive ? 'bg-sky-500 text-white animate-pulse' : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-100'
              }`}
            >
              {isRainActive ? 'Playing 🔊' : 'Play Rain 🌧️'}
            </button>
          </div>

          {/* Sound Effect Tiles */}
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {sounds.map((snd, idx) => (
              <button
                key={idx}
                onClick={snd.action}
                className={`p-2 rounded-2xl bg-slate-50 border flex items-center gap-2 text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer ${snd.bg}`}
              >
                <span className="text-lg">{snd.icon}</span>
                <span className="truncate text-[11px]">{snd.label}</span>
              </button>
            ))}
          </div>

          {/* Launch Full Multi-Track Soundscape Mixer */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenSoundscapeMixer();
            }}
            className="w-full mt-2.5 py-2 px-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Atmosphere Mixer 🎧</span>
          </button>

          <div className="mt-2 text-center">
            <span className="text-[9px] font-bold text-slate-400">
              💡 Tap sounds while reading along with characters!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
