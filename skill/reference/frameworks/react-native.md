# React Native Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`react-native.csv`)
> Framework: React Native
> Rules Count: 51 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **React Native** projects.

---

## Components

### Use functional components `[Medium]`
Hooks-based components are standard

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/intro-react](https://reactnative.dev/docs/intro-react)

- **Do:** Functional components with hooks
- **Don't:** Class components

**Recommended:**
```
const App = () => { }
```

**Avoid:**
```
class App extends Component
```

---

### Keep components small `[Medium]`
Single responsibility principle

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Split into smaller components
- **Don't:** Large monolithic components

**Recommended:**
```
<Header /><Content /><Footer />
```

**Avoid:**
```
500+ line component
```

---

### Use TypeScript `[Medium]`
Type safety for props and state

**Applies to:** react-native 0.86.x (official active line)

- **Do:** TypeScript for new projects
- **Don't:** JavaScript without types

**Recommended:**
```
const Button: FC<Props> = () => { }
```

**Avoid:**
```
const Button = (props) => { }
```

---

### Colocate component files `[Low]`
Keep related files together

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Component folder with styles
- **Don't:** Flat structure

**Recommended:**
```
components/Button/index.tsx styles.ts
```

**Avoid:**
```
components/Button.tsx styles/button.ts
```

---

## Styling

### Use StyleSheet.create `[High]`
Optimized style objects

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/stylesheet](https://reactnative.dev/docs/stylesheet)

- **Do:** StyleSheet for all styles
- **Don't:** Inline style objects

**Recommended:**
```
StyleSheet.create({ container: {} })
```

**Avoid:**
```
style={{ margin: 10 }}
```

---

### Avoid inline styles `[Medium]`
Prevent object recreation

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Styles in StyleSheet
- **Don't:** Inline style objects in render

**Recommended:**
```
style={styles.container}
```

**Avoid:**
```
style={{ margin: 10, padding: 5 }}
```

---

### Use flexbox for layout `[Medium]`
React Native uses flexbox

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/flexbox](https://reactnative.dev/docs/flexbox)

- **Do:** flexDirection alignItems justifyContent
- **Don't:** Absolute positioning everywhere

**Recommended:**
```
flexDirection: 'row'
```

**Avoid:**
```
position: 'absolute' everywhere
```

---

### Handle platform differences `[Medium]`
Platform-specific styles

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/platform-specific-code](https://reactnative.dev/docs/platform-specific-code)

- **Do:** Platform.select or .ios/.android files
- **Don't:** Same styles for both platforms

**Recommended:**
```
Platform.select({ ios: {}, android: {} })
```

**Avoid:**
```
Hardcoded iOS values
```

---

### Use responsive dimensions `[Medium]`
Scale for different screens

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Dimensions or useWindowDimensions
- **Don't:** Fixed pixel values

**Recommended:**
```
useWindowDimensions()
```

**Avoid:**
```
width: 375
```

---

## Navigation

### Use React Navigation `[Medium]`
Standard navigation library

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnavigation.org/](https://reactnavigation.org/)

- **Do:** React Navigation for routing
- **Don't:** Manual navigation management

**Recommended:**
```
createStackNavigator()
```

**Avoid:**
```
Custom navigation state
```

---

### Type navigation params `[Medium]`
Type-safe navigation

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Typed navigation props
- **Don't:** Untyped navigation

**Recommended:**
```
navigation.navigate<RootStackParamList>('Home', { id })
```

**Avoid:**
```
navigation.navigate('Home', { id })
```

---

### Use deep linking `[Medium]`
Support URL-based navigation

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnavigation.org/docs/deep-linking/](https://reactnavigation.org/docs/deep-linking/)

- **Do:** Configure linking prop
- **Don't:** No deep link support

**Recommended:**
```
linking: { prefixes: [] }
```

**Avoid:**
```
No linking configuration
```

---

### Handle back button `[High]`
Android back button handling

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/backhandler](https://reactnative.dev/docs/backhandler)

- **Do:** useFocusEffect with BackHandler
- **Don't:** Ignore back button

**Recommended:**
```
BackHandler.addEventListener
```

**Avoid:**
```
No back handler
```

---

## State

### Use useState for local state `[Medium]`
Simple component state

**Applies to:** react-native 0.86.x (official active line)

- **Do:** useState for UI state
- **Don't:** Class component state

**Recommended:**
```
const [count, setCount] = useState(0)
```

**Avoid:**
```
this.state = { count: 0 }
```

---

### Use useReducer for complex state `[Medium]`
Complex state logic

**Applies to:** react-native 0.86.x (official active line)

- **Do:** useReducer for related state
- **Don't:** Multiple useState for related values

**Recommended:**
```
useReducer(reducer initialState)
```

**Avoid:**
```
5+ useState calls
```

---

### Use context sparingly `[Medium]`
Context for global state

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Context for theme auth locale
- **Don't:** Context for frequently changing data

**Recommended:**
```
ThemeContext for app theme
```

**Avoid:**
```
Context for list item data
```

---

### Consider Zustand or Redux `[Medium]`
External state management

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Zustand for simple Redux for complex
- **Don't:** useState for global state

**Recommended:**
```
create((set) => ({ }))
```

**Avoid:**
```
Prop drilling global state
```

---

## Lists

### Use FlatList for long lists `[High]`
Virtualized list rendering

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/flatlist](https://reactnative.dev/docs/flatlist)

- **Do:** FlatList for 50+ items
- **Don't:** ScrollView with map

**Recommended:**
```
<FlatList data={items} />
```

**Avoid:**
```
<ScrollView>{items.map()}</ScrollView>
```

---

### Provide keyExtractor `[High]`
Unique keys for list items

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/flatlist#keyextractor](https://reactnative.dev/docs/flatlist#keyextractor)

- **Do:** keyExtractor with stable ID
- **Don't:** Index as key

**Recommended:**
```
keyExtractor={(item) => item.id}
```

**Avoid:**
```
keyExtractor={(_, index) => index}
```

---

### Optimize renderItem `[High]`
Memoize list item components

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/optimizing-flatlist-configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)

- **Do:** React.memo for list items
- **Don't:** Inline render function

**Recommended:**
```
renderItem={({ item }) => <MemoizedItem item={item} />}
```

**Avoid:**
```
renderItem={({ item }) => <View>...</View>}
```

---

### Use getItemLayout for fixed height `[Medium]`
Skip measurement for performance

**Applies to:** react-native 0.86.x (official active line)

- **Do:** getItemLayout when height known
- **Don't:** Dynamic measurement for fixed items

**Recommended:**
```
getItemLayout={(_, index) => ({ length: 50, offset: 50 * index, index })}
```

**Avoid:**
```
No getItemLayout for fixed height
```

---

### Implement windowSize `[Medium]`
Control render window

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Smaller windowSize for memory
- **Don't:** Default windowSize for large lists

**Recommended:**
```
windowSize={5}
```

**Avoid:**
```
windowSize={21} for huge lists
```

---

## Performance

### Use React.memo `[Medium]`
Prevent unnecessary re-renders

**Applies to:** react-native 0.86.x (official active line)

- **Do:** memo for pure components
- **Don't:** No memoization

**Recommended:**
```
export default memo(MyComponent)
```

**Avoid:**
```
export default MyComponent
```

---

### Use useCallback for handlers `[Medium]`
Stable function references

**Applies to:** react-native 0.86.x (official active line)

- **Do:** useCallback for props
- **Don't:** New function on every render

**Recommended:**
```
useCallback(() => {}, [deps])
```

**Avoid:**
```
() => handlePress()
```

---

### Use useMemo for expensive ops `[Medium]`
Cache expensive calculations

**Applies to:** react-native 0.86.x (official active line)

- **Do:** useMemo for heavy computations
- **Don't:** Recalculate every render

**Recommended:**
```
useMemo(() => expensive(), [deps])
```

**Avoid:**
```
const result = expensive()
```

---

### Avoid anonymous functions in JSX `[Medium]`
Prevent re-renders

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Named handlers or useCallback
- **Don't:** Inline arrow functions

**Recommended:**
```
onPress={handlePress}
```

**Avoid:**
```
onPress={() => doSomething()}
```

---

### Use bundled Hermes by default `[Medium]`
Hermes is bundled with React Native and enabled by default

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/architecture/bundled-hermes](https://reactnative.dev/architecture/bundled-hermes)

- **Do:** Keep the bundled Hermes default unless an explicit compatibility need requires opt-out
- **Don't:** Opt out of Hermes by default

**Recommended:**
```
Use the Hermes version bundled with React Native
```

**Avoid:**
```
Override the JavaScript engine without a verified requirement
```

---

## Images

### Use expo-image `[Medium]`
Modern performant image component for React Native

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://docs.expo.dev/versions/latest/sdk/image/](https://docs.expo.dev/versions/latest/sdk/image/)

- **Do:** Use expo-image for caching, blurring, and performance
- **Don't:** Use default Image for heavy lists or unmaintained libraries

**Recommended:**
```
<Image source={url} cachePolicy='memory-disk' /> (expo-image)
```

**Avoid:**
```
<FastImage source={url} />
```

---

### Specify image dimensions `[High]`
Prevent layout shifts

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/images#network-images](https://reactnative.dev/docs/images#network-images)

- **Do:** width and height for remote images
- **Don't:** No dimensions for network images

**Recommended:**
```
<Image style={{ width: 100 height: 100 }} />
```

**Avoid:**
```
<Image source={{ uri }} /> no size
```

---

### Use resizeMode `[Low]`
Control image scaling

**Applies to:** react-native 0.86.x (official active line)

- **Do:** resizeMode cover contain
- **Don't:** Stretch images

**Recommended:**
```
resizeMode="cover"
```

**Avoid:**
```
No resizeMode
```

---

## Forms

### Use controlled inputs `[Medium]`
State-controlled form fields

**Applies to:** react-native 0.86.x (official active line)

- **Do:** value + onChangeText
- **Don't:** Uncontrolled inputs

**Recommended:**
```
<TextInput value={text} onChangeText={setText} />
```

**Avoid:**
```
<TextInput defaultValue={text} />
```

---

### Handle keyboard `[High]`
Manage keyboard visibility

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/keyboardavoidingview](https://reactnative.dev/docs/keyboardavoidingview)

- **Do:** KeyboardAvoidingView
- **Don't:** Content hidden by keyboard

**Recommended:**
```
<KeyboardAvoidingView behavior="padding">
```

**Avoid:**
```
No keyboard handling
```

---

### Use proper keyboard types `[Low]`
Appropriate keyboard for input

**Applies to:** react-native 0.86.x (official active line)

- **Do:** keyboardType for input type
- **Don't:** Default keyboard for all

**Recommended:**
```
keyboardType="email-address"
```

**Avoid:**
```
keyboardType="default" for email
```

---

## Touch

### Use Pressable `[Low]`
Modern touch handling

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/pressable](https://reactnative.dev/docs/pressable)

- **Do:** Pressable for touch interactions
- **Don't:** TouchableOpacity for new code

**Recommended:**
```
<Pressable onPress={} />
```

**Avoid:**
```
<TouchableOpacity onPress={} />
```

---

### Provide touch feedback `[Medium]`
Visual feedback on press

**Applies to:** react-native 0.86.x (official active line)

- **Do:** Ripple or opacity change
- **Don't:** No feedback on press

**Recommended:**
```
android_ripple={{ color: 'gray' }}
```

**Avoid:**
```
No press feedback
```

---

### Set hitSlop for small targets `[Medium]`
Increase touch area

**Applies to:** react-native 0.86.x (official active line)

- **Do:** hitSlop for icons and small buttons
- **Don't:** Tiny touch targets

**Recommended:**
```
hitSlop={{ top: 10 bottom: 10 }}
```

**Avoid:**
```
44x44 with no hitSlop
```

---

## Animation

### Use Reanimated `[Medium]`
High-performance animations

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://docs.swmansion.com/react-native-reanimated/](https://docs.swmansion.com/react-native-reanimated/)

- **Do:** react-native-reanimated
- **Don't:** Animated API for complex

**Recommended:**
```
useSharedValue useAnimatedStyle
```

**Avoid:**
```
Animated.timing for gesture
```

---

### Run on UI thread `[High]`
worklets for smooth animation

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/performance](https://reactnative.dev/docs/performance)

- **Do:** Run animations on UI thread
- **Don't:** JS thread animations

**Recommended:**
```
runOnUI(() => {})
```

**Avoid:**
```
Animated on JS thread
```

---

### Use gesture handler `[Medium]`
Native gesture recognition

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://docs.swmansion.com/react-native-gesture-handler/](https://docs.swmansion.com/react-native-gesture-handler/)

- **Do:** react-native-gesture-handler
- **Don't:** JS-based gesture handling

**Recommended:**
```
<GestureDetector>
```

**Avoid:**
```
<View onTouchMove={} />
```

---

## Async

### Handle loading states `[Medium]`
Show loading indicators

**Applies to:** react-native 0.86.x (official active line)

- **Do:** ActivityIndicator during load
- **Don't:** Empty screen during load

**Recommended:**
```
{isLoading ? <ActivityIndicator /> : <Content />}
```

**Avoid:**
```
No loading state
```

---

### Use an error boundary for rendering failures `[High]`
React error boundaries replace a crashed subtree with fallback UI

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

- **Do:** Catch rendering errors at a feature boundary and provide recovery
- **Don't:** Let a render error unmount the whole app

**Recommended:**
```
<ErrorBoundary fallback={<ErrorView />}><Content /></ErrorBoundary>
```

**Avoid:**
```
Render the feature tree with no error boundary
```

---

### Cancel async operations `[High]`
Cleanup on unmount

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/global-AbortController](https://reactnative.dev/docs/global-AbortController)

- **Do:** AbortController or cleanup
- **Don't:** Memory leaks from async

**Recommended:**
```
useEffect cleanup
```

**Avoid:**
```
No cleanup for subscriptions
```

---

## Accessibility

### Add accessibility labels `[High]`
Describe UI elements

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/accessibility](https://reactnative.dev/docs/accessibility)

- **Do:** accessibilityLabel for all interactive
- **Don't:** Missing labels

**Recommended:**
```
accessibilityLabel="Submit form"
```

**Avoid:**
```
<Pressable> without label
```

---

### Use accessibility roles `[Medium]`
Semantic meaning

**Applies to:** react-native 0.86.x (official active line)

- **Do:** accessibilityRole for elements
- **Don't:** Wrong roles

**Recommended:**
```
accessibilityRole="button"
```

**Avoid:**
```
No role for button
```

---

### Support screen readers `[High]`
Test with TalkBack/VoiceOver

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/accessibility#testing-talkback-support](https://reactnative.dev/docs/accessibility#testing-talkback-support)

- **Do:** Test with screen readers
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

### Use React Native Testing Library `[Medium]`
Component testing

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://callstack.github.io/react-native-testing-library/](https://callstack.github.io/react-native-testing-library/)

- **Do:** render and fireEvent
- **Don't:** Enzyme or manual testing

**Recommended:**
```
render(<Component />)
```

**Avoid:**
```
shallow(<Component />)
```

---

### Test on real devices `[High]`
Real device behavior

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/running-on-device](https://reactnative.dev/docs/running-on-device)

- **Do:** Test on iOS and Android devices
- **Don't:** Simulator only

**Recommended:**
```
Device testing in CI
```

**Avoid:**
```
Simulator only testing
```

---

### Use Detox for E2E `[Medium]`
End-to-end testing

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://wix.github.io/Detox/](https://wix.github.io/Detox/)

- **Do:** Detox for critical flows
- **Don't:** Manual E2E testing

**Recommended:**
```
detox test
```

**Avoid:**
```
Manual testing only
```

---

## Native

### Use native modules carefully `[High]`
Bridge has overhead

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/turbo-native-modules-introduction](https://reactnative.dev/docs/turbo-native-modules-introduction)

- **Do:** Batch native calls
- **Don't:** Frequent bridge crossing

**Recommended:**
```
Batch updates
```

**Avoid:**
```
Call native on every keystroke
```

---

### Use Expo when possible `[Low]`
Simplified development

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://docs.expo.dev/](https://docs.expo.dev/)

- **Do:** Expo for standard features
- **Don't:** Bare RN for simple apps

**Recommended:**
```
expo install package
```

**Avoid:**
```
react-native link package
```

---

### Handle permissions `[High]`
Request permissions properly

**Applies to:** react-native 0.86.x (official active line)
**Documentation:** [https://reactnative.dev/docs/permissionsandroid](https://reactnative.dev/docs/permissionsandroid)

- **Do:** Check and request permissions
- **Don't:** Assume permissions granted

**Recommended:**
```
PermissionsAndroid.request()
```

**Avoid:**
```
Access without permission check
```

---
