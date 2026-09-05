'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { argumentQuote, argumentAttribution, trophies } from '@/lib/data';

export function Argument() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.argument-word');
      gsap.set(words, { opacity: 0.12 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: '.argument-quote',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1.5,
        },
      });

      // trophy lines reveal
      gsap.fromTo(
        '.trophy-line',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.trophies',
            start: 'top 75%',
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const words = argumentQuote.split(' ');

  return (
    <section
      ref={root}
      id="argument"
      className="section section--full"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 14vh, 180px) clamp(20px, 4vw, 56px)',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        background: 'var(--void)',
      }}
    >
      <div
        className="argument-quote"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            letterSpacing: '0.2em',
            color: 'var(--chalk-dim)',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          The Argument
        </span>
        <blockquote
          style={{
            margin: 0,
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 4vw, 64px)',
            lineHeight: 1.08,
            color: 'var(--chalk)',
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="argument-word"
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {w}
            </span>
          ))}
        </blockquote>
        <p
          style={{
            marginTop: 32,
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--chalk-dim)',
            letterSpacing: '0.08em',
          }}
        >
          — {argumentAttribution}
        </p>
      </div>

      <div
        className="trophies"
        style={{
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
          paddingTop: 48,
          borderTop: '1px solid rgba(235,235,235,0.12)',
        }}
      >
        {trophies.map((t) => (
          <div
            key={t.name}
            className="trophy-line"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 0.6fr 1.6fr',
              padding: '14px 0',
              borderBottom: '1px solid rgba(235,235,235,0.08)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--chalk)',
              letterSpacing: '0.04em',
              opacity: 0,
            }}
          >
            <span>{t.name}</span>
            <span style={{ color: 'var(--gold-electric)', fontWeight: 600 }}>
              {t.count}
            </span>
            <span style={{ color: 'var(--chalk-dim)' }}>{t.years}</span>
          </div>
        ))}
      </div>
    </section>
  );
}