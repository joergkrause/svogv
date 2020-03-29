const isHidden = 'isHidden';
/**
 * The Hidden decorator.
 *
 * The {@link DataGrid} does not show columns for properties tagged with {@link `Hidden`} decorator.
 * Fields in forms that render automatically
 * using the {@link `EditorComponent`} will render as `<input type="hidden">`.
 *
 * @param hide  Optional, default is `true`.
 */
export function Hidden(hide = true) {

  function hiddenInternalSetup(target: any, key: string, hide: boolean) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__${isHidden}__${key}`, {
      value: hide,
      enumerable: false,
      configurable: false
    });

  }
  // the original decorator
  function hiddenInternal(target: object, property: string | symbol): void {
    hiddenInternalSetup(target, property.toString(), hide);
  }

  // return the decorator
  return hiddenInternal;
}

Hidden.IsHidden = (target: object, key: string, def = false) => target[`__${isHidden}__${key}`] || def;
