﻿import { Injectable, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { validateRange } from './validators/range.validator';
import { validateCompare } from './validators/compare.validator';

/**
 * The form validation service creates a FormGroup object from a viewmodel. If the viewmodel
 * has been decorated with validation decorators the validators are created accordingly.
 */
@Injectable()
export class FormValidatorService {

  private fb: FormBuilder;

  constructor( @Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
  }

  public build(target: any): FormGroup {
    let valGroup: any = {};
    let errGroup: any = {};
    let form: FormGroup;
    let targetInstance: any;
    if (target) {
      // the cast is just to suppress TS errors and shows it's intentionally
      try {
        targetInstance = new target();
      } catch (ex) {
        console.error('Invalid viewmodel for FormValidatorService');
      }
    }
    if (targetInstance) {
      for (let propName in targetInstance) {
        let validators = new Array<any>();
        let errmsgs = new Object();
        let isRequired = `__isRequired__${propName}` in target.prototype;
        if (isRequired) {
          (<any>errmsgs)['required'] = target.prototype[`__errRequired__${propName}`];
          validators.push(Validators.required);
        }
        let hasMaxLength = `__hasMaxLength__${propName}` in target.prototype;
        if (hasMaxLength) {
          (<any>errmsgs)['maxlength'] = target.prototype[`__errMaxLength__${propName}`];
          let maxLength = parseInt(target.prototype[`__hasMaxLength__${propName}`], 10);
          validators.push(Validators.maxLength(maxLength));
        }
        let hasMinLength = `__hasMinLength__${propName}` in target.prototype;
        if (hasMinLength) {
          (<any>errmsgs)['minlength'] = target.prototype[`__errMinLength__${propName}`];
          let minLength = parseInt(target.prototype[`__hasMinLength__${propName}`], 10);
          validators.push(Validators.minLength(minLength));
        }
        let hasPattern = `__hasPattern__${propName}` in target.prototype;
        if (hasPattern) {
          (<any>errmsgs)['pattern'] = target.prototype[`__errPattern__${propName}`];
          let pattern = new RegExp(target.prototype[`__hasPattern__${propName}`]);
          validators.push(Validators.pattern(pattern));
        }
        let hasRangeFrom = `__hasRangeFrom__${propName}` in target.prototype;
        let hasRangeTo = `__hasRangeTo__${propName}` in target.prototype;
        if (hasRangeFrom || hasRangeTo) {
          (<any>errmsgs)['range'] = target.prototype[`__errRange__${propName}`];
          let f: number | Date = Number(target.prototype[`__hasRangeFrom__${propName}`]);
          let t: number | Date = Number(target.prototype[`__hasRangeTo__${propName}`]);
          if (!f && !t) {
            // If NaN assume Date
            f = Date.parse(f.toString());
            t = Date.parse(t.toString());
          }
          validators.push(validateRange(f, t));
        }
        let hasCompare = `__hasCompareProperty__${propName}` in target.prototype;
        if (hasCompare) {
          (<any>errmsgs)['compare'] = target.prototype[`__errCompareProperty__${propName}`];
          let compare = target.prototype[`__withCompare__${propName}`];
          validators.push(validateCompare(compare));
        }
        if (validators.length === 0) {
          // even if there is no validator we need to add the property to the group
          (<any>valGroup)[propName] = [target[propName]];
        }
        if (validators.length === 1) {
          (<any>valGroup)[propName] = [target[propName] || '', validators[0]];
        }
        if (validators.length >= 1) {
          (<any>valGroup)[propName] = [target[propName] || '', Validators.compose(validators)];
        }
        (<any>errGroup)[propName] = errmsgs;
      }
      // create form group
      form = this.fb.group(valGroup);
      // forward the model to the editors for easy access to other decorators
      // the cast is just to suppress TS errors and shows it's intentionally
      (<any>form)['__editorModel__'] = targetInstance;
      // register controls and add messages
      for (let propName in errGroup) {
        let ctrl = <any>form.controls[propName];
        if (!ctrl) {
          continue; // control might not be in the form
        }
        (<any>form.controls[propName])['messages'] = (<any>errGroup)[propName];
      }
    }
    // return FormGroup for immediate usage
    return form;
  }

}
