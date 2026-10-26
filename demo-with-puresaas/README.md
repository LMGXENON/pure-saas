# PulseMetrics Console — With Pure SaaS (Senior Engineering Console)

This website demonstrates a SaaS dashboard built using the **Pure SaaS** frontend engineering toolkit, following the `developer-technical` and `minimalism-swiss` style archetypes.

## Observed Structural & Design Distinctions (vs. Unguided AI)
1. **Architecture & Composition:**
   - **No boilerplate sidebar:** Eliminates 250px of dead lateral space. Replaces it with a high-utility top console app bar containing environment context (`prod-us-east-1`), breadcrumb navigation, and global `⌘K` command search.
   - **Asymmetric Operational Hero (NOT 4 identical cards):**
     - 66% width Ingress Health Card featuring live RPS throughput, segmented metric toggles (`Throughput`, `Latency`, `SLA`), and a multi-segment status code proportional bar (`2xx`, `4xx`, `5xx`).
     - 34% width Secondary Console displaying active SLA Error Budget burn-rate gauge and edge cluster health matrix (`us-east-1`, `eu-central-1`, `ap-northeast-1`).
2. **Master-Detail Ingress Inspector:**
   - Clicking any route row slides out a real-time **Route Telemetry Inspector Drawer** with full latency waterfall (DNS, TLS, Origin, Content Transfer), replayable cURL commands, and quick operational actions ("Throttle Route", "Quarantine").
3. **Ergonomics & Keyboard First:**
   - Global Command Palette accessible via `⌘K` or `/` with instant action dispatch.
   - Micro-timeframe segmented scrubber (`15m`, `1h`, `24h`, `7d`).
4. **Hardware-Grade Craft Floor:**
   - 3-tier semantic design tokens (`canvas`, `surface-base`, `border-subtle`, `text-primary`, `accent`).
   - Monospace tabular alignment (`font-feature-settings: 'tnum'`).
   - Solid, accessible status pills with semantic icons (zero generic pulsing dots).
   - Apple hairline borders (`border border-border-subtle`).
   - Verified WCAG 2.2 AA contrast in both Light and Dark modes.

## Running Locally
```bash
npm install
npm run dev
# Runs on http://localhost:3002
```
