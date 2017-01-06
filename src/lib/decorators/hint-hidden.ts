export function Hidden(hide: boolean = true) {
    // the original decorator
    function hiddenInternal(target: Object, property: string | symbol): void {
        hiddenInternalSetup(target, property.toString(), hide);
    }

    // return the decorator
    return hiddenInternal;
}

function hiddenInternalSetup(target: any, key: string, hide: boolean) {
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
        Object.defineProperty(target, `__isHidden__${key}`, {
            value: hide,
            enumerable: false,
            configurable: false
        });

    }
}