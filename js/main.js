// Lazy-load images
window.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => { img.src = img.dataset.src; });
  }

  // Typing effect
  const type = (elId, speed, callback) => {
    const el = document.getElementById(elId);
    const text = el.dataset.text;
    let idx = 0;
    const typer = setInterval(() => {
      el.textContent += text.charAt(idx);
      idx++;
      if (idx === text.length) {
        clearInterval(typer);
        if (callback) callback();
      }
    }, speed);
  };

  // Start typing sequence
  type('type-title', parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-speed')),
    () => type('type-subtitle', parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-speed')))
  );
});
