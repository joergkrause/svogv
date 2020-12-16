import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SiteApiService } from '../../../../demo-ui/services';
import { DataGridModel } from '@svogv/core';
import { SimpleUserViewModelList } from '../../../../demo-ui/viewmodels/simpleuser.viewmodellist';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EditorListComponent implements OnInit, OnDestroy {

  public users: DataGridModel<SimpleUserViewModelList>;
  public currentUser: SimpleUserViewModelList;
  public searchItem: any = '';
  public searchProp: string = '';
  public btnToggle: boolean;

  constructor(public apiService: SiteApiService, public router: Router) {
  }

  ngOnInit() {
    // we need to manage this because the component may load at any time, even after the broadcast has been gone
    // get dashboard data on load and distribute to all listening components
    this.apiService.getSimpleUsers().subscribe(data => {
      this.renderData(data);
    });
  }

  ngOnDestroy(): void {
    this.users.onEdit.unsubscribe();
    this.users.onDelete.unsubscribe();
    delete this.users;
  }

  public get filter(): { [prop: string]: any } {
    return { [this.searchProp]: this.searchItem };
  }

  private renderData(data: SimpleUserViewModelList[]) {
    // we get a regular array here, but grid expects GridData for proper rendering
    this.users = new DataGridModel<SimpleUserViewModelList>(data, SimpleUserViewModelList);
    this.users.onEdit.subscribe(user => this.editUser(user));
    this.users.onDelete.subscribe(user => this.removeUser(user));
  }

  editUser(user: SimpleUserViewModelList): void {
    this.router.navigate(['/editor/edit', user.id]);
  }

  editUserAutoform(user: SimpleUserViewModelList): void {
    this.router.navigate(['/editor/edit-autoform', user.id]);
  }

  addUser() {
    this.router.navigate(['/editor/new']);
  }

  removeUser(user: SimpleUserViewModelList): void {
    this.router.navigate(['/editor/delete', user.id]);
  }


  showModal(user: SimpleUserViewModelList): void {
    this.currentUser = user;
  }

}
