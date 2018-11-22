import { Type } from '@angular/core';

import '../../../utils/object-extensions';
import { DataGridHeaderModel } from './datagridheader.model';
import { DataGridItemModel } from './datagriditem.model';

export enum Direction {
  Ascending,
  Descending
}

/**
 * The controlling class for Grid applications.
 *
 * This class takes an array of elements and handles:
 * - visible headers, managed by @Hidden() decorator
 * - create header titles, managed by @Display() decorator
 * - sorting
 * - filtering
 * - count total rows
 * - paging
 */
export class DataGridModel<T> {

  constructor(items: T[], type: Type<T>, pageSize = 10) {
    this._items = items;
    this.pageSize = pageSize;
    const typeInstance = new type();
    if (typeInstance) {
      // make header from decorators, omit if null
      this.createHeadersForType(typeInstance);
    }
  }

  get totalRows(): number {
    return this._items.length;
  }

  get totalFilteredRows(): number {
    return (this.itemsFiltered) ? this.itemsFiltered.length : 0;
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
    if (this.currentPageIndex === 0) {
      return 0;
    }
    return (this.currentPageIndex - 1) * this.pageSize;
  }

  get maxPageIndex(): number {
    const index = Math.ceil(this.totalFilteredRows / this.pageSize);
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

  public get headers(): Array<AcDataGridHeader> {
    return this._headers.filter(h => !h.hidden);
  }

  public get headersNotVisible(): Array<AcDataGridHeader> {
    return this._headers.filter(h => h.hidden);
  }
  searchValue: T = <T>{};
  currentPageIndex = 1;
  pageSize: number;
  private _items: T[];

  private _headers: Array<AcDataGridHeader>;

  getItemSorted(sortColumn: string, sortDirection: Direction): T[] {
    if (sortDirection === Direction.Ascending) {
      return this.items.sort((a: any, b: any) => a[sortColumn] > b[sortColumn] ? 1 : -1);
    } else {
      return this.items.sort((a: any, b: any) => a[sortColumn] < b[sortColumn] ? 1 : -1);
    }
  }

  // The view can get col by col filtered for valid headers
  public columnsOfItemValues(item: T): Array<any> {
    // we return all if no headers
    const columns: Array<any> = new Array<any>();
    if (!this._headers) {
      // tslint:disable-next-line:forin
      for (const prop in item) {
        columns.push((<any>item)[prop]);
      }
    } else {
      this.headers
        .forEach((e, idx) => columns.push((<any>item)[e.prop]));
    }
    return columns;
  }

  public columnsOfItem(item: T): Array<AcDataGridItem> {
    // we return all if no headers
    const columns: Array<AcDataGridItem> = new Array<AcDataGridItem>();
    const currentHeaders: AcDataGridHeader[] = this.headers || Object.keys(item).map(h => new AcDataGridHeader(h, null, h, false));
    currentHeaders
      .forEach((h, idx) => {
        const e = new AcDataGridItem();
        e.value = (<any>item)[h.prop];
        e.prop = h.prop;
        const hasPipe = (<any>e)[`__hasPipe__${h.prop}`];
        if (hasPipe) {
          e.pipeToken = hasPipe;
        }
        columns.push(e);
      });
    return columns;
  }

  public sortColumn(colName: string, dir: string) {
    this.items.sort((a: any, b: any) => dir === 'desc' ? (a[colName] > b[colName] ? 1 : -1) : (a[colName] > b[colName] ? -1 : 1));
  }

  public removeColumn(colname: string) {
    const col = this._headers.find(h => h.prop === colname);
    if (col) {
      col.hidden = true;
    }
  }

  public addColumn(colname: string) {
    let col = this._headers.find(h => h.prop === colname);
    if (col) {
      col.hidden = false;
    }
  }

  private createHeadersForType(type: any): void {
    // assume simple object structure, iterating an array of viewmodels
    // has at least one row, so we can read the headers
    // first we read the properties
    this._headers = new Array<AcDataGridHeader>();
    // tslint:disable-next-line:forin
    for (const p in type) {
      // either propname or decorator name
      const propName = type[`__displayName__${p}`] || p;
      const propDesc = type[`__displayDesc__${p}`] || p;
      // check if hidden, show if no hidden decorator
      const isHidden = type[`__isHidden__${p}`] || false;
      this._headers.push(new AcDataGridHeader(propName, propDesc, p, isHidden));
    }
  }

}
