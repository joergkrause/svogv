import {
  Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter
} from '@angular/core';

/**
 * The pagination component creates a few buttons to navigate a grid. The underlaying model
 * is going to handle the date on the client. The pagination does not support a server backend,
 * all relevant data must be loaded first.
 */
@Component({
  selector: 'ac-datagrid-pagination',
  styleUrls: ['./datagridpagination.component.css' ],
  templateUrl: './datagridpagination.component.html'
})
export class DataGridPaginationComponent implements OnInit, OnChanges {
  /**
   * The parent component calculated the pages the component can handle.
   */
  @Input() maxPageIndex: number;

  /**
   * An event fired once the user has changed the page by clicking a button.
   */
  @Output() pageNumberChanged = new EventEmitter();

  currentPageNumber = 1;

  ngOnInit() {
    this.setCurrentPage(1);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['maxPageIndex']) {
      const change = changes['maxPageIndex'];
      if (this.currentPageNumber > change.currentValue) {
        // throws ExpressionChangedAfterItHasBeenCheckedException
        // if there's no setTimeout.
        // no need to add setTimeout if ngOnChanges
        // is fired after changes made on root component.
        setTimeout(() => this.setCurrentPage(1), 1);
      }
    }
  }

  setCurrentPage(pageNumber: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (pageNumber === 0 || pageNumber > this.maxPageIndex
      || pageNumber === this.currentPageNumber) {
      return;
    }

    this.pageNumberChanged.emit(pageNumber);
    this.currentPageNumber = pageNumber;
  }

  range(min: number, max: number): number[] {
    const result = new Array<any>();
    for (let i = min; i <= max; i++) {
      result.push(i);
    }
    return result;
  }

  get pageStartNumber(): number {
    const startNumber = this.currentPageNumber <= 4
      ? 1
      : this.currentPageNumber >= this.maxPageIndex - 3
        ? this.maxPageIndex - 6
        : this.currentPageNumber - 3;
    return startNumber < 1 ? 1 : startNumber;
  }

  get pageEndNumber(): number {
    const pageEnd = this.pageStartNumber + 6;
    return pageEnd > this.maxPageIndex ? this.maxPageIndex : pageEnd;
  }
}
