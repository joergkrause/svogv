# ![](https://github.com/joergkrause/svogv/blob/master/guides/logo.png?raw=true) SVOGV Widget and Forms Library

[![Coverage Status](https://img.shields.io/coveralls/joergkrause/svogv/master.svg?style=flat-square)](https://coveralls.io/github/joergkrause/svogv?branch=master)
[![License](https://img.shields.io/npm/l/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjoergkrause%2Fsvogv.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjoergkrause%2Fsvogv?ref=badge_shield)

[![Dependencies](https://img.shields.io/david/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv)
[![Dev Dependencies](https://img.shields.io/david/dev/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv#info=devDependencies)

## Available Versions

Currently we support two versions, one for Bootstrap and one for Angular Material. You can use one or the other, but not both at the same time.

> In the repository we have these versions in branches. The main branch (master) contains the former single version, 
> which is primarily the Bootstrap one. In the branch named **split** the project has been splitted into one single source
> for two different packages. That makes development easier and usage more convenience. 

**We strongly recommend users of the *svogv* package to update to `@svogv/bootstrap` as soon as as possible.**

We plan to make the **svogv** branch deprecated in 2018, January, 31rd. Feel free to drop a mail or open an issue if you have trouble migrating.

**Why oh why?**

Good question. It's hard to say what's the future of Bootstrap. As Material gets mature and better it has big potential. And it's very close for Angular Devs. Having something built exclusively for Angular it's hard to avoid Material. So we're going both ways. Along with this step the new project structure is going to be able to handle even more CSS frameworks natively. 

### Bootstrap 4

~~~
npm i @svogv/bootstrap
~~~

[![Bootstrap Package](https://img.shields.io/npm/dm/svogv.svg?style=flat-square)](https://npmjs.com/packages/@svogv/bootstrap)
[![Bootstrap Version](https://img.shields.io/npm/v/svogv.svg?style=flat-square)](https://npmjs.com/packages/@svogv/bootstrap)

### Material 2

~~~
npm i @svogv/material
~~~

[![Material Package](https://img.shields.io/npm/dm/svogv.svg?style=flat-square)](https://npmjs.com/packages/@svogv/material)
[![Material Version](https://img.shields.io/npm/v/svogv.svg?style=flat-square)](https://npmjs.com/packages/@svog/material)

## Introduction

The purpose of this project is productivity. It allows developers to create Angular apps faster and more reliable. One of the main pain points of apps are forms. And especially the way we deal with validation and user interaction. While a form in itself is more or less simple, the way we handle changes is not. If the API adds a field the dev must add th markup, the service proxy, the field specific validation and often the whole UI needs some tweaking. If the new data appear at several localtions, the amount of work can be tremendous.

**@svogv** is probably a clever solution to handle this. It's a small collection of widgets that can interact with a model. The model can be build by decorators on top of a class (that's, then, a view model) or provided by JSON send from the backend. It makes use of the ReactiveFormsModule from Angular. 

The components require a lot of CSS and hence do have dependencies to other libs. Therefore there are currently two versions that support either Bootstrap 4 projects or thiose made on top of the Angular Material 2 toolkit and extend the Angular Material CDK.

You use either of these, never both at the same time. The API and bundle names are identical.

## What is it?

The approach was simply the usage of forms as simple as ever in Angular 2+. It's an extension to Angular 2+ that comes as a set of classes and components. 

It's available as source or as ready to use umd-bundle. The bundle is plane JavaScript. The sources are available via *npm* and from *github*. 

> It's pretty small, too. It's 117 KB as a bundle and roughly 22KB compressed. In demo I'm down to 207 KB __including__ Angular and Rx! For the CDK based package is roughly 400 KB, but you would need the CDK anywhy in a Material project and the bunlder will finally do not pack it again so it's not a real impact, finally.

## Issues?

The fun controls (Analog Clock and Loader Icons) both do not work in IE 11. The Loader Icons do not work in Edge either. 

## Angular Data Annotations

### How does it work?

We did this by using a straight domain model. Let's assume you have a viewmodel like this:

~~~
export class UserViewModel {

  @Hidden()
  id: Number = 0;

  @Display('E-Mail', 10, 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 20, 'The user\'s phone')
  @Required()
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 30, 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';

}
~~~

As you see we use several decorators. We have decorators for display hints, such as `Display`. And we have decorators to manage the validation, such as `MaxLength()`. The second parameter of `Display()` is the order within the form.

### Usage with Bootstrap

> In case you work with Material 2, just use `@svogv/material` for the package source. Otherwise, both packages behave the same.

The usage is simple; just import like this:

~~~
import { 
  Required, 
  MaxLength, 
  Range, 
  Email, 
  Display, 
  Hidden 
} from '@svogv/bootstrap';
~~~

Or alternatively prefix your import:

~~~
import * as Validator from '@svogv/bootstrap';

export class UserViewModel {

  @Validator.Display('E-Mail')
  eMail: string = '';

}
~~~

Now the forms part. The form needs to be aware of the decorators. So we have a service that creates an advanced `FormGroup` instance. We call it the `FormValidatorService`. 

In a component this looks like this:

~~~
import { FormValidatorService } from '@svogv/bootstrap';

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

The only component here is `<ac-autoform>` that connects to the form using the attribute `formGroup`. Use binding syntax here as this is an object. The form is buils upon Bootstrap 4 and can be modified by several helper annotations (decorators). 
Especially those decorators are helpful (just a selection, there are many more):

* **@Display** Determine the label's name and a tooltip (optionally), You can also provide the fields' order.
* **@Hidden** Exclude as field from a autoform
* **@Placeholder** A watermark that appears in empty form fields
* **@TemplateHint** Forces a particular render type. Usually you get fields a shown in the table below. With a hint you can force other types.

| Data Type   | Field Type        | Options for @TemplateHint | Remark                                                |
|-------------|-------------------|---------------------------|-------------------------------------------------------|
| string      | type="text"       | Text, TextArea            | TextArea accepts additional parameters for row and col|
| boolean     | type="checkbox"   | Checkbox, Toggle, Radio   | Default is checkbox
| number      | type="number"     | Range                     | Default is numeric field, Range is a slider
| Date        | type="date"       | Calendar                  | Calender is provided by browser feature
| enum        | &lt;select&gt;-Box| -                         | Renders an Enum as Dropdown list

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
* **InfoBox**: A simple panel with header and some configuration options, best for creating tile based layouts
* **DataGrid**: A different approach for a grid, it provides a model to handle paging, filtering, and sorting, but no HTML. So the hard part is in the grid and the easy part is up to you. 

This comes with two fun components just made for learning purposes:

* **AnalogClock**: It is what it says -- based on SVG
* **LoaderIcon**: A circling icon that is highly customizable

## Where to get?

It's available from *npm* by using this command (for Bootstrap 4):

~~~
npm install @svogv/bootstrap --save
~~~

You get three parts (at least, this list will grow quickly):

* FormValidatorService -- a static class to build reactive forms
* Editor -- the universal editor component
* Decorators -- a set of decorators to manage the behavior of properties

It's available from *npm* by using this command (for Angular Material 2):

~~~
npm install @svogv/material --save
~~~


### More to read

For more information read the [Getting started guide](/guides/getting-started.md).

### Demo App

There is a [demo app](/src/demo/README.md) where you can see the components in action.

## Quick Start

To have a running sample in seconds do the following:

1. Clone the repository from Github
2. Assure you have **node** running and **npm** and Typescript (**tsc**) is in the path
3. Execute this command: `npm run setup`
4. Execute this command: `npm run demoall` 

A browser window shall open automatically and shows a dashboard from where you can navigate the various components. 

Select these options in the left hand menu:

* Forms Demo: All about the decorators
* Widgets > Overview: The UI widgets demo

> The demo app is independent and has it's own package.json and node_modules folder and hence needs it's own setup. The first command (setup) takes care of this all.

## Does it cost something?

It's ISC licensed and it's free. I deeply believe in Open Source and will support the ecosystem by open sourcing all parts of the project. For commerical users such as enterprises we have support options.

The SVOGV Widget Library was written by Joerg <isageek> Krause, www.joergkrause.de, Berlin / Germany. He has many years of experience with Web-Frameworks. He were in the business in the early JavaScript days, know every single bit in jQuery and learnt a lot about Knockout, Angular, and Durandal. But time goes on. So he moved almost all projects to either AngularJS or Angular 2+. He thinks that knowing one Framework really well is more for our customers than knowing a lot just good. So he decided to do more and start contributing to the Angular ecosystem by creating awesome libraries and components. 

## Can I contribute?

Yes, drop me an email with some "about me" stuff. Even simple feedback is appreciated.

![](https://github.com/joergkrause/svogv/blob/master/guides/logo_big.png?raw=true)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjoergkrause%2Fsvogv.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjoergkrause%2Fsvogv?ref=badge_large)