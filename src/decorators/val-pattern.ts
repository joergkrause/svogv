export function Pattern(pattern: RegExp, msg?: string) {
    // the original decorator
    function patternInternal(target: Object, property: string | symbol): void {
        new patternInternalSetup(target, property.toString(), pattern, msg);
    }

    // return the decorator
    return patternInternal;
}

class patternInternalSetup {

    // property value
    private _val : any;

    constructor(public target: any, public key: string, public reg: RegExp, public msg ?: string){
        this._val = this.target[this.key];
        // Delete property.
        if (delete target[key]) {

            // Create new property with getter and setter and meta data provider
            Object.defineProperty(this.target, this.key, {
                get: this.getter,
                set: this.setter,
                enumerable: true,
                configurable: true
            });

            // create a helper property to transport a meta data value
            Object.defineProperty(this.target, `__hasPattern__${key}`, {
                value: this.reg,
                enumerable: false,
                configurable: false
            });

            Object.defineProperty(this.target, `__errPattern__${key}`, {
                value: this.msg || `The field ${this.key} must fullfill the pattern ${this.reg}`,
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
    setter(newVal: any) {
        this._val = newVal;
    };

}