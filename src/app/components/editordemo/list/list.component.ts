import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SiteApiService } from '../../../services';
import { UserViewModelList } from '../../../viewmodels';
import { DataGridModel } from 'svogv';

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
export class EditorListComponent implements OnInit, OnDestroy {

  public users: DataGridModel<UserViewModelList>;
  currentUser: UserViewModelList;

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

  ngOnDestroy(): void {
    this.users.onEdit.unsubscribe();
    this.users.onDelete.unsubscribe();
    delete this.users;
  }

  private renderData(data: Array<UserViewModelList>) {
    // we get a regular array here, but grid expects GridData for proper rendering
    this.users = new DataGridModel<UserViewModelList>(data, UserViewModelList);
    this.users.onEdit.subscribe(user => this.editUser(user));
    this.users.onDelete.subscribe(user => this.removeUser(user));
  }

  editUser(user: UserViewModelList): void {
    this.router.navigate(['/editor/edit', user.id]);
  }

  editUserAutoform(user: UserViewModelList): void {
    this.router.navigate(['/editor/edit-autoform', user.id]);
  }

  addUser() {
    this.router.navigate(['/editor/new']);
  }

  removeUser(user: UserViewModelList): void {
    this.router.navigate(['/editor/delete', user.id]);
  }


  showModal(user: UserViewModelList): void {
    this.currentUser = user;
  }

}
