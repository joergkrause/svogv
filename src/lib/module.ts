import {NgModule, ModuleWithProviders} from '@angular/core';

import {
  BreadCrumb,
  InfoBox,
  SideMenu,
  Tab,
  WebPart
} from './widgets/index';

import { DataGridPagination } from './widgets/ac-datagrid/ac-datagridpagination';
import { AcTreeView } from './widgets/ac-treeview/ac-treeview';
import { AcTreeViewNode } from './widgets/ac-treeview/ac-treeview-node';
import { AcEditor } from './widgets/ac-editors/ac-editor';

const SVOGV_MODULES = [
  BreadCrumb,
  InfoBox,
  SideMenu,
  Tab,
  WebPart,
  DataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor
];

@NgModule({
  imports: [
    BreadCrumb,
    InfoBox,
    SideMenu,
    Tab,
    WebPart,
    DataGridPagination,
    AcTreeView,
    AcTreeViewNode,
    AcEditor
  ],
  exports: SVOGV_MODULES,
})
export class SvOGvRootModule { }


@NgModule({
  imports: SVOGV_MODULES,
  exports: SVOGV_MODULES,
})
export class SvOGvModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: SvOGvRootModule};
  }
}
