/* How Well Do You Remember Us? - a lightweight, retry-friendly quiz. */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const shell = document.getElementById('memory-game-shell');
    const config = window.SITE_CONFIG?.memoryGame;
    const questions = window.MEMORY_QUESTIONS || [];
    if (!shell || !config || !questions.length) return;

    const dedicatedPage = document.body.classList.contains('memory-game-page');
    const launchButton = document.getElementById('memory-game-start');
    if (!dedicatedPage) {
      launchButton?.addEventListener('click', () => {
        sessionStorage.setItem('rai-memory-game-return', JSON.stringify({
          path: window.location.pathname,
          hash: '#memory-game',
          scroll: window.scrollY
        }));
      });
      restoreStoryPosition();
      return;
    }

    let current = 0;
    let score = 0;

    function renderQuestion() {
      const item = questions[current];
      shell.innerHTML = `
        <div class="memory-game-progress"><span>${current + 1} / ${questions.length}</span><span class="memory-game-hearts" aria-hidden="true">${'♥'.repeat(score)}${'♡'.repeat(questions.length - score)}</span></div>
        <p class="eyebrow">Question ${String(current + 1).padStart(2, '0')}</p>
        <h2 class="memory-game-question">${escapeHtml(item.question)}</h2>
        <div class="memory-game-options" role="group" aria-label="Answer options">
          ${item.options.map((option) => `<button type="button" class="memory-game-option" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}
        </div>
        <p class="memory-game-feedback" aria-live="polite"></p>`;
    }

    function renderResult() {
      shell.innerHTML = `
        <div class="memory-game-celebration" aria-hidden="true">♥ ♡ ♥</div>
        <p class="eyebrow">Five Little Memories</p>
        <h2 class="section-title">You Remembered Our Story ❤</h2>
        <p class="memory-game-result-copy">আমাদের গল্পের ছোট ছোট মুহূর্তগুলোও<br>তুমি মনে রেখেছো।</p>
        <p class="memory-game-score">${score} / ${questions.length}</p>
        <div class="memory-envelope">
          <div class="memory-envelope-icon" aria-hidden="true">💌</div>
          <p>There's something waiting for you...</p>
          <button class="memory-game-start" type="button" data-open-letter>Open My Heart</button>
        </div>
        <button class="memory-game-again" type="button" data-game-again>Play Again</button>
        <div class="memory-letter" hidden><p>${escapeHtml(config.letter)}</p><strong>— তোমার ভালোবাসার Rick ❤️</strong></div>`;
    }

    shell.addEventListener('click', (event) => {
      if (event.target.closest('[data-game-again]')) {
        current = 0;
        score = 0;
        renderQuestion();
        return;
      }
      const option = event.target.closest('[data-answer]');
      if (option) {
        const feedback = shell.querySelector('.memory-game-feedback');
        if (option.dataset.answer !== questions[current].answer) {
          feedback.textContent = 'আবার ভাবো... ❤';
          option.classList.add('is-wrong');
          setTimeout(() => option.classList.remove('is-wrong'), 350);
          return;
        }
        score += 1;
        feedback.textContent = 'তুমি মনে রেখেছো। ❤';
        shell.querySelectorAll('.memory-game-option').forEach((button) => { button.disabled = true; });
        setTimeout(() => {
          const nextButton = document.createElement('button');
          nextButton.className = 'memory-game-next';
          nextButton.type = 'button';
          nextButton.dataset.nextQuestion = 'true';
          nextButton.textContent = current + 1 === questions.length ? 'See Result →' : 'Next Question →';
          shell.appendChild(nextButton);
        }, 300);
        return;
      }
      if (event.target.closest('[data-next-question]')) {
        current += 1;
        current < questions.length ? renderQuestion() : renderResult();
        return;
      }
      if (event.target.closest('[data-open-letter]')) {
        const letter = shell.querySelector('.memory-letter');
        letter.hidden = false;
        event.target.closest('[data-open-letter]').textContent = 'Heart Opened ♥';
        event.target.closest('[data-open-letter]').disabled = true;
      }
    });

    renderQuestion();
  });

  function restoreStoryPosition() {
    const saved = sessionStorage.getItem('rai-memory-game-return');
    if (!saved) return;
    sessionStorage.removeItem('rai-memory-game-return');
    try {
      const position = JSON.parse(saved);
      requestAnimationFrame(() => window.scrollTo({ top: position.scroll || 0, behavior: 'auto' }));
    } catch {
      window.location.hash = '#memory-game';
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }
})();