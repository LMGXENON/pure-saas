# Laravel Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`laravel.csv`)
> Framework: Laravel
> Rules Count: 50 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Laravel** projects.

---

## Blade Templates

### Use Blade components for reusable UI `[High]`
Extract repeated markup into named Blade components

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#components](https://laravel.com/docs/blade#components)

- **Do:** Use x-* components with @props for all reusable UI
- **Don't:** Duplicate HTML blocks across views

**Recommended:**
```
<x-card :title="$title">{{ $slot }}</x-card>
```

**Avoid:**
```
@include('card' ['title' => $title])
```

---

### Use layouts with @extends and @section `[High]`
Define one master layout and extend it per page

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#layouts-using-template-inheritance](https://laravel.com/docs/blade#layouts-using-template-inheritance)

- **Do:** @extends layout with named @section blocks
- **Don't:** Duplicate header/footer HTML in every view

**Recommended:**
```
@extends('layouts.app') @section('content')
```

**Avoid:**
```
Full HTML in every view file
```

---

### Use @props for component type-safety `[Medium]`
Declare accepted props inside components with @props

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#component-data-and-attributes](https://laravel.com/docs/blade#component-data-and-attributes)

- **Do:** @props with defaults to document component API
- **Don't:** Pass arbitrary variables without declaration

**Recommended:**
```
@props(['title' => '' 'variant' => 'primary'])
```

**Avoid:**
```
No @props declaration in component
```

---

### Use conditional CSS classes with @class `[Medium]`
Build class strings conditionally without ternary noise

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#conditional-classes-and-styles](https://laravel.com/docs/blade#conditional-classes-and-styles)

- **Do:** @class directive for conditional class binding
- **Don't:** String concatenation or nested ternaries

**Recommended:**
```
@class(['btn' 'btn-primary' => $primary 'btn-disabled' => $disabled])
```

**Avoid:**
```
class="btn {{ $primary ? 'btn-primary' : '' }}"
```

---

### Use named slots for flexible layouts `[Medium]`
Named slots let callers inject content into specific regions

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#slots](https://laravel.com/docs/blade#slots)

- **Do:** @slot('header') and $slot for flexible component APIs
- **Don't:** Hard-code all sub-sections inside components

**Recommended:**
```
<x-modal><x-slot:header>Title</x-slot>Body</x-modal>
```

**Avoid:**
```
<x-modal title="Title">Body with no slot control</x-modal>
```

---

### Use Blade directives instead of raw PHP `[High]`
Blade directives are readable and IDE-supported

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#blade-directives](https://laravel.com/docs/blade#blade-directives)

- **Do:** @if @foreach @forelse @empty instead of <?php ?>
- **Don't:** Raw PHP tags inside Blade templates

**Recommended:**
```
@forelse($items as $item) ... @empty <p>None</p> @endforelse
```

**Avoid:**
```
<?php foreach($items as $item): ?>
```

---

### Escape output with {{ }} `[High]`
Use double curly braces for XSS-safe output

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#displaying-data](https://laravel.com/docs/blade#displaying-data)

- **Do:** {{ }} for all user-supplied or dynamic text
- **Don't:** {!! !!} for untrusted data

**Recommended:**
```
{{ $user->name }}
```

**Avoid:**
```
{!! $user->name !!}
```

---

### Use @vite for asset loading `[High]`
Vite integration handles cache busting and HMR automatically

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/vite](https://laravel.com/docs/vite)

- **Do:** @vite(['resources/css/app.css' 'resources/js/app.js'])
- **Don't:** Manual script/link tags with hardcoded paths

**Recommended:**
```
@vite(['resources/css/app.css' 'resources/js/app.js'])
```

**Avoid:**
```
<link href="/css/app.css?v=123">
```

---

## Livewire

### Bind inputs with wire:model `[High]`
Two-way data binding keeps component state in sync

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#livewire](https://laravel.com/docs/13.x/starter-kits#livewire)

- **Do:** wire:model for all form inputs managed by Livewire
- **Don't:** Manual JavaScript listeners syncing to component

**Recommended:**
```
<input wire:model="email">
```

**Avoid:**
```
<input @change="$wire.email = $event.target.value">
```

---

### Use wire:model.live for real-time validation `[Medium]`
Validate on input rather than only on submit

**Applies to:** laravel 13.x
**Documentation:** [https://livewire.laravel.com/docs/validation](https://livewire.laravel.com/docs/validation)

- **Do:** wire:model.live + #[Validate] for instant feedback
- **Don't:** Only validate on form submit

**Recommended:**
```
<input wire:model.live="email"> with #[Validate('email')]
```

**Avoid:**
```
<input wire:model="email"> with validate() on submit only
```

---

### Use wire:click for actions `[High]`
Bind UI events to component methods cleanly

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#livewire](https://laravel.com/docs/13.x/starter-kits#livewire)

- **Do:** wire:click for buttons and interactive elements
- **Don't:** JavaScript fetch calls replicating Livewire actions

**Recommended:**
```
<button wire:click="save">Save</button>
```

**Avoid:**
```
<button onclick="fetch('/save')">Save</button>
```

---

### Use lifecycle hooks appropriately `[Medium]`
mount() for init; updated() for reactive side effects

**Applies to:** laravel 13.x
**Documentation:** [https://livewire.laravel.com/docs/lifecycle-hooks](https://livewire.laravel.com/docs/lifecycle-hooks)

- **Do:** mount() for initialization updatedFoo() for property changes
- **Don't:** Heavy logic in render() or __construct()

**Recommended:**
```
public function mount(): void { $this->items = Item::all(); }
```

**Avoid:**
```
public function render(): View { $this->items = Item::all(); }
```

---

### Use lazy loading for heavy components `[Medium]`
Defer render of expensive components until visible

**Applies to:** laravel 13.x
**Documentation:** [https://livewire.laravel.com/docs/lazy](https://livewire.laravel.com/docs/lazy)

- **Do:** wire:init or lazy attribute on components
- **Don't:** Load all Livewire components on page load

**Recommended:**
```
<livewire:analytics-chart lazy />
```

**Avoid:**
```
<livewire:analytics-chart /> with heavy DB queries on mount
```

---

### Integrate Alpine.js for local UI state `[Medium]`
Use Alpine.js for UI-only state that doesn't need server round-trips

**Applies to:** laravel 13.x
**Documentation:** [https://livewire.laravel.com/docs/alpine](https://livewire.laravel.com/docs/alpine)

- **Do:** x-data / x-show / x-transition for tooltips dropdowns
- **Don't:** Livewire server calls for purely visual toggle state

**Recommended:**
```
<div x-data="{ open: false }"><button @click="open = !open">
```

**Avoid:**
```
<button wire:click="toggleDropdown"> for a local dropdown
```

---

### Use wire:loading for feedback `[High]`
Always indicate to users when a server action is in progress

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#livewire](https://laravel.com/docs/13.x/starter-kits#livewire)

- **Do:** wire:loading.attr="disabled" and wire:loading elements
- **Don't:** Provide no feedback while Livewire request is in flight

**Recommended:**
```
<button wire:click="save" wire:loading.attr="disabled">Save</button>
```

**Avoid:**
```
<button wire:click="save">Save</button> with no loading state
```

---

### Handle file uploads with WithFileUploads `[Medium]`
Livewire's trait manages chunked upload and temp storage

**Applies to:** laravel 13.x
**Documentation:** [https://livewire.laravel.com/docs/uploads](https://livewire.laravel.com/docs/uploads)

- **Do:** WithFileUploads trait + wire:model for file inputs
- **Don't:** Manual multipart form submissions for Livewire pages

**Recommended:**
```
use WithFileUploads; public $photo; <input wire:model="photo" type="file">
```

**Avoid:**
```
<form action="/upload" method="POST" enctype="multipart/form-data">
```

---

## Inertia.js

### Use Inertia page components as route endpoints `[High]`
Each page is a Vue/React component rendered server-side via Inertia::render()

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#inertia](https://laravel.com/docs/13.x/starter-kits#inertia)

- **Do:** Inertia::render('Dashboard' ['data' => $data]) in controllers
- **Don't:** Return JSON and fetch from JavaScript

**Recommended:**
```
return Inertia::render('Users/Index' ['users' => $users]);
```

**Avoid:**
```
return response()->json($users); with client-side fetch
```

---

### Share global data via HandleInertiaRequests `[High]`
Middleware share() provides auth user and flash to every page

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#inertia](https://laravel.com/docs/13.x/starter-kits#inertia)

- **Do:** Share auth/flash in HandleInertiaRequests middleware
- **Don't:** Pass auth to every Inertia::render() call

**Recommended:**
```
public function share(Request $r): array { return ['auth' => ['user' => $r->user()]]; }
```

**Avoid:**
```
Inertia::render('Page' ['auth' => auth()->user()]) every controller
```

---

### Use <Link> for client-side navigation `[High]`
Inertia Link intercepts clicks for SPA-like transitions

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#inertia](https://laravel.com/docs/13.x/starter-kits#inertia)

- **Do:** <Link href="/dashboard"> instead of <a href>
- **Don't:** Regular <a> tags for internal navigation

**Recommended:**
```
<Link href={route('dashboard')}>Dashboard</Link>
```

**Avoid:**
```
<a href="/dashboard">Dashboard</a>
```

---

### Use useForm for form state and submission `[High]`
Inertia's useForm manages progress errors and transforms

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/starter-kits#inertia](https://laravel.com/docs/13.x/starter-kits#inertia)

- **Do:** useForm for all page-level forms, form.post() for submit
- **Don't:** Axios/fetch for form submissions on Inertia pages

**Recommended:**
```
const form = useForm({ name: '' }); form.post('/users');
```

**Avoid:**
```
axios.post('/users', { name });
```

---

### Use persistent layouts to preserve state `[Medium]`
Wrap pages in a persistent layout so header/sidebar don't remount

**Applies to:** laravel 13.x
**Documentation:** [https://inertiajs.com/pages#persistent-layouts](https://inertiajs.com/pages#persistent-layouts)

- **Do:** layout property on page component for persistent UI
- **Don't:** Re-render full layout on every page visit

**Recommended:**
```
MyPage.layout = (page) => <AppLayout>{page}</AppLayout>
```

**Avoid:**
```
No layout — full page reload feel on navigation
```

---

### Enable SSR for public pages `[Medium]`
Server-side rendering improves SEO and first paint

**Applies to:** laravel 13.x
**Documentation:** [https://inertiajs.com/server-side-rendering](https://inertiajs.com/server-side-rendering)

- **Do:** Enable Inertia SSR for marketing and public pages
- **Don't:** Client-only rendering for all pages including public

**Recommended:**
```
php artisan inertia:start-ssr with @inertiaHead
```

**Avoid:**
```
No SSR on pages requiring good SEO
```

---

## Styling

### Set up Tailwind CSS via Vite `[High]`
Use Vite + tailwindcss plugin for fast HMR and optimized builds

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/vite](https://laravel.com/docs/13.x/vite)

- **Do:** Install tailwindcss @tailwindcss/vite and configure vite.config.js
- **Don't:** Laravel Mix or manual PostCSS pipeline for new projects

**Recommended:**
```
plugins: [tailwindcss()] in vite.config.js + @import 'tailwindcss' in app.css
```

**Avoid:**
```
Laravel Mix with require('tailwindcss') in webpack
```

---

### Purge unused styles via content config `[High]`
Tailwind scans Blade and JS files to tree-shake unused classes

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/13.x/vite](https://laravel.com/docs/13.x/vite)

- **Do:** content: ['./resources/views/**/*.blade.php', './resources/js/**/*.{js,vue}']
- **Don't:** No content config — ship all 3MB of CSS

**Recommended:**
```
content: ['./resources/**/*.blade.php', './resources/**/*.js']
```

**Avoid:**
```
content: []
```

---

### Use dark mode class strategy `[Medium]`
class-based dark mode integrates with server-rendered preference

**Applies to:** laravel 13.x
**Documentation:** [https://tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode)

- **Do:** darkMode: 'class' with a toggle that sets class on <html>
- **Don't:** Media query only — no user override possible

**Recommended:**
```
darkMode: 'class'; document.documentElement.classList.toggle('dark')
```

**Avoid:**
```
darkMode: 'media' — no programmatic control
```

---

### Use @apply sparingly in component CSS `[Low]`
Extract only truly repeated multi-class patterns

**Applies to:** laravel 13.x
**Documentation:** [https://tailwindcss.com/docs/functions-and-directives#apply](https://tailwindcss.com/docs/functions-and-directives#apply)

- **Do:** @apply for BEM base classes shared across many components
- **Don't:** @apply for every single element — defeats Tailwind's purpose

**Recommended:**
```
@apply flex items-center gap-2 (shared button base)
```

**Avoid:**
```
@apply text-sm for a single use
```

---

### Configure custom design tokens in CSS `[Medium]`
Define brand colors spacing fonts as CSS variables consumed by Tailwind

**Applies to:** laravel 13.x
**Documentation:** [https://tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme)

- **Do:** Custom @theme tokens matched to brand guidelines
- **Don't:** Magic color hex codes scattered across Blade templates

**Recommended:**
```
@theme { --color-brand: oklch(0.6 0.2 250); }
```

**Avoid:**
```
bg-[#1a2b3c] inline throughout templates
```

---

## Components

### Use anonymous Blade components for UI primitives `[Medium]`
Blade files in resources/views/components/ auto-register as x-* components

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#anonymous-components](https://laravel.com/docs/blade#anonymous-components)

- **Do:** Anonymous components for buttons alerts badges cards
- **Don't:** Blade @includes for anything reusable

**Recommended:**
```
<x-badge variant="success">Active</x-badge>
```

**Avoid:**
```
@include('partials.badge' ['variant' => 'success'])
```

---

### Use class-based components for complex logic `[Medium]`
PHP class components can inject services and pre-process data

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#components](https://laravel.com/docs/blade#components)

- **Do:** app/View/Components/ class when component needs PHP logic
- **Don't:** Blade @php blocks for business logic inside templates

**Recommended:**
```
class AlertComponent { public function __construct(public string $type) {} }
```

**Avoid:**
```
@php $color = $type === 'error' ? 'red' : 'green'; @endphp
```

---

### Forward extra attributes with $attributes `[High]`
Pass through HTML attributes like class id aria to root element

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#component-attributes](https://laravel.com/docs/blade#component-attributes)

- **Do:** $attributes->merge() on root element of components
- **Don't:** Ignore caller-provided HTML attributes silently

**Recommended:**
```
<div {{ $attributes->merge(['class' => 'btn']) }}>
```

**Avoid:**
```
<div class="btn"> — drops extra class/id from caller
```

---

### Separate variant logic from templates `[Medium]`
Keep variant/size/color logic in a PHP class or helper not in Blade

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#components](https://laravel.com/docs/blade#components)

- **Do:** Variant class or match() expression in component class
- **Don't:** Long @if chains for variants inside Blade templates

**Recommended:**
```
public function classes(): string { return match($this->variant) { 'primary' => 'bg-blue-600', } }
```

**Avoid:**
```
@if($variant === 'primary') bg-blue-600 @elseif($variant === 'secondary')...
```

---

### Provide default slot content `[Low]`
Use {{ $slot ?? '' }} or named slot defaults so components are usable empty

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#slots](https://laravel.com/docs/blade#slots)

- **Do:** Default content in slots for optional regions
- **Don't:** Require every slot to be filled — throws errors on empty usage

**Recommended:**
```
{{ $icon ?? '' }} in component Blade file
```

**Avoid:**
```
{{ $icon }} — fatal if caller omits slot
```

---

### Use component namespacing for packages `[Low]`
Prefix third-party or module components to avoid collisions

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#manually-registering-components](https://laravel.com/docs/blade#manually-registering-components)

- **Do:** Register custom prefix via Blade::componentNamespace()
- **Don't:** Mix first-party and package component names with no prefix

**Recommended:**
```
Blade::componentNamespace('Modules\\Shop\\Views' 'shop'); <x-shop::product-card />
```

**Avoid:**
```
<x-product-card /> colliding with first-party card
```

---

## Forms

### Validate with Form Request classes `[High]`
Move validation rules out of controllers into dedicated FormRequest classes

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/validation#form-request-validation](https://laravel.com/docs/validation#form-request-validation)

- **Do:** php artisan make:request and define rules() + authorize()
- **Don't:** Inline validate() in controller actions

**Recommended:**
```
class StorePostRequest extends FormRequest { public function rules() { return ['title' => 'required|max:255']; } }
```

**Avoid:**
```
public function store(Request $r) { $r->validate(['title' => 'required']); }
```

---

### Preserve old input on validation failure `[High]`
Use old() to repopulate form fields after server-side error redirect

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/validation#repopulating-forms](https://laravel.com/docs/validation#repopulating-forms)

- **Do:** old('field') as default value on all form inputs
- **Don't:** Empty form fields when validation fails

**Recommended:**
```
<input name="email" value="{{ old('email') }}">
```

**Avoid:**
```
<input name="email">
```

---

### Display validation errors with @error `[Medium]`
Use the @error directive for inline field-level error messages

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/validation#quick-displaying-the-validation-errors](https://laravel.com/docs/validation#quick-displaying-the-validation-errors)

- **Do:** @error('field') to show per-field messages
- **Don't:** Dump $errors->all() in one block at top of form

**Recommended:**
```
@error('email') <p class="text-red-500">{{ $message }}</p> @enderror
```

**Avoid:**
```
@foreach($errors->all() as $e) {{ $e }} @endforeach
```

---

### Use CSRF token on all forms `[High]`
CSRF protection is enabled by default — include @csrf in every form

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/csrf](https://laravel.com/docs/csrf)

- **Do:** @csrf in every POST/PUT/PATCH/DELETE form
- **Don't:** Disable VerifyCsrfToken middleware for convenience

**Recommended:**
```
<form method="POST">@csrf ...
```

**Avoid:**
```
<form method="POST"> without @csrf
```

---

### Use method spoofing for PUT/PATCH/DELETE `[Medium]`
HTML forms only support GET/POST — use @method for REST actions

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/routing#form-method-spoofing](https://laravel.com/docs/routing#form-method-spoofing)

- **Do:** @method('PUT') inside form for update/delete routes
- **Don't:** Route::post for all mutations including updates

**Recommended:**
```
<form method="POST">@csrf @method('PUT')
```

**Avoid:**
```
<form method="POST" action="/users/update">
```

---

### Display flash messages consistently `[Medium]`
Flash success/error in controller; read in layout with session()

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/session#flash-data](https://laravel.com/docs/session#flash-data)

- **Do:** session('status') in layout for global flash display
- **Don't:** Re-query DB or pass flash from every controller individually

**Recommended:**
```
@if(session('success')) <div class="alert">{{ session('success') }}</div> @endif
```

**Avoid:**
```
if($user) return back()->with(['user' => $user]);
```

---

## Performance

### Eager load relationships to prevent N+1 `[High]`
Always eager load related models used in views with with()

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/eloquent-relationships#eager-loading](https://laravel.com/docs/eloquent-relationships#eager-loading)

- **Do:** with() in queries before passing collections to views
- **Don't:** Lazy-load relations inside Blade loops

**Recommended:**
```
User::with('posts' 'avatar')->get()
```

**Avoid:**
```
User::all() then @foreach $user->posts in Blade
```

---

### Cache rendered Blade fragments `[Medium]`
Use cache() helper to wrap expensive rendered partials

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/cache](https://laravel.com/docs/cache)

- **Do:** cache() around slow partials that change infrequently
- **Don't:** Re-render identical content on every request

**Recommended:**
```
@php echo cache()->remember('sidebar' 3600 fn() => view('sidebar')->render()); @endphp
```

**Avoid:**
```
{{ view('sidebar')->render() }} on every page load
```

---

### Paginate large data sets `[High]`
Always paginate collections in list views

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/pagination](https://laravel.com/docs/pagination)

- **Do:** ->paginate() or ->simplePaginate() with {{ $items->links() }}
- **Don't:** ->get() for large tables in views

**Recommended:**
```
User::paginate(20) with <x-pagination :links="$users" />
```

**Avoid:**
```
User::all() passed to Blade
```

---

### Queue slow background tasks `[High]`
Offload emails notifications and heavy processing to queues

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/queues](https://laravel.com/docs/queues)

- **Do:** Dispatch jobs for anything taking >200ms
- **Don't:** Block HTTP request with slow operations

**Recommended:**
```
ProcessImage::dispatch($file); return back();
```

**Avoid:**
```
Storage::put(); Mail::send(); Image::resize(); in controller
```

---

### Use route model binding `[Medium]`
Laravel resolves models automatically — avoids manual find()

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/routing#route-model-binding](https://laravel.com/docs/routing#route-model-binding)

- **Do:** Type-hint model in controller method
- **Don't:** Manual User::findOrFail($id) in every method

**Recommended:**
```
public function show(User $user): View { return view('users.show' compact('user')); }
```

**Avoid:**
```
public function show($id) { $user = User::findOrFail($id); }
```

---

### Enable HTTP response caching for static content `[Medium]`
Cache control headers for pages that rarely change

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/responses#response-headers](https://laravel.com/docs/responses#response-headers)

- **Do:** Cache-Control headers via middleware for public pages
- **Don't:** No caching — serve every response fresh

**Recommended:**
```
response()->view('home')->header('Cache-Control', 'public, max-age=3600')
```

**Avoid:**
```
No cache headers on marketing pages
```

---

## Security

### Escape all output in Blade `[High]`
{{ }} auto-escapes HTML — never use {!! !!} on user data

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/blade#displaying-data](https://laravel.com/docs/blade#displaying-data)

- **Do:** {{ }} for all untrusted or dynamic content
- **Don't:** {!! !!} for user-controlled strings

**Recommended:**
```
{{ $comment->body }}
```

**Avoid:**
```
{!! $comment->body !!}
```

---

### Protect routes with Gate and Policy `[High]`
Use policies for authorization — never inline permission checks in views

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/authorization#policies](https://laravel.com/docs/authorization#policies)

- **Do:** @can / Gate::allows() for UI visibility; policy()->authorize() for actions
- **Don't:** Hardcode role checks inline across templates

**Recommended:**
```
@can('update' $post) <a href="{{ route('posts.edit' $post) }}">Edit</a> @endcan
```

**Avoid:**
```
@if(auth()->user()->role === 'admin') <a href="/edit">
```

---

### Validate and authorize file uploads `[High]`
Check MIME type size and store outside public root

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/filesystem#file-uploads](https://laravel.com/docs/filesystem#file-uploads)

- **Do:** Store in storage/app/private + validate mimes and max
- **Don't:** Store raw upload in public/ without validation

**Recommended:**
```
'avatar' => ['required' 'image' 'mimes:jpg,png' 'max:2048']
```

**Avoid:**
```
'avatar' => 'required' with no MIME or size check
```

---

### Use signed URLs for temporary links `[High]`
Generate expiring URLs for private downloads or email confirmations

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/urls#signed-urls](https://laravel.com/docs/urls#signed-urls)

- **Do:** URL::signedRoute() or temporarySignedRoute()
- **Don't:** Expose sequential IDs in download URLs without auth

**Recommended:**
```
URL::temporarySignedRoute('file.download' now()->addMinutes(30) ['file' => $id])
```

**Avoid:**
```
route('file.download' $id) with no expiry or signature
```

---

### Set a strict Content Security Policy `[Medium]`
CSP headers prevent XSS injection of external scripts

**Applies to:** laravel 13.x
**Documentation:** [https://laravel.com/docs/middleware](https://laravel.com/docs/middleware)

- **Do:** spatie/laravel-csp or custom middleware to emit CSP header
- **Don't:** No CSP — browser runs any injected script

**Recommended:**
```
Header: Content-Security-Policy: default-src 'self'; script-src 'self'
```

**Avoid:**
```
No Content-Security-Policy header on responses
```

---
