/**
 * Memories — renders the masonry gallery from SITE_CONFIG.gallery
 * and powers the fullscreen lightbox (close only).
 */
(function () {
  let items = [];
  let currentIndex = 0;

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxMessage = document.getElementById('lightbox-message');
  let lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.classList.add('is-closing');
    window.setTimeout(() => {
      lightbox.hidden = true;
      lightbox.classList.remove('is-closing');
      document.body.style.overflow = '';
      lastFocused?.focus();
    }, 260);
  }

  function renderLightbox() {
    const item = items[currentIndex];
    if (!item) return;
    lightboxImage.src = item.image;
    lightboxImage.alt = item.caption || 'A memory of us';
    const bits = [item.caption, item.date].filter(Boolean);
    lightboxCaption.textContent = bits.join(' — ');
    lightboxMessage.textContent = item.message || '';
    lightboxMessage.hidden = !item.message;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    items = window.SITE_CONFIG?.gallery || [];
    window.RaiGallery = { open: openLightbox };
    if (!gallery || !items.length) return;

    items.forEach((item, i) => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', item.caption ? `View photo: ${item.caption}` : 'View photo');

      const overlayText = [item.caption, item.date].filter(Boolean).join(' — ');
      fig.innerHTML = `
        <img src="${item.image}" alt="${item.caption || 'A memory of us'}" loading="lazy" decoding="async">
        ${overlayText ? `<figcaption class="gallery-overlay">${overlayText}</figcaption>` : ''}
      `;

      fig.addEventListener('click', () => openLightbox(i));
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });

      gallery.appendChild(fig);
      window.RaiReveal?.observe(fig);
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  });
})();
