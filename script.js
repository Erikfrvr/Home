document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navActions.classList.toggle('open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  [...navLinks.querySelectorAll('a'), ...navActions.querySelectorAll('a')].forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navActions.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle(
          'active',
          a.getAttribute('href') === `#${entry.target.id}`
        ));
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObserver.observe(s));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bgVideo = document.getElementById('bgVideo');
  const heroVideo = document.getElementById('heroVideo');

  if (heroVideo && bgVideo) {
    heroVideo.addEventListener('error', () => bgVideo.classList.add('video-unavailable'), true);
    setTimeout(() => {
      if (heroVideo.readyState === 0) bgVideo.classList.add('video-unavailable');
    }, 2500);
  }

  const firefliesWrap = document.getElementById('fireflies');
  if (firefliesWrap && !prefersReducedMotion) {
    const COUNT = 20;
    for (let i = 0; i < COUNT; i++) {
      const f = document.createElement('span');
      f.className = 'firefly';
      const startX = Math.random() * 100;
      const startY = 20 + Math.random() * 70;
      const dx = (Math.random() - 0.5) * 160;
      const dy = -(60 + Math.random() * 140);
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 8;
      f.style.left = `${startX}%`;
      f.style.top = `${startY}%`;
      f.style.setProperty('--dx', `${dx}px`);
      f.style.setProperty('--dy', `${dy}px`);
      f.style.animationDuration = `${duration}s`;
      f.style.animationDelay = `${delay}s`;
      firefliesWrap.appendChild(f);
    }
  }

  const heroModel = document.getElementById('heroModel');
  const heroModelWrap = document.getElementById('heroModelWrap');
  if (heroModel && heroModelWrap) {
    heroModel.addEventListener('load', () => heroModelWrap.classList.add('model-ready'));
    heroModel.addEventListener('error', () => heroModelWrap.classList.add('model-error'));
  }

  const trailerFrame = document.getElementById('trailerFrame');
  const trailerModal = document.getElementById('trailerModal');
  const modalClose = document.getElementById('modalClose');

  function openModal() {
    trailerModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    trailerModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  trailerFrame.addEventListener('click', openModal);
  trailerFrame.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
  });
  modalClose.addEventListener('click', closeModal);
  trailerModal.addEventListener('click', (e) => {
    if (e.target === trailerModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const roster = Array.from(document.querySelectorAll('.roster-item'));
  const fighterModel = document.getElementById('fighterModel');
  const fighterModelWrap = document.getElementById('fighterModelWrap');
  const fighterFallback = document.getElementById('fighterFallback');
  const fighterName = document.getElementById('fighterName');
  const fighterRole = document.getElementById('fighterRole');
  const fighterIndex = document.getElementById('fighterIndex');
  const fighterBadge = document.getElementById('fighterBadge');
  const fighterEnter = document.getElementById('fighterEnter');
  const equipeSection = document.getElementById('equipe');

  let currentIndex = 0;

  function selectFighter(index, { focus = false } = {}) {
    const item = roster[index];
    if (!item) return;
    currentIndex = index;

    roster.forEach(r => {
      r.classList.remove('is-active');
      r.setAttribute('aria-selected', 'false');
    });
    item.classList.add('is-active');
    item.setAttribute('aria-selected', 'true');
    item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    if (focus) item.focus();

    const { name, role, model, page, badge } = item.dataset;
    fighterName.textContent = name;
    fighterRole.textContent = role;
    fighterIndex.textContent = `Integrante ${String(index + 1).padStart(2, '0')}`;
    fighterFallback.querySelector('.initials').textContent = name.charAt(0).toUpperCase();
    fighterEnter.setAttribute('href', page);
    fighterModel.setAttribute('src', model);
    fighterModelWrap.classList.remove('model-ready', 'model-error');

    if (badge) {
      fighterBadge.textContent = badge;
      fighterBadge.hidden = false;
    } else {
      fighterBadge.hidden = true;
    }
  }

  roster.forEach((item, i) => {
    item.addEventListener('click', () => selectFighter(i));

    const thumbViewer = item.querySelector('model-viewer');
    const thumbWrap = item.querySelector('.roster-thumb');
    if (thumbViewer && thumbWrap) {
      thumbViewer.addEventListener('load', () => thumbWrap.classList.add('model-ready'));
      thumbViewer.addEventListener('error', () => thumbWrap.classList.remove('model-ready'));
    }
  });

  fighterModel.addEventListener('load', () => fighterModelWrap.classList.add('model-ready'));
  fighterModel.addEventListener('error', () => fighterModelWrap.classList.add('model-error'));

  document.addEventListener('keydown', (e) => {
    if (!equipeSection) return;
    const rect = equipeSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;
    if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectFighter((currentIndex + 1) % roster.length, { focus: true });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectFighter((currentIndex - 1 + roster.length) % roster.length, { focus: true });
    }
    if (e.key === 'Enter' && document.activeElement !== fighterEnter) {
      fighterEnter.click();
    }
  });

  selectFighter(0);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-zoom').forEach(el => {
    observer.observe(el);
  });
});
