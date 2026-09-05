export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number | boolean | null | undefined> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = String(v);
    else if (k === 'style' && typeof v === 'string') node.setAttribute('style', v);
    else if (k.startsWith('data-') || k.startsWith('aria-')) node.setAttribute(k, String(v));
    else if (k === 'html') node.innerHTML = String(v);
    else (node as any)[k] = v;
  }
  for (const c of children) {
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, any>,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  return el(tag, attrs, ...children);
}

export function on<K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement,
  type: K,
  handler: (e: WindowEventMap[K]) => void,
  opts?: AddEventListenerOptions | boolean
): () => void {
  target.addEventListener(type as string, handler as EventListener, opts);
  return () => target.removeEventListener(type as string, handler as EventListener);
}
