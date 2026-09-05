'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function TheMoment() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.moment-image',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.moment-text',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.6,
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
    <section
      ref={root}
      id="moment"
      className="section section--full"
      style={{
        position: 'relative',
        minHeight: '200vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          className="moment-image"
          src="/messi/assest/gallery/messi-kissing-world-cup.jpg"
          alt="Lionel Messi kissing the FIFA World Cup trophy in Qatar, December 2022"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, transparent 20%, transparent 60%, rgba(3,3,3,0.8) 100%)',
          }}
        />
        <div
          className="moment-text"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '10vh',
            textAlign: 'center',
            padding: '0 clamp(20px, 4vw, 56px)',
            opacity: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.2em',
              color: 'var(--chalk-dim)',
              textTransform: 'uppercase',
            }}
          >
            December 18, 2022
          </p>
          <p
            style={{
              margin: '8px 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.2em',
              color: 'var(--chalk-dim)',
              textTransform: 'uppercase',
            }}
          >
            Lusail Stadium, Qatar
          </p>
        </div>
      </div>
    </section>
  );
}