/**
 * Main — final touches: applies remaining SITE_CONFIG values to the DOM
 * so editing js/config.js is genuinely enough to personalize the site.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    // Hero background + CTA
    const heroBg = document.getElementById('hero-bg');
    const heroPhoto = document.getElementById('hero-photo');
    if (heroBg && cfg.hero?.backgroundImage) {
      heroBg.style.backgroundImage =
        `linear-gradient(180deg, rgba(27,20,23,0.35) 0%, rgba(27,20,23,0.55) 55%, rgba(27,20,23,0.92) 100%),` +
        `linear-gradient(120deg, rgba(92,26,43,0.35), rgba(27,20,23,0.55)),` +
        `url('${cfg.hero.backgroundImage}')`;
    }
    if (heroPhoto && cfg.hero?.backgroundImage) {
      heroPhoto.src = cfg.hero.backgroundImage;
    }
    const heroCta = document.querySelector('.hero-cta span');
    if (heroCta && cfg.hero?.cta) heroCta.textContent = cfg.hero.cta;

    // Document title / meta description
    if (cfg.site?.metaTitle) document.title = cfg.site.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && cfg.site?.metaDescription) metaDesc.setAttribute('content', cfg.site.metaDescription);

    // Footer
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline && cfg.site?.tagline) footerTagline.textContent = `“${cfg.site.tagline}”`;

    console.info('%cRAI FOREVER', 'font-size:14px;color:#C9A15A;', '— built with all our moments in mind.');
  });
})();
