import { Component, OnInit, Input, ViewChild, ContentChild,
         TemplateRef, EventEmitter, AfterViewInit, Output, OnDestroy } from '@angular/core';
import { DataGridModel, Direction } from './models/datagrid.model';
import { DatagridStyles } from './models/datagridstyle.model';

/**
 * The datagrid provides basic functions for data tables:
 * * sorting
 * * filtering
 * * pagination
 * * editing
 *
 * Provide an decorator enhanced model and the grid appears driven by model meta data.
 *
 * There are many attributes and ways to change the appearance. Also some classes can be controlled by
 * the host component:
 * * `.col-borders`
 * * `.col-last`
 * * `.col-first`
 * All these styles are applied to the <col> elements of the underlying table.
 */
@Component({
  selector: 'ac-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DataGridComponent implements OnInit, AfterViewInit, OnDestroy {
  public directionEnumHelper = Direction;

  @ViewChild('string', { static: true }) public stringFallback: TemplateRef<any>;
  @ContentChild('string', { static: true }) public string: TemplateRef<any>;

  @ViewChild('boolean', { static: true }) public booleanFallback: TemplateRef<any>;
  @ContentChild('boolean', { static: true }) public boolean: TemplateRef<any>;

  @ViewChild('date', { static: true }) public dateFallback: TemplateRef<any>;
  @ContentChild('date', { static: true }) public date: TemplateRef<any>;

  @ViewChild('enum', { static: true }) public enumFallback: TemplateRef<any>;
  @ContentChild('enum', { static: true }) public enum: TemplateRef<any>;

  @ViewChild('number', { static: true }) public numberFallback: TemplateRef<any>;
  @ContentChild('number', { static: true }) public number: TemplateRef<any>;

  @Input() public externals: { [key: string]: any } = {};

  // @ViewChild(TemplateRef) template: TemplateRef<any>;

  /**
   * Override the internal styles by giving directly CSS rules based on the column tags.
   */
  @Input()
  public columnStyle: DatagridStyles;

  /**
   * The model that makes up the content. Shall provide properties with decorators to control appearance.
   */
  @Input()
  public model: DataGridModel<any>;

  /**
   * Wheather to show a delete button. Clicking it fires the @see DataGridModel.OnDelete event.
   */
  @Input()
  public showDeleteButton: boolean;
  /**
   * Wheather to show an edit button. Clicking it fires the @see DataGridModel.OnEdit event.
   */
  @Input()
  public showEditButton: boolean;

  /**
   * Show the action column at all. Use @see showDeleteButton and  @see showEditButton to switch the buttons
   * on or off individually. Default is `true` (actions visible).
   */
  @Input()
  public showActions = true;

  /**
   * The text that appears on the Delete button. Default is 'Delete'.
   */
  @Input()
  public textDeleteButton = 'Delete';
  /**
   * The text that appears on the Edit button. Default is 'Edit'.
   */
  @Input()
  public textEditButton = 'Edit';
  /**
   * The column header of the column that shows the buttons. Default is 'Actions'.
   */
  @Input()
  public textButtonsHeader = 'Actions';
  /**
   * The text that appears if there are no items to show. Can also be overwritten by a more complex piece
   * of code by adding a template like this:
   * @example
   * <ng-template #data-warning-noitems>
   *   <div class="alert alert-danger">The grid is empty</div>
   * </ng-template>
   */
  @Input()
  public textNoItems = 'There are no items to show';
  /**
   * The filter value to filter the content. The data is of type
   *
   * @example
   * { [prop: string]: any }
   *
   *
   */
  @Input()
  public set filter(value: { [prop: string]: any }) {
    if (this.model) {
      this.model.searchValue = value;
    }
  }

  /**
   * If `true` the columns can be rearranged by moving around with drag 'n drop.
   */
  @Input()
  public reArrangeColumns: boolean;

  /**
   * Event forwarded from model class and being fired after the model class's onEdit event.
   * The event is invoked by the appropriate internal button via click.
   */
  @Output()
  public editItem: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Event forwarded from model class and being fired after the model class's onDelete event.
   * The event is invoked by the appropriate internal button via click.
   */
  @Output()
  public deleteItem: EventEmitter<any> = new EventEmitter<any>();

  public ngOnInit(): void {
    console.log('Model', this.model);
  }
  public ngAfterViewInit(): void {
    if (this.model) {
      this.model.onEdit.subscribe(item => this.editItem.emit(item));
      this.model.onDelete.subscribe(item => this.deleteItem.emit(item));
    }
  }

  public ngOnDestroy(): void {
    if (this.model) {
      this.model.onEdit.unsubscribe();
      this.model.onDelete.unsubscribe();
    }
  }

  // tslint:disable-next-line:member-ordering
  private warnProp: { [prop: string]: string } = {};

  /**
   * Controls the template used to display certain data types.
   * If the host provides a template it's being used, otherwise a fallback is provided
   * @param uiHint Property of @UiHint decorator
   */
  public getActiveTemplate(uiHint: string, prop?: string): TemplateRef<any> {
    if (this[uiHint]) {
      // if provided by user via ContentChild and overwriting defaults (string == string etc.)
      return this[uiHint];
    }
    if (this.externals[uiHint]) {
      // if provided by user via ContentChild but completely replaced
      return this.externals[uiHint];
    }
    if (this[`${uiHint}Fallback`]) {
      // otherwise we take ours from ng-template via ViewChild
      return this[`${uiHint}Fallback`];
    }
    // if we go here the model requested a custom template that didn't exists
    if (this.warnProp[prop] !== uiHint) {
      console.warn(`Property ${prop} requested the template ${uiHint}, but it wasn't provided. Falling back to "string".`);
      this.warnProp[prop] = uiHint;
    }
    return this.stringFallback;
  }
}
