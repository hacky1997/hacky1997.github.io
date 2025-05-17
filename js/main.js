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

    // Typing effect
    const type = (id, next) => {
      const el = document.getElementById(id);
      ['type-title','type-subtitle'].forEach(i => document.getElementById(i).classList.remove('cursor-active'));
      el.textContent = '';
      el.classList.add('cursor-active');
      const txt = el.getAttribute('data-text') || '';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += txt.charAt(i);
        i++;
        if (i >= txt.length) {
          clearInterval(interval);
          el.classList.remove('cursor-active');
          if (next) next();
        }
      }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-speed')));
    };
    type('type-title', () => type('type-subtitle'));

    // Section visibility on scroll
    const sections = document.querySelectorAll('.section');
    const onScroll = () => {
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) sec.classList.add('visible');
        else sec.classList.remove('visible');
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  });
})();
