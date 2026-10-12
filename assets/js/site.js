/* One motion moment: the hero headline rises and the pen mark draws, once.
   Skipped entirely when the visitor asks for reduced motion. */
(() => {
  const root = document.documentElement;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("js-motion");
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-live")));
})();
