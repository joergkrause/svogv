/**
 * The Display decorator. 
 * @param name          The Name or Label that appears in forms or as header in grids.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(name: string, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
        new displayInternalSetup(target, property.toString(), name, description);
    }

    // return the decorator
    return displayInternal;
}

class displayInternalSetup {


    constructor(public target: any, public key: string, public name: string, public description: string) {
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