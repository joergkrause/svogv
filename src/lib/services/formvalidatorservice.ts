import { Injectable, Inject } from '@angular/core';
import { FormControlEx } from './FormControlEx';
import { Validator, Validators, FormBuilder, FormGroup } from '@angular/forms';

//export class RangeValidator implements Validator {

//  constructor(public from: number, public to: number) {
//  }

//  validate(control: AbstractControl): { [err: string]: any } {    
//    let n = Number(control.value);
//    if (n) {
//      return (n >= this.from && n <= this.to) ? {[]} : { ["err": "Range is not valid"]};
//    }
//    return false;
//  }
//}

@Injectable()
export class FormValidatorService {

  private fb: FormBuilder;

  constructor( @Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
  }

  public build(target: any): FormGroup {
    let valGroup : any = {};
    let errGroup : any = {};
    let form : FormGroup;
    let targetInstance: any;
    if (target) {
      // the cast is just to suppress TS errors and show it's intentionally
      try {
        targetInstance = new target();
      }
      catch (ex) {
        console.error("Invalid viewmodel for FormValidatorService");
      }
    }
    if (targetInstance) {
      for (let propName in targetInstance) {
        let validators = new Array<any>();
        let errmsgs = new Object();
        let isRequired = `__isRequired__${propName}` in target.prototype;
        if (isRequired) {
          (<any>errmsgs)["required"] = target.prototype[`__errRequired__${propName}`];
          validators.push(Validators.required);
        }
        let hasMaxLength = `__hasMaxLength__${propName}` in target.prototype;
        if (hasMaxLength) {
          (<any>errmsgs)["maxlength"] = target.prototype[`__errMaxLength__${propName}`];
          let maxLength = parseInt(target.prototype[`__hasMaxLength__${propName}`], 10);
          validators.push(Validators.maxLength(maxLength));
        }
        let hasMinLength = `__hasMinLength__${propName}` in target.prototype;
        if (hasMinLength) {
          (<any>errmsgs)["minlength"] = target.prototype[`__errMinLength__${propName}`];
          let minLength = parseInt(target.prototype[`__hasMinLength__${propName}`], 10);
          validators.push(Validators.minLength(minLength));
        }
        let hasPattern = `__hasPattern__${propName}` in target.prototype;
        if (hasPattern) {
          (<any>errmsgs)["pattern"] = target.prototype[`__errPattern__${propName}`];
          let pattern = new RegExp(target.prototype[`__hasPattern__${propName}`]);
          validators.push(Validators.pattern(pattern));
        }
        let hasRange = `__hasRange__${propName}` in target.prototype;
        if (hasRange) {
          (<any>errmsgs)["range"] = target.prototype[`__errRange__${propName}`];
          let from = new RegExp(target.prototype[`__hasRangeFrom__${propName}`]);
          let to = new RegExp(target.prototype[`__hasRangeTo__${propName}`]);
          //TODO: Add custom validator
          //validators.push(RangeValidator(from, to));
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
      (<any>form)["__editorModel__"] = targetInstance;
      // register controls and add messages
      for (let propName in errGroup) {
        let ctrl = <FormControlEx>form.controls[propName];
        if (!ctrl) continue; // control might not be in the form
        (<FormControlEx>form.controls[propName])["messages"] = (<any>errGroup)[propName];
      }
    }
    // return FormGroup for immediate usage
    return form;
  }

}