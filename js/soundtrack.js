/* The Soundtrack of Us - a visual album for existing memories. */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('soundtrack-list');
    const view = document.getElementById('soundtrack-view');
    const tracks = window.SOUNDTRACK_TRACKS || [];
    if (!list || !view || !tracks.length) return;

    const title = document.getElementById('soundtrack-track-title');
    const number = document.getElementById('soundtrack-track-number');
    const subtitle = document.getElementById('soundtrack-track-subtitle');
    const date = document.getElementById('soundtrack-track-date');
    const image = document.getElementById('soundtrack-track-image');
    const memory = document.getElementById('soundtrack-track-memory');
    const lyrics = document.getElementById('soundtrack-lyrics');
    const lyricsButton = document.getElementById('soundtrack-lyrics-button');
    const audio = document.getElementById('soundtrack-audio');
    const player = document.getElementById('soundtrack-player');
    const playerImage = document.getElementById('soundtrack-player-image');
    const playerTitle = document.getElementById('soundtrack-player-title');
    const playerSubtitle = document.getElementById('soundtrack-player-subtitle');
    const audioToggle = document.getElementById('soundtrack-audio-toggle');
    const previousButton = document.getElementById('soundtrack-previous');
    const nextButton = document.getElementById('soundtrack-next');
    const progress = document.getElementById('soundtrack-progress');
    const currentTime = document.getElementById('soundtrack-current-time');
    const duration = document.getElementById('soundtrack-duration');
    const status = document.getElementById('soundtrack-audio-status');
    const volume = document.getElementById('soundtrack-volume');
    let activeTrack = 0;
    audio.volume = Number(volume.value);

    tracks.forEach((track, index) => {
      const button = document.createElement('button');
      button.className = 'soundtrack-track';
      button.type = 'button';
      button.dataset.track = String(index);
      button.innerHTML = `<span class="soundtrack-track-number">${escapeHtml(track.number)}</span><span><strong>${escapeHtml(track.title)}</strong><small>${escapeHtml(track.subtitle)}</small></span><span class="soundtrack-track-mark" aria-hidden="true">♡</span>`;
      list.appendChild(button);
    });

    function selectTrack(index) {
      activeTrack = index;
      const track = tracks[index];
      list.querySelectorAll('.soundtrack-track').forEach((button, buttonIndex) => {
        button.classList.toggle('is-active', buttonIndex === index);
        button.setAttribute('aria-pressed', buttonIndex === index ? 'true' : 'false');
      });
      number.textContent = track.number;
      title.textContent = track.title;
      subtitle.textContent = track.subtitle;
      date.textContent = track.date;
      memory.textContent = track.memory;
      image.src = track.image;
      image.alt = track.title;
      lyrics.textContent = track.lyrics;
      lyrics.hidden = true;
      lyricsButton.textContent = '♡ Read the Lyrics';
      view.classList.toggle('is-final-track', Boolean(track.final));
      view.style.setProperty('--track-image', `url("${escapeAttribute(track.image)}")`);
      playerImage.src = track.image;
      playerImage.alt = track.title;
      playerTitle.textContent = `${track.number} — ${track.title}`;
      playerSubtitle.textContent = track.subtitle;
      audio.src = track.audio || '';
      audio.load();
      progress.value = '0';
      currentTime.textContent = '0:00';
      duration.textContent = '0:00';
      status.textContent = '';
      audioToggle.textContent = '▶';
      audioToggle.setAttribute('aria-label', 'Play track');
      previousButton.hidden = index === 0;
      nextButton.hidden = index === tracks.length - 1;
      view.classList.remove('is-playing');
    }

    list.addEventListener('click', (event) => {
      const trackButton = event.target.closest('.soundtrack-track');
      if (trackButton) {
        selectTrack(Number(trackButton.dataset.track));
        playAudio();
      }
    });
    lyricsButton.addEventListener('click', () => {
      lyrics.hidden = !lyrics.hidden;
      lyricsButton.textContent = lyrics.hidden ? '♡ Read the Lyrics' : 'Close the Lyrics';
    });
    document.getElementById('soundtrack-play')?.addEventListener('click', () => playAudio());
    audioToggle.addEventListener('click', () => audio.paused ? playAudio() : audio.pause());
    previousButton.addEventListener('click', () => selectTrack(activeTrack - 1));
    nextButton.addEventListener('click', () => selectTrack(activeTrack + 1));
    progress.addEventListener('input', () => { if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration; });
    volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('play', () => { view.classList.add('is-playing'); audioToggle.textContent = '❚❚'; audioToggle.setAttribute('aria-label', 'Pause track'); status.textContent = ''; });
    audio.addEventListener('pause', () => { view.classList.remove('is-playing'); audioToggle.textContent = '▶'; audioToggle.setAttribute('aria-label', 'Play track'); });
    audio.addEventListener('ended', () => { view.classList.remove('is-playing'); audioToggle.textContent = '▶'; });
    audio.addEventListener('error', () => { view.classList.remove('is-playing'); audioToggle.textContent = '▶'; status.textContent = 'Music unavailable'; });
    window.addEventListener('pagehide', () => { audio.pause(); audio.removeAttribute('src'); audio.load(); });
    selectTrack(activeTrack);

    function playAudio() {
      if (!audio.src) { status.textContent = 'Music unavailable'; return; }
      audio.play().catch(() => { status.textContent = 'Music unavailable'; });
    }

    function updateProgress() {
      const total = Number.isFinite(audio.duration) ? audio.duration : 0;
      progress.value = total ? String((audio.currentTime / total) * 100) : '0';
      currentTime.textContent = formatTime(audio.currentTime);
      duration.textContent = formatTime(total);
    }

    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return '0:00';
      return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
    }
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }
  function escapeAttribute(value) { return escapeHtml(value); }
})();
