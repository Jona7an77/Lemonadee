/* Lemonadee — hero product carousel (home page).
   Slides come from products marked featured: true in products.js. */
(function () {
  const root = document.querySelector(".hero-carousel");
  const track = document.getElementById("hc-track");
  const dotsEl = document.getElementById("hc-dots");
  if (!root || !track) return;
  const slides = [...track.children];
  if (slides.length < 2) { root.querySelector(".hc-controls").hidden = true; slides[0]?.classList.add("is-active"); return; }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;

  dotsEl.innerHTML = slides.map((_, i) =>
    `<button type="button" aria-label="Show product ${i + 1}"></button>`).join("");
  const dots = [...dotsEl.children];

  function setActive(i) {
    index = i;
    slides.forEach((s, n) => {
      const on = n === i;
      s.classList.toggle("is-active", on);
      s.querySelector("a").tabIndex = on ? 0 : -1;
      s.setAttribute("aria-hidden", String(!on));
    });
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === i)));
  }

  function go(i) {
    i = (i + slides.length) % slides.length;
    const s = slides[i];
    track.scrollTo({
      left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth"
    });
    setActive(i);
  }

  /* Keep the active slide in sync when the visitor swipes */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.intersectionRatio > 0.6) setActive(slides.indexOf(e.target));
    });
  }, { root: track, threshold: [0.6] });
  slides.forEach(s => io.observe(s));

  root.querySelector('[data-hc="prev"]').addEventListener("click", () => { go(index - 1); stop(); });
  root.querySelector('[data-hc="next"]').addEventListener("click", () => { go(index + 1); stop(); });
  dots.forEach((d, n) => d.addEventListener("click", () => { go(n); stop(); }));
  root.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { go(index - 1); stop(); }
    if (e.key === "ArrowRight") { go(index + 1); stop(); }
  });

  /* Clicking a peeking side slide brings it to the centre instead of opening it */
  slides.forEach((s, n) => s.addEventListener("click", e => {
    if (n !== index) { e.preventDefault(); go(n); stop(); }
  }));

  /* Auto-advance; pauses on hover/focus, stops after any interaction */
  let timer = null;
  function start() { if (!reduce && !timer) timer = setInterval(() => go(index + 1), 5000); }
  function pause() { clearInterval(timer); timer = null; }
  let stopped = false;
  function stop() { stopped = true; pause(); }
  root.addEventListener("mouseenter", pause);
  root.addEventListener("mouseleave", () => { if (!stopped) start(); });
  root.addEventListener("focusin", pause);
  track.addEventListener("touchstart", stop, { passive: true });
  document.addEventListener("visibilitychange", () => { document.hidden ? pause() : (!stopped && start()); });

  setActive(0);
  start();
})();
