import { Injector, Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe allows the dynamic formatting of data in forms or grid by applying
 * the @Format(PipeName) decorator.
 *
 * Usage within the form:
 *
 * @example {{ data | formatData:model }}
 *
 * If the model has a decorator for the specific property 'data' refers to, it will pull
 * the actual Pipe from there:
 *
 * @example @Format(PercentagePipe)
 *          percent: number = 0;
 *
 * The module must have access to <code>PercentPipe</code> and the dynamic pipe must have
 * access to a model that's a real instance (interfaces will not work). This is because
 * we need to reflect the meta data from hidden properties that exists for sure.
 *
 */
@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {
  public constructor(private injector: Injector) {}

  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
    if (!pipeToken) {
      return value;
    } else {
      if (pipeArgs && pipeArgs.length >= 2) {
        // First arg is the model
        let model = pipeArgs[0];
        const pipe = this.injector.get(pipeToken);
        return pipe.transform(value, ...pipeArgs);
      } else {
        console.log(
          'Illegal usage of "formatData" Pipe. Use two parameters like this: {{ data | formatData:model:propNames }}'
        );
        return value;
      }
    }
  }
}
