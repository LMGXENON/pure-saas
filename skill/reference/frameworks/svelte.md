# Svelte Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`svelte.csv`)
> Framework: Svelte
> Rules Count: 55 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Svelte** projects.

---

## Reactivity

### Use $: for reactive statements `[Medium]`
Legacy-mode automatic dependency tracking

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-reactive-assignments](https://svelte.dev/docs/svelte/legacy-reactive-assignments)

- **Do:** $: only while maintaining a legacy-mode component
- **Don't:** Use $: in new runes-mode code

**Recommended:**
```
$: doubled = count * 2
```

**Avoid:**
```
let doubled = $derived(count * 2)
```

---

### Trigger legacy reactivity with assignment `[High]`
Legacy-mode reactivity tracks assignments

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-let](https://svelte.dev/docs/svelte/legacy-let)

- **Do:** Reassign arrays or objects in legacy mode
- **Don't:** Treat assignment as the Svelte 5 runes contract

**Recommended:**
```
items = [...items, newItem]
```

**Avoid:**
```
let items = $state([])
```

---

### Use $state in Svelte 5 `[Medium]`
Runes for explicit reactivity

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/blog/runes](https://svelte.dev/blog/runes)

- **Do:** let count = $state(0)
- **Don't:** Implicit reactivity in Svelte 5

**Recommended:**
```
let count = $state(0)
```

**Avoid:**
```
let count = 0 (Svelte 5)
```

---

### Use $derived for computed values `[Medium]`
$derived replaces $: in Svelte 5

**Applies to:** svelte 5

- **Do:** let doubled = $derived(count * 2)
- **Don't:** $: in Svelte 5

**Recommended:**
```
let doubled = $derived(count * 2)
```

**Avoid:**
```
$: doubled = count * 2 (Svelte 5)
```

---

### Use $effect for side effects `[Medium]`
$effect replaces $: side effects

**Applies to:** svelte 5

- **Do:** Use $effect for subscriptions
- **Don't:** $: for side effects in Svelte 5

**Recommended:**
```
$effect(() => console.log(count))
```

**Avoid:**
```
$: console.log(count) (Svelte 5)
```

---

## Props

### Use export let for legacy props `[High]`
Declare props with export let only in legacy mode

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-export-let](https://svelte.dev/docs/svelte/legacy-export-let)

- **Do:** Retain export let while maintaining legacy components
- **Don't:** Introduce export let in new runes-mode components

**Recommended:**
```
export let count = 0
```

**Avoid:**
```
let { count = 0 } = $props()
```

---

### Use $props in Svelte 5 `[Medium]`
$props rune for prop access

**Applies to:** svelte 5

- **Do:** let { name } = $props()
- **Don't:** export let in Svelte 5

**Recommended:**
```
let { name, age = 0 } = $props()
```

**Avoid:**
```
export let name; export let age = 0
```

---

### Provide prop default values `[Low]`
Destructure defaults from $props

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/$props](https://svelte.dev/docs/svelte/$props)

- **Do:** Use defaults in $props destructuring
- **Don't:** Add separate fallback mutation

**Recommended:**
```
let { count = 0 } = $props()
```

**Avoid:**
```
let { count } = $props(); count ??= 0
```

---

### Use rest props in runes mode `[Low]`
Pass through unknown props with $props rest destructuring

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/$props](https://svelte.dev/docs/svelte/$props)

- **Do:** Spread a rest object onto the element
- **Don't:** Use legacy $$restProps

**Recommended:**
```
let { class: className, ...rest } = $props(); <button {...rest}>
```

**Avoid:**
```
<button {...$$restProps}>
```

---

## Bindings

### Use bind: for two-way binding `[Low]`
Simplified input handling

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/element-directives#bind-property](https://svelte.dev/docs/element-directives#bind-property)

- **Do:** bind:value for inputs
- **Don't:** on:input with manual update

**Recommended:**
```
<input bind:value={name}>
```

**Avoid:**
```
<input value={name} on:input={e => name = e.target.value}>
```

---

### Bind to DOM elements `[Medium]`
Reference DOM nodes

**Applies to:** svelte 5

- **Do:** bind:this for element reference
- **Don't:** querySelector in onMount

**Recommended:**
```
<div bind:this={el}>
```

**Avoid:**
```
onMount(() => el = document.querySelector())
```

---

### Use bind:group for radios/checkboxes `[Low]`
Simplified group handling

**Applies to:** svelte 5

- **Do:** bind:group for radio/checkbox groups
- **Don't:** Manual checked handling

**Recommended:**
```
<input type="radio" bind:group={selected}>
```

**Avoid:**
```
<input type="radio" checked={selected === value}>
```

---

## Events

### Use on: for legacy event handlers `[Medium]`
Event directive syntax for legacy components

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-on](https://svelte.dev/docs/svelte/legacy-on)

- **Do:** on:click only while maintaining legacy mode
- **Don't:** Introduce on: handlers in runes mode

**Recommended:**
```
<button on:click={handleClick}>
```

**Avoid:**
```
<button onclick={handleClick}>
```

---

### Forward events with on:event in legacy mode `[Low]`
Legacy event forwarding without a handler

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-on](https://svelte.dev/docs/svelte/legacy-on)

- **Do:** on:click only for a legacy component
- **Don't:** Use legacy forwarding in runes mode

**Recommended:**
```
<button on:click>
```

**Avoid:**
```
<button onclick={onclick}>
```

---

### Use createEventDispatcher only in legacy components `[Medium]`
Legacy custom component events

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/svelte#createeventdispatcher](https://svelte.dev/docs/svelte/svelte#createeventdispatcher)

- **Do:** Retain dispatch while maintaining legacy components
- **Don't:** Add createEventDispatcher to new runes-mode code

**Recommended:**
```
dispatch('save', { data })
```

**Avoid:**
```
let { onsave } = $props()
```

---

### Use event properties in runes mode `[High]`
Svelte 5 event handlers are component or element properties

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/v5-migration-guide#event-changes](https://svelte.dev/docs/svelte/v5-migration-guide#event-changes)

- **Do:** Use onclick and callback props for new code
- **Don't:** Use on: directives or createEventDispatcher in runes mode

**Recommended:**
```
<button onclick={handleClick}>Save</button>
```

**Avoid:**
```
<button on:click={handleClick}>Save</button>
```

---

## Lifecycle

### Use onMount for initialization `[High]`
Run code after component mounts

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte#onmount](https://svelte.dev/docs/svelte#onmount)

- **Do:** onMount for setup and data fetching
- **Don't:** Code in script body for side effects

**Recommended:**
```
onMount(() => fetchData())
```

**Avoid:**
```
fetchData() in script body
```

---

### Return cleanup from onMount `[Medium]`
Automatic cleanup on destroy

**Applies to:** svelte 5

- **Do:** Return function from onMount
- **Don't:** Separate onDestroy for paired cleanup

**Recommended:**
```
onMount(() => { sub(); return unsub })
```

**Avoid:**
```
onMount(sub); onDestroy(unsub)
```

---

### Use onDestroy sparingly `[Low]`
Only when onMount cleanup not possible

**Applies to:** svelte 5

- **Do:** onDestroy for non-mount cleanup
- **Don't:** onDestroy for mount-related cleanup

**Recommended:**
```
onDestroy for store unsubscribe
```

**Avoid:**
```
onDestroy(() => clearInterval(id))
```

---

### Avoid beforeUpdate and afterUpdate `[Low]`
Legacy lifecycle hooks are unavailable in runes mode

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/lifecycle-hooks](https://svelte.dev/docs/svelte/lifecycle-hooks)

- **Do:** Use $effect.pre and $effect only when synchronization is required
- **Don't:** Use lifecycle hooks or reactive assignments for derived state

**Recommended:**
```
$effect.pre(() => measure())
```

**Avoid:**
```
beforeUpdate(() => measure())
```

---

## Stores

### Use writable for mutable state `[Medium]`
Basic reactive store

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte-store#writable](https://svelte.dev/docs/svelte-store#writable)

- **Do:** writable for shared mutable state
- **Don't:** Local variables for shared state

**Recommended:**
```
const count = writable(0)
```

**Avoid:**
```
let count = 0 in module
```

---

### Use readable for read-only state `[Low]`
External data sources

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte-store#readable](https://svelte.dev/docs/svelte-store#readable)

- **Do:** readable for derived/external data
- **Don't:** writable for read-only data

**Recommended:**
```
readable(0, set => interval(set))
```

**Avoid:**
```
writable(0) for timer
```

---

### Use derived for computed stores `[Medium]`
Combine or transform stores

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte-store#derived](https://svelte.dev/docs/svelte-store#derived)

- **Do:** derived for computed values
- **Don't:** Manual subscription for derived

**Recommended:**
```
derived(count, $c => $c * 2)
```

**Avoid:**
```
count.subscribe(c => doubled = c * 2)
```

---

### Use $ prefix for auto-subscription `[High]`
Automatic subscribe/unsubscribe

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/stores](https://svelte.dev/docs/svelte/stores)

- **Do:** $storeName in components
- **Don't:** Manual subscription

**Recommended:**
```
{$count}
```

**Avoid:**
```
count.subscribe(c => value = c)
```

---

### Clean up custom subscriptions `[High]`
Unsubscribe when component destroys

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/stores](https://svelte.dev/docs/svelte/stores)

- **Do:** Return unsubscribe from onMount
- **Don't:** Leave subscriptions open

**Recommended:**
```
onMount(() => store.subscribe(fn))
```

**Avoid:**
```
store.subscribe(fn) in script
```

---

## Slots

### Use slots for legacy composition `[Medium]`
Legacy content projection with slot elements

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-slots](https://svelte.dev/docs/svelte/legacy-slots)

- **Do:** Retain slots while maintaining legacy components
- **Don't:** Introduce slot elements in runes-mode components

**Recommended:**
```
<slot>Default</slot>
```

**Avoid:**
```
{@render children()}
```

---

### Use named slots for legacy areas `[Low]`
Legacy composition with multiple slot elements

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-slots](https://svelte.dev/docs/svelte/legacy-slots)

- **Do:** Retain named slots only in legacy components
- **Don't:** Add named slots to new runes-mode code

**Recommended:**
```
<slot name="header">
```

**Avoid:**
```
{@render header()}
```

---

### Check slot content with $$slots in legacy mode `[Low]`
Legacy conditional slot rendering

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/legacy-$$slots](https://svelte.dev/docs/svelte/legacy-$$slots)

- **Do:** Retain $$slots only in legacy components
- **Don't:** Use $$slots in runes mode

**Recommended:**
```
{#if $$slots.footer}<slot name="footer"/>{/if}
```

**Avoid:**
```
{#if footer}{@render footer()}{/if}
```

---

## Styling

### Use scoped styles by default `[Medium]`
Styles scoped to component

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte-components#style](https://svelte.dev/docs/svelte-components#style)

- **Do:** <style> for component styles
- **Don't:** Global styles for component

**Recommended:**
```
:global() only when needed
```

**Avoid:**
```
<style> all global
```

---

### Use :global() sparingly `[Medium]`
Escape scoping when needed

**Applies to:** svelte 5

- **Do:** :global for third-party styling
- **Don't:** Global for all styles

**Recommended:**
```
:global(.external-lib)
```

**Avoid:**
```
<style> without scoping
```

---

### Use CSS variables for theming `[Low]`
Dynamic styling

**Applies to:** svelte 5

- **Do:** CSS custom properties
- **Don't:** Inline styles for themes

**Recommended:**
```
style="--color: {color}"
```

**Avoid:**
```
style="color: {color}"
```

---

## Transitions

### Use built-in transitions `[Low]`
Svelte transition directives

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/element-directives#transition-fn](https://svelte.dev/docs/element-directives#transition-fn)

- **Do:** transition:fade for simple effects
- **Don't:** Manual CSS transitions

**Recommended:**
```
<div transition:fade>
```

**Avoid:**
```
<div class:fade={visible}>
```

---

### Use in: and out: separately `[Low]`
Different enter/exit animations

**Applies to:** svelte 5

- **Do:** in:fly out:fade for asymmetric
- **Don't:** Same transition for both

**Recommended:**
```
<div in:fly out:fade>
```

**Avoid:**
```
<div transition:fly>
```

---

### Add local modifier `[Medium]`
Prevent ancestor trigger

**Applies to:** svelte 5

- **Do:** transition:fade|local
- **Don't:** Global transitions for lists

**Recommended:**
```
<div transition:slide|local>
```

**Avoid:**
```
<div transition:slide>
```

---

## Actions

### Use actions for DOM behavior `[Medium]`
Reusable DOM logic

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/element-directives#use-action](https://svelte.dev/docs/element-directives#use-action)

- **Do:** use:action for DOM enhancements
- **Don't:** onMount for each usage

**Recommended:**
```
<div use:clickOutside>
```

**Avoid:**
```
onMount(() => setupClickOutside(el))
```

---

### Return update and destroy `[Medium]`
Lifecycle methods for actions

**Applies to:** svelte 5

- **Do:** Return { update, destroy }
- **Don't:** Only initial setup

**Recommended:**
```
return { update(params) {}, destroy() {} }
```

**Avoid:**
```
return destroy only
```

---

### Pass parameters to actions `[Low]`
Configure action behavior

**Applies to:** svelte 5

- **Do:** use:action={params}
- **Don't:** Hardcoded action behavior

**Recommended:**
```
<div use:tooltip={options}>
```

**Avoid:**
```
<div use:tooltip>
```

---

## Logic

### Use {#if} for conditionals `[Low]`
Template conditionals

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/logic-blocks#if](https://svelte.dev/docs/logic-blocks#if)

- **Do:** {#if} {:else if} {:else}
- **Don't:** Ternary in expressions

**Recommended:**
```
{#if cond}...{:else}...{/if}
```

**Avoid:**
```
{cond ? a : b} for complex
```

---

### Use {#each} for lists `[Medium]`
List rendering

**Applies to:** svelte 5

- **Do:** {#each} with key
- **Don't:** Map in expression

**Recommended:**
```
{#each items as item (item.id)}
```

**Avoid:**
```
{items.map(i => `<div>${i}</div>`)}
```

---

### Always use keys in {#each} `[High]`
Proper list reconciliation

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/each](https://svelte.dev/docs/svelte/each)

- **Do:** (item.id) for unique key
- **Don't:** Index as key or no key

**Recommended:**
```
{#each items as item (item.id)}
```

**Avoid:**
```
{#each items as item, i (i)}
```

---

### Use {#await} for promises `[Medium]`
Handle async states

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/logic-blocks#await](https://svelte.dev/docs/logic-blocks#await)

- **Do:** {#await} for loading/error states
- **Don't:** Manual promise handling

**Recommended:**
```
{#await promise}...{:then}...{:catch}
```

**Avoid:**
```
{#if loading}...{#if error}
```

---

## SvelteKit

### Use +page.svelte for routes `[Medium]`
File-based routing

**Applies to:** svelte 5
**Documentation:** [https://kit.svelte.dev/docs/routing](https://kit.svelte.dev/docs/routing)

- **Do:** +page.svelte for route components
- **Don't:** Custom routing setup

**Recommended:**
```
routes/about/+page.svelte
```

**Avoid:**
```
routes/About.svelte
```

---

### Use +page.js for data loading `[High]`
Load data before render

**Applies to:** svelte 5
**Documentation:** [https://kit.svelte.dev/docs/load](https://kit.svelte.dev/docs/load)

- **Do:** load function in +page.js
- **Don't:** onMount for data fetching

**Recommended:**
```
export function load() {}
```

**Avoid:**
```
onMount(() => fetchData())
```

---

### Use +page.server.js for server-only `[High]`
Server-side data loading

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/kit/load#universal-vs-server](https://svelte.dev/docs/kit/load#universal-vs-server)

- **Do:** +page.server.js for sensitive data
- **Don't:** +page.js for API keys

**Recommended:**
```
+page.server.js with DB access
```

**Avoid:**
```
+page.js with DB access
```

---

### Use form actions `[Medium]`
Server-side form handling

**Applies to:** svelte 5
**Documentation:** [https://kit.svelte.dev/docs/form-actions](https://kit.svelte.dev/docs/form-actions)

- **Do:** +page.server.js actions
- **Don't:** API routes for forms

**Recommended:**
```
export const actions = { default }
```

**Avoid:**
```
fetch('/api/submit')
```

---

### Use $app/stores for legacy app state `[Medium]`
Legacy SvelteKit page navigating and updated stores

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/kit/$app-stores](https://svelte.dev/docs/kit/$app-stores)

- **Do:** Retain $app/stores only for legacy Svelte projects
- **Don't:** Add $app/stores to new SvelteKit code

**Recommended:**
```
import { page } from '$app/stores'
```

**Avoid:**
```
import { page } from '$app/state'
```

---

### Use $app/state for current app state `[High]`
SvelteKit exposes page navigating and updated as reactive state

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/kit/$app-state](https://svelte.dev/docs/kit/$app-state)

- **Do:** Import current state from $app/state
- **Don't:** Start new code with deprecated $app/stores

**Recommended:**
```
import { page } from '$app/state'
```

**Avoid:**
```
import { page } from '$app/stores'
```

---

## Performance

### Use {#key} for forced re-render `[Low]`
Reset component state

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/logic-blocks#key](https://svelte.dev/docs/logic-blocks#key)

- **Do:** {#key id} for fresh instance
- **Don't:** Manual destroy/create

**Recommended:**
```
{#key item.id}<Component/>{/key}
```

**Avoid:**
```
on:change={() => component = null}
```

---

### Avoid unnecessary effects `[Low]`
Not every computation needs $effect

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/$effect](https://svelte.dev/docs/svelte/$effect)

- **Do:** Use $derived for computed state and $effect only for external synchronization
- **Don't:** Use effects for simple assignments

**Recommended:**
```
let doubled = $derived(count * 2)
```

**Avoid:**
```
$effect(() => doubled = count * 2)
```

---

### Avoid legacy immutable compiler assumptions `[Low]`
Runes use fine-grained reactivity without the legacy immutable option

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/legacy-compiler-options](https://svelte.dev/docs/svelte/legacy-compiler-options)

- **Do:** Use current runes state and measure real bottlenecks
- **Don't:** Add immutable mode to new runes components

**Recommended:**
```
$state for reactive data
```

**Avoid:**
```
<svelte:options immutable/>
```

---

## TypeScript

### Use lang="ts" in script `[Medium]`
TypeScript support

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/typescript](https://svelte.dev/docs/typescript)

- **Do:** <script lang="ts">
- **Don't:** JavaScript for typed projects

**Recommended:**
```
<script lang="ts">
```

**Avoid:**
```
<script> with JSDoc
```

---

### Type props with an interface `[Medium]`
Explicit prop types for $props

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/typescript#typing-$props](https://svelte.dev/docs/svelte/typescript#typing-$props)

- **Do:** Destructure $props with an interface annotation
- **Don't:** Use legacy $$Props or untyped props

**Recommended:**
```
interface Props { name: string }; let { name }: Props = $props()
```

**Avoid:**
```
interface $$Props { name: string }
```

---

### Type legacy events with createEventDispatcher `[Medium]`
Type-safe events in legacy components

**Applies to:** svelte legacy <=4
**Documentation:** [https://svelte.dev/docs/svelte/svelte#createeventdispatcher](https://svelte.dev/docs/svelte/svelte#createeventdispatcher)

- **Do:** Retain typed dispatch only for legacy components
- **Don't:** Add dispatcher events to runes-mode components

**Recommended:**
```
createEventDispatcher<{ save: Data }>()
```

**Avoid:**
```
let { onsave }: Props = $props()
```

---

## Accessibility

### Use semantic elements `[High]`
Proper HTML in templates

**Applies to:** svelte 5
**Documentation:** [https://svelte.dev/docs/svelte/compiler-warnings#a11y_click_events_have_key_events](https://svelte.dev/docs/svelte/compiler-warnings#a11y_click_events_have_key_events)

- **Do:** button nav main appropriately
- **Don't:** div for everything

**Recommended:**
```
<button onclick={handleClick}>
```

**Avoid:**
```
<div onclick={handleClick}>
```

---

### Add aria to dynamic content `[Medium]`
Accessible state changes

**Applies to:** svelte 5

- **Do:** aria-live for updates
- **Don't:** Silent dynamic updates

**Recommended:**
```
<div aria-live="polite">{message}</div>
```

**Avoid:**
```
<div>{message}</div>
```

---
