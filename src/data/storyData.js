// Story Data Model - "The Bottle That Waited" (Clean & Dynamic Cartoon Story Data)

export const STORY_SCENES = [
  {
    id: 1,
    title: "Meet Your Little Buddy",
    badge: null,
    background: "classroom-bright",
    narration: "Meet Buddy! 💧 A special little blue water bottle with a rocket sticker! 🚀💙 It goes everywhere on school adventures with you.",
    instruction: "🔍 Explore the classroom desk! Tap an object to inspect it.",
    sentences: [
      {
        id: 1,
        text: "Meet Buddy! 💧 A special little blue water bottle with a rocket sticker! 🚀💙",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", bottleMood: "happy", overlayEmoji: "💧", activeFocus: "desk", animation: "bounce" },
        plotData: { emotionScore: 95, hydrationLevel: 90, quietnessIndex: 10, storyArcPoint: "Meet Buddy" }
      },
      {
        id: 2,
        text: "It goes everywhere on school adventures with you!",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", bottleMood: "excited", overlayEmoji: "🚀", activeFocus: "full", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 90, quietnessIndex: 15, storyArcPoint: "School Adventure" }
      }
    ],
    objects: [
      {
        id: "bottle",
        name: "Water Bottle",
        icon: "💧",
        label: "Water bottle",
        hint: "Tap to hear what it says",
        dialogue: "“Ready for another adventure!” 🚀",
        narratorReply: "Your little bottle is always ready to help you stay hydrated!",
        soundEffect: "sparkle"
      },
      {
        id: "bag",
        name: "Schoolbag",
        icon: "🎒",
        label: "Schoolbag",
        hint: "Tap to peek inside",
        dialogue: "“Let's check the bag… books, pencil, lunchbox… all here!”",
        narratorReply: "Everything is packed and ready for school!",
        soundEffect: "pop"
      },
      {
        id: "pencil",
        name: "Pencil",
        icon: "✏️",
        label: "Pencil",
        hint: "Tap to see it wiggle",
        dialogue: "“Wiggle wiggle! Ready to write!” ✏️",
        narratorReply: "Look at that pencil go!",
        soundEffect: "pop",
        animation: "wiggle"
      },
      {
        id: "rocket",
        name: "Rocket Sticker",
        icon: "🚀",
        label: "Rocket sticker",
        hint: "Tap to launch a tiny rocket!",
        dialogue: "🚀 Whoosh!",
        narratorReply: "Whoa! That rocket sticker is ready for takeoff!",
        soundEffect: "rocket"
      }
    ]
  },
  {
    id: 2,
    title: "Home Time!",
    badge: {
      id: "found_it",
      name: "Found It! Explorer",
      icon: "🔎",
      desc: "Found the forgotten water bottle!"
    },
    background: "classroom-afternoon",
    narration: "🔔 Rrrrring! Finally! Home time! 🎉\n\nEveryone was so excited to go home that the little blue bottle was left behind on the desk.\nWait a minute, explorers! Something is missing! Can you help find what was left behind?",
    instruction: "🔎 Search the classroom! Tap an object to check it.",
    sentences: [
      {
        id: 1,
        text: "🔔 Rrrrring! Finally! Home time! 🎉",
        speaker: "SFX",
        screenState: { lighting: "afternoon", bottleMood: "happy", overlayEmoji: "🔔", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 75, quietnessIndex: 30, storyArcPoint: "Bell Rings!" }
      },
      {
        id: 2,
        text: "Everyone was so excited to go home that the little blue bottle was left behind on the desk.",
        speaker: "NARRATOR",
        screenState: { lighting: "afternoon", bottleMood: "anxious", overlayEmoji: "🎒", activeFocus: "desk", animation: "wiggle" },
        plotData: { emotionScore: 65, hydrationLevel: 70, quietnessIndex: 50, storyArcPoint: "Left Behind" }
      },
      {
        id: 3,
        text: "Wait a minute, explorers! Something is missing! Can you help find what was left behind?",
        speaker: "NARRATOR",
        screenState: { lighting: "afternoon", bottleMood: "anxious", overlayEmoji: "😰", activeFocus: "desk", animation: "pulse" },
        plotData: { emotionScore: 50, hydrationLevel: 65, quietnessIndex: 60, storyArcPoint: "Search Quest" }
      }
    ],
    objects: [
      {
        id: "id-card",
        name: "Aarav's ID Card",
        icon: "🪪",
        isForgottenItem: false,
        feedback: "Nope! Aarav's ID card is safely with him. It was not left behind.",
        soundEffect: "pop"
      },
      {
        id: "lunchbox",
        name: "Lunchbox",
        icon: "🍱",
        isForgottenItem: false,
        feedback: "The lunchbox is already packed too!",
        soundEffect: "pop"
      },
      {
        id: "bottle",
        name: "Blue Bottle on the Desk",
        icon: "💧",
        isForgottenItem: true,
        dialogue: "“I'm still here!”",
        feedback: "Hello...?",
        narratorReply: "✨ Sparkle! You found it! The little blue bottle was left behind on the desk!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 3,
    title: "The Classroom Gets Quiet",
    badge: null,
    background: "classroom-quiet",
    narration: "One by one, the children left. The chairs stopped scraping. The laughter disappeared. Even the sunlight on the floor began to fade.\n\n“Is anyone there?”\n\nThe bottle waited quietly on the empty desk.",
    instruction: "🎮 Help the bottle look around the classroom! Tap each object.",
    sentences: [
      {
        id: 1,
        text: "One by one, the children left. The chairs stopped scraping.",
        speaker: "NARRATOR",
        screenState: { lighting: "quiet", bottleMood: "lonely", overlayEmoji: "🪑", activeFocus: "full", animation: "pulse" },
        plotData: { emotionScore: 40, hydrationLevel: 60, quietnessIndex: 75, storyArcPoint: "Classroom Empty" }
      },
      {
        id: 2,
        text: "The laughter disappeared. Even the sunlight on the floor began to fade.",
        speaker: "NARRATOR",
        screenState: { lighting: "sunset", bottleMood: "sad", overlayEmoji: "🌅", activeFocus: "desk", animation: "float" },
        plotData: { emotionScore: 30, hydrationLevel: 55, quietnessIndex: 85, storyArcPoint: "Sun Fades" }
      },
      {
        id: 3,
        text: "“Is anyone there?”",
        speaker: "BOTTLE",
        screenState: { lighting: "sunset", bottleMood: "lonely", overlayEmoji: "💬", activeFocus: "desk", animation: "wiggle" },
        plotData: { emotionScore: 25, hydrationLevel: 50, quietnessIndex: 90, storyArcPoint: "Bottle Calls" }
      },
      {
        id: 4,
        text: "The bottle waited quietly on the empty desk.",
        speaker: "NARRATOR",
        screenState: { lighting: "quiet", bottleMood: "lonely", overlayEmoji: "🕒", activeFocus: "clock", animation: "pulse" },
        plotData: { emotionScore: 20, hydrationLevel: 45, quietnessIndex: 95, storyArcPoint: "Quiet Wait" }
      }
    ],
    objects: [
      {
        id: "chair",
        name: "Empty Chair",
        icon: "🪑",
        text: "“No one is here…”",
        soundEffect: "pop"
      },
      {
        id: "clock",
        name: "Classroom Clock",
        icon: "🕒",
        text: "The clock ticks forward... *tick-tock*",
        soundEffect: "pop"
      },
      {
        id: "door",
        name: "Classroom Door",
        icon: "🚪",
        text: "“Maybe someone will come back through here!”",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 4,
    title: "How Does the Bottle Feel?",
    badge: {
      id: "empathy",
      name: "Empathy Star",
      icon: "💙",
      desc: "Understood how the lonely bottle felt!"
    },
    background: "classroom-spotlight",
    narration: "The bottle remembered all the fun school days together. The mornings it was filled with cold water... The tired sips after playing sports... And the whispered thank-yous:\n\n“Thanks for keeping me hydrated!” 💙\n\nNow, for the first time, the bottle was alone. It wasn't angry. It just wished someone would remember it.",
    instruction: "Explorers, can you help the bottle show how it's feeling?",
    sentences: [
      {
        id: 1,
        text: "The bottle remembered all the fun school days together.",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", bottleMood: "hopeful", overlayEmoji: "💭", activeFocus: "desk", animation: "float" },
        plotData: { emotionScore: 35, hydrationLevel: 45, quietnessIndex: 90, storyArcPoint: "Warm Memories" }
      },
      {
        id: 2,
        text: "The mornings it was filled with cold water... The tired sips after playing sports...",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", bottleMood: "happy", overlayEmoji: "💧", activeFocus: "desk", animation: "sparkle" },
        plotData: { emotionScore: 50, hydrationLevel: 50, quietnessIndex: 85, storyArcPoint: "Cold Water Sips" }
      },
      {
        id: 3,
        text: "“Thanks for keeping me hydrated!” 💙",
        speaker: "HAPPY MEMORY",
        screenState: { lighting: "spotlight", bottleMood: "hopeful", overlayEmoji: "💙", activeFocus: "desk", animation: "bounce" },
        plotData: { emotionScore: 60, hydrationLevel: 50, quietnessIndex: 80, storyArcPoint: "Thank You Memory" }
      },
      {
        id: 4,
        text: "Now, for the first time, the bottle was alone. It wasn't angry. It just wished someone would remember it.",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", bottleMood: "lonely", overlayEmoji: "🥺", activeFocus: "desk", animation: "pulse" },
        plotData: { emotionScore: 20, hydrationLevel: 40, quietnessIndex: 95, storyArcPoint: "Lonely Wishing" }
      }
    ],
    emotions: [
      {
        id: "lonely",
        label: "Lonely",
        icon: "🥺",
        isCorrect: true,
        bottleDialogue: "“I miss my friends…” 🥺",
        narratorFeedback: "That's right. The bottle feels lonely.",
        animation: "float"
      },
      {
        id: "angry",
        label: "Angry",
        icon: "😠",
        isCorrect: false,
        bottleDialogue: "Grrr! 😠",
        narratorFeedback: "Not quite! Look at the bottle's quiet face. What feeling matches it best?",
        animation: "angry-wiggle"
      },
      {
        id: "excited",
        label: "Excited",
        icon: "😄",
        isCorrect: false,
        bottleDialogue: "Yay! 😄",
        narratorFeedback: "Not quite! Look at the bottle's quiet face. What feeling matches it best?",
        animation: "gentle-bounce"
      }
    ]
  },
  {
    id: 5,
    title: "Who Is Coming?",
    badge: {
      id: "listener",
      name: "Keen Listener",
      icon: "👂",
      desc: "Listened carefully to the footsteps!"
    },
    background: "classroom-dusk",
    narration: "👣 Tap… tap… tap…\n“Is someone coming?”\n\nWait! What was that sound?",
    instruction: "Tap the ear to listen to the footsteps!",
    sentences: [
      {
        id: 1,
        text: "👣 Tap… tap… tap… Footsteps approaching in the hall!",
        speaker: "SFX",
        screenState: { lighting: "dusk", bottleMood: "listening", overlayEmoji: "👣", activeFocus: "door", animation: "wiggle" },
        plotData: { emotionScore: 45, hydrationLevel: 40, quietnessIndex: 50, storyArcPoint: "Footsteps Heard!" }
      },
      {
        id: 2,
        text: "“Is someone coming?”",
        speaker: "BOTTLE",
        screenState: { lighting: "dusk", bottleMood: "hopeful", overlayEmoji: "❓", activeFocus: "door", animation: "bounce" },
        plotData: { emotionScore: 60, hydrationLevel: 40, quietnessIndex: 40, storyArcPoint: "Hopeful Glance" }
      },
      {
        id: 3,
        text: "Wait! What was that sound?",
        speaker: "NARRATOR",
        screenState: { lighting: "dusk", bottleMood: "listening", overlayEmoji: "👂", activeFocus: "door", animation: "pulse" },
        plotData: { emotionScore: 55, hydrationLevel: 40, quietnessIndex: 45, storyArcPoint: "Listening Carefully" }
      }
    ],
    footstepChoices: [
      { id: "student", label: "A Student", icon: "👦", feedback: "The footsteps came closer... but they passed by!" },
      { id: "cat", label: "A friendly cat", icon: "🐈", feedback: "Meow! Just a friendly cat walking past the room." },
      { id: "dino", label: "A dinosaur", icon: "🦖", feedback: "Stomp! Not a dinosaur, just someone walking down the hall." }
    ],
    resolution: "👣 Tap… tap… tap… They passed!\n“Maybe I was forgotten…” 💭"
  },
  {
    id: 6,
    title: "Time to Wait",
    badge: null,
    background: "classroom-twilight",
    narration: "Five minutes passed. Then ten. The classroom stayed quiet.",
    instruction: "While the bottle waits, can you help it find something kind to remember?",
    sentences: [
      {
        id: 1,
        text: "Five minutes passed. Then ten. The classroom stayed quiet.",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", bottleMood: "lonely", overlayEmoji: "🕒", activeFocus: "clock", animation: "pulse" },
        plotData: { emotionScore: 15, hydrationLevel: 35, quietnessIndex: 98, storyArcPoint: "Time Passes..." }
      },
      {
        id: 2,
        text: "While the bottle waits, can you help it find something kind to remember?",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", bottleMood: "hopeful", overlayEmoji: "🌟", activeFocus: "desk", animation: "float" },
        plotData: { emotionScore: 30, hydrationLevel: 35, quietnessIndex: 90, storyArcPoint: "Kind Thoughts" }
      }
    ],
    items: [
      {
        id: "memory",
        label: "Thank-you memory",
        icon: "💙",
        dialogue: "“Thanks for taking care of me.” 💙",
        soundEffect: "sparkle"
      },
      {
        id: "sunlight",
        label: "Sunlight",
        icon: "🌞",
        dialogue: "The soft warm sunlight glows gently on the classroom desk.",
        soundEffect: "pop"
      },
      {
        id: "chair",
        label: "Empty chair",
        icon: "🪑",
        dialogue: "The classroom is peaceful and quiet.",
        soundEffect: "pop"
      },
      {
        id: "rocket",
        label: "Rocket sticker",
        icon: "🚀",
        dialogue: "🚀 Whoosh!\n“Maybe my adventure isn't over yet…”\nThat's the spirit, little buddy!",
        soundEffect: "rocket"
      }
    ]
  },
  {
    id: 7,
    title: "Reunion Time!",
    badge: {
      id: "reunion",
      name: "Reunion Hero",
      icon: "✨",
      desc: "Helped locate the water bottle!"
    },
    background: "classroom-door-open",
    narration: "🔊 Clack!\n“There's my bottle!” 😮💙\n\nThe classroom door opens and someone comes back to search the desk!",
    instruction: "Someone came back! Where is the bottle? Tap the desk!",
    sentences: [
      {
        id: 1,
        text: "🔊 Clack! The classroom door swings open!",
        speaker: "SFX",
        screenState: { lighting: "door_open", bottleMood: "excited", overlayEmoji: "🚪", activeFocus: "door", animation: "bounce" },
        plotData: { emotionScore: 70, hydrationLevel: 35, quietnessIndex: 20, storyArcPoint: "Door Opens!" }
      },
      {
        id: 2,
        text: "“There's my bottle!” 😮💙",
        speaker: "AARAV",
        screenState: { lighting: "door_open", bottleMood: "happy", overlayEmoji: "👦", activeFocus: "desk", animation: "sparkle" },
        plotData: { emotionScore: 90, hydrationLevel: 40, quietnessIndex: 10, storyArcPoint: "Aarav Returns!" }
      },
      {
        id: 3,
        text: "Someone came back to search the desk! Where is the bottle?",
        speaker: "NARRATOR",
        screenState: { lighting: "reunion", bottleMood: "excited", overlayEmoji: "✨", activeFocus: "desk", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 45, quietnessIndex: 5, storyArcPoint: "Reunion Sparkle" }
      }
    ],
    locations: [
      { id: "bag", label: "Schoolbag", icon: "🎒", text: "“Not here!”", isCorrect: false },
      { id: "chair", label: "Chair", icon: "🪑", text: "“Nope!”", isCorrect: false },
      { id: "desk", label: "Classroom Desk", icon: "💧", text: "✨ Found! “There you are! I'm sorry I left you here.”", isCorrect: true }
    ],
    conclusion: "The bottle gave a happy sparkle.\n💙 “I won't forget you again!”"
  },
  {
    id: 8,
    title: "Give the Bottle Some Care",
    badge: null,
    background: "water-station",
    narration: "Time to make things right for your little buddy!",
    instruction: "🎮 Follow the steps to care for the bottle!",
    sentences: [
      {
        id: 1,
        text: "Time to make things right for your little buddy!",
        speaker: "NARRATOR",
        screenState: { lighting: "water", bottleMood: "excited", overlayEmoji: "🚰", activeFocus: "water", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 50, quietnessIndex: 10, storyArcPoint: "Water Station" }
      },
      {
        id: 2,
        text: "Follow the steps: Tap the tap 🚰, fill the bottle 💧, and seal the bottle cap 🔵!",
        speaker: "NARRATOR",
        screenState: { lighting: "water", bottleMood: "refilled", overlayEmoji: "💧", activeFocus: "water", animation: "glug" },
        plotData: { emotionScore: 98, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "Refilling Water" }
      }
    ],
    steps: [
      { id: 1, label: "Tap the water tap 🚰", icon: "🚰", action: "tap" },
      { id: 2, label: "Tap the bottle 💧", icon: "💧", action: "fill" },
      { id: 3, label: "Tap the bottle cap to close it 🔵", icon: "🔵", action: "cap" }
    ],
    completionText: "💧 Glug-glug!\n“Fresh water for you, buddy!”\n[Taking a long, happy sip]\n“Ahh! Thanks, buddy!” 😊\nAnd just like that, the bottle was refilled and happy again!"
  },
  {
    id: 9,
    title: "The Big Lesson",
    badge: {
      id: "checklist_master",
      name: "Checklist Master",
      icon: "📋",
      desc: "Completed the leaving classroom checklist!"
    },
    background: "classroom-exit",
    narration: "We learned something important:\n🌱 The things that care for us need care too.\n\nYour bottle helps you stay hydrated every day. So remember to take care of it!",
    instruction: "Before leaving the classroom, check off the leaving checklist!",
    sentences: [
      {
        id: 1,
        text: "We learned something important: 🌱 The things that care for us need care too.",
        speaker: "NARRATOR",
        screenState: { lighting: "exit", bottleMood: "happy", overlayEmoji: "🌱", activeFocus: "full", animation: "float" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 20, storyArcPoint: "The Care Lesson" }
      },
      {
        id: 2,
        text: "Your bottle helps you stay hydrated every day. So remember to take care of it!",
        speaker: "NARRATOR",
        screenState: { lighting: "exit", bottleMood: "excited", overlayEmoji: "💧", activeFocus: "desk", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 25, storyArcPoint: "Hydration Promise" }
      },
      {
        id: 3,
        text: "Before leaving the classroom, check off the leaving checklist!",
        speaker: "NARRATOR",
        screenState: { lighting: "exit", bottleMood: "happy", overlayEmoji: "📋", activeFocus: "full", animation: "pulse" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 30, storyArcPoint: "Checklist Time" }
      }
    ],
    checklist: [
      { id: "books", text: "Books in the schoolbag 📚" },
      { id: "pencil", text: "Pencil in the pencil case ✏️" },
      { id: "lunchbox", text: "Lunchbox in the bag 🍱" },
      { id: "bottle", text: "Water bottle packed safely 💧" }
    ],
    quote: "“Everything is ready!” 🎒\nAnd from that day on, before leaving the classroom, always ask yourself:\n“Did I remember my little buddy?” 🚀💙\n\n“Adventure time!” 🚀"
  },
  {
    id: 10,
    title: "Your Turn, Explorers!",
    badge: {
      id: "care_champion",
      name: "Care Champion Badge 🏆",
      icon: "🌟",
      desc: "Chosen to take care of an everyday helper!"
    },
    background: "home-room",
    narration: "Now it's your turn, explorers! 🌟 Look around you. What is one thing you use every day that deserves a little care from you?",
    instruction: "Choose something you will take care of today!",
    sentences: [
      {
        id: 1,
        text: "Now it's your turn, explorers! 🌟",
        speaker: "NARRATOR",
        screenState: { lighting: "home", bottleMood: "excited", overlayEmoji: "🌟", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 35, storyArcPoint: "Explorer Challenge" }
      },
      {
        id: 2,
        text: "Look around you. What is one thing you use every day that deserves a little care from you?",
        speaker: "NARRATOR",
        screenState: { lighting: "home", bottleMood: "happy", overlayEmoji: "❤️", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 40, storyArcPoint: "Act of Care" }
      }
    ],
    careItems: [
      {
        id: "bottle",
        label: "Water bottle",
        icon: "💧",
        tip: "Keep it clean and fill it with fresh water."
      },
      {
        id: "books",
        label: "Books",
        icon: "📚",
        tip: "Keep them neat and turn pages carefully."
      },
      {
        id: "toy",
        label: "Favorite toy",
        icon: "🧸",
        tip: "Put it away safely after playing."
      },
      {
        id: "bag",
        label: "Schoolbag",
        icon: "🎒",
        tip: "Keep it organized and ready for tomorrow."
      }
    ],
    finalQuote: "Great choice! 💛 One small act of care can make a big difference.\n\n“Take care of the things that care for you!” ❤️\nBye, explorers! See you on the next adventure! 👋🚀💙"
  }
];
