'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { stats } from '@/lib/data';

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.stat');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      });

      items.forEach((el, i) => {
        const value = Number(el.dataset.value);
        const obj = { v: 0 };
        const isLast = i === items.length - 1;
        const emphasis = el.dataset.emphasis === 'true';

        tl.to(
          obj,
          {
            v: value,
            duration: emphasis ? 1.6 : 1.2,
            ease: 'expo.out',
            onUpdate: () => {
              el.querySelector('.stat-value')!.textContent = String(
                Math.round(obj.v)
              );
            },
          },
          i * 0.15
        );

        tl.fromTo(
          el.querySelector('.stat-label'),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          i * 0.15 + 1.0
        );

        if (isLast) {
          tl.to({}, { duration: 0.8 });
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="numbers"
      className="section section--full bg-hatch"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vh, 160px) clamp(20px, 4vw, 56px)',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--void)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(24px, 5vw, 80px)',
        }}
      >
        {stats.map((s, i) => {
          // First stat is biggest, emphasis (World Cup) is gold
          const isHero = i === 0;
          const isEmph = s.emphasis;
          const size = isHero ? 'clamp(72px, 10vw, 140px)' : 'clamp(56px, 7vw, 96px)';
          return (
            <div
              key={s.label}
              className="stat"
              data-value={s.value}
              data-emphasis={s.emphasis ? 'true' : 'false'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: isEmph ? 'flex-end' : 'flex-start',
                gridColumn: isHero ? 'span 2' : 'span 1',
                textAlign: isEmph ? 'right' : 'left',
              }}
            >
              <span
                className="stat-value tabular"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: size,
                  lineHeight: 0.9,
                  color: isEmph ? 'var(--gold-electric)' : 'var(--chalk)',
                  letterSpacing: '0.02em',
                }}
              >
                0
              </span>
              <span
                className="stat-label"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                  opacity: 0,
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}