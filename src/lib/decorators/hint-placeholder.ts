export function Placeholder(name: string) {
    // the original decorator
    function placeholderInternal(target: Object, property: string | symbol): void {
        placeholderInternalSetup(target, property.toString(), name);
    }

    // return the decorator
    return placeholderInternal;
}

function placeholderInternalSetup(target: any, key: string, name: string) {
    // property getter
    var getter = function (): any {
        return _val;
    };

    // property setter
    var setter = function (newVal: any) {
        _val = newVal;
    };

    // remember current value, if any
    var _val = (<any>target)[key];
    // Delete property.
    if (delete (<any>target)[key]) {

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

    }
}