# Design Token Linting & Static AST Verification

Static analysis tools scan codebase ASTs to detect raw hex colors, arbitrary spacing constants, and deprecated tokens before they can be merged.

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **AST Pattern Matching** | Flags string literals matching regex `/#([0-9a-fA-F]{3,8})/` in CSS and TSX |
| **Token Replacement Ledger** | Suggests the correct semantic token when a hardcoded value is detected |
| **CI Pre-Commit Hook** | Blocks git commits containing unstaged token violations |

---

## 2. Configuration & Execution Reference

```bash
// Pure SaaS AST Token Checker Command
$ npx pure-saas check DESIGN.md --source src --known known-defects.json
// Scans all files in src/ and cross-references against DESIGN.md token declarations
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Run static token checks in git pre-commit hooks and CI pipelines. | Do not allow engineers to disable token linting rules with file-wide ignore comments. |
| Provide automatic `--fix` suggestions where a raw hex maps directly to a semantic token. |  |

---

## 4. Verification & Quality Gates

- **Enforcing tokens guarantees that verified accessible color pairs are preserved.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.
