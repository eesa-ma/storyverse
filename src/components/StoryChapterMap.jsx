import React from 'react';
import { BookOpen, Heart, Droplet, MapPin, Star, Sun, Leaf, Cloud, Moon, Music, Zap, Flower2, Bird, Fish, Smile } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

export default function StoryChapterMap({
  currentScene,
  scenes = STORY_SCENES,
  storyId = 'bottle-that-waited',
  storyTitle = 'The Bottle That Waited',
  storyEmoji = '💧',
  currentSentenceIndex = 0,
  onSelectScene = () => {}
}) {
  const currentSentence = currentScene?.sentences?.[currentSentenceIndex] || currentScene?.sentences?.[0];
  const plotData = currentSentence?.plotData || { emotionScore: 70, hydrationLevel: 70 };

  const trailThemes = {
    'dolly-midnight-adventure': {
      label: 'Midnight Wonder',
      metricLabel: 'Magic',
      metricValue: plotData.emotionScore || 70,
      icons: [Moon, Star, Heart, MapPin, Flower2, Sun],
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #ede9fe 100%)',
      border: '#f9a8d4',
      active: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
      accent: '#9d174d'
    },
    'secret-cave': {
      label: 'Friendship Quest',
      metricLabel: 'Friendship',
      metricValue: plotData.emotionScore || 70,
      icons: [Leaf, MapPin, Sun, Cloud, Heart, Star],
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #dcfce7 100%)',
      border: '#fbbf24',
      active: 'linear-gradient(135deg, #fbbf24, #34d399)',
      accent: '#92400e'
    },
    'bottle-that-waited': {
      label: 'Care Journey',
      metricLabel: 'Care',
      metricValue: plotData.hydrationLevel || 70,
      icons: [Droplet, Music, Cloud, Heart, Star, BookOpen],
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 50%, #ecfeff 100%)',
      border: '#7dd3fc',
      active: 'linear-gradient(135deg, #7dd3fc, #818cf8)',
      accent: '#075985'
    },
    'curious-rocket': {
      label: 'Star Mission',
      metricLabel: 'Courage',
      metricValue: plotData.emotionScore || 70,
      icons: [Zap, Star, Moon, Cloud, Sun, Music],
      background: 'linear-gradient(135deg, #eef2ff 0%, #ddd6fe 50%, #fce7f3 100%)',
      border: '#a5b4fc',
      active: 'linear-gradient(135deg, #818cf8, #f472b6)',
      accent: '#3730a3'
    },
    'bear-lost-pencil': {
      label: 'Creative Trail',
      metricLabel: 'Creativity',
      metricValue: plotData.emotionScore || 70,
      icons: [Star, Leaf, Flower2, Heart, Sun, BookOpen],
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #fef3c7 100%)',
      border: '#6ee7b7',
      active: 'linear-gradient(135deg, #34d399, #fbbf24)',
      accent: '#065f46'
    }
  };
  const theme = trailThemes[storyId] || trailThemes['bottle-that-waited'];

  const chapterStops = scenes.map((s, idx) => {
    const cleanTitle = s.title.replace(/[^\w\s]/gi, '').trim();
    const shortName = cleanTitle.split(' ').slice(0, 3).join(' ') || `Chapter ${s.id}`;
    const IconComp = theme.icons[idx % theme.icons.length];
    return { id: s.id, name: shortName, IconComp };
  });

  const progressCount = Math.max(1, Math.min(5, Math.ceil(theme.metricValue / 20)));

  return (
    <div
      className="rounded-3xl p-4 md:p-5 text-slate-800 relative overflow-hidden select-none font-['Fredoka',sans-serif]"
      style={{
        background: theme.background,
        border: `2.5px solid ${theme.border}`,
        boxShadow: `0 4px 20px ${theme.border}55`
      }}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #fef9c3, #fde68a)', border: '2px solid #f59e0b' }}
          >
            <span className="text-lg" aria-hidden="true">{storyEmoji}</span>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-base md:text-lg font-black text-slate-800">{theme.label}</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate max-w-[260px]">{storyTitle}</p>
            </div>
            <span
              className="text-[11px] font-black px-2.5 py-0.5 rounded-full"
              style={{ background: `${theme.border}55`, color: theme.accent, border: `1.5px solid ${theme.border}` }}
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
            <span className="text-xs font-bold text-slate-500 mr-1">{theme.metricLabel}:</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-4 h-4 transition-all ${idx < progressCount ? 'scale-110' : 'text-slate-200 fill-slate-100'}`}
                style={idx < progressCount ? { color: theme.accent, fill: theme.accent } : undefined}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 border-l-2 border-slate-100 pl-3">
            <span className="text-sm" aria-hidden="true">{storyEmoji}</span>
            <span className="text-xs font-bold" style={{ color: theme.accent }}>{theme.metricValue}% {theme.metricLabel}</span>
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
              background: `repeating-linear-gradient(90deg, ${theme.border} 0, ${theme.border} 12px, transparent 12px, transparent 20px)`,
              border: `1.5px dashed ${theme.border}`
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
                    style={{ background: theme.border, borderColor: theme.accent, color: theme.accent }}
                  >
                    <MapPin className="w-3 h-3 shrink-0" strokeWidth={2.5} /> HERE
                  </div>
                )}

                {/* Chapter Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${isActive ? 'scale-115' : ''}`}
                  style={
                    isActive
                      ? { background: theme.active, border: `2.5px solid ${theme.accent}`, boxShadow: `0 4px 14px ${theme.border}88` }
                      : isCompleted
                      ? { background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: '2px solid #34d399', boxShadow: '0 2px 6px rgba(52,211,153,0.25)' }
                      : { background: 'white', border: '2px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }
                  }
                >
                  <stop.IconComp
                    className="w-5 h-5"
                    strokeWidth={2.5}
                    style={{ color: isActive ? theme.accent : isCompleted ? '#065f46' : '#94a3b8' }}
                  />
                </div>

                {/* Chapter Name */}
                <span
                  className={`text-[10px] font-bold mt-2 text-center max-w-[72px] leading-tight ${isActive ? 'font-black' : ''}`}
                  style={{ color: isActive ? theme.accent : isCompleted ? '#065f46' : '#94a3b8' }}
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
