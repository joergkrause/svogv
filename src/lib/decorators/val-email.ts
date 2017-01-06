/**
 * Validates a field against an email pattern.
 * Based on "pattern", so in form one must use hasError('pattern') to get validation results.
 * @param msg: A custom message. If not provided "The field ffff must contain a valid e-mail address." will be generated, while ffff is the property name.
 */
export function Email(msg?: string) {
  // the original decorator
  let pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function emailInternal(target: Object, property: string | symbol): void {
    emailInternalSetup(target, property.toString(), pattern, msg);
  }

  // return the decorator
  return emailInternal;
}

function emailInternalSetup(target: any, key: string, reg: RegExp, msg?: string) {
  // property getter
  var getter = function (): any {
    return _val;
  };

  // property setter
  var setter = function (newVal: any) {
    _val = newVal;
  };

  // remember current value, if any
  var _val = (<any>target)[key];
  // Delete property.
  if (delete (<any>target)[key]) {
    // Create new property with getter and setter and meta data provider
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasPattern__${key}`, {
      value: reg,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__errPattern__${key}`, {
      value: msg || `The field ${key} must contain a valid e-mail address.`,
      enumerable: false,
      configurable: false
    });
  }
}