# Angular Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`angular.csv`)
> Framework: Angular
> Rules Count: 50 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Angular** projects.

---

## Components

### Use standalone components `[High]`
Standalone components are the default in current Angular

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/importing](https://angular.dev/guide/components/importing)

- **Do:** Standalone components for all new code
- **Don't:** NgModule-based components for new projects

**Recommended:**
```
@Component({ imports: [CommonModule] })
```

**Avoid:**
```
@NgModule({ declarations: [MyComp] })
```

---

### Use signals for state `[High]`
Signals are Angular's reactive primitive for fine-grained reactivity

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

- **Do:** Signals for component state over class properties
- **Don't:** Mutable class properties without signals

**Recommended:**
```
count = signal(0); increment() { this.count.update(v => v + 1) }
```

**Avoid:**
```
count = 0; increment() { this.count++ }
```

---

### Use @if/@for/@switch control flow `[High]`
Built-in control flow syntax replaces *ngIf/*ngFor directives

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/templates/control-flow](https://angular.dev/guide/templates/control-flow)

- **Do:** @if and @for in templates
- **Don't:** *ngIf and *ngFor structural directives

**Recommended:**
```
@if (isLoggedIn) { <Dashboard /> } @else { <Login /> }
```

**Avoid:**
```
<div *ngIf="isLoggedIn"><Dashboard /></div>
```

---

### Use input() and output() component APIs `[High]`
Use signal inputs and the output function for typed component contracts

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)

- **Do:** input() and output() for new component APIs
- **Don't:** Decorator-based inputs and outputs in new components

**Recommended:**
```
name = input<string>(); clicked = output<void>()
```

**Avoid:**
```
@Input() name: string; @Output() clicked = new EventEmitter()
```

---

### Use content projection `[Medium]`
ng-content for flexible component composition

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/content-projection](https://angular.dev/guide/components/content-projection)

- **Do:** ng-content with select for named slots
- **Don't:** Rigid templates that can't be customized

**Recommended:**
```
<ng-content select="[header]" /> <ng-content />
```

**Avoid:**
```
<div class="header">{{ title }}</div>
```

---

### Keep components small `[Medium]`
Single responsibility; components should do one thing

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components](https://angular.dev/guide/components)

- **Do:** Extract sub-components when template exceeds 50 lines
- **Don't:** Monolithic components handling multiple concerns

**Recommended:**
```
<UserAvatar /> <UserDetails /> <UserActions />
```

**Avoid:**
```
One 300-line component template
```

---

### Use OnPush where subtree skipping fits `[High]`
Reduces checks for compatible component subtrees while signals still notify consumers

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/best-practices/skipping-subtrees](https://angular.dev/best-practices/skipping-subtrees)

- **Do:** OnPush for stable input-driven components
- **Don't:** Applying OnPush without understanding mutable input or event boundaries

**Recommended:**
```
changeDetection: ChangeDetectionStrategy.OnPush
```

**Avoid:**
```
items.push(nextItem) // same input reference
```

---

### Avoid direct DOM manipulation `[High]`
Use renderer or ElementRef sparingly; prefer template bindings

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/host-elements](https://angular.dev/guide/components/host-elements)

- **Do:** Template bindings and Angular directives
- **Don't:** Direct document.querySelector or innerHTML

**Recommended:**
```
[class.active]="isActive"
```

**Avoid:**
```
this.el.nativeElement.classList.add('active')
```

---

## Routing

### Lazy load feature routes `[High]`
Load route chunks on demand to reduce initial bundle

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/routing/lazy-loading](https://angular.dev/guide/routing/lazy-loading)

- **Do:** loadComponent() for all feature routes
- **Don't:** Eager-loaded routes in app config

**Recommended:**
```
{ path: 'admin' loadComponent: () => import('./admin/admin.component') }
```

**Avoid:**
```
{ path: 'admin' component: AdminComponent }
```

---

### Use route guards with functional API `[High]`
Protect routes with canActivate/canMatch functional guards

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)

- **Do:** Functional guards returning boolean or UrlTree
- **Don't:** Class-based guards with CanActivate interface

**Recommended:**
```
canActivate: [() => inject(AuthService).isLoggedIn()]
```

**Avoid:**
```
canActivate: [AuthGuard]
```

---

### Use route resolvers for data `[Medium]`
Pre-fetch data before route activation using resolve

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/routing/common-router-tasks#resolve](https://angular.dev/guide/routing/common-router-tasks#resolve)

- **Do:** ResolveFn for route data
- **Don't:** Fetching data in ngOnInit causing flash of empty state

**Recommended:**
```
resolve: { user: () => inject(UserService).getUser() }
```

**Avoid:**
```
Fetch in ngOnInit with loading state flickering
```

---

### Type route params with inject `[Medium]`
Use inject(ActivatedRoute) with signals or toSignal

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/api/router/ActivatedRoute](https://angular.dev/api/router/ActivatedRoute)

- **Do:** Typed route params via ActivatedRoute
- **Don't:** Untyped route.snapshot.params string access

**Recommended:**
```
const id = toSignal(route.paramMap.pipe(map(p => p.get('id'))))
```

**Avoid:**
```
const id = this.route.snapshot.params['id']
```

---

### Use nested routes for layouts `[Medium]`
Compose shared layouts using router-outlet nesting

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/routing/router-tutorial-toh#child-route-configuration](https://angular.dev/guide/routing/router-tutorial-toh#child-route-configuration)

- **Do:** Nested routes with shared layout components
- **Don't:** Duplicating layout code across routes

**Recommended:**
```
{ path: 'app' component: ShellComponent children: [...] }
```

**Avoid:**
```
Duplicate header/sidebar in each route component
```

---

### Configure preloading strategies `[Low]`
Preload lazy modules in background after initial load

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/api/router/PreloadAllModules](https://angular.dev/api/router/PreloadAllModules)

- **Do:** PreloadAllModules or custom strategy
- **Don't:** No preloading causing delayed navigation

**Recommended:**
```
provideRouter(routes withPreloading(PreloadAllModules))
```

**Avoid:**
```
provideRouter(routes)
```

---

## State

### Use signals for local state `[High]`
Signals provide synchronous reactive state without RxJS overhead

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

- **Do:** signal() for component-local reactive state
- **Don't:** BehaviorSubject for simple local state

**Recommended:**
```
const items = signal<Item[]>([]); addItem(i: Item) { this.items.update(arr => [...arr i]) }
```

**Avoid:**
```
items$ = new BehaviorSubject<Item[]>([])
```

---

### Use computed() for derived state `[High]`
Lazily evaluated derived values that update when dependencies change

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/signals#computed-signals](https://angular.dev/guide/signals#computed-signals)

- **Do:** computed() for values derived from other signals
- **Don't:** Duplicated state or manual sync

**Recommended:**
```
readonly total = computed(() => this.items().reduce((s i) => s + i.price 0))
```

**Avoid:**
```
this.total = this.items.reduce(...) // called manually
```

---

### Use effect() carefully `[Medium]`
Effects run side effects when signals change; avoid overuse

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/signals#effects](https://angular.dev/guide/signals#effects)

- **Do:** effect() for side effects like logging or localStorage sync
- **Don't:** effect() for deriving state (use computed instead)

**Recommended:**
```
effect(() => localStorage.setItem('cart' JSON.stringify(this.cart())))
```

**Avoid:**
```
effect(() => { this.total.set(this.items().length) })
```

---

### Use NgRx Signal Store for complex state `[Medium]`
NgRx Signal Store is the modern lightweight state management for Angular

**Applies to:** angular 22.x
**Documentation:** [https://ngrx.io/guide/signals](https://ngrx.io/guide/signals)

- **Do:** @ngrx/signals SignalStore for feature state
- **Don't:** Full NgRx reducer/action/effect boilerplate for simple state

**Recommended:**
```
const Store = signalStore(withState({ count: 0 }) withMethods(s => ({ increment: () => patchState(s { count: s.count() + 1 }) })))
```

**Avoid:**
```
createReducer(on(increment state => ({ ...state count: state.count + 1 })))
```

---

### Inject services for shared state `[Medium]`
Services with signals share state across components without a store

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/di/creating-injectable-service](https://angular.dev/guide/di/creating-injectable-service)

- **Do:** Injectable service with signals for cross-component state
- **Don't:** Prop drilling or @Input chains for shared state

**Recommended:**
```
@Injectable({ providedIn: 'root' }) class CartService { items = signal<Item[]>([]) }
```

**Avoid:**
```
@Input() cartItems passed through 4 component levels
```

---

### Avoid mixing RxJS and signals unnecessarily `[Medium]`
Use toSignal() to bridge RxJS into signal world at the boundary

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/rxjs-interop](https://angular.dev/guide/rxjs-interop)

- **Do:** toSignal() to convert observable to signal at component edge
- **Don't:** Subscribing in components and storing in signal manually

**Recommended:**
```
readonly user = toSignal(this.userService.user$)
```

**Avoid:**
```
this.userService.user$.subscribe(u => this.user.set(u))
```

---

## Forms

### Use typed reactive forms `[High]`
FormGroup/FormControl with explicit generics for compile-time safety

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/forms/typed-forms](https://angular.dev/guide/forms/typed-forms)

- **Do:** FormBuilder with typed controls
- **Don't:** Untyped FormControl or any casts

**Recommended:**
```
fb.group<LoginForm>({ email: fb.control('') password: fb.control('') })
```

**Avoid:**
```
new FormGroup({ email: new FormControl(null) })
```

---

### Use reactive forms over template-driven `[Medium]`
Reactive forms scale better and are fully testable

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/forms/reactive-forms](https://angular.dev/guide/forms/reactive-forms)

- **Do:** ReactiveFormsModule for all non-trivial forms
- **Don't:** FormsModule with ngModel for complex forms

**Recommended:**
```
<input [formControl]="emailControl" />
```

**Avoid:**
```
<input [(ngModel)]="email" />
```

---

### Write custom validators as functions `[Medium]`
Functional validators are composable and tree-shakeable

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/forms/form-validation#custom-validators](https://angular.dev/guide/forms/form-validation#custom-validators)

- **Do:** ValidatorFn functions for custom validation
- **Don't:** Class-based validators implementing Validator interface

**Recommended:**
```
const noSpaces: ValidatorFn = ctrl => ctrl.value?.includes(' ') ? { noSpaces: true } : null
```

**Avoid:**
```
class NoSpacesValidator implements Validator { validate(c) {} }
```

---

### Use updateOn for performance `[Low]`
Control when validation runs to avoid per-keystroke validation overhead

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/api/forms/AbstractControl#updateOn](https://angular.dev/api/forms/AbstractControl#updateOn)

- **Do:** updateOn: 'blur' or 'submit' for expensive validators
- **Don't:** Default updateOn: 'change' for async validators

**Recommended:**
```
fb.control('' { updateOn: 'blur' validators: [Validators.email] })
```

**Avoid:**
```
fb.control('' [Validators.email]) // validates on every key
```

---

### Use FormArray for dynamic fields `[Medium]`
FormArray manages variable-length lists of controls

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/forms/reactive-forms#using-the-formarray-class](https://angular.dev/guide/forms/reactive-forms#using-the-formarray-class)

- **Do:** FormArray for add/remove field scenarios
- **Don't:** Manually tracking index-based controls

**Recommended:**
```
get items(): FormArray { return this.form.get('items') as FormArray }
```

**Avoid:**
```
items: [FormControl] managed outside form
```

---

### Display validation errors clearly `[Medium]`
Use form control touched and dirty states to show errors at the right time

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/forms/form-validation](https://angular.dev/guide/forms/form-validation)

- **Do:** Show errors after field is touched
- **Don't:** Show all errors on page load

**Recommended:**
```
@if (email.invalid && email.touched) { <span>Invalid email</span> }
```

**Avoid:**
```
@if (email.invalid) { <span>Invalid email</span> }
```

---

## Performance

### Prepare components for zoneless change detection `[High]`
Use signals markForCheck AsyncPipe and bound listeners so Angular receives change notifications

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/zoneless](https://angular.dev/guide/zoneless)

- **Do:** Notification-driven state updates
- **Don't:** Depending on ZoneJS to notice arbitrary state mutation

**Recommended:**
```
count.set(count() + 1)
```

**Avoid:**
```
this.count++ // outside a notifying Angular boundary
```

---

### Use trackBy in @for blocks `[High]`
Stable identity for list items prevents full DOM re-creation on change

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/templates/control-flow#track-and-identity](https://angular.dev/guide/templates/control-flow#track-and-identity)

- **Do:** track item.id in @for
- **Don't:** track $index for dynamic data

**Recommended:**
```
@for (item of items; track item.id) { <li>{{ item.name }}</li> }
```

**Avoid:**
```
@for (item of items; track $index) { <li>{{ item.name }}</li> }
```

---

### Use @defer for below-the-fold content `[High]`
Defer blocks lazy-load components when they enter the viewport

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/defer](https://angular.dev/guide/defer)

- **Do:** @defer with on viewport for non-critical UI
- **Don't:** Eagerly loading all components at startup

**Recommended:**
```
@defer (on viewport) { <HeavyChart /> } @placeholder { <Skeleton /> }
```

**Avoid:**
```
<HeavyChart /> loaded at startup
```

---

### Use NgOptimizedImage `[High]`
Enforces image best practices: lazy loading LCP hints and proper sizing

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/image-optimization](https://angular.dev/guide/image-optimization)

- **Do:** NgOptimizedImage for all img tags
- **Don't:** Plain img tags for CMS or user content

**Recommended:**
```
<img ngSrc="/hero.jpg" width="800" height="400" priority />
```

**Avoid:**
```
<img src="/hero.jpg" />
```

---

### Tree-shake unused Angular features `[Medium]`
Import only what you use from Angular packages

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/tools/cli/build](https://angular.dev/tools/cli/build)

- **Do:** Import specific Angular modules needed
- **Don't:** Import BrowserAnimationsModule when not using animations

**Recommended:**
```
import { NgOptimizedImage } from '@angular/common'
```

**Avoid:**
```
import { CommonModule } from '@angular/common' // entire module
```

---

### Avoid subscribe in components `[High]`
Subscriptions leak and cause bugs; prefer async pipe or toSignal

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/rxjs-interop](https://angular.dev/guide/rxjs-interop)

- **Do:** toSignal() or async pipe instead of manual subscribe
- **Don't:** Manual subscribe without unsubscribe in ngOnDestroy

**Recommended:**
```
readonly data = toSignal(this.service.data$)
```

**Avoid:**
```
this.service.data$.subscribe(d => this.data = d)
```

---

### Use @angular/ssr for hybrid rendering `[Medium]`
Server rendering and prerendering improve LCP and SEO for public routes

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/ssr](https://angular.dev/guide/ssr)

- **Do:** Configure SSR or prerender per route
- **Don't:** Pure CSR for SEO-critical pages

**Recommended:**
```
ng add @angular/ssr
```

**Avoid:**
```
// no SSR, client renders empty shell
```

---

### Minimize bundle with standalone APIs `[Medium]`
Standalone components + provideRouter() eliminate dead NgModule code

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/routing/standalone](https://angular.dev/guide/routing/standalone)

- **Do:** provideRouter() and provideHttpClient() in app.config
- **Don't:** Root AppModule with all imports

**Recommended:**
```
provideRouter(routes) in app.config.ts
```

**Avoid:**
```
@NgModule({ imports: [RouterModule.forRoot(routes)] })
```

---

## Testing

### Use TestBed for component tests `[High]`
TestBed sets up Angular DI for realistic component testing

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/testing/components-basics](https://angular.dev/guide/testing/components-basics)

- **Do:** TestBed.configureTestingModule for component tests
- **Don't:** Instantiate components with new keyword

**Recommended:**
```
TestBed.configureTestingModule({ imports: [MyComponent] })
```

**Avoid:**
```
const comp = new MyComponent()
```

---

### Use Angular CDK component harnesses `[Medium]`
Harnesses provide a stable testing API that survives template refactors

**Applies to:** angular 22.x
**Documentation:** [https://material.angular.io/cdk/test-harnesses/overview](https://material.angular.io/cdk/test-harnesses/overview)

- **Do:** MatButtonHarness and custom HarnessLoader
- **Don't:** Direct native element queries that break on template changes

**Recommended:**
```
const btn = await loader.getHarness(MatButtonHarness)
```

**Avoid:**
```
fixture.debugElement.query(By.css('button'))
```

---

### Use Spectator for less boilerplate `[Low]`
Spectator wraps TestBed with a cleaner API reducing test setup noise

**Applies to:** angular 22.x
**Documentation:** [https://github.com/ngneat/spectator](https://github.com/ngneat/spectator)

- **Do:** Spectator for unit tests
- **Don't:** Raw TestBed for every test

**Recommended:**
```
const spectator = createComponentFactory(MyComponent)
```

**Avoid:**
```
TestBed.configureTestingModule({ declarations: [MyComponent] providers: [...] })
```

---

### Mock services with jasmine.createSpyObj `[High]`
Isolate unit tests by providing mock implementations of dependencies

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/testing/services](https://angular.dev/guide/testing/services)

- **Do:** SpyObj or jest.fn() mocks for services
- **Don't:** Real HTTP calls in unit tests

**Recommended:**
```
const spy = jasmine.createSpyObj('UserService' ['getUser']); spy.getUser.and.returnValue(of(user))
```

**Avoid:**
```
providers: [UserService] // real service in unit test
```

---

### Write integration tests for routes `[Medium]`
Test full route navigation including guards and resolvers

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/api/router/testing/RouterTestingHarness](https://angular.dev/api/router/testing/RouterTestingHarness)

- **Do:** RouterTestingHarness for route integration tests
- **Don't:** Mock all routing behavior in unit tests

**Recommended:**
```
const harness = await RouterTestingHarness.create(); await harness.navigateByUrl('/home')
```

**Avoid:**
```
// manually calling route guard methods
```

---

### Test signal-based components `[Medium]`
Signals update synchronously; no async flush needed in most cases

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/testing](https://angular.dev/guide/testing)

- **Do:** Read signal value directly in test assertions
- **Don't:** TestBed.tick() or fakeAsync for signal reads

**Recommended:**
```
component.count.set(5); expect(component.double()).toBe(10)
```

**Avoid:**
```
fakeAsync(() => { component.count.set(5); tick(); expect(component.double()).toBe(10) })
```

---

## Styling

### Use ViewEncapsulation.Emulated `[Medium]`
Default emulation scopes styles to component preventing global leaks

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/styling#style-scoping](https://angular.dev/guide/components/styling#style-scoping)

- **Do:** Emulated or None for intentional global styles
- **Don't:** ViewEncapsulation.None for component-specific styles

**Recommended:**
```
ViewEncapsulation.Emulated (default)
```

**Avoid:**
```
ViewEncapsulation.None on feature components
```

---

### Use :host selector `[Medium]`
Style the component's host element using :host pseudo-class

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/styling#host-element](https://angular.dev/guide/components/styling#host-element)

- **Do:** :host for host element styles
- **Don't:** Adding wrapper div just for styling

**Recommended:**
```
:host { display: block; padding: 1rem }
```

**Avoid:**
```
<div class="wrapper">...</div> + .wrapper { padding: 1rem }
```

---

### Use CSS custom properties for theming `[Medium]`
CSS variables work across component boundaries and enable dynamic theming

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/components/styling](https://angular.dev/guide/components/styling)

- **Do:** CSS custom properties for colors and spacing
- **Don't:** Hardcoded hex values in component styles

**Recommended:**
```
:root { --primary: #6200ee } button { background: var(--primary) }
```

**Avoid:**
```
button { background: #6200ee }
```

---

### Integrate Tailwind with Angular `[Low]`
Tailwind utilities work alongside Angular's ViewEncapsulation via global stylesheet

**Applies to:** angular 22.x
**Documentation:** [https://tailwindcss.com/docs/guides/angular](https://tailwindcss.com/docs/guides/angular)

- **Do:** Add Tailwind in styles.css and use utility classes in templates
- **Don't:** Custom CSS for layout that Tailwind already handles

**Recommended:**
```
<div class="flex items-center gap-4 p-6">
```

**Avoid:**
```
<div class="my-custom-flex"> /* .my-custom-flex { display: flex } */
```

---

### Use Angular Material theming tokens `[Medium]`
Material 3 uses design tokens for systematic theming

**Applies to:** angular 22.x
**Documentation:** [https://material.angular.io/guide/theming](https://material.angular.io/guide/theming)

- **Do:** M3 token-based theming for Angular Material
- **Don't:** Overriding Angular Material CSS with deep selectors

**Recommended:**
```
@include mat.button-theme($my-theme)
```

**Avoid:**
```
::ng-deep .mat-button { background: red }
```

---

## Architecture

### Use injection tokens for config `[Medium]`
Provide configuration via InjectionToken for testability and flexibility

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/di/dependency-injection-providers#using-an-injectiontoken-object](https://angular.dev/guide/di/dependency-injection-providers#using-an-injectiontoken-object)

- **Do:** InjectionToken for environment-specific values
- **Don't:** Importing environment.ts directly in services

**Recommended:**
```
const API_URL = new InjectionToken<string>('apiUrl'); provide: [{ provide: API_URL useValue: env.apiUrl }]
```

**Avoid:**
```
constructor(private env: Environment) { this.url = env.apiUrl }
```

---

### Use HTTP interceptors `[High]`
Intercept requests for auth headers error handling and logging

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/guide/http/interceptors](https://angular.dev/guide/http/interceptors)

- **Do:** Functional interceptors with withInterceptors()
- **Don't:** Service-level header management in every request

**Recommended:**
```
withInterceptors([authInterceptor errorInterceptor])
```

**Avoid:**
```
httpClient.get(url { headers: { Authorization: token } }) in every call
```

---

### Organize by feature not type `[Medium]`
Feature-based folder structure scales better than type-based

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/style-guide#folders-by-feature-structure](https://angular.dev/style-guide#folders-by-feature-structure)

- **Do:** Feature folders with collocated component service and routes
- **Don't:** Flat folders: all-components/ all-services/

**Recommended:**
```
src/features/checkout/checkout.component.ts checkout.service.ts checkout.routes.ts
```

**Avoid:**
```
src/components/checkout.component.ts src/services/checkout.service.ts
```

---

### Use environment configurations `[High]`
Separate environment values for dev staging and prod via Angular build configs

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/tools/cli/environments](https://angular.dev/tools/cli/environments)

- **Do:** angular.json fileReplacements for env configs
- **Don't:** Hardcoded API URLs or feature flags in source

**Recommended:**
```
fileReplacements: [{ replace: environment.ts with: environment.prod.ts }]
```

**Avoid:**
```
const API = 'https://api.example.com' // hardcoded in service
```

---

### Prefer inject() over constructor DI `[Medium]`
inject() function is composable and works in more contexts than constructor injection

**Applies to:** angular 22.x
**Documentation:** [https://angular.dev/api/core/inject](https://angular.dev/api/core/inject)

- **Do:** inject() for dependency injection
- **Don't:** Constructor parameters for new code

**Recommended:**
```
readonly http = inject(HttpClient); readonly router = inject(Router)
```

**Avoid:**
```
constructor(private http: HttpClient private router: Router) {}
```

---
