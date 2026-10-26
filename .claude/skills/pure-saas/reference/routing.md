# Command Routing & Specialist Intent Router

Pure SaaS operates via six independent, namespaced slash commands:

---

## 1. Specialist Command Routing

| Slash Command | Specialist Role | Primary Objective | Reference Playbook |
| :--- | :--- | :--- | :--- |
| **`/puresaas [request]`** | **Principal Designer** | Owns the complete outcome from brief to production-ready deliverable | [`workflow.md`](workflow.md) |
| **`/puresaas:design [brief]`** | **Creative Director & Builder** | Turns a product brief into a distinctive, fully implemented interface | [`design.md`](design.md) |
| **`/puresaas:polish [target]`** | **Senior Visual Designer** | Elevates visual craft, typography tracking, hairlines & micro-interactions | [`polish.md`](polish.md) |
| **`/puresaas:review [scope]`** | **Independent Design Critic** | 10-dimension objective audit and prioritized P0-P3 defect triage | [`review.md`](review.md) |
| **`/puresaas:clone [URL/Image]`** | **Reference Analyst & Cloning Engineer** | Recreates layout, typography, styling, and interactions accurately | [`clone.md`](clone.md) |
| **`/puresaas:responsive [target]`** | **Responsive Systems Engineer** | Viewport mastery across mobile (375px), tablet (768px), and desktop (1440px) | [`responsive.md`](responsive.md) |

---

## 2. Intent-Based Routing

If the user enters a natural language request without an explicit command keyword:
- **"Build a new landing page / dashboard / app for X"** $\rightarrow$ Route to `/puresaas:design [brief]` (`skill/reference/design.md`).
- **"Make this look better / cleaner / more modern / fix spacing"** $\rightarrow$ Route to `/puresaas:polish [target]` (`skill/reference/polish.md`).
- **"Audit / critique / review this page / check for bugs"** $\rightarrow$ Route to `/puresaas:review [scope]` (`skill/reference/review.md`).
- **"Make it look like this site / clone this screenshot / adapt reference"** $\rightarrow$ Route to `/puresaas:clone [URL/Image]` (`skill/reference/clone.md`).
- **"Fix mobile layout / tablet view / overflow issues"** $\rightarrow$ Route to `/puresaas:responsive [target]` (`skill/reference/responsive.md`).
- **General product request or complex multi-phase task** $\rightarrow$ Route to `/puresaas [request]` (`skill/reference/workflow.md`).
