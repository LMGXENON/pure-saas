# React Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`react.csv`)
> Framework: React
> Rules Count: 66 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **React** projects.

---

## State

### Use useState for local state `[Medium]`
Simple component state should use useState hook in current React apps.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useState](https://react.dev/reference/react/useState)

- **Do:** useState for form inputs toggles counters
- **Don't:** Class components this.state

**Recommended:**
```
const [count, setCount] = useState(0)
```

**Avoid:**
```
this.state = { count: 0 }
```

---

### Lift state up when needed `[Medium]`
Share state between siblings by lifting to parent

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/sharing-state-between-components](https://react.dev/learn/sharing-state-between-components)

- **Do:** Lift shared state to common ancestor
- **Don't:** Prop drilling through many levels

**Recommended:**
```
Parent holds state passes down
```

**Avoid:**
```
Deep prop chains
```

---

### Use useReducer for complex state `[Medium]`
Complex state logic benefits from reducer pattern

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useReducer](https://react.dev/reference/react/useReducer)

- **Do:** useReducer for state with multiple sub-values
- **Don't:** Multiple useState for related values

**Recommended:**
```
useReducer with action types
```

**Avoid:**
```
5+ useState calls that update together
```

---

### Avoid unnecessary state `[High]`
Derive values from existing state when possible

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)

- **Do:** Compute derived values in render
- **Don't:** Store derivable values in state

**Recommended:**
```
const total = items.reduce(...)
```

**Avoid:**
```
const [total, setTotal] = useState(0)
```

---

### Initialize state lazily `[Medium]`
Use function form for expensive initial state

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)

- **Do:** useState(() => computeExpensive())
- **Don't:** useState(computeExpensive())

**Recommended:**
```
useState(() => JSON.parse(data))
```

**Avoid:**
```
useState(JSON.parse(data))
```

---

## Effects

### Clean up effects `[High]`
Return cleanup for subscriptions and timers so effects stay predictable.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useEffect#connecting-to-an-external-system](https://react.dev/reference/react/useEffect#connecting-to-an-external-system)

- **Do:** Return cleanup function in useEffect
- **Don't:** No cleanup for subscriptions

**Recommended:**
```
useEffect(() => { sub(); return unsub; })
```

**Avoid:**
```
useEffect(() => { subscribe(); })
```

---

### Specify dependencies correctly `[High]`
Include every reactive value used inside an Effect dependency array.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useEffect#specifying-reactive-dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)

- **Do:** All referenced values in dependency array
- **Don't:** Empty deps with external references

**Recommended:**
```
[value] when using value in effect
```

**Avoid:**
```
[] when using props/state in effect
```

---

### Avoid unnecessary effects `[High]`
Avoid Effects for derived data or event handling.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)

- **Do:** Transform data during render handle events directly
- **Don't:** useEffect for derived state or event handling

**Recommended:**
```
const filtered = items.filter(...)
```

**Avoid:**
```
useEffect(() => setFiltered(items.filter(...)))
```

---

### Use refs for non-reactive values `[Medium]`
Store values that don't trigger re-renders in refs

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef)

- **Do:** useRef for interval IDs DOM elements
- **Don't:** useState for values that don't need render

**Recommended:**
```
const intervalRef = useRef(null)
```

**Avoid:**
```
const [intervalId, setIntervalId] = useState()
```

---

## Rendering

### Use keys properly `[High]`
Stable unique keys for list items

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

- **Do:** Use stable IDs as keys
- **Don't:** Array index as key for dynamic lists

**Recommended:**
```
key={item.id}
```

**Avoid:**
```
key={index}
```

---

### Memoize expensive calculations `[Medium]`
Prefer compiler-first memoization; use useMemo only for measured hotspots or explicit cache boundaries.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useMemo](https://react.dev/reference/react/useMemo)

- **Do:** Use useMemo for expensive computations when profiling shows a real bottleneck
- **Don't:** Use useMemo everywhere by default

**Recommended:**
```
useMemo(() => expensive(), [deps])
```

**Avoid:**
```
const result = expensiveCalc()
```

---

### Memoize callbacks passed to children `[Medium]`
Use useCallback only when callback identity matters for measured child renders.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useCallback](https://react.dev/reference/react/useCallback)

- **Do:** Use useCallback for handlers passed to memoized children when identity is a bottleneck
- **Don't:** Wrap every function in useCallback by default

**Recommended:**
```
useCallback(() => {}, [deps])
```

**Avoid:**
```
const handler = () => {}
```

---

### Use React.memo wisely `[Low]`
Keep React.memo as a measured optimization, not a blanket default.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/memo](https://react.dev/reference/react/memo)

- **Do:** Use React.memo for pure components with stable props and real render cost
- **Don't:** Memoize every component or use it as a guess

**Recommended:**
```
memo(ExpensiveList)
```

**Avoid:**
```
memo(SimpleButton)
```

---

### Avoid inline object/array creation in JSX `[Medium]`
Create objects outside render or memoize

**Applies to:** react 19.2.x

- **Do:** Define style objects outside component
- **Don't:** Inline objects in props

**Recommended:**
```
<div style={styles.container}>
```

**Avoid:**
```
<div style={{ margin: 10 }}>
```

---

## Components

### Keep components small and focused `[Medium]`
Single responsibility for each component

**Applies to:** react 19.2.x

- **Do:** One concern per component
- **Don't:** Large multi-purpose components

**Recommended:**
```
<UserAvatar /><UserName />
```

**Avoid:**
```
<UserCard /> with 500 lines
```

---

### Use composition over inheritance `[Medium]`
Compose components using children and props

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/thinking-in-react](https://react.dev/learn/thinking-in-react)

- **Do:** Use children prop for flexibility
- **Don't:** Inheritance hierarchies

**Recommended:**
```
<Card>{content}</Card>
```

**Avoid:**
```
class SpecialCard extends Card
```

---

### Colocate related code `[Low]`
Keep related components and hooks together

**Applies to:** react 19.2.x

- **Do:** Related files in same directory
- **Don't:** Flat structure with many files

**Recommended:**
```
components/User/UserCard.tsx
```

**Avoid:**
```
components/UserCard.tsx + hooks/useUser.ts
```

---

### Use fragments to avoid extra DOM `[Low]`
Fragment or <> for multiple elements without wrapper

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/Fragment](https://react.dev/reference/react/Fragment)

- **Do:** <> for grouping without DOM node
- **Don't:** Extra div wrappers

**Recommended:**
```
<>{items.map(...)}</>
```

**Avoid:**
```
<div>{items.map(...)}</div>
```

---

### Pass ref as a prop `[Medium]`
React 19 supports ref as a prop; this is the current path for exposing DOM nodes.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/forwardRef](https://react.dev/reference/react/forwardRef)

- **Do:** Accept ref as a normal prop in new components
- **Don't:** Reach for forwardRef in new code

**Recommended:**
```
function Input({ ref, ...props }) { return <input ref={ref} {...props} /> }
```

**Avoid:**
```
const Input = forwardRef(function Input(props, ref) { ... })
```

---

### Avoid forwardRef in new code `[High]`
forwardRef is deprecated in React 19 and should be treated as legacy compatibility code.

**Applies to:** react legacy
**Documentation:** [https://react.dev/reference/react/forwardRef](https://react.dev/reference/react/forwardRef)

- **Do:** Migrate to ref as a prop for new and touched components
- **Don't:** Introduce new forwardRef wrappers

**Recommended:**
```
legacy wrapper only while migrating older code
```

**Avoid:**
```
forwardRef for all new components
```

---

## Props

### Destructure props `[Low]`
Destructure props for cleaner component code

**Applies to:** react 19.2.x

- **Do:** Destructure in function signature
- **Don't:** props.name props.value throughout

**Recommended:**
```
function User({ name, age })
```

**Avoid:**
```
function User(props)
```

---

### Provide default props values `[Low]`
Use default parameters or defaultProps

**Applies to:** react 19.2.x

- **Do:** Default values in destructuring
- **Don't:** Undefined checks throughout

**Recommended:**
```
function Button({ size = 'md' })
```

**Avoid:**
```
if (size === undefined) size = 'md'
```

---

### Avoid prop drilling `[Medium]`
Use context or composition for deeply nested data

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

- **Do:** Context for global data composition for UI
- **Don't:** Passing props through 5+ levels

**Recommended:**
```
<UserContext.Provider>
```

**Avoid:**
```
<A user={u}><B user={u}><C user={u}>
```

---

### Validate props with TypeScript `[Medium]`
Use TypeScript interfaces for prop types

**Applies to:** react 19.2.x

- **Do:** interface Props { name: string }
- **Don't:** PropTypes or no validation

**Recommended:**
```
interface ButtonProps { onClick: () => void }
```

**Avoid:**
```
Button.propTypes = {}
```

---

## Events

### Use synthetic events correctly `[Low]`
React normalizes events across browsers

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/components/common#react-event-object](https://react.dev/reference/react-dom/components/common#react-event-object)

- **Do:** e.preventDefault() e.stopPropagation()
- **Don't:** Access native event unnecessarily

**Recommended:**
```
onClick={(e) => e.preventDefault()}
```

**Avoid:**
```
onClick={(e) => e.nativeEvent.preventDefault()}
```

---

### Avoid binding in render `[Medium]`
Use arrow functions in class or hooks

**Applies to:** react 19.2.x

- **Do:** Arrow functions in functional components
- **Don't:** bind in render or constructor

**Recommended:**
```
const handleClick = () => {}
```

**Avoid:**
```
this.handleClick.bind(this)
```

---

### Pass event handlers not call results `[High]`
Pass function reference not invocation

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/responding-to-events](https://react.dev/learn/responding-to-events)

- **Do:** onClick={handleClick}
- **Don't:** onClick={handleClick()} causing immediate call

**Recommended:**
```
onClick={handleClick}
```

**Avoid:**
```
onClick={handleClick()}
```

---

## Forms

### Controlled components for forms `[Medium]`
Use state to control form inputs

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)

- **Do:** value + onChange for inputs
- **Don't:** Uncontrolled inputs with refs

**Recommended:**
```
<input value={val} onChange={setVal}>
```

**Avoid:**
```
<input ref={inputRef}>
```

---

### Handle form submission properly `[Medium]`
Prevent default and handle in submit handler

**Applies to:** react 19.2.x

- **Do:** onSubmit with preventDefault
- **Don't:** onClick on submit button only

**Recommended:**
```
<form onSubmit={handleSubmit}>
```

**Avoid:**
```
<button onClick={handleSubmit}>
```

---

### Debounce rapid input changes `[Medium]`
Debounce search/filter inputs

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useDeferredValue](https://react.dev/reference/react/useDeferredValue)

- **Do:** useDeferredValue or debounce for search
- **Don't:** Filter on every keystroke

**Recommended:**
```
useDeferredValue(searchTerm)
```

**Avoid:**
```
useEffect filtering on every change
```

---

### Use useActionState for Action state `[High]`
Track the result and pending status of a side-effecting Action.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useActionState](https://react.dev/reference/react/useActionState)

- **Do:** Pass its dispatch to a form action or call it inside startTransition
- **Don't:** Call the returned dispatch directly outside an Action

**Recommended:**
```
<form action={formAction}>...</form>
```

**Avoid:**
```
formAction(formData) // outside an Action
```

---

### Call useFormStatus from a form child `[High]`
Reads submission status from the nearest parent form.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/hooks/useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)

- **Do:** Call it in a child rendered inside the form
- **Don't:** Call it in the component that renders the form

**Recommended:**
```
function Submit(){ const { pending } = useFormStatus(); return <button disabled={pending}>Save</button> }
```

**Avoid:**
```
function Form(){ const { pending } = useFormStatus(); return <form>...</form> }
```

---

### Use form actions for Action-based submissions `[Medium]`
Passing a function to action runs it in a Transition; Server Functions can progressively enhance forms.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/components/form](https://react.dev/reference/react-dom/components/form)

- **Do:** Use a Server Function with useActionState when submission must work before hydration
- **Don't:** Claim progressive enhancement for a client-only action

**Recommended:**
```
<form action={serverAction}>...</form>
```

**Avoid:**
```
<form action={clientAction}>...</form> // requires JavaScript
```

---

## Hooks

### Follow rules of hooks `[High]`
Only call hooks at the top level of React components or custom hooks.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/rules/rules-of-hooks](https://react.dev/reference/rules/rules-of-hooks)

- **Do:** Hooks at component top level
- **Don't:** Hooks in conditions loops or callbacks

**Recommended:**
```
const [x, setX] = useState()
```

**Avoid:**
```
if (cond) { const [x, setX] = useState() }
```

---

### Custom hooks for reusable logic `[Medium]`
Extract shared stateful logic to custom hooks

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

- **Do:** useCustomHook for reusable patterns
- **Don't:** Duplicate hook logic across components

**Recommended:**
```
const { data } = useFetch(url)
```

**Avoid:**
```
Duplicate useEffect/useState in components
```

---

### Name custom hooks with use prefix `[High]`
Custom hooks must start with use

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

- **Do:** useFetch useForm useAuth
- **Don't:** fetchData or getData for hook

**Recommended:**
```
function useFetch(url)
```

**Avoid:**
```
function fetchData(url)
```

---

### Use an Effect Event for non-reactive effect logic `[High]`
Use useEffectEvent to separate event-like logic from reactive Effect dependencies.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useEffectEvent](https://react.dev/reference/react/useEffectEvent)

- **Do:** Read latest props and state inside useEffectEvent callbacks
- **Don't:** Use useEffectEvent to hide missing dependencies

**Recommended:**
```
const onConnected = useEffectEvent(() => showNotification('Connected!', theme))
```

**Avoid:**
```
useEffect(() => { log(theme) }, [])
```

---

### Use use() with stable promises or context `[Medium]`
Reads context or suspends on a promise until it resolves.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/use](https://react.dev/reference/react/use)

- **Do:** Pass a cached or otherwise stable promise to use()
- **Don't:** Create a new promise during render

**Recommended:**
```
const data = use(dataPromise)
```

**Avoid:**
```
const data = use(fetch('/api/data'))
```

---

## Context

### Use context for global data `[Medium]`
Context for theme auth locale

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

- **Do:** Context for app-wide state
- **Don't:** Context for frequently changing data

**Recommended:**
```
<ThemeContext.Provider>
```

**Avoid:**
```
Context for form field values
```

---

### Split contexts by concern `[Medium]`
Separate contexts for different domains

**Applies to:** react 19.2.x

- **Do:** ThemeContext + AuthContext
- **Don't:** One giant AppContext

**Recommended:**
```
<ThemeProvider><AuthProvider>
```

**Avoid:**
```
<AppProvider value={{theme user...}}>
```

---

### Memoize context values `[High]`
Prevent unnecessary re-renders with useMemo

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useMemo](https://react.dev/reference/react/useMemo)

- **Do:** useMemo for context value object
- **Don't:** New object reference every render

**Recommended:**
```
value={useMemo(() => ({...}), [])}
```

**Avoid:**
```
value={{ user, theme }}
```

---

## Performance

### Use React DevTools Profiler `[Medium]`
Profile to identify performance bottlenecks

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/react-developer-tools](https://react.dev/learn/react-developer-tools)

- **Do:** Profile before optimizing
- **Don't:** Optimize without measuring

**Recommended:**
```
React DevTools Profiler
```

**Avoid:**
```
Guessing at bottlenecks
```

---

### Lazy load components `[Medium]`
Use React.lazy for code splitting

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/lazy](https://react.dev/reference/react/lazy)

- **Do:** lazy() for routes and heavy components
- **Don't:** Import everything upfront

**Recommended:**
```
const Page = lazy(() => import('./Page'))
```

**Avoid:**
```
import Page from './Page'
```

---

### Virtualize long lists `[High]`
Use windowing for lists over 100 items

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)

- **Do:** react-window or react-virtual
- **Don't:** Render thousands of DOM nodes

**Recommended:**
```
<VirtualizedList items={items}/>
```

**Avoid:**
```
{items.map(i => <Item />)}
```

---

### Batch state updates `[Low]`
flushSync is a rare escape hatch for synchronous DOM reads/writes.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/queueing-a-series-of-state-updates](https://react.dev/learn/queueing-a-series-of-state-updates)

- **Do:** Let React batch related updates; use flushSync only when synchronous DOM work is required
- **Don't:** Use flushSync as a normal batching tool

**Recommended:**
```
setA(1); setB(2); // batched
```

**Avoid:**
```
flushSync(() => setA(1))
```

---

### Use React Compiler first for memoization `[High]`
React Compiler provides automatic memoization; keep manual memoization only for measured hotspots or unsupported cases.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/blog/2025/10/07/react-compiler-1](https://react.dev/blog/2025/10/07/react-compiler-1)

- **Do:** Enable the compiler, then use manual memoization only when profiling proves it helps
- **Don't:** Treat useMemo, useCallback, or React.memo as the default first answer

**Recommended:**
```
compiler-backed build plus measured useMemo or useCallback only when needed
```

**Avoid:**
```
blanket manual memoization everywhere
```

---

## ErrorHandling

### Use error boundaries `[High]`
Catch JavaScript errors in component tree

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

- **Do:** ErrorBoundary wrapping sections
- **Don't:** Let errors crash entire app

**Recommended:**
```
<ErrorBoundary><App/></ErrorBoundary>
```

**Avoid:**
```
No error handling
```

---

### Handle async errors `[High]`
Catch errors in async operations and surface failures

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)

- **Do:** Handle or report caught errors
- **Don't:** Unhandled or silently swallowed promise rejections

**Recommended:**
```
try { await save() } catch (error) { setError(error) }
```

**Avoid:**
```
await save() // no catch
```

---

## Testing

### Test behavior not implementation `[Medium]`
Test what user sees and does

**Applies to:** react 19.2.x
**Documentation:** [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)

- **Do:** Test renders and interactions
- **Don't:** Test internal state or methods

**Recommended:**
```
expect(screen.getByText('Hello'))
```

**Avoid:**
```
expect(component.state.name)
```

---

### Use testing-library queries `[Medium]`
Use accessible queries

**Applies to:** react 19.2.x
**Documentation:** [https://testing-library.com/docs/queries/about#priority](https://testing-library.com/docs/queries/about#priority)

- **Do:** getByRole getByLabelText
- **Don't:** getByTestId for everything

**Recommended:**
```
getByRole('button')
```

**Avoid:**
```
getByTestId('submit-btn')
```

---

## Accessibility

### Use semantic HTML `[High]`
Use semantic HTML elements for their intended behavior.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/components#all-html-components](https://react.dev/reference/react-dom/components#all-html-components)

- **Do:** button for clicks nav for navigation
- **Don't:** div with onClick for buttons

**Recommended:**
```
<button onClick={...}>
```

**Avoid:**
```
<div onClick={...}>
```

---

### Manage focus properly `[High]`
Handle focus for modals dialogs

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef)

- **Do:** Focus trap in modals return focus on close
- **Don't:** No focus management

**Recommended:**
```
useEffect to focus input
```

**Avoid:**
```
Modal without focus trap
```

---

### Announce dynamic content `[Medium]`
Use ARIA live regions for updates

**Applies to:** react 19.2.x

- **Do:** aria-live for dynamic updates
- **Don't:** Silent updates to screen readers

**Recommended:**
```
<div aria-live="polite">{msg}</div>
```

**Avoid:**
```
<div>{msg}</div>
```

---

### Label form controls `[High]`
Associate labels with inputs

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react-dom/components/input](https://react.dev/reference/react-dom/components/input)

- **Do:** htmlFor matching input id
- **Don't:** Placeholder as only label

**Recommended:**
```
<label htmlFor="email">Email</label>
```

**Avoid:**
```
<input placeholder="Email"/>
```

---

## TypeScript

### Type component props `[High]`
Define interfaces for all props

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)

- **Do:** interface Props with all prop types
- **Don't:** any or missing types

**Recommended:**
```
interface Props { name: string }
```

**Avoid:**
```
function Component(props: any)
```

---

### Type state properly `[Medium]`
Provide types for useState

**Applies to:** react 19.2.x

- **Do:** useState<Type>() for complex state
- **Don't:** Inferred any types

**Recommended:**
```
useState<User | null>(null)
```

**Avoid:**
```
useState(null)
```

---

### Type event handlers `[Medium]`
Use React event types

**Applies to:** react 19.2.x

- **Do:** React.ChangeEvent<HTMLInputElement>
- **Don't:** Generic Event type

**Recommended:**
```
onChange: React.ChangeEvent<HTMLInputElement>
```

**Avoid:**
```
onChange: Event
```

---

### Use generics for reusable components `[Medium]`
Generic components for flexible typing

**Applies to:** react 19.2.x

- **Do:** Generic props for list components
- **Don't:** Union types for flexibility

**Recommended:**
```
<List<T> items={T[]}>
```

**Avoid:**
```
<List items={any[]}>
```

---

## Patterns

### Container/Presentational split `[Low]`
Separate data logic from UI

**Applies to:** react 19.2.x

- **Do:** Container fetches presentational renders
- **Don't:** Mixed data and UI in one

**Recommended:**
```
<UserContainer><UserView/></UserContainer>
```

**Avoid:**
```
<User /> with fetch and render
```

---

### Render props for flexibility `[Low]`
Share code via render prop pattern

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop](https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop)

- **Do:** Render prop for customizable rendering
- **Don't:** Duplicate logic across components

**Recommended:**
```
<DataFetcher render={data => ...}/>
```

**Avoid:**
```
Copy paste fetch logic
```

---

### Compound components `[Low]`
Related components sharing state

**Applies to:** react 19.2.x

- **Do:** Tab + TabPanel sharing context
- **Don't:** Prop drilling between related

**Recommended:**
```
<Tabs><Tab/><TabPanel/></Tabs>
```

**Avoid:**
```
<Tabs tabs={[]} panels={[...]}/>
```

---

## Tooling

### Use eslint-plugin-react-hooks recommended preset `[Medium]`
React Compiler lint rules now ship through eslint-plugin-react-hooks recommended presets.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/blog/2025/10/07/react-compiler-1](https://react.dev/blog/2025/10/07/react-compiler-1)

- **Do:** Use the recommended hooks preset with compiler-aware linting
- **Don't:** Pin older compiler-lint packages as the primary workflow

**Recommended:**
```
reactHooks.configs.flat.recommended
```

**Avoid:**
```
eslint-plugin-react-compiler as the main lint path
```

---

### Treat eslint-plugin-react-compiler as legacy `[Medium]`
The React Compiler release recommends eslint-plugin-react-hooks instead of the older compiler-only lint package.

**Applies to:** react legacy
**Documentation:** [https://react.dev/blog/2025/10/07/react-compiler-1](https://react.dev/blog/2025/10/07/react-compiler-1)

- **Do:** Use eslint-plugin-react-hooks recommended presets
- **Don't:** Standardize on eslint-plugin-react-compiler

**Recommended:**
```
plugin:react-hooks/recommended
```

**Avoid:**
```
eslint-plugin-react-compiler
```

---

## Concurrency

### Use Actions with async startTransition `[Medium]`
React 19 Actions let async state updates run as one transition and include side effects.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/startTransition](https://react.dev/reference/react/startTransition)

- **Do:** Wrap background state updates and async work in startTransition
- **Don't:** Assume Actions are only for synchronous state updates

**Recommended:**
```
startTransition(async () => { await save(); setState(next) })
```

**Avoid:**
```
await save(); setState(next)
```

---

### Call useOptimistic updates inside an Action `[Medium]`
Temporarily shows the expected state while an Action is pending.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/reference/react/useOptimistic](https://react.dev/reference/react/useOptimistic)

- **Do:** Call the optimistic setter inside startTransition or an action prop
- **Don't:** Call the optimistic setter outside an Action

**Recommended:**
```
startTransition(async () => { addOptimistic(item); await save(item); })
```

**Avoid:**
```
addOptimistic(item); await save(item)
```

---

## Security

### Require React 19.2.1+ for RSC code paths `[Critical]`
React Server Components had an unauthenticated RCE in 19.2.0; treat 19.2.1+ as the security floor.

**Applies to:** react 19.2.x
**Documentation:** [https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)

- **Do:** Pin React RSC stacks to 19.2.1 or newer
- **Don't:** Ship 19.2.0 or older on any RSC endpoint

**Recommended:**
```
react@19.2.1+ react-dom@19.2.1+
```

**Avoid:**
```
react@19.2.0
```

---
