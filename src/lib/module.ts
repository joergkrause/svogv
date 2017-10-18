import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  AcInfoBox,
  AcLoaderIcon,
  AcAnalogClock,
  AcDataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor,
  AcAutoForm
} from './widgets/index';

import {
  FormValidatorService
} from './services/formvalidator.service';

export * from './decorators/index';

const SVOGV_COMPONENTS = [
  AcInfoBox,
  AcDataGridPagination,
  AcTreeView,
  AcTreeViewNode,
  AcEditor,
  AcAutoForm,
  AcLoaderIcon,
  AcAnalogClock,
  FormValidatorService
];

/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: SVOGV_COMPONENTS,
  providers: [FormValidatorService],
  exports: SVOGV_COMPONENTS
})
export class SvogvModule {}

