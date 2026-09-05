'use client';

import { useEffect, useRef, useState } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    registerGSAP();
    const tl = gsap.timeline({
      onComplete: () => {
        // small hold then exit
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
          delay: 0.2,
          onComplete: () => setDone(true),
        });
      },
    });
    tl.fromTo(
      fill.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }
    );
    // safety: if anything blocks, bail after 2s
    const bail = setTimeout(() => {
      if (root.current) {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => setDone(true),
        });
      }
    }, 2200);
    return () => clearTimeout(bail);
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--void)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        ref={fill}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '1px',
          width: '100%',
          background: 'var(--gold-electric)',
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
}