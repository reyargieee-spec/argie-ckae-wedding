# Argie & Chatherine Kae — Wedding Site

| File | What it is |
|---|---|
| `index.html` | The animated invitation (envelope → story → details → attire → FAQ → RSVP) |
| `guest.html` | The guest page the QR code opens: photo wall, wishes wall, games, time capsule, song requests |
| `qr-card.html` | A printable 5×7 table card with the QR code |
| `config.js` | **Edit this** for names, date, venues, story, quiz answers, polls, hunt prompts |
| `store.js` | Saves data to Supabase (or this browser in demo mode) |
| `supabase-setup.sql` | Creates the database tables and photo storage |

## 1. Fill in your details
Open `config.js` and replace the date, venue names, addresses, map links, story and quiz answers.

## 2. Connect the shared database (free, ~5 minutes)
Without this, everything runs in **demo mode** (only saved on the device you're using).

1. Create a free project at supabase.com.
2. Open **SQL Editor → New query**, paste all of `supabase-setup.sql`, click **Run**.
3. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
4. Paste them into `config.js` as `supabaseUrl` and `supabaseAnonKey`.

To read RSVPs and time-capsule letters, or remove a photo/wish: Supabase → **Table Editor**.

## 3. Put it online
Any static host works. Easiest: drag this whole folder onto **app.netlify.com/drop** (free account).
You'll get a link like `https://argie-and-kae.netlify.app`.

- Invitation link to send guests: `https://…/`
- Guest page: `https://…/guest.html`

Optionally paste the guest page link into `guestUrl` in `config.js`, then re-upload.

## 4. Print the QR cards
Open `https://…/qr-card.html` on the **live site** (so the QR points to the real link), scan it with your phone to test, then click **Print card**.
