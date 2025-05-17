// js/main.js
(function() {
  // Throttle helper
  function throttle(fn, wait = 100) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  window.addEventListener('DOMContentLoaded', () => {
    // Lazy-load images with fade-in
    const imgs = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.onload = () => img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '0px 0px 200px 0px' });
      imgs.forEach(img => obs.observe(img));
    } else {
      imgs.forEach(img => {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
      });
    }

    // Typing effect using recursive setTimeout
    function typeText(id, next) {
      const el = document.getElementById(id);
      ['type-title','type-subtitle'].forEach(i => document.getElementById(i).classList.remove('cursor-active'));
      el.textContent = '';
      el.classList.add('cursor-active');
      const txt = el.getAttribute('data-text') || '';
      let i = 0;
      (function typeChar() {
        el.textContent += txt.charAt(i);
        i++;
        if (i < txt.length) {
          setTimeout(typeChar, +getComputedStyle(document.documentElement).getPropertyValue('--typing-speed'));
        } else {
          el.classList.remove('cursor-active');
          next && next();
        }
      })();
    }
    typeText('type-title', () => typeText('type-subtitle'));

    // Section visibility on scroll
    const sections = document.querySelectorAll('.section');
    const onScroll = throttle(() => {
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          sec.classList.add('visible');
        } else {
          sec.classList.remove('visible');
        }
      });
    }, 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
})();
