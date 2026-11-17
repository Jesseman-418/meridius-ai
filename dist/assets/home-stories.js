(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const banners = [...document.querySelectorAll('.chapter-banner')];
  const scenes = banners.map(banner => banner.closest('.scene'));
  let frame = 0;

  function renderBanners() {
    frame = 0;
    const height = window.innerHeight;
    // Read every scene position before applying transforms.
    const tops = scenes.map(scene => scene.getBoundingClientRect().top);
    banners.forEach((banner, i) => {
      const progress = Math.max(0, Math.min(1, (height * 0.92 - tops[i]) / (height * 0.68)));
      const eased = progress * progress * (3 - 2 * progress);
      const distance = Math.min(620, window.innerWidth * 0.4);
      banner.style.setProperty('--banner-x', `${-distance * (1 - eased)}px`);
      banner.style.setProperty('--banner-opacity', String(Math.min(1, progress * 2.2)));
    });
  }

  function schedule() {
    if (!motion.matches && !frame) frame = requestAnimationFrame(renderBanners);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  motion.addEventListener('change', schedule);
  schedule();

  for (const card of document.querySelectorAll('.business-chat')) {
    const reset = () => {
      for (const key of ['--chat-rx', '--chat-ry', '--chat-z']) card.style.removeProperty(key);
    };
    card.addEventListener('pointermove', event => {
      if (motion.matches || !hover.matches || event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--chat-rx', `${-y * 10}deg`);
      card.style.setProperty('--chat-ry', `${x * 12}deg`);
      card.style.setProperty('--chat-z', '13px');
    });
    card.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
  }
})();
