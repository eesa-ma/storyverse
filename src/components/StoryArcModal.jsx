import React from 'react';
import { X, Activity, BookOpen, Sparkles, TrendingUp, Compass } from 'lucide-react';
import StoryPlotChart from './StoryPlotChart';
import { soundFX } from '../services/soundEffects';

const STORY_ARCS_BREAKDOWN = {
  'dolly-midnight-adventure': [
    { title: '1. Exposition', desc: 'Lily doll comes alive at midnight and packs her tiny adventure backpack.' },
    { title: '2. Rising Action', desc: 'Finding the golden key, opening the fairy door, and sailing the block boat.' },
    { title: '3. Climax', desc: 'Reaching the Castle of Lost Toys and discovering joyful lost toy friends.' },
    { title: '4. Resolution', desc: 'Returning home before dawn with unforgettable memories of kindness.' }
  ],
  'secret-cave': [
    { title: '1. Exposition', desc: 'Milo the fox and Toby the rabbit start a bright sunny day in the green woods.' },
    { title: '2. Rising Action', desc: 'Following the carved golden arrow up the steep, winding forest trail.' },
    { title: '3. Climax', desc: 'Toby gets stuck under heavy rocks; Milo turns back with a stick to rescue him.' },
    { title: '4. Resolution', desc: 'True friends discover the glowing crystal lake and celebrate sticking together.' }
  ],
  'curious-rocket': [
    { title: '1. Exposition', desc: 'Rocky the Little Rocket dreams of exploring the deep starry galaxy.' },
    { title: '2. Rising Action', desc: 'Zooming past the smiling crescent moon and ringed planet into deep space.' },
    { title: '3. Climax', desc: 'Guiding Starry the lost comet through tricky asteroid fields to safety.' },
    { title: '4. Resolution', desc: 'Brave hearts soar far — best space friends glowing brightly together.' }
  ],
  'bear-lost-pencil': [
    { title: '1. Exposition', desc: 'Benny Bear loves drawing rainbow doodles in the quiet Cozy Forest.' },
    { title: '2. Rising Action', desc: 'Benny misplaces his magic golden pencil and searches every meadow corner.' },
    { title: '3. Climax', desc: 'Working together with forest pals to find the pencil under the willow.' },
    { title: '4. Resolution', desc: 'Drawing a giant collaborative rainbow masterpiece of gratitude and love.' }
  ],
  'bottle-that-waited': [
    { title: '1. Exposition', desc: 'Aarav packs for school and leaves Buddy water bottle behind on the desk.' },
    { title: '2. Rising Action', desc: 'The quiet night sets in as Buddy waits patiently alone in the empty room.' },
    { title: '3. Climax', desc: 'Aarav rushes back the next morning and finds Buddy safe on the classroom desk.' },
    { title: '4. Resolution', desc: 'Fresh water refill, tightened cap, and empathy for everyday helpers.' }
  ]
};

export default function StoryArcModal({
  isOpen,
  onClose,
  storyId = 'bottle-that-waited',
  storyTitle = 'Story Arc',
  currentScene,
  scenes,
  currentSentenceIndex,
  onSelectSentence,
  onSelectScene
}) {
  if (!isOpen) return null;

  const arcBreakdown = STORY_ARCS_BREAKDOWN[storyId] || STORY_ARCS_BREAKDOWN['bottle-that-waited'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-4 border-amber-400 rounded-3xl p-4 md:p-6 w-full max-w-4xl shadow-2xl relative flex flex-col gap-4 text-white max-h-[92vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-2xl shadow-md">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 flex items-center gap-2">
                <span>Narrative Arc & Sentiment Chart</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  {storyTitle}
                </span>
              </h2>
              <p className="text-xs font-semibold text-slate-300">
                Live Freytag's Pyramid & Sentiment Curve mapped directly to your active sentence!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Interactive Story Plot Chart */}
        <div className="w-full">
          <StoryPlotChart
            storyId={storyId}
            currentScene={currentScene}
            scenes={scenes}
            currentSentenceIndex={currentSentenceIndex}
            onSelectSentence={onSelectSentence}
            onSelectScene={onSelectScene}
          />
        </div>

        {/* Educational Narrative Architecture Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1 text-slate-200">
          {arcBreakdown.map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {item.title}
              </span>
              <p className="text-[11px] text-slate-300 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Click any node in the plot curve above to jump to that sentence in the story!</span>
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer transition-all"
          >
            Close Chart
          </button>
        </div>

      </div>
    </div>
  );
}
