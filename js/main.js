(function() {
  window.addEventListener('DOMContentLoaded', () => {
    // Lazy-load images
    const imgs = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '0px 0px 200px 0px' });
      imgs.forEach(img => obs.observe(img));
    } else {
      imgs.forEach(img => img.src = img.getAttribute('data-src'));
    }

    // Typing effect with a single blinking cursor
    const type = (id, next) => {
      const el = document.getElementById(id);
      // Remove cursor from both spans
      ['type-title', 'type-subtitle'].forEach(i =>
        document.getElementById(i).classList.remove('cursor-active')
      );
      // Clear and add cursor class
      el.textContent = '';
      el.classList.add('cursor-active');

      const txt = el.getAttribute('data-text') || '';
      let i = 0;
      const speed = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--typing-speed')
      ) || 100;

      const interval = setInterval(() => {
        el.textContent += txt.charAt(i);
        i++;
        if (i >= txt.length) {
          clearInterval(interval);
          el.classList.remove('cursor-active');
          if (next) next();
        }
      }, speed);
    };

    // Kick off typing: title then subtitle
    type('type-title', () => type('type-subtitle'));
  });
})();
