(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header */
  const header = $('#header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  const burger = $('#burger');
  const nav = $('#nav');
  if (burger && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('#nav a').forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  /* Cursor glow — desktop only */
  const glow = $('.cursor-glow');
  if (glow && !prefersReduced && !isTouch) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else if (glow) {
    glow.remove();
  }

  /* Hero particles — desktop, motion ok */
  const canvas = $('#heroCanvas');
  if (canvas && !prefersReduced && !isTouch && window.innerWidth > 768) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const count = Math.min(50, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.2 + 0.4,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.45)';
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(0,212,255,${(1 - dist / maxDist) * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  } else if (canvas) {
    canvas.remove();
  }

  /* Hero video — pause when tab hidden */
  const heroVideo = $('.hero__video');
  if (heroVideo && prefersReduced) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }
  document.addEventListener('visibilitychange', () => {
    if (!heroVideo) return;
    if (document.hidden) heroVideo.pause();
    else if (!prefersReduced) heroVideo.play().catch(() => {});
  });

  /* Scroll reveal */
  const revealEls = $$('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('revealed'), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -24px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  /* Counters */
  $$('[data-count]').forEach((el) => {
    if (!('IntersectionObserver' in window)) {
      el.textContent = el.dataset.count;
      return;
    }
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = parseInt(el.dataset.count, 10);
          const start = performance.now();
          const duration = 1600;
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countIo.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    countIo.observe(el);
  });


  /* Pause showreel videos when off-screen */
  $$('.video-card video').forEach((video) => {
    if (!('IntersectionObserver' in window)) return;
    const vIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) return;
          if (!video.paused && !video.ended) video.pause();
        });
      },
      { threshold: 0.15 }
    );
    vIo.observe(video);
  });

  /* Contact form → WhatsApp */
  const form = $('#contactForm');
  const formSuccess = $('#formSuccess');
  const waBtnLabel = 'Написать в <span class="btn__wa">WhatsApp</span>';
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const waPhone = (form.dataset.whatsapp || '77716066627').replace(/\D/g, '');
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const product = (data.get('product') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const lines = [
        'Заявка с сайта TAS-GABION',
        '',
        `Имя: ${name}`,
        `Телефон: ${phone}`,
      ];
      if (product) lines.push(`Интересует: ${product}`);
      if (message) lines.push(`Сообщение: ${message}`);

      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(lines.join('\n'))}`;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Открываем WhatsApp…';
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      form.reset();
      if (formSuccess) formSuccess.hidden = false;

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = waBtnLabel;
      }
    });
  }
})();
