import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Volume2, Mic, MicOff, HelpCircle, Award, TrendingUp, Drama, BookMarked, Sparkles, ArrowLeft, ArrowRight, Play, Pause, X, Wrench } from 'lucide-react';
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
import StoryMakerModal from './components/StoryMakerModal';
import StoryQuizModal from './components/StoryQuizModal';
import CareCertificateModal from './components/CareCertificateModal';
import SoundboardWidget from './components/SoundboardWidget';
import SoundscapeMixerModal from './components/SoundscapeMixerModal';
import StickerStageModal from './components/StickerStageModal';
import ReadingPassportModal from './components/ReadingPassportModal';
import StoryArcModal from './components/StoryArcModal';
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
  const [showStoryMakerModal, setShowStoryMakerModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCareCertificateModal, setShowCareCertificateModal] = useState(false);
  const [showSoundscapeModal, setShowSoundscapeModal] = useState(false);
  const [showPuppetStageModal, setShowPuppetStageModal] = useState(false);
  const [showReadingPassportModal, setShowReadingPassportModal] = useState(false);
  const [showStoryArcModal, setShowStoryArcModal] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showToolsPanel, setShowToolsPanel] = useState(false);

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
    if (activeView !== 'reader') return;
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
  }, [activeView, currentSceneId, safeSentenceIndex, narratorEnabled, isAutoPlayActive]);

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
              <Sparkles className="w-3 h-3 text-amber-600" />
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
        <HomePage
          onSelectStory={handleSelectStory}
          onOpenBadges={() => setShowBadgesModal(true)}
          onOpenEasel={() => setShowEaselModal(true)}
          onOpenMemoryGame={() => setShowMemoryGameModal(true)}
          onOpenStoryMaker={() => setShowStoryMakerModal(true)}
          onOpenQuiz={() => setShowQuizModal(true)}
          onOpenCareCertificate={() => setShowCareCertificateModal(true)}
          onOpenPuppetTheater={() => setShowPuppetStageModal(true)}
          onOpenPassport={() => setShowReadingPassportModal(true)}
          onOpenSoundscape={() => setShowSoundscapeModal(true)}
          isBedtimeMode={isBedtimeMode}
          onToggleBedtimeMode={() => setIsBedtimeMode(prev => !prev)}
        />
        <CuteStoryChatbot onSelectStory={handleSelectStory} />

        {/* Global Sound Lab Synthesizer Foley Widget */}
        <SoundboardWidget onOpenSoundscapeMixer={() => setShowSoundscapeModal(true)} />

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
        {showStoryMakerModal && (
          <StoryMakerModal
            isOpen={showStoryMakerModal}
            onClose={() => setShowStoryMakerModal(false)}
          />
        )}
        {showQuizModal && (
          <StoryQuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showCareCertificateModal && (
          <CareCertificateModal
            isOpen={showCareCertificateModal}
            onClose={() => setShowCareCertificateModal(false)}
            storyTitle={activeStoryObj.title}
          />
        )}
        {showSoundscapeModal && (
          <SoundscapeMixerModal
            isOpen={showSoundscapeModal}
            onClose={() => setShowSoundscapeModal(false)}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showPuppetStageModal && (
          <StickerStageModal
            isOpen={showPuppetStageModal}
            onClose={() => setShowPuppetStageModal(false)}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showReadingPassportModal && (
          <ReadingPassportModal
            isOpen={showReadingPassportModal}
            onClose={() => setShowReadingPassportModal(false)}
            unlockedBadgesCount={unlockedBadges.length}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showStoryArcModal && (
          <StoryArcModal
            isOpen={showStoryArcModal}
            onClose={() => setShowStoryArcModal(false)}
            currentScene={currentScene}
            scenes={currentStoryScenes}
            currentSentenceIndex={safeSentenceIndex}
            onSelectSentence={setCurrentSentenceIndex}
            onSelectScene={(sId) => {
              setCurrentSceneId(sId);
              setCurrentSentenceIndex(0);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between relative text-slate-800 font-['Fredoka',sans-serif] selection:bg-sky-200 overflow-x-hidden pb-6 transition-colors duration-1000 ${isBedtimeMode
        ? 'bg-gradient-to-b from-indigo-950 via-slate-900 via-60% to-purple-950 text-slate-100'
        : ''
        }`}
      style={!isBedtimeMode ? {
        background: 'linear-gradient(160deg, #e0f2fe 0%, #f0fdf4 40%, #fef9c3 70%, #fce7f3 100%)'
      } : undefined}
    >

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
        onOpenStoryMaker={() => setShowStoryMakerModal(true)}
        onOpenQuiz={() => setShowQuizModal(true)}
        onOpenCareCertificate={() => setShowCareCertificateModal(true)}
        onOpenPuppetTheater={() => setShowPuppetStageModal(true)}
        onOpenPassport={() => setShowReadingPassportModal(true)}
        onOpenSoundscape={() => setShowSoundscapeModal(true)}
        unlockedBadgesCount={unlockedBadges.length}
      />

      <main className="w-full max-w-7xl mx-auto flex-1 p-3 md:p-5 flex flex-col gap-4 items-stretch z-10">

        {/* MAIN STORYBOOK CARD */}
        <div
          className={`w-full rounded-3xl relative flex flex-col overflow-hidden ${isBedtimeMode ? 'border-2 border-indigo-500' : ''}`}
          style={!isBedtimeMode ? {
            background: 'white',
            border: '2.5px solid #bae6fd',
            boxShadow: '0 8px 32px rgba(56,189,248,0.15), 0 2px 8px rgba(0,0,0,0.06)'
          } : { background: 'rgba(15,23,42,0.95)' }}
        >

          {/* ALWAYS SIDE-BY-SIDE 2-PAGE OPEN STORYBOOK SPREAD */}
          <div className="grid grid-cols-12 gap-0 items-stretch w-full flex-1 min-h-0 relative rounded-3xl overflow-hidden">

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

            {/* RIGHT PAGE: IMMERSIVE STORYBOOK PAGE */}
            <div
              className="col-span-6 flex flex-col relative select-none overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #fffef7 0%, #fdf9ee 60%, #faf5e4 100%)' }}
            >
              {/* CHAPTER HEADER — thin elegant stripe */}
              <div className="flex items-center justify-between px-5 pt-3.5 pb-3 border-b shrink-0" style={{ borderColor: '#f0e4c0' }}>
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full shrink-0"
                    style={{ background: '#fde68a', color: '#78350f', border: '1px solid #f59e0b' }}
                  >
                    Ch. {currentSceneId}
                  </span>
                  <span className="text-sm font-black text-slate-800 truncate max-w-[200px]">
                    {currentScene.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {safeSentenceIndex + 1} / {currentSentences.length}
                  </span>
                  <button
                    onClick={() => setShowToolsPanel(true)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all cursor-pointer hover:scale-110"
                    style={{ background: '#fde68a', border: '1px solid #f59e0b' }}
                    title="Open Story Tools"
                  >
                    🛠️
                  </button>
                </div>
              </div>

              {/* READING AREA */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 min-h-0">

                {/* Speaker label */}
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">
                    {currentSentence?.speaker === 'BOTTLE' ? '💧'
                      : currentSentence?.speaker === 'AARAV' ? '👦'
                      : currentSentence?.speaker === 'LILY' ? '🎀'
                      : currentSentence?.speaker === 'GIRL' ? '👧'
                      : currentSentence?.speaker === 'MILO' ? '🦊'
                      : currentSentence?.speaker === 'TOBY' ? '🐰'
                      : currentSentence?.speaker === 'ROCKY' ? '🚀'
                      : currentSentence?.speaker === 'BENNY' ? '🐻'
                      : '📖'}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    {currentSentence?.speaker === 'LILY' ? 'Lily Doll'
                      : currentSentence?.speaker === 'GIRL' ? 'Little Girl'
                      : currentSentence?.speaker === 'RABBIT' ? 'Teacup Rabbit'
                      : currentSentence?.speaker === 'MILO' ? 'Milo'
                      : currentSentence?.speaker === 'TOBY' ? 'Toby'
                      : currentSentence?.speaker === 'ROCKY' ? 'Rocky'
                      : currentSentence?.speaker === 'COMET' ? 'Starry'
                      : currentSentence?.speaker === 'BENNY' ? 'Benny Bear'
                      : currentSentence?.speaker === 'BOTTLE' ? 'Buddy'
                      : currentSentence?.speaker === 'AARAV' ? 'Aarav'
                      : 'Narrator'}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #f0e4c0, transparent)' }} />
                </div>

                {/* STORY SENTENCES — big, prominent, immersive */}
                <div className="flex flex-col gap-3 font-['Fredoka',sans-serif]">
                  {currentSentences.map((sent, idx) => {
                    const isCurrent = idx === safeSentenceIndex;
                    const isPast = idx < safeSentenceIndex;
                    return (
                      <p
                        key={sent.id || idx}
                        onClick={() => setCurrentSentenceIndex(idx)}
                        className={`cursor-pointer transition-all duration-300 leading-relaxed ${
                          isCurrent
                            ? 'text-xl md:text-2xl font-bold text-slate-900'
                            : isPast
                            ? 'text-sm font-medium text-slate-300 hover:text-slate-500'
                            : 'text-sm font-medium text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {isCurrent && <span className="text-amber-500 font-black text-2xl leading-none mr-0.5">“</span>}
                        {isCurrent ? renderInteractiveText(sent.text) : sent.text}
                        {isCurrent && <span className="text-amber-500 font-black text-2xl leading-none ml-0.5">”</span>}
                      </p>
                    );
                  })}
                </div>

                {/* INTERACTIVE REFLECTION PANEL */}
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

                {/* VOICE RECORDER */}
                {showVoiceRecorder && (
                  <div className="animate-fadeIn">
                    <VoiceRecorderWidget currentSentenceText={currentSentence?.text} />
                  </div>
                )}
              </div>

              {/* PAGE-TURN NAVIGATION */}
              <div
                className="shrink-0 px-5 py-3 flex items-center justify-between gap-2 border-t"
                style={{ background: 'rgba(253,246,224,0.85)', borderColor: '#f0e4c0' }}
              >
                {/* ← Prev */}
                <button
                  onClick={() => {
                    soundFX.playPageFlip();
                    if (safeSentenceIndex > 0) handlePrevSentence();
                    else if (currentSceneId > 1) handlePrevScene();
                  }}
                  disabled={currentSceneId === 1 && safeSentenceIndex === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-sm text-slate-600 hover:text-slate-900 hover:bg-amber-100 border transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  style={{ borderColor: '#e8d5a0' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">{safeSentenceIndex === 0 ? 'Prev' : 'Back'}</span>
                </button>

                {/* Center controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { soundFX.playPop(); setNarratorEnabled(p => !p); }}
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                    style={{ background: '#fff', borderColor: '#e8d5a0' }}
                    title={narratorEnabled ? 'Narrator On' : 'Narrator Off'}
                  >
                    {narratorEnabled
                      ? <Mic className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
                      : <MicOff className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />}
                  </button>

                  <button
                    onClick={() => { soundFX.playPop(); handleToggleAutoPlay(); }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-black text-xs border transition-all cursor-pointer ${
                      isAutoPlayActive ? 'animate-pulse' : ''
                    }`}
                    style={isAutoPlayActive
                      ? { background: '#6366f1', borderColor: '#4f46e5', color: 'white' }
                      : { background: '#fff', borderColor: '#e8d5a0', color: '#78350f' }
                    }
                  >
                    {isAutoPlayActive
                      ? <><Pause className="w-3 h-3 fill-current" /> Playing</>
                      : <><Play className="w-3 h-3 fill-current" /> Auto</>}
                  </button>

                  <span className="text-[11px] font-bold text-slate-400">
                    {currentSceneId} / {currentStoryScenes.length}
                  </span>
                </div>

                {/* Next → / Finish */}
                {(() => {
                  const isAtVeryEnd = currentSceneId === currentStoryScenes.length && safeSentenceIndex === currentSentences.length - 1;
                  return (
                    <button
                      onClick={() => {
                        soundFX.playPop();
                        if (isAtVeryEnd) {
                          unlockBadge('story-master');
                          soundFX.playSuccessFanfare();
                          handleGoHome();
                        } else if (safeSentenceIndex < currentSentences.length - 1) {
                          handleNextSentence();
                        } else {
                          soundFX.playPageFlip();
                          handleNextScene();
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-black text-sm text-white transition-all cursor-pointer ${
                        isAtVeryEnd ? 'animate-pulse' : ''
                      }`}
                      style={{
                        background: isAtVeryEnd
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : 'linear-gradient(135deg, #f59e0b, #d97706)',
                        boxShadow: isAtVeryEnd ? '0 3px 10px rgba(34,197,94,0.4)' : '0 3px 10px rgba(245,158,11,0.35)'
                      }}
                    >
                      <span className="hidden sm:inline text-xs">
                        {isAtVeryEnd ? 'Finish 🏠' : safeSentenceIndex < currentSentences.length - 1 ? 'Next Line' : 'Turn Page'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                })()}
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

        {/* FLOATING TOOLS PANEL */}
        {showToolsPanel && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
            style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowToolsPanel(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl p-5 w-full max-w-sm border-2 border-amber-200 font-['Fredoka',sans-serif]"
              style={{ animation: 'scaleUp 0.2s ease-out' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <span className="text-xl">🛠️</span> Story Tools
                </h3>
                <button
                  onClick={() => setShowToolsPanel(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { icon: '🏆', label: 'Badges', onClick: () => { setShowBadgesModal(true); setShowToolsPanel(false); } },
                  { icon: '🎨', label: 'Color', onClick: () => { setShowEaselModal(true); setShowToolsPanel(false); } },
                  { icon: '🃏', label: 'Game', onClick: () => { setShowMemoryGameModal(true); setShowToolsPanel(false); } },
                  { icon: '✨', label: 'Maker', onClick: () => { setShowStoryMakerModal(true); setShowToolsPanel(false); } },
                  { icon: '❓', label: 'Quiz', onClick: () => { setShowQuizModal(true); setShowToolsPanel(false); } },
                  { icon: '🏅', label: 'Award', onClick: () => { setShowCareCertificateModal(true); setShowToolsPanel(false); } },
                  { icon: '🎭', label: 'Puppet', onClick: () => { setShowPuppetStageModal(true); setShowToolsPanel(false); } },
                  { icon: '📓', label: 'Passport', onClick: () => { setShowReadingPassportModal(true); setShowToolsPanel(false); } },
                  { icon: '🎧', label: 'Mixer', onClick: () => { setShowSoundscapeModal(true); setShowToolsPanel(false); } },
                  { icon: '📊', label: 'Story Arc', onClick: () => { setShowStoryArcModal(true); setShowToolsPanel(false); } },
                  { icon: '🎤', label: 'Record', onClick: () => { setShowVoiceRecorder(p => !p); setShowToolsPanel(false); } },
                  { icon: '🔊', label: 'Read Aloud', onClick: () => { if (currentSentence && narratorEnabled) narrator.speakSentence(currentSentence); setShowToolsPanel(false); } },
                ].map((tool) => (
                  <button
                    key={tool.label}
                    onClick={() => { soundFX.playPop(); tool.onClick(); }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer active:scale-95"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-[10px] font-bold text-slate-700 text-center leading-tight">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
        {showStoryMakerModal && (
          <StoryMakerModal
            isOpen={showStoryMakerModal}
            onClose={() => setShowStoryMakerModal(false)}
          />
        )}
        {showQuizModal && (
          <StoryQuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showCareCertificateModal && (
          <CareCertificateModal
            isOpen={showCareCertificateModal}
            onClose={() => setShowCareCertificateModal(false)}
            storyTitle={activeStoryObj.title}
          />
        )}
        {showSoundscapeModal && (
          <SoundscapeMixerModal
            isOpen={showSoundscapeModal}
            onClose={() => setShowSoundscapeModal(false)}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showPuppetStageModal && (
          <StickerStageModal
            isOpen={showPuppetStageModal}
            onClose={() => setShowPuppetStageModal(false)}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showReadingPassportModal && (
          <ReadingPassportModal
            isOpen={showReadingPassportModal}
            onClose={() => setShowReadingPassportModal(false)}
            unlockedBadgesCount={unlockedBadges.length}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showStoryArcModal && (
          <StoryArcModal
            isOpen={showStoryArcModal}
            onClose={() => setShowStoryArcModal(false)}
            currentScene={currentScene}
            scenes={currentStoryScenes}
            currentSentenceIndex={safeSentenceIndex}
            onSelectSentence={setCurrentSentenceIndex}
            onSelectScene={(sId) => {
              setCurrentSceneId(sId);
              setCurrentSentenceIndex(0);
            }}
          />
        )}

        {/* Global Sound Lab Synthesizer Foley Widget */}
        <SoundboardWidget onOpenSoundscapeMixer={() => setShowSoundscapeModal(true)} />
      </main>
    </div>
  );
}
