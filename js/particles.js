/**
 * Hero particles — a small number of soft, slow-drifting motes of light.
 * Respects prefers-reduced-motion by simply not animating.
 */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles = [];
  let width, height, dpr;
  let rafId = null;
  let lastFrame = 0;
  let heroVisible = true;
  const frameInterval = 1000 / 30;

  function resize() {
    const hero = canvas.closest('.hero');
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles(count) {
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.8,
      speedY: 0.06 + Math.random() * 0.16,
      drift: (Math.random() - 0.5) * 0.06,
      alpha: 0.15 + Math.random() * 0.35,
      twinkleSpeed: 0.002 + Math.random() * 0.004,
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    if (t - lastFrame < frameInterval) {
      if (!reduceMotion && heroVisible && !document.hidden) {
        rafId = requestAnimationFrame(draw);
      }
      return;
    }
    lastFrame = t;
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.y -= p.speedY;
      p.x += p.drift;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const twinkle = 0.6 + 0.4 * Math.sin(t * p.twinkleSpeed + p.twinklePhase);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228, 203, 154, ${p.alpha * twinkle})`;
      ctx.fill();
    }
    if (!reduceMotion && heroVisible && !document.hidden) {
      rafId = requestAnimationFrame(draw);
    }
  }

  function init() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    resize();
    const count = width < 640 ? 16 : 36;
    makeParticles(count);
    if (!reduceMotion && heroVisible && !document.hidden) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw(frameInterval);
    }
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        init();
    }, 200);
  });

  // Pause when hero is off-screen to save battery
  const hero = canvas.closest('.hero');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      heroVisible = entry.isIntersecting;
      if (heroVisible && !rafId && !reduceMotion && !document.hidden) {
        rafId = requestAnimationFrame(draw);
      } else if (!heroVisible && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  }, { threshold: 0.05 });
  if (hero) io.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && heroVisible && !reduceMotion && !rafId) {
      rafId = requestAnimationFrame(draw);
    }
  });

  init();
})();
