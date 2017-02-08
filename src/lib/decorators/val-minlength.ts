/**
 * The minlength decorator assures that a string field contains at least a number of characters.
 * 
 * @param len: the required length.
 * @param msg: A custom message. 
 * 
 */
export function MinLength(len: number, msg?: string) {
    // the original decorator
    function minLengthInternal(target: Object, property: string | symbol): void {
        new minLengthInternalSetup(target, property.toString(), len, msg);
    }

    // return the decorator
    return minLengthInternal;
}

class minLengthInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public len: number, public msg?: string) {

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasMinLength__${key}`, {
            value: this.len,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errMinLength__${key}`, {
            value: this.msg || `The field ${this.key} needs at least ${this.len} characters`,
            enumerable: false,
            configurable: false
        });

    }

}