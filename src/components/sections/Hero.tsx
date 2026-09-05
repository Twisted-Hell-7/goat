'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EmberField = dynamic(
  () => import('@/components/three/EmberField').then((m) => m.EmberField),
  { ssr: false }
);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const tl = gsap.timeline({ delay: 0.85 });

    const letters = titleRef.current?.querySelectorAll<HTMLSpanElement>('.letter');
    if (letters && letters.length) {
      tl.fromTo(
        letters,
        { y: 160, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.06,
        },
        0
      );
    }

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.0
    );

    tl.fromTo(
      cueRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      1.4
    );

    // scroll cue pulse — 2s loop
    const cueLine = cueRef.current?.querySelector<HTMLElement>('.cue-line');
    if (cueLine) {
      gsap.to(cueLine, {
        scaleY: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'top center',
        delay: 1.8,
      });
    }

    // dismiss cue on first scroll
    const onScroll = () => {
      if (window.scrollY > 80) {
        gsap.to(cueRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => cueLine && gsap.killTweensOf(cueLine),
        });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced]);

  const title = 'MESSI';

  return (
    <section
      ref={root}
      id="hero"
      className="section section--full"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* z:0 — video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/goat/assest/goat-poster.jpg"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <source src="/goat/messi-hero-video.mp4" type="video/mp4" />
      </video>

      {/* z:10 — overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(3,3,3,0.55) 60%, #030303 100%), linear-gradient(to bottom, transparent 50%, #030303 100%)',
        }}
      />

      {/* z:20 — particles */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <EmberField />
      </div>

      {/* z:30 — title block */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '18vh',
          zIndex: 30,
          padding: '0 clamp(20px, 4vw, 56px)',
        }}
      >
        <div ref={titleRef} style={{ overflow: 'hidden' }}>
          <h1
            aria-label={title}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(72px, 14vw, 220px)',
              lineHeight: 0.85,
              letterSpacing: '0.02em',
              color: 'var(--chalk)',
              textTransform: 'uppercase',
            }}
          >
            {title.split('').map((ch, i) => (
              <span
                key={i}
                className="letter"
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>

        <div
          ref={subRef}
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            letterSpacing: '0.12em',
            color: 'var(--chalk-dim)',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          <span>LIONEL ANDRÉS MESSI · ROSARIO, 1987</span>
          <span style={{ color: 'var(--gold-electric)' }}>10</span>
        </div>
      </div>

      {/* z:40 — scroll cue */}
      <div
        ref={cueRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '4vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          opacity: 0,
        }}
      >
        <div
          className="cue-line"
          style={{
            width: 1,
            height: 48,
            background: 'var(--gold-electric)',
            transformOrigin: 'top center',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'var(--chalk-dim)',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}