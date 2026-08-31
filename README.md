# RAI FOREVER — "All is only for you."

A private, cinematic digital love story. Pure HTML/CSS/JS — no build step,
no framework required — so it runs anywhere instantly and deploys to
Render as a simple static/Node site.

## What's here

```
rai-forever/
├── index.html            All markup, semantic + accessible
├── css/
│   ├── base.css           Design tokens (colors, type), resets
│   ├── layout.css         Nav, hero, about, footer, section shells
│   ├── components.css     Timeline, gallery, lightbox, chat, forms, loader
│   └── animations.css     All keyframes + scroll-reveal system
├── js/
│   ├── config.js          ⭐ EDIT THIS — all your personal content lives here
│   ├── loader.js           Cinematic loading screen
│   ├── particles.js        Hero floating-light particles (canvas)
│   ├── nav.js               Scroll state + mobile menu
│   ├── reveal.js            Generic scroll-reveal (IntersectionObserver)
│   ├── about.js             Renders "About Her" from config
│   ├── timeline.js          Renders the love-story timeline + gold thread
│   ├── gallery.js           Renders the memories gallery + lightbox
│   ├── letter.js            The sealed love-letter reveal
│   ├── chat.js              N8N chatbot (panel + floating widget)
├── images/                 Your photos go here (placeholders included)
├── server.js               Tiny static server for local dev / Render
└── package.json
```

## 1. Add your photos

Placeholder images (with labels like "Your Photo Here") are already in
place so the site looks right before you touch anything. Replace these
files with real photos of the same name, keeping the same aspect ratio
where you can for the cleanest crop:

| Purpose              | Path                                  | Suggested size |
|-----------------------|----------------------------------------|-----------------|
| Hero background       | `images/hero-bg.jpg`                  | 1920×1080+ landscape |
| Rai's portrait         | `images/rai-portrait.jpg`             | 900×1200 portrait |
| Timeline — first meeting | `images/first-meeting.jpg`          | 800×1000 portrait |
| Timeline — "I love you" | `images/timeline/first-i-love-you.jpg` | 800×1000 portrait |
| Timeline — engagement   | `images/timeline/engagement.jpg`      | 800×1000 portrait |
| Gallery                 | `images/gallery/memory-01.jpg` … `06.jpg` | any, mixed sizes are fine |

Want more gallery photos, or more timeline chapters? Just add more
entries to the arrays in `js/config.js` — the page lays them out
automatically.

## 2. Edit your story

Everything text-based — her name, DOB, the timeline chapters, the
hidden love letter, quotes — lives in **`js/config.js`**. It's written
in plain, commented JavaScript objects; you shouldn't need to touch
any other file to personalize the content.

## 3. Connect the N8N chatbot (required)

This site is built to use your **existing** N8N chatbot — nothing here
fakes a chatbot.

1. In your n8n workflow, add a **Chat Trigger** node (or a Webhook
   node configured to accept chat messages).
2. Copy its **Production URL**.
3. Open `js/config.js` and paste it into:
   ```js
   n8n: {
     webhookUrl: "https://your-n8n-instance.com/webhook/xxxxxxxx",
     ...
   }
   ```
4. That's it — the floating chat button (bottom-right) will send messages there.

The site posts `{ message, chatInput, sessionId }` to your webhook and
reads the reply from a JSON field named `output`, `text`, `reply`,
`message`, or `answer` (or a plain string body). If your workflow
returns something else, adjust `extractReplyText()` in `js/chat.js`.

**Until you add a real URL**, the chat UI stays fully functional but
tells the visitor honestly that it isn't connected yet — it never
pretends to be a working assistant with fake replies.

## Run it locally

No build step needed. Either:

```bash
# Option A — plain static server (fastest, no dependencies)
python3 -m http.server 8080
# then open http://localhost:8080

# Option B — the included Node server (same one Render will run)
npm install
npm start
# then open http://localhost:3000
```

## Build for production

There's nothing to compile — the site is already production-ready
HTML/CSS/JS. "Building" just means running `npm install` so
`server.js` has Express available.

## Deploy on Render

1. Push this folder to a Git repository.
2. In Render, create a **New Web Service** from that repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Deploy. Render will set `PORT` automatically — `server.js` already
   reads `process.env.PORT`.

(You can alternatively deploy it as a Render **Static Site** — no
server needed for the front end itself — but keep the Node service if
you want a single place hosting everything.)

## What to customize before sending it

- [ ] Replace every placeholder image with a real photo
- [ ] Re-read the letter in `js/config.js` → `letter.body` and make it yours
- [ ] Double-check the timeline dates, places, and captions
- [ ] Add your real N8N chat webhook URL
- [ ] Update `site.metaTitle` / `metaDescription` if you want different SEO text

## Accessibility & performance notes

- Semantic landmarks, skip-link, visible focus states, and
  `prefers-reduced-motion` support are built in.
- Images use `loading="lazy"` outside the hero.
- Particles pause automatically when the hero scrolls out of view.
- The whole site is dependency-free on the front end — nothing to
  download but fonts and your own images.
