import React, { useState } from 'react';
import { Sparkles, BookOpen, Maximize2, Minimize2, Footprints, Clock, Bookmark } from 'lucide-react';
import CartoonBottleSprite from './CartoonBottleSprite';
import AaravSprite from './AaravSprite';
import MiloTobySprite from './MiloTobySprite';
import LilyDollSprite from './LilyDollSprite';
import RockyRocketSprite from './RockyRocketSprite';
import BennyBearSprite from './BennyBearSprite';
import ChalkboardCanvas from './ChalkboardCanvas';

export default function StorybookFrame({
  scene,
  activeStoryId = 'bottle-that-waited',
  currentSentence = null,
  bottleState = 'happy',
  showSparkle = false,
  showRocketLaunch = false,
  waterStationStep = 0,
  isBagUnpacked = false,
  onTapObject = () => { }
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

  // Dynamic Lighting Filters for Storybook Illustrations
  const getLightingStyles = () => {
    switch (screenState.lighting) {
      case 'afternoon':
        return 'filter sepia-[0.2] brightness-95 contrast-105';
      case 'quiet':
        return 'filter brightness-90 contrast-110 hue-rotate-[-10deg]';
      case 'sunset':
        return 'filter brightness-85 sepia-[0.35] hue-rotate-[-20deg]';
      case 'spotlight':
        return 'filter brightness-80 contrast-120 saturate-110';
      case 'dusk':
        return 'filter brightness-75 hue-rotate-[200deg]';
      case 'twilight':
        return 'filter brightness-60 hue-rotate-[230deg]';
      case 'door_open':
        return 'filter brightness-105 contrast-105';
      case 'reunion':
        return 'filter brightness-105 saturate-120';
      default:
        return 'filter brightness-100 contrast-100';
    }
  };

  // Camera Focus Transforms
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
      className={`relative w-full h-full min-h-0 transition-all duration-500 select-none ${isFullscreen
        ? 'fixed inset-0 z-50 bg-sky-950 flex items-center justify-center p-4'
        : 'rounded-l-3xl rounded-r-none p-2 md:p-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 border-y-4 border-l-8 border-r-2 border-amber-700 shadow-2xl book-paper-stack-left flex flex-col justify-between'
        }`}
    >
      {/* PARCHMENT STORYBOOK LEFT PAGE */}
      <div className="relative w-full h-full rounded-l-2xl rounded-r-sm parchment-page border-l-2 border-y border-amber-200/80 shadow-inner overflow-hidden flex flex-col justify-between">

        {/* STORYBOOK TOP HEADER & BOOKMARK */}
        <div className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-[#fffdf8]/95 via-[#fffdf8]/80 to-transparent px-4 py-2.5 flex items-center justify-between pointer-events-auto border-b border-amber-300/40">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-amber-500 drop-shadow-sm animate-bounce" />
            <span className="bg-amber-100/90 text-amber-950 font-['Fredoka',sans-serif] font-black px-3.5 py-1 rounded-full text-xs flex items-center gap-1.5 border border-amber-300 shadow-sm tracking-wide">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>CHAPTER {scene.id} • {scene.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="bg-amber-100/90 hover:bg-amber-200 p-1.5 rounded-xl border border-amber-300 text-amber-950 shadow-sm transition-transform hover:scale-105 cursor-pointer"
              title="Toggle Fullscreen Storybook"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MAIN ILLUSTRATION CANVAS WITH GOLDEN EMBOSSED FRAME */}
        <div className="relative w-full h-full p-2.5 pt-10 pb-6 flex items-center justify-center">
          <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-amber-300/90 shadow-2xl ring-2 ring-amber-900/40 bg-slate-900">
            {activeStoryId === 'curious-rocket' ? (
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 flex flex-col justify-between p-4 overflow-hidden select-none">
                {/* Floating Stars & Planets */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-10 left-10 text-3xl animate-spin-slow">⭐</div>
                  <div className="absolute top-1/4 right-10 text-4xl animate-bounce">🪐</div>
                  <div className="absolute bottom-1/3 left-1/4 text-2xl animate-float">✨</div>
                  <div className="absolute top-1/2 left-1/3 text-3xl animate-pulse">🌙</div>
                </div>

                {/* ROCKY ROCKET SPRITE */}
                <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center">
                  <RockyRocketSprite
                    mood={speaker === 'ROCKY' ? 'excited' : 'happy'}
                    isFlying={scene.id >= 2}
                    onTapRocket={() => onTapObject('rocky')}
                  />
                </div>

                {/* SPEECH BUBBLE FOR ROCKY */}
                {speaker === 'ROCKY' && currentSentence && (
                  <div className="absolute top-14 left-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-rose-500 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 block mb-0.5">🚀 Rocky Rocket</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-rose-500" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'bear-lost-pencil' ? (
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-emerald-100 to-emerald-600 flex flex-col justify-between p-4 overflow-hidden select-none">
                {/* Forest Trees & Rainbow Doodles */}
                <div className="absolute top-4 inset-x-4 flex justify-between text-4xl opacity-90 pointer-events-none">
                  <span className="animate-wiggle">🌲</span>
                  <span className="animate-pulse">🌈</span>
                  <span className="animate-bounce">🎨</span>
                  <span className="animate-wiggle">🌳</span>
                </div>

                {/* BENNY BEAR SPRITE */}
                <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center">
                  <BennyBearSprite
                    mood={speaker === 'BENNY' ? 'excited' : 'happy'}
                    hasPencil={true}
                    onTapBear={() => onTapObject('benny')}
                  />
                </div>

                {/* SPEECH BUBBLE FOR BENNY */}
                {speaker === 'BENNY' && currentSentence && (
                  <div className="absolute top-14 left-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-emerald-500 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-0.5">🐻 Benny Bear</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-emerald-500" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'dolly-midnight-adventure' ? (
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden select-none">
                {/* Dynamic Backgrounds */}
                {scene.background === 'toy-castle' ? (
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-pink-950 flex flex-col justify-between p-4">
                    {/* Floating Stars & Balloons */}
                    <div className="absolute top-6 inset-x-8 flex justify-between pointer-events-none">
                      <span className="text-3xl animate-pulse filter drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">🎈</span>
                      <span className="text-4xl animate-bounce filter drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">🏰</span>
                      <span className="text-3xl animate-pulse filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">🧸</span>
                    </div>
                    {/* Lost Toys Room Banner */}
                    <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-pink-500/40 via-purple-400/20 to-transparent border-t border-pink-300/40 backdrop-blur-xs flex items-center justify-center gap-2">
                      <span className="text-2xl animate-bounce">🧸</span>
                      <span className="text-2xl animate-spin-slow">🪀</span>
                      <span className="text-xs font-black text-pink-200 uppercase tracking-widest bg-purple-950/70 px-3.5 py-1 rounded-full border border-pink-400/40 animate-pulse">🏰 Castle of Lost Toys</span>
                      <span className="text-2xl animate-bounce">🎈</span>
                    </div>
                  </div>
                ) : scene.background === 'forest-teacup' || scene.background === 'forest-river' ? (
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-200 to-purple-600 flex flex-col justify-between p-4">
                    {/* Magical Glowing Flowers & Floating Stars */}
                    <div className="absolute top-4 inset-x-4 flex justify-between text-3xl opacity-90 pointer-events-none">
                      <span className="animate-pulse">🌸</span>
                      <span className="animate-bounce">✨</span>
                      <span className="animate-float">🌸</span>
                      <span className="animate-spin-slow">⭐</span>
                    </div>
                    {/* Teacup in Scene 3 */}
                    {scene.id === 3 && (
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <span className="text-6xl animate-pulse filter drop-shadow-xl">☕</span>
                        <span className="text-xs font-black text-purple-950 bg-pink-200 px-2.5 py-0.5 rounded-full border border-purple-400 mt-1">🐰 Teacup Bunny</span>
                      </div>
                    )}
                    {/* River & Toy Boat in Scene 4 */}
                    {scene.id === 4 && (
                      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-cyan-500/60 via-blue-400/40 to-transparent border-t border-cyan-300 flex items-center justify-center">
                        <span className="text-xs font-black text-cyan-950 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-400 animate-pulse">⛵ Toy Block Boat Sailing</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Bedroom Night / Sunrise View */
                  <div className={`absolute inset-0 transition-all duration-700 ${scene.background === 'bedroom-sunrise'
                      ? 'bg-gradient-to-b from-amber-200 via-rose-100 to-amber-100'
                      : 'bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900'
                    } flex flex-col justify-between p-4`}>
                    {/* Moon or Sun */}
                    <div className="absolute top-4 right-6 pointer-events-none">
                      {scene.background === 'bedroom-sunrise' ? (
                        <span className="text-5xl animate-spin-slow">🌅</span>
                      ) : (
                        <span className="text-4xl animate-pulse filter drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]">🌙</span>
                      )}
                    </div>
                    {/* Mysterious Door if scene 2 */}
                    {scene.id === 2 && (
                      <div className="absolute bottom-16 right-10 bg-amber-400/90 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-full border-2 border-amber-200 shadow-xl animate-bounce flex items-center gap-1.5">
                        <span>🚪 Glowing Door</span>
                        <span className="text-base">✨</span>
                      </div>
                    )}
                  </div>
                )}

                {/* LILY DOLL SPRITE */}
                <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center">
                  <LilyDollSprite
                    mood={speaker === 'LILY' ? 'excited' : 'happy'}
                    hasKey={scene.id >= 2}
                    isSailing={scene.id === 4}
                    onTapLily={() => onTapObject('lily')}
                  />
                </div>

                {/* SPEECH BUBBLE FOR LILY */}
                {speaker === 'LILY' && currentSentence && (
                  <div className="absolute top-14 left-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-pink-500 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-800 block mb-0.5">🎀 Lily the Doll</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-pink-500" />
                  </div>
                )}

                {/* SPEECH BUBBLE FOR GIRL OR RABBIT */}
                {(speaker === 'GIRL' || speaker === 'RABBIT') && currentSentence && (
                  <div className="absolute top-14 right-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-purple-400 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-0.5">
                      {speaker === 'GIRL' ? '👧 Little Girl' : '🐰 Teacup Rabbit'}
                    </span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-purple-400" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'secret-cave' ? (
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Background Gradient & Scene Art */}
                {scene.background === 'cave-glowing' || scene.background === 'cave-lake-night' ? (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-sky-950 flex flex-col justify-between p-4">
                    {/* Glowing Wall Crystals */}
                    <div className="absolute top-8 inset-x-8 flex justify-between pointer-events-none">
                      <span className="text-3xl animate-pulse filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">💎</span>
                      <span className="text-4xl animate-bounce filter drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]">✨</span>
                      <span className="text-3xl animate-pulse filter drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">💎</span>
                    </div>
                    {/* Dancing Fireflies */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/5 text-2xl animate-float filter drop-shadow-[0_0_10px_rgba(250,204,21,1)]">✨</div>
                      <div className="absolute top-1/3 right-1/4 text-xl animate-float-slow filter drop-shadow-[0_0_10px_rgba(250,204,21,1)]">✨</div>
                      <div className="absolute bottom-1/3 left-1/3 text-2xl animate-bounce filter drop-shadow-[0_0_10px_rgba(250,204,21,1)]">✨</div>
                    </div>
                    {/* Glowing Lake at Bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-sky-500/40 via-cyan-400/20 to-transparent border-t border-cyan-300/40 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-xs font-black text-cyan-200 uppercase tracking-widest bg-cyan-950/70 px-3.5 py-1 rounded-full border border-cyan-400/40 animate-pulse">🌊 Glowing Underground Lake</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-emerald-100 to-emerald-600 flex flex-col justify-between p-4">
                    {/* Forest Canopy Trees */}
                    <div className="absolute top-2 inset-x-4 flex justify-between text-4xl opacity-80 pointer-events-none">
                      <span className="animate-wiggle">🌲</span>
                      <span className="animate-pulse">🌳</span>
                      <span className="animate-wiggle">🌲</span>
                      <span className="animate-pulse">🌳</span>
                    </div>
                    {/* Sun & Clouds */}
                    <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none">
                      <span className="text-4xl animate-spin-slow">☀️</span>
                      <span className="text-2xl animate-float opacity-90">☁️</span>
                    </div>
                    {/* Golden Arrow on Tree if scene 2 */}
                    {scene.id === 2 && (
                      <div className="absolute top-1/3 left-1/3 bg-amber-400/90 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-full border-2 border-amber-200 shadow-xl animate-bounce flex items-center gap-1.5">
                        <span>🧭 Golden Arrow</span>
                        <span className="text-base">➡️</span>
                      </div>
                    )}
                    {/* Steep Hill if scene 3 */}
                    {scene.id === 3 && (
                      <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-emerald-800/60 rounded-tl-[100px] border-t-4 border-emerald-400 flex items-center justify-center">
                        <span className="text-xs font-black text-amber-100 bg-emerald-950/70 px-3.5 py-1 rounded-full border border-emerald-400/50">⛰️ Steep Hill</span>
                      </div>
                    )}
                  </div>
                )}

                {/* MILO & TOBY CARTOON SPRITES */}
                <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center">
                  <MiloTobySprite
                    miloMood={speaker === 'MILO' ? 'excited' : scene.id === 4 || scene.id === 5 ? 'determined' : 'happy'}
                    tobyMood={scene.id === 4 ? 'trapped' : scene.id === 5 ? 'rescued' : 'happy'}
                    isTrapped={scene.id === 4}
                    isRescued={scene.id === 5}
                    isClimbing={scene.id === 3}
                    onTapMilo={() => onTapObject('milo')}
                    onTapToby={() => onTapObject('toby')}
                  />
                </div>

                {/* SPEECH BUBBLE FOR MILO */}
                {speaker === 'MILO' && currentSentence && (
                  <div className="absolute top-14 left-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-amber-500 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">🦊 Milo the Fox</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-500" />
                  </div>
                )}

                {/* SPEECH BUBBLE FOR TOBY */}
                {speaker === 'TOBY' && currentSentence && (
                  <div className="absolute top-14 right-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-sky-400 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-0.5">🐰 Toby the Rabbit</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-sky-400" />
                  </div>
                )}
              </div>
            ) : scene.background !== 'water-station' ? (
              <div
                onClick={() => onTapObject('bottle')}
                className={`absolute inset-0 cursor-pointer transition-transform duration-700 ease-out origin-center ${getCameraTransform()}`}
              >
                <img
                  src="/aarav_empty_desk_classroom_bg.jpg"
                  alt="Storybook Classroom Illustration"
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${getLightingStyles()}`}
                />

                {/* Ambient Storybook Lighting Overlays */}
                {screenState.lighting === 'spotlight' && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,transparent_25%,rgba(120,53,15,0.75)_80%)] pointer-events-none animate-pulse" />
                )}
                {(screenState.lighting === 'dusk' || screenState.lighting === 'twilight') && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-indigo-950/30 to-amber-900/40 pointer-events-none" />
                )}
                {screenState.lighting === 'door_open' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-yellow-100/20 to-transparent pointer-events-none animate-pulse" />
                )}

                {/* SOFT NATURAL DESK SHADOW */}
                <div className="absolute bottom-[16%] left-[28%] w-28 h-28 bg-amber-950/30 rounded-full blur-lg pointer-events-none z-20" />

                {/* INTERACTIVE CLOCK HOTSPOT */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onTapObject('clock');
                  }}
                  className="absolute top-[15%] left-[45%] w-12 h-12 rounded-full cursor-pointer hover:scale-125 transition-transform z-20 flex items-center justify-center group"
                  title="Tap Clock ⏰"
                >
                  <span className="text-xs opacity-90 group-hover:opacity-100 transition-opacity bg-amber-100/90 text-amber-950 px-2 py-0.5 rounded-full font-bold shadow-md border border-amber-300 flex items-center gap-1">⏰ Tap</span>
                </div>

                {/* INTERACTIVE WINDOW HOTSPOT */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onTapObject('window');
                  }}
                  className="absolute top-[10%] right-[20%] w-20 h-20 rounded-2xl cursor-pointer hover:bg-amber-100/20 transition-all z-20 flex items-center justify-center group"
                  title="Tap Window ☀️"
                >
                  <span className="text-xs opacity-90 group-hover:opacity-100 transition-opacity bg-amber-100/90 text-amber-950 px-2 py-0.5 rounded-full font-bold shadow-md border border-amber-300 flex items-center gap-1">☀️ Sun</span>
                </div>

                {/* ANIMATED CARTOON BOTTLE SPRITE */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onTapObject('bottle');
                  }}
                  className="absolute bottom-[35%] left-[32%] z-30 transform hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title="Tap Buddy Bottle 💧"
                >
                  <CartoonBottleSprite
                    mood={screenState.bottleMood || bottleState}
                    waterLevel={scene.id >= 8 ? 100 : scene.id >= 4 ? 40 : 80}
                  />

                  {/* STORYBOOK SPEECH BUBBLE FOR BOTTLE */}
                  {speaker === 'BOTTLE' && currentSentence && (
                    <div className="absolute -top-24 -left-12 z-40 bg-[#fffdfa] text-slate-900 border-3 border-sky-400 p-3 rounded-2xl shadow-2xl w-52 animate-gentle-bounce font-serif">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-0.5 font-cinzel">💧 Buddy Bottle</span>
                      <p className="text-xs font-bold leading-snug text-slate-800 font-reading">"{currentSentence.text}"</p>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-sky-400" />
                    </div>
                  )}
                </div>

                {/* ANIMATED CARTOON AARAV SPRITE */}
                {shouldShowAarav() && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onTapObject('aarav');
                    }}
                    className="absolute bottom-8 left-[16%] z-30 transition-all duration-700 animate-gentle-bounce cursor-pointer hover:scale-105 active:scale-95"
                    title="Tap Aarav 👦"
                  >
                    <AaravSprite pose={getAaravPose()} />

                    {/* STORYBOOK SPEECH BUBBLE FOR AARAV */}
                    {speaker === 'AARAV' && currentSentence && (
                      <div className="absolute -top-24 -left-8 z-40 bg-[#fffdfa] text-slate-900 border-3 border-amber-500 p-3 rounded-2xl shadow-2xl w-52 animate-bounce font-serif">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5 font-cinzel">👦 Aarav</span>
                        <p className="text-xs font-bold leading-snug text-slate-800 font-reading">"{currentSentence.text}"</p>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-500" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* WATER REFILL STATION VIEW */
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-200 to-teal-100 flex items-center justify-center gap-4 md:gap-8 p-4">
                <div
                  onClick={() => onTapObject('tap')}
                  className={`cursor-pointer transition-all ${waterStationStep === 0 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
                    } flex flex-col items-center bg-white/95 p-3 md:p-5 rounded-3xl border-4 border-sky-300 shadow-xl`}
                >
                  <span className="text-5xl md:text-6xl">🚰</span>
                  <span className="text-xs font-black text-sky-900 mt-2 font-serif">1. Tap Water Tap</span>
                </div>

                <div
                  onClick={() => onTapObject('bottle')}
                  className={`cursor-pointer transition-all ${waterStationStep === 1 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
                    } flex flex-col items-center bg-white/95 p-3 md:p-5 rounded-3xl border-4 border-sky-300 shadow-xl`}
                >
                  <CartoonBottleSprite mood="refilled" waterLevel={waterStationStep >= 2 ? 100 : 40} />
                  <span className="text-xs font-black text-sky-900 mt-2 font-serif">2. Fill Bottle</span>
                </div>

                <div
                  onClick={() => onTapObject('cap')}
                  className={`cursor-pointer transition-all ${waterStationStep === 2 ? 'scale-110 ring-4 ring-sky-400 animate-pulse' : ''
                    } flex flex-col items-center bg-white/95 p-3 md:p-5 rounded-3xl border-4 border-sky-300 shadow-xl`}
                >
                  <span className="text-5xl md:text-6xl">🧢</span>
                  <span className="text-xs font-black text-sky-900 mt-2 font-serif">3. Close Cap</span>
                </div>
              </div>
            )}

            {/* CHALKBOARD DRAWING EASEL OVERLAY */}
            {scene.background !== 'water-station' && (
              <div className="absolute top-3 right-3 w-48 sm:w-56 h-20 sm:h-24 z-20">
                {!showChalkboardDrawer ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowChalkboardDrawer(true);
                    }}
                    className="w-full h-full cursor-pointer group flex items-start justify-end p-2"
                    title="Click to draw on Chalkboard!"
                  >
                    <span className="text-yellow-300 text-[11px] font-bold bg-emerald-950/90 px-3 py-1 rounded-full border border-yellow-400/70 shadow-lg group-hover:scale-105 transition-transform flex items-center gap-1.5">
                      ✏️ Draw on Board
                    </span>
                  </div>
                ) : (
                  <div className="relative -top-2 -right-2 z-40">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowChalkboardDrawer(false);
                      }}
                      className="absolute -top-3 -right-2 z-50 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold px-3 py-0.5 rounded-full text-xs border-2 border-amber-700 shadow-md"
                    >
                      Close ✖
                    </button>
                    <ChalkboardCanvas />
                  </div>
                )}
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
                <Sparkles className="w-16 h-16 text-yellow-400 animate-sparkle" />
                <Sparkles className="w-20 h-20 text-sky-400 animate-sparkle" />
                <Sparkles className="w-12 h-12 text-pink-400 animate-sparkle" />
              </div>
            )}

            {/* STORYTELLER ANIMATED SUBTITLE BANNER OVERLAY */}
            {currentSentence && (
              <div className="absolute bottom-2 inset-x-3 z-40 bg-sky-950/90 border-2 border-amber-300 p-2 md:p-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-2.5 animate-fade-in pointer-events-none font-['Fredoka',sans-serif]">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-base animate-bounce">
                    {speaker === 'BOTTLE' ? '💧' : speaker === 'AARAV' ? '👦' : '🎙️'}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-300 px-2 py-0.5 rounded-md border border-amber-400 shadow-2xs">
                    {speaker === 'BOTTLE' ? 'Buddy' : speaker === 'AARAV' ? 'Aarav' : 'Narrator'}
                  </span>
                </div>

                <p className="text-xs md:text-sm font-bold text-amber-100 leading-snug truncate flex-1 text-left drop-shadow-sm">
                  "{currentSentence.text}"
                </p>

                <div className="flex items-center gap-1 text-amber-300 text-[11px] shrink-0 font-black">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  <span className="hidden sm:inline">STORY MODE</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAGE NUMBER AT BOTTOM OUTER CORNER */}
        <div className="px-4 pb-1.5 pt-1 flex items-center justify-between text-[10px] md:text-[11px] font-['Fredoka',sans-serif] font-black text-amber-900/80 border-t border-amber-200/50">
          <span>❖ ILLUSTRATION PAGE</span>
          <span>PAGE {scene.id * 2 - 1}</span>
        </div>

      </div>
    </div>
  );
}
