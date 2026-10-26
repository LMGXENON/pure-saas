# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit. Its mission is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, and component libraries.

---

## 2. Command Architecture

Pure SaaS operates via **one principal command and five specialist workflows**:

1. **`/pure-saas [request]`** — **Principal Designer**: Owns the complete outcome from understanding the brief, audience, and constraints to delivering a finished, production-ready interface.
2. **`/pure-saas design [brief]`** — **Creative Director & Builder**: Turns a product brief into a distinctive, fully implemented interface with strong visual hierarchy and authentic content.
3. **`/pure-saas polish [target]`** — **Senior Visual Designer**: Elevates visual craft, typography tracking, surface lighting, and micro-interactions without breaking working behavior.
4. **`/pure-saas review [scope]`** — **Independent Design Critic**: Judges the interface honestly across 10 dimensions, prioritizing defects from P0 to P3 and driving verified fixes.
5. **`/pure-saas reference [URL/Image]`** — **Reference Analyst & Art Director**: Extracts deep design intelligence from references and translates it into an original, domain-tailored implementation.
6. **`/pure-saas responsive [target]`** — **Responsive Systems Engineer**: Makes the interface feel purposefully designed across all viewports (375px mobile to 1440px desktop) with zero overflow.

---

## 3. The 6-Step Build & Verification Loop

1. **Understand Requirements & Mode:** Determine whether surface is Persuade, Operate, Read, or Experience.
2. **Inspect Context:** Check dependencies, styling system, existing tokens, and backend APIs.
3. **Formulate Visual Direction:** Pick style archetype from `pure-saas style list`, choose typography, and author `DESIGN.md`.
4. **Implement Components:** Build with 8-state interaction matrix and zero raw hex codes.
5. **Capture Real Browser Screenshots:** Test across 1440px, 768px, and 375px viewports.
6. **Forensic Review & Verified Fixes:** Measure against the 10 dimensions, triage P0–P3 defects, and verify final finish.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in `DESIGN.md`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no repetitive kickers/eyebrows on every heading, no decorative side-stripe borders, no fake status dots, and no emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (`::selection`), caret color (`caret-color`), focus rings, and custom scrollbars.
- **Never Fabricate Verification:** If an environment lacks browser inspection tools, report it as `untested`. Never claim passing verification for uninspected code.
