/**
 * Scroll reveal — adds .is-visible to any [data-reveal] / .reveal element,
 * and to dynamically-injected .timeline-event / .gallery-item cards,
 * the first time it enters the viewport.
 */
(function () {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );

  function observeAll(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  }

  // Expose so other modules can register elements they create dynamically
  window.RaiReveal = { 
    observe: (el) => {
      observer.observe(el);
    },
    observeAll
  };

  function registerStorybookSections() {
    document.querySelectorAll('main > section:not(.hero)').forEach((section) => {
      if (!section.classList.contains('reveal')) {
        section.classList.add('reveal');
        section.dataset.reveal = 'up';
      }
    });
    document.querySelectorAll('.story-header, .memory-game-shell, .constellation-launcher, .soundtrack-launcher, .mirror-launcher, .special-inner').forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.dataset.reveal = 'up';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    registerStorybookSections();
    observeAll('.reveal');

    const progressBar = document.getElementById('scroll-progress-fill');
    if (progressBar) {
      const updateScrollProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progressBar.style.setProperty('--progress', `${Math.min(Math.max(progress, 0), 100)}%`);
      };
      updateScrollProgress();
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
    }
  });
})();
