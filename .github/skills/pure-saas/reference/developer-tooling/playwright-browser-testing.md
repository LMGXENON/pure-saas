# Playwright CLI Browser Testing & Verification Guide

> Token-conscious browser automation, automated screenshot capture, and multi-viewport visual testing for AI coding agents.  
> Adapted from and compatible with **Microsoft Playwright CLI** (`@playwright/cli`, Apache-2.0 License).

---

## 1. Why Playwright CLI for AI Agents?

Traditional Model Context Protocol (MCP) browser servers frequently overwhelm AI agent context windows by dumping massive DOM snapshots, multi-megabyte accessibility trees, and verbose JSON schemas.

**Playwright CLI** provides a lightweight, token-conscious terminal interface that allows coding agents to drive real browsers using fast, focused shell commands:
- Zero context bloat: executes in the terminal and emits concise exit codes and file paths.
- Genuine visual verification: captures exact multi-viewport PNG screenshots (1440px desktop, 768px tablet, 375px mobile).
- Deterministic computed style inspection: evaluates live CSS properties in page context via `eval`.

---

## 2. Prerequisites & Installation

### Option A: Official Playwright CLI (Recommended)
Install globally or in your project:
```bash
npm install -g @playwright/cli@latest
npx playwright install chromium
```

### Option B: Local Browser Fallback (Automatic)
Pure SaaS includes an automatic zero-dependency fallback that detects existing system browsers (`Google Chrome`, `Chromium`, or `msedge`) to capture screenshots and run verification even if `@playwright/cli` is not yet installed globally.

---

## 3. Pure SaaS Browser Commands

Pure SaaS integrates Playwright CLI capabilities directly into the `pure-saas` CLI:

```bash
# 1. Check browser engine and Playwright CLI availability
npx pure-saas browser check

# 2. Automatically install Playwright CLI and browser dependencies
npx pure-saas browser setup

# 3. Capture responsive screenshots across desktop (1440px), tablet (768px), and mobile (375px)
npx pure-saas browser screenshot http://localhost:3000 --out ./screenshots

# 4. Capture a full-page scrollable screenshot at a specific viewport
npx pure-saas browser screenshot http://localhost:3000 --viewport 1440x900 --full-page --out ./screenshot.png

# 5. Run automated visual and layout verification on a rendered URL
npx pure-saas browser verify http://localhost:3000
```

---

## 4. Playwright CLI Direct Command Reference

When interacting directly with `@playwright/cli`, use these standard commands:

### `playwright-cli open [url]`
Opens a headless or headed browser session:
```bash
# Open URL in headless Chromium
playwright-cli open http://localhost:3000

# Open in visible headed mode for interactive inspection
playwright-cli open http://localhost:3000 --headed

# Emulate mobile viewport
playwright-cli open http://localhost:3000 --device="iPhone 15"
```

### `playwright-cli screenshot [target]`
Captures an image of the current page or a specific element selector:
```bash
# Full scrollable document capture
playwright-cli screenshot --full-page --filename=desktop-full.png

# Viewport capture at 1440px
playwright-cli screenshot --filename=desktop-viewport.png

# Element-specific capture
playwright-cli screenshot "#main-nav" --filename=navbar.png
```

### `playwright-cli eval <expression>`
Runs a JavaScript expression inside the browser context and returns raw output:
```bash
# Verify page title
playwright-cli eval "document.title"

# Check for horizontal overflow (document width > window innerWidth)
playwright-cli eval "document.documentElement.scrollWidth > window.innerWidth"

# Extract computed token value
playwright-cli eval "getComputedStyle(document.body).backgroundColor"
```

---

## 5. Visual Verification Protocol in Pure SaaS

Before declaring any frontend UI or responsive task complete:
1. **Launch Dev Server:** Start local server (e.g. `npm run dev`).
2. **Verify Availability:** Run `npx pure-saas browser check`.
3. **Capture Viewports:** Run `npx pure-saas browser screenshot <url> --viewports 375,768,1440`.
4. **Inspect Captured Evidence:** Verify that no horizontal overflow occurs, navigation collapses cleanly on mobile, and typography scales legibly.
5. **Document Evidence:** Include captured file paths in the verification report.

---

## Attribution & License

Portions of this browser automation workflow and command syntax are adapted from [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli), released under the **Apache-2.0 License**.  
Copyright (c) Microsoft Corporation.

