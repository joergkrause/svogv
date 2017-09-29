
export function Required(msg?: string) {
    // the original decorator
    function requiredInternal(target: Object, property: string | symbol): void {
        new requiredInternalSetup(target, property.toString(), msg);
    }

    // return the decorator
    return requiredInternal;
}

class requiredInternalSetup {

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