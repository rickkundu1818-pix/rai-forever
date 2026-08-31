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

  document.addEventListener('DOMContentLoaded', () => {
    observeAll('.reveal');
  });
})();
