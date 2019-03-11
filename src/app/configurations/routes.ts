import { Routes } from '@angular/router';
import * as cmp from '../components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // app paths
  {
    path: 'dashboard',
    component: cmp.DashboardComponent,
    data: { 'title': 'Dashboard', 'subtitle': 'Dashboard', 'info': true }
  },
  {
    path: 'widgets',
    component: cmp.WidgetDemoComponent,
    data: { 'title': 'Components', 'subtitle': 'All features of grid and tree', 'breadcrumb': true, 'features': true },
    children: [
      {
        path: '',
        redirectTo: 'tree',
        pathMatch: 'full'
      },
      // actual child routes for studies, components will land in the inner <router-outlet> of studies' view
      {
        path: 'tree',
        component: cmp.TreeviewDemoComponent,
        data: {
          'title': 'Tree View', 'subtitle': 'Tree Demo',
          'active': false, 'disabled': false, 'breadcrumb': true
        }
      },
      {
        path: 'grids',
        component: cmp.GridDemoComponent,
        data: {
          'title': 'Grid (simple)', 'subtitle': 'Grid Demo (simple)',
          'active': true, 'disabled': false, 'breadcrumb': true
        }
      },
      {
        path: 'grida',
        component: cmp.GridDemoComponent,
        data: {
          'title': 'Grid (advanced)', 'subtitle': 'Grid Demo (advanced)',
          'active': false, 'disabled': false, 'breadcrumb': true
        }
      }
    ]
  },
  {
    path: 'editor',
    component: cmp.EditorDemoComponent,
    data: { 'title': 'Editor Demo', 'subtitle': 'Editor and Grid', 'breadcrumb': true, 'features': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: cmp.EditorListComponent,
        data: {
          'title': 'List Elements', 'subtitle': 'Editor Demo', 'active': true, 'disabled': false, 'breadcrumb': true
        }
      },
      {
        path: 'new',
        component: cmp.EditorNewComponent,
        data: {
          'title': 'Create Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': false, 'breadcrumb': true
        }
      },
      {
        path: 'edit/:id',
        component: cmp.EditorFormComponent,
        data: {
          'title': 'Edit Regular Form', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true, 'private': true
        }
      },
      {
        path: 'edit-autoform/:id',
        component: cmp.EditorAutoformComponent,
        data: {
          'title': 'Edit Autoform',
          'subtitle': 'Editor Autoform Demo', 'active': false, 'disabled': true, 'private': true
        }
      },
      {
        path: 'delete/:id',
        component: cmp.EditorDeleteComponent,
        data: {
          'title': 'Delete Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true, 'private': true
        }
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
    component: cmp.AboutComponent,
    data: { 'title': 'About', 'subtitle': 'About this app', 'breadcrumb': true, 'info': true }
  }
];
