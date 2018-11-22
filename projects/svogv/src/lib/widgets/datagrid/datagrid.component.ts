import { Component, OnInit, Input } from '@angular/core';
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


  @Input()
  public model: DataGridModel<any>;

  @Input()
  public showDeleteButton: boolean;
  @Input()
  public showEditButton: boolean;
  @Input()
  public showAddButton: boolean;

  @Input()
  public showSearch: boolean;

  @Input()
  public reArrangeColumns: boolean;

  ngOnInit(): void {
  }

}
