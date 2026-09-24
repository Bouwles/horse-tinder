(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => r.querySelectorAll(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rand = (a) => a[Math.floor(Math.random() * a.length)];
const byId = Object.fromEntries(HORSES.map((h) => [h.id, h]));
const desk = () => matchMedia('(min-width: 900px)').matches;

// ───── icons ─────
const ICONS = {
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.7z"/>',
  star: '<path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
  rewind: '<path d="M3 4v5h5"/><path d="M3.6 13.5A8.5 8.5 0 1 0 5.4 6L3 9"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20.5l1.5-4.6a8.4 8.4 0 0 1-1-4.4A8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  shoe: '<path d="M6.5 20.5V12a5.5 5.5 0 0 1 11 0v8.5" stroke-width="2.6"/>',
  vol: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  mute: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  up: '<path d="m6 15 6-6 6 6"/>', down: '<path d="m6 9 6 6 6-6"/>', back: '<path d="m15 18-6-6 6-6"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
};
const FILLED = new Set(['heart', 'star', 'zap']);
const ic = (n) => `<svg class="ic${FILLED.has(n) ? ' f' : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
$$('[data-ic]').forEach((el) => el.insertAdjacentHTML('afterbegin', ic(el.dataset.ic)));

// ───── storage ─────
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem('ht.' + k)); return v ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem('ht.' + k, JSON.stringify(v)); } catch {} };
const S = {
  settings: load('settings', { dark: matchMedia('(prefers-color-scheme: dark)').matches, sound: true, name: '', show: 'all', onboarded: false }),
  swipes: load('swipes', []), matches: load('matches', []), chats: load('chats', {}),
  unread: load('unread', {}), likes: load('likes', 25), supers: load('supers', 3), round: load('round', 1),
};
const persist = () => ['settings', 'swipes', 'matches', 'chats', 'unread', 'likes', 'supers', 'round'].forEach((k) => save(k, S[k]));

// ───── sound (WebAudio synth, no assets) ─────
let ac;
const ctx = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; } } if (ac.state === 'suspended') ac.resume(); return ac; };
function tone(f, t0, dur, type = 'sine', vol = 0.15, f2) {
  const c = ctx(); if (!c) return; const o = c.createOscillator(), g = c.createGain(); const t = c.currentTime + t0;
  o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
function whoosh() {
  const c = ctx(); if (!c) return; const len = c.sampleRate * 0.25, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = b; f.type = 'bandpass'; f.Q.value = 1.2;
  f.frequency.setValueAtTime(400, c.currentTime); f.frequency.exponentialRampToValueAtTime(3000, c.currentTime + 0.22); g.gain.value = 0.25;
  s.connect(f).connect(g).connect(c.destination); s.start();
}
function neigh() { // synthesized whinny
  const c = ctx(); if (!c) return; const t = c.currentTime, o = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
  o.type = 'sawtooth'; o.frequency.setValueAtTime(700, t); o.frequency.linearRampToValueAtTime(1100, t + 0.15); o.frequency.exponentialRampToValueAtTime(380, t + 0.9);
  lfo.frequency.value = 22; lg.gain.value = 70; lfo.connect(lg).connect(o.frequency); f.type = 'bandpass'; f.frequency.value = 1300; f.Q.value = 3;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
  o.connect(f).connect(g).connect(c.destination); o.start(t); lfo.start(t); o.stop(t + 1); lfo.stop(t + 1);
}
const SFX = {
  like: () => { whoosh(); tone(520, 0, 0.12, 'triangle', 0.12, 780); },
  nope: () => { whoosh(); tone(300, 0, 0.18, 'triangle', 0.12, 160); },
  super: () => { whoosh(); [660, 880, 1100, 1320].forEach((f, i) => tone(f, i * 0.06, 0.2, 'sine', 0.1)); },
  match: () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.5, 'triangle', 0.12)); setTimeout(neigh, 450); },
  msg: () => { tone(880, 0, 0.09, 'sine', 0.12); tone(1320, 0.08, 0.14, 'sine', 0.1); },
  send: () => tone(600, 0, 0.08, 'sine', 0.08, 900),
  tap: () => tone(1200, 0, 0.03, 'square', 0.03),
  sad: () => { tone(400, 0, 0.3, 'sawtooth', 0.06, 200); tone(300, 0.25, 0.5, 'sawtooth', 0.06, 120); },
  epic: () => { [65, 98, 130, 196].forEach((f) => tone(f, 0, 2.2, 'sawtooth', 0.05)); setTimeout(neigh, 900); },
};
const sfx = (n) => { if (S.settings.sound) try { SFX[n](); } catch {} };
const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };

// ───── helpers ─────
const you = () => S.settings.name || 'You';
const matched = (id) => S.matches.some((m) => m.id === id);
const avatar = (h) => h.photos[0].src;
const avImg = (h) => `<img src="${avatar(h)}" alt="" class="${h.special === 'mystery' ? 'blur' : ''}">`;
function hash(s) { let x = 2166136261; for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); } return x >>> 0; }
function seeded(seed) { return () => ((seed = Math.imul(seed ^ (seed >>> 15), seed | 1) ^ (seed + 0x6d2b79f5)) >>> 0) / 4294967296; }
function compat(h) {
  const r = seeded(hash(h.id + you())); const cats = [...COMPAT_CATS].sort(() => r() - 0.5).slice(0, 5).map((c) => [c, Math.round(35 + r() * 65)]);
  if (h.id === 'concrete') cats[0] = ['Stable chemistry', 100];
  if (h.id === 'dah') cats[0] = ['Species compatibility', 3];
  if (h.id === 'bojack') cats[0] = ['Emotional availability', 4];
  if (h.special === 'final') cats.forEach((c) => (c[1] = 100));
  const score = h.special === 'final' ? 100 : Math.round(cats.reduce((a, c) => a + c[1], 0) / 5);
  return { cats, score };
}
function toast(html, ms = 2600) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 400);
}
function meAvatar() { return S.settings.photo ? `<img src="${S.settings.photo}" alt="">` : '<span>🐴</span>'; }

// ───── deck ─────
let deck = [];
function buildDeck() {
  const done = new Set(S.swipes.filter((s) => s.round === S.round).map((s) => s.id));
  const always = (h) => ['imposter', 'mystery', 'final', 'star'].includes(h.special);
  const ok = (h) => !done.has(h.id) && !matched(h.id) && (S.settings.show === 'all' || always(h) || (S.settings.show === 'stallions' ? h.sex !== 'Mare' : h.sex === 'Mare'));
  const list = HORSES.filter((h) => !h.special && ok(h)).sort(() => Math.random() - 0.5);
  HORSES.filter((h) => h.special && h.special !== 'final' && ok(h) && Math.random() < h.rarity).forEach((h) => {
    const at = h.early && S.round === 1 ? 1 + Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * Math.max(1, list.length - 3));
    list.splice(Math.min(list.length, at), 0, h);
  });
  const fin = byId.final;
  if (ok(fin)) { if (Math.random() < fin.rarity && list.length > 8) list.splice(6 + Math.floor(Math.random() * (list.length - 6)), 0, fin); else list.push(fin); }
  deck = list.map((h) => ({ h, likesYou: !h.special && Math.random() < 0.12 }));
}

// ───── card rendering ─────
const stack = $('#stack');
const badges = (h) => (h.special === 'verified' || h.special === 'celebrity' || h.special === 'star' ? `<span class="check" title="Verified">${ic('check')}</span>` : '');
function statusHTML(item) {
  const h = item.h;
  switch (h.special) {
    case 'celebrity': return `<span class="status celeb">${h.followers} followers</span>`;
    case 'imposter': return '<span class="status imp">Self-verified horse</span>';
    case 'verified': return '<span class="status ver">Verified horse</span>';
    case 'star': return "<span class=\"status star\">Star of Horsin' Around</span>";
    case 'final': return '<span class="status fin">Legendary</span>';
    case 'mystery': return '<span class="status live">Identity unknown</span>';
  }
  return item.likesYou ? '<span class="status ly">Already likes you</span>' : '<span class="status live">Recently grazing</span>';
}
function phHTML(p, i) {
  if (p.slide) return `<div class="ph slide s-${p.slide}${i ? '' : ' on'}">${SLIDES[p.slide]}</div>`;
  return `<img class="ph${p.fit ? ' contain' : ''}${i ? '' : ' on'}" src="${p.src}" draggable="false" alt="">`;
}
function cardHTML(item) {
  const h = item.h, sp = h.special || '';
  return `<div class="photos${h.photos.some((p) => p.fit) ? ' hw-bg' : ''}">${h.photos.map(phHTML).join('')}${sp === 'mystery' ? '<div class="censor">CENSORED</div>' : ''}</div>
    ${h.photos.length > 1 ? `<div class="bars">${h.photos.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>` : ''}
    ${sp && sp !== 'final' ? '<div class="rare">RARE</div>' : ''}<div class="cap"${h.photos[0].cap ? '' : ' hidden'}>${esc(h.photos[0].cap || '')}</div>
    <div class="stamp like">LIKE</div><div class="stamp nope">NEIGH</div><div class="stamp sup">SUPER<br>LIKE</div>
    <div class="info">
      ${statusHTML(item)}
      <h2>${esc(h.name)} <span class="age">${esc(h.age)}</span>${badges(h)}</h2>
      <p class="meta">${esc(h.breed)}<i></i>${ic('pin')}${esc(h.loc)}</p>
      <p class="bio">${esc(h.bio)}</p>
      <div class="chips">${h.traits.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <button class="more" aria-label="Open profile" title="Open profile (↓)">${ic('up')}</button>
    </div>`;
}
function render() {
  stack.innerHTML = '';
  if (!deck.length) {
    stack.innerHTML = `<div class="empty"><div class="radar"><span></span><span></span><span></span><div class="me">${meAvatar()}</div></div>
      <h3>No more horses nearby</h3><p>You've seen every horse in your area. Some deserve a second chance. Some don't. Here they all are anyway.</p>
      <button class="btn primary" id="expand">Expand radius to Earth</button></div>`;
    $('#expand').onclick = () => { S.round++; persist(); buildDeck(); render(); sfx('super'); toast('🌍 Search radius: <b>the entire planet</b>'); };
    updateHud(); return;
  }
  deck.slice(0, 3).reverse().forEach((item, i, arr) => {
    const el = document.createElement('div'), depth = arr.length - 1 - i;
    el.className = `card${item.h.special ? ' sp-' + item.h.special : ''}`; el.innerHTML = cardHTML(item);
    el.style.transform = `translateY(${depth * 10}px) scale(${1 - depth * 0.04})`; el.dataset.depth = depth;
    stack.appendChild(el); if (depth === 0) bindCard(el, item);
  });
  updateHud();
}

// ───── drag / swipe ─────
let busy = false, boost = 0;
function bindCard(el, item) {
  let sx = 0, sy = 0, dx = 0, dy = 0, t0 = 0, down = false, pi = 0;
  const phs = el.querySelectorAll('.ph'), bars = el.querySelectorAll('.bars i'), cap = el.querySelector('.cap');
  const setPhoto = (n) => {
    pi = (n + phs.length) % phs.length; phs.forEach((p, i) => p.classList.toggle('on', i === pi)); bars.forEach((b, i) => b.classList.toggle('on', i === pi));
    const c = item.h.photos[pi].cap; cap.hidden = !c; cap.textContent = c || '';
  };
  el.addEventListener('pointerdown', (e) => {
    if (busy || e.target.closest('.more') || e.button > 0) return; down = true; sx = e.clientX; sy = e.clientY; t0 = Date.now(); dx = dy = 0;
    el.setPointerCapture(e.pointerId); el.style.transition = 'none';
  });
  el.addEventListener('pointermove', (e) => {
    if (!down) return; dx = e.clientX - sx; dy = e.clientY - sy;
    el.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.06}deg)`;
    const p = Math.min(1, Math.abs(dx) / 120), up = Math.min(1, Math.max(0, -dy - Math.abs(dx) * 0.5) / 120);
    el.querySelector('.like').style.opacity = dx > 0 ? p : 0; el.querySelector('.nope').style.opacity = dx < 0 ? p : 0; el.querySelector('.sup').style.opacity = up;
    const next = stack.querySelector('[data-depth="1"]'); if (next) next.style.transform = `translateY(${10 - 10 * p}px) scale(${0.96 + 0.04 * Math.max(p, up)})`;
    document.body.dataset.drag = up > 0.5 ? 'super' : dx > 40 ? 'like' : dx < -40 ? 'nope' : '';
  });
  const end = () => {
    if (!down) return; down = false; delete document.body.dataset.drag; const v = Math.abs(dx) / Math.max(1, Date.now() - t0);
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
      const r = el.getBoundingClientRect();
      if (phs.length > 1 && sy - r.top < r.height * 0.62) { setPhoto(pi + (sx - r.left > r.width / 2 ? 1 : -1)); sfx('tap'); }
      return resetCard(el);
    }
    if (-dy > 130 && Math.abs(dx) < 120) return decide('super');
    if (Math.abs(dx) > 110 || (v > 0.6 && Math.abs(dx) > 40)) return decide(dx > 0 ? 'like' : 'nope', dx, dy);
    resetCard(el);
  };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.querySelector('.more').onclick = (e) => { e.stopPropagation(); openProfile(item.h, true); };
}
function resetCard(el) {
  el.style.transition = 'transform .45s cubic-bezier(.2,1.4,.4,1)'; el.style.transform = '';
  el.querySelectorAll('.stamp').forEach((s) => (s.style.opacity = 0));
  const next = stack.querySelector('[data-depth="1"]'); if (next) { next.style.transition = 'transform .45s'; next.style.transform = 'translateY(10px) scale(.96)'; }
}
function decide(act, dx = 0, dy = 0) {
  if (busy || !deck.length) return; const item = deck[0], h = item.h;
  if (act === 'like' && S.likes <= 0) return paywall('likes');
  if (act === 'super' && S.supers <= 0) return paywall('supers');
  busy = true; closeSheet();
  const el = stack.querySelector('[data-depth="0"]');
  if (el) {
    const W = innerWidth + 300; el.style.transition = 'transform .5s cubic-bezier(.3,.6,.4,1), opacity .5s';
    el.querySelector(act === 'like' ? '.like' : act === 'nope' ? '.nope' : '.sup').style.opacity = 1;
    el.style.transform = act === 'super' ? `translate(${dx}px,-${innerHeight + 200}px) rotate(${dx * 0.05}deg)` : `translate(${act === 'like' ? W : -W}px,${dy + 60}px) rotate(${act === 'like' ? 35 : -35}deg)`;
  }
  sfx(act); buzz(act === 'super' ? [10, 30, 10] : 12);
  if (act === 'like') S.likes--; if (act === 'super') S.supers--;
  S.swipes.push({ id: h.id, act, ts: Date.now(), round: S.round }); deck.shift();
  let isMatch = false;
  if (act !== 'nope') {
    let ch = h.chance * (act === 'super' ? 1.8 : 1) + (boost > 0 ? 0.25 : 0); if (item.likesYou) ch = 1;
    if (h.special === 'final') ch = act === 'super' ? 1 : 0.5;
    isMatch = Math.random() < Math.min(0.97, ch); if (boost > 0) boost--;
  }
  persist();
  setTimeout(() => {
    busy = false; render();
    if (h.special === 'mystery') reveal(h, act, isMatch);
    else if (isMatch) match(h, act);
    else if (h.special === 'final' && act === 'nope') { sfx('sad'); toast('⚜ <b>The Final Horse</b> will remember this.', 3500); }
    else if (h.id === 'bojack' && act === 'nope') toast('BoJack is fine. He\'s totally fine. (He is not fine.)', 3200);
    else if (act !== 'nope' && Math.random() < 0.15) toast(`${avImg(h)}<span><b>${esc(h.name)}</b> viewed your profile 👀</span>`);
  }, 380);
}

// ───── match / reveal / paywall ─────
function openOverlay(html, cls = '') { const m = $('#match'); m.className = 'overlay match show ' + cls; m.innerHTML = html; return m; }
function closeMatch() { const m = $('#match'); m.classList.remove('show'); setTimeout(() => { if (!m.classList.contains('show')) m.innerHTML = ''; }, 300); }
function match(h, act) {
  if (!matched(h.id)) S.matches.unshift({ id: h.id, ts: Date.now(), super: act === 'super' });
  S.chats[h.id] = S.chats[h.id] || []; persist(); updateHud();
  const { cats, score } = compat(h), fin = h.special === 'final';
  const verdict = fin ? 'THE PROPHECY IS FULFILLED.' : score > 85 ? 'Vet-approved. Book the trailer.' : score > 70 ? 'Your ancestors pulled the same carriage.' : score > 55 ? 'Statistically fine. Emotionally unclear.' : 'Doomed, but in a fun way.';
  openOverlay(`<canvas id="confetti"></canvas><div class="mwrap">
    <div class="mtitle"><span>${fin ? 'DESTINY' : "IT'S A"}</span><b>${fin ? 'AWAITS' : 'MATCH'}</b></div>
    <p class="msub">${fin ? 'The Final Horse has chosen you.' : `You and ${esc(h.name)} have liked each other.`}</p>
    <div class="pair"><div class="pp a">${meAvatar()}</div><div class="heart">${fin ? '⚜' : ic('heart')}</div><div class="pp b"><img src="${avatar(h)}" alt=""></div></div>
    <div class="compat"><div class="score"><b id="pct">0</b>% COMPATIBLE</div>
      ${cats.map(([c, v], i) => `<div class="row"><span>${esc(c)}</span><div class="bar"><i style="--w:${v}%;--d:${0.4 + i * 0.12}s"></i></div><em>${v}%</em></div>`).join('')}
      <p class="verdict">${verdict}</p></div>
    <button class="btn primary" id="mmsg">MESSAGE HORSE</button><button class="btn ghost" id="mkeep">KEEP SWIPING</button></div>`, fin ? 'final' : '');
  fin ? sfx('epic') : sfx('match'); buzz([30, 50, 30]); confetti(fin);
  let n = 0; const tick = setInterval(() => { n = Math.min(score, n + 2); const p = $('#pct'); if (p) p.textContent = n; if (n >= score) clearInterval(tick); }, 22);
  $('#mkeep').onclick = closeMatch; $('#mmsg').onclick = () => { closeMatch(); openChat(h.id); };
  if (!S.chats[h.id].length && Math.random() < 0.55) setTimeout(() => { if (!S.chats[h.id]?.length) horseSays(h.id, true); }, 6000 + Math.random() * 9000);
}
function reveal(h, act, isMatch) {
  const r = rand(h.reveals);
  openOverlay(`<div class="mwrap"><div class="mtitle small"><span>MYSTERY</span><b>REVEALED</b></div>
    <p class="msub">${act === 'nope' ? 'You rejected…' : isMatch ? 'You matched with…' : 'You liked… (they did not like you back)'}</p>
    <div class="pp big"><img src="${r.img}" alt=""></div><h3 class="rname">${esc(r.name)}</h3><p class="msub">${esc(r.line)}</p>
    <button class="btn primary" id="mkeep">KEEP SWIPING</button></div>`);
  sfx(isMatch ? 'match' : 'super'); $('#mkeep').onclick = closeMatch;
  if (isMatch && !matched(h.id)) { S.matches.unshift({ id: h.id, ts: Date.now() }); S.chats[h.id] = []; persist(); updateHud(); }
}
function confetti(fin) {
  const c = $('#confetti'); if (!c) return; const x = c.getContext('2d'); c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2;
  const em = fin ? ['⚜', '✨', '👑', '🐎'] : ['🥕', '❤️', '🐴', '🌾', '✨'];
  const ps = Array.from({ length: 70 }, () => ({ x: c.width / 2, y: c.height * 0.4, vx: (Math.random() - 0.5) * 30, vy: -Math.random() * 30 - 8, r: Math.random() * 6, e: rand(em), s: 28 + Math.random() * 30 }));
  let f = 0; (function loop() {
    if (!document.body.contains(c) || f++ > 220) return; x.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => { p.vy += 0.7; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.r += 0.05; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.font = `${p.s}px serif`; x.fillText(p.e, 0, 0); x.restore(); });
    requestAnimationFrame(loop);
  })();
}
function paywall(kind) {
  sfx('sad');
  openOverlay(`<div class="mwrap"><div class="gold">🥕</div><div class="mtitle small"><span>OUT OF</span><b>${kind === 'likes' ? 'LIKES' : 'SUPERS'}</b></div>
    <p class="msub">Horses are waiting. Upgrade to <b>Horse Tinder GOLD™</b> for more ${kind === 'likes' ? 'likes' : 'super likes'}.</p>
    <button class="btn primary" id="pay">Pay 1 carrot</button><button class="btn ghost" id="mkeep">Maybe later</button></div>`);
  $('#mkeep').onclick = closeMatch;
  $('#pay').onclick = (e) => {
    e.target.textContent = 'Processing carrot…'; e.target.disabled = true;
    setTimeout(() => { S.likes = 25; S.supers = 3; persist(); updateHud(); closeMatch(); sfx('super'); toast('🥕 Carrot accepted. Likes refilled!'); }, 1100);
  };
}

// ───── profile (sheet + chat side panel) ─────
function figHTML(p) {
  const cap = p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : '';
  if (p.slide) return `<figure class="slide s-${p.slide}">${SLIDES[p.slide]}${cap}</figure>`;
  return `<figure class="${p.fit ? 'contain hw-bg' : ''}"><img class="fig-img" src="${p.src}" alt="">${cap}</figure>`;
}
function profileHTML(h) {
  const ph = h.photos, sec = (t, b) => `<section><h4>${t}</h4>${b}</section>`;
  return `<div class="prof${h.special === 'mystery' ? ' mys' : ''}">
    ${figHTML(ph[0])}
    <div class="pb"><h2>${esc(h.name)} <span class="age">${esc(h.age)}</span>${badges(h)}</h2>
      <p class="meta">${esc(h.breed)}<i></i>${esc(h.sex)}</p><p class="meta">${ic('pin')}${esc(h.loc)}</p>
      ${sec('About me', `<p>${esc(h.bio)}</p>`)}</div>
    ${ph[1] ? figHTML(ph[1]) : ''}
    <div class="pb">${sec('Looking for', `<p class="look">${esc(h.looking)}</p>`)}
      ${sec('Basics', `<div class="grid"><div><small>Height</small><b>${esc(h.height)}</b></div>${Object.entries(h.stats).map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</div>`)}</div>
    ${ph[2] ? figHTML(ph[2]) : ''}
    <div class="pb">${sec('Personality', `<div class="chips solid">${h.traits.map((t) => `<span>${esc(t)}</span>`).join('')}</div>`)}
      ${sec('Red flags', h.flags.map((f) => `<p class="flag">${ic('flag')}<span>${esc(f)}</span></p>`).join(''))}</div>
    ${ph.slice(3).map(figHTML).join('')}
    <p class="report">Report ${esc(h.name)} for being too powerful</p></div>`;
}
function openProfile(h, actions) {
  const sh = $('#sheet');
  sh.innerHTML = `<button class="close" aria-label="Close">${ic('down')}</button>${profileHTML(h)}
    ${actions ? `<div class="sp-act"><button class="act nope" data-a="nope" aria-label="Neigh">${ic('x')}</button><button class="act super" data-a="super" aria-label="Super like">${ic('star')}</button><button class="act like" data-a="like" aria-label="Like">${ic('heart')}</button></div>` : ''}`;
  sh.scrollTop = 0; sh.classList.add('show'); $('#scrim').classList.add('show');
  sh.querySelector('.close').onclick = closeSheet; sh.querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => decide(b.dataset.a)));
}
function closeSheet() { $('#sheet').classList.remove('show'); $('#scrim').classList.remove('show'); }
$('#scrim').onclick = closeSheet;

// ───── chat ─────
let openId = null;
function openChat(id) {
  openId = id; const h = byId[id]; S.unread[id] = 0; persist();
  const c = $('#chat'); c.classList.add('show');
  c.innerHTML = `<div class="chat-main"><header><button class="back" aria-label="Back">${ic('back')}</button>${avImg(h)}
      <div><b>${esc(h.name)}${badges(h)}</b>${h.id === 'concrete' ? '<small class="off">Last active 2008</small>' : '<small>Active now in the paddock</small>'}</div>
      <button class="icon" id="cprof" aria-label="View profile">${ic('info')}</button><button class="icon" id="cun" aria-label="Unmatch" title="Unmatch">${ic('more')}</button></header>
    <div class="msgs" id="msgs"></div>
    <div class="quick">${PICKUP.map((p) => `<button>${esc(p)}</button>`).join('')}<button data-carrot>🥕 Send a carrot</button></div>
    <form id="cform"><input id="cin" placeholder="Say something horse-y…" autocomplete="off" maxlength="300"><button aria-label="Send">${ic('send')}</button></form></div>
    <aside class="chat-prof">${profileHTML(h)}</aside>`;
  c.querySelector('.back').onclick = closeChat; $('#cprof').onclick = () => openProfile(h, false);
  $('#cun').onclick = () => { if (confirm(`Unmatch ${h.name}? They'll be fine. (They won't.)`)) unmatch(id, false); };
  c.querySelectorAll('.quick button').forEach((b) => (b.onclick = () => send(b.dataset.carrot !== undefined ? '🥕' : b.textContent)));
  $('#cform').onsubmit = (e) => { e.preventDefault(); const v = $('#cin').value.trim(); if (v) send(v); $('#cin').value = ''; };
  drawMsgs(); updateHud(); if (matchMedia('(pointer: fine)').matches) $('#cin').focus();
}
function closeChat() { openId = null; $('#chat').classList.remove('show'); updateHud(); }
function drawMsgs(typing) {
  const box = $('#msgs'); if (!box) return; const h = byId[openId], list = S.chats[openId] || [];
  const when = new Date((S.matches.find((m) => m.id === openId) || {}).ts || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  box.innerHTML = `<div class="mhead">${avImg(h)}<p>You matched with <b>${esc(h.name)}</b></p><small>${when}</small></div>` +
    list.map((m, i) => `<div class="msg ${m.me ? 'me' : 'them'}">${m.img ? `<img src="${m.img}" alt="">` : ''}${m.t ? `<span>${esc(m.t)}</span>` : ''}</div>${m.me && i === list.length - 1 && !typing && m.seen ? '<small class="seen">Seen</small>' : ''}`).join('') +
    (typing ? `<div class="msg them typing"><span><i></i><i></i><i></i></span>${h.typing ? `<small>${esc(h.name.split(' ')[0])} ${esc(h.typing)}…</small>` : ''}</div>` : '');
  box.scrollTop = box.scrollHeight;
}
function send(t) { const id = openId; if (!id) return; S.chats[id].push({ me: 1, t, ts: Date.now() }); persist(); sfx('send'); drawMsgs(); updateHud(); reply(id, t); }
const pend = {};
function reply(id, text) {
  const h = byId[id]; clearTimeout(pend[id]);
  if (/glue|dog food|lasagn|horse meat|burger/i.test(text)) { pend[id] = setTimeout(() => { push(id, 'WHAT did you just say'); setTimeout(() => unmatch(id, true), 1400); }, 900); return; }
  const seen = () => { const l = S.chats[id]; if (l && l.length) l[l.length - 1].seen = 1; persist(); };
  if (Math.random() < (h.ghost || 0.04)) { pend[id] = setTimeout(() => { seen(); if (openId === id) drawMsgs(); }, 1500); return; }
  const delay = h.fast ? 300 : h.slow ? 4200 : 900 + Math.random() * 1500;
  pend[id] = setTimeout(() => { seen(); if (openId === id) drawMsgs(true); pend[id] = setTimeout(() => horseSays(id, false, text), h.fast ? 400 : h.typing ? 3200 : 1200 + Math.random() * 1400); }, delay);
}
function horseSays(id, opener, text = '') {
  const h = byId[id]; if (!matched(id)) return; let out = [];
  if (text === '🥕') out = [rand(['A CARROT 😭', 'you remembered 🥕', 'ok now i HAVE to marry you', '*crunch crunch* 🥕'])];
  if (!out.length && text && h.kw) for (const [k, v] of Object.entries(h.kw)) if (new RegExp(k, 'i').test(text)) { out = [rand(v)]; break; }
  if (!out.length && text) for (const [re, v] of KW) if (re.test(text)) {
    if (v === '__PIC__') {
      const pics = h.photos.filter((p) => p.src && !p.fit);
      const img = id === 'dah' ? 'img/horses/dah-2.jpg' : !pics.length || Math.random() < 0.3 ? 'img/horses/misc-1.jpg' : rand(pics).src;
      out = [{ img }, rand(['here u go 😏', 'me rn', 'stable pic as requested', "don't show ur friends"])];
    } else if (v !== '__GLUE__') out = [rand(v)];
    break;
  }
  if (!out.length) out = [Math.random() < 0.72 ? rand(h.lines) : rand(GENERIC)];
  if (opener) out = [rand(h.lines)];
  if (Math.random() < 0.3 && !opener) out.push(rand(Math.random() < 0.5 ? h.lines : GENERIC));
  const fmt = (s) => { s = s.replace('{msg}', text || '...').replace('{you}', you()); return h.caps ? s.toUpperCase() : h.lower ? s.toLowerCase() : s; };
  out.forEach((m, i) => setTimeout(() => push(id, typeof m === 'string' ? fmt(m) : null, m.img), i * (h.fast ? 350 : 1100)));
}
function push(id, t, img) {
  if (!matched(id)) return; S.chats[id].push({ t, img, ts: Date.now() });
  if (openId !== id) { S.unread[id] = (S.unread[id] || 0) + 1; toast(`${avImg(byId[id])}<span><b>${esc(byId[id].name)}</b> ${esc(t || 'sent a photo')}</span>`); }
  persist(); sfx('msg'); if (openId === id) drawMsgs(); updateHud();
}
function unmatch(id, byHorse) {
  S.matches = S.matches.filter((m) => m.id !== id); delete S.chats[id]; delete S.unread[id]; persist();
  if (openId === id) closeChat(); updateHud();
  if (byHorse) { sfx('sad'); toast(`💔 <span><b>${esc(byId[id].name)}</b> unmatched you. Never mention glue.</span>`, 3500); }
}

// ───── navigation: mobile tabs + desktop sidebar ─────
let tab = 'swipe', side = 'inbox';
function setTab(t, quiet) {
  tab = t; if (t !== 'swipe') side = t;
  document.body.dataset.tab = t; document.body.dataset.side = side;
  $$('.tabs [data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
  $$('.side-tabs [data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === side));
  if (!desk() && openId && t !== 'inbox') closeChat();
  renderSide(); if (!quiet) sfx('tap');
}
$$('[data-tab]').forEach((b) => (b.onclick = () => setTab(b.dataset.tab)));
$$('[data-go]').forEach((b) => (b.onclick = () => setTab(b.dataset.go)));
function renderSide() { if (side === 'inbox') renderInbox(); else if (side === 'history') renderHistory(); else renderMe(); }

function renderInbox() {
  const v = $('#v-inbox');
  const fresh = S.matches.filter((m) => !(S.chats[m.id] || []).length);
  const convo = S.matches.filter((m) => (S.chats[m.id] || []).length).sort((a, b) => S.chats[b.id].at(-1).ts - S.chats[a.id].at(-1).ts);
  v.innerHTML = `<div class="sec">New matches <em>${fresh.length || ''}</em></div>
    <div class="newm">${fresh.length ? fresh.map((m) => `<button class="tile" data-id="${m.id}">${avImg(byId[m.id])}<span>${esc(byId[m.id].name)}</span>${m.super ? `<i class="sb">${ic('star')}</i>` : ''}</button>`).join('')
      : `<div class="empty-box"><b>No new matches</b>Swipe right on a few horses. Someone will neigh back.</div>`}</div>
    <div class="sec">Messages</div>
    <div class="list">${convo.length ? convo.map((m) => {
      const h = byId[m.id], last = S.chats[m.id].at(-1), u = S.unread[m.id] || 0;
      return `<button data-id="${m.id}" class="${openId === m.id ? 'on' : ''}">${avImg(h)}<div><b>${esc(h.name)}</b><p class="${u ? 'un' : ''}">${last.me ? 'You: ' : ''}${esc(last.t || 'Sent a photo')}</p></div>${u ? '<i class="dot"></i>' : ''}</button>`;
    }).join('') : `<div class="empty-box"><b>No messages yet</b>Open a match and say "hay there 👋".</div>`}</div>`;
  v.querySelectorAll('[data-id]').forEach((b) => (b.onclick = () => openChat(b.dataset.id)));
}
function renderHistory() {
  const v = $('#v-history'), f = v.dataset.f || 'all';
  const L = { like: ['heart', 'Liked'], nope: ['x', 'Neighed'], super: ['star', 'Super liked'] };
  const list = [...S.swipes].reverse().filter((s) => f === 'all' || s.act === f);
  v.innerHTML = `<div class="segc">${[['all', 'All'], ['like', 'Liked'], ['super', 'Super'], ['nope', 'Neighed']].map(([k, l]) => `<button data-f="${k}" class="${f === k ? 'on' : ''}">${l}</button>`).join('')}</div>
    <div class="sec">${list.length} horse${list.length === 1 ? '' : 's'}</div>
    <div class="list">${list.length ? list.slice(0, 150).map((s) => {
      const h = byId[s.id]; if (!h) return '';
      return `<button data-id="${h.id}">${avImg(h)}<div><b>${esc(h.name)}</b><small>${esc(h.breed)}</small></div>${matched(h.id) ? '<span class="tag m">Match</span>' : `<span class="tag ${s.act}">${ic(L[s.act][0])}${L[s.act][1]}</span>`}</button>`;
    }).join('') : '<div class="empty-box"><b>Nothing here yet</b>Every horse you swipe on shows up here.</div>'}</div>`;
  v.querySelectorAll('[data-f]').forEach((b) => (b.onclick = () => { v.dataset.f = b.dataset.f; renderHistory(); }));
  v.querySelectorAll('[data-id]').forEach((b) => (b.onclick = () => openProfile(byId[b.dataset.id], false)));
}
function renderMe() {
  const v = $('#v-me'), st = S.settings, sw = S.swipes, liked = sw.filter((s) => s.act !== 'nope').length;
  const rate = liked ? Math.round((S.matches.length / liked) * 100) : 0;
  v.innerHTML = `<div class="mecard"><label class="ava"><div class="ava-in">${meAvatar()}</div><span class="cam">${ic('camera')}</span><input type="file" accept="image/*" id="upl" hidden></label>
      <input class="nm" id="nm" value="${esc(st.name)}" placeholder="Your horse name" maxlength="24"><p class="hint">Click your photo to upload your own</p></div>
    <div class="stats"><div><b>${sw.length}</b><small>Swipes</small></div><div><b>${liked}</b><small>Likes</small></div><div><b>${S.matches.length}</b><small>Matches</small></div><div><b>${rate}%</b><small>Match rate</small></div></div>
    <div class="sec">Settings</div>
    <div class="set">
      <label><span>Dark mode</span><input type="checkbox" id="sdark" ${st.dark ? 'checked' : ''}><i></i></label>
      <label><span>Sound effects<small>Synthesized neighs included</small></span><input type="checkbox" id="ssnd" ${st.sound ? 'checked' : ''}><i></i></label>
      <div><span>Show me</span><div class="segc">${[['all', 'All'], ['stallions', 'Stallions'], ['mares', 'Mares']].map(([k, l]) => `<button data-s="${k}" class="${st.show === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
    </div>
    <div class="set">
      <button id="sboost"><span>Boost<small>Better match odds for your next 5 likes</small></span>${ic('zap')}</button>
      <button id="srefill"><span>Refill likes<small>Costs one (1) carrot</small></span>🥕</button>
      <button id="sreset" class="danger"><span>Reset everything<small>Matches, chats and history</small></span></button>
    </div>
    <p class="foot">Made with love by Paul Nercessian &amp; Neil Thakkar<br>Photos via Wikimedia Commons (see CREDITS.md)</p>`;
  $('#nm').oninput = (e) => { st.name = e.target.value.trim(); persist(); updateHud(); };
  $('#sdark').onchange = (e) => { st.dark = e.target.checked; applyTheme(); persist(); };
  $('#ssnd').onchange = (e) => { st.sound = e.target.checked; persist(); updateHud(); };
  v.querySelectorAll('[data-s]').forEach((b) => (b.onclick = () => { st.show = b.dataset.s; persist(); buildDeck(); render(); renderMe(); }));
  $('#sboost').onclick = startBoost;
  $('#srefill').onclick = () => paywall('likes');
  $('#sreset').onclick = () => { if (confirm('Reset all matches, chats and history?')) { ['swipes', 'matches', 'chats', 'unread', 'likes', 'supers', 'round'].forEach((k) => localStorage.removeItem('ht.' + k)); location.reload(); } };
  $('#upl').onchange = (e) => {
    const f = e.target.files[0]; if (!f) return; const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => {
      const cv = document.createElement('canvas'), s = 240, k = Math.max(s / im.width, s / im.height); cv.width = cv.height = s;
      cv.getContext('2d').drawImage(im, (s - im.width * k) / 2, (s - im.height * k) / 2, im.width * k, im.height * k);
      st.photo = cv.toDataURL('image/jpeg', 0.8); persist(); renderMe(); updateHud();
    }; im.src = r.result; };
    r.readAsDataURL(f);
  };
}
function startBoost() { boost = 5; sfx('super'); toast('⚡ <span><b>Boosted.</b> You are the hottest horse within 10 paddocks.</span>'); updateHud(); }

// ───── HUD / theme / keys ─────
function updateHud() {
  $('#h-likes').textContent = S.likes; $('#h-sup').textContent = S.supers; $('#h-match').textContent = S.matches.length;
  const u = Object.values(S.unread).reduce((a, b) => a + b, 0) + S.matches.filter((m) => !(S.chats[m.id] || []).length).length;
  $$('.badge').forEach((b) => { b.textContent = u; b.hidden = !u; });
  $$('.snd').forEach((b) => (b.innerHTML = ic(S.settings.sound ? 'vol' : 'mute')));
  $('#themebtn').innerHTML = ic(S.settings.dark ? 'sun' : 'moon');
  $('#me-ava').innerHTML = meAvatar(); $('#me-name').textContent = S.settings.name || 'My Profile';
  document.body.classList.toggle('boosted', boost > 0);
  if (side !== 'me') renderSide();
}
function applyTheme() { document.documentElement.dataset.theme = S.settings.dark ? 'dark' : 'light'; }
$$('.snd').forEach((b) => (b.onclick = () => { S.settings.sound = !S.settings.sound; persist(); updateHud(); sfx('tap'); if (side === 'me') renderMe(); }));
$('#themebtn').onclick = () => { S.settings.dark = !S.settings.dark; applyTheme(); persist(); updateHud(); if (side === 'me') renderMe(); };
$('#b-nope').onclick = () => decide('nope'); $('#b-like').onclick = () => decide('like'); $('#b-sup').onclick = () => decide('super');
$('#b-boost').onclick = startBoost;
$('#b-rew').onclick = () => {
  const last = S.swipes.filter((s) => s.round === S.round).at(-1); if (!last) return toast('Nothing to rewind.');
  if (matched(last.id)) return toast("Can't rewind a match. That's not how feelings work.");
  S.swipes.splice(S.swipes.lastIndexOf(last), 1); if (last.act === 'like') S.likes++; if (last.act === 'super') S.supers++;
  persist(); deck.unshift({ h: byId[last.id] }); render(); sfx('tap'); toast(`↺ <span><b>${esc(byId[last.id].name)}</b> pretends not to notice.</span>`);
};
document.addEventListener('keydown', (e) => {
  if (e.target.matches?.('input')) return;
  if (e.key === 'Escape') { if ($('#match').classList.contains('show')) closeMatch(); else if ($('#sheet').classList.contains('show')) closeSheet(); else if (openId) closeChat(); return; }
  if ($('#match').classList.contains('show')) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); $('#mkeep').click(); } return; }
  if (openId || $('#onb').classList.contains('show') || (!desk() && tab !== 'swipe')) return;
  if (e.key === 'ArrowLeft') decide('nope');
  else if (e.key === 'ArrowRight') decide('like');
  else if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); decide('super'); }
  else if (e.key === 'ArrowDown' || e.key === 'i') { e.preventDefault(); if ($('#sheet').classList.contains('show')) closeSheet(); else if (deck[0]) openProfile(deck[0].h, true); }
  else if (e.key === 'z' || e.key === 'Backspace') $('#b-rew').click();
});

// ───── boot ─────
applyTheme(); buildDeck(); render(); setTab('swipe', true);
if (!S.settings.onboarded) {
  $('#mosaic').innerHTML = HORSES.filter((h) => !h.special).concat(HORSES.filter((h) => !h.special)).map((h) => `<img src="${h.photos[0].src}" alt="">`).join('');
  $('#onb').classList.add('show');
  const go = () => { S.settings.name = $('#onb-name').value.trim(); S.settings.onboarded = true; persist(); $('#onb').classList.remove('show'); updateHud(); sfx('match'); };
  $('#onb-go').onclick = go; $('#onb-name').onkeydown = (e) => { if (e.key === 'Enter') go(); };
}
})();
