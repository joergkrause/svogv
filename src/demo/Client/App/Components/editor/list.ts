import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from '../../Services/EmitterService';
import { SiteApiService } from '../../Services/SiteApiService';
import { UserViewModelList } from '../../ViewModels/UserViewModelList';
import { AcDataGridModel } from 'svogv';

@Component({
  moduleId: module.id,
  templateUrl: './list.html',
  styles: [
    'button.ac-supersmall { width: 16px; height: 16px; border-radius: 0; padding: 1px; border: 0px; }',
    'button.ac-supersmall i { font-size: 0.8em; }',
    'div.ac-sortsmall { width: 18px; height: 34px; }']
})
export class ListEditorComponent {

  public users: AcDataGridModel<UserViewModelList>;

  constructor(public apiService: SiteApiService, public router : Router) {
    console.log('Users&List ctor');
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
    var t = new UserViewModelList();
    // we get a regular array here, but grid expects GridData for proper rendering
    this.users = new AcDataGridModel<UserViewModelList>(data, t);
  }

  editUser(user) {
    this.router.navigate(['/editor/edit', user.id]);
  }

  addUser() {
    this.router.navigate(['/editor/new']);
  }

  removeUser(user) {
    this.router.navigate(['/editor/delete', user.id]);
  }

  currentUser: UserViewModel;

  showModal(user){
    this.currentUser = user;
  }

}