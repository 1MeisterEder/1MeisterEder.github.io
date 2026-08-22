(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('site-motion-ready');
  const items = [...new Set(document.querySelectorAll([
    'main > section',
    'main > figure',
    'main > article',
    '.project-card',
    '.project-featured',
    '.work-card',
    '.application-callout',
    '.footer'
  ].join(',')))];

  items.forEach((item, index) => {
    item.classList.add('site-reveal');
    item.style.setProperty('--site-delay', `${(index % 4) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5%' });
  items.forEach(item => observer.observe(item));

  document.querySelectorAll('.project-image,.card-image,.work-image-link,.project-card,.work-card').forEach(item => item.classList.add('site-motion-image'));
})();
