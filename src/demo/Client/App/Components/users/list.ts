import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from '../../Services/EmitterService';
import { SiteApiService } from '../../Services/SiteApiService';
import { UserViewModel } from '../../ViewModels/UserViewModel';
import { AcDataGridModel } from '../../../../../lib/widgets';
import '../../Utils/array.extensions';


@Component({
  moduleId: module.id,
  templateUrl: './list.html'
})
export class ListUserComponent {

  public users: AcDataGridModel<UserViewModel>;

  constructor(public apiService: SiteApiService, public router : Router) {
    console.log("Users&List ctor");
  }

  ngOnInit() {
    // we need to manage this because the component may load at any time, even after the broadcast has been gone
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      this.renderData(data);
    });
  }

  private renderData(data: Array<UserViewModel>) {
    // typeInfo is an artifical instance to get access to the meta data JavaScript cannot provide through type info alone
    var t = new UserViewModel();
    // we get a regular array here, but grid expects GridData for proper rendering
    this.users = new AcDataGridModel<UserViewModel>(data, t);
  }

  editUser(user) {
    this.router.navigate(['/users/edit', user.id]);
  }

  addUser() {
    this.router.navigate(['/users/new']);
  }

  removeUser(user) {
    let removedUser: UserViewModel = this.users.items.remove(user)[0];
    this.router.navigate(['/users/delete', removedUser.id]);
  }

}