# Windsurf Integration for Pure SaaS

Integrate Pure SaaS into Codeium Windsurf and the Cascade agent.

---

## Installation

Copy `.windsurfrules` to the root of your project:

```bash
cp integrations/windsurf/.windsurfrules .windsurfrules
```

---

## Workflow Invocations in Windsurf (Cascade)

> [!NOTE]
> Windsurf Cascade does not support third-party custom `/slash` commands. In Cascade chat, invoke Pure SaaS workflows by referencing the workflow name or copying prompts from `prompts/`:

| Workflow | Cascade Mention / Trigger | Portable Prompt | Purpose |
| :--- | :--- | :--- | :--- |
| **Initialize** | "Pure SaaS init" | [`prompts/init.md`](../../prompts/init.md) | Initialize `DESIGN.md` and `design-brief.md` |
| **Design / Redesign** | "Pure SaaS design" | [`prompts/design.md`](../../prompts/design.md) | Full 9-stage design workflow |
| **Audit & Review** | "Pure SaaS review" | [`prompts/review.md`](../../prompts/review.md) | Quality, accessibility & anti-slop audit |
| **Fix Issues** | "Pure SaaS fix" | [`prompts/fix.md`](../../prompts/fix.md) | Remediate UI while preserving backend APIs |
| **Tokens & Export** | "Pure SaaS tokens" | [`prompts/tokens.md`](../../prompts/tokens.md) | Validate and export tokens |
| **Reference Analysis** | "Pure SaaS reference" | [`prompts/reference.md`](../../prompts/reference.md) | Deconstruct reference website into `DESIGN.md` |

