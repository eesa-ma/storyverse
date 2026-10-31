import React, { useState } from 'react';

export default function RockyRocketSprite({
  mood = 'happy',
  isFlying = false,
  onTapRocket = () => {}
}) {
  const [thrustBoost, setThrustBoost] = useState(false);

  const handleClick = (e) => {
    setThrustBoost(true);
    setTimeout(() => setThrustBoost(false), 800);
    onTapRocket(e);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center select-none group ${
        isFlying ? 'animate-float' : 'animate-gentle-bounce'
      }`}
      title="Tap Rocky the Rocket 🚀"
    >
      {/* ROCKY MOOD BADGE */}
      <div className="absolute -top-7 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 text-white font-black text-xs shadow-lg border-2 border-white animate-pulse whitespace-nowrap z-40 flex items-center gap-1">
        {isFlying ? '🚀 Blast Off Flight!' : '🚀 Rocky Rocket'}
      </div>

      {/* CLICK BOOST FX */}
      {thrustBoost && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <span className="absolute -bottom-6 text-2xl animate-ping">🔥</span>
          <span className="absolute -top-4 -right-2 text-xl animate-bounce">✨</span>
          <span className="absolute top-2 -left-4 text-xl animate-spin">⭐</span>
        </div>
      )}

      {/* ROCKET CONTAINER */}
      <div className="relative w-26 h-34 md:w-30 md:h-38 flex items-center justify-center">
        {/* Soft Cosmic Shadow / Glow */}
        <div className="absolute -bottom-2 inset-x-4 h-5 bg-rose-950/50 rounded-full blur-md group-hover:scale-110 transition-transform pointer-events-none" />

        <svg viewBox="0 0 100 135" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="rocketMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="25%" stopColor="#F43F5E" />
              <stop offset="65%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <linearGradient id="rocketGlint" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="thrusterFire" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="glassPorthole" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* FIERY BOOSTER EXHAUST */}
          <g className="animate-pulse origin-top">
            <path
              d="M 36 102 Q 50 138 64 102 Q 50 118 36 102 Z"
              fill="url(#thrusterFire)"
              filter="drop-shadow(0 0 8px rgba(249,115,22,0.9))"
            />
            <path
              d="M 42 102 Q 50 126 58 102 Q 50 112 42 102 Z"
              fill="#FFF"
            />
          </g>

          {/* AERODYNAMIC ROCKET FINS */}
          <path d="M 28 70 C 14 80, 8 98, 12 104 C 20 102, 28 96, 32 90 Z" fill="#9F1239" stroke="#881337" strokeWidth="2" />
          <path d="M 72 70 C 86 80, 92 98, 88 104 C 80 102, 72 96, 68 90 Z" fill="#9F1239" stroke="#881337" strokeWidth="2" />

          {/* MAIN ROCKET AEROSPACE FUSELAGE */}
          <path
            d="M 50 8 C 28 32, 28 82, 30 98 L 70 98 C 72 82, 72 32, 50 8 Z"
            fill="url(#rocketMetallic)"
            stroke="#881337"
            strokeWidth="2.5"
          />

          {/* SLEEK CURVED AEROSPACE HIGHLIGHT */}
          <path
            d="M 50 14 C 36 34, 34 70, 36 86 C 33 68, 36 34, 50 14 Z"
            fill="url(#rocketGlint)"
          />

          {/* WHITE & GOLD CHEVRON DECALS */}
          <path d="M 34 46 L 50 34 L 66 46 L 66 54 L 50 42 L 34 54 Z" fill="#FFFFFF" opacity="0.9" />
          <circle cx="50" cy="24" r="2.5" fill="#FDE047" />

          {/* CHROME ENGINE NOZZLE */}
          <rect x="36" y="96" width="28" height="7" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />

          {/* CIRCULAR PORTHOLE WITH CHROME BEZEL */}
          <circle cx="50" cy="66" r="17" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="50" cy="66" r="14" fill="url(#glassPorthole)" />

          {/* GLASS REFLECTION CURVE */}
          <path d="M 40 58 Q 50 54 60 58 Q 50 60 40 58 Z" fill="#FFF" opacity="0.75" />

          {/* ROCKY'S FRIENDLY SMILING EYES */}
          <circle cx="44" cy="67" r="3.2" fill="#0F172A" />
          <circle cx="56" cy="67" r="3.2" fill="#0F172A" />
          <circle cx="45" cy="65.5" r="1.2" fill="#FFF" />
          <circle cx="57" cy="65.5" r="1.2" fill="#FFF" />

          {/* CHEEKS */}
          <circle cx="39" cy="71" r="2.5" fill="#FB7185" opacity="0.8" />
          <circle cx="61" cy="71" r="2.5" fill="#FB7185" opacity="0.8" />

          {/* HAPPY SMILE */}
          <path d="M 46 73 Q 50 77 54 73" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
