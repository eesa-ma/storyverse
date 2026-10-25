import React, { useState } from 'react';
import { Sparkles, Tv, Maximize2, Minimize2, Footprints, Clock, Volume2 } from 'lucide-react';
import CartoonBottleSprite from './CartoonBottleSprite';
import BottleObject from './BottleObject';
import AaravSprite from './AaravSprite';
import ChalkboardCanvas from './ChalkboardCanvas';

export default function CartoonTVStage({
  scene,
  currentSentence = null,
  bottleState = 'happy',
  showSparkle = false,
  showRocketLaunch = false,
  waterStationStep = 0,
  isBagUnpacked = false,
  isInteractivePromptActive = false,
  onTapObject = () => {},
  onSelectInteractionOption = () => {}
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChalkboardDrawer, setShowChalkboardDrawer] = useState(false);

  const screenState = currentSentence?.screenState || {
    lighting: 'bright',
    bottleMood: bottleState || 'happy',
    overlayEmoji: '💧',
    activeFocus: 'full',
    animation: 'bounce'
  };

  // Determine Aarav's presence & pose based on scene and sentence
  const shouldShowAarav = () => {
    if (scene.id === 1 || scene.id === 7 || scene.id === 8 || scene.id === 9) return true;
    if (currentSentence?.speaker === 'AARAV') return true;
    return false;
  };

  const getAaravPose = () => {
    if (scene.id === 7) return 'searching';
    if (scene.id === 8) return 'kneeling';
    if (currentSentence?.speaker === 'AARAV') return 'waving';
    return 'happy';
  };

  // Dynamic Lighting & Atmospheric Filter Classes
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

  // Dynamic Focus Zoom & Pan Camera Transforms
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

  const speaker = currentSentence?.speaker || 'NARRATOR';

  return (
    <div
      className={`relative w-full transition-all duration-500 select-none ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-2'
          : 'h-[480px] md:h-[560px] rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl bg-slate-950'
      }`}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 flex flex-col justify-between">
        
        {/* 1. CARTOON TV HEADER HUD BAR */}
        <div className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent p-3 flex items-center justify-between pointer-events-auto text-white">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 w-3 h-3 rounded-full animate-ping" />
            <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1 shadow-md">
              <Tv className="w-3.5 h-3.5" />
              <span>CARTOON TV • EPISODE {scene.id}</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-extrabold text-amber-200 bg-slate-900/80 px-3 py-0.5 rounded-full border border-amber-400/40">
              {scene.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="bg-slate-800/90 hover:bg-slate-700 p-2 rounded-xl border border-slate-600 text-amber-300 shadow-md transition-transform hover:scale-105"
              title="Toggle Fullscreen TV View"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. MAIN ANIMATED CARTOON CLASSROOM SCENE */}
        {scene.background !== 'water-station' ? (
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-out origin-center ${getCameraTransform()}`}
          >
            <img
              src="/aarav_empty_desk_classroom_bg.jpg"
              alt="Cartoon Classroom Scene"
              className={`w-full h-full object-cover object-center transition-all duration-700 ${getLightingStyles()}`}
            />

            {/* Ambient Lighting Overlays */}
            {screenState.lighting === 'spotlight' && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,transparent_20%,rgba(15,23,42,0.85)_75%)] pointer-events-none animate-pulse" />
            )}
            {(screenState.lighting === 'dusk' || screenState.lighting === 'twilight') && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-indigo-950/40 to-slate-900/60 pointer-events-none" />
            )}
            {screenState.lighting === 'door_open' && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-yellow-200/20 to-transparent pointer-events-none animate-pulse" />
            )}

            {/* DESK COVER PATCH: Hides static background image bottle so only 1 dynamic bottle exists */}
            <div className="absolute bottom-[18%] left-[30%] w-24 h-32 bg-amber-950/70 rounded-3xl backdrop-blur-md border border-amber-800/50 pointer-events-none z-20" />

            {/* ANIMATED CARTOON BOTTLE SPRITE (SINGLE HERO BOTTLE ON DESK) */}
            <div className="absolute bottom-[16%] left-[30%] z-30 transform hover:scale-110 transition-transform">
              <CartoonBottleSprite
                mood={screenState.bottleMood || bottleState}
                waterLevel={scene.id >= 8 ? 100 : scene.id >= 4 ? 40 : 80}
              />
              
              {/* COMIC SPEECH BUBBLE FOR BOTTLE */}
              {speaker === 'BOTTLE' && currentSentence && (
                <div className="absolute -top-24 -left-12 z-40 bg-white text-slate-900 border-4 border-sky-400 p-3 rounded-2xl shadow-2xl w-48 animate-gentle-bounce">
                  <span className="text-[10px] font-black uppercase text-sky-600 block">Buddy Bottle</span>
                  <p className="text-xs font-black leading-snug">{currentSentence.text}</p>
                  {/* Bubble Tail */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-sky-400" />
                </div>
              )}
            </div>

            {/* ANIMATED CARTOON AARAV SPRITE (WHEN PRESENT IN SCENE) */}
            {shouldShowAarav() && (
              <div className="absolute bottom-10 left-[18%] z-30 transition-all duration-700 animate-gentle-bounce">
                <AaravSprite pose={getAaravPose()} />

                {/* COMIC SPEECH BUBBLE FOR AARAV */}
                {speaker === 'AARAV' && currentSentence && (
                  <div className="absolute -top-24 -left-8 z-40 bg-white text-slate-900 border-4 border-amber-400 p-3 rounded-2xl shadow-2xl w-48 animate-bounce">
                    <span className="text-[10px] font-black uppercase text-amber-600 block">👦 Aarav</span>
                    <p className="text-xs font-black leading-snug">{currentSentence.text}</p>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-400" />
                  </div>
                )}
              </div>
            )}

            {/* NARRATOR / SFX SPEECH BUBBLE IN TOP CENTER */}
            {(speaker === 'NARRATOR' || speaker === 'SFX' || speaker === 'HAPPY MEMORY') && currentSentence && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 text-amber-200 border-3 border-amber-400 px-4 py-2 rounded-2xl shadow-2xl max-w-md text-center animate-bounce">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  {speaker === 'HAPPY MEMORY' ? '💙 Happy Memory' : '✨ Story Time'}
                </span>
                <p className="text-xs md:text-sm font-extrabold text-white">{currentSentence.text}</p>
              </div>
            )}
          </div>
        ) : (
          /* WATER REFILL STATION VIEW */
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
              <BottleObject size="medium" mood="refilled" waterLevel={waterStationStep >= 2 ? 100 : 40} className="pointer-events-none" />
              <span className="text-xs font-black text-sky-900 mt-2">2. Fill Bottle</span>
            </div>

            <div
              onClick={() => onTapObject('cap')}
              className={`cursor-pointer transition-all ${
                waterStationStep === 2 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
              } flex flex-col items-center bg-white/95 p-4 md:p-6 rounded-3xl border-4 border-sky-400 shadow-xl`}
            >
              <span className="text-6xl md:text-7xl">🧢</span>
              <span className="text-xs font-black text-sky-900 mt-2">3. Close Cap</span>
            </div>
          </div>
        )}

        {/* 3. DYNAMIC FOOTSTEP RIPPLE ANIMATION */}
        {screenState.overlayEmoji === '👣' && (
          <div className="absolute bottom-20 left-1/4 z-30 flex items-center gap-4 pointer-events-none">
            <Footprints className="w-10 h-10 text-amber-300 animate-ping opacity-80" />
            <Footprints className="w-12 h-12 text-yellow-400 animate-ping opacity-90 delay-150" />
            <span className="text-yellow-200 text-xs font-black bg-slate-950/90 px-3 py-1 rounded-full border border-yellow-400">
              👣 Tap… tap… tap…
            </span>
          </div>
        )}

        {/* 4. CHALKBOARD DRAWING OVERLAY */}
        {scene.background !== 'water-station' && (
          <div className="absolute top-12 right-6 w-56 sm:w-72 h-24 sm:h-32 z-20">
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

        {/* 5. CARTOON MOVIE SUBTITLES BAR (BOTTOM OF SCREEN) */}
        {currentSentence?.text && (
          <div className="absolute bottom-4 inset-x-6 z-40 flex justify-center pointer-events-none">
            <div className="bg-slate-950/85 backdrop-blur-md border-2 border-yellow-400/60 px-6 py-2 rounded-2xl shadow-2xl max-w-2xl text-center">
              <p className="text-base md:text-lg font-extrabold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-snug">
                "{currentSentence.text}"
              </p>
            </div>
          </div>
        )}

        {/* ROCKET & SPARKLE FX OVERLAYS */}
        {showRocketLaunch && (
          <div className="absolute bottom-20 left-1/2 text-7xl animate-rocket pointer-events-none z-40">
            🚀💨
          </div>
        )}
        {showSparkle && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center gap-8">
            <Sparkles className="w-16 h-16 text-yellow-300 animate-sparkle" />
            <Sparkles className="w-20 h-20 text-sky-300 animate-sparkle" />
            <Sparkles className="w-12 h-12 text-pink-300 animate-sparkle" />
          </div>
        )}
      </div>
    </div>
  );
}
