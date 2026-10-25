# Contributing to Pure SaaS

Thank you for your interest in contributing to Pure SaaS! We are building an open-source, universal AI-agent skill and design enforcement toolkit that helps developers and agents build authentic, high-craft web interfaces without generic AI tropes.

---

## Code of Conduct

We expect all contributors to adhere to standard open-source community respect, constructive discourse, and intellectual honesty. Do not submit spam, artificial benchmarks, or unverified claims.

---

## Guiding Principles for Contributions

1. **Zero External Dependencies in CLI:** The core CLI (`scripts/pure-saas.mjs`) must run on vanilla Node.js >= 18 using standard built-in modules (`node:fs`, `node:path`, `node:process`). Do not introduce large runtime dependencies.
2. **Canonical Skill Portability:** The core instructions in `SKILL.md` must remain agent-agnostic. Agent-specific conventions belong in `integrations/`.
3. **Evidence-Based Design:** Tests and validation tools must report truthful results. Never stub out checks to give false passes.
4. **Preserve Upstream Licensing:** Never copy proprietary or uncleared code or text into this repository.

---

## Local Development Workflow

### 1. Prerequisites
- Node.js >= 18.0.0
- Git

### 2. Running Tests
Pure SaaS uses Node.js's built-in test runner:

```bash
# Run the entire test suite
npm test

# Run individual suites
node --test tests/schema-tests/*.test.mjs
node --test tests/token-tests/*.test.mjs
node --test tests/enforcement-tests/*.test.mjs
node --test tests/agent-workflow-tests/*.test.mjs
```

### 3. Testing the CLI Locally

```bash
# Validate templates
node scripts/pure-saas.mjs validate templates/DESIGN.md

# Scan fixtures
node scripts/pure-saas.mjs check-tokens tests/fixtures/valid-design.md --source tests/fixtures/test-src

# Generate report
node scripts/pure-saas.mjs review-report --json
```

---

## Submitting Pull Requests

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Ensure all tests pass: `npm test`.
3. If adding a new feature or rule, add corresponding tests in `tests/`.
4. Update `CHANGELOG.md` under the `[Unreleased]` or current version header.
5. Open a Pull Request with a clear explanation of the change and rationale.

