# Complete Documentation of the EditorComponent

A form can make use of the `EditorComponent`, named `<ac-editor>`. An object with several properties, decorated with UI instructions, created a whole form.

## Example

The simplest form of usage looks like this:

~~~html
<form (ngSubmit)="saveUser()" role="form" #userForm="ngForm">
  <fieldset>
    <legend>Edit current user</legend>
    <ac-editor [model]="userEditorModel" name="userName"></ac-editor>
    <ac-editor [model]="userEditorModel" name="email"></ac-editor>
    <ac-editor [model]="userEditorModel" name="phoneNumber"></ac-editor>
    <ac-editor [model]="userEditorModel" name="age"></ac-editor>
    <ac-editor [model]="userEditorModel" name="birthday"></ac-editor>
    <ac-editor [model]="userEditorModel" name="isActive"></ac-editor>
    <ac-editor [model]="userEditorModel" name="passWord"></ac-editor>
    <ac-editor [model]="userEditorModel" name="passWordTwo"></ac-editor>
    <div class="form-group">
      <button class="btn btn-sm btn-success" type="submit" [disabled]="!userForm.valid"><i class="fa fa-save"></i> Save</button>
      <button class="btn btn-sm btn-secondary" type="submit" [disabled]="!userForm.valid"><i class="fa fa-close"></i> Save &amp; Close</button>
      <button class="btn btn-sm btn-warning" type="button" (click)="closeForm()">
        <i class="fa fa-remove"></i> Cancel &amp; Return to List
      </button>
    </div>
  </fieldset>
</form>
~~~

The styling is based on Bootstrap 4.

You must have a form and provide the groups name. Internally, the `ReactiveFormsModule` is being used. The logic expects several decorators, that are being examined and based on the findings a `FormGroup` object is being created. That's handled by a service the *SvogvModule* provides. The component's code looks like this:

~~~typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormValidatorService } from 'svogv';
import { UserViewModel } from '../../../viewmodels';

@Component({
  templateUrl: './editorform.component.html'
})
export class EditorFormComponent implements OnInit, OnDestroy {

  userForm: NgForm;
  userFormGroup: FormGroup;
  user: UserViewModel;

  constructor(private formService: FormValidatorService) {
  }

  ngOnInit() {
    this.userFormGroup = this.formService.build(UserViewModel);
  }

}

~~~

The first magic is the call of the *build* method. The second magic is the usage of decorators. A typical view model (in the example *UserViewModel*) would look like this:

~~~typescript
export class UserViewModel {

  @Hidden()
  id: number = 0;

  @Display('E-Mail', 20, 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 30, 'The user\'s phone')
  @Required()
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 33, 'The full name')
  @Required('User Name is required')
  @MaxLength(100)
  userName: string = '';

  @Display('Age', 40, 'From 12 to 88')
  @DisplayGroup('Personal')
  @Range(12, 88)
  age: number = 24;

  @Display('Birthday', 50)
  @DisplayGroup('Personal')
  birthday: Date = new Date();

  @Display('Is Active', 60)
  active: boolean = true;

  @Display('Password', 70)
  @DisplayGroup('Password')
  @Required()
  @Compare('passWordTwo')
  passWord: string = '';

  @Display('Password', 80)
  @DisplayGroup('Password')
  @Required()
  passWordTwo: string = '';

  @Display('Done', 100, 'Work progress')
  done?: number = 0;

}
~~~

Note, that the default values for initialization are mandatory. The decorators comes in two flavors:

1. UI decorators control the appearance (such as `@Display`)
2. Validators control the validation

SVOGV is using the `ReactiveFormsModule` and handles everything in a straight Angular way.
