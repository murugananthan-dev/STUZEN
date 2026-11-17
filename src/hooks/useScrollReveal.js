import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Resilient IntersectionObserver-based scroll reveal hook.
 *
 * CRITICAL VISIBILITY GUARANTEES:
 * 1. Content is ALWAYS 100% visible by default in base CSS.
 * 2. Elements already within or near the viewport on load are NEVER hidden.
 * 3. Elements below the viewport are progressively enhanced with subtle entrance animations.
 * 4. Multi-layered triggers (IntersectionObserver + Scroll event + Safety Timer) guarantee
 *    content is NEVER permanently hidden or left blank under any condition.
 * 5. Strictly respects `prefers-reduced-motion: reduce`.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isStagger = options.stagger ?? false;
  const threshold = options.threshold ?? 0.05;
  const rootMargin = options.rootMargin ?? '50px 0px 50px 0px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion or missing window
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof window === 'undefined') {
      el.classList.add('is-revealed');
      return;
    }

    const pendingClass = isStagger ? 'stagger-pending' : 'reveal-pending';

    // Check if element is already within the current viewport (or within 100px below)
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight + 60) {
      // Element is already visible or nearly visible on load — keep it 100% visible!
      el.classList.add('is-revealed');
      return;
    }

    // Element is genuinely below the viewport: arm it for smooth reveal
    el.classList.add(pendingClass);

    let hasRevealed = false;
    const reveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      el.classList.add('is-revealed');

      // Cleanup pending class after transition completes so it permanently uses base CSS
      setTimeout(() => {
        if (el) el.classList.remove(pendingClass);
      }, 500);

      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };

    // Layer 1: Fail-safe timer (reveal within 750ms regardless of scroll/observer state)
    const safetyTimer = setTimeout(reveal, 750);

    // Layer 2: Passive scroll / touch listener as immediate backup
    const onScroll = () => {
      const currentRect = el.getBoundingClientRect();
      const currentHeight = window.innerHeight || document.documentElement.clientHeight;
      if (currentRect.top <= currentHeight + 80) {
        clearTimeout(safetyTimer);
        reveal();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    // Layer 3: Primary IntersectionObserver
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              clearTimeout(safetyTimer);
              reveal();
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );
      observer.observe(el);
    }

    return () => {
      clearTimeout(safetyTimer);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
    };
  }, [isStagger, threshold, rootMargin]);

  return ref;
}

export default useScrollReveal;
