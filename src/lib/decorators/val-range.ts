export function Range(from: number, to: number, msg?: string) {
    // the original decorator
    function rangeInternal(target: Object, property: string | symbol): void {
        rangeInternalSetup(target, property.toString(), from, to, msg);
    }

    // return the decorator
    return rangeInternal;
}

function rangeInternalSetup(target: any, key: string, from: number, to: number, msg?: string) {

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
        Object.defineProperty(target, `__hasRangeFrom__${key}`, {
            value: from,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__hasRangeTo__${key}`, {
            value: to,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `__errRange__${key}`, {
            value: msg || `The field ${key} does not fall into the range from ${from} to ${to}`,
            enumerable: false,
            configurable: false
        });

    }
}