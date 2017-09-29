/**
 * This decorator is for validation of mandatory fields.
 * The default message is 'The field {keyName} is required'.
 *
 * @param msg The error message shown in case of error. A default value is being provided if omitted.
 *
 */
export function Required(msg?: string) {
    // the original decorator
    function requiredInternal(target: Object, property: string | symbol): void {
        new RequiredInternalSetup(target, property.toString(), msg);
    }

    // return the decorator
    return requiredInternal;
}

class RequiredInternalSetup {

    constructor(public target: any, public key: string, public msg?: string) {
        Object.defineProperty(this.target, `__isRequired__${this.key}`, {
            get: function () { return true; },
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__errRequired__${this.key}`, {
            value: this.msg || `The field ${this.key} is required`,
            enumerable: false,
            configurable: false
        });
    }
}