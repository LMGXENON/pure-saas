# PulseMetrics — Without Pure SaaS (Unguided AI Generation)

This website demonstrates how modern AI coding assistants default to building SaaS dashboards without the **Pure SaaS** skill, architecture, or design rules.

## Observed Characteristics
1. **Structural Pattern:** Cookie-cutter 256px fixed dark left sidebar with generic links, 4 identical KPI cards in a horizontal 4-column grid, a basic SVG line chart, and an un-ergonomic full-width table.
2. **Visual Tropes ("AI Slop"):**
   - Purple-to-indigo gradient text on page headings (`bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600`)
   - Pulsing status dots (`animate-ping`)
   - Default browser tracking and non-tabular metrics that cause visual jumping
   - Raw Tailwind utility colors without semantic token abstraction (`bg-indigo-600`, `text-slate-800`)
3. **Ergonomics & Density:** Low information density; missing master-detail inspection; no keyboard command palette.

## Running Locally
```bash
npm install
npm run dev
# Runs on http://localhost:3001
```
