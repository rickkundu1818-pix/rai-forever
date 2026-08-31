/* The Mirror of Us interactions. Content stays editable in SITE_CONFIG.mirrorContent. */
(function () {
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));

  document.addEventListener('DOMContentLoaded', () => {
    const config = window.SITE_CONFIG?.mirrorContent;
    const slider = document.getElementById('mirror-slider');
    const surface = document.getElementById('mirror-surface');
    const reveal = document.getElementById('mirror-reveal');
    const cards = document.getElementById('mirror-cards');
    if (!config || !slider || !surface || !reveal || !cards) return;

    document.getElementById('mirror-you-image').src = config.youImage;
    document.getElementById('mirror-her-image').src = config.herImage;
    document.getElementById('mirror-letter-text').textContent = config.hiddenLetter;

    const cardContent = [
      { title: 'Your Side', label: 'From my perspective', text: config.yourSide },
      { title: 'Her Side', label: 'What she means to me', text: config.herSide },
      { title: 'Our Side', label: 'Shared memories', memories: config.ourSide }
    ];

    cards.innerHTML = cardContent.map((card, index) => `
      <article class="mirror-card">
        <button type="button" class="mirror-card-button" aria-expanded="false" aria-controls="mirror-card-${index}">
          <span class="mirror-card-number">0${index + 1}</span>
          <span class="mirror-card-title">${escapeHtml(card.title)}</span>
          <span class="mirror-card-label">${escapeHtml(card.label)}</span>
          <span class="mirror-card-mark" aria-hidden="true">+</span>
        </button>
        <div class="mirror-card-content" id="mirror-card-${index}" hidden>
          ${card.memories ? `<div class="mirror-memory-strip">${card.memories.map((memory) => `<figure><img src="${escapeHtml(memory.image)}" alt=""><figcaption>${escapeHtml(memory.text)}</figcaption></figure>`).join('')}</div>` : `<p>${escapeHtml(card.text)}</p>`}
        </div>
      </article>`).join('');

    function updateBlend() {
      const position = Number(slider.value);
      surface.style.setProperty('--mirror-split', `${position}%`);
      const isCenter = position >= 47 && position <= 53;
      reveal.classList.toggle('is-visible', isCenter);
      reveal.setAttribute('aria-hidden', String(!isCenter));
    }

    slider.addEventListener('input', updateBlend);
    updateBlend();

    cards.addEventListener('click', (event) => {
      const button = event.target.closest('.mirror-card-button');
      if (!button) return;
      const content = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      content.hidden = isOpen;
      button.querySelector('.mirror-card-mark').textContent = isOpen ? '+' : '−';
    });

    const behindButton = document.getElementById('mirror-behind-button');
    const letter = document.getElementById('mirror-letter');
    behindButton.addEventListener('click', () => {
      const isOpen = behindButton.getAttribute('aria-expanded') === 'true';
      behindButton.setAttribute('aria-expanded', String(!isOpen));
      letter.hidden = isOpen;
      document.body.classList.toggle('mirror-open', !isOpen);
    });
  });
})();
