import {NgModule, ModuleWithProviders} from '@angular/core';

import {
  AcBreadCrumb,
  AcInfoBox,
  AcSideMenu,
  AcTab,
  AcWebPart
} from './widgets/index';

import { AcDataGridPagination } from './widgets/ac-datagrid/ac-datagridpagination';
import { AcTreeView } from './widgets/ac-treeview/ac-treeview';
import { AcTreeViewNode } from './widgets/ac-treeview/ac-treeview-node';
import { AcEditor } from './widgets/ac-editors/ac-editor';

const SVOGV_MODULES = [
  AcBreadCrumb,
  AcInfoBox,
  AcSideMenu,
  AcTab,
  AcWebPart,
  AcDataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor
];

@NgModule({
  imports: [
    AcBreadCrumb,
    AcInfoBox,
    AcSideMenu,
    AcTab,
    AcWebPart,
    AcDataGridPagination,
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
