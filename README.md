# Mission Division — Field Schedule

A self-contained, installable web app for tracking crew schedules. Works offline, installs like a native app on iPhone and Android, and comes pre-loaded with 107 jobs from your existing schedule.

## What's new in v2

Full mobile redesign:
- **Hamburger menu** opens a slide-in drawer with all filters/search/view controls
- **Week grid stacks vertically** on phones — each day is a full-width card, easy to scan and tap
- **Floating action button** (bottom-right) for quickly adding a new job
- **Modals go full-screen** on mobile for comfortable form filling
- **Overflow menu** (three-dot button, top-right) for Export / Reset
- **Larger tap targets** — buttons meet the 44pt minimum for iOS
- **iPhone safe-area insets** respected (notch, home indicator)
- **No hover traps** on touch devices — touches always work instantly

Desktop layout is unchanged. The app detects the viewport automatically and swaps between layouts at 768px.

## Files in this folder

| File | What it is |
|---|---|
| `index.html` | Entry point |
| `app.js` | The full React app (pre-compiled, no build step needed) |
| `app.jsx` | Source version of `app.js` — edit this if you want to change the app |
| `manifest.json` | PWA metadata (name, icons, colors) |
| `sw.js` | Service worker — enables offline use |
| `icon.svg`, `icon-192.png`, `icon-512.png` | App icons |

**Your schedule data lives in each device's browser** (localStorage). Changes made on one phone don't sync to another. That's Phase 2 when we add a backend.

---

## Deploy to GitHub Pages (5 minutes)

### 1. Create a GitHub account
If you don't have one, go to [github.com/signup](https://github.com/signup) — free.

### 2. Create a new repository
- Click the `+` in the top right → **New repository**
- Name it something like `mission-schedule` (this will become part of the URL)
- Make it **Public** (GitHub Pages is free for public repos)
- Don't check any of the "Initialize with" boxes
- Click **Create repository**

### 3. Upload these files
- On the new empty repo page, click **uploading an existing file**
- Drag every file from this folder into the browser
- At the bottom, click **Commit changes**

### 4. Turn on GitHub Pages
- Go to the repo's **Settings** tab
- In the left sidebar, click **Pages**
- Under "Source", pick **Deploy from a branch**
- Branch: `main`, folder: `/ (root)`, then click **Save**
- Wait 30–60 seconds

### 5. Get your link
Your app is now live at:

```
https://YOUR-USERNAME.github.io/mission-schedule/
```

Give it a minute; GitHub sometimes takes up to 5 minutes on the first deploy. Refresh the Pages settings page — it'll show the URL when ready.

---

## Install as an app on your phone

### iPhone (Safari only — Chrome on iOS can't install PWAs)
1. Open the URL in **Safari**
2. Tap the **Share** button (square with up-arrow, bottom center)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

The icon will appear on your home screen. Tap it — it launches fullscreen, no browser chrome, looks like a native app.

### Android (Chrome)
1. Open the URL in **Chrome**
2. Tap the **⋮** menu (top right)
3. Tap **Install app** or **Add to Home Screen**
4. Confirm

### Desktop (Chrome/Edge)
1. Open the URL
2. Click the **install icon** in the address bar (looks like a monitor with a down arrow) — or the `⋮` menu → **Install Mission Division**

---

## Updating the app later

Once it's live on GitHub Pages, any time you:
- Edit a file and upload the new version to the repo
- GitHub Pages auto-redeploys in ~30 seconds

**One gotcha with PWAs:** installed phones cache the old version aggressively. If you make changes, bump the `CACHE_VERSION` in `sw.js` (e.g. `"mission-v1"` → `"mission-v2"`). Next time users open the app, it'll fetch fresh files.

---

## Editing the app

- `app.jsx` is the React source — all components, state, styling
- `app.js` is the compiled version the browser runs

If you edit `app.jsx`, you need to re-compile it to `app.js`. Easiest way: ask Claude to do it, or install Node.js and run:

```bash
npx @babel/cli --presets=@babel/preset-react app.jsx -o app.js
```

For quick tweaks (colors, text, sizes), you can also edit `app.js` directly — it's just standard JavaScript.

---

## Privacy & data

- All schedule data stays **on the device** in the browser's localStorage
- Nothing is sent anywhere
- The app is a static site — no server, no tracking, no analytics
- The only external requests are to `unpkg.com` (for React) and `fonts.googleapis.com` (for fonts) — both cached after first load, and both from reputable CDNs

---

## What's next (Phase 2 — needs a backend)

Not built yet, but the plan:

- User accounts so multiple dispatchers see the same schedule
- Real-time sync between phones/desktops
- Field-crew mobile view (read-only their own jobs)
- Audit log of all changes
- Photo/document attachments on jobs
- Search across all historical data

If you're ready for that, start a new conversation and say "let's add the backend to mission-schedule."

---

## Troubleshooting

**App shows the loading spinner forever**
- Check the browser's Developer Tools → Console for red errors
- Most likely cause: the browser can't reach unpkg.com (corporate firewall?) — you'd need to self-host React instead

**I lost my data after updating**
- Data lives in `localStorage` keyed to the URL. If your URL changes, the data won't carry over.
- Use the **Export** button in the header to download a JSON backup before making changes

**The 107 seed jobs show up after I thought I deleted them**
- Click the circular arrow (reset) button in the header — that's the "restore seed data" button. Don't click it unless you want to start over.
- If you genuinely emptied the schedule and the seeds came back on their own, that's a bug — please let me know.

**Changes I make in Safari don't appear in Chrome (or vice versa)**
- Expected. Each browser has its own localStorage. Until we add a backend, each browser/device is independent.

---

## Credits

- Built with React 18
- Icons adapted from [Lucide](https://lucide.dev/) (MIT license)
- Fonts: Barlow / Barlow Condensed / JetBrains Mono via Google Fonts
