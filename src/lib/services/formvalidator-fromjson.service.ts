import { Injectable, Inject } from '@angular/core';
import { FormValidatorService } from './formvalidator.service';

import { validateRange } from './validators/range.validator';
import { validateCompare } from './validators/compare.validator';

import { FormValidatorModel} from './formvalidator.model';  

/**
 * A JSON object can describe the form. That way you can create the form and their behavior on the server.
 * 
 * The form's description is an array, where each element describes one field:
 * 
 * ```
 * [
 *    {
 *       "display": {
 *          "name": string;
 *          "order": number;
 *          "description": string
 *       },
 *       "displaygroup": {
 *          "name": string;
 *          "order": number;
 *          "description": string
 *       },
 *       "format": {
 *          "pipeName": any;
 *          "pipeParams": any[]
 *       },
 *       "hidden": boolean,
 *       "placeholder": {},
 *       "readonly": {},
 *       "templatehint": {},
 *       "compare": {},
 *       "email": {},
 *       "maxlength": {},
 *       "minlength": {}, 
 *       "pattern": {}, 
 *       "range": {}, 
 *       "required": {}, 
 *       "stringlength": {},
 *    }
 * ]
 * ```
 * 
 * The properties are the same as the decorators.
 * 
 */
@Injectable()
export class FormValidatorFromJsonService {

  constructor(private formValidatorService: FormValidatorService){}
  
  public build(json: FormValidatorModel) : FormGroup{
    let target: any = {};
    // convert json

    return this.formValidatorService.build(target);
  }

}