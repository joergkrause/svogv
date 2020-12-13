import { Routes } from '@angular/router';
import * as cmp from '../components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'widget/tree',
    component: cmp.WidgetDemoComponent,
    data: { title: 'Tree View', subtitle: 'All features of tree', breadcrumb: true, features: true },
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
          title: 'Tree View', subtitle: 'Tree Demo',
          active: true, disabled: false, breadcrumb: true
        }
      }
    ]
  },
  {
    path: 'widget/grid',
    component: cmp.WidgetDemoComponent,
    data: { title: 'Data Grid', subtitle: 'All features of grid', breadcrumb: true, features: true },
    children: [
      {
        path: '',
        redirectTo: 'simple',
        pathMatch: 'full'
      },
      {
        path: 'simple',
        component: cmp.GridDemoSimpleComponent,
        data: {
          title: 'Simple Grid', subtitle: 'Grid Demo (simple)',
          active: false, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'template',
        component: cmp.GridDemoTemplateComponent,
        data: {
          title: 'Grid Templates', subtitle: 'Grid Demo with templates for content manipulation',
          active: false, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'advanced',
        component: cmp.GridDemoComponent,
        data: {
          title: 'Adavanced Grid', subtitle: 'Grid Demo (advanced)',
          active: false, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'filter',
        component: cmp.EditorListComponent,
        data: {
          title: 'Filter', subtitle: 'Filter', active: true, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'pagination',
        component: cmp.EditorListComponent,
        data: {
          title: 'Pagination', subtitle: 'Pagination', active: true, disabled: false, breadcrumb: true
        }
      }
    ]
  },
  {
    path: 'widget/editor',
    component: cmp.WidgetDemoComponent,
    data: { title: 'Editors', subtitle: 'Editor and Grid', breadcrumb: true, features: true },
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
          title: 'Form Elements', subtitle: 'Editor Demo', active: true, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'new',
        component: cmp.EditorNewComponent,
        data: {
          title: 'Simple Form', subtitle: 'Editor Demo', active: false, disabled: false, breadcrumb: true
        }
      },
      {
        path: 'edit/:id',
        component: cmp.EditorFormComponent,
        data: {
          title: 'Edit Regular Form', subtitle: 'Editor Demo', active: false, disabled: true, private: true
        }
      },
      {
        path: 'edit-autoform/:id',
        component: cmp.EditorAutoformComponent,
        data: {
          title: 'Edit Autoform',
          subtitle: 'Editor Autoform Demo', active: false, disabled: true, private: true
        }
      },
      {
        path: 'delete/:id',
        component: cmp.EditorDeleteComponent,
        data: {
          title: 'Delete Element', subtitle: 'Editor Demo', active: false, disabled: true, private: true
        }
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]

  },
  {
    path: 'about',
    component: cmp.AboutComponent
  }  ,
  {
    path: 'home',
    component: cmp.HomeComponent
  }
];
