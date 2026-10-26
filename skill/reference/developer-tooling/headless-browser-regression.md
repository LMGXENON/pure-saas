# Visual Regression Testing with Headless Browsers

Visual regression testing captures screenshots in headless Chromium/WebKit and computes pixel diffs against approved baseline snapshots.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **Pixelmatch Threshold** | Set strict diff threshold (0.05% - 0.1%) to detect visual drift |
| **Dynamic Element Masking** | Mask dates, timestamps, random avatars, and animated carousels before capturing |
| **Cross-Viewport Matrix** | Execute test suites across 375px (mobile), 768px (tablet), and 1440px (desktop) |

---

## 2. Configuration & Execution Reference

```bash
// Playwright visual regression test
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Mask dynamic timestamp element
  const timestamp = page.locator('#current-timestamp');
  
  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [timestamp],
    maxDiffPixelRatio: 0.02
  });
});
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Run visual tests against deterministic mock data. | Never run visual regression tests against live production databases with fluctuating content. |
| Mask dynamic elements (dates, avatars, animated graphs) to avoid false positive diffs. |  |

---

## 4. Verification & Quality Gates

- **Verify focus rings and high-contrast modes in automated visual regression runs.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.
