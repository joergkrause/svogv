# SVOGV ![](https://github.com/joergkrause/svogv/blob/master/guides/logo.png?raw=true) Widget Library

[![Build](https://img.shields.io/travis/joergkrause/svogv/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/svogv)
[![Coverage Status](https://img.shields.io/coveralls/joergkrause/svogv/master.svg?style=flat-square)](https://coveralls.io/github/joergkrause/svogv?branch=master)
[![Downloads](https://img.shields.io/npm/dm/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Version](https://img.shields.io/npm/v/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![License](https://img.shields.io/npm/l/svogv.svg?style=flat-square)](https://npmjs.com/packages/svogv)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)

[![Dependencies](https://img.shields.io/david/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv)
[![Dev Dependencies](https://img.shields.io/david/dev/joergkrause/svogv.svg?style=flat-square)](https://david-dm.org/joergkrause/svogv#info=devDependencies)


## Introduction

Now that Angular 2 is widely used we have – the very first time in years – such a strong feeling in our guts that’s now the first step from ancient crap into something really professional. It brings the level we all know from Java and C# and the mature backend frameworks to the frontend.
And it goes on. TypeScript is here and know we have something that’s an improvement for front end developers that matters:

TypeScript brings a whole new level to pros like us. And it makes our world easier – at least a bit. And it improves the quality of our product – not just a bit, a whole new step.
The last year (yes, we’re in 2017 already) brought a lot experience and some nice projects and the outcome is an advanced peace of software that’s going to make our life with Angular 4 a lot easier.

It’s a widget library that bring the power of Bootstrap 4 to Angular and adds some very cool stuff to build sophisticated forms – faster than ever.

## What is it?

The approach was simply the usage of forms as simple as ever in Angular 2 (4). It's an extension to Angular 2 that comes as a set of classes and components. 

It's available as source or as ready to use umd-bundle. The bundle is plane JavaScript. The sources are available via *npm* and from *github*. 

## Angular Data Annotations

### How does it work?

We did this by using a straight domain model. Let's assume you have a viewmodel like this:

~~~
export class UserViewModel {

  @Hidden()
  id: Number = 0;

  @Display("E-Mail", "E-Mail address")
  @Required()
  @MaxLength(100)
  @Email()
  email: string = "";

  @Display("Phone Number", "The user's phone")
  @Required()
  @MaxLength(20)
  phoneNumber: string = "";

  @Display("User Name", "The full name")
  @Required()
  @MaxLength(100)
  userName: string = "";

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
  Hidden 
} from 'svogv';
~~~

Now the forms part. The form needs to be aware of the decorators. So we have a service that creates an advanced `FormGroup` instance. We call it the `FormValidatorService`. 

In a component this looks like this:

~~~
export class EditUserComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type     
    this.userForm = FormValidatorService.build(this.fb, UserViewModel);
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

## The Widgets

The widget complement the editor by adding more parts. There are many such components available, but sometimes there are pieces that we need quite often but nothing is really handy. 
So I created a set of such components:

* **Breadcrumb**: An automatically navigable bread crumb using the Router's information
* **SideMenu**: A simple programmable menu
* **DropMenu**: Another programmable menu that creates a dropdown using TypeScript models
* **Tabs**: Programmable Tabs that react to the Router
* **InfoBox**: A simple panel with header and some configuration options, best for creating tile based layouts
* **TreeView**: An advanced treeview with icon support and many options
* **DataGrid**: A different approach for a grid, it provides a model to handle paging, filtering, and sorting, but no HTML. So the hard part is in the grid and the easy part is up to you. 

Under development, but not yet checked in:

* **Calendar**: Shows a calendar view   
* **ModalDialog**: Bootstraps modals based on TypeScript
* **NoGrid**: Tabular data without a table - another approach to present data

The goal of the menus is the complete TypeScript support along with the Bootstrap styles.

Additionally we plan to provide some "fun stuff", that may help to understand how components can be made properly:

* **AnalogClock**: It is what it says -- based on SVG
* **HoverHeader**: An inteactive header, changes appearance effects
* **LoaderIcon**: A circling icon that is higly customizable (as of 0.1.1 it's working)

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

## Does it cost something?

It's ISC licensed and it's free. We deeply believe in Open Source and will support the ecosystem by open sourcing all parts of the project. For commerical users such as enterprises we have support options.

The SVOGV Widget Library was written by Joerg <isageek> Krause, CEO of Augmented Content GmbH, Berlin / Germany. We at Augmented Content have many years of experience with Web-Frameworks. We were in the business in the early JavaScript days, know every single bit in jQuery and learnt a lot about Knockout, Angular, and Durandal. But time goes on. So we moved almost all projects to eithr AngularJS or Angular 2. I think that knowing one Framework really well is more for our customers than knowing a lot just good. So I decided to do more and start contributing to the Angular ecosystem by creating awesome libraries and components. 

## Can I contribute?

Yes, drop me an email with some "about me" stuff. Even simple feedback is appreciated.

![](https://github.com/joergkrause/svogv/blob/master/guides/logo_big.png?raw=true)