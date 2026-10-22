import React, { useState, useEffect } from 'react';
import {
  Home, Play, Pause,
  Volume2, VolumeX, Mic, MicOff, Maximize2, Minimize2,
  BookOpen, Wand2, Droplets, Sparkles, Drama
} from 'lucide-react';
import { soundFX } from '../services/soundEffects';

/* ────────────────────────────────────────────────
   Small coloured circle badge that holds an icon
   ──────────────────────────────────────────────── */
function IconBadge({ bg, children }) {
  return (
    <span
      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}


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



  // Story icon by title keyword
  const StoryIcon =
    activeStoryTitle.toLowerCase().includes('dolly') ? Drama
    : activeStoryTitle.toLowerCase().includes('cave') ? Wand2
    : activeStoryTitle.toLowerCase().includes('rocket') ? Sparkles
    : Droplets;

  return (
    <header
      className="sticky top-0 z-40 w-full overflow-hidden"
      style={{
        background: '#ffffff',
        borderBottom: '1.5px solid #e2e8f0',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        height: '56px',
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      <div className="h-full flex items-center gap-2 px-3 md:px-4">

        {/* ── LEFT: Library + Story Title ────────────────── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Library */}
          <button
            onClick={() => { soundFX.playPop(); onGoHome(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <IconBadge bg="#64748b">
              <Home className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </IconBadge>
            <span className="text-[13px] font-black text-slate-800 whitespace-nowrap">Library</span>
          </button>

          {/* Story title pill — visible at lg+ */}
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-100 bg-white shrink-0"
          >
            <IconBadge bg="#38bdf8">
              <StoryIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </IconBadge>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-black text-slate-800 whitespace-nowrap max-w-[160px] truncate">
                {activeStoryTitle}
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Interactive Storybook Reader
              </span>
            </div>
          </div>
        </div>

        {/* ── MIDDLE: spacer ── */}
        <div className="flex-1" />

        {/* ── RIGHT: Settings ─────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">


          {/* Sound */}
          <button
            onClick={() => { soundFX.playPop(); onToggleSound(); }}
            title={soundMuted ? 'Unmute' : 'Mute'}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-slate-50"
          >
            {soundMuted
              ? <VolumeX className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
              : <Volume2 className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />}
          </button>

          {/* Narrator */}
          <button
            onClick={() => { soundFX.playPop(); onToggleNarrator(); }}
            title={narratorEnabled ? 'Narrator On' : 'Narrator Off'}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-slate-50"
          >
            {narratorEnabled
              ? <Mic className="w-4 h-4 text-amber-500" strokeWidth={2.5} />
              : <MicOff className="w-4 h-4 text-slate-400" strokeWidth={2.5} />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullScreen}
            title="Fullscreen"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 hover:bg-slate-50"
          >
            {isFullscreen
              ? <Minimize2 className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
              : <Maximize2 className="w-4 h-4 text-slate-500" strokeWidth={2.5} />}
          </button>

          {/* ── Auto-Play: large blue pill ── */}
          <button
            onClick={() => { soundFX.playPop(); onToggleAutoPlay(); }}
            className={`flex items-center gap-2 pl-3 pr-4 py-2 rounded-full font-black text-[13px] text-white cursor-pointer active:scale-95 transition-all shrink-0 ${
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
