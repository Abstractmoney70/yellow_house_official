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
    role: "Writer · Poet · Site Architect",
    bio: "The mind behind the Gandhi House website and its first published author. Writes poetry about the people society forgets, essays about mathematics and meaning, and the occasional deep-dive into quotes we've been misattributing for decades. Built this entire platform in an afternoon because the house needed a home. It worked.",
    works: [
      "Missed Appointment",
      "The Simplest Problem Nobody Can Solve: A Deep Dive into the Collatz Conjecture",
      "Quote of the Day #1: 'Be the change you wish to see in the world'"
    ]
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
    title: "The Simplest Problem Nobody Can Solve: A Deep Dive into the Collatz Conjecture",
    author: "Bravian Ghosh",
    date: "Jul 1, 2026",
    excerpt: "A theory that's simple enough for a toddler to grasp, yet virtually impossible for mathematicians to prove; take a look into the most confusing problem to have ever scratched mathematics.",
    content: `Pick a number. Any number. Doesn't matter which one. Could be 7. Could be 42 (The NUMBER). Could be something obnoxious like 1,029. Could be your birthday, your roll number, whatever.

Now follow two rules:

If it's even: n/2.
If it's odd: 3n + 1.

Take the result and do it again. And again. And again.

That's it. The 'Unsolvable Problem.'

Start with 6. 6 is even, so n/2 gives you 3. 3 is odd, so 3n + 1 gives you 10. 10 → 5. 5 → 16. 16 → 8 → 4 → 2 → 1.

Once you hit 1, you're trapped: 1 is odd, so 3(1) + 1 = 4. 4 → 2 → 1 → 4 → 2 → 1... a perfect little loop that never lets go.

This is the Collatz Conjecture. Lothar Collatz, a German mathematician, proposed it in 1937. The idea is simple: every positive integer, no matter what you start with, eventually tumbles down to 1.

Sounds pretty fun & easy, right huh?

It's not. It has never been proven. Not because we didn't care to prove it. Computers have checked every number up to roughly 2^68; that's about 295 quintillion, that's close to how many atoms are there in the human body! and every single one eventually hits the 4-2-1 loop. But finding patterns and eventually results isn't proving in the traditional sense. There could be some ridiculous number out there, unimaginably large, that either spirals off to infinity or gets caught in a completely different loop nobody's seen yet.

Why hasn't anyone cracked it?

Part of what makes Collatz so tricky is the interplay between n/2 and 3n + 1. n/2 shrinks numbers. 3n + 1 grows them. The sequence bounces between the two operations in a way that feels almost random; mathematicians call these "hailstone sequences" because the numbers rise and fall like hailstones in a storm cloud before eventually crashing down to earth.

But there's a mathematical anchor buried in all this chaos. A universal law that keeps the sequence from spiraling out of control:

odd × odd = odd. Always. No exceptions.

Here's why that matters: when n is odd, 3n + 1 is odd × odd + 1. odd × odd is odd. And odd + 1 is even. Always. So 3n + 1, when n is odd, is guaranteed to produce an even number.

Which means the next step is always n/2.

So an odd number never produces another odd number. It jumps to an even number, which then gets halved; possibly multiple times in a row if it's divisible by 2 repeatedly. This built-in "shrink mechanism" is why most sequences trend downward over time despite the occasional spikes from 3n + 1.

The problem isn't that we don't understand the inner workings. The problem is proving that this mechanism is inescapable; that no number, no matter how cleverly structured, can dodge the 4-2-1 loop forever.

Paul Erdős, one of the most brilliant and eccentric mathematicians of the 20th century, reportedly said: "Mathematics is not yet ready for such problems." He offered $500 for a solution; a fortune by his standards; he usually tossed out $10 or $25 for problems he thought were within reach. The $500 was a signal: this one is different. This one is deep.

There's something almost philosophical about it. The rules are deterministic and set; every step is rigid, mechanical, predictable and yet the global behavior is so complex it might as well be random. Simple rules generating profound complexity. It's a tiny universe in two operations.

And there's the quiet poetry of it: every number eventually reaches 1. No matter how high it climbs, no matter how long the journey, the destination is the same. n/2 and 3n + 1 are just two roads; 1 is where they all lead.

Try it yourself. Pick a number and run the sequence by hand. Or write a few lines of code in python; Collatz is a classic beginner programming exercise because it's so simple to implement and so mesmerizing to watch. Try starting with 27: it takes 111 steps to reach 1, climbing as high as 9,232 on the way. That's a lot of drama from two little rules.

Maybe someone reading this will be the one to prove it. Maybe not. But that's the thing about Collatz: it's a reminder that mathematics isn't a finished monument. It's a bottomless ocean. We've mapped the shores and occupy it daily but; the deep water is still dark. And somewhere out there are problems simple enough for a child to understand, beautiful enough to obsess over for a lifetime, and stubborn enough to outlast everyone who tries.

That's worth caring about.

— Bravian Ghosh`
  },
  {
    type: "Essay",
    title: "Quote of the Day #1: 'Be the change you wish to see in the world'",
    author: "Bravian Ghosh",
    date: "Jul 1, 2026",
    excerpt: "Gandhi's most famous quote opens our house page. But did he actually say it? And what does it really ask of us?",
    content: `There is no better place to start this series than with the quote that sits at the heart of our house: "Be the change you wish to see in the world."

It's attributed to Mahatma Gandhi. It opens our About section. It's printed on posters, stitched into Instagram bios, and dropped into speeches by people who've never read a page of Gandhi's writing.

But here's the uncomfortable truth: Gandhi probably never said it.

Not those exact words, anyway. The closest documented statement comes from a 1913 journal entry where he wrote: "We but mirror the world. All the tendencies present in the outer world are to be found in this world of ours. If we could change ourselves, the tendencies in the world would also change."

Later, in a 1946 interview, he reportedly said: "If you want to change the world, start with yourself."

The pithy version we know today — "Be the change you wish to see in the world" — appears nowhere in his collected works. It was likely a paraphrase coined by educators and activists in the decades after his death, compressing his philosophy into a single, portable, unforgettable sentence.

And honestly? That compression is its own kind of brilliance. Because even if the words aren't verbatim Gandhi, the idea is what Gandhi idealized.

What the quote actually asks of us is far harder than sharing a post or nodding along. It asks us to embody the world we want before we demand it from others. Want peace? Be peaceful in your arguments. Want honesty? Stop exaggerating your achievements. Want a house that values creativity? Write something. Publish it. Build the platform yourself.

The quote isn't a call to preach. It's a call to become. To be the first example, not the loudest critic.

That's why we put it on our site. Not as decoration. As a reminder that Gandhi House isn't named for a man we admire from a distance. It's named for a standard we're supposed to live up to.

Start with yourself. The rest follows.

— Bravian Ghosh`
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
