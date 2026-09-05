'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Coda() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.coda-title',
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.08em',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.coda-meta',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.0,
          delay: 0.4,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer
      ref={root}
      id="coda"
      className="section"
      style={{
        padding: 'clamp(80px, 14vh, 180px) clamp(20px, 4vw, 56px) 80px',
        background: 'var(--void)',
        borderTop: '1px solid rgba(235,235,235,0.08)',
        textAlign: 'center',
      }}
    >
      <h2
        className="coda-title"
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 12vw, 180px)',
          lineHeight: 0.9,
          color: 'var(--chalk)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        M E S S I
      </h2>
      <p
        style={{
          margin: '24px 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--chalk-dim)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        1987 —{' '}
        <span style={{ color: 'var(--gold-electric)' }}>still playing</span>
      </p>

      <div
        className="coda-meta"
        style={{
          marginTop: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          letterSpacing: '0.12em',
          color: 'var(--chalk-dim)',
          textTransform: 'uppercase',
          opacity: 0,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span>The Living Archive</span>
        <div style={{ display: 'flex', gap: 32 }}>
          <a
            href="https://github.com"
            data-cursor="hover"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            GitHub ↗
          </a>
          <a
            href="#top"
            data-cursor="hover"
            style={{ color: 'inherit' }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}