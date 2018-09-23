import { PipeTransform } from '@angular/core';

/**
 * A helper class that allows us to accept Pipe implementations.
 */
export class PipeTransformType implements PipeTransform {
    transform(value: any, ...args: any[]) {
        throw new Error('Do not use this class from user code. This class is only to support the SVOGV infrastructure.');
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
export function Format(pipeName: any, pipeParams: any[] = null) {
    // the original decorator
    function formatInternal(target: Object, property: string | symbol): void {
        formatInternalSetup(target, property.toString(), pipeName);
    }

    // return the decorator
    return formatInternal;
}

export function formatInternalSetup(target: any, key: string, pipeName: any, pipeParams: any[] = null) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasPipe__${key}`, {
        value: pipeName,
        enumerable: false,
        configurable: false
    });
    if (pipeParams && pipeParams.length) {
        Object.defineProperty(target, `__pipeParams__${key}`, {
            value: pipeParams,
            enumerable: false,
            configurable: false
        });
    }
}
