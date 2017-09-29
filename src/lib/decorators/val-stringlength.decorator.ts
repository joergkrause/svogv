/**
 * The decorator that assures that a string field contains at least a number of characters and a minimum number, too.
 * The default message is 'The field {fieldname} needs at least {minlength} characters'.
 *
 * @param min: The required length.
 * @param max: The maximum length.
 * @param msg: Optionally a custom message.
 *
 */
export function StringLength(min: number, max: number, msg?: string) {
    // the original decorator
    function stringLengthInternal(target: Object, property: string | symbol): void {
        new StringLengthInternalSetup(target, property.toString(), min, max, msg);
    }

    // return the decorator
    return stringLengthInternal;
}

class StringLengthInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public min: number, public max: number, public msg?: string) {

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasMaxLength__${key}`, {
            value: this.max,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errMaxLength__${key}`, {
            value: this.msg || `The field ${this.key} has max length of ${this.max} characters`,
            enumerable: false,
            configurable: false
        });

                // create a helper property to transport a meta data value
        Object.defineProperty(target, `__hasMinLength__${key}`, {
            value: this.min,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errMinLength__${key}`, {
            value: this.msg || `The field ${this.key} needs at least ${this.min} characters`,
            enumerable: false,
            configurable: false
        });

    }

}