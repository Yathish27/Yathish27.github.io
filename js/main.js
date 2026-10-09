/* ==================================================================
   YNV portfolio · behaviour
   ================================================================== */
(() => {
  'use strict';
  const D = window.DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const once = (el, ev) => new Promise((r) => el.addEventListener(ev, r, { once: true }));

  /* ---------- toast ---------- */
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  document.body.appendChild(toastEl);
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  /* ---------- background particle network ---------- */
  function initBg() {
    const c = $('#bg');
    if (!c) return;
    const ctx = c.getContext('2d');
    let w = 0, h = 0, pts = [], raf = 0;
    const count = () => Math.min(90, Math.floor((w * h) / 16000));
    function resize() {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      pts = Array.from({ length: count() }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const o = 1 - Math.sqrt(d2) / 120;
            ctx.strokeStyle = `rgba(56,232,255,${(o * 0.16).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(56,232,255,.65)';
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
      if (!reduced) raf = requestAnimationFrame(frame);
    }
    resize();
    addEventListener('resize', resize);
    frame();
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) frame();
    });
  }

  /* ---------- cursor glow ---------- */
  function initCursor() {
    const g = $('#cursorGlow');
    if (!g || !canHover) return;
    addEventListener('pointermove', (e) => { g.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }, { passive: true });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $('.nav'), links = $$('.nav-links a'), burger = $('#burger');
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.forEach((a) => a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
    const secs = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  /* ---------- typed roles ---------- */
  function initTyped() {
    const el = $('#typed');
    const words = D.typed;
    if (reduced) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, del = false;
    function tick() {
      const w = words[wi];
      if (!del) {
        ci++; el.textContent = w.slice(0, ci);
        if (ci === w.length) { del = true; return setTimeout(tick, 1700); }
      } else {
        ci--; el.textContent = w.slice(0, ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, del ? 38 : 68);
    }
    tick();
  }

  /* ---------- flipping ID card ---------- */
  function initIdCard() {
    const card = $('#idCard'), btn = $('#flipBtn'), stage = $('.badge-stage');
    let interacted = false;
    const setFlipped = (on) => { card.classList.toggle('flipped', on); card.setAttribute('aria-pressed', String(on)); };
    const toggle = () => { interacted = true; setFlipped(!card.classList.contains('flipped')); };
    card.addEventListener('click', toggle);
    btn.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    card.addEventListener('pointerenter', () => { interacted = true; });

    // Auto-flip while visible until the visitor interacts.
    if (!reduced) {
      let timer = 0;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          clearInterval(timer);
          if (e.isIntersecting) {
            timer = setInterval(() => { if (!interacted) setFlipped(!card.classList.contains('flipped')); else clearInterval(timer); }, 4200);
          }
        });
      }, { threshold: 0.5 });
      io.observe(card);
    }

    // Mouse tilt on desktop.
    if (!reduced && canHover) {
      stage.addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', `${(y * -10).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
      });
      stage.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    }

    // Deterministic QR-like pattern (decorative).
    const qr = $('#idQr');
    if (qr) {
      let seed = 20260407;
      const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
      const n = 21, cells = [];
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const finder = (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
          let on;
          if (finder) {
            const fx = x < 7 ? x : x - (n - 7), fy = y < 7 ? y : y - (n - 7);
            const ring = Math.max(Math.abs(fx - 3), Math.abs(fy - 3));
            on = ring === 3 || ring <= 1;
          } else on = rnd() > 0.56;
          cells.push(on ? '<i class="on"></i>' : '<i></i>');
        }
      }
      qr.innerHTML = cells.join('');
    }
  }

  /* ---------- periodic table ---------- */
  function initSkills() {
    const wrap = $('#ptable'), filters = $('#ptFilters'), tip = $('#ptTip');
    const G = D.skillGroups;
    filters.innerHTML = '<button class="pt-f on" type="button" data-g="all"><i></i>All elements</button>' +
      Object.entries(G).map(([k, g]) => `<button class="pt-f" type="button" data-g="${k}" style="--col:${g.color}"><i></i>${esc(g.label)}</button>`).join('');
    wrap.innerHTML = D.skills.map((s, i) =>
      `<button class="pt-el" type="button" data-i="${i}" data-g="${s.g}" style="--col:${G[s.g].color};--r:${s.r};--c:${s.c}" aria-label="${esc(s.name)}">` +
      `<span class="n">${i + 1}</span><span class="m">${s.mass ? s.mass.toFixed(1) : 'β'}</span><span class="s">${esc(s.sym)}</span><span class="nm">${esc(s.name)}</span></button>`
    ).join('');

    filters.addEventListener('click', (e) => {
      const b = e.target.closest('.pt-f');
      if (!b) return;
      $$('.pt-f', filters).forEach((x) => x.classList.toggle('on', x === b));
      const g = b.dataset.g;
      const els = $$('.pt-el', wrap);
      if (g === 'all') { wrap.classList.remove('filtered'); els.forEach((el) => el.classList.remove('on')); }
      else { wrap.classList.add('filtered'); els.forEach((el) => el.classList.toggle('on', el.dataset.g === g)); }
    });

    let current = null;
    function position(el) {
      const r = el.getBoundingClientRect();
      const tw = tip.offsetWidth, th = tip.offsetHeight;
      let x = r.left + r.width / 2 - tw / 2;
      let y = r.top - th - 12;
      x = Math.max(8, Math.min(innerWidth - tw - 8, x));
      if (y < 8) y = r.bottom + 12;
      tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    }
    function show(el) {
      const s = D.skills[+el.dataset.i], g = G[s.g];
      const yrs = s.mass ? `${s.mass} yr${s.mass > 1 ? 's' : ''} hands-on` : 'in progress';
      tip.innerHTML = `<div class="tip-head" style="--col:${g.color}"><b>${esc(s.sym)}</b><div><strong>${esc(s.name)}</strong><span>${esc(g.label)} · ${yrs}</span></div></div><p>${esc(s.where)}</p>`;
      tip.hidden = false;
      $$('.pt-el.active', wrap).forEach((x) => x.classList.remove('active'));
      el.classList.add('active');
      position(el);
      current = el;
    }
    function hide() { tip.hidden = true; if (current) current.classList.remove('active'); current = null; }
    wrap.addEventListener('mouseover', (e) => { const el = e.target.closest('.pt-el'); if (el && canHover) show(el); });
    wrap.addEventListener('mouseleave', () => { if (canHover) hide(); });
    wrap.addEventListener('click', (e) => {
      const el = e.target.closest('.pt-el');
      if (!el) return;
      if (current === el && !tip.hidden) hide(); else show(el);
    });
    wrap.addEventListener('focusin', (e) => { const el = e.target.closest('.pt-el'); if (el) show(el); });
    addEventListener('scroll', () => { if (!tip.hidden && current) position(current); }, { passive: true });
    document.addEventListener('click', (e) => { if (!e.target.closest('#ptable')) hide(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  }

  /* ---------- timeline ---------- */
  function initTimeline() {
    $('#timeline').innerHTML = D.experience.map((x) =>
      `<li class="tl-item reveal"><div class="tl-node"></div><article class="tl-card"><header><div><h3>${esc(x.role)}</h3><p class="tl-org">${esc(x.org)} · ${esc(x.place)}</p></div>` +
      `<div class="tl-meta"><span class="tag">${esc(x.tag)}</span><time>${esc(x.period)}</time></div></header><ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></article></li>`
    ).join('');
  }

  /* ---------- trophy cabinet: SVG trophies on lit glass shelves ---------- */
  const METALS = {
    gold:   { light: '#ffe9a3', mid: '#f4c454', dark: '#9a6a12', glow: 'rgba(255,196,84,.55)' },
    silver: { light: '#ffffff', mid: '#cfd8e6', dark: '#6f7d93', glow: 'rgba(207,216,230,.5)' },
    bronze: { light: '#ffd0a8', mid: '#d4925c', dark: '#7a4a22', glow: 'rgba(212,146,92,.5)' },
    cyan:   { light: '#dffbff', mid: '#38e8ff', dark: '#0b7f93', glow: 'rgba(56,232,255,.55)' },
    rose:   { light: '#ffd6dd', mid: '#fb7185', dark: '#8a2437', glow: 'rgba(251,113,133,.55)' },
    blue:   { light: '#d9e8ff', mid: '#6aa6ff', dark: '#1f4f9c', glow: 'rgba(106,166,255,.55)' },
    violet: { light: '#ecdcff', mid: '#a78bfa', dark: '#5333a8', glow: 'rgba(167,139,250,.55)' },
    amber:  { light: '#ffe6b8', mid: '#ffb547', dark: '#9a5a0c', glow: 'rgba(255,181,71,.55)' }
  };
  function trophySvg(shape, metal, i, rank) {
    const m = METALS[metal] || METALS.gold;
    const g = `tg${i}`, h = `th${i}`;
    const defs = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${m.dark}"/><stop offset=".35" stop-color="${m.light}"/><stop offset=".55" stop-color="${m.mid}"/><stop offset="1" stop-color="${m.dark}"/></linearGradient>` +
      `<linearGradient id="${h}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.light}"/><stop offset="1" stop-color="${m.dark}"/></linearGradient></defs>`;
    const base = `<path d="M34 116h52l8 12H26z" fill="url(#${g})"/><rect x="22" y="128" width="76" height="9" rx="2" fill="#0d1526" stroke="#2a3650"/>`;
    let body = '';
    switch (shape) {
      case 'cup':
        body = `<path d="M30 14h60v32c0 20-13 38-30 38S30 66 30 46z" fill="url(#${g})"/><path d="M30 22H13c-1 20 8 34 22 37" fill="none" stroke="url(#${g})" stroke-width="7" stroke-linecap="round"/><path d="M90 22h17c1 20-8 34-22 37" fill="none" stroke="url(#${g})" stroke-width="7" stroke-linecap="round"/>` +
          `<rect x="53" y="84" width="14" height="22" fill="url(#${h})"/><path d="M40 106h40v10H40z" fill="url(#${g})"/><ellipse cx="60" cy="14" rx="30" ry="5" fill="${m.light}" opacity=".9"/><path d="M44 30c2 18 8 30 16 36" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round" fill="none"/>` + base;
        break;
      case 'medal':
        body = `<path d="M44 8h14l10 44H34z" fill="#c0263c"/><path d="M62 8h14l-10 44H56z" fill="#1d4ed8"/><circle cx="60" cy="86" r="34" fill="url(#${g})"/><circle cx="60" cy="86" r="26" fill="url(#${h})" stroke="${m.light}" stroke-width="1.5"/>` +
          `<text x="60" y="97" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="30" fill="${m.dark}">${rank || '1'}</text><path d="M38 70c6-10 14-16 24-18" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/>`;
        break;
      case 'plaque':
        body = `<rect x="14" y="22" width="92" height="96" rx="8" fill="#3a2316" stroke="#6a4327" stroke-width="3"/><rect x="24" y="32" width="72" height="76" rx="4" fill="url(#${g})"/><rect x="32" y="42" width="56" height="4" rx="2" fill="${m.dark}" opacity=".7"/><rect x="32" y="54" width="56" height="4" rx="2" fill="${m.dark}" opacity=".5"/><rect x="32" y="66" width="40" height="4" rx="2" fill="${m.dark}" opacity=".5"/><rect x="32" y="84" width="56" height="14" rx="3" fill="#0d1526" opacity=".85"/>` +
          `<text x="60" y="94" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="${m.light}">SPRINGER · SCF 2025</text>` + base;
        break;
      case 'shield':
        body = `<path d="M60 8l40 14v34c0 28-17 50-40 60C37 106 20 84 20 56V22z" fill="url(#${g})"/><path d="M60 20l29 10v26c0 21-12 38-29 46-17-8-29-25-29-46V30z" fill="url(#${h})" opacity=".9"/><path d="M44 60l11 11 22-24" fill="none" stroke="#0d1526" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` + base;
        break;
      case 'star':
        body = `<path d="M60 6l15 32 35 4-26 24 7 35-31-18-31 18 7-35L10 42l35-4z" fill="url(#${g})"/><path d="M60 24l9 20 22 2-16 15 4 22-19-11-19 11 4-22-16-15 22-2z" fill="url(#${h})" opacity=".85"/><rect x="53" y="98" width="14" height="18" fill="url(#${h})"/>` + base;
        break;
      case 'bolt':
        body = `<circle cx="60" cy="60" r="46" fill="#0d1526" stroke="url(#${g})" stroke-width="6"/><path d="M66 18L36 66h22l-8 36 36-52H64z" fill="url(#${g})"/><rect x="53" y="104" width="14" height="12" fill="url(#${h})"/>` + base;
        break;
      case 'flag':
        body = `<rect x="34" y="10" width="6" height="106" rx="3" fill="url(#${h})"/><path d="M40 14h56l-14 18 14 18H40z" fill="url(#${g})"/><text x="66" y="37" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="12" fill="#0d1526">CTF</text><circle cx="37" cy="10" r="5" fill="${m.light}"/>` + base;
        break;
      default:
        body = `<circle cx="60" cy="70" r="40" fill="url(#${g})"/>` + base;
    }
    return `<svg viewBox="0 0 120 140" aria-hidden="true">${defs}${body}</svg>`;
  }

  function initAchievements() {
    const section = $('#achievements'), track = $('#achTrack'), prog = $('#achProg');
    const items = D.achievements;
    const perShelf = Math.ceil(items.length / 2);
    const shelves = [items.slice(0, perShelf), items.slice(perShelf)];
    const trophy = (a, i) => {
      const m = METALS[a.metal] || METALS.gold;
      return `<figure class="trophy" style="--i:${i};--glow:${m.glow};--accent:${a.accent}" tabindex="0" aria-label="${esc(a.title)}">` +
        `<i class="puck" aria-hidden="true"></i><div class="trophy-obj">${trophySvg(a.shape, a.metal, i, a.rank)}<i class="spark s1"></i><i class="spark s2"></i></div>` +
        `<figcaption class="plate"><b>${esc(a.title)}</b><span>${esc(a.kicker)}</span></figcaption>` +
        `<div class="trophy-detail"><p class="ach-kicker">${esc(a.kicker)}</p><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></div></figure>`;
    };
    track.innerHTML = `<div class="cabinet" id="cabinet" style="--slots:${perShelf}">` +
      `<div class="cab-crown" aria-hidden="true"><span>YNV · TROPHY CABINET · EST. 2017</span></div>` +
      `<div class="cab-interior"><div class="cab-led" aria-hidden="true"></div>` +
      shelves.map((row, r) => `<div class="cab-shelf" data-shelf="${r}">${row.map((a, k) => trophy(a, r * perShelf + k)).join('')}<div class="shelf-board"></div></div>`).join('') +
      `<div class="cab-spot" aria-hidden="true"></div></div>` +
      `<div class="cab-doors" aria-hidden="true"><i class="pane"></i><i class="pane"></i><b class="handle l"></b><b class="handle r"></b></div>` +
      `<div class="cab-plinth" aria-hidden="true"><span>${items.length} AWARDS · HANDLE WITH CARE</span></div></div>`;
    const cabinet = $('#cabinet');

    // staggered entrance when the cabinet comes into view
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { cabinet.classList.add('lit'); io.disconnect(); } }), { threshold: 0.2 });
    io.observe(cabinet);

    const mq = matchMedia('(min-width: 901px)');
    let maxX = 0, start = 0;
    function onScroll() {
      if (!mq.matches || !maxX) return;
      const p = Math.min(1, Math.max(0, (scrollY - start) / maxX));
      track.style.transform = `translate3d(${(-p * maxX).toFixed(1)}px,0,0)`;
      prog.style.transform = `scaleX(${p.toFixed(4)})`;
      cabinet.style.setProperty('--spot', `${(8 + p * 84).toFixed(1)}%`);
    }
    function measure() {
      if (!mq.matches) { section.style.height = ''; track.style.transform = ''; return; }
      track.style.transform = 'translate3d(0,0,0)';
      maxX = Math.max(0, track.scrollWidth - innerWidth);
      const dock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dock')) || 0;
      section.style.height = `${innerHeight - (document.body.classList.contains('dock-off') ? 0 : dock) + maxX}px`;
      start = section.getBoundingClientRect().top + scrollY;
      onScroll();
    }
    // spotlight follows the pointer inside the cabinet, falls back to scroll position
    cabinet.addEventListener('pointermove', (e) => { const r = cabinet.getBoundingClientRect(); cabinet.style.setProperty('--spot', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`); cabinet.style.setProperty('--spoty', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`); });
    cabinet.addEventListener('pointerleave', () => { cabinet.style.removeProperty('--spoty'); onScroll(); });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', measure);
    addEventListener('load', measure);
    measure();
    setTimeout(measure, 600);
    const settle = () => {
      measure();
      if (location.hash && !settle.done) {
        settle.done = true;
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView();
      }
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(settle, 50));
    else setTimeout(settle, 800);
    window.__measureAchievements = measure;
  }

  /* ---------- projects ---------- */
  function initProjects() {
    $('#projectsGrid').innerHTML = D.projects.map((p, i) =>
      `<article class="proj reveal" style="--accent:${p.accent}"><span class="proj-num">${String(i + 1).padStart(2, '0')}</span><p class="proj-kicker">${esc(p.kicker)}</p><h3>${esc(p.name)}</h3><p>${esc(p.body)}</p>` +
      `<ul class="proj-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></article>`
    ).join('');
  }

  /* ---------- education ---------- */
  function initEducation() {
    const edu = D.education.map((e) =>
      `<article class="edu reveal"><p class="eyebrow">// ${esc(e.period)}</p><h3>${esc(e.degree)}</h3><p class="edu-school">${esc(e.school)}</p>` +
      `<div class="edu-meta"><b>${esc(e.gpa)}</b></div><p>${esc(e.notes)}</p></article>`
    ).join('');
    const certs = `<article class="edu reveal"><p class="eyebrow">// CERTIFICATIONS</p><ul class="certs">${D.certs.map((c) =>
      `<li><b>${esc(c.name)}</b><span>${esc(c.full)}</span><i class="${c.status === 'Active' ? 'active' : 'wip'}">${esc(c.status)}</i></li>`).join('')}</ul></article>`;
    $('#educationGrid').innerHTML = edu + certs;
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    const els = $$('.reveal');
    if (reduced || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- contact ---------- */
  function initContact() {
    $('#year').textContent = new Date().getFullYear();
    $('#copyEmail').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(D.person.email); toast('Email copied: ' + D.person.email); }
      catch { toast(D.person.email); }
    });
  }

  /* ---------- ops console: full-body feed + terminal + telemetry ---------- */
  function initConsole() {
    const section = $('#ops');
    if (!section) return;
    const P = D.person, T = D.terminal;

    /* --- interactive terminal --- */
    const out = $('#termOut'), form = $('#termForm'), input = $('#termInput'), body = $('#termBody');
    const history = []; let hIdx = 0;
    const print = (html, cls = '') => { const div = document.createElement('div'); div.className = 'tl ' + cls; div.innerHTML = html; out.appendChild(div); body.scrollTop = body.scrollHeight; return div; };
    const lines = (arr, cls = '') => arr.forEach((l) => print(esc(l), cls));
    const link = (href, label, ext = true) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}</a>`;
    const pad = (str, n) => (str + ' '.repeat(n)).slice(0, Math.max(n, str.length + 1));
    const sections = ['intro', 'ops', 'about', 'id', 'skills', 'experience', 'achievements', 'projects', 'education', 'contact'];

    const commands = {
      help() {
        print('available commands', 'title');
        [
          ['help', 'this list'], ['whoami', 'who is behind this console'], ['about', 'short bio  (alias: cat about.txt)'],
          ['skills [group]', 'periodic table dump - groups: lang back cloud cicd sec cert rnd'], ['experience', 'mission log'],
          ['projects', 'build log'], ['achievements', 'trophy corridor'], ['education', 'training data + certs'],
          ['contact', 'open a channel'], ['resume', 'download the PDF'], ['ls / cat <file>', 'browse the filesystem'],
          ['open <section>', 'scroll to a section: ' + sections.join(' ')], ['nmap yathish', 'scan me'],
          ['sudo hire yathish', 'you know you want to'], ['pwn', 'you have been pwned'], ['watch', "i'm watching you"], ['hello', 'cam-02: wave hello'], ['play', 'cam-01: play my intro feed'],
          ['clear', 'clear the screen (ctrl+L)']
        ].forEach(([c, d]) => print(`<b>${esc(pad(c, 20))}</b>${esc(d)}`));
      },
      whoami() { lines([P.name, `${P.title} · ${P.tagline}`, P.location + ' · open to SDE / security roles']); },
      about() { lines(T.files['about.txt'], 'dim2'); },
      skills(arg) {
        const G = D.skillGroups;
        let groups = Object.keys(G);
        if (arg) {
          if (G[arg]) groups = [arg];
          else { print(`unknown group "${esc(arg)}" - use: ${Object.keys(G).join(' ')}`, 'warn'); return; }
        }
        groups.forEach((g) => { print(`[${esc(G[g].label)}]`, 'title'); print(esc(D.skills.filter((s) => s.g === g).map((s) => s.name).join(' · ')), 'dim2'); });
      },
      experience() { D.experience.forEach((x) => { print(`<b>${esc(x.role)}</b> @ ${esc(x.org)} <span class="dim">· ${esc(x.period)}</span>`); print('  └ ' + esc(x.points[0]), 'dim2'); }); },
      projects() { D.projects.forEach((p, i) => { print(`${String(i + 1).padStart(2, '0')}  <b>${esc(p.name)}</b> <span class="dim">· ${esc(p.kicker)}</span>`); print('    ' + esc(p.tags.join(' · ')), 'dim2'); }); },
      achievements() { D.achievements.forEach((a) => print(`${a.icon}  <b>${esc(a.title)}</b> <span class="dim">· ${esc(a.kicker)}</span>`)); },
      education() { D.education.forEach((e) => print(`<b>${esc(e.degree)}</b> · ${esc(e.school)} <span class="dim">· ${esc(e.gpa)}</span>`)); D.certs.forEach((c) => print(`cert  <b>${esc(c.name)}</b> · ${esc(c.full)} <span class="dim">[${esc(c.status)}]</span>`)); },
      contact() {
        print(`email     ${link('mailto:' + P.email, P.email, false)}`);
        print(`phone     ${link('tel:' + P.phoneRaw, P.phone, false)}`);
        print(`linkedin  ${link(P.linkedin, P.linkedin.replace('https://', ''))}`);
        print(`github    ${link(P.github, P.github.replace('https://', ''))}`);
      },
      resume() {
        print('fetching resume.pdf ... ' + link(P.resume, 'download', false), 'ok');
        const a = document.createElement('a'); a.href = P.resume; a.download = ''; document.body.appendChild(a); a.click(); a.remove();
      },
      ls() { print('about.txt   skills.json   experience.log   projects/   achievements.md   education.txt   contact.vcf   resume.pdf', 'dim2'); },
      cat(file) {
        const map = { 'about.txt': 'about', 'skills.json': 'skills', 'experience.log': 'experience', 'achievements.md': 'achievements', 'education.txt': 'education', 'contact.vcf': 'contact', 'resume.pdf': 'resume' };
        if (!file) return print('usage: cat <file>', 'warn');
        if (/^projects\/?$/.test(file)) return print('cat: projects/: is a directory - try: projects', 'warn');
        if (map[file]) return commands[map[file]]();
        print(`cat: ${esc(file)}: no such file`, 'warn');
      },
      open(id) {
        const target = id === 'console' ? 'ops' : id;
        const el = target && sections.includes(target) ? document.getElementById(target) : null;
        if (!el) return print('usage: open <' + sections.join('|') + '>', 'warn');
        print(`opening #${esc(target)}`, 'ok');
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      },
      goto(id) { commands.open(id); },
      nmap(target) {
        if (!/yathish|ynv|localhost|me/i.test(target || '')) return print('usage: nmap yathish', 'warn');
        print(`Starting Nmap 7.95 ( portfolio edition ) at ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`, 'dim2');
        print('Nmap scan report for yathish (sec-ops)');
        print(esc(pad('PORT', 10) + pad('STATE', 10) + pad('SERVICE', 15) + 'VERSION'), 'title');
        [
          ['22/tcp', 'open', 'ssh', 'keys only - no passwords'], ['443/tcp', 'open', 'https', 'REST APIs - JWT / OAuth 2.0'],
          ['8443/tcp', 'open', 'spring-boot', 'reactive - p95 1.6 s'], ['3000/tcp', 'open', 'node-express', 'MCP server - retrieval'],
          ['9000/tcp', 'open', 'sonarqube', 'quality gate: passed'], ['1337/tcp', 'filtered', 'red-team', 'CRTP - CPTS in progress'],
          ['25/tcp', 'closed', 'smtp', 'phishing? Spybot says no']
        ].forEach(([p, st, sv, v]) => print(esc(pad(p, 10) + pad(st, 10) + pad(sv, 15) + v), st === 'open' ? 'ok' : 'dim2'));
        print('Nmap done: 1 host up - 0 vulnerabilities - 1 engineer available', 'dim2');
      },
      sudo(...args) {
        const a = args.join(' ');
        if (/hire/i.test(a)) {
          print('[sudo] password for recruiter: ********', 'dim2');
          print('permission granted ✓  drafting offer ... ' + link('mailto:' + P.email + '?subject=Offer%20for%20Yathish', 'send it', false), 'ok');
        } else print('you are not in the sudoers file. This incident will be reported.', 'warn');
      },
      hack() { print('ACCESS DENIED - attempt logged to SIEM - mapped to MITRE T1078', 'warn'); print('...just kidding. Try: contact', 'dim2'); },
      matrix() { commands.hack(); },
      wave() { print('cam-02: waving hello', 'ok'); if (window.__sayHello) window.__sayHello(); $('#intro').scrollIntoView({ behavior: 'smooth' }); },
      hello() { commands.wave(); },
      play() { print('cam-01: playing intro feed', 'ok'); if (window.__playIntro) window.__playIntro(); },
      intro() { commands.play(); },
      pwn() {
        print('initiating pwn sequence ...', 'dim2');
        ['[+] fingerprinting target ......... done', '[+] enumerating skills ............ 61 elements found', '[+] escalating privileges ......... sudo hire yathish', '[+] exfiltrating resume.pdf ....... '].forEach((l, i) => setTimeout(() => print(esc(l) + (i === 3 ? link(P.resume, 'download', false) : ''), i === 3 ? 'ok' : 'dim2'), 220 * (i + 1)));
        setTimeout(() => print('YOU HAVE BEEN PWNED ... by curiosity. my other computer is your computer.', 'warn'), 1100);
      },
      watch() { print("i'm watching you (client-side only, nothing leaves your browser):", 'title'); (window.__intelRows ? window.__intelRows() : ['intel offline']).forEach((r) => print(esc(r), 'dim2')); },
      motd() { print('my other computer is your computer.', 'ok'); },
      clear() { out.innerHTML = ''; },
      pwd() { print('/home/yathish/portfolio'); },
      date() { print(esc(new Date().toString())); },
      echo(...a) { print(esc(a.join(' '))); },
      history() { history.forEach((h, i) => print(`${String(i + 1).padStart(3)}  ${esc(h)}`, 'dim2')); },
      exit() { print('there is no escape - but there is ' + link('#contact', 'contact', false), 'dim2'); }
    };
    Object.assign(commands, { exp: commands.experience, awards: commands.achievements, cv: commands.resume, certs: commands.education, dir: commands.ls, '?': commands.help, man: commands.help });

    function run(raw) {
      const cmd = raw.trim();
      if (!cmd) return;
      history.push(cmd); hIdx = history.length;
      print(`<span class="pr">${esc(T.host)}:~$</span> ${esc(cmd)}`, 'cmd');
      const [name, ...args] = cmd.split(/\s+/);
      const fn = commands[name.toLowerCase()];
      if (fn) { try { fn(...args); } catch (e) { print('error: ' + esc(e.message), 'warn'); } }
      else print(`${esc(name)}: command not found - try help`, 'warn');
    }
    form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; } else { hIdx = history.length; input.value = ''; } }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const v = input.value.toLowerCase();
        if (!v) return;
        const m = Object.keys(commands).filter((c) => c.startsWith(v));
        if (m.length === 1) input.value = m[0] + ' ';
        else if (m.length > 1) print(m.join('   '), 'dim2');
      }
      else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); commands.clear(); }
    });
    $('#term').addEventListener('click', (e) => { if (!e.target.closest('a, button')) input.focus({ preventScroll: true }); });
    $$('.term-chips button').forEach((b) => b.addEventListener('click', () => { run(b.dataset.cmd); input.focus({ preventScroll: true }); }));

    let booted = false;
    function typeInto(el, text) {
      return new Promise((res) => {
        if (reduced) { el.textContent = text; return res(); }
        let i = 0;
        const t = setInterval(() => { el.textContent = text.slice(0, ++i); body.scrollTop = body.scrollHeight; if (i >= text.length) { clearInterval(t); res(); } }, 12);
      });
    }
    async function boot() {
      if (booted) return;
      booted = true;
      for (const l of T.boot) { const el = print('', 'dim2'); await typeInto(el, l); }
      print('&nbsp;');
    }

    /* --- skill telemetry --- */
    const bars = $('#teleBars'), log = $('#teleLog'), graph = $('#teleGraph'), tick = $('#teleTick');
    bars.innerHTML = D.telemetry.map((t) => `<li style="--col:${t.color}"><span class="tb-label">${esc(t.label)}</span><span class="tb-track"><i style="--v:${t.value}%"></i></span><b class="tb-val" data-v="${t.value}">0</b></li>`).join('');
    const vals = $$('.tb-val', bars);
    let teleOn = false, valsDone = false, feedTimer = 0, graphRaf = 0;
    function pushLog() {
      const l = D.feedLines[Math.floor(Math.random() * D.feedLines.length)];
      const sev = /blocked|quarantined|high|critical/i.test(l) ? 'warn' : (/✓|pass|healthy|met|ok/i.test(l) ? 'ok' : '');
      const div = document.createElement('div');
      div.className = 'lg ' + sev;
      div.innerHTML = `<span class="ts">${new Date().toTimeString().slice(0, 8)}</span> ${esc(l)}`;
      log.appendChild(div);
      while (log.children.length > 8) log.removeChild(log.firstChild);
    }
    const ctx = graph.getContext('2d');
    const series = Array.from({ length: 60 }, () => 40 + Math.random() * 20);
    let lastT = 0;
    function drawGraph(ts) {
      if (ts - lastT > 160) { lastT = ts; series.push(Math.max(8, Math.min(92, series[series.length - 1] + (Math.random() - 0.5) * 14))); series.shift(); }
      const dpr = devicePixelRatio || 1;
      const w = graph.width = Math.max(1, graph.clientWidth * dpr), h = graph.height = 70 * dpr;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(56,232,255,.14)'; ctx.lineWidth = 1;
      for (let y = 0.25; y < 1; y += 0.25) { ctx.beginPath(); ctx.moveTo(0, h * y); ctx.lineTo(w, h * y); ctx.stroke(); }
      ctx.beginPath();
      series.forEach((v, i) => { const x = (i / (series.length - 1)) * w, y = h - (v / 100) * h; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.strokeStyle = '#38e8ff'; ctx.lineWidth = 2 * dpr; ctx.stroke();
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(56,232,255,.35)'); g.addColorStop(1, 'rgba(56,232,255,0)');
      ctx.fillStyle = g; ctx.fill();
      if (teleOn && !reduced) graphRaf = requestAnimationFrame(drawGraph);
    }
    function startTele() {
      if (teleOn) return;
      teleOn = true;
      section.classList.add('tele-on');
      if (!valsDone) {
        valsDone = true;
        vals.forEach((v) => { const target = +v.dataset.v; let cur = 0; const t = setInterval(() => { cur = Math.min(target, cur + 3); v.textContent = cur; if (cur >= target) clearInterval(t); }, 24); });
      }
      if (!log.children.length) for (let i = 0; i < 4; i++) pushLog();
      feedTimer = setInterval(pushLog, reduced ? 4000 : 1700);
      tick.textContent = '● live'; tick.classList.add('on');
      drawGraph(0);
    }
    function stopTele() { teleOn = false; clearInterval(feedTimer); cancelAnimationFrame(graphRaf); tick.textContent = '● standby'; tick.classList.remove('on'); }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { boot(); startTele(); } else stopTele(); }), { threshold: 0.15 });
    io.observe(section);
  }

  /* ---------- hero: full-body hello (plays once on load, replay with sound) ---------- */
  function initHero() {
    const v = $('#heroVideo'), fb = $('#heroFallback'), cap = $('#heroCaption'), btn = $('#holoPlay'), heroBtn = $('#heroPlay'), hud = $('#hudTime'), holo = $('#holo');
    if (!v) return;
    const H = D.hello;
    let failed = false, busy = false, capTimer = 0;
    v.poster = H.poster; v.src = H.src;
    v.addEventListener('error', () => { failed = true; v.classList.add('is-hidden'); fb.classList.remove('is-hidden'); btn.querySelector('span:last-child').textContent = 'Hear my hello'; });

    function typeCaption(text, dur) {
      clearInterval(capTimer); cap.innerHTML = ''; cap.classList.add('on');
      const words = text.split(' '); let i = 0; const per = Math.max(140, (dur * 1000 * 0.7) / words.length);
      capTimer = setInterval(() => { if (i >= words.length) return clearInterval(capTimer); const s = document.createElement('span'); s.textContent = words[i++] + ' '; cap.appendChild(s); }, per);
    }
    // Plays once on load (muted, browsers allow that), then holds the last frame. Nothing after that.
    v.muted = true; v.loop = false;
    v.play().then(() => typeCaption(H.text, v.duration || 4)).catch(() => {});
    v.addEventListener('ended', () => { holo.classList.remove('playing'); busy = false; setTimeout(() => cap.classList.remove('on'), 1200); });

    async function sayHello() {
      if (busy) return;
      busy = true; holo.classList.add('playing');
      if (failed) {
        if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(H.text); speechSynthesis.cancel(); speechSynthesis.speak(u); }
        typeCaption(H.text, 3); setTimeout(() => { holo.classList.remove('playing'); busy = false; }, 3000); return;
      }
      v.muted = false; v.currentTime = 0;
      try { await v.play(); typeCaption(H.text, v.duration || 4); } catch (e) { busy = false; holo.classList.remove('playing'); }
    }
    btn.addEventListener('click', (e) => { e.stopPropagation(); sayHello(); });
    heroBtn.addEventListener('click', () => { sayHello(); if (innerWidth < 900) holo.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    $('.holo-screen').addEventListener('click', (e) => { if (!e.target.closest('button')) sayHello(); });
    setInterval(() => { const t = v.currentTime || 0; hud.textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`; }, 250);
    window.__sayHello = sayHello;
  }

  /* ---------- visitor intel: "I'm watching you" (client-side only) ---------- */
  function initIntel() {
    const list = $('#intelList');
    if (!list) return;
    const ua = navigator.userAgent;
    const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Unknown browser';
    const os = /Windows/.test(ua) ? 'Windows' : /Mac OS X/.test(ua) ? 'macOS' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Linux/.test(ua) ? 'Linux' : 'Unknown OS';
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    const conn = navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : 'n/a';
    const rows = [
      ['client', `${browser} on ${os}`],
      ['screen', `${screen.width}×${screen.height} · viewport ${innerWidth}×${innerHeight}`],
      ['locale', `${navigator.language} · ${tz}`],
      ['clock', new Date().toLocaleTimeString()],
      ['cores', `${navigator.hardwareConcurrency || '?'} threads · ${navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'memory hidden'}`],
      ['link', `${conn} · ${navigator.onLine ? 'online' : 'offline'}`],
      ['referrer', document.referrer ? new URL(document.referrer).hostname : 'direct · typed in like a pro'],
      ['verdict', 'you have been pwned... by curiosity']
    ];
    rows.forEach(([k, val], i) => setTimeout(() => { const li = document.createElement('li'); li.innerHTML = `<span>${esc(k)}</span><b>${esc(val)}</b>`; list.appendChild(li); }, 350 + i * 180));
    if (navigator.getBattery) navigator.getBattery().then((b) => { const li = document.createElement('li'); li.innerHTML = `<span>battery</span><b>${Math.round(b.level * 100)}% ${b.charging ? '· charging' : ''}</b>`; list.appendChild(li); }).catch(() => {});
    setInterval(() => { const li = list.children[3]; if (li) li.innerHTML = `<span>clock</span><b>${esc(new Date().toLocaleTimeString())}</b>`; }, 1000);
    window.__intelRows = () => Array.from(list.children).map((li) => li.textContent.replace(/^(\w+)/, '$1  '));
  }

  /* ---------- ticker ---------- */
  function initTicker() {
    const t = $('#tickerTrack');
    if (!t) return;
    const items = D.ticker.map((x) => `<span>${esc(x)}</span>`).join('');
    t.innerHTML = items + items;   // duplicated so the -50% translate loops seamlessly
  }

  /* ---------- SOC console live feed: talking intro clips (double-buffered) ---------- */
  function initIntroFeed() {
    const A = $('#avA'), B = $('#avB'), fb = $('#avFallback'), cap = $('#captions');
    const btn = $('#feedPlay'), clock = $('#feedClock'), label = $('#feedLabel'), frame = $('#feedFrame');
    if (!A) return;
    const clips = D.clips, vids = [A, B];
    const btnLabel = btn.querySelector('span:last-child');
    let mode = 'idle', failed = false, capTimer = 0, current = A;

    function load(v, clip) { if (v.dataset.src !== clip.src) { v.dataset.src = clip.src; v.poster = clip.poster || ''; v.src = clip.src; v.load(); } }
    function showLabel(clip) { if (clip && clip.label) label.textContent = clip.label; }
    function onFail() { if (failed) return; failed = true; A.classList.add('is-hidden'); B.classList.add('is-hidden'); fb.classList.remove('is-hidden'); btnLabel.textContent = 'Hear my intro'; }
    A.addEventListener('error', onFail); B.addEventListener('error', onFail);

    load(A, clips[0]); showLabel(clips[0]);
    A.muted = true; A.loop = true; A.play().catch(() => {});
    if (clips[1]) load(B, clips[1]);

    function typeCaption(text, dur) {
      clearInterval(capTimer); cap.innerHTML = ''; cap.classList.add('on');
      const words = text.split(' '); let i = 0; const per = Math.max(110, (dur * 1000 * 0.92) / words.length);
      capTimer = setInterval(() => { if (i >= words.length) return clearInterval(capTimer); const s = document.createElement('span'); s.textContent = words[i++] + ' '; cap.appendChild(s); }, per);
    }
    function glitch() { return new Promise((res) => { frame.classList.add('glitching'); setTimeout(() => { frame.classList.remove('glitching'); res(); }, reduced ? 0 : 420); }); }
    function show(v, clip) { vids.forEach((x) => x.classList.toggle('is-hidden', x !== v)); current = v; showLabel(clip); }
    async function playClip(v, clip) { v.loop = false; v.muted = false; v.currentTime = 0; await v.play(); typeCaption(clip.text, isFinite(v.duration) && v.duration > 0 ? v.duration : 12); await once(v, 'ended'); }

    async function playSequence() {
      if (mode === 'playing') return;
      mode = 'playing'; frame.classList.add('playing');
      if (failed) { speakFallback(); return; }
      try {
        for (let i = 0; i < clips.length; i++) {
          const v = vids[i % 2];
          load(v, clips[i]);
          if (clips[i + 1]) load(vids[(i + 1) % 2], clips[i + 1]);
          show(v, clips[i]);
          await playClip(v, clips[i]);
          await glitch();
          v.pause();
        }
      } catch (err) { console.warn('intro feed', err); }
      finish();
    }
    function finish() {
      mode = 'idle'; clearInterval(capTimer); frame.classList.remove('playing');
      vids.forEach((v) => v.pause());
      load(A, clips[0]); show(A, clips[0]);
      A.muted = true; A.loop = true; A.currentTime = 0; A.play().catch(() => {});
      if (clips[1]) load(B, clips[1]);
      cap.classList.remove('on'); btnLabel.textContent = 'Replay intro';
    }
    function speakFallback() {
      const text = clips.map((c) => c.text).join(' ');
      if (!('speechSynthesis' in window)) { toast('Video unavailable'); finish(); return; }
      const u = new SpeechSynthesisUtterance(text);
      typeCaption(text, Math.max(20, text.split(' ').length * 0.4));
      u.onend = finish; u.onerror = finish; speechSynthesis.cancel(); speechSynthesis.speak(u);
    }
    setInterval(() => { clock.textContent = new Date().toTimeString().slice(0, 8); }, 1000);
    btn.addEventListener('click', (e) => { e.stopPropagation(); playSequence(); });
    frame.addEventListener('click', (e) => { if (e.target.closest('button')) return; if (mode !== 'playing') { playSequence(); return; } if (current.paused) current.play(); else current.pause(); });
    window.__playIntro = playSequence;
  }

  /* ---------- hacker avatars ---------- */
  function initAvatars() {
    const grid = $('#avatarGrid');
    if (!grid) return;
    grid.innerHTML = D.avatars.map((a) => {
      const media = a.fx === 'glitch'
        ? `<img src="${a.img}" alt="" class="base"><img src="${a.img}" alt="" class="r" aria-hidden="true"><img src="${a.img}" alt="" class="b" aria-hidden="true"><div class="av-stamp">PWNED</div>`
        : a.fx === 'scan'
          ? `<img src="${a.img}" data-fallback="${a.fallback || ''}" alt=""><div class="reticle"><span>TRACKING · LOCK 98%</span></div><div class="av-cctv" data-cctv>CAM-03 · 00:00:00</div>`
          : `<img src="${a.img}" data-fallback="${a.fallback || ''}" alt="" crossorigin="anonymous"><canvas class="ascii"></canvas>`;
      return `<article class="av fx-${a.fx} reveal" data-fx="${a.fx}"><div class="av-media">${media}<div class="scanlines"></div><span class="av-tag">${esc(a.sub)}</span></div>` +
        `<div class="av-body"><h3 class="av-title">${esc(a.title)}</h3><p class="av-text">${esc(a.body)}</p></div></article>`;
    }).join('');

    // image fallbacks (generated avatars may be missing)
    $$('.av-media img[data-fallback]', grid).forEach((img) => img.addEventListener('error', () => { if (img.dataset.fallback && img.src.indexOf(img.dataset.fallback) === -1) img.src = img.dataset.fallback; }, { once: true }));

    // glitch card auto-glitches briefly every few seconds
    const g = $('.av.fx-glitch', grid);
    if (g && !reduced) setInterval(() => { g.classList.add('auto'); setTimeout(() => g.classList.remove('auto'), 900); }, 5200);

    // scan card: reticle follows the pointer, CCTV clock ticks
    const sc = $('.av.fx-scan', grid);
    if (sc) {
      const ret = $('.reticle', sc), cctv = $('[data-cctv]', sc), media = $('.av-media', sc);
      media.addEventListener('pointermove', (e) => { const r = media.getBoundingClientRect(); ret.style.left = `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`; ret.style.top = `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`; });
      media.addEventListener('pointerleave', () => { ret.style.left = '50%'; ret.style.top = '32%'; });
      setInterval(() => { cctv.textContent = `CAM-03 · ${new Date().toTimeString().slice(0, 8)}`; }, 1000);
    }

    // ascii card: render the photo as green characters
    const asc = $('.av.fx-ascii', grid);
    if (asc) {
      const img = $('img', asc), canvas = $('canvas.ascii', asc);
      const chars = ' .:-=+*#%@';
      function render() {
        const cols = 72, rows = 96; // 3:4
        const off = document.createElement('canvas'); off.width = cols; off.height = rows;
        const octx = off.getContext('2d');
        // cover-crop the image into the 3:4 sampling canvas, biased to the top like the cards
        const ir = img.naturalWidth / img.naturalHeight, cr = cols / rows;
        let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
        if (ir > cr) { sw = img.naturalHeight * cr; sx = (img.naturalWidth - sw) / 2; } else { sh = img.naturalWidth / cr; sy = (img.naturalHeight - sh) * 0.12; }
        try { octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows); } catch (e) { return; }
        let data; try { data = octx.getImageData(0, 0, cols, rows).data; } catch (e) { return; }
        const dpr = Math.min(2, devicePixelRatio || 1);
        const W = canvas.clientWidth * dpr, Hh = canvas.clientHeight * dpr;
        canvas.width = W; canvas.height = Hh;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#02060a'; ctx.fillRect(0, 0, W, Hh);
        const cw = W / cols, ch = Hh / rows;
        ctx.font = `${Math.ceil(ch)}px "JetBrains Mono", monospace`; ctx.textBaseline = 'top';
        for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4; const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const c = chars[Math.min(chars.length - 1, Math.floor(lum * chars.length))];
          if (c === ' ') continue;
          ctx.fillStyle = lum > 0.75 ? '#c8ffe0' : lum > 0.45 ? '#39ff88' : '#117a40';
          ctx.fillText(c, x * cw, y * ch);
        }
      }
      if (img.complete && img.naturalWidth) render(); else img.addEventListener('load', render);
      addEventListener('resize', () => { if (img.naturalWidth) render(); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (img.naturalWidth) render(); });
    }
  }

  /* ---------- guide deck: the mascot walks along a slim reserved floor; the message opens only on click ---------- */
  function initMascot() {
    const M = D.mascot, root = $('#mascot');
    if (!M || !root) return;
    const figure = $('#mascotFigure'), puppet = $('#puppet'), textEl = $('#mascotText'), panel = $('#mascotBubble'), badge = $('#mascotBadge');
    const voiceBtn = $('#mascotVoice'), nextBtn = $('#mascotNext'), closeBtn = $('#mascotClose'), hideBtn = $('#mascotHide'), restoreBtn = $('#mascotRestore');
    const video = $('#mascotVideo'), canvas = $('#mascotCanvas'), tag = $('#dockSection'), prog = $('#dockProg');
    const L = M.layers || { w: 393, h: 1216, hipY: 724 };
    puppet.style.setProperty('--hip', `${(L.hipY / L.h * 100).toFixed(2)}%`);
    figure.style.setProperty('--ar', (L.w / L.h).toFixed(4));

    const ids = Object.keys(M.guide).filter((id) => document.getElementById(id));
    const labels = { intro: 'INTRO', ops: 'SOC CONSOLE', avatars: 'AVATARS', about: 'PROFILE', id: 'ACCESS BADGE', skills: 'SKILLS', experience: 'EXPERIENCE', achievements: 'TROPHIES', projects: 'PROJECTS', education: 'EDUCATION', contact: 'CONTACT' };
    let voiceOn = false, hidden = false, current = null, x = -300, typingTimer = 0, walkTimer = 0, started = false, open = false, pendingText = M.intro;
    try { voiceOn = localStorage.getItem('ynv-mascot-voice') === '1'; hidden = sessionStorage.getItem('ynv-mascot-hidden') === '1'; } catch (e) { /* storage unavailable */ }

    /* --- optional keyed video clips (e.g. Flow / Veo green-screen takes), else the puppet cut-out --- */
    const clips = M.clips || {};
    const hasClips = !!(clips.walk || clips.talk);
    const alphaWebm = hasClips && video.canPlayType && video.canPlayType('video/webm; codecs="vp9"') !== '';
    let clipMode = 'puppet', matteVideo = null, matteRaf = 0, matteCanvas = null, currentClip = '';
    if (hasClips) {
      puppet.classList.add('is-hidden');
      if (alphaWebm) { clipMode = 'webm'; video.classList.remove('is-hidden'); }
      else {
        clipMode = 'stacked'; canvas.classList.remove('is-hidden');
        matteVideo = document.createElement('video'); matteVideo.muted = true; matteVideo.loop = true; matteVideo.playsInline = true;
        matteCanvas = document.createElement('canvas');
      }
    }
    function drawStacked() {
      const v = matteVideo; if (!v || v.readyState < 2) { matteRaf = requestAnimationFrame(drawStacked); return; }
      const w = v.videoWidth, h = v.videoHeight / 2;
      if (canvas.width !== w) { canvas.width = w; canvas.height = h; matteCanvas.width = w; matteCanvas.height = h; }
      const ctx = canvas.getContext('2d'), mctx = matteCanvas.getContext('2d');
      mctx.drawImage(v, 0, h, w, h, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, w, h); ctx.drawImage(v, 0, 0, w, h, 0, 0, w, h);
      ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(matteCanvas, 0, 0);
      matteRaf = requestAnimationFrame(drawStacked);
    }
    function setClip(name) {
      const base = clips[name] || clips.talk || clips.walk;
      if (!hasClips || !base || currentClip === base) return;
      currentClip = base;
      if (clipMode === 'webm') { video.src = `${base}.webm`; video.loop = true; video.muted = true; video.play().catch(() => {}); }
      else { matteVideo.src = `${base}-stacked.mp4`; matteVideo.play().catch(() => {}); cancelAnimationFrame(matteRaf); drawStacked(); }
    }

    /* --- speech: prefer a male system voice --- */
    let voices = [];
    function loadVoices() { voices = ('speechSynthesis' in window) ? speechSynthesis.getVoices() : []; }
    loadVoices();
    if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = loadVoices;
    function pickVoice() {
      const male = ['Microsoft Guy', 'Microsoft David', 'Microsoft Mark', 'Microsoft Ryan', 'Microsoft Christopher', 'Google UK English Male', 'Daniel', 'Alex', 'Fred', 'Rishi', 'Ravi', 'Aaron', 'Arthur'];
      for (const p of male) { const v = voices.find((x) => x.name.includes(p)); if (v) return v; }
      const anyMale = voices.find((x) => /male/i.test(x.name) && !/female/i.test(x.name));
      if (anyMale) return anyMale;
      return voices.find((x) => /^en[-_](US|GB|IN)/i.test(x.lang)) || voices.find((x) => /^en/i.test(x.lang)) || null;
    }
    function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); root.classList.remove('talking'); }
    function typeText(text) {
      clearInterval(typingTimer); textEl.textContent = '';
      if (reduced) { textEl.textContent = text; return; }
      let i = 0;
      typingTimer = setInterval(() => { textEl.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typingTimer); }, 16);
    }
    function say(text) {
      typeText(text);
      stopSpeech();
      root.classList.add('talking'); setClip('talk');
      const stopTalking = () => root.classList.remove('talking');
      if (voiceOn && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        const v = pickVoice(); if (v) u.voice = v;
        u.rate = 1.0; u.pitch = 0.9; u.onend = stopTalking; u.onerror = stopTalking;
        speechSynthesis.speak(u);
      } else setTimeout(stopTalking, Math.min(9000, 1200 + text.length * 45));
    }

    /* --- message panel: opens only when the figure is clicked --- */
    function openPanel() {
      open = true; root.classList.add('is-open'); badge.classList.remove('on'); figure.setAttribute('aria-expanded', 'true');
      document.documentElement.style.setProperty('--dock', innerWidth < 800 ? '250px' : '238px');
      if (window.__measureAchievements) setTimeout(window.__measureAchievements, 320);
      panel.classList.toggle('from-right', x > innerWidth / 2);
      say(pendingText);
    }
    function closePanel() { open = false; root.classList.remove('is-open'); figure.setAttribute('aria-expanded', 'false'); stopSpeech(); clearInterval(typingTimer); document.documentElement.style.removeProperty('--dock'); if (window.__measureAchievements) setTimeout(window.__measureAchievements, 320); }
    function setMessage(text) { pendingText = text; if (open) say(text); else badge.classList.add('on'); }

    /* --- movement along the floor --- */
    function figW() { return figure.getBoundingClientRect().width || 50; }
    function targetFor(index) {
      const w = figW(), pad = 14, span = innerWidth - w - pad * 2;
      const stops = innerWidth < 800 ? [0.02, 0.5, 0.98] : [0.03, 0.26, 0.5, 0.74, 0.97];
      return pad + span * stops[index % stops.length];
    }
    function walkTo(px) {
      clearTimeout(walkTimer);
      const dist = Math.abs(px - x);
      const dur = reduced ? 0 : Math.min(2.4, Math.max(0.45, dist / 420));
      figure.style.setProperty('--face', px < x ? '-1' : '1');
      figure.style.setProperty('--mdur', `${dur}s`);
      figure.style.setProperty('--mx', `${Math.round(px)}px`);
      x = px;
      if (open) panel.classList.toggle('from-right', px > innerWidth / 2);
      panel.style.setProperty('--px', `${Math.round(px)}px`);
      if (dur > 0.05) { root.classList.add('walking'); root.classList.remove('idle'); setClip('walk'); }
      walkTimer = setTimeout(() => { root.classList.remove('walking'); root.classList.add('idle'); }, dur * 1000 + 60);
    }
    function goTo(id) {
      if (hidden || id === current) return;
      current = id;
      const i = Math.max(0, ids.indexOf(id));
      tag.textContent = labels[id] || id.toUpperCase();
      prog.style.width = `${((i + 1) / ids.length * 100).toFixed(1)}%`;
      walkTo(targetFor(i));
      setMessage(M.guide[id]);
    }

    /* --- section tracking --- */
    const ratios = new Map();
    function pickBest() { let best = null, bestR = 0.2; ratios.forEach((r, id) => { if (r > bestR) { bestR = r; best = id; } }); return best; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      if (!started) return;
      const best = pickBest();
      if (best) goTo(best);
    }, { threshold: [0.2, 0.35, 0.5, 0.75] });
    ids.forEach((id) => io.observe(document.getElementById(id)));

    /* --- controls --- */
    function setVoice(on) {
      voiceOn = on; voiceBtn.setAttribute('aria-pressed', String(on)); voiceBtn.textContent = on ? '🔊 voice on' : '🔇 voice off';
      try { localStorage.setItem('ynv-mascot-voice', on ? '1' : '0'); } catch (e) { /* ignore */ }
      if (!on) stopSpeech();
    }
    function setHidden(on) {
      hidden = on; root.classList.toggle('is-off', on); document.body.classList.toggle('dock-off', on); restoreBtn.classList.toggle('is-hidden', !on);
      try { if (on) sessionStorage.setItem('ynv-mascot-hidden', '1'); else sessionStorage.removeItem('ynv-mascot-hidden'); } catch (e) { /* ignore */ }
      if (on) closePanel();
      if (window.__measureAchievements) window.__measureAchievements();
    }
    voiceBtn.addEventListener('click', () => { setVoice(!voiceOn); if (voiceOn && open) say(pendingText); });
    nextBtn.addEventListener('click', () => {
      const i = Math.max(0, ids.indexOf(current)); const next = ids[(i + 1) % ids.length];
      document.getElementById(next).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
    closeBtn.addEventListener('click', closePanel);
    hideBtn.addEventListener('click', () => setHidden(true));
    restoreBtn.addEventListener('click', () => { setHidden(false); current = null; started = true; goTo(pickBest() || ids[0]); });
    figure.addEventListener('click', () => { if (open) closePanel(); else openPanel(); });
    figure.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); figure.click(); } });
    document.addEventListener('click', (e) => { if (open && !e.target.closest('#mascot')) closePanel(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) closePanel(); });
    addEventListener('resize', () => { if (current) { const i = Math.max(0, ids.indexOf(current)); figure.style.setProperty('--mdur', '0s'); x = targetFor(i); figure.style.setProperty('--mx', `${Math.round(x)}px`); panel.style.setProperty('--px', `${Math.round(x)}px`); } });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeech(); });

    setVoice(voiceOn);
    if (hidden) { setHidden(true); started = true; return; }

    /* --- entrance: walk in from off-screen; the greeting waits for a click --- */
    figure.style.setProperty('--mdur', '0s'); figure.style.setProperty('--mx', `${x}px`); root.classList.add('idle');
    setClip('walk');
    setTimeout(() => {
      tag.textContent = 'HELLO'; prog.style.width = '4%';
      walkTo(targetFor(0));
      current = ids[0] || null; started = true;
      setMessage(M.intro);
      setTimeout(() => { const best = pickBest(); if (best && best !== current) goTo(best); }, 3000);
    }, reduced ? 0 : 700);
  }

  /* ---------- boot ---------- */
  initBg();
  initCursor();
  initNav();
  initTyped();
  initHero();
  initIntel();
  initTicker();
  initIntroFeed();
  initConsole();
  initAvatars();
  initIdCard();
  initSkills();
  initTimeline();
  initAchievements();
  initProjects();
  initEducation();
  initReveal();
  initContact();
  initMascot();
})();
