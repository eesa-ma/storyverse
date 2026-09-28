import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Maximize2, Minimize2, Play, Pause, Home, Sparkles, Trophy, Palette, Gamepad2, Moon, Sun, Globe } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function Navbar({
  currentSceneId,
  totalScenes,
  soundMuted,
  onToggleSound,
  narratorEnabled,
  onToggleNarrator,
  isAutoPlayActive = false,
  onToggleAutoPlay = () => { },
  onGoHome = () => { },
  activeStoryTitle = "THE BOTTLE THAT WAITED",
  onOpenBadges = () => { },
  onOpenEasel = () => { },
  onOpenMemoryGame = () => { },
  isBedtimeMode = false,
  onToggleBedtimeMode = () => { },
  activeLanguage = 'en',
  onChangeLanguage = () => { },
  unlockedBadgesCount = 0
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullScreen = () => {
    soundFX.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const LANGUAGES = [
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'hi', flag: '🇮🇳', label: 'Hindi' }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-700 px-3 py-2 shadow-lg select-none text-white font-['Fredoka',sans-serif] ${isBedtimeMode
        ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b-4 border-indigo-400'
        : 'bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 border-b-4 border-sky-300'
      }`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">

        {/* Left: Library Home Button & Story Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              soundFX.playPop();
              onGoHome();
            }}
            className="px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs md:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all border-2 border-white cursor-pointer shrink-0"
            title="Return to Storyverse Library"
          >
            <Home className="w-4 h-4 text-amber-950" />
            <span>Library 📚</span>
          </button>

          <div className="hidden sm:flex flex-col min-w-0">
            <h1 className="text-xs md:text-sm font-black tracking-wide text-white drop-shadow-sm flex items-center gap-1 truncate">
              <span>{isBedtimeMode ? '🌙' : '💧'}</span>
              <span className="truncate">{activeStoryTitle}</span>
            </h1>
            <p className="text-[10px] font-semibold text-sky-100">
              Interactive Storybook Reader
            </p>
          </div>
        </div>

        {/* Center: Interactive Learning Shortcuts Bar */}
        <div className="flex items-center gap-1.5 bg-white/15 p-1 rounded-2xl border border-white/20 shadow-inner">

          {/* Trophy Badges Button */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenBadges();
            }}
            className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs flex items-center gap-1 shadow-xs border border-white active:scale-95 transition-all cursor-pointer"
            title="Open Trophy Chest & Badges"
          >
            <Trophy className="w-3.5 h-3.5 fill-amber-950" />
            <span>Badges</span>
            <span className="bg-amber-950 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-black ml-0.5">
              {unlockedBadgesCount}
            </span>
          </button>

          {/* Coloring Easel Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenEasel();
            }}
            className="px-2.5 py-1 rounded-xl bg-pink-400 hover:bg-pink-300 text-pink-950 font-black text-xs flex items-center gap-1 shadow-xs border border-white active:scale-95 transition-all cursor-pointer"
            title="Open Storybook Coloring Easel"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Color 🎨</span>
          </button>

          {/* Memory Match Mini-Game Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenMemoryGame();
            }}
            className="px-2.5 py-1 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs flex items-center gap-1 shadow-xs border border-white active:scale-95 transition-all cursor-pointer"
            title="Play Memory Match Mini-Game"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Game 🧩</span>
          </button>

          {/* Bedtime Mode Toggle */}
          <button
            onClick={() => {
              soundFX.playPop();
              onToggleBedtimeMode();
            }}
            className={`px-2.5 py-1 rounded-xl font-black text-xs flex items-center gap-1 border transition-all cursor-pointer ${isBedtimeMode
                ? 'bg-indigo-300 text-indigo-950 border-indigo-100 shadow-sm'
                : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
              }`}
            title="Toggle Bedtime Calm Mode"
          >
            {isBedtimeMode ? <Moon className="w-3.5 h-3.5 text-indigo-950 fill-indigo-950" /> : <Sun className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
            <span className="hidden md:inline">{isBedtimeMode ? 'Bedtime 🌙' : 'Daytime ☀️'}</span>
          </button>

          {/* Language Selector */}
          <select
            value={activeLanguage}
            onChange={(e) => {
              soundFX.playPop();
              onChangeLanguage(e.target.value);
            }}
            className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-2 py-1 rounded-xl border border-white/30 cursor-pointer outline-none text-center"
            title="Change Story Language"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code} className="text-slate-900 font-medium">
                {l.flag} {l.code.toUpperCase()}
              </option>
            ))}
          </select>

        </div>

        {/* Right: Sound & Player Controls */}
        <div className="flex items-center gap-1.5">

          {/* STORYTELLER AUTOPLAY MODE BUTTON */}
          <button
            onClick={() => {
              soundFX.playPop();
              onToggleAutoPlay();
            }}
            className={`px-3 py-1.5 rounded-2xl font-black text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all border-2 border-white cursor-pointer ${isAutoPlayActive
                ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            title="Toggle Hands-Free Storyteller Mode"
          >
            {isAutoPlayActive ? <Pause className="w-3.5 h-3.5 text-amber-950 fill-amber-950" /> : <Play className="w-3.5 h-3.5 text-white fill-white" />}
            <span className="hidden sm:inline">{isAutoPlayActive ? 'Playing...' : '▶ Auto-Play'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullScreen}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all border border-white/40 cursor-pointer"
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Narrator Voice Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onToggleNarrator();
            }}
            className={`px-2.5 py-1.5 rounded-2xl flex items-center gap-1 text-xs font-black transition-all border cursor-pointer ${narratorEnabled
                ? 'bg-emerald-400 text-emerald-950 border-white shadow-sm'
                : 'bg-white/10 text-sky-200 border-white/20'
              }`}
            title="Toggle Voice Narration"
          >
            {narratorEnabled ? <Mic className="w-3.5 h-3.5 text-emerald-950" /> : <MicOff className="w-3.5 h-3.5 text-sky-300" />}
          </button>

          {/* Sound FX Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onToggleSound();
            }}
            className={`px-2.5 py-1.5 rounded-2xl flex items-center gap-1 text-xs font-black transition-all border cursor-pointer ${!soundMuted
                ? 'bg-amber-400 text-amber-950 border-white shadow-sm'
                : 'bg-white/10 text-sky-200 border-white/20'
              }`}
            title="Toggle Sound FX"
          >
            {!soundMuted ? <Volume2 className="w-3.5 h-3.5 text-amber-950" /> : <VolumeX className="w-3.5 h-3.5 text-sky-300" />}
          </button>
        </div>
      </div>
    </header>
  );
}
