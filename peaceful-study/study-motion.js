(function () {
  const hero = document.querySelector('.study-hero');
  const character = document.querySelector('.hero-character');
  const footer = document.querySelector('.study-footer');
  const footerCharacter = document.querySelector('.study-footer-character');
  const paradoxHeading = document.querySelector('.paradox-heading');

  if (!hero || !character || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frame = null;

  function updateCharacter() {
    const bounds = hero.getBoundingClientRect();
    const distance = Math.max(0, Math.min(1, -bounds.top / Math.max(bounds.height, 1)));
    character.style.setProperty('--scroll-lift', `${Math.round(distance * 18)}px`);
    character.style.setProperty('--scroll-turn', `${(distance * 5).toFixed(2)}deg`);
    frame = null;
  }

  window.addEventListener('scroll', function () {
    if (frame === null) frame = requestAnimationFrame(updateCharacter);
  }, { passive: true });

  hero.addEventListener('pointermove', function (event) {
    const bounds = hero.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
    character.style.setProperty('--pointer-turn', `${((position - 0.5) * 5).toFixed(2)}deg`);
  });

  hero.addEventListener('pointerleave', function () {
    character.style.setProperty('--pointer-turn', '0deg');
  });

  if (footer && footerCharacter) {
    let footerIsVisible = false;
    let footerTimer = null;

    function replayFooterHop() {
      footerCharacter.classList.remove('is-hopping');
      void footerCharacter.offsetWidth;
      footerCharacter.classList.add('is-hopping');
    }

    function scheduleFooterHop() {
      window.clearTimeout(footerTimer);
      if (!footerIsVisible || document.hidden) return;
      footerTimer = window.setTimeout(function () {
        replayFooterHop();
        scheduleFooterHop();
      }, 15000);
    }

    const observer = new IntersectionObserver(function (entries) {
      footerIsVisible = entries[0].isIntersecting;
      if (footerIsVisible) replayFooterHop();
      scheduleFooterHop();
    }, { threshold: 0.45 });

    observer.observe(footer);

    footer.addEventListener('pointermove', function (event) {
      const bounds = footer.getBoundingClientRect();
      const position = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      footerCharacter.style.setProperty('--footer-lift', '7px');
      footerCharacter.style.setProperty('--footer-turn', `${((position - 0.76) * 16).toFixed(2)}deg`);
    });

    footer.addEventListener('pointerleave', function () {
      footerCharacter.style.setProperty('--footer-lift', '0px');
      footerCharacter.style.setProperty('--footer-turn', '0deg');
    });

    document.addEventListener('visibilitychange', scheduleFooterHop);
  }

  if (paradoxHeading) {
    let paradoxIsVisible = false;
    let paradoxTimer = null;

    function replayParadoxMotion() {
      paradoxHeading.classList.remove('is-replaying');
      void paradoxHeading.offsetWidth;
      paradoxHeading.classList.add('is-replaying');
    }

    function scheduleParadoxMotion() {
      window.clearTimeout(paradoxTimer);
      if (!paradoxIsVisible || document.hidden) return;
      paradoxTimer = window.setTimeout(function () {
        replayParadoxMotion();
        scheduleParadoxMotion();
      }, 15000);
    }

    const paradoxObserver = new IntersectionObserver(function (entries) {
      paradoxIsVisible = entries[0].isIntersecting;
      if (paradoxIsVisible) paradoxHeading.classList.add('is-visible');
      scheduleParadoxMotion();
    }, { threshold: 0.35 });

    paradoxObserver.observe(paradoxHeading);
    document.addEventListener('visibilitychange', scheduleParadoxMotion);
  }

  updateCharacter();
}());
