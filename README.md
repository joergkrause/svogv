# Augmented Content Widget Library

We at Augmented Content have many years of experience with Web-Frameworks. We were in the business in the early JavaScript days, know every single bit in jQuery and learnt a lot about Knockout, Angular, and Durandal. But time goes on.

Now Angular 4 is here we have – the very first tim in years – such a strong feeling in our guts that’s now the first step from ancient crap into something really professional. It brings the level we all know from Java and C# and the mature backend frameworks to the frontend.
And it goes on. TypeScript is here and know we have something that’s an improvement for front end developers that matters:

TypeScript brings a whole new level to pros like us. And it makes out world easier – at least a bit. And it improves the quality of our product – not just a bit, a whole new step.
The last year (yes, we’re in 2017 already) brought a lot experience and some nice projects and the outcome is an advanced peace of software that’s going to make our life with Angular 4 a lot easier.

It’s a widget library that bring the power of Bootstrap 4 to Angular and adds some very cool stuff to build sophisticated forms – faster than ever.

## What is it?

The approach was simply the usage of forms as simple as ever in Angular 2 (4). It's an extension to Angular 2 that comes as a set of classes and components. 

## How does it work?

We did this by using a straight domain model. Let's assume you have a viewmodel like this:

~~~
export class UserViewModel {

  @Hidden()
  id: Number;

  @Display("E-Mail", "E-Mail address")
  @Required()
  @MaxLength(100)
  @Email()
  email: string;

  @Display("Phone Number", "The user's phone")
  @Required()
  @MaxLength(20)
  phoneNumber: string;

  @Display("User Name", "The full name")
  @Required()
  @MaxLength(100)
  userName: string;

}
~~~

As you see we use several decorators. We have decorators for display hints, such as `Display`. And we have decorators to manage the validation, such as `MaxLength()`. 

The usage is simple; just import like this:

~~~
import { Required, MaxLength, Range, Email, Display, Hidden } from "../Decorators/index";
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

## Where to get?

It's available from *npm* by using this command:

~~~
npm install svogv --save
~~~

You get three parts (at least, this list will grow quickly):

* FormValidatorService -- a static class to build reactive forms
* Editor -- the universal editor component
* Decorators -- a set of decorators to manage the behavior of properties


