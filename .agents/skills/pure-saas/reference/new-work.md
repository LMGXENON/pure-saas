# New Visual Work: Establishing Visual Worlds & Surfaces

Use this playbook when creating a completely new interface, landing page, dashboard, or replacement visual identity.

---

## 1. Determine What Is Already True

Before writing code or proposing colors, inspect the codebase:
- **Established World:** If an existing app has a coherent design system, inherit its tokens, fonts, and component language. Never launch an unasked redesign during a feature extension.
- **Redesign Request:** When the user explicitly requests a redesign, treat the legacy UI as evidence of functional requirements and anti-reference for aesthetics. Replace `DESIGN.md` completely rather than polishing an outdated look.
- **Brand System Provided:** If the user provides brand assets (logos, primary hex codes, typography requirements), anchor the palette around those assets while enforcing WCAG 2.2 AA contrast math.
- **Greenfield / No Visual Authority:** Create an original, opinionated visual world aligned with the product archetype and surface mode.

---

## 2. Inquire Before Building

Clarify the critical design parameters through structured questions:
1. **Target Audience & Tone:** Who is the user, and what feeling should the interface convey (technical & dense, editorial & literary, Swiss & minimalist, or high-velocity & energetic)?
2. **Primary Action:** What is the single most important action a user should take on this screen?
3. **Key Constraints:** Are there established brand guidelines, backend API contracts, or strict accessibility requirements?

Never ask generic questions like "What color do you like?" or "Should we use dark mode?". Present concrete, curated aesthetic archetypes.

---

## 3. Select a Design Archetype

Choose an archetype from `pure-saas style list`:
- **Minimalism & Swiss (`minimalism-swiss`):** Objective, typography-led, neutral gray ramps, hairline grid borders, high readability. Ideal for general SaaS, enterprise workflows, and developer platforms.
- **Technical Terminal (`developer-technical`):** Dark canvas (`#0c0d0e`), monospaced data, high density, vibrant amber/orange accent (`#fa5d29`), crisp 1px borders. Ideal for cloud infrastructure, CLI tools, observability consoles.
- **Data-Dense Dashboard (`data-dense-dashboard`):** Deep slate canvas (`#0f172a`), cyan accent (`#38bdf8`), compact table rows, KPI sparklines with tabular numbers. Ideal for financial trading, BI, NOC operations.
- **Editorial Literary (`editorial-literary`):** Warm paper canvas (`#faf9f5`), serif display typeface, deep forest green accent (`#14532d`), bookish reading rhythm. Ideal for publishing, research, documentation.
- **Creative Studio (`creative-studio`):** Deep charcoal canvas (`#121214`), amber accent (`#f59e0b`), floating toolbars, kinetic canvasses. Ideal for media sequencing, audio DAWs, 3D tools.

---

## 4. The Direction Contract

Before generating application code, write the 6-block Direction Contract into the project's design brief or frontmatter:
1. **THESIS:** The single core visual concept this surface owns, and the category-default cliché it explicitly rejects.
2. **OWN-WORLD:** The exact color palette (canvas, surface, text, accent) and component geometry (radii, borders, shadows).
3. **STORY:** What the user sees first, what they understand next, and what motivates them to act.
4. **FIRST VIEWPORT:** Exact layout of the hero screen at 1440px and 375px.
5. **TYPOGRAPHY & SPATIAL FORM:** The display + body font pairing, scale ratio, and 8pt spatial grid scale.
6. **FINISH CRITERIA:** Verifiable exit conditions (0 console errors, $\ge 16/20$ audit score, zero horizontal overflow, 8/8 contrast pairs passed).

---

## 5. Implement & Verify

Follow the 8-step build loop:
1. Author `DESIGN.md`.
2. Implement components bound to semantic tokens.
3. Capture browser screenshots at 1440px, 768px, and 375px.
4. Run `npx pure-saas audit --source src`.
5. Fix identified defects and report verified results.
