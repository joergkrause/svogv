export function Display(name: string, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
      new displayInternalSetup(target, property.toString(), name, description);
    }

    // return the decorator
    return displayInternal;
}

class displayInternalSetup {

    private _val: any;

    constructor(public target: any, public key: string, public name: string, public description: string) {
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
            Object.defineProperty(this.target, `__displayName__${this.key}`, {
                value: this.name,
                enumerable: false,
                configurable: false
            });

            Object.defineProperty(this.target, `__displayDesc__${this.key}`, {
                value: this.description,
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