import React from 'react';
import { Sparkles, Heart, Droplets, Sun, Moon } from 'lucide-react';

export default function AaravAndBottleScene({
  scene,
  currentSentence,
  bottleState = 'happy',
  waterLevel = 80,
  speaker = 'NARRATOR',
  onTapObject = () => { },
  getLightingStyles = () => '',
  getCameraTransform = () => ''
}) {
  // Determine current emotional feeling of the bottle
  const feeling = currentSentence?.screenState?.bottleMood || bottleState || 'happy';

  // Aarav is standing by the desk in:
  // Chapter 1 (Meet Buddy), Chapter 2 (packing up), Chapter 8 (Reunion!), Chapter 9 (Packing safely), Chapter 10 (Celebration)
  const isAaravPresent = scene.id === 1 || scene.id === 2 || scene.id >= 8;

  // Real-time Facial Expression Configuration for Buddy the Bottle
  const getBottleFace = () => {
    switch (feeling) {
      case 'excited':
      case 'refilled':
        return {
          title: 'Super Excited & Full of Energy!',
          badgeIcon: '🚀',
          badgeText: 'Excited! 🚀',
          badgeColor: 'bg-amber-300/95 text-amber-950 border-amber-400 shadow-amber-300/40',
          leftEye: (
            <path d="M 36 44 Q 43 36 50 44" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          ),
          rightEye: (
            <path d="M 62 44 Q 69 36 76 44" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          ),
          mouth: (
            <g>
              <path d="M 46 52 Q 56 64 66 52 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
              <path d="M 50 58 Q 56 62 62 58" stroke="#fca5a5" strokeWidth="1.5" fill="none" />
            </g>
          ),
          blush: true,
          sparkles: true,
          waterWaveY: 46
        };

      case 'anxious':
      case 'confused':
      case 'left_behind':
        return {
          title: 'A Bit Worried & Waiting',
          badgeIcon: '🥺',
          badgeText: 'Anxious 🥺',
          badgeColor: 'bg-amber-200/95 text-amber-950 border-amber-300 shadow-amber-200/30',
          leftEye: (
            <g>
              <ellipse cx="44" cy="46" rx="4.8" ry="5.8" fill="#0f172a" />
              <circle cx="45.5" cy="44" r="1.8" fill="#ffffff" />
              <path d="M 37 38 Q 44 42 49 40" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ),
          rightEye: (
            <g>
              <ellipse cx="68" cy="47" rx="3.8" ry="4.8" fill="#0f172a" />
              <circle cx="69.5" cy="45" r="1.4" fill="#ffffff" />
              <path d="M 63 40 Q 68 42 75 38" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ),
          mouth: (
            <path d="M 48 57 Q 52 54 56 57 Q 60 60 64 56" stroke="#0f172a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          ),
          blush: false,
          sparkles: false,
          waterWaveY: 60
        };

      case 'lonely':
      case 'sad':
        return {
          title: 'Feeling Lonely in the Quiet Room',
          badgeIcon: '💧',
          badgeText: 'Lonely 💧',
          badgeColor: 'bg-sky-200/95 text-sky-950 border-sky-300 shadow-sky-200/30',
          leftEye: (
            <g>
              <ellipse cx="44" cy="48" rx="4.2" ry="5.2" fill="#0f172a" />
              <circle cx="45" cy="46" r="1.6" fill="#ffffff" />
              <path d="M 37 42 Q 44 45 49 46" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ),
          rightEye: (
            <g>
              <ellipse cx="68" cy="48" rx="4.2" ry="5.2" fill="#0f172a" />
              <circle cx="69" cy="46" r="1.6" fill="#ffffff" />
              <path d="M 63 46 Q 68 45 75 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 70 52 C 73 57 73 61 70 63 C 67 61 67 57 70 52 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" className="animate-bounce" />
            </g>
          ),
          mouth: (
            <path d="M 47 60 Q 56 53 65 60" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ),
          blush: false,
          sparkles: false,
          waterWaveY: 68
        };

      case 'sleepy':
      case 'quiet':
        return {
          title: 'Peacefully Resting Under Night Sky',
          badgeIcon: '💤',
          badgeText: 'Resting 💤',
          badgeColor: 'bg-indigo-200/90 text-indigo-950 border-indigo-300 shadow-indigo-200/30',
          leftEye: (
            <path d="M 39 48 Q 44 54 49 48" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ),
          rightEye: (
            <path d="M 63 48 Q 68 54 73 48" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ),
          mouth: (
            <path d="M 52 57 Q 56 60 60 57" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          ),
          blush: true,
          sparkles: false,
          sleepZzz: true,
          waterWaveY: 65
        };

      case 'hopeful':
      case 'listening':
        return {
          title: 'Hopeful & Watching the Door',
          badgeIcon: '⭐',
          badgeText: 'Hopeful! ⭐',
          badgeColor: 'bg-yellow-200/90 text-yellow-950 border-yellow-300 shadow-yellow-200/30',
          leftEye: (
            <g>
              <ellipse cx="44" cy="45" rx="4.8" ry="5.8" fill="#0f172a" />
              <circle cx="46" cy="43" r="2" fill="#ffffff" />
              <path d="M 38 38 Q 44 35 49 38" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ),
          rightEye: (
            <g>
              <ellipse cx="68" cy="45" rx="4.8" ry="5.8" fill="#0f172a" />
              <circle cx="70" cy="43" r="2" fill="#ffffff" />
              <path d="M 63 38 Q 68 35 74 37" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ),
          mouth: (
            <path d="M 47 55 Q 56 63 65 55" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ),
          blush: true,
          sparkles: true,
          waterWaveY: 54
        };

      default: // Happy
        return {
          title: 'Happy & Hydrated!',
          badgeIcon: '💧',
          badgeText: 'Happy! 💧',
          badgeColor: 'bg-sky-200/90 text-sky-950 border-sky-300 shadow-sky-200/30',
          leftEye: (
            <g>
              <ellipse cx="44" cy="46" rx="4.5" ry="5.2" fill="#0f172a" />
              <circle cx="46" cy="44" r="1.8" fill="#ffffff" />
              <path d="M 38 39 Q 44 37 49 40" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ),
          rightEye: (
            <g>
              <ellipse cx="68" cy="46" rx="4.5" ry="5.2" fill="#0f172a" />
              <circle cx="70" cy="44" r="1.8" fill="#ffffff" />
              <path d="M 63 40 Q 68 37 74 39" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          ),
          mouth: (
            <path d="M 46 54 Q 56 63 66 54" stroke="#0f172a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          ),
          blush: true,
          sparkles: false,
          waterWaveY: 52
        };
    }
  };

  const face = getBottleFace();

  return (
    <div className={`absolute inset-0 overflow-hidden select-none transition-transform duration-700 ease-out origin-center ${getCameraTransform()}`}>
      {/* ========================================================================= */}
      {/* 1. REALISTIC 3D CLEAN CLASSROOM BACKGROUND                                */}
      {/* ========================================================================= */}
      <img
        src="/aarav_empty_desk_classroom_bg.jpg"
        alt="Classroom Setting"
        className={`w-full h-full object-cover object-center transition-all duration-700 ${getLightingStyles()}`}
      />

      {/* AMBIENT LIGHTING OVERLAYS MATCHING TIME OF DAY */}
      {currentSentence?.screenState?.lighting === 'spotlight' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_58%,transparent_22%,rgba(120,53,15,0.75)_80%)] pointer-events-none animate-pulse" />
      )}
      {(currentSentence?.screenState?.lighting === 'dusk' || currentSentence?.screenState?.lighting === 'twilight') && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-indigo-950/40 to-amber-900/40 pointer-events-none" />
      )}
      {currentSentence?.screenState?.lighting === 'door_open' && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/35 via-yellow-100/15 to-transparent pointer-events-none animate-pulse" />
      )}

      {/* SUBTLE INTERACTIVE HOTSPOT INDICATORS */}
      {/* Arched Window (left) */}
      <div
        onClick={(e) => { e.stopPropagation(); onTapObject('window'); }}
        className="absolute top-[22%] left-[12%] z-20 cursor-pointer group"
        title="Tap Sunny Window ☀️"
      >
        <div className="w-6 h-6 rounded-full bg-amber-400/60 border border-white/80 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs">☀️</span>
        </div>
      </div>

      {/* Wall Clock (top right) */}
      <div
        onClick={(e) => { e.stopPropagation(); onTapObject('clock'); }}
        className="absolute top-[6%] right-[2%] z-20 cursor-pointer group"
        title="Tap Clock ⏰"
      >
        <div className="w-6 h-6 rounded-full bg-amber-400/60 border border-white/80 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs">⏰</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. AARAV STANDING NATURALLY BESIDE HIS CLASSROOM DESK                     */}
      {/*    Standing tall with feet on floor, hand resting on the wooden table     */}
      {/* ========================================================================= */}
      {isAaravPresent && (
        <div
          onClick={(e) => { e.stopPropagation(); onTapObject('aarav'); }}
          className="absolute top-[22%] left-[62%] md:left-[64%] z-24 cursor-pointer group transition-all duration-700 flex flex-col items-center"
          style={{ width: '19%', minWidth: '160px', maxWidth: '240px', height: '68%' }}
          title="Tap Aarav 👦"
        >
          {/* Subtle Aarav Hover Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-amber-100/95 text-amber-950 font-black text-[10px] px-2.5 py-0.5 rounded-full border border-amber-300 shadow-md mb-1">
            👦 Aarav
          </div>

          {/* Full-Body Standing Boy Character */}
          <div className="relative w-full h-full filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 active:scale-95">
            <svg viewBox="0 0 160 330" className="w-full h-full overflow-visible" fill="none">
              <defs>
                {/* 3D Skin Gradient: Warm sunlight from window on left, gentle room shadow on right */}
                <linearGradient id="aaravSkin3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.4" />
                  <stop offset="20%" stopColor="#fed7aa" />
                  <stop offset="70%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.85" />
                </linearGradient>

                {/* 3D Sculpted Boy Hair with Warm Sunlit Clumps */}
                <linearGradient id="aaravHair3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#92400e" />
                  <stop offset="25%" stopColor="#5b2808" />
                  <stop offset="75%" stopColor="#29180f" />
                  <stop offset="100%" stopColor="#140a05" />
                </linearGradient>

                {/* School Uniform Polo: Cobalt Blue with Realistic Fabric Shading */}
                <linearGradient id="aaravPolo3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="25%" stopColor="#0284c7" />
                  <stop offset="75%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#075985" />
                </linearGradient>

                {/* Navy Blue School Shorts */}
                <linearGradient id="aaravShorts3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Floor Contact Shadow under Shoes */}
              <ellipse cx="80" cy="318" rx="48" ry="7" fill="rgba(69, 26, 3, 0.45)" />

              {/* Purple Backpack on Back */}
              <rect x="22" y="85" width="22" height="75" rx="8" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2.5" />
              <rect x="116" y="85" width="22" height="75" rx="8" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2.5" />

              {/* Legs & School Shorts */}
              {/* Left Leg */}
              <rect x="48" y="210" width="24" height="68" rx="8" fill="url(#aaravSkin3D)" stroke="#ea580c" strokeWidth="1.5" />
              {/* Right Leg */}
              <rect x="88" y="210" width="24" height="68" rx="8" fill="url(#aaravSkin3D)" stroke="#ea580c" strokeWidth="1.5" />

              {/* White School Socks */}
              <rect x="48" y="260" width="24" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="88" y="260" width="24" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

              {/* Red Sneakers with White Soles */}
              {/* Left Shoe */}
              <path d="M 40 278 L 76 278 L 76 298 C 76 304 40 304 40 298 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
              <rect x="40" y="295" width="36" height="5" fill="#ffffff" rx="2" />
              <line x1="50" y1="284" x2="66" y2="284" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="52" y1="289" x2="64" y2="289" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

              {/* Right Shoe */}
              <path d="M 84 278 L 120 278 L 120 298 C 120 304 84 304 84 298 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
              <rect x="84" y="295" width="36" height="5" fill="#ffffff" rx="2" />
              <line x1="94" y1="284" x2="110" y2="284" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="96" y1="289" x2="108" y2="289" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

              {/* Navy School Shorts */}
              <path
                d="M 42 165 L 118 165 L 122 216 L 86 216 L 80 185 L 74 216 L 38 216 Z"
                fill="url(#aaravShorts3D)"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <line x1="80" y1="165" x2="80" y2="185" stroke="#334155" strokeWidth="1.5" />

              {/* Torso / School Polo Shirt */}
              <path
                d="M 40 92 C 50 82 110 82 120 92 L 122 170 C 122 173 38 173 38 170 Z"
                fill="url(#aaravPolo3D)"
                stroke="#0369a1"
                strokeWidth="2.5"
              />

              {/* Polo Collar with Golden Edge */}
              <polygon points="58,86 80,108 70,108" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              <polygon points="102,86 80,108 90,108" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              <rect x="76" y="106" width="8" height="24" rx="2" fill="#0284c7" />
              <circle cx="80" cy="112" r="1.5" fill="#ffffff" />
              <circle cx="80" cy="122" r="1.5" fill="#ffffff" />

              {/* Pocket Rocket Emblem */}
              <rect x="96" y="118" width="16" height="18" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <path d="M 104 120 L 107 127 L 101 127 Z" fill="#ef4444" />

              {/* Right Arm (hanging relaxed at side) */}
              <path
                d="M 116 96 Q 134 135 128 170"
                stroke="url(#aaravSkin3D)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <circle cx="127" cy="172" r="8" fill="url(#aaravSkin3D)" />

              {/* Left Arm (Reaching forward onto the wooden table right next to Buddy!) */}
              <path
                d="M 44 96 Q 22 135 14 172"
                stroke="url(#aaravSkin3D)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <circle cx="14" cy="174" r="8" fill="url(#aaravSkin3D)" />
              {/* Hand resting flat on desk */}
              <ellipse cx="14" cy="176" rx="6" ry="4" fill="#fdba74" />
              <ellipse cx="9" cy="177" rx="4" ry="2.5" fill="#fdba74" />

              {/* Neck */}
              <rect x="70" y="72" width="20" height="20" rx="3" fill="url(#aaravSkin3D)" />
              <path d="M 70 78 Q 80 84 90 78" fill="#ea580c" opacity="0.2" />

              {/* 3D Head */}
              <ellipse cx="80" cy="48" rx="32" ry="34" fill="url(#aaravSkin3D)" stroke="#ea580c" strokeWidth="2" />

              {/* Ears */}
              <ellipse cx="46" cy="51" rx="6" ry="9" fill="url(#aaravSkin3D)" stroke="#f97316" strokeWidth="1.5" />
              <ellipse cx="114" cy="51" rx="6" ry="9" fill="url(#aaravSkin3D)" stroke="#f97316" strokeWidth="1.5" />

              {/* 3D Wavy Hair with Highlights */}
              <path
                d="M 45 47 C 42 16 68 10 80 10 C 96 10 118 16 115 47 C 113 36 105 28 94 28 C 88 28 82 32 74 28 C 64 28 53 36 45 47 Z"
                fill="url(#aaravHair3D)"
              />
              <path d="M 52 30 Q 64 38 70 28 Q 80 38 90 28 Q 100 36 108 30" fill="url(#aaravHair3D)" />
              <path d="M 58 18 Q 72 14 88 17" stroke="#a16207" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />

              {/* 3D Expressive Hazel Eyes */}
              <g>
                <ellipse cx="67" cy="48" rx="5" ry="6" fill="#0f172a" />
                <circle cx="69" cy="45.5" r="2" fill="#ffffff" />
                <circle cx="66" cy="50" r="0.9" fill="#ffffff" />

                <ellipse cx="93" cy="48" rx="5" ry="6" fill="#0f172a" />
                <circle cx="95" cy="45.5" r="2" fill="#ffffff" />
                <circle cx="92" cy="50" r="0.9" fill="#ffffff" />
              </g>

              {/* Eyebrows */}
              <path d="M 60 40 Q 67 36 74 40" stroke="#451a03" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M 86 40 Q 93 36 100 40" stroke="#451a03" strokeWidth="2.2" fill="none" strokeLinecap="round" />

              {/* Nose */}
              <path d="M 80 49 Q 82 55 78 56" stroke="#c2410c" strokeWidth="1.6" fill="none" strokeLinecap="round" />

              {/* Warm Gentle Smile */}
              <path d="M 69 63 Q 80 73 91 63" stroke="#991b1b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 72 64 Q 80 69 88 64" stroke="#fca5a5" strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* Rosy Cheeks */}
              <circle cx="59" cy="57" r="5.5" fill="#f43f5e" opacity="0.35" />
              <circle cx="101" cy="57" r="5.5" fill="#f43f5e" opacity="0.35" />
            </svg>
          </div>

          {/* Aarav Speech Bubble */}
          {speaker === 'AARAV' && currentSentence && (
            <div className="absolute -top-16 -left-12 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-amber-500 p-2.5 rounded-2xl shadow-2xl w-52 animate-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">👦 Aarav</span>
              <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-500" />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. REALISTIC DESK ACCESSORIES (SPIRAL NOTEBOOK ON THE WOODEN TABLE)       */}
      {/* ========================================================================= */}
      <div className="absolute top-[58%] left-[45%] md:left-[47%] z-23 pointer-events-none transform -rotate-3 scale-75 md:scale-90 opacity-90 filter drop-shadow-sm">
        <svg width="70" height="45" viewBox="0 0 70 45" fill="none">
          <rect x="4" y="3" width="62" height="38" rx="3" fill="#fefce8" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="7" cy="8" r="2" fill="#64748b" />
          <circle cx="7" cy="15" r="2" fill="#64748b" />
          <circle cx="7" cy="22" r="2" fill="#64748b" />
          <circle cx="7" cy="29" r="2" fill="#64748b" />
          <circle cx="7" cy="36" r="2" fill="#64748b" />
          <path d="M 24 12 L 32 24 L 16 24 Z" fill="#f87171" opacity="0.8" />
          <polygon points="20,24 24,29 28,24" fill="#fbbf24" />
          <path d="M 38 16 Q 46 11 54 16" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 38 23 Q 46 18 54 23" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 4. BUDDY THE WATER BOTTLE (ON THE TABLE AT REAL-LIFE REALISTIC SCALE)     */}
      {/*    Sitting on the sunny wooden desk right beside Aarav's hand             */}
      {/* ========================================================================= */}
      <div
        onClick={(e) => { e.stopPropagation(); onTapObject('bottle'); }}
        className={`absolute top-[22%] md:top-[41%] ${isAaravPresent ? 'left-[38%] md:left-[32%]' : 'left-[36%] -translate-x-1/2'} z-26 cursor-pointer group flex flex-col items-center transition-all duration-700`}
        style={{ width: '7%', minWidth: '58px', maxWidth: '85px' }}
        title={`Buddy the Water Bottle • ${face.title}`}
      >
        {/* Soft Ambient Contact Shadow on Wooden Tabletop */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-amber-950/70 rounded-full blur-[2.5px] group-hover:scale-110 transition-transform" />
        <div className="absolute -bottom-1 left-2 w-6 h-2 bg-sky-400/30 rounded-full blur-[4px] pointer-events-none" />

        {/* Compact Real-Time Feeling Pill Badge */}
        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black shadow-md border flex items-center gap-1 backdrop-blur-xs mb-1 animate-pulse transition-all duration-500 whitespace-nowrap ${face.badgeColor}`}>
          <span>{face.badgeText}</span>
        </div>

        {/* Small-Scale Translucent Water Bottle Container on Table */}
        <div className="relative w-full aspect-[1/2] transition-transform group-hover:scale-110 active:scale-95 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]">
          <svg viewBox="0 0 100 190" className="w-full h-full overflow-visible" fill="none">
            <defs>
              {/* Outer Translucent Bottle Wall with Sunlight Rim from Left Window */}
              <linearGradient id="realisticBottle3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#0284c7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
              </linearGradient>

              {/* Water Liquid Gradient */}
              <linearGradient id="realisticWater3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
              </linearGradient>

              <clipPath id="realisticClip3D">
                <rect x="18" y="32" width="64" height="142" rx="16" />
              </clipPath>
            </defs>

            {/* Carry Loop Handle */}
            <path
              d="M 68 18 C 82 18 84 32 68 32"
              stroke="#1e3a8a"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Navy Blue Twist Cap with Grip Grooves */}
            <rect x="32" y="16" width="36" height="16" rx="4" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.8" />
            <rect x="42" y="10" width="16" height="8" rx="3" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.8" />
            <line x1="40" y1="20" x2="40" y2="28" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="50" y1="20" x2="50" y2="28" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="60" y1="20" x2="60" y2="28" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />

            {/* Translucent Bottle Body Shell */}
            <rect
              x="16"
              y="30"
              width="68"
              height="146"
              rx="18"
              fill="url(#realisticBottle3D)"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Inner Water Liquid with Dynamic Wave Surface */}
            <g clipPath="url(#realisticClip3D)">
              <rect
                x="16"
                y={face.waterWaveY}
                width="68"
                height="150"
                fill="url(#realisticWater3D)"
                className="transition-all duration-700"
              />
              {/* Gentle Water Wave Crest */}
              <path
                d={`M 16 ${face.waterWaveY} Q 32 ${face.waterWaveY - 3} 50 ${face.waterWaveY} T 84 ${face.waterWaveY} L 84 190 L 16 190 Z`}
                fill="#7dd3fc"
                opacity="0.75"
                className="animate-pulse"
              />
              {/* Effervescent Hydration Bubbles */}
              <circle cx="32" cy={face.waterWaveY + 28} r="2.2" fill="#ffffff" opacity="0.65" className="animate-ping" />
              <circle cx="68" cy={face.waterWaveY + 45} r="2.5" fill="#ffffff" opacity="0.5" />
              <circle cx="48" cy={face.waterWaveY + 68} r="1.8" fill="#ffffff" opacity="0.75" />
            </g>

            {/* Specular Window Highlight on Left Edge */}
            <path
              d="M 22 36 L 22 166"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Subtle Right Rim Light */}
            <path
              d="M 78 36 L 78 166"
              stroke="#bae6fd"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* ============================================================= */}
            {/* REAL-TIME DYNAMIC BOTTLE FACE (CHANGES ACCORDING TO FEELING!) */}
            {/* ============================================================= */}
            <g className="transition-all duration-500">
              {face.leftEye}
              {face.rightEye}
              {face.mouth}

              {/* Rosy Cheeks when Happy / Excited / Reunited */}
              {face.blush && (
                <>
                  <circle cx="33" cy="52" r="3.5" fill="#f43f5e" opacity="0.45" />
                  <circle cx="73" cy="52" r="3.5" fill="#f43f5e" opacity="0.45" />
                </>
              )}

              {/* Floating Sparkles when Excited or Hopeful */}
              {face.sparkles && (
                <g fill="#fde047" className="animate-spin origin-center">
                  <polygon points="53,26 55,31 60,32 55,34 53,39 51,34 46,32 51,31" />
                </g>
              )}

              {/* Peaceful Floating Zzz when Sleeping */}
              {face.sleepZzz && (
                <g fill="#c7d2fe" className="animate-bounce">
                  <text x="76" y="32" fontSize="9" fontWeight="900" fontFamily="sans-serif">z</text>
                  <text x="83" y="24" fontSize="11" fontWeight="900" fontFamily="sans-serif">Z</text>
                </g>
              )}
            </g>

            {/* ============================================================= */}
            {/* ICONIC ROCKET STICKER (ON LOWER BOTTLE BODY)                  */}
            {/* ============================================================= */}
            <g transform="translate(30, 96) scale(0.8)">
              <rect x="0" y="0" width="50" height="42" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.8" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />
              <path d="M 25 4 L 33 22 L 17 22 Z" fill="#ef4444" />
              <polygon points="17,20 10,28 17,26" fill="#f59e0b" />
              <polygon points="33,20 40,28 33,26" fill="#f59e0b" />
              <circle cx="25" cy="14" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              <polygon points="21,22 25,32 29,22" fill="#fbbf24" />
              <polygon points="23,22 25,28 27,22" fill="#ef4444" />
              <text x="25" y="38" fontSize="7.5" fontWeight="900" fill="#1e3a8a" textAnchor="middle" fontFamily="sans-serif">
                BOOM!
              </text>
            </g>
          </svg>
        </div>

        {/* Storybook Speech Bubble for Buddy Bottle */}
        {speaker === 'BOTTLE' && currentSentence && (
          <div className="absolute -top-20 -left-12 z-40 bg-[#fffdfa]/95 text-slate-900 border-3 border-sky-400 p-2 rounded-2xl shadow-2xl w-48 animate-gentle-bounce font-['Fredoka',sans-serif] backdrop-blur-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-0.5">💧 Buddy Bottle</span>
            <p className="text-xs font-bold leading-snug text-slate-800">"{currentSentence.text}"</p>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-sky-400" />
          </div>
        )}
      </div>
    </div>
  );
}
