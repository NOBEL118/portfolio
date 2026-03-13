/* ══════════════════════════════════════════
   ALEXIS RAY — Portfolio JS
   Features:
   - Navbar scroll effect
   - Dark/Light theme toggle
   - Hamburger mobile menu
   - Scroll reveal animations
   - Active nav link on scroll
   - Smooth scrolling
   - Form submission feedback
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Elements ── */
  const navbar       = document.getElementById('navbar');
  const themeToggle  = document.getElementById('themeToggle');
  const themeIcon    = themeToggle.querySelector('.theme-icon');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const navLinks     = document.querySelectorAll('.nav-link');
  const mobLinks     = document.querySelectorAll('.mob-link');
  const sections     = document.querySelectorAll('section[id]');
  const revealEls    = document.querySelectorAll('.reveal');
  const contactForm  = document.getElementById('contactForm');

  /* ══════════════════════════════════════
     1. NAVBAR — scroll effect
  ══════════════════════════════════════ */
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ══════════════════════════════════════
     2. THEME TOGGLE — dark / light
  ══════════════════════════════════════ */
  // Load saved theme
  const savedTheme = localStorage.getItem('ar-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀' : '☾';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeIcon.textContent = next === 'dark' ? '☀' : '☾';
    localStorage.setItem('ar-theme', next);
  });

  /* ══════════════════════════════════════
     3. HAMBURGER — mobile menu
  ══════════════════════════════════════ */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    // Prevent body scroll when menu open
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ══════════════════════════════════════
     4. SCROLL REVEAL — intersection observer
  ══════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════
     5. ACTIVE NAV LINK — on scroll
  ══════════════════════════════════════ */
  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - var_navH();
      if (window.scrollY >= sectionTop - 80) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  function var_navH() {
    return parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 70;
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ══════════════════════════════════════
     6. SMOOTH SCROLL — for all anchor links
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - var_navH();
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     7. CONTACT FORM — submission feedback
  ══════════════════════════════════════ */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      // Loading state
      btn.innerHTML = 'Sending... <span>⋯</span>';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // Simulate send (replace with real API call)
      setTimeout(() => {
        btn.innerHTML = 'Message Sent! <span>✓</span>';
        btn.style.background = '#4caf50';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ══════════════════════════════════════
     8. PLACEHOLDER HOVER INTERACTION
     (Visual feedback on dummy media cards)
  ══════════════════════════════════════ */
  document.querySelectorAll('.thumb-placeholder, .video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      const label = placeholder.querySelector('.thumb-label, .video-label');
      if (label) {
        const original = label.textContent;
        label.textContent = '[ Add your media here ]';
        label.style.color = 'var(--accent)';
        setTimeout(() => {
          label.textContent = original;
          label.style.color = '';
        }, 2000);
      }
    });
  });

  /* ══════════════════════════════════════
     9. HERO IMAGE PLACEHOLDER click hint
  ══════════════════════════════════════ */
  const heroPh = document.querySelector('.hero-img-placeholder');
  if (heroPh) {
    heroPh.addEventListener('click', () => {
      const p = heroPh.querySelector('p');
      const original = p.textContent;
      p.textContent = 'Place your photo here';
      p.style.color = 'var(--accent)';
      setTimeout(() => {
        p.textContent = original;
        p.style.color = '';
      }, 2000);
    });
  }

  /* ══════════════════════════════════════
     10. MARQUEE TICKER — subtle hero scrolling text
     (adds dynamic feel without a library)
  ══════════════════════════════════════ */
  // No extra DOM manipulation needed — handled via CSS animation above.

  console.log('%c AR Portfolio loaded ✓', 'color: #e8ff47; font-family: monospace; font-size: 14px;');

});
