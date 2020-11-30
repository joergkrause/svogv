# ![](https://github.com/joergkrause/svogv/blob/master/guides/logo.png?raw=true) SVOGV Grid and Forms Library

[![Build](https://img.shields.io/travis/joergkrause/svogv/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/svogv)
[![Coverage Status](https://img.shields.io/coveralls/joergkrause/svogv/master.svg?style=flat-square)](https://coveralls.io/github/joergkrause/svogv?branch=master)
[![Downloads](https://img.shields.io/npm/dm/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Version](https://img.shields.io/npm/v/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![License](https://img.shields.io/npm/l/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)

[![Dependencies](https://img.shields.io/david/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv)
[![Dev Dependencies](https://img.shields.io/david/dev/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv#info=devDependencies)

## Target Audience

This library is for Angular Version 2 or newer. The current release is for Angular 8 and matches the current Angular version usually.

The design / UI stuff is made using Bootstrap 4, and even here the current version is used.

It's for developers who create standard forms and want to automate the development process.

> Demo and project are made using Angular CLI. Current version is made using **@angular/cli**.

## Introduction

This library is for making forms. Easy and fast. It has these advantages:

* All form parts are being created dynamically by using decorators. These control the UI and validation.
* All styles are based on Bootstrap 4, can be used together with themes and custom parts can be changed.
* A grid component makes data tables very easy to use.
* A tree view is another component.
* Dynamic editors and an autoform component creates the whole form without code.

## What is it?

The approach was simply to improve the creation of forms as simple as ever in Angular. It's an extension to Angular that comes as a set of classes (injectable services) and components.

It's available as source code or as ready to use umd-bundle. The bundle is plane JavaScript. The sources are available via *npm* and from *github*.

> It's pretty small, too. It's 300 KB as a bundle and roughly 39 KB minified, close to 10 KB zipped.

## Issues?

As of version 0.6 none known issues. Please report issues through Github.

Have you worked with the version 0.3 before? 0.6 has breaking changes because of a new build process.
**In 0.7 I have again made significant changes towards the 1.0 release.**
I'm using Angular CLI for all steps and sync the version with Angular (Angular 6 is SVGOV 0.6, Angular 7 is SVGOV 0.7, and so on). After the first final is being release I plan to jump the version to match the Angular major release. Hence, 0.6 is 6, 0.7 is 7 and so on. Currently supporting Angular 11.

## Angular Data Annotations

The idea of data annotations is somehow heavily inspired by the namespace `System.ComponentModel.DataAnnotations` of .NET Core. There is absolutely no dependency at all, though. You can find more [here](https://docs.microsoft.com/de-de/dotnet/api/system.componentmodel.dataannotations?view=netframework-4.8).

The basic idea is that we usually use view models anyway. So, why not using them to provide all information necessary to create a form that way?

### How does it work?

Let's assume you have a viewmodel like this:

~~~
export class UserViewModel {

  @Hidden()
  id: Number = 0;

  @Display('E-Mail', 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 'The user\'s phone')
  @Required()
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';

}
~~~

As you see there are several **decorators**. SVOGV has decorators for display hints, such as `@Display`. And it has decorators to manage the validation, such as `@MaxLength()`.

The usage is simple; just import like this (selection, there are more options):

~~~
import {
  Required,
  MaxLength,
  Range,
  Email,
  Display,
  Hidden,
  UiHint,
  Format
} from 'svogv';
~~~

Or alternatively prefix your import:

~~~
import * as FormHints from 'svogv';

export class UserViewModel {

  @FormHints.Display('E-Mail')
  eMail: string = '';

}
~~~

### Using in Forms

The form needs to be aware of the decorators. Hence, there is a service that creates an advanced `FormGroup` instance. It's called `FormValidatorService`. Internally it's using Angular's *ReactiveFormsModule*, so this is a dependency.

In a component's code it looks like this:

~~~
import { FormValidatorService } from 'svogv';

export class EditUserComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fv: FormValidatorService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type
    this.myForm = this.fv.build(UserViewModel);
  }
}
~~~

In this example `UserViewModel` is the decorated view model. It's just the type that the service requires, not an actual instance. However, the service will create an instance, and hence the model must be a `class`, not an `interface`. Also, all properties must be set, usually by setting defaults, because internally the properties are read by a `for of` loop.

Now the form knows all about the view model. Let's build a form on top on this:

~~~
<form (ngSubmit)="saveUser()" [formGroup]="myForm" role="form" class="row">
  <fieldset>
    <legend>Edit current user</legend>
      <ac-editor [formGroup]="myForm" [name]="'userName'" ></ac-editor>
      <ac-editor [formGroup]="myForm" [name]="'email'" ></ac-editor>
      <ac-editor [formGroup]="myForm" [name]="'phoneNumber'" ></ac-editor>
      <button type="submit">Save</button>
  </fieldset>
</form>
~~~

The important part is the component `<ac-editor>`. This component checks the property type, the decorators, and the form's settings and creates a complete form element in Bootstrap 4 style (the template is, of course, customizable). The connection between the service's outcome -- the `FormGroup` -- and the components is being made through setting the form group's instance (here `myForm`) using the input property `formGroup`.

And that's it. The form is pretty, has fully working validation, and is easy to access from your component. And yes, there is no additional code necessary to get it running.

### Auto Forms

Even simpler, you can create a complete form with **just one tag**. Just go like this:

~~~
<form (ngSubmit)="saveUser()" [formGroup]="myForm" role="form" class="row" autoform>
  <fieldset>
    <legend>Edit current user</legend>
    <ac-autoform [formGroup]="myForm"></ac-autoform>
    <div class="row">
      <button class="btn btn-sm btn-success" type="submit" [disabled]="!myForm.valid">
        <i class="fa fa-save"></i> Save
      </button>
    </div>
  </fieldset>
</form>
~~~

The only component here is `<ac-autoform>` that connects to the form using the attribute `formGroup`. Use binding syntax here as this is an object. The form is build upon Bootstrap 4 again and can be modified by several helper decorators.

#### Validation Decorators

| Decorator | Usage |
|-----------|-------|
|**@StringLength**| Set the strings minimum (optional) and maximum length. It's a summary of `@MinLength` and `@MaxLength`. |
|**@MaxLength**| The maximum length of a text input. |
|**@MinLength**| The minimum length of a text input. |
|**@Pattern**| A regular expression that is used to test the text or number input.|
|**@Range**| A range (from-to) for either numerical values or dates. |
|**@Required**| Makes the field mandatory. |
|**@EMail**| Checks input against a (very good) regular expression to test for valid e-mail pattern.|
|**@Compare**| Compares with another field, usually for password comparision.|

#### UI Decorators

| Decorator | Usage | ...Grid | ...Editor | ...Auto Form | ...Tree\*\* |
|-----------|-------|-----------------|-------------------|----------------------|--|
|**@Display**| Determine the label's name and a tooltip ( optionally), You can also provide the fields' order.| Yes, Header row | Yes, label text | Yes, label text | No |
|**@DisplayGroup**| Groups components in `<fieldset>` elements. Can be ordered inside the form. | No | No | Yes, fieldset | No |
|**@Hidden**| Exclude as field from an autoform. | Yes, excludes column | Yes, makes hidden field | Yes | Yes |
|**@Sortable**| Makes a column sortable. Default is `true`. | Yes | No | No | No |
|**@Placeholder**| A watermark that appears in empty form fields| No | Yes | Yes | No |
|**@TemplateHint**| Forces a particular render type. Usually you get fields a shown in the table below. With a hint you can force other types.| Yes, replaces cell content with template | No | No | Planned |
|**@ReadOnly**| Renders the field readonly, if the shown element can support this. For all other fields this is being ignored.| No | Yes | Yes | Yes |
|**@FormatPipe**| Executes the pipe before rendering the data. Usually used in the grid component.| Yes, applies pipe to cell's content | No | No | No |
|**@UiHint**| Additional custom styles\*. | Yes | Yes | Yes | Yes |

\* This is available from 0.7.4 onwards. Style apply to columns' header and cells as well as to form elements in editor. The object required is a style object in the form `{ 'style': 'rule' }`.
\*\* This is available from 0.7.5 onwards.

The editor component is able to determine the appearance dependent on the type:

| Data Type | Template Hint   | Field Type        | Options for @TemplateHint | Remark                                                |
|-----------|-----------------|-------------------|---------------------------|-------------------------------------------------------|
| string    | text (no params)| type="text"       | Text, TextArea            | TextArea accepts additional parameters for row and col|
| boolean   | bool (no params)| type="checkbox"   | Checkbox, Toggle, Radio   | Default is checkbox
| number    | num (no params) | type="number"     | Range                     | Default is numeric field, Range is a slider
| Date      | date (val,cal)* | type="date"       | Calendar                  | Calender is provided by browser feature
| enum      | enum (no params)| &lt;select&gt;-Box| -                         | Renders an Enum as Dropdown list

\* With *cal* it shows a calendar, with *val* just the value. Use a pipe and `@FormatPipe(DatePipe)` for formatting. Calendar appears in edit mode only.

## Server Support through JSON

As of version 0.3.5 it's possible to use a specially designed JSON object to configure the forms. It's an exact pendant to the decorators. The difference is that you don't need to write any viewmodels in TypeScript. Just deliver an appropriate formatted document from your API and you're set. Here is the definition for the JSON structure:

~~~
export interface FormValidatorModel {
  [field: string]:
      displayType |
      displayGroupType |
      formatType |
      hiddenType |
      placeHolderType |
      compareType |
      maxlengthType |
      minlengthType |
      patternType |
      stringLengthType |
      emailType |
      requiredType;
}
~~~

The types have the same description as the decorators.

## The Components

The components complement the editor by adding more parts typically used in forms apps. There are many such components available, but sometimes there are pieces that we need quite often but nothing is really handy. So I created a small set of such components:

* **TreeView**: An advanced tree view with icon support and many options such as selections and checkboxes. Uses `EventEmitter` to fire several tree node events.
* **DataGrid**: A classic data grid. It provides a model to handle:
  * paging
  * filtering
  * sorting
  * dynamic columns

The grid is controlled by decorators (see table above), so the view model actually creates the grid's appearance.

## Where to get?

It's available from *npm* by using this command:

~~~
npm install svogv --save
~~~

You get these parts:

* **FormValidatorService** -- am injectable class to build reactive forms
* **FormValidatorFromJsonService** -- am injectable class to build reactive forms from server data
* **Editor** -- the universal editor component for one field
* **AutoForm** -- the universal editor component for complete multi field forms
* **DataGrid** -- an advanced grid component, model driven
* **TreeView** -- a tree with some nice features
* **Decorators** -- a set of decorators to manage the behavior and appearance of grid, tree and forms

### More to read

For more information read the [Getting started guide](/guides/getting-started.md).

See demo and API docs running on [SVOGV](http://www.svogv.com).

### Demo App

There is a [demo app](/src/demo/README.md) where you can see the components in action.

See demo and API docs running on [SVOGV](http://www.svogv.com).

## Quick Start

To have a running sample in seconds do the following:

1. Clone the repository from Github
2. Assure you have **node** running and **npm** and Typescript (**tsc**) is in the path
3. Execute this command: `npm install`
4. Execute this command: `npm run build`

If everything goes fine start the demo:

~~~
npm start
~~~

A browser window shall open automatically (if not, open *http://locahost:4200*) and shows a dashboard from where you can navigate the various components.

Select these options in the left hand menu:

* Forms Demo: All about the decorators
* Widgets > Overview: The UI widgets demo

> The demo app is independent and has it's own package.json and node_modules folder and hence needs it's own setup. The first command (setup) takes care of this all.

## Licensing?

It's ISC licensed and it's free. I deeply believe in Open Source and will support the ecosystem by open sourcing all parts of the project. For commercial users such as enterprises I have support options.

### About the Author

The SVOGV Widget Library was written by Joerg <isageek> Krause, [www.joergkrause.de](https://www.joergkrause.de), Berlin / Germany. He has many years of experience with Web-Frameworks. He were in the business in the early JavaScript days, know every single bit in jQuery and learnt a lot about Knockout, Angular, and React. But time goes on. So he moved almost all projects to either AngularJS or Angular 2+. He thinks that knowing one Framework really well is more for our customers than knowing a lot just good. So he decided to do more and start contributing to the Angular ecosystem by creating awesome libraries and components.

## Can one contribute?

Yes, drop me an email with some "about me" stuff. Even simple feedback is appreciated.

![](https://github.com/joergkrause/svogv/blob/master/guides/logo_big.png?raw=true)

## Looking for an Angular Dev?

Yes, I'm available for all kind of remote jobs. If you need a really good full-stack dev, than drop me an email (joerg@krause.de) or write through my homepage's [contact form](https://www.joergkrause.de/contact).

I write sophisticated stuff quickly and in very high quality in these technologies:

* Frontend: Angular, React
* Backend: Node, ASP.NET Core, Entity Framework Core
* Cloud: Azure CosmosDb, Azure Functions, Azure Event Hub, Azure IoT, AWS S3, AWS Lambda
* Other: Alexa Skills
