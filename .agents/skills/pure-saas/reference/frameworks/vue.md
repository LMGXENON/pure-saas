# Vue Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`vue.csv`)
> Framework: Vue
> Rules Count: 49 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Vue** projects.

---

## Composition

### Use Composition API for new projects `[Medium]`
Composition API offers better TypeScript support and logic reuse

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/extras/composition-api-faq.html](https://vuejs.org/guide/extras/composition-api-faq.html)

- **Do:** <script setup> for components
- **Don't:** Options API for new projects

**Recommended:**
```
<script setup>
```

**Avoid:**
```
export default { data() }
```

---

### Use script setup syntax `[Low]`
Cleaner syntax with automatic exports

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/sfc-script-setup.html](https://vuejs.org/api/sfc-script-setup.html)

- **Do:** <script setup> with defineProps
- **Don't:** setup() function manually

**Recommended:**
```
<script setup>
```

**Avoid:**
```
<script> setup() { return {} }
```

---

## Reactivity

### Use ref for primitives `[Medium]`
ref() for primitive values that need reactivity

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/reactivity-fundamentals.html](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

- **Do:** ref() for strings numbers booleans
- **Don't:** reactive() for primitives

**Recommended:**
```
const count = ref(0)
```

**Avoid:**
```
const count = reactive(0)
```

---

### Use reactive for objects `[Medium]`
reactive() for complex objects and arrays

**Applies to:** vue 3.5.x

- **Do:** reactive() for objects with multiple properties
- **Don't:** ref() for complex objects

**Recommended:**
```
const state = reactive({ user: null })
```

**Avoid:**
```
const state = ref({ user: null })
```

---

### Access ref values with .value `[High]`
Remember .value in script unwrap in template

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/reactivity-fundamentals.html](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

- **Do:** Use .value in script
- **Don't:** Forget .value in script

**Recommended:**
```
count.value++
```

**Avoid:**
```
count++ (in script)
```

---

### Use computed for derived state `[Medium]`
Computed properties cache and update automatically

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/computed.html](https://vuejs.org/guide/essentials/computed.html)

- **Do:** computed() for derived values
- **Don't:** Methods for derived values

**Recommended:**
```
const doubled = computed(() => count.value * 2)
```

**Avoid:**
```
const doubled = () => count.value * 2
```

---

### Use shallowRef for large objects `[Medium]`
Avoid deep reactivity for performance

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/reactivity-advanced.html#shallowref](https://vuejs.org/api/reactivity-advanced.html#shallowref)

- **Do:** shallowRef for large data structures
- **Don't:** ref for large nested objects

**Recommended:**
```
const bigData = shallowRef(largeObject)
```

**Avoid:**
```
const bigData = ref(largeObject)
```

---

## Watchers

### Use watchEffect for simple cases `[Low]`
Auto-tracks dependencies

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/watchers.html](https://vuejs.org/guide/essentials/watchers.html)

- **Do:** watchEffect for simple reactive effects
- **Don't:** watch with explicit deps when not needed

**Recommended:**
```
watchEffect(() => console.log(count.value))
```

**Avoid:**
```
watch(count, (val) => console.log(val))
```

---

### Use watch for specific sources `[Medium]`
Explicit control over what to watch

**Applies to:** vue 3.5.x

- **Do:** watch with specific refs
- **Don't:** watchEffect for complex conditional logic

**Recommended:**
```
watch(userId, fetchUser)
```

**Avoid:**
```
watchEffect with conditionals
```

---

### Clean up side effects `[High]`
Return cleanup function in watchers

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/watchers.html](https://vuejs.org/guide/essentials/watchers.html)

- **Do:** Return cleanup in watchEffect
- **Don't:** Leave subscriptions open

**Recommended:**
```
watchEffect((onCleanup) => { onCleanup(unsub) })
```

**Avoid:**
```
watchEffect without cleanup
```

---

## Props

### Define props with defineProps `[Medium]`
Type-safe prop definitions

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/typescript/composition-api.html#typing-component-props](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)

- **Do:** defineProps with TypeScript
- **Don't:** Props without types

**Recommended:**
```
defineProps<{ msg: string }>()
```

**Avoid:**
```
defineProps(['msg'])
```

---

### Use withDefaults for default values `[Medium]`
Provide defaults for optional props

**Applies to:** vue 3.5.x

- **Do:** withDefaults with defineProps
- **Don't:** Defaults in destructuring

**Recommended:**
```
withDefaults(defineProps<Props>(), { count: 0 })
```

**Avoid:**
```
const { count = 0 } = defineProps()
```

---

### Avoid mutating props `[High]`
Props should be read-only

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/components/props](https://vuejs.org/guide/components/props)

- **Do:** Emit events to parent for changes
- **Don't:** Direct prop mutation

**Recommended:**
```
emit('update:modelValue', newVal)
```

**Avoid:**
```
props.modelValue = newVal
```

---

## Emits

### Define emits with defineEmits `[Medium]`
Type-safe event emissions

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits](https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits)

- **Do:** defineEmits with types
- **Don't:** Emit without definition

**Recommended:**
```
defineEmits<{ change: [id: number] }>()
```

**Avoid:**
```
emit('change', id) without define
```

---

### Use v-model for two-way binding `[Low]`
Simplified parent-child data flow

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/components/v-model.html](https://vuejs.org/guide/components/v-model.html)

- **Do:** v-model with modelValue prop
- **Don't:** :value + @input manually

**Recommended:**
```
<Child v-model="value"/>
```

**Avoid:**
```
<Child :value="value" @input="value = $event"/>
```

---

## Lifecycle

### Use onMounted for DOM access `[High]`
DOM is ready in onMounted

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/composition-api-lifecycle.html](https://vuejs.org/api/composition-api-lifecycle.html)

- **Do:** onMounted for DOM operations
- **Don't:** Access DOM in setup directly

**Recommended:**
```
onMounted(() => el.value.focus())
```

**Avoid:**
```
el.value.focus() in setup
```

---

### Clean up in onUnmounted `[High]`
Remove listeners and subscriptions

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/composition-api-lifecycle.html#onunmounted](https://vuejs.org/api/composition-api-lifecycle.html#onunmounted)

- **Do:** onUnmounted for cleanup
- **Don't:** Leave listeners attached

**Recommended:**
```
onUnmounted(() => window.removeEventListener())
```

**Avoid:**
```
No cleanup on unmount
```

---

### Avoid onBeforeMount for data `[Low]`
Use onMounted or setup for data fetching

**Applies to:** vue 3.5.x

- **Do:** Fetch in onMounted or setup
- **Don't:** Fetch in onBeforeMount

**Recommended:**
```
onMounted(async () => await fetchData())
```

**Avoid:**
```
onBeforeMount(async () => await fetchData())
```

---

## Components

### Use single-file components `[Low]`
Keep template script style together

**Applies to:** vue 3.5.x

- **Do:** .vue files for components
- **Don't:** Separate template/script files

**Recommended:**
```
Component.vue with all parts
```

**Avoid:**
```
Component.js + Component.html
```

---

### Use PascalCase for components `[Low]`
Consistent component naming

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/style-guide/rules-strongly-recommended.html](https://vuejs.org/style-guide/rules-strongly-recommended.html)

- **Do:** PascalCase in imports and templates
- **Don't:** kebab-case in script

**Recommended:**
```
<MyComponent/>
```

**Avoid:**
```
<my-component/>
```

---

### Prefer composition over mixins `[Medium]`
Composables replace mixins

**Applies to:** vue 3.5.x

- **Do:** Composables for shared logic
- **Don't:** Mixins for code reuse

**Recommended:**
```
const { data } = useApi()
```

**Avoid:**
```
mixins: [apiMixin]
```

---

## Composables

### Name composables with use prefix `[Medium]`
Convention for composable functions

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/reusability/composables.html](https://vuejs.org/guide/reusability/composables.html)

- **Do:** useFetch useAuth useForm
- **Don't:** getData or fetchApi

**Recommended:**
```
export function useFetch()
```

**Avoid:**
```
export function fetchData()
```

---

### Return refs from composables `[Medium]`
Maintain reactivity when destructuring

**Applies to:** vue 3.5.x

- **Do:** Return ref values
- **Don't:** Return reactive objects that lose reactivity

**Recommended:**
```
return { data: ref(null) }
```

**Avoid:**
```
return reactive({ data: null })
```

---

### Accept ref or value params `[Low]`
Use toValue for flexible inputs

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/reactivity-utilities.html#tovalue](https://vuejs.org/api/reactivity-utilities.html#tovalue)

- **Do:** toValue() or unref() for params
- **Don't:** Only accept ref or only value

**Recommended:**
```
const val = toValue(maybeRef)
```

**Avoid:**
```
const val = maybeRef.value
```

---

## Templates

### Use v-bind shorthand `[Low]`
Cleaner template syntax

**Applies to:** vue 3.5.x

- **Do:** :prop instead of v-bind:prop
- **Don't:** Full v-bind syntax

**Recommended:**
```
<div :class="cls">
```

**Avoid:**
```
<div v-bind:class="cls">
```

---

### Use v-on shorthand `[Low]`
Cleaner event binding

**Applies to:** vue 3.5.x

- **Do:** @event instead of v-on:event
- **Don't:** Full v-on syntax

**Recommended:**
```
<button @click="handler">
```

**Avoid:**
```
<button v-on:click="handler">
```

---

### Avoid v-if with v-for `[High]`
v-if has higher priority causes issues

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for](https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for)

- **Do:** Wrap in template or computed filter
- **Don't:** v-if on same element as v-for

**Recommended:**
```
<template v-for><div v-if>
```

**Avoid:**
```
<div v-for v-if>
```

---

### Use key with v-for `[High]`
Proper list rendering and updates

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)

- **Do:** Unique key for each item
- **Don't:** Index as key for dynamic lists

**Recommended:**
```
v-for="item in items" :key="item.id"
```

**Avoid:**
```
v-for="(item, i) in items" :key="i"
```

---

## State

### Use Pinia for global state `[Medium]`
Official state management for Vue 3

**Applies to:** vue 3.5.x
**Documentation:** [https://pinia.vuejs.org/](https://pinia.vuejs.org/)

- **Do:** Pinia stores for shared state
- **Don't:** Vuex for new projects

**Recommended:**
```
const store = useCounterStore()
```

**Avoid:**
```
Vuex with mutations
```

---

### Define stores with defineStore `[Low]`
Composition API style stores

**Applies to:** vue 3.5.x

- **Do:** Setup stores with defineStore
- **Don't:** Options stores for complex state

**Recommended:**
```
defineStore('counter', () => {})
```

**Avoid:**
```
defineStore('counter', { state })
```

---

### Use storeToRefs for destructuring `[High]`
Maintain reactivity when destructuring

**Applies to:** vue 3.5.x
**Documentation:** [https://pinia.vuejs.org/core-concepts/#destructuring-from-a-store](https://pinia.vuejs.org/core-concepts/#destructuring-from-a-store)

- **Do:** storeToRefs(store)
- **Don't:** Direct destructuring

**Recommended:**
```
const { count } = storeToRefs(store)
```

**Avoid:**
```
const { count } = store
```

---

## Routing

### Use useRouter and useRoute `[Medium]`
Composition API router access

**Applies to:** vue 3.5.x
**Documentation:** [https://router.vuejs.org/guide/advanced/composition-api.html](https://router.vuejs.org/guide/advanced/composition-api.html)

- **Do:** useRouter() useRoute() in setup
- **Don't:** this.$router this.$route

**Recommended:**
```
const router = useRouter()
```

**Avoid:**
```
this.$router.push()
```

---

### Lazy load route components `[Medium]`
Code splitting for routes

**Applies to:** vue 3.5.x
**Documentation:** [https://router.vuejs.org/guide/advanced/lazy-loading.html](https://router.vuejs.org/guide/advanced/lazy-loading.html)

- **Do:** () => import() for components
- **Don't:** Static imports for all routes

**Recommended:**
```
component: () => import('./Page.vue')
```

**Avoid:**
```
component: Page
```

---

### Use navigation guards `[Medium]`
Protect routes and handle redirects

**Applies to:** vue 3.5.x

- **Do:** beforeEach for auth checks
- **Don't:** Check auth in each component

**Recommended:**
```
router.beforeEach((to) => {})
```

**Avoid:**
```
Check auth in onMounted
```

---

## Performance

### Use v-once for static content `[Low]`
Skip re-renders for static elements

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/built-in-directives.html#v-once](https://vuejs.org/api/built-in-directives.html#v-once)

- **Do:** v-once on never-changing content
- **Don't:** v-once on dynamic content

**Recommended:**
```
<div v-once>{{ staticText }}</div>
```

**Avoid:**
```
<div v-once>{{ dynamicText }}</div>
```

---

### Use v-memo for expensive lists `[Medium]`
Memoize list items

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/api/built-in-directives.html#v-memo](https://vuejs.org/api/built-in-directives.html#v-memo)

- **Do:** v-memo with dependency array
- **Don't:** Re-render entire list always

**Recommended:**
```
<div v-for v-memo="[item.id]">
```

**Avoid:**
```
<div v-for> without memo
```

---

### Use shallowReactive for flat objects `[Low]`
Avoid deep reactivity overhead

**Applies to:** vue 3.5.x

- **Do:** shallowReactive for flat state
- **Don't:** reactive for simple objects

**Recommended:**
```
shallowReactive({ count: 0 })
```

**Avoid:**
```
reactive({ count: 0 })
```

---

### Use defineAsyncComponent `[Medium]`
Lazy load heavy components

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/components/async.html](https://vuejs.org/guide/components/async.html)

- **Do:** defineAsyncComponent for modals dialogs
- **Don't:** Import all components eagerly

**Recommended:**
```
defineAsyncComponent(() => import())
```

**Avoid:**
```
import HeavyComponent from
```

---

## TypeScript

### Use generic components `[Medium]`
Type-safe reusable components

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/typescript/composition-api.html](https://vuejs.org/guide/typescript/composition-api.html)

- **Do:** Generic with defineComponent
- **Don't:** Any types in components

**Recommended:**
```
<script setup lang="ts" generic="T">
```

**Avoid:**
```
<script setup> without types
```

---

### Type template refs `[Medium]`
Proper typing for DOM refs

**Applies to:** vue 3.5.x

- **Do:** ref<HTMLInputElement>(null)
- **Don't:** ref(null) without type

**Recommended:**
```
const input = ref<HTMLInputElement>(null)
```

**Avoid:**
```
const input = ref(null)
```

---

### Use PropType for complex props `[Medium]`
Type complex prop types

**Applies to:** vue 3.5.x

- **Do:** PropType<User> for object props
- **Don't:** Object without type

**Recommended:**
```
type: Object as PropType<User>
```

**Avoid:**
```
type: Object
```

---

## Testing

### Use Vue Test Utils `[Medium]`
Official testing library

**Applies to:** vue 3.5.x
**Documentation:** [https://test-utils.vuejs.org/](https://test-utils.vuejs.org/)

- **Do:** mount shallowMount for components
- **Don't:** Manual DOM testing

**Recommended:**
```
import { mount } from '@vue/test-utils'
```

**Avoid:**
```
document.createElement
```

---

### Test component behavior `[Medium]`
Focus on inputs and outputs

**Applies to:** vue 3.5.x

- **Do:** Test props emit and rendered output
- **Don't:** Test internal implementation

**Recommended:**
```
expect(wrapper.text()).toContain()
```

**Avoid:**
```
expect(wrapper.vm.internalState)
```

---

## Forms

### Use v-model modifiers `[Low]`
Built-in input handling

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/essentials/forms.html#modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)

- **Do:** .lazy .number .trim modifiers
- **Don't:** Manual input parsing

**Recommended:**
```
<input v-model.number="age">
```

**Avoid:**
```
<input v-model="age"> then parse
```

---

### Use VeeValidate or FormKit `[Medium]`
Form validation libraries

**Applies to:** vue 3.5.x

- **Do:** VeeValidate for complex forms
- **Don't:** Manual validation logic

**Recommended:**
```
useField useForm from vee-validate
```

**Avoid:**
```
Custom validation in each input
```

---

## Accessibility

### Use semantic elements `[High]`
Proper HTML elements in templates

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/best-practices/accessibility.html](https://vuejs.org/guide/best-practices/accessibility.html)

- **Do:** button nav main for purpose
- **Don't:** div for everything

**Recommended:**
```
<button @click>
```

**Avoid:**
```
<div @click>
```

---

### Bind aria attributes dynamically `[Medium]`
Keep ARIA in sync with state

**Applies to:** vue 3.5.x

- **Do:** :aria-expanded="isOpen"
- **Don't:** Static ARIA values

**Recommended:**
```
:aria-expanded="menuOpen"
```

**Avoid:**
```
aria-expanded="true"
```

---

## SSR

### Use Nuxt for SSR `[Medium]`
Full-featured SSR framework

**Applies to:** vue 3.5.x
**Documentation:** [https://nuxt.com/](https://nuxt.com/)

- **Do:** Nuxt 3 for SSR apps
- **Don't:** Manual SSR setup

**Recommended:**
```
npx nuxi init my-app
```

**Avoid:**
```
Custom SSR configuration
```

---

### Handle hydration mismatches `[High]`
Client/server content must match

**Applies to:** vue 3.5.x
**Documentation:** [https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch)

- **Do:** ClientOnly for browser-only content
- **Don't:** Different content server/client

**Recommended:**
```
<ClientOnly><BrowserWidget/></ClientOnly>
```

**Avoid:**
```
<div>{{ Date.now() }}</div>
```

---
