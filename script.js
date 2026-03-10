/* ================================================
   EID MUBARAK – PREMIUM WEBSITE  |  script.js
   ================================================ */
'use strict';

// ===================== CUSTOM CURSOR =====================
(function () {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function animTrail() {
    tx += (mx - tx) * 0.14;
    ty += (my - ty) * 0.14;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  })();
})();

// ===================== STAR CANVAS (INTRO) =====================
(function () {
  const canvas = document.getElementById('starsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], W, H, t = 0;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.015;
    stars.forEach(s => {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed * 50 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,248,220,' + (alpha * s.a) + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===================== SPARKLE HELPERS =====================
function createSparkle(container) {
  const el    = document.createElement('div');
  el.className = 'sparkle';
  const angle  = Math.random() * Math.PI * 2;
  const d1 = 60  + Math.random() * 80;
  const d2 = 130 + Math.random() * 80;
  const d3 = 200 + Math.random() * 80;
  el.style.cssText = [
    'left:' + (38 + Math.random() * 24) + '%',
    'top:'  + (30 + Math.random() * 40) + '%',
    '--tx1:' + (Math.cos(angle)*d1).toFixed(1) + 'px',
    '--ty1:' + (Math.sin(angle)*d1).toFixed(1) + 'px',
    '--tx2:' + (Math.cos(angle)*d2).toFixed(1) + 'px',
    '--ty2:' + (Math.sin(angle)*d2).toFixed(1) + 'px',
    '--tx3:' + (Math.cos(angle)*d3).toFixed(1) + 'px',
    '--ty3:' + (Math.sin(angle)*d3).toFixed(1) + 'px',
    '--dur:'  + (1.2 + Math.random()*1.5).toFixed(2) + 's',
    '--delay:' + (Math.random()*0.6).toFixed(2) + 's',
    'width:'  + (2 + Math.random()*4).toFixed(1) + 'px',
    'height:' + (2 + Math.random()*4).toFixed(1) + 'px',
    'background:' + (Math.random() > 0.5 ? '#f5e27a' : '#ffe4a0'),
    'box-shadow:0 0 6px rgba(245,226,122,0.8)'
  ].join(';');
  container.appendChild(el);
  setTimeout(function(){ el.remove(); }, 3200);
}

function startSparkleLoop(container) {
  for (var i = 0; i < 6; i++) createSparkle(container);
  setTimeout(function(){ startSparkleLoop(container); }, 380);
}

// ===================== INTRO DOORS LOGIC =====================
document.addEventListener('DOMContentLoaded', function () {
  var openBtn       = document.getElementById('openBtn');
  var doorContainer = document.getElementById('doorsContainer');
  var introBehind   = document.getElementById('introBehind');
  var sparklesCont  = document.getElementById('sparklesContainer');
  var introSection  = document.getElementById('intro');
  var mainContent   = document.getElementById('mainContent');
  var introHint     = document.querySelector('.intro-hint');

  if (!openBtn) { return; }

  openBtn.addEventListener('click', function () {
    // 1 - swing doors open
    doorContainer.classList.add('open');
    openBtn.style.opacity        = '0';
    openBtn.style.pointerEvents  = 'none';
    openBtn.style.transform      = 'translateY(10px)';
    if (introHint) { introHint.style.opacity = '0'; }

    // 2 - reveal glowing title behind doors
    setTimeout(function () {
      introBehind.classList.add('visible');
      startSparkleLoop(sparklesCont);
    }, 950);

    // 3 - begin fading the intro overlay
    setTimeout(function () {
      introSection.style.transition = 'opacity 0.9s ease';
      introSection.style.opacity    = '0';
    }, 3000);

    // 4 - show main website
    setTimeout(function () {
      introSection.style.display = 'none';
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
      document.body.style.overflow = 'auto';
      initMainSite();
    }, 3900);
  });
});

// ===================== MAIN SITE INIT =====================
function initMainSite() {
  initNavbar();
  initGreetingCanvas();
  initMosqueStars();
  initScrollReveal();
  initGallery();
  initParallax();
  initFireworks();
}

// ===================== NAVBAR =====================
function initNavbar() {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===================== GREETING CANVAS =====================
function initGreetingCanvas() {
  var canvas = document.getElementById('greetingCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [], t = 0;
  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for (var i = 0; i < 60; i++) {
    particles.push({
      x: Math.random()*2400, y: Math.random()*1200,
      r: Math.random()*1.2+0.2, a: Math.random()*0.5,
      speed: Math.random()*0.005+0.002,
      phase: Math.random()*Math.PI*2
    });
  }
  function draw() {
    ctx.clearRect(0,0,W,H); t += 0.012;
    particles.forEach(function(p) {
      var alpha = 0.1 + 0.6*Math.abs(Math.sin(t*p.speed*60+p.phase));
      ctx.beginPath();
      ctx.arc(p.x%W, p.y%H, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,248,200,'+(alpha*p.a)+')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===================== MOSQUE STARS =====================
function initMosqueStars() {
  var layer = document.getElementById('starsLayer');
  if (!layer) return;
  for (var i = 0; i < 180; i++) {
    var s  = document.createElement('div');
    s.className = 'star-dot';
    var sz = Math.random()*2.5+0.5;
    s.style.cssText = [
      'left:' + (Math.random()*100).toFixed(2) + '%',
      'top:'  + (Math.random()*75).toFixed(2)  + '%',
      '--size:' + sz.toFixed(2) + 'px',
      '--dur:'  + (1.5+Math.random()*3).toFixed(2) + 's',
      '--delay:'+ (Math.random()*4).toFixed(2) + 's',
      'box-shadow:0 0 ' + (sz*2).toFixed(1) + 'px rgba(255,248,200,0.8)'
    ].join(';');
    layer.appendChild(s);
  }
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  var items = document.querySelectorAll('.reveal-item');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var delay = parseInt(el.dataset.delay || '0');
      setTimeout(function(){ el.classList.add('revealed'); }, delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(function(el){ obs.observe(el); });

  // Flower cluster
  var fc = document.getElementById('flowerCluster');
  if (fc) {
    var fo = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); fo.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    fo.observe(fc);
  }
}

// ===================== PARALLAX =====================
function initParallax() {
  var moon   = document.getElementById('moonContainer');
  var mosque = document.getElementById('mosqueSilhouette');
  var stars  = document.getElementById('starsLayer');
  window.addEventListener('scroll', function() {
    var section = document.getElementById('mosque');
    if (!section) return;
    var rect     = section.getBoundingClientRect();
    var progress = -rect.top / section.offsetHeight;
    if (progress < -0.6 || progress > 1.6) return;
    if (moon)   moon.style.transform   = 'translateY(' + (progress * -45) + 'px)';
    if (mosque) mosque.style.transform = 'translateY(' + (progress *  22) + 'px)';
    if (stars)  stars.style.transform  = 'translateY(' + (progress * -30) + 'px)';
  });
}

// ===================== GALLERY =====================
function initGallery() {
  var track    = document.getElementById('galleryTrack');
  var dotsWrap = document.getElementById('galleryDots');
  var prevBtn  = document.getElementById('prevBtn');
  var nextBtn  = document.getElementById('nextBtn');
  if (!track) return;

  var slides   = track.querySelectorAll('.gallery-slide');
  var total    = slides.length;
  var current  = 0;
  var isDrag   = false;
  var startX   = 0;

  slides.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function(){ goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll('.dot').forEach(function(d,i){
      d.classList.toggle('active', i === current);
    });
  }
  function goTo(idx) {
    current = ((idx % total) + total) % total;
    track.style.transform = 'translateX(-' + (current*100) + '%)';
    updateDots();
  }
  prevBtn.addEventListener('click', function(){ goTo(current-1); });
  nextBtn.addEventListener('click', function(){ goTo(current+1); });

  track.addEventListener('mousedown',  function(e){ isDrag=true; startX=e.clientX; });
  track.addEventListener('mouseleave', function(){  isDrag=false; });
  track.addEventListener('mouseup',    function(e){
    if (!isDrag) return; isDrag=false;
    var d = e.clientX - startX;
    if (d < -40) goTo(current+1);
    else if (d > 40) goTo(current-1);
  });
  track.addEventListener('touchstart', function(e){ isDrag=true; startX=e.touches[0].clientX; }, { passive:true });
  track.addEventListener('touchend',   function(e){
    if (!isDrag) return; isDrag=false;
    var d = e.changedTouches[0].clientX - startX;
    if (d < -40) goTo(current+1);
    else if (d > 40) goTo(current-1);
  });

  setInterval(function(){ goTo(current+1); }, 4500);
}

// ===================== FIREWORKS =====================
var fireworksStarted = false;

function initFireworks() {
  var section = document.getElementById('celebration');
  if (!section) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !fireworksStarted) {
        fireworksStarted = true;
        launchFireworks();
        spawnConfetti();
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(section);
}

function launchFireworks() {
  var canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;
  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var COLORS = ['#e8c87a','#fde8d0','#e8a0a0','#f2c4c4','#c4aee8','#ddd0f8','#a0d4c4','#f5c9a0'];

  function Particle(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    var angle = Math.random()*Math.PI*2;
    var speed = 1.5 + Math.random()*5;
    this.vx = Math.cos(angle)*speed;
    this.vy = Math.sin(angle)*speed;
    this.life  = 1;
    this.decay = 0.012 + Math.random()*0.015;
    this.r     = 1.5 + Math.random()*2.5;
  }
  Particle.prototype.update = function() {
    this.vy += 0.06;
    this.x  += this.vx; this.y += this.vy;
    this.vx *= 0.98;    this.vy *= 0.98;
    this.life -= this.decay;
  };
  Particle.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha   = Math.max(0, this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle   = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur  = 8;
    ctx.fill();
    ctx.restore();
  };

  function Rocket() {
    this.x  = W*0.2 + Math.random()*W*0.6;
    this.y  = H;
    this.ty = H*0.1 + Math.random()*H*0.4;
    this.vy = -(6 + Math.random()*6);
    this.color    = COLORS[Math.floor(Math.random()*COLORS.length)];
    this.exploded = false;
    this.trail    = [];
  }
  Rocket.prototype.update = function() {
    this.trail.push({x:this.x, y:this.y});
    if (this.trail.length > 12) this.trail.shift();
    this.y += this.vy; this.vy *= 0.995;
    if (this.y <= this.ty) this.exploded = true;
  };
  Rocket.prototype.draw = function() {
    var self = this;
    this.trail.forEach(function(pt, i) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,220,100,'+(i/self.trail.length*0.8)+')';
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
    ctx.fillStyle   = '#fff8dc';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur  = 10;
    ctx.fill();
    ctx.shadowBlur  = 0;
  };
  Rocket.prototype.explode = function() {
    var out = [];
    var n   = 100 + Math.floor(Math.random()*60);
    for (var i = 0; i < n; i++) out.push(new Particle(this.x, this.y, this.color));
    return out;
  };

  var rockets = [], particles = [], lastLaunch = 0;
  function loop(t) {
    ctx.fillStyle = 'rgba(4,4,15,0.22)';
    ctx.fillRect(0,0,W,H);

    if (t - lastLaunch > 600 + Math.random()*800) {
      rockets.push(new Rocket()); lastLaunch = t;
    }
    rockets = rockets.filter(function(r) {
      r.update();
      if (r.exploded) { particles = particles.concat(r.explode()); return false; }
      r.draw(); return true;
    });
    particles = particles.filter(function(p) {
      p.update();
      if (p.life <= 0) return false;
      p.draw(); return true;
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ===================== CONFETTI =====================
function spawnConfetti() {
  var cont   = document.getElementById('confettiContainer');
  if (!cont) return;
  var COLORS = ['#e8c87a','#fde8d0','#e8a0a0','#f2c4c4','#c4aee8','#ddd0f8','#a0d4c4','#f5c9a0'];
  for (var i = 0; i < 120; i++) {
    var el     = document.createElement('div');
    el.className = 'confetti-piece';
    var isRect = Math.random() > 0.5;
    el.style.cssText = [
      'left:' + (Math.random()*100).toFixed(1) + '%',
      'top:-20px',
      '--w:' + (isRect ? (4+Math.random()*8) : (6+Math.random()*6)).toFixed(1) + 'px',
      '--h:' + (isRect ? (8+Math.random()*14): (6+Math.random()*6)).toFixed(1) + 'px',
      '--r:' + (isRect ? '2px' : '50%'),
      '--color:' + COLORS[Math.floor(Math.random()*COLORS.length)],
      '--dur:'   + (2.5+Math.random()*2.5).toFixed(2) + 's',
      '--delay:' + (Math.random()*2).toFixed(2) + 's'
    ].join(';');
    cont.appendChild(el);
    setTimeout(function(){ el.remove(); }, 6000);
  }
  setTimeout(spawnConfetti, 4200);
}

// Prevent scroll while intro is shown
document.body.style.overflow = 'hidden';