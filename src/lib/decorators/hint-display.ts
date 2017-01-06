export function Display(name: string, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
        displayInternalSetup(target, property.toString(), name, description);
    }

    // return the decorator
    return displayInternal;
}

function displayInternalSetup(target: any, key: string, name: string, description: string) {
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
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

        // create a helper property to transport a meta data value
        Object.defineProperty(target, `__displayName__${key}`, {
            value: name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__displayDesc__${key}`, {
            value: description,
            enumerable: false,
            configurable: false
        });
    }
}