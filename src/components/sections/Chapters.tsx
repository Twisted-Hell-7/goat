'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { chapters } from '@/lib/data';

export function Chapters() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const railEl = rail.current!;

      const getDistance = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to(railEl, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: true,
        },
      });

      // per-panel image parallax
      const panels = gsap.utils.toArray<HTMLElement>('.chapter-panel');
      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLImageElement>('.chapter-image');
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: 10 },
          {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="chapters"
      className="section"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--void)',
      }}
    >
      <div
        ref={track}
        style={{
          display: 'flex',
          height: '100%',
          width: `${chapters.length * 100}vw`,
          willChange: 'transform',
        }}
      >
        {chapters.map((c) => (
          <article
            key={c.era}
            className="chapter-panel"
            style={{
              width: '100vw',
              height: '100vh',
              flexShrink: 0,
              display: 'grid',
              gridTemplateColumns: '40% 60%',
              alignItems: 'stretch',
              position: 'relative',
            }}
          >
            {/* left — content */}
            <div
              style={{
                padding: 'clamp(40px, 8vh, 120px) clamp(24px, 4vw, 80px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 20,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                }}
              >
                {c.index}
              </span>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(56px, 8vw, 120px)',
                  lineHeight: 0.9,
                  color: 'var(--chalk)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                {c.era}
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: c.accent,
                  letterSpacing: '0.08em',
                }}
              >
                {c.years}
              </span>
              <blockquote
                style={{
                  margin: '16px 0 0',
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 2.4vw, 32px)',
                  lineHeight: 1.25,
                  color: 'var(--chalk)',
                  maxWidth: '40ch',
                }}
              >
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: '1px solid var(--gold-electric)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  width: 'fit-content',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    color: 'var(--gold-electric)',
                    textTransform: 'uppercase',
                  }}
                >
                  Key Stat
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'var(--chalk)',
                  }}
                >
                  {c.stat}
                </span>
              </div>
              {c.redCard && (
                <p
                  style={{
                    margin: '24px 0 0',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--scar-red)',
                    letterSpacing: '0.08em',
                  }}
                >
                  2006 World Cup · Red card vs Germany
                </p>
              )}
            </div>

            {/* right — image */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                className="chapter-image"
                src={c.image}
                alt={`${c.era}, ${c.years}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '120%',
                  height: '100%',
                  objectFit: 'cover',
                  willChange: 'transform',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to right, var(--void) 0%, transparent 12%, transparent 88%, var(--void) 100%)',
                }}
              />
            </div>
          </article>
        ))}
      </div>

      {/* progress rail */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: 'rgba(235,235,235,0.08)',
        }}
      >
        <div
          ref={rail}
          style={{
            height: '100%',
            width: '100%',
            background: 'var(--gold-electric)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
  );
}