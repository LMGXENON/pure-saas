# Command Routing & Specialist Intent Router

Pure SaaS operates via one principal command and five specialist design workflows.

---

## 1. Specialist Command Routing

When the user enters `/pure-saas [command] [target or request]`:

| Command | Specialist Role | Primary Objective | Reference Playbook |
| :--- | :--- | :--- | :--- |
| **`/pure-saas [request]`** | **Principal Designer** | Owns the complete outcome from brief to production-ready deliverable | [`workflow.md`](workflow.md) |
| **`/pure-saas design [brief]`** | **Creative Director & Builder** | Turns a product brief into a distinctive, fully implemented interface | [`design.md`](design.md) |
| **`/pure-saas polish [target]`** | **Senior Visual Designer** | Elevates visual craft, typography tracking, hairlines & micro-interactions | [`polish.md`](polish.md) |
| **`/pure-saas review [scope]`** | **Independent Design Critic** | 10-dimension objective audit and prioritized P0-P3 defect triage | [`review.md`](review.md) |
| **`/pure-saas reference [URL/Image]`** | **Reference Analyst** | Extracts design intelligence from references and translates to target project | [`reference.md`](reference.md) |
| **`/pure-saas responsive [target]`** | **Responsive Systems Engineer** | Viewport mastery across mobile (375px), tablet (768px), and desktop (1440px) | [`responsive.md`](responsive.md) |

---

## 2. Intent-Based Routing

If the user enters a natural language request without an explicit command keyword:
- **"Build a new landing page / dashboard / app for X"** $\rightarrow$ Route to `/pure-saas design [brief]` (`skill/reference/design.md`).
- **"Make this look better / cleaner / more modern / fix spacing"** $\rightarrow$ Route to `/pure-saas polish [target]` (`skill/reference/polish.md`).
- **"Audit / critique / review this page / check for bugs"** $\rightarrow$ Route to `/pure-saas review [scope]` (`skill/reference/review.md`).
- **"Make it look like this site / adapt this reference URL"** $\rightarrow$ Route to `/pure-saas reference [URL]` (`skill/reference/reference.md`).
- **"Fix mobile layout / tablet view / overflow issues"** $\rightarrow$ Route to `/pure-saas responsive [target]` (`skill/reference/responsive.md`).
- **General product request or complex multi-phase task** $\rightarrow$ Route to `/pure-saas [request]` (`skill/reference/workflow.md`).
