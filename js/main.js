(function() {
  console.log('main.js loaded');
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    // Lazy-load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '0px 0px 200px 0px' });
      lazyImages.forEach(img => obs.observe(img));
    } else {
      lazyImages.forEach(img => { img.src = img.dataset.src; });
    }

    // Typing effect with single cursor
    const typeText = (elId, speed, callback) => {
      const el = document.getElementById(elId);
      if (!el) return console.error('Element not found:', elId);
      ['type-title', 'type-subtitle'].forEach(id => {
        document.getElementById(id).classList.remove('cursor-active');
      });
      el.textContent = '';
      el.classList.add('cursor-active');
      const text = el.getAttribute('data-text') || '';
      let idx = 0;
      const interval = setInterval(() => {
        el.textContent += text.charAt(idx);
        idx++;
        if (idx >= text.length) {
          clearInterval(interval);
          el.classList.remove('cursor-active');
          if (callback) callback();
        }
      }, speed);
    };

    const speed = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-speed')) || 100;
    typeText('type-title', speed, () => typeText('type-subtitle', speed));
  });
})();
