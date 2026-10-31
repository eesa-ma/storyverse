import React, { useState } from 'react';
import { Award, X, Sparkles, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORY_CARE_PLEDGES = {
  'dolly-midnight-adventure': {
    icon: '🎀',
    label: 'Everyday Toys & Dear Friends',
    tip: 'I promise to take care of my toys, include everyone in playtime, and share warm kindness with every friend!',
    quote: '“A small act of kindness can bring light and joy to lost friends everywhere.” ✨'
  },
  'secret-cave': {
    icon: '🦊',
    label: 'True Friendship & Forest Animals',
    tip: 'I promise to stick by my friends through thick and thin, and never leave a friend behind when times get tricky!',
    quote: '“A real friend doesn\'t leave you behind just because the adventure is waiting.” ❤️'
  },
  'curious-rocket': {
    icon: '🚀',
    label: 'Big Dreams & Kind Space Helpers',
    tip: 'I promise to take brave small steps toward my dreams every day and help friends who need a guiding light!',
    quote: '“Big dreams start with tiny brave steps every single day!” 🌟'
  },
  'bear-lost-pencil': {
    icon: '✏️',
    label: 'Sharing & Creative Teamwork',
    tip: 'I promise to share my art supplies, say thank you to friends who help me, and create beautiful things together!',
    quote: '“Creativity grows much brighter when shared with good friends.” 🎨'
  },
  'bottle-that-waited': {
    icon: '💧',
    label: 'Everyday Helpers & Clean Water',
    tip: 'I promise to pack my bag carefully, keep my water bottle clean, and cherish the everyday things that care for me!',
    quote: '“Take care of the things that take care of you!” 💧'
  }
};

export default function CareCertificateModal({
  isOpen,
  onClose,
  storyId = 'bottle-that-waited',
  storyTitle = "Storyverse Reading Adventure"
}) {
  const [explorerName, setExplorerName] = useState('Super Story Explorer');

  if (!isOpen) return null;

  const pledge = STORY_CARE_PLEDGES[storyId] || STORY_CARE_PLEDGES['bottle-that-waited'];

  const handlePrint = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="bg-amber-50 border-8 border-amber-400 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 border-2 border-amber-400"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate Border Frame */}
        <div className="border-4 border-dashed border-amber-500 rounded-2xl p-6 bg-gradient-to-b from-white via-amber-50 to-sky-50">
          <div className="text-4xl mb-1 animate-bounce">🏆</div>
          <h2 className="text-2xl md:text-3xl font-black text-amber-950 uppercase tracking-widest">
            Care Champion Certificate
          </h2>
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
            Official Explorer Badge of Care · {storyTitle}
          </p>

          <div className="my-6">
            <p className="text-sm font-extrabold text-slate-700">This certificate is proudly awarded to:</p>
            <input
              type="text"
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
              className="mt-2 text-center text-xl md:text-2xl font-black text-sky-900 bg-amber-100/80 border-b-4 border-sky-500 rounded-xl px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter Your Name..."
            />
          </div>

          <div className="bg-sky-100 border-2 border-sky-300 rounded-2xl p-4 my-4 flex items-center justify-center gap-3">
            <span className="text-5xl">{pledge.icon}</span>
            <div className="text-left">
              <h4 className="font-extrabold text-sky-950 text-base">Pledge to Care For: {pledge.label}</h4>
              <p className="text-xs font-bold text-sky-800">{pledge.tip}</p>
            </div>
          </div>

          <p className="text-xs font-extrabold text-amber-900 italic mt-4">
            {pledge.quote}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="btn-game-primary px-6 py-3 rounded-2xl text-sm font-black text-white flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
