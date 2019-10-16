const displayName = 'displayName';
const displayOrder = 'displayOrder';
const displayDesc = 'displayDesc';

/**
 * The Display decorator.
 *
 * This decorator can be used on fields. It's being used to create label in forms and headers in the grid.
 * Additional parameters are provided to refine forms further.
 *
 * @param name          The Name or Label that appears in forms or as header in grids.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the element's order.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(name: string, order: number = 0, description?: string) {

  function displayInternalSetup(target: any, key: string) {

    order = parseInt(order.toString(), 10);
    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__${displayName}__${key}`, {
      value: name,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__${displayOrder}__${key}`, {
      value: order,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__${displayDesc}__${key}`, {
      value: description,
      enumerable: false,
      configurable: false
    });
  }

  // the original decorator
  function displayInternal(target: object, property: string | symbol): void {
    displayInternalSetup(target, property.toString());
  }

  // return the decorator
  return displayInternal;
}

/**
 * Internal access to the provided meta data value for the name property.
 */
Display.Name = (target: object, key: string, def?: string) => target[`__${displayName}__${key}`] || def;
/**
 * Internal access to the provided meta data value for the order property.
 */
Display.Order = (target: object, key: string, def?: string) => target[`__${displayOrder}__${key}`] || def;
/**
 * Internal access to the provided meta data value for the description property.
 */
Display.Desc = (target: object, key: string, def?: string) => target[`__${displayDesc}__${key}`] || def;
