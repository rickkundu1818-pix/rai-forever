/**
 * About Her — populates the editorial section from SITE_CONFIG.about
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const cfg = window.SITE_CONFIG?.about;
    if (!cfg) return;

    const nameEl = document.getElementById('about-name');
    const coEl = document.getElementById('about-co');
    const dobEl = document.getElementById('about-dob');
    const paraEl = document.getElementById('about-paragraph');
    const quoteEl = document.getElementById('about-quote');
    const portraitEl = document.getElementById('about-portrait');
    const portraitTrigger = document.getElementById('about-image-trigger');
    const modal = document.getElementById('about-modal');
    const modalPortrait = document.getElementById('about-modal-portrait');
    const closeButton = document.getElementById('about-modal-close');
    let lastFocusedElement;
    let closeTimer;

    if (nameEl) nameEl.textContent = cfg.name;
    if (coEl) coEl.textContent = cfg.co;
    if (dobEl) dobEl.textContent = cfg.dob;
    if (paraEl) paraEl.textContent = cfg.paragraph;
    if (quoteEl) quoteEl.textContent = `“${cfg.quote}”`;
    if (portraitEl && cfg.portrait) {
      portraitEl.src = cfg.portrait;
    }

    if (!portraitTrigger || !modal || !modalPortrait || !closeButton) return;

    modalPortrait.src = cfg.portrait;

    const closeModal = () => {
      if (modal.hidden) return;
      modal.classList.remove('is-open');
      document.body.classList.remove('about-modal-open');
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        modal.hidden = true;
      }, 650);
      lastFocusedElement?.focus();
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      clearTimeout(closeTimer);
      modal.hidden = false;
      modalPortrait.src = portraitEl.src;
      document.body.classList.add('about-modal-open');
      window.requestAnimationFrame(() => modal.classList.add('is-open'));
      closeButton.focus();
    };

    portraitTrigger.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target.matches('[data-about-close]')) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  });
})();
