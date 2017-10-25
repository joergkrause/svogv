import { PipeTransform } from '@angular/core';

/**
 * A helper class that allows us to accept Pipe implementations.
 */
export class PipeTransformType implements PipeTransform{
    transform(value: any, ...args: any[]) {
        throw new Error("Do not use this class from user code. This class is only to support the SVOGV infrastructure.");
    }
}

/**
 * The Format decorator. Provide the name of a Pipe that's being used by the
 * dynamic pipe formatter. Hence, the form does not need to apply forms manually.
 * The reason is that you may create forms automatically and hence can't write
 * actual Pipes somewhere. This applies especially if you create a table and loop
 * through properties.
 *
 * @param readonly      Optional, default is true.
 * @param description   A tooltip that can be used optionally.
 */
export function Format(pipeName: typeof PipeTransformType, pipeParams: any[] = null) {
    // the original decorator
    function readonlyInternal(target: Object, property: string | symbol): void {
        new readonlyInternalSetup(target, property.toString(), pipeName);
    }

    // return the decorator
    return readonlyInternal;
}

class readonlyInternalSetup {

    constructor(public target: any, public key: string, public pipeName: typeof PipeTransformType, public pipeParams: any[] = null) {

        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `__hasPipe__${this.key}`, {
            value: this.pipeName,
            enumerable: false,
            configurable: false
        });
        if (this.pipeParams && this.pipeParams.length) {
            Object.defineProperty(this.target, `__pipeParams__${this.key}`, {
                value: this.pipeParams,
                enumerable: false,
                configurable: false
            });
        }
    }

}
