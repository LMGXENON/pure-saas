# Uno Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`uno.csv`)
> Framework: Uno
> Rules Count: 59 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Uno** projects.

---

## XAML

### Use WinUI XAML API surface `[High]`
Uno implements the WinUI API across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/implemented-views.html](https://platform.uno/docs/articles/implemented-views.html)

- **Do:** Microsoft.UI.Xaml namespace for all UI code
- **Don't:** WPF or Xamarin.Forms namespaces

**Recommended:**
```
using Microsoft.UI.Xaml.Controls;
```

**Avoid:**
```
using System.Windows.Controls; or using Xamarin.Forms;
```

---

### Check API implementation status `[High]`
Not all WinUI APIs are implemented on every platform

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/implemented-views.html](https://platform.uno/docs/articles/implemented-views.html)

- **Do:** Uno API compatibility docs before using new APIs
- **Don't:** Assuming all WinUI APIs work everywhere

**Recommended:**
```
Check platform.uno/docs for API status
```

**Avoid:**
```
Using unimplemented API and discovering at runtime
```

---

### Use Uno.WinUI not Uno.UI for new projects `[Medium]`
Uno.WinUI uses WinUI 3 APIs

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/updating-to-winui3.html](https://platform.uno/docs/articles/updating-to-winui3.html)

- **Do:** Uno.WinUI NuGet packages for new projects
- **Don't:** Uno.UI (UWP API surface) for new projects

**Recommended:**
```
<Project Sdk="Uno.Sdk"> (Uno.WinUI / WinUI 3 surface implicit)
```

**Avoid:**
```
<PackageReference Include="Uno.UI"/> (legacy UWP API surface)
```

---

### Use XAML Hot Reload `[Medium]`
Speed up development with live XAML editing

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-xaml-hot-reload.html](https://platform.uno/docs/articles/features/working-with-xaml-hot-reload.html)

- **Do:** Hot Reload for iterating on layouts
- **Don't:** Restarting app for every XAML change

**Recommended:**
```
Click Hot Reload button in VS toolbar or save in VS Code/Rider to apply XAML changes
```

**Avoid:**
```
Full rebuild for margin tweak
```

---

## Conditional

### Use platform-specific XAML `[Medium]`
Conditional namespaces for platform-specific UI

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-xaml.html](https://platform.uno/docs/articles/platform-specific-xaml.html)

- **Do:** xmlns:android xmlns:ios xmlns:wasm for platform XAML
- **Don't:** Shared XAML when platforms need different controls

**Recommended:**
```
<TextBlock android:Text="Android" ios:Text="iOS" Text="Default"/>
```

**Avoid:**
```
#if in code-behind to set text per platform
```

---

### Use partial classes for platform code `[Medium]`
Separate platform implementations in partial files

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-csharp.html](https://platform.uno/docs/articles/platform-specific-csharp.html)

- **Do:** Partial class files with platform-specific logic
- **Don't:** #if directives in shared code for large blocks

**Recommended:**
```
MainPage.iOS.cs MainPage.Android.cs partial class files
```

**Avoid:**
```
#if __IOS__ ... #elif __ANDROID__ ... 100-line blocks in shared file
```

---

### Use preprocessor symbols correctly `[Medium]`
Target correct platforms with defines

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-csharp.html](https://platform.uno/docs/articles/platform-specific-csharp.html)

- **Do:** __IOS__ __ANDROID__ __WASM__ __DESKTOP__ for platform checks
- **Don't:** Inventing custom symbols or checking OS at runtime

**Recommended:**
```
#if __ANDROID__ Android-specific code #endif
```

**Avoid:**
```
if (RuntimeInformation.IsOSPlatform(OSPlatform.Android)) for compile-time choice
```

---

### Minimize platform-specific code `[High]`
Keep shared code maximized

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-csharp.html](https://platform.uno/docs/articles/platform-specific-csharp.html)

- **Do:** Abstract platform differences behind interfaces
- **Don't:** Duplicating logic across platform files

**Recommended:**
```
IDeviceService with per-platform implementation
```

**Avoid:**
```
Same 50 lines copy-pasted into iOS and Android partial classes
```

---

## Navigation

### Use Frame-based navigation `[Medium]`
Standard WinUI navigation pattern

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/guides/native-frame-nav-tutorial.html](https://platform.uno/docs/articles/guides/native-frame-nav-tutorial.html)

- **Do:** Frame.Navigate with page types
- **Don't:** Manual content swapping

**Recommended:**
```
rootFrame.Navigate(typeof(DetailPage), parameter);
```

**Avoid:**
```
contentPresenter.Content = new DetailPage();
```

---

### Use Uno.Extensions.Navigation `[Medium]`
Type-safe navigation with DI integration

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Navigation/NavigationOverview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Navigation/NavigationOverview.html)

- **Do:** Uno.Extensions navigation for complex apps
- **Don't:** Manual Frame management in large apps

**Recommended:**
```
navigator.NavigateViewModelAsync<DetailViewModel>(this, data: item);
```

**Avoid:**
```
Frame.Navigate with string parsing everywhere
```

---

### Handle platform back navigation `[High]`
SystemNavigationManager.BackRequested works on Android iOS and WASM but is unimplemented on WinAppSDK desktop where calling GetForCurrentView() throws at runtime

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/guides/native-frame-nav-tutorial.html](https://platform.uno/docs/articles/guides/native-frame-nav-tutorial.html)

- **Do:** Subscribe to BackRequested only on platforms that support it or use Uno.Toolkit NavigationBar for cross-platform back UX
- **Don't:** Calling SystemNavigationManager.GetForCurrentView() on WinUI 3 desktop without a guard

**Recommended:**
```
#if __ANDROID__ || __IOS__ || __WASM__ SystemNavigationManager.GetForCurrentView().BackRequested += OnBackRequested; #endif
```

**Avoid:**
```
SystemNavigationManager.GetForCurrentView().BackRequested += OnBackRequested; with no platform guard — crashes on Windows desktop
```

---

### Use deep linking `[Medium]`
Support URI activation across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/protocol-activation.html](https://platform.uno/docs/articles/features/protocol-activation.html)

- **Do:** Handle protocol activation and URI routing
- **Don't:** Single entry point ignoring activation

**Recommended:**
```
Route URIs to specific pages on activation
```

**Avoid:**
```
Ignoring OnLaunched activation args
```

---

## Renderers

### Understand Skia vs native rendering `[High]`
Uno offers both rendering approaches

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/using-skia-desktop.html](https://platform.uno/docs/articles/features/using-skia-desktop.html)

- **Do:** Skia for pixel-perfect cross-platform consistency
- **Don't:** Assuming native rendering on all platforms

**Recommended:**
```
<TargetFrameworks>net10.0-desktop;net10.0-browserwasm</TargetFrameworks> uses unified Skia Desktop shell
```

**Avoid:**
```
Expecting platform-native controls on Skia targets
```

---

### Use unified net10.0-desktop target `[Medium]`
Uno 5.2+ ships a single Skia Desktop shell that auto-selects X11 Win32 or AppKit per OS — Skia.Gtk Skia.Linux.Framebuffer and Skia.WPF heads are deprecated

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/using-skia-desktop.html](https://platform.uno/docs/articles/features/using-skia-desktop.html)

- **Do:** net10.0-desktop TFM with UnoPlatformHostBuilder for cross-platform desktop
- **Don't:** Targeting the legacy Skia.Gtk or Skia.Linux.Framebuffer heads in new projects

**Recommended:**
```
<TargetFrameworks>net10.0-desktop</TargetFrameworks> in the Uno.Sdk single project
```

**Avoid:**
```
Per-OS Skia.Gtk Skia.MacOS Skia.Linux.Framebuffer head projects
```

---

### Test rendering on each target `[High]`
Visual differences exist between renderers

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html](https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html)

- **Do:** Visual testing on each active target platform
- **Don't:** Testing only on Windows assuming others match

**Recommended:**
```
Screenshot tests on iOS Android WASM and Desktop
```

**Avoid:**
```
Testing only on Windows Desktop
```

---

### Use platform-native features when needed `[Medium]`
Access native APIs through Uno abstractions

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-csharp.html](https://platform.uno/docs/articles/platform-specific-csharp.html)

- **Do:** Native platform APIs via platform-specific code
- **Don't:** Avoiding native features for purity

**Recommended:**
```
#if __IOS__ UIKit API call #endif for camera access
```

**Avoid:**
```
Pure shared code that avoids using the camera
```

---

## Performance

### Optimize WASM bundle size `[High]`
WebAssembly downloads can be large

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/using-il-linker-webassembly.html](https://platform.uno/docs/articles/features/using-il-linker-webassembly.html)

- **Do:** IL linker and AOT for smaller WASM bundles
- **Don't:** Default settings for production WASM

**Recommended:**
```
<WasmShellILLinkerEnabled>true</WasmShellILLinkerEnabled>
```

**Avoid:**
```
Publishing WASM without linker
```

---

### Use x:Load for deferred XAML `[Medium]`
Defer element creation until needed

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/windows-ui-xaml-xbind.html](https://platform.uno/docs/articles/features/windows-ui-xaml-xbind.html)

- **Do:** x:Load=False for hidden panels and tabs
- **Don't:** Loading all UI elements upfront

**Recommended:**
```
<StackPanel x:Load="{x:Bind ShowAdvanced}">
```

**Avoid:**
```
Always-loaded Collapsed panels
```

---

### Profile per platform `[Medium]`
Performance characteristics vary by target

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/guides/profiling-applications.html](https://platform.uno/docs/articles/guides/profiling-applications.html)

- **Do:** Platform-specific profiling tools
- **Don't:** Assuming desktop perf equals mobile

**Recommended:**
```
Instruments on iOS and Android Profiler on Android
```

**Avoid:**
```
Profiling only on Windows
```

---

### Use ListView virtualization for large lists `[High]`
Only renders visible items to reduce memory and layout cost

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/controls/ListViewBase.html](https://platform.uno/docs/articles/controls/ListViewBase.html)

- **Do:** ListView with default ItemsStackPanel virtualization
- **Don't:** ItemsControl or StackPanel for large data sets

**Recommended:**
```
<ListView ItemsSource="{x:Bind Items}"/> (virtualizes by default)
```

**Avoid:**
```
<ItemsControl><StackPanel> rendering 5000 items at once
```

---

### Marshal to UI thread with DispatcherQueue `[High]`
Cross-thread access to UI elements throws — capture the UI DispatcherQueue once and use TryEnqueue to update from background work

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/howto-consume-webservices.html](https://platform.uno/docs/articles/howto-consume-webservices.html)

- **Do:** DispatcherQueue.GetForCurrentThread().TryEnqueue from background work
- **Don't:** Touching UI controls directly from a Task

**Recommended:**
```
_dispatcher.TryEnqueue(() => StatusText.Text = "Done");
```

**Avoid:**
```
await Task.Run(() => StatusText.Text = "Done"); throws on non-UI thread
```

---

### Enable PublishAot on net10.0-desktop `[Medium]`
Skia Desktop on .NET 10 supports Native AOT for faster cold start and smaller deployments — opt in per-target so debug builds remain fast

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/using-skia-desktop.html](https://platform.uno/docs/articles/features/using-skia-desktop.html)

- **Do:** <PublishAot>true</PublishAot> in a TFM-conditional PropertyGroup for net10.0-desktop release builds
- **Don't:** Enabling PublishAot globally and breaking debug iteration on every TFM

**Recommended:**
```
<PropertyGroup Condition="'$(TargetFramework)'=='net10.0-desktop' AND '$(Configuration)'=='Release'"><PublishAot>true</PublishAot></PropertyGroup>
```

**Avoid:**
```
<PublishAot>true</PublishAot> at root with no TFM/Configuration condition
```

---

### Never block on async with .Result or .Wait() `[High]`
Blocking on a Task from the UI thread deadlocks because the awaiter cannot resume on the captured SynchronizationContext — always await async APIs through to the event handler

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/howto-consume-webservices.html](https://platform.uno/docs/articles/howto-consume-webservices.html)

- **Do:** Await async methods all the way up; in libraries call ConfigureAwait(false) to avoid context capture
- **Don't:** Calling .Result .Wait() or GetAwaiter().GetResult() on a Task from the UI thread

**Recommended:**
```
private async void OnLoadClick(object s, RoutedEventArgs e) { var data = await _api.GetAsync(); Items = data; }
```

**Avoid:**
```
private void OnLoadClick(object s, RoutedEventArgs e) { var data = _api.GetAsync().Result; } // deadlocks on UI thread
```

---

## Data Binding

### Use x:Bind for compiled bindings `[High]`
Compiled bindings eliminate runtime reflection — Uno supports x:Bind across iOS Android WASM Skia and Windows targets that compile XAML so prefer it over {Binding} for static well-typed bindings

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/windows-ui-xaml-xbind.html](https://platform.uno/docs/articles/features/windows-ui-xaml-xbind.html)

- **Do:** x:Bind for property and event bindings; reserve {Binding} for runtime-typed DataContext scenarios
- **Don't:** {Binding} everywhere when x:Bind would compile

**Recommended:**
```
<TextBlock Text="{x:Bind ViewModel.Title, Mode=OneWay}"/>
```

**Avoid:**
```
<TextBlock Text="{Binding Title}"/> for a statically known property
```

---

### Implement INotifyPropertyChanged `[High]`
Enable UI updates when ViewModel properties change

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Mvux/Overview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Mvux/Overview.html)

- **Do:** CommunityToolkit.Mvvm [ObservableProperty] for auto-notification
- **Don't:** Properties without change notification

**Recommended:**
```
[ObservableProperty] public partial string Title { get; set; }
```

**Avoid:**
```
public string Title { get; set; } without notification
```

---

### Use ObservableCollection for bound lists `[High]`
Collection change notifications for ItemsSources across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/controls/ListViewBase.html](https://platform.uno/docs/articles/controls/ListViewBase.html)

- **Do:** ObservableCollection<T> for data-bound lists
- **Don't:** List<T> for bound ItemsSources

**Recommended:**
```
ObservableCollection<Item> Items { get; } = new();
```

**Avoid:**
```
List<Item> Items { get; set; } = new();
```

---

## Styling

### Use WinUI theme resources `[High]`
Consistent theming across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-themes.html](https://platform.uno/docs/articles/features/working-with-themes.html)

- **Do:** ThemeResource for adaptive colors
- **Don't:** Hardcoded colors per platform

**Recommended:**
```
Background="{ThemeResource ApplicationPageBackgroundThemeBrush}"
```

**Avoid:**
```
Background="#FFFFFF"
```

---

### Support light and dark themes `[Medium]`
Application.RequestedTheme accepts only ApplicationTheme.Light/Dark — to follow the system theme leave it unset entirely. ElementTheme.Default exists only on FrameworkElement.RequestedTheme not on Application

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-themes.html](https://platform.uno/docs/articles/features/working-with-themes.html)

- **Do:** Omit Application.RequestedTheme so the OS theme wins; set Light or Dark explicitly only after a user chooses an override
- **Don't:** Setting Application.RequestedTheme="Default" — not a valid ApplicationTheme value and throws at parse time

**Recommended:**
```
<Application></Application> with RequestedTheme unset
```

**Avoid:**
```
<Application RequestedTheme="Default"> // not a valid ApplicationTheme
```

---

### Use Lightweight Styling `[Medium]`
Override control sub-properties via resources

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.themes/doc/lightweight-styling.html](https://platform.uno/docs/articles/external/uno.themes/doc/lightweight-styling.html)

- **Do:** Lightweight styling keys for minor tweaks
- **Don't:** Full ControlTemplate for small changes

**Recommended:**
```
<Button><Button.Resources><StaticResource x:Key="ButtonBackground" ResourceKey="AccentBrush"/></Button.Resources></Button>
```

**Avoid:**
```
Copying entire ControlTemplate to change one color
```

---

### Test themes on each platform `[Low]`
Theme rendering differs across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-themes.html](https://platform.uno/docs/articles/features/working-with-themes.html)

- **Do:** Visual theme testing on all targets
- **Don't:** Assuming themes look identical everywhere

**Recommended:**
```
Screenshot comparison across platforms for themed controls
```

**Avoid:**
```
Theming only tested on Windows
```

---

### Merge XamlControlsResources in App.xaml `[High]`
Required for Fluent control styles to load — without it controls render with no template

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/fluent-styles.html](https://platform.uno/docs/articles/features/fluent-styles.html)

- **Do:** Add XamlControlsResources at the top of Application.Resources MergedDictionaries
- **Don't:** Skipping the merged dictionary and wondering why Buttons look unstyled

**Recommended:**
```
<Application.Resources><ResourceDictionary><ResourceDictionary.MergedDictionaries><XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls"/></ResourceDictionary.MergedDictionaries></ResourceDictionary></Application.Resources>
```

**Avoid:**
```
<Application.Resources><SolidColorBrush x:Key="MyBrush" Color="Red"/></Application.Resources> with no XamlControlsResources merged
```

---

### Define ThemeDictionaries for Light Dark and HighContrast `[Medium]`
Resources placed inside ResourceDictionary.ThemeDictionaries entries are automatically swapped when the system theme changes — required for theme-aware brushes

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-themes.html](https://platform.uno/docs/articles/features/working-with-themes.html)

- **Do:** Wrap brushes in a ThemeDictionaries dictionary keyed by Light Dark and HighContrast in App.xaml or page resources
- **Don't:** Defining a single brush at the root and missing dark/high-contrast variants

**Recommended:**
```
<ResourceDictionary.ThemeDictionaries><ResourceDictionary x:Key="Light"><SolidColorBrush x:Key="Brand" Color="#005A9E"/></ResourceDictionary><ResourceDictionary x:Key="Dark"><SolidColorBrush x:Key="Brand" Color="#3A96DD"/></ResourceDictionary></ResourceDictionary.ThemeDictionaries>
```

**Avoid:**
```
<SolidColorBrush x:Key="Brand" Color="#005A9E"/> at root with no theme variants
```

---

## Architecture

### Use MVVM pattern `[High]`
Separate view and logic

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/workshops/simple-calc/modules/MVVM-XAML/04-App%20Architecture/README.html](https://platform.uno/docs/articles/external/workshops/simple-calc/modules/MVVM-XAML/04-App%20Architecture/README.html)

- **Do:** CommunityToolkit.Mvvm or Prism for MVVM
- **Don't:** Code-behind for business logic

**Recommended:**
```
[ObservableProperty] public partial string Title { get; set; } [RelayCommand] private void Save() { }
```

**Avoid:**
```
MainPage.xaml.cs with all logic
```

---

### Use Uno.Extensions `[Medium]`
Official extension libraries for common patterns

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/ExtensionsOverview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/ExtensionsOverview.html)

- **Do:** Uno.Extensions for DI navigation configuration
- **Don't:** Building infrastructure from scratch

**Recommended:**
```
Host.CreateDefaultBuilder().UseNavigation().UseConfiguration()
```

**Avoid:**
```
Manual DI and navigation setup
```

---

### Use dependency injection `[Medium]`
Register services for testability

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/Learn/DependencyInjection/DependencyInjectionOverview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/Learn/DependencyInjection/DependencyInjectionOverview.html)

- **Do:** Microsoft.Extensions.DI through Uno.Extensions
- **Don't:** Static service locators and singletons

**Recommended:**
```
services.AddSingleton<IApiService, ApiService>();
```

**Avoid:**
```
ApiService.Instance or new ApiService() in ViewModels
```

---

### Share code via class libraries `[Medium]`
Maximize code reuse across targets

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/cross-targeted-libraries.html](https://platform.uno/docs/articles/cross-targeted-libraries.html)

- **Do:** Business logic in .NET Standard or shared library
- **Don't:** Business logic in platform head projects

**Recommended:**
```
MyApp.Core class library referenced by all heads
```

**Avoid:**
```
Business logic in MyApp.Wasm.csproj
```

---

### Use Uno.Resizetizer for assets `[Medium]`
Single source SVG to multi-platform assets

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.resizetizer/doc/using-uno-resizetizer.html](https://platform.uno/docs/articles/external/uno.resizetizer/doc/using-uno-resizetizer.html)

- **Do:** UnoImage for automatic asset generation from SVG
- **Don't:** Manual asset export per resolution and platform

**Recommended:**
```
<UnoImage Include="Assets/icon.svg" BaseSize="24,24"/>
```

**Avoid:**
```
Manually exporting icon_1x.png icon_2x.png icon_3x.png per platform
```

---

### Use async [RelayCommand] for I/O `[Medium]`
AsyncRelayCommand reports CanExecute=false (raising CanExecuteChanged) and exposes IsRunning while the Task is in flight — the bound control is disabled and re-entrancy is prevented by default (AllowConcurrentExecutions=false)

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/generators/relaycommand](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/generators/relaycommand)

- **Do:** [RelayCommand] on a Task-returning method for awaitable work
- **Don't:** async void event handlers calling .Wait() or .Result

**Recommended:**
```
[RelayCommand] private async Task LoadAsync() { Items = await _api.GetAsync(); }
```

**Avoid:**
```
public void OnLoadClick(object s, EventArgs e) { LoadAsync().Wait(); } deadlock risk
```

---

### Use x:Uid for localized strings `[High]`
WinUI x:Uid resolves UI text from .resw resources at runtime — use it instead of hardcoded strings to support localization across iOS Android WASM and desktop from a single project

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-strings.html](https://platform.uno/docs/articles/features/working-with-strings.html)

- **Do:** x:Uid on every user-facing string with matching .resw entries per language under Strings/{lang}/Resources.resw
- **Don't:** Hardcoding language-specific strings into XAML or code-behind

**Recommended:**
```
<Button x:Uid="SubmitButton"/> with Strings/en/Resources.resw entry SubmitButton.Content=Submit
```

**Avoid:**
```
<Button Content="Submit"/> hardcoded in XAML
```

---

### Wire up ILogger via Uno.Extensions.Logging `[Medium]`
Cross-platform logging routes to platform-native sinks (OSLog on iOS Console on WASM Debug elsewhere) when configured through the IHost builder

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Logging/LoggingOverview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Logging/LoggingOverview.html)

- **Do:** Inject ILogger<T> into ViewModels and services and call UseLogging() on the host builder
- **Don't:** Console.WriteLine or platform-specific log APIs scattered across shared code

**Recommended:**
```
Host.CreateDefaultBuilder().UseLogging(c => c.SetMinimumLevel(LogLevel.Information)) and ILogger<MainViewModel> via constructor injection
```

**Avoid:**
```
Console.WriteLine("error") in shared code with no platform-aware routing
```

---

### Use Uno.Sdk with UnoFeatures `[Medium]`
Uno.Sdk is the modern single-project SDK that auto-resolves Uno.WinUI Uno.Toolkit Material and other packages from a UnoFeatures property — declare features by name instead of hand-managing dozens of PackageReferences

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/using-the-uno-sdk.html](https://platform.uno/docs/articles/features/using-the-uno-sdk.html)

- **Do:** Declare features in the csproj via <UnoFeatures>...</UnoFeatures> and let the SDK resolve transitive packages
- **Don't:** Hand-adding every Uno.* PackageReference and matching version numbers across packages

**Recommended:**
```
<Project Sdk="Uno.Sdk"><PropertyGroup><UnoFeatures>Material;Hosting;Toolkit;Logging;MVVM</UnoFeatures></PropertyGroup></Project>
```

**Avoid:**
```
<PackageReference Include="Uno.WinUI"/><PackageReference Include="Uno.Material.WinUI"/> ... duplicated per feature with mismatched versions
```

---

### Use WinRT.Interop for native window handle on Windows `[Medium]`
Calling Win32 APIs from a WinUI Window (file pickers icon embedding etc.) requires the HWND — retrieve it via WinRT.Interop.WindowNative.GetWindowHandle and guard the call so non-Windows targets stay unaffected

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/retrieve-hwnd](https://learn.microsoft.com/en-us/windows/apps/develop/ui/retrieve-hwnd)

- **Do:** GetWindowHandle inside a #if WINDOWS block when you need the HWND
- **Don't:** Calling WinRT.Interop in shared code without a platform guard

**Recommended:**
```
#if WINDOWS\nvar hWnd = WinRT.Interop.WindowNative.GetWindowHandle(MainWindow);\n#endif
```

**Avoid:**
```
var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(MainWindow); // breaks build on iOS Android WASM
```

---

## Accessibility

### Set AutomationProperties `[High]`
Enable screen readers across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-accessibility.html](https://platform.uno/docs/articles/features/working-with-accessibility.html)

- **Do:** AutomationProperties.Name on interactive controls
- **Don't:** Controls without accessible names

**Recommended:**
```
<Button AutomationProperties.Name="Submit form"><SymbolIcon Symbol="Accept"/></Button>
```

**Avoid:**
```
<Button><SymbolIcon Symbol="Accept"/></Button> without name
```

---

### Test accessibility per platform `[High]`
Each platform has different assistive tech

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-accessibility.html](https://platform.uno/docs/articles/features/working-with-accessibility.html)

- **Do:** Test with VoiceOver TalkBack and Narrator
- **Don't:** Testing accessibility on one platform only

**Recommended:**
```
VoiceOver on iOS + TalkBack on Android + Narrator on Windows
```

**Avoid:**
```
Only testing with Narrator on Windows
```

---

### Support platform text scaling `[Medium]`
Respect user font size preferences

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/working-with-accessibility.html](https://platform.uno/docs/articles/features/working-with-accessibility.html)

- **Do:** Dynamic font scaling for all text
- **Don't:** Fixed font sizes ignoring accessibility

**Recommended:**
```
FontSize="{ThemeResource BodyTextBlockFontSize}"
```

**Avoid:**
```
FontSize="14" everywhere
```

---

### Support keyboard navigation on desktop `[High]`
Skia and WinAppSDK targets need full keyboard operability — note TabIndex routing is not fully implemented on every Uno target

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/controls/NavigationView.html](https://platform.uno/docs/articles/controls/NavigationView.html)

- **Do:** AccessKey and KeyboardAccelerator on Skia and WinAppSDK targets
- **Don't:** Mouse-only interactions on desktop

**Recommended:**
```
<Button AccessKey="S" Content="Save"><Button.KeyboardAccelerators><KeyboardAccelerator Modifiers="Control" Key="S"/></Button.KeyboardAccelerators></Button>
```

**Avoid:**
```
Clickable controls without keyboard support on desktop
```

---

## Testing

### Unit test ViewModels `[Medium]`
Test business logic independently

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html](https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html)

- **Do:** xUnit or MSTest on shared ViewModel code
- **Don't:** UI testing only

**Recommended:**
```
[Fact] public void LoadData_SetsItems() { vm.Load(); Assert.NotEmpty(vm.Items); }
```

**Avoid:**
```
Manual testing on each platform
```

---

### Use Uno.UITest for integration `[Medium]`
Cross-platform UI testing framework

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html](https://platform.uno/docs/articles/external/uno.uitest/doc/using-uno-uitest.html)

- **Do:** Uno.UITest for automated UI tests across platforms
- **Don't:** Manual regression testing

**Recommended:**
```
app.WaitForElement("SaveButton"); app.Tap("SaveButton");
```

**Avoid:**
```
Manual click-through on each platform
```

---

## WASM

### Show an extended splash screen on WASM `[Medium]`
WASM bundle download and runtime startup take several seconds on first load — render branded UI immediately so users do not see a blank page (AOT and trimming are covered separately)

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/runtime-execution-modes.html](https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/runtime-execution-modes.html)

- **Do:** Render a splash overlay in wwwroot/index.html that hides on first XAML navigation
- **Don't:** Letting the user wait on a blank white page while the runtime boots

**Recommended:**
```
index.html: <div id="uno-loading">Loading…</div> hidden via JS interop after first Frame.Navigate
```

**Avoid:**
```
No splash markup in index.html — 5-second blank page on first visit
```

---

### Use AOT compilation for performance `[Medium]`
Ahead-of-time compilation improves runtime speed

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/runtime-execution-modes.html](https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/runtime-execution-modes.html)

- **Do:** AOT for production WASM builds
- **Don't:** Interpreter mode in production

**Recommended:**
```
<WasmShellMonoRuntimeExecutionMode>InterpreterAndAOT</WasmShellMonoRuntimeExecutionMode>
```

**Avoid:**
```
Default interpreter mode in production deployment
```

---

### Handle browser limitations `[Medium]`
WASM runs in browser sandbox

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/platform-specific-csharp.html](https://platform.uno/docs/articles/platform-specific-csharp.html)

- **Do:** Feature detection for browser APIs
- **Don't:** Assuming desktop capabilities in browser

**Recommended:**
```
[JSImport("globalThis.hasApi")] static partial bool HasApi(); #if __WASM__ if (HasApi()) { ... } #endif
```

**Avoid:**
```
#if __WASM__ StorageFile.GetFileFromPathAsync("C:/data") #endif
```

---

### Use service workers for offline support `[Low]`
Enable PWA capabilities for WASM deployments

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/features-pwa.html](https://platform.uno/docs/articles/external/uno.wasm.bootstrap/doc/features-pwa.html)

- **Do:** Service worker registration for caching and offline mode
- **Don't:** Online-only WASM app with no offline fallback

**Recommended:**
```
<WasmPWAManifestFile>manifest.webmanifest</WasmPWAManifestFile>
```

**Avoid:**
```
No service worker leaving WASM app unusable offline
```

---

## Controls

### Use NavigationView for app shell `[High]`
WinUI NavigationView for consistent navigation across platforms

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/controls/NavigationView.html](https://platform.uno/docs/articles/controls/NavigationView.html)

- **Do:** NavigationView with MenuItems for app navigation
- **Don't:** Custom hamburger menu implementation

**Recommended:**
```
<NavigationView><NavigationView.MenuItems><NavigationViewItem Content="Home" Icon="Home"/></NavigationView.MenuItems></NavigationView>
```

**Avoid:**
```
Custom SplitView with manual toggle button
```

---

### Use ContentDialog for modal interactions `[Medium]`
Cross-platform modal dialogs using WinUI API

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/dialogs](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/dialogs)

- **Do:** ContentDialog for confirmations and input
- **Don't:** Custom overlay Panel as dialog

**Recommended:**
```
<ContentDialog Title="Confirm" PrimaryButtonText="OK" CloseButtonText="Cancel"/>
```

**Avoid:**
```
Grid overlay with manual focus trapping
```

---

### Use CommandBar for app actions `[Medium]`
Standard command bar with primary and secondary commands

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/command-bar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/command-bar)

- **Do:** CommandBar with AppBarButtons for toolbar actions
- **Don't:** Custom StackPanel toolbar

**Recommended:**
```
<CommandBar><AppBarButton Icon="Save" Label="Save"/><AppBarButton Icon="Delete" Label="Delete"/></CommandBar>
```

**Avoid:**
```
<StackPanel Orientation="Horizontal"><Button>Save</Button></StackPanel>
```

---

### Use ToggleSwitch for boolean settings `[Low]`
Platform-native toggle control for on/off preferences

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/toggles](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/toggles)

- **Do:** ToggleSwitch for settings and feature flags
- **Don't:** CheckBox for toggle settings

**Recommended:**
```
<ToggleSwitch Header="Dark Mode" IsOn="{x:Bind ViewModel.IsDarkMode, Mode=TwoWay}"/>
```

**Avoid:**
```
<CheckBox Content="Enable dark mode"/>
```

---

## Lifecycle

### Handle app suspension on mobile `[High]`
iOS and Android may suspend or terminate the app — WinAppSDK desktop does not raise Suspending so use window Closed for desktop save-state

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/features/windows-ui-xaml-application.html](https://platform.uno/docs/articles/features/windows-ui-xaml-application.html)

- **Do:** Save state in OnSuspending and restore on activation
- **Don't:** Ignoring lifecycle losing user state on mobile

**Recommended:**
```
Application.Current.Suspending += (s, e) => { var d = e.SuspendingOperation.GetDeferral(); SaveState(); d.Complete(); };
```

**Avoid:**
```
No suspend handler losing form data on mobile
```

---

### Use Uno.Extensions.Hosting for startup `[Medium]`
Structured app initialization with DI and configuration

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Hosting/HostingOverview.html](https://platform.uno/docs/articles/external/uno.extensions/doc/Overview/Hosting/HostingOverview.html)

- **Do:** IHost builder pattern for app startup and service registration
- **Don't:** Manual initialization in App constructor

**Recommended:**
```
Host.CreateDefaultBuilder().ConfigureServices(s => s.AddSingleton<MainViewModel>()).Build();
```

**Avoid:**
```
new MainViewModel() in App.xaml.cs constructor
```

---

### Persist desktop window state via Window.Closed `[Medium]`
WinAppSDK and Skia desktop heads do not raise Application.Suspending — handle the Window.Closed event (and AppWindow size/position changes) to save user state when desktop apps shut down

**Applies to:** uno current Uno.Sdk/Uno.WinUI
**Documentation:** [https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window)

- **Do:** Subscribe to MainWindow.Closed and persist any unsaved state before the window is destroyed
- **Don't:** Relying on Application.Suspending to fire on desktop targets

**Recommended:**
```
m_window.Closed += (s, e) => SaveState();
```

**Avoid:**
```
Application.Current.Suspending += SaveState; // never fires on WinAppSDK or Skia desktop
```

---
