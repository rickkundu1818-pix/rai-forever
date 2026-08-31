/**
 * ============================================================
 *  RAI FOREVER — SITE CONFIGURATION
 * ============================================================
 *  Edit everything in this one file: her info, the timeline,
 *  the gallery, the hidden love letter, and the N8N chatbot.
 *  You should not need to touch any other file to personalize
 *  the site.
 * ============================================================
 */

window.SITE_CONFIG = {

  // ----------------------------------------------------------
  // 1. IDENTITY
  // ----------------------------------------------------------
  site: {
    name: "RAI FOREVER",
    tagline: "All is only for you.",
    supportingLine: "Some stories are written in books.\nOurs is written in moments.",
    metaTitle: "RAI FOREVER — All is only for you.",
    metaDescription: "A private digital love story, written for Rai.",
    favicon: "images/favicon.svg"
  },

  // ----------------------------------------------------------
  // 2. HERO BACKGROUND
  // Put your favourite photo of the two of you here.
  // Recommended: a wide, high-resolution image (1920x1080+).
  // ----------------------------------------------------------
  hero: {
    backgroundImage: "images/hero.jpg",
    cta: "Enter Our Story"
  },

  // ----------------------------------------------------------
  // 3. ABOUT HER
  // ----------------------------------------------------------
  about: {
    name: "RAI",
    co: "RICK",
    dob: "06/02/2006",
    portrait: "images/rai-portrait.jpg",
    quote: "She is not just a person in my story.\nShe is the reason the story exists.",
    paragraph: "There are people you meet, and there are people who rearrange the room the moment they walk into it. Rai has always been the second kind. Steady in the smallest moments, luminous in the biggest ones — this is a small attempt to hold a little of that light in one place."
  },

  // ----------------------------------------------------------
  // 4. OUR LOVE STORY — TIMELINE
  // Add, remove, or reorder events freely. Each event needs
  // an image — drop yours into /images/timeline/
  // ----------------------------------------------------------
  timeline: [
    {
      id: "first-meeting",
      eyebrow: "Chapter One",
      title: "Our First Meeting",
      date: "08 March 2023",
      place: "Kamarpukur Mela",
      description: "Love in First Sight",
      image: "images/first-meeting.jpg",
    },
    {
      id: "first-i-love-you",
      eyebrow: "02 — THE CONVERSATIONS",
      title: "The Little Things That Became Us",
      date: "",
      milestoneTitle: "THE FIRST PROPOSAL",
      milestoneDate: "13/03/2023 · 3:51 PM",
      description: "The day when a simple feeling\nfinally found the courage to become a question.",
      image: "images/chapter-2-chat.jpg",
      imageFit: "contain",
      chapterClass: "chapter-two",
    },
    {
      id: "engagement",
      eyebrow: "03 — A MEMORY TO KEEP",
      title: "A Moment Worth Remembering",
      date: "26 December 2024",
      description: "Some moments are impossible to plan. They simply happen, and somehow become the moments we wish we could keep forever.",
      image: "images/chapter-3-memory.jpg",
      imageFit: "natural",
      chapterClass: "chapter-three",
    },
  ],

  // ----------------------------------------------------------
  // 5. A FILM ABOUT US
  // Replace the scenes with your own photos, titles, captions,
  // and numbers. The number of scenes will automatically match
  // the number of items in this array.
  // ----------------------------------------------------------
  filmScenes: [
    {
      number: "01",
      title: "Rose Date",
      image: "images/gallery/film-01.jpg",
      caption: "গোলাপ দেওয়াটা প্রথম নয়, তবে গোলাপ নিয়ে ছবি তোলাটা প্রথম। 🌹❤️"
    },
    {
      number: "02",
      title: "Durgapuja 2023",
      image: "images/gallery/film-02.jpg",
      caption: "তোমার সাথে প্রথম দুর্গাপূজা ❤️"
    },
    {
      number: "03",
      title: "Us, On Arambagh",
      image: "images/gallery/film-03.jpg",
      caption: "ভবিষ্যৎ নিয়ে জানি না কোথায় যাব,\nকিন্তু এই পথের প্রতিটা মুহূর্তই আমার কাছে priceless। ❤️"
    },
    {
      number: "04",
      title: "In Burdwan",
      image: "images/gallery/film-04.jpg",
      caption: "ওলে বাবা লে! 😄❤️"
    },
    {
      number: "05",
      title: "Durgapuja 2024",
      image: "images/gallery/film-05.jpg",
      caption: "তোমার সাথে দ্বিতীয় দুর্গাপূজা ❤️"
    },
    {
      number: "06",
      title: "Funny Moment",
      image: "images/gallery/film-06.jpg",
      caption: "হেহেহেহেহে 😂😂❤️"
    },
    {
      number: "07",
      title: "সেই ২০২৪-এর নবমী",
      image: "images/gallery/film-07.jpg",
      caption: "এমন মধুর সন্ধ্যায় একা কি থাকা যায়? ❤️"
    },
    {
      number: "08",
      title: "ঘুরতে গিয়ে",
      image: "images/gallery/film-08.jpg",
      caption: "দিনটা খুব সুন্দর ছিল। ❤️"
    },
    {
      number: "09",
      title: "পৌরসভার মেলা",
      image: "images/gallery/film-09.jpg",
      caption: "নাগরদোলনায় ❤️"
    },
    {
      number: "10",
      title: "A Special Date",
      image: "images/gallery/film-10.jpg",
      caption: "কিছু মনে পড়ছে...? 🙈❤️"
    },
    {
      number: "11",
      title: "Date in BongPizza",
      image: "images/gallery/film-11.jpg",
      caption: "বংপিজ্জার রিকশায় আমরা দুজন ❤️"
    },
    {
      number: "12",
      title: "A Memory to Keep",
      image: "images/gallery/film-12.jpg",
      caption: "দুটো হাত একসাথে হয়তো একটা ছোট্ট মুহূর্ত ছিল, কিন্তু সেই মুহূর্তেই যেন পুরো একটা জীবন লুকিয়ে ছিল। ❤️"
    },
    {
      number: "13",
      title: "Romania",
      image: "images/gallery/film-13.jpg",
      caption: "A Quality Time ❤️"
    },
    {
      number: "14",
      title: "Park Date",
      image: "images/gallery/film-14.jpg",
      caption: "শিশু উদ্যানে দুই শিশু 🙈❤️"
    },
    {
      number: "15",
      title: "Boromaa",
      image: "images/gallery/film-15.jpg",
      caption: "খুব সুন্দর মুহূর্ত ❤️"
    },
    {
      number: "16",
      title: "Durgapuja 2025",
      image: "images/gallery/film-16.jpg",
      caption: "সেই রাতে, রাত ছিল পূর্ণিমার। 🌕❤️"
    },
    {
      number: "17",
      title: "Mirror Selfie",
      image: "images/gallery/film-17.jpg",
      caption: "একটা ছোট্ট মুহূর্ত। ❤️"
    },
    {
      number: "18",
      title: "A Special Memory",
      image: "images/gallery/film-18.jpg",
      caption: "একটা ছোট্ট মুহূর্ত, কিন্তু মনে পড়ে গেলে মনে হয় যেন পুরো একটা জীবন লুকিয়ে আছে। ❤️"
    },
    {
      number: "19",
      title: "A Date with Tara Maa",
      image: "images/gallery/film-19.jpg",
      caption: "দ্বিতীয় তারাপীঠ পানপাতায় ❤️"
    }
  ],

  // ----------------------------------------------------------
  // 6. THE MIRROR OF US
  // Edit this section to personalize the dedicated mirror page.
  // Images below reuse existing site assets.
  // ----------------------------------------------------------
  mirrorContent: {
    youImage: "images/gallery/mirror-02.jpg",
    herImage: "images/gallery/mirror-01.jpg",
    yourSide: "She is the person who makes ordinary moments feel worth keeping. I notice her in the details: the way her smile changes a room, the warmth she brings to a quiet day, and the peace I find beside her.",
    herSide: "She means home to me in all the ways that matter. This is a space to write the things I still want her to know, in my own words.",
    ourSide: [
      { image: "images/gallery/memory-02.jpg", text: "A memory from our little museum." },
      { image: "images/gallery/memory-08.jpg", text: "Another small moment that became ours." },
      { image: "images/gallery/memory-12.jpg", text: "A shared day worth keeping close." }
    ],
    hiddenLetter: "If I had to choose one person\nto write every remaining chapter with...\n\nI would still choose you.\n\n— RAI FOREVER ❤️"
  },

  memoryGame: {
    letter: "আমাদের গল্পের প্রতিটা ছোট্ট মুহূর্ত আমার কাছে ভীষণ মূল্যবান।\n\n" +
      "তুমি শুধু আমার জীবনের একটা অংশ নও, তুমি সেই মানুষটা যার সঙ্গে আমি আমার বাকি গল্পটাও লিখতে চাই।\n\n" +
      "যত দিন যাবে, যত স্মৃতি জমবে—তবুও একটা জিনিস একই থাকবে,\n\n" +
      "প্রতিটা নতুন chapter-এ আমি তোমাকেই পাশে চাই। ❤️\n\n" +
      "তুমি ছিলে, তুমি আছো, আর আমার ইচ্ছে—তুমি যেন সবসময়ই থাকো।\n\n" +
      "তোমার সঙ্গে কাটানো প্রতিটা মুহূর্ত আমার কাছে একেকটা সুন্দর স্মৃতি,\n\n" +
      "আর তোমাকে নিয়ে লেখা এই গল্পটা আমি কখনো শেষ করতে চাই না। ❤️"
  },

  // ----------------------------------------------------------
  // 5. MEMORIES / GALLERY
  // Add as many as you like — the gallery lays itself out
  // automatically. caption + date are optional.
  // ----------------------------------------------------------
  gallery: [
    { image: "images/gallery/memory-01.jpg", caption: "", date: "", message: "বেলুড় ঘুরতে গিয়ে — কিছু সুন্দর স্মৃতি ✨." },
    { image: "images/gallery/memory-02.jpg", caption: "", date: "", message: "“২০২৪-এর নবমীতে, চারপাশে এত মানুষের মাঝেও আমার পৃথিবীটা ছিল শুধু তুমি। ❤️”" },
    { image: "images/gallery/memory-03.jpg", caption: "", date: "", message: "“২০২৫-এর সরস্বতী পুজোয়, তুমি আর আমি—আর আমাদের ছোট্ট একটা সুন্দর মুহূর্ত। 💛🌼”" },
    { image: "images/gallery/memory-04.jpg", caption: "", date: "", message: "“জয়রামবাটি বেড়াতে গিয়ে, তোমার সাথে কাটানো প্রতিটা মুহূর্তই যেন একেকটা সুন্দর স্মৃতি। ❤️”" },
    { image: "images/gallery/memory-05.jpg", caption: "", date: "", message: "“বড়মার মন্দিরে, তোমার সাথে কাটানো সেই মুহূর্তটা আজও আমার খুব প্রিয়। ❤️”" },
    { image: "images/gallery/memory-06.jpg", caption: "", date: "", message: "“২০২৫-এর অষ্টমীতে, তোমাকে পাশে পেয়ে দিনটা যেন আরও সুন্দর হয়ে উঠেছিল। ❤️”" },
    { image: "images/gallery/memory-07.jpg", caption: "", date: "", message: "“একদিন বিকেলে, হঠাৎ এমনিই দেখা—অথচ সেই ছোট্ট দেখাটাও আজ এক সুন্দর স্মৃতি। ❤️”" },
    { image: "images/gallery/memory-08.jpg", caption: "", date: "", message: "“Legend’s Cafe-তে, দুজন Legend—আর আমাদের গল্পটা একটু একটু করে আরও সুন্দর হয়ে উঠছিল। ❤️☕”" },
    { image: "images/gallery/memory-09.jpg", caption: "", date: "", message: "“পৌরসভার মেলায় নাগরদোলায়, তোমার সাথে কাটানো সেই মুহূর্তটা ছিল একদম অন্যরকম সুন্দর। 🎡❤️”" },
    { image: "images/gallery/memory-10.jpg", caption: "", date: "", message: "“শখের আহারে চা খেতে গিয়ে, আমাদের ছোট্ট ছোট্ট খুনসুটিগুলোই মুহূর্তটাকে এতটা সুন্দর করে তুলেছিল। ☕❤️”" },
    { image: "images/gallery/memory-11.jpg", caption: "", date: "", message: "“দাওয়াতে শুভদৃষ্টির সেই মুহূর্তে, তোমার চোখে চোখ রাখতেই যেন চারপাশটা একটু থমকে গিয়েছিল। ❤️✨”" },
    { image: "images/gallery/memory-12.jpg", caption: "", date: "", message: "“নৈহাটির বড়মার কাছে পুজো দিতে গিয়ে, তোমার সাথে কাটানো সেই মুহূর্তটা মনে এক অন্যরকম শান্তি এনে দিয়েছিল। ❤️🙏”" },
    { image: "images/gallery/memory-13.jpg", caption: "", date: "", message: "“খুনসুটির আরও এক মুহূর্ত—তোমার সাথে হাসি, দুষ্টুমি আর অকারণেই ভালো লেগে যাওয়া একটা বিকেল। ❤️”" },
    { image: "images/gallery/memory-14.jpg", caption: "", date: "", message: "“দিনটা সাধারণ হলেও, তোমার সাথে কাটানো মুহূর্তটা ছিল অসাধারণ। ❤️”" },
    { image: "images/gallery/memory-15.jpg", caption: "", date: "", message: "“সাধারণ একটা ক্লিক, কিন্তু কেন জানি এই ছবিটাই আমার সবচেয়ে প্রিয়গুলোর একটা। ❤️”" }
  ],

  // ----------------------------------------------------------
  // 6. THE HIDDEN LETTER
  // Shown after she opens the sealed letter. Use \n\n for a
  // new paragraph.
  // ----------------------------------------------------------
  letter: {
    buttonLabel: "Open Something Special",
    body:
      "প্রিয়তমা রাই ❤️\n\n"+
      "সব গল্প সবার সঙ্গে ভাগ করে নেওয়া যায় না। কিছু গল্প থাকে, যেগুলো শুধু একজন বিশেষ মানুষকে ঘিরেই তৈরি হয়। কিছু অনুভূতি মুখে বলা যায় না, কিছু মুহূর্তকে শুধু মনে রেখে দিতে ইচ্ছে করে।\n\n" +
      "এই ছোট্ট জায়গাটার মধ্যে লুকিয়ে আছে তেমনই কিছু কথা, কিছু অনুভূতি আর কিছু স্মৃতি—যেগুলো আমার কাছে ভীষণ special। হয়তো সব কথা তোমাকে কখনো বলা হয়ে ওঠেনি, কিন্তু প্রতিটা কথার পেছনে, প্রতিটা স্মৃতির মধ্যে তুমি জড়িয়ে আছো।\n\n" +
      "তাই একটু সময় নিয়ে দরজাটা খোলো… হয়তো ভেতরে এমন কিছু অপেক্ষা করছে, যেটা শুধু তোমার জন্যই রাখা। ❤️\n\n" +
      "কারণ কিছু জিনিস শুধু দেখা যায় না, অনুভব করতে হয়।\n\n" +
      "— তোমার ভালোবাসার Rick ❤️"
  },

  // ----------------------------------------------------------
  // 7. N8N CHATBOT INTEGRATION
  // ============================================================
  //  ⚠️  REPLACE THIS WITH YOUR REAL N8N CHAT WEBHOOK URL  ⚠️
  //  This is the ONLY place you need to configure the chatbot.
  //
  //  How to get it:
  //  1. In your n8n workflow, add a "Chat Trigger" node
  //     (or a Webhook node configured for chat).
  //  2. Copy the "Production URL" it gives you.
  //  3. Paste it below, replacing the placeholder string.
  //
  //  If this is left as the placeholder value, the chat widget
  //  will show a friendly "not configured yet" message instead
  //  of pretending to be a working assistant.
  // ============================================================
  n8n: {
    webhookUrl: "N8N_CHAT_WEBHOOK_URL", // <-- put your n8n webhook URL here
    // Optional: a static welcome message shown before n8n responds
    welcomeMessage: "Hi! I am Rick's Assistant. Ask me anything about our story, the shop, timings, delivery, or how to reach us.",
    inputPlaceholder: "Type a message…"
  },

};
