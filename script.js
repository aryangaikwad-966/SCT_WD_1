
    (function () {
      const nav = document.querySelector('.nav');
      const toggle = document.querySelector('.nav__toggle');
      const sentinel = document.querySelector('.nav-sentinel');

      if (toggle) {
        toggle.addEventListener('click', () => {
          const isOpen = nav.classList.toggle('nav--open');
          toggle.setAttribute('aria-expanded', String(isOpen));
        });
      }

      const applyScrolled = (on) => nav.classList.toggle('nav--scrolled', on);

      if ('IntersectionObserver' in window && sentinel) {
        const io = new IntersectionObserver(
          ([entry]) => applyScrolled(!entry.isIntersecting),
          { rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`, threshold: 0 }
        );
        io.observe(sentinel);
      } else {
        const onScroll = () => applyScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      }

      const here = location.pathname.replace(/\/+$/, '');
      document.querySelectorAll('.nav__link').forEach(a => {
        const path = new URL(a.href, location.origin).pathname.replace(/\/+$/, '');
        if (path === here) a.setAttribute('aria-current', 'page');
      });
    })();
  
