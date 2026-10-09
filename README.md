# Yathish Veerabhadraiah · portfolio

A single-page, dependency-free, hacker-styled portfolio: a full-body waving hello as the hero with a client-side "I'm watching you" intel panel, a phrase ticker, a live ops console (talking intro feed, interactive terminal, skill telemetry), three hacker avatar cards, a flipping access badge, a periodic table of skills, a sideways-scrolling animated trophy cabinet, timeline, projects, education and contact.

## Run locally

Any static server works. From this folder:

```bash
python -m http.server 8765
```

Then open http://localhost:8765. (Opening `index.html` directly from disk also works, but some browsers block video autoplay and clipboard access on `file://`.)

## Edit content

Everything textual lives in `js/data.js`: name, links, typed roles, the avatar clips and their captions, skills (with their periodic-table grid position), experience, achievements, projects, education and certifications. The HTML only holds layout and the hero/badge copy.

## Assets

- `assets/video/intro-1.mp4`, `intro-2.mp4`, `intro-3.mp4`: talking-avatar clips generated with Higgsfield (Wan 2.7) from tight crops of the seated and standing suit photos, lip-synced to a synthetic voice (Seed Audio, "Arthur" preset). Shorter segments keep the lip sync tighter, so the intro is cut into three takes with a glitch transition between them.
- `assets/video/body-wave.mp4` + `assets/img/body-poster.jpg`: full-body standing avatar for the hero. The still was generated with Nano Banana Pro from the suit photos, then animated with Wan 2.7 (4 s wave + spoken "Hello! I'm Yathish.").
- `assets/img/avatar-watching.jpg`, `avatar-terminal.jpg`: hacker-style avatars (GPT Image 2.5 from the suit portrait) used by the "I'm watching you" and "You have been pwned" cards; the third card renders the suit portrait as live ASCII art on a canvas.
- `assets/audio/intro-part1.mp3`, `intro-part2a.mp3`, `intro-part2b.mp3`, `hello.mp3`: the voiceover tracks used for the clips (`intro-part2.mp3` is the unsplit original).
- `assets/img/*-web.jpg`: web-sized photos; `hero-poster.jpg` is the avatar poster; `id-photo.jpg` is the badge crop.
- `assets/Yathish_Veerabhadraiah_Resume.pdf`: résumé served by the download buttons.

## Hosting

Live in two places:

- **Firebase Hosting:** https://yathish-portfolio-aab92.web.app (project `yathish-portfolio-aab92`, account yathishnv27@gmail.com). Config is in `firebase.json` (cache headers for media, `nosniff`/`SAMEORIGIN`/referrer-policy security headers, clean URLs) and `.firebaserc`. Redeploy with:

  ```bash
  firebase deploy --only hosting
  ```

  To attach a custom domain: Firebase console → Hosting → Add custom domain, then add the DNS records it shows.

- **GitHub Pages:** https://yathish27.github.io/, served from the `main` branch of https://github.com/Yathish27/Yathish27.github.io (this folder is that repository). To publish a change:

```bash
git add -A && git commit -m "Update portfolio" && git push
```

GitHub Pages rebuilds in about a minute. It is plain HTML/CSS/JS with no build step, so the same folder also drops straight onto Netlify, Vercel, Cloudflare Pages or an S3 + CloudFront bucket if you ever move it. To use a custom domain, add a `CNAME` file containing the domain and point the domain's DNS at GitHub Pages.

## Behaviour notes

- The ops console terminal understands `help`, `whoami`, `about`, `skills [group]`, `experience`, `projects`, `achievements`, `education`, `contact`, `resume`, `ls`, `cat <file>`, `open <section>`, `nmap yathish`, `sudo hire yathish`, `pwn`, `watch`, `motd`, `hello`, `play` and `clear`, with Tab completion and arrow-key history. Command output is built from `js/data.js`, so it stays in sync with the rest of the site; the live log lines come from `DATA.feedLines` and the bars from `DATA.telemetry`.

- Hero: the full-body hello plays once, muted, when the page loads and then holds its last frame. "Hear me say hello" replays it with sound. The intel panel reads browser, OS, screen, locale, time zone, cores and connection from the visitor's own browser APIs; nothing is sent anywhere.
- SOC console feed: the three talking-intro clips loop muted until "Play my intro"; then they play in sequence with sound, captions and a glitch cut. If the video files fail to load, the page falls back to the poster photo plus the browser's speech synthesis.
- The achievements section is a glass trophy cabinet: every entry in `DATA.achievements` becomes an SVG trophy (`shape`: cup, medal, plaque, shield, star, bolt or flag; `metal`: gold, silver, bronze, cyan, rose, blue, violet or amber) on one of two lit shelves with an engraved plate. The section pins itself and converts vertical scrolling into a walk along the cabinet on screens wider than 900 px (a spotlight follows the scroll and the pointer); on phones the cabinet swipes sideways. Hover or tap a trophy to read its plaque.
- `prefers-reduced-motion` disables the particle field, auto-flip, swing and glitch effects.
