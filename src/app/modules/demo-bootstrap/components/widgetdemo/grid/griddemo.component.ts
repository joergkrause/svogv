import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataGridModel } from '@svogv/core';
import { UserViewModelList } from '../../../../demo-ui/viewmodels';
import { SiteApiService } from '../../../../demo-ui/services';

@Component({
  templateUrl: './griddemo.component.html'
})
export class GridDemoComponent implements OnInit, OnDestroy {

  model: DataGridModel<UserViewModelList>;
  users: UserViewModelList[];
  gridEvents: string[] = [];
  code: string;

  showActions: boolean;
  reArrangeColumns: boolean;
  actionHeader: string = 'Some Actions';
  textDeleteButton: string = 'Remove';
  textEditButton: string = 'Edit User';

  constructor(private apiService: SiteApiService) {
    this.users = new Array<UserViewModelList>();
    this.code = `<ac-datagrid [model]="model"
             [showActions]="showActions"
             [reArrangeColumns]="reArrangeColumns"
             [textButtonsHeader]="actionHeader"
             [textDeleteButton]="textDeleteButton"
             [textEditButton]="textEditButton"
             (editItem)="gridEvents.push('Edit ' + ($event).userName)"
             (deleteItem)="gridEvents.push('Delete ' + ($event).userName)"
             >
</ac-datagrid>`;
  }

  ngOnInit() {
    // we need to manage this because the component may load at any time, even after the broadcast has been gone
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      this.renderData(data);
    });
  }

  ngOnDestroy(): void {
    delete this.users;
  }

  private renderData(data: Array<UserViewModelList>) {
    // we get a regular array here, but grid expects GridData for proper rendering
    this.model = new DataGridModel<UserViewModelList>(data, UserViewModelList);
  }

}
