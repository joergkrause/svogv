/**
 * The compare decorator, compares two field's values and
 * shows an error message on the decorated field. The other field (compared to) does 
 * not has a decorator nor receives a message.
 * 
 * @param withProperty: A string that represents the compared field's name.
 * @param msg: A custom message. 
 *  
 */
export function Compare(withProperty: string, msg?: string) {
    // the original decorator
    function compareInternal(target: Object, property: string | symbol): void {
        new compareInternalSetup(target, property.toString(), withProperty, msg);
    }

    // return the decorator
    return compareInternal;
}

class compareInternalSetup {

    constructor(public target: any, public key: string, public withProperty: string, public msg?: string) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__hasCompareProperty__${key}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__withCompare__${key}`, {
            value: this.withProperty,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__errCompareProperty__${key}`, {
            value: this.msg 
               || `The field ${this.key} must have the same value as field ${this.withProperty}`,
            enumerable: false,
            configurable: false
        });
    }

}