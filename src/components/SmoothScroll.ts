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

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
