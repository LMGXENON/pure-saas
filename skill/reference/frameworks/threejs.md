# Threejs Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`threejs.csv`)
> Framework: Threejs
> Rules Count: 53 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Threejs** projects.

---

## Setup

### Pin the Three.js Package Version `[Critical]`
Install the exact current Three.js release with npm for bundler projects. If a browser CDN is unavoidable use an import map pinned to the same exact release instead of a floating URL.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.npmjs.com/package/three/v/0.185.1](https://www.npmjs.com/package/three/v/0.185.1)

- **Do:** Pin three@0.185.1 and keep core and addon imports on that release
- **Don't:** Use a floating latest URL or a legacy global build as the default production setup

**Recommended:**
```
npm install three@0.185.1
```

**Avoid:**
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

---

### Use CapsuleGeometry for Capsule Shapes `[Critical]`
CapsuleGeometry is part of the current Three.js geometry API and directly creates a capsule from radius length cap segments and radial segments.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/geometries/CapsuleGeometry](https://threejs.org/docs/#api/en/geometries/CapsuleGeometry)

- **Do:** Construct current capsule meshes with THREE.CapsuleGeometry
- **Don't:** Rebuild a standard capsule from separate cylinder and sphere meshes unless custom topology is required

**Recommended:**
```
const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8); const capsule = new THREE.Mesh(geometry, material);
```

**Avoid:**
```
const body = new THREE.CylinderGeometry(0.5, 0.5, 1); // unnecessary multi-mesh workaround
```

---

### Import OrbitControls from Three.js Addons `[Critical]`
OrbitControls is an addon and must be imported explicitly from the three/addons path while the core library is imported from three.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#examples/en/controls/OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

- **Do:** Import the named OrbitControls addon before constructing controls
- **Don't:** Expect THREE.OrbitControls to exist on the core namespace

**Recommended:**
```
import * as THREE from 'three'; import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; const controls = new OrbitControls(camera, renderer.domElement);
```

**Avoid:**
```
const controls = new THREE.OrbitControls(camera, renderer.domElement); // not exported by the core namespace
```

---

### Custom Drag Orbit Fallback `[High]`
When OrbitControls cannot be loaded implement spherical orbit using mousedown/mousemove/mouseup. The key is rotating in spherical coordinates so both horizontal AND vertical drag work correctly.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#examples/en/controls/OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

- **Do:** Rotate camera in spherical coordinates so both axes respond correctly to drag
- **Don't:** Move camera.position.x directly — vertical drag is silently ignored and the orbit is incorrect

**Recommended:**
```
let dragging = false; let prev = { x: 0, y: 0 }; const radius = camera.position.length(); let theta = 0; let phi = Math.PI / 2; canvas.addEventListener('mousedown', () => dragging = true); canvas.addEventListener('mouseup', () => dragging = false); canvas.addEventListener('mousemove', e => { if (!dragging) return; theta -= (e.clientX - prev.x) * 0.005; phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi - (e.clientY - prev.y) * 0.005)); camera.position.set(radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta)); camera.lookAt(scene.position); prev = { x: e.clientX, y: e.clientY }; });
```

**Avoid:**
```
let dragging = false; let prev = { x: 0, y: 0 }; canvas.addEventListener('mousemove', e => { if (!dragging) return; camera.position.x += (e.clientX - prev.x) * 0.005; camera.lookAt(scene.position); prev = { x: e.clientX, y: e.clientY }; }); // BUG: Y-drag ignored; orbit is a horizontal slide not a sphere
```

---

### Use ESM Imports with Bundlers or Import Maps `[Critical]`
Import Three.js from three in bundler projects. For a no-build browser page define an exact-version import map for three and three/addons/ before importing modules.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/manual/en/installation.html](https://threejs.org/manual/en/installation.html)

- **Do:** Use one ESM dependency graph with core and addons pinned to the same release
- **Don't:** Mix global script builds with ES module imports or map core and addons to different versions

**Recommended:**
```
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/"}}</script> <script type="module">import * as THREE from 'three'; import { OrbitControls } from 'three/addons/controls/OrbitControls.js';</script>
```

**Avoid:**
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script type="module">import * as THREE from 'three';</script>
```

---

### Single Renderer Per Page `[Critical]`
Create one WebGLRenderer instance for the lifetime of the page. Multiple renderers compete for the browser GPU context limit (8–16 contexts) and cause context-lost errors especially on mobile.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)

- **Do:** Reuse a single renderer and swap scene content instead of recreating the renderer
- **Don't:** Create a new renderer on each component mount or scene transition

**Recommended:**
```
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(canvas.clientWidth, canvas.clientHeight); // renderer lives for the page lifetime
```

**Avoid:**
```
function showScene() { const renderer = new THREE.WebGLRenderer(); document.body.appendChild(renderer.domElement); } showScene(); showScene(); // two GPU contexts — crashes on mobile
```

---

### Pixel Ratio Cap at 2 `[High]`
Cap devicePixelRatio at 2. Retina displays report 3x or higher. Going from 2x to 3x multiplies pixel count by 2.25x with no visible quality improvement at normal viewing distance.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio)

- **Do:** Apply Math.min(window.devicePixelRatio, 2) — cap is at 2 not at 3
- **Don't:** Pass window.devicePixelRatio directly without any cap

**Recommended:**
```
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

**Avoid:**
```
renderer.setPixelRatio(window.devicePixelRatio); // 3x display = 9 pixels per CSS pixel = 2.25x GPU cost for zero quality gain
```

---

### Alpha Canvas Plus CSS Background `[Medium]`
Set alpha:true on the renderer and control the background color through CSS rather than a renderer clear color. This composites the canvas correctly over any HTML content behind it.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setClearColor](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setClearColor)

- **Do:** Set alpha:true on renderer and let body or a parent div provide the background color
- **Don't:** Set a solid renderer clear color when the canvas must composite over HTML behind it

**Recommended:**
```
const renderer = new THREE.WebGLRenderer({ alpha: true }); renderer.setClearColor(0x000000, 0); // fully transparent canvas // body { background: #0d0d0d; } handles the visible color
```

**Avoid:**
```
renderer.setClearColor(0x111827); // fully opaque — HTML behind the canvas is blocked
```

---

## Camera

### Aspect Ratio on Resize `[High]`
Always update camera.aspect and call camera.updateProjectionMatrix() inside every resize handler. A stale aspect ratio causes the entire scene to appear stretched or squashed horizontally.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/cameras/PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)

- **Do:** Update camera.aspect then call updateProjectionMatrix() on every resize
- **Don't:** Let aspect ratio become stale after the browser window changes size

**Recommended:**
```
window.addEventListener('resize', () => { camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(canvas.clientWidth, canvas.clientHeight); });
```

**Avoid:**
```
// No resize handler — scene stretches to fill a wider window without correcting the projection
```

---

### FOV Range 45 to 75 `[Medium]`
Use a field of view between 45 and 75 degrees. Below 45 creates compressed telephoto distortion. Above 90 creates visible fisheye distortion at frame edges.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/cameras/PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)

- **Do:** Start at 75 for general interactive scenes; use 45–55 for product close-ups
- **Don't:** Use FOV above 90 or below 30 without a deliberate artistic reason

**Recommended:**
```
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // general const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000); // product shot
```

**Avoid:**
```
const camera = new THREE.PerspectiveCamera(120, aspect, 0.1, 1000); // fisheye distortion at all edges
```

---

### Explicit Position and lookAt `[Medium]`
Always set an explicit camera position and call camera.lookAt() before the first render. The default camera at the origin pointing down -Z makes subjects at arbitrary coordinates invisible or tiny.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/cameras/Camera.lookAt](https://threejs.org/docs/#api/en/cameras/Camera.lookAt)

- **Do:** Set camera.position.set() and camera.lookAt() to frame the subject before the first render
- **Don't:** Leave the camera at default position (0 0 0) with no lookAt — subject may be behind the camera or microscopic

**Recommended:**
```
camera.position.set(0, 1.5, 5); camera.lookAt(new THREE.Vector3(0, 0, 0));
```

**Avoid:**
```
// No position or lookAt set — subject at y:2 is behind or above the default camera view
```

---

### OrbitControls vs GSAP Camera Rig `[High]`
Use OrbitControls for model viewers and exploratory scenes where the user needs free-look. Use a GSAP scroll-driven camera rig for product reveals or storytelling where the camera path must stay fixed.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#examples/en/controls/OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

- **Do:** Import OrbitControls from three/addons and match the camera control approach to the scene's UX intent
- **Don't:** Use OrbitControls for a scripted reveal where users can orbit away before it completes

**Recommended:**
```
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; // call controls.update() in animate()
```

**Avoid:**
```
const controls = new THREE.OrbitControls(camera, renderer.domElement); // legacy global API and wrong control model for a scripted reveal
```

---

## Geometry

### Never Create Geometry Per Frame `[Critical]`
Creating a new geometry inside animate() allocates a fresh GPU buffer every frame and exhausts VRAM within seconds. Create all geometry exactly once before the loop starts. Use attribute mutation if positions must change per frame.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)

- **Do:** Create all geometry before the animation loop; mutate BufferAttribute arrays in-place if needed
- **Don't:** Call any new XxxGeometry() constructor inside the animation loop

**Recommended:**
```
const geo = new THREE.SphereGeometry(1, 32, 32); // created once const mesh = new THREE.Mesh(geo, mat); scene.add(mesh); const timer = new THREE.Timer(); function animate(timestamp) { requestAnimationFrame(animate); timer.update(timestamp); mesh.rotation.y += timer.getDelta() * 0.8; // delta time renderer.render(scene, camera); }
```

**Avoid:**
```
function animate() { requestAnimationFrame(animate); const geo = new THREE.BoxGeometry(1, 1, 1); // NEW GPU buffer every frame — VRAM exhaustion }
```

---

### Share Geometry Across Meshes `[Critical]`
When multiple objects share the same shape create one geometry instance and pass it to every Mesh. Each Mesh gets its own transform and material while all share a single GPU buffer.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)

- **Do:** Create one geometry and pass the same reference to every Mesh constructor
- **Don't:** Create a separate identical geometry inside a loop for each object

**Recommended:**
```
const geo = new THREE.BoxGeometry(1, 1, 1); // one GPU buffer for (let i = 0; i < 200; i++) { const m = new THREE.Mesh(geo, mat); m.position.set(Math.random() * 10, 0, Math.random() * 10); scene.add(m); }
```

**Avoid:**
```
for (let i = 0; i < 200; i++) { const geo = new THREE.BoxGeometry(1, 1, 1); // 200 separate GPU buffers scene.add(new THREE.Mesh(geo, mat)); }
```

---

### dispose on Scene Removal `[Critical]`
Call geometry.dispose() and material.dispose() and texture.dispose() for every texture map when removing objects from the scene. Three.js never releases GPU resources automatically — they stay in VRAM until explicitly freed.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/BufferGeometry.dispose](https://threejs.org/docs/#api/en/core/BufferGeometry.dispose)

- **Do:** Dispose of geometry + material + every texture map before calling scene.remove()
- **Don't:** Call scene.remove() alone without any dispose calls

**Recommended:**
```
function removeMesh(mesh) { scene.remove(mesh); mesh.geometry.dispose(); if (mesh.material.map) mesh.material.map.dispose(); if (mesh.material.normalMap) mesh.material.normalMap.dispose(); mesh.material.dispose(); }
```

**Avoid:**
```
scene.remove(mesh); // geometry and all texture maps stay in GPU VRAM forever
```

---

### Segment Count Budget `[Medium]`
Use the minimum segment count that achieves the desired silhouette quality. Hero objects: 32–64 segments. Background objects: 8–16. Particle stand-ins: 6–8. High counts on background geometry waste GPU draw calls with zero visible benefit.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/geometries/SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry)

- **Do:** Apply a tiered segment budget based on the visual priority of each object in the scene
- **Don't:** Default every sphere and cylinder to 64+ segments regardless of its role

**Recommended:**
```
const bgSphere = new THREE.SphereGeometry(0.5, 8, 8); // background const heroSphere = new THREE.SphereGeometry(1, 64, 64); // foreground product
```

**Avoid:**
```
const particleSphere = new THREE.SphereGeometry(0.1, 64, 64); // 64 segments × 1000 particles = massive overdraw
```

---

### BufferGeometry for Custom Vertex Data `[High]`
For custom shapes use BufferGeometry with typed BufferAttribute data for positions normals colors and other vertex attributes.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)

- **Do:** Use THREE.BufferGeometry with Float32Array-backed attributes for custom vertex data
- **Don't:** Reference or instantiate the removed THREE.Geometry class

**Recommended:**
```
const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3)); geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
```

**Avoid:**
```
const geo = new THREE.Geometry(); geo.vertices.push(new THREE.Vector3(0, 0, 0)); // removed legacy API
```

---

## Materials

### MeshBasicMaterial vs MeshStandardMaterial `[Medium]`
MeshBasicMaterial ignores all lights and is significantly cheaper — use it for UI overlays HUDs and flat-colored decorative elements. MeshStandardMaterial is PBR-accurate and requires lights. Never use StandardMaterial where BasicMaterial suffices.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/materials/MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)

- **Do:** Use MeshBasicMaterial for any object that does not need lighting; use MeshStandardMaterial for physical objects
- **Don't:** Apply MeshStandardMaterial to flat UI elements that never receive light — lights still run for them

**Recommended:**
```
const uiMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // no lighting cost const physMat = new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.4, metalness: 0.6 });
```

**Avoid:**
```
const mat = new THREE.MeshStandardMaterial({ color: 0xffffff }); // on a 2D HUD card — lighting calculation runs with no visual benefit
```

---

### Share Material Instances `[High]`
Share one material instance across all meshes that have identical properties. Call mat.clone() only when individual meshes genuinely need different property values. Duplicate materials waste GPU VRAM.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/materials/Material](https://threejs.org/docs/#api/en/materials/Material)

- **Do:** Assign the same material reference to all meshes with identical visual properties
- **Don't:** Create a new material inside a loop for objects that look identical

**Recommended:**
```
const mat = new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.5 }); meshA.material = mat; meshB.material = mat; meshC.material = mat; // one GPU material
```

**Avoid:**
```
for (const m of meshes) { m.material = new THREE.MeshStandardMaterial({ color: 0x4f46e5 }); } // N redundant GPU materials
```

---

### Dispose Textures Explicitly `[High]`
Textures are the single largest consumer of GPU VRAM in most Three.js scenes. Call texture.dispose() when switching scenes or removing objects — Three.js does not garbage-collect GPU resources automatically.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/textures/Texture.dispose](https://threejs.org/docs/#api/en/textures/Texture.dispose)

- **Do:** Track all loaded textures and call dispose() on each one during scene teardown or on object removal
- **Don't:** Load textures without any cleanup path — they persist in VRAM for the entire page lifetime

**Recommended:**
```
const tex = new THREE.TextureLoader().load('img.jpg'); mesh.material.map = tex; // on teardown: tex.dispose(); mesh.material.dispose();
```

**Avoid:**
```
const tex = new THREE.TextureLoader().load('img.jpg'); scene.remove(mesh); // tex occupies GPU VRAM until page reload
```

---

## Lighting

### Ambient Plus Directional Minimum `[Critical]`
Any scene using MeshStandardMaterial or MeshPhongMaterial requires at minimum one AmbientLight (fill) and one DirectionalLight (shading direction). Without both the objects render as solid black — the material is there but no light reaches it.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/lights/DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)

- **Do:** Add AmbientLight for fill and DirectionalLight for shading whenever PBR or Phong materials are used
- **Don't:** Use MeshStandardMaterial without adding any lights to the scene

**Recommended:**
```
scene.add(new THREE.AmbientLight(0xffffff, 0.4)); const dirLight = new THREE.DirectionalLight(0xffffff, 1.0); dirLight.position.set(5, 10, 7.5); scene.add(dirLight);
```

**Avoid:**
```
const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x4f46e5 })); scene.add(mesh); // renders completely black — no lights in scene
```

---

### Enable shadowMap Before castShadow `[High]`
renderer.shadowMap.enabled = true must be set before any castShadow or receiveShadow flags. Without it the shadow map is never allocated and all shadow flags are silently ignored. Keep shadowMap.type at PCFShadowMap (the default): PCFSoftShadowMap is deprecated since r182 and falls back to PCFShadowMap with a console warning. For softer edges raise light.shadow.radius or use VSMShadowMap.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap)

- **Do:** Set renderer.shadowMap.enabled = true first then set castShadow and receiveShadow on lights and meshes
- **Don't:** Set castShadow on a light or mesh without enabling renderer.shadowMap.enabled — shadows never render

**Recommended:**
```
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap; // default dirLight.castShadow = true; dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048; dirLight.shadow.radius = 2; // optional: softer PCF edges heroMesh.castShadow = true; ground.receiveShadow = true;
```

**Avoid:**
```
dirLight.castShadow = true; heroMesh.castShadow = true; // renderer.shadowMap.enabled never set — shadows silently do not render
```

---

### Selective Shadow Casting `[High]`
Shadow map rendering redraws the entire scene from the light's perspective every frame. Enable castShadow only on the primary directional light and receiveShadow only on hero meshes and the ground plane.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap)

- **Do:** Enable shadows only on the key light and the most important meshes
- **Don't:** Enable castShadow and receiveShadow on every object in the scene including particles

**Recommended:**
```
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap; dirLight.castShadow = true; heroMesh.castShadow = true; ground.receiveShadow = true; // particles and background meshes: no shadow flags
```

**Avoid:**
```
for (const m of allMeshes) { m.castShadow = true; m.receiveShadow = true; } // shadow map pass over particle system — expensive with no visible gain
```

---

### Skip Lights for MeshBasicMaterial `[Low]`
MeshBasicMaterial completely ignores all scene lights. Adding lights solely to illuminate BasicMaterial objects wastes a light pass on every frame with zero visible effect.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/materials/MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)

- **Do:** Omit lights entirely when every material in the scene is MeshBasicMaterial
- **Don't:** Add AmbientLight and DirectionalLight to a scene that uses only MeshBasicMaterial

**Recommended:**
```
// Scene uses only MeshBasicMaterial — no lights needed const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); const mesh = new THREE.Mesh(geo, mat); scene.add(mesh); // MeshBasicMaterial is always fully lit by definition
```

**Avoid:**
```
scene.add(new THREE.AmbientLight(0xffffff, 1.0)); // wasted per-frame light pass — BasicMaterial ignores it entirely
```

---

## Raycasting

### Single Shared Raycaster `[Critical]`
Create exactly one Raycaster instance outside all event handlers. Store mouse coordinates in pointermove (cheap). Call setFromCamera and intersectObjects together inside the animate() loop — once per frame instead of once per mouse event.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)

- **Do:** Create one Raycaster; store mouse in pointermove; call setFromCamera + intersectObjects inside animate()
- **Don't:** Create a new THREE.Raycaster() inside a mousemove handler or call setFromCamera inside the event listener

**Recommended:**
```
const raycaster = new THREE.Raycaster(); const mouse = new THREE.Vector2(); canvas.addEventListener('pointermove', e => { // only store coords — no raycasting here mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1; mouse.y = -(e.clientY / canvas.clientHeight) * 2 + 1; }); // setFromCamera and intersectObjects run once per frame in animate()
```

**Avoid:**
```
window.addEventListener('mousemove', e => { const rc = new THREE.Raycaster(); // new allocation per event rc.setFromCamera(mouse, camera); rc.intersectObjects(targets, true); // fires 200+ times/sec });
```

---

### NDC Mouse Coordinates `[Critical]`
Raycasting requires mouse in Normalized Device Coordinates: X from -1 (left) to +1 (right) and Y from +1 (top) to -1 (bottom). The Y axis is inverted relative to screen space. A missing negation on Y causes all raycasts to miss or hit the wrong objects.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/Raycaster.setFromCamera](https://threejs.org/docs/#api/en/core/Raycaster.setFromCamera)

- **Do:** Apply the full NDC formula — including the negation on the Y axis
- **Don't:** Forget to negate Y — raycasting appears to work but hits objects mirrored vertically

**Recommended:**
```
mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1; mouse.y = -(e.clientY / canvas.clientHeight) * 2 + 1; // Y is INVERTED
```

**Avoid:**
```
mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1; mouse.y = (e.clientY / canvas.clientHeight) * 2 - 1; // BUG: Y not negated — raycasting is mirrored
```

---

### setFromCamera and intersectObjects in animate `[Critical]`
Call raycaster.setFromCamera(mouse camera) and then raycaster.intersectObjects(targets true) inside the animate() loop. setFromCamera must come before intersectObjects every frame — without it the raycaster uses a stale ray direction.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)

- **Do:** Call setFromCamera then intersectObjects in order inside every animate() frame
- **Don't:** Call intersectObjects without calling setFromCamera first — the raycaster uses a stale or zero ray

**Recommended:**
```
function animate() { requestAnimationFrame(animate); raycaster.setFromCamera(mouse, camera); // update ray direction first const hits = raycaster.intersectObjects(targets, true); // then test intersections if (hits.length > 0) { document.body.style.cursor = 'pointer'; } else { document.body.style.cursor = 'auto'; } renderer.render(scene, camera); }
```

**Avoid:**
```
function animate() { requestAnimationFrame(animate); const hits = raycaster.intersectObjects(targets, true); // BUG: setFromCamera never called — stale ray — hits is always empty renderer.render(scene, camera); }
```

---

### Recursive Flag for Groups and GLTF `[High]`
Pass true as the second argument to intersectObjects when testing Groups or GLTF loaded models. Geometry lives on child Mesh objects — without recursive:true the parent group is tested but has no geometry and hits is always empty.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/Raycaster.intersectObjects](https://threejs.org/docs/#api/en/core/Raycaster.intersectObjects)

- **Do:** Use intersectObjects(targets true) for Groups or any loaded model
- **Don't:** Raycast against a parent Group without the recursive flag

**Recommended:**
```
const hits = raycaster.intersectObjects(scene.children, true); // catches all descendant meshes
```

**Avoid:**
```
const hits = raycaster.intersectObjects([modelGroup]); // recursive defaults to false — misses all children
```

---

### Cursor Feedback on Hover `[Medium]`
Set document.body.style.cursor = 'pointer' when intersections are found and reset to 'auto' when none are found. Without cursor feedback users cannot discover that 3D objects are interactive.

**Applies to:** threejs 0.185.1
**Documentation:** [https://developer.mozilla.org/en-US/docs/Web/CSS/cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

- **Do:** Update cursor to pointer on hit; reset to auto on miss in the same animate loop block
- **Don't:** Run raycasting and read hits without ever updating the cursor style

**Recommended:**
```
if (hits.length > 0) { document.body.style.cursor = 'pointer'; } else { document.body.style.cursor = 'auto'; }
```

**Avoid:**
```
raycaster.setFromCamera(mouse, camera); raycaster.intersectObjects(targets, true); // hits ignored — cursor never changes — objects feel non-interactive
```

---

## Animation

### requestAnimationFrame Loop Only `[Critical]`
Drive the render loop exclusively with requestAnimationFrame or renderer.setAnimationLoop(). Never use setInterval or setTimeout — they are not synchronized to the display refresh rate and keep running when the tab is hidden draining battery.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop)

- **Do:** Use requestAnimationFrame or renderer.setAnimationLoop() as the sole render loop driver
- **Don't:** Use setInterval or setTimeout for render timing

**Recommended:**
```
function animate() { requestAnimationFrame(animate); renderer.render(scene, camera); } animate();
```

**Avoid:**
```
setInterval(() => renderer.render(scene, camera), 16); // not display-synced; runs at full speed even when tab is hidden
```

---

### THREE.Timer for Delta Time `[High]`
Use THREE.Timer and timer.getDelta() for all time-based motion. THREE.Clock is deprecated since r183 and logs a warning. A hardcoded increment like += 0.01 runs at 2x speed on 120Hz displays and at unpredictable speed when frames drop under load. CRITICAL: call timer.update(timestamp) exactly ONCE at the top of every animate() frame before reading the timer. getDelta() and getElapsed() then return stable values for the whole frame and can be read any number of times — skipping update() leaves the delta stale and calling update() twice in one frame makes the second delta ~0.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/Timer](https://threejs.org/docs/#api/en/core/Timer)

- **Do:** Call timer.update(timestamp) once at the top of animate(); read timer.getDelta() into dt and reuse dt everywhere in that frame
- **Don't:** Keep using the deprecated THREE.Clock or call timer.update() more than once per frame

**Recommended:**
```
const timer = new THREE.Timer(); timer.connect(document); // optional: no huge delta after the tab was hidden function animate(timestamp) { requestAnimationFrame(animate); timer.update(timestamp); // ONCE per frame const dt = timer.getDelta(); mesh.rotation.y += dt * 0.8; particles.rotation.y += dt * 0.1; // reuse dt renderer.render(scene, camera); }
```

**Avoid:**
```
function animate() { requestAnimationFrame(animate); mesh.rotation.y += 0.01; // 0.01 rad/frame — runs 2x faster on 120Hz than on 60Hz }
```

---

### Lerp for Smooth Pointer Follow `[Medium]`
Use value += (target - value) * alpha each frame to smoothly interpolate toward a moving target. An alpha of 0.03–0.1 produces organic easing for camera follow pointer-tracking and hover scale effects without requiring GSAP.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/math/MathUtils.lerp](https://threejs.org/docs/#api/en/math/MathUtils.lerp)

- **Do:** Apply the lerp formula each frame with a small alpha for smooth organic motion
- **Don't:** Snap a value directly to the target producing an instant jarring jump

**Recommended:**
```
// In animate(): cameraTargetX = mouse.x * 3; camera.position.x += (cameraTargetX - camera.position.x) * 0.05; camera.position.y += (cameraTargetY - camera.position.y) * 0.05; camera.lookAt(scene.position);
```

**Avoid:**
```
// In animate(): camera.position.x = mouse.x * 3; // instant snap — jarring with no easing
```

---

### GSAP for Multi-Step Sequences `[High]`
Use GSAP timelines for any animation with more than two sequential steps or for scroll-linked camera paths. GSAP timelines can be paused reversed and scrubbed — far more maintainable than boolean state machines.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.npmjs.com/package/gsap](https://www.npmjs.com/package/gsap)

- **Do:** Use GSAP timelines for sequences with more than two steps and for scroll-driven animations
- **Don't:** Implement multi-step sequences with boolean flags and manual frame counters

**Recommended:**
```
const tl = gsap.timeline({ defaults: { ease: 'power2.out' } }); tl.from(mesh.position, { y: -3, duration: 1 }) .to(mesh.rotation, { y: Math.PI, duration: 1 }, '-=0.3') .to(camera.position, { z: 2, duration: 1.5 });
```

**Avoid:**
```
let step = 0; let t = 0; function animate() { if (step === 0 && (t += 0.01) >= 1) step = 1; } // grows unmanageable with 3+ steps
```

---

### Pause Render Loop on Tab Hidden `[High]`
Use renderer.setAnimationLoop() as the loop driver so you can pass null to pause and a function to resume. Continuous rendering in a hidden tab wastes CPU GPU and battery with no user benefit.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop)

- **Do:** Use renderer.setAnimationLoop(animate) to drive the loop; pass null to pause on visibilitychange
- **Don't:** Drive with internal requestAnimationFrame and never stop the loop when the tab is hidden

**Recommended:**
```
const timer = new THREE.Timer(); timer.connect(document); // resets on tab return so the first delta after resume is not huge renderer.setAnimationLoop(animate); // use setAnimationLoop as the driver — not requestAnimationFrame inside animate function animate(timestamp) { timer.update(timestamp); const dt = timer.getDelta(); renderer.render(scene, camera); } document.addEventListener('visibilitychange', () => { if (document.hidden) renderer.setAnimationLoop(null); else renderer.setAnimationLoop(animate); });
```

**Avoid:**
```
function animate() { requestAnimationFrame(animate); // self-referencing RAF cannot be stopped externally renderer.render(scene, camera); } animate(); // runs forever in background tab — drains battery
```

---

## GSAP

### Load GSAP Before Scene Script `[Critical]`
Load GSAP from its own CDN script tag before your scene script. In bundler projects install via npm and import. GSAP is a completely separate library from Three.js — never try to import it from the Three.js package.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.npmjs.com/package/gsap](https://www.npmjs.com/package/gsap)

- **Do:** Load GSAP CDN before the scene script; or npm install gsap and import separately
- **Don't:** Import gsap from three or expect it to be defined without a separate load

**Recommended:**
```
<!-- CDN: load GSAP before your scene script --> <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script> <!-- Bundler: --> // import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
```

**Avoid:**
```
import gsap from 'three'; // undefined — GSAP has nothing to do with Three.js
```

---

### Register ScrollTrigger Before Use `[Critical]`
Call gsap.registerPlugin(ScrollTrigger) once at the top of your script before any scrollTrigger config object. Without registration the ScrollTrigger name is undefined and the tween throws immediately.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.npmjs.com/package/gsap](https://www.npmjs.com/package/gsap)

- **Do:** Call gsap.registerPlugin(ScrollTrigger) as the first line before any gsap.to/from/timeline with scrollTrigger
- **Don't:** Include scrollTrigger config in gsap.to() calls without first registering the plugin

**Recommended:**
```
gsap.registerPlugin(ScrollTrigger); gsap.to(camera.position, { z: 2, scrollTrigger: { trigger: '.hero-section', scrub: 1 } });
```

**Avoid:**
```
gsap.to(mesh.position, { scrollTrigger: { trigger: '.section', scrub: true } }); // TypeError: ScrollTrigger is not a constructor — not registered
```

---

### Tween Three.js Properties Directly `[Medium]`
GSAP can tween any numeric JavaScript property including mesh.position.x mesh.rotation.y and material.opacity. No wrapper or adaptor is needed. Note: to tween material.opacity the material must have transparent:true set before the tween starts.

**Applies to:** threejs 0.185.1
**Documentation:** [https://gsap.com/docs/v3/GSAP/gsap.to()](https://gsap.com/docs/v3/GSAP/gsap.to())

- **Do:** Pass Three.js object properties directly to gsap.to(); set transparent:true before tweening opacity
- **Don't:** Use a plain proxy object then manually copy values to Three.js properties every frame

**Recommended:**
```
gsap.to(mesh.rotation, { y: Math.PI * 2, duration: 2, ease: 'power1.inOut' }); mesh.material.transparent = true; // required before tweening opacity gsap.to(mesh.material, { opacity: 0, duration: 1 });
```

**Avoid:**
```
const tw = { v: 0 }; gsap.to(tw, { v: Math.PI * 2, onUpdate: () => mesh.rotation.y = tw.v }); // unnecessary proxy wrapper
```

---

### scrub for Scroll-Driven Camera Path `[High]`
Use scrub:true or scrub:1 to link camera movement continuously to scroll position as a 0–1 ratio. scrub:1 adds a 1-second lag for cinematic smoothness. onEnter/onLeave fire only once and create jarring snaps — not the right tool for a camera path.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.npmjs.com/package/gsap](https://www.npmjs.com/package/gsap)

- **Do:** Use scrub:1 for any scroll-controlled camera movement
- **Don't:** Use onEnter or onLeave callbacks for camera motion — they snap instead of scrubbing

**Recommended:**
```
gsap.registerPlugin(ScrollTrigger); gsap.to(camera.position, { x: 5, y: 2, z: 0, ease: 'none', scrollTrigger: { trigger: '.canvas-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1 } });
```

**Avoid:**
```
gsap.to(camera.position, { z: 0, scrollTrigger: { trigger: '.section', onEnter: () => {} } }); // fires once at scroll threshold — not a continuous scrub
```

---

## Performance

### InstancedMesh for Repeated Objects `[High]`
Use THREE.InstancedMesh when rendering 50 or more identical objects. It submits all N transforms in one draw call instead of N draw calls and reduces CPU-GPU communication overhead dramatically.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/objects/InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)

- **Do:** Use InstancedMesh for any group of 50+ meshes sharing the same geometry and material
- **Don't:** Create 50+ separate Mesh objects with the same geometry and material

**Recommended:**
```
const COUNT = 500; const iMesh = new THREE.InstancedMesh(geo, mat, COUNT); const matrix = new THREE.Matrix4(); for (let i = 0; i < COUNT; i++) { matrix.setPosition(Math.random()*10, Math.random()*10, Math.random()*10); iMesh.setMatrixAt(i, matrix); } iMesh.instanceMatrix.needsUpdate = true; scene.add(iMesh);
```

**Avoid:**
```
for (let i = 0; i < 500; i++) { scene.add(new THREE.Mesh(geo, mat)); } // 500 separate draw calls per frame
```

---

### Tone Mapping and Output Color Space `[Medium]`
Three.js color management is enabled by default. Keep working colors in the linear-sRGB space and set the renderer output color space to SRGBColorSpace; choose tone mapping when rendering HDR lighting to a display.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/manual/en/color-management.html](https://threejs.org/manual/en/color-management.html)

- **Do:** Use the default ColorManagement.enabled state and set renderer.outputColorSpace plus an appropriate toneMapping
- **Don't:** Disable color management or use removed outputEncoding and sRGBEncoding properties

**Recommended:**
```
THREE.ColorManagement.enabled = true; renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
```

**Avoid:**
```
renderer.outputEncoding = THREE.sRGBEncoding; // removed legacy properties
```

---

### antialias Set at Construction Only `[High]`
The antialias option can only be set at WebGLRenderer construction time. Setting renderer.antialias after construction has absolutely no effect — the WebGL context is already created without it. Decide before instantiating.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)

- **Do:** Set antialias:true inside the WebGLRenderer constructor options object
- **Don't:** Construct the renderer without antialias then try to enable it by assigning the property

**Recommended:**
```
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // antialias baked into the WebGL context
```

**Avoid:**
```
const renderer = new THREE.WebGLRenderer(); renderer.antialias = true; // no effect — context created without AA — edges remain aliased
```

---

### FogExp2 for Depth and Far Culling `[Low]`
Use scene.fog to create atmospheric depth. As a secondary benefit objects that disappear into fog before the far plane stop contributing to draw calls — useful in scenes with large view distances.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/scenes/FogExp2](https://threejs.org/docs/#api/en/scenes/FogExp2)

- **Do:** Add FogExp2 to scenes with view distances above 100 units for both visual atmosphere and implicit far culling
- **Don't:** Ignore fog in scenes with far:1000+ and many distant objects that contribute tiny pixels per draw call

**Recommended:**
```
scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02); // exponential — density feels more natural than linear
```

**Avoid:**
```
// far: 2000 with no fog — hundreds of distant objects too small to see still cost draw calls per frame
```

---

## Particles

### BufferGeometry Plus Points for Particle Systems `[High]`
Build all particle systems with BufferGeometry plus a Float32Array position attribute rendered as Points. Never use individual Mesh objects as particles — they cannot scale past a few hundred with good performance.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/objects/Points](https://threejs.org/docs/#api/en/objects/Points)

- **Do:** Use Points plus BufferGeometry for all particle effects
- **Don't:** Create hundreds of individual Mesh objects to simulate a particle system

**Recommended:**
```
const COUNT = 3000; const geo = new THREE.BufferGeometry(); const pos = new Float32Array(COUNT * 3); for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - 0.5) * 20; geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); const particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, color: 0xffffff })); scene.add(particles);
```

**Avoid:**
```
for (let i = 0; i < 500; i++) { scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), mat)); } // 500 separate draw calls per frame
```

---

### Particle Count Ceiling `[High]`
Start particle systems at 1000–3000 particles. Beyond 50000 causes sustained frame drops on mid-range mobile. Always test on a real device before increasing the count — desktop and mobile GPU performance ratios can be 10:1.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/objects/Points](https://threejs.org/docs/#api/en/objects/Points)

- **Do:** Start at 3000 particles and profile on actual mobile hardware before raising the limit
- **Don't:** Set particle count at 100000 or higher without any mobile profiling

**Recommended:**
```
const COUNT = 3000; // safe mobile baseline — profile before going higher const pos = new Float32Array(COUNT * 3);
```

**Avoid:**
```
const COUNT = 150000; // 60fps on desktop — 8fps on a mid-range Android phone
```

---

### needsUpdate After Buffer Mutation `[Critical]`
After mutating any BufferAttribute array values per frame you must set geometry.attributes.position.needsUpdate = true so Three.js re-uploads the changed buffer to the GPU. Without it the GPU still uses the old data and particles appear completely frozen.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/core/BufferAttribute.needsUpdate](https://threejs.org/docs/#api/en/core/BufferAttribute.needsUpdate)

- **Do:** Set needsUpdate = true on the position attribute after every per-frame mutation of the array
- **Don't:** Mutate the Float32Array values without flagging needsUpdate — positions update in JS but not on the GPU

**Recommended:**
```
// In animate() after timer.update(timestamp): const t = timer.getElapsed(); const pos = geo.attributes.position.array; for (let i = 0; i < pos.length; i += 3) { pos[i + 1] += Math.sin(t + i) * 0.001; // Y component } geo.attributes.position.needsUpdate = true; // GPU re-upload
```

**Avoid:**
```
// In animate(): pos[1] += 0.001; // JS array updated — GPU buffer is stale — particles do not move
```

---

## Responsive

### Canvas Dimensions Not Window `[High]`
Size the renderer and camera to the canvas element's clientWidth and clientHeight — not window.innerWidth and innerHeight. This is correct when the canvas is inside a flex or grid container that does not fill the full viewport.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setSize](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setSize)

- **Do:** Use canvas.clientWidth and canvas.clientHeight for all renderer and camera sizing
- **Don't:** Hardcode renderer size to window.innerWidth/innerHeight when the canvas may be inside a container

**Recommended:**
```
renderer.setSize(canvas.clientWidth, canvas.clientHeight); camera.aspect = canvas.clientWidth / canvas.clientHeight; camera.updateProjectionMatrix();
```

**Avoid:**
```
renderer.setSize(window.innerWidth, window.innerHeight); // wrong when canvas lives inside a sidebar or grid column
```

---

### ResizeObserver Over window resize Event `[Medium]`
Use ResizeObserver on the canvas container instead of the window resize event. ResizeObserver fires when the container element changes size independently of the browser window — common in split-pane layouts and sidebar collapsing.

**Applies to:** threejs 0.185.1
**Documentation:** [https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

- **Do:** Attach ResizeObserver to the canvas parent element for accurate container-aware resize detection
- **Don't:** Use only window.addEventListener('resize') for canvas sizing when the canvas is not fullscreen

**Recommended:**
```
const ro = new ResizeObserver(entries => { const { width, height } = entries[0].contentRect; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); }); ro.observe(canvas.parentElement);
```

**Avoid:**
```
window.addEventListener('resize', () => { renderer.setSize(window.innerWidth, window.innerHeight); }); // misses container-only resize events in split-pane UIs
```

---

### Touch Events for Mobile Interaction `[Medium]`
Add touchstart and touchmove listeners alongside mouse events so the scene remains interactive on mobile. Normalize touch coordinates to the same NDC range as mouse events and pass passive:false on touchmove if you call preventDefault.

**Applies to:** threejs 0.185.1
**Documentation:** [https://developer.mozilla.org/en-US/docs/Web/API/Touch_events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

- **Do:** Handle both mouse and touch input for any interactive 3D scene
- **Don't:** Add only mouse event listeners and leave touch users with no interaction

**Recommended:**
```
canvas.addEventListener('touchmove', e => { e.preventDefault(); const t = e.touches[0]; mouse.x = (t.clientX / canvas.clientWidth) * 2 - 1; mouse.y = -(t.clientY / canvas.clientHeight) * 2 + 1; }, { passive: false }); canvas.addEventListener('touchstart', e => { e.preventDefault(); }, { passive: false });
```

**Avoid:**
```
canvas.addEventListener('mousemove', handleMouse); // touch events unhandled — mobile users get no interaction
```

---

## Accessibility

### prefers-reduced-motion `[High]`
Check window.matchMedia('(prefers-reduced-motion: reduce)') before starting any auto-rotation, particle animation, or camera movement. Users who enable this OS preference have motion sickness or vestibular disorders. IMPORTANT: reading .matches once at page load is a one-time snapshot — if the user changes their OS accessibility setting mid-session the scene will not react. Attach a 'change' listener to the MediaQueryList so noMotion stays in sync at runtime.

**Applies to:** threejs 0.185.1
**Documentation:** [https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html)

- **Do:** Use matchMedia.addEventListener('change') to keep noMotion reactive; gate all auto-animation on the live value
- **Don't:** Read .matches once at startup and never update it — the scene ignores mid-session OS setting changes

**Recommended:**
```
const mq = window.matchMedia('(prefers-reduced-motion: reduce)'); let noMotion = mq.matches; mq.addEventListener('change', e => { noMotion = e.matches; }); // In animate(): if (!noMotion) { mesh.rotation.y += dt * 0.8; particles.rotation.y += dt * 0.1; }
```

**Avoid:**
```
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // one-time snapshot — mid-session OS change is ignored entirely
```

---

### Canvas aria-label `[Medium]`
Add role='img' and a descriptive aria-label to renderer.domElement after appending it to the DOM. Screen readers receive no information from a WebGL canvas — the aria-label is the only description they can announce to users.

**Applies to:** threejs 0.185.1
**Documentation:** [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#accessibility_concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#accessibility_concerns)

- **Do:** Set role='img' and a meaningful aria-label on renderer.domElement before or after appending it
- **Don't:** Append the canvas to the DOM with no accessibility attributes — invisible to screen readers

**Recommended:**
```
renderer.domElement.setAttribute('role', 'img'); renderer.domElement.setAttribute('aria-label', 'Interactive 3D product viewer. Drag to rotate. Scroll to zoom.'); document.body.appendChild(renderer.domElement);
```

**Avoid:**
```
document.body.appendChild(renderer.domElement); // bare canvas — screen readers announce nothing
```

---

## Production

### Bundler Stack for Production `[Medium]`
For production install the exact Three.js release from npm and use a bundler such as Vite. Import optional loaders controls and post-processing modules from three/addons so all modules share one version.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/manual/en/installation.html](https://threejs.org/manual/en/installation.html)

- **Do:** Use npm install three@0.185.1 and import core plus addons through ESM
- **Don't:** Serve legacy global scripts or import addons from deprecated examples/js paths

**Recommended:**
```
npm install three@0.185.1; import * as THREE from 'three'; import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

**Avoid:**
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script> // legacy global build with no module graph
```

---

### GLTFLoader with scene traverse `[Medium]`
Load 3D models using GLTFLoader and traverse gltf.scene to configure castShadow receiveShadow and material overrides on all child Mesh nodes. Calling scene.add(gltf.scene) alone silently skips all shadow and material configuration.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#examples/en/loaders/GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

- **Do:** Use GLTFLoader and traverse the entire gltf.scene graph to set up shadows and materials on every Mesh child
- **Don't:** Load a GLTF model and pass gltf.scene directly to scene.add without traversing child meshes

**Recommended:**
```
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; const loader = new GLTFLoader(); loader.load('model.glb', gltf => { gltf.scene.traverse(child => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; } }); scene.add(gltf.scene); });
```

**Avoid:**
```
loader.load('model.glb', gltf => { scene.add(gltf.scene); // shadows and material setup silently skipped on all children });
```

---

### LOD for Distance-Based Detail `[Medium]`
Use THREE.LOD to automatically swap high-detail and low-detail geometry as objects move closer or farther from the camera. This maintains frame rate in scenes with many objects spread across a large depth range.

**Applies to:** threejs 0.185.1
**Documentation:** [https://threejs.org/docs/#api/en/objects/LOD](https://threejs.org/docs/#api/en/objects/LOD)

- **Do:** Use THREE.LOD to reduce triangle count on distant objects automatically
- **Don't:** Render the same high-polygon geometry for every object regardless of its distance from the camera

**Recommended:**
```
const lod = new THREE.LOD(); lod.addLevel(highDetailMesh, 0); // used when < 15 units away lod.addLevel(medDetailMesh, 15); // 15–50 units lod.addLevel(lowDetailMesh, 50); // 50+ units scene.add(lod);
```

**Avoid:**
```
scene.add(highDetailMesh); // 64k-triangle mesh rendered at full cost whether 1 unit or 100 units from camera
```

---
