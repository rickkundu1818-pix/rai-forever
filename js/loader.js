/**
 * Loader — shows a brief cinematic loading screen, then reveals the site.
 * Never blocks longer than necessary; hides as soon as the page is ready
 * (or after a short minimum so it doesn't just flash).
 * 
 */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function hide() {
    const MIN_VISIBLE_MS = 1100;
    const start = performance.now();
    const elapsed = performance.now() - start;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(() => {
      loader.classList.add('is-hidden');
      loader.setAttribute('aria-hidden', 'true');
      setTimeout(() => loader.remove(), 900);
    }, wait);
  }

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
  }

})();
