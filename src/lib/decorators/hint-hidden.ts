export function Hidden(hide: boolean = true) {
    // the original decorator
    function hiddenInternal(target: Object, property: string | symbol): void {
        new hiddenInternalSetup(target, property.toString(), hide);
    }

    // return the decorator
    return hiddenInternal;
}

class hiddenInternalSetup {


    constructor(public target: any, public key: string, public hide: boolean) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__isHidden__${this.key}`, {
            value: this.hide,
            enumerable: false,
            configurable: false
        });

    }

}