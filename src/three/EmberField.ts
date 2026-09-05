import * as THREE from 'three';

export function mountEmberField(host: HTMLElement) {
  const w = host.clientWidth;
  const h = host.clientHeight;
  if (!w || !h) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

  // particles
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    seeds[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    color: 0xe8c547,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // simple bloom-ish fakery: render a second pass at larger size and lower opacity
  const mat2 = new THREE.PointsMaterial({
    size: 0.12,
    color: 0xe8c547,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Points(geo, mat2);
  scene.add(glow);

  const pointer = { x: 0, y: 0 };
  const onMove = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('mousemove', onMove);

  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    const t = clock.getElapsedTime();
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const s = seeds[i];
      arr[ix + 1] += 0.003 + s * 0.004;
      arr[ix + 0] += Math.sin(t * 0.4 + s * 6.28) * 0.001;
      if (arr[ix + 1] > 5) arr[ix + 1] = -5;
    }
    geo.attributes.position.needsUpdate = true;

    points.rotation.y += (pointer.x * 0.05 - points.rotation.y) * 0.04;
    points.rotation.x += (-pointer.y * 0.05 - points.rotation.x) * 0.04;
    glow.rotation.copy(points.rotation);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  animate();

  const onResize = () => {
    const ww = host.clientWidth, hh = host.clientHeight;
    if (!ww || !hh) return;
    camera.aspect = ww / hh;
    camera.updateProjectionMatrix();
    renderer.setSize(ww, hh);
  };
  window.addEventListener('resize', onResize);

  // cleanup when host is removed
  const obs = new MutationObserver(() => {
    if (!document.body.contains(host)) {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      mat2.dispose();
      renderer.dispose();
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
}
