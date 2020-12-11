# Complete Documentation of the DataGrid Component

The datagrid provides basic functions for data tables:

* sorting
* filtering
* pagination
* editing

The grid provides a decorator enhanced model and the grid appears driven by model meta data.

## Basic Features

To use the grid, you must first define a view model for a single item. This can look like this:

~~~~~~~~typescript
import * as UI from 'svogv';
import { PercentPipe } from './pipe/percent.pipe';

export class UserViewModelList {

  @UI.Hidden()
  id = 0;

  @UI.Display('E-Mail', 20, 'E-Mail address')
  email = '';

  @UI.Display('Phone Number', 30, 'The user\'s phone')
  phoneNumber = '';

  @UI.Display('User Name', 10, 'The full name')
  @UI.UiHint({ 'width': '200px' })
  userName = '';

  @UI.Display('Age', 40, 'From 12 to 88')
  age = 0;

  @UI.Display('Done', 100, 'Work progress')
  @UI.FormatPipe(PercentPipe)
  @UI.Sortable(false)
  done?: number = 0;

  @UI.Display('Active', 200, 'User is active')
  @UI.Sortable(false)
  active?= false;
}
~~~~~~~~

In your component's code you must create a valid model, using the class {@link DataGridModel}. You must provide a type and the model must have properties that are set at runtime. You can enforce runtime values by adding default value to all properties. This is mandatory.

~~~typescript
const data: UserViewModel[] = this.dataSource; // provide a simple array here
this.model = new DataGridModel<UserViewModel>(data, UserViewModel);
~~~

> If you get TSLINT warnings here, adjust your settings by allowing default values along with the types. If that is not possible, remove the types, but not the defaults.

### The UI Decorators

The decorators control the appearance of the grid:

* `@Hidden()`: The column will not be shown by default. But you can add the column later dynamically anyway. See advanced examples below.
* `@Display()`: The text of the header, the order and a tooltip that appears on the header element.
* `@UiHint()`: An additional style that applies to the cell.
* `@FormatPipe()`: A pipe that renders the data value for `string`, `number` and `date`. Other types ignore this.
  Be aware, that if you provide a custom template for a cell you must provide pipe instruction to render this properly.
* `@Sortable()`: Suppresses the sort buttons if set to `false`. Default is with standard sorting (JS array `sort`).
  You can provide a custom sort expression to sort other than ECMAScript default. The expression is handled as callback.
* `@TemplateHint()`: Replace the template with a custom one regardless the type. See below for details.

> Note, the validators such as `@Required` have no function in the grid. They might be useful if the same model is
> being used for forms or inline editing.

## Templates

The appearance of cells can be modified in various ways. First, the grid provides default templates for certain data types. Second, the
internal behavior can be overwritten by providing a template with the same name , such as '#boolean'. Third, the model can provide a
`@TemplateHint('template')` decorator, whereas 'template' is the name of a custom template. All three variants can be mixed.

~~~~~~~~html
<ac-datagrid [model]="model" [showActions]="false" [externals]="{ AgeTemplate: ForAgeTemplate }">
  <ng-template #boolean let-item>
    <span *ngIf="item">YES</span>
    <span *ngIf="!item">NO</span>
  </ng-template>
  <ng-template #ForAgeTemplate let-item> Age: {{ item }} </ng-template>
</ac-datagrid>
~~~~~~~~

Here, the templates named *boolean* overwrites the internal fallback template *booleanFallback* (see {@link DatagridComponent.booleanFallback}). The data are delivered as default parameter and you can name it as you like. Pipes are delivered as *pipe* and *params*, respectively. If there is a local pipe, you can omit the `@FormatPipe` decorator and apply the pipe directly. The decorator is just a convenience function to create more sophisticated model types.

~~~typescript
let-modelpipe="pipe" let-params="params"
~~~

The second example shows a custom template, *ForAgeTemplate*. That's something you can address with the `@TemplateHint` decorator like this:

~~~typescript
@TemplateHint('ForAgeTemplate')
~~~

The field decorated like this will pull the custom template and you have total control about the render process, even by-passing the fallbacks.

## Advanced Features

The grid supports several parameters to handle all the various features.

### Styles

The grid has properties for several parts that accept a style in the same way `[ngStyle]` works.

~~~~~~~~html
<ac-datagrid
  [model]="model"
  [showActions]="false"
  [columnStyle]="{
    footer: { 'background-color': footerColor },
    first: { 'background-color': firstColor },
    header: {
      color: headerForeColor,
      'background-color': headerBackColor
    },
    headerSortButton: { color: sortIconColor }
  }"
></ac-datagrid>
~~~~~~~~

### Button and Text

All buttons and text portions can be customized or localized. Just provide an alternate text. All such elements have a fallback in plain English.

~~~~~~~~html
<ac-datagrid [model]="model"
            [showActions]="true"
            [reArrangeColumns]="true"
            textButtonsHeader="Some Actions"
            textDeleteButton="Delete Item"
            textEditButton="Edit Me"
            (editItem)="edit($event)"
            (deleteItem)="delete($event)">
</ac-datagrid>
~~~~~~~~


