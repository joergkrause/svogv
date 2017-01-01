export function Range(from: number, to: number, msg?: string) {
    // the original decorator
    function rangeInternal(target: Object, property: string | symbol): void {
      new rangeInternalSetup(target, property.toString(), from, to, msg);
    }

    // return the decorator
    return rangeInternal;
}

class rangeInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public from: number, public to: number, public msg?: string) {
        // property value
        this._val = this.target[this.key];
        // Delete property.
        if (delete target[key]) {

            // Create new property with getter and setter and meta data provider
            Object.defineProperty(target, key, {
                get: this.getter,
                set: this.setter,
                enumerable: true,
                configurable: true
            });

            // create a helper property to transport a meta data value
            Object.defineProperty(target, `__hasRangeFrom__${key}`, {
                value: this.from,
                enumerable: false,
                configurable: false
            });

            Object.defineProperty(target, `__hasRangeTo__${key}`, {
              value: this.to,
              enumerable: false,
              configurable: false
            });

            Object.defineProperty(target, `__errRange__${key}`, {
              value: this.msg || `The field ${this.key} does not fall into the range from ${this.from} to ${this.to}`,
                enumerable: false,
                configurable: false
            });

        }
    }

    // property getter
    getter() : any {
        return this._val;
    };

    // property setter
    setter (newVal: any) {
        this._val = newVal;
    };

}