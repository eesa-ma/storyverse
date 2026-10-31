import React, { useState } from 'react';
import { Activity, TrendingUp, Droplets, VolumeX, Sparkles, Navigation } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

const STORY_METRICS = {
  'dolly-midnight-adventure': {
    metric1: {
      name: "Lily's Wonder",
      icon: '✨',
      getDesc: (v) => v >= 80 ? '🌟 Full of Midnight Magic' : v >= 40 ? '🎀 Exploring the Bedroom' : '🧸 Button Eyes Peeking'
    },
    metric2: {
      name: 'Midnight Courage',
      icon: '🗝️',
      getDesc: (v) => v >= 80 ? '🏰 Castle of Lost Toys Ready!' : v >= 40 ? '⛵ Sailing the Block Boat' : '🚪 Seeking the Golden Key'
    },
    metric3: {
      name: 'House Serenity',
      icon: '🌙',
      getDesc: (v) => v >= 75 ? '🤫 Silent Midnight' : v >= 40 ? '✨ Gentle Whispers' : '⏰ Clock Ticking'
    }
  },
  'secret-cave': {
    metric1: {
      name: 'Friendship Bond',
      icon: '🦊',
      getDesc: (v) => v >= 80 ? '🤝 Inseparable Best Pals' : v >= 40 ? '🐾 Exploring Forest Together' : '🌲 Sunny Woods Walk'
    },
    metric2: {
      name: 'Bravery & Teamwork',
      icon: '🧗',
      getDesc: (v) => v >= 80 ? '💪 Unstoppable Team' : v >= 40 ? '🪵 Helping Stick Ready' : '⛰️ Steep Trail Ahead'
    },
    metric3: {
      name: 'Cave Mystery Index',
      icon: '💎',
      getDesc: (v) => v >= 75 ? '✨ Glowing Amethyst Cave' : v >= 40 ? '🧭 Golden Arrow Trail' : '🍃 Whispering Trees'
    }
  },
  'curious-rocket': {
    metric1: {
      name: 'Rocket Excitement',
      icon: '🚀',
      getDesc: (v) => v >= 80 ? '🤩 Cosmic Starlight Joy' : v >= 40 ? '✨ Cruising the Orbit' : '🛑 Launchpad Ready'
    },
    metric2: {
      name: 'Booster Energy',
      icon: '⚡',
      getDesc: (v) => v >= 80 ? '🔥 Full Space Warp Speed!' : v >= 40 ? '🛸 Smooth Space Gliding' : '⛽ Thrusters Powered'
    },
    metric3: {
      name: 'Galaxy Wonder',
      icon: '🌌',
      getDesc: (v) => v >= 75 ? '💫 Deep Sparkling Galaxy' : v >= 40 ? '☄️ Starry Comet Tail Glow' : '🌙 Smiling Moon View'
    }
  },
  'bear-lost-pencil': {
    metric1: {
      name: "Benny's Happiness",
      icon: '🐻',
      getDesc: (v) => v >= 80 ? '🎨 Cheerful Forest Artist' : v >= 40 ? '🐾 Searching the Meadow' : '🥺 Looking for Pencil'
    },
    metric2: {
      name: 'Rainbow Creativity',
      icon: '🌈',
      getDesc: (v) => v >= 80 ? '✨ Masterpiece Complete!' : v >= 40 ? '✏️ Drawing with Friends' : '📝 Sketching Rainbows'
    },
    metric3: {
      name: 'Forest Harmony',
      icon: '🌲',
      getDesc: (v) => v >= 75 ? '🎉 Meadow Celebration' : v >= 40 ? '🤝 Caring Friends Helping' : '🌼 Quiet Forest Breeze'
    }
  },
  'bottle-that-waited': {
    metric1: {
      name: 'Bottle Emotion',
      icon: '💧',
      getDesc: (v) => v >= 80 ? '😃 Happy & Loved' : v >= 40 ? '🥺 Hopeful / Waiting' : '💔 Lonely on Desk'
    },
    metric2: {
      name: 'Hydration Level',
      icon: '🚰',
      getDesc: (v) => v >= 80 ? '💧 Fully Hydrated' : v >= 40 ? '💧 Half Full' : '🚰 Needs Water Refill!'
    },
    metric3: {
      name: 'Classroom Quietness',
      icon: '🤫',
      getDesc: (v) => v >= 75 ? '🤫 Quiet Classroom' : v >= 40 ? '👣 Footsteps in Hall' : '🔔 Busy School Day'
    }
  }
};

export default function StoryPlotChart({
  storyId = 'bottle-that-waited',
  currentScene,
  scenes = STORY_SCENES,
  currentSentenceIndex = 0,
  onSelectSentence = () => {},
  onSelectScene = () => {}
}) {
  const [plotMode, setPlotMode] = useState('scene'); // 'scene' or 'story'

  const currentSentences = currentScene?.sentences || [];
  const currentSentence = currentSentences[currentSentenceIndex] || currentSentences[0];
  const plotData = currentSentence?.plotData || { emotionScore: 70, hydrationLevel: 70, quietnessIndex: 20 };
  const storyConfig = STORY_METRICS[storyId] || STORY_METRICS['bottle-that-waited'];

  // Calculate SVG curve path for current scene sentences
  const width = 480;
  const height = 140;
  const padding = 30;

  const points = currentSentences.map((s, idx) => {
    const x = padding + (idx / Math.max(1, currentSentences.length - 1)) * (width - padding * 2);
    const emotion = s.plotData?.emotionScore || 50;
    const y = height - padding - (emotion / 100) * (height - padding * 2);
    return { x, y, sentence: s, index: idx };
  });

  // Construct smooth SVG path string
  let pathD = '';
  if (points.length === 1) {
    pathD = `M ${points[0].x} ${points[0].y} L ${points[0].x + 10} ${points[0].y}`;
  } else if (points.length > 1) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const cx1 = p1.x + (p2.x - p1.x) / 2;
      const cy1 = p1.y;
      const cx2 = p1.x + (p2.x - p1.x) / 2;
      const cy2 = p2.y;
      pathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
    }
  }

  // Calculate full story arc nodes (macro plot across scenes)
  const fullStoryPoints = (scenes || STORY_SCENES).map((sc, idx) => {
    const avgEmotion = sc.sentences?.[0]?.plotData?.emotionScore || 50;
    const x = padding + (idx / Math.max(1, (scenes || STORY_SCENES).length - 1)) * (width - padding * 2);
    const y = height - padding - (avgEmotion / 100) * (height - padding * 2);
    return { x, y, scene: sc, index: idx };
  });

  let fullStoryPathD = `M ${fullStoryPoints[0].x} ${fullStoryPoints[0].y}`;
  for (let i = 0; i < fullStoryPoints.length - 1; i++) {
    const p1 = fullStoryPoints[i];
    const p2 = fullStoryPoints[i + 1];
    const cx1 = p1.x + (p2.x - p1.x) / 2;
    const cy1 = p1.y;
    const cx2 = p1.x + (p2.x - p1.x) / 2;
    const cy2 = p2.y;
    fullStoryPathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
  }

  return (
    <div className="bg-slate-900 border-4 border-amber-500/80 rounded-3xl p-4 md:p-5 text-white shadow-2xl relative overflow-hidden select-none">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-amber-400 animate-pulse" />
          <h3 className="text-lg md:text-xl font-extrabold text-amber-300 flex items-center gap-1.5">
            <span>Dynamic Story & Emotion Plot</span>
            <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
              Live Sentence Sync
            </span>
          </h3>
        </div>

        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setPlotMode('scene')}
            className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
              plotMode === 'scene'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sentence Arc
          </button>
          <button
            onClick={() => setPlotMode('story')}
            className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
              plotMode === 'story'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Story Plot
          </button>
        </div>
      </div>

      {/* SVG Interactive Plot Graph */}
      <div className="relative w-full bg-slate-950/80 border-2 border-slate-800 rounded-2xl p-2 mb-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 md:h-44 overflow-visible">
          <defs>
            <linearGradient id="plotGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          {[25, 50, 75].map((val) => {
            const y = height - padding - (val / 100) * (height - padding * 2);
            return (
              <line
                key={val}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Render Curve depending on Plot Mode */}
          {plotMode === 'scene' ? (
            <>
              {/* Fill area under curve */}
              <path
                d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
                fill="url(#plotGradient)"
              />
              {/* Curve Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Plot Nodes for Sentences */}
              {points.map((pt) => {
                const isActive = pt.index === currentSentenceIndex;
                return (
                  <g
                    key={pt.index}
                    className="cursor-pointer group"
                    onClick={() => onSelectSentence(pt.index)}
                  >
                    {/* Pulsing ring for active sentence */}
                    {isActive && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        className="animate-ping"
                      />
                    )}
                    {/* Node Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? "7" : "5"}
                      fill={isActive ? "#38bdf8" : "#f59e0b"}
                      stroke="#0f172a"
                      strokeWidth="2"
                      className="transition-all group-hover:scale-150"
                    />
                    {/* Label Tag above node */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill={isActive ? "#38bdf8" : "#cbd5e1"}
                      className="text-[9px] font-black pointer-events-none uppercase tracking-wider"
                    >
                      S{pt.index + 1}
                    </text>
                  </g>
                );
              })}
            </>
          ) : (
            <>
              <path
                d={`${fullStoryPathD} L ${fullStoryPoints[fullStoryPoints.length - 1].x} ${height - padding} L ${fullStoryPoints[0].x} ${height - padding} Z`}
                fill="url(#plotGradient)"
              />
              <path
                d={fullStoryPathD}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              {fullStoryPoints.map((pt) => {
                const isActiveScene = pt.scene.id === currentScene.id;
                return (
                  <g
                    key={pt.scene.id}
                    className="cursor-pointer group"
                    onClick={() => onSelectScene(pt.scene.id)}
                  >
                    {isActiveScene && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActiveScene ? "7" : "5"}
                      fill={isActiveScene ? "#f59e0b" : "#38bdf8"}
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill={isActiveScene ? "#f59e0b" : "#94a3b8"}
                      className="text-[9px] font-black pointer-events-none"
                    >
                      Scene {pt.scene.id}
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </svg>

        {/* Dynamic Plot Active Sentence Callout Tag */}
        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-bold mt-1">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              Plot Node: <span className="text-white font-extrabold">{currentSentence?.plotData?.storyArcPoint || 'Story Arc'}</span>
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Sentence {currentSentenceIndex + 1} of {currentSentences.length}
          </span>
        </div>
      </div>

      {/* Dynamic Metric Gauges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Gauge 1 */}
        <div className="bg-slate-800/90 border border-sky-500/30 p-3 rounded-2xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-extrabold text-sky-300">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">{storyConfig.metric1.icon}</span>
              <span>{storyConfig.metric1.name}</span>
            </span>
            <span className="text-sky-200 font-black">{plotData.emotionScore}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 border border-sky-500/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${plotData.emotionScore}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">
            {storyConfig.metric1.getDesc(plotData.emotionScore)}
          </span>
        </div>

        {/* Gauge 2 */}
        <div className="bg-slate-800/90 border border-teal-500/30 p-3 rounded-2xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-extrabold text-teal-300">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">{storyConfig.metric2.icon}</span>
              <span>{storyConfig.metric2.name}</span>
            </span>
            <span className="text-teal-200 font-black">{plotData.hydrationLevel}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 border border-teal-500/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${plotData.hydrationLevel}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">
            {storyConfig.metric2.getDesc(plotData.hydrationLevel)}
          </span>
        </div>

        {/* Gauge 3 */}
        <div className="bg-slate-800/90 border border-purple-500/30 p-3 rounded-2xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-extrabold text-purple-300">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">{storyConfig.metric3.icon}</span>
              <span>{storyConfig.metric3.name}</span>
            </span>
            <span className="text-purple-200 font-black">{plotData.quietnessIndex}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 border border-purple-500/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500 rounded-full"
              style={{ width: `${plotData.quietnessIndex}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">
            {storyConfig.metric3.getDesc(plotData.quietnessIndex)}
          </span>
        </div>
      </div>
    </div>
  );
}
