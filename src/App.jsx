import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import Navbar from './components/Navbar';
import StorybookFrame from './components/StorybookFrame';
import SceneControls from './components/SceneControls';
import InteractivePanel from './components/InteractivePanel';
import StoryChapterMap from './components/StoryChapterMap';
import HomePage from './components/HomePage';
import CuteStoryChatbot from './components/CuteStoryChatbot';
import WordMagicModal from './components/WordMagicModal';
import ColoringEaselModal from './components/ColoringEaselModal';
import TrophyChestModal, { BADGES_LIST } from './components/TrophyChestModal';
import MemoryGameModal from './components/MemoryGameModal';
import VoiceRecorderWidget from './components/VoiceRecorderWidget';
import BedtimeCalmOverlay from './components/BedtimeCalmOverlay';
import { WORD_MAGIC_DICTIONARY } from './data/wordMagicData';

import { STORY_SCENES } from './data/storyData';
import { SECRET_CAVE_SCENES } from './data/secretCaveData';
import { DOLLY_STORY_SCENES } from './data/dollyStoryData';
import { ROCKET_STORY_SCENES } from './data/rocketStoryData';
import { BEAR_STORY_SCENES } from './data/bearStoryData';
import { STORY_LIBRARY } from './data/storyLibraryData';
import { soundFX } from './services/soundEffects';
import { narrator } from './services/narratorService';

const ALL_STORY_SCENES = {
  'dolly-midnight-adventure': DOLLY_STORY_SCENES,
  'secret-cave': SECRET_CAVE_SCENES,
  'bottle-that-waited': STORY_SCENES,
  'curious-rocket': ROCKET_STORY_SCENES,
  'bear-lost-pencil': BEAR_STORY_SCENES
};

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'reader'
  const [activeStoryId, setActiveStoryId] = useState('dolly-midnight-adventure');
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(false);

  const activeStoryObj = STORY_LIBRARY.find(s => s.id === activeStoryId) || STORY_LIBRARY[0];
  const currentStoryScenes = ALL_STORY_SCENES[activeStoryId] || STORY_SCENES;

  const [soundMuted, setSoundMuted] = useState(false);
  const [narratorEnabled, setNarratorEnabled] = useState(true);

  // Educational Learning Feature States
  const [isBedtimeMode, setIsBedtimeMode] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [unlockedBadges, setUnlockedBadges] = useState(['story-explorer']);
  const [learnedWords, setLearnedWords] = useState([]);

  // Modals
  const [activeWordMagic, setActiveWordMagic] = useState(null);
  const [showEaselModal, setShowEaselModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showMemoryGameModal, setShowMemoryGameModal] = useState(false);

  // FX & Animation States
  const [bottleState, setBottleState] = useState('happy');
  const [showSparkle, setShowSparkle] = useState(false);
  const [showRocketLaunch, setShowRocketLaunch] = useState(false);
  const [waterStep, setWaterStep] = useState(0);

  const autoPlayTimeoutRef = useRef(null);

  const currentScene = currentStoryScenes.find(s => s.id === currentSceneId) || currentStoryScenes[0];
  const currentSentences = currentScene.sentences || [];

  // Safely clamp sentence index within bounds
  const safeSentenceIndex = Math.min(currentSentenceIndex, Math.max(0, currentSentences.length - 1));
  const currentSentence = currentSentences[safeSentenceIndex] || currentSentences[0];

  // Unlock badge helper
  const unlockBadge = (badgeId) => {
    setUnlockedBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      soundFX.playStoryChime();
      return [...prev, badgeId];
    });
  };

  // Track word learning for Word Wizard badge
  const handleWordLearned = (word) => {
    setLearnedWords(prev => {
      if (prev.includes(word)) return prev;
      const updated = [...prev, word];
      if (updated.length >= 3) {
        unlockBadge('word-wizard');
      }
      return updated;
    });
  };

  // Handle sentence speech narration & auto-play progression
  useEffect(() => {
    if (!currentSentence) return;

    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);

    // Apply mood from sentence screenState
    if (currentSentence.screenState?.bottleMood) {
      setBottleState(currentSentence.screenState.bottleMood);
    }

    // Trigger special sound FX for sentence
    if (currentSentence.screenState?.overlayEmoji === '🔔' || currentSentence.text?.includes('🔔')) {
      soundFX.playSchoolBell();
    } else if (currentSentence.speaker === 'SFX') {
      soundFX.playPop();
    } else if (currentSentence.screenState?.animation === 'rocket') {
      soundFX.playRocketWhoosh();
      setShowRocketLaunch(true);
      setTimeout(() => setShowRocketLaunch(false), 600);
      unlockBadge('space-cadet');
    } else if (currentSentence.screenState?.animation === 'sparkle') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
    }

    // Speak sentence with fallback safety callback for Auto-Play Mode
    if (narratorEnabled) {
      narrator.speakSentence(currentSentence, () => {
        if (isAutoPlayActive) {
          autoPlayTimeoutRef.current = setTimeout(() => {
            handleNextSentenceAuto();
          }, 1200);
        }
      });
    } else if (isAutoPlayActive) {
      const timerMs = Math.max(2500, currentSentence.text.length * 80);
      autoPlayTimeoutRef.current = setTimeout(() => {
        handleNextSentenceAuto();
      }, timerMs);
    }
  }, [currentSceneId, safeSentenceIndex, narratorEnabled, isAutoPlayActive]);

  const handleNextSentenceAuto = () => {
    if (safeSentenceIndex < currentSentences.length - 1) {
      setCurrentSentenceIndex(safeSentenceIndex + 1);
    } else if (currentSceneId < currentStoryScenes.length) {
      setCurrentSceneId(prev => prev + 1);
      setCurrentSentenceIndex(0);
    } else {
      unlockBadge('story-master');
    }
  };

  const handleNextSentence = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (safeSentenceIndex < currentSentences.length - 1) {
      setCurrentSentenceIndex(safeSentenceIndex + 1);
    } else {
      handleNextScene();
    }
  };

  const handlePrevSentence = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (safeSentenceIndex > 0) {
      setCurrentSentenceIndex(safeSentenceIndex - 1);
    } else if (currentSceneId > 1) {
      setCurrentSceneId(prev => prev - 1);
      const prevSceneSentences = (currentStoryScenes.find(s => s.id === currentSceneId - 1) || {}).sentences || [];
      setCurrentSentenceIndex(Math.max(0, prevSceneSentences.length - 1));
    }
  };

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    soundFX.setMuted(nextMuted);
  };

  const handleToggleNarrator = () => {
    const enabled = narrator.toggleEnabled();
    setNarratorEnabled(enabled);
    if (!enabled) {
      narrator.cancel();
    } else if (currentSentence) {
      narrator.speakSentence(currentSentence);
    }
  };

  const handleToggleAutoPlay = () => {
    setIsAutoPlayActive(prev => {
      const next = !prev;
      if (next) {
        soundFX.playStoryChime();
        if (!narratorEnabled) setNarratorEnabled(true);
        if (currentSentence) {
          narrator.speakSentence(currentSentence);
        }
      } else {
        if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      }
      return next;
    });
  };

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [checklistState, setChecklistState] = useState({
    books: false,
    pencil: false,
    lunchbox: false,
    bottle: false
  });

  const handleChecklistToggle = (itemKey) => {
    soundFX.playPop();
    setChecklistState(prev => {
      const next = { ...prev, [itemKey]: !prev[itemKey] };
      if (Object.values(next).every(Boolean)) {
        soundFX.playSparkle();
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 500);
        if (narratorEnabled) {
          narrator.speak("Awesome! Everything is packed and ready!", 'NARRATOR');
        }
      }
      return next;
    });
  };

  // Reset quiz state when scene changes
  useEffect(() => {
    setWaterStep(0);
  }, [currentSceneId]);

  const handleQuizSelect = (quizOption) => {
    soundFX.playPop();
    setSelectedQuizAnswers(prev => ({ ...prev, [currentSceneId]: quizOption.id }));

    // Kindness badge tracking for caring options
    if (quizOption.text?.toLowerCase().includes('stay') || quizOption.text?.toLowerCase().includes('help')) {
      unlockBadge('kindness-hero');
    }

    if (quizOption.isCorrect) {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Great job! You answered correctly!", 'NARRATOR');
      }
    }
  };

  // Direct click interaction on stage objects
  const handleCanvasObjectClick = (objectType) => {
    if (objectType === 'bottle') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      const moods = ['happy', 'excited', 'hopeful', 'refilled'];
      const nextMood = moods[(moods.indexOf(bottleState) + 1) % moods.length];
      setBottleState(nextMood);
      if (narratorEnabled && currentSentence) {
        narrator.speakSentence(currentSentence);
      }
    } else if (objectType === 'aarav') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Hi there! Ready to turn the page?", 'AARAV');
      }
    } else if (objectType === 'clock') {
      soundFX.playSchoolBell();
    } else if (objectType === 'window') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
    } else if (currentSceneId === 8) {
      if (objectType === 'tap' && waterStep === 0) {
        setWaterStep(1);
        soundFX.playWaterGlug();
      } else if (objectType === 'bottle' && waterStep === 1) {
        setWaterStep(2);
        soundFX.playWaterGlug();
      } else if (objectType === 'cap' && waterStep === 2) {
        setWaterStep(3);
        soundFX.playSparkle();
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 600);
      }
    }
  };

  const handleNextScene = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (currentSceneId < currentStoryScenes.length) {
      setCurrentSceneId(prev => prev + 1);
      setCurrentSentenceIndex(0);
    } else {
      unlockBadge('story-master');
    }
  };

  const handlePrevScene = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (currentSceneId > 1) {
      setCurrentSceneId(prev => prev - 1);
      setCurrentSentenceIndex(0);
    }
  };

  const handleSelectStory = (storyId) => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    setActiveStoryId(storyId);
    setCurrentSceneId(1);
    setCurrentSentenceIndex(0);
    setIsAutoPlayActive(false);
    setActiveView('reader');
    soundFX.playSparkle();
    unlockBadge('story-explorer');
  };

  const handleGoHome = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    setIsAutoPlayActive(false);
    setActiveView('home');
  };

  // Render text with interactive Word Magic Explorer sparkler buttons
  const renderInteractiveText = (text) => {
    if (!text) return null;
    const words = text.split(/(\s+)/);

    return words.map((w, idx) => {
      const cleanWord = w.toLowerCase().replace(/[^a-z]/g, '');
      const isMagicWord = !!WORD_MAGIC_DICTIONARY[cleanWord];

      if (isMagicWord) {
        return (
          <span key={idx} className="inline-flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playSparkle();
                setActiveWordMagic(cleanWord);
              }}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-lg bg-amber-300 hover:bg-amber-400 text-amber-950 font-black border border-amber-400/80 shadow-2xs hover:scale-105 transition-all cursor-pointer"
              title={`Click to explore word magic for "${cleanWord}"!`}
            >
              <span>{w}</span>
              <span className="text-xs">✨</span>
            </button>
          </span>
        );
      }

      return <span key={idx}>{w}</span>;
    });
  };

  if (activeView === 'home') {
    return (
      <div className="flex flex-col min-h-screen relative">
        <BedtimeCalmOverlay isActive={isBedtimeMode} />
        <HomePage onSelectStory={handleSelectStory} />
        <CuteStoryChatbot onSelectStory={handleSelectStory} />

        {/* Floating Educational Feature Modals */}
        {activeWordMagic && (
          <WordMagicModal
            wordKey={activeWordMagic}
            onClose={() => setActiveWordMagic(null)}
            onWordLearned={handleWordLearned}
          />
        )}
        {showEaselModal && (
          <ColoringEaselModal
            onClose={() => setShowEaselModal(false)}
            onDrawingSaved={() => unlockBadge('little-artist')}
          />
        )}
        {showBadgesModal && (
          <TrophyChestModal
            unlockedBadges={unlockedBadges}
            onClose={() => setShowBadgesModal(false)}
          />
        )}
        {showMemoryGameModal && (
          <MemoryGameModal
            onClose={() => setShowMemoryGameModal(false)}
            onGameWon={() => unlockBadge('word-wizard')}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between relative text-slate-800 font-['Fredoka',sans-serif] selection:bg-amber-300 overflow-x-hidden pb-6 transition-colors duration-1000 ${isBedtimeMode
        ? 'bg-gradient-to-b from-indigo-950 via-slate-900 via-60% to-purple-950 text-slate-100'
        : 'bg-gradient-to-b from-sky-200 via-amber-50 via-60% to-sky-100'
      }`}>

      {/* Bedtime Atmosphere Overlay */}
      <BedtimeCalmOverlay isActive={isBedtimeMode} />

      <Navbar
        currentSceneId={currentSceneId}
        totalScenes={currentStoryScenes.length}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        narratorEnabled={narratorEnabled}
        onToggleNarrator={handleToggleNarrator}
        isAutoPlayActive={isAutoPlayActive}
        onToggleAutoPlay={handleToggleAutoPlay}
        onGoHome={handleGoHome}
        activeStoryTitle={activeStoryObj.title}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenEasel={() => setShowEaselModal(true)}
        onOpenMemoryGame={() => setShowMemoryGameModal(true)}
        isBedtimeMode={isBedtimeMode}
        onToggleBedtimeMode={() => setIsBedtimeMode(prev => !prev)}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
        unlockedBadgesCount={unlockedBadges.length}
      />

      <main className="w-full max-w-7xl mx-auto flex-1 p-3 md:p-6 flex flex-col gap-6 items-stretch z-10">

        {/* FULLSCREEN 3D OPEN STORYBOOK WRAPPER */}
        <div className={`backdrop-blur-md p-3 md:p-5 w-full rounded-[2.5rem] border-4 shadow-2xl relative flex flex-col ${isBedtimeMode ? 'bg-slate-900/90 border-indigo-500' : 'bg-white/80 border-sky-300'
          }`}>

          {/* ALWAYS SIDE-BY-SIDE 2-PAGE OPEN STORYBOOK SPREAD */}
          <div className="grid grid-cols-12 gap-0 items-stretch w-full flex-1 min-h-0 relative rounded-xl overflow-hidden shadow-2xl">

            {/* LEFT PAGE: PICTURE STORYBOOK ILLUSTRATION */}
            <div className="col-span-6 h-full min-h-0 flex flex-col justify-center relative overflow-hidden">
              <StorybookFrame
                scene={currentScene}
                activeStoryId={activeStoryId}
                currentSentence={currentSentence}
                bottleState={bottleState}
                showSparkle={showSparkle}
                showRocketLaunch={showRocketLaunch}
                waterStationStep={waterStep}
                onTapObject={handleCanvasObjectClick}
              />
            </div>

            {/* REALISTIC SUNKEN BOOK SPINE / GUTTER */}
            <div className="block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none book-spine-gutter shadow-2xl" />

            {/* RIGHT PAGE: AUTHENTIC PRINTED STORY READING PAGE */}
            <div className="col-span-6 parchment-page rounded-r-3xl rounded-l-none border-y-4 border-r-8 border-l-2 border-amber-700 p-3 md:p-4 shadow-2xl flex flex-col justify-between gap-3 relative select-none book-paper-stack-right overflow-y-auto">

              {/* COMPACT CHAPTER & SPEAKER HEADER */}
              <div className="flex items-center justify-between pb-1 font-['Fredoka',sans-serif]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-2.5 py-1 rounded-full shadow-sm shrink-0 flex items-center gap-1">
                    📖 {currentSentence?.speaker === 'LILY' ? '🎀 Lily Doll' : currentSentence?.speaker === 'GIRL' ? '👧 Little Girl' : currentSentence?.speaker === 'RABBIT' ? '🐰 Teacup Rabbit' : currentSentence?.speaker === 'MILO' ? '🦊 Milo' : currentSentence?.speaker === 'TOBY' ? '🐰 Toby' : currentSentence?.speaker === 'ROCKY' ? '🚀 Rocky' : currentSentence?.speaker === 'COMET' ? '☄️ Starry' : currentSentence?.speaker === 'BENNY' ? '🐻 Benny Bear' : currentSentence?.speaker === 'BOTTLE' ? '💧 Buddy' : currentSentence?.speaker === 'AARAV' ? '👦 Aarav' : 'NARRATOR'}
                  </span>
                  <h2 className="text-sm font-bold text-slate-800 tracking-tight truncate">
                    {currentScene.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-950 shrink-0">
                    Line {safeSentenceIndex + 1}/{currentSentences.length}
                  </span>
                  <button className="bg-sky-100 p-1.5 rounded-full text-sky-600 hover:bg-sky-200 shadow-sm border border-sky-200" onClick={() => {
                    if (currentSentence && narratorEnabled) narrator.speakSentence(currentSentence);
                  }}>
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* FULL PRINTED STORYBOOK CHAPTER TEXT BLOCK */}
              <div className="flex flex-col gap-2 font-['Fredoka',sans-serif] px-1">
                {currentSentences.map((sent, idx) => {
                  const isCurrent = idx === safeSentenceIndex;
                  return (
                    <p
                      key={sent.id || idx}
                      onClick={() => setCurrentSentenceIndex(idx)}
                      className={`cursor-pointer transition-all leading-snug ${isCurrent
                          ? 'text-lg font-bold text-slate-900'
                          : 'text-sm font-semibold text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      "{renderInteractiveText(sent.text)}"
                    </p>
                  );
                })}
              </div>

              {/* FULL CHAPTER NARRATION SUMMARY */}
              {currentScene.narration && (
                <div className="bg-pink-100 border border-pink-200 p-3 rounded-2xl flex flex-col gap-1.5 shadow-sm mt-1 mb-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-pink-500 text-white p-1 rounded-lg">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-rose-600">Chapter Summary</span>
                  </div>
                  <p className="text-[11.5px] font-semibold text-slate-700 leading-relaxed">
                    {renderInteractiveText(currentScene.narration)}
                  </p>
                </div>
              )}

              {/* SELECTIVE INTERACTIVE REFLECTION PANEL FOR CURRENT SCENE */}
              <InteractivePanel
                scene={currentScene}
                selectedQuizAnswer={selectedQuizAnswers[currentSceneId]}
                waterStep={waterStep}
                checklistState={checklistState}
                onQuizSelect={handleQuizSelect}
                onPlayFootstepAudio={() => soundFX.playFootsteps()}
                onObjectTap={handleCanvasObjectClick}
                onChecklistToggle={handleChecklistToggle}
              />

              {/* INTEGRATED PAGE TURN NAVIGATION CONTROLS */}
              <div className="pt-1 mt-auto font-['Fredoka',sans-serif]">
                <SceneControls
                  currentSceneId={currentSceneId}
                  totalScenes={currentStoryScenes.length}
                  currentSentence={currentSentence}
                  currentSentenceIndex={safeSentenceIndex}
                  totalSentences={currentSentences.length}
                  isAutoPlayActive={isAutoPlayActive}
                  onNextSentence={handleNextSentence}
                  onPrevSentence={handlePrevSentence}
                  onNextScene={handleNextScene}
                  onPrevScene={handlePrevScene}
                  onToggleAutoPlay={handleToggleAutoPlay}
                  onReplayNarration={() => {
                    if (currentSentence && narratorEnabled) {
                      narrator.speakSentence(currentSentence);
                    }
                  }}
                />
                {/* PAGE NUMBER AT BOTTOM OUTER CORNER */}
                <div className="flex justify-between items-center text-[10px] font-black text-amber-900/80 mt-1.5 px-1 pb-1">
                  <span>❖ STORY READING PAGE</span>
                  <span>PAGE {currentSceneId * 2} OF {currentStoryScenes.length * 2}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* SIDE-BY-SIDE STORYLINE CHAPTER TRAIL MAP */}
        <div className="w-full mt-1 shrink-0">
          <StoryChapterMap
            currentScene={currentScene}
            scenes={currentStoryScenes}
            currentSentenceIndex={safeSentenceIndex}
            onSelectScene={(sceneId) => {
              narrator.cancel();
              if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
              setCurrentSceneId(sceneId);
              setCurrentSentenceIndex(0);
            }}
          />
        </div>

        {/* CUTE STORYBUDDY CHATBOT FOR KIDS */}
        <CuteStoryChatbot onSelectStory={handleSelectStory} />

        {/* Floating Educational Feature Modals */}
        {activeWordMagic && (
          <WordMagicModal
            wordKey={activeWordMagic}
            onClose={() => setActiveWordMagic(null)}
            onWordLearned={handleWordLearned}
          />
        )}
        {showEaselModal && (
          <ColoringEaselModal
            onClose={() => setShowEaselModal(false)}
            onDrawingSaved={() => unlockBadge('little-artist')}
          />
        )}
        {showBadgesModal && (
          <TrophyChestModal
            unlockedBadges={unlockedBadges}
            onClose={() => setShowBadgesModal(false)}
          />
        )}
        {showMemoryGameModal && (
          <MemoryGameModal
            onClose={() => setShowMemoryGameModal(false)}
            onGameWon={() => unlockBadge('word-wizard')}
          />
        )}
      </main>
    </div>
  );
}
