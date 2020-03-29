import { Pipe } from '@angular/core';

/**
 * The FormatPipe decorator. Provide the name of a Pipe that's being used by the
 * dynamic pipe formatter. Hence, the form does not need to apply forms manually.
 * The reason is that you may create forms automatically and hence can't write
 * actual Pipes somewhere. This applies especially if you create a table and loop
 * through properties.
 *
 * @param pipe      The name of the pipe's type.
 * @param pipeParams   The custom pipe's parameters. This is optional and can be omitted.
 *
 * @example
 *  @FormatPipe(SomePipe)
 * public string formattedProperty = '';
 */
export function FormatPipe(pipe: Pipe, pipeParams: any[] = null) {

  function formatInternalSetup(target: any, key: string, innerPipe: Pipe, innerPipeParams: any[] = null) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__uipipe__${key}`, {
      value: innerPipe,
      enumerable: false,
      configurable: false
    });
    if (innerPipeParams && innerPipeParams.length) {
      Object.defineProperty(target, `__pipeparams__${key}`, {
        value: innerPipeParams,
        enumerable: false,
        configurable: false
      });
    }
  }
  // the original decorator
  function formatInternal(target: object, property: string | symbol): void {
    formatInternalSetup(target, property.toString(), pipe, pipeParams);
  }

  // return the decorator
  return formatInternal;
}
