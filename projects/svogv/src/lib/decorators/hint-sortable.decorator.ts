const isSortable = 'isSortable';
const hasSortCallback = 'sortCallback';
/**
 * The Sortable decorator.
 *
 * The @see `DataGrid` does not sort columns for properties tagged with `@Sortable(false)`.
 * The default is that all columsn are sortable. Either avoid this decorator or use `@Sortable(true)`.
 * Additionally, if the decorator is provided, you can add a sort function callback as second parameter.
 *
 * @param canSort       Suppress or allow sorting.
 * @param sortCallback  An optional callback that provides a sort instruction. If omitted, `Array.prototype.sort` is being used.
 */
export function Sortable(canSort: boolean, sortCallback?: (a, b) => 1 | -1 | 0) {

  function sortableInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__${isSortable}__${key}`, {
      value: canSort,
      enumerable: false,
      configurable: false
    });

    Object.defineProperty(target, `__${hasSortCallback}__${key}`, {
      value: sortCallback,
      enumerable: false,
      configurable: false
    });

  }
  // the original decorator
  function sortableInternal(target: object, property: string | symbol): void {
    sortableInternalSetup(target, property.toString());
  }

  // return the decorator
  return sortableInternal;
}

Sortable.IsSortable = (target: object, key: string, def?: string) => target[`__${isSortable}__${key}`] || def;
Sortable.SortCallback = (target: object, key: string, def?: string) => target[`__${hasSortCallback}__${key}`] || def;
