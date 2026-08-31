/* A Film About Us - a short, user-triggered memory screening. */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('film-play');
    const overlay = document.getElementById('film-overlay');
    const sceneElement = document.getElementById('film-scene');
    const toggleButton = document.getElementById('film-toggle');
    const skipButton = document.getElementById('film-skip');
    const closeButton = document.getElementById('film-close');
    const sourceScenes = Array.isArray(window.SITE_CONFIG?.filmScenes) && window.SITE_CONFIG.filmScenes.length ? window.SITE_CONFIG.filmScenes : [];
    if (!playButton || !overlay || !sceneElement || !sourceScenes.length) return;

    const scenes = sourceScenes.map((event, index) => ({
      number: event.number ?? String(index + 1).padStart(2, '0'),
      label: `SCENE ${String(event.number ?? index + 1).padStart(2, '0')}`,
      title: event.title || 'A Memory of Us',
      image: event.image,
      copy: event.caption || event.message || ''
    }));
    let currentScene = 0;
    let timer;
    let paused = false;

    function renderScene() {
      clearTimeout(timer);
      sceneElement.innerHTML = '';
      if (currentScene >= scenes.length) {
        sceneElement.innerHTML = '<div class="film-ending"><h2>The Story Is Still Being Written...</h2><p>— Rai Forever ❤</p><p class="film-continued">To Be Continued</p></div>';
        toggleButton.hidden = true;
        skipButton.hidden = true;
        return;
      }
      const scene = scenes[currentScene];
      const card = document.createElement('article');
      card.className = 'film-scene-card';
      card.setAttribute('aria-label', `${scene.label}: ${scene.title}`);
      card.innerHTML = `
        <div class="film-frame" style="--film-frame-number: '${String(currentScene + 1).padStart(3, '0')}'">
          <img src="${escapeAttribute(scene.image)}" alt="${escapeAttribute(scene.title)}" loading="lazy" decoding="async">
        </div>
        <div class="film-copy">
          <p class="film-scene-label">${escapeHtml(scene.label)}</p>
          <h2 id="film-scene-title">${escapeHtml(scene.title)}</h2>
          <p class="film-scene-copy">${formatMultilineText(scene.copy)}</p>
        </div>`;
      sceneElement.appendChild(card);
      toggleButton.hidden = false;
      skipButton.hidden = false;
      if (!paused) timer = setTimeout(nextScene, 5200);
    }

    function nextScene() {
      currentScene += 1;
      paused = false;
      toggleButton.textContent = 'Pause';
      renderScene();
    }

    function closeFilm() {
      clearTimeout(timer);
      overlay.hidden = true;
      document.body.classList.remove('film-open');
      playButton.focus();
    }

    playButton.addEventListener('click', () => {
      currentScene = 0;
      paused = false;
      overlay.hidden = false;
      document.body.classList.add('film-open');
      renderScene();
      closeButton.focus();
    });
    toggleButton.addEventListener('click', () => {
      paused = !paused;
      toggleButton.textContent = paused ? 'Play' : 'Pause';
      if (paused) clearTimeout(timer);
      else timer = setTimeout(nextScene, 5200);
    });
    skipButton.addEventListener('click', nextScene);
    closeButton.addEventListener('click', closeFilm);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !overlay.hidden) closeFilm();
    });
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function formatMultilineText(value) {
    return escapeHtml(String(value ?? '')).replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');
  }
})();
