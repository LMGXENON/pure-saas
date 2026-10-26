# Pure SaaS: Interactive Backgrounds & Shaders Reference Guide

This reference guide catalogues high-craft, interactive WebGL, Canvas, and shader backgrounds curated from React Bits. It provides AI coding agents with production-ready background animations that replace generic purple/cyan blur blobs and low-effort AI slop with intentional, responsive physics and graphics engineering.

---

## 1. Background Craft Principles (Anti-Slop Standards)

1. **Restraint over Spectacle:** A background must serve the content, not fight it. Keep text contrast high (WCAG 2.2 AA >= 4.5:1 for body copy). Use low opacity washes or dark canvases with soft halos.
2. **Reduced-Motion Compliance:** Every animated background must respect `@media (prefers-reduced-motion: reduce)`. Either freeze the simulation on mount, render a settled frame, or fall back to an ambient static CSS gradient.
3. **Resource & GPU Hygiene:**
   - Always cancel `requestAnimationFrame` loops on unmount.
   - Disconnect `ResizeObserver` and `IntersectionObserver`.
   - Explicitly call `gl.getExtension('WEBGL_lose_context')?.loseContext()` and delete textures, framebuffers, and VAOs on component unmount.
   - Use `IntersectionObserver` to pause rendering when the background scrolls out of the active viewport.
4. **Interactive Responsiveness:** Enable pointer-follow and click shockwaves only where they feel tactile, natural, and physics-based.

---

## 2. Background Component Catalog

| Component | Tech / Deps | Best Fit Archetype | Visual Description | Reference File |
| :--- | :--- | :--- | :--- | :--- |
| **`<GradientASCII />`** | WebGL2 (0 deps) | Terminal, DevTool, Cyber | Soft gradient glows rendered with ASCII characters that scramble under cursor | [`references/backgrounds/gradient-ascii.md`](backgrounds/gradient-ascii.md) |
| **`<PatternWaves />`** | WebGL2 (`ogl`) | Editorial, Swiss, Agency | Lit halftone surface of dots, lines, or glyphs moving like draped silk | [`references/backgrounds/pattern-waves.md`](backgrounds/pattern-waves.md) |
| **`<Prism />`** | WebGL2 (0 deps) | Creative, Optical, Optics | Rotating 3D prism of glowing spectral light with configurable hue, shape, and physics | [`references/backgrounds/prism.md`](backgrounds/prism.md) |
| **`<Aurora />`** | WebGL2 (0 deps) | Minimal SaaS, Cloud, AI | Soft, calm aurora borealis flowing across header and drifting toward cursor | [`references/backgrounds/aurora.md`](backgrounds/aurora.md) |
| **`<LiquidChrome />`** | WebGL2 (0 deps) | Luxury, FinTech, Modern | Soft ribbons of molten liquid chrome swirling in a pool and catching light | [`references/backgrounds/liquid-chrome.md`](backgrounds/liquid-chrome.md) |
| **`<Iridescence />`** | WebGL2 (0 deps) | Web3, Creative, Studio | Liquid iridescent surface with shifting folds stirred by cursor | [`references/backgrounds/iridescence.md`](backgrounds/iridescence.md) |
| **`<Plasma />`** | WebGL2 (0 deps) | Deep Tech, AI, Dark Mode | Folds of satin light twisting slowly through the dark, turning with cursor | [`references/backgrounds/plasma.md`](backgrounds/plasma.md) |
| **`<Particles />`** | WebGL2 (0 deps) | Developer, Data, Systems | Drifting 3D field of particles with glow, twinkle, and constellation lines | [`references/backgrounds/particles.md`](backgrounds/particles.md) |
| **`<Hyperspeed />`** | Three.js | High-Speed, Infra, Speed | Night highway of light trails on a winding road that warps on interaction | [`references/backgrounds/hyperspeed.md`](backgrounds/hyperspeed.md) |
| **`<Dither />`** | WebGL2 (0 deps) | Retro, Hacker, Indie | Retro dithered waves with Bayer, halftone, line, and noise patterns | [`references/backgrounds/dither.md`](backgrounds/dither.md) |
| **`<DotGrid />`** | Canvas 2D (0 deps) | Productivity, Grid, Mac | Springy dot grid that flicks and drags through like jelly with shockwaves | [`references/backgrounds/dot-grid.md`](backgrounds/dot-grid.md) |
| **`<Ballpit />`** | Canvas 2D (0 deps) | Playful, Consumer, Fun | Soft-lit pit of physics balls you can shove, throw, and bounce | [`references/backgrounds/ballpit.md`](backgrounds/ballpit.md) |
| **`<Waves />`** | Canvas 2D (0 deps) | Fluid, Sound, Meditation | Dense flowing lines that sway like silk and bend around cursor | [`references/backgrounds/waves.md`](backgrounds/waves.md) |
| **`<Threads />`** | WebGL2 (0 deps) | Neural, Bio, Network | Flowing threads that fray apart and part around the cursor | [`references/backgrounds/threads.md`](backgrounds/threads.md) |
| **`<Topography />`** | WebGL2 (0 deps) | Geo, Maps, Spatial | 3D landscape drawn in glowing contour lines rising under cursor | [`references/backgrounds/topography.md`](backgrounds/topography.md) |

---

## 3. Quick Integration Pattern

When integrating any background into a modern React application:

```jsx
import React from 'react';
import GradientASCII from './components/GradientASCII';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 1. Background canvas pinned absolutely to edges with pointer-events-auto */}
      <div className="absolute inset-0 z-0">
        <GradientASCII
          colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
          shape="horizon"
          cellSize={18}
          density={0.8}
        />
      </div>

      {/* 2. Content overlay positioned above background with pointer-events-none on wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Next-Generation Infrastructure.
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
          Built for scale, verified for latency.
        </p>

        {/* 3. Interactive elements re-enable pointer events */}
        <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## 4. Retrieving Components via Pure SaaS CLI

You can retrieve full component source code, CSS, props, and shaders at any time using:

```bash
# Retrieve specific background references
npx pure-saas ref "gradient ascii"
npx pure-saas ref "pattern waves"
npx pure-saas ref "prism"
npx pure-saas ref "aurora"
npx pure-saas ref "liquid chrome"
npx pure-saas ref "iridescence"

# Or search all background guides
npx pure-saas ref "background"
```

For the complete library index from React Bits, refer to `https://reactbits.dev/llms.txt`.
