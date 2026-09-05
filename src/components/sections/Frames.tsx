'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { frames } from '@/lib/data';

export function Frames() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    registerGSAP();
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.frame',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.0,
          ease: 'expo.inOut',
          stagger: { amount: 1.4, from: 'center' },
          scrollTrigger: {
            trigger: '.frames-grid',
            start: 'top 75%',
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const close = useCallback(() => setActiveIdx(null), []);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight')
        setActiveIdx((i) => (i === null ? null : (i + 1) % frames.length));
      if (e.key === 'ArrowLeft')
        setActiveIdx((i) =>
          i === null ? null : (i - 1 + frames.length) % frames.length
        );
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [activeIdx, close]);

  return (
    <section
      ref={root}
      id="frames"
      className="section"
      style={{
        padding: 'clamp(80px, 12vh, 160px) clamp(20px, 4vw, 56px)',
        background: 'var(--obsidian)',
      }}
    >
      <header
        style={{
          maxWidth: 1280,
          margin: '0 auto 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid rgba(235,235,235,0.12)',
          paddingBottom: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.9,
            color: 'var(--chalk)',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          Frames
        </h2>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            letterSpacing: '0.16em',
            color: 'var(--chalk-dim)',
            textTransform: 'uppercase',
          }}
        >
          11 / Moments
        </span>
      </header>

      <div
        className="frames-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          columnCount: 3,
          columnGap: 6,
        }}
      >
        {frames.map((f, i) => (
          <button
            key={f.src}
            className="frame"
            onClick={() => setActiveIdx(i)}
            data-cursor="view"
            aria-label={`Open: ${f.caption}`}
            style={{
              breakInside: 'avoid',
              display: 'block',
              marginBottom: 6,
              width: '100%',
              padding: 0,
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--void)',
            }}
          >
            <div
              className="frame-inner"
              style={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 600ms cubic-bezier(0.25, 0, 0, 1)',
              }}
            >
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 800ms cubic-bezier(0.25, 0, 0, 1)',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(3,3,3,0.7) 0%, transparent 30%)',
                }}
              />
              <div
                className="frame-caption"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '14px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--chalk)',
                  textAlign: 'left',
                  transform: 'translateY(100%)',
                  transition: 'transform 400ms cubic-bezier(0.25, 0, 0, 1)',
                }}
              >
                {f.caption}
              </div>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .frame:hover .frame-inner {
          transform: scale(1.04);
        }
        .frame:hover .frame-caption {
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .frames-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 560px) {
          .frames-grid {
            column-count: 1 !important;
          }
        }
      `}</style>

      {activeIdx !== null && (
        <Lightbox
          index={activeIdx}
          onClose={close}
          onPrev={() =>
            setActiveIdx((i) => (i === null ? null : (i - 1 + frames.length) % frames.length))
          }
          onNext={() =>
            setActiveIdx((i) => (i === null ? null : (i + 1) % frames.length))
          }
        />
      )}
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const f = frames[index];

  useEffect(() => {
    registerGSAP();
    if (overlay.current) {
      gsap.fromTo(
        overlay.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        overlay.current.querySelector('.lb-img'),
        { scale: 0.96 },
        { scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [index]);

  return (
    <div
      ref={overlay}
      role="dialog"
      aria-modal="true"
      aria-label={f.caption}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(3,3,3,0.96)',
        display: 'grid',
        placeItems: 'center',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        data-cursor="hover"
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          letterSpacing: '0.2em',
          color: 'var(--chalk-dim)',
          textTransform: 'uppercase',
        }}
      >
        Close ×
      </button>
      <span
        style={{
          position: 'absolute',
          top: 24,
          right: 96,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          letterSpacing: '0.2em',
          color: 'var(--chalk-dim)',
        }}
      >
        [{index + 1} / {frames.length}]
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        data-cursor="hover"
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          color: 'var(--chalk)',
        }}
      >
        ←
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        data-cursor="hover"
        style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          color: 'var(--chalk)',
        }}
      >
        →
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: 0,
          maxWidth: 'min(90vw, 1200px)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <img
          className="lb-img"
          src={f.src}
          alt={f.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
          }}
        />
        <figcaption
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--chalk)',
            textAlign: 'center',
          }}
        >
          {f.caption}
        </figcaption>
      </figure>
    </div>
  );
}