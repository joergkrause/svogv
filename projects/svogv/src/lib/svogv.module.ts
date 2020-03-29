import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as wd from './widgets/index';

import { FormValidatorService } from './services/formvalidator.service';
// import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

const SVOGV_COMPONENTS = [
  wd.DataGridComponent,
  wd.DataGridPaginationComponent,
  wd.TreeViewComponent,
  wd.TreeViewNodeComponent,
  wd.EditorComponent,
  wd.AutoFormComponent
];

const provider = [FormValidatorService]; // , FormValidatorFromJsonService];

/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [...SVOGV_COMPONENTS, wd.FormatDataPipe],
  providers: provider,
  exports: SVOGV_COMPONENTS
})
export class SvogvModule {

  public static forRoot(): ModuleWithProviders<SvogvModule> {
    return {
      ngModule: SvogvModule,
      providers: provider
    };
  }

}
