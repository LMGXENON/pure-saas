# img2threejs Staged Sculpting Pipeline Guide

> Procedural 2D-image-to-TypeScript Three.js model synthesis and staged sculpting quality gates.  
> Adapted from and compatible with **img2threejs** (by img2threejs, MIT License).

---

## 1. Pipeline Overview

The **img2threejs** workflow converts 2D reference images into clean, procedural Three.js TypeScript code through a disciplined multi-pass sculpting process with strict quality gates:

```
[2D Reference Image]
        │
        ▼
[Pass 1: Blockout] ──────────► Bounding hierarchy & volumetric mass
        │
        ▼
[Pass 2: Structural] ────────► Joints, bevels, cavities, and cuts
        │
        ▼
[Pass 3: Form Details] ──────► Buttons, ports, vents, indicators
        │
        ▼
[Pass 4: Materials & PBR] ───► Metalness, roughness, emissive accents
        │
        ▼
[Pass 5: Lighting & Rig] ────► Shadows, pivot points, interaction hooks
        │
        ▼
[Pass 6: Optimization] ──────► Geometry disposal, render loop, tick hook
        │
        ▼
[TypeScript Three.js Factory: createModel()]
```

---

## 2. Input Image Suitability Contract

Not all images are suitable for procedural 3D reconstruction. The model intake phase enforces these standards:

### Suitable Reference Images:
- **Hard-surface objects:** Hardware devices, electronic enclosures, tools, mechanical components, furniture, vehicles.
- **Lighting:** Even, diffuse studio lighting with visible contours and minimal harsh specular blooming.
- **Background:** High-contrast, clean or solid background that cleanly isolates object silhouettes.
- **Angle:** 3/4 isometric perspective or clean orthographic views (front/side/top).

### Unsuitable Reference Images (Halt & Reject):
- Extremely fuzzy, motion-blurred, or heavily filtered images.
- Pure amorphous liquids, dense smoke, or volumetric clouds without defined boundaries.
- Subjects obscured by heavy foreground obstructions.

---

## 3. The 6 Staged Sculpting Passes

### Pass 1: Blockout
- Establish the primary bounding volume ($W \times H \times D$) centered at the origin `(0, 0, 0)`.
- Use primitive Three.js geometries (`BoxGeometry`, `CylinderGeometry`, `SphereGeometry`) to map primary proportions.
- Do not add bevels, materials, or fine details during Blockout.

### Pass 2: Structural Articulation
- Create primary component separations (e.g. lid vs base, handle vs chassis).
- Add primary bevels and rounded corners using `ExtrudeGeometry` with `bevelEnabled: true` or compound geometric subtraction.
- Align pivot points so moving parts rotate naturally around their physical axes.

### Pass 3: Form Details & Secondary Features
- Carve secondary functional features: ports, grills, dials, buttons, screws, and display bezels.
- Group related functional parts into named sub-groups (`chassisGroup`, `displayGroup`, `controlGroup`).

### Pass 4: Materials & Surface Lighting
- Replace standard flat materials with PBR `MeshStandardMaterial` or `MeshPhysicalMaterial`.
- Calibrate material properties:
  - Matte Plastic: `roughness: 0.5`, `metalness: 0.0`
  - Anodized Aluminum: `roughness: 0.25`, `metalness: 0.85`
  - Polished Glass / Screen: `roughness: 0.1`, `metalness: 0.1`, `clearcoat: 1.0`
  - LED Indicator: `emissive: color`, `emissiveIntensity: 0.8`

### Pass 5: Interaction, Shadows & Sockets
- Enable `castShadow = true` and `receiveShadow = true` on appropriate meshes.
- Attach interactive collision volumes or bounding spheres for raycasting.
- Expose mount points ("sockets") for external UI labels or particle emitters.

### Pass 6: Optimization & Code Generation
- Ensure all created geometries and materials are tracked in a disposal list.
- Attach `userData.tick = (delta, elapsed) => void` for frame-independent animations.
- Export as a clean, self-contained TypeScript module without external model dependencies.

---

## 4. Pure SaaS 3D CLI Integration

Pure SaaS provides real commands to verify prerequisites, generate specs, and scaffold models:

```bash
# 1. Verify 3D prerequisites (Node, TypeScript, Three.js, Canvas/WebGL)
npx pure-saas 3d check

# 2. Analyze a reference image and generate an ObjectSculptSpec
npx pure-saas 3d spec ./reference-device.png --out ./device-spec.json

# 3. Scaffold a production-ready procedural Three.js component template
npx pure-saas 3d scaffold DeviceConsole --out ./src/components/DeviceConsole3D.tsx
```

---

## Attribution & License

Portions of this staged sculpting pipeline, image suitability contract, and quality gate methodology are adapted from [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs), released under the **MIT License**.  
Copyright (c) 2025-2026 img2threejs contributors.
