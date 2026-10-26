# Avalonia Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`avalonia.csv`)
> Framework: Avalonia
> Rules Count: 56 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Avalonia** projects.

---

## XAML

### Use Avalonia XAML namespace `[High]`
Avalonia has its own XAML namespace not WPF

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/fundamentals/avalonia-xaml](https://docs.avaloniaui.net/docs/fundamentals/avalonia-xaml)

- **Do:** xmlns= for Avalonia-specific namespace
- **Don't:** WPF xmlns or UWP xmlns

**Recommended:**
```
<Window xmlns="https://github.com/avaloniaui">
```

**Avoid:**
```
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
```

---

### Use compiled bindings with x:DataType `[High]`
Enable compile-time binding validation

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/compiled-bindings](https://docs.avaloniaui.net/docs/data-binding/compiled-bindings)

- **Do:** x:DataType on root or DataTemplate for compiled bindings
- **Don't:** Reflection-based bindings in production

**Recommended:**
```
<Window x:DataType="vm:MainViewModel"><TextBlock Text="{Binding Name}"/></Window>
```

**Avoid:**
```
<Window><TextBlock Text="{Binding Name}"/> without x:DataType
```

---

### Enable compiled bindings globally `[High]`
Avalonia 12 enables AvaloniaUseCompiledBindingsByDefault by default so every binding requires x:DataType and remains trim-safe for Native AOT

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/compiled-bindings](https://docs.avaloniaui.net/docs/data-binding/compiled-bindings)

- **Do:** Keep the Avalonia 12 default or set AvaloniaUseCompiledBindingsByDefault explicitly when documenting the project contract
- **Don't:** Disable compiled bindings or rely on runtime binding resolution

**Recommended:**
```
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

**Avoid:**
```
<AvaloniaUseCompiledBindingsByDefault>false</AvaloniaUseCompiledBindingsByDefault>
```

---

### Use #name shorthand for element-to-element bindings `[Medium]`
Compiled bindings cannot resolve {Binding ElementName=...} - use the #name shorthand which relies on NameScope lookup

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/compiled-bindings](https://docs.avaloniaui.net/docs/data-binding/compiled-bindings)

- **Do:** #name shorthand referencing x:Name controls in the same NameScope
- **Don't:** ElementName binding inside a compiled-binding scope

**Recommended:**
```
<TextBlock Text="{Binding #SearchBox.Text}"/>
```

**Avoid:**
```
<TextBlock Text="{Binding ElementName=SearchBox, Path=Text}"/> under compiled bindings
```

---

## Styling

### Use CSS-like selectors `[High]`
Avalonia uses selectors not implicit styles

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/selectors](https://docs.avaloniaui.net/docs/styling/selectors)

- **Do:** Selectors targeting control types classes and pseudoclasses
- **Don't:** WPF-style implicit Style with TargetType

**Recommended:**
```
<Style Selector="Button.primary"><Setter Property="Background" Value="Blue"/></Style>
```

**Avoid:**
```
<Style TargetType="Button"> without Selector
```

---

### Use pseudoclass selectors for states `[Medium]`
Target control states with colon syntax

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/pseudoclasses](https://docs.avaloniaui.net/docs/styling/pseudoclasses)

- **Do:** :pointerover :pressed :focus for interactive states
- **Don't:** VisualStateManager or Triggers

**Recommended:**
```
<Style Selector="Button:pointerover"><Setter Property="Opacity" Value="0.8"/></Style>
```

**Avoid:**
```
<VisualStateManager> for hover effects
```

---

### Use nesting selectors `[Medium]`
Child and descendant combinators for scoped styles

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/style-selector-syntax](https://docs.avaloniaui.net/docs/styling/style-selector-syntax)

- **Do:** > for direct child and space for descendant
- **Don't:** Flat selectors that match too broadly

**Recommended:**
```
<Style Selector="StackPanel > Button"><Setter Property="Margin" Value="4"/></Style>
```

**Avoid:**
```
<Style Selector="Button"> that affects all buttons unintentionally
```

---

### Use StyleInclude for modularity `[Medium]`
Split styles into separate AXAML files

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/styles](https://docs.avaloniaui.net/docs/styling/styles)

- **Do:** StyleInclude to import themed resource files
- **Don't:** All styles in a single monolithic App.axaml

**Recommended:**
```
<StyleInclude Source="/Styles/ButtonStyles.axaml"/>
```

**Avoid:**
```
1000+ line App.axaml with all styles
```

---

### Use Fluent or Simple theme `[High]`
Built-in Avalonia themes

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/themes](https://docs.avaloniaui.net/docs/styling/themes)

- **Do:** FluentTheme or SimpleTheme as base
- **Don't:** Custom theme from scratch

**Recommended:**
```
<FluentTheme/>
```

**Avoid:**
```
Building all control templates manually
```

---

### Use theme variants for dark mode `[Medium]`
Switch between light and dark

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/styling/themes](https://docs.avaloniaui.net/docs/styling/themes)

- **Do:** RequestedThemeVariant for theme switching
- **Don't:** Hardcoded colors ignoring theme variants

**Recommended:**
```
Application.Current.RequestedThemeVariant = ThemeVariant.Dark;
```

**Avoid:**
```
Manually changing every brush for dark mode
```

---

### Use DynamicResource for theme-aware brushes `[Medium]`
ResourceDictionary.ThemeDictionaries entries must be looked up via DynamicResource - StaticResource resolves once at load and won't update when the active theme variant changes

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/app-development/resource-dictionary](https://docs.avaloniaui.net/docs/app-development/resource-dictionary)

- **Do:** DynamicResource for brushes and colors that follow the active theme variant
- **Don't:** Hardcoded hex colors or StaticResource for values that should follow theme

**Recommended:**
```
<Border Background="{DynamicResource SystemControlBackgroundAccentBrush}"/>
```

**Avoid:**
```
<Border Background="#FF0078D4"/> while the rest of the app honors light/dark variants
```

---

## Controls

### Use DataGrid for tabular data `[Medium]`
DataGrid is a separate Avalonia.Controls.DataGrid NuGet package and requires its theme StyleInclude in App.axaml

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/datagrid/](https://docs.avaloniaui.net/docs/reference/controls/datagrid/)

- **Do:** DataGrid after adding package and StyleInclude for the matching theme
- **Don't:** Custom Grid layouts for tabular data or DataGrid without the theme StyleInclude

**Recommended:**
```
<DataGrid ItemsSource="{Binding Items}" AutoGenerateColumns="False"/> with <StyleInclude Source="avares://Avalonia.Controls.DataGrid/Themes/Fluent.xaml"/> in App.axaml
```

**Avoid:**
```
<DataGrid/> with no package reference or no StyleInclude (renders unstyled)
```

---

### Use TreeView with TreeDataTemplate `[High]`
Avalonia uses TreeDataTemplate for hierarchical data - HierarchicalDataTemplate is WPF only

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/treeview-1](https://docs.avaloniaui.net/docs/reference/controls/treeview-1)

- **Do:** TreeDataTemplate inside TreeView.ItemTemplate with ItemsSource pointing at child collection
- **Don't:** HierarchicalDataTemplate copied from WPF or nested ItemsControls

**Recommended:**
```
<TreeView ItemsSource="{Binding Nodes}"><TreeView.ItemTemplate><TreeDataTemplate ItemsSource="{Binding Children}"><TextBlock Text="{Binding Name}"/></TreeDataTemplate></TreeView.ItemTemplate></TreeView>
```

**Avoid:**
```
<TreeView><TreeView.ItemTemplate><HierarchicalDataTemplate/></TreeView.ItemTemplate></TreeView> // HierarchicalDataTemplate does not exist in Avalonia
```

---

### Use NativeMenu for platform menus `[Medium]`
Native menu bar on macOS and desktop

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/nativemenu](https://docs.avaloniaui.net/docs/reference/controls/nativemenu)

- **Do:** NativeMenu for cross-platform menu bar
- **Don't:** Custom menu implementation per platform

**Recommended:**
```
<NativeMenu.Menu><NativeMenu><NativeMenuItem Header="File"/></NativeMenu></NativeMenu.Menu>
```

**Avoid:**
```
Custom menu bar control for each platform
```

---

### Use AutoCompleteBox for search `[Medium]`
Built-in autocomplete and suggestion control

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/autocompletebox](https://docs.avaloniaui.net/docs/reference/controls/autocompletebox)

- **Do:** AutoCompleteBox with FilterMode and ItemsSource
- **Don't:** TextBox with manual Popup and ListBox for suggestions

**Recommended:**
```
<AutoCompleteBox ItemsSource="{Binding Suggestions}" FilterMode="Contains"/>
```

**Avoid:**
```
TextBox with custom Popup for autocomplete
```

---

### Use TabControl for tabbed interfaces `[Medium]`
Standard tabbed navigation and content switching

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/tabcontrol](https://docs.avaloniaui.net/docs/reference/controls/tabcontrol)

- **Do:** TabControl with TabItem for tabbed layouts
- **Don't:** Manual toggle buttons swapping content

**Recommended:**
```
<TabControl><TabItem Header="General"><GeneralView/></TabItem><TabItem Header="Advanced"><AdvancedView/></TabItem></TabControl>
```

**Avoid:**
```
ToggleButtons with manual content switching logic
```

---

### Use SplitView for master-detail `[Medium]`
Collapsible pane layout for navigation or panels

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/splitview](https://docs.avaloniaui.net/docs/reference/controls/splitview)

- **Do:** SplitView with Pane and Content areas
- **Don't:** Manual Grid with column toggling for sidebar

**Recommended:**
```
<SplitView IsPaneOpen="{Binding IsPaneOpen}" DisplayMode="Inline"><SplitView.Pane><ListBox/></SplitView.Pane><ContentControl/></SplitView>
```

**Avoid:**
```
Grid with manual column width animation for sidebar
```

---

### Use Flyout for contextual actions `[Medium]`
Attach popup menus and actions to controls

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/flyouts](https://docs.avaloniaui.net/docs/reference/controls/flyouts)

- **Do:** Flyout and MenuFlyout on Button or other controls
- **Don't:** Custom Popup positioning and management

**Recommended:**
```
<Button Content="Options"><Button.Flyout><MenuFlyout><MenuItem Header="Edit"/><MenuItem Header="Delete"/></MenuFlyout></Button.Flyout></Button>
```

**Avoid:**
```
Custom Popup with manual open/close and positioning
```

---

## Data Binding

### Implement INotifyPropertyChanged `[High]`
Standard .NET property notification

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/inotifypropertychanged](https://docs.avaloniaui.net/docs/data-binding/inotifypropertychanged)

- **Do:** INotifyPropertyChanged or CommunityToolkit.Mvvm
- **Don't:** Properties without change notification

**Recommended:**
```
[ObservableProperty] private string _name;
```

**Avoid:**
```
public string Name { get; set; } without notification
```

---

### Use ObservableCollection for lists `[High]`
UI updates on collection changes

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/inotifypropertychanged](https://docs.avaloniaui.net/docs/data-binding/inotifypropertychanged)

- **Do:** ObservableCollection<T> for bound collections
- **Don't:** List<T> for ItemsSources

**Recommended:**
```
ObservableCollection<Item> Items { get; } = new();
```

**Avoid:**
```
List<Item> Items { get; set; }
```

---

### Use binding to named controls `[Medium]`
Element-to-element binding with # syntax

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/introduction-to-data-binding](https://docs.avaloniaui.net/docs/data-binding/introduction-to-data-binding)

- **Do:** #ElementName.Property for cross-element binding
- **Don't:** Code-behind for element references

**Recommended:**
```
<TextBlock Text="{Binding #slider.Value, StringFormat='{}{0:F0}'}"/>
```

**Avoid:**
```
Code-behind ValueChanged handler to update TextBlock
```

---

### Use converters or FuncValueConverter `[Medium]`
Transform data for display

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/how-to-create-a-custom-data-binding-converter](https://docs.avaloniaui.net/docs/data-binding/how-to-create-a-custom-data-binding-converter)

- **Do:** FuncValueConverter for simple inline conversions
- **Don't:** Complex IValueConverter classes for trivial transforms

**Recommended:**
```
public static FuncValueConverter<bool, IBrush> BoolToColor = new(b => b ? Brushes.Green : Brushes.Red);
```

**Avoid:**
```
Full IValueConverter class for bool to color
```

---

## Cross-Platform

### Use platform-specific code carefully `[Medium]`
Isolate platform code behind abstractions

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/](https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/)

- **Do:** Interface + platform implementation pattern
- **Don't:** #if directives scattered through ViewModels

**Recommended:**
```
IPlatformService with platform-specific implementations
```

**Avoid:**
```
#if WINDOWS ... #elif LINUX ... in ViewModel
```

---

### Test on all target platforms `[High]`
Rendering and behavior varies across platforms

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/](https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/)

- **Do:** CI testing on Windows macOS and Linux
- **Don't:** Testing only on development platform

**Recommended:**
```
GitHub Actions matrix with windows-latest ubuntu-latest macos-latest
```

**Avoid:**
```
Testing only on Windows assuming cross-platform works
```

---

### Handle platform file paths `[Medium]`
Path separators differ across OS

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/dealing-with-platforms](https://docs.avaloniaui.net/docs/guides/building-cross-platform-applications/dealing-with-platforms)

- **Do:** Path.Combine and Environment.SpecialFolder
- **Don't:** Hardcoded backslashes or forward slashes

**Recommended:**
```
Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "MyApp")
```

**Avoid:**
```
@"C:\Users\data\config.json"
```

---

### Use Avalonia asset system `[High]`
Platform-agnostic resource loading

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/fundamentals/including-assets](https://docs.avaloniaui.net/docs/fundamentals/including-assets)

- **Do:** avares:// URI scheme for embedded resources
- **Don't:** File system paths for assets

**Recommended:**
```
<Image Source="avares://MyApp/Assets/logo.png"/>
```

**Avoid:**
```
<Image Source="C:/images/logo.png"/>
```

---

### Use OnPlatform and OnFormFactor markup for per-OS values `[Medium]`
OnPlatform and OnFormFactor markup extensions resolve to a different value per OS or form factor at XAML load time and replace if-statements in code-behind for tweaks like fonts spacing or icon sizes

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/platform-specific-guides/xaml](https://docs.avaloniaui.net/docs/platform-specific-guides/xaml)

- **Do:** OnPlatform with Default Windows macOS Linux entries directly in the property setter
- **Don't:** RuntimeInformation.IsOSPlatform branches in code-behind to set XAML properties

**Recommended:**
```
<TextBlock FontFamily="{OnPlatform Default='Inter', Windows='Segoe UI', macOS='SF Pro Text', Linux='Ubuntu'}"/>
```

**Avoid:**
```
if (OperatingSystem.IsWindows()) textBlock.FontFamily = new("Segoe UI"); else if (OperatingSystem.IsMacOS()) ...
```

---

## Performance

### Use virtualization for large lists `[High]`
Only render visible items

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/listbox](https://docs.avaloniaui.net/docs/reference/controls/listbox)

- **Do:** ListBox and ItemsRepeater with virtualization
- **Don't:** Non-virtualizing ItemsControl for large lists

**Recommended:**
```
<ListBox ItemsSource="{Binding LargeList}"/>
```

**Avoid:**
```
<ItemsControl><StackPanel> for 10K items
```

---

### Avoid unnecessary bindings `[Low]`
Each binding has overhead

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/introduction-to-data-binding](https://docs.avaloniaui.net/docs/data-binding/introduction-to-data-binding)

- **Do:** Bind only properties that change
- **Don't:** Binding static labels and headers

**Recommended:**
```
<TextBlock Text="{Binding DynamicTitle}"/> but static: <TextBlock Text="Settings"/>
```

**Avoid:**
```
<TextBlock Text="{Binding SettingsLabel}"/> for constant string
```

---

### Set bitmap interpolation mode on scaled images `[Low]`
RenderOptions.BitmapInterpolationMode controls image scaling quality vs cost; default may look aliased on upscaled or downscaled bitmaps

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/concepts/image-interpolation](https://docs.avaloniaui.net/docs/concepts/image-interpolation)

- **Do:** RenderOptions.SetBitmapInterpolationMode tuned to the use case
- **Don't:** Default interpolation on scaled images that look blurry or aliased

**Recommended:**
```
RenderOptions.SetBitmapInterpolationMode(image, BitmapInterpolationMode.HighQuality);
```

**Avoid:**
```
Image scaled with Stretch and no interpolation hint set
```

---

### Profile with Avalonia DevTools `[Medium]`
Built-in diagnostic tools

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/guides/implementation-guides/developer-tools](https://docs.avaloniaui.net/docs/guides/implementation-guides/developer-tools)

- **Do:** DevTools for visual tree and binding inspection
- **Don't:** Console.WriteLine debugging

**Recommended:**
```
Attach DevTools in debug mode with F12
```

**Avoid:**
```
Print statements to debug layout issues
```

---

### Use compiled bindings and TrimmerRoots.xml for PublishAot `[Medium]`
Avalonia 11+ supports Native AOT for self-contained desktop deployments; XAML reflection paths must use compiled bindings or be preserved via TrimmerRoots so trimming does not strip them

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/deployment/native-aot](https://docs.avaloniaui.net/docs/deployment/native-aot)

- **Do:** x:CompileBindings=True on every view plus TrimmerRoots.xml for runtime-resolved types
- **Don't:** PublishAot with reflection-based {Binding} markup or trimming without checking warnings

**Recommended:**
```
<UserControl x:CompileBindings="True" x:DataType="vm:MainViewModel"/> with <PublishAot>true</PublishAot> and TrimmerRoots.xml listing reflected types
```

**Avoid:**
```
<PublishAot>true</PublishAot> with default <Binding> markup and no TrimmerRoots configuration
```

---

## Architecture

### Use MVVM with ReactiveUI or CommunityToolkit `[High]`
Proven MVVM frameworks for Avalonia

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/how-to/mvvm-how-to](https://docs.avaloniaui.net/docs/how-to/mvvm-how-to)

- **Do:** ReactiveUI or CommunityToolkit.Mvvm for ViewModels
- **Don't:** Code-behind for all logic

**Recommended:**
```
public class MainViewModel : ReactiveObject { }
```

**Avoid:**
```
MainWindow.axaml.cs with all business logic
```

---

### Use ViewLocator pattern `[Medium]`
Convention-based View-ViewModel resolution

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-templates/view-locator](https://docs.avaloniaui.net/docs/data-templates/view-locator)

- **Do:** ViewLocator for automatic view resolution
- **Don't:** Manual view instantiation and DataContext wiring

**Recommended:**
```
class ViewLocator : IDataTemplate { Build(object data) => new MainView(); }
```

**Avoid:**
```
new MainView { DataContext = new MainViewModel() } everywhere
```

---

### Use dependency injection `[Medium]`
Register services in a Microsoft.Extensions.DependencyInjection container during startup before any view is constructed - resolve ViewModels through the provider not via a static ServiceLocator

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/app-development/dependency-injection](https://docs.avaloniaui.net/docs/app-development/dependency-injection)

- **Do:** Build the ServiceProvider in BuildAvaloniaApp or OnFrameworkInitializationCompleted then resolve ViewModels from it
- **Don't:** Static ServiceLocator or new-ing ViewModels inline in code-behind

**Recommended:**
```
services.AddSingleton<IDataService, DataService>(); services.AddTransient<MainViewModel>(); var provider = services.BuildServiceProvider(); // wired before windows are created
```

**Avoid:**
```
ServiceLocator.Current.GetInstance<IDataService>() called from random ViewModels with no registration ordering
```

---

### Separate Views from ViewModels `[Medium]`
Keep UI and logic in separate projects

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/how-to/mvvm-how-to](https://docs.avaloniaui.net/docs/how-to/mvvm-how-to)

- **Do:** ViewModels in a separate class library
- **Don't:** ViewModels in the same project referencing Avalonia types

**Recommended:**
```
MyApp.Core (no Avalonia refs) + MyApp.Desktop (Avalonia views)
```

**Avoid:**
```
ViewModel importing Avalonia.Controls
```

---

## Accessibility

### Set AutomationProperties `[High]`
Enable screen reader support

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/api/avalonia/automation/automationproperties](https://docs.avaloniaui.net/api/avalonia/automation/automationproperties)

- **Do:** AutomationProperties.Name on interactive controls
- **Don't:** Controls without accessible names

**Recommended:**
```
<Button AutomationProperties.Name="Close dialog"><PathIcon Data="..."/></Button>
```

**Avoid:**
```
<Button><PathIcon/></Button> without accessible name
```

---

### Support keyboard navigation `[High]`
Full keyboard operability

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/input-interaction/keyboard-and-hotkeys](https://docs.avaloniaui.net/docs/input-interaction/keyboard-and-hotkeys)

- **Do:** TabIndex and KeyboardNavigation properties
- **Don't:** Mouse-only interactions

**Recommended:**
```
<Button TabIndex="1" Content="Save"/>
```

**Avoid:**
```
Clickable controls without keyboard support
```

---

### Use semantic control types `[High]`
Controls convey meaning to assistive tech

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/](https://docs.avaloniaui.net/docs/reference/controls/)

- **Do:** Button for actions ListBox for selection
- **Don't:** TextBlock with PointerPressed as fake button

**Recommended:**
```
<Button Content="Submit"/>
```

**Avoid:**
```
<TextBlock PointerPressed="OnSubmitClick" Text="Submit"/>
```

---

## Testing

### Use Avalonia.Headless for UI tests `[Medium]`
Run UI tests without display server

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/concepts/headless/](https://docs.avaloniaui.net/docs/concepts/headless/)

- **Do:** Avalonia.Headless for CI-compatible UI testing
- **Don't:** Skipping UI tests in CI

**Recommended:**
```
[AvaloniaTest] public void Button_Click_Updates_Label() { ... }
```

**Avoid:**
```
UI tests that require a display server
```

---

### Unit test ViewModels `[Medium]`
Test business logic independently

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/concepts/headless/](https://docs.avaloniaui.net/docs/concepts/headless/)

- **Do:** xUnit or NUnit on ViewModel methods
- **Don't:** Testing through UI only

**Recommended:**
```
[Fact] public void AddItem_IncreasesCount() { vm.AddItem(); Assert.Equal(1, vm.Items.Count); }
```

**Avoid:**
```
Manual testing by running the app
```

---

### Test converters independently `[Low]`
Value converters contain testable logic

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/data-binding/how-to-create-a-custom-data-binding-converter](https://docs.avaloniaui.net/docs/data-binding/how-to-create-a-custom-data-binding-converter)

- **Do:** Unit tests on Convert and ConvertBack
- **Don't:** Assuming converters work without tests

**Recommended:**
```
[Fact] public void BoolToColor_True_ReturnsGreen() { Assert.Equal(Brushes.Green, converter.Convert(true)); }
```

**Avoid:**
```
No converter tests
```

---

## Navigation

### Use ReactiveUI routing for navigation `[Medium]`
IScreen and RoutingState for page navigation

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/how-to/navigation-how-to](https://docs.avaloniaui.net/docs/how-to/navigation-how-to)

- **Do:** ReactiveUI RoutingState with IScreen on main ViewModel
- **Don't:** Manual content swapping in code-behind

**Recommended:**
```
public RoutingState Router { get; } = new(); Router.Navigate.Execute(new DetailViewModel());
```

**Avoid:**
```
contentControl.Content = new DetailView(); in code-behind
```

---

### Use UserControl for views `[Medium]`
Pages and screens should be UserControls hosted in a ContentControl

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/custom-controls/](https://docs.avaloniaui.net/docs/custom-controls/)

- **Do:** UserControl for each view with RoutedViewHost or ContentControl
- **Don't:** Window per page or nested Windows

**Recommended:**
```
<UserControl x:Class="MyApp.Views.DetailView">
```

**Avoid:**
```
new Window() for each page in the app
```

---

### Use page transitions for view switching `[Low]`
Built-in transitions for smooth navigation

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/reference/controls/transitioningcontentcontrol](https://docs.avaloniaui.net/docs/reference/controls/transitioningcontentcontrol)

- **Do:** CrossFade PageSlide or CompositePageTransition declared as a property element
- **Don't:** Abrupt content swaps with no visual continuity

**Recommended:**
```
<RoutedViewHost><RoutedViewHost.PageTransition><PageSlide Orientation="Horizontal" Duration="0:0:0.3"/></RoutedViewHost.PageTransition></RoutedViewHost>
```

**Avoid:**
```
ContentControl with no transition between views
```

---

### Support back navigation `[Medium]`
Maintain navigation history for complex apps

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/how-to/navigation-how-to](https://docs.avaloniaui.net/docs/how-to/navigation-how-to)

- **Do:** Router.NavigateBack or custom back stack
- **Don't:** No way to return to previous views

**Recommended:**
```
<Button Command="{Binding Router.NavigateBack}" Content="Back"/>
```

**Avoid:**
```
Single-direction navigation with no back support
```

---

## Lifecycle

### Use AppBuilder for app configuration `[High]`
Configure platform features and services at startup

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/fundamentals/application-lifetimes](https://docs.avaloniaui.net/docs/fundamentals/application-lifetimes)

- **Do:** AppBuilder with UsePlatformDetect and fluent API
- **Don't:** Manual platform initialization

**Recommended:**
```
AppBuilder.Configure<App>().UsePlatformDetect().WithInterFont().StartWithClassicDesktopLifetime(args);
```

**Avoid:**
```
Manual platform-specific startup code per OS
```

---

### Initialize MainWindow in OnFrameworkInitializationCompleted `[High]`
Override OnFrameworkInitializationCompleted on App and check ApplicationLifetime - on desktop cast to IClassicDesktopStyleApplicationLifetime to set MainWindow and ShutdownMode; never create windows in the App constructor before the framework is ready

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/fundamentals/application-lifetimes](https://docs.avaloniaui.net/docs/fundamentals/application-lifetimes)

- **Do:** Override OnFrameworkInitializationCompleted and pattern-match on IClassicDesktopStyleApplicationLifetime for desktop-only setup
- **Don't:** Creating windows in the App constructor or assuming the same lifetime type on every platform

**Recommended:**
```
public override void OnFrameworkInitializationCompleted() { if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop) { desktop.MainWindow = new MainWindow(); desktop.ShutdownMode = ShutdownMode.OnMainWindowClose; } base.OnFrameworkInitializationCompleted(); }
```

**Avoid:**
```
public App() { new MainWindow().Show(); } // window created before framework init and ignores lifetime type
```

---

## Animation

### Use CSS-like keyframe animations `[Medium]`
Avalonia supports declarative animations in XAML and code

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/graphics-animation/animations](https://docs.avaloniaui.net/docs/graphics-animation/animations)

- **Do:** Animation with KeyFrame and Setter for property animations
- **Don't:** Manual timer-based property updates

**Recommended:**
```
<Border.Transitions><DoubleTransition Property="Opacity" Duration="0:0:0.3"/></Border.Transitions>
```

**Avoid:**
```
DispatcherTimer ticking to update Opacity manually
```

---

### Use Transitions for implicit animations `[Low]`
Automatic animation when property values change

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/graphics-animation/control-transitions](https://docs.avaloniaui.net/docs/graphics-animation/control-transitions)

- **Do:** Transitions collection on controls for smooth changes
- **Don't:** Instant property changes with no visual feedback

**Recommended:**
```
<Button.Transitions><TransformOperationsTransition Property="RenderTransform" Duration="0:0:0.2"/></Button.Transitions>
```

**Avoid:**
```
Direct property set with no transition
```

---

## Threading

### Marshal cross-thread work to the UI thread `[High]`
Avalonia controls and bound properties are not thread-safe and touching them off the UI thread throws InvalidOperationException

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/app-development/threading](https://docs.avaloniaui.net/docs/app-development/threading)

- **Do:** Dispatcher.UIThread.Post or InvokeAsync to bounce work back to the UI thread
- **Don't:** Direct property writes from Task.Run or background threads

**Recommended:**
```
await Dispatcher.UIThread.InvokeAsync(() => Status = "Done");
```

**Avoid:**
```
Task.Run(() => { Status = "Done"; }); // throws Call from invalid thread
```

---

## Commands

### Use AsyncRelayCommand or ReactiveCommand for async work `[High]`
Async-aware commands disable themselves while running and surface CancellationToken so users cannot double-invoke a long operation

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/input-interaction/commanding](https://docs.avaloniaui.net/docs/input-interaction/commanding)

- **Do:** [RelayCommand] async Task method or ReactiveCommand.CreateFromTask
- **Don't:** async void event handlers or fire-and-forget Task.Run from a click handler

**Recommended:**
```
[RelayCommand] private async Task LoadAsync(CancellationToken ct) { await _api.GetAsync(ct); }
```

**Avoid:**
```
private async void OnClick(object s, RoutedEventArgs e) { await LongOperation(); }
```

---

## Input

### Use HotKey or KeyBinding for keyboard shortcuts `[Medium]`
Built-in HotKey on ICommandSource and Window.KeyBindings handle modifier keys focus scoping and cross-platform Ctrl/Cmd mapping

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/input-interaction/mouse-and-keyboard-shortcuts](https://docs.avaloniaui.net/docs/input-interaction/mouse-and-keyboard-shortcuts)

- **Do:** HotKey on a command-bound control or KeyBinding on the Window
- **Don't:** Manual KeyDown handlers checking Key and KeyModifiers

**Recommended:**
```
<Button Command="{Binding SaveCommand}" HotKey="Ctrl+S" Content="Save"/>
```

**Avoid:**
```
OnKeyDown checking e.Key == Key.S && e.KeyModifiers == KeyModifiers.Control
```

---

## Windowing

### Customize window chrome with ExtendClientAreaToDecorationsHint `[Medium]`
Set ExtendClientAreaToDecorationsHint to extend content into the title bar area and tag a region with WindowDecorationProperties.ElementRole=TitleBar to keep native drag and maximize behavior

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/app-development/window-management](https://docs.avaloniaui.net/docs/app-development/window-management)

- **Do:** ExtendClientAreaToDecorationsHint plus a region tagged ElementRole=TitleBar
- **Don't:** SystemDecorations=None with hand-rolled PointerPressed dragging in code-behind

**Recommended:**
```
<Window ExtendClientAreaToDecorationsHint="True"><Border WindowDecorationProperties.ElementRole="TitleBar"/></Window>
```

**Avoid:**
```
<Window SystemDecorations="None"> with manual BeginMoveDrag from code-behind
```

---

### Use TrayIcon for system tray icon `[Medium]`
TrayIcon shows a native system tray/notification-area icon with a NativeMenu - declare it via the Application.TrayIcon.Icons attached property in App.axaml; works on Windows macOS and most Linux desktops

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/controls/tray-icon](https://docs.avaloniaui.net/docs/controls/tray-icon)

- **Do:** TrayIcon with NativeMenu inside TrayIcon.Icons on the Application
- **Don't:** Custom borderless window pretending to be a tray icon or per-platform native interop

**Recommended:**
```
<TrayIcon.Icons><TrayIcons><TrayIcon Icon="/Assets/tray.ico" ToolTipText="MyApp"><TrayIcon.Menu><NativeMenu><NativeMenuItem Header="Show" Command="{Binding ShowCommand}"/></NativeMenu></TrayIcon.Menu></TrayIcon></TrayIcons></TrayIcon.Icons>
```

**Avoid:**
```
Hidden Window with custom shell-notification-area P/Invoke
```

---

## Storage

### Use TopLevel.StorageProvider for file pickers `[High]`
The legacy OpenFileDialog/SaveFileDialog APIs are obsolete - use TopLevel.GetTopLevel(this).StorageProvider with OpenFilePickerAsync/SaveFilePickerAsync/OpenFolderPickerAsync which returns IStorageFile/IStorageFolder and works on desktop mobile and browser

**Applies to:** avalonia 12
**Documentation:** [https://docs.avaloniaui.net/docs/services/storage/storage-provider](https://docs.avaloniaui.net/docs/services/storage/storage-provider)

- **Do:** TopLevel.StorageProvider with OpenFilePickerAsync and FilePickerOpenOptions
- **Don't:** OpenFileDialog or SaveFileDialog from older Avalonia samples or copied from WPF

**Recommended:**
```
var top = TopLevel.GetTopLevel(this); var files = await top.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions { AllowMultiple = false });
```

**Avoid:**
```
var dlg = new OpenFileDialog(); var paths = await dlg.ShowAsync(window); // obsolete API
```

---
