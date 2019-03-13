import { FormControl, FormGroup } from '@angular/forms';

/**
 * A custom validator to valdiate a range of numbers or dates. This is internally to support the infarstructure
 * and not intendet to being used by custom code.
 *
 * @param p The field's name
 *
 */
export function validateRange(f: number | Date, t: number | Date) {
  return function(c: FormControl) {
    if ((Number(f) || Number(t)) && Number(c.value)) {
      const fr = Number(f);
      const to = Number(t);
      const v = Number(c.value);
      return (!fr || v >= fr) && (!to || v <= to)
        ? null
        : {
            range: {
              valid: false
            }
          };
    }
    if ((Date.parse(f.toString()) || Date.parse(t.toString())) && Date.parse(c.value)) {
      const fr = Date.parse(f.toString());
      const to = Date.parse(t.toString());
      const v = Date.parse(c.value);
      return (!fr || v >= fr) && (!to || v <= to)
        ? null
        : {
            range: {
              valid: false
            }
          };
    }
  };
}
