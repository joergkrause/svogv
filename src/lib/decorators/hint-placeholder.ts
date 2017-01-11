/**
 * The Placeholder decorator. 
 * 
 * The placeholder adds the given text as a watermark to any input fields. There is no function in DataGrid.
 * 
 * @param name          The Name that appears in form fields as a watermark.
 */
export function Placeholder(name: string) {
    // the original decorator
    function placeholderInternal(target: Object, property: string | symbol): void {
        new placeholderInternalSetup(target, property.toString(), name);
    }

    // return the decorator
    return placeholderInternal;
}

class placeholderInternalSetup {

    constructor(public target: any, public key: string, public name: string) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__watermark__${this.key}`, {
            value: this.name,
            enumerable: false,
            configurable: false
        });

    }

}