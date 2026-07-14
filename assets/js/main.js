/* ---------------------------------------------------------------
   1. NAV
   Goes solid once you have scrolled past the hero's first screen.
   --------------------------------------------------------------- */
(function () {
  var nav = document.querySelector('[data-nav]');
  if (!nav) return;

  // On pages without a hero, the nav is solid from the start.
  var hasHero = !!document.querySelector('[data-hero]');
  if (!hasHero) {
    nav.classList.add('is-solid');
    return;
  }

  function update() {
    nav.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.85);
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();


/* ---------------------------------------------------------------
   2. SCROLL-SCRUBBED HERO
   The hero is a tall box with a sticky screen inside it. As you
   scroll through the box we work out how far you are (0 to 1) and
   push the video to the matching frame, so the render appears to
   spin under your thumb.

   If no video loads, the same 0-to-1 value spins an SVG placeholder
   instead, so you can see the effect before you have footage.
   --------------------------------------------------------------- */
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;

  var video = hero.querySelector('[data-hero-video]');
  var placeholder = hero.querySelector('[data-hero-placeholder]');
  var spinner = hero.querySelector('[data-spin]');

  var hasVideo = false;
  var duration = 0;
  var target = 0;   // where scroll says we should be
  var current = 0;  // where we actually are, chasing target
  var ticking = false;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (video) {
    video.addEventListener('loadedmetadata', function () {
      if (!video.duration || !isFinite(video.duration)) return;
      hasVideo = true;
      duration = video.duration;
      video.pause();
      if (placeholder) placeholder.style.display = 'none';
    });
    // No file there yet (or the browser cannot play it): keep the placeholder.
    video.addEventListener('error', function () {
      hasVideo = false;
    });
  }

  // How far through the hero we have scrolled, clamped to 0..1.
  function progress() {
    var box = hero.getBoundingClientRect();
    var runway = hero.offsetHeight - window.innerHeight;
    if (runway <= 0) return 0;
    var p = -box.top / runway;
    return Math.min(1, Math.max(0, p));
  }

  function render() {
    ticking = false;

    // Ease toward the target so scrubbing feels weighted, not twitchy.
    current += (target - current) * (reduced ? 1 : 0.12);

    if (hasVideo) {
      var t = current * duration;
      // Seeking on every frame is expensive; skip imperceptible moves.
      if (Math.abs(video.currentTime - t) > 0.02) {
        video.currentTime = t;
      }
    } else if (spinner) {
      spinner.style.transform = 'rotate(' + (current * 360).toFixed(2) + 'deg)';
    }

    // Keep easing until we have caught up.
    if (Math.abs(target - current) > 0.0005) {
      requestAnimationFrame(render);
    }
  }

  function onScroll() {
    target = progress();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
