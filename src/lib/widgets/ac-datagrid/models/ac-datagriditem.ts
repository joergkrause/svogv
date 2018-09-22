import { SvogvModule } from '../../../module';

/**
 * The item with data and meta data.
 */
export class AcDataGridItem {
  /**
   * The ctor
   * @param value: The value to show.
   * @param prop: The name of the property.
   * @param pipe: An attached pipe, if any. Used for dynamic formatting 
   */
  constructor() {
  }

  value: any;
  prop: string;

  pipeToken?: any;

  public getFormatted(pipeArgs: any[]): any {
    let pipe = SvogvModule['injector'] && SvogvModule['injector'].get(this.pipeToken);
    return pipe && pipe.transform(this.value, ...pipeArgs);
  }

}