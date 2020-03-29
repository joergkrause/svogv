import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataGridModel } from 'projects/svogv/src/public_api';
import { UserViewModelList } from 'src/app/viewmodels';
import { SiteApiService } from 'src/app/services';

@Component({
  templateUrl: './griddemosimple.component.html'
})
export class GridDemoSimpleComponent implements OnInit, OnDestroy {

  public model: DataGridModel<UserViewModelList>;
  public users: UserViewModelList[];

  public footerColor: any;
  public headerForeColor: any;
  public headerBackColor: any;
  public firstColor: any;
  public sortIconColor: any;

  constructor(private apiService: SiteApiService) {
    this.users = new Array<UserViewModelList>();
  }

  public ngOnInit() {
    // we need to manage this because the component may load at any time, even after the broadcast has been gone
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe((data) => {
      this.renderData(data);
    });
  }

  public ngOnDestroy(): void {
    delete this.users;
  }

  private renderData(data: UserViewModelList[]) {
    // we get a regular array here, but grid expects GridData for proper rendering
    this.model = new DataGridModel<UserViewModelList>(data, UserViewModelList);
  }

}
