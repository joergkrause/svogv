import { Component, OnInit, Input, ViewChild, ContentChild, TemplateRef, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { DataGridModel } from './models/datagrid.model';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';
import { DatagridStyles } from './models/datagridstyle.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';

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
export class DataGridComponent implements OnInit, AfterViewInit {
  @ViewChild('string') stringFallback: TemplateRef<any>;
  @ContentChild('string') string: TemplateRef<any>;

  @ViewChild('boolean') booleanFallback: TemplateRef<any>;
  @ContentChild('boolean') boolean: TemplateRef<any>;

  @ViewChild('date') dateFallback: TemplateRef<any>;
  @ContentChild('date') date: TemplateRef<any>;

  @ViewChild('enum') enumFallback: TemplateRef<any>;
  @ContentChild('enum') enum: TemplateRef<any>;

  @ViewChild('number') numberFallback: TemplateRef<any>;
  @ContentChild('number') number: TemplateRef<any>;

  @ContentChildren(TemplateRef) externals: QueryList<any>;

  // @ViewChild(TemplateRef) template: TemplateRef<any>;

  /**
   * Override the internal styles by giving directly CSS rules based on the column tags.
   */
  @Input()
  columnStyle: DatagridStyles;

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
   * The filter value to filter the content.
   */
  @Input()
  public filter: any;

  /**
   * If `true` the columns can be rearranged by moving around with drag 'n drop.
   */
  @Input()
  public reArrangeColumns: boolean;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log('externals', this.externals);
  }

  /**
   * Controls the template used to display certain data types.
   * If the host provides a template it's being used, otherwise a fallback is provided
   * @param uiHint Property of @UiHint decorator
   */
  public getActiveTemplate(uiHint: string, prop?: string): TemplateRef<any> {
    console.log(`DataGridComponent:getActiveTemplate: ${uiHint} / ${prop}`);
    if (this[uiHint]) {
      console.log('internal'); // if provided by user via ContentChild and overwriting defaults (string == string etc.)
      return this[uiHint];
    }
    if (this.externals[uiHint]) {
      console.log('external'); // if provided by user via ContentChild but completely replaced
      return this.externals[uiHint];
    }
    console.log('fallback');  // otherwise we take ours from ng-template via ViewChild
    return this[`${uiHint}Fallback`];
  }
}
