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
  {
    path: 'studies',
    component: cmp.StudiesComponent,
    data: { 'title': 'Studies', 'subtitle': 'Study Manager' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: cmp.ListStudyComponent,
        data: { 'title': 'List Studies', 'subtitle': 'Study Manager', 'active': true, 'disabled': false }
      },
      {
        path: 'new',
        component: cmp.NewStudyComponent,
        data: { 'title': 'Create Study', 'subtitle': 'Study Manager', 'active': false, 'disabled': false }
      },
      {
        path: 'edit/:id',
        component: cmp.EditStudyComponent,
        data: { 'title': 'Edit Study', 'subtitle': 'Study Manager', 'active': false, 'disabled': true }
      },
      {
        path: 'close/:id',
        component: cmp.CloseStudyComponent,
        data: { 'title': 'Close Study', 'subtitle': 'Study Manager', 'active': false, 'disabled': true }
      },
      {
        path: 'abort/:id',
        component: cmp.AbortStudyComponent,
        data: { 'title': 'Abort Study', 'subtitle': 'Study Manager', 'active': false, 'disabled': true }
      },
      {
        path: 'delete/:id',
        component: cmp.DeleteStudyComponent,
        data: { 'title': 'Delete Study', 'subtitle': 'Study Manager', 'active': false, 'disabled': true }
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },  
  {
    path: 'others',
    component: cmp.OthersComponent,
    data: { 'title': 'Studies', 'subtitle': 'Study Manager' }
  },
  // standard component paths
  {
    path: 'about',
    component: cmp.SiteAboutComponent,
    data: { 'title': 'About', 'subtitle': 'About this app' }
  },
  {
    path: 'contact',
    component: cmp.SiteContactComponent,
    data: { 'title': 'Contact', 'subtitle': 'Contact the team' }
  }
];

export default routes;
