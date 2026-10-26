# Javafx Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`javafx.csv`)
> Framework: Javafx
> Rules Count: 75 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Javafx** projects.

---

## Application

### Start UI from Application subclass `[High]`
JavaFX apps should bootstrap the primary Stage through Application.start()

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/application/Application.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/application/Application.html)

- **Do:** Extend Application and configure Scene in start()
- **Don't:** Create UI from a random main method without launching JavaFX

**Recommended:**
```
public class App extends Application { public void start(Stage stage) { stage.setScene(new Scene(root)); stage.show(); } }
```

**Avoid:**
```
new Stage().show()
```

---

## Threading

### Keep work off the FX Application Thread `[High]`
Long-running work blocks rendering and input when executed on the UI thread

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html)

- **Do:** Use Task or Service for background work
- **Don't:** Run network database or file work in button handlers

**Recommended:**
```
Task<List<Item>> task = new Task<>() { protected List<Item> call() { return repo.load(); } }; new Thread(task).start();
```

**Avoid:**
```
loadLargeFile(); table.setItems(items);
```

---

### Update UI only on FX thread `[High]`
Scene graph changes must happen on the JavaFX Application Thread

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/application/Platform.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/application/Platform.html)

- **Do:** Use bindings task handlers or Platform.runLater for UI changes
- **Don't:** Mutate controls directly from background threads

**Recommended:**
```
task.setOnSucceeded(e -> table.setItems(FXCollections.observableArrayList(task.getValue())));
```

**Avoid:**
```
new Thread(() -> label.setText("Done")).start()
```

---

### Bind progress to background tasks `[Medium]`
Task exposes progress and message properties for responsive feedback

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html)

- **Do:** Bind ProgressBar and Label to task properties
- **Don't:** Poll progress manually or leave users without feedback

**Recommended:**
```
progress.progressProperty().bind(task.progressProperty()); status.textProperty().bind(task.messageProperty());
```

**Avoid:**
```
while(running) progress.setProgress(x);
```

---

## FXML

### Use FXML for stable declarative layouts `[Medium]`
FXML keeps view structure readable for screens with many controls

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html)

- **Do:** Place layout in FXML and behavior in controller
- **Don't:** Build large screens entirely in one Java method

**Recommended:**
```
<VBox spacing="12" xmlns:fx="http://javafx.com/fxml" fx:controller="app.MainController">
```

**Avoid:**
```
VBox root = new VBox(); root.getChildren().add(... 200 lines ...);
```

---

### Keep controllers focused on view behavior `[High]`
Controllers should coordinate controls and delegate business logic to services

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXML.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXML.html)

- **Do:** Inject services or call application services from controller
- **Don't:** Put database queries and domain rules directly in controller

**Recommended:**
```
public void save() { customerService.save(form.toCommand()); }
```

**Avoid:**
```
public void save() { DriverManager.getConnection(...); }
```

---

### Use fx:id for injected controls `[Medium]`
FXML controls need stable fx:id values that match controller fields

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXML.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXML.html)

- **Do:** Annotate fields with @FXML and keep ids descriptive
- **Don't:** Look up controls by CSS selector for normal wiring

**Recommended:**
```
@FXML private TableView<Customer> customerTable;
```

**Avoid:**
```
root.lookup("#customerTable")
```

---

### Fail fast when loading FXML `[High]`
FXML load errors should surface during screen creation with clear context

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html)

- **Do:** Load resources with getResource and handle IOException explicitly
- **Don't:** Swallow loader errors and show a blank scene

**Recommended:**
```
URL view = getClass().getResource(\/views/main.fxml\"); Parent root = FXMLLoader.load(view);"
```

**Avoid:**
```
try { FXMLLoader.load(url); } catch(Exception ignored) {}
```

---

## CSS

### Style with style classes `[Medium]`
JavaFX CSS works best through reusable styleClass names

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html)

- **Do:** Add semantic style classes and define them in CSS
- **Don't:** Set long inline style strings throughout code

**Recommended:**
```
button.getStyleClass().add(\primary-action\");"
```

**Avoid:**
```
.setStyle(\-fx-background-color: #2563eb; -fx-padding: 12; ...\")"
```

---

### Use design tokens through looked-up colors `[Medium]`
Looked-up colors keep palettes consistent across controls

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html)

- **Do:** Define named colors on root and reuse them in CSS
- **Don't:** Repeat hex values in every selector

**Recommended:**
```
.root { -brand-primary: #2563eb; } .button.primary { -fx-background-color: -brand-primary; }
```

**Avoid:**
```
.save { -fx-background-color: #2563eb; } .link { -fx-text-fill: #2563eb; }
```

---

### Avoid overusing inline effects `[Medium]`
Expensive CSS effects and shadows can hurt desktop UI responsiveness

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/effect/package-summary.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/effect/package-summary.html)

- **Do:** Use subtle shadows only on important elevated surfaces
- **Don't:** Apply blur drop shadow and glow to every node

**Recommended:**
```
.dialog-card { -fx-effect: dropshadow(gaussian, rgba(0,0,0,.18), 16, 0, 0, 4); }
```

**Avoid:**
```
.table-row-cell { -fx-effect: dropshadow(gaussian, black, 20, .5, 0, 0); }
```

---

## Layout

### Choose layout panes by responsibility `[High]`
Each pane solves a different layout problem and should be selected intentionally

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/package-summary.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/package-summary.html)

- **Do:** Use BorderPane for app shell GridPane for forms VBox/HBox for simple stacks
- **Don't:** Use absolute positioning for resizable app screens

**Recommended:**
```
BorderPane shell = new BorderPane(); shell.setTop(toolbar); shell.setCenter(content);
```

**Avoid:**
```
Pane root = new Pane(); button.setLayoutX(742);
```

---

### Prefer constraints over fixed coordinates `[High]`
Responsive JavaFX layouts depend on constraints and grow priorities

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/GridPane.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/GridPane.html)

- **Do:** Use hgrow vgrow column constraints and alignment
- **Don't:** Hard-code pixel positions and sizes

**Recommended:**
```
GridPane.setHgrow(nameField, Priority.ALWAYS); column.setPercentWidth(50);
```

**Avoid:**
```
field.setPrefWidth(328); field.setLayoutX(120);
```

---

### Set sensible min pref and max sizes `[Medium]`
Controls should resize predictably across windows and DPI settings

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/Region.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/Region.html)

- **Do:** Use Region.USE_COMPUTED_SIZE and max widths intentionally
- **Don't:** Lock every control to fixed width and height

**Recommended:**
```
button.setMaxWidth(Double.MAX_VALUE); VBox.setVgrow(table, Priority.ALWAYS);
```

**Avoid:**
```
button.setMinSize(96, 32); button.setMaxSize(96, 32);
```

---

### Use spacing and padding consistently `[Low]`
Desktop UI needs scan-friendly rhythm and clear grouping

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/geometry/Insets.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/geometry/Insets.html)

- **Do:** Set spacing padding and Insets through shared constants or CSS
- **Don't:** Use inconsistent ad hoc gaps between controls

**Recommended:**
```
form.setHgap(12); form.setVgap(10); form.setPadding(new Insets(16));
```

**Avoid:**
```
box.setSpacing(3); other.setSpacing(17);
```

---

## Controls

### Use ObservableList for list controls `[High]`
TableView ListView and ComboBox update automatically from observable collections

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/collections/ObservableList.html](https://openjfx.io/javadoc/26/javafx.base/javafx/collections/ObservableList.html)

- **Do:** Back controls with FXCollections.observableArrayList()
- **Don't:** Mutate plain lists and manually refresh controls

**Recommended:**
```
ObservableList<Customer> rows = FXCollections.observableArrayList(); table.setItems(rows);
```

**Avoid:**
```
List<Customer> rows = new ArrayList<>(); table.setItems((ObservableList) rows);
```

---

### Configure TableView cell value factories with properties `[Medium]`
Table columns should observe stable JavaFX properties for updates

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableColumn.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableColumn.html)

- **Do:** Expose StringProperty ObjectProperty or use ReadOnlyObjectWrapper
- **Don't:** Return transient strings without observable support

**Recommended:**
```
nameCol.setCellValueFactory(data -> data.getValue().nameProperty());
```

**Avoid:**
```
nameCol.setCellValueFactory(data -> new SimpleStringProperty(data.getValue().toString()));
```

---

### Use cell factories for custom rendering `[Medium]`
Custom table or list visuals belong in reusable cell factories

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Cell.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Cell.html)

- **Do:** Override updateItem and handle empty state
- **Don't:** Place complex Nodes directly in model objects

**Recommended:**
```
col.setCellFactory(c -> new TableCell<>() { protected void updateItem(Status s, boolean empty) { super.updateItem(s, empty); setText(empty ? null : s.label()); } });
```

**Avoid:**
```
row.setBadge(new Label("Active"));
```

---

### Virtualized controls are for large data `[High]`
TableView ListView TreeView virtualize cells and outperform manual node lists

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/ListView.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/ListView.html)

- **Do:** Use TableView or ListView for hundreds of rows
- **Don't:** Create hundreds of HBoxes inside a VBox

**Recommended:**
```
ListView<Item> list = new ListView<>(items);
```

**Avoid:**
```
items.forEach(i -> vbox.getChildren().add(new ItemRow(i)));
```

---

### Handle empty states explicitly `[Low]`
Empty tables and lists need visible guidance or next actions

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableView.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableView.html)

- **Do:** Set placeholder nodes for empty data views
- **Don't:** Leave blank white areas that look broken

**Recommended:**
```
table.setPlaceholder(new Label(\No customers match this filter\"));"
```

**Avoid:**
```
table.setPlaceholder(null);
```

---

## Binding

### Use property binding for derived UI state `[High]`
JavaFX binding reduces imperative synchronization bugs

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/beans/binding/Bindings.html](https://openjfx.io/javadoc/26/javafx.base/javafx/beans/binding/Bindings.html)

- **Do:** Bind disabled visible text and progress properties to source state
- **Don't:** Manually update every dependent control in each event handler

**Recommended:**
```
saveButton.disableProperty().bind(form.validProperty().not());
```

**Avoid:**
```
if(!valid) saveButton.setDisable(true);
```

---

### Unbind before manual updates `[Medium]`
Bound properties cannot be set directly without errors

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/Property.html](https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/Property.html)

- **Do:** Call unbind when switching from bound to manual state
- **Don't:** Set a bound property directly

**Recommended:**
```
label.textProperty().unbind(); label.setText(\Ready\");"
```

**Avoid:**
```
label.textProperty().bind(task.messageProperty()); label.setText(\"Ready\");
```

---

### Use listeners sparingly `[Low]`
Bindings express simple relationships more clearly than listeners

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/beans/value/ObservableValue.html](https://openjfx.io/javadoc/26/javafx.base/javafx/beans/value/ObservableValue.html)

- **Do:** Use listeners for side effects and bindings for values
- **Don't:** Create listener chains for simple computed text

**Recommended:**
```
totalLabel.textProperty().bind(Bindings.format("Total: %d", total));
```

**Avoid:**
```
count.addListener((o, a, b) -> totalLabel.setText("Total: " + b));
```

---

## Events

### Use action handlers for commands `[Medium]`
Buttons and menu items should route to named command methods

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/event/ActionEvent.html](https://openjfx.io/javadoc/26/javafx.base/javafx/event/ActionEvent.html)

- **Do:** Use setOnAction or @FXML handler methods with clear names
- **Don't:** Put large lambdas inline for complex operations

**Recommended:**
```
@FXML private void handleSave(ActionEvent event) { saveCustomer(); }
```

**Avoid:**
```
saveButton.setOnAction(e -> { validate(); transform(); query(); save(); refresh(); });
```

---

### Use event filters for global shortcuts `[Medium]`
Filters can intercept keyboard events before child controls consume them

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Scene.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Scene.html)

- **Do:** Register accelerators or filters at Scene level
- **Don't:** Add duplicate key handlers to every control

**Recommended:**
```
scene.getAccelerators().put(new KeyCodeCombination(KeyCode.S, SHORTCUT_DOWN), this::save);
```

**Avoid:**
```
nameField.setOnKeyPressed(...); table.setOnKeyPressed(...);
```

---

## Accessibility

### Connect labels to inputs `[High]`
Accessible desktop forms need labels associated with controls

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Label.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Label.html)

- **Do:** Use Label.setLabelFor and clear prompt text
- **Don't:** Use placeholder-only labels

**Recommended:**
```
nameLabel.setLabelFor(nameField); nameField.setPromptText(\Jane Doe\");"
```

**Avoid:**
```
nameField.setPromptText(\"Name\");
```

---

### Expose accessible text for icon buttons `[High]`
Icon-only controls need names for screen readers and tooltips

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/AccessibleRole.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/AccessibleRole.html)

- **Do:** Set accessibleText and Tooltip on icon buttons
- **Don't:** Use unlabeled graphic-only buttons

**Recommended:**
```
button.setAccessibleText("Refresh"); button.setTooltip(new Tooltip("Refresh"));
```

**Avoid:**
```
new Button("", refreshIcon)
```

---

### Keep keyboard focus visible `[High]`
Desktop users rely on focus traversal and visible focus indicators

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Node.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Node.html)

- **Do:** Preserve focus rings and tab order
- **Don't:** Remove outlines without alternative focus state

**Recommended:**
```
.button:focused { -fx-border-color: -brand-focus; -fx-border-width: 2; }
```

**Avoid:**
```
.button:focused { -fx-background-insets: 0; }
```

---

### Use mnemonics for menu and form workflows `[Low]`
Mnemonics make desktop workflows faster and more accessible

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Labeled.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Labeled.html)

- **Do:** Enable mnemonicParsing and choose unique mnemonic letters
- **Don't:** Ignore keyboard alternatives for frequent actions

**Recommended:**
```
saveButton.setMnemonicParsing(true); saveButton.setText("_Save");
```

**Avoid:**
```
saveButton.setText("Save");
```

---

## Validation

### Show validation near the field `[Medium]`
Users should not hunt for form errors in desktop dialogs

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html)

- **Do:** Bind error labels or pseudo classes next to invalid controls
- **Don't:** Show only a generic alert after submit

**Recommended:**
```
field.pseudoClassStateChanged(PseudoClass.getPseudoClass("invalid"), !valid);
```

**Avoid:**
```
new Alert(ERROR, "Invalid input").show();
```

---

### Use TextFormatter for constrained input `[Medium]`
TextFormatter prevents invalid edits before they enter the model

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TextFormatter.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TextFormatter.html)

- **Do:** Attach TextFormatter for numeric dates and masks
- **Don't:** Parse and reject invalid text only after submit

**Recommended:**
```
amountField.setTextFormatter(new TextFormatter<>(new IntegerStringConverter(), 0, c -> c.getControlNewText().matches("\\d*") ? c : null));
```

**Avoid:**
```
Integer.parseInt(amountField.getText());
```

---

## Dialogs

### Use modal ownership for dialogs `[Medium]`
Dialogs should block only the relevant window and return structured results

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/stage/Modality.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/stage/Modality.html)

- **Do:** Set owner modality and use showAndWait
- **Don't:** Open unmanaged windows for confirmations

**Recommended:**
```
dialog.initOwner(stage); dialog.initModality(Modality.WINDOW_MODAL); Optional<ButtonType> result = dialog.showAndWait();
```

**Avoid:**
```
new Stage().show();
```

---

### Prefer custom DialogPane over ad hoc stages `[Low]`
Dialog gives consistent buttons focus and result handling

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Dialog.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Dialog.html)

- **Do:** Use Dialog<T> for forms confirmations and wizards
- **Don't:** Build every modal as a new Stage manually

**Recommended:**
```
Dialog<Customer> dialog = new Dialog<>(); dialog.getDialogPane().getButtonTypes().addAll(OK, CANCEL);
```

**Avoid:**
```
Stage modal = new Stage(); modal.setScene(new Scene(new VBox()));
```

---

## Images

### Load images as resources `[High]`
Packaged apps need resources resolved from the classpath or module path

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/image/Image.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/image/Image.html)

- **Do:** Use getResourceAsStream for bundled assets
- **Don't:** Use absolute local file paths in production UI

**Recommended:**
```
new Image(getClass().getResourceAsStream("/images/logo.png"));
```

**Avoid:**
```
new Image("file:/Users/me/Desktop/logo.png")
```

---

### Use background loading for large images `[Medium]`
Large image decoding can pause UI startup

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/image/Image.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/image/Image.html)

- **Do:** Use Image(url true) or a background Task for heavy assets
- **Don't:** Load many full-size images synchronously during startup

**Recommended:**
```
Image preview = new Image(url, true);
```

**Avoid:**
```
gallery.add(new Image(url));
```

---

## Animation

### Keep animations purposeful and short `[Low]`
Desktop UI animations should clarify state changes without delaying work

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/animation/package-summary.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/animation/package-summary.html)

- **Do:** Use 150-250ms transitions for reveal hover and selection
- **Don't:** Animate every layout change with long timelines

**Recommended:**
```
FadeTransition ft = new FadeTransition(Duration.millis(180), pane); ft.setToValue(1);
```

**Avoid:**
```
new Timeline(new KeyFrame(Duration.seconds(2), ...)).play();
```

---

### Respect reduced-motion contexts where possible `[Medium]`
Some users experience motion sensitivity in desktop apps

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/animation/Animation.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/animation/Animation.html)

- **Do:** Provide a setting to disable decorative animations
- **Don't:** Make animation required for comprehension

**Recommended:**
```
if (settings.reducedMotion()) pane.setOpacity(1); else fade.play();
```

**Avoid:**
```
alwaysSpin.play();
```

---

## Performance

### Avoid recreating scenes for small state changes `[Medium]`
Replacing whole scenes loses state and can flicker

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Scene.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/Scene.html)

- **Do:** Swap center content or update view models
- **Don't:** Rebuild the entire Stage for every navigation click

**Recommended:**
```
shell.setCenter(customerView);
```

**Avoid:**
```
stage.setScene(new Scene(loadMainAgain()));
```

---

### Reuse loaded views when appropriate `[Low]`
FXML loading and CSS application are not free

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html)

- **Do:** Cache stable views or controllers for frequent navigation
- **Don't:** Reload heavyweight screens repeatedly without need

**Recommended:**
```
Node settings = viewCache.computeIfAbsent("settings", this::loadSettings);
```

**Avoid:**
```
button.setOnAction(e -> shell.setCenter(loadFxml("settings.fxml")));
```

---

### Batch observable list changes `[Medium]`
Many single-item updates can cause repeated layout and sort work

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/collections/ObservableList.html](https://openjfx.io/javadoc/26/javafx.base/javafx/collections/ObservableList.html)

- **Do:** Use setAll or addAll for bulk replacement
- **Don't:** Loop add items one by one to visible lists

**Recommended:**
```
items.setAll(repository.findAll());
```

**Avoid:**
```
for(Item item : loaded) items.add(item);
```

---

## Architecture

### Use view models for complex screens `[Medium]`
View models keep controller state testable and separate from controls

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/package-summary.html](https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/package-summary.html)

- **Do:** Expose JavaFX properties from a screen model
- **Don't:** Store all state only inside controls

**Recommended:**
```
customerNameField.textProperty().bindBidirectional(viewModel.nameProperty());
```

**Avoid:**
```
String name = customerNameField.getText(); // everywhere
```

---

### Separate navigation from feature controllers `[Medium]`
Feature controllers should not know how every screen is launched

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html)

- **Do:** Use a navigator or application shell service
- **Don't:** Call FXMLLoader for unrelated screens from each controller

**Recommended:**
```
navigator.showCustomers();
```

**Avoid:**
```
FXMLLoader.load(getClass().getResource(\"/views/admin.fxml\"));
```

---

### Use application shell plus feature workspaces `[High]`
Enterprise JavaFX apps need stable navigation around changing work areas

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/BorderPane.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/layout/BorderPane.html)

- **Do:** Use BorderPane shell with navigation toolbar and central workspace
- **Don't:** Replace the whole Stage for every feature

**Recommended:**
```
shell.setLeft(navigation); shell.setTop(toolbar); shell.setCenter(workspace);
```

**Avoid:**
```
stage.setScene(new Scene(loadFeature()));
```

---

### Use MVVM for complex enterprise screens `[High]`
Large forms and tables need testable state outside the controller

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/package-summary.html](https://openjfx.io/javadoc/26/javafx.base/javafx/beans/property/package-summary.html)

- **Do:** Expose JavaFX properties from view models and bind controls to them
- **Don't:** Put all screen state and validation in the controller

**Recommended:**
```
amountField.textProperty().bindBidirectional(vm.amountProperty());
```

**Avoid:**
```
controller.amount = amountField.getText();
```

---

### Inject services into controllers `[High]`
Enterprise controllers should coordinate UI and call application services

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html](https://openjfx.io/javadoc/26/javafx.fxml/javafx/fxml/FXMLLoader.html)

- **Do:** Use a controller factory or DI container for services
- **Don't:** Create database connections inside FXML controllers

**Recommended:**
```
loader.setControllerFactory(type -> injector.getInstance(type));
```

**Avoid:**
```
new CustomerRepository(new DriverManager(...))
```

---

## Modules

### Declare required JavaFX modules `[High]`
Modular JavaFX apps must require the modules they use

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/openjfx-docs/#modular](https://openjfx.io/openjfx-docs/#modular)

- **Do:** Add javafx.controls javafx.fxml and opens controller packages
- **Don't:** Depend on classpath accidents only

**Recommended:**
```
module app { requires javafx.controls; requires javafx.fxml; opens app.ui to javafx.fxml; }
```

**Avoid:**
```
module app { requires javafx.controls; }
```

---

## Packaging

### Use jlink or jpackage for desktop delivery `[Medium]`
JavaFX apps should ship with the runtime they need

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/openjfx-docs/#modular](https://openjfx.io/openjfx-docs/#modular)

- **Do:** Package a runtime image or native installer
- **Don't:** Ask end users to install matching Java and JavaFX manually

**Recommended:**
```
jpackage --name MyApp --module app/app.Main --runtime-image build/image
```

**Avoid:**
```
java -jar app.jar
```

---

## Testing

### Use TestFX for interaction tests `[Medium]`
UI flows need automated coverage beyond controller unit tests

**Applies to:** javafx 26
**Documentation:** [https://github.com/TestFX/TestFX](https://github.com/TestFX/TestFX)

- **Do:** Write TestFX tests for key forms dialogs and navigation
- **Don't:** Only manually click through releases

**Recommended:**
```
clickOn("#nameField").write("Alice"); clickOn("Save"); verifyThat("Saved", isVisible());
```

**Avoid:**
```
// manual QA only
```

---

### Test theme-critical flows with TestFX `[Medium]`
Theme and CSS changes can break focus visibility dialogs and button affordance

**Applies to:** javafx 26
**Documentation:** [https://github.com/TestFX/TestFX](https://github.com/TestFX/TestFX)

- **Do:** Use TestFX for login save validation and modal workflows
- **Don't:** Only inspect AtlantaFX screens manually

**Recommended:**
```
clickOn("#saveButton"); verifyThat(".message", isVisible());
```

**Avoid:**
```
manual theme QA only
```

---

### Cover enterprise happy path and failure path `[High]`
Enterprise UI tests should verify save validation permission and service failure flows

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/robot/Robot.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/robot/Robot.html)

- **Do:** Use TestFX for core workflows and service fakes
- **Don't:** Only test controller methods without UI interaction

**Recommended:**
```
clickOn("Save"); verifyThat("Customer saved", isVisible());
```

**Avoid:**
```
controller.save(); assertTrue(saved);
```

---

## Theme

### Use AtlantaFX as the enterprise theme baseline `[High]`
AtlantaFX provides modern JavaFX themes while preserving standard controls

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/getting-started/](https://mkpaz.github.io/atlantafx/getting-started/)

- **Do:** Use AtlantaFX user-agent stylesheet plus a small app CSS layer
- **Don't:** Rewrite every standard control style from scratch

**Recommended:**
```
Application.setUserAgentStylesheet(new PrimerLight().getUserAgentStylesheet());
```

**Avoid:**
```
scene.getStylesheets().add("/css/huge-custom-theme.css");
```

---

### Prefer Primer for enterprise applications `[Medium]`
PrimerLight and PrimerDark are neutral enough for dense business workflows

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/themes/](https://mkpaz.github.io/atlantafx/themes/)

- **Do:** Use PrimerLight as default and PrimerDark for dark mode
- **Don't:** Use Dracula or Cupertino as the default enterprise theme

**Recommended:**
```
Application.setUserAgentStylesheet(new PrimerLight().getUserAgentStylesheet());
```

**Avoid:**
```
Application.setUserAgentStylesheet(new Dracula().getUserAgentStylesheet());
```

---

### Layer brand CSS after AtlantaFX `[High]`
Application CSS should customize brand tokens and business states after the base theme

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/theming/](https://mkpaz.github.io/atlantafx/theming/)

- **Do:** Add app.css to the Scene after setting AtlantaFX
- **Don't:** Edit AtlantaFX source CSS directly

**Recommended:**
```
scene.getStylesheets().add(getClass().getResource("/css/app.css").toExternalForm());
```

**Avoid:**
```
modify atlantafx-base CSS files
```

---

### Use looked-up colors as enterprise tokens `[High]`
JavaFX looked-up colors keep brand and semantic colors reusable across controls

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/scene/doc-files/cssref.html)

- **Do:** Define app-primary app-success app-warning app-danger on root
- **Don't:** Repeat hex values in every selector

**Recommended:**
```
.root { -app-primary: #2563eb; -app-danger: #dc2626; }
```

**Avoid:**
```
.save { -fx-background-color: #2563eb; } .link { -fx-text-fill: #2563eb; }
```

---

### Keep theme switching centralized `[Medium]`
Dark mode switching should not be scattered across controllers

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/](https://mkpaz.github.io/atlantafx/)

- **Do:** Use a ThemeService that sets user-agent stylesheet and app CSS variants
- **Don't:** Let each controller decide its own theme

**Recommended:**
```
themeService.apply(ThemeMode.DARK);
```

**Avoid:**
```
if(dark) button.setStyle(...);
```

---

### Validate contrast for business status colors `[High]`
Enterprise screens use status colors heavily and need readable contrast

**Applies to:** javafx 26
**Documentation:** [https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

- **Do:** Check text on success warning danger and selected row backgrounds
- **Don't:** Assume brand colors are accessible

**Recommended:**
```
.status-danger { -fx-text-fill: -app-danger; }
```

**Avoid:**
```
red text on dark red background
```

---

### Use AtlantaFX style classes before custom CSS `[Medium]`
AtlantaFX exposes utility styles that reduce custom CSS drift

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/](https://mkpaz.github.io/atlantafx/)

- **Do:** Prefer Styles constants or documented style classes
- **Don't:** Create one-off class names for every button variant

**Recommended:**
```
saveButton.getStyleClass().add(Styles.ACCENT);
```

**Avoid:**
```
saveButton.getStyleClass().add("blue-button-42");
```

---

### Treat AtlantaFX as a base not the whole design system `[High]`
AtlantaFX modernizes controls but enterprise UX still needs layout density and workflow rules

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/](https://mkpaz.github.io/atlantafx/)

- **Do:** Define app shell navigation table density form and validation conventions
- **Don't:** Assume theme choice alone solves enterprise usability

**Recommended:**
```
root.getStyleClass().add("enterprise-shell");
```

**Avoid:**
```
only set PrimerLight and stop
```

---

## Icons

### Use Ikonli for consistent enterprise icons `[Medium]`
Icon fonts integrate cleanly with JavaFX controls and avoid emoji-style UI

**Applies to:** javafx 26
**Documentation:** [https://kordamp.org/ikonli/](https://kordamp.org/ikonli/)

- **Do:** Use FontIcon with semantic style classes
- **Don't:** Use emoji as toolbar or menu icons

**Recommended:**
```
Button refresh = new Button("Refresh", new FontIcon("mdi2r-refresh"));
```

**Avoid:**
```
new Button("Refresh")
```

---

## Components

### Use AtlantaFX controls for common app affordances `[Medium]`
AtlantaFX provides useful controls such as Card Message ModalPane Popover and ToggleSwitch

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/](https://mkpaz.github.io/atlantafx/)

- **Do:** Use built-in AtlantaFX controls before adding another dependency
- **Don't:** Add ControlsFX for components AtlantaFX already covers

**Recommended:**
```
Message message = new Message("Saved", "Customer updated successfully");
```

**Avoid:**
```
new Label("Saved") with ad hoc styling
```

---

### Add ControlsFX only for missing enterprise controls `[Low]`
ControlsFX is useful for specialized controls but should stay optional

**Applies to:** javafx 26
**Documentation:** [https://controlsfx.github.io/](https://controlsfx.github.io/)

- **Do:** Use ControlsFX for SpreadsheetView PropertySheet CheckComboBox or StatusBar needs
- **Don't:** Add ControlsFX by default before requirements are clear

**Recommended:**
```
PropertySheet sheet = new PropertySheet(items);
```

**Avoid:**
```
implementation "org.controlsfx:controlsfx" with no usage
```

---

## Navigation

### Use role-aware navigation models `[High]`
Menus toolbars and shortcuts should reflect the same permission model

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/MenuItem.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/MenuItem.html)

- **Do:** Build navigation items from commands with required roles
- **Don't:** Hide buttons in one place and leave shortcuts enabled

**Recommended:**
```
command.enabledProperty().bind(permissionService.allowed("invoice.approve"));
```

**Avoid:**
```
approveButton.setVisible(false);
```

---

## Workflow

### Represent workflow states visibly `[Medium]`
Approval and processing screens need clear business state signals

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html)

- **Do:** Use semantic badges row styles and disabled actions by workflow state
- **Don't:** Use only free text status columns

**Recommended:**
```
row.pseudoClassStateChanged(PseudoClass.getPseudoClass("blocked"), item.isBlocked());
```

**Avoid:**
```
statusCol.setText("B");
```

---

## TableView

### Design TableView for high-density enterprise data `[High]`
Enterprise users scan compare sort filter and act on rows for long periods

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableView.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TableView.html)

- **Do:** Use compact row height clear columns sorting filtering and selection summary
- **Don't:** Use card grids for large tabular datasets

**Recommended:**
```
table.getStyleClass().add("dense-table"); table.getSortOrder().setAll(updatedAtCol);
```

**Avoid:**
```
new TilePane(customerCards)
```

---

### Keep row actions predictable `[Medium]`
Inline actions in dense tables should be limited and permission-aware

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/ContextMenu.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/ContextMenu.html)

- **Do:** Use context menus or a side detail panel for secondary actions
- **Don't:** Place many buttons in every row

**Recommended:**
```
table.setRowFactory(tv -> { TableRow<Order> row = new TableRow<>(); row.setContextMenu(orderMenu); return row; });
```

**Avoid:**
```
row contains Edit Delete Approve Print Email buttons
```

---

### Use server-side paging for large enterprise datasets `[High]`
Desktop clients should not load entire enterprise tables into memory

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Pagination.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Pagination.html)

- **Do:** Fetch pages or filtered slices from services
- **Don't:** Load all records and filter in the UI

**Recommended:**
```
Page<Customer> page = customerService.search(criteria, pageRequest);
```

**Avoid:**
```
customerRepository.findAll()
```

---

## Forms

### Use form sections for enterprise data entry `[Medium]`
Long enterprise forms need grouping and progressive disclosure

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TitledPane.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/TitledPane.html)

- **Do:** Group fields into titled sections with validation summaries
- **Don't:** Place dozens of inputs in one unbroken GridPane

**Recommended:**
```
TitledPane billing = new TitledPane("Billing", billingForm);
```

**Avoid:**
```
new GridPane with 80 controls
```

---

### Provide validation summary plus field errors `[High]`
Enterprise forms often need multiple corrections before submission

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/css/PseudoClass.html)

- **Do:** Show a summary at top and field-level messages near controls
- **Don't:** Show only one modal alert after Save

**Recommended:**
```
summary.setItems(vm.validationErrors()); field.pseudoClassStateChanged(INVALID, fieldError);
```

**Avoid:**
```
new Alert(ERROR, "Invalid form").showAndWait();
```

---

## Tasks

### Make long operations cancellable `[High]`
Enterprise imports exports sync and reports need cancel paths

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html](https://openjfx.io/javadoc/26/javafx.graphics/javafx/concurrent/Task.html)

- **Do:** Expose cancel button bound to Task running state
- **Don't:** Force users to wait or kill the app

**Recommended:**
```
cancelButton.setOnAction(e -> task.cancel());
```

**Avoid:**
```
runReportButton.setDisable(true);
```

---

### Surface retryable errors without losing context `[High]`
Network and service failures should preserve user input and next action

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Label.html](https://openjfx.io/javadoc/26/javafx.controls/javafx/scene/control/Label.html)

- **Do:** Show inline retry messages and keep form/table state
- **Don't:** Clear the screen on service failure

**Recommended:**
```
message.setDescription("Could not save. Check connection and retry.");
```

**Avoid:**
```
loadErrorScene();
```

---

## Audit

### Log business actions through services `[Medium]`
Enterprise desktop apps need traceability for sensitive changes

**Applies to:** javafx 26
**Documentation:** [https://docs.oracle.com/en/java/javase/26/docs/api/java.logging/java/util/logging/Logger.html](https://docs.oracle.com/en/java/javase/26/docs/api/java.logging/java/util/logging/Logger.html)

- **Do:** Record user action entity result and timestamp in service layer
- **Don't:** Log only UI button clicks

**Recommended:**
```
audit.log(user, "invoice.approve", invoiceId, SUCCESS);
```

**Avoid:**
```
System.out.println("clicked approve");
```

---

## Configuration

### Separate user preferences from application config `[Medium]`
Enterprise apps need deploy-time config and per-user preferences

**Applies to:** javafx 26
**Documentation:** [https://docs.oracle.com/en/java/javase/26/docs/api/java.prefs/java/util/prefs/Preferences.html](https://docs.oracle.com/en/java/javase/26/docs/api/java.prefs/java/util/prefs/Preferences.html)

- **Do:** Use config files for endpoints and Preferences for UI choices
- **Don't:** Hard-code environment URLs and window state

**Recommended:**
```
Preferences.userNodeForPackage(App.class).put("theme", "dark");
```

**Avoid:**
```
private static final String API = "http://localhost:8080";
```

---

## Deployment

### Package resources and themes inside the runtime image `[High]`
AtlantaFX app CSS icons and FXML must be available after jpackage

**Applies to:** javafx 26
**Documentation:** [https://openjfx.io/openjfx-docs/#modular](https://openjfx.io/openjfx-docs/#modular)

- **Do:** Load resources from classpath or module resources
- **Don't:** Load theme files from developer machine paths

**Recommended:**
```
getClass().getResource("/css/app.css").toExternalForm();
```

**Avoid:**
```
new File("src/main/resources/css/app.css").toURI()
```

---

### Write logs to user-writable locations `[Medium]`
Installed desktop apps may not write inside the application directory

**Applies to:** javafx 26
**Documentation:** [https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html)

- **Do:** Use platform-specific user data directories for logs and cache
- **Don't:** Write logs beside the executable

**Recommended:**
```
Path logs = appData.resolve("logs/app.log");
```

**Avoid:**
```
Path.of("app.log")
```

---

## Dependencies

### Keep optional UI libraries behind actual needs `[Medium]`
AtlantaFX should be default but additional libraries should be justified

**Applies to:** javafx 26
**Documentation:** [https://mkpaz.github.io/atlantafx/getting-started/](https://mkpaz.github.io/atlantafx/getting-started/)

- **Do:** Start with JavaFX AtlantaFX Ikonli TestFX and add ControlsFX only for missing controls
- **Don't:** Adopt many UI libraries at project start

**Recommended:**
```
dependencies { implementation("io.github.mkpaz:atlantafx-base:2.1.0") }
```

**Avoid:**
```
implementation controlsfx gemsfx tilesfx materialfx all at once
```

---
