export function Hidden(hide: boolean = true) {
    // the original decorator
    function hiddenInternal(target: Object, property: string | symbol): void {
      new hiddenInternalSetup(target, property.toString(), hide);
    }

    // return the decorator
    return hiddenInternal;
}

class hiddenInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public hide: boolean) {
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
            Object.defineProperty(this.target, `__isHidden__${this.key}`, {
                value: this.hide,
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