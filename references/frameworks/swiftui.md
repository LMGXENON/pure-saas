# Swiftui Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`swiftui.csv`)
> Framework: Swiftui
> Rules Count: 50 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Swiftui** projects.

---

## Views

### Use struct for views `[High]`
SwiftUI views are value types

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/view](https://developer.apple.com/documentation/swiftui/view)

- **Do:** struct MyView: View
- **Don't:** class MyView: View

**Recommended:**
```
struct ContentView: View { var body: some View }
```

**Avoid:**
```
class ContentView: View
```

---

### Keep views small and focused `[Medium]`
Single responsibility for each view

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Extract subviews for complex layouts
- **Don't:** Large monolithic views

**Recommended:**
```
Extract HeaderView FooterView
```

**Avoid:**
```
500+ line View struct
```

---

### Use body computed property `[High]`
body returns the view hierarchy

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/view/body-swift.property](https://developer.apple.com/documentation/swiftui/view/body-swift.property)

- **Do:** var body: some View { }
- **Don't:** func body() -> some View

**Recommended:**
```
var body: some View { Text("Hello") }
```

**Avoid:**
```
func body() -> Text
```

---

### Prefer composition over inheritance `[Medium]`
Compose views using ViewBuilder

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Combine smaller views
- **Don't:** Inheritance hierarchies

**Recommended:**
```
VStack { Header() Content() }
```

**Avoid:**
```
class SpecialView extends BaseView
```

---

## State

### Use @State for local state `[High]`
Simple value types owned by view

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/state](https://developer.apple.com/documentation/swiftui/state)

- **Do:** @State for view-local primitives
- **Don't:** @State for shared data

**Recommended:**
```
@State private var count = 0
```

**Avoid:**
```
@State var sharedData: Model
```

---

### Use @Binding for two-way data `[Medium]`
Pass mutable state to child views

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/binding](https://developer.apple.com/documentation/swiftui/binding)

- **Do:** @Binding for child input
- **Don't:** @State in child for parent data

**Recommended:**
```
@Binding var isOn: Bool
```

**Avoid:**
```
$isOn to pass binding
```

---

### Use @StateObject for reference types `[High]`
ObservableObject owned by view

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/stateobject](https://developer.apple.com/documentation/swiftui/stateobject)

- **Do:** @StateObject for view-created objects
- **Don't:** @ObservedObject for owned objects

**Recommended:**
```
@StateObject private var vm = ViewModel()
```

**Avoid:**
```
@ObservedObject var vm = ViewModel()
```

---

### Use @ObservedObject for injected objects `[High]`
Reference types passed from parent

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/observedobject](https://developer.apple.com/documentation/swiftui/observedobject)

- **Do:** @ObservedObject for injected dependencies
- **Don't:** @StateObject for injected objects

**Recommended:**
```
@ObservedObject var vm: ViewModel
```

**Avoid:**
```
@StateObject var vm: ViewModel (injected)
```

---

### Use @EnvironmentObject for shared state `[Medium]`
App-wide state injection

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/environmentobject](https://developer.apple.com/documentation/swiftui/environmentobject)

- **Do:** @EnvironmentObject for global state
- **Don't:** Prop drilling through views

**Recommended:**
```
@EnvironmentObject var settings: Settings
```

**Avoid:**
```
Pass settings through 5 views
```

---

### Use @Published in ObservableObject `[Medium]`
Automatically publish property changes

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** @Published for observed properties
- **Don't:** Manual objectWillChange calls

**Recommended:**
```
@Published var items: [Item] = []
```

**Avoid:**
```
var items: [Item] { didSet { objectWillChange.send() } }
```

---

## Observable

### Use @Observable macro (iOS 17+) `[Medium]`
Modern observation without Combine

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/observation](https://developer.apple.com/documentation/observation)

- **Do:** @Observable class for view models
- **Don't:** ObservableObject for new projects

**Recommended:**
```
@Observable class ViewModel { }
```

**Avoid:**
```
class ViewModel: ObservableObject
```

---

### Use @Bindable for @Observable `[Medium]`
Create bindings from @Observable

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** @Bindable var vm for bindings
- **Don't:** @Binding with @Observable

**Recommended:**
```
@Bindable var viewModel
```

**Avoid:**
```
$viewModel.name with @Observable
```

---

## Layout

### Use VStack HStack ZStack `[Medium]`
Standard stack-based layouts

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/vstack](https://developer.apple.com/documentation/swiftui/vstack)

- **Do:** Stacks for linear arrangements
- **Don't:** GeometryReader for simple layouts

**Recommended:**
```
VStack { Text() Image() }
```

**Avoid:**
```
GeometryReader for vertical list
```

---

### Use LazyVStack LazyHStack for lists `[High]`
Lazy loading for performance

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/lazyvstack](https://developer.apple.com/documentation/swiftui/lazyvstack)

- **Do:** Lazy stacks for long lists
- **Don't:** Regular stacks for 100+ items

**Recommended:**
```
LazyVStack { ForEach(items) }
```

**Avoid:**
```
VStack { ForEach(largeArray) }
```

---

### Use GeometryReader sparingly `[Medium]`
Only when needed for sizing

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** GeometryReader for responsive layouts
- **Don't:** GeometryReader everywhere

**Recommended:**
```
GeometryReader for aspect ratio
```

**Avoid:**
```
GeometryReader wrapping everything
```

---

### Use spacing and padding consistently `[Low]`
Consistent spacing throughout app

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Design system spacing values
- **Don't:** Magic numbers for spacing

**Recommended:**
```
.padding(16) or .padding()
```

**Avoid:**
```
.padding(13), .padding(17)
```

---

### Use frame modifiers correctly `[Medium]`
Set explicit sizes when needed

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** .frame(maxWidth: .infinity)
- **Don't:** Fixed sizes for responsive content

**Recommended:**
```
.frame(maxWidth: .infinity)
```

**Avoid:**
```
.frame(width: 375)
```

---

## Modifiers

### Order modifiers correctly `[High]`
Modifier order affects rendering

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/configuring-views](https://developer.apple.com/documentation/swiftui/configuring-views)

- **Do:** Background before padding for full coverage
- **Don't:** Wrong modifier order

**Recommended:**
```
.padding().background(Color.red)
```

**Avoid:**
```
.background(Color.red).padding()
```

---

### Create custom ViewModifiers `[Medium]`
Reusable modifier combinations

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/viewmodifier](https://developer.apple.com/documentation/swiftui/viewmodifier)

- **Do:** ViewModifier for repeated styling
- **Don't:** Duplicate modifier chains

**Recommended:**
```
struct CardStyle: ViewModifier
```

**Avoid:**
```
.shadow().cornerRadius() everywhere
```

---

### Use conditional modifiers carefully `[Medium]`
Avoid changing view identity

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** if-else with same view type
- **Don't:** Conditional that changes view identity

**Recommended:**
```
Text(title).foregroundColor(isActive ? .blue : .gray)
```

**Avoid:**
```
if isActive { Text().bold() } else { Text() }
```

---

## Navigation

### Use NavigationStack or NavigationSplitView (iOS 16+) `[Medium]`
Current single-column and multicolumn navigation

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/migrating-to-new-navigation-types](https://developer.apple.com/documentation/swiftui/migrating-to-new-navigation-types)

- **Do:** NavigationStack for single-column; NavigationSplitView for two- or three-column apps
- **Don't:** NavigationView for new projects

**Recommended:**
```
NavigationStack { } or NavigationSplitView { ... }
```

**Avoid:**
```
NavigationView { } (deprecated)
```

---

### Use navigationDestination `[Medium]`
Type-safe navigation destinations

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** .navigationDestination(for:)
- **Don't:** NavigationLink(destination:)

**Recommended:**
```
.navigationDestination(for: Item.self)
```

**Avoid:**
```
NavigationLink(destination: DetailView())
```

---

### Use @Environment for dismiss `[Low]`
Programmatic navigation dismissal

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** @Environment(\.dismiss) var dismiss
- **Don't:** presentationMode (deprecated)

**Recommended:**
```
@Environment(\.dismiss) var dismiss
```

**Avoid:**
```
@Environment(\.presentationMode)
```

---

## Lists

### Use List for scrollable content `[Low]`
Built-in scrolling and styling

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/list](https://developer.apple.com/documentation/swiftui/list)

- **Do:** List for standard scrollable content
- **Don't:** ScrollView + VStack for simple lists

**Recommended:**
```
List { ForEach(items) { } }
```

**Avoid:**
```
ScrollView { VStack { ForEach } }
```

---

### Provide stable identifiers `[High]`
Use Identifiable or explicit id

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/foreach](https://developer.apple.com/documentation/swiftui/foreach)

- **Do:** Identifiable protocol or id parameter
- **Don't:** Index as identifier

**Recommended:**
```
ForEach(items) where Item: Identifiable
```

**Avoid:**
```
ForEach(items.indices, id: \.self)
```

---

### Use onDelete and onMove `[Low]`
Standard list editing

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** onDelete for swipe to delete
- **Don't:** Custom delete implementation

**Recommended:**
```
.onDelete(perform: delete)
```

**Avoid:**
```
.onTapGesture for delete
```

---

## Forms

### Use Form for settings `[Low]`
Grouped input controls

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/form](https://developer.apple.com/documentation/swiftui/form)

- **Do:** Form for settings screens
- **Don't:** Manual grouping for forms

**Recommended:**
```
Form { Section { Toggle() } }
```

**Avoid:**
```
VStack { Toggle() }
```

---

### Use @FocusState for keyboard `[Medium]`
Manage keyboard focus

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/focusstate](https://developer.apple.com/documentation/swiftui/focusstate)

- **Do:** @FocusState for text field focus
- **Don't:** Manual first responder handling

**Recommended:**
```
@FocusState private var isFocused: Bool
```

**Avoid:**
```
UIKit first responder
```

---

### Validate input properly `[Medium]`
Show validation feedback

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Real-time validation feedback
- **Don't:** Submit without validation

**Recommended:**
```
TextField with validation state
```

**Avoid:**
```
TextField without error handling
```

---

## Async

### Use .task for async work `[Medium]`
Automatic cancellation on view disappear

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/view/task(priority:_:)](https://developer.apple.com/documentation/swiftui/view/task(priority:_:))

- **Do:** .task for view lifecycle async
- **Don't:** onAppear with Task

**Recommended:**
```
.task { await loadData() }
```

**Avoid:**
```
onAppear { Task { await loadData() } }
```

---

### Handle loading states `[Medium]`
Show progress during async operations

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** ProgressView during loading
- **Don't:** Empty view during load

**Recommended:**
```
if isLoading { ProgressView() }
```

**Avoid:**
```
No loading indicator
```

---

### Use @MainActor for UI updates `[Medium]`
Ensure UI updates on main thread

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** @MainActor on view models
- **Don't:** Manual DispatchQueue.main

**Recommended:**
```
@MainActor class ViewModel
```

**Avoid:**
```
DispatchQueue.main.async
```

---

## Animation

### Use withAnimation `[Low]`
Animate state changes

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/withanimation(_:_:)](https://developer.apple.com/documentation/swiftui/withanimation(_:_:))

- **Do:** withAnimation for state transitions
- **Don't:** No animation for state changes

**Recommended:**
```
withAnimation { isExpanded.toggle() }
```

**Avoid:**
```
isExpanded.toggle()
```

---

### Use .animation modifier `[Low]`
Apply animations to views

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** .animation(.spring()) on view
- **Don't:** Manual animation timing

**Recommended:**
```
.animation(.easeInOut)
```

**Avoid:**
```
CABasicAnimation equivalent
```

---

### Respect reduced motion `[High]`
Check accessibility settings

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion)

- **Do:** Check accessibilityReduceMotion
- **Don't:** Ignore motion preferences

**Recommended:**
```
@Environment(\.accessibilityReduceMotion)
```

**Avoid:**
```
Always animate regardless
```

---

## Preview

### Use #Preview macro (Xcode 15+) `[Low]`
Modern preview syntax

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** #Preview for view previews
- **Don't:** PreviewProvider protocol

**Recommended:**
```
#Preview { ContentView() }
```

**Avoid:**
```
struct ContentView_Previews: PreviewProvider
```

---

### Create multiple previews `[Low]`
Test different states and devices

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Multiple previews for states
- **Don't:** Single preview only

**Recommended:**
```
#Preview("Light") { } #Preview("Dark") { }
```

**Avoid:**
```
Single preview configuration
```

---

### Use preview data `[Low]`
Dedicated preview mock data

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Static preview data
- **Don't:** Production data in previews

**Recommended:**
```
Item.preview for preview
```

**Avoid:**
```
Fetch real data in preview
```

---

## Performance

### Avoid expensive body computations `[High]`
Body should be fast to compute

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance](https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance)

- **Do:** Precompute in view model
- **Don't:** Heavy computation in body

**Recommended:**
```
vm.computedValue in body
```

**Avoid:**
```
Complex calculation in body
```

---

### Use Equatable views `[Medium]`
Skip unnecessary view updates

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Equatable for complex views
- **Don't:** Default equality for all views

**Recommended:**
```
struct MyView: View Equatable
```

**Avoid:**
```
No Equatable conformance
```

---

### Profile with Instruments `[Medium]`
Measure before optimizing

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Use SwiftUI Instruments
- **Don't:** Guess at performance issues

**Recommended:**
```
Profile with Instruments
```

**Avoid:**
```
Optimize without measuring
```

---

## Accessibility

### Add accessibility labels `[High]`
Describe UI elements

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv)

- **Do:** .accessibilityLabel for context
- **Don't:** Missing labels

**Recommended:**
```
.accessibilityLabel("Close button")
```

**Avoid:**
```
Button without label
```

---

### Support Dynamic Type `[High]`
Respect text size preferences

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+
**Documentation:** [https://developer.apple.com/documentation/swiftui/scaledmetric](https://developer.apple.com/documentation/swiftui/scaledmetric)

- **Do:** Scalable fonts and layouts
- **Don't:** Fixed font sizes

**Recommended:**
```
.font(.body) with Dynamic Type
```

**Avoid:**
```
.font(.system(size: 16))
```

---

### Use semantic views `[Medium]`
Proper accessibility traits

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Correct accessibilityTraits
- **Don't:** Wrong semantic meaning

**Recommended:**
```
Button for actions Image for display
```

**Avoid:**
```
Image that acts like button
```

---

## Testing

### Use ViewInspector for testing `[Medium]`
Third-party view testing

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** ViewInspector for unit tests
- **Don't:** UI tests only

**Recommended:**
```
ViewInspector assertions
```

**Avoid:**
```
Only XCUITest
```

---

### Test view models `[Medium]`
Unit test business logic

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** XCTest for view model
- **Don't:** Skip view model testing

**Recommended:**
```
Test ViewModel methods
```

**Avoid:**
```
No unit tests
```

---

### Use preview as visual test `[Low]`
Previews catch visual regressions

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Multiple preview configurations
- **Don't:** No visual verification

**Recommended:**
```
Preview different states
```

**Avoid:**
```
Single preview only
```

---

## Architecture

### Use MVVM pattern `[Medium]`
Separate view and logic

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** ViewModel for business logic
- **Don't:** Logic in View

**Recommended:**
```
ObservableObject ViewModel
```

**Avoid:**
```
@State for complex logic
```

---

### Keep views dumb `[Medium]`
Views display view model state

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** View reads from ViewModel
- **Don't:** Business logic in View

**Recommended:**
```
view.items from vm.items
```

**Avoid:**
```
Complex filtering in View
```

---

### Use dependency injection `[Medium]`
Inject dependencies for testing

**Applies to:** swiftui current; iOS 16+ baseline; Observation APIs iOS 17+

- **Do:** Initialize with dependencies
- **Don't:** Hard-coded dependencies

**Recommended:**
```
init(service: ServiceProtocol)
```

**Avoid:**
```
let service = RealService()
```

---
