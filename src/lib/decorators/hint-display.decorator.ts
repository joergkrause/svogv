/**
 * The Display decorator. 
 * @param name          The Name or Label that appears in forms or as header in grids.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the element's order.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
        new displayInternalSetup(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayInternal;
}

class displayInternalSetup {


    constructor(public target: any, public key: string, public name: string, public order: number, public description: string) {

        this.order = parseInt(this.order.toString());
        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__displayName__${this.key}`, {
            value: this.name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__displayOrder__${this.key}`, {
            value: this.order,
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
