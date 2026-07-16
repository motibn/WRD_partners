(() => {
  const header = document.querySelector('[data-header]');
  const burgerBtn = document.getElementById('burgerBtn');

  const setScrolled = () => {
    const scrolled = window.scrollY > 24;
    header.classList.toggle('is-scrolled', scrolled);
  };
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  const closeMenu = () => {
    header.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  };
  burgerBtn.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('[data-mobile-menu] a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.querySelectorAll('[data-faq]').forEach((item) => {
    const toggle = item.querySelector('.faq-toggle');
    toggle.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('[data-faq].is-open').forEach((open) => open.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }
})();
