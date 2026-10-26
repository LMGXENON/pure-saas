# Flutter Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`flutter.csv`)
> Framework: Flutter
> Rules Count: 52 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Flutter** projects.

---

## Widgets

### Use StatelessWidget when possible `[Medium]`
Immutable widgets are simpler

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html](https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html)

- **Do:** StatelessWidget for static UI
- **Don't:** StatefulWidget for everything

**Recommended:**
```
class MyWidget extends StatelessWidget
```

**Avoid:**
```
class MyWidget extends StatefulWidget (static)
```

---

### Keep widgets small `[Medium]`
Single responsibility principle

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Extract widgets into smaller pieces
- **Don't:** Large build methods

**Recommended:**
```
Column(children: [Header() Content()])
```

**Avoid:**
```
500+ line build method
```

---

### Use const constructors `[High]`
Compile-time constants for performance

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/perf/best-practices#control-build-cost](https://docs.flutter.dev/perf/best-practices#control-build-cost)

- **Do:** const MyWidget() when possible
- **Don't:** Non-const for static widgets

**Recommended:**
```
const Text('Hello')
```

**Avoid:**
```
Text('Hello') for literals
```

---

### Prefer composition over inheritance `[Medium]`
Combine widgets using children

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Compose widgets
- **Don't:** Extend widget classes

**Recommended:**
```
Container(child: MyContent())
```

**Avoid:**
```
class MyContainer extends Container
```

---

## State

### Use setState correctly `[Medium]`
Minimal state in StatefulWidget

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/State/setState.html](https://api.flutter.dev/flutter/widgets/State/setState.html)

- **Do:** setState for UI state changes
- **Don't:** setState for business logic

**Recommended:**
```
setState(() { _counter++; })
```

**Avoid:**
```
Complex logic in setState
```

---

### Avoid setState in build `[High]`
Never call setState during build

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/State/setState.html](https://api.flutter.dev/flutter/widgets/State/setState.html)

- **Do:** setState in callbacks only
- **Don't:** setState in build method

**Recommended:**
```
onPressed: () => setState(() {})
```

**Avoid:**
```
build() { setState(); }
```

---

### Use state management for complex apps `[Medium]`
Provider Riverpod BLoC

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** State management for shared state
- **Don't:** setState for global state

**Recommended:**
```
Provider.of<MyState>(context)
```

**Avoid:**
```
Global setState calls
```

---

### Prefer Riverpod or Provider `[Medium]`
Recommended state solutions

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://riverpod.dev/](https://riverpod.dev/)

- **Do:** Riverpod for new projects
- **Don't:** InheritedWidget manually

**Recommended:**
```
ref.watch(myProvider)
```

**Avoid:**
```
Custom InheritedWidget
```

---

### Dispose resources `[High]`
Clean up controllers and subscriptions

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/State/dispose.html](https://api.flutter.dev/flutter/widgets/State/dispose.html)

- **Do:** dispose() for cleanup
- **Don't:** Memory leaks from subscriptions

**Recommended:**
```
@override void dispose() { controller.dispose(); }
```

**Avoid:**
```
No dispose implementation
```

---

## Layout

### Use Column and Row `[Medium]`
Basic layout widgets

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/Column-class.html](https://api.flutter.dev/flutter/widgets/Column-class.html)

- **Do:** Column Row for linear layouts
- **Don't:** Stack for simple layouts

**Recommended:**
```
Column(children: [Text(), Button()])
```

**Avoid:**
```
Stack for vertical list
```

---

### Use Expanded and Flexible `[Medium]`
Control flex behavior

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Expanded to fill space
- **Don't:** Fixed sizes in flex containers

**Recommended:**
```
Expanded(child: Container())
```

**Avoid:**
```
Container(width: 200) in Row
```

---

### Use SizedBox for spacing `[Low]`
Consistent spacing

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** SizedBox for gaps
- **Don't:** Container for spacing only

**Recommended:**
```
SizedBox(height: 16)
```

**Avoid:**
```
Container(height: 16)
```

---

### Use LayoutBuilder for responsive `[Medium]`
Respond to constraints

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html](https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html)

- **Do:** LayoutBuilder for adaptive layouts
- **Don't:** Fixed sizes for responsive

**Recommended:**
```
LayoutBuilder(builder: (context constraints) {})
```

**Avoid:**
```
Container(width: 375)
```

---

### Avoid deep nesting `[Medium]`
Keep widget tree shallow

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Extract deeply nested widgets
- **Don't:** 10+ levels of nesting

**Recommended:**
```
Extract widget to method or class
```

**Avoid:**
```
Column(Row(Column(Row(...))))
```

---

## Lists

### Use ListView.builder `[High]`
Lazy list building

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/ListView-class.html](https://api.flutter.dev/flutter/widgets/ListView-class.html)

- **Do:** ListView.builder for long lists
- **Don't:** ListView with children for large lists

**Recommended:**
```
ListView.builder(itemCount: 100, itemBuilder: ...)
```

**Avoid:**
```
ListView(children: items.map(...).toList())
```

---

### Provide itemExtent when known `[Medium]`
Skip measurement

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** itemExtent for fixed height items
- **Don't:** No itemExtent for uniform lists

**Recommended:**
```
ListView.builder(itemExtent: 50)
```

**Avoid:**
```
ListView.builder without itemExtent
```

---

### Use keys for stateful items `[High]`
Preserve widget state

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/foundation/ValueKey-class.html](https://api.flutter.dev/flutter/foundation/ValueKey-class.html)

- **Do:** Key for stateful list items
- **Don't:** No key for dynamic lists

**Recommended:**
```
ListTile(key: ValueKey(item.id))
```

**Avoid:**
```
ListTile without key
```

---

### Use SliverList for custom scroll `[Medium]`
Custom scroll effects

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/SliverList-class.html](https://api.flutter.dev/flutter/widgets/SliverList-class.html)

- **Do:** CustomScrollView with Slivers
- **Don't:** Nested ListViews

**Recommended:**
```
CustomScrollView(slivers: [SliverList()])
```

**Avoid:**
```
ListView inside ListView
```

---

## Navigation

### Use Navigator 2.0 or GoRouter `[Medium]`
Declarative routing

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://pub.dev/packages/go_router](https://pub.dev/packages/go_router)

- **Do:** go_router for navigation
- **Don't:** Navigator.push for complex apps

**Recommended:**
```
GoRouter(routes: [...])
```

**Avoid:**
```
Navigator.push everywhere
```

---

### Use named routes `[Low]`
Organized navigation

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Named routes for clarity
- **Don't:** Anonymous routes

**Recommended:**
```
Navigator.pushNamed(context '/home')
```

**Avoid:**
```
Navigator.push(context MaterialPageRoute())
```

---

### Handle back button with PopScope `[High]`
Android back behavior and predictive back (Android 14+)

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/PopScope-class.html](https://api.flutter.dev/flutter/widgets/PopScope-class.html)

- **Do:** Use PopScope with onPopInvokedWithResult
- **Don't:** Use WillPopScope

**Recommended:**
```
PopScope(canPop: canPop, onPopInvokedWithResult: (didPop, result) { ... })
```

**Avoid:**
```
WillPopScope(onWillPop: ...)
```

---

### Pass typed arguments `[Medium]`
Type-safe route arguments

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Typed route arguments
- **Don't:** Dynamic arguments

**Recommended:**
```
MyRoute(id: '123')
```

**Avoid:**
```
arguments: {'id': '123'}
```

---

## Async

### Use FutureBuilder `[Medium]`
Async UI building

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html)

- **Do:** FutureBuilder for async data
- **Don't:** setState for async

**Recommended:**
```
FutureBuilder(future: fetchData())
```

**Avoid:**
```
fetchData().then((d) => setState())
```

---

### Use StreamBuilder `[Medium]`
Stream UI building

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html](https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html)

- **Do:** StreamBuilder for streams
- **Don't:** Manual stream subscription

**Recommended:**
```
StreamBuilder(stream: myStream)
```

**Avoid:**
```
stream.listen in initState
```

---

### Handle loading and error states `[High]`
Complete async UI states

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html)

- **Do:** ConnectionState checks
- **Don't:** Only success state

**Recommended:**
```
if (snapshot.connectionState == ConnectionState.waiting)
```

**Avoid:**
```
No loading indicator
```

---

### Cancel subscriptions `[High]`
Clean up stream subscriptions

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/dart-async/StreamSubscription/cancel.html](https://api.flutter.dev/flutter/dart-async/StreamSubscription/cancel.html)

- **Do:** Cancel in dispose
- **Don't:** Memory leaks

**Recommended:**
```
subscription.cancel() in dispose
```

**Avoid:**
```
No subscription cleanup
```

---

## Theming

### Use ThemeData `[Medium]`
Consistent theming

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/material/ThemeData-class.html](https://api.flutter.dev/flutter/material/ThemeData-class.html)

- **Do:** ThemeData for app theme
- **Don't:** Hardcoded colors

**Recommended:**
```
Theme.of(context).primaryColor
```

**Avoid:**
```
Color(0xFF123456) everywhere
```

---

### Use ColorScheme `[Medium]`
Material 3 color system

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** ColorScheme for colors
- **Don't:** Individual color properties

**Recommended:**
```
colorScheme: ColorScheme.fromSeed()
```

**Avoid:**
```
primaryColor: Colors.blue
```

---

### Access theme via context `[Medium]`
Dynamic theme access

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Theme.of(context)
- **Don't:** Static theme reference

**Recommended:**
```
Theme.of(context).textTheme.bodyLarge
```

**Avoid:**
```
TextStyle(fontSize: 16)
```

---

### Support dark mode `[Medium]`
Respect system theme

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** darkTheme in MaterialApp
- **Don't:** Light theme only

**Recommended:**
```
MaterialApp(theme: light, darkTheme: dark)
```

**Avoid:**
```
MaterialApp(theme: light)
```

---

## Animation

### Use implicit animations `[Low]`
Simple animations

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/AnimatedContainer-class.html](https://api.flutter.dev/flutter/widgets/AnimatedContainer-class.html)

- **Do:** AnimatedContainer AnimatedOpacity
- **Don't:** Explicit for simple transitions

**Recommended:**
```
AnimatedContainer(duration: Duration())
```

**Avoid:**
```
AnimationController for fade
```

---

### Use AnimationController for complex `[Medium]`
Fine-grained control

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** AnimationController with Ticker
- **Don't:** Implicit for complex sequences

**Recommended:**
```
AnimationController(vsync: this)
```

**Avoid:**
```
AnimatedContainer for staggered
```

---

### Dispose AnimationControllers `[High]`
Clean up animation resources

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/animation/AnimationController/dispose.html](https://api.flutter.dev/flutter/animation/AnimationController/dispose.html)

- **Do:** dispose() for controllers
- **Don't:** Memory leaks

**Recommended:**
```
controller.dispose() in dispose
```

**Avoid:**
```
No controller disposal
```

---

### Use Hero for transitions `[Low]`
Shared element transitions

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/Hero-class.html](https://api.flutter.dev/flutter/widgets/Hero-class.html)

- **Do:** Hero for navigation animations
- **Don't:** Manual shared element

**Recommended:**
```
Hero(tag: 'image' child: Image())
```

**Avoid:**
```
Custom shared element animation
```

---

## Forms

### Use Form widget `[Medium]`
Form validation

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/Form-class.html](https://api.flutter.dev/flutter/widgets/Form-class.html)

- **Do:** Form with GlobalKey
- **Don't:** Individual validation

**Recommended:**
```
Form(key: _formKey child: ...)
```

**Avoid:**
```
TextField without Form
```

---

### Use TextEditingController `[Medium]`
Control text input

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Controller for text fields
- **Don't:** onChanged for all text

**Recommended:**
```
final controller = TextEditingController()
```

**Avoid:**
```
onChanged: (v) => setState()
```

---

### Validate on submit `[High]`
Form validation flow

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/FormState/validate.html](https://api.flutter.dev/flutter/widgets/FormState/validate.html)

- **Do:** _formKey.currentState!.validate()
- **Don't:** Skip validation

**Recommended:**
```
if (_formKey.currentState!.validate())
```

**Avoid:**
```
Submit without validation
```

---

### Dispose controllers `[High]`
Clean up text controllers

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/TextEditingController-class.html](https://api.flutter.dev/flutter/widgets/TextEditingController-class.html)

- **Do:** dispose() for controllers
- **Don't:** Memory leaks

**Recommended:**
```
controller.dispose() in dispose
```

**Avoid:**
```
No controller disposal
```

---

## Performance

### Use const widgets `[High]`
Reduce rebuilds

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/perf/best-practices#control-build-cost](https://docs.flutter.dev/perf/best-practices#control-build-cost)

- **Do:** const for static widgets
- **Don't:** No const for literals

**Recommended:**
```
const Icon(Icons.add)
```

**Avoid:**
```
Icon(Icons.add)
```

---

### Avoid rebuilding entire tree `[High]`
Minimal rebuild scope

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/perf/best-practices#control-build-cost](https://docs.flutter.dev/perf/best-practices#control-build-cost)

- **Do:** Isolate changing widgets
- **Don't:** setState on parent

**Recommended:**
```
Consumer only around changing widget
```

**Avoid:**
```
setState on root widget
```

---

### Use RepaintBoundary `[Medium]`
Isolate repaints

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/RepaintBoundary-class.html](https://api.flutter.dev/flutter/widgets/RepaintBoundary-class.html)

- **Do:** RepaintBoundary for animations
- **Don't:** Full screen repaints

**Recommended:**
```
RepaintBoundary(child: AnimatedWidget())
```

**Avoid:**
```
Animation without boundary
```

---

### Profile with DevTools `[Medium]`
Measure before optimizing

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/tools/devtools](https://docs.flutter.dev/tools/devtools)

- **Do:** Flutter DevTools profiling
- **Don't:** Guess at performance

**Recommended:**
```
DevTools performance tab
```

**Avoid:**
```
Optimize without measuring
```

---

## Accessibility

### Use Semantics widget `[High]`
Screen reader support

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/Semantics-class.html](https://api.flutter.dev/flutter/widgets/Semantics-class.html)

- **Do:** Semantics for accessibility
- **Don't:** Missing accessibility info

**Recommended:**
```
Semantics(label: 'Submit button')
```

**Avoid:**
```
GestureDetector without semantics
```

---

### Support large fonts `[High]`
Use TextScaler for nonlinear text scaling

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://api.flutter.dev/flutter/widgets/MediaQuery/textScalerOf.html](https://api.flutter.dev/flutter/widgets/MediaQuery/textScalerOf.html)

- **Do:** Use MediaQuery.textScalerOf(context)
- **Don't:** Fixed font sizes

**Recommended:**
```
final scaler = MediaQuery.textScalerOf(context); scaler.scale(14)
```

**Avoid:**
```
MediaQuery.textScaleFactor
```

---

### Test with screen readers `[High]`
TalkBack and VoiceOver

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility#screen-readers](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility#screen-readers)

- **Do:** Test accessibility regularly
- **Don't:** Skip accessibility testing

**Recommended:**
```
Regular TalkBack testing
```

**Avoid:**
```
No screen reader testing
```

---

## Testing

### Use widget tests `[Medium]`
Test widget behavior

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://docs.flutter.dev/testing](https://docs.flutter.dev/testing)

- **Do:** WidgetTester for UI tests
- **Don't:** Unit tests only

**Recommended:**
```
testWidgets('...' (tester) async {})
```

**Avoid:**
```
Only test() for UI
```

---

### Use integration tests `[Medium]`
Full app testing

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** integration_test package
- **Don't:** Manual testing only

**Recommended:**
```
IntegrationTestWidgetsFlutterBinding
```

**Avoid:**
```
Manual E2E testing
```

---

### Mock dependencies `[Medium]`
Isolate tests

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Mockito or mocktail
- **Don't:** Real dependencies in tests

**Recommended:**
```
when(mock.method()).thenReturn()
```

**Avoid:**
```
Real API calls in tests
```

---

## Platform

### Use Platform checks `[Medium]`
Platform-specific code

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Platform.isIOS Platform.isAndroid
- **Don't:** Same code for all platforms

**Recommended:**
```
if (Platform.isIOS) {}
```

**Avoid:**
```
Hardcoded iOS behavior
```

---

### Use kIsWeb for web `[Medium]`
Web platform detection

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** kIsWeb for web checks
- **Don't:** Platform for web

**Recommended:**
```
if (kIsWeb) {}
```

**Avoid:**
```
Platform.isWeb (doesn't exist)
```

---

## Packages

### Use pub.dev packages `[Medium]`
Community packages

**Applies to:** flutter 3.44.x (current stable line)
**Documentation:** [https://pub.dev/](https://pub.dev/)

- **Do:** Popular maintained packages
- **Don't:** Custom implementations

**Recommended:**
```
cached_network_image
```

**Avoid:**
```
Custom image cache
```

---

### Check package quality `[Medium]`
Quality before adding

**Applies to:** flutter 3.44.x (current stable line)

- **Do:** Pub points and popularity
- **Don't:** Any package without review

**Recommended:**
```
100+ pub points
```

**Avoid:**
```
Unmaintained packages
```

---
