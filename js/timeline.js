/**
 * Our Story — renders the timeline events as framed polaroid cards
 * strung along an SVG "thread" that draws itself as the user scrolls.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline');
    const events = window.SITE_CONFIG?.timeline || [];
    if (!container || !events.length) return;

    const tilts = [-3, 2.5, -2, 3, -2.5, 2];

    events.forEach((ev, i) => {
      const el = document.createElement('article');
      el.className = `timeline-event ${ev.chapterClass || ''}`.trim();
      el.style.setProperty('--tilt', `${tilts[i % tilts.length]}deg`);
      el.id = ev.id || `event-${i}`;

      const metaParts = [ev.date, ev.time, ev.place].filter(Boolean);
      const milestone = ev.milestoneTitle ? `
          <p class="timeline-milestone-title">${escapeHtml(ev.milestoneTitle)}</p>
          <p class="timeline-milestone-date">${escapeHtml(ev.milestoneDate || '')}</p>
        ` : '';
      const chapterRoutes = {
        'first-meeting': '/chapter-one',
        'first-i-love-you': '/chapter-two',
        engagement: '/chapter-three'
      };
      const chapterLabels = {
        'first-meeting': 'Chapter One: Our First Meeting',
        'first-i-love-you': 'Chapter Two: The Little Things That Became Us',
        engagement: 'Chapter Three: A Moment Worth Remembering'
      };
      const photoTag = chapterRoutes[ev.id] ? 'a' : 'div';
      const photoLink = chapterRoutes[ev.id]
        ? ` href="${chapterRoutes[ev.id]}" aria-label="Open ${chapterLabels[ev.id]}"`
        : '';
      const photo = `
          <${photoTag} class="timeline-photo ${ev.imageFit === 'contain' ? 'timeline-photo--screenshot' : ''} timeline-photo--heart${chapterRoutes[ev.id] ? ' timeline-photo-link' : ''}"${photoLink}>
            <img src="${ev.image}" alt="${escapeHtml(ev.title)}" loading="lazy" decoding="async">
            <span class="timeline-heart" aria-hidden="true">❤</span>
          </${photoTag}>`;

      el.innerHTML = `
        ${photo}
        <div class="timeline-copy">
          <p class="eyebrow">${escapeHtml(ev.eyebrow || `Moment ${i + 1}`)}</p>
          <h3 class="timeline-title">${escapeHtml(ev.title)}</h3>
          <p class="timeline-meta">${metaParts.map(escapeHtml).join(' &middot; ')}</p>
          ${milestone}
          <p class="timeline-desc">${escapeHtml(ev.description || '')}</p>
        </div>
      `;
      container.appendChild(el);
      window.RaiReveal?.observe(el);
    });

    // Animate the gold thread's stroke-dashoffset as the timeline scrolls into view
    const path = document.getElementById('timeline-thread-path');
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    function updateThread() {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = clamp(vh - rect.top, 0, total);
      const progress = clamp(scrolled / total, 0, 1);
      path.style.strokeDashoffset = String(length * (1 - progress));
    }

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    let ticking = false;
    let isVisible = false;
    window.addEventListener('scroll', () => {
      if (isVisible && !ticking) {
        requestAnimationFrame(() => { updateThread(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateThread, 150);
    }, { passive: true });
    const timelineObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) updateThread();
    }, { rootMargin: '15% 0px 15% 0px' });
    timelineObserver.observe(container);
    updateThread();
  });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
})();
