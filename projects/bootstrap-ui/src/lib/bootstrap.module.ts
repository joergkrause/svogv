import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as wd from './widgets/index';

import { SvogvCoreModule } from '@svogv/core';
// import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

const SVOGV_COMPONENTS = [
  wd.DataGridComponent,
  wd.DataGridPaginationComponent,
  wd.TreeViewComponent,
  wd.TreeViewNodeComponent,
  wd.EditorComponent,
  wd.AutoFormComponent
];

const provider = [SvogvCoreModule];

/**
 * The actual SVOGV Module definition.
 */
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [...SVOGV_COMPONENTS, wd.FormatDataPipe],
  providers: provider,
  exports: SVOGV_COMPONENTS
})
export class SvogvBootstrapModule {

  public static forRoot(): ModuleWithProviders<SvogvBootstrapModule> {
    return {
      ngModule: SvogvBootstrapModule,
      providers: provider
    };
  }

}
