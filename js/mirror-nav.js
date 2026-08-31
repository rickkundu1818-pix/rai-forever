/* Preserve the exact Story position when opening and leaving The Mirror of Us. */
(function () {
  const storageKey = 'rai-mirror-return';

  document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.getElementById('mirror-launcher');
    launcher?.addEventListener('click', () => {
      sessionStorage.setItem(storageKey, JSON.stringify({
        path: window.location.pathname,
        hash: '#mirror-of-us',
        scroll: window.scrollY
      }));
    });

    const backLink = document.querySelector('.mirror-back');
    if (!backLink || !document.body.classList.contains('mirror-page')) return;

    backLink.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.button !== 0) return;
      const saved = sessionStorage.getItem(storageKey);
      if (!saved) return;
      event.preventDefault();
      const destination = JSON.parse(saved);
      sessionStorage.setItem(`${storageKey}-restore`, String(destination.scroll));
      sessionStorage.removeItem(storageKey);
      window.location.href = `${destination.path}${destination.hash}`;
    });
  });

  if (!document.body.classList.contains('mirror-page')) {
    const restoreScroll = sessionStorage.getItem(`${storageKey}-restore`);
    if (restoreScroll !== null) {
      sessionStorage.removeItem(`${storageKey}-restore`);
      window.addEventListener('load', () => {
        requestAnimationFrame(() => window.scrollTo(0, Number(restoreScroll)));
      }, { once: true });
    }
  }
})();
