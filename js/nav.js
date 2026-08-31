/**
 * Navigation — translucent-on-scroll header, animated mobile menu,
 * and closing the mobile menu after a link is chosen.
 */
(function () {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-links-mobile');

  let scrollFrame = null;
  let navIsScrolled = false;

  function updateScrollState() {
    scrollFrame = null;
    const shouldBeScrolled = window.scrollY > 40;
    if (shouldBeScrolled === navIsScrolled) return;
    navIsScrolled = shouldBeScrolled;
    if (navIsScrolled) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  function onScroll() {
    if (scrollFrame === null) {
      scrollFrame = requestAnimationFrame(updateScrollState);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollState();

  function closeMobileMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
  }

  function toggleMobileMenu() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    mobileMenu.classList.toggle('is-open', !isOpen);
  }

  if (toggle) toggle.addEventListener('click', toggleMobileMenu);

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
})();
