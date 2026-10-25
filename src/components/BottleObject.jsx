import React from 'react';
import CartoonBottleSprite from './CartoonBottleSprite';

export default function BottleObject({
  size = 'small',
  mood = 'happy',
  waterLevel = 80,
  className = '',
  onClick
}) {
  return (
    <CartoonBottleSprite
      size={size}
      mood={mood}
      waterLevel={waterLevel}
      className={className}
      onClick={onClick}
    />
  );
}
