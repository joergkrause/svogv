import { SvogvModule } from '../../../svogv.module';

/**
 * The item with data and meta data.
 */
export class DataGridItemModel {
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
    const pipe = SvogvModule['injector'] && SvogvModule['injector'].get(this.pipeToken);
    return pipe && pipe.transform(this.value, ...pipeArgs);
  }

}
