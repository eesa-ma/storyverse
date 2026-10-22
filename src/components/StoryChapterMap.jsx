import React from 'react';
import { BookOpen, Heart, Droplet, MapPin, Star, Sun, Leaf, Cloud, Moon, Music, Zap, Flower2, Bird, Fish, Smile } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

export default function StoryChapterMap({
  currentScene,
  scenes = STORY_SCENES,
  currentSentenceIndex = 0,
  onSelectScene = () => {}
}) {
  const currentSentence = currentScene?.sentences?.[currentSentenceIndex] || currentScene?.sentences?.[0];
  const plotData = currentSentence?.plotData || { emotionScore: 70, hydrationLevel: 70 };

  // Child-friendly icon set — each chapter gets a rotating icon
  const CHAPTER_ICONS = [Star, Sun, Heart, Leaf, Cloud, Moon, Music, Zap, Flower2, Bird, Fish, Smile, BookOpen, MapPin];

  const chapterStops = scenes.map((s, idx) => {
    const cleanTitle = s.title.replace(/[^\w\s]/gi, '').trim();
    const shortName = cleanTitle.split(' ').slice(0, 3).join(' ') || `Chapter ${s.id}`;
    const IconComp = CHAPTER_ICONS[idx % CHAPTER_ICONS.length];
    return { id: s.id, name: shortName, IconComp };
  });

  const heartCount = Math.max(1, Math.min(5, Math.ceil((plotData.emotionScore || 80) / 20)));

  return (
    <div
      className="rounded-3xl p-4 md:p-5 text-slate-800 relative overflow-hidden select-none font-['Fredoka',sans-serif]"
      style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
        border: '2.5px solid #bae6fd',
        boxShadow: '0 4px 20px rgba(56,189,248,0.15)'
      }}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #fef9c3, #fde68a)', border: '2px solid #f59e0b' }}
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-base md:text-lg font-black text-slate-800">Storybook Chapter Trail</h3>
            <span
              className="text-[11px] font-black px-2.5 py-0.5 rounded-full"
              style={{ background: '#fde68a', color: '#78350f', border: '1.5px solid #f59e0b' }}
            >
              Chapter {currentScene.id} of {scenes.length}
            </span>
          </div>
        </div>

        {/* Hearts & Hydration */}
        <div
          className="flex items-center gap-4 px-3.5 py-2 rounded-2xl"
          style={{ background: 'white', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-500 mr-1">Happiness:</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-4 h-4 transition-all ${idx < heartCount ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-200 fill-slate-100'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 border-l-2 border-slate-100 pl-3">
            <Droplet className="w-4 h-4 text-sky-500 fill-sky-400" />
            <span className="text-xs font-bold text-sky-700">{plotData.hydrationLevel}% Water</span>
          </div>
        </div>
      </div>

      {/* CHAPTER TRAIL NODES */}
      <div className="relative w-full overflow-x-auto py-3 scrollbar-none">
        <div className="flex items-center justify-between min-w-[640px] px-4 relative">

          {/* Connecting Dashed Ribbon */}
          <div
            className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-2 rounded-full -z-0"
            style={{
              background: 'repeating-linear-gradient(90deg, #fde68a 0, #fde68a 12px, transparent 12px, transparent 20px)',
              border: '1.5px dashed #fbbf24'
            }}
          />

          {chapterStops.map((stop) => {
            const isActive = stop.id === currentScene.id;
            const isCompleted = stop.id < currentScene.id;

            return (
              <div
                key={stop.id}
                onClick={() => onSelectScene(stop.id)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* HERE indicator */}
                {isActive && (
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-[10px] px-2 py-0.5 rounded-full border shadow-md animate-bounce flex items-center gap-1 whitespace-nowrap"
                    style={{ background: '#fde68a', borderColor: '#f59e0b', color: '#78350f' }}
                  >
                    <MapPin className="w-3 h-3 shrink-0" strokeWidth={2.5} /> HERE
                  </div>
                )}

                {/* Chapter Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${isActive ? 'scale-115' : ''}`}
                  style={
                    isActive
                      ? { background: 'linear-gradient(135deg, #fde68a, #fbbf24)', border: '2.5px solid #f59e0b', boxShadow: '0 4px 14px rgba(251,191,36,0.5)' }
                      : isCompleted
                      ? { background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: '2px solid #34d399', boxShadow: '0 2px 6px rgba(52,211,153,0.25)' }
                      : { background: 'white', border: '2px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }
                  }
                >
                  <stop.IconComp
                    className="w-5 h-5"
                    strokeWidth={2.5}
                    style={{ color: isActive ? '#78350f' : isCompleted ? '#065f46' : '#94a3b8' }}
                  />
                </div>

                {/* Chapter Name */}
                <span
                  className={`text-[10px] font-bold mt-2 text-center max-w-[72px] leading-tight ${isActive ? 'font-black' : ''}`}
                  style={{ color: isActive ? '#78350f' : isCompleted ? '#065f46' : '#94a3b8' }}
                >
                  {stop.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
