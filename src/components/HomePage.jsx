import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, Play, Search, Heart, Gamepad2, Users, ChevronDown, MoveRight, BookHeart, Compass, Handshake, BrainCircuit, Trophy, Palette, Moon } from 'lucide-react';
import { STORY_LIBRARY } from '../data/storyLibraryData';
import { soundFX } from '../services/soundEffects';

export default function HomePage({
  onSelectStory = () => { },
  onOpenBadges = () => { },
  onOpenEasel = () => { },
  onOpenMemoryGame = () => { },
  onOpenStoryMaker = () => { },
  onOpenQuiz = () => { },
  onOpenCareCertificate = () => { },
  onOpenPuppetTheater = () => { },
  onOpenPassport = () => { },
  onOpenSoundscape = () => { },
  isBedtimeMode = false,
  onToggleBedtimeMode = () => { }
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [showParentModal, setShowParentModal] = useState(false);

  const categories = ['All Stories', 'Care & Empathy', 'Adventure & Science', 'Friendship & Honesty'];

  const filteredStories = STORY_LIBRARY.filter(s => {
    const matchesCat = selectedCategory === 'All Stories' || s.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.moral.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartStory = (storyOrId) => {
    try {
      soundFX.playStoryChime();
      soundFX.playPageFlip();
    } catch (e) {
      console.warn("Sound error:", e);
    }
    const storyId = typeof storyOrId === 'string' ? storyOrId : storyOrId?.id;
    if (storyId) {
      onSelectStory(storyId);
    }
  };

  return (
    <div
      className="min-h-screen w-full text-slate-800 font-['Fredoka',sans-serif] selection:bg-sky-200 overflow-x-hidden relative"
      style={{
        backgroundColor: '#fffdfa',
        backgroundImage: `
          radial-gradient(circle at 8% 18%, rgba(254, 240, 138, 0.5) 0%, transparent 28%),
          radial-gradient(circle at 92% 22%, rgba(244, 114, 182, 0.4) 0%, transparent 28%),
          radial-gradient(circle at 12% 70%, rgba(186, 230, 253, 0.5) 0%, transparent 32%),
          radial-gradient(circle at 88% 80%, rgba(216, 180, 254, 0.4) 0%, transparent 30%),
          radial-gradient(#f472b6 1.8px, transparent 1.8px),
          radial-gradient(#38bdf8 1.8px, transparent 1.8px),
          radial-gradient(#facc15 1.8px, transparent 1.8px)
        `,
        backgroundSize: 'auto, auto, auto, auto, 52px 52px, 52px 52px, 52px 52px',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 26px 26px, 13px 39px'
      }}
    >
      {/* CUTE AMBIENT FLOATING BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft pastel ambient glow orbs */}
        <div className="absolute top-28 left-[-4%] w-96 h-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse" />
        <div className="absolute top-[45%] right-[-5%] w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-[20%] left-[8%] w-[480px] h-[480px] rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute bottom-10 right-[12%] w-80 h-80 rounded-full bg-purple-200/35 blur-3xl" />

        {/* Cute floating whimsical stickers in margins */}
        <div className="hidden xl:block absolute top-[580px] left-8 text-2xl opacity-75 hover:scale-125 transition-transform" style={{ animation: 'bounce 3s infinite' }}>
          ⭐
        </div>
        <div className="hidden xl:block absolute top-[720px] left-12 text-xl opacity-60 animate-pulse">
          ✨
        </div>
        <div className="hidden 2xl:block absolute top-[880px] left-7 text-2xl opacity-65">
          🌸
        </div>
        <div className="hidden xl:block absolute top-[600px] right-10 text-2xl opacity-75" style={{ animation: 'bounce 4s infinite' }}>
          ☁️
        </div>
        <div className="hidden xl:block absolute top-[760px] right-14 text-xl opacity-65 animate-pulse">
          🎈
        </div>
        <div className="hidden 2xl:block absolute top-[920px] right-8 text-2xl opacity-70">
          🌈
        </div>
      </div>

      {/* TOP NAVIGATION BAR */}
      <nav className="w-full bg-white/95 backdrop-blur-md py-3 px-6 shadow-sm flex items-center justify-between sticky top-0 z-50">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => soundFX.playPop()}>
          <div className="text-3xl">📖</div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-rose-500 tracking-tight leading-none flex gap-0.5">
              <span className="text-blue-900">S</span>
              <span className="text-rose-500">T</span>
              <span className="text-blue-900">O</span>
              <span className="text-rose-500">R</span>
              <span className="text-amber-500">Y</span>
              <span className="text-emerald-500">V</span>
              <span className="text-amber-500">E</span>
              <span className="text-rose-500">R</span>
              <span className="text-emerald-500">S</span>
              <span className="text-purple-500">E</span>
            </h1>
            <span className="text-[10px] md:text-xs font-semibold text-slate-500 tracking-wide">
              Stories Today, Brighter Tomorrows
            </span>
          </div>
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-blue-600 border-b-2 border-blue-600 pb-1 pt-1 cursor-pointer"
          >
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
            Home
          </button>
          <button
            onClick={() => document.getElementById('featured-stories-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Stories
          </button>
          <button
            onClick={() => document.getElementById('activities-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            Activities
          </button>
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            Badges
          </button>
          <button
            onClick={() => {
              soundFX.playPop();
              setShowParentModal(true);
            }}
            className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer text-slate-600"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            For Parents
          </button>
        </div>

        {/* SEARCH & PROFILE */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium w-48 text-slate-600 placeholder:text-slate-400"
            />
          </div>
          <div
            onClick={() => {
              soundFX.playSparkle();
              onOpenBadges();
            }}
            className="flex items-center gap-1 cursor-pointer bg-slate-50 rounded-full pl-1 pr-2 py-1 border border-slate-200 hover:bg-slate-100 transition-colors"
            title="Click to view Badges & Trophies"
          >
            <div className="w-8 h-8 bg-rose-200 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-lg">
              👦
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden">
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero_background_1790269568860.png"
            alt="Welcome to Storyverse"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 pt-16 flex flex-col items-start justify-start">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-1">Welcome to</h2>
            <h1 className="text-6xl md:text-8xl font-black mb-4 flex gap-1 tracking-tight">
              <span className="text-blue-900 drop-shadow-md">S</span>
              <span className="text-blue-900 drop-shadow-md">T</span>
              <span className="text-blue-900 drop-shadow-md">O</span>
              <span className="text-rose-500 drop-shadow-md">R</span>
              <span className="text-amber-400 drop-shadow-md">Y</span>
              <span className="text-amber-500 drop-shadow-md">V</span>
              <span className="text-emerald-500 drop-shadow-md">E</span>
              <span className="text-rose-500 drop-shadow-md">R</span>
              <span className="text-purple-600 drop-shadow-md">S</span>
              <span className="text-purple-600 drop-shadow-md">E</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-800 leading-snug max-w-md drop-shadow-sm bg-white/30 backdrop-blur-sm p-2 rounded-xl">
              Interactive stories that spark imagination, <br />kindness and curiosity! ✨
            </p>

            {/* HERO ICONS ROW */}
            <div className="flex items-center gap-6 mt-8 flex-wrap bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/50 inline-flex">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">Read</span>
                  <span className="text-[10px] font-semibold text-slate-500">Engaging stories</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-600" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">Interact</span>
                  <span className="text-[10px] font-semibold text-slate-500">Make choices</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">Learn</span>
                  <span className="text-[10px] font-semibold text-slate-500">Life lessons</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-slate-800">Grow</span>
                  <span className="text-[10px] font-semibold text-slate-500">In empathy & kindness</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WAVY DIVIDER AT BOTTOM OF HERO */}
        <div className="absolute bottom-0 w-full leading-none z-20 translate-y-1">
          <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#fbfdf9"></path>
          </svg>
        </div>
      </section>

      {/* FILTER BAR OVERLAPPING WAVY DIVIDER */}
      <div className="relative z-30 flex justify-center -mt-8 mb-12 px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-full shadow-lg border border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(cat);
              }}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-bold transition-all cursor-pointer flex items-center gap-2 ${selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                }`}
            >
              {cat === 'All Stories' && <BookOpen className="w-4 h-4" />}
              {cat === 'Care & Empathy' && <Heart className="w-4 h-4 text-purple-500" />}
              {cat === 'Adventure & Science' && <Compass className="w-4 h-4 text-amber-500" />}
              {cat === 'Friendship & Honesty' && <Handshake className="w-4 h-4 text-emerald-500" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">

        {/* FEATURED STORIES SECTION */}
        <section id="featured-stories-section" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-amber-400 text-4xl">✨</span> Featured Stories
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-sm md:text-base ml-1">
                Jump into our most loved interactive adventures!
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => {
                  soundFX.playMagicChime();
                  onOpenStoryMaker();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs md:text-sm shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>✨ Story Creator</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playSparkle();
                  onOpenPassport();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs md:text-sm shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <span>📓 Passport</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playPop();
                  onOpenEasel();
                }}
                className="px-4 py-2 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs md:text-sm border border-rose-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <span>🎨 Draw & Color</span>
              </button>
              <button
                onClick={() => {
                  const target = filteredStories[0] || STORY_LIBRARY[0];
                  handleStartStory(target);
                }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 hover:from-blue-500 hover:to-rose-400 text-white font-black text-xs md:text-sm shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <span>Start Reading Now</span>
                <MoveRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* STORY CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => handleStartStory(story)}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
              >
                {/* STORY COVER IMAGE */}
                <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
                  {story.coverImage ? (
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${story.color} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500`}>
                      {story.coverEmoji}
                    </div>
                  )}

                  {/* FLOATING AGE BADGE */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200/50 shadow-sm flex items-center gap-1">
                    {story.ageGroup}
                  </div>
                </div>

                {/* STORY INFO CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                    {story.description}
                  </p>

                  {/* BOTTOM META & BUTTON */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {story.readingTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {story.chaptersCount} Ch.
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartStory(story);
                      }}
                      className={`px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1 hover:brightness-110 shadow-sm transition-all cursor-pointer ${story.id === 'dolly-midnight-adventure' ? 'bg-blue-500' :
                        story.id === 'secret-cave' ? 'bg-emerald-500' :
                          story.id === 'bottle-that-waited' ? 'bg-purple-500' :
                            story.id === 'curious-rocket' ? 'bg-amber-500' :
                              'bg-blue-500'
                        }`}
                    >
                      Start Reading <MoveRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE ACTIVITIES SECTION */}
        <section id="activities-section" className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-purple-500 text-3xl">🎮</span> Interactive Activities
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-sm ml-1">
                Explore fun creative games designed for curious minds!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Story Creator Studio */}
            <div
              onClick={() => {
                soundFX.playMagicChime();
                onOpenStoryMaker();
              }}
              className="bg-white rounded-3xl p-5 border-2 border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-start gap-2.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ✨
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">Story Creator Studio</h3>
                <p className="text-xs text-slate-500 mt-1">Pick heroes, worlds & quests to write, narrate, and print your custom tale!</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 mt-auto flex items-center gap-1">Create Story →</span>
            </div>


            {/* Reading Passport & Adventure Journal */}
            <div
              onClick={() => {
                soundFX.playSparkle();
                onOpenPassport();
              }}
              className="bg-white rounded-3xl p-5 border-2 border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-start gap-2.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📓
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">Reading Passport</h3>
                <p className="text-xs text-slate-500 mt-1">Personalize your explorer visa, collect story stamps, and print your passport.</p>
              </div>
              <span className="text-xs font-bold text-teal-600 mt-auto flex items-center gap-1">Open Passport →</span>
            </div>


            {/* Coloring Easel */}
            <div
              onClick={() => {
                soundFX.playPop();
                onOpenEasel();
              }}
              className="bg-white rounded-3xl p-5 border-2 border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-start gap-2.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎨
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">Coloring Easel</h3>
                <p className="text-xs text-slate-500 mt-1">Draw and color your favorite characters with rainbow brushes.</p>
              </div>
              <span className="text-xs font-bold text-rose-500 mt-auto flex items-center gap-1">Open Canvas →</span>
            </div>

          </div>
        </section>

        {/* EXPLORE BY THEME SECTION */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-emerald-500 text-3xl">🌱</span> Explore by Theme
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-sm ml-1">
                Find the perfect story for every mood and moment.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <div
              onClick={() => setSelectedCategory('Care & Empathy')}
              className="shrink-0 bg-rose-50 border border-rose-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">❤️</div>
              <span className="font-bold text-rose-900 text-sm">Empathy</span>
            </div>
            <div
              onClick={() => setSelectedCategory('Adventure & Science')}
              className="shrink-0 bg-sky-50 border border-sky-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🚀</div>
              <span className="font-bold text-sky-900 text-sm">Adventure</span>
            </div>
            <div
              onClick={() => setSelectedCategory('Friendship & Honesty')}
              className="shrink-0 bg-emerald-50 border border-emerald-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🤝</div>
              <span className="font-bold text-emerald-900 text-sm">Friendship</span>
            </div>
            <div
              onClick={() => {
                soundFX.playSparkle();
                onToggleBedtimeMode();
              }}
              className="shrink-0 bg-indigo-50 border border-indigo-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🌙</div>
              <span className="font-bold text-indigo-900 text-sm">Bedtime Calm</span>
            </div>
          </div>
        </section>

      </main>

      {/* PARENTS & EDUCATORS GUIDE MODAL */}
      {showParentModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-rose-200 flex flex-col gap-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">👨‍👩‍👧</span>
                <div>
                  <h3 className="text-lg font-black text-slate-800">For Parents & Educators</h3>
                  <p className="text-xs text-slate-500 font-medium">Storyverse Educational Philosophy</p>
                </div>
              </div>
              <button
                onClick={() => setShowParentModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-slate-600 leading-relaxed bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
              <p>
                🌸 <strong>Social & Emotional Growth:</strong> Each interactive story explores empathy, honesty, perseverance, and caring for everyday helpers.
              </p>
              <p>
                🎧 <strong>Multi-Sensory Learning:</strong> Web Speech narration, touchable character animations, and sound effects boost vocabulary retention.
              </p>
              <p>
                🛡️ <strong>100% Safe & Ad-Free:</strong> No third-party tracking, distraction-free environment for young readers.
              </p>
            </div>
            <button
              onClick={() => {
                soundFX.playSparkle();
                setShowParentModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm shadow-md cursor-pointer transition-all active:scale-95"
            >
              Start Reading With Kids 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
