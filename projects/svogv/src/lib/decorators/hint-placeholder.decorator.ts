/**
 * The Placeholder decorator.
 *
 * The placeholder adds the given text as a watermark to any input fields.
 * There is no function in DataGrid.
 *
 * @param name          The Name that appears in form fields as a watermark.
 */
export function Placeholder(name: string) {

  function placeholderInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__watermark__${key}`, {
      value: name,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__hasWatermark__${key}`, {
      value: true,
      enumerable: false,
      configurable: false
    });

  }
  // the original decorator
  function placeholderInternal(target: object, property: string | symbol): void {
    placeholderInternalSetup(target, property.toString());
  }

  // return the decorator
  return placeholderInternal;
}
