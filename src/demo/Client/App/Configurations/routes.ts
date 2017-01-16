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
    path: 'widgets',
    component: cmp.WidgetDemoComponent,
    data: { 'title': 'Widget Demo', 'subtitle': 'Diverse Components', 'breadcrumb': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      // actual child routes for studies, components will land in the inner <router-outlet> of studies' view
      {
        path: 'list',
        component: cmp.ListWidgetsComponent,
        data: { 'title': 'Overview', 'subtitle': 'Show all widgets', 'active': true, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'clock',
        component: cmp.AnalogClockComponent,
        data: { 'title': 'Analog Clock', 'subtitle': 'Clock Demo', 'active': false, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'icon',
        component: cmp.LoaderIconComponent,
        data: { 'title': 'Loader Icon', 'subtitle': 'Living Icons', 'active': false, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'tree',
        component: cmp.TreeviewComponent,
        data: { 'title': 'Tree View', 'subtitle': 'Tree Demo', 'active': false, 'disabled': false, 'breadcrumb': true }
      }
    ]

  },
  {
    path: 'editor',
    component: cmp.EditorDemoComponent,
    data: { 'title': 'Editor Demo', 'subtitle': 'Editor and Grid', 'breadcrumb': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: cmp.ListEditorComponent,
        data: { 'title': 'List Elements', 'subtitle': 'Editor Demo', 'active': true, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'new',
        component: cmp.NewEditorComponent,
        data: { 'title': 'Create Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'edit/:id',
        component: cmp.EditEditorComponent,
        data: { 'title': 'Edit Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true }
      },
      {
        path: 'delete/:id',
        component: cmp.DeleteEditorComponent,
        data: { 'title': 'Delete Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true }
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
    data: { 'title': 'About', 'subtitle': 'About this app', 'breadcrumb': true }
  }
];

export default routes;
