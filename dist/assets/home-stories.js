(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
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

})();
