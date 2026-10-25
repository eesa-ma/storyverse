import React from 'react';

export default function CartoonBottleSprite({
  mood = 'happy',
  waterLevel = 80, // 0 to 100
  size = 'default',
  className = '',
  onClick = () => { }
}) {
  // Determine facial expression features based on mood
  const getFacialFeatures = () => {
    switch (mood) {
      case 'lonely':
      case 'sad':
        return {
          eyeLeft: <circle cx="48" cy="72" r="4.5" fill="#0f172a" />,
          eyeRight: <circle cx="72" cy="72" r="4.5" fill="#0f172a" />,
          pupilLeft: <circle cx="49" cy="71" r="1.5" fill="#ffffff" />,
          pupilRight: <circle cx="73" cy="71" r="1.5" fill="#ffffff" />,
          brows: (
            <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
              <line x1="42" y1="63" x2="52" y2="66" />
              <line x1="78" y1="66" x2="68" y2="63" />
            </g>
          ),
          mouth: <path d="M 52 88 Q 60 82 68 88" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />,
          tear: <path d="M 74 76 Q 77 82 74 86 Q 71 82 74 76 Z" fill="#38bdf8" className="animate-bounce" />
        };
      case 'excited':
      case 'refilled':
        return {
          eyeLeft: <path d="M 43 72 Q 48 64 53 72" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />,
          eyeRight: <path d="M 67 72 Q 72 64 77 72" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />,
          brows: (
            <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
              <line x1="42" y1="62" x2="53" y2="60" />
              <line x1="67" y1="60" x2="78" y2="62" />
            </g>
          ),
          mouth: (
            <path d="M 48 82 Q 60 96 72 82 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
          )
        };
      case 'listening':
      case 'confused':
      case 'anxious':
        return {
          eyeLeft: <circle cx="48" cy="70" r="6" fill="#0f172a" />,
          eyeRight: <circle cx="72" cy="72" r="3.5" fill="#0f172a" />,
          pupilLeft: <circle cx="49" cy="69" r="2" fill="#ffffff" />,
          pupilRight: <circle cx="73" cy="71" r="1" fill="#ffffff" />,
          brows: (
            <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
              <line x1="42" y1="60" x2="52" y2="64" />
              <line x1="68" y1="62" x2="78" y2="58" />
            </g>
          ),
          mouth: mood === 'anxious'
            ? <path d="M 51 87 Q 60 81 69 87" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            : <circle cx="60" cy="85" r="4" fill="#0f172a" />
        };
      case 'hopeful':
        return {
          eyeLeft: <circle cx="48" cy="70" r="5" fill="#0f172a" />,
          eyeRight: <circle cx="72" cy="70" r="5" fill="#0f172a" />,
          pupilLeft: <circle cx="50" cy="68" r="2" fill="#ffffff" />,
          pupilRight: <circle cx="74" cy="68" r="2" fill="#ffffff" />,
          brows: (
            <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
              <line x1="42" y1="61" x2="52" y2="63" />
              <line x1="68" y1="63" x2="78" y2="61" />
            </g>
          ),
          mouth: <path d="M 50 83 Q 60 90 70 83" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
        };
      default: // Happy
        return {
          eyeLeft: <circle cx="48" cy="70" r="5" fill="#0f172a" />,
          eyeRight: <circle cx="72" cy="70" r="5" fill="#0f172a" />,
          pupilLeft: <circle cx="50" cy="68" r="2" fill="#ffffff" />,
          pupilRight: <circle cx="74" cy="68" r="2" fill="#ffffff" />,
          brows: null,
          mouth: <path d="M 48 82 Q 60 92 72 82" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        };
    }
  };

  const face = getFacialFeatures();

  // Animation class based on mood
  const getAnimationClass = () => {
    switch (mood) {
      case 'lonely':
      case 'sad':
        return 'animate-pulse scale-95';
      case 'excited':
      case 'refilled':
        return 'animate-bounce scale-110';
      case 'hopeful':
      case 'listening':
      case 'anxious':
        return 'animate-gentle-bounce';
      default:
        return 'hover:scale-105 transition-transform';
    }
  };

  // Water level height (max 100px body)
  const calculatedWaterY = 135 - (waterLevel / 100) * 85;
  const bottleSize = size === 'small'
    ? 'w-10 h-14'
    : size === 'medium'
      ? 'w-14 h-20'
      : 'w-20 h-28 md:w-24 md:h-24';

  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-all duration-500 ${getAnimationClass()} ${className}`}
      title="Buddy the Water Bottle 💧"
    >
      <svg
        viewBox="0 0 120 160"
        className={`${bottleSize} drop-shadow-2xl overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Drop Shadow under Bottle */}
        <ellipse cx="60" cy="152" rx="36" ry="7" fill="rgba(0, 0, 0, 0.2)" />

        {/* Outer Translucent Blue Glass Bottle Body */}
        <path
          d="M 38 35 L 82 35 C 88 35 92 40 92 46 L 92 135 C 92 145 84 150 72 150 L 48 150 C 36 150 28 145 28 135 L 28 46 C 28 40 32 35 38 35 Z"
          fill="#38bdf8"
          fillOpacity="0.4"
          stroke="#0284c7"
          strokeWidth="4"
        />

        {/* Liquid Water inside Bottle */}
        <clipPath id="bottleClip">
          <path d="M 30 46 L 90 46 L 90 135 C 90 145 84 148 72 148 L 48 148 C 36 148 30 145 30 135 Z" />
        </clipPath>
        <g clipPath="url(#bottleClip)">
          {/* Water Liquid Body */}
          <rect
            x="25"
            y={calculatedWaterY}
            width="70"
            height="130"
            fill="#0284c7"
            fillOpacity="0.8"
            className="transition-all duration-700"
          />
          {/* Animated Water Surface Wave */}
          <path
            d={`M 25 ${calculatedWaterY} Q 42.5 ${calculatedWaterY - 4} 60 ${calculatedWaterY} T 95 ${calculatedWaterY} L 95 160 L 25 160 Z`}
            fill="#38bdf8"
            className="animate-pulse"
          />
          {/* Water Bubbles */}
          <circle cx="45" cy={calculatedWaterY + 25} r="3" fill="#ffffff" opacity="0.6" className="animate-ping" />
          <circle cx="72" cy={calculatedWaterY + 45} r="4" fill="#ffffff" opacity="0.5" />
          <circle cx="55" cy={calculatedWaterY + 65} r="2.5" fill="#ffffff" opacity="0.7" />
        </g>

        {/* Bottle Cap (Navy Blue with Grip Grooves) */}
        <rect x="42" y="16" width="36" height="19" rx="5" fill="#1e3a8a" stroke="#172554" strokeWidth="3" />
        <line x1="48" y1="20" x2="48" y2="30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="20" x2="60" y2="30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="20" x2="72" y2="30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        {/* Cap Loop Handle */}
        <path d="M 52 16 Q 60 8 68 16" stroke="#172554" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Bottle Neck Ring */}
        <rect x="36" y="32" width="48" height="5" rx="2.5" fill="#0284c7" />

        {/* Glass Highlight Shine Line */}
        <path d="M 34 50 Q 33 90 35 130" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M 40 48 Q 39 70 40 90" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* ROCKET STICKER ON BOTTLE BODY */}
        <g transform="translate(68, 100) scale(0.65) rotate(12)">
          {/* Rocket Body */}
          <path d="M 15 0 C 25 -10 35 -10 45 0 L 45 35 L 15 35 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          {/* Window */}
          <circle cx="30" cy="12" r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          {/* Fins */}
          <path d="M 15 20 L 2 35 L 15 35 Z" fill="#f59e0b" />
          <path d="M 45 20 L 58 35 L 45 35 Z" fill="#f59e0b" />
          {/* Flame */}
          <path d="M 20 35 L 30 50 L 40 35 Z" fill="#f97316" className="animate-pulse" />
        </g>

        {/* CARTOON FACE */}
        {face.brows}
        {face.eyeLeft}
        {face.eyeRight}
        {face.pupilLeft}
        {face.pupilRight}
        {face.mouth}
        {face.tear}

        {/* Rosy Cheeks */}
        <ellipse cx="40" cy="78" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
        <ellipse cx="80" cy="78" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
      </svg>
    </div>
  );
}
