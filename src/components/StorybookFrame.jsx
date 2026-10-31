import React, { useState } from 'react';
import { Sparkles, BookOpen, Maximize2, Minimize2, Footprints, Clock, Bookmark } from 'lucide-react';
import CartoonBottleSprite from './CartoonBottleSprite';
import AaravSprite from './AaravSprite';
import MiloTobySprite from './MiloTobySprite';
import LilyDollSprite from './LilyDollSprite';
import RockyRocketSprite from './RockyRocketSprite';
import BennyBearSprite from './BennyBearSprite';
import AaravAndBottleScene from './AaravAndBottleScene';
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
  activeObjectId = null,
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
  const specialObjects = {
    tap: { name: 'Water Tap', icon: '🚰' },
    cap: { name: 'Bottle Cap', icon: '🔵', visualType: 'cap' },
    clock: { name: 'Classroom Clock', icon: '⏰' },
    window: { name: 'Sunny Window', icon: '☀️' },
    aarav: { name: 'Aarav', icon: '👦' },
    unpacked_books: { name: 'Books', icon: '📚' },
    unpacked_pencil: { name: 'Pencil', icon: '✏️' },
    unpacked_lunchbox: { name: 'Lunchbox', icon: '🍱' },
    unpacked_apple: { name: 'Apple', icon: '🍎' }
  };
  const activeObject = scene.objects?.find(object => object.id === activeObjectId) || (activeStoryId === 'bottle-that-waited' ? specialObjects[activeObjectId] : null);
  const getObjectAnimation = (object) => {
    if (object?.animation === 'rocket' || object?.soundEffect === 'rocket') return 'animate-rocket';
    if (object?.animation === 'wiggle') return 'animate-wiggle';
    if (object?.soundEffect === 'sparkle') return 'animate-sparkle';
    return 'animate-gentle-bounce';
  };
  const bagContents = [
    { icon: '📚', label: 'Books', className: 'animate-float' },
    { icon: '✏️', label: 'Pencil', className: 'animate-wiggle' },
    { icon: '🍱', label: 'Lunchbox', className: 'animate-bounce' },
    { icon: '🍎', label: 'Apple', className: 'animate-float' }
  ];

  return (
    <div
      className={`relative w-full h-full min-h-0 transition-all duration-500 select-none ${isFullscreen
        ? 'fixed inset-0 z-50 bg-sky-950 flex items-center justify-center p-4'
        : 'flex flex-col justify-between'
        }`}
    >
      {/* PARCHMENT STORYBOOK LEFT PAGE */}
      <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">

        {/* STORYBOOK TOP HEADER & BOOKMARK */}
        <div className="absolute top-0 inset-x-0 z-40 px-3 md:px-4 pt-2.5 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-700 fill-amber-500 drop-shadow-sm" />
            <span className="bg-[#fff0bd]/95 text-[#1b2e50] font-['Fredoka',sans-serif] font-black px-3 py-1.5 rounded-full text-[10px] md:text-xs flex items-center gap-1.5 border border-[#f1c95a] shadow-md tracking-wide">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>CHAPTER {scene.id} • {scene.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="bg-[#132b4f]/90 hover:bg-[#1b3c6e] px-2 py-1 rounded-xl border border-white/40 text-white shadow-md transition-transform hover:scale-105 cursor-pointer text-[10px] font-black"
              title="Toggle Fullscreen Storybook"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* MAIN ILLUSTRATION CANVAS WITH GOLDEN EMBOSSED FRAME */}
        <div className="relative w-full h-full p-2.5 pt-10 pb-6 flex items-center justify-center">
          <div className="relative w-full h-full rounded-[12px] overflow-hidden border-2 border-[#d9b477] shadow-xl bg-slate-900">
            {activeObject && (
              <div className="absolute inset-x-0 bottom-8 z-50 flex justify-center pointer-events-none">
                {activeObjectId === 'bag' && activeStoryId === 'bottle-that-waited' ? (
                  <div className="flex items-end gap-3 rounded-3xl border-4 border-amber-300 bg-amber-50/95 px-4 py-3 shadow-2xl">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase text-white shadow-md">
                      Bag opened!
                    </div>
                    {bagContents.map((item) => (
                      <div key={item.label} className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-2 shadow-md">
                        <span className={`text-3xl ${item.className}`}>{item.icon}</span>
                        <span className="text-[10px] font-black text-amber-950">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 rounded-3xl border-4 border-amber-300 bg-white/95 px-5 py-3 shadow-2xl animate-gentle-bounce">
                    {activeObject.visualType === 'cap' && activeStoryId === 'bottle-that-waited' ? (
                      <span className={`relative inline-block h-12 w-24 rounded-lg border-4 border-blue-950 bg-blue-700 shadow-md ${getObjectAnimation(activeObject)}`}>
                        <span className="absolute inset-x-2 top-2 border-t-4 border-blue-300" />
                        <span className="absolute inset-x-2 bottom-2 border-b-4 border-blue-900" />
                      </span>
                    ) : (
                      <span className={`text-5xl ${getObjectAnimation(activeObject)}`}>{activeObject.icon}</span>
                    )}
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase text-amber-900">
                      {activeObject.name} is moving!
                    </span>
                  </div>
                )}
              </div>
            )}
            {activeStoryId === 'curious-rocket' ? (
              <div className="absolute inset-0 overflow-hidden select-none">
                {/* REALISTIC HIGH-DEFINITION SCENE BACKGROUND */}
                <div className="absolute inset-0">
                  <img
                    src={
                      scene.id === 1 ? '/assets/rocket_scene_1.jpg' :
                      scene.id === 2 ? '/assets/rocket_scene_2.jpg' :
                      scene.id === 3 ? '/assets/rocket_scene_3.jpg' :
                      '/assets/rocket_scene_4.jpg'
                    }
                    alt={scene.title || "The Little Rocket's Big Wish"}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-[1.02] contrast-[1.03]"
                  />
                  {/* Subtle Cinematic Starlight Vignette */}
                  <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-black/10 to-black/35 pointer-events-none" />
                </div>

                {/* SCENE 1 HOTSPOTS: Space Hill, Starlight Sky & Rocky */}
                {scene.id === 1 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('star'); }}
                      className="absolute top-[16%] left-[20%] z-20 cursor-pointer group"
                      title="Tap Friendly Stars ⭐"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-100/90 hover:bg-amber-100 px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        ⭐ Starlight Sky
                      </span>
                    </div>

                    {/* NATURAL ROCKY ROCKET INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rocky'); }}
                      className="absolute bottom-[22%] right-[22%] z-25 cursor-pointer group"
                      title="Tap Rocky Rocket 🚀"
                    >
                      <span className="text-xs font-black text-rose-950 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-rose-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🚀 Tap Rocky Rocket ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 2 HOTSPOTS: Smiling Moon, Ringed Planet & Rocky */}
                {scene.id === 2 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('moon'); }}
                      className="absolute bottom-[24%] right-[16%] z-20 cursor-pointer group"
                      title="Tap Crescent Moon 🌙"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3 py-1 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        🌙 Smiling Moon
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('planet'); }}
                      className="absolute top-[14%] right-[16%] z-20 cursor-pointer group"
                      title="Tap Ringed Planet 🪐"
                    >
                      <span className="text-xs font-black text-purple-950 bg-purple-200/95 hover:bg-purple-100 px-3 py-1 rounded-full shadow-xl border-2 border-purple-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        🪐 Ringed Planet
                      </span>
                    </div>

                    {/* NATURAL ROCKY ROCKET INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rocky'); }}
                      className="absolute top-[46%] left-[34%] z-25 cursor-pointer group"
                      title="Tap Rocky Rocket 🚀"
                    >
                      <span className="text-xs font-black text-rose-950 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-rose-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🚀 Zooming Rocky ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 3 HOTSPOTS: Starry Comet & Rocky */}
                {scene.id === 3 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('starry'); }}
                      className="absolute top-[44%] right-[22%] z-20 cursor-pointer group"
                      title="Tap Starry Comet ☄️"
                    >
                      <span className="text-xs font-black text-sky-950 bg-sky-200/95 hover:bg-sky-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-sky-400 flex items-center gap-1.5 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        ☄️ Starry Comet ✨
                      </span>
                    </div>

                    {/* NATURAL ROCKY ROCKET INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rocky'); }}
                      className="absolute top-[40%] left-[22%] z-25 cursor-pointer group"
                      title="Tap Rocky Rocket 🚀"
                    >
                      <span className="text-xs font-black text-rose-950 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-rose-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🚀 Tap Rocky Rocket ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 4 HOTSPOTS: Space Friends Victory */}
                {scene.id === 4 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rocky-star'); }}
                      className="absolute top-[18%] left-[32%] z-20 cursor-pointer group"
                      title="Tap Space Friends 🚀☄️"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        🚀 Best Space Friends 💛
                      </span>
                    </div>

                    {/* NATURAL ROCKY ROCKET INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rocky'); }}
                      className="absolute top-[42%] left-[44%] z-25 cursor-pointer group"
                      title="Tap Rocky Rocket 🚀"
                    >
                      <span className="text-xs font-black text-rose-950 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-rose-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🚀 Celebrating Rocky ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SPEECH BUBBLE FOR ROCKY */}
                {speaker === 'ROCKY' && currentSentence && (
                  <div className="absolute top-10 left-6 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-rose-500 p-3 rounded-2xl shadow-2xl w-64 animate-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 block mb-0.5">🚀 Rocky Rocket</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-rose-500" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'bear-lost-pencil' ? (
              <div className="absolute inset-0 overflow-hidden select-none">
                {/* REALISTIC HIGH-RESOLUTION STORYBOOK SCENE BACKGROUND */}
                <div className="absolute inset-0">
                  <img
                    src={
                      scene.id === 2 ? '/assets/bear_scene_2.jpg' :
                      scene.id === 3 ? '/assets/bear_scene_3.jpg' :
                      '/assets/bear_scene_1.jpg'
                    }
                    alt={scene.title || "Benny Bear & The Magic Pencil"}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-[1.02] contrast-[1.03]"
                  />
                  {/* Subtle Cinematic Fairytale Lighting & Warm Forest Vignette */}
                  <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-black/10 to-black/35 pointer-events-none" />
                </div>

                {/* SCENE 1 HOTSPOTS: Rainbow Easel, Oak Squirrel & Benny Bear */}
                {scene.id === 1 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('easel'); }}
                      className="absolute top-[24%] left-[16%] z-20 cursor-pointer group"
                      title="Tap Rainbow Easel 🎨"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🎨 Rainbow Easel ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('squirrel'); }}
                      className="absolute top-[14%] left-[10%] z-20 cursor-pointer group"
                      title="Tap Woodland Squirrel 🐿️"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-100/90 hover:bg-amber-100 px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        🐿️ Oak Squirrel
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('pencil'); }}
                      className="absolute bottom-[44%] right-[42%] z-25 cursor-pointer group"
                      title="Tap Golden Magic Pencil ✏️"
                    >
                      <span className="text-xs font-black text-yellow-950 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 px-3 py-1 rounded-full shadow-xl border-2 border-yellow-400 flex items-center gap-1 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        ✏️ Magic Pencil ✨
                      </span>
                    </div>

                    {/* NATURAL BENNY BEAR INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('benny'); }}
                      className="absolute bottom-[20%] right-[14%] z-25 cursor-pointer group"
                      title="Tap Benny Bear 🐻"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🐻 Tap Benny Bear ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 2 HOTSPOTS: Forest Library Sign, Crayons & Friends */}
                {scene.id === 2 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('sign'); }}
                      className="absolute top-[24%] left-[24%] z-20 cursor-pointer group"
                      title="Tap Forest Library Sign 🪵"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🪵 Forest Library Sign 📚
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('crayons'); }}
                      className="absolute bottom-[24%] left-[10%] z-20 cursor-pointer group"
                      title="Tap Crayons 🖍️"
                    >
                      <span className="text-xs font-black text-emerald-950 bg-emerald-100/95 hover:bg-emerald-100 px-3 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        🖍️ Crayons on Stump
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('friends'); }}
                      className="absolute bottom-[20%] left-[28%] z-20 cursor-pointer group"
                      title="Tap Penny & Oliver 🐿️🦉"
                    >
                      <span className="text-xs font-black text-purple-950 bg-purple-100/95 hover:bg-purple-100 px-3 py-1 rounded-full shadow-xl border border-purple-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        🐿️🦉 Penny & Oliver 💖
                      </span>
                    </div>

                    {/* NATURAL BENNY BEAR INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('benny'); }}
                      className="absolute bottom-[20%] right-[14%] z-25 cursor-pointer group"
                      title="Tap Benny Bear 🐻"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🐻 Tap Benny Bear ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 3 HOTSPOTS: Glowing Rainbow Bridge & Honey Berries */}
                {scene.id === 3 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('rainbow'); }}
                      className="absolute top-[14%] left-[32%] z-20 cursor-pointer group"
                      title="Tap Glowing Rainbow Bridge 🌈"
                    >
                      <span className="text-xs font-black text-purple-950 bg-gradient-to-r from-pink-200 via-amber-200 to-sky-200 px-4 py-1.5 rounded-full shadow-2xl border-2 border-purple-400 flex items-center gap-1.5 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        🌈 Glowing Rainbow Bridge ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('berries'); }}
                      className="absolute bottom-[20%] left-[46%] -translate-x-1/2 z-20 cursor-pointer group"
                      title="Tap Honey Berries 🍯🫐"
                    >
                      <span className="text-xs font-black text-rose-950 bg-rose-200/95 hover:bg-rose-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-rose-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🍯 Bowl of Honey Berries 🫐
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('friends'); }}
                      className="absolute bottom-[22%] left-[16%] z-20 cursor-pointer group"
                      title="Tap Forest Friends 🐿️🐰"
                    >
                      <span className="text-xs font-black text-teal-950 bg-teal-100/95 hover:bg-teal-100 px-3 py-1 rounded-full shadow-lg border border-teal-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        🐿️🐰 Celebrating Friends
                      </span>
                    </div>

                    {/* NATURAL BENNY BEAR INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('benny'); }}
                      className="absolute bottom-[20%] right-[14%] z-25 cursor-pointer group"
                      title="Tap Benny Bear 🐻"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🐻 Tap Benny Bear ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SPEECH BUBBLE FOR BENNY */}
                {speaker === 'BENNY' && currentSentence && (
                  <div className="absolute top-10 right-6 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-emerald-500 p-3 rounded-2xl shadow-2xl w-64 animate-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-0.5">🐻 Benny Bear</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 right-16 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-emerald-500" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'dolly-midnight-adventure' ? (
              <div className="absolute inset-0 overflow-hidden select-none">
                {/* REALISTIC HIGH-RESOLUTION STORYBOOK SCENE BACKGROUND WITH LILY INTEGRATED */}
                <div className="absolute inset-0">
                  <img
                    src={
                      scene.id === 2 ? '/assets/dolly_scene_2.jpg' :
                      scene.id === 3 ? '/assets/dolly_scene_3.jpg' :
                      scene.id === 4 ? '/assets/dolly_scene_4.jpg' :
                      scene.id === 5 ? '/assets/dolly_scene_5.jpg' :
                      scene.id === 6 ? '/assets/dolly_scene_6.jpg' :
                      '/assets/dolly_scene_1.jpg'
                    }
                    alt={scene.title || "Dolly's Midnight Adventure"}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-[1.02] contrast-[1.03]"
                  />
                  {/* Subtle Realistic Cinematic Lighting & Dust Motes Overlay */}
                  <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-black/10 to-black/35 pointer-events-none" />
                </div>

                {/* SCENE 1 HOTSPOTS: Moonlit Bed, Tiny Backpack & Lily */}
                {scene.id === 1 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('bed'); }}
                      className="absolute top-[32%] right-[12%] z-20 cursor-pointer group"
                      title="Tap Moonlit Bed 🛏️"
                    >
                      <span className="text-xs font-black text-amber-950 bg-amber-100/90 hover:bg-amber-100 px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        🛏️ Moonlit Bed
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('backpack'); }}
                      className="absolute bottom-[22%] left-[24%] z-20 cursor-pointer group"
                      title="Tap Adventure Backpack 🎒"
                    >
                      <span className="text-xs font-black text-purple-950 bg-purple-200/95 hover:bg-purple-100 px-3 py-1 rounded-full shadow-xl border-2 border-purple-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🎒 Adventure Backpack ✨
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[22%] left-[34%] z-25 cursor-pointer group"
                      title="Tap Lily the Doll 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Tap Lily Doll ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 2 HOTSPOTS: Golden Key, Glowing Fairy Door & Lily */}
                {scene.id === 2 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('door'); }}
                      className="absolute top-[42%] left-[28%] z-20 cursor-pointer group"
                      title="Tap Glowing Door 🚪"
                    >
                      <span className="text-[11px] font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3 py-1 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🚪 Fairy Door ✨
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('key'); }}
                      className="absolute bottom-[22%] right-[22%] z-20 cursor-pointer group"
                      title="Tap Golden Key 🗝️"
                    >
                      <span className="text-[11px] font-black text-yellow-950 bg-yellow-300/95 hover:bg-yellow-200 px-3 py-1 rounded-full shadow-xl border-2 border-yellow-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        🗝️ Golden Key ✨
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[22%] left-[16%] z-25 cursor-pointer group"
                      title="Tap Lily the Doll 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Tap Lily Doll ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 3 HOTSPOTS: Giant Teacup, Rescued Bunny & Lily */}
                {scene.id === 3 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('teacup'); }}
                      className="absolute top-[52%] right-[16%] z-20 cursor-pointer group"
                      title="Tap Teacup ☕"
                    >
                      <span className="text-[11px] font-black text-rose-950 bg-rose-100/90 hover:bg-rose-100 px-3 py-1 rounded-full shadow-lg border border-rose-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        ☕ Giant Teacup
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('bunny'); }}
                      className="absolute top-[35%] left-[45%] z-20 cursor-pointer group"
                      title="Tap Teacup Bunny 🐰"
                    >
                      <span className="text-[11px] font-black text-purple-950 bg-pink-200/95 hover:bg-pink-100 px-3 py-1 rounded-full shadow-xl border border-purple-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        🐰 Teacup Bunny
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[22%] left-[16%] z-25 cursor-pointer group"
                      title="Tap Lily the Doll 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Tap Lily Doll ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 4 HOTSPOTS: Toy Block Boat, Castle & Lily */}
                {scene.id === 4 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('boat'); }}
                      className="absolute bottom-[32%] left-[32%] z-20 cursor-pointer group"
                      title="Tap Toy Block Boat ⛵"
                    >
                      <span className="text-[11px] font-black text-sky-950 bg-sky-200/95 hover:bg-sky-100 px-3 py-1 rounded-full shadow-xl border-2 border-sky-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        ⛵ Block Boat
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('castle'); }}
                      className="absolute top-[28%] right-[22%] z-20 cursor-pointer group"
                      title="Tap Toy Castle 🏰"
                    >
                      <span className="text-[11px] font-black text-amber-950 bg-amber-100/90 hover:bg-amber-100 px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🏰 Toy Castle
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[38%] left-[28%] z-25 cursor-pointer group"
                      title="Tap Lily Sailing 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Lily Sailing ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 5 HOTSPOTS: Teddy Bear, Yo-Yo, Balloons & Lily */}
                {scene.id === 5 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('teddy'); }}
                      className="absolute bottom-[30%] left-[8%] z-20 cursor-pointer group"
                      title="Tap Teddy Bear 🧸"
                    >
                      <span className="text-[11px] font-black text-amber-950 bg-amber-100/95 hover:bg-amber-100 px-2.5 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        🧸 Teddy
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('yoyo'); }}
                      className="absolute bottom-[24%] left-[28%] z-20 cursor-pointer group"
                      title="Tap Yo-Yo 🪀"
                    >
                      <span className="text-[11px] font-black text-rose-950 bg-rose-100/95 hover:bg-rose-100 px-2.5 py-1 rounded-full shadow-lg border border-rose-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        🪀 Yo-Yo
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('balloon'); }}
                      className="absolute top-[16%] left-[32%] z-20 cursor-pointer group"
                      title="Tap Balloons 🎈"
                    >
                      <span className="text-[11px] font-black text-pink-950 bg-pink-100/95 hover:bg-pink-100 px-2.5 py-1 rounded-full shadow-lg border border-pink-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-float">
                        🎈 Balloons
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[22%] right-[36%] z-25 cursor-pointer group"
                      title="Tap Lily the Doll 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Tap Lily Doll ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENE 6 HOTSPOTS: Button Eyes, Morning Sun & Lily */}
                {scene.id === 6 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('sun'); }}
                      className="absolute top-[22%] left-[22%] z-20 cursor-pointer group"
                      title="Tap Morning Sun 🌅"
                    >
                      <span className="text-[11px] font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3 py-1 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        🌅 Morning Sun
                      </span>
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('eyes'); }}
                      className="absolute bottom-[24%] right-[24%] z-20 cursor-pointer group"
                      title="Tap Button Eyes 👀"
                    >
                      <span className="text-[11px] font-black text-purple-950 bg-purple-100/95 hover:bg-purple-100 px-3 py-1 rounded-full shadow-xl border border-purple-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-bounce">
                        ✨ Button Eyes Sparkle
                      </span>
                    </div>

                    {/* NATURAL LILY DOLL INTERACTIVE HOTSPOT */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lily'); }}
                      className="absolute bottom-[22%] left-[30%] z-25 cursor-pointer group"
                      title="Tap Lily the Doll 🎀"
                    >
                      <span className="text-xs font-black text-pink-950 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🎀 Tap Lily Doll ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SPEECH BUBBLE FOR LILY */}
                {speaker === 'LILY' && currentSentence && (
                  <div className="absolute top-10 left-6 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-pink-500 p-3 rounded-2xl shadow-2xl w-64 animate-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-800 block mb-0.5">🎀 Lily the Doll</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-pink-500" />
                  </div>
                )}

                {/* SPEECH BUBBLE FOR GIRL OR RABBIT */}
                {(speaker === 'GIRL' || speaker === 'RABBIT') && currentSentence && (
                  <div className="absolute top-10 right-6 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-purple-400 p-3 rounded-2xl shadow-2xl w-64 animate-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-0.5">
                      {speaker === 'GIRL' ? '👧 Little Girl' : '🐰 Teacup Rabbit'}
                    </span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-purple-400" />
                  </div>
                )}
              </div>
            ) : activeStoryId === 'secret-cave' ? (
              <div className="absolute inset-0 overflow-hidden select-none">
                {/* REALISTIC HIGH-DEFINITION SCENE BACKGROUND WITH MILO & TOBY INTEGRATED */}
                <div className="absolute inset-0">
                  <img
                    src={
                      scene.id >= 6
                        ? '/assets/cave_scene_3.jpg'
                        : scene.id >= 3
                        ? '/assets/cave_scene_2.jpg'
                        : '/assets/cave_scene_1.jpg'
                    }
                    alt={scene.title || "The Secret Cave"}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-[1.02] contrast-[1.03]"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-radial-[circle_at_50%_40%] from-transparent via-black/10 to-black/35 pointer-events-none" />
                </div>

                {/* SCENES 1 & 2: Sunny Forest Path & Golden Arrow */}
                {scene.id <= 2 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('tree'); }}
                      className="absolute top-[28%] right-[16%] z-20 cursor-pointer group"
                      title="Tap Giant Oak Tree 🌲"
                    >
                      <span className="text-xs font-black text-emerald-950 bg-emerald-100/90 hover:bg-emerald-100 px-3 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        🌲 Giant Oak
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('flowers'); }}
                      className="absolute bottom-[18%] left-[6%] z-20 cursor-pointer group"
                      title="Tap Wildflowers 🌸"
                    >
                      <span className="text-xs font-black text-rose-950 bg-rose-100/90 hover:bg-rose-100 px-3 py-1 rounded-full shadow-lg border border-rose-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110">
                        🌸 Bluebells
                      </span>
                    </div>

                    {/* Scene 2: Golden Arrow on Tree */}
                    {scene.id === 2 && (
                      <div
                        onClick={(e) => { e.stopPropagation(); onTapObject('arrow'); }}
                        className="absolute top-[42%] right-[22%] z-25 cursor-pointer group"
                        title="Tap Golden Arrow 🧭"
                      >
                        <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                          🧭 Golden Arrow ✨
                        </span>
                      </div>
                    )}

                    {/* NATURAL MILO & TOBY INTERACTIVE HOTSPOTS */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('milo'); }}
                      className="absolute bottom-[22%] left-[28%] z-25 cursor-pointer group"
                      title="Tap Milo the Fox 🦊"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🦊 Tap Milo ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('toby'); }}
                      className="absolute bottom-[22%] left-[44%] z-25 cursor-pointer group"
                      title="Tap Toby the Rabbit 🐰"
                    >
                      <span className="text-xs font-black text-sky-950 bg-sky-200/95 hover:bg-sky-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-sky-400 flex items-center gap-1.5 backdrop-blur-xs animate-gentle-bounce group-hover:scale-110">
                        🐰 Tap Toby ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENES 3, 4, 5: Steep Mountain Trail & Stone Rescue */}
                {scene.id >= 3 && scene.id <= 5 && (
                  <>
                    {/* Scene 3: Steep Forest Trail */}
                    {scene.id === 3 && (
                      <div
                        onClick={(e) => { e.stopPropagation(); onTapObject('hill'); }}
                        className="absolute top-[22%] right-[16%] z-20 cursor-pointer group"
                        title="Tap Steep Trail ⛰️"
                      >
                        <span className="text-xs font-black text-amber-950 bg-amber-100/95 hover:bg-amber-100 px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                          ⛰️ Steep Trail
                        </span>
                      </div>
                    )}

                    {/* Scene 4: Trapped Rocks */}
                    {scene.id >= 4 && (
                      <div
                        onClick={(e) => { e.stopPropagation(); onTapObject('rocks'); }}
                        className="absolute top-[18%] left-[28%] z-20 cursor-pointer group"
                        title="Tap Rocks 🪨"
                      >
                        <span className="text-xs font-black text-slate-900 bg-slate-200/95 hover:bg-slate-100 px-3 py-1 rounded-full shadow-lg border border-slate-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                          🪨 Heavy Rocks
                        </span>
                      </div>
                    )}

                    {/* Scene 5: Rescue Stick */}
                    {scene.id >= 4 && (
                      <div
                        onClick={(e) => { e.stopPropagation(); onTapObject('stick'); }}
                        className="absolute top-[40%] left-[45%] z-20 cursor-pointer group"
                        title="Tap Rescue Stick 🪵"
                      >
                        <span className="text-xs font-black text-amber-950 bg-amber-200/95 hover:bg-amber-100 px-3 py-1 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                          🪵 Strong Stick
                        </span>
                      </div>
                    )}

                    {/* NATURAL MILO & TOBY INTERACTIVE HOTSPOTS */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('milo'); }}
                      className="absolute bottom-[24%] left-[46%] z-25 cursor-pointer group"
                      title="Tap Milo the Fox 🦊"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🦊 Milo Rescuing ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('toby'); }}
                      className="absolute bottom-[22%] right-[22%] z-25 cursor-pointer group"
                      title="Tap Toby the Rabbit 🐰"
                    >
                      <span className="text-xs font-black text-sky-950 bg-sky-200/95 hover:bg-sky-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-sky-400 flex items-center gap-1.5 backdrop-blur-xs animate-gentle-bounce group-hover:scale-110">
                        🐰 Toby Rescued ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SCENES 6 & 7: Glowing Crystal Cave & Subterranean Discovery */}
                {scene.id >= 6 && (
                  <>
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('crystals'); }}
                      className="absolute top-[32%] right-[16%] z-20 cursor-pointer group"
                      title="Tap Glowing Crystals 💎"
                    >
                      <span className="text-xs font-black text-purple-950 bg-purple-200/95 hover:bg-purple-100 px-3.5 py-1 rounded-full shadow-xl border-2 border-purple-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-pulse">
                        💎 Amethyst Crystals ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('lake'); }}
                      className="absolute top-[54%] left-[54%] z-20 cursor-pointer group"
                      title="Tap Secret Cave Archway 🌊"
                    >
                      <span className="text-xs font-black text-cyan-950 bg-cyan-200/95 hover:bg-cyan-100 px-3.5 py-1 rounded-full shadow-xl border-2 border-cyan-400 flex items-center gap-1 backdrop-blur-xs transition-transform group-hover:scale-110 animate-gentle-bounce">
                        ✨ Cave Archway
                      </span>
                    </div>

                    {/* NATURAL MILO & TOBY INTERACTIVE HOTSPOTS */}
                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('milo'); }}
                      className="absolute bottom-[22%] left-[38%] z-25 cursor-pointer group"
                      title="Tap Milo the Fox 🦊"
                    >
                      <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-amber-400 flex items-center gap-1.5 backdrop-blur-xs animate-bounce group-hover:scale-110">
                        🦊 Tap Milo ✨
                      </span>
                    </div>

                    <div
                      onClick={(e) => { e.stopPropagation(); onTapObject('toby'); }}
                      className="absolute bottom-[22%] right-[28%] z-25 cursor-pointer group"
                      title="Tap Toby the Rabbit 🐰"
                    >
                      <span className="text-xs font-black text-sky-950 bg-sky-200/95 hover:bg-sky-100 px-3.5 py-1.5 rounded-full shadow-xl border-2 border-sky-400 flex items-center gap-1.5 backdrop-blur-xs animate-gentle-bounce group-hover:scale-110">
                        🐰 Tap Toby ✨
                      </span>
                    </div>
                  </>
                )}

                {/* SPEECH BUBBLE FOR MILO */}
                {speaker === 'MILO' && currentSentence && (
                  <div className="absolute top-10 left-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-amber-500 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">🦊 Milo the Fox</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-500" />
                  </div>
                )}

                {/* SPEECH BUBBLE FOR TOBY */}
                {speaker === 'TOBY' && currentSentence && (
                  <div className="absolute top-10 right-6 z-40 bg-[#fffdfa] text-slate-900 border-3 border-sky-400 p-3 rounded-2xl shadow-2xl w-60 animate-bounce font-['Fredoka',sans-serif]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-0.5">🐰 Toby the Rabbit</span>
                    <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
                    <div className="absolute -bottom-3 right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-sky-400" />
                  </div>
                )}
              </div>
            ) : scene.background !== 'water-station' ? (
              <AaravAndBottleScene
                scene={scene}
                currentSentence={currentSentence}
                bottleState={bottleState}
                waterLevel={scene.id >= 8 ? 100 : scene.id >= 4 ? 40 : 80}
                speaker={speaker}
                onTapObject={onTapObject}
                getLightingStyles={getLightingStyles}
                getCameraTransform={getCameraTransform}
              />
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
                  <span className="relative inline-block h-10 w-20 rounded-lg border-4 border-blue-950 bg-blue-700 shadow-md">
                    <span className="absolute inset-x-1 top-2 border-t-2 border-blue-300" />
                    <span className="absolute inset-x-1 bottom-2 border-b-2 border-blue-900" />
                  </span>
                  <span className="text-xs font-black text-sky-900 mt-2 font-serif">3. Close Cap</span>
                </div>
              </div>
            )}

            {/* CHALKBOARD DRAWING EASEL OVERLAY (Classroom story only) */}
            {activeStoryId === 'bottle-that-waited' && scene.background !== 'water-station' && (
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
                    <span className="text-white text-[10px] font-black bg-[#162b46]/95 px-3 py-1.5 rounded-full border border-white/30 shadow-lg group-hover:scale-105 transition-transform flex items-center gap-1.5">
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
              <div className="absolute bottom-2 inset-x-3 z-40 bg-white/95 border-2 border-[#e6d7bd] p-2 md:p-2.5 rounded-[18px] shadow-2xl backdrop-blur-md flex items-center justify-between gap-2.5 animate-fade-in pointer-events-none font-['Fredoka',sans-serif]">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-base animate-bounce">
                    {speaker === 'BOTTLE' ? '💧'
                      : speaker === 'AARAV' ? '👦'
                      : speaker === 'LILY' ? '🎀'
                      : speaker === 'GIRL' ? '👧'
                      : speaker === 'RABBIT' ? '🐰'
                      : speaker === 'MILO' ? '🦊'
                      : speaker === 'TOBY' ? '🐰'
                      : speaker === 'ROCKY' ? '🚀'
                      : speaker === 'COMET' ? '☄️'
                      : speaker === 'BENNY' ? '🐻'
                      : '📖'}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#172d50] bg-[#ffd84d] px-2 py-0.5 rounded-md border border-[#efbd24] shadow-2xs">
                    {speaker === 'BOTTLE' ? 'Buddy'
                      : speaker === 'AARAV' ? 'Aarav'
                      : speaker === 'LILY' ? 'Lily Doll'
                      : speaker === 'GIRL' ? 'Little Girl'
                      : speaker === 'RABBIT' ? 'Teacup Rabbit'
                      : speaker === 'MILO' ? 'Milo'
                      : speaker === 'TOBY' ? 'Toby'
                      : speaker === 'ROCKY' ? 'Rocky'
                      : speaker === 'COMET' ? 'Starry'
                      : speaker === 'BENNY' ? 'Benny Bear'
                      : 'Narrator'}
                  </span>
                </div>

                <p className="text-xs md:text-sm font-bold text-[#395272] leading-snug truncate flex-1 text-left">
                  "{currentSentence.text}"
                </p>

                <div className="flex items-center gap-1 text-[#1b2e50] bg-[#ffd84d] px-2 py-1 rounded-xl text-[10px] shrink-0 font-black">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">STORY MODE</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAGE NUMBER AT BOTTOM OUTER CORNER */}
        <div className="px-4 pb-1.5 pt-1 flex items-center justify-between text-[10px] md:text-[11px] font-['Fredoka',sans-serif] font-black text-[#704323]/80 border-t border-[#e8c77b]/50">
          <span>❖ ILLUSTRATION PAGE</span>
          <span>PAGE {scene.id * 2 - 1}</span>
        </div>

      </div>
    </div>
  );
}
