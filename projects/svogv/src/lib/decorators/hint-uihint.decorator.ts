import { StyleRules } from '../widgets/datagrid/models/datagridstyle.model';

const uiHint = 'uiHint';
/**
 * The UiHint decorator.
 * Currently it can contain any set of style rules that apply to the &lt;th&gt; element that forms the grid's table header cells.
 * The application makes use of the [ngStyle] directive. The object's structure must be made in a way [ngStyle] can handle it.
 *
 * @param hide  The style definition.
 */
export function UiHint(uiHintRule: StyleRules) {

  function uiHintInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__${uiHint}__${key}`, {
      value: uiHintRule,
      enumerable: false,
      configurable: false
    });

  }
  // the original decorator
  function uiHintInternal(target: object, property: string | symbol): void {
    uiHintInternalSetup(target, property.toString());
  }

  // return the decorator
  return uiHintInternal;
}

UiHint.HintRule = (target: object, key: string, def?: {}) => target[`__${uiHint}__${key}`] || def;
