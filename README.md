# 📻 Heal Broadcast

> **Anonymous confessions, live-podcast radio, and music streaming community platform with late-night healing vibes.**  
> Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide Icons**.

---

## ✨ Features

- **Live Broadcast Studio**: Live stream player with interactive Web Audio API synthesizer for late-night lofi chords, ambient drones, real-time waveform visualizers, and interactive on-air phone-in requests.
- **Styled Pop Messages**: Pop messages in the Live Chat & On-Air Broadcast screen with styled badges (💖 *Love Pop*, 🌟 *Midnight Pop*, 🔥 *Flame Pop*, 🎙️ *On-Air Pop*, ☕ *Warm Hug*) that trigger screen-wide floating heart effects and pinned highlights.
- **Global Music Search & Playback**: Search for **any song or artist in the world** via the integrated iTunes Search API with instant 30-second authentic audio preview streaming and high-resolution album covers.
- **Custom Playlists**: Create unlimited custom playlists, curate night tracks, add or remove any song on the fly, and play continuous ordered track queues.
- **Anonymous Confession System**: Submit heartfelt secrets with mood categories (*Love, Heartbreak, Crush, Regret, Secret, Gratitude*), random alias generation, character limits, and persistent storage in `localStorage`.
- **Live Interactive Chat**: Auto-streaming community reactions, 12K listener counter, floating heart animations, and styled anonymous message posting.
- **Community Circles**: Dedicated rooms (*Late Night Feels, Healing Hearts, First Love Nostalgia, Unsent Letters, Long Distance Tales, Midnight Musings*) with member counts and prompt discussions.
- **Anonymous Direct Messages**: Private, anonymized 1-on-1 messaging inbox.
- **Episodes Library**: Over 140 archived midnight radio broadcasts with tag filters, duration counters, and mini-player controls.
- **Persistent Bottom Player**: Scrubbable progress bar, volume controls, mute toggle, skip forward/backward, and bookmarking for both songs and episodes.
- **Responsive Design**: Full 3-column dashboard for desktop, collapsible icon rail for tablets, and bottom navigation bar with slide-up chat drawer for mobile.

---

## 🚀 How to Run on Any Computer (Windows, Mac, or Linux)

### Prerequisites
Make sure **Node.js** (version 18 or higher) and **npm** are installed on your computer.
To check, run:
```bash
node -v
npm -v
```
*(If you don't have Node.js, download the LTS version from [nodejs.org](https://nodejs.org)).*

### 1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd love-broadcast
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production
```bash
npm run build
```
This will compile and optimize the app into the `dist/` folder.

### 5. Preview the production build locally
```bash
npm run preview
```

---

## 🌐 How to Upload to GitHub

Follow these steps in your terminal inside the project root folder:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Commit your changes
git commit -m "feat: complete Love Broadcast platform"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 6. Push to GitHub
git push -u origin main
```

---

## ⚡ How to Deploy to Netlify

This project includes pre-configured **`netlify.toml`** and **`public/_redirects`** files, so Netlify works automatically with zero manual configuration.

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose **GitHub** and select your `love-broadcast` repository.
4. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**. Your site will be live within seconds!
6. Every time you push changes to GitHub, Netlify will automatically rebuild and update your site.

### Option 2: Drag and Drop (No Git required)
1. Run `npm run build` in your terminal.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated **`dist`** folder onto the page.
4. Your site is instantly live!

### Option 3: Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login and deploy
netlify deploy --prod --dir=dist
```

---

## 📁 Project Structure

```
├── public/
│   └── _redirects          # SPA client routing fallback for Netlify
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AudioPlayer.tsx     # Bottom mini audio player & visualizer
│   │   ├── ConfessionCard.tsx  # Confession card with likes & replies
│   │   ├── ConfessionModal.tsx # Post confession modal dialog
│   │   ├── EpisodeCard.tsx     # Podcast episode card with play triggers
│   │   ├── Header.tsx          # Top tabs, search, notifications
│   │   ├── LiveChat.tsx        # Auto-scrolling chat & floating hearts
│   │   └── Sidebar.tsx         # Responsive sidebar & mobile navigation
│   ├── context/
│   │   └── AppContext.tsx      # Global state & localStorage persistence
│   ├── data/
│   │   └── mockData.ts         # High-fidelity realistic mock data
│   ├── pages/
│   │   ├── HomePage.tsx        # Hero banner, action cards, trending feeds
│   │   ├── LivePage.tsx        # Now Live studio broadcast view
│   │   ├── ConfessionsPage.tsx # Filterable confessions wall
│   │   ├── EpisodesPage.tsx    # Podcast archive catalog
│   │   ├── CommunityPage.tsx   # Discussion circles & prompts
│   │   ├── MessagesPage.tsx    # Anonymous DM inbox
│   │   ├── MyListPage.tsx      # Saved stories & bookmarked episodes
│   │   ├── ProfilePage.tsx     # Alias customizer, badges, & stats
│   │   └── AboutPage.tsx       # Station story, schedule, & hosts
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── audioSynthesizer.ts # Web Audio API late-night lofi synthesizer
│   ├── App.tsx             # Root layout & route coordinator
│   ├── index.css           # Tailwind CSS imports & custom glowing styles
│   └── main.tsx            # React 19 entry point
├── .gitignore              # Ignores node_modules, build outputs, & OS cache
├── index.html              # HTML shell with Google Fonts & metadata
├── netlify.toml            # Netlify build & redirect configuration
├── package.json            # Scripts, dependencies, and Node engine requirements
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with React & Tailwind plugins
```

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion v12) + CSS Keyframe Animations
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API (Native browser synthesizer)
- **Data Persistence**: LocalStorage (Zero external server requirement)
- **Deployment**: Netlify / Vercel / GitHub Pages ready
