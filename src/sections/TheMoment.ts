import { gsap, registerGSAP } from '../lib/gsap';

const base = import.meta.env.BASE_URL;

export function mountTheMoment(ctx: { root: HTMLElement; reduced: boolean }) {
  const section = ctx.root.querySelector<HTMLElement>('#moment')!;
  const reduced = ctx.reduced;

  section.classList.add('section', 'section--full');
  Object.assign(section.style, {
    position: 'relative',
    minHeight: '200vh',
    display: 'flex',
    flexDirection: 'column',
  } as CSSStyleDeclaration);

  section.innerHTML = `
    <div style="position:sticky;top:0;height:100vh;width:100%;overflow:hidden;">
      <img class="moment-image" src="${base}assest/gallery/messi-kissing-world-cup.jpg" alt="Lionel Messi kissing the FIFA World Cup trophy in Qatar, December 2022" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;" />
      <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, transparent 20%, transparent 60%, rgba(3,3,3,0.8) 100%);"></div>
      <div class="moment-text" style="position:absolute;left:0;right:0;bottom:8vh;text-align:center;padding:0 clamp(20px, 4vw, 56px);opacity:0;">
        <p style="margin:0;font-family:var(--font-body);font-size:clamp(11px,2.6vw,14px);letter-spacing:0.3em;padding-left:0.3em;color:var(--chalk);text-transform:uppercase;white-space:nowrap;">December 18, 2022</p>
        <p style="margin:10px 0 0;font-family:var(--font-body);font-size:clamp(9px,2vw,11px);letter-spacing:0.24em;padding-left:0.24em;color:var(--chalk-dim);text-transform:uppercase;white-space:nowrap;">Lusail Stadium, Qatar</p>
      </div>
    </div>
  `;

  const image = section.querySelector('.moment-image') as HTMLElement;
  const text = section.querySelector('.moment-text') as HTMLElement;

  if (reduced) {
    gsap.set(image, { clipPath: 'inset(0% 0 0% 0)' });
    gsap.set(text, { opacity: 1, y: 0 });
    return;
  }

  registerGSAP();
  gsap.fromTo(
    image,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: section, start: 'top 70%' } }
  );
  gsap.fromTo(
    text,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6, scrollTrigger: { trigger: section, start: 'top 70%' } }
  );
}
