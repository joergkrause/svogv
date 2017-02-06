import {NgModule, ModuleWithProviders} from '@angular/core';

import {
  AcBreadCrumb,
  AcInfoBox,
  AcSideMenu,
  AcDropMenu,
  AcTab,
  AcWebPart,
  AcLoaderIcon,
  AcAnalogClock,
  HudClock
} from './widgets/index';

import { AcDataGridPagination } from './widgets/ac-datagrid/ac-datagridpagination';
import { AcTreeView } from './widgets/ac-treeview/ac-treeview';
import { AcTreeViewNode } from './widgets/ac-treeview/ac-treeview-node';
import { AcEditor } from './widgets/ac-editors/ac-editor';
import { AcAutoForm } from './widgets/ac-editors/ac-autoform';
import { Hidden, Display, Placeholder, TemplateHint, Compare, Email, MaxLength, Pattern, Range, Required } from './decorators';
import { FormValidatorService } from './services';

export * from './decorators';

const SVOGV_MODULES = [
  AcBreadCrumb,
  AcInfoBox,
  AcSideMenu,
  AcDropMenu,
  AcTab,
  AcWebPart,
  AcDataGridPagination, 
  AcTreeView,
  AcTreeViewNode,
  AcEditor, 
  AcAutoForm,
  AcLoaderIcon,
  AcAnalogClock,
  HudClock
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
