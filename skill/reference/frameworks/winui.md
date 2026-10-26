# Winui Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`winui.csv`)
> Framework: Winui
> Rules Count: 59 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Winui** projects.

---

## XAML

### Use x:Bind for compiled bindings `[High]`
Compile-time checked bindings with better performance

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension)

- **Do:** x:Bind for type-safe bindings
- **Don't:** {Binding} when x:Bind works

**Recommended:**
```
<TextBlock Text="{x:Bind ViewModel.Title, Mode=OneWay}"/>
```

**Avoid:**
```
<TextBlock Text="{Binding Title}"/>
```

---

### Use x:Load for deferred loading `[Medium]`
Only instantiate UI elements when needed

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-load-attribute](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-load-attribute)

- **Do:** x:Load=False for hidden panels and dialogs
- **Don't:** Loading all UI upfront

**Recommended:**
```
<StackPanel x:Load="{x:Bind ShowDetails, Mode=OneWay}">
```

**Avoid:**
```
Always-loaded collapsed panels
```

---

### Use x:Phase for incremental rendering `[Medium]`
Load list items in phases for smooth scrolling

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension)

- **Do:** x:Phase on secondary content in DataTemplates
- **Don't:** Loading all template content in phase 0

**Recommended:**
```
<TextBlock x:Phase="1" Text="{x:Bind Description}"/>
```

**Avoid:**
```
All content in single phase for complex templates
```

---

### Use x:DefaultBindMode `[Low]`
Set default binding mode for a scope

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension)

- **Do:** x:DefaultBindMode=OneWay on containers with many bindings
- **Don't:** Mode=OneWay on every individual x:Bind

**Recommended:**
```
<StackPanel x:DefaultBindMode="OneWay">
```

**Avoid:**
```
Mode=OneWay repeated on 20 bindings
```

---

## Controls

### Use NavigationView for app navigation `[High]`
WinUI 3 NavigationView with Left Top and LeftCompact display modes plus footer items

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/navigationview](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/navigationview)

- **Do:** NavigationView with PaneDisplayMode for main app shell
- **Don't:** Custom hamburger menu implementation

**Recommended:**
```
<NavigationView><NavigationView.MenuItems><NavigationViewItem Content="Home"/></NavigationView.MenuItems></NavigationView>
```

**Avoid:**
```
Custom SplitView with manual hamburger button
```

---

### Use InfoBar for status messages `[Medium]`
Non-intrusive informational messages

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/infobar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/infobar)

- **Do:** InfoBar for success warning and error messages
- **Don't:** Custom styled StackPanel for status

**Recommended:**
```
<InfoBar IsOpen="True" Severity="Warning" Title="Update available"/>
```

**Avoid:**
```
<StackPanel Background="Yellow"><TextBlock Text="Warning"/></StackPanel>
```

---

### Use TeachingTip for onboarding `[Low]`
Contextual tips attached to UI elements

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/teaching-tip](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/teaching-tip)

- **Do:** TeachingTip for feature discovery
- **Don't:** Custom popup for teaching

**Recommended:**
```
<TeachingTip Target="{x:Bind SearchBox}" Title="Try searching"/>
```

**Avoid:**
```
Custom Popup positioned near target element
```

---

### Use ContentDialog for modal interactions `[Medium]`
Standard modal dialog pattern

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/dialogs](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/dialogs)

- **Do:** ContentDialog for confirmations and input
- **Don't:** Custom overlay Panel as dialog

**Recommended:**
```
<ContentDialog Title="Delete?" PrimaryButtonText="Delete" CloseButtonText="Cancel"/>
```

**Avoid:**
```
Grid overlay with manual focus trapping
```

---

### Use BreadcrumbBar for hierarchy `[Low]`
Show navigation path in hierarchical apps

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/breadcrumbbar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/breadcrumbbar)

- **Do:** BreadcrumbBar for folder or category navigation
- **Don't:** Manual TextBlock breadcrumb chain

**Recommended:**
```
<BreadcrumbBar ItemsSource="{x:Bind Breadcrumbs}"/>
```

**Avoid:**
```
<StackPanel Orientation="Horizontal"><TextBlock Text="Home > Settings > Display"/></StackPanel>
```

---

### Use NumberBox for numeric input `[Medium]`
Built-in numeric entry with validation formatting and spin buttons

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/number-box](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/number-box)

- **Do:** NumberBox with Minimum Maximum and SpinButtonPlacementMode
- **Don't:** TextBox with manual numeric parsing and validation

**Recommended:**
```
<NumberBox Value="{x:Bind Quantity, Mode=TwoWay}" Minimum="0" Maximum="100" SpinButtonPlacementMode="Inline"/>
```

**Avoid:**
```
TextBox with regex validation for numbers
```

---

### Use Expander for collapsible sections `[Low]`
Expandable content area with header for progressive disclosure

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/expander](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/expander)

- **Do:** Expander for settings groups and optional content
- **Don't:** Manual visibility toggling with buttons

**Recommended:**
```
<Expander Header="Advanced Settings"><StackPanel><ToggleSwitch Header="Debug mode"/></StackPanel></Expander>
```

**Avoid:**
```
Button toggling StackPanel.Visibility for collapsible content
```

---

### Use ProgressRing and ProgressBar for loading `[Medium]`
Built-in loading indicators for determinate and indeterminate states

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/progress-controls](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/progress-controls)

- **Do:** ProgressRing for indeterminate and ProgressBar for determinate progress
- **Don't:** Custom spinning animation or text-based loading indicators

**Recommended:**
```
<ProgressRing IsActive="{x:Bind IsLoading, Mode=OneWay}"/>
```

**Avoid:**
```
<TextBlock Text="Loading..." Visibility="{x:Bind IsLoading}"/>
```

---

## Styling

### Use Lightweight Styling `[High]`
Override control sub-properties via resources

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-styles#lightweight-styling](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-styles#lightweight-styling)

- **Do:** Lightweight styling resource keys to tweak controls
- **Don't:** Full ControlTemplate override for small changes

**Recommended:**
```
<Button><Button.Resources><ResourceDictionary><ResourceDictionary.ThemeDictionaries><ResourceDictionary x:Key="Light"><SolidColorBrush x:Key="ButtonBackground" Color="MediumSlateBlue"/></ResourceDictionary></ResourceDictionary.ThemeDictionaries></ResourceDictionary></Button.Resources></Button>
```

**Avoid:**
```
Full ControlTemplate copy to change background color
```

---

### Use WinUI theme resources `[High]`
Consistent Fluent Design colors and brushes

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/color](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/color)

- **Do:** WinUI theme resource keys for colors
- **Don't:** Hardcoded hex color values

**Recommended:**
```
Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
```

**Avoid:**
```
Background="#FF2D2D30"
```

---

### Support light and dark themes `[High]`
Respect user and system theme preference

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-theme-resources](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-theme-resources)

- **Do:** ThemeResource for theme-adaptive values
- **Don't:** Hardcoded colors that break in dark mode

**Recommended:**
```
Foreground="{ThemeResource TextFillColorPrimaryBrush}"
```

**Avoid:**
```
Foreground="Black"
```

---

### Use Fluent Design system `[Medium]`
Acrylic Mica Reveal and rounded corners

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/materials](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/materials)

- **Do:** Built-in Fluent materials and effects
- **Don't:** Custom blur and shadow implementations

**Recommended:**
```
<Grid Background="{ThemeResource AcrylicInAppFillColorDefaultBrush}"/>
```

**Avoid:**
```
Custom CompositionBrush recreating acrylic
```

---

### Choose Mica vs Acrylic by surface lifetime `[Medium]`
Mica is for long-lived primary surfaces like main windows; Acrylic is for transient light-dismiss surfaces like flyouts and context menus

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/materials](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/materials)

- **Do:** Mica on root window backgrounds and Acrylic on flyouts and overlays
- **Don't:** Acrylic on the main window or Mica on transient flyouts

**Recommended:**
```
<Window.SystemBackdrop><MicaBackdrop/></Window.SystemBackdrop> ... <FlyoutPresenter Background="{ThemeResource AcrylicInAppFillColorDefaultBrush}"/>
```

**Avoid:**
```
Acrylic on every Window background causing battery and perf cost
```

---

### Set SystemBackdrop on Window directly `[Medium]`
WinUI 3 1.3+ exposes Window.SystemBackdrop with MicaBackdrop and DesktopAcrylicBackdrop classes replacing manual MicaController plumbing

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/system-backdrops](https://learn.microsoft.com/en-us/windows/apps/develop/ui/system-backdrops)

- **Do:** Window.SystemBackdrop in XAML or code
- **Don't:** Hand-rolled MicaController wiring when SystemBackdrop API is available

**Recommended:**
```
<Window.SystemBackdrop><MicaBackdrop Kind="Base"/></Window.SystemBackdrop>
```

**Avoid:**
```
var ctrl = new Microsoft.UI.Composition.SystemBackdrops.MicaController(); ctrl.AddSystemBackdropTarget(this.As<ICompositionSupportsSystemBackdrop>());
```

---

### Organize resources with merged dictionaries `[Medium]`
Share styles and brushes via App.xaml MergedDictionaries instead of duplicating per page

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-resource-dictionary](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/xaml-resource-dictionary)

- **Do:** MergedDictionaries in App.xaml for shared styles brushes and colors
- **Don't:** Duplicating SolidColorBrush definitions on every page

**Recommended:**
```
<Application.Resources><ResourceDictionary><ResourceDictionary.MergedDictionaries><ResourceDictionary Source="Themes/Brushes.xaml"/></ResourceDictionary.MergedDictionaries></ResourceDictionary></Application.Resources>
```

**Avoid:**
```
SolidColorBrush Color hardcoded inline on every page
```

---

## Navigation

### Use Frame for page navigation `[Medium]`
Microsoft.UI.Xaml.Controls.Frame for WinUI 3 page navigation

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigate-between-two-pages](https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigate-between-two-pages)

- **Do:** Frame.Navigate with page types and parameters
- **Don't:** Swapping UserControls in a ContentControl

**Recommended:**
```
rootFrame.Navigate(typeof(SettingsPage), parameter);
```

**Avoid:**
```
contentArea.Content = new SettingsControl();
```

---

### Pass typed navigation parameters `[Medium]`
Type-safe data passing between pages

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigate-between-two-pages](https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigate-between-two-pages)

- **Do:** Typed parameter in OnNavigatedTo
- **Don't:** Dictionary or string parsing for parameters

**Recommended:**
```
protected override void OnNavigatedTo(NavigationEventArgs e) { var item = (Item)e.Parameter; }
```

**Avoid:**
```
var id = int.Parse(e.Parameter.ToString());
```

---

### Handle back navigation `[Medium]`
WinUI 3 uses NavigationView.BackRequested instead of UWP SystemNavigationManager

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigation-history-and-backwards-navigation](https://learn.microsoft.com/en-us/windows/apps/develop/ui/navigation/navigation-history-and-backwards-navigation)

- **Do:** Register NavigationView.BackRequested handler and manage back stack
- **Don't:** Ignoring back navigation

**Recommended:**
```
navigationView.BackRequested += OnBackRequested;
```

**Avoid:**
```
No back button support
```

---

### Use deep linking `[Medium]`
Handle protocol activation so URIs route to the right page

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-rich-activation](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-rich-activation)

- **Do:** Register protocol then check ExtendedActivationKind.Protocol on activation
- **Don't:** Single entry point ignoring activation context

**Recommended:**
```
AppInstance.GetCurrent().GetActivatedEventArgs() with ExtendedActivationKind.Protocol
```

**Avoid:**
```
Ignoring activation arguments
```

---

## Data Binding

### Use ObservableCollection for lists `[High]`
Notifies UI of collection changes

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth)

- **Do:** ObservableCollection<T> for bound ItemsSources
- **Don't:** List<T> for bound collections

**Recommended:**
```
ObservableCollection<Item> Items { get; } = new();
```

**Avoid:**
```
List<Item> Items { get; set; } = new();
```

---

### Use INotifyPropertyChanged `[High]`
Enable property change notification for UI updates

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth)

- **Do:** INotifyPropertyChanged on ViewModels
- **Don't:** Properties without notification

**Recommended:**
```
public string Name { get => _name; set => SetProperty(ref _name, value); }
```

**Avoid:**
```
public string Name { get; set; } without notification
```

---

### Use function binding with x:Bind `[Medium]`
Call methods directly in bindings

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/function-bindings](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/function-bindings)

- **Do:** x:Bind with method references for transforms
- **Don't:** IValueConverter for simple logic

**Recommended:**
```
<TextBlock Visibility="{x:Bind local:Converters.BoolToVisibility(IsActive), Mode=OneWay}"/>
```

**Avoid:**
```
IValueConverter class for bool to visibility
```

---

### Specify Mode explicitly on x:Bind `[High]`
x:Bind defaults to OneTime not OneWay

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension)

- **Do:** Mode=OneWay or Mode=TwoWay when updates needed
- **Don't:** Forgetting Mode and getting stale UI

**Recommended:**
```
Text="{x:Bind Title, Mode=OneWay}"
```

**Avoid:**
```
Text="{x:Bind Title}" expecting live updates
```

---

## Performance

### Use ItemsRepeater for custom lists `[Medium]`
Virtualizing layout with full control

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/items-repeater](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/items-repeater)

- **Do:** ItemsRepeater for custom list layouts
- **Don't:** ListView for highly customized item layouts

**Recommended:**
```
<ItemsRepeater ItemsSource="{x:Bind Items}"><ItemsRepeater.Layout><StackLayout/></ItemsRepeater.Layout></ItemsRepeater>
```

**Avoid:**
```
ListView with heavily modified template and removed chrome
```

---

### Use incremental loading `[Medium]`
Load data on demand as user scrolls

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth)

- **Do:** ISupportIncrementalLoading for large data sets
- **Don't:** Loading entire dataset upfront

**Recommended:**
```
class IncrementalItemSource : ObservableCollection<Item>, ISupportIncrementalLoading
```

**Avoid:**
```
await LoadAllItems() on page load for 10K items
```

---

### Reduce visual tree complexity `[Medium]`
Simpler trees render faster

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/performance/optimize-xaml-loading](https://learn.microsoft.com/en-us/windows/apps/develop/performance/optimize-xaml-loading)

- **Do:** Minimal nesting in DataTemplates
- **Don't:** Deeply nested panels in item templates

**Recommended:**
```
<StackPanel><TextBlock/><TextBlock/></StackPanel>
```

**Avoid:**
```
<Grid><Border><StackPanel><Grid>... 8 levels deep
```

---

### Use compiled bindings over reflection `[High]`
x:Bind generates code at compile time

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension](https://learn.microsoft.com/en-us/windows/apps/develop/platform/xaml/x-bind-markup-extension)

- **Do:** x:Bind for hot paths and list items
- **Don't:** {Binding} in DataTemplates and frequently updated UI

**Recommended:**
```
<DataTemplate x:DataType="local:Item"><TextBlock Text="{x:Bind Name}"/></DataTemplate>
```

**Avoid:**
```
<DataTemplate><TextBlock Text="{Binding Name}"/></DataTemplate>
```

---

## Threading

### Use DispatcherQueue not Dispatcher `[High]`
WinUI 3 uses Microsoft.UI.Dispatching.DispatcherQueue instead of UWP CoreDispatcher

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue)

- **Do:** DispatcherQueue.TryEnqueue for UI thread access
- **Don't:** Dispatcher.RunAsync (UWP pattern)

**Recommended:**
```
_dispatcherQueue.TryEnqueue(() => Status = "Done");
```

**Avoid:**
```
Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => ...);
```

---

### Use async/await for IO operations `[High]`
Keep UI responsive during file and network access

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)

- **Do:** async/await for IO so the UI thread keeps rendering
- **Don't:** Synchronous IO on UI thread

**Recommended:**
```
var data = await httpClient.GetStringAsync(url);
```

**Avoid:**
```
var data = httpClient.GetStringAsync(url).Result;
```

---

### Use Task.Run for CPU-bound work `[High]`
Offload compute to thread pool

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)

- **Do:** Task.Run for heavy computation
- **Don't:** Long-running CPU work on UI thread

**Recommended:**
```
var result = await Task.Run(() => ProcessLargeDataSet());
```

**Avoid:**
```
var result = ProcessLargeDataSet(); blocking UI
```

---

## Packaging

### Use WinAppSDK correctly `[High]`
Windows App SDK provides the runtime

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/)

- **Do:** WinAppSDK NuGet package and WindowsAppSDK bootstrapper
- **Don't:** Mixing UWP and WinUI 3 APIs

**Recommended:**
```
<PackageReference Include="Microsoft.WindowsAppSDK"/>
```

**Avoid:**
```
Using Windows.UI.Xaml instead of Microsoft.UI.Xaml
```

---

### Use unpackaged or packaged appropriately `[Medium]`
Choose deployment model for your scenario

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/deploy-packaged-apps](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/deploy-packaged-apps)

- **Do:** Packaged (MSIX) for Store distribution
- **Don't:** Unpackaged without considering API limitations

**Recommended:**
```
<WindowsPackageType>None</WindowsPackageType> for unpackaged
```

**Avoid:**
```
Assuming all APIs work in unpackaged mode
```

---

### Use single-project MSIX `[Low]`
Simplified packaging for single app

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/single-project-msix](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/single-project-msix)

- **Do:** Single-project MSIX packaging
- **Don't:** Separate WAP project when not needed

**Recommended:**
```
<EnableMsixTooling>true</EnableMsixTooling> in csproj
```

**Avoid:**
```
Separate Windows Application Packaging project for simple apps
```

---

## Accessibility

### Set AutomationProperties `[High]`
Enable Narrator and screen reader support

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/accessibility/basic-accessibility-information](https://learn.microsoft.com/en-us/windows/apps/design/accessibility/basic-accessibility-information)

- **Do:** AutomationProperties.Name on all interactive controls
- **Don't:** Controls without accessible names

**Recommended:**
```
<Button AutomationProperties.Name="Save document"><FontIcon Glyph="&#xE74E;"/></Button>
```

**Avoid:**
```
<Button><FontIcon Glyph="&#xE74E;"/></Button> without name
```

---

### Support keyboard navigation `[High]`
Full keyboard accessibility

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-interactions](https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-interactions)

- **Do:** Tab navigation and access keys for all controls
- **Don't:** Mouse-only interactions

**Recommended:**
```
<Button AccessKey="S" Content="Save"/>
```

**Avoid:**
```
Interactive elements unreachable by keyboard
```

---

### Use proper heading levels `[Medium]`
Screen readers use headings for navigation

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/accessibility/basic-accessibility-information](https://learn.microsoft.com/en-us/windows/apps/design/accessibility/basic-accessibility-information)

- **Do:** AutomationProperties.HeadingLevel on section headers
- **Don't:** All text at same heading level

**Recommended:**
```
<TextBlock AutomationProperties.HeadingLevel="Level1" Text="Settings"/>
```

**Avoid:**
```
<TextBlock Style="{StaticResource TitleTextBlockStyle}"/> without heading level
```

---

### Support high contrast `[High]`
Respect system high contrast settings

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/design/accessibility/high-contrast-themes](https://learn.microsoft.com/en-us/windows/apps/design/accessibility/high-contrast-themes)

- **Do:** ThemeResource brushes that adapt to high contrast
- **Don't:** Hardcoded colors ignoring high contrast

**Recommended:**
```
Foreground="{ThemeResource TextFillColorPrimaryBrush}"
```

**Avoid:**
```
Foreground="#333333"
```

---

### Test with Accessibility Insights `[Medium]`
Validate accessibility compliance

**Applies to:** winui current windows app sdk
**Documentation:** [https://accessibilityinsights.io/](https://accessibilityinsights.io/)

- **Do:** Accessibility Insights for Windows scanning
- **Don't:** Manual accessibility checking only

**Recommended:**
```
Run Accessibility Insights FastPass on every page
```

**Avoid:**
```
Ship without accessibility testing
```

---

### Use KeyboardAccelerator for shortcuts `[High]`
Map Ctrl/Alt/Shift combinations to commands using KeyboardAccelerator on UIElement

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators](https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators)

- **Do:** KeyboardAccelerator with Modifiers and Key on relevant controls
- **Don't:** Manual KeyDown handlers swallowing shortcuts

**Recommended:**
```
<Button Command="{x:Bind SaveCommand}"><Button.KeyboardAccelerators><KeyboardAccelerator Modifiers="Control" Key="S"/></Button.KeyboardAccelerators></Button>
```

**Avoid:**
```
Window.PreviewKeyDown="OnKeyDown" with switch over args.Key
```

---

## Architecture

### Use MVVM with CommunityToolkit `[Medium]`
Source generators reduce boilerplate

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/)

- **Do:** [ObservableProperty] and [RelayCommand] attributes
- **Don't:** Manual INotifyPropertyChanged and ICommand

**Recommended:**
```
[ObservableProperty] private string _title; [RelayCommand] private void Save() { }
```

**Avoid:**
```
Full INotifyPropertyChanged implementation per property
```

---

### Use dependency injection `[Medium]`
Register services with Microsoft.Extensions.DI

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview)

- **Do:** IServiceProvider for ViewModel and service resolution
- **Don't:** new ViewModel() and new Service() everywhere

**Recommended:**
```
services.AddTransient<MainViewModel>(); services.AddSingleton<IDataService, DataService>();
```

**Avoid:**
```
new MainViewModel(new DataService()) in code-behind
```

---

### Use Template Studio patterns `[Low]`
Start with proven architectural templates

**Applies to:** winui current windows app sdk
**Documentation:** [https://github.com/microsoft/TemplateStudio](https://github.com/microsoft/TemplateStudio)

- **Do:** Template Studio for WinUI 3 project scaffolding
- **Don't:** Blank project with manual setup for complex apps

**Recommended:**
```
WinUI 3 Template Studio with MVVM and navigation
```

**Avoid:**
```
Blank App template for production app
```

---

### Separate platform from business logic `[Medium]`
Keep business logic in .NET Standard or shared libraries

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/)

- **Do:** Business logic in separate class library
- **Don't:** Business logic mixed with WinUI types

**Recommended:**
```
Shared.Core project with no WinUI references
```

**Avoid:**
```
ViewModel importing Microsoft.UI.Xaml types
```

---

### Use WinUI 3 Window management `[Medium]`
Proper window lifecycle management

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/manage-app-windows](https://learn.microsoft.com/en-us/windows/apps/develop/ui/manage-app-windows)

- **Do:** AppWindow API for multi-window scenarios
- **Don't:** Single Window assumption in complex apps

**Recommended:**
```
var appWindow = this.AppWindow;
```

**Avoid:**
```
Relying solely on MainWindow for everything
```

---

### Open secondary windows with new Window `[Medium]`
WinUI 3 supports multiple top-level windows; each Window owns an AppWindow accessible via Window.AppWindow for size and position control

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/manage-app-windows](https://learn.microsoft.com/en-us/windows/apps/develop/ui/manage-app-windows)

- **Do:** new Window().Activate() for secondary windows tracking them in App state
- **Don't:** Faking multi-window via main-window content swaps or ContentDialog

**Recommended:**
```
var settings = new SettingsWindow(); settings.Activate();
```

**Avoid:**
```
MainWindow.Content = new SettingsView(); when a separate window is needed
```

---

### Extend client area into the title bar `[Medium]`
Use Window.ExtendsContentIntoTitleBar with SetTitleBar to host custom XAML in the chrome while preserving caption buttons

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/title-bar](https://learn.microsoft.com/en-us/windows/apps/develop/title-bar)

- **Do:** ExtendsContentIntoTitleBar=true plus SetTitleBar(element) for custom drag region
- **Don't:** Hardcoded chrome height or custom caption buttons that break with theme and size changes

**Recommended:**
```
this.ExtendsContentIntoTitleBar = true; this.SetTitleBar(AppTitleBar);
```

**Avoid:**
```
Padding="0,32,0,0" to reserve space without SetTitleBar leaves window non-draggable
```

---

### Use AsyncRelayCommand for async commands `[Medium]`
AsyncRelayCommand exposes IsRunning and supports cancellation for IO bound work

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/asyncrelaycommand](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/asyncrelaycommand)

- **Do:** [RelayCommand] on async Task method or AsyncRelayCommand for IO work
- **Don't:** async void event handlers or fire-and-forget Task.Run from button click

**Recommended:**
```
[RelayCommand] private async Task LoadAsync(CancellationToken ct) { Items = await _service.FetchAsync(ct); }
```

**Avoid:**
```
private async void Button_Click(object s, RoutedEventArgs e) { await LoadAsync(); }
```

---

### Use ILogger for structured logging `[Medium]`
Microsoft.Extensions.Logging ILogger<T> with DI for structured leveled logs

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/extensions/logging/overview](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging/overview)

- **Do:** ILogger<T> injected via constructor for diagnostic logging
- **Don't:** Debug.WriteLine or Console.WriteLine for app diagnostics

**Recommended:**
```
public MainViewModel(ILogger<MainViewModel> logger) { _logger = logger; } _logger.LogInformation("Loaded {Count} items", count);
```

**Avoid:**
```
Debug.WriteLine($"Loaded {count} items");
```

---

## Testing

### Unit test ViewModels `[Medium]`
Test logic independent of UI framework

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

- **Do:** xUnit or MSTest on ViewModel properties and commands
- **Don't:** Testing through UI only

**Recommended:**
```
[Fact] public async Task LoadItems_PopulatesCollection() { await vm.LoadCommand.ExecuteAsync(null); Assert.NotEmpty(vm.Items); }
```

**Avoid:**
```
Manual testing by running the app
```

---

### Use WinAppDriver for UI tests `[Medium]`
Automated UI testing for WinUI 3

**Applies to:** winui current windows app sdk
**Documentation:** [https://github.com/microsoft/WinAppDriver](https://github.com/microsoft/WinAppDriver)

- **Do:** WinAppDriver or Appium for end-to-end tests
- **Don't:** Manual regression testing

**Recommended:**
```
var element = session.FindElementByAccessibilityId("SaveButton"); element.Click();
```

**Avoid:**
```
Click-through manual testing
```

---

### Mock WinRT APIs in tests `[Medium]`
Isolate tests from platform dependencies

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

- **Do:** Interface wrappers around WinRT APIs
- **Don't:** Direct WinRT API calls in testable code

**Recommended:**
```
IFileService wrapping StorageFile APIs
```

**Avoid:**
```
StorageFile.GetFileFromPathAsync directly in ViewModel
```

---

## Layout

### Use VisualStateManager for responsive layouts `[High]`
Adapt UI layout to window size using adaptive triggers

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml)

- **Do:** AdaptiveTrigger with MinWindowWidth for responsive breakpoints
- **Don't:** Fixed layouts that break at different window sizes

**Recommended:**
```
<VisualState><VisualState.StateTriggers><AdaptiveTrigger MinWindowWidth="720"/></VisualState.StateTriggers><VisualState.Setters><Setter Target="sidebar.Visibility" Value="Visible"/></VisualState.Setters></VisualState>
```

**Avoid:**
```
Fixed two-column layout at all window sizes
```

---

## Lifecycle

### Handle app activation and launch `[Medium]`
WinUI 3 apps receive activation events for URI and notification launches

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-rich-activation](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-rich-activation)

- **Do:** Check LaunchActivatedEventArgs in OnLaunched for activation context
- **Don't:** Ignoring activation arguments losing deep link context

**Recommended:**
```
protected override void OnLaunched(LaunchActivatedEventArgs args) { if (args.Arguments.Contains("settings")) NavigateToSettings(); }
```

**Avoid:**
```
Empty OnLaunched ignoring all activation parameters
```

---

### Use single instancing with AppInstance `[Medium]`
Prevent multiple app windows competing for resources

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-instancing](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/applifecycle/applifecycle-instancing)

- **Do:** AppInstance.FindOrRegisterForKey for single-instance enforcement
- **Don't:** Multiple instances with conflicting state

**Recommended:**
```
var instance = AppInstance.FindOrRegisterForKey("main"); if (!instance.IsCurrent) { await instance.RedirectActivationToAsync(args); }
```

**Avoid:**
```
No instance management allowing duplicate windows
```

---

### Save and restore app state `[Medium]`
Persist UI state across app restarts for continuity (ApplicationData APIs require packaged apps; unpackaged apps must use file IO or registry)

**Applies to:** winui current windows app sdk
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/data/store-and-retrieve-app-data](https://learn.microsoft.com/en-us/windows/apps/develop/data/store-and-retrieve-app-data)

- **Do:** Save state to local settings on window close or navigation
- **Don't:** Losing user context on every restart

**Recommended:**
```
ApplicationData.Current.LocalSettings.Values["lastPage"] = currentPage;
```

**Avoid:**
```
No state persistence losing navigation position on restart
```

---
