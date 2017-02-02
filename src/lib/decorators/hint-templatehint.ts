/**
 * The Template decorator.
 *
 * One can define the way a property gets rendered.
 * Currently supported:
 *  - TextArea
 *  - Calendar
 *
 * @param template        The Name that appears in form fields as a watermark.
 * @param params          Depending of template some additional values as a dictionary.
 */
export function TemplateHint(template: string, params: { key: string, value: any }[]) {
    // the original decorator
    function templateHintInternal(target: Object, name: string, template: string, params: { key: string, value: any }[]): void {
        new templateHintInternalSetup(target, name, template, params);
    }

    // return the decorator
    return templateHintInternal;
}

class templateHintInternalSetup {

    constructor(public target: any, public key: string, public template: string, public params: { key: string, value: any }[]) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__templateHint__${this.key}`, {
            value: this.template,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__templateHintParams__${this.key}`, {
            value: this.params,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `__hasTemplateHint__${this.key}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

    }

}
