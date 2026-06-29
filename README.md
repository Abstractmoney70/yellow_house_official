# Gandhi House — VWMS Official Site

> *"Be the change you wish to see in the world."* — Mahatma Gandhi

The official digital home of **Gandhi House** at **VWMS**. We are athletes, writers,
musicians, artists, coders, and mystery-makers. Yellow and black — not just colours,
but a way of being.

Built with vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies.
No build step. Hosted on GitHub Pages.


## About the House

Gandhi House is one of VWMS's founding houses, named for a man who proved
that quiet conviction can move mountains. We carry that name seriously.

| Pillar | What It Means |
|---|---|
| Courage | Speak up, stand firm, face challenges — on the field and on the page. |
| Unity | Despite age differences, we stand strong and proud together. |
| Creativity | Stories, songs, poems, ARGs — our imagination is as fierce as our spirit. |
| Integrity | Win fairly, lose gracefully, leave every place better than you found it. |
| Curiosity | We ask questions others don't. The world has so much to offer. |
| Legacy | The students who come after us will know our name. Make them proud. |


## Project Structure

gandhi-house/
├── index.html                  Main page shell — imports CSS & JS
├── 404.html                    Custom 404 page with ARG/terminal vibes
├── README.md                   You are here
│
├── css/
│   ├── main.css                Core styles (nav, hero, values, members,
│   │                              works grid, about, footer, responsive)
│   └── reading.css             Reading panel styles (progress bar,
│                                  related works, back-to-top, typography)
│
├── js/
│   ├── data.js                 ALL content lives here — works, members, values
│   ├── utils.js                Helpers (read time, related works, filter, search)
│   ├── components.js           Rendering functions for every section
│   ├── panels.js               Reading panel & member panel logic
│   ├── easter-eggs.js          Konami code, hidden features
│   └── main.js                 Init, event listeners, ties everything together
│
├── works/                      Individual work pages (for social sharing)
├── secret/                     Hidden ARG pages (locked behind ciphers)
└── assets/                     Images, icons, static files


## Getting Started (Local Setup)

You do not need anything installed. Just open index.html in a browser.

1. Clone or download this repository
2. Double-click index.html
3. That's it — the site loads with all placeholder data

To test with live reload (optional):
- Use VS Code with the "Live Server" extension
- Or run: python3 -m http.server 8000   (then visit localhost:8000)


## Adding Content

All content lives in a single file: js/data.js
You only need to edit that one file to add works, members, or change values.
No HTML or CSS knowledge required.


### Add a New Work

Open js/data.js. Find the WORKS array. Add a new object like this:

{
  type: "Poem",
  title: "Your Title Goes Here",
  author: "Author Name",
  date: "Month Day, Year",
  excerpt: "A short one-sentence preview shown on the card.",
  content: `Full text of your work.\nUse \\n for line breaks.\n\n— Author Name`
}

Rules:
- type must be one of: Story, Poem, Song, ARG, Essay, Blogpost
- title and author are required
- content uses \n for new lines (not Enter)
- content starts and ends with a backtick (`)
- Author signature at the bottom is encouraged

Full example (the Missed Appointment poem):

{
  type: "Poem",
  title: "Missed Appointment",
  author: "Bravian Ghosh",
  date: "Jul 1, 2026",
  excerpt: "A heart-felt poem to the backbone of society, the doctors.",
  content: `When the day is old, the night is young\nYet the work, has just begun...`
}


### Add a New Member

Open js/data.js. Find the MEMBERS array. Add a new object:

{
  name: "Full Name",
  role: "Role · Tags",
  bio: "A few sentences about this person. Keep it house-appropriate.",
  works: ["Title of Work One", "Title of Work Two"]
}

Rules:
- name and role are required
- works must exactly match the title of an entry in the WORKS array
- works can be an empty array [] if they haven't published yet
- bio should be 2-4 sentences, positive tone


### Edit House Values

Open js/data.js. Find the HOUSE_VALUES array. Each object has:
- icon: any emoji
- title: the value name
- body: one sentence describing it

Change the text, add new values, or reorder them. The grid auto-adjusts.


### Work Types Reference

| Type     | Tag Colour | Read Label | Font Style         |
|----------|-----------|------------|--------------------|
| Story    | Yellow    | Read →     | Serif (Garamond)   |
| Poem     | Purple    | Read →     | Serif (Garamond)   |
| Song     | Green     | Read →     | Serif (Garamond)   |
| ARG      | Red       | Enter →    | Monospace (Red)    |
| Essay    | Blue      | Read →     | Serif (Garamond)   |
| Blogpost | Amber     | Read →     | Sans-serif (Inter) |

Each type gets its own colour tag, read-time estimate, and reading panel style.
ARGs get glitch effects. Blogposts get a cleaner, modern layout.


### Formatting Content

The content field preserves whitespace exactly as written.
Use \n for line breaks. Do not use actual Enter/Return inside the backticks
for the JavaScript string — use \n instead.

Example (poem stanza):
content: `Line one\nLine two\nLine three\n\n— Author Name`

This renders as:
  Line one
  Line two
  Line three

  — Author Name

ARGs can use > for terminal prompts:
content: `> ACCESS GRANTED\n> DECRYPTING...\n\nCipher text here.`


## Direct Linking & Sharing

Every work and member has a unique URL hash.

- index.html#work-0   — opens the first work in the reading panel
- index.html#work-3   — opens the fourth work
- index.html#member-1 — opens the second member profile

In the reading panel, click "🔗 Copy Link" to copy the direct URL.
Share it anywhere — WhatsApp, Discord, Instagram — and it opens right to that work.

For richer sharing (OG preview cards on social media), create individual
HTML pages in the works/ folder (see works/TEMPLATE.html).


## Features

Current features:
- Animated hero section with floating shield
- Live ticker bar with house themes
- Values grid (auto-renders from data)
- Member cards with click-to-view profiles
- Works grid with type filters and search bar
- Load More pagination (12 works per page)
- Filter badges showing count per type
- Reading panel with progress bar
- Estimated read time on every work
- "You May Also Like" related works section
- Back-to-top button in reading panel
- Copy link button for sharing
- Arrow key navigation (← → between works)
- Escape key to close panels
- URL hash routing (works with browser back/forward)
- Blogpost type with distinct layout
- Custom 404 page
- Konami Code easter egg
- Fully responsive (desktop, tablet, mobile)
- Reduced motion support for accessibility


## Easter Eggs & Secrets

### Konami Code
Press: Up Up Down Down Left Right Left Right B A
Triggers: screen glitch + ticker message + console hint

### Custom 404 Page
Visiting any non-existent URL (like /secret/vault or /works/nonexistent)
shows a themed 404 with terminal text and a cipher hint.

### Secret Pages (Coming Soon)
The /secret/ folder contains hidden pages accessible only by:
- Solving ciphers found in ARG works
- Decoding clues hidden in the 404 page
- Following breadcrumbs in easter eggs


## Deployment (GitHub Pages)

1. Push this entire folder to a GitHub repository
2. Go to the repo on GitHub → Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Choose your main branch, root folder (/)
5. Click Save
6. Your site will be live at: https://yourusername.github.io/repo-name/

The 404.html is automatically served for any broken links.
No custom domain needed. HTTPS comes free.


## Contributing

We welcome contributions from all Gandhi House members.
You can contribute whether you know how to code or not.


### For Members (Non-Coders)

You don't need to touch HTML, CSS, or JavaScript.

Option A — Send your content to a moderator:
1. Write your poem, story, song, essay, or blogpost in any text app
2. Send it to the House Captain or site moderator
3. They'll add it to js/data.js and deploy

Option B — Use the data template:
1. Open js/data.js in any text editor (Notepad works)
2. Copy an existing work entry
3. Paste it and replace the placeholder text with yours
4. Send the edited file to a moderator

What to include when submitting:
- Your full name (as you want it displayed)
- Type of work (Story, Poem, Song, ARG, Essay, Blogpost)
- Title
- Date (approximate is fine)
- One-sentence excerpt/summary
- The full content


### For Members (With GitHub Access)

1. Fork this repository
2. Clone your fork to your computer
3. Create a new branch: git checkout -b add-my-work
4. Edit js/data.js — add your work or member profile
5. Test by opening index.html in a browser
6. Commit: git commit -m "Add: Your Work Title"
7. Push: git push origin add-my-work
8. Open a Pull Request on GitHub


### Pull Request Process

1. One work or member per pull request (makes review faster)
2. Give your PR a clear title: "Add: Missed Appointment by Bravian Ghosh"
3. In the description, mention the type of work and confirm you've tested it
4. A moderator will review within 48 hours
5. They may ask for edits (spelling, formatting, content)
6. Once approved, it gets merged and goes live


### What Gets Rejected

- Content not appropriate for a school setting
- Plagiarised work (write your own stuff)
- Personal attacks or negativity toward other houses
- Broken formatting that doesn't render
- Spam or test entries


### Code of Conduct

- Be respectful. We're a house — we're family.
- Credit your inspirations. If a work was collaborative, list all authors.
- Keep content school-appropriate.
- Help others contribute. If someone doesn't know how, teach them.
- Yellow and black means we win together, not against each other.


## Design System

Colours:
- Yellow:  #F5C200   (primary accent)
- Yellow Dark: #C99D00
- Black:   #0D0D0D   (background)
- Card:    #161616   (card backgrounds)
- Cream:   #F5F0E8   (values section)
- Slate:   #8A8A8A   (secondary text)

Typography:
- Headings: Cormorant Garamond (serif, elegant)
- Body: Inter (sans-serif, clean)
- Code/ARG: JetBrains Mono (monospace, terminal feel)

Spacing:
- Section padding: 6rem 2.8rem (desktop), 4rem 1.4rem (mobile)
- Max content width: 1080px
- Reading panel max width: 720px


## Roadmap

Planned features:
- Individual work HTML pages with OG meta tags for rich social sharing
- Dark/Light theme toggle
- "I'm Feeling Lucky" random work button
- Reaction emojis on works (localStorage)
- Reading list / bookmarks (localStorage)
- Author pages (click name to see all their works)
- RSS feed for subscribers
- Print-friendly stylesheet
- Service worker for offline reading
- Member of the Week spotlight
- Photo gallery section


## Credits & Contact

Site built and maintained by Gandhi House members.
House Captain: [Captain Name]
Site Moderator: [Moderator Name]

Contact: coming_soon@school.edu

Gandhi House · VWMS · Est. 2024
Official Site v3 — 2026