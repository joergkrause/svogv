import { Type, EventEmitter } from '@angular/core';

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
    return this.itemsFiltered ? this.itemsFiltered.length : 0;
  }

  private get currentRowStart(): number {
    return this.totalRows > this.pageSize ? this.startRow + 1 : this.totalRows === 0 ? 0 : 1;
  }
  private get currentRowEnd(): number {
    return this.startRow + this.pageSize < this.totalRows ? this.startRow + this.pageSize : this.totalRows;
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
    return this.itemsFiltered.slice(this.startRow, this.startRow + this.pageSize);
  }

  public get headers(): Array<DataGridHeaderModel> {
    return this._headers.filter(h => !h.hidden);
  }

  public get headersNotVisible(): Array<DataGridHeaderModel> {
    return this._headers.filter(h => h.hidden);
  }
  searchValue: T = <T>{};
  currentPageIndex = 1;
  pageSize: number;
  private _items: T[];

  private _headers: Array<DataGridHeaderModel>;

  /**
   * Event fired if user clicks Edit button.
   */
  public onEdit: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Event fired if user clicks Delete button.
   */
  public onDelete: EventEmitter<T>  = new EventEmitter<T>();

  getItemSorted(sortColumn: string, sortDirection: Direction): T[] {
    if (sortDirection === Direction.Ascending) {
      return this.items.sort((a: any, b: any) => (a[sortColumn] > b[sortColumn] ? 1 : -1));
    } else {
      return this.items.sort((a: any, b: any) => (a[sortColumn] < b[sortColumn] ? 1 : -1));
    }
  }

  public sortColumn(colName: string, dir: string) {
    this.items.sort((a: any, b: any) => (dir === 'desc' ? (a[colName] > b[colName] ? 1 : -1) : a[colName] > b[colName] ? -1 : 1));
  }

  public removeColumn(colname: string) {
    const col = this._headers.find(h => h.prop === colname);
    if (col) {
      col.hidden = true;
    }
  }

  public addColumn(colname: string) {
    const col = this._headers.find(h => h.prop === colname);
    if (col) {
      col.hidden = false;
    }
  }

  /**
   * Called by infrastructure to inform caller of edit wish
   * @param item The item to edit
   */
  public editItem(item: T) {
    this.onEdit.emit(item);
  }

  /**
   * Called by infrastructure to inform caller of delete wish
   * @param item The item to delete
   */
  public deleteItem(item: T) {
    this.onDelete.emit(item);
  }

  private createHeadersForType(type: any): void {
    // assume simple object structure, iterating an array of viewmodels
    // has at least one row, so we can read the headers
    // first we read the properties
    this._headers = new Array<DataGridHeaderModel>();
    for (const p in type) {
      if (!type.hasOwnProperty(p)) {
        continue;
      }
      // either propname or decorator name
      const propName = type[`__displayName__${p}`] || p;
      const propDesc = type[`__displayDesc__${p}`] || p;
      // check if hidden, show if no hidden decorator
      const isHidden = type[`__isHidden__${p}`] || false;
      const header = new DataGridHeaderModel(propName, propDesc, p, isHidden);
      header.isSortable = type[`__issortable__${p}`] || true;
      header.uiHint = type[`__uihint__${p}`] || 'text';
      header.pipe = type[`__uipipe__${p}`];
      header.pipeParams = type[`__pipeParams__${p}`];
      this._headers.push(header);
    }
  }
}


