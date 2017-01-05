import '../../../../utils/object.extensions';
import { AcDataGridHeader } from './ac-datagridheader';

export class AcDataGridModel<T> {
  searchValue: T = <T>{};
  currentPageIndex: number = 1;
  pageSize: number;
  private _items: T[];

  constructor(items: T[], typeInstance: any, pageSize: number = 10) {
    this._items = items;
    this.pageSize = pageSize;
    if (typeInstance) {
      // make header from decorators, omit if null
      this.createHeadersForType(typeInstance);
    }
  }

  get totalRows(): number {
    return this._items.length;
  }

  get totalFilteredRows(): number {
    return this.itemsFiltered.length;
  }

  private get currentRowStart(): number {
    return this.totalRows > this.pageSize
      ? (this.startRow + 1)
      : this.totalRows === 0 ? 0 : 1;
  }
  private get currentRowEnd(): number {
    return (this.startRow + this.pageSize) < this.totalRows
      ? (this.startRow + this.pageSize)
      : this.totalRows;
  }

  get startRow(): number {
    if (this.currentPageIndex === 0)
      return 0;

    return (this.currentPageIndex - 1) * this.pageSize;
  }

  get maxPageIndex(): number {
    let index = Math.ceil(this.totalFilteredRows / this.pageSize);
    return index;
  }

  set items(value: T[]) {
    this._items = value;
  }
  get items(): T[] {
    return this._items;
  }

  get itemsFiltered(): T[] {
    return this.items.filter(item => Object.same(this.searchValue, item));
  }

  get itemsOnCurrentPage(): T[] {
    return this.itemsFiltered.slice(this.startRow,
      this.startRow + this.pageSize);
  }

  // The view can get col by col filtered for valid headers
  public columnsOfItem(item: T) : Array<any> {
    // we return all if no headers
    let columns: Array<any> = new Array<any>();
    if (!this.headers) {
      for (var prop in item) {
        columns.push((<any>item)[prop]);
      }
    } else {
      this.headers.forEach((e, idx) => columns.push((<any>item)[e.prop]));
    }
    return columns;
  }

  headers : Array<DataGridHeader>;

  private createHeadersForType(type: any): void {
    let headers: Array<DataGridHeader>;
    // assume simple object structure, iterating an array of viewmodels
    // has at least one row, so we can read the headers
    // first we read the properties
    this.headers = new Array<DataGridHeader>();
    for (let p in type) {
      // either propname or decorator name
      let propName = type[`__displayName__${p}`] || p;
      let propDesc = type[`__displayDesc__${p}`] || p;
      // check if hidden, show if no hidden decorator
      let isHidden = type[`__isHidden__${p}`] || false;
      if (!isHidden) {
        this.headers.push(new DataGridHeader(propName, propDesc, p));
      }
    }
  }

}
