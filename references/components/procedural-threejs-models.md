# Procedural Three.js 3D Models Component Guide

> Procedural, code-only Three.js components and animation-ready 3D models written in TypeScript.  
> Adapted from and compatible with **img2threejs** (by img2threejs, MIT License).

---

## 1. Why Procedural Three.js?

Traditional 3D web workflows rely on multi-megabyte binary assets (`.gltf`, `.glb`, `.obj`), complex texture atlases, and slow external network fetches.

The **img2threejs** paradigm replaces heavy asset pipelines with **pure, code-only procedural Three.js**:
- **Zero Asset Bloat:** 100% written in TypeScript using Three.js geometric primitives (`BoxGeometry`, `CylinderGeometry`, `ExtrudeGeometry`, `LatheGeometry`).
- **Instantly Renderable:** Zero asset download delay; models instantiate in sub-millisecond execution.
- **Parametric & Interactive:** Dynamic properties (color tokens, scale, geometry counts, animation speed) can be bound directly to UI state and design tokens.
- **Production-Ready Hooks:** Emits standard `THREE.Group` objects with built-in `userData.tick(delta, elapsed)` animation methods and memory cleanup routines.

---

## 2. Prerequisites & Verification

Before using procedural 3D reconstruction or rendering:
1. **Three.js Installed:** `npm install three @types/three`
2. **TypeScript Support:** TypeScript 5.0+ with modern module resolution.
3. **Canvas / WebGL Context:** A valid HTML `<canvas>` element with WebGL 2.0 or WebGL 1.0 support.
4. **Environment Check:** Run `npx pure-saas 3d check` to verify your environment meets all requirements.

---

## 3. The Procedural Component Architecture

Every procedural 3D model conforms to a standardized TypeScript factory pattern:

```typescript
import * as THREE from 'three';

export interface ModelOptions {
  primaryColor?: string;
  accentColor?: string;
  metalness?: number;
  roughness?: number;
  scale?: number;
}

export interface ProceduralModel extends THREE.Group {
  userData: {
    tick: (delta: number, elapsed: number) => void;
    dispose: () => void;
  };
}

/**
 * Creates an interactive, procedural Three.js model.
 */
export function createProceduralModel(options: ModelOptions = {}): ProceduralModel {
  const group = new THREE.Group() as ProceduralModel;

  const {
    primaryColor = '#2563eb',
    accentColor = '#38bdf8',
    metalness = 0.6,
    roughness = 0.2,
    scale = 1.0,
  } = options;

  group.scale.setScalar(scale);

  // Materials ledger for clean lifecycle disposal
  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  const mainMaterial = new THREE.MeshStandardMaterial({
    color: primaryColor,
    metalness,
    roughness,
  });
  materials.push(mainMaterial);

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    metalness: 0.8,
    roughness: 0.1,
    emissive: accentColor,
    emissiveIntensity: 0.2,
  });
  materials.push(accentMaterial);

  // 1. Base Geometry (Blockout)
  const baseGeo = new THREE.BoxGeometry(2, 0.4, 1.4);
  geometries.push(baseGeo);
  const baseMesh = new THREE.Mesh(baseGeo, mainMaterial);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  // 2. Articulated Head / Indicator (Structural Form)
  const indicatorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 24);
  geometries.push(indicatorGeo);
  const indicatorMesh = new THREE.Mesh(indicatorGeo, accentMaterial);
  indicatorMesh.position.set(0.6, 0.4, 0);
  indicatorMesh.castShadow = true;
  group.add(indicatorMesh);

  // 3. Animation Tick Hook
  group.userData.tick = (delta: number, elapsed: number) => {
    // Subtle procedural float & rotation
    group.rotation.y = Math.sin(elapsed * 0.8) * 0.15;
    group.position.y = Math.sin(elapsed * 1.5) * 0.05;
    indicatorMesh.rotation.y += delta * 2;
  };

  // 4. Memory Disposal Lifecycle Hook
  group.userData.dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  };

  return group;
}
```

---

## 4. React / React Three Fiber Integration

To embed procedural Three.js components inside modern React web apps:

```tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createProceduralModel } from './createProceduralModel';

export const ProceduralModelCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Instantiate Procedural Model
    const model = createProceduralModel({ scale: 1.2 });
    scene.add(model);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (model.userData.tick) {
        model.userData.tick(delta, elapsed);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (model.userData.dispose) model.userData.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-80 relative rounded-2xl overflow-hidden" />;
};
```

---

## Attribution & License

Portions of this procedural Three.js component architecture, lifecycle hooks, and TypeScript patterns are adapted from [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs), released under the **MIT License**.  
Copyright (c) 2025-2026 img2threejs contributors.
