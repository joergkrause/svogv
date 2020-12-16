import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HomeComponent } from '../components/home/home.component';
import * as bts from '../modules/demo-bootstrap/components';
import * as mat from '../modules/demo-material/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'bts',
    children: [
      {
        path: 'widget/tree',
        component: bts.WidgetDemoComponent,
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
            component: bts.TreeviewDemoComponent,
            data: {
              title: 'Tree View', subtitle: 'Tree Demo',
              active: true, disabled: false, breadcrumb: true
            }
          }
        ]
      },
      {
        path: 'widget/grid',
        component: bts.WidgetDemoComponent,
        data: { title: 'Data Grid', subtitle: 'All features of grid', breadcrumb: true, features: true },
        children: [
          {
            path: '',
            redirectTo: 'simple',
            pathMatch: 'full'
          },
          {
            path: 'simple',
            component: bts.GridDemoSimpleComponent,
            data: {
              title: 'Simple Grid', subtitle: 'Grid Demo (simple)',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'template',
            component: bts.GridDemoTemplateComponent,
            data: {
              title: 'Grid Templates', subtitle: 'Grid Demo with templates for content manipulation',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'advanced',
            component: bts.GridDemoComponent,
            data: {
              title: 'Adavanced Grid', subtitle: 'Grid Demo (advanced)',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'filter',
            component: bts.EditorListComponent,
            data: {
              title: 'Filter', subtitle: 'Filter', active: true, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'pagination',
            component: bts.EditorListComponent,
            data: {
              title: 'Pagination', subtitle: 'Pagination', active: true, disabled: false, breadcrumb: true
            }
          }
        ]
      },
      {
        path: 'widget/editor',
        component: bts.WidgetDemoComponent,
        data: { title: 'Editors', subtitle: 'Editor and Grid', breadcrumb: true, features: true },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: bts.EditorListComponent,
            data: {
              title: 'Form Elements', subtitle: 'Editor Demo', active: true, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'new',
            component: bts.EditorNewComponent,
            data: {
              title: 'Simple Form', subtitle: 'Editor Demo', active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'edit/:id',
            component: bts.EditorFormComponent,
            data: {
              title: 'Edit Regular Form', subtitle: 'Editor Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: 'edit-autoform/:id',
            component: bts.EditorAutoformComponent,
            data: {
              title: 'Edit Autoform',
              subtitle: 'Editor Autoform Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: 'delete/:id',
            component: bts.EditorDeleteComponent,
            data: {
              title: 'Delete Element', subtitle: 'Editor Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]

      }
    ]
  },
  {
    path: 'mat',
    children: [
      {
        path: 'widget/tree',
        component: bts.WidgetDemoComponent,
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
            component: mat.TreeviewDemoComponent,
            data: {
              title: 'Tree View', subtitle: 'Tree Demo',
              active: true, disabled: false, breadcrumb: true
            }
          }
        ]
      },
      {
        path: 'widget/grid',
        component: mat.WidgetDemoComponent,
        data: { title: 'Data Grid', subtitle: 'All features of grid', breadcrumb: true, features: true },
        children: [
          {
            path: '',
            redirectTo: 'simple',
            pathMatch: 'full'
          },
          {
            path: 'simple',
            component: mat.GridDemoSimpleComponent,
            data: {
              title: 'Simple Grid', subtitle: 'Grid Demo (simple)',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'template',
            component: mat.GridDemoTemplateComponent,
            data: {
              title: 'Grid Templates', subtitle: 'Grid Demo with templates for content manipulation',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'advanced',
            component: mat.GridDemoComponent,
            data: {
              title: 'Adavanced Grid', subtitle: 'Grid Demo (advanced)',
              active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'filter',
            component: mat.EditorListComponent,
            data: {
              title: 'Filter', subtitle: 'Filter', active: true, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'pagination',
            component: mat.EditorListComponent,
            data: {
              title: 'Pagination', subtitle: 'Pagination', active: true, disabled: false, breadcrumb: true
            }
          }
        ]
      },
      {
        path: 'widget/editor',
        component: bts.WidgetDemoComponent,
        data: { title: 'Editors', subtitle: 'Editor and Grid', breadcrumb: true, features: true },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: mat.EditorListComponent,
            data: {
              title: 'Form Elements', subtitle: 'Editor Demo', active: true, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'new',
            component: mat.EditorNewComponent,
            data: {
              title: 'Simple Form', subtitle: 'Editor Demo', active: false, disabled: false, breadcrumb: true
            }
          },
          {
            path: 'edit/:id',
            component: mat.EditorFormComponent,
            data: {
              title: 'Edit Regular Form', subtitle: 'Editor Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: 'edit-autoform/:id',
            component: mat.EditorAutoformComponent,
            data: {
              title: 'Edit Autoform',
              subtitle: 'Editor Autoform Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: 'delete/:id',
            component: mat.EditorDeleteComponent,
            data: {
              title: 'Delete Element', subtitle: 'Editor Demo', active: false, disabled: true, private: true
            }
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
