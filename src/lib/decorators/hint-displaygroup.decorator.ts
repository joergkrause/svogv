/**
 * The DisplayGroup decorator. Groups fields in auto forms.
 * Just define a name (that appears as the group's name) and
 * put the very same name on all members of the group.
 *
 * @param name          The Name or Label that appears in forms as the groups legend.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the groups order.
 * @param description   A tooltip that can be used optionally.
 */
export function DisplayGroup(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayGroupInternal(target: Object, property: string | symbol): void {
        new displayGroupInternalSetup(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayGroupInternal;
}

class displayGroupInternalSetup {


    constructor(public target: any, public key: string, public name: string, public order: number, public description: string) {

        this.order = parseInt(this.order.toString());
        // create a helper property to transport a meta data value

        Object.defineProperty(this.target, `__isGrouped__${this.key}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__groupName__${this.key}`, {
            value: this.name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__groupOrder__${this.key}`, {
            value: this.order,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__groupDesc__${this.key}`, {
            value: this.description,
            enumerable: false,
            configurable: false
        });
    }

}
