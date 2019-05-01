import { StyleRules } from '../widgets/datagrid/models/datagridstyle.model';

/**
 * The UiHint decorator.
 *
 *
 * @param hide  The style definition.
 */
export function UiHint(uiHint: StyleRules) {
    // the original decorator
    function uiHintInternal(target: Object, property: string | symbol): void {
      uiHintInternalSetup(target, property.toString(), uiHint);
    }

    // return the decorator
    return uiHintInternal;
}

export function uiHintInternalSetup(target: any, key: string, uiHint: StyleRules) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__uiHint__${key}`, {
        value: uiHint,
        enumerable: false,
        configurable: false
    });

}
