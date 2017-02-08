/**
 * Validates a field against an email pattern.
 * Based on "pattern", so in form one must use hasError('pattern') to get validation results.
 *
 * @param msg: A custom message. If not provided "The field ffff must contain a valid e-mail address." 
 *             will be generated, while ffff is the property name.
 *
 */
export function Email(msg?: string) {
  // the original decorator
  let pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function emailInternal(target: Object, property: string | symbol): void {
    new emailInternalSetup(target, property.toString(), pattern, msg);
  }

  // return the decorator
  return emailInternal;
}

class emailInternalSetup {

  // property value
  private _val: any;

  constructor(public target: any, public key: string, public reg: RegExp, public msg?: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(this.target, `__hasPattern__${key}`, {
      value: this.reg,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(this.target, `__errPattern__${key}`, {
      value: this.msg || `The field ${this.key} must contain a valid e-mail address.`,
      enumerable: false,
      configurable: false
    });
  }

}