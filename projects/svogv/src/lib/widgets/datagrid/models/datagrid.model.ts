import { Type, EventEmitter, Directive } from '@angular/core';

import '../../../utils/object-extensions';
import { DataGridHeaderModel } from './datagridheader.model';

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
    // not actually a filter present
    if (!this.searchValue || (Object.keys(this.searchValue).length === 0 && this.searchValue.constructor === Object)) {
      return this.items;
    }
    return this.items.filter(item => {
      // tslint:disable-next-line:forin
      for (const s in this.searchValue) {
        const pattern = new RegExp(this.searchValue[s]);
        if (pattern.test(item[s])) {
          return true;
        }
      }
      return false;
    });
  }

  get itemsOnCurrentPage(): T[] {
    return this.itemsFiltered.slice(this.startRow, this.startRow + this.pageSize);
  }

  /**
   * Get all headers (column names) and their properties.
   */
  public get headers(): Array<DataGridHeaderModel> {
    return this._headers.filter(h => !h.hidden);
  }

  /**
   * Returns the columns currently not shown. @see addColumn and @see removeColumn for more information.
   */
  public get headersNotVisible(): Array<DataGridHeaderModel> {
    return this._headers.filter(h => h.hidden);
  }
  /**
   * The search value filters the rows. Provide the property name and the filter instruction. Search is pure client.
   */
  searchValue: { [prop: string]: any } = {};

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
  public onDelete: EventEmitter<T> = new EventEmitter<T>();

  /**
   * Current sort direction per column.
   */
  public sortDirection: { [column: string]: Direction } = {};

  /**
   * Simple sort fucntion that makes a array sort call for the specified column.
   * @param colName The column which has to be sorted after.
   // tslint:disable-next-line:max-line-length
   * @param dir The order, descended is *desc*, any other string is ascending. If nothing is provided, the direction toggles. Initital value is *ascending*.
   */
  public sortColumn(colName: string, dir: Direction = null) {
    if (!dir) {
      // if nothing is provided, toggle current
      dir = this.sortDirection[colName] === Direction.Ascending ? Direction.Descending : Direction.Ascending;
    }
    // remember last and update UI
    this.sortDirection[colName] = dir;
    this.items.sort((a: any, b: any) => {
      if (dir === Direction.Descending) {
        return a[colName] > b[colName] ? 1 : -1;
      } else {
        return a[colName] > b[colName] ? -1 : 1;
      }
    });
  }

  /**
   * Make a column invisible. This is just changing the render process, the column is still
   * in the headers collection and can be made visible again by calling @see addColumn later.
   */
  public removeColumn(colname: string) {
    const col = this._headers.find(h => h.prop === colname);
    if (col) {
      col.hidden = true;
    }
  }

  /**
   * Add a column to the current grid, that has been removed recently.
   * It's just adding columns that already exists in the headers collection.
   * If the column name provided does not exists, the method does nothing.
   */
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
      // look for template provided by user, if none, we have templates for all ES types
      header.templateHint = type[`__templatehint__${p}`] || typeof type[p];
      header.templateHintParams = type[`__templatehintParams__${p}`];
      header.pipe = type[`__uipipe__${p}`];
      header.pipeParams = type[`__pipeparams__${p}`];
      this._headers.push(header);
    }
  }
}
