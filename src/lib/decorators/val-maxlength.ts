export function MaxLength(len: number, msg?: string) {
    // the original decorator
    function maxLengthInternal(target: Object, property: string | symbol): void {
        new maxLengthInternalSetup(target, property.toString(), len, msg);
    }

    // return the decorator
    return maxLengthInternal;
}

class maxLengthInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public len: number, public msg?: string) {

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasMaxLength__${key}`, {
            value: this.len,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errMaxLength__${key}`, {
            value: this.msg || `The field ${this.key} has max length of ${this.len} characters`,
            enumerable: false,
            configurable: false
        });

    }

}