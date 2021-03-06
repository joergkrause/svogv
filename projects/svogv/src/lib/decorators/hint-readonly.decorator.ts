﻿/**
 * The Readonly decorator. The field is readonly in the form. It just renders grayed out
 * and handles the internals using default HTML5 techniques.
 *
 *
 * @param readonly      Optional, default is true.
 * @param description   A tooltip that can be used optionally.
 */
export function Readonly(readonly = true) {
  function readonlyInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__isReadonly__${key}`, {
      value: readonly,
      enumerable: false,
      configurable: false
    });

  }
  // the original decorator
  function readonlyInternal(target: object, property: string | symbol): void {
    readonlyInternalSetup(target, property.toString());
  }

  // return the decorator
  return readonlyInternal;
}
