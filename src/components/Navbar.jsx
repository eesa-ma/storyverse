import React, { useState, useEffect } from 'react';
import {
  Home, Play, Pause,
  Volume2, VolumeX, Mic, MicOff, Maximize2, Minimize2
} from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function Navbar({
  currentSceneId,
  totalScenes,
  soundMuted,
  onToggleSound,
  narratorEnabled,
  onToggleNarrator,
  isAutoPlayActive = false,
  onToggleAutoPlay = () => {},
  onGoHome = () => {},
  activeStoryTitle = 'The Bottle That Waited',
  unlockedBadgesCount = 0,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const toggleFullScreen = () => {
    soundFX.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  };



  return (
    <header
      className="sticky top-0 z-40 w-[calc(100%-2rem)] max-w-[1325px] mx-auto mt-[18px] rounded-[21px] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(255,255,255,0.98)',
        boxShadow: '0 7px 22px rgba(30,64,175,0.14)',
        backdropFilter: 'blur(12px)',
        height: '62px',
        marginTop: '18px',
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      <div className="h-full flex items-center gap-3 px-3 md:px-4">

        {/* ── LEFT: Library + Story Title ────────────────── */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Library */}
          <button
            onClick={() => { soundFX.playPop(); onGoHome(); }}
            className="flex items-center gap-2 px-1.5 py-1.5 rounded-full bg-transparent hover:bg-sky-50 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span className="w-11 h-11 rounded-full bg-[#edf6ff] flex items-center justify-center">
              <Home className="w-5 h-5 text-[#1976d2] fill-[#1976d2]" strokeWidth={2.6} />
            </span>
            <span className="text-[14px] font-black text-[#102b57] whitespace-nowrap">Library</span>
          </button>

          {/* Story title pill — visible at lg+ */}
          <div
            className="hidden md:flex items-center gap-2.5 shrink-0"
          >
            <div className="flex flex-col leading-none">
              <span className="text-[18px] md:text-[20px] font-black text-[#102b57] whitespace-nowrap max-w-[300px] truncate">
                {activeStoryTitle}
              </span>
              <span className="text-[8px] font-bold text-[#7890ad] uppercase tracking-[0.2em] mt-1 whitespace-nowrap">
                Interactive Storybook Reader
              </span>
            </div>
          </div>
        </div>

        {/* ── MIDDLE: spacer ── */}
        <div className="flex-1" />

        {/* ── RIGHT: Settings ─────────────────────────────── */}
        <div className="flex items-center gap-2.5 shrink-0">


          {/* Sound */}
          <button
            onClick={() => { soundFX.playPop(); onToggleSound(); }}
            title={soundMuted ? 'Unmute' : 'Mute'}
            className="w-11 h-11 rounded-full border border-[#e2ebf4] bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-sky-50"
          >
            {soundMuted
              ? <VolumeX className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
              : <Volume2 className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />}
          </button>

          {/* Narrator */}
          <button
            onClick={() => { soundFX.playPop(); onToggleNarrator(); }}
            title={narratorEnabled ? 'Narrator On' : 'Narrator Off'}
            className="w-11 h-11 rounded-full border border-[#e2ebf4] bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-amber-50"
          >
            {narratorEnabled
              ? <Mic className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
              : <MicOff className="w-5 h-5 text-slate-400" strokeWidth={2.5} />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullScreen}
            title="Fullscreen"
            className="w-11 h-11 rounded-full border border-[#e2ebf4] bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-slate-50"
          >
            {isFullscreen
              ? <Minimize2 className="w-5 h-5 text-slate-500" strokeWidth={2.5} />
              : <Maximize2 className="w-5 h-5 text-slate-500" strokeWidth={2.5} />}
          </button>

          {/* ── Auto-Play: large blue pill ── */}
          <button
            onClick={() => { soundFX.playPop(); onToggleAutoPlay(); }}
            className={`flex items-center gap-2.5 pl-5 pr-6 py-2.5 rounded-full font-black text-[13px] text-white cursor-pointer active:scale-95 transition-all shrink-0 ${
              isAutoPlayActive ? 'animate-pulse' : ''
            }`}
            style={{
              background: isAutoPlayActive
                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              boxShadow: '0 3px 14px rgba(59,130,246,0.45)',
            }}
            title={isAutoPlayActive ? 'Stop Auto-Play' : 'Start Auto-Play'}
          >
            {isAutoPlayActive
              ? <Pause className="w-4 h-4 fill-white shrink-0" />
              : <Play className="w-4 h-4 fill-white shrink-0" />}
            <span className="whitespace-nowrap">Auto-Play</span>
          </button>
        </div>

      </div>
    </header>
  );
}
