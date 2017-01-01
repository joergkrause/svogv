import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * The Editor Widget. Creates a field with all required validators using decorators and forms service.
 */
@Component({
  selector: 'ac-editor',
  template: `<div class="form-group row" 
                  [formGroup]="userForm" 
                  [ngClass]="{ 'has-danger': !userForm.controls[name].valid && userForm.controls[name].touched }">
              <label [attr.for]="name" [attr.title]="tooltip" class="col-form-label col-xs-2">{{ label }}: </label>
              <div [ngClass]="{ 'col-xs-10': inline }">
                <textarea *ngIf="type == 'textarea'" class="form-control" [id]="name" [formControlName]="name">
                </textarea>
                <select *ngIf="type == 'select-enum'" class="form-control" [id]="name" [formControlName]="name">
                  <option *ngFor="let option of enumValues" [value]="option.key">{{option.val}}</option>
                </select>
                <input *ngIf="type == 'range'" type="range" minvalue="fromValue" maxValue="toValue" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'date'" type="date" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'number'" type="number" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'text'" type="text" class="form-control" [id]="name" [formControlName]="name" />
                <span class="fa fa-warning text-danger form-control-feedback" 
                      [hidden]="userForm.controls[name].valid || userForm.controls[name].pristine"></span>
                <small class="text-danger" 
                       [hidden]="userForm.controls[name].valid || userForm.controls[name].pristine">
                  <span *ngFor="let error of errors">{{ userForm.controls[name].messages[error] }}</span>
                </small>
              </div>
             </div>`
}) //
export class AcEditor implements OnInit {

  @Input() name: string;
  @Input() type: string = "text";
  @Input() label: string;
  @Input() tooltip: string;
  @Input() userForm: FormGroup;
  @Input() inline: boolean = true;
  // select only
  @Input() enumValues: any;
  // range only
  @Input() fromValue: number = 0;
  @Input() toValue: number = 100;

  errors: Array<string>;


  constructor() {
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this is set by FormValidatorService
    var editorModel = this.userForm["__editorModel__"];
      // get type from form
    if (editorModel) {
      // make an instance to read the properties
      this.label = editorModel[`__displayName__${this.name}`] || this.label;
      this.tooltip = editorModel[`__displayDesc__${this.name}`] || this.tooltip;
    }
  }

  private onValueChanged(data) {
    this.errors = new Array<string>();
    for (let error in this.userForm.controls[this.name].errors) {
      this.errors.push(error);
    }
  }

}

