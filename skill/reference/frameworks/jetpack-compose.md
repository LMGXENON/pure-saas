# Jetpack Compose Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`jetpack-compose.csv`)
> Framework: Jetpack Compose
> Rules Count: 52 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Jetpack Compose** projects.

---

## Composable

### Pure UI composables `[High]`
Composable functions should only render UI

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/mental-model](https://developer.android.com/jetpack/compose/mental-model)

- **Do:** Accept state and callbacks
- **Don't:** Calling usecase/repo

**Recommended:**
```
Pure UI composable
```

**Avoid:**
```
Business logic in UI
```

---

### Small composables `[Medium]`
Each composable has single responsibility

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Split into components
- **Don't:** Huge composable

**Recommended:**
```
Reusable UI
```

**Avoid:**
```
Monolithic UI
```

---

### Stateless by default `[High]`
Prefer stateless composables

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/state#state-hoisting](https://developer.android.com/jetpack/compose/state#state-hoisting)

- **Do:** Hoist state
- **Don't:** Local mutable state

**Recommended:**
```
Stateless UI
```

**Avoid:**
```
Hidden state
```

---

## State

### Single source of truth `[High]`
UI state comes from one source

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/architecture/ui-layer](https://developer.android.com/topic/architecture/ui-layer)

- **Do:** StateFlow from VM
- **Don't:** Multiple states

**Recommended:**
```
Unified UiState
```

**Avoid:**
```
Scattered state
```

---

### Model UI State `[High]`
Use sealed interface/data class

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/architecture/ui-layer#define-ui-state](https://developer.android.com/topic/architecture/ui-layer#define-ui-state)

- **Do:** UiState.Loading
- **Don't:** Boolean flags

**Recommended:**
```
Explicit state
```

**Avoid:**
```
Flag hell
```

---

### remember only UI state `[High]`
remember for UI-only state

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/state](https://developer.android.com/jetpack/compose/state)

- **Do:** Scroll, animation
- **Don't:** Business state

**Recommended:**
```
Correct remember
```

**Avoid:**
```
Misuse remember
```

---

### rememberSaveable `[High]`
Persist state across config

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/state#restore-ui-state](https://developer.android.com/jetpack/compose/state#restore-ui-state)

- **Do:** rememberSaveable
- **Don't:** remember

**Recommended:**
```
State survives
```

**Avoid:**
```
State lost
```

---

### derivedStateOf `[Medium]`
Optimize recomposition

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/performance](https://developer.android.com/jetpack/compose/performance)

- **Do:** derivedStateOf
- **Don't:** Recompute always

**Recommended:**
```
Optimized
```

**Avoid:**
```
Jank
```

---

### Snapshot state only `[Medium]`
Use Compose state

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** mutableStateOf
- **Don't:** Custom observable

**Recommended:**
```
Compose aware
```

**Avoid:**
```
Buggy UI
```

---

### Avoid mutable collections `[High]`
Immutable list/map

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/state#other-supported-types-of-state](https://developer.android.com/develop/ui/compose/state#other-supported-types-of-state)

- **Do:** PersistentList
- **Don't:** MutableList

**Recommended:**
```
Stable UI
```

**Avoid:**
```
Silent bug
```

---

## SideEffect

### LaunchedEffect keys `[High]`
Use correct keys

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/side-effects](https://developer.android.com/jetpack/compose/side-effects)

- **Do:** LaunchedEffect(id)
- **Don't:** LaunchedEffect(Unit)

**Recommended:**
```
Scoped effect
```

**Avoid:**
```
Infinite loop
```

---

### rememberUpdatedState `[Medium]`
Avoid stale lambdas

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/side-effects](https://developer.android.com/jetpack/compose/side-effects)

- **Do:** rememberUpdatedState
- **Don't:** Capture directly

**Recommended:**
```
Safe callback
```

**Avoid:**
```
Stale state
```

---

### DisposableEffect `[High]`
Clean up resources

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/side-effects#disposableeffect](https://developer.android.com/develop/ui/compose/side-effects#disposableeffect)

- **Do:** onDispose
- **Don't:** No cleanup

**Recommended:**
```
No leak
```

**Avoid:**
```
Memory leak
```

---

## Architecture

### Unidirectional data flow `[High]`
UI → VM → State

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/architecture](https://developer.android.com/topic/architecture)

- **Do:** onEvent
- **Don't:** Two-way binding

**Recommended:**
```
Predictable flow
```

**Avoid:**
```
Hard debug
```

---

### No business logic in UI `[High]`
Logic belongs to VM

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/architecture/recommendations#separation-of-concerns](https://developer.android.com/topic/architecture/recommendations#separation-of-concerns)

- **Do:** Collect state
- **Don't:** Call repo

**Recommended:**
```
Clean UI
```

**Avoid:**
```
Fat UI
```

---

### Expose immutable state `[High]`
Expose StateFlow

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/kotlin/flow/stateflow-and-sharedflow#stateflow](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow#stateflow)

- **Do:** asStateFlow
- **Don't:** Mutable exposed

**Recommended:**
```
Safe API
```

**Avoid:**
```
State mutation
```

---

## Lifecycle

### Lifecycle-aware collect `[High]`
Use collectAsStateWithLifecycle

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/reference/kotlin/androidx/lifecycle/compose/collectAsStateWithLifecycle.composable](https://developer.android.com/reference/kotlin/androidx/lifecycle/compose/collectAsStateWithLifecycle.composable)

- **Do:** Lifecycle aware
- **Don't:** collectAsState

**Recommended:**
```
No leak
```

**Avoid:**
```
Leak
```

---

### RememberCoroutineScope usage `[Medium]`
Only for UI jobs

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/side-effects#remembercoroutinescope](https://developer.android.com/jetpack/compose/side-effects#remembercoroutinescope)

- **Do:** UI coroutine
- **Don't:** Long jobs

**Recommended:**
```
Scoped job
```

**Avoid:**
```
Leak
```

---

## Navigation

### Event-based navigation `[High]`
VM emits navigation event

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/navigation](https://developer.android.com/jetpack/compose/navigation)

- **Do:** VM: Channel + receiveAsFlow(), V: Collect with Dispatchers.Main.immediate
- **Don't:** Nav in UI

**Recommended:**
```
Decoupled nav
```

**Avoid:**
```
Using State / SharedFlow for navigation -> event is replayed and navigation fires again (StateFlow)
```

---

### Typed routes `[Medium]`
Use sealed routes

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** sealed class Route
- **Don't:** String routes

**Recommended:**
```
Type-safe
```

**Avoid:**
```
Runtime crash
```

---

## Performance

### Stable parameters `[High]`
Prefer immutable/stable params

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/performance](https://developer.android.com/jetpack/compose/performance)

- **Do:** @Immutable
- **Don't:** Mutable params

**Recommended:**
```
Stable recomposition
```

**Avoid:**
```
Extra recomposition
```

---

### Use key in Lazy `[High]`
Provide stable keys

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/lists#item-keys](https://developer.android.com/develop/ui/compose/lists#item-keys)

- **Do:** key=id
- **Don't:** No key

**Recommended:**
```
Stable list
```

**Avoid:**
```
Item jump
```

---

### Avoid heavy work `[High]`
No heavy computation in UI

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/performance/bestpractices#use-remember](https://developer.android.com/develop/ui/compose/performance/bestpractices#use-remember)

- **Do:** Precompute in VM
- **Don't:** Compute in UI

**Recommended:**
```
Smooth UI
```

**Avoid:**
```
Jank
```

---

### Remember expensive objects `[Medium]`
remember heavy objects

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** remember
- **Don't:** Recreate each recomposition

**Recommended:**
```
Efficient
```

**Avoid:**
```
Wasteful
```

---

## Theming

### Design system `[High]`
Centralized theme

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/themes](https://developer.android.com/jetpack/compose/themes)

- **Do:** Material3 tokens
- **Don't:** Hardcoded values

**Recommended:**
```
Consistent UI
```

**Avoid:**
```
Inconsistent
```

---

### Dark mode support `[Medium]`
Theme-based colors

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** colorScheme
- **Don't:** Fixed color

**Recommended:**
```
Adaptive UI
```

**Avoid:**
```
Broken dark
```

---

### No hardcoded text style `[Medium]`
Use typography

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** MaterialTheme.typography
- **Don't:** Hardcode sp

**Recommended:**
```
Scalable
```

**Avoid:**
```
Inconsistent
```

---

## Layout

### Prefer Modifier over extra layouts `[High]`
Use Modifier to adjust layout instead of adding wrapper composables

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/modifiers](https://developer.android.com/jetpack/compose/modifiers)

- **Do:** Use Modifier.padding()
- **Don't:** Wrap content with extra Box

**Recommended:**
```
Padding via modifier
```

**Avoid:**
```
Box just for padding
```

---

### Avoid deep layout nesting `[High]`
Deep layout trees increase measure & layout cost

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/layouts/basics](https://developer.android.com/develop/ui/compose/layouts/basics)

- **Do:** Keep layout flat
- **Don't:** Box ? Column ? Box ? Row

**Recommended:**
```
Flat hierarchy
```

**Avoid:**
```
Deep nested tree
```

---

### Use Row/Column for linear layout `[High]`
Linear layouts are simpler and more performant

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/layouts/basics#row](https://developer.android.com/develop/ui/compose/layouts/basics#row)

- **Do:** Use Row / Column
- **Don't:** Custom layout for simple cases

**Recommended:**
```
Row/Column usage
```

**Avoid:**
```
Over-engineered layout
```

---

### Use Box only for overlapping content `[Medium]`
Box should be used only when children overlap

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Stack elements
- **Don't:** Use Box as Column

**Recommended:**
```
Proper overlay
```

**Avoid:**
```
Misused Box
```

---

### Prefer LazyColumn over Column scroll `[High]`
Lazy layouts are virtualized and efficient

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/lists](https://developer.android.com/jetpack/compose/lists)

- **Do:** LazyColumn
- **Don't:** Column.verticalScroll()

**Recommended:**
```
Lazy list
```

**Avoid:**
```
Scrollable Column
```

---

### Avoid nested scroll containers `[High]`
Nested scrolling causes UX & performance issues

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/touch-input/pointer-input/scroll#nested-scrolling](https://developer.android.com/develop/ui/compose/touch-input/pointer-input/scroll#nested-scrolling)

- **Do:** Single scroll container
- **Don't:** Scroll inside scroll

**Recommended:**
```
One scroll per screen
```

**Avoid:**
```
Nested scroll
```

---

### Avoid fillMaxSize by default `[Medium]`
fillMaxSize may break parent constraints

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Use exact size
- **Don't:** Fill max everywhere

**Recommended:**
```
Constraint-aware size
```

**Avoid:**
```
Overfilled layout
```

---

### Avoid intrinsic size unless necessary `[High]`
Intrinsic measurement is expensive

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/layout/intrinsics](https://developer.android.com/jetpack/compose/layout/intrinsics)

- **Do:** Explicit sizing
- **Don't:** IntrinsicSize.Min

**Recommended:**
```
Predictable layout
```

**Avoid:**
```
Expensive measure
```

---

### Use Arrangement and Alignment APIs `[High]`
Declare layout intent explicitly

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/layouts/basics#align-items](https://developer.android.com/develop/ui/compose/layouts/basics#align-items)

- **Do:** Use Arrangement / Alignment
- **Don't:** Manual spacing hacks

**Recommended:**
```
Declarative spacing
```

**Avoid:**
```
Magic spacing
```

---

### Extract reusable layout patterns `[High]`
Repeated layouts should be shared

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/develop/ui/compose/components](https://developer.android.com/develop/ui/compose/components)

- **Do:** Create layout composable
- **Don't:** Copy-paste layouts

**Recommended:**
```
Reusable scaffold
```

**Avoid:**
```
Duplicated layout
```

---

## Testing

### Stateless UI testing `[High]`
Composable easy to test

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/testing](https://developer.android.com/jetpack/compose/testing)

- **Do:** Pass state
- **Don't:** Hidden state

**Recommended:**
```
Testable
```

**Avoid:**
```
Hard test
```

---

### Use testTag `[Medium]`
Stable UI selectors

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Modifier.testTag
- **Don't:** Find by text

**Recommended:**
```
Stable tests
```

**Avoid:**
```
Flaky tests
```

---

## Preview

### Multiple previews `[Low]`
Preview multiple states

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/tooling/preview](https://developer.android.com/jetpack/compose/tooling/preview)

- **Do:** @Preview
- **Don't:** Single preview

**Recommended:**
```
Better dev UX
```

**Avoid:**
```
Misleading
```

---

## DI

### Inject VM via Hilt `[High]`
Use hiltViewModel

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/training/dependency-injection/hilt-jetpack](https://developer.android.com/training/dependency-injection/hilt-jetpack)

- **Do:** @HiltViewModel
- **Don't:** Manual VM

**Recommended:**
```
Clean DI
```

**Avoid:**
```
Coupling
```

---

### No DI in UI `[High]`
Inject in VM

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/architecture/recommendations#dependency-injection](https://developer.android.com/topic/architecture/recommendations#dependency-injection)

- **Do:** Constructor inject
- **Don't:** Inject composable

**Recommended:**
```
Proper scope
```

**Avoid:**
```
Wrong scope
```

---

## Accessibility

### Content description `[Medium]`
Accessible UI

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/accessibility](https://developer.android.com/jetpack/compose/accessibility)

- **Do:** contentDescription
- **Don't:** Ignore a11y

**Recommended:**
```
Inclusive
```

**Avoid:**
```
A11y fail
```

---

### Semantics `[Medium]`
Use semantics API

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Modifier.semantics
- **Don't:** None

**Recommended:**
```
Testable a11y
```

**Avoid:**
```
Invisible
```

---

## Animation

### Compose animation APIs `[Medium]`
Use animate*AsState

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/animation](https://developer.android.com/jetpack/compose/animation)

- **Do:** AnimatedVisibility
- **Don't:** Manual anim

**Recommended:**
```
Smooth
```

**Avoid:**
```
Jank
```

---

### Avoid animation logic in VM `[Low]`
Animation is UI concern

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Animate in UI
- **Don't:** Animate in VM

**Recommended:**
```
Correct layering
```

**Avoid:**
```
Mixed concern
```

---

## Modularization

### Feature-based UI modules `[High]`
UI per feature

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/topic/modularization](https://developer.android.com/topic/modularization)

- **Do:** :feature:ui
- **Don't:** God module

**Recommended:**
```
Scalable
```

**Avoid:**
```
Tight coupling
```

---

### Public UI contracts `[Medium]`
Expose minimal UI API

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Interface/Route
- **Don't:** Expose impl

**Recommended:**
```
Encapsulated
```

**Avoid:**
```
Leaky module
```

---

## Interop

### Interop View carefully `[Low]`
Use AndroidView

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/jetpack/compose/interop](https://developer.android.com/jetpack/compose/interop)

- **Do:** Isolated usage
- **Don't:** Mix everywhere

**Recommended:**
```
Safe interop
```

**Avoid:**
```
Messy UI
```

---

### Avoid legacy patterns `[Medium]`
No LiveData in UI

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** StateFlow
- **Don't:** LiveData

**Recommended:**
```
Modern stack
```

**Avoid:**
```
Legacy debt
```

---

## Debug

### Use layout inspector `[Low]`
Inspect recomposition

**Applies to:** jetpack-compose 1.11.4 (current stable)
**Documentation:** [https://developer.android.com/studio/debug/layout-inspector](https://developer.android.com/studio/debug/layout-inspector)

- **Do:** Tools
- **Don't:** Blind debug

**Recommended:**
```
Fast debug
```

**Avoid:**
```
Guessing
```

---

### Enable recomposition counts `[Low]`
Track recomposition

**Applies to:** jetpack-compose 1.11.4 (current stable)

- **Do:** Debug flags
- **Don't:** Ignore

**Recommended:**
```
Performance aware
```

**Avoid:**
```
Hidden jank
```

---
