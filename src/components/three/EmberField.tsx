'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const s = seeds[i];
      arr[ix + 1] += 0.003 + s * 0.004;
      arr[ix + 0] += Math.sin(t * 0.4 + s * 6.28) * 0.001;
      // recycle when out of frame
      if (arr[ix + 1] > 5) arr[ix + 1] = -5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    // subtle mouse-cluster shift
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      x * 0.05,
      0.04
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -y * 0.04,
      0.04
    );
  });

  useEffect(() => {
    const points = ref.current;
    return () => {
      points?.geometry.dispose();
      const mat = points?.material as THREE.Material | undefined;
      mat?.dispose();
    };
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#E8C547"
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function EmberField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <Particles />
      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}