import React, { useState } from 'react';

export default function LilyDollSprite({
  mood = 'happy',
  hasKey = false,
  isSailing = false,
  onTapLily = () => {}
}) {
  const [clickedSparkles, setClickedSparkles] = useState(false);

  const handleClick = (e) => {
    setClickedSparkles(true);
    setTimeout(() => setClickedSparkles(false), 900);
    onTapLily(e);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex flex-col items-center select-none group ${
        isSailing ? 'animate-float' : 'animate-gentle-bounce'
      }`}
      title="Tap Lily the Doll 🎀"
    >
      {/* FLOATING CRISP MOOD BADGE */}
      <div className="absolute -top-7 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 text-white font-black text-xs shadow-lg border-2 border-white animate-pulse whitespace-nowrap z-40 flex items-center gap-1">
        {hasKey ? '🗝️ Golden Key!' : isSailing ? '⛵ Sailing Boat!' : '🎀 Lily Doll'}
      </div>

      {/* CLICK SPARKLES FX */}
      {clickedSparkles && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <span className="absolute -top-4 -left-3 text-xl animate-ping">✨</span>
          <span className="absolute -top-2 right-0 text-lg animate-bounce">💖</span>
          <span className="absolute bottom-6 left-1 text-xl animate-spin">⭐</span>
        </div>
      )}

      {/* CRISP REALISTIC DOLL VISUAL */}
      <div className="relative w-36 h-48 md:w-44 md:h-56 flex items-center justify-center">
        {/* Soft Ground Contact Shadow */}
        <div className="absolute -bottom-1 inset-x-6 h-4 bg-amber-950/45 rounded-full blur-[3px] group-hover:scale-110 transition-transform pointer-events-none" />

        {/* 100% Solid, Crisp, High-Definition Doll Character */}
        <img
          src="/assets/dolly_lily_character.png"
          alt="Lily the Doll"
          className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:brightness-105"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))'
          }}
        />

        {/* EXTRA GOLDEN KEY SPARKLE WHEN HELD */}
        {hasKey && (
          <div className="absolute top-[28%] right-[10%] pointer-events-none">
            <span className="relative text-base filter drop-shadow-[0_0_8px_rgba(251,191,36,1)] animate-bounce inline-block">✨</span>
          </div>
        )}

        {/* BUTTON EYE SPARKLE GLINT */}
        <div className="absolute top-[23%] left-[45%] pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white block shadow-[0_0_8px_#fff] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
