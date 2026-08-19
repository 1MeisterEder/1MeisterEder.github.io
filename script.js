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
