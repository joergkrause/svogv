import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteApiService } from '../../../services';
import { UserViewModelList } from '../../../viewmodels';
import { AcDataGridModel } from 'svogv';

@Component({
  templateUrl: './list.component.html',
  styles: [
    `.colborders col { border-right: 1px solid azure; } `,
    `col.last { border-right: none !important; } `,
    `col.first { background-color: #EEE; } `,
    `th { background: none; } `,
    `button.ac-supersmall {
      width: 16px;
      height: 16px;
      border-radius: 0;
      padding: 1px;
      border: 0px;
      background-color: transparent !important;
      cursor: hand;
    }`,
    'button.ac-supersmall i { font-size: 0.8em; }',
    'div.ac-sortsmall { width: 18px; height: 34px; float: right; line-height: 0px; margin: -5px; }']
})
export class EditorListComponent {

  public users: AcDataGridModel<UserViewModelList>;

  constructor(public apiService: SiteApiService, public router: Router) {
    console.log('Users&List ctor');
  }

  ngOnInit() {
    // we need to manage this because the component may load at any time, even after the broadcast has been gone
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      this.renderData(data);
    });
  }

  private renderData(data: Array<UserViewModelList>) {
    // typeInfo is an artifical instance to get access to the
    // meta data JavaScript cannot provide through type info alone
    var t = new UserViewModelList();
    // we get a regular array here, but grid expects GridData for proper rendering
    this.users = new AcDataGridModel<UserViewModelList>(data, t);
  }

  editUser(user) {
    this.router.navigate(['/editor/edit', user.id]);
  }

  editUserAutoform(user) {
    this.router.navigate(['/editor/edit-autoform', user.id]);
  }

  addUser() {
    this.router.navigate(['/editor/new']);
  }

  removeUser(user) {
    this.router.navigate(['/editor/delete', user.id]);
  }

  currentUser: UserViewModelList;

  showModal(user) {
    this.currentUser = user;
  }

}
