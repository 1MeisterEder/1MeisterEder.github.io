const button = document.querySelector('.menu-button');
const menu = document.querySelector('.main-menu');
button?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const interviewVideo = document.querySelector('.artist-video');
if (interviewVideo) {
  const showEnglishCaptions = () => {
    Array.from(interviewVideo.textTracks).forEach(track => {
      track.mode = track.language === 'en' ? 'showing' : 'disabled';
    });
  };

  if (interviewVideo.readyState >= 1) showEnglishCaptions();
  else interviewVideo.addEventListener('loadedmetadata', showEnglishCaptions, { once: true });

  interviewVideo.addEventListener('play', showEnglishCaptions, { once: true });
}

const hero = document.querySelector('.hero');
const heroCharacter = document.querySelector('.hero-cigarette-head');
const heroCharacterPeek = document.querySelector('.hero-character-peek');
if (hero && heroCharacter && heroCharacterPeek && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;

  const revealHeroCharacter = () => {
    const heroTop = hero.getBoundingClientRect().top;
    const distance = Math.max(1, window.innerHeight * 0.48);
    const progress = Math.min(1, Math.max(0, -heroTop / distance));
    const peekHeight = window.innerWidth <= 760 ? 46 : 76;
    const fullHeight = heroCharacter.getBoundingClientRect().height;

    heroCharacterPeek.style.height = `${peekHeight + (fullHeight - peekHeight) * progress}px`;
    // On phones the small demonstrator sits beside the title and rises as the
    // page is explored, rather than getting stranded at the bottom of the hero.
    const mobileLift = window.innerWidth <= 760 ? Math.round(progress * 82) : 0;
    heroCharacterPeek.style.setProperty('--hero-scroll-lift', `${mobileLift}px`);
    ticking = false;
  };

  const requestReveal = () => {
    if (!ticking) {
      window.requestAnimationFrame(revealHeroCharacter);
      ticking = true;
    }
  };

  revealHeroCharacter();
  window.addEventListener('scroll', requestReveal, { passive: true });
}
