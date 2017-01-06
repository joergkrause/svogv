export function MaxLength(len: number, msg?: string) {
    // the original decorator
    function maxLengthInternal(target: Object, property: string | symbol): void {
        maxLengthInternalSetup(target, property.toString(), len, msg);
    }

    // return the decorator
    return maxLengthInternal;
}

function maxLengthInternalSetup(target: any, key: string, len: number, msg?: string) {
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
        Object.defineProperty(target, `__hasMaxLength__${key}`, {
            value: len,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errMaxLength__${key}`, {
            value: msg || `The field ${key} has max length of ${len} characters`,
            enumerable: false,
            configurable: false
        });

    }
}