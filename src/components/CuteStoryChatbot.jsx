import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageCircle, RefreshCw, X, Minimize2, Bot, Play, BookOpen, Compass, Heart, MessageSquare } from 'lucide-react';
import { STORY_LIBRARY } from '../data/storyLibraryData';
import { soundFX } from '../services/soundEffects';
import { narrator } from '../services/narratorService';

export default function CuteStoryChatbot({ onSelectStory = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there, little explorer! ✨ I'm StoryBuddy, your AI Story Wizard! Tell me what mood you are in or what you love, and I'll suggest the perfect story for you!",
      suggestions: [
        { label: "💖 Friendship Adventure", storyId: "secret-cave", text: "Read 'The Secret Cave' 🦊🐰" },
        { label: "🎀 Magical Doll Secret", storyId: "dolly-midnight-adventure", text: "Read 'Dolly's Midnight Adventure' 🎀✨" },
        { label: "🚀 Space Adventure", storyId: "curious-rocket", text: "Read 'The Little Rocket's Big Wish' 🚀⭐" }
      ],
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const moodChips = [
    { label: "🦊 True Friends", prompt: "I want a story about true best friends sticking together!" },
    { label: "🎀 Doll Secret", prompt: "I want a magical story about a doll coming alive at midnight!" },
    { label: "🚀 Space Rocket", prompt: "I want an exciting story about space and stars!" },
    { label: "🎨 Rainbow Art", prompt: "I want a creative story about sharing and drawing!" },
    { label: "😂 Tell a Joke", prompt: "Tell me a funny joke!" }
  ];

  const getBotAnalysis = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes('friend') || text.includes('milo') || text.includes('toby') || text.includes('fox') || text.includes('rabbit') || text.includes('cave')) {
      return {
        text: "Ooh! Based on your love for true friendship, I strongly recommend 🦊🐰 **'The Secret Cave'**! Milo the fox ran back through heavy rocks to save his best friend Toby. True friends never leave each other behind!",
        suggestions: [
          { label: "📖 Start Reading 'The Secret Cave'", storyId: "secret-cave", text: "Open 'The Secret Cave' 🌲" },
          { label: "✨ Show me another story!", prompt: "What else do you recommend?" }
        ]
      };
    } else if (text.includes('doll') || text.includes('dolly') || text.includes('lily') || text.includes('midnight') || text.includes('magic') || text.includes('secret')) {
      return {
        text: "✨ You are going to love 🎀 **'Dolly's Midnight Adventure'**! Lily the doll comes alive every midnight, finds a golden key 🗝️, and sails a toy boat to the Castle of Lost Toys 🏰!",
        suggestions: [
          { label: "📖 Open 'Dolly's Midnight Adventure'", storyId: "dolly-midnight-adventure", text: "Open 'Dolly's Adventure' 🎀" },
          { label: "🌟 Pick a different story", prompt: "Give me another recommendation!" }
        ]
      };
    } else if (text.includes('rocket') || text.includes('space') || text.includes('star') || text.includes('fly')) {
      return {
        text: "🚀 Blast off! You should check out 🚀 **'The Little Rocket's Big Wish'**! Rocky zooms past the moon 🌙 and helps Starry the lost comet find her glowing tail across the galaxy!",
        suggestions: [
          { label: "🚀 Read 'The Little Rocket's Big Wish'", storyId: "curious-rocket", text: "Open 'Little Rocket' 🚀" }
        ]
      };
    } else if (text.includes('draw') || text.includes('art') || text.includes('bear') || text.includes('benny') || text.includes('pencil') || text.includes('rainbow')) {
      return {
        text: "🎨 How wonderful! I suggest ✏️ **'Benny Bear & The Magic Pencil'**! Benny uses his golden magic pencil to draw rainbow doodles and build a glowing rainbow bridge 🌈 with his friends!",
        suggestions: [
          { label: "🎨 Read 'Benny Bear & The Magic Pencil'", storyId: "bear-lost-pencil", text: "Open 'Benny Bear' 🐻" }
        ]
      };
    } else if (text.includes('water') || text.includes('bottle') || text.includes('aarav') || text.includes('care') || text.includes('empathy')) {
      return {
        text: "💧 A warm story about everyday helpers! You will love 💧 **'The Bottle That Waited'**! Buddy the blue water bottle waits patiently in the quiet room for Aarav after the home bell rings!",
        suggestions: [
          { label: "📖 Read 'The Bottle That Waited'", storyId: "bottle-that-waited", text: "Open 'Buddy Bottle' 💧" }
        ]
      };
    } else if (text.includes('joke') || text.includes('funny') || text.includes('silly')) {
      const jokes = [
        "Why did the teddy bear say no to dessert? Because he was already stuffed! 🧸😂",
        "What do you call a sleeping dinosaur? A dino-snore! 🦕💤",
        "Why did the astronaut rocket bring a pencil to space? To draw stars! 🚀✏️",
        "What does a rabbit use to brush its fur? A hare-brush! 🐰✨"
      ];
      return {
        text: jokes[Math.floor(Math.random() * jokes.length)],
        suggestions: [
          { label: "📚 Now recommend a story!", prompt: "Which story should I read?" },
          { label: "😂 Tell me another joke!", prompt: "Tell me a silly joke!" }
        ]
      };
    } else {
      return {
        text: "🌟 I can match you with the perfect story! Are you looking for a story about **True Friendship** 🦊, **Magical Doll Secrets** 🎀, **Space Exploration** 🚀, or **Rainbow Art** 🎨?",
        suggestions: [
          { label: "🦊 True Friendship Story", storyId: "secret-cave", text: "Open 'The Secret Cave'" },
          { label: "🎀 Magical Doll Quest", storyId: "dolly-midnight-adventure", text: "Open 'Dolly's Adventure'" },
          { label: "🚀 Space Rocket Quest", storyId: "curious-rocket", text: "Open 'Little Rocket'" }
        ]
      };
    }
  };

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    soundFX.playPop();

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      soundFX.playSparkle();
      const botResponse = getBotAnalysis(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.text,
        suggestions: botResponse.suggestions || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // Voice read aloud
      narrator.speak(botResponse.text.replace(/[*_#]/g, ''), 'BOTTLE');
    }, 700);
  };

  const toggleOpen = () => {
    if (!isOpen) {
      soundFX.playSparkle();
      setShowTooltip(false);
    } else {
      soundFX.playPop();
    }
    setIsOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none font-['Fredoka',sans-serif]">

      {/* FLOATING SIDE EMOJI TRIGGER BUTTON WITH TOOLTIP */}
      <div className="flex items-center gap-3 justify-end">

        {/* CUTE TOOLTIP SPEECH BUBBLE (WHEN CLOSED) */}
        {!isOpen && showTooltip && (
          <div className="bg-white text-slate-800 text-xs font-black px-3.5 py-2 rounded-2xl shadow-xl border-3 border-sky-400 animate-bounce whitespace-nowrap flex items-center gap-1.5 z-40">
            <span>Ask AI Story Buddy! 🧙‍♂️✨</span>
          </div>
        )}

        {/* SIDE EMOJI BUTTON */}
        <button
          onClick={toggleOpen}
          title="Open AI Story Buddy Chatbot 🧙‍♂️✨"
          className="w-15 h-15 bg-gradient-to-tr from-sky-400 via-pink-400 to-amber-300 text-white rounded-full flex items-center justify-center text-3xl shadow-2xl border-4 border-white cursor-pointer hover:scale-110 active:scale-95 transition-all animate-bounce ring-4 ring-sky-300/80 shrink-0"
        >
          {isOpen ? '❌' : '🧙‍♂️'}
        </button>
      </div>

      {/* POPUP CHATBOT MODAL WINDOW (OPENS WHEN CLICKED) */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 w-92 md:w-96 max-w-[92vw] bg-gradient-to-r from-sky-100 via-pink-50 to-amber-100 border-4 border-sky-300 rounded-[2.5rem] p-4 shadow-2xl z-50 flex flex-col gap-3 animate-gentle-bounce">

          {/* CHATBOT POPUP HEADER */}
          <div className="flex items-center justify-between border-b-2 border-sky-200/80 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 via-pink-400 to-amber-300 rounded-xl flex items-center justify-center text-2xl shadow-md border border-white animate-wiggle">
                🧙‍♂️
              </div>
              <div>
                <h3 className="text-sm font-black text-sky-950 flex items-center gap-1.5">
                  <span>StoryBuddy AI</span>
                  <span className="text-[10px] bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full border border-amber-400 shadow-2xs">
                    ✨ Story Wizard
                  </span>
                </h3>
                <p className="text-[10px] font-bold text-sky-800">
                  Ask me for a personalized story recommendation!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFX.playPop();
                  setMessages([
                    {
                      id: Date.now(),
                      sender: 'bot',
                      text: "Hi again, little explorer! 💧✨ Tell me what story mood you want today!",
                      suggestions: [
                        { label: "💖 Friendship Adventure", storyId: "secret-cave", text: "Read 'The Secret Cave' 🦊" },
                        { label: "🎀 Doll Secret", storyId: "dolly-midnight-adventure", text: "Read 'Dolly's Adventure' 🎀" }
                      ],
                      time: 'Just now'
                    }
                  ]);
                }}
                className="p-1.5 bg-white hover:bg-sky-200 text-sky-900 rounded-xl border border-sky-300 shadow-2xs active:scale-95 transition-transform"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleOpen}
                className="p-1.5 bg-white hover:bg-rose-100 text-rose-800 rounded-xl border border-rose-300 shadow-2xs active:scale-95 transition-transform"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES DISPLAY BOX */}
          <div className="bg-[#fffdf8]/95 border-2 border-sky-200 rounded-2xl p-3 h-64 overflow-y-auto flex flex-col gap-3 shadow-inner">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 max-w-[92%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md shrink-0 border-2 border-white ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-amber-950'
                      : 'bg-sky-400 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? '👧' : '🧙‍♂️'}
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs font-bold leading-relaxed shadow-xs flex flex-col gap-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-amber-200 text-amber-950 rounded-tr-none border border-amber-300'
                      : 'bg-white text-slate-800 rounded-tl-none border border-sky-300 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* 1-CLICK STORY RECOMMENDATION BUTTONS */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 pt-1 border-t border-sky-100">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            if (sug.storyId) {
                              soundFX.playStoryChime();
                              onSelectStory(sug.storyId);
                              setIsOpen(false);
                            } else if (sug.prompt) {
                              handleSendMessage(sug.prompt);
                            }
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-black text-[11px] rounded-xl shadow-sm border border-white flex items-center justify-between cursor-pointer active:scale-95 transition-all group"
                        >
                          <span className="truncate">{sug.label || sug.text}</span>
                          <Play className="w-3 h-3 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[8px] font-medium opacity-60 block text-right mt-0.5">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 mr-auto bg-white border border-sky-300 p-2 rounded-2xl rounded-tl-none text-xs font-bold text-sky-900 animate-pulse shadow-2xs">
                <span className="text-sm animate-spin">✨</span>
                <span>StoryBuddy is finding your story...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK MOOD CHIPS */}
          <div className="flex flex-wrap gap-1">
            {moodChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.prompt)}
                className="px-2.5 py-1 bg-white hover:bg-sky-200 text-sky-950 text-[10px] font-bold rounded-full border border-sky-300 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* INPUT FORM FIELD */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask AI for a story recommendation..."
              className="flex-1 bg-white border-2 border-sky-300 focus:border-sky-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none shadow-inner placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-black px-3.5 py-2 rounded-xl border border-white shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer text-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
