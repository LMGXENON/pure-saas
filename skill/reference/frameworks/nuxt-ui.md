# Nuxt Ui Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`nuxt-ui.csv`)
> Framework: Nuxt Ui
> Rules Count: 76 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Nuxt Ui** projects.

---

## Installation

### Add Nuxt UI module `[High]`
Install Nuxt UI and Tailwind CSS, then register the Nuxt module

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** pnpm add @nuxt/ui tailwindcss and add @nuxt/ui to modules
- **Don't:** Manual component imports

**Recommended:**
```
modules: ['@nuxt/ui'] // after pnpm add @nuxt/ui tailwindcss
```

**Avoid:**
```
import { UButton } from '@nuxt/ui'
```

---

### Import Tailwind and Nuxt UI CSS `[High]`
Required CSS imports in main.css file

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** @import tailwindcss and @import @nuxt/ui
- **Don't:** Skip CSS imports

**Recommended:**
```
@import "tailwindcss"; @import "@nuxt/ui";
```

**Avoid:**
```
No CSS imports
```

---

### Wrap app with UApp component `[High]`
UApp provides toast, tooltip, overlay, and locale context

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/app](https://ui.nuxt.com/docs/components/app)

- **Do:** Wrap NuxtPage or RouterView once at the app root
- **Don't:** Mount pages outside UApp

**Recommended:**
```
<UApp><NuxtPage/></UApp>
```

**Avoid:**
```
<NuxtPage/> without wrapper
```

---

### Let Nuxt UI declare module dependencies `[High]`
Nuxt UI uses Nuxt moduleDependencies for Icon Fonts and Color Mode ordering and registration

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** Configure dependency options at their root keys
- **Don't:** Add duplicate module entries without a documented need

**Recommended:**
```
icon: { /* opts */ } in nuxt.config
```

**Avoid:**
```
modules: ['@nuxt/ui', '@nuxt/icon']
```

---

### Use official templates to bootstrap projects `[Medium]`
Create a Nuxt project from an official Nuxt UI template

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** npm create nuxt@latest -- -t ui/dashboard
- **Don't:** Manually reconstruct a template

**Recommended:**
```
npm create nuxt@latest -- -t ui/dashboard
```

**Avoid:**
```
pnpm create nuxt app then copy dashboard files
```

---

## Components

### Use U prefix for components `[Medium]`
All Nuxt UI components use U prefix by default

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** UButton UInput UModal
- **Don't:** Button Input Modal

**Recommended:**
```
<UButton>Click</UButton>
```

**Avoid:**
```
<Button>Click</Button>
```

---

### Use semantic color props `[Medium]`
Style Nuxt UI components with meaning-based colors such as primary, success, and error

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system)

- **Do:** Use color props such as color="primary" or color="error"
- **Don't:** Hardcoded palette colors

**Recommended:**
```
<UButton color="primary">
```

**Avoid:**
```
<UButton class="bg-green-500">
```

---

### Use variant prop for styling `[Medium]`
Nuxt UI provides solid outline soft subtle ghost link variants

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/button](https://ui.nuxt.com/docs/components/button)

- **Do:** Choose a built-in variant before adding custom classes
- **Don't:** Recreate a built-in variant with custom classes

**Recommended:**
```
<UButton variant="soft">
```

**Avoid:**
```
<UButton class="border bg-transparent">
```

---

### Use size prop consistently `[Low]`
Components support xs sm md lg xl sizes

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/button](https://ui.nuxt.com/docs/components/button)

- **Do:** size="sm" size="lg"
- **Don't:** Arbitrary sizing classes

**Recommended:**
```
<UButton size="lg">
```

**Avoid:**
```
<UButton class="text-xl px-6">
```

---

## Icons

### Use i-{collection}-{name} format for icons `[High]`
Nuxt UI v4 uses Iconify i-prefix format — lucide:home is v3 legacy

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** i-lucide-home i-heroicons-user format
- **Don't:** lucide:home format (v3 syntax)

**Recommended:**
```
<UButton icon="i-lucide-home">
```

**Avoid:**
```
<UButton icon="lucide:home">
```

---

### Use leadingIcon and trailingIcon props `[Low]`
Position icons with dedicated props for clarity

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/button](https://ui.nuxt.com/docs/components/button)

- **Do:** Use leadingIcon or trailingIcon for standard button icons
- **Don't:** Build a custom icon slot when a standard icon prop is enough

**Recommended:**
```
<UButton leadingIcon="i-lucide-plus" label="Add">
```

**Avoid:**
```
<UButton><UIcon name="i-lucide-plus"/>Add</UButton>
```

---

### Install required icon collections locally `[Medium]`
Install the Iconify JSON collections used by the app for reliable SSR and bundling

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/icons/nuxt](https://ui.nuxt.com/docs/getting-started/icons/nuxt)

- **Do:** pnpm i @iconify-json/lucide for lucide icons
- **Don't:** Rely on an unavailable collection at runtime

**Recommended:**
```
pnpm i @iconify-json/lucide
```

**Avoid:**
```
Use i-custom-* without installing its collection
```

---

### Override default component icons centrally when needed `[Low]`
appConfig.ui.icons keeps intentional icon overrides consistent

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** Set a global icon key when the product needs a different default
- **Don't:** Repeat the same icon override on every component instance

**Recommended:**
```
defineAppConfig({ ui: { icons: { loading: 'i-lucide-refresh-cw', close: 'i-lucide-x' } } })
```

**Avoid:**
```
<UModal close-icon="i-lucide-circle-x"/> repeated everywhere
```

---

## Theming

### Configure colors in app.config.ts `[High]`
Runtime color configuration without restart

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system)

- **Do:** ui.colors.primary in app.config.ts
- **Don't:** Hardcoded colors in components

**Recommended:**
```
defineAppConfig({ ui: { colors: { primary: 'blue' } } })
```

**Avoid:**
```
<UButton class="bg-blue-500">
```

---

### Define complete custom palettes with @theme static `[Medium]`
Nuxt UI custom colors require shades 50 through 950

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system)

- **Do:** Define every --color-brand-* shade in @theme static
- **Don't:** Define only one shade for a custom palette

**Recommended:**
```
@theme static { --color-brand-50: #fff1f2; ... --color-brand-950: #4c0519; }
```

**Avoid:**
```
@theme { --color-brand-500: #ef4444; }
```

---

### Register and map semantic colors `[Medium]`
Register extra semantic color names at build time then map them to a palette in app.config

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system)

- **Do:** nuxt.config ui.theme.colors plus app.config ui.colors
- **Don't:** Use an unregistered semantic color

**Recommended:**
```
ui: { theme: { colors: ['primary', 'tertiary'] } } then ui.colors.tertiary = 'violet'
```

**Avoid:**
```
<UButton color="tertiary"> without config
```

---

### Read generated theme file to find slot names `[Medium]`
Generated theme files list current slots, variants, and default classes

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/components](https://ui.nuxt.com/docs/getting-started/theme/components)

- **Do:** Check .nuxt/ui in Nuxt or node_modules/.nuxt-ui/ui in Vue before overriding slots
- **Don't:** Guess slot names or use trial-and-error

**Recommended:**
```
.nuxt/ui/button.ts or node_modules/.nuxt-ui/ui/button.ts
```

**Avoid:**
```
<UButton :ui="{ base: 'rounded-full' }"/> without checking slots
```

---

## Forms

### Use UForm with schema validation `[High]`
UForm accepts Standard Schema libraries such as Zod, Valibot, Yup, and Joi

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form](https://ui.nuxt.com/docs/components/form)

- **Do:** Pass a Standard Schema with :schema and reactive state with :state
- **Don't:** Manual form validation

**Recommended:**
```
<UForm :schema="schema" :state="state">
```

**Avoid:**
```
Manual @blur validation
```

---

### Use UFormField for field wrapper `[Medium]`
Provides label error message and validation display

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form-field](https://ui.nuxt.com/docs/components/form-field)

- **Do:** UFormField with name prop
- **Don't:** Manual error handling

**Recommended:**
```
<UFormField name="email" label="Email">
```

**Avoid:**
```
<div><label>Email</label><UInput/><span>error</span></div>
```

---

### Handle form submit with @submit `[Medium]`
UForm emits submit event with validated data

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form](https://ui.nuxt.com/docs/components/form)

- **Do:** @submit handler on UForm
- **Don't:** @click on submit button

**Recommended:**
```
<UForm @submit="onSubmit">
```

**Avoid:**
```
<UButton @click="onSubmit">
```

---

### Choose validation timing deliberately `[Low]`
UForm validates on input blur and change by default; input is delayed and begins after blur unless eager

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form](https://ui.nuxt.com/docs/components/form)

- **Do:** Set validateOn and eager to match the interaction
- **Don't:** Assume the default validates every keystroke immediately

**Recommended:**
```
<UForm :validateOn="['blur', 'change']">
```

**Avoid:**
```
Describe default UForm as eager input-only validation
```

---

### Use UFileUpload for file input `[Medium]`
Built-in drag-drop and preview support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/file-upload](https://ui.nuxt.com/docs/components/file-upload)

- **Do:** UFileUpload with v-model and accept prop
- **Don't:** Custom input type=file

**Recommended:**
```
<UFileUpload v-model="files" accept="image/*" multiple/>
```

**Avoid:**
```
<input type="file" @change="handleFiles">
```

---

### Use UInputDate for date selection `[Medium]`
Date input supports single dates and ranges with locale inherited from UApp

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/input-date](https://ui.nuxt.com/docs/components/input-date)

- **Do:** Use range when needed and configure locale on UApp
- **Don't:** Third-party date picker libraries

**Recommended:**
```
<UApp :locale="fr"><UInputDate v-model="range" range/></UApp>
```

**Avoid:**
```
<UInputDate locale="fr"/>
```

---

### Use UInputTags for tag input `[Low]`
Multi-value tag input with keyboard support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/input-tags](https://ui.nuxt.com/docs/components/input-tags)

- **Do:** UInputTags with v-model and max prop
- **Don't:** Custom chip input implementation

**Recommended:**
```
<UInputTags v-model="tags" :max="5" />
```

**Avoid:**
```
<UInput @keydown.enter="addTag">
```

---

### Use UColorPicker for color selection `[Low]`
Full-featured color picker with multiple format support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/color-picker](https://ui.nuxt.com/docs/components/color-picker)

- **Do:** UColorPicker with v-model and format prop
- **Don't:** Native input type=color

**Recommended:**
```
<UColorPicker v-model="color" format="hex" />
```

**Avoid:**
```
<input type="color" v-model="color">
```

---

## Overlays

### Use v-model:open for overlay control `[Medium]`
Modal Slideover Drawer use v-model:open

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/modal](https://ui.nuxt.com/docs/components/modal)

- **Do:** v-model:open for controlled state
- **Don't:** Manual show/hide logic

**Recommended:**
```
<UModal v-model:open="isOpen">
```

**Avoid:**
```
<UModal v-if="isOpen">
```

---

### Use useOverlay composable for programmatic overlays `[High]`
Open overlays programmatically — v4 API is create().open() not open(Component)

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/composables/use-overlay](https://ui.nuxt.com/docs/composables/use-overlay)

- **Do:** Create the overlay once, then pass component props directly to open()
- **Don't:** v3 overlay.open(Component) pattern (removed in v4)

**Recommended:**
```
const modal = overlay.create(MyModal); const { result } = modal.open({ title: 'Confirm' })
```

**Avoid:**
```
overlay.open(MyModal, { props: { title: 'Confirm' } })
```

---

### Use title and description props `[Low]`
Built-in header support for overlays

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/modal](https://ui.nuxt.com/docs/components/modal)

- **Do:** Use title and description props for a standard overlay header
- **Don't:** Rebuild a simple title and description with a custom header slot

**Recommended:**
```
<UModal title="Confirm" description="Are you sure?">
```

**Avoid:**
```
<UModal><template #header><h2>Confirm</h2></template>
```

---

### Use UContextMenu for right-click menus `[Medium]`
Context menu triggered by right-click on children

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/context-menu](https://ui.nuxt.com/docs/components/context-menu)

- **Do:** UContextMenu wrapping target element
- **Don't:** Browser default context menu

**Recommended:**
```
<UContextMenu :items="menuItems"><div>Right-click me</div></UContextMenu>
```

**Avoid:**
```
<div @contextmenu.prevent="showMenu">
```

---

### Await overlay result for confirmation dialogs `[Medium]`
open() returns a Promise that resolves when the overlay component emits close

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/composables/use-overlay](https://ui.nuxt.com/docs/composables/use-overlay)

- **Do:** Emit a close value from the overlay component and await modal.open()
- **Don't:** Expect a result from a component that never emits close

**Recommended:**
```
if (await modal.open()) { deleteItem() }
```

**Avoid:**
```
modal.open(); deleteItem()
```

---

## Dashboard

### Use UDashboardSidebar for navigation `[Medium]`
Provides collapsible resizable sidebar with mobile support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/dashboard-sidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar)

- **Do:** UDashboardSidebar with header default footer slots
- **Don't:** Custom sidebar implementation

**Recommended:**
```
<UDashboardSidebar><template #header>...</template></UDashboardSidebar>
```

**Avoid:**
```
<aside class="w-64 border-r">
```

---

### Use UDashboardGroup for layout `[Medium]`
Wraps dashboard components with sidebar state management

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/dashboard-group](https://ui.nuxt.com/docs/components/dashboard-group)

- **Do:** UDashboardGroup > UDashboardSidebar + UDashboardPanel
- **Don't:** Manual layout flex containers

**Recommended:**
```
<UDashboardGroup><UDashboardSidebar/><UDashboardPanel/></UDashboardGroup>
```

**Avoid:**
```
<div class="flex"><aside/><main/></div>
```

---

### Use UDashboardNavbar for top navigation `[Low]`
Responsive dashboard header with sidebar toggle and layout slots

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/dashboard-navbar](https://ui.nuxt.com/docs/components/dashboard-navbar)

- **Do:** Place UDashboardNavbar in a UDashboardPanel header and use its slots for actions
- **Don't:** Pass unsupported links props or rebuild the responsive toggle

**Recommended:**
```
<UDashboardNavbar title="Dashboard"><template #right><UButton label="Add"/></template></UDashboardNavbar>
```

**Avoid:**
```
<UDashboardNavbar :links="navLinks"/>
```

---

## Tables

### Use UTable with data and columns props `[High]`
Powered by TanStack Table with built-in features

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/table](https://ui.nuxt.com/docs/components/table)

- **Do:** :data and :columns props
- **Don't:** Manual table markup

**Recommended:**
```
<UTable :data="users" :columns="columns"/>
```

**Avoid:**
```
<table><tr v-for="user in users">
```

---

### Define columns with accessorKey `[Medium]`
Column definitions use accessorKey for data binding

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/table](https://ui.nuxt.com/docs/components/table)

- **Do:** accessorKey: 'email' in column def
- **Don't:** String column names only

**Recommended:**
```
{ accessorKey: 'email', header: 'Email' }
```

**Avoid:**
```
['name', 'email']
```

---

### Use column cell slots `[Medium]`
Customize cell content with the documented column-id slot pattern

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/table](https://ui.nuxt.com/docs/components/table)

- **Do:** #status-cell for a status column
- **Don't:** Use the obsolete #cell-status name

**Recommended:**
```
<template #status-cell="{ row }">
```

**Avoid:**
```
<template #cell-status="{ row }">
```

---

### Enable sorting with TanStack column APIs `[Low]`
Render a header control that calls column.toggleSorting

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/table](https://ui.nuxt.com/docs/components/table)

- **Do:** Use getCanSort and toggleSorting
- **Don't:** Invent a sortable property not in the column contract

**Recommended:**
```
header: ({ column }) => h(UButton, { onClick: () => column.toggleSorting() })
```

**Avoid:**
```
{ accessorKey: 'name', sortable: true }
```

---

## Navigation

### Use UNavigationMenu for nav links `[Medium]`
Horizontal or vertical navigation with dropdown support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/navigation-menu](https://ui.nuxt.com/docs/components/navigation-menu)

- **Do:** UNavigationMenu with items array
- **Don't:** Manual nav with v-for

**Recommended:**
```
<UNavigationMenu :items="navItems"/>
```

**Avoid:**
```
<nav><a v-for="item in items">
```

---

### Use UBreadcrumb for page hierarchy `[Low]`
Render accessible page hierarchy from an items array with NuxtLink support

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/breadcrumb](https://ui.nuxt.com/docs/components/breadcrumb)

- **Do:** :items array with label and to
- **Don't:** Manual breadcrumb links

**Recommended:**
```
<UBreadcrumb :items="breadcrumbs"/>
```

**Avoid:**
```
<nav><span v-for="crumb in crumbs">
```

---

### Use UTabs for tabbed content `[Medium]`
Tab navigation with content panels

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/tabs](https://ui.nuxt.com/docs/components/tabs)

- **Do:** UTabs with items containing slot content
- **Don't:** Manual tab state

**Recommended:**
```
<UTabs :items="tabs"/>
```

**Avoid:**
```
<div><button @click="tab=1">
```

---

### Use UCommandPalette with identified groups `[Medium]`
Command palette accepts groups with an id, label, and items

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/command-palette](https://ui.nuxt.com/docs/components/command-palette)

- **Do:** Give every group a stable id and its own items
- **Don't:** Pass a flat items prop that is not part of the component API

**Recommended:**
```
<UCommandPalette :groups="[{ id: 'actions', label: 'Actions', items }]"/>
```

**Avoid:**
```
<UCommandPalette :items="flatList"/>
```

---

### Use defineShortcuts with extractShortcuts `[Low]`
Wire keyboard shortcuts from menu item kbds automatically

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/composables/define-shortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts)

- **Do:** extractShortcuts(items) + defineShortcuts to sync keybindings
- **Don't:** Manually duplicate shortcuts from menu items

**Recommended:**
```
defineShortcuts(extractShortcuts(items))
```

**Avoid:**
```
defineShortcuts({ meta_n: () => newFile() }) // duplicated from items
```

---

## Feedback

### Use useToast for notifications `[High]`
Composable notifications rendered by the UApp toast provider

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/toast](https://ui.nuxt.com/docs/components/toast)

- **Do:** Wrap the app in UApp and call useToast().add()
- **Don't:** Alert components for toasts

**Recommended:**
```
const toast = useToast(); toast.add({ title: 'Saved' })
```

**Avoid:**
```
<UAlert v-if="showSuccess">
```

---

### Use UAlert for inline messages `[Medium]`
Static alert messages with icon and actions

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/alert](https://ui.nuxt.com/docs/components/alert)

- **Do:** UAlert with title description color
- **Don't:** Toast for static messages

**Recommended:**
```
<UAlert title="Warning" color="warning"/>
```

**Avoid:**
```
useToast for inline alerts
```

---

### Use USkeleton for loading states `[Low]`
Placeholder content during data loading

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/skeleton](https://ui.nuxt.com/docs/components/skeleton)

- **Do:** USkeleton with appropriate size
- **Don't:** Spinner for content loading

**Recommended:**
```
<USkeleton class="h-4 w-32"/>
```

**Avoid:**
```
<UIcon name="i-lucide-loader-circle" class="animate-spin"/>
```

---

## Color Mode

### Use UColorModeButton for theme toggle `[Low]`
Built-in light/dark mode toggle button

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/color-mode-button](https://ui.nuxt.com/docs/components/color-mode-button)

- **Do:** UColorModeButton component
- **Don't:** Manual color mode logic

**Recommended:**
```
<UColorModeButton/>
```

**Avoid:**
```
<button @click="toggleColorMode">
```

---

### Use UColorModeSelect for theme picker `[Low]`
Dropdown to select system light or dark mode

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/color-mode-select](https://ui.nuxt.com/docs/components/color-mode-select)

- **Do:** UColorModeSelect component
- **Don't:** Custom select for theme

**Recommended:**
```
<UColorModeSelect/>
```

**Avoid:**
```
<USelect v-model="colorMode" :items="modes"/>
```

---

### Wrap custom color mode toggles in ClientOnly `[Medium]`
Prevents hydration mismatch on server-rendered color mode

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt](https://ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt)

- **Do:** ClientOnly with fallback placeholder
- **Don't:** Direct useColorMode in template without ClientOnly

**Recommended:**
```
<ClientOnly><USwitch v-model="isDark"/><template #fallback><div class="size-8"/></template></ClientOnly>
```

**Avoid:**
```
<USwitch v-model="isDark"/> directly in template
```

---

## Customization

### Use class for the root and ui for named slots `[Medium]`
class customizes the root slot; ui targets component slots

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/components](https://ui.nuxt.com/docs/getting-started/theme/components)

- **Do:** Use class for root-only changes and ui after checking generated slot names
- **Don't:** Use !important or guess undocumented slot names

**Recommended:**
```
<UButton class="rounded-full" :ui="{ trailingIcon: 'size-3' }"/>
```

**Avoid:**
```
<UButton class="!rounded-full"/>
```

---

### Configure default variants in app.config `[Medium]`
Set component default variants under ui component keys

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/components](https://ui.nuxt.com/docs/getting-started/theme/components)

- **Do:** app.config ui.button.defaultVariants
- **Don't:** Put button-specific defaults under global ui.theme.defaultVariants

**Recommended:**
```
defineAppConfig({ ui: { button: { defaultVariants: { color: 'neutral' } } } })
```

**Avoid:**
```
ui: { theme: { defaultVariants: { variant: 'outline' } } } // affects every component
```

---

### Use app.config.ts for theme overrides `[Medium]`
Runtime theme customization

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/components](https://ui.nuxt.com/docs/getting-started/theme/components)

- **Do:** defineAppConfig with ui key
- **Don't:** nuxt.config for runtime values

**Recommended:**
```
defineAppConfig({ ui: { button: { defaultVariants: { size: 'sm' } } } })
```

**Avoid:**
```
nuxt.config ui.button.size: 'sm'
```

---

## Performance

### Enable component detection for Nuxt `[Low]`
Generate CSS only for detected Nuxt UI components and their dependencies

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/nuxt](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

- **Do:** Use true for static usage or include dynamic component names in an array
- **Don't:** Enable detection and omit components rendered through dynamic :is values

**Recommended:**
```
ui: { experimental: { componentDetection: ['Modal'] } }
```

**Avoid:**
```
componentDetection: true with <component :is="name"/> only
```

---

### Use UTable virtualize for large data `[Medium]`
Enable row virtualization when rendering large datasets

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/table](https://ui.nuxt.com/docs/components/table)

- **Do:** Use the virtualize prop after row rendering becomes a measured bottleneck
- **Don't:** Render a large dataset without pagination or virtualization

**Recommended:**
```
<UTable :data="largeData" virtualize/>
```

**Avoid:**
```
<UTable :data="largeData"/>
```

---

### Enable component detection in Vue and Vite `[Low]`
The Nuxt UI Vite plugin can generate CSS only for detected components

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/installation/vue#experimentalcomponentdetection](https://ui.nuxt.com/docs/getting-started/installation/vue#experimentalcomponentdetection)

- **Do:** Set experimental.componentDetection in the @nuxt/ui/vite plugin and restart after adding components
- **Don't:** Expect newly detected component styles without restarting the dev server

**Recommended:**
```
ui({ experimental: { componentDetection: true } })
```

**Avoid:**
```
ui({}) // generates theme CSS for every component
```

---

## Accessibility

### Give overlays an accessible name and description `[High]`
Overlay title and description props provide dialog labeling

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/modal](https://ui.nuxt.com/docs/components/modal)

- **Do:** Provide title and description unless custom slots supply equivalent semantics
- **Don't:** Open an unlabeled modal

**Recommended:**
```
<UModal title="Settings" description="Update your preferences">
```

**Avoid:**
```
<UModal><template #body>...</template></UModal>
```

---

### Associate labels with controls `[High]`
Use UFormField or correct native id and for attributes

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form-field](https://ui.nuxt.com/docs/components/form-field)

- **Do:** UFormField for convenience or explicit label association
- **Don't:** Use placeholders as labels

**Recommended:**
```
<UFormField label="Email"><UInput/></UFormField>
```

**Avoid:**
```
<UInput placeholder="Email"/>
```

---

## Content

### Use UContentToc for table of contents `[Low]`
Automatic TOC with active heading highlight

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/content-toc](https://ui.nuxt.com/docs/components/content-toc)

- **Do:** UContentToc with :links
- **Don't:** Manual TOC implementation

**Recommended:**
```
<UContentToc :links="toc"/>
```

**Avoid:**
```
<nav><a v-for="heading in headings">
```

---

### Use UContentSearch for docs search `[Low]`
Command palette for documentation search

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/content-search](https://ui.nuxt.com/docs/components/content-search)

- **Do:** UContentSearch with Nuxt Content
- **Don't:** Custom search implementation

**Recommended:**
```
<UContentSearch/>
```

**Avoid:**
```
<UCommandPalette :groups="searchResults"/>
```

---

## AI/Chat

### Use UChatMessages for chat UI `[Medium]`
Designed for Vercel AI SDK integration

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/chat-messages](https://ui.nuxt.com/docs/components/chat-messages)

- **Do:** UChatMessages with messages array
- **Don't:** Custom chat message list

**Recommended:**
```
<UChatMessages :messages="messages"/>
```

**Avoid:**
```
<div v-for="msg in messages">
```

---

### Use UChatPrompt for input `[Medium]`
Enhanced textarea for AI prompts

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/chat-prompt](https://ui.nuxt.com/docs/components/chat-prompt)

- **Do:** UChatPrompt with v-model
- **Don't:** Basic textarea

**Recommended:**
```
<UChatPrompt v-model="prompt"/>
```

**Avoid:**
```
<UTextarea v-model="prompt"/>
```

---

## Editor

### Use UEditor for rich text `[Medium]`
TipTap-based editor binds its document with v-model

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/editor](https://ui.nuxt.com/docs/components/editor)

- **Do:** UEditor with v-model
- **Don't:** Use the undocumented v-model:content binding

**Recommended:**
```
<UEditor v-model="content"/>
```

**Avoid:**
```
<UEditor v-model:content="content"/>
```

---

## Links

### Use to prop for navigation `[Medium]`
UButton and ULink support NuxtLink to prop

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/button](https://ui.nuxt.com/docs/components/button)

- **Do:** to="/dashboard" for internal links
- **Don't:** href for internal navigation

**Recommended:**
```
<UButton to="/dashboard">
```

**Avoid:**
```
<UButton href="/dashboard">
```

---

### Use to for external URLs `[Low]`
ULink and link-enabled components detect absolute URLs and support target when a new tab is intended

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/link](https://ui.nuxt.com/docs/components/link)

- **Do:** to="https://example.com" target="_blank"
- **Don't:** Use href inconsistently or claim an external prop is required

**Recommended:**
```
<UButton to="https://example.com" target="_blank">
```

**Avoid:**
```
<UButton href="https://...">
```

---

## Loading

### Use loadingAuto on buttons `[Low]`
Automatic loading state from @click promise

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/button](https://ui.nuxt.com/docs/components/button)

- **Do:** loadingAuto prop on UButton
- **Don't:** Manual loading state

**Recommended:**
```
<UButton loadingAuto @click="async () => await save()">
```

**Avoid:**
```
<UButton :loading="isLoading" @click="save">
```

---

### Use UForm loadingAuto `[Low]`
Auto-disable form during submit

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/form](https://ui.nuxt.com/docs/components/form)

- **Do:** loadingAuto on UForm (default true)
- **Don't:** Manual form disabled state

**Recommended:**
```
<UForm @submit="handleSubmit">
```

**Avoid:**
```
<UForm :disabled="isSubmitting">
```

---

## Data

### Use UTree for hierarchical data `[Low]`
Built-in tree component with expand/collapse

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/tree](https://ui.nuxt.com/docs/components/tree)

- **Do:** UTree with items prop containing nested children
- **Don't:** Custom recursive component

**Recommended:**
```
<UTree :items="treeItems" />
```

**Avoid:**
```
<TreeNode v-for="item in items" :key="item.id">
```

---

### Use UMarquee for infinite scroll content `[Low]`
Animated infinite scroll band for logos or testimonials

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/marquee](https://ui.nuxt.com/docs/components/marquee)

- **Do:** UMarquee with repeat and pauseOnHover props
- **Don't:** CSS animation keyframes loop

**Recommended:**
```
<UMarquee :repeat="3" pause-on-hover>
```

**Avoid:**
```
<div class="animate-marquee">
```

---

### Use UProgressGroup for segmented totals `[Low]`
ProgressGroup displays multiple values as segments of one total with a legend

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/progress-group](https://ui.nuxt.com/docs/components/progress-group)

- **Do:** Pass labeled items and an explicit max when the total is not 100
- **Don't:** Build a segmented progress bar from unrelated div widths

**Recommended:**
```
<UProgressGroup :items="usage" :max="128" status/>
```

**Avoid:**
```
<div v-for="item in usage" :style="{ width: item.value + '%' }">
```

---

## Layout

### Use UHeader and UFooter for page layout `[Low]`
Responsive header/footer with built-in mobile menu

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/header](https://ui.nuxt.com/docs/components/header)

- **Do:** UHeader with #default slot for nav UFooter with columns
- **Don't:** Custom header/footer from scratch

**Recommended:**
```
<UHeader><template #right><UNavigationMenu/></template></UHeader>
```

**Avoid:**
```
<header class="sticky top-0">
```

---

### Use UPageAside for sidebar content `[Low]`
Sidebar that hides below lg breakpoint automatically

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/page-aside](https://ui.nuxt.com/docs/components/page-aside)

- **Do:** UPageAside for docs and landing page sidebars
- **Don't:** Manual hidden lg: classes

**Recommended:**
```
<UPageAside><UNavigationMenu orientation="vertical"/></UPageAside>
```

**Avoid:**
```
<aside class="hidden lg:block">
```

---

### Use USplitter for resizable panel layouts `[Medium]`
Splitter provides horizontal, vertical, nested, and collapsible resizable panels

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/splitter](https://ui.nuxt.com/docs/components/splitter)

- **Do:** Define panel items with stable slots and size constraints
- **Don't:** Reimplement drag resizing and keyboard behavior

**Recommended:**
```
<USplitter id="layout" :items="items" class="h-96">
```

**Avoid:**
```
<div @mousemove="resizePanels">
```

---

### Stabilize server-rendered splitter layouts `[High]`
Generated ids and mixed default sizes can cause hydration mismatches or panel jumps

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/splitter](https://ui.nuxt.com/docs/components/splitter)

- **Do:** Set id and give defaultSize to every item or to none; use auto-save-id for persistence
- **Don't:** Mix items with and without defaultSize during SSR

**Recommended:**
```
<USplitter id="layout" auto-save-id="layout" :items="sizedItems">
```

**Avoid:**
```
<USplitter :items="mixedDefaultSizes">
```

---

## Composables

### Use defineShortcuts whenever keyword shortcut `[Low]`
whenever array condition prevents shortcut firing when inactive

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/composables/define-shortcuts](https://ui.nuxt.com/docs/composables/define-shortcuts)

- **Do:** whenever: [isFormValid] to guard shortcut execution
- **Don't:** Always-on shortcuts that fire in wrong context

**Recommended:**
```
defineShortcuts({ meta_enter: { handler: submit, whenever: [isFormValid] } })
```

**Avoid:**
```
defineShortcuts({ meta_enter: () => submit() }) // fires even when invalid
```

---

## i18n

### Use UApp locale prop for internationalization `[Low]`
UApp locale configures component messages, formatting, and direction

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt](https://ui.nuxt.com/docs/getting-started/integrations/i18n/nuxt)

- **Do:** Pass a locale object to UApp and propagate lang and dir to html
- **Don't:** Translate built-in component strings instance by instance

**Recommended:**
```
import { fr } from '@nuxt/ui/locale'; // <UApp :locale="fr">
```

**Avoid:**
```
<UModal title="Fermer"> manually for each component
```

---

## Motion

### Retune library motion with theme easing tokens `[Low]`
Nuxt UI 4.11 uses --ease-out for enter, exit, and movement transitions

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/getting-started/theme/design-system#motion](https://ui.nuxt.com/docs/getting-started/theme/design-system#motion)

- **Do:** Override --ease-out in @theme to retime motion consistently
- **Don't:** Override transition timing independently on every component

**Recommended:**
```
@theme { --ease-out: cubic-bezier(0.16, 1, 0.3, 1); }
```

**Avoid:**
```
.modal { transition-timing-function: ... } repeated per component
```

---

## Security

### Use Nuxt UI 4.11+ for CommandPalette search `[High]`
Nuxt UI 4.11 escapes CommandPalette search highlights to prevent XSS

**Applies to:** nuxt-ui 4.11.1
**Documentation:** [https://ui.nuxt.com/docs/components/command-palette](https://ui.nuxt.com/docs/components/command-palette)

- **Do:** Upgrade @nuxt/ui to 4.11.1 or newer when rendering untrusted command labels
- **Don't:** Render untrusted CommandPalette labels with a pre-4.11 release

**Recommended:**
```
pnpm add @nuxt/ui@^4.11.1
```

**Avoid:**
```
@nuxt/ui@4.10 with user-controlled command labels
```

---
