import { Routes } from '@angular/router';
import * as cmp from '../Components/index';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // app paths
  {
    path: 'dashboard',
    component: cmp.DashboardComponent,
    data: { 'title': 'Dashboard', 'subtitle': 'Caevman Dashboard' }
  },
  {
    path: 'users',
    component: cmp.UsersComponent,
    data: { 'title': 'Users', 'subtitle': 'User Management' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      // actual child routes for studies, components will land in the inner <router-outlet> of studies' view
      {
        path: 'list',
        component: cmp.ListUserComponent,
        data: { 'title': 'List Users', 'subtitle': 'User Manager', 'active': true, 'disabled': false }
      },
      {
        path: 'new',
        component: cmp.NewUserComponent,
        data: { 'title': 'Create User', 'subtitle': 'User Manager', 'active': false, 'disabled': false }
      },
      {
        path: 'edit/:id',
        component: cmp.EditUserComponent,
        data: { 'title': 'Edit User', 'subtitle': 'User Manager', 'active': false, 'disabled': true }
      },
      {
        path: 'delete/:id',
        component: cmp.DeleteUserComponent,
        data: { 'title': 'Delete User', 'subtitle': 'User Manager', 'active': false, 'disabled': true }
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]

  },
  // standard component paths
  {
    path: 'about',
    component: cmp.SiteAboutComponent,
    data: { 'title': 'About', 'subtitle': 'About this app' }
  }
];

export default routes;
