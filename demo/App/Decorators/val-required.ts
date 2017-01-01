export function Required(msg?: string) {
    // the original decorator
    function requiredInternal(target: Object, property: string | symbol): void {
        new requiredInternalSetup(target, property.toString(), msg);
    }

    // return the decorator
    return requiredInternal;
}

class requiredInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public msg?: string) {
        this._val = target[key];
        // Delete property.
        if (delete this.target[this.key]) {

            // Create new property with getter and setter and meta data provider
            Object.defineProperty(this.target, this.key, {
                get: this.getter,
                set: this.setter,
                enumerable: true,
                configurable: true
            });

            // create a helper property to transport a meta data value
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

    // property getter
    getter(): any {
        return this._val;
    };

    // property setter
    setter(newVal: any) {
        this._val = newVal;
    };

}