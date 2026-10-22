import React from 'react';
import { ArrowLeft, ArrowRight, Volume2, Play, Pause, Sparkles } from 'lucide-react';
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
  onToggleAutoPlay = () => {},
  onFinish = () => {}
}) {
  const isFirstSentence = currentSentenceIndex === 0;
  const isLastSentence = currentSentenceIndex === totalSentences - 1;
  const isFirstScene = currentSceneId === 1;
  const isLastScene = currentSceneId === totalScenes;

  const handleSmartNext = () => {
    soundFX.playPop();
    if (!isLastSentence) {
      onNextSentence();
    } else {
      onNextScene();
    }
  };

  const handleSmartPrev = () => {
    soundFX.playPop();
    if (!isFirstSentence) {
      onPrevSentence();
    } else {
      onPrevScene();
    }
  };

  const isAtVeryStart = isFirstScene && isFirstSentence;
  const isAtVeryEnd = isLastScene && isLastSentence;

  return (
    <div className="flex items-center justify-between gap-2 pt-2 select-none w-full font-['Fredoka',sans-serif]">
      
      {/* Read Aloud */}
      <button
        onClick={() => {
          soundFX.playPop();
          onReplayNarration();
        }}
        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full font-bold text-xs transition-all active:scale-95 cursor-pointer border-2"
        style={{
          background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
          borderColor: '#38bdf8',
          color: '#0c4a6e',
          boxShadow: '0 2px 8px rgba(56,189,248,0.2)'
        }}
        title="Read Out Loud"
      >
        <Volume2 className="w-4 h-4 text-sky-600" />
        <span className="hidden sm:inline">Read Aloud</span>
      </button>

      {/* Auto-Play */}
      <button
        onClick={() => {
          soundFX.playPop();
          onToggleAutoPlay();
        }}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-black text-xs transition-all active:scale-95 cursor-pointer border-2 ${isAutoPlayActive ? 'animate-pulse' : ''}`}
        style={isAutoPlayActive
          ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: '#b45309', color: 'white', boxShadow: '0 3px 10px rgba(245,158,11,0.5)' }
          : { background: 'linear-gradient(135deg, #fef9c3, #fde68a)', borderColor: '#f59e0b', color: '#78350f', boxShadow: '0 2px 8px rgba(245,158,11,0.25)' }
        }
        title="Toggle Auto-Play Story Mode"
      >
        {isAutoPlayActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        <span>{isAutoPlayActive ? 'Playing...' : 'Auto-Play'}</span>
      </button>

      {/* Next Line / Turn Page */}
      <button
        onClick={() => {
          soundFX.playPop();
          if (isAtVeryEnd) {
            onFinish();
          } else {
            handleSmartNext();
          }
        }}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-black text-xs transition-all active:scale-95 cursor-pointer border-2 ${isAtVeryEnd ? 'animate-pulse' : ''}`}
        style={isAtVeryEnd
          ? { background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderColor: '#15803d', color: 'white', boxShadow: '0 3px 10px rgba(34,197,94,0.5)' }
          : { background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderColor: '#1d4ed8', color: 'white', boxShadow: '0 3px 10px rgba(59,130,246,0.4)' }
        }
      >
        <span className="flex items-center gap-1">
          {isAtVeryEnd
            ? <><span>Finish Story 🏠</span><Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} /></>
            : isLastSentence ? 'Turn Page' : 'Next Line'
          }
        </span>
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
