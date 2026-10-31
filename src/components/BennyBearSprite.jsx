import React, { useState } from 'react';

export default function BennyBearSprite({
  mood = 'happy',
  hasPencil = true,
  onTapBear = () => {}
}) {
  const [clickedSparkles, setClickedSparkles] = useState(false);

  const handleClick = (e) => {
    setClickedSparkles(true);
    setTimeout(() => setClickedSparkles(false), 900);
    onTapBear(e);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex flex-col items-center select-none group animate-gentle-bounce"
      title="Tap Benny Bear 🐻"
    >
      {/* FLOATING CRISP MOOD BADGE */}
      <div className="absolute -top-7 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 via-emerald-600 to-teal-600 text-white font-black text-xs shadow-lg border-2 border-white animate-pulse whitespace-nowrap z-40 flex items-center gap-1">
        {hasPencil ? '✏️ Golden Magic Pencil!' : '🐻 Benny Bear'}
      </div>

      {/* CLICK SPARKLES FX */}
      {clickedSparkles && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <span className="absolute -top-4 -left-3 text-xl animate-ping">✨</span>
          <span className="absolute -top-2 right-0 text-lg animate-bounce">🎨</span>
          <span className="absolute bottom-6 left-1 text-xl animate-spin">🌈</span>
        </div>
      )}

      {/* CRISP REALISTIC BEAR CHARACTER VISUAL */}
      <div className="relative w-36 h-48 md:w-44 md:h-56 flex items-center justify-center">
        {/* Soft Ground Contact Shadow */}
        <div className="absolute -bottom-1 inset-x-6 h-4 bg-amber-950/45 rounded-full blur-[3px] group-hover:scale-110 transition-transform pointer-events-none" />

        {/* 100% Solid, Crisp, High-Definition Illustrated Benny Bear Character */}
        <img
          src="/assets/benny_bear_character.png"
          alt="Benny Bear"
          className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:brightness-105"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.35))'
          }}
        />

        {/* GOLDEN PENCIL SPARKLE AURA */}
        {hasPencil && (
          <div className="absolute top-[28%] left-[10%] pointer-events-none">
            <span className="relative text-base filter drop-shadow-[0_0_8px_rgba(251,191,36,1)] animate-bounce inline-block">✨</span>
          </div>
        )}
      </div>
    </div>
  );
}
