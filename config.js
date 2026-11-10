/* ───────────────────────────────────────────────────────────
   WEDDING SETTINGS — edit this one file to change the details
   on the invitation, the guest page, and the QR table card.
   ─────────────────────────────────────────────────────────── */
window.WEDDING = {
  groom: "Argie",
  bride: "Chatherine Kae",
  monogram: "A & C",

  // Wedding date & time (24h, local time of the venue)
  dateISO: "2027-10-16T15:00:00+08:00",
  dateLabel: "Saturday, the sixteenth of October",
  yearLabel: "Two thousand twenty-seven",

  ceremony: {
    title: "The Ceremony",
    time: "3:00 in the afternoon",
    place: "Church / Ceremony Venue Name",
    address: "Street, City, Province",
    mapUrl: "https://maps.google.com/?q=Church+Name+City"
  },
  reception: {
    title: "The Reception",
    time: "6:00 in the evening",
    place: "Reception Venue Name",
    address: "Street, City, Province",
    mapUrl: "https://maps.google.com/?q=Reception+Venue+City"
  },

  rsvpBy: "September 16, 2027",

  // Our story — shown as a timeline on the invitation
  story: [
    { when: "The beginning", title: "We met", text: "A simple hello that turned into the best conversation either of us had ever had." },
    { when: "The first date", title: "Coffee that lasted hours", text: "One cup became three, and the café had to remind us they were closing." },
    { when: "The question", title: "She said yes", text: "On one knee, hands shaking, heart certain. The easiest yes of her life." },
    { when: "Forever", title: "And now, this day", text: "We would love for you to be there as our story turns its next page." }
  ],

  dressCode: {
    title: "Garden Formal",
    note: "We'd love to see you in our wedding palette. Kindly avoid pure white, which we reserve for the bride.",
    swatches: [
      { name: "Matcha", hex: "#8A9A5B" },
      { name: "Sage", hex: "#B5C1A0" },
      { name: "Khaki", hex: "#C3B091" },
      { name: "Cream", hex: "#F3EBDD" },
      { name: "Mocha", hex: "#8B6F4E" }
    ]
  },

  gifts: "Your presence is the greatest gift. Should you wish to bless us further, a monetary gift toward our new home would be warmly appreciated.",

  faqs: [
    { q: "Can I bring a plus one?", a: "We have reserved a set number of seats for you. The RSVP form shows how many we've saved." },
    { q: "Are kids welcome?", a: "We love your little ones, but our celebration is an adults-only affair." },
    { q: "Is there parking?", a: "Yes, both venues have free parking for guests." },
    { q: "Can I take photos?", a: "Please keep phones away during the ceremony. At the reception, snap away and share them on our guest page!" }
  ],

  // Hashtag shown on the guest page and QR card
  hashtag: "#ArgieAndKaeForever",

  /* Guest page link that the QR code opens.
     Leave empty to use guest.html next to the invitation automatically.
     After you host the site, you can paste the full link here, e.g.
     "https://argie-and-kae.netlify.app/guest.html" */
  guestUrl: "",

  /* Supabase connection (free). Leave empty to run in DEMO MODE,
     where everything is saved only in this browser.
     See SETUP.md for the 5-minute setup. */
  supabaseUrl: "https://aurdivdqtlfzhurpergd.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1cmRpdmRxdGxmemh1cnBlcmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNjEzNTgsImV4cCI6MjEwOTgzNzM1OH0.sCQT-UMkXkueE9kzhzodpEyrYJW685PfAeYx3J-eLqw",

  // "How well do you know us?" quiz — answer is the index of the right choice
  quiz: [
    { q: "Where did Argie and Kae first meet?", choices: ["At school", "Through friends", "At work", "Online"], answer: 1 },
    { q: "Who said \"I love you\" first?", choices: ["Argie", "Kae", "Both at the same time", "Still debating"], answer: 0 },
    { q: "What is their go-to date night?", choices: ["Movie marathon", "Fancy dinner", "Coffee & long talks", "Road trip"], answer: 2 },
    { q: "Who is the better cook?", choices: ["Argie", "Kae", "Neither, they order in", "Their mothers"], answer: 1 },
    { q: "Where is the dream honeymoon?", choices: ["Japan", "Maldives", "Italy", "Iceland"], answer: 0 }
  ],

  // "Who's more likely to…" live poll
  polls: [
    "Who's more likely to cry during the vows?",
    "Who's more likely to be late?",
    "Who's more likely to win an argument?",
    "Who's more likely to plan the anniversary surprise?",
    "Who's more likely to fall asleep first on movie night?"
  ],

  // Photo scavenger hunt prompts
  hunt: [
    "A selfie with the bride",
    "A selfie with the groom",
    "Someone crying happy tears",
    "The best dance move of the night",
    "Your table, all smiling",
    "The most beautiful detail you spotted",
    "A guest you just met",
    "The first kiss (from your seat)",
    "Someone sneaking dessert",
    "A candid laugh"
  ]
};
