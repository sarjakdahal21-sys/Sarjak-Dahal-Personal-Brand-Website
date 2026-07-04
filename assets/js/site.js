(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) root.classList.add("js-motion");

  const progressBar = document.querySelector(".progress__bar");
  const header = document.querySelector(".site-header");
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  const method = document.querySelector("[data-method]");
  const methodSteps = method ? [...method.querySelectorAll(".method-step")] : [];

  /* Method rule: brass fill tracks how far the reader has moved through it */
  const updateMethod = () => {
    if (!method) return;
    const rect = method.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = Math.min(Math.max((vh * 0.86 - rect.top) / (rect.height + vh * 0.36), 0), 1);
    method.style.setProperty("--method-progress", progress.toFixed(3));
    methodSteps.forEach((step, i) => {
      step.classList.toggle("is-lit", progress >= (i + 0.4) / methodSteps.length);
    });
  };

  const onScroll = () => {
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressBar.style.transform = `scaleX(${Math.min(Math.max(amount, 0), 1)})`;
    }
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (!prefersReducedMotion) updateMethod();
  };

  /* Reveals */
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* Headline masks ink in on the frame after first paint */
  if (!prefersReducedMotion) {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-live")));
  }

  if (prefersReducedMotion && method) {
    method.style.setProperty("--method-progress", "1");
    methodSteps.forEach((step) => step.classList.add("is-lit"));
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();
