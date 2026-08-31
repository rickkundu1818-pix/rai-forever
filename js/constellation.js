(function () {
  const memoryData = window.CONSTELLATION_DATA || [];
  const totalMemories = memoryData.length;
  const field = document.getElementById('constellation-field');
  const svg = document.getElementById('constellation-lines');
  const progressFill = document.getElementById('constellation-progress-fill');
  const progressValue = document.getElementById('constellation-progress-value');
  const card = document.getElementById('constellation-card');
  const cardImage = document.getElementById('constellation-card-image');
  const cardDate = document.getElementById('constellation-card-date');
  const cardTitle = document.getElementById('constellation-card-title');
  const cardDescription = document.getElementById('constellation-card-description');
  const finalReveal = document.getElementById('constellation-final');
  const saveButton = document.getElementById('constellation-save');
  const saveMessage = document.getElementById('constellation-save-message');
  const backLink = document.getElementById('constellation-back');

  if (!field || !svg || !memoryData.length) return;

  const discovered = [];
  const starMap = new Map();

  function getStarCoordinates(star) {
    const x = Number(star.dataset.x);
    const y = Number(star.dataset.y);
    return { x, y };
  }

  function setBackTarget() {
    const currentRef = document.referrer;
    let fallback = '/story';

    if (currentRef) {
      try {
        const referenceUrl = new URL(currentRef, window.location.origin);
        if (referenceUrl.origin === window.location.origin && (referenceUrl.pathname === '/story' || referenceUrl.pathname.startsWith('/chapter-') || referenceUrl.pathname === '/' || referenceUrl.pathname === '/index.html')) {
          fallback = referenceUrl.pathname + referenceUrl.search + referenceUrl.hash;
        }
      } catch (error) {
        // Ignore malformed referrer values and fall back to /story.
      }
    }

    const storedTarget = sessionStorage.getItem('rai-constellation-return');
    const target = storedTarget || fallback;
    if (backLink) {
      backLink.setAttribute('href', target);
      backLink.dataset.returnTarget = target;
    }
    sessionStorage.setItem('rai-constellation-return', target);
  }

  function createDecorativeStars() {
    const decorativeCount = 28;

    for (let index = 0; index < decorativeCount; index += 1) {
      const star = document.createElement('span');
      star.className = 'constellation-deco-star';
      star.style.left = `${(Math.random() * 80 + 8).toFixed(2)}%`;
      star.style.top = `${(Math.random() * 72 + 8).toFixed(2)}%`;
      star.style.setProperty('--star-size', `${(Math.random() * 2.2 + 1.2).toFixed(2)}px`);
      star.style.setProperty('--star-delay', `${(Math.random() * 3.2).toFixed(2)}s`);
      star.style.opacity = String(0.28 + Math.random() * 0.55);
      field.appendChild(star);
    }
  }

  function positionCard(memory) {
    const left = Math.min(Math.max(memory.position.x + 4, 15), 70);
    const top = Math.min(Math.max(memory.position.y - 22, 16), 72);
    card.style.left = `${left}%`;
    card.style.top = `${top}%`;
  }

  function updateProgress() {
    const count = discovered.length;
    const ratio = totalMemories ? count / totalMemories : 0;
    progressValue.textContent = `${count} / ${totalMemories}`;
    progressFill.style.width = `${Math.max(ratio * 100, count ? 12 : 0)}%`;
  }

  function showCard(memory) {
    cardImage.src = memory.image;
    cardImage.alt = memory.title;
    cardDate.textContent = memory.date;
    cardTitle.textContent = memory.title;
    cardDescription.textContent = memory.description;
    positionCard(memory);
    card.hidden = false;
    card.classList.remove('is-visible');
    requestAnimationFrame(() => card.classList.add('is-visible'));
  }

  function setLineAttributes(line, from, to) {
    line.setAttribute('x1', String(from.x));
    line.setAttribute('y1', String(from.y));
    line.setAttribute('x2', String(to.x));
    line.setAttribute('y2', String(to.y));
    line.setAttribute('stroke', '#E8D5A2');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0');
    line.style.transition = 'opacity 420ms ease, stroke-width 420ms ease';
  }

  function createLine(from, to, addClass = '') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    setLineAttributes(line, from, to);
    if (addClass) line.classList.add(addClass);
    svg.appendChild(line);
    requestAnimationFrame(() => {
      line.setAttribute('opacity', '1');
      line.setAttribute('stroke-width', '0.7');
    });
    return line;
  }

  function addHeartPath() {
    const heartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    heartPath.setAttribute('d', 'M 50 82 C 30 70, 18 57, 18 42 C 18 30, 27 20, 37 20 C 43 20, 48 23, 50 29 C 52 23, 57 20, 63 20 C 73 20, 82 30, 82 42 C 82 57, 70 70, 50 82 Z');
    heartPath.setAttribute('fill', 'none');
    heartPath.setAttribute('stroke', 'rgba(232, 213, 162, 0.7)');
    heartPath.setAttribute('stroke-width', '0.8');
    heartPath.setAttribute('stroke-linecap', 'round');
    heartPath.setAttribute('stroke-linejoin', 'round');
    heartPath.setAttribute('opacity', '0');
    heartPath.classList.add('constellation-heart-path');
    svg.insertBefore(heartPath, svg.firstChild);
    requestAnimationFrame(() => heartPath.setAttribute('opacity', '1'));
  }

  function revealFinalConstellation() {
    if (finalReveal.hidden === false) return;

    memoryData.forEach((memory) => {
      const star = starMap.get(memory.id);
      if (star) star.classList.add('is-complete');
    });

    for (let index = 1; index < memoryData.length; index += 1) {
      const previous = starMap.get(memoryData[index - 1].id);
      const current = starMap.get(memoryData[index].id);
      if (previous && current) {
        createLine(getStarCoordinates(previous), getStarCoordinates(current), 'constellation-link-final');
      }
    }

    addHeartPath();
    finalReveal.hidden = false;
    finalReveal.classList.add('is-visible');

    const textLines = [...finalReveal.querySelectorAll('.constellation-final-line')];
    textLines.forEach((line, index) => {
      setTimeout(() => line.classList.add('is-visible'), index * 350 + 200);
    });
  }

  function onStarClick(event) {
    const button = event.currentTarget;
    const memoryId = Number(button.dataset.id);
    const memory = memoryData.find((item) => item.id === memoryId);
    if (!memory || discovered.includes(memoryId)) return;

    discovered.push(memoryId);
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
    showCard(memory);
    updateProgress();

    if (discovered.length > 1) {
      const previousId = discovered[discovered.length - 2];
      const previousStar = starMap.get(previousId);
      const currentStar = starMap.get(memoryId);
      if (previousStar && currentStar) {
        createLine(getStarCoordinates(previousStar), getStarCoordinates(currentStar), 'constellation-link');
      }
    }

    if (discovered.length === totalMemories) {
      setTimeout(revealFinalConstellation, 600);
    }
  }

  function renderStars() {
    memoryData.forEach((memory) => {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'constellation-memory-star';
      const left = memory.position.x;
      const top = memory.position.y;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.dataset.id = String(memory.id);
      star.dataset.x = String(left);
      star.dataset.y = String(top);
      star.setAttribute('aria-label', `${memory.title} — ${memory.date}`);
      star.setAttribute('aria-pressed', 'false');
      star.innerHTML = '<span class="constellation-star-core"></span>';
      star.addEventListener('click', onStarClick);
      field.appendChild(star);
      starMap.set(memory.id, star);
    });
  }

  function bindSaveButton() {
    if (!saveButton) return;
    saveButton.addEventListener('click', () => {
      saveMessage.hidden = false;
      saveMessage.classList.add('is-visible');
      saveButton.textContent = 'Saved to memory ❤️';
      saveButton.disabled = true;
    });
  }

  function boot() {
    setBackTarget();
    createDecorativeStars();
    renderStars();
    updateProgress();
    bindSaveButton();

    const firstStar = starMap.get(memoryData[0]?.id);
    if (firstStar) {
      firstStar.classList.add('is-pulse');
    }
  }

  boot();
})();
