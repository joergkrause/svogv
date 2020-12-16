import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    return `${value || 0} %`;
  }

}
