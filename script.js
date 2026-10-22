/* ============ DATA (edit here) ============
   Photos go next to index.html: hero.jpg, about-1.jpg, about-2.jpg,
   team-1..4.jpg and for each property <id>.jpg, <id>-2.jpg, <id>-3.jpg */
const P = [
  {
    id: 'lakeside-modern-villa',
    n: 'Lakeside Modern Villa',
    loc: 'Austin, Texas, USA',
    pr: 2.35,
    t: 'Villa',
    b: 5,
    ba: 5,
    sf: 5200,
    g: 'linear-gradient(135deg,#8ec5d6,#34677a)',
  },
  {
    id: 'pacific-glass-house',
    n: 'Pacific Glass House',
    loc: 'Malibu, California, USA',
    pr: 4.8,
    t: 'House',
    b: 4,
    ba: 5,
    sf: 4800,
    g: 'linear-gradient(135deg,#62a3d6,#1d4e7a)',
  },
  {
    id: 'desert-horizon-estate',
    n: 'Desert Horizon Estate',
    loc: 'Scottsdale, Arizona, USA',
    pr: 3.15,
    t: 'Estate',
    b: 6,
    ba: 6,
    sf: 6800,
    g: 'linear-gradient(135deg,#e0a458,#7a4b2a)',
  },
  {
    id: 'oceanfront-residence',
    n: 'Oceanfront Residence',
    loc: 'Miami, Florida, USA',
    pr: 5.2,
    t: 'Residence',
    b: 5,
    ba: 6,
    sf: 5900,
    g: 'linear-gradient(135deg,#62C4FF,#1b6fa8)',
  },
  {
    id: 'modern-hillside-retreat',
    n: 'Modern Hillside Retreat',
    loc: 'Los Angeles, California, USA',
    pr: 3.75,
    t: 'House',
    b: 4,
    ba: 4,
    sf: 4400,
    g: 'linear-gradient(135deg,#3b5d8a,#e29b6b)',
  },
  {
    id: 'palm-garden-residence',
    n: 'Palm Garden Residence',
    loc: 'Beverly Hills, California, USA',
    pr: 6.4,
    t: 'Residence',
    b: 6,
    ba: 7,
    sf: 7200,
    g: 'linear-gradient(135deg,#7fd1b9,#23766b)',
  },
  {
    id: 'contemporary-lake-house',
    n: 'Contemporary Lake House',
    loc: 'Lake Tahoe, Nevada, USA',
    pr: 2.95,
    t: 'House',
    b: 4,
    ba: 4,
    sf: 3900,
    g: 'linear-gradient(135deg,#9fb8d1,#2f4357)',
  },
  {
    id: 'architectural-downtown-penthouse',
    n: 'Architectural Downtown Penthouse',
    loc: 'Austin, Texas, USA',
    pr: 1.85,
    t: 'Penthouse',
    b: 3,
    ba: 3,
    sf: 2800,
    g: 'linear-gradient(135deg,#6b7f99,#16243a)',
  },
];
const TEAM = [
  { n: 'Daniel Morgan', r: 'Managing Director', g: 'linear-gradient(135deg,#27476e,#0E1C31)' },
  {
    n: 'Olivia Carter',
    r: 'Luxury Property Advisor',
    g: 'linear-gradient(135deg,#c4a574,#6b5535)',
  },
  { n: 'James Wilson', r: 'Investment Consultant', g: 'linear-gradient(135deg,#5d7da3,#1d3354)' },
  {
    n: 'Sophia Bennett',
    r: 'Senior Property Specialist',
    g: 'linear-gradient(135deg,#a58f6a,#3a3020)',
  },
];
const SERV = [
  ['Luxury Home Sales', 'Discreet representation for sellers and buyers of exceptional homes.'],
  ['Property Investment', 'Data-led opportunities with strong long-term performance.'],
  ['Property Marketing', 'Editorial photography, film and a global buyer network.'],
  ['Real Estate Advisory', 'Honest guidance on timing, structure and negotiation.'],
  ['Property Valuation', 'Precise pricing built on current market evidence.'],
  ['Relocation Services', 'Everything handled, from first visit to the first night at home.'],
];
const WHY = [
  [
    'Local expertise',
    'Advisors who live in the neighborhoods they sell, and know what is coming next.',
  ],
  ['Transparent process', 'Clear fees, honest feedback and no surprises from offer to closing.'],
  [
    'Trusted by owners',
    'Long-standing relationships and a reputation built on discretion and results.',
  ],
];
const FEAT = [
  'Floor-to-ceiling glass walls',
  'Chef’s kitchen',
  'Infinity pool',
  'Smart-home system',
  'Private cinema',
  'Wine cellar',
  'Landscaped gardens',
  'Three-car garage',
];
const AMEN = [
  'Outdoor kitchen',
  'Fire pit lounge',
  'Home office',
  'Gym & spa',
  'Guest suite',
  'EV charging',
  'Security system',
  'Climate control',
];

/* ============ HELPERS ============ */
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (m) => `$${m} Million`;
const I = {
  heart:
    '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.6-9 9-9 9z"/></svg>',
};
const img = (src, alt) =>
  `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.style.visibility='hidden'" onload="this.style.visibility=''">`;
let fav;
try {
  fav = new Set(JSON.parse(localStorage.getItem('hz') || '[]'));
} catch {
  fav = new Set();
}
const saveFav = () => {
  try {
    localStorage.setItem('hz', JSON.stringify([...fav]));
  } catch {}
};

const card = (p) => `
  <article class="pc rv">
    <a href="#/property/${p.id}" class="ph" style="--g:${p.g}" aria-label="${p.n}, ${p.loc}">${img(p.id + '.jpg', p.n)}<span class="tag">${p.t}</span></a>
    <button class="hr ${fav.has(p.id) ? 'on' : ''}" data-id="${p.id}" aria-pressed="${fav.has(p.id)}" aria-label="Save ${p.n}">${I.heart}</button>
    <div class="row"><h3><a href="#/property/${p.id}">${p.n}</a></h3><span class="pr">${money(p.pr)}</span></div>
    <p class="loc">${p.loc}</p>
  </article>`;

/* ============ PAGES ============ */
const home = () => `
<section class="hero3d" id="hero3d" aria-label="Introduction">
  <div class="stick">
    <video id="hv" muted playsinline preload="auto" tabindex="-1" aria-hidden="true"></video>
    <div class="shade"></div>
    <div class="hc" id="hc"><div class="wrap">
      <h1>Discover Exceptional<br>Homes &amp; Investments</h1>
      <p>Premium properties in prime locations. Find your dream home or the perfect investment with confidence.</p>
      <a class="btn" href="#/properties">Browse properties →</a></div></div>
    <div class="cue" aria-hidden="true"><span>Scroll</span><i></i></div>
    <div class="ld" id="ld" aria-hidden="true"><i></i></div>
  </div>
</section>

<section class="sec" id="about"><div class="wrap ab">
  <div class="rv"><span class="lab">About Us</span><h2>Who We Are</h2>
    <p>At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do.</p>
    <a class="btn" href="#/services">Learn More →</a></div>
  <div class="ims rv"><div class="ph" style="--g:linear-gradient(135deg,#27476e,#d79a62)">${img('about-1.jpg', 'Modern luxury home with pool')}</div>
    <div class="ph" style="--g:linear-gradient(160deg,#8ec5d6,#16243a)">${img('about-2.jpg', 'Architectural detail')}</div>
    <a class="rb" href="#/properties" aria-label="View properties">→</a></div></div></section>

<section class="sec soft" id="featured"><div class="wrap">
  <div class="hd rv"><div><span class="lab">Featured</span><h2>Featured Properties</h2></div>
    <div class="ctl"><button id="pv" aria-label="Previous properties">‹</button><button id="nx" aria-label="Next properties">›</button></div></div>
  <div class="rail" id="rail" tabindex="0" aria-label="Featured properties carousel">${P.map(card).join('')}</div></div></section>

<section class="sec" id="services"><div class="wrap"><span class="lab rv">Services</span><h2 class="rv">How we help you</h2>
  <div class="sv">${SERV.map((s) => `<div class="rv"><div style="display:block;border:0;padding:0"><h3>${s[0]}</h3><p>${s[1]}</p></div><i aria-hidden="true">→</i></div>`).join('')}</div></div></section>

<section class="sec soft" id="why"><div class="wrap"><span class="lab rv">Why Choose Horizon</span><h2 class="rv">Confidence at every step</h2>
  <div class="wy">${WHY.map((w) => `<div class="rv"><h3>${w[0]}</h3><p>${w[1]}</p></div>`).join('')}</div></div></section>

<section class="sec" id="team"><div class="wrap"><span class="lab rv">Our Team</span><h2 class="rv">The people behind Horizon</h2>
  <div class="tm">${TEAM.map(
    (
      m,
      i,
    ) => `<article class="rv"><div class="ph" style="--g:${m.g}"><span aria-hidden="true">${m.n[0]}</span>${img('team-' + (i + 1) + '.jpg', m.n)}</div>
    <h3>${m.n}</h3><p>${m.r}</p><div class="lk"><a href="#/contact">Email</a><a href="#">LinkedIn</a></div></article>`,
  ).join('')}</div></div></section>

<section class="cta" id="contact"><div class="wrap ci rv">
  <div class="key"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15 12v2"/></svg></div>
  <div><h2>Ready to Find Your Perfect Property?</h2><p>Let our experts guide you to the right home or investment.</p></div>
  <button class="btn" data-c="Get in touch">Get in Touch →</button></div></section>`;

let F = { q: '', t: '', p: 0, b: 0, ba: 0, s: '' };
const listing = () => `
<section class="pg"><div class="wrap"><span class="lab">Properties</span><h1 style="font-size:clamp(34px,5vw,60px);font-weight:800">Find your next home</h1>
  <form class="flt" id="flt" onsubmit="return false">
    <label>Location or name<input id="fq" placeholder="e.g. Austin" value=""></label>
    <label>Type<select id="ft"><option value="">All</option>${[...new Set(P.map((p) => p.t))].map((t) => `<option>${t}</option>`).join('')}</select></label>
    <label>Max price<select id="fp"><option value="0">Any</option><option value="3">$3M</option><option value="5">$5M</option><option value="7">$7M</option></select></label>
    <label>Bedrooms<select id="fb"><option value="0">Any</option><option value="4">4+</option><option value="5">5+</option><option value="6">6+</option></select></label>
    <label>Bathrooms<select id="fa"><option value="0">Any</option><option value="4">4+</option><option value="5">5+</option><option value="6">6+</option></select></label>
    <label>Sort by<select id="fs"><option value="">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></label>
  </form><p class="cnt" id="cnt" role="status"></p><div class="grid" id="res"></div></div></section>`;

function results() {
  const q = $('#fq').value.trim().toLowerCase(),
    t = $('#ft').value,
    mp = +$('#fp').value,
    mb = +$('#fb').value,
    ma = +$('#fa').value,
    s = $('#fs').value;
  let l = P.filter(
    (p) =>
      (!q || (p.loc + p.n).toLowerCase().includes(q)) &&
      (!t || p.t === t) &&
      (!mp || p.pr <= mp) &&
      p.b >= mb &&
      p.ba >= ma,
  );
  if (s) l = [...l].sort((a, b) => (s === 'lo' ? a.pr - b.pr : b.pr - a.pr));
  $('#cnt').textContent = l.length
    ? `${l.length} ${l.length === 1 ? 'property' : 'properties'}`
    : 'No properties match your search. Try widening your filters.';
  $('#res').innerHTML = l.map(card).join('');
  reveal();
}

let gal = [],
  gi = 0;
const detail = (id) => {
  const p = P.find((x) => x.id === id);
  if (!p)
    return `<section class="pg"><div class="wrap"><h1>Property not found</h1><p><a class="back" href="#/properties">← All properties</a></p></div></section>`;
  const i = P.indexOf(p),
    ag = TEAM[i % 4],
    sim = P.filter((x) => x !== p)
      .sort((a, b) => (b.t === p.t) - (a.t === p.t))
      .slice(0, 3);
  gal = [p.id + '.jpg', p.id + '-2.jpg', p.id + '-3.jpg'];
  gi = 0;
  document.title = `${p.n} | Horizon Properties`;
  return `<section class="pg"><div class="wrap"><a class="back" href="#/properties">← All properties</a>
  <div class="gal"><button class="m ph" id="gm" style="--g:${p.g}" aria-label="Open fullscreen image viewer">${img(gal[0], p.n)}</button>
    <div class="th">${gal.map((s, k) => `<button class="ph ${k ? '' : 'on'}" data-k="${k}" style="--g:${p.g}" aria-label="Show image ${k + 1}">${img(s, p.n + ' view ' + (k + 1))}</button>`).join('')}</div></div>
  <div class="dt"><div>
    <span class="lab">${p.t}</span><h1>${p.n}</h1><p class="loc">${p.loc}</p><p class="dp">${money(p.pr)}</p>
    <div class="spec"><div><b>${p.b}</b><span>Bedrooms</span></div><div><b>${p.ba}</b><span>Bathrooms</span></div><div><b>${p.sf.toLocaleString('en-US')}</b><span>Sq ft</span></div><div><b>${p.t}</b><span>Type</span></div></div>
    <p class="mu">${p.n} is a ${p.t.toLowerCase()} set in ${p.loc.split(',')[0]}, designed around light, privacy and effortless indoor-outdoor living. Generous proportions, refined materials and a setting that rewards every hour of the day.</p>
    <h3>Key features</h3><ul class="ul">${FEAT.slice(i % 3, (i % 3) + 6)
      .map((f) => `<li>${f}</li>`)
      .join('')}</ul>
    <h3>Amenities</h3><ul class="ul">${AMEN.slice(i % 2, (i % 2) + 6)
      .map((f) => `<li>${f}</li>`)
      .join('')}</ul></div>
    <aside class="ag"><div class="av"><i style="--g:${ag.g}">${ag.n[0]}</i><div><b>${ag.n}</b><br><span class="mu">${ag.r}</span></div></div>
      <button class="btn" data-c="Contact ${ag.n}">Contact agent</button>
      <button class="btn o" data-c="Schedule a viewing" data-d="1">Schedule a viewing</button>
      <button class="btn o hs ${fav.has(p.id) ? 'on' : ''}" data-s="${p.id}">${fav.has(p.id) ? '♥ Saved' : '♡ Save property'}</button></aside></div>
  <div class="sv2"><h2>Similar properties</h2><div class="grid" style="margin-top:40px">${sim.map(card).join('')}</div></div></div>
  <div class="stk"><button class="btn" data-c="Contact ${ag.n}">Contact</button><button class="btn o" data-c="Schedule a viewing" data-d="1">Schedule viewing</button></div></section>`;
};

/* ============ ROUTER ============ */
const app = $('#app'),
  hdr = $('#top');
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.1 },
);
const reveal = () => $$('.rv:not(.in)').forEach((el) => io.observe(el));

function route() {
  const [a, b] = (location.hash.replace(/^#\/?/, '') || '').split('/');
  document.title = 'Horizon Properties | Luxury Real Estate';
  const sec = ['about', 'services', 'team', 'contact', 'featured', 'why'].includes(a) ? a : '';
  const pg = a === 'properties' ? 'properties' : a === 'property' ? 'property' : 'home';
  heroCtl && heroCtl.destroy();
  heroCtl = null;
  app.innerHTML = pg === 'properties' ? listing() : pg === 'property' ? detail(b) : home();
  $$('#menu a').forEach((l) =>
    l.classList.toggle(
      'on',
      l.getAttribute('href') === (sec ? '#/' + sec : pg === 'home' ? '#/' : '#/properties'),
    ),
  );
  hdr.classList.remove('o');
  $('#bg').setAttribute('aria-expanded', 'false');
  if (pg === 'properties') {
    results();
    $('#flt').addEventListener('input', results);
  }
  if (pg === 'home') {
    rail();
    heroCtl = heroInit();
  }
  reveal();
  onScroll();
  sec ? $('#' + sec)?.scrollIntoView() : scrollTo(0, 0);
}
function onScroll() {
  const h = $('#hero3d'),
    lim = h ? Math.max(40, h.offsetHeight - innerHeight - 60) : 40;
  hdr.classList.toggle('s', scrollY > lim || !!$('.pg'));
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('hashchange', route);

/* ============ CAROUSEL ============ */
function rail() {
  const r = $('#rail');
  if (!r) return;
  let down = false,
    moved = false,
    x0 = 0,
    s0 = 0;
  const step = () => r.clientWidth * 0.7;
  $('#pv').onclick = () => r.scrollBy({ left: -step(), behavior: 'smooth' });
  $('#nx').onclick = () => r.scrollBy({ left: step(), behavior: 'smooth' });
  r.onkeydown = (e) => {
    if (e.key === 'ArrowRight') $('#nx').click();
    if (e.key === 'ArrowLeft') $('#pv').click();
  };
  r.onpointerdown = (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    moved = false;
    x0 = e.clientX;
    s0 = r.scrollLeft;
  };
  r.onpointermove = (e) => {
    if (!down) return;
    const d = e.clientX - x0;
    if (Math.abs(d) > 5) {
      moved = true;
      r.classList.add('drag');
    }
    if (moved) r.scrollLeft = s0 - d;
  };
  const up = () => {
    down = false;
    r.classList.remove('drag');
  };
  r.onpointerup = r.onpointerleave = up;
  r.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    },
    true,
  );
}

/* ============ SCROLL-DRIVEN HERO VIDEO ============
   Scroll position -> video.currentTime. The video is never played.
   Scroll handler only updates the target; a rAF loop eases toward it and seeks.
   ENCODING NOTES (important for smooth scrubbing):
   - every frame a keyframe:  ffmpeg -i in.mp4 -an -c:v libx264 -crf 25 -g 1 -pix_fmt yuv420p -movflags +faststart hero.mp4
   - keep resolution modest (<=1280px wide desktop, ~780px mobile), no audio track
   - hero.webm (VP9) is only a fallback for browsers without H.264 */
let heroCtl = null;
function heroInit() {
  const w = $('#hero3d');
  if (!w) return null;
  const v = $('#hv'),
    hc = $('#hc'),
    bar = $('#ld i'),
    cue = $('.cue');
  const still = () => w.classList.add('nov'); // static hero (fallback / reduced motion)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    still();
    return null;
  }
  const mob = matchMedia('(max-width: 760px)').matches;
  const h264 = v.canPlayType('video/mp4; codecs="avc1.42E01E"'),
    vp9 = v.canPlayType('video/webm; codecs="vp9"');
  const src =
    window.HERO_SRC || (h264 ? (mob ? 'hero-mobile.mp4' : 'hero.mp4') : vp9 ? 'hero.webm' : '');
  if (!src) {
    still();
    return null;
  }

  let top = 0,
    range = 1,
    target = 0,
    cur = 0,
    last = -1,
    want = 0,
    dur = 0,
    raf = 0,
    t0 = 0,
    shown = false;
  const clamp = (x) => Math.min(1, Math.max(0, x));
  const measure = () => {
    top = w.getBoundingClientRect().top + scrollY;
    range = Math.max(1, w.offsetHeight - $('.stick', w).offsetHeight); // uses the sticky box, not innerHeight (mobile bars change it)
  };
  const setTarget = () => {
    target = clamp((scrollY - top) / range);
    kick();
  };
  const kick = () => {
    if (!raf) {
      t0 = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };

  function paint(p) {
    if (dur) {
      want = Math.min(p * dur, dur - 0.001);
      // only seek when the change is at least half a frame, and never flood a busy decoder
      if (Math.abs(want - last) > 0.02 && (!v.seeking || Math.abs(want - last) > 0.2)) {
        v.currentTime = want;
        last = want;
      }
    }
    hc.style.opacity = clamp(1 - p / 0.2);
    hc.style.transform = `translate3d(0,${-p * 80}px,0)`;
    cue.style.opacity = clamp(1 - p / 0.04);
  }
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - t0) / 1000);
    t0 = now;
    cur += (target - cur) * (1 - Math.exp(-dt * 14)); // frame-rate independent easing
    if (Math.abs(target - cur) < 0.0003) cur = target;
    paint(cur);
    if (cur !== target) raf = requestAnimationFrame(tick);
  }
  const show = () => {
    if (shown) return;
    shown = true;
    w.classList.add('ready');
  };

  v.addEventListener('loadedmetadata', () => {
    dur = v.duration;
    measure();
    cur = target = clamp((scrollY - top) / range);
    last = -1;
    paint(cur);
  });
  v.addEventListener('loadeddata', () => setTimeout(show, 1500)); // first frame is there; give the buffer a moment
  v.addEventListener('canplaythrough', show);
  v.addEventListener('progress', () => {
    if (!dur || !v.buffered.length) return;
    const f = v.buffered.end(v.buffered.length - 1) / dur;
    bar.style.width = f * 100 + '%';
    if (f > 0.98) show();
  });
  v.addEventListener('seeked', () => {
    if (Math.abs(v.currentTime - want) > 0.03) {
      v.currentTime = want;
      last = want;
    }
  }); // always land on the exact frame
  v.addEventListener('error', still);
  setTimeout(show, 8000);

  const onResize = () => {
    measure();
    setTarget();
  };
  addEventListener('scroll', setTarget, { passive: true });
  addEventListener('resize', onResize);
  v.muted = true;
  v.preload = 'auto';
  v.src = src;
  v.load();
  // iOS only paints scrubbed frames after the element was "activated" once; a muted play->pause does that.
  if (/iP(hone|ad|od)/.test(navigator.userAgent))
    v.addEventListener(
      'loadeddata',
      () =>
        v
          .play()
          .then(() => {
            v.pause();
            last = -1;
            paint(cur);
          })
          .catch(() => {}),
      { once: true },
    );
  measure();
  setTarget();
  return {
    destroy() {
      removeEventListener('scroll', setTarget);
      removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      v.removeAttribute('src');
      v.load();
    },
  };
}
function CircularCarousel(el, options) {
  const o = Object.assign({
    items: [],
    cardWidth: 220,
    gap: 35,
    tilt: -5,
    speed: 14,
    direction: 1,
    autoRotate: true,
    pauseOnHover: true,
    draggable: true
  }, options);

  const n = o.items.length;
  const step = 360 / n;
  let radius = 0;
  const cards = [];

  const ring = document.createElement('div');
  ring.className = 'cc-ring';

  o.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'cc-card';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || '';
    img.draggable = false;
    card.appendChild(img);

    if (item.href) {
      const a = document.createElement('a');
      a.href = item.href;
      a.style.cssText = 'position:absolute;inset:0';
      card.appendChild(a);
    }
    ring.appendChild(card);
    cards.push(card);
  });
  el.appendChild(ring);

  let angle = 0, velocity = 0, dragging = false, hovering = false;
  let lastX = 0, last = performance.now();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    ring.style.transform =
      `translateZ(${-radius}px) rotateX(${o.tilt}deg) rotateY(${angle}deg)`;
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!dragging) {
      angle += velocity * dt;
      velocity *= Math.pow(0.04, dt);
      if (Math.abs(velocity) < 0.5) velocity = 0;
      const paused = o.pauseOnHover && hovering;
      if (o.autoRotate && !reduce && !paused && velocity === 0) {
        angle += o.speed * o.direction * dt;
      }
    }
    render();
    requestAnimationFrame(tick);
  }

  if (o.draggable) {
    el.addEventListener('pointerdown', e => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      el.classList.add('dragging');
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const d = dx * 0.35;
      angle += d;
      velocity = d / Math.max((performance.now() - last) / 1000, 0.016);
    });
    const end = () => {
      dragging = false;
      el.classList.remove('dragging');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  el.addEventListener('pointerenter', () => hovering = true);
  el.addEventListener('pointerleave', () => hovering = false);

  // responsive: card size follows the container width (smaller on phones)
  function layout() {
    const cw = Math.min(o.cardWidth, Math.max(120, Math.round(el.clientWidth * 0.42)));
    el.style.setProperty('--cc-card-w', cw + 'px');
    radius = (cw + o.gap) / (2 * Math.tan(Math.PI / n));
    cards.forEach((c, i) => (c.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`));
  }
  layout();
  addEventListener('resize', () => {
    layout();
    render();
  });

  render();
  requestAnimationFrame(tick);
}

// ===== استفاده =====
CircularCarousel(document.getElementById('carousel'), {
 
    items: [
        { src: 'A.png', alt: 't' },
        { src: 'B.png', alt: 'عکس ۲' },
        { src: 'C.png', alt: 'عکس ۴' },
        { src: 'E.png', alt: 'عکس ۳' },
        { src: 'F.png', alt: 'عکس ۵' },
        { src: 'D.png', alt: 'عکس ۶' }
    ],

  cardWidth: 220,
  gap: 35,
  tilt: -5,
  speed: 14
});
/* ============ GLOBAL ACTIONS ============ */
const setFav = (id) => {
  fav.has(id) ? fav.delete(id) : fav.add(id);
  saveFav();
  $$(`.hr[data-id="${id}"]`).forEach((b) => {
    b.classList.toggle('on', fav.has(id));
    b.setAttribute('aria-pressed', fav.has(id));
  });
};
document.addEventListener('click', (e) => {
  const h = e.target.closest('.hr');
  if (h) {
    e.preventDefault();
    return setFav(h.dataset.id);
  }
  const s = e.target.closest('[data-s]');
  if (s) {
    setFav(s.dataset.s);
    s.textContent = fav.has(s.dataset.s) ? '♥ Saved' : '♡ Save property';
    return;
  }
  const c = e.target.closest('[data-c]');
  if (c) return openC(c.dataset.c, !!c.dataset.d);
  const t = e.target.closest('.th button');
  if (t) {
    gi = +t.dataset.k;
    $$('.th button').forEach((b) => b.classList.toggle('on', b === t));
    $('#gm').innerHTML = img(gal[gi], 'Property image');
    return;
  }
  if (e.target.closest('#gm')) {
    showLb();
  }
});
function openC(title, date) {
  $('#cmb').innerHTML =
    `<h3 id="cmt">${title}</h3><p class="mu">We’ll get back to you within one business day.</p>
    <form class="f" id="cf"><input required placeholder="Your name" aria-label="Your name"><input required type="email" placeholder="Email address" aria-label="Email address">
    ${date ? '<input required type="date" aria-label="Preferred date">' : ''}<textarea rows="3" placeholder="Message" aria-label="Message"></textarea><button class="btn">Send request</button></form>`;
  $('#cf').onsubmit = (e) => {
    e.preventDefault();
    $('#cmb').innerHTML =
      '<h3>Thank you</h3><p class="mu">Your request was received. An advisor will be in touch shortly.</p>';
  };
  $('#cm').showModal();
}
const showLb = () => {
  $('#li').src = gal[gi];
  $('#lb').showModal();
};
const stepLb = (d) => {
  gi = (gi + d + gal.length) % gal.length;
  $('#li').src = gal[gi];
};
$('#lp').onclick = () => stepLb(-1);
$('#ln').onclick = () => stepLb(1);
$('#lb').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') stepLb(1);
  if (e.key === 'ArrowLeft') stepLb(-1);
});
$('#lb').addEventListener('click', (e) => {
  if (e.target.id === 'lb') e.target.close();
});
$('#cm').addEventListener('click', (e) => {
  if (e.target.id === 'cm') e.target.close();
});
$('#bg').onclick = () => {
  const o = hdr.classList.toggle('o');
  $('#bg').setAttribute('aria-expanded', String(o));
  $('#bg').setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
};

// Close the mobile navigation after choosing a destination.
$('#menu').addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    hdr.classList.remove('o');
    $('#bg').setAttribute('aria-expanded', 'false');
    $('#bg').setAttribute('aria-label', 'Open menu');
  }
});

// Keep the menu state sensible when switching between mobile and desktop widths.
addEventListener('resize', () => {
  if (innerWidth > 1000) {
    hdr.classList.remove('o');
    $('#bg').setAttribute('aria-expanded', 'false');
    $('#bg').setAttribute('aria-label', 'Open menu');
  }
}, { passive: true });
$('#news').onsubmit = (e) => {
  e.preventDefault();
  e.target.innerHTML = '<p>Thank you for subscribing.</p>';
};
route();
