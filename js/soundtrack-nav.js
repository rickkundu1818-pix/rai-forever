/* Preserve the Story section when opening and leaving the Soundtrack page. */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.getElementById('soundtrack-launcher');
    if (launcher) {
      launcher.addEventListener('click', () => {
        sessionStorage.setItem('rai-soundtrack-return', String(window.scrollY));
      });
    }
    if (document.body.classList.contains('soundtrack-page')) {
      const savedScroll = sessionStorage.getItem('rai-soundtrack-return');
      if (savedScroll !== null) {
        sessionStorage.removeItem('rai-soundtrack-return');
        requestAnimationFrame(() => window.scrollTo(0, Number(savedScroll)));
      }
    }
  });
})();
