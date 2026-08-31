/**
 * Special / Letter — reveals a sealed love letter with an elegant
 * open animation followed by a typewriter reveal of the message.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('letter-button');
    const label = document.getElementById('letter-button-label');
    const reveal = document.getElementById('letter-reveal');
    const textEl = document.getElementById('letter-text');
    const cfg = window.SITE_CONFIG?.letter;
    if (!button || !cfg) return;

    label.textContent = cfg.buttonLabel || 'Open Something Special';

    let opened = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    button.addEventListener('click', () => {
      if (opened) {
        // Toggle closed
        opened = false;
        reveal.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        return;
      }
      opened = true;
      button.setAttribute('aria-expanded', 'true');
      reveal.hidden = false;
      reveal.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      typewrite(textEl, cfg.body, reduceMotion);
    }, { once: false });
  });

  let typing = false;
  function typewrite(el, fullText, reduceMotion) {
    if (typing) return;
    typing = true;

    if (reduceMotion) {
      el.textContent = fullText;
      typing = false;
      return;
    }

    el.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'caret';

    let i = 0;
    const speed = 18; // ms per character

    function step() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        el.appendChild(caret);
        i++;
        setTimeout(step, speed);
      } else {
        caret.remove();
        typing = false;
      }
    }
    step();
  }
})();
