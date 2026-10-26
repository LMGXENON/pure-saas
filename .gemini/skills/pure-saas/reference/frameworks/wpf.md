# Wpf Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`wpf.csv`)
> Framework: Wpf
> Rules Count: 56 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Wpf** projects.

---

## XAML

### Use XAML for declarative UI `[Low]`
Define layout and visuals in XAML not code-behind

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/)

- **Do:** XAML for structure and styling
- **Don't:** Build UI trees in C# code-behind

**Recommended:**
```
<Button Content="Save" Click="OnSave"/>
```

**Avoid:**
```
var btn = new Button(); btn.Content = "Save";
```

---

### Set x:Class on root element `[High]`
Connects XAML to its code-behind partial class

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/)

- **Do:** x:Class on Window UserControl and Page
- **Don't:** Missing x:Class or mismatched namespace

**Recommended:**
```
<Window x:Class="MyApp.MainWindow">
```

**Avoid:**
```
<Window> without x:Class
```

---

### Use x:Name sparingly `[Low]`
Only name elements accessed from code-behind

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/)

- **Do:** x:Name when code-behind reference is needed
- **Don't:** Naming every element

**Recommended:**
```
<TextBox x:Name="SearchBox"/>
```

**Avoid:**
```
x:Name on every control
```

---

### Prefer attached properties for layout `[Medium]`
Grid.Row Grid.Column DockPanel.Dock etc

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/attached-properties-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/attached-properties-overview)

- **Do:** Attached properties for panel positioning
- **Don't:** Margin hacks for alignment

**Recommended:**
```
<Button Grid.Row="1" Grid.Column="2"/>
```

**Avoid:**
```
<Button Margin="200,100,0,0"/>
```

---

### Use routed events for tree-wide handling `[Medium]`
Events bubble up or tunnel down the element tree letting parents handle child events with one handler

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/events/routed-events-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/events/routed-events-overview)

- **Do:** Handler at parent using TypeName.EventName syntax with e.Handled=true when consumed
- **Don't:** Wiring identical handlers on every child when one parent handler suffices

**Recommended:**
```
<StackPanel Button.Click="OnAnyButtonClick">
```

**Avoid:**
```
Click="OnClick" repeated on every Button under a common parent
```

---

## Data Binding

### Implement INotifyPropertyChanged `[High]`
Enable UI updates when properties change

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-implement-property-change-notification](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-implement-property-change-notification)

- **Do:** INotifyPropertyChanged on ViewModels
- **Don't:** Public properties without notification

**Recommended:**
```
public string Name { get => _name; set { if (_name != value) { _name = value; OnPropertyChanged(); } } }
```

**Avoid:**
```
public string Name { get; set; } without notification
```

---

### Use ObservableCollection for lists `[High]`
Notifies UI of add remove and reset

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1)

- **Do:** ObservableCollection<T> for bound collections
- **Don't:** List<T> or Array for bound ItemsSources

**Recommended:**
```
ObservableCollection<Item> Items { get; } = new();
```

**Avoid:**
```
List<Item> Items { get; set; } = new();
```

---

### Set DataContext at the right level `[Medium]`
Enables binding for the visual subtree

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/)

- **Do:** DataContext on Window or root container
- **Don't:** DataContext on every child control

**Recommended:**
```
<Window DataContext="{Binding Source={StaticResource VM}}">
```

**Avoid:**
```
Setting DataContext on each TextBlock individually
```

---

### Prefer Binding over code-behind assignments `[Medium]`
Declarative binding keeps UI and logic separate

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/data-binding-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/data-binding-overview)

- **Do:** {Binding Path=Name} in XAML
- **Don't:** textBlock.Text = viewModel.Name in code-behind

**Recommended:**
```
<TextBlock Text="{Binding Name}"/>
```

**Avoid:**
```
Loaded event handler that sets every property
```

---

### Use UpdateSourceTrigger appropriately `[Medium]`
Controls when source updates

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-control-when-the-textbox-text-updates-the-source](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-control-when-the-textbox-text-updates-the-source)

- **Do:** PropertyChanged for instant feedback
- **Don't:** Default LostFocus when search-as-you-type is needed

**Recommended:**
```
Text="{Binding Query, UpdateSourceTrigger=PropertyChanged}"
```

**Avoid:**
```
Text="{Binding Query}" when search-as-you-type needed
```

---

### Use IValueConverter for display transforms `[Medium]`
Convert data for presentation without changing the model

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-convert-bound-data](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/how-to-convert-bound-data)

- **Do:** IValueConverter for bool-to-visibility etc
- **Don't:** Visibility properties on ViewModel

**Recommended:**
```
<TextBlock Visibility="{Binding IsActive, Converter={StaticResource BoolToVis}}"/>
```

**Avoid:**
```
public Visibility IsActiveVisibility => IsActive ? Visibility.Visible : Visibility.Collapsed;
```

---

### Use INotifyDataErrorInfo for validation `[Medium]`
Surface validation errors to the binding system instead of ad-hoc error UI

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/observablevalidator](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/observablevalidator)

- **Do:** ObservableValidator with DataAnnotations attributes
- **Don't:** Throwing in setters or maintaining separate error properties

**Recommended:**
```
public partial class FormVm : ObservableValidator { [ObservableProperty][NotifyDataErrorInfo][Required] private string _email; }
```

**Avoid:**
```
if (string.IsNullOrEmpty(Email)) ErrorMessage = "Required";
```

---

## Layout

### Use Grid for complex layouts `[Medium]`
Rows and columns with proportional or fixed sizing

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/grid](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/grid)

- **Do:** Grid with RowDefinitions and ColumnDefinitions
- **Don't:** Canvas with absolute positions for forms

**Recommended:**
```
<Grid><Grid.RowDefinitions><RowDefinition Height="Auto"/><RowDefinition Height="*"/></Grid.RowDefinitions></Grid>
```

**Avoid:**
```
<Canvas><TextBox Canvas.Left="50" Canvas.Top="80"/></Canvas>
```

---

### Use StackPanel for linear content `[Medium]`
Simple vertical or horizontal stacking

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/stackpanel](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/stackpanel)

- **Do:** StackPanel for toolbars and simple lists
- **Don't:** Grid with single column for linear content

**Recommended:**
```
<StackPanel Orientation="Horizontal"><Button/><Button/></StackPanel>
```

**Avoid:**
```
<Grid><Grid.RowDefinitions>..12 Auto rows..</Grid.RowDefinitions></Grid>
```

---

### Use DockPanel for docked regions `[Medium]`
Dock children to edges with last child filling

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/dockpanel](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/dockpanel)

- **Do:** DockPanel for shell layouts (menu top sidebar left)
- **Don't:** Nested StackPanels to simulate docking

**Recommended:**
```
<DockPanel><Menu DockPanel.Dock="Top"/><TreeView DockPanel.Dock="Left"/><Frame/></DockPanel>
```

**Avoid:**
```
Nested StackPanels with fixed widths for shell
```

---

### Avoid hardcoded sizes `[Medium]`
Use Auto Star and MinWidth/MaxWidth

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/grid](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/grid)

- **Do:** Proportional sizing with * and Auto
- **Don't:** Fixed pixel widths on resizable content

**Recommended:**
```
<ColumnDefinition Width="2*"/>
```

**Avoid:**
```
<ColumnDefinition Width="350"/> on main content
```

---

### Use ScrollViewer for overflow `[Medium]`
Wrap content that may exceed available space

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/scrollviewer](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/scrollviewer)

- **Do:** ScrollViewer around long forms or lists
- **Don't:** Clipping content without scroll

**Recommended:**
```
<ScrollViewer><StackPanel>...long content...</StackPanel></ScrollViewer>
```

**Avoid:**
```
<StackPanel> that clips off-screen items
```

---

## Styling

### Use Resource Dictionaries `[Medium]`
Centralize colors brushes and styles

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview)

- **Do:** ResourceDictionary in App.xaml for theme values
- **Don't:** Inline colors and font sizes on every element

**Recommended:**
```
<SolidColorBrush x:Key="PrimaryBrush" Color="#0078D4"/>
```

**Avoid:**
```
<Button Background="#0078D4"/> repeated everywhere
```

---

### Use pack URIs for embedded resources `[Medium]`
Reference embedded images fonts and resource dictionaries via the pack scheme

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/pack-uris-in-wpf](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/pack-uris-in-wpf)

- **Do:** pack://application:,,, syntax for cross-assembly assets
- **Don't:** File-system paths for resources compiled into the assembly

**Recommended:**
```
<Image Source="pack://application:,,,/MyApp;component/Resources/icon.png"/>
```

**Avoid:**
```
<Image Source="C:\Resources\icon.png"/>
```

---

### Use implicit styles `[Medium]`
Apply a Style to all instances of a TargetType

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview)

- **Do:** Style with TargetType and no x:Key for defaults
- **Don't:** Manually styling every Button instance

**Recommended:**
```
<Style TargetType="Button"><Setter Property="Padding" Value="12,6"/></Style>
```

**Avoid:**
```
Padding="12,6" on every Button
```

---

### Use explicit styles with x:Key and BasedOn `[Medium]`
Named variant styles that inherit from a base via BasedOn

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview)

- **Do:** x:Key styles that BasedOn an implicit or named style
- **Don't:** Duplicating setters across variants

**Recommended:**
```
<Style x:Key="PrimaryButton" TargetType="Button" BasedOn="{StaticResource {x:Type Button}}">
```

**Avoid:**
```
Copy-pasting 10 Setters into a second Style
```

---

### Prefer StaticResource over DynamicResource `[Medium]`
StaticResource is resolved once and faster

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview)

- **Do:** StaticResource for values that do not change at runtime
- **Don't:** DynamicResource for static theme values

**Recommended:**
```
Background="{StaticResource PrimaryBrush}"
```

**Avoid:**
```
Background="{DynamicResource PrimaryBrush}" when theme never changes
```

---

### Use ControlTemplate for full control `[Medium]`
Override default rendering of a control

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/how-to-create-apply-template](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/how-to-create-apply-template)

- **Do:** ControlTemplate when built-in styles are insufficient
- **Don't:** Nesting extra panels to hide the default template

**Recommended:**
```
<ControlTemplate TargetType="Button"><Border><ContentPresenter/></Border></ControlTemplate>
```

**Avoid:**
```
Wrapping Button in Border to fake a custom look
```

---

### Use DataTemplate for data presentation `[Medium]`
Define how data objects render in ItemsControls

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/data-templating-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/data-templating-overview)

- **Do:** DataTemplate for ListBox ComboBox and ItemsControl items
- **Don't:** ToString overrides for display

**Recommended:**
```
<DataTemplate DataType="{x:Type local:Person}"><TextBlock Text="{Binding FullName}"/></DataTemplate>
```

**Avoid:**
```
Relying on ToString() in ListBox
```

---

### Use Fluent theme on .NET 9+ `[Medium]`
ThemeMode applies the Windows 11 Fluent style; values are Light Dark System and None (default Aero2)

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/whats-new/net90](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/whats-new/net90)

- **Do:** ThemeMode on Application or Window
- **Don't:** Legacy Aero2 styling for new Windows 11 apps

**Recommended:**
```
<Application ThemeMode="System">
```

**Avoid:**
```
<Application> with default Aero2 look
```

---

## Commands

### Use ICommand for user actions `[High]`
Decouple UI actions from logic

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview)

- **Do:** ICommand implementations (RelayCommand DelegateCommand)
- **Don't:** Click event handlers in code-behind

**Recommended:**
```
<Button Command="{Binding SaveCommand}"/>
```

**Avoid:**
```
<Button Click="OnSaveClick"/> with logic in code-behind
```

---

### Use CanExecute for enable/disable `[Medium]`
Automatically disable controls when action unavailable; call NotifyCanExecuteChanged when state changes

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview)

- **Do:** CanExecute returning false to disable buttons
- **Don't:** IsEnabled binding to a separate bool

**Recommended:**
```
new RelayCommand(Save, () => !IsBusy)
```

**Avoid:**
```
<Button IsEnabled="{Binding IsNotBusy}"/>
```

---

### Use RelayCommand or DelegateCommand `[Medium]`
Avoid implementing ICommand from scratch every time

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/relaycommand](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/relaycommand)

- **Do:** RelayCommand (CommunityToolkit.Mvvm) or DelegateCommand (Prism)
- **Don't:** New ICommand class per command

**Recommended:**
```
[RelayCommand] private void Save() { }
```

**Avoid:**
```
class SaveCommand : ICommand { ... } for each action
```

---

### Use AsyncRelayCommand for async operations `[Medium]`
Tracks IsRunning and disables the command while it executes preventing re-entry

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/asyncrelaycommand](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/asyncrelaycommand)

- **Do:** AsyncRelayCommand or [RelayCommand] on async Task method
- **Don't:** async void event handlers in code-behind

**Recommended:**
```
[RelayCommand] private async Task SaveAsync() { await _service.SaveAsync(); }
```

**Avoid:**
```
private async void OnSaveClick(object s, RoutedEventArgs e) { await _service.SaveAsync(); }
```

---

### Use CommandParameter for context `[Low]`
Pass data from the UI element to the command handler

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview)

- **Do:** CommandParameter for item-specific actions
- **Don't:** Relying on SelectedItem in every command

**Recommended:**
```
<Button Command="{Binding DeleteCommand}" CommandParameter="{Binding}"/>
```

**Avoid:**
```
Command handler accessing SelectedItem directly
```

---

### Use InputBindings for keyboard shortcuts `[Medium]`
Bind keyboard gestures to commands without manual key handling

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/commanding-overview)

- **Do:** KeyBinding inside Window.InputBindings
- **Don't:** Custom key handling in PreviewKeyDown

**Recommended:**
```
<Window.InputBindings><KeyBinding Key="S" Modifiers="Ctrl" Command="{Binding SaveCommand}"/></Window.InputBindings>
```

**Avoid:**
```
PreviewKeyDown handler checking for Ctrl+S
```

---

## Performance

### Use VirtualizingStackPanel for large lists `[High]`
Only creates UI elements for visible items. ListBox/ListView virtualize by default; TreeView requires opt-in

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-controls](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-controls)

- **Do:** VirtualizingStackPanel.IsVirtualizing=True (set on TreeView; default for ListBox)
- **Don't:** Disabling virtualization on long lists

**Recommended:**
```
<TreeView VirtualizingStackPanel.IsVirtualizing="True" VirtualizingStackPanel.VirtualizationMode="Recycling"/>
```

**Avoid:**
```
<ListBox ScrollViewer.CanContentScroll="False"/>
```

---

### Freeze Freezable objects `[Medium]`
Frozen brushes and geometries skip change tracking

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/freezable-objects-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/freezable-objects-overview)

- **Do:** Freeze brushes and pens that do not change
- **Don't:** Mutable brushes used as static resources

**Recommended:**
```
var brush = new SolidColorBrush(Colors.Blue); brush.Freeze();
```

**Avoid:**
```
new SolidColorBrush() without Freeze in resources
```

---

### Use DependencyProperty for custom-control binding targets `[Medium]`
Binding target properties on custom controls must be DependencyProperties (sources can be plain CLR properties with INPC)

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/dependency-properties-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/dependency-properties-overview)

- **Do:** Define DependencyProperty for properties bound TO on a custom control
- **Don't:** Plain CLR properties as binding targets on custom controls

**Recommended:**
```
public static readonly DependencyProperty NameProperty = ...
```

**Avoid:**
```
public string Name { get; set; } as binding target on custom control
```

---

### Use async for long operations `[High]`
Keep UI thread responsive

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)

- **Do:** async/await with Task.Run for CPU work
- **Don't:** Synchronous operations that freeze the UI

**Recommended:**
```
await Task.Run(() => HeavyComputation());
```

**Avoid:**
```
HeavyComputation() on UI thread
```

---

### Profile with PerfView and Visual Studio `[Medium]`
Measure before optimizing

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-wpf-application-performance](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-wpf-application-performance)

- **Do:** Visual Studio diagnostic tools and PerfView
- **Don't:** Guessing at performance bottlenecks

**Recommended:**
```
Performance Profiler in Visual Studio (Alt+F2)
```

**Avoid:**
```
Optimize without profiling
```

---

## Threading

### Use Dispatcher for UI updates `[High]`
UI elements can only be accessed from the UI thread

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model)

- **Do:** Dispatcher.Invoke or BeginInvoke from background threads
- **Don't:** Accessing UI elements from background threads

**Recommended:**
```
Application.Current.Dispatcher.Invoke(() => Status = "Done");
```

**Avoid:**
```
textBlock.Text = "Done" from Task.Run
```

---

### Prefer async/await over Dispatcher `[Medium]`
Modern async code returns to UI context automatically

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)

- **Do:** async/await which resumes on captured SynchronizationContext
- **Don't:** Manual Dispatcher.BeginInvoke for every callback

**Recommended:**
```
var data = await LoadDataAsync(); Items = data;
```

**Avoid:**
```
Dispatcher.BeginInvoke(() => Items = result) in callback
```

---

### Use Task.Run for CPU-bound work `[High]`
Offload intensive work from UI thread

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)

- **Do:** Task.Run for compute-bound work
- **Don't:** Long-running computations on UI thread

**Recommended:**
```
var result = await Task.Run(() => Compute());
```

**Avoid:**
```
var result = Compute(); on UI thread
```

---

### Report progress from background tasks `[Medium]`
Update UI with progress during long operations

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/api/system.progress-1](https://learn.microsoft.com/en-us/dotnet/api/system.progress-1)

- **Do:** IProgress<T> with Task.Run
- **Don't:** Polling a shared variable for progress

**Recommended:**
```
var progress = new Progress<int>(p => ProgressBar.Value = p); await Task.Run(() => Work(progress));
```

**Avoid:**
```
while (!done) { Thread.Sleep(100); check shared int; }
```

---

### Handle DispatcherUnhandledException `[High]`
Catch unhandled UI-thread exceptions to log them and prevent the default WPF crash dialog

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/api/system.windows.application.dispatcherunhandledexception](https://learn.microsoft.com/en-us/dotnet/api/system.windows.application.dispatcherunhandledexception)

- **Do:** Subscribe in App.xaml or App.OnStartup and set e.Handled=true after logging
- **Don't:** Letting WPF show its default crash dialog and silently shut down

**Recommended:**
```
<Application DispatcherUnhandledException="App_OnUnhandledException">
```

**Avoid:**
```
No global handler so any unhandled exception crashes the app
```

---

## Accessibility

### Set AutomationProperties `[High]`
Enable screen reader support

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/api/system.windows.automation.automationproperties](https://learn.microsoft.com/en-us/dotnet/api/system.windows.automation.automationproperties)

- **Do:** AutomationProperties.Name on interactive controls
- **Don't:** Controls without automation names

**Recommended:**
```
<Button AutomationProperties.Name="Save document"/>
```

**Avoid:**
```
<Button><Image Source="save.png"/></Button> without name
```

---

### Support keyboard navigation `[High]`
All functionality reachable via keyboard

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/focus-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/focus-overview)

- **Do:** Tab order and KeyboardNavigation properties
- **Don't:** Mouse-only interactions

**Recommended:**
```
<StackPanel KeyboardNavigation.TabNavigation="Cycle">
```

**Avoid:**
```
Click handlers with no keyboard equivalent
```

---

### Support high contrast themes `[Medium]`
Respect Windows high contrast settings

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/accessibility-best-practices](https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/accessibility-best-practices)

- **Do:** SystemColors and SystemFonts resources
- **Don't:** Hardcoded colors that disappear in high contrast

**Recommended:**
```
Foreground="{DynamicResource {x:Static SystemColors.ControlTextBrushKey}}"
```

**Avoid:**
```
Foreground="#333333" everywhere
```

---

### Use appropriate control types `[High]`
Semantic controls convey role to assistive tech

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/accessibility-best-practices](https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/accessibility-best-practices)

- **Do:** Button for actions CheckBox for toggles
- **Don't:** Styled TextBlock with click handler as fake button

**Recommended:**
```
<Button Content="Submit"/>
```

**Avoid:**
```
<TextBlock MouseDown="OnSubmitClick" Text="Submit"/>
```

---

### Support DPI scaling `[Medium]`
Ensure UI is crisp at all display scale factors

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/graphics](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/graphics)

- **Do:** Device-independent units and vector graphics
- **Don't:** Pixel-based bitmaps that blur at high DPI

**Recommended:**
```
<Path Data="M 10,10 L 20,20"/> or DrawingImage
```

**Avoid:**
```
<Image Source="icon_32x32.png"/> at 200% scaling
```

---

### Declare PerMonitorV2 DPI awareness `[Medium]`
WPF defaults to System-DPI-aware unless you opt into PerMonitorV2 via app.manifest

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/windows/win32/hidpi/high-dpi-desktop-application-development-on-windows](https://learn.microsoft.com/en-us/windows/win32/hidpi/high-dpi-desktop-application-development-on-windows)

- **Do:** app.manifest with dpiAwareness PerMonitorV2
- **Don't:** Default System DPI awareness for Windows 10/11 apps

**Recommended:**
```
<dpiAwareness xmlns="http://schemas.microsoft.com/SMI/2016/WindowsSettings">PerMonitorV2</dpiAwareness>
```

**Avoid:**
```
No app.manifest leaving app at System DPI
```

---

## Architecture

### Use MVVM pattern `[High]`
Separate View ViewModel and Model concerns

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/)

- **Do:** MVVM with data binding and commands
- **Don't:** Logic in code-behind

**Recommended:**
```
ViewModel with INotifyPropertyChanged and ICommand
```

**Avoid:**
```
MainWindow.xaml.cs with all business logic
```

---

### Override App.OnStartup for app initialization `[Medium]`
Wire DI build the host resolve MainWindow and parse command-line args in OnStartup

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/application-management-overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/application-management-overview)

- **Do:** Override OnStartup when DI or argument parsing is needed
- **Don't:** Relying on StartupUri when MainWindow needs constructor injection

**Recommended:**
```
protected override void OnStartup(StartupEventArgs e) { _host.Start(); _host.Services.GetRequiredService<MainWindow>().Show(); }
```

**Avoid:**
```
<Application StartupUri="MainWindow.xaml"/> when MainWindow has constructor dependencies
```

---

### Use dependency injection `[Medium]`
Wire Microsoft.Extensions.Hosting Generic Host in App.OnStartup and resolve ViewModels from the container

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/overview)

- **Do:** Generic Host with Microsoft.Extensions.DependencyInjection
- **Don't:** new Service() in ViewModel constructors

**Recommended:**
```
services.AddTransient<MainViewModel>();
```

**Avoid:**
```
new MainViewModel(new DataService()) in App.xaml.cs
```

---

### Use CommunityToolkit.Mvvm `[Medium]`
Source generators reduce MVVM boilerplate

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/)

- **Do:** [ObservableProperty] and [RelayCommand] attributes
- **Don't:** Hand-written INotifyPropertyChanged for every property

**Recommended:**
```
[ObservableProperty] private string _name;
```

**Avoid:**
```
private string _name; public string Name { get ... set ... OnPropertyChanged ... }
```

---

### Keep code-behind minimal `[Medium]`
Code-behind should only contain view-specific logic

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/)

- **Do:** View logic like focus management and animations in code-behind
- **Don't:** Business logic and data access in code-behind

**Recommended:**
```
Loaded handler that sets initial focus
```

**Avoid:**
```
Loaded handler that calls database and populates grid
```

---

### Use messaging for loose coupling `[Medium]`
Communicate between ViewModels without references

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/messenger](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/messenger)

- **Do:** WeakReferenceMessenger from CommunityToolkit.Mvvm
- **Don't:** Direct ViewModel-to-ViewModel references

**Recommended:**
```
WeakReferenceMessenger.Default.Send(new ItemSavedMessage(item));
```

**Avoid:**
```
MainViewModel.Instance.RefreshItems() from DetailViewModel
```

---

## Testing

### Unit test ViewModels `[Medium]`
Test business logic independent of UI

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/)

- **Do:** xUnit or NUnit tests on ViewModel methods and properties
- **Don't:** Manual testing through the UI only

**Recommended:**
```
[Fact] public void Save_WhenValid_SetsIsBusy() { vm.Save(); Assert.True(vm.IsBusy); }
```

**Avoid:**
```
Clicking buttons in the running app to verify
```

---

### Mock services in tests `[Medium]`
Isolate ViewModel from external dependencies

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)

- **Do:** Moq or NSubstitute for service interfaces
- **Don't:** Real database calls in unit tests

**Recommended:**
```
var mock = new Mock<IDataService>(); var vm = new MainViewModel(mock.Object);
```

**Avoid:**
```
new MainViewModel(new SqlDataService()) in tests
```

---

### Use UI Automation for integration tests `[Medium]`
Automated UI testing with Microsoft UI Automation

**Applies to:** wpf current
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/ui-automation-overview](https://learn.microsoft.com/en-us/dotnet/framework/ui-automation/ui-automation-overview)

- **Do:** FlaUI or Appium 2 (appium-windows-driver) for end-to-end tests
- **Don't:** Manual regression testing only

**Recommended:**
```
AutomationElement.FindFirst(TreeScope.Children, condition)
```

**Avoid:**
```
Manual click-through testing
```

---
