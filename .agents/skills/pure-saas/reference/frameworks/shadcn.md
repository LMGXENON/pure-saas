# Shadcn Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`shadcn.csv`)
> Framework: Shadcn
> Rules Count: 68 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Shadcn** projects.

---

## Setup

### Use CLI for installation `[High]`
Use CLI v4 to resolve the selected base dependencies and registry items

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/cli](https://ui.shadcn.com/docs/cli)

- **Do:** npx shadcn@latest add component-name
- **Don't:** Bypass CLI resolution with stale copied code

**Recommended:**
```
npx shadcn@latest add button
```

**Avoid:**
```
Copy an old component implementation
```

---

### Initialize project properly `[High]`
Run init command to set up components.json and globals.css

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/installation](https://ui.shadcn.com/docs/installation)

- **Do:** npx shadcn@latest init before adding components
- **Don't:** Skip init and add components directly

**Recommended:**
```
npx shadcn@latest init
```

**Avoid:**
```
npx shadcn@latest add button (without init)
```

---

### Configure path aliases `[Medium]`
Set up proper import aliases in tsconfig and components.json

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/installation](https://ui.shadcn.com/docs/installation)

- **Do:** Use @/components/ui path aliases
- **Don't:** Relative imports like ../../components

**Recommended:**
```
import { Button } from "@/components/ui/button"
```

**Avoid:**
```
import { Button } from "../../components/ui/button"
```

---

### Select an explicit component base `[High]`
CLI v4 supports base radix and aria; Base UI is the new-project default while existing projects retain their base

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/cli#init](https://ui.shadcn.com/docs/cli#init)

- **Do:** Pin --base in non-interactive automation
- **Don't:** Infer that an existing Radix project must migrate

**Recommended:**
```
npx shadcn@latest init --base aria
```

**Avoid:**
```
Assume every base supports asChild
```

---

### Use CLI presets and apply workflows `[Medium]`
Use CLI v4 preset and apply for repeatable project configuration

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/cli](https://ui.shadcn.com/docs/cli)

- **Do:** npx shadcn@latest preset then apply
- **Don't:** Manually reproduce a saved project setup

**Recommended:**
```
npx shadcn@latest apply <preset>
```

**Avoid:**
```
Copy configuration by hand
```

---

## Theming

### Use CSS variables for colors `[High]`
Define semantic OKLCH variables in globals.css and expose them to Tailwind v4 with @theme inline

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/theming](https://ui.shadcn.com/docs/theming)

- **Do:** :root and .dark variables plus @theme inline mappings
- **Don't:** Hardcode palette colors in components

**Recommended:**
```
@theme inline { --color-primary: var(--primary); }
```

**Avoid:**
```
bg-blue-500 text-white
```

---

### Follow semantic color pairs `[Medium]`
Pair each semantic surface token with its foreground token

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/theming](https://ui.shadcn.com/docs/theming)

- **Do:** primary and primary-foreground; secondary and secondary-foreground
- **Don't:** Use generic visual names that hide intent

**Recommended:**
```
--primary and --primary-foreground
```

**Avoid:**
```
--blue and --light-blue
```

---

### Support dark mode `[High]`
Override semantic OKLCH variables under .dark for every custom theme token

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/dark-mode](https://ui.shadcn.com/docs/dark-mode)

- **Do:** Define complete :root and .dark semantic schemes
- **Don't:** Keep legacy space-separated HSL snippets or omit dark tokens

**Recommended:**
```
.dark { --background: oklch(0.145 0 0); }
```

**Avoid:**
```
.dark { --background: 240 10% 3.9%; }
```

---

## Components

### Use component variants `[Medium]`
Leverage cva variants for consistent styling

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

- **Do:** Use variant prop for different styles
- **Don't:** Inline conditional classes

**Recommended:**
```
<Button variant="destructive">
```

**Avoid:**
```
<Button className={isError ? "bg-red-500" : "bg-blue-500"}>
```

---

### Compose with className `[Medium]`
Add custom classes via className prop for overrides

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

- **Do:** Extend with className for one-off customizations
- **Don't:** Modify component source directly

**Recommended:**
```
<Button className="w-full">
```

**Avoid:**
```
Edit button.tsx to add w-full
```

---

### Use size variants consistently `[Medium]`
Apply size prop for consistent sizing across components

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

- **Do:** size="sm" size="lg" for sizing
- **Don't:** Mix size classes inconsistently

**Recommended:**
```
<Button size="lg">
```

**Avoid:**
```
<Button className="text-lg px-8 py-4">
```

---

### Prefer compound components `[Medium]`
Use provided sub-components for complex UI

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/card](https://ui.shadcn.com/docs/components/card)

- **Do:** Card + CardHeader + CardContent pattern
- **Don't:** Single component with many props

**Recommended:**
```
<Card><CardHeader><CardTitle>
```

**Avoid:**
```
<Card title="x" content="y" footer="z">
```

---

## Dialog

### Use Dialog for modal content `[High]`
Dialog component for overlay modal windows

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog)

- **Do:** Dialog for confirmations forms details
- **Don't:** Alert for modal content

**Recommended:**
```
<Dialog><DialogContent>
```

**Avoid:**
```
<Alert> styled as modal
```

---

### Handle dialog state properly `[Medium]`
Use open and onOpenChange for controlled dialogs

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog)

- **Do:** Controlled state with useState
- **Don't:** Uncontrolled with default open only

**Recommended:**
```
<Dialog open={open} onOpenChange={setOpen}>
```

**Avoid:**
```
<Dialog defaultOpen={true}>
```

---

### Include proper dialog structure `[High]`
Use DialogHeader DialogTitle DialogDescription

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog)

- **Do:** Complete semantic structure
- **Don't:** Missing title or description

**Recommended:**
```
<DialogHeader><DialogTitle><DialogDescription>
```

**Avoid:**
```
<DialogContent><p>Content</p></DialogContent>
```

---

## Sheet

### Use Sheet for side panels `[Medium]`
Sheet component for slide-out panels and drawers

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sheet](https://ui.shadcn.com/docs/components/sheet)

- **Do:** Sheet for navigation filters settings
- **Don't:** Dialog for side content

**Recommended:**
```
<Sheet side="right">
```

**Avoid:**
```
<Dialog> with slide animation
```

---

### Specify sheet side `[Low]`
Set side prop for sheet slide direction

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sheet](https://ui.shadcn.com/docs/components/sheet)

- **Do:** Explicit side="left" or side="right"
- **Don't:** Default side without consideration

**Recommended:**
```
<Sheet><SheetContent side="left">
```

**Avoid:**
```
<Sheet><SheetContent>
```

---

## Form

### React Hook Form integration `[High]`
Use a native form with React Hook Form Controller and shadcn Field primitives

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/forms/react-hook-form](https://ui.shadcn.com/docs/forms/react-hook-form)

- **Do:** useForm + Controller + Field
- **Don't:** Depend on the retired FormField-only abstraction

**Recommended:**
```
<Controller render={({ field }) => <Field><Input {...field}/></Field>}/>
```

**Avoid:**
```
<FormField control={form.control}>
```

---

### Use Field for input structure `[High]`
Compose Field Label and Control for accessible form structure

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/field](https://ui.shadcn.com/docs/components/field)

- **Do:** Field + FieldLabel + Input
- **Don't:** Unlabeled input or stale FormItem wrapper

**Recommended:**
```
<Field><FieldLabel htmlFor='email'>Email</FieldLabel><Input id='email'/></Field>
```

**Avoid:**
```
<Input placeholder='Email'/>
```

---

### Display field errors `[Medium]`
Render validation messages with FieldError

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/field](https://ui.shadcn.com/docs/components/field)

- **Do:** FieldError with controller fieldState errors
- **Don't:** Unassociated custom error text

**Recommended:**
```
<FieldError errors={[fieldState.error]}/>
```

**Avoid:**
```
<span>{error.message}</span>
```

---

### Use schema validation `[Medium]`
Use a Standard Schema compatible validator such as Zod where it adds value

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/forms](https://ui.shadcn.com/docs/forms)

- **Do:** Zod schema with resolver or form adapter
- **Don't:** Assume Zod is the only supported validator

**Recommended:**
```
zodResolver(formSchema)
```

**Avoid:**
```
Hand-written divergent client rules
```

---

### TanStack Form integration `[High]`
Use TanStack Form field adapters with shadcn Field primitives when that form library is selected

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/forms/tanstack-form](https://ui.shadcn.com/docs/forms/tanstack-form)

- **Do:** form.Field + Field + FieldError
- **Don't:** Apply React Hook Form Controller APIs to TanStack Form

**Recommended:**
```
<form.Field name='email'>{field => <Field><Input value={field.state.value}/></Field>}</form.Field>
```

**Avoid:**
```
<Controller control={form.control}/>
```

---

## Select

### Use Select for dropdowns `[Medium]`
Select component for option selection

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/select](https://ui.shadcn.com/docs/components/select)

- **Do:** Select for choosing from list
- **Don't:** Native select element

**Recommended:**
```
<Select><SelectTrigger><SelectContent>
```

**Avoid:**
```
<select><option>
```

---

### Structure Select properly `[High]`
Include Trigger Value Content and Items

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/select](https://ui.shadcn.com/docs/components/select)

- **Do:** Complete Select structure
- **Don't:** Missing SelectValue or SelectContent

**Recommended:**
```
<SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem>
```

**Avoid:**
```
<Select><option>
```

---

## Command

### Use Command for search `[Medium]`
Command component for searchable lists and palettes

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/command](https://ui.shadcn.com/docs/components/command)

- **Do:** Command for command palette search
- **Don't:** Input with custom dropdown

**Recommended:**
```
<Command><CommandInput><CommandList>
```

**Avoid:**
```
<Input><div className="dropdown">
```

---

### Group command items `[Low]`
Use CommandGroup for categorized items

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/command](https://ui.shadcn.com/docs/components/command)

- **Do:** CommandGroup with heading for sections
- **Don't:** Flat list without grouping

**Recommended:**
```
<CommandGroup heading="Suggestions"><CommandItem>
```

**Avoid:**
```
<CommandItem> without groups
```

---

## Table

### Use Table for data display `[Medium]`
Table component for structured data

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/table](https://ui.shadcn.com/docs/components/table)

- **Do:** Table for tabular data display
- **Don't:** Div grid for table-like layouts

**Recommended:**
```
<Table><TableHeader><TableBody><TableRow>
```

**Avoid:**
```
<div className="grid">
```

---

### Include proper table structure `[High]`
Use TableHeader TableBody TableRow TableCell

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/table](https://ui.shadcn.com/docs/components/table)

- **Do:** Semantic table structure
- **Don't:** Missing thead or tbody

**Recommended:**
```
<TableHeader><TableRow><TableHead>
```

**Avoid:**
```
<Table><TableRow> without header
```

---

## DataTable

### Use DataTable for complex tables `[Medium]`
Combine Table with TanStack Table for features

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/data-table](https://ui.shadcn.com/docs/components/data-table)

- **Do:** DataTable pattern for sorting filtering pagination
- **Don't:** Custom table implementation

**Recommended:**
```
useReactTable + Table components
```

**Avoid:**
```
Custom sort filter pagination logic
```

---

## Tabs

### Use Tabs for content switching `[Medium]`
Tabs component for tabbed interfaces

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/tabs](https://ui.shadcn.com/docs/components/tabs)

- **Do:** Tabs for related content sections
- **Don't:** Custom tab implementation

**Recommended:**
```
<Tabs><TabsList><TabsTrigger><TabsContent>
```

**Avoid:**
```
<div onClick={() => setTab(...)}
```

---

### Set default tab value `[Low]`
Specify defaultValue for initial tab

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/tabs](https://ui.shadcn.com/docs/components/tabs)

- **Do:** defaultValue on Tabs component
- **Don't:** No default leaving first tab

**Recommended:**
```
<Tabs defaultValue="account">
```

**Avoid:**
```
<Tabs> without defaultValue
```

---

## Accordion

### Use Accordion for collapsible `[Medium]`
Accordion for expandable content sections

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

- **Do:** Accordion for FAQ settings panels
- **Don't:** Custom collapse implementation

**Recommended:**
```
<Accordion><AccordionItem><AccordionTrigger>
```

**Avoid:**
```
<div onClick={() => setOpen(!open)}>
```

---

### Choose accordion type `[Low]`
Use type="single" or type="multiple" appropriately

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

- **Do:** type="single" for one open type="multiple" for many
- **Don't:** Default type without consideration

**Recommended:**
```
<Accordion type="single" collapsible>
```

**Avoid:**
```
<Accordion> without type
```

---

## Toast

### Use Sonner for toasts `[Medium]`
Sonner integration for toast notifications

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sonner](https://ui.shadcn.com/docs/components/sonner)

- **Do:** toast() from sonner for notifications
- **Don't:** Custom toast implementation

**Recommended:**
```
toast("Event created")
```

**Avoid:**
```
setShowToast(true)
```

---

### Add Toaster to layout `[High]`
Include Toaster component in root layout

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sonner](https://ui.shadcn.com/docs/components/sonner)

- **Do:** <Toaster /> in app layout
- **Don't:** Toaster in individual pages

**Recommended:**
```
app/layout.tsx: <Toaster />
```

**Avoid:**
```
page.tsx: <Toaster />
```

---

### Use toast variants `[Medium]`
Apply toast.success toast.error for context

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sonner](https://ui.shadcn.com/docs/components/sonner)

- **Do:** Semantic toast methods
- **Don't:** Generic toast for all messages

**Recommended:**
```
toast.success("Saved!") toast.error("Failed")
```

**Avoid:**
```
toast("Saved!") toast("Failed")
```

---

## Popover

### Use Popover for floating content `[Medium]`
Popover for dropdown menus and floating panels

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/popover](https://ui.shadcn.com/docs/components/popover)

- **Do:** Popover for contextual actions
- **Don't:** Absolute positioned divs

**Recommended:**
```
<Popover><PopoverTrigger><PopoverContent>
```

**Avoid:**
```
<div className="relative"><div className="absolute">
```

---

### Handle popover alignment `[Low]`
Use align and side props for positioning

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/popover](https://ui.shadcn.com/docs/components/popover)

- **Do:** Explicit alignment configuration
- **Don't:** Default alignment for all

**Recommended:**
```
<PopoverContent align="start" side="bottom">
```

**Avoid:**
```
<PopoverContent>
```

---

## DropdownMenu

### Use DropdownMenu for actions `[Medium]`
DropdownMenu for action lists and context menus

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dropdown-menu](https://ui.shadcn.com/docs/components/dropdown-menu)

- **Do:** DropdownMenu for user menu actions
- **Don't:** Popover for action lists

**Recommended:**
```
<DropdownMenu><DropdownMenuTrigger><DropdownMenuContent>
```

**Avoid:**
```
<Popover> for menu actions
```

---

### Group menu items `[Low]`
Use DropdownMenuGroup and DropdownMenuSeparator

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dropdown-menu](https://ui.shadcn.com/docs/components/dropdown-menu)

- **Do:** Organized menu with separators
- **Don't:** Flat list of items

**Recommended:**
```
<DropdownMenuGroup><DropdownMenuItem><DropdownMenuSeparator>
```

**Avoid:**
```
<DropdownMenuItem> without organization
```

---

## Tooltip

### Use Tooltip for hints `[Medium]`
Tooltip for icon buttons and truncated text

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/tooltip](https://ui.shadcn.com/docs/components/tooltip)

- **Do:** Tooltip for additional context
- **Don't:** Title attribute for tooltips

**Recommended:**
```
<Tooltip><TooltipTrigger><TooltipContent>
```

**Avoid:**
```
<button title="Delete">
```

---

### Add TooltipProvider `[High]`
Wrap app or section in TooltipProvider

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/tooltip](https://ui.shadcn.com/docs/components/tooltip)

- **Do:** TooltipProvider at app level
- **Don't:** TooltipProvider per tooltip

**Recommended:**
```
<TooltipProvider><App/></TooltipProvider>
```

**Avoid:**
```
<Tooltip><TooltipProvider>
```

---

## Skeleton

### Use Skeleton for loading `[Medium]`
Skeleton component for loading placeholders

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/skeleton](https://ui.shadcn.com/docs/components/skeleton)

- **Do:** Skeleton matching content layout
- **Don't:** Spinner for content loading

**Recommended:**
```
<Skeleton className="h-4 w-[200px]"/>
```

**Avoid:**
```
<Spinner/> for card loading
```

---

### Match skeleton dimensions `[Medium]`
Size skeleton to match loaded content

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/skeleton](https://ui.shadcn.com/docs/components/skeleton)

- **Do:** Skeleton same size as expected content
- **Don't:** Generic skeleton size

**Recommended:**
```
<Skeleton className="h-12 w-12 rounded-full"/>
```

**Avoid:**
```
<Skeleton/> without sizing
```

---

## AlertDialog

### Use AlertDialog for confirms `[High]`
AlertDialog for destructive action confirmation

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/alert-dialog](https://ui.shadcn.com/docs/components/alert-dialog)

- **Do:** AlertDialog for delete confirmations
- **Don't:** Dialog for confirmations

**Recommended:**
```
<AlertDialog><AlertDialogTrigger><AlertDialogContent>
```

**Avoid:**
```
<Dialog> for delete confirmation
```

---

### Include action buttons `[Medium]`
Use AlertDialogAction and AlertDialogCancel

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/alert-dialog](https://ui.shadcn.com/docs/components/alert-dialog)

- **Do:** Standard confirm/cancel pattern
- **Don't:** Custom buttons in AlertDialog

**Recommended:**
```
<AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>
```

**Avoid:**
```
<Button>Cancel</Button><Button>Confirm</Button>
```

---

## Sidebar

### Use Sidebar for navigation `[Medium]`
Sidebar component for app navigation

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sidebar](https://ui.shadcn.com/docs/components/sidebar)

- **Do:** Sidebar for main app navigation
- **Don't:** Custom sidebar implementation

**Recommended:**
```
<SidebarProvider><Sidebar><SidebarContent>
```

**Avoid:**
```
<div className="w-64 fixed">
```

---

### Wrap in SidebarProvider `[High]`
Use SidebarProvider for sidebar state management

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sidebar](https://ui.shadcn.com/docs/components/sidebar)

- **Do:** SidebarProvider at layout level
- **Don't:** Sidebar without provider

**Recommended:**
```
<SidebarProvider><Sidebar></SidebarProvider>
```

**Avoid:**
```
<Sidebar> without provider
```

---

### Use SidebarTrigger `[Medium]`
Include SidebarTrigger for mobile toggle

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/sidebar](https://ui.shadcn.com/docs/components/sidebar)

- **Do:** SidebarTrigger for responsive toggle
- **Don't:** Custom toggle button

**Recommended:**
```
<SidebarTrigger/>
```

**Avoid:**
```
<Button onClick={() => toggleSidebar()}>
```

---

## Chart

### Use Chart for data viz `[Medium]`
Chart component with Recharts integration

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/chart](https://ui.shadcn.com/docs/components/chart)

- **Do:** Chart component for dashboards
- **Don't:** Direct Recharts without wrapper

**Recommended:**
```
<ChartContainer config={chartConfig}>
```

**Avoid:**
```
<ResponsiveContainer><BarChart>
```

---

### Define chart config `[Medium]`
Create chartConfig for consistent theming

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/chart](https://ui.shadcn.com/docs/components/chart)

- **Do:** chartConfig with color definitions
- **Don't:** Inline colors in charts

**Recommended:**
```
{ desktop: { label: "Desktop", color: "#2563eb" } }
```

**Avoid:**
```
<Bar fill="#2563eb"/>
```

---

### Use ChartTooltip `[Low]`
Apply ChartTooltip for interactive charts

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/chart](https://ui.shadcn.com/docs/components/chart)

- **Do:** ChartTooltip with ChartTooltipContent
- **Don't:** Recharts Tooltip directly

**Recommended:**
```
<ChartTooltip content={<ChartTooltipContent/>}/>
```

**Avoid:**
```
<Tooltip/> from recharts
```

---

## Blocks

### Use blocks for scaffolding `[Medium]`
Start from shadcn blocks for common layouts

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)

- **Do:** npx shadcn@latest add dashboard-01
- **Don't:** Build dashboard from scratch

**Recommended:**
```
npx shadcn@latest add login-01
```

**Avoid:**
```
Custom login page from scratch
```

---

### Customize block components `[Low]`
Modify copied block code to fit needs

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)

- **Do:** Edit block files after installation
- **Don't:** Use blocks without modification

**Recommended:**
```
Customize dashboard-01 layout
```

**Avoid:**
```
Use dashboard-01 as-is
```

---

## A11y

### Use semantic components `[High]`
Shadcn components have built-in ARIA

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

- **Do:** Rely on component accessibility
- **Don't:** Override ARIA attributes

**Recommended:**
```
<Button> has button role
```

**Avoid:**
```
<div role="button">
```

---

### Maintain focus management `[High]`
Dialog Sheet handle focus automatically

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog)

- **Do:** Let components manage focus
- **Don't:** Custom focus handling

**Recommended:**
```
<Dialog> traps focus
```

**Avoid:**
```
document.querySelector().focus()
```

---

### Provide labels `[High]`
Use FieldLabel or an explicit accessible name

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/field](https://ui.shadcn.com/docs/components/field)

- **Do:** Associate visible labels with form controls
- **Don't:** Placeholder as only label

**Recommended:**
```
<FieldLabel htmlFor='email'>Email</FieldLabel><Input id='email'/>
```

**Avoid:**
```
<Input placeholder="Email"/>
```

---

## Performance

### Import components individually `[Medium]`
Import only needed components

**Applies to:** shadcn cli 4; base=base|radix|aria

- **Do:** Named imports from component files
- **Don't:** Import all from index

**Recommended:**
```
import { Button } from "@/components/ui/button"
```

**Avoid:**
```
import { Button Card Dialog } from "@/components/ui"
```

---

### Lazy load dialogs `[Medium]`
Dynamic import for heavy dialog content

**Applies to:** shadcn cli 4; base=base|radix|aria

- **Do:** React.lazy for dialog content
- **Don't:** Import all dialogs upfront

**Recommended:**
```
const HeavyContent = lazy(() => import('./Heavy'))
```

**Avoid:**
```
import HeavyContent from './Heavy'
```

---

## Customization

### Extend variants with cva `[Medium]`
Add new variants using class-variance-authority

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

- **Do:** Extend buttonVariants for new styles
- **Don't:** Inline classes for variants

**Recommended:**
```
variants: { size: { xl: "h-14 px-8" } }
```

**Avoid:**
```
className="h-14 px-8"
```

---

### Create custom components `[Medium]`
Build new components following shadcn patterns

**Applies to:** shadcn cli 4; base=base|radix|aria

- **Do:** Use cn() and cva for custom components
- **Don't:** Different patterns for custom

**Recommended:**
```
const Custom = ({ className }) => <div className={cn("base" className)}>
```

**Avoid:**
```
const Custom = ({ style }) => <div style={style}>
```

---

## Patterns

### Use asChild for Radix composition `[Medium]`
Radix-based components support asChild for polymorphic composition

**Applies to:** shadcn cli 4; base=radix
**Documentation:** [https://ui.shadcn.com/docs/components/radix/button](https://ui.shadcn.com/docs/components/radix/button)

- **Do:** Use asChild only when the installed Radix component exposes it
- **Don't:** Assume Base UI or React Aria components share the Radix API

**Recommended:**
```
<Button asChild><Link href="/">
```

**Avoid:**
```
<Button><Link href="/"></Link></Button>
```

---

### Preserve React Aria link semantics `[High]`
Style a semantic anchor with buttonVariants when navigation is intended

**Applies to:** shadcn cli 4; base=aria
**Documentation:** [https://ui.shadcn.com/docs/components/aria/button](https://ui.shadcn.com/docs/components/aria/button)

- **Do:** Use an anchor for a link and a button for an action
- **Don't:** Render a React Aria Button that masquerades as a link

**Recommended:**
```
<a href="/docs" className={buttonVariants()}>Docs</a>
```

**Avoid:**
```
<Button onPress={() => navigate('/docs')}>Docs</Button>
```

---

### Use render for Base UI composition `[High]`
Base UI components compose another element through the render prop rather than Radix asChild

**Applies to:** shadcn cli 4; base=base
**Documentation:** [https://ui.shadcn.com/docs/components/base/button](https://ui.shadcn.com/docs/components/base/button)

- **Do:** Use render with the intended semantic element
- **Don't:** Pass the Radix-only asChild prop to a Base UI component

**Recommended:**
```
<Button render={<a href="/docs" />}>Docs</Button>
```

**Avoid:**
```
<Button asChild><a href="/docs">Docs</a></Button>
```

---

## Registry

### Use base and font registry item types `[Medium]`
Publish base primitives as registry:base and fonts as registry:font so CLI v4 applies them correctly

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/registry/registry-item-json](https://ui.shadcn.com/docs/registry/registry-item-json)

- **Do:** Explicit registry item types
- **Don't:** Publish every artifact as registry:ui

**Recommended:**
```
type: 'registry:base' or type: 'registry:font'
```

**Avoid:**
```
type: 'registry:ui' for a base definition
```

---

### Inspect CLI changes before writing `[High]`
Use CLI v4 dry-run diff and view plus info and docs to inspect project and registry state

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/cli#add](https://ui.shadcn.com/docs/cli#add)

- **Do:** npx shadcn@latest add button --dry-run
- **Don't:** Blindly overwrite customized components

**Recommended:**
```
npx shadcn@latest add button --diff
```

**Avoid:**
```
npx shadcn@latest add button without review
```

---

### Install public GitHub registries directly `[Medium]`
A public repository with root registry.json can be addressed as owner/repo/item

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/registry/getting-started](https://ui.shadcn.com/docs/registry/getting-started)

- **Do:** npx shadcn@latest add owner/repo/item
- **Don't:** Require a separately hosted generated registry

**Recommended:**
```
npx shadcn@latest add acme/ui/button
```

**Avoid:**
```
Copy raw GitHub source files
```

---

### Keep registry source declarations `[High]`
Configure namespaced registry URLs and required headers in components.json

**Applies to:** shadcn cli 4; base=base|radix|aria
**Documentation:** [https://ui.shadcn.com/docs/registry/namespace](https://ui.shadcn.com/docs/registry/namespace)

- **Do:** Use registries map with environment variables
- **Don't:** Hardcode private registry secrets in source

**Recommended:**
```
registries: { '@acme': { url: '${REGISTRY_URL}/{name}.json' } }
```

**Avoid:**
```
Commit bearer tokens
```

---
