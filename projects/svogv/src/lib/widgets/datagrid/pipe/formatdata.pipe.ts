import { Injector, Pipe, PipeTransform, Type } from '@angular/core';

/**
 * This pipe allows the dynamic formatting of data. It is just for internal use.
 * The purpose is the forwarding of an externally defined pipe to the pipe formatter within the grid.
 */
@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {
  public constructor(private injector: Injector) {}

  transform(value: any, pipeToken: Type<PipeTransform>, pipeArgs: any[]): any {
    if (!pipeToken) {
      console.log('FormatDataPipe:NoPipeToken');
      return value;
    } else {
      console.log('FormatDataPipe:PipeToken:', pipeToken);
      const pipe = this.injector.get<PipeTransform>(pipeToken);
      return pipe.transform(value, ...pipeArgs || []);
    }
  }
}
