# Pure SaaS: /pure-saas browser

Execute token-conscious browser testing, visual screenshot capture, and responsive verification via Playwright CLI.

## Usage

```bash
/pure-saas browser [action] [url]
# or
/pure-saas:browser [request]
```

**Target Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Verify Browser Environment:**
   Confirm browser automation tooling is operational:
   ```bash
   npx pure-saas browser check
   ```

2. **Setup Browser Tooling (if uninstalled):**
   ```bash
   npx pure-saas browser setup
   ```

3. **Capture Responsive Screenshots:**
   Capture visual proof across standard device breakpoints (Desktop 1440px, Tablet 768px, Mobile 375px):
   ```bash
   npx pure-saas browser screenshot <url> --out ./screenshots
   ```

4. **Verify Live Rendered Page:**
   Check for horizontal layout overflow, console errors, and viewport adaptation:
   ```bash
   npx pure-saas browser verify <url>
   ```

5. **Examine Captured Evidence:**
   Inspect captured screenshots directly. Never claim passing responsive or visual verification without examining the rendered image outputs.

Consult [`references/developer-tooling/playwright-browser-testing.md`](../references/developer-tooling/playwright-browser-testing.md) for direct Playwright CLI usage patterns and advanced evaluation scripts.

