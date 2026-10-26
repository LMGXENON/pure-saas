# Compound Component Architecture in React

Compound components share implicit state and coordinate complex UI trees via React Context, providing flexible JSX composition without prop-drilling.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Context Boundary** | Encapsulates shared active states, change handlers, and unique IDs |
| **Child Primitives** | Subcomponents (<Select.Trigger>, <Select.Content>, <Select.Item>) cleanly separate roles |
| **Dev Diagnostics** | Throw informative errors if a compound subcomponent is rendered outside its parent provider |

---

## 2. Code Implementation Reference

```tsx
import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');
  return ctx;
}

export function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.Trigger = function TabTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${isActive ? 'bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
    >
      {children}
    </button>
  );
};

Tabs.Content = function TabContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return <div role="tabpanel" className="mt-4">{children}</div>;
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use compound components for multi-part widgets (Tabs, Accordions, Dialogs, Menus). | Do not force consumers to pass indices manually when string keys or automatic registration can be used. |
| Provide clear TypeScript typing on the master container object. |  |

---

## 4. Accessibility & Performance Verification

- **Wire up ARIA roles (role="tablist", role="tab", role="tabpanel") within the compound hierarchy.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
