# Uwp Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`uwp.csv`)
> Framework: Uwp
> Rules Count: 55 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Uwp** projects.

---

## XAML

### Use x:Bind for compiled bindings `[High]`
Compile-time validated bindings with better performance

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension)

- **Do:** x:Bind for type-safe performant bindings
- **Don't:** {Binding} when x:Bind is available

**Recommended:**
```
<TextBlock Text="{x:Bind ViewModel.Name, Mode=OneWay}"/>
```

**Avoid:**
```
<TextBlock Text="{Binding Name}"/>
```

---

### Use x:Load for deferred elements `[Medium]`
Delay creation of elements until needed

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-load-attribute](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-load-attribute)

- **Do:** x:Load=False for hidden or conditional panels
- **Don't:** Loading all UI elements at page load

**Recommended:**
```
<StackPanel x:Name="AdvancedPanel" x:Load="{x:Bind ShowAdvanced, Mode=OneWay}">
```

**Avoid:**
```
Collapsed StackPanel that is always instantiated
```

---

### Use x:Phase for incremental item rendering `[Medium]`
Render list items in priority phases

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-phase-attribute](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-phase-attribute)

- **Do:** x:Phase on secondary content in item DataTemplates
- **Don't:** All template content loaded in one pass

**Recommended:**
```
<TextBlock x:Phase="1" Text="{x:Bind Description}"/>
```

**Avoid:**
```
Complex DataTemplate with no phasing
```

---

### Use x:DefaultBindMode `[Low]`
Reduce repetitive Mode= declarations

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension)

- **Do:** x:DefaultBindMode=OneWay on containers
- **Don't:** Mode=OneWay on every individual x:Bind

**Recommended:**
```
<StackPanel x:DefaultBindMode="OneWay">
```

**Avoid:**
```
Mode=OneWay repeated on every binding in a panel
```

---

### Use x:DeferLoadStrategy for legacy support `[Low]`
Deferred loading before x:Load was available

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-deferloadstrategy-attribute](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-deferloadstrategy-attribute)

- **Do:** x:Load (preferred) or x:DeferLoadStrategy=Lazy
- **Don't:** Eagerly loading rarely shown UI

**Recommended:**
```
x:Load="False" (or x:DeferLoadStrategy="Lazy" on older targets)
```

**Avoid:**
```
Always-loaded panels toggled with Visibility
```

---

## Controls

### Use NavigationView for app shell `[High]`
Standard UWP navigation pattern with hamburger menu

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/navigationview](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/navigationview)

- **Do:** NavigationView for top-level navigation
- **Don't:** Custom SplitView hamburger menu

**Recommended:**
```
<NavigationView><NavigationView.MenuItems><NavigationViewItem Content="Home" Icon="Home"/></NavigationView.MenuItems></NavigationView>
```

**Avoid:**
```
Custom SplitView with manual toggle button
```

---

### Use CommandBar for app actions `[Medium]`
Standard app bar for primary commands

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/command-bar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/command-bar)

- **Do:** CommandBar with AppBarButtons
- **Don't:** Custom StackPanel toolbar

**Recommended:**
```
<CommandBar><AppBarButton Icon="Save" Label="Save"/></CommandBar>
```

**Avoid:**
```
<StackPanel Orientation="Horizontal"><Button>Save</Button></StackPanel>
```

---

### Use ContentDialog for modals `[Medium]`
System-styled modal dialogs

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/dialogs-and-flyouts/dialogs](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/dialogs-and-flyouts/dialogs)

- **Do:** ContentDialog for confirmations and input
- **Don't:** Custom popup overlays

**Recommended:**
```
<ContentDialog Title="Confirm" PrimaryButtonText="Yes" CloseButtonText="No"/>
```

**Avoid:**
```
Grid overlay with manual focus trapping
```

---

### Use AutoSuggestBox for search `[Medium]`
Built-in search box with suggestions

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/auto-suggest-box](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/auto-suggest-box)

- **Do:** AutoSuggestBox with QuerySubmitted and SuggestionChosen
- **Don't:** TextBox with manual suggestion popup

**Recommended:**
```
<AutoSuggestBox QueryIcon="Find" TextChanged="OnTextChanged" SuggestionChosen="OnChosen" QuerySubmitted="OnQuerySubmitted"/>
```

**Avoid:**
```
TextBox with custom Popup and ListBox for suggestions
```

---

### Use CalendarDatePicker and TimePicker `[Low]`
Platform-consistent date and time selection

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/date-and-time](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/date-and-time)

- **Do:** Built-in date and time pickers
- **Don't:** Custom date selection controls

**Recommended:**
```
<CalendarDatePicker Header="Start date"/><TimePicker Header="Time"/>
```

**Avoid:**
```
TextBox with date parsing and validation
```

---

### Use PersonPicture for user avatars `[Low]`
Consistent avatar display with fallback initials

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/person-picture](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/person-picture)

- **Do:** PersonPicture with DisplayName and ProfilePicture
- **Don't:** Custom Ellipse with ImageBrush for avatars

**Recommended:**
```
<PersonPicture DisplayName="Jane Doe" ProfilePicture="{x:Bind AvatarUri}"/>
```

**Avoid:**
```
<Ellipse><Ellipse.Fill><ImageBrush ImageSource="avatar.png"/></Ellipse.Fill></Ellipse>
```

---

## Styling

### Use ThemeResource for adaptive colors `[High]`
Colors that switch with light and dark theme

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/style/color](https://learn.microsoft.com/en-us/windows/uwp/design/style/color)

- **Do:** ThemeResource for all color references
- **Don't:** Hardcoded hex values that break in dark mode

**Recommended:**
```
Foreground="{ThemeResource SystemControlForegroundBaseHighBrush}"
```

**Avoid:**
```
Foreground="#000000"
```

---

### Use Fluent Design materials `[Medium]`
Acrylic translucent material for depth

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/style/acrylic](https://learn.microsoft.com/en-us/windows/uwp/design/style/acrylic)

- **Do:** Built-in Fluent materials for depth and motion
- **Don't:** Custom shader effects for blur and reveal

**Recommended:**
```
<Grid Background="{ThemeResource SystemControlAcrylicWindowBrush}"/>
```

**Avoid:**
```
Custom CompositionEffectBrush recreating acrylic
```

---

### Use Lightweight Styling `[Medium]`
Override control resource keys for subtle changes

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/xaml-styles#lightweight-styling](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/xaml-styles#lightweight-styling)

- **Do:** Lightweight styling resource overrides
- **Don't:** Full ControlTemplate copy for small tweaks

**Recommended:**
```
<Button><Button.Resources><SolidColorBrush x:Key="ButtonBackground" Color="Blue"/></Button.Resources></Button>
```

**Avoid:**
```
Entire ControlTemplate copied to change background
```

---

### Use implicit styles for consistency `[Medium]`
TargetType without x:Key applies to all instances

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/xaml-styles](https://learn.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/xaml-styles)

- **Do:** Implicit Style for default control appearance
- **Don't:** Repeating Setters on every control instance

**Recommended:**
```
<Style TargetType="Button"><Setter Property="CornerRadius" Value="4"/></Style>
```

**Avoid:**
```
CornerRadius="4" on every Button in the page
```

---

### Use VisualStateManager for visual states `[High]`
Define visual states with Setters that change properties when triggered

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml](https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml)

- **Do:** VisualStateGroup containing VisualStates with Setter targets
- **Don't:** Toggling Visibility from code-behind on SizeChanged

**Recommended:**
```
<VisualStateGroup><VisualState x:Name="Wide"><VisualState.Setters><Setter Target="root.Orientation" Value="Horizontal"/></VisualState.Setters></VisualState></VisualStateGroup>
```

**Avoid:**
```
SizeChanged handler that flips Orientation in code-behind
```

---

## Navigation

### Use Frame for page navigation `[Medium]`
Windows.UI.Xaml.Controls.Frame for UWP page navigation

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/basics/navigate-between-two-pages](https://learn.microsoft.com/en-us/windows/uwp/design/basics/navigate-between-two-pages)

- **Do:** Frame.Navigate with typed parameters
- **Don't:** Swapping UserControls manually

**Recommended:**
```
rootFrame.Navigate(typeof(DetailPage), itemId);
```

**Avoid:**
```
contentArea.Content = new DetailPage();
```

---

### Handle back button correctly `[High]`
Provide an in-app Back button styled with NavigationBackButtonNormalStyle and handle SystemNavigationManager.BackRequested for hardware back gamepad B and Tablet-Mode back; also handle CoreDispatcher.AcceleratorKeyActivated for Alt+Left

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/ui-input/back-navigation](https://learn.microsoft.com/en-us/windows/uwp/ui-input/back-navigation)

- **Do:** In-app NavigationBackButtonNormalStyle button plus SystemNavigationManager.BackRequested handler
- **Don't:** Relying on the deprecated title-bar back button (AppViewBackButtonVisibility) or ignoring system back signals

**Recommended:**
```
SystemNavigationManager.GetForCurrentView().BackRequested += OnBackRequested;
```

**Avoid:**
```
No back button support on phone or tablet
```

---

### Support deep linking with protocol activation `[Medium]`
Respond to URI activation and toast taps

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/launch-resume/handle-uri-activation](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/handle-uri-activation)

- **Do:** OnActivated handler with proper page routing
- **Don't:** Ignoring activation arguments

**Recommended:**
```
protected override void OnActivated(IActivatedEventArgs args) { if (args.Kind == ActivationKind.Protocol) { ... } }
```

**Avoid:**
```
Empty OnActivated ignoring URI parameters
```

---

### Use ConnectedAnimations for continuity `[Low]`
Smooth transitions between pages

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/motion/connected-animation](https://learn.microsoft.com/en-us/windows/uwp/design/motion/connected-animation)

- **Do:** ConnectedAnimationService for shared element transitions
- **Don't:** Abrupt page transitions with no visual continuity

**Recommended:**
```
ConnectedAnimationService.GetForCurrentView().PrepareToAnimate("image", sourceImage);
```

**Avoid:**
```
No transition animation between list and detail
```

---

## Data Binding

### Implement INotifyPropertyChanged `[High]`
Enable UI updates on property changes

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth)

- **Do:** INotifyPropertyChanged on all ViewModels
- **Don't:** Auto-properties without notification

**Recommended:**
```
public string Title { get => _title; set { _title = value; OnPropertyChanged(); } }
```

**Avoid:**
```
public string Title { get; set; } expecting UI updates
```

---

### Use ObservableCollection for lists `[High]`
Collection change notifications for ItemsSources

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth)

- **Do:** ObservableCollection<T> for bound lists
- **Don't:** List<T> for data-bound collections

**Recommended:**
```
ObservableCollection<Item> Items { get; } = new();
```

**Avoid:**
```
List<Item> Items { get; set; } = new();
```

---

### Use function bindings with x:Bind `[Medium]`
Call static methods directly in markup

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/function-bindings](https://learn.microsoft.com/en-us/windows/uwp/data-binding/function-bindings)

- **Do:** x:Bind to static converter methods
- **Don't:** IValueConverter for trivial transforms

**Recommended:**
```
<TextBlock Visibility="{x:Bind local:Converters.BoolToVisibility(IsActive), Mode=OneWay}"/>
```

**Avoid:**
```
Full IValueConverter class for bool to Visibility
```

---

### Specify Mode on x:Bind `[High]`
x:Bind defaults to OneTime not OneWay

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension)

- **Do:** Mode=OneWay or TwoWay when live updates needed
- **Don't:** Omitting Mode and getting stale UI

**Recommended:**
```
Text="{x:Bind Title, Mode=OneWay}"
```

**Avoid:**
```
Text="{x:Bind Title}" expecting live updates
```

---

### Use CollectionViewSource for grouping `[Medium]`
Group and sort collections declaratively

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth)

- **Do:** CollectionViewSource for grouped ListView and GridView
- **Don't:** Manual grouping logic in code-behind

**Recommended:**
```
<CollectionViewSource x:Key="GroupedItems" IsSourceGrouped="True" Source="{x:Bind GroupedData}"/>
```

**Avoid:**
```
Manual loop building grouped StackPanels
```

---

## Performance

### Use ListView and GridView virtualization `[High]`
Only creates containers for visible items

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/optimize-gridview-and-listview](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/optimize-gridview-and-listview)

- **Do:** Default virtualization in ListView and GridView
- **Don't:** Setting ItemsPanel to non-virtualizing panel

**Recommended:**
```
<ListView ItemsSource="{x:Bind Items}"/> (virtualizes by default)
```

**Avoid:**
```
<ListView><ListView.ItemsPanel><ItemsPanelTemplate><StackPanel/></ItemsPanelTemplate></ListView.ItemsPanel></ListView>
```

---

### Use ISupportIncrementalLoading `[Medium]`
Load data on demand as user scrolls

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-in-depth)

- **Do:** ISupportIncrementalLoading for large datasets
- **Don't:** Loading entire collection upfront

**Recommended:**
```
class IncrementalSource : ObservableCollection<Item>, ISupportIncrementalLoading
```

**Avoid:**
```
await LoadAll() loading 50K items at startup
```

---

### Reduce XAML visual tree depth `[Medium]`
Simpler trees layout and render faster

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/optimize-xaml-loading](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/optimize-xaml-loading)

- **Do:** Flat templates with minimal nesting
- **Don't:** Deeply nested panels in DataTemplates

**Recommended:**
```
<StackPanel><TextBlock/><TextBlock/></StackPanel> in item template
```

**Avoid:**
```
<Grid><Border><StackPanel><Grid>... 8 levels in item template
```

---

### Use compiled bindings in DataTemplates `[High]`
x:Bind in templates requires x:DataType

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/uwp/xaml-platform/x-bind-markup-extension)

- **Do:** x:DataType on DataTemplate for compiled bindings
- **Don't:** {Binding} in item templates for large lists

**Recommended:**
```
<DataTemplate x:DataType="local:Item"><TextBlock Text="{x:Bind Name}"/></DataTemplate>
```

**Avoid:**
```
<DataTemplate><TextBlock Text="{Binding Name}"/></DataTemplate>
```

---

### Profile with Visual Studio diagnostics `[Medium]`
Measure before optimizing

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/visualstudio/profiling/application-timeline](https://learn.microsoft.com/en-us/visualstudio/profiling/application-timeline)

- **Do:** Application Timeline and Memory Usage tools
- **Don't:** Guessing at performance problems

**Recommended:**
```
VS Diagnostic Tools > Application Timeline
```

**Avoid:**
```
Optimizing without profiling data
```

---

## Threading

### Use async/await for all IO `[High]`
Keep UI thread responsive

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/threading-async/asynchronous-programming-universal-windows-platform-apps](https://learn.microsoft.com/en-us/windows/uwp/threading-async/asynchronous-programming-universal-windows-platform-apps)

- **Do:** async/await for file network and database operations
- **Don't:** Synchronous IO blocking the UI thread

**Recommended:**
```
var file = await StorageFile.GetFileFromPathAsync(path);
```

**Avoid:**
```
StorageFile.GetFileFromPathAsync(path).AsTask().Result;
```

---

### Use CoreDispatcher for UI thread access `[High]`
Post work back to the UI thread from background

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/uwp/api/windows.ui.core.coredispatcher](https://learn.microsoft.com/en-us/uwp/api/windows.ui.core.coredispatcher)

- **Do:** Dispatcher.RunAsync from background threads
- **Don't:** Touching UI elements from background threads

**Recommended:**
```
await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => Status = "Done");
```

**Avoid:**
```
textBlock.Text = "Done" from Task.Run
```

---

### Offload CPU work with Task.Run `[High]`
Keep compute-heavy work off UI thread

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/threading-async/asynchronous-programming-universal-windows-platform-apps](https://learn.microsoft.com/en-us/windows/uwp/threading-async/asynchronous-programming-universal-windows-platform-apps)

- **Do:** Task.Run for CPU-bound operations
- **Don't:** Heavy computation blocking UI

**Recommended:**
```
var result = await Task.Run(() => ProcessData(items));
```

**Avoid:**
```
var result = ProcessData(items); freezing UI
```

---

### Use IProgress for status updates `[Medium]`
Report progress from background operations

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/api/system.progress-1](https://learn.microsoft.com/en-us/dotnet/api/system.progress-1)

- **Do:** IProgress<T> for progress reporting to UI
- **Don't:** Polling shared variables for progress

**Recommended:**
```
var progress = new Progress<int>(p => ProgressBar.Value = p); await Task.Run(() => Process(progress));
```

**Avoid:**
```
while (!done) { await Task.Delay(100); check shared field; }
```

---

## Adaptive

### Use AdaptiveTrigger for responsive layouts `[High]`
MinWindowWidth and MinWindowHeight triggers fire at standard breakpoints (640 small / 1008 medium)

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml](https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml)

- **Do:** AdaptiveTrigger inside VisualState.StateTriggers with the 640 and 1008 breakpoints
- **Don't:** Fixed layouts for a single screen size

**Recommended:**
```
<VisualState.StateTriggers><AdaptiveTrigger MinWindowWidth="640"/></VisualState.StateTriggers>
```

**Avoid:**
```
Single-column layout at all widths
```

---

### Design for multiple device families `[Medium]`
Phone tablet desktop Xbox and HoloLens

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/layout/screen-sizes-and-breakpoints-for-responsive-design](https://learn.microsoft.com/en-us/windows/uwp/design/layout/screen-sizes-and-breakpoints-for-responsive-design)

- **Do:** DeviceFamily-specific views and resources
- **Don't:** Desktop-only design ignoring other form factors

**Recommended:**
```
DeviceFamily-Mobile/MainPage.xaml for phone-specific layout
```

**Avoid:**
```
Fixed 1920x1080 layout
```

---

### Use RelativePanel for adaptive positioning `[Medium]`
Controls position relative to each other

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml#relativepanel](https://learn.microsoft.com/en-us/windows/uwp/design/layout/layouts-with-xaml#relativepanel)

- **Do:** RelativePanel for layouts that reflow at breakpoints
- **Don't:** Absolute positioning or fixed margins

**Recommended:**
```
<Button RelativePanel.Below="title" RelativePanel.AlignLeftWithPanel="True"/>
```

**Avoid:**
```
<Button Margin="0,60,0,0"/> calculated from title height
```

---

### Support multi-window with secondary views `[Medium]`
Open detached views with CoreApplication.CreateNewView and ApplicationViewSwitcher

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/layout/show-multiple-views](https://learn.microsoft.com/en-us/windows/uwp/design/layout/show-multiple-views)

- **Do:** CreateNewView and TryShowAsStandaloneAsync for multi-document scenarios
- **Don't:** Single-window assumptions when scenarios benefit from secondary views

**Recommended:**
```
var view = CoreApplication.CreateNewView(); await view.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => { /* set content */ });
```

**Avoid:**
```
Modal overlay used for content that should be a separate window
```

---

## Accessibility

### Set AutomationProperties `[High]`
Enable Narrator and screen reader support

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/accessibility/basic-accessibility-information](https://learn.microsoft.com/en-us/windows/uwp/design/accessibility/basic-accessibility-information)

- **Do:** AutomationProperties.Name on all interactive controls
- **Don't:** Controls without accessible names

**Recommended:**
```
<AppBarButton AutomationProperties.Name="Save document" Icon="Save"/>
```

**Avoid:**
```
<AppBarButton Icon="Save"/> without name
```

---

### Support keyboard and gamepad `[High]`
All functions reachable without touch

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/input/keyboard-interactions](https://learn.microsoft.com/en-us/windows/uwp/design/input/keyboard-interactions)

- **Do:** Tab navigation XYFocus and access keys
- **Don't:** Touch-only interactions

**Recommended:**
```
<Button AccessKey="S" XYFocusDown="{x:Bind OtherButton}"/>
```

**Avoid:**
```
No keyboard or gamepad support
```

---

### Support contrast themes `[High]`
Respect system contrast themes (renamed from high contrast in Windows 11)

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/design/accessibility/high-contrast-themes](https://learn.microsoft.com/en-us/windows/uwp/design/accessibility/high-contrast-themes)

- **Do:** ThemeResource brushes that adapt to contrast themes
- **Don't:** Hardcoded colors that vanish under contrast themes

**Recommended:**
```
Foreground="{ThemeResource SystemControlForegroundBaseHighBrush}"
```

**Avoid:**
```
Foreground="#444444"
```

---

### Test with Narrator and Accessibility Insights `[Medium]`
Validate screen reader and automation compliance

**Applies to:** uwp legacy
**Documentation:** [https://accessibilityinsights.io/](https://accessibilityinsights.io/)

- **Do:** Regular Narrator walkthrough and Accessibility Insights scan
- **Don't:** Shipping without accessibility testing

**Recommended:**
```
Accessibility Insights FastPass on every page
```

**Avoid:**
```
No accessibility testing before release
```

---

## Architecture

### Use MVVM pattern `[Medium]`
Separate View ViewModel and Model

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-and-mvvm](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-and-mvvm)

- **Do:** ViewModel with INotifyPropertyChanged and ICommand
- **Don't:** Business logic in code-behind

**Recommended:**
```
ViewModel bound via DataContext with commands
```

**Avoid:**
```
MainPage.xaml.cs with database calls and UI logic
```

---

### Use Template Studio for scaffolding `[Low]`
Proven project templates with navigation and services

**Applies to:** uwp legacy
**Documentation:** [https://github.com/microsoft/TemplateStudio](https://github.com/microsoft/TemplateStudio)

- **Do:** Windows Template Studio for new UWP projects
- **Don't:** Blank project with manual boilerplate

**Recommended:**
```
Template Studio with MVVM Toolkit and navigation service
```

**Avoid:**
```
Blank App template building everything from scratch
```

---

### Use dependency injection `[Medium]`
Register services for testability

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)

- **Do:** Microsoft.Extensions.DI for service resolution
- **Don't:** Static singletons and manual construction

**Recommended:**
```
services.AddTransient<MainViewModel>(); services.AddSingleton<IDataService, DataService>();
```

**Avoid:**
```
DataService.Instance or new DataService() everywhere
```

---

### Keep platform APIs behind abstractions `[Medium]`
Isolate WinRT APIs from business logic

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-and-mvvm](https://learn.microsoft.com/en-us/windows/uwp/data-binding/data-binding-and-mvvm)

- **Do:** Interfaces wrapping StorageFile FilePicker etc
- **Don't:** Direct WinRT calls in ViewModels

**Recommended:**
```
IFileService wrapping FileOpenPicker and StorageFile
```

**Avoid:**
```
FileOpenPicker usage directly in ViewModel
```

---

### Prefer WinUI 3 for new projects `[Medium]`
UWP is maintenance-only; WinUI 3 with the Windows App SDK is the recommended path for new Windows apps

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/get-started/](https://learn.microsoft.com/en-us/windows/apps/get-started/)

- **Do:** Use WinUI 3 with the Windows App SDK for every new Windows app
- **Don't:** Start a new Windows app on UWP

**Recommended:**
```
New project with Microsoft.WindowsAppSDK and WinUI 3
```

**Avoid:**
```
New UWP project for a Windows app
```

---

### Plan migration to Windows App SDK `[Medium]`
Maintain existing UWP apps while planning migration to WinUI 3 and the Windows App SDK; do not expand UWP as the foundation for new Windows development

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/overall-migration-strategy](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/overall-migration-strategy)

- **Do:** Use the UWP migration guidance to plan an incremental migration or full port to WinUI 3
- **Don't:** Continue major new-app investment on UWP without a Windows App SDK migration plan

**Recommended:**
```
Follow the UWP to WinUI 3 migration guide for existing apps
```

**Avoid:**
```
Start a new Windows app on UWP instead of WinUI 3
```

---

## Lifecycle

### Handle suspend and resume `[High]`
UWP apps are suspended when not in foreground

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle)

- **Do:** Save state in OnSuspending and restore in OnLaunched
- **Don't:** Ignoring app lifecycle losing user state

**Recommended:**
```
Application.Current.Suspending += (s, e) => SaveState();
```

**Avoid:**
```
No suspend handler losing in-progress form data
```

---

### Use ExtendedExecutionSession for background work `[Medium]`
Request extended time for unfinished operations

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/launch-resume/run-minimized-with-extended-execution](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/run-minimized-with-extended-execution)

- **Do:** ExtendedExecutionSession for saving or uploads
- **Don't:** Assuming background work completes after suspend

**Recommended:**
```
var session = new ExtendedExecutionSession { Reason = ExtendedExecutionReason.SavingData };
```

**Avoid:**
```
Long upload with no extended execution that gets killed on suspend
```

---

### Handle prelaunch `[Medium]`
Apps must opt in to prelaunch via CoreApplication.EnablePrelaunch(true) starting in Windows 10 1607; check LaunchActivatedEventArgs.PrelaunchActivated to skip user-visible work

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/launch-resume/handle-app-prelaunch](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/handle-app-prelaunch)

- **Do:** Opt in with EnablePrelaunch and skip heavy init when PrelaunchActivated is true
- **Don't:** Performing full initialization or navigating during prelaunch

**Recommended:**
```
CoreApplication.EnablePrelaunch(true); if (e.PrelaunchActivated) return; // skip heavy init
```

**Avoid:**
```
Loading all data and navigating on prelaunch
```

---

### Use a deferral when saving async state on suspend `[Medium]`
Suspending grants only ~5 seconds before the OS may terminate; await work needs SuspendingOperation.GetDeferral and Complete or save returns before it finishes

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/app-lifecycle)

- **Do:** GetDeferral around async save calls and Complete in finally
- **Don't:** Async work that returns the suspending handler before completion

**Recommended:**
```
async void OnSuspending(object s, SuspendingEventArgs e) { var d = e.SuspendingOperation.GetDeferral(); try { await SaveAsync(); } finally { d.Complete(); } }
```

**Avoid:**
```
async void OnSuspending(object s, SuspendingEventArgs e) { await SaveAsync(); } // handler returns before save completes
```

---

## Testing

### Unit test ViewModels `[Medium]`
Test logic without UI framework dependencies

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

- **Do:** xUnit or MSTest on ViewModel methods
- **Don't:** Testing only through the running app

**Recommended:**
```
[Fact] public async Task Load_PopulatesItems() { await vm.LoadAsync(); Assert.NotEmpty(vm.Items); }
```

**Avoid:**
```
Manual testing by tapping through the app
```

---

### Use WinAppDriver with Appium for UI tests `[Medium]`
Automated UI testing for UWP (Coded UI Test was deprecated in Visual Studio 2019); WinAppDriver v1 is in low-maintenance mode and Appium 2 is the modern direction

**Applies to:** uwp legacy
**Documentation:** [https://github.com/microsoft/WinAppDriver](https://github.com/microsoft/WinAppDriver)

- **Do:** WinAppDriver with Appium for end-to-end tests
- **Don't:** Manual regression testing

**Recommended:**
```
session.FindElementByAccessibilityId("SaveButton").Click();
```

**Avoid:**
```
Manual click-through testing before each release
```

---

### Test on multiple device families `[Medium]`
Behavior varies across phone desktop and Xbox

**Applies to:** uwp legacy
**Documentation:** [https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal)

- **Do:** Test on device emulators and real hardware
- **Don't:** Desktop-only testing

**Recommended:**
```
Test on Mobile emulator and Xbox dev mode
```

**Avoid:**
```
Only running on local desktop
```

---
