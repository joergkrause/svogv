import {
  Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter
} from '@angular/core';

/**
 * The pagination component creates a few buttons to navigate a grid. The underlaying model
 * is going to handle the date on the client. The pagination does not support a server backend,
 * all relevant data must be loaded first.
 */
@Component({
  selector: 'ac-pagination',
  styles: [
    `.pagination {
      display: inline-block;
      padding-left: 0;
      margin: 20px 0;
      border-radius: 4px;
    }`,
    `.pagination > li {
      display: inline;
    }`,
    `.pagination > li:first-child > span {
      margin-left: 0;
      border-bottom-left -radius: 4px;
      border-top-left-radius: 4px;
    }`,
    `.pagination >.disabled > a, .pagination >.disabled > a:focus, .pagination >.disabled > a:hover, .pagination >.disabled > span, .pagination >.disabled > span:focus, .pagination >.disabled > span:hover {
      color: #777;
      background-color: #fff;
      border-color: #ddd;
      cursor: not-allowed;
    }`,
    `.pagination > li > a, .pagination > li > span {
      position: relative;
      float: left;
      padding: 6px 12px;
      line-height: 1.42857;
      text-decoration: none;
      color: #337ab7;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;
    }`
  ],
  template: `
    <div>
        <ul class="pagination float-right">
            <li [class.disabled]="currentPageNumber === 1 || !maxPageIndex">
                <a href (click)="setCurrentPage(1, $event)" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
            <li [class.disabled]="currentPageNumber === 1 || !maxPageIndex">
                <a href aria-label="Previous"
                    (click)="setCurrentPage(currentPageNumber - 1, $event)">
                    <span aria-hidden="true">‹</span>
                </a>
            </li>
            <li *ngFor="let index of range(pageStartNumber, pageEndNumber)"
                        [class.active]="currentPageNumber === index">
                <a href (click)="setCurrentPage(index, $event)">
                    <span aria-hidden="true">{{ index }}</span>
                </a>
            </li>
            <li [class.disabled]="currentPageNumber === maxPageIndex
                                  || !maxPageIndex">
                <a href (click)="setCurrentPage(currentPageNumber + 1, $event)" aria-label="Last">
                    <span aria-hidden="true">›</span>
                </a>
            </li>
            <li [class.disabled]="currentPageNumber === maxPageIndex
                                  || !maxPageIndex">
                <a href (click)="setCurrentPage(maxPageIndex, $event)" aria-label="Last">
                    <span aria-hidden="true">»</span>
                </a>
            </li>
        </ul>
    </div>
    `
})
export class AcDataGridPagination implements OnInit, OnChanges {
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
