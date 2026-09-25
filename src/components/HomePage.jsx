import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, Play, Search, Heart, Gamepad2, Users, ChevronDown, MoveRight, BookHeart, Compass, Handshake, BrainCircuit } from 'lucide-react';
import { STORY_LIBRARY } from '../data/storyLibraryData';
import { soundFX } from '../services/soundEffects';

export default function HomePage({ onSelectStory = () => { } }) {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');

  const categories = ['All Stories', 'Care & Empathy', 'Adventure & Science', 'Friendship & Honesty'];

  const filteredStories = selectedCategory === 'All Stories'
    ? STORY_LIBRARY
    : STORY_LIBRARY.filter(s => s.category === selectedCategory);

  const handleStartStory = (story) => {
    if (story.isAvailable) {
      soundFX.playStoryChime();
      onSelectStory(story.id);
    } else {
      soundFX.playPop();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fbfdf9] text-slate-800 font-['Fredoka',sans-serif] selection:bg-sky-200 overflow-x-hidden relative">

      {/* TOP NAVIGATION BAR */}
      <nav className="w-full bg-white py-3 px-6 shadow-sm flex items-center justify-between sticky top-0 z-50">
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
          <button className="flex items-center gap-1.5 text-blue-600 border-b-2 border-blue-600 pb-1 pt-1">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div> {/* Home icon placeholder */}
            Home
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <BookOpen className="w-4 h-4" />
            Stories
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Gamepad2 className="w-4 h-4" />
            Activities
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Heart className="w-4 h-4" />
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
              className="bg-transparent border-none outline-none text-sm font-medium w-48 text-slate-600 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-1 cursor-pointer bg-slate-50 rounded-full pl-1 pr-2 py-1 border border-slate-200 hover:bg-slate-100 transition-colors">
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
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-amber-400 text-4xl">⭐</span> Featured Stories
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-sm md:text-base ml-1">
                Jump into our most loved interactive adventures!
              </p>
            </div>
            <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 text-sm">
              View All Stories <MoveRight className="w-4 h-4" />
            </button>
          </div>

          {/* STORY CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* STORY COVER IMAGE */}
                <div
                  className="w-full h-48 bg-slate-100 relative cursor-pointer group"
                  onClick={() => handleStartStory(story)}
                >
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
                    {story.category === 'Care & Empathy' ? '🌸' : story.category === 'Adventure & Science' ? '⭐' : '🌿'}
                    {story.ageGroup}
                  </div>
                </div>

                {/* STORY INFO CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                    {story.description}
                  </p>

                  {/* BOTTOM META & BUTTON */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {story.readingTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {story.chaptersCount} Chapters
                      </span>
                    </div>

                    <button
                      onClick={() => handleStartStory(story)}
                      className={`px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all ${story.id === 'dolly-midnight-adventure' ? 'bg-blue-500' :
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
            <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 text-sm hidden sm:flex">
              View All Categories <MoveRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {/* Thematic pill cards placeholder to match design */}
            <div className="shrink-0 bg-blue-50 border border-blue-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🛏️</div>
              <span className="font-bold text-blue-900 text-sm">Bedtime</span>
            </div>
            <div className="shrink-0 bg-rose-50 border border-rose-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">❤️</div>
              <span className="font-bold text-rose-900 text-sm">Empathy</span>
            </div>
            <div className="shrink-0 bg-emerald-50 border border-emerald-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🌳</div>
              <span className="font-bold text-emerald-900 text-sm">Nature</span>
            </div>
            <div className="shrink-0 bg-purple-50 border border-purple-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🦸‍♀️</div>
              <span className="font-bold text-purple-900 text-sm">Courage</span>
            </div>
            <div className="shrink-0 bg-amber-50 border border-amber-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">😂</div>
              <span className="font-bold text-amber-900 text-sm">Funny</span>
            </div>
            <div className="shrink-0 bg-sky-50 border border-sky-100 rounded-[2rem] p-4 w-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🚀</div>
              <span className="font-bold text-sky-900 text-sm">Space</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}





