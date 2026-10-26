# Browser Testing & Visual Screenshot Verification

Powered by Playwright CLI and headless Chrome automation, Pure SaaS provides token-conscious browser testing and multi-viewport visual screenshot verification without dumping massive DOM dumps into AI agent context.

---

## 1. Token-Conscious Browser Automation

Traditional browser tools dump entire DOM trees into agent context, causing context exhaustion. Pure SaaS uses focused CLI execution:
- **Zero Context Bloat:** Executes headless commands and returns concise exit codes and file paths.
- **Visual Multi-Viewport Verification:** Captures PNG screenshots across standard breakpoints (1440px, 768px, 375px).
- **Zero-Dependency Fallback:** Uses system Chrome/Chromium if `@playwright/cli` is not installed globally.

---

## 2. Browser Commands

```bash
# Verify browser automation environment
npx pure-saas browser check

# Setup / install Playwright browsers if missing
npx pure-saas browser setup

# Capture full-page multi-viewport screenshots
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens

# Audit responsive layout integrity in a live browser
npx pure-saas browser verify http://localhost:3000
```

---

## 3. Multi-Viewport Protocol

Always verify rendered layouts across these standard viewports:
- **Desktop:** 1440 x 900
- **Tablet:** 768 x 1024
- **Mobile:** 375 x 812

Verify that:
1. No horizontal scrollbar appears at 375px.
2. Text does not clip or overflow container boundaries.
3. Both Light and Dark modes render with correct contrast.
4. Console contains zero runtime exceptions.
