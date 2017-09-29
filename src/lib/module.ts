import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  AcInfoBox,
  AcLoaderIcon,
  AcAnalogClock,
  AcDataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor,
  AcAutoForm,
  HudClock,
  HudClockOptions
} from './widgets/index';

import {
  FormValidatorService
} from './services/formvalidator.service';

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
  HudClock,
  HudClockOptions,
  FormValidatorService
];

/**
 * The root module with the global exports.
 */
@NgModule({
  exports: SVOGV_MODULES
})
export class SvOGvRootModule { }


/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule()
export class SvOGvModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SvOGvRootModule };
  }
}
