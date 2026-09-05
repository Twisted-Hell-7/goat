import Lenis from 'lenis';
import { gsap, registerGSAP, ScrollTrigger } from '../lib/gsap';

export function mountSmoothScroll(_ctx: { reduced: boolean }): Lenis | null {
  if (_ctx.reduced) {
    registerGSAP();
    return null;
  }
  registerGSAP();

  const lenis = new Lenis({
    lerp: 0.075,
    smoothWheel: true,
    syncTouch: false,
  });

  // Tell ScrollTrigger to read scroll position from Lenis, not the window.
  // Without this, ScrollTrigger's pin/scrub sees a stale native scrollY
  // and tweens inside the pin range never advance.
  ScrollTrigger.scrollerProxy(window, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.animatedScroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Re-measure after Lenis is wired
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return lenis;
}
