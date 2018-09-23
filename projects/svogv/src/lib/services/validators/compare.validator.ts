import { FormControl, FormGroup } from '@angular/forms';

/**
 * A custom validator to compare two fields. This is internally to support the infarstructure
 * and not intendet to being used by custom code.
 *
 * @param p The field's name
 *
 */
export function validateCompare(p: string) {
  let changeEventWasAdded: boolean = false;
  return function (c: FormControl) {
    let form: FormGroup = c.root as FormGroup;
    if (form && form.controls && !changeEventWasAdded) {
      form.controls[p].valueChanges.subscribe(() => {
        // trigger validation for particular element
        c.updateValueAndValidity();
      });
      changeEventWasAdded = true;
    }
    if (c.value) {
      // compare the current value with the referenced control's value
      return (!c.value || c.value == (<any>c.root)['controls'][p].value) ? null : {
        'compare': {
          valid: false
        }
      };
    }
  }

}
