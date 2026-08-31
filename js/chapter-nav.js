/**
 * Chapter Navigation — handles chapter page navigation and scroll restoration.
 */
(function () {
  const STORAGE_CHAPTER_ID = 'rai-chapter-id';
  const STORAGE_SCROLL_Y = 'rai-chapter-scroll-y';
  const STORAGE_RETURN_FLAG = 'rai-returning-from-chapter';
  history.scrollRestoration = 'manual';
  const routeToChapterId = {
    '/chapter-one': 'first-meeting',
    '/chapter-two': 'first-i-love-you',
    '/chapter-three': 'engagement'
  };

  function isChapterPage() {
    return document.body.classList.contains('chapter-page');
  }

  function handleChapterCardClicks() {
    document.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.button !== 0) return;
      const link = event.target.closest('.timeline-photo-link');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/chapter-')) return;
      const eventId = link.closest('.timeline-event')?.id;
      if (eventId) {
        sessionStorage.setItem(STORAGE_CHAPTER_ID, eventId);
        sessionStorage.setItem(STORAGE_SCROLL_Y, String(window.scrollY));
      }
    });
  }

  function handleBackLinkClicks() {
    const backLink = document.querySelector('.chapter-detail-back');
    if (!backLink) return;
    backLink.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.button !== 0) return;
      const chapterId = routeToChapterId[window.location.pathname];
      if (chapterId) sessionStorage.setItem(STORAGE_CHAPTER_ID, chapterId);
      sessionStorage.setItem(STORAGE_RETURN_FLAG, 'true');
    });
  }

  function restoreChapterPosition() {
    if (sessionStorage.getItem(STORAGE_RETURN_FLAG) !== 'true') return;
    const chapterId = sessionStorage.getItem(STORAGE_CHAPTER_ID);
    if (!chapterId) return;
    let attempts = 0;
    const performRestore = () => {
      const chapterElement = document.getElementById(chapterId);
      if (!chapterElement) {
        if (attempts++ < 120) {
          setTimeout(performRestore, 0);
        } else {
          sessionStorage.removeItem(STORAGE_RETURN_FLAG);
          sessionStorage.removeItem(STORAGE_CHAPTER_ID);
          sessionStorage.removeItem(STORAGE_SCROLL_Y);
        }
        return;
      }
      const scrollY = Number(sessionStorage.getItem(STORAGE_SCROLL_Y));
      if (Number.isFinite(scrollY)) {
        const restore = () => window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
        const images = [...document.querySelectorAll('#timeline img')];
        const imagesReady = Promise.all(images.map((image) => image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          })));
        restore();
        Promise.race([imagesReady, new Promise((resolve) => setTimeout(resolve, 1000))])
          .then(() => requestAnimationFrame(restore));
      }
      else chapterElement.scrollIntoView({ behavior: 'instant', block: 'center' });
      sessionStorage.removeItem(STORAGE_RETURN_FLAG);
      sessionStorage.removeItem(STORAGE_CHAPTER_ID);
      sessionStorage.removeItem(STORAGE_SCROLL_Y);
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      requestAnimationFrame(() => setTimeout(performRestore, 0));
    } else {
      document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => setTimeout(performRestore, 0)));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (isChapterPage()) handleBackLinkClicks();
    else {
      handleChapterCardClicks();
      restoreChapterPosition();
    }
  });

  window.addEventListener('popstate', () => {
    if (!isChapterPage()) {
      const chapterId = sessionStorage.getItem(STORAGE_CHAPTER_ID);
      if (chapterId) {
        sessionStorage.setItem(STORAGE_RETURN_FLAG, 'true');
        restoreChapterPosition();
      }
    }
  });
})();