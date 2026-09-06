import { prefersReducedMotion } from './lib/motion';
import { mountLoader } from './components/Loader';
import { mountNav } from './components/Nav';
import { mountSmoothScroll } from './components/SmoothScroll';
import { mountHero } from './sections/Hero';
import { mountNumbers } from './sections/Numbers';
import { mountChapters } from './sections/Chapters';
import { mountFrames } from './sections/Frames';
import { mountArgument } from './sections/Argument';
import { mountRecords } from './sections/Records';
import { mountMoments } from './sections/Moments';
import { mountHuman } from './sections/Human';
import { mountTheMoment } from './sections/TheMoment';
import { mountCoda } from './sections/Coda';

export function mount(root: HTMLElement) {
  // 1. Loader overlays everything; render DOM but stay invisible until JS boots
  root.innerHTML = `
    <main id="top">
      <section id="hero"></section>
      <section id="numbers"></section>
      <section id="chapters"></section>
      <section id="frames"></section>
      <section id="argument"></section>
      <section id="records"></section>
      <section id="moments"></section>
      <section id="human"></section>
      <section id="moment"></section>
      <footer id="coda"></footer>
    </main>
  `;

  const reduced = prefersReducedMotion();
  const ctx = { root, reduced };

  // 2. Always-on chrome
  mountLoader(ctx);
  mountNav(ctx);
  const lenis = mountSmoothScroll(ctx);

  // 3. Section content (async where heavy)
  const queue = [
    () => mountHero(ctx),
    () => mountNumbers(ctx),
    () => mountChapters(ctx),
    () => mountFrames(ctx),
    () => mountArgument(ctx),
    () => mountRecords(ctx),
    () => mountMoments(ctx),
    () => mountHuman(ctx),
    () => mountTheMoment(ctx),
    () => mountCoda(ctx),
  ];

  // 4. Reveal sections in order, then fire loader exit
  (async () => {
    for (const fn of queue) {
      try {
        await fn();
      } catch (e) {
        console.error('[mount] section failed', e);
      }
    }
    // tell loader to exit once content is in
    window.dispatchEvent(new Event('messi:ready'));
  })();
}
