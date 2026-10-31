import React, { useState } from 'react';
import { Sparkles, X, ChevronRight, ChevronLeft, Volume2, Printer, RefreshCw, Award, BookOpen, Heart, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../services/soundEffects';
import { narrator } from '../services/narratorService';

const HEROES = [
  { id: 'pip', name: 'Pip the Space Pup', emoji: '🐶', color: 'from-amber-400 to-orange-500', trait: 'Brave & Curious' },
  { id: 'sparky', name: 'Sparky the Dragon', emoji: '🐲', color: 'from-emerald-400 to-teal-500', trait: 'Playful & Kind' },
  { id: 'luna', name: 'Luna the Moon Bunny', emoji: '🐰', color: 'from-pink-400 to-rose-500', trait: 'Swift & Imaginative' },
  { id: 'finn', name: 'Finn the Smart Fox', emoji: '🦊', color: 'from-orange-400 to-amber-600', trait: 'Clever & Loyal' },
  { id: 'barnaby', name: 'Barnaby the Gentle Bear', emoji: '🐻', color: 'from-blue-400 to-indigo-500', trait: 'Warm & Helpful' }
];

const WORLDS = [
  { id: 'forest', name: 'Whispering Woods', emoji: '🌲', bg: 'bg-emerald-50 border-emerald-300', desc: 'A sun-dappled woodland where colorful flowers hum friendly melodies.' },
  { id: 'castle', name: 'Castle in the Clouds', emoji: '🏰', bg: 'bg-sky-50 border-sky-300', desc: 'A floating fairy-tale fortress made of rainbow mist and marshmallow towers.' },
  { id: 'galaxy', name: 'Starry Galaxy', emoji: '🚀', bg: 'bg-indigo-50 border-indigo-300', desc: 'A cosmic playground with dancing comets and glowing constellation slides.' },
  { id: 'cave', name: 'Crystal Cave', emoji: '💎', bg: 'bg-purple-50 border-purple-300', desc: 'A hidden grotto lined with sparkly gems that chime like tiny bells.' }
];

const QUESTS = [
  { id: 'key', name: 'Find the Lost Golden Star Key', emoji: '🗝️', goal: 'unlock the Door of Sweet Dreams for all children' },
  { id: 'rainbow', name: 'Fix the Broken Rainbow Bridge', emoji: '🌈', goal: 'bring the bright colors back to the morning sky' },
  { id: 'cake', name: 'Bake the Giant Friendship Cake', emoji: '🎂', goal: 'throw a surprise party for a lonely mountain giant' },
  { id: 'song', name: 'Help a Shy Little Bird Sing', emoji: '🎵', goal: 'teach a little bluebird that their unique voice is beautiful' }
];

const MORALS = [
  { id: 'kindness', title: 'Power of Kindness', emoji: '❤️', lesson: 'A warm smile and a helping hand can solve any puzzle.' },
  { id: 'honesty', title: 'True Friendship', emoji: '🤝', lesson: 'When we work together and tell the truth, we become unstoppable.' },
  { id: 'bravery', title: 'Courage to Try', emoji: '🦸', lesson: 'Being brave doesn’t mean not being scared—it means trying anyway!' },
  { id: 'curiosity', title: 'Wonder & Learning', emoji: '💡', lesson: 'Asking questions and exploring opens up the most magical doors.' }
];

export default function StoryMakerModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Hero, 2: World, 3: Quest & Moral, 4: Generated Story
  const [selectedHero, setSelectedHero] = useState(HEROES[0]);
  const [selectedWorld, setSelectedWorld] = useState(WORLDS[0]);
  const [selectedQuest, setSelectedQuest] = useState(QUESTS[0]);
  const [selectedMoral, setSelectedMoral] = useState(MORALS[0]);
  const [authorName, setAuthorName] = useState('Young Storyteller');

  // Generated Story State
  const [currentStoryPage, setCurrentStoryPage] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  // Generate 3 cohesive storybook pages based on child's selections
  const storyPages = [
    {
      chapter: 'Chapter 1: The Call to Adventure',
      title: `${selectedHero.name} and the ${selectedWorld.name}`,
      text: `Once upon a sunny morning, in the magical ${selectedWorld.name}, ${selectedHero.name} was out exploring with a cheerful hop! Everywhere they looked, ${selectedWorld.desc} But suddenly, a tiny sparkling message fluttered down from the breeze: someone needed help to ${selectedQuest.goal}!`,
      sceneEmoji: `${selectedHero.emoji} ${selectedWorld.emoji} ${selectedQuest.emoji}`
    },
    {
      chapter: 'Chapter 2: The Curious Challenge',
      title: `Overcoming the Obstacle`,
      text: `As ${selectedHero.name} journeyed deeper, the path grew tricky. A sparkling riddle blocked the way, and doubt whispered in the wind. But remembering their ${selectedHero.trait} heart, ${selectedHero.name} took three deep breaths, asked for a friendly clue, and shared a bright smile. Because of this, the riddle solved itself with a cheerful ding!`,
      sceneEmoji: `✨ ${selectedHero.emoji} 🧩`
    },
    {
      chapter: 'Chapter 3: The Magical Celebration',
      title: `Victory & The ${selectedMoral.title}`,
      text: `With courage and teamwork, ${selectedHero.name} reached the goal and managed to ${selectedQuest.goal}! All the creatures of ${selectedWorld.name} gathered to cheer and dance with confetti. ${selectedHero.name} smiled proudly, knowing that: "${selectedMoral.lesson}"`,
      sceneEmoji: `🎉 ${selectedHero.emoji} 🏆 ${selectedMoral.emoji}`
    }
  ];

  const handleGenerateStory = () => {
    soundFX.playMagicChime();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setStep(4);
    setCurrentStoryPage(0);
  };

  const speakText = (text) => {
    if (isSpeaking) {
      narrator.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    narrator.speak(text, 'NARRATOR', () => {
      setIsSpeaking(false);
    });
  };

  const handlePrintCertificate = () => {
    soundFX.playSuccessFanfare();
    confetti({ particleCount: 100, spread: 90 });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm select-none font-['Fredoka',sans-serif]">
      <div className="bg-white border-4 border-amber-300 rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative animate-scale-up">
        
        {/* MODAL TOP HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-100 via-rose-100 to-indigo-100 border-b-2 border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-xl shadow-sm">
              ✨
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 leading-tight">Story Creator Studio</h2>
              <p className="text-xs font-semibold text-slate-600">
                {step < 4 ? `Step ${step} of 3: Craft Your Magical Tale` : '📖 Your Custom Storybook is Ready!'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              narrator.cancel();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">

          {/* STEP 1: CHOOSE HERO */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-1">
                <span className="text-3xl">🦸</span>
                <h3 className="text-lg font-black text-slate-800">Who is the brave hero of your story?</h3>
                <p className="text-xs text-slate-500">Pick the main character for your adventure!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HEROES.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedHero(h);
                    }}
                    className={`p-4 rounded-3xl border-3 flex items-center gap-3.5 cursor-pointer transition-all duration-200 ${
                      selectedHero.id === h.id
                        ? 'bg-amber-50 border-amber-400 shadow-md scale-102 ring-2 ring-amber-300'
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center text-3xl shadow-sm shrink-0`}>
                      {h.emoji}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800 text-sm">{h.name}</span>
                      <span className="text-xs font-bold text-amber-700">{h.trait}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Choose World</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE WORLD */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-1">
                <span className="text-3xl">🌍</span>
                <h3 className="text-lg font-black text-slate-800">Where does the adventure take place?</h3>
                <p className="text-xs text-slate-500">Select the whimsical setting for your tale!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WORLDS.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedWorld(w);
                    }}
                    className={`p-4 rounded-3xl border-3 flex flex-col gap-1.5 cursor-pointer transition-all duration-200 ${
                      selectedWorld.id === w.id
                        ? `${w.bg} shadow-md scale-102 ring-2 ring-blue-300`
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{w.emoji}</span>
                      <span className="font-black text-slate-800 text-sm">{w.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setStep(1);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setStep(3);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Quest & Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: QUEST & MORAL */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1.5">
                  <span>🎯 Choose the Magical Quest:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUESTS.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedQuest(q);
                      }}
                      className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 cursor-pointer text-xs font-bold transition-all ${
                        selectedQuest.id === q.id
                          ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm ring-1 ring-rose-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl">{q.emoji}</span>
                      <span>{q.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1.5">
                  <span>❤️ Choose the Story Superpower (Moral):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MORALS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedMoral(m);
                      }}
                      className={`p-3 rounded-2xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                        selectedMoral.id === m.id
                          ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm ring-1 ring-amber-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-black">
                        <span>{m.emoji}</span>
                        <span>{m.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">{m.lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author name input */}
              <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-sky-900 shrink-0">✍️ Story Author Name:</span>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-white border border-sky-300 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter your name..."
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setStep(2);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleGenerateStory}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white font-black text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>✨ Bring My Story to Life!</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GENERATED STORYBOOK VIEWER */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              {/* Story Book Paper Spread */}
              <div className="bg-amber-50/90 border-4 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-inner relative flex flex-col justify-between min-h-[300px]">
                
                {/* Chapter & Page Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-200 text-amber-950 font-black text-[10px] rounded-full uppercase">
                      {storyPages[currentStoryPage].chapter}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Author: {authorName || 'Young Explorer'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakText(storyPages[currentStoryPage].text)}
                      className={`p-2 rounded-full border shadow-sm transition-all cursor-pointer ${
                        isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-700 hover:bg-amber-100'
                      }`}
                      title="Read Page Aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Illustration Badge */}
                <div className="my-4 py-3 flex items-center justify-center gap-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-4xl animate-bounce duration-1000">
                    {storyPages[currentStoryPage].sceneEmoji}
                  </span>
                </div>

                {/* Chapter Story Text */}
                <div className="flex flex-col gap-2 my-2">
                  <h4 className="text-base font-black text-amber-950">
                    {storyPages[currentStoryPage].title}
                  </h4>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {storyPages[currentStoryPage].text}
                  </p>
                </div>

                {/* Page Navigation & Flip Controls */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-amber-200 mt-auto">
                  <button
                    disabled={currentStoryPage === 0}
                    onClick={() => {
                      soundFX.playPageFlip();
                      setCurrentStoryPage(prev => Math.max(0, prev - 1));
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                      currentStoryPage === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-white text-slate-700 hover:bg-amber-100 cursor-pointer shadow-xs'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <span className="text-xs font-black text-amber-900">
                    Page {currentStoryPage + 1} of {storyPages.length}
                  </span>

                  <button
                    disabled={currentStoryPage === storyPages.length - 1}
                    onClick={() => {
                      soundFX.playPageFlip();
                      setCurrentStoryPage(prev => Math.min(storyPages.length - 1, prev + 1));
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                      currentStoryPage === storyPages.length - 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-white text-slate-700 hover:bg-amber-100 cursor-pointer shadow-xs'
                    }`}
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Print Certificate & Create Another */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setStep(1);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Create Another Story</span>
                </button>

                <button
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Young Author Award 🏆</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
