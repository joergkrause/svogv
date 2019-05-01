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
    // the original decorator
    function sortableInternal(target: Object, property: string | symbol): void {
        sortableInternalSetup(target, property.toString(), canSort, sortCallback);
    }

    // return the decorator
    return sortableInternal;
}

export function sortableInternalSetup(target: any, key: string, canSort: boolean, sortCallback: Function) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__isSortable__${key}`, {
        value: canSort,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__sortCallback__${key}`, {
      value: sortCallback,
      enumerable: false,
      configurable: false
  });

}
