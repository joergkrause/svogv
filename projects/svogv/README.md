# ![](https://github.com/joergkrause/svogv/blob/master/guides/logo.png?raw=true) SVOGV Widgets and Forms Library

[![Build](https://img.shields.io/travis/joergkrause/svogv/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/svogv)
[![Coverage Status](https://img.shields.io/coveralls/joergkrause/svogv/master.svg?style=flat-square)](https://coveralls.io/github/joergkrause/svogv?branch=master)
[![Downloads](https://img.shields.io/npm/dm/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Version](https://img.shields.io/npm/v/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![License](https://img.shields.io/npm/l/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)

[![Dependencies](https://img.shields.io/david/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv)
[![Dev Dependencies](https://img.shields.io/david/dev/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv#info=devDependencies)

## Introduction

Angular is widely used and we have a strong feeling in our guts that’s now the first step from ancient crap into something really professional for daily project works. It brings the level we all know from Java and C# and their mature backend frameworks to the frontend. And, additionally, TypeScript is here and know we have something that’s an improvement for front end developers that matters. TypeScript brings a whole new level to pros like us. And it makes our world easier – at least a bit. And it improves the quality of our product – not just a bit, a whole new step.

However, there is no framework that can't be improved. So I tried to copy a concept from .NET -- the DataAnnotations -- straight to Angular. In this version I'm using Bootstrap 4 for a decorator based forms generator and some nice, small form widgets. 

## What is it?

The approach was simply the usage of forms as simple as ever in Angular. It's an extension to Angular that comes as a set of classes and components. 

It's available as source code or as ready to use umd-bundle. The bundle is plane JavaScript. The sources are available via *npm* and from *github*. 

> It's pretty small, too. It's 300 KB as a bundle and roughly 39 KB minified, close to 10 KB zipped. 

## Issues?

As of version 0.6 none known issues. Please report issues through Github.

Have you worked with the version 0.3 before. 0.6 has breaking changes because of a new build process. 
**In 0.7 I have again made significant changes towards the 1.0 release.**
I'm using Angular CLI for all steps and sync the version with Angular (Angular 6 is SVGOV 0.6, Angular 7 is SVGOV 0.7, and so on). After the first final is being release I plan to jump the version to match the Angular major release. Hence, 0.6 is 6, 0.7 is 7 and if I could move to 1.0 and at that time Angular 8 is out, it will become SVOGV 8.

## Angular Data Annotations

The idea of data annotations is somehow heavily inspired by the namespace `System.ComponentModel.DataAnnotations` of .NET Core. There is
absolutely no dependency at all, though.

### How does it work?

We did this by using a straight domain model. Let's assume you have a viewmodel like this:

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

As you see we use several decorators. We have decorators for display hints, such as `Display`. And we have decorators to manage the validation, such as `MaxLength()`. 

The usage is simple; just import like this:

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
import * as Validator from 'svogv';

export class UserViewModel {

  @Validator.Display('E-Mail')
  eMail: string = '';

}
~~~

Now the forms part. The form needs to be aware of the decorators. So we have a service that creates an advanced `FormGroup` instance. We call it the `FormValidatorService`. 

In a component this looks like this:

~~~
import { FormValidatorService } from 'svogv';

export class EditUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fv: FormValidatorService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type     
    this.userForm = this.fv.build(UserViewModel);
  }
}
~~~

Now the form knows all about the model. Now let's build a form.

~~~
<form (ngSubmit)="saveUser()" [formGroup]="userForm" role="form" class="row">
  <fieldset>
    <legend>Edit current user</legend>
      <ac-editor [userForm]="userForm" [name]="'userName'" ></ac-editor>
      <ac-editor [userForm]="userForm" [name]="'email'" ></ac-editor>
      <ac-editor [userForm]="userForm" [name]="'phoneNumber'" ></ac-editor>
      <button type="submit">Save</button>
  </fieldset>
</form> 
~~~

The tricky part is the component `<ac-editor>`. This component checks the property type, the decorators, and the form's settings and creates a complete form element in Bootstrap 4 style (the template is, of course, customizable).

And that's it. The form is pretty, has a fully working validation, and is easy to access from your component. And yes, there is no additional code necessary to get it running.

Even simpler, you can create a complete form with just one tag. Just go like this:

~~~
<form (ngSubmit)="saveUser()" [formGroup]="userForm" role="form" class="row" autoform>
  <fieldset>
    <legend>Edit current user</legend>
    <ac-autoform [formGroup]="userForm"></ac-autoform> 
    <div class="row">
      <button class="btn btn-sm btn-success" type="submit" [disabled]="!userForm.valid">
        <i class="fa fa-save"></i> Save
      </button>
    </div>
  </fieldset>
</form>
~~~

The only component here is `<ac-autoform>` that connects to the form using the attribute `formGroup`. Use binding syntax here as this is an object. The form is builds upon Bootstrap 4 and can be modified by several helper annotations (decorators). 
Especially those decorators are helpful (just a selection, there are many more):

* **@Display** Determine the label's name and a tooltip (optionally), You can also provide the fields' order.
* **@Hidden** Exclude as field from a autoform
* **@Placeholder** A watermark that appears in empty form fields
* **@TemplateHint** Forces a particular render type. Usually you get fields a shown in the table below. With a hint you can force other types.

| Data Type | Template Hint   | Field Type        | Options for @TemplateHint | Remark                                                |
|-----------|-----------------|-------------------|---------------------------|-------------------------------------------------------|
| string    | text (no params)| type="text"       | Text, TextArea            | TextArea accepts additional parameters for row and col|
| boolean   | bool (no params)| type="checkbox"   | Checkbox, Toggle, Radio   | Default is checkbox
| number    | num (no params) | type="number"     | Range                     | Default is numeric field, Range is a slider
| Date      | date (val,cal)* | type="date"       | Calendar                  | Calender is provided by browser feature
| enum      | enum (no params)| &lt;select&gt;-Box| -                         | Renders an Enum as Dropdown list

\* With *cal* it shows a calendar, with *val* just the value. Use a pipe and `@Format(DatePipe)` for formatting. Calendar appears in edit mode only.

## Server Support through JSON

As of version 0.3.5 it's possible to use a specially design JSON object to configure the forms. It's an exact pendant to the decorators. The difference is that you don't need to write any viewmodels in TypeScript. Just deliver an appropriate formatted document from your API and you're set. Here is the definition for the JSON structure:

~~~
export interface FormValidatorModel {
  [field: string]: displayType | displayGroupType | formatType | hiddenType | placeHolderType | compareType | maxlengthType | minlengthType | patternType | stringLengthType | emailType | requiredType;
}
~~~

The types have the same description as the decorators.

## The Widgets

The widget complement the editor by adding more parts typically used in form apps. There are many such components available, but sometimes there are pieces that we need quite often but nothing is really handy. So I created a small set of such components:

* **TreeView**: An advanced treeview with icon support and many options such as selections and checkboxes. Uses `EventEmitter` for actions.
* **DataGrid**: A different approach for a grid, it provides a model to handle paging, filtering, and sorting, but no HTML. So the hard part is in the grid and the easy part is up to you. 

> As of version 0.7 the **InfoBox** has been removed and moved to the demo code. The purpose of SVOGV is just extended grid functionality.

## Where to get?

It's available from *npm* by using this command:

~~~
npm install svogv --save
~~~

You get three parts (at least, this list will grow quickly):

* FormValidatorService -- a static class to build reactive forms
* Editor -- the universal editor component
* Decorators -- a set of decorators to manage the behavior of properties

### More to read

For more information read the [Getting started guide](/guides/getting-started.md).

### Demo App

There is a [demo app](/src/demo/README.md) where you can see the components in action.

## Quick Start

To have a running sample in seconds do the following:

1. Clone the repository from Github
2. Assure you have **node** running and **npm** and Typescript (**tsc**) is in the path
3. Execute this command: `npm install`
4. Execute this command: `npm run build` 

A browser window shall open automatically and shows a dashboard from where you can navigate the various components. 

Select these options in the left hand menu:

* Forms Demo: All about the decorators
* Widgets > Overview: The UI widgets demo

> The demo app is independent and has it's own package.json and node_modules folder and hence needs it's own setup. The first command (setup) takes care of this all.

## Does it cost something?

It's ISC licensed and it's free. I deeply believe in Open Source and will support the ecosystem by open sourcing all parts of the project. For commercial users such as enterprises we have support options.

The SVOGV Widget Library was written by Joerg <isageek> Krause, www.joergkrause.de, Berlin / Germany. He has many years of experience with Web-Frameworks. He were in the business in the early JavaScript days, know every single bit in jQuery and learnt a lot about Knockout, Angular, and Durandal. But time goes on. So he moved almost all projects to either AngularJS or Angular 2+. He thinks that knowing one Framework really well is more for our customers than knowing a lot just good. So he decided to do more and start contributing to the Angular ecosystem by creating awesome libraries and components. 

## Can I contribute?

Yes, drop me an email with some "about me" stuff. Even simple feedback is appreciated.

![](https://github.com/joergkrause/svogv/blob/master/guides/logo_big.png?raw=true)
