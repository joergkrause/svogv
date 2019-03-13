import { Component, OnInit, Input, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { DataGridModel } from './models/datagrid.model';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';

/**
 * The datagrid provides basic functions for data tables:
 * * sorting
 * * filtering
 * * pagination
 * * editing
 *
 * Provide an decorator enhanced model and the grid appears driven by model meta data.
 *
 */
@Component({
  selector: 'ac-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DataGridComponent implements OnInit {
  @ViewChild('text') textFallback: TemplateRef<any>;
  @ContentChild('text') text: TemplateRef<any>;

  @ViewChild('bool') boolFallback: TemplateRef<any>;
  @ContentChild('bool') bool: TemplateRef<any>;

  @ViewChild('date') dateFallback: TemplateRef<any>;
  @ContentChild('date') date: TemplateRef<any>;

  @ViewChild('enum') enumFallback: TemplateRef<any>;
  @ContentChild('enum') enum: TemplateRef<any>;

  @ViewChild('num') numFallback: TemplateRef<any>;
  @ContentChild('num') num: TemplateRef<any>;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

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

  /**
   * Controls the template used to display certain data types.
   * If the host provides a template it's being used, otherwise a fallback is provided
   * @param uiHint Property of @UiHint decorator
   */
  public getActiveTemplate(uiHint: string): TemplateRef<any> {
    if (this[uiHint]) {
      return this[uiHint];
    } else {
      return this[`${uiHint}Fallback`];
    }
  }
}
