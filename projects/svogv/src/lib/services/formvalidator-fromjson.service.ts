import { Injectable, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from './formvalidator.service';

import { validateRange } from './validators/range.validator';
import { validateCompare } from './validators/compare.validator';

import { FormValidatorModel } from './formvalidator.model';

import {
  displayInternalSetup,
  displayGroupInternalSetup,
  hiddenInternalSetup,
  formatInternalSetup,
  placeholderInternalSetup,
  compareInternalSetup,
  maxLengthInternalSetup,
  minLengthInternalSetup,
  patternInternalSetup,
  stringLengthInternalSetup,
  emailInternalSetup,
  rangeInternalSetup,
  readonlyInternalSetup,
  requiredInternalSetup
} from '../decorators';

/**
 * A JSON object can describe the form. That way you can create the form and their behavior on the server.
 *
 * The form's description is an array, where each element describes one field:
 *
 * ```
 * [
 *   "fieldname": {
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
 *       }
 *       // ...
 *    }
 * ]
 * ```
 *
 * The properties are the same as the decorators. @see FormValidatorModel for the describing type.
 *
 */
@Injectable()
export class FormValidatorFromJsonService {

  constructor(private formValidatorService: FormValidatorService) { }

  public build(json: FormValidatorModel): FormGroup {
    const target: any = {};
    // convert json (indexed object ==> array ==> object properties)
    const fields = Object.keys(json);
    fields.forEach(field => {
      const types = Object.keys(json[field]);
      types.forEach(type => {
        switch (type) {
          case 'display':
            displayInternalSetup(target, field,
              (<any>json)[field][type]['name'],
              (<any>json)[field][type]['order'] ? +(<any>field)[type]['order'] : 0,
              (<any>json)[field][type]['description']);
            break;
          case 'displayGroup':
            displayGroupInternalSetup(target, field,
              (<any>json)[field][type]['name'],
              (<any>json)[field][type]['order'] ? +(<any>field)[type]['order'] : 0,
              (<any>json)[field][type]['description']);
            break;
          case 'format':
            formatInternalSetup(target, field,
              (<any>json)[field][type]['pipeName'],
              (<any>json)[field][type]['pipeParams']);
            break;
          case 'hidden':
            hiddenInternalSetup(target, field,
              (<any>json)[field][type]['hidden'] || !!(<any>field)[type]['hidden']);
            break;
          case 'readonly':
            readonlyInternalSetup(target, field,
              (<any>json)[field][type]['readonly'] || !!(<any>field)[type]['readonly']);
            break;
          case 'placeHolder':
            placeholderInternalSetup(target, field,
              (<any>json)[field][type]['name']);
            break;
          case 'compare':
            compareInternalSetup(target, field,
              (<any>json)[field][type]['fieldToCompare'],
              (<any>json)[field][type]['msg']);
            break;
          case 'maxlength':
            maxLengthInternalSetup(target, field,
              +(<any>json)[field][type]['max'],
              (<any>json)[field][type]['msg']);
            break;
          case 'minlength':
            minLengthInternalSetup(target, field,
              +(<any>json)[field][type]['min'],
              (<any>json)[field][type]['msg']);
            break;
          case 'pattern':
            patternInternalSetup(target, field,
              (<any>json)[field][type]['pattern'],
              (<any>json)[field][type]['msg']);
            break;
          case 'stringLength':
            stringLengthInternalSetup(target, field,
              +(<any>json)[field][type]['min'],
              +(<any>json)[field][type]['max'],
              (<any>json)[field][type]['msg']);
            break;
          case 'email':
            emailInternalSetup(target, field,
              (<any>json)[field][type]['msg']);
            break;
          case 'range':
            rangeInternalSetup(target, field,
              (<any>json)[field][type]['from'],
              (<any>json)[field][type]['to'],
              (<any>json)[field][type]['msg']);
            break;
          case 'required':
            requiredInternalSetup(target, field,
              (<any>json)[field][type]['msg']);
            break;
        }
      });
    });
    return this.formValidatorService.build(target);
  }

}
