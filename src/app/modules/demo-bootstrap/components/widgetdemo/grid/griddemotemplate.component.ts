import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataGridModel } from '@svogv/core';
import { UserViewModelList } from '../../../../demo-ui/viewmodels';
import { SiteApiService } from '../../../../demo-ui/services';

@Component({
  templateUrl: './griddemotemplate.component.html'
})
export class GridDemoTemplateComponent implements OnInit, OnDestroy {

  model: DataGridModel<UserViewModelList>;
  users: UserViewModelList[];

  constructor(private apiService: SiteApiService) {
    this.users = new Array<UserViewModelList>();
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

  private renderData(data: UserViewModelList[]) {
    // we get a regular array here, but grid expects GridData for proper rendering
    this.model = new DataGridModel<UserViewModelList>(data, UserViewModelList);
  }

}
