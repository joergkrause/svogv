import { Component, OnInit, Input, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { DataGridModel } from './models/datagrid.model';

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
  styleUrls: ['./datagrid.component.css']
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

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input()
  public model: DataGridModel<any>;

  @Input()
  public showDeleteButton: boolean;
  @Input()
  public showEditButton: boolean;
  @Input()
  public showAddButton: boolean;

  @Input()
  public textDeleteButton = 'Delete';
  @Input()
  public textEditButton = 'Edit';
  @Input()
  public textAddButton = 'Add';

  @Input()
  public filter: any;

  @Input()
  public reArrangeColumns: boolean;

  ngOnInit(): void {
  }

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
