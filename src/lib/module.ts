import {NgModule, ModuleWithProviders} from '@angular/core';

import {
  AcInfoBox,
  AcLoaderIcon,
  AcAnalogClock,
  HudClock, HudClockOptions
} from './widgets/index';

import { AcDataGridPagination } from './widgets/ac-datagrid/ac-datagridpagination.component';
import { AcTreeView } from './widgets/ac-treeview/ac-treeview.component';
import { AcTreeViewNode } from './widgets/ac-treeview/ac-treeview-node.component';
import { AcEditor } from './widgets/ac-editors/ac-editor.component';
import { AcAutoForm } from './widgets/ac-editors/ac-autoform.component';

export * from './decorators/index';

const SVOGV_MODULES = [
  AcInfoBox,
  AcDataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor,
  AcAutoForm,
  AcLoaderIcon,
  AcAnalogClock,
  HudClock, HudClockOptions
];

@NgModule({
  imports: SVOGV_MODULES,
  exports: SVOGV_MODULES
})
export class SvOGvRootModule { }


/**
 * The SVOGV Module definition
 */
@NgModule({
  imports: SVOGV_MODULES,
  exports: SVOGV_MODULES
})
export class SvOGvModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: SvOGvRootModule};
  }
}
