(function () {
  const hero = document.querySelector('.study-hero');
  const character = document.querySelector('.hero-character');

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

  updateCharacter();
}());
