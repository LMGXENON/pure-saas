# Storybook Component Catalogs & State Testing

Storybook provides an isolated sandbox to develop, test, and document components across all 8 core states (Default, Hover, Focus, Active, Disabled, Loading, Error, Success).

---

## 1. Tooling Mechanisms & Specifications

| Tool / Mechanism | Operational Detail |
| :--- | :--- |
| **Story Args & Controls** | Interactive prop toggles for designers and developers |
| **Play Functions** | Automated user interaction testing using @storybook/test and axe-storybook-addon |
| **Dark/Light Addon** | Instant toolbar switching between light, dark, and high-contrast backgrounds |

---

## 2. Configuration & Execution Reference

```bash
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Confirm Action', variant: 'primary' },
};
export default meta;

export const AllStates: StoryObj = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Default</Button>
      <Button variant="primary" isLoading>Loading</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Render all 8 interaction states side-by-side in story matrices. | Do not maintain mock component copies in Storybook that differ from production source code. |
| Run automated axe accessibility checks on all stories. |  |

---

## 4. Verification & Quality Gates

- **Use `@storybook/addon-a11y` to highlight WCAG violations in real time.**

---

## 5. Anti-Slop Enforcement

- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.
