This document describes the usage of the SVOGV library for Angular 2+ (currently tested up to Angular 6.1). 

## Install the Lib
 
 ```bash
 npm install --save svogv
 ```

### Build the Lib

 ```bash
 cd src/lib 
 npm run build
 ```

After this, the folder /dist has been rebuild and contains all, compiled sources, map files, ts files, and the bundle for direct import in browser (svogv.umd.js).

> See 'Build the Project' later in this document for instructions of how to deal with the source code.
 
## Using the Lib

Start with a view model like this:

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

> The initializers (= "" and = 0) are **required** because they add the properties to the prototype and from there we retrieve the list of automatically created fields.

As you see we use several decorators. We have decorators for display hints, such as `Display`. And we have decorators to manage the validation, such as `MaxLength()`. 

Right now we support these hint decorators:

* Hidden: Element will not be rendered as column in ac-datagrid
* Display: Change columns header or label name and add a tooltip optionally
  * name: The label
  * description: The tooltip
* DisplayFormat: Invoke a formatter or pipe
* UiHint: use a template to render the editor; some templates are build in (for string: text, textarea, for number: integer, float, for Date: date, time, datetime, calendar)
* Readonly: The field is readonly in the form
* EnumType: Use an `enum` to force a select box and provide an option list, even if the property's type is `number` or `string`
* FilterUiHint: A helper for the `<ac-datagrid>` component to associate a filter field with a particular column

Also several validation decorators are supported:

* Required: Property must have a value
* MaxLength: Max number of chars (string only)
* MinLength: Min number of chars (string only)
* StringLength: this is a convenient union of `MaxLength` and `MinLength`
* Pattern: A regular expression
* Range: A range of type `number` or of type `Date` for the property's value
* Email: Check whether the property contains a valid email
* Url: Check whether the property contains a valid url
* Phone: Check whether the property contains a valid phone number (currently supported: USA, Canada, GB, DE, FR, IT, ES)
* CreditCard: Check whether the property contains a valid credit card format
* Isbn:  Check whether the property contains a valid ISBN (international book format number)
* Compare: Compare this property with another (think of two password fields)
* Custom: A base class that uses a callback to let you provide your own validator

The usage is simple; just import like this:

~~~
import { Required, MaxLength, Range, Email, Display, Hidden } from 'svogv';
~~~

Now the forms part. The form needs to be aware of the decorators. So we have a service that creates an advanced `FormGroup` instance. We call it the `FormValidatorService`. 

In a component this looks like this:

~~~
export class EditUserComponent implements OnInit {

  constructor(private formService: FormValidatorService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type     
    this.userForm = this.formService.build(UserViewModel);
  }
}
~~~

To get access to the injectable service, you must register it in the *app.ts* file (or wherever you bootstrap your app):

~~~
import { FormValidatorService } from 'svogv';

@NgModule({
    imports: [...],
    declarations: [...],
    bootstrap: [...],
    providers: [FormValidatorService, ...]
})
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

## What's in the package?

* FormValidatorService -- a static class to build reactive forms
* Editor -- the universal editor component
* Decorators -- a set of decorators to manage the behavior of properties

## Build the Project

This requires to check out the whole project from Github:

https://github.com/joergkrause/svogv.git

First, you must install *node_modules* in both (!) the main folder and the demo.

~~~
npm run setup
~~~

You can run several scripts:

* "build": "ng build" --> the global build command, run this and everything else will work
* "serve": "ng serve" --> execute the demo and start server at port 4200
* "test": "ng test" --> unit tests (currently under development)
* "tslint": "ng lint" --> TS linter
* "codedoc": "compodoc" --> create code documentation

## Learn more

Check the demo app, that shows the editor in action. See the [Demo install guide](/src/demo/README).

Check ot the [whole docu](../docs/index.md).
