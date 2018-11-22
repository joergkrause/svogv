import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as wd from './widgets';

import { FormValidatorService } from './services/formvalidator.service';
import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

export * from './decorators';

const SVOGV_COMPONENTS = [
  wd.InfoBoxComponent,
  wd.DataGridComponent,
  wd.DataGridTemplateComponent,
  wd.DataGridPaginationComponent,
  wd.TreeViewComponent,
  wd.TreeViewNodeComponent,
  wd.EditorComponent,
  wd.AutoFormComponent,
  wd.FormatDataPipe
];

const provider = [FormValidatorService, FormValidatorFromJsonService];

/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: SVOGV_COMPONENTS,
  providers: provider,
  exports: [SVOGV_COMPONENTS]
})
export class SvogvModule {

  // store this for access to custom pipes in the model's helper classes, which are not injectable
  // SvogvModule['injector'] = injector;
  public static forRoot(injector?: Injector): ModuleWithProviders {
    return {
      ngModule: SvogvModule,
      providers: provider
    };
  }

}

