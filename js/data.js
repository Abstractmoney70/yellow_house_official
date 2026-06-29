/* ═══════════════════════════════════════════════════
   ██████╗  █████╗ ████████╗ █████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║  ██║███████║   ██║   ███████║
   ██║  ██║██╔══██║   ██║   ██╔══██║
   ██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

   GANDHI HOUSE — DATA FILE
   ─────────────────────────
   Add new works, members, or values below.
   Type options: "Story" | "Poem" | "Song" | "ARG" | "Essay" | "Blogpost"
═══════════════════════════════════════════════════ */

// ── HOUSE VALUES ──
const HOUSE_VALUES = [
  {
    icon: "☀️",
    title: "Courage",
    body: "We speak up, stand firm, and face challenges with bravery; from the field to the page."
  },
  {
    icon: "🤝",
    title: "Unity",
    body: "Despite age differences, we stand strong and proud together."
  },
  {
    icon: "✍️",
    title: "Creativity & Innovation",
    body: "We write stories, compose songs, craft poems, and build worlds. Our imagination is as fierce as our competitive spirit."
  },
  {
    icon: "⚖️",
    title: "Integrity",
    body: "Named for Gandhi, we compete with honour. Win fairly, lose gracefully, and always leave a place better than you found it."
  },
  {
    icon: "🔍",
    title: "Curiosity",
    body: "We ask questions others don't. Because the world has so much to offer and learn from."
  },
  {
    icon: "🏆",
    title: "Legacy",
    body: "The students who come after us will know our name. It's our duty to make them proud."
  }
];

// ── MEMBERS ──
const MEMBERS = [
  {
    name: "House Captain",
    role: "Leadership",
    bio: "Update this bio with something about this person — their year level, what they bring to the house, and what makes them Gandhi through and through.",
    works: []
  },
  {
    name: "Vice Captain",
    role: "Leadership",
    bio: "Update this bio with something about this person — their strengths, their story, their role in keeping Gandhi House together.",
    works: []
  },
  {
    name: "Bravian Ghosh",
    role: "Writer · Poet",
    bio: "A wordsmith who finds rhythm in the everyday. Bravian writes with heart — turning gratitude, frustration, and quiet moments into something that lingers.",
    works: ["Missed Appointment"]
  },
  {
    name: "Member Name",
    role: "ARG Maker",
    bio: "Replace with a real member. The mastermind behind the house's mystery ARG. Ask them nothing. They'll tell you everything — eventually.",
    works: ["Project: Goldfinch"]
  },
  {
    name: "Member Name",
    role: "Songwriter",
    bio: "Replace with a real member. Wrote the Sports Day anthem from scratch. If you've heard it, you know.",
    works: ["Anthem (We Don't Fall)"]
  },
  {
    name: "Member Name",
    role: "Competitor · Writer",
    bio: "Replace with a real member. Equally dangerous in a sprint and in an essay. One of Gandhi House's most versatile members.",
    works: ["On Disobedience & Honour"]
  }
];

// ── WORKS ──
const WORKS = [
  {
    type: "Poem",
    title: "Missed Appointment",
    author: "Bravian Ghosh",
    date: "Jul 1, 2026",
    excerpt: "A heart-felt poem to the backbone of society, the doctors.",
    content: `When the day is old, the night is young\nYet the work, has just begun\nFor those souls, god's soldiers\nThey do the impossible, they move boulders\nI might exaggerate, but they cure\nTend your wounds, and do endure\nHours of work, without rest\nWhen the profession deprived them of their zest\n\nDo you have, a minute or two?\nTo listen to me whine, just to you?\nMaybe vent, all the frustration\nOf how we treat ill, to those who give us medication\nMiss a date, or a dozen\n"It's nothing, they'll pardon"\nBut we waste, their time and ours\nSomeone died, in that hour\n\nThey couldn't get, to their in time\nThey've failed, time and time\nYet they're the ones, with powers to mend\nThey need your support, extend forward a hand\nSo don't forget, for their sake\nBecause when you're half awake\nHalf dead, half alive\nThey're the ones who will continue to try\n\n— Bravian Ghosh`
  },
  {
    type: "Blogpost",
    title: "First Week in Gandhi House",
    author: "Member Name",
    date: "Apr 2026",
    excerpt: "Reflections on the first week — the chaos, the chants, and the unexpected kindness of yellow and black.",
    content: `Replace this with your blogpost.\n\nBlogposts are casual, journal-style entries. They use a clean sans-serif font and feel more personal.\n\nWrite about house events, personal reflections, match reports, creative processes — anything goes.\n\n— [Author Name]`
  },
  {
    type: "Poem",
    title: "Yellow is Not Surrender",
    author: "Member Name",
    date: "2026",
    excerpt: "People mistake yellow for caution, for warning, for fear. They forget: the sun is yellow, and nothing burns brighter.",
    content: `Replace this with the full poem.\n\nEach stanza on its own line.\nLine breaks preserved exactly as you write them.\n\nYellow is not surrender.\nYellow is the sun.\n\n— [Author Name]`
  },
  {
    type: "ARG",
    title: "Project: Goldfinch",
    author: "The ARG Team",
    date: "2026",
    excerpt: "Something is hidden in Room 7B. A cipher, three QR codes, and a note that shouldn't exist. Are you paying attention?",
    content: `> INITIALISING GOLDFINCH PROTOCOL...\n> ACCESS GRANTED: LEVEL 1\n\nReplace this with your ARG's opening text, clues, or lore.\n\nYou can write in any format — cryptic messages, coordinates, cipher hints, story fragments.\n\nThe red terminal font and glitch effect will make it feel right.\n\n> CONTINUE? [Y/N]_`
  },
  {
    type: "Song",
    title: "Anthem (We Don't Fall)",
    author: "Member Name",
    date: "Sports Day 2025",
    excerpt: "Written for Sports Day 2025. Three verses, one bridge, and a chorus that the whole house ended up knowing by heart.",
    content: `Replace this with the full song lyrics.\n\n[Verse 1]\nYour lyrics here.\n\n[Chorus]\nWe don't fall, we don't fall,\nYellow and black, we stand tall.\n\n[Verse 2]\nYour lyrics here.\n\n[Bridge]\nYour lyrics here.\n\n— [Author Name]`
  },
  {
    type: "Essay",
    title: "On Disobedience & Honour",
    author: "Member Name",
    date: "2026",
    excerpt: "Gandhi broke laws. So did Mandela. So did Malala. This essay asks: when is breaking the rule the most honourable thing you can do?",
    content: `Replace this with the full essay text.\n\nIntroduction paragraph goes here. State your argument clearly.\n\nBody paragraph one. Evidence and analysis.\n\nBody paragraph two. Counter-argument and rebuttal.\n\nConclusion. Bring it home.\n\n— [Author Name]`
  }
];

// ── TYPE MAPPINGS (used by components) ──
const TYPE_TAG = {
  Story: "tag-story",
  Poem: "tag-poem",
  Song: "tag-song",
  ARG: "tag-arg",
  Essay: "tag-essay",
  Blogpost: "tag-blog"
};

const TYPE_LABEL = {
  Story: "Short Story",
  Poem: "Poem",
  Song: "Song",
  ARG: "ARG",
  Essay: "Essay",
  Blogpost: "Blogpost"
};

const READ_LABEL = {
  Story: "Read →",
  Poem: "Read →",
  Song: "Read →",
  ARG: "Enter →",
  Essay: "Read →",
  Blogpost: "Read →"
};

const ITEMS_PER_PAGE = 12;