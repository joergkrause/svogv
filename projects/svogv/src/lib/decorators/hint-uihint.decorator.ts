import { StyleRules } from '../widgets/datagrid/models/datagridstyle.model';

const uiHint = 'uiHint';
/**
 * The UiHint decorator.
 *
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

UiHint.HintRule = (target: object, key: string, def?: string) => target[`__${uiHint}__${key}`] || def;
