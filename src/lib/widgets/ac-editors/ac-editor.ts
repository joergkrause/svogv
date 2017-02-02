import { Component, Input, OnInit } from '@angular/core';
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
                <input *ngIf="type == 'range'" [placeholder]="waterMark" type="range" [attr.minvalue]="fromValue" [attr.maxvalue]="toValue" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'calendar'" [placeholder]="waterMark" type="date" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'number'" [placeholder]="waterMark" type="number" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'text' || type == ''" [placeholder]="waterMark" type="text" class="form-control" [id]="name" [formControlName]="name" />
                <input *ngIf="type == 'hidden' [id]="name" [formControlName]="name" type="hidden" />
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
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() tooltip: string;
  @Input() userForm: FormGroup;
  @Input() inline: boolean = true;
  // select only
  @Input() enumValues: any;
  // range only
  @Input() fromValue: number = 0;
  @Input() toValue: number = 100;
  @Input() waterMark = "";

  errors: Array<string>;


  constructor() {
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this is set by FormValidatorService
    var editorModel = (<any>this.userForm)['__editorModel__'];
    // get type from form
    if (editorModel) {
      // make an instance to read the properties
      this.label = editorModel[`__displayName__${this.name}`] || this.label || this.name;
      this.tooltip = editorModel[`__displayDesc__${this.name}`] || this.tooltip || this.name;
      // render as range id there is a range definition
      if (editorModel[`__hasRangeFrom__${this.name}`] && Number(editorModel[`__hasRangeFrom__${this.name}`])) {
        this.fromValue = <number>editorModel[`__hasRangeFrom__${this.name}`];
        this.type = "range";
      }
      if (editorModel[`__hasRangeTo__${this.name}`] && Number(editorModel[`__hasRangeTo__${this.name}`])) {
        this.toValue = <number>editorModel[`__hasRangeTo__${this.name}`];
        this.type = "range";
      }
      // placeholder
      if (editorModel[`__hasWatermark__${this.name}`]) {
        this.waterMark = editorModel[`__watermark__${this.name}`];
      }
      
      // render hidden fields as hidden even in forms
      if (editorModel[`__isHidden__${this.name}`]) {
        this.type = "hidden";
      }
    }
  }

  private onValueChanged(data: any) {
    this.errors = new Array<string>();
    for (let error in this.userForm.controls[this.name].errors) {
      this.errors.push(error);
    }
  }

}

