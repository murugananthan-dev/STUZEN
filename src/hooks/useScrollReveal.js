import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Resilient IntersectionObserver-based bidirectional scroll reveal hook.
 *
 * CRITICAL VISIBILITY & MOTION GUARANTEES:
 * 1. Bidirectional animation: Elements fade in on scroll down/back, and fade out on scroll away.
 * 2. Stagger sequencing: Child elements cascade with noticeable 180ms delays.
 * 3. Fallback resilience: If JS or IntersectionObserver fails, base CSS keeps all content 100% visible.
 * 4. Accessibility: Strictly respects `prefers-reduced-motion: reduce`.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isStagger = options.stagger ?? false;
  const threshold = options.threshold ?? 0.1;
  const rootMargin = options.rootMargin ?? '0px 0px -30px 0px';

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

    const armedClass = isStagger ? 'stagger-init' : 'reveal-init';
    const legacyArmedClass = isStagger ? 'stagger-pending' : 'reveal-pending';

    // Arm element with progressive enhancement classes
    el.classList.add(armedClass, legacyArmedClass);

    // Check if element is already inside the viewport on initial render
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInitiallyVisible = rect.top < windowHeight - 40 && rect.bottom > 40;

    if (isInitiallyVisible) {
      // Trigger noticeable initial entrance animation after double rAF to guarantee paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el) el.classList.add('is-revealed');
        });
      });
    }

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('is-revealed');
            } else {
              // Fade out when scrolling away
              el.classList.remove('is-revealed');
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );
      observer.observe(el);
    } else {
      // Fallback if IntersectionObserver is unavailable
      el.classList.add('is-revealed');
    }

    // Safety fallback: if after 6 seconds something is still not revealed, reveal it so content is never lost
    const safetyTimer = setTimeout(() => {
      if (el && !el.classList.contains('is-revealed')) {
        const currentRect = el.getBoundingClientRect();
        if (currentRect.top < windowHeight && currentRect.bottom > 0) {
          el.classList.add('is-revealed');
        }
      }
    }, 6000);

    return () => {
      clearTimeout(safetyTimer);
      if (observer) observer.disconnect();
    };
  }, [isStagger, threshold, rootMargin]);

  return ref;
}

export default useScrollReveal;
