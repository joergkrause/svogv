/**
 * The Readonly decorator. The field is readonly in the form. It just renders grayed out 
 * and handles the internals using default HTML5 techniques. 
 * 
 * 
 * @param readonly      Optional, default is true.
 * @param description   A tooltip that can be used optionally.
 */
export function Readonly(readonly = true) {
    // the original decorator
    function readonlyInternal(target: Object, property: string | symbol): void {
        new readonlyInternalSetup(target, property.toString(), readonly);
    }

    // return the decorator
    return readonlyInternal;
}

class readonlyInternalSetup {

    constructor(public target: any, public key: string, public readonly: boolean) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__isReadonly__${this.key}`, {
            value: this.readonly,
            enumerable: false,
            configurable: false
        });

    }

}
