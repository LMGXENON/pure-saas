# Component Contract Design & API Polymorphism

Well-designed component contracts maximize flexibility while preventing invalid states.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Polymorphic "as" prop** | Render as <a>, <button>, or Link without losing styling | Universal affordances |
| **Compound Composition** | Parent/Child context binding (<Tabs.List>, <Tabs.Trigger>) | Flexible layouts |
| **Strict Typing** | Discriminated unions for mutually exclusive options | Zero runtime errors |

---

## 2. Code & Configuration Reference

```css
// Clean polymorphic component pattern
import React from 'react';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> & Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Favor composition over monolithic prop bags with 40 optional flags. | Never swallow or override native HTML attributes (like onClick, id, role). |
| Use forwardRef on all primitives to support focus management and animations. |  |

---

## 4. Accessibility & Quality Standards

- **Preserve appropriate ARIA roles regardless of polymorphic root element.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.
