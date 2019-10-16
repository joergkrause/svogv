/**
 * The decorator assures that a string field fullfilles a regular expression pattern.
 *
 * @param pattern: The expression as RegExp.
 * @param msg: A custom message.
 *
 */
export function Pattern(pattern: RegExp, msg?: string) {

  function patternInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasPattern__${key}`, {
      value: true,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__errPattern__${key}`, {
      value: msg || `The field ${key} must fullfill the pattern ${pattern}`,
      enumerable: false,
      configurable: false
    });
  }
  // the original decorator
  function patternInternal(target: object, property: string | symbol): void {
    patternInternalSetup(target, property.toString());
  }

  // return the decorator
  return patternInternal;
}

