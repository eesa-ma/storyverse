// Story Data Model - "Benny Bear & The Magic Pencil" (Sharing & Creativity Story)

export const BEAR_STORY_SCENES = [
  {
    id: 1,
    title: "The Golden Pencil ✏️✨",
    badge: null,
    background: "forest-sunny",
    narration: "Deep inside Cozy Forest lived Benny Bear! 🐻 Benny loved drawing beautiful rainbow doodles with his favorite golden magic pencil. ✏️ Wherever Benny drew, golden sparkles danced in the air!",
    instruction: "✏️ Tap Benny Bear or his golden pencil to draw rainbow doodles!",
    sentences: [
      {
        id: 1,
        text: "Deep inside Cozy Forest lived Benny Bear! 🐻",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🐻", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Meet Benny Bear" }
      },
      {
        id: 2,
        text: "Benny loved drawing beautiful rainbow doodles with his favorite golden magic pencil! ✏️🌈",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "pencil", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "Magic Pencil" }
      }
    ],
    objects: [
      {
        id: "benny",
        name: "Benny Bear",
        icon: "🐻",
        label: "Benny Bear",
        hint: "Tap Benny to hear him giggle!",
        dialogue: "“Wiggle wiggle! Let's draw something wonderful with our golden pencil!” 🎨",
        narratorReply: "Benny wiggles his cozy bear ears and smiles happily!",
        soundEffect: "pop"
      },
      {
        id: "pencil",
        name: "Golden Pencil",
        icon: "✏️",
        label: "Magic Pencil",
        hint: "Tap the magic pencil!",
        dialogue: "✨ Sparkle sparkle! Leaving a bright trail of rainbow doodles!",
        narratorReply: "The magic golden pencil leaves shining stardust wherever it draws.",
        soundEffect: "sparkle"
      },
      {
        id: "easel",
        name: "Wooden Easel",
        icon: "🎨",
        label: "Rainbow Easel",
        hint: "Tap the wooden easel!",
        dialogue: "Look at the colorful stars, clouds, and rainbow swirls!",
        narratorReply: "The easel holds Benny's most creative forest drawings.",
        soundEffect: "sparkle"
      },
      {
        id: "squirrel",
        name: "Woodland Squirrel",
        icon: "🐿️",
        label: "Curious Squirrel",
        hint: "Tap the little squirrel!",
        dialogue: "“Chirp chirp! Your drawings make the whole forest smile, Benny!”",
        narratorReply: "The fluffy squirrel watches happily from the mossy oak branch.",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 2,
    title: "The Forest Art Decision 🐻✏️",
    badge: null,
    background: "forest-library",
    narration: "One afternoon, Benny met his forest friends: Penny the squirrel and Oliver the owl. 🐿️🦉 They were trying to build a colorful sign for the forest library, but they ran out of crayons! 😟 What should Benny do?",
    instruction: "👀 Make a choice! Should Benny share his golden magic pencil?",
    sentences: [
      {
        id: 1,
        text: "One afternoon, Benny met his forest friends: Penny the squirrel and Oliver the owl. 🐿️🦉",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🐿️", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 80, hydrationLevel: 90, quietnessIndex: 25, storyArcPoint: "Forest Friends" }
      },
      {
        id: 2,
        text: "They were trying to build a colorful sign for the forest library, but ran out of crayons!",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "crayons", animation: "wiggle" },
        plotData: { emotionScore: 70, hydrationLevel: 90, quietnessIndex: 35, storyArcPoint: "Ran Out of Crayons" }
      }
    ],
    quiz: {
      question: "✏️ Should Benny share his golden magic pencil with his friends?",
      options: [
        { id: "share_pencil", text: "Share the pencil! 🎨", isCorrect: true, feedback: "Hooray! Sharing the pencil makes rainbow doodles appear everywhere in the forest!" },
        { id: "keep_pencil", text: "Keep it hidden 🤫", isCorrect: false, feedback: "Benny smiles: 'Art is so much more fun when shared with good friends!'" }
      ]
    },
    objects: [
      {
        id: "friends",
        name: "Penny & Oliver",
        icon: "🐿️🦉",
        label: "Forest Friends",
        hint: "Tap the friends!",
        dialogue: "“Thank you, Benny! You are the sweetest friend in Cozy Forest!” 💖",
        narratorReply: "Penny the squirrel and Oliver the owl cheer with joy!",
        soundEffect: "sparkle"
      },
      {
        id: "sign",
        name: "Forest Library Sign",
        icon: "🪵",
        label: "Library Sign",
        hint: "Tap the wooden signboard!",
        dialogue: "“Welcome to the Cozy Forest Library of Books & Stories!” 📚",
        narratorReply: "The rustic wooden signboard is ready for colorful library books.",
        soundEffect: "click"
      },
      {
        id: "crayons",
        name: "Colorful Crayons",
        icon: "🖍️",
        label: "Crayons on Stump",
        hint: "Tap the crayons!",
        dialogue: "Red, blue, yellow, and green! Everyone is ready to color together!",
        narratorReply: "A collection of bright crayons rests on the wooden tree stump.",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 3,
    title: "The Masterpiece of Friendship 🎨🐻🌈",
    badge: {
      id: "masterpiece_creator",
      name: "Rainbow Art Medal",
      icon: "🎨",
      desc: "Created a magical forest masterpiece together!"
    },
    background: "rainbow-bridge",
    narration: "Together, Benny and his friends drew a magnificent rainbow bridge connecting all the forest trees! 🌈✨ Everyone cheered and shared sweet honey berries under the glowing artwork. 💛 Creativity grows much brighter when shared with good friends!",
    instruction: "🎨 Tap the rainbow bridge or honey berries to celebrate with Benny!",
    sentences: [
      {
        id: 1,
        text: "Together, Benny and his friends drew a magnificent rainbow bridge connecting all the forest trees! 🌈✨",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🌈", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Rainbow Masterpiece!" }
      },
      {
        id: 2,
        text: "Everyone cheered and shared sweet honey berries under the glowing artwork! 🍯🐻",
        speaker: "BENNY",
        screenState: { lighting: "bright", overlayEmoji: "🐻", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Honey Berries Feast" }
      },
      {
        id: 3,
        text: "💛 Creativity grows much brighter when shared with good friends! 🎨🐻🌈",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 0, storyArcPoint: "Sharing Moral" }
      }
    ],
    objects: [
      {
        id: "rainbow",
        name: "Glowing Rainbow Bridge",
        icon: "🌈",
        label: "Rainbow Bridge",
        hint: "Tap the radiant rainbow!",
        dialogue: "✨ Glow glow! A breathtaking rainbow bridge illuminating the whole forest canopy!",
        narratorReply: "The magical rainbow bridge shimmers with warm pastel colors across the treetops.",
        soundEffect: "sparkle"
      },
      {
        id: "berries",
        name: "Bowl of Honey Berries",
        icon: "🍯🫐",
        label: "Honey Berries",
        hint: "Tap the honey berries!",
        dialogue: "“Mmm! Sweet wild honey berries are the tastiest treat in the woods!” 🐻",
        narratorReply: "Benny and his pals enjoy delicious forest berries under the sparkling lights.",
        soundEffect: "pop"
      },
      {
        id: "fairies",
        name: "Forest Fairies",
        icon: "🧚✨",
        label: "Sparkle Fairies",
        hint: "Tap the tiny fairies!",
        dialogue: "“Hooray for Benny Bear! Hooray for sharing and true friendship!”",
        narratorReply: "Tiny glowing forest fairies flutter with stardust over the celebration.",
        soundEffect: "sparkle"
      }
    ]
  }
];
