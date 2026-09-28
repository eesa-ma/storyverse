import React from 'react';
import { ArrowLeft, ArrowRight, Volume2, Play, Pause } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SceneControls({
  currentSceneId,
  totalScenes,
  currentSentenceIndex = 0,
  totalSentences = 1,
  isAutoPlayActive = false,
  onNextSentence = () => {},
  onPrevSentence = () => {},
  onNextScene = () => {},
  onPrevScene = () => {},
  onReplayNarration = () => {},
  onToggleAutoPlay = () => {}
}) {
  const isFirstSentence = currentSentenceIndex === 0;
  const isLastSentence = currentSentenceIndex === totalSentences - 1;
  const isFirstScene = currentSceneId === 1;
  const isLastScene = currentSceneId === totalScenes;

  // Unified Next Handler: steps sentence, or turns page if sentence is at end of scene
  const handleSmartNext = () => {
    soundFX.playPop();
    if (!isLastSentence) {
      onNextSentence();
    } else {
      onNextScene();
    }
  };

  // Unified Prev Handler: steps previous sentence, or goes to previous page
  const handleSmartPrev = () => {
    soundFX.playPop();
    if (!isFirstSentence) {
      onPrevSentence();
    } else {
      onPrevScene();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2.5 pt-2 select-none w-full font-['Fredoka',sans-serif]">
      {/* 1. Previous Button */}
      <button
        onClick={handleSmartPrev}
        disabled={isFirstScene && isFirstSentence}
        className={`px-4 py-2.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
          isFirstScene && isFirstSentence
            ? 'bg-orange-50 text-orange-300 border border-orange-200 cursor-not-allowed opacity-50'
            : 'bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 shadow-sm active:scale-95 cursor-pointer'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Prev Line</span>
      </button>

      {/* 2. Read Aloud Button */}
      <button
        onClick={() => {
          soundFX.playPop();
          onReplayNarration();
        }}
        className="px-4 py-2.5 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        title="Read Out Loud"
      >
        <Volume2 className="w-4 h-4 text-blue-700" />
        <span className="hidden sm:inline">Read Aloud</span>
      </button>

      {/* 3. Storyteller Auto-Play Mode Button */}
      <button
        onClick={() => {
          soundFX.playPop();
          onToggleAutoPlay();
        }}
        className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
          isAutoPlayActive
            ? 'bg-amber-500 text-white border border-amber-600 ring-2 ring-amber-300 animate-pulse'
            : 'bg-amber-400 hover:bg-amber-500 text-amber-950 border border-amber-500'
        }`}
        title="Toggle Hands-Free Storyteller Mode"
      >
        {isAutoPlayActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        <span>{isAutoPlayActive ? 'Playing...' : 'Auto-Play'}</span>
      </button>

      {/* 4. Next / Turn Page Button */}
      <button
        onClick={handleSmartNext}
        className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 border border-blue-700 text-xs md:text-sm text-white font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
      >
        <span>{isLastScene && isLastSentence ? 'Finish Story' : isLastSentence ? 'Turn Page' : 'Next Line'}</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

