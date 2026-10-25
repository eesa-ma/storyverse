import React, { useState } from 'react';
import { Sparkles, Heart, Volume2, Search, Footprints, Clock, Rocket, Zap } from 'lucide-react';
import ChalkboardCanvas from './ChalkboardCanvas';
import BottleObject from './BottleObject';

export default function ClassroomCanvas({
  scene,
  currentSentence = null,
  showSparkle = false,
  showRocketLaunch = false,
  waterStationStep = 0,
  isBagUnpacked = false,
  onTapObject = () => {}
}) {
  const [showChalkboardDrawer, setShowChalkboardDrawer] = useState(false);

  const screenState = currentSentence?.screenState || {
    lighting: 'bright',
    bottleMood: 'happy',
    overlayEmoji: '💧',
    activeFocus: 'full',
    animation: 'bounce'
  };

  // 1. Dynamic Lighting & Atmospheric Filter Classes
  const getLightingStyles = () => {
    switch (screenState.lighting) {
      case 'afternoon':
        return 'filter sepia-[0.25] brightness-95 contrast-105';
      case 'quiet':
        return 'filter brightness-90 contrast-110 hue-rotate-[-10deg]';
      case 'sunset':
        return 'filter brightness-80 sepia-[0.4] hue-rotate-[-20deg]';
      case 'spotlight':
        return 'filter brightness-75 contrast-125 saturate-120';
      case 'dusk':
        return 'filter brightness-70 hue-rotate-[210deg] saturate-110';
      case 'twilight':
        return 'filter brightness-50 hue-rotate-[240deg] contrast-120';
      case 'door_open':
        return 'filter brightness-110 contrast-105 saturate-110';
      case 'reunion':
        return 'filter brightness-105 saturate-130';
      default:
        return 'filter brightness-100 contrast-100';
    }
  };

  // 2. Dynamic Focus Zoom & Pan Camera Transforms
  const getCameraTransform = () => {
    switch (screenState.activeFocus) {
      case 'desk':
        return 'scale-110 translate-y-2';
      case 'bag':
        return 'scale-125 -translate-x-6 translate-y-4';
      case 'clock':
        return 'scale-125 translate-x-10 -translate-y-6';
      case 'door':
        return 'scale-125 -translate-x-12 -translate-y-2';
      default:
        return 'scale-100 translate-x-0 translate-y-0';
    }
  };

  return (
    <div className="relative w-full h-[480px] md:h-[560px] rounded-3xl overflow-hidden border-8 border-amber-950 shadow-2xl transition-all duration-700 select-none bg-slate-900">
      
      {/* Dynamic Classroom Image with Camera Zoom & Atmospheric Filters */}
      {scene.background !== 'water-station' && (
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-out origin-center ${getCameraTransform()}`}
        >
          <img
            src="/aarav_empty_desk_classroom_bg.jpg"
            alt="Cartoon Classroom with Empty Desk and Water Bottle"
            className={`w-full h-full object-cover object-center transition-all duration-700 ${getLightingStyles()}`}
          />

          {/* Dynamic Spotlight Radial Overlay for Spotlight / Twilight Sentences */}
          {screenState.lighting === 'spotlight' && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,transparent_20%,rgba(15,23,42,0.85)_75%)] pointer-events-none animate-pulse" />
          )}

          {/* Dynamic Dusk/Twilight Night Vignette Overlay */}
          {(screenState.lighting === 'dusk' || screenState.lighting === 'twilight') && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-indigo-950/40 to-slate-900/60 pointer-events-none" />
          )}

          {/* Dynamic Door Open Beam Effect */}
          {screenState.lighting === 'door_open' && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-yellow-200/20 to-transparent pointer-events-none animate-pulse" />
          )}
        </div>
      )}

      {/* DYNAMIC FLOATING SENTENCE PROP & EMOJI OVERLAY */}
      {currentSentence && (
        <div className="absolute top-6 left-6 z-30 flex items-center gap-3 bg-slate-950/85 backdrop-blur-md border-2 border-amber-400/80 px-4 py-2 rounded-2xl shadow-xl animate-bounce">
          <span className="text-3xl md:text-4xl">{screenState.overlayEmoji}</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
              Active Scene Element
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white">
              {currentSentence.speaker === 'BOTTLE' ? <><BottleObject size="small" className="pointer-events-none" /> Bottle Speaking</> : currentSentence.speaker === 'AARAV' ? '👦 Aarav Speaking' : currentSentence.speaker === 'SFX' ? '🔊 Sound Effect' : '🗣️ Narration'}
            </span>
          </div>
        </div>
      )}

      {/* DYNAMIC FOOTSTEP RIPPLE ANIMATION (When Footsteps are Spoken) */}
      {screenState.overlayEmoji === '👣' && (
        <div className="absolute bottom-16 left-1/4 z-30 flex items-center gap-4 pointer-events-none">
          <Footprints className="w-10 h-10 text-amber-300 animate-ping opacity-80" />
          <Footprints className="w-12 h-12 text-yellow-400 animate-ping opacity-90 delay-150" />
          <span className="text-yellow-200 text-xs font-black bg-slate-900/90 px-3 py-1 rounded-full border border-yellow-400">
            👣 Tap… tap… tap…
          </span>
        </div>
      )}

      {/* DYNAMIC TICKING CLOCK HIGHLIGHT (When Time Passes) */}
      {screenState.overlayEmoji === '🕒' && (
        <div className="absolute top-16 right-1/3 z-30 flex items-center gap-2 bg-purple-950/90 px-3 py-1.5 rounded-2xl border-2 border-purple-400 text-purple-200 text-xs font-black shadow-lg animate-pulse">
          <Clock className="w-5 h-5 text-purple-300 animate-spin" />
          <span>*Tick... Tock... Time Passes*</span>
        </div>
      )}

      {/* CHALKBOARD DRAWING OVERLAY */}
      {scene.background !== 'water-station' && (
        <div className="absolute top-8 right-10 md:right-16 w-64 sm:w-80 md:w-96 h-28 sm:h-36 z-20">
          {!showChalkboardDrawer ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowChalkboardDrawer(true);
              }}
              className="w-full h-full cursor-pointer group flex items-start justify-end p-2"
              title="Click to draw on Chalkboard!"
            >
              <span className="text-yellow-300 text-xs font-black bg-emerald-950/85 px-3 py-1 rounded-full border border-yellow-400/60 shadow-md group-hover:scale-105 transition-transform">
                ✏️ Draw on Board
              </span>
            </div>
          ) : (
            <div className="relative -top-6 -right-4 z-40">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChalkboardDrawer(false);
                }}
                className="absolute -top-4 -right-2 z-50 bg-amber-300 hover:bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full text-xs border-2 border-amber-600 shadow-md"
              >
                Close Board ✖
              </button>
              <ChalkboardCanvas />
            </div>
          )}
        </div>
      )}

      {/* UNPACKED DESK ITEMS OVERLAY */}
      {scene.background !== 'water-station' && isBagUnpacked && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center justify-around bg-amber-100/95 border-4 border-amber-500 p-2 rounded-2xl shadow-2xl animate-gentle-bounce pointer-events-auto z-30 max-w-sm w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTapObject('unpacked_books');
            }}
            className="flex flex-col items-center hover:scale-110 transition-transform bg-white p-1.5 rounded-xl border border-amber-300 shadow-sm"
          >
            <span className="text-2xl">📚</span>
            <span className="text-[9px] font-black text-amber-950">Books</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onTapObject('unpacked_pencil');
            }}
            className="flex flex-col items-center hover:scale-110 transition-transform bg-white p-1.5 rounded-xl border border-amber-300 shadow-sm"
          >
            <span className="text-2xl">✏️</span>
            <span className="text-[9px] font-black text-amber-950">Pencils</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onTapObject('unpacked_lunchbox');
            }}
            className="flex flex-col items-center hover:scale-110 transition-transform bg-white p-1.5 rounded-xl border border-amber-300 shadow-sm"
          >
            <span className="text-2xl">🍱</span>
            <span className="text-[9px] font-black text-amber-950">Lunchbox</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onTapObject('unpacked_apple');
            }}
            className="flex flex-col items-center hover:scale-110 transition-transform bg-white p-1.5 rounded-xl border border-amber-300 shadow-sm"
          >
            <span className="text-2xl">🍎</span>
            <span className="text-[9px] font-black text-amber-950">Apple</span>
          </button>
        </div>
      )}

      {/* WATER REFILL STATION VIEW */}
      {scene.background === 'water-station' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-teal-200 flex items-center justify-center gap-6 md:gap-10">
          <div
            onClick={() => onTapObject('tap')}
            className={`cursor-pointer transition-all ${
              waterStationStep === 0 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
            } flex flex-col items-center bg-white/95 p-4 md:p-6 rounded-3xl border-4 border-sky-400 shadow-xl`}
          >
            <span className="text-6xl md:text-7xl">🚰</span>
            <span className="text-xs font-black text-sky-900 mt-2">1. Tap Water Tap</span>
          </div>

          <div
            onClick={() => onTapObject('bottle')}
            className={`cursor-pointer transition-all ${
              waterStationStep === 1 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
            } flex flex-col items-center bg-white/95 p-4 md:p-6 rounded-3xl border-4 border-sky-400 shadow-xl`}
          >
            <div className="relative">
              <BottleObject size="medium" className="pointer-events-none" />
              {waterStationStep >= 2 && (
                <span className="absolute top-0 right-0 text-2xl animate-bounce">✨</span>
              )}
            </div>
            <span className="text-xs font-black text-sky-900 mt-2">2. Fill Bottle</span>
          </div>

          <div
            onClick={() => onTapObject('cap')}
            className={`cursor-pointer transition-all ${
              waterStationStep === 2 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
            } flex flex-col items-center bg-white/95 p-4 md:p-6 rounded-3xl border-4 border-sky-400 shadow-xl`}
          >
            <span className="relative inline-block h-12 w-24 rounded-lg border-4 border-blue-950 bg-blue-700 shadow-md">
              <span className="absolute inset-x-2 top-2 border-t-4 border-blue-300" />
              <span className="absolute inset-x-2 bottom-2 border-b-4 border-blue-900" />
            </span>
            <span className="text-xs font-black text-sky-900 mt-2">3. Close Cap</span>
          </div>
        </div>
      )}

      {/* ROCKET LAUNCH OVERLAY */}
      {showRocketLaunch && (
        <div className="absolute bottom-20 left-1/2 text-7xl animate-rocket pointer-events-none z-40">
          🚀💨
        </div>
      )}

      {/* SPARKLES OVERLAY */}
      {showSparkle && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center gap-8">
          <Sparkles className="w-16 h-16 text-yellow-300 animate-sparkle" />
          <Sparkles className="w-20 h-20 text-sky-300 animate-sparkle" />
          <Sparkles className="w-12 h-12 text-pink-300 animate-sparkle" />
        </div>
      )}
    </div>
  );
}
