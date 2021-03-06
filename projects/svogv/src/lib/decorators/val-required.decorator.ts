﻿/**
 * This decorator is for validation of mandatory fields.
 * The default message is 'The field {keyName} is required'.
 *
 * @param msg The error message shown in case of error. A default value is being provided if omitted.
 *
 */
export function Required(msg?: string) {
  function requiredInternalSetup(target: any, key: string) {
    Object.defineProperty(target, `__isRequired__${key}`, {
      get() { return true; },
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__errRequired__${key}`, {
      value: msg || `The field ${key} is required`,
      enumerable: false,
      configurable: false
    });
  }
  // the original decorator
  function requiredInternal(target: object, property: string | symbol): void {
    requiredInternalSetup(target, property.toString());
  }

  // return the decorator
  return requiredInternal;
}

